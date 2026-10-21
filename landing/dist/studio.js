'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const video = $('source-video'), canvas = $('preview-canvas'), ctx = canvas.getContext('2d');
  const ratioSizes = {vertical:[720,1280], square:[960,960], wide:[1280,720]};
  let loaded = false, sourceURL = '', resultURL = '', recording = false, makingDemo = false, cancelled = false;
  let recorder = null, recordStream = null, recordDestination = null, frames = 0, audioContext, audioSource, voiceGain;
  let cueList = [], cueError = '', start = 0, end = 0, sourceDuration = 0, knownDuration = 0, watchdog = null, lastProgress = 0;
  const recorderAvailable = typeof MediaRecorder !== 'undefined' && typeof canvas.captureStream === 'function';
  const mime = recorderAvailable ? ['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm','video/mp4'].find(t => MediaRecorder.isTypeSupported(t)) || '' : '';
  const status = (id,text,error=false) => { $(id).textContent = text; $(id).classList.toggle('error',error); };
  const time = t => `${Math.floor(Math.max(0,t)/60)}:${(Math.max(0,t)%60).toFixed(1).padStart(4,'0')}`;
  $('export-format').textContent = recorderAvailable ? `Salida: ${mime.startsWith('video/mp4') ? 'MP4' : mime ? 'WebM' : 'formato del navegador'} · 24 imágenes por segundo · resolución según formato.` : 'La exportación no está disponible en este navegador. Prueba una versión reciente de Chrome, Edge, Firefox o Safari.';
  function clearResult() { if (resultURL) URL.revokeObjectURL(resultURL); resultURL = ''; $('download-video').hidden = true; $('download-video').removeAttribute('href'); }
  function updateControls() {
    const busy = recording || makingDemo;
    document.querySelectorAll('[data-edit]').forEach(el => { el.disabled = !loaded || busy; });
    $('video-file').disabled = busy; $('make-demo').disabled = busy || !recorderAvailable;
    $('play-video').disabled = !loaded || busy; $('seek-video').disabled = !loaded || busy;
    $('export-video').disabled = !loaded || busy || !recorderAvailable || !!cueError;
    $('cancel-export').hidden = !recording;
  }
  function parseTime(raw) { const parts = raw.replace(',','.').split(':').map(Number); return parts.length === 2 ? parts[0]*60+parts[1] : parts[0]; }
  function readCaptions() {
    const lines = $('captions').value.split(/\r?\n/); cueList = []; cueError = '';
    lines.forEach((line,index) => {
      if (!line.trim() || cueError) return;
      const m = line.match(/^\s*(\d+(?:[.,]\d+)?|\d{1,2}:\d{2}(?:[.,]\d+)?)\s*\|\s*(.+?)\s*$/);
      if (!m) { cueError = `Línea ${index+1}: usa segundos | texto.`; return; }
      const t = parseTime(m[1]);
      if (!Number.isFinite(t) || t < 0 || (cueList.length && t <= cueList[cueList.length-1].at)) { cueError = `Línea ${index+1}: los inicios deben estar en orden y sin repetirse.`; return; }
      if (m[2].length > 180) { cueError = `Línea ${index+1}: divide esta frase en subtítulos más breves (máximo 180 caracteres).`; return; }
      cueList.push({at:t,text:m[2]});
    });
    const outside = loaded && cueList.some(c => c.at >= end-start);
    status('caption-status',cueError || (outside ? 'Hay subtítulos después del final del recorte; no aparecerán en la exportación.' : cueList.length ? `${cueList.length} frases preparadas. Revisa sus tiempos con Reproducir.` : 'Los subtítulos son manuales. Comprueba sus tiempos en la vista previa.'),!!cueError);
    updateControls();
  }
  function wrapText(text,maxWidth,font) {
    ctx.font = font; const lines = []; let line = '';
    for (const word of text.split(/\s+/)) {
      if (ctx.measureText(word).width > maxWidth) {
        if (line) { lines.push(line); line=''; }
        let part=''; for (const char of word) { if (ctx.measureText(part+char).width > maxWidth) { lines.push(part); part=char; } else part+=char; } line=part;
      } else if (line && ctx.measureText(line+' '+word).width > maxWidth) { lines.push(line); line=word; } else line += (line?' ':'')+word;
    }
    if (line) lines.push(line); return lines;
  }
  function textBlock(text,y,size,color,bg,maxLines=3,bottom=false) {
    const w=canvas.width, scale=w/720, maxWidth=w*.82;
    let font=`600 ${size*scale}px Arial, sans-serif`,lines=wrapText(text,maxWidth,font);
    while(lines.length>maxLines&&size>14){size*=.92;font=`600 ${size*scale}px Arial, sans-serif`;lines=wrapText(text,maxWidth,font);}
    const lineHeight=size*scale*1.25;
    const widths=lines.map(l=>ctx.measureText(l).width), boxWidth=Math.min(w*.93,Math.max(...widths,0)+36*scale), height=lines.length*lineHeight+26*scale;
    if(bottom)y-=height;
    ctx.fillStyle=bg; ctx.fillRect((w-boxWidth)/2,y,boxWidth,height); ctx.fillStyle=color;ctx.font=font;ctx.textAlign='center';ctx.textBaseline='top';
    lines.forEach((l,i)=>ctx.fillText(l,w/2,y+13*scale+i*lineHeight));
  }
  function draw() {
    if (!loaded || video.readyState < 2) return;
    const [w,h]=ratioSizes[$('video-ratio').value]; if(canvas.width!==w||canvas.height!==h) {canvas.width=w;canvas.height=h;}
    ctx.fillStyle='#f6e4ea';ctx.fillRect(0,0,w,h);
    const fit=$('video-fit').value, factor=fit==='cover'?Math.max(w/video.videoWidth,h/video.videoHeight):Math.min(w/video.videoWidth,h/video.videoHeight);
    const dw=video.videoWidth*factor,dh=video.videoHeight*factor;ctx.drawImage(video,(w-dw)/2,(h-dh)/2,dw,dh);
    const relative=Math.max(0,video.currentTime-start), scale=w/720;
    const title=$('video-title').value.trim(); if(title && relative<3) textBlock(title,h*.075,42,'#fffbf7',$('title-color').value,3);
    const cue=[...cueList].reverse().find(c=>relative>=c.at && relative<end-start);
    if(cue) textBlock(cue.text,h*.86,Number($('caption-size').value),'#ffffff','rgba(36,20,30,.88)',4,true);
    const brand=$('video-brand').value.trim(); if(brand) {ctx.font=`600 ${19*scale}px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';const bw=Math.min(w*.9,ctx.measureText(brand).width+28*scale);ctx.fillStyle='rgba(255,251,247,.9)';ctx.fillRect((w-bw)/2,h*.945-18*scale,bw,36*scale);ctx.fillStyle='#5b2946';ctx.fillText(brand,w/2,h*.945);}
    $('seek-video').value=String(Math.min(end-start,Math.max(0,relative))); $('time-display').textContent=`${time(relative)} / ${time(end-start)}`;
  }
  function stopPlayback() { video.pause(); $('play-video').textContent='Reproducir'; }
  function finishRecord() { if (!recording || !recorder || recorder.state==='inactive') return; stopPlayback();draw();recorder.stop(); }
  function tick() {
    draw();
    if(recording) {const p=Math.min(100,Math.max(0,(video.currentTime-start)/(end-start)*100));$('export-progress').value=p;if(p>lastProgress+10){lastProgress=p;status('export-status',`Creando tu archivo… ${Math.round(p)} %`);}if(video.currentTime>=end-.025||video.ended)finishRecord();}
    else if(loaded&&!video.paused&&video.currentTime>=end)stopPlayback();
    frames=requestAnimationFrame(tick);
  }
  function seek(t) { return new Promise((resolve,reject)=>{if(Math.abs(video.currentTime-t)<.005){resolve();return;}const timeout=setTimeout(()=>{clean();reject(new Error('No se pudo ubicar el inicio del video.'));},8000);function clean(){clearTimeout(timeout);video.removeEventListener('seeked',ok);}function ok(){clean();resolve();}video.addEventListener('seeked',ok,{once:true});video.currentTime=t;}); }
  async function audio() {
    if(!audioContext){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('Este navegador no permite procesar el audio.');audioContext=new Audio();audioSource=audioContext.createMediaElementSource(video);voiceGain=audioContext.createGain();audioSource.connect(voiceGain);voiceGain.connect(audioContext.destination);}
    voiceGain.gain.value=Number($('voice-volume').value)/100;await audioContext.resume();
  }
  function chooseFile(file, duration = 0) {
    stopPlayback();clearResult();loaded=false;updateControls();cueList=[];cueError='';$('captions').value='';$('video-title').value='';$('video-brand').value='';$('empty-preview').hidden=false;canvas.hidden=true;
    knownDuration=duration;sourceDuration=0;if(sourceURL)URL.revokeObjectURL(sourceURL); sourceURL=URL.createObjectURL(file);video.src=sourceURL;video.load();$('video-name').textContent=file.name;status('load-status','Abriendo tu toma…');status('export-status','');
  }
  $('video-file').addEventListener('change',e=>{const f=e.target.files[0];if(f)chooseFile(f);});
  video.addEventListener('loadedmetadata',async()=>{
    let duration=Number.isFinite(video.duration)?video.duration:knownDuration;
    if(!duration){try{await seek(10000000);duration=Number.isFinite(video.duration)?video.duration:video.currentTime;await seek(0);}catch{duration=0;}}
    if(!Number.isFinite(duration)||duration<.3||!video.videoWidth){status('load-status','No pudimos leer una duración válida. Prueba un archivo MP4 o WebM corto.',true);return;}
    sourceDuration=duration;loaded=true;start=0;end=duration;$('trim-start').value='0';$('trim-start').max=String(end-.25);$('trim-end').value=end.toFixed(2);$('trim-end').max=String(end);$('seek-video').max=String(end);$('seek-video').value='0';canvas.hidden=false;$('empty-preview').hidden=true;status('load-status',`Tu toma está lista: ${time(end)}.`);readCaptions();updateControls();
  });
  video.addEventListener('loadeddata',draw);
  video.addEventListener('error',()=>{loaded=false;updateControls();if(recording){cancelled=true;finishRecord();}status('load-status','El navegador no puede reproducir este archivo. Prueba otro formato compatible.',true);});
  video.addEventListener('ended',()=>{if(recording)finishRecord();else stopPlayback();});
  function editRange(changed) {
    if(!loaded)return;stopPlayback();clearResult();const d=sourceDuration;let s=Number($('trim-start').value),e=Number($('trim-end').value);
    if(!Number.isFinite(s))s=0;if(!Number.isFinite(e))e=d;s=Math.max(0,Math.min(d-.25,s));e=Math.max(.25,Math.min(d,e));
    if(e-s<.25){if(changed==='start')s=Math.max(0,e-.25);else e=Math.min(d,s+.25);}
    start=s;end=e;$('trim-start').value=s.toFixed(2);$('trim-end').value=e.toFixed(2);$('seek-video').max=String(e-s);video.currentTime=s;readCaptions();draw();
  }
  $('trim-start').addEventListener('change',()=>editRange('start'));$('trim-end').addEventListener('change',()=>editRange('end'));
  function previewRangeInput() {
    if(!loaded)return;
    const s=Number($('trim-start').value),e=Number($('trim-end').value);
    if($('trim-start').value===''||$('trim-end').value===''||!Number.isFinite(s)||!Number.isFinite(e)||s<0||e>sourceDuration||e-s<.25)return;
    stopPlayback();clearResult();start=s;end=e;$('seek-video').max=String(e-s);video.currentTime=s;readCaptions();draw();
  }
  $('trim-start').addEventListener('input',previewRangeInput);$('trim-end').addEventListener('input',previewRangeInput);
  document.querySelectorAll('[data-edit]').forEach(el=>{if(el.id==='trim-start'||el.id==='trim-end')return;el.addEventListener('input',()=>{clearResult();if(el.id==='captions')readCaptions();if(el.id==='voice-volume'&&voiceGain)voiceGain.gain.value=Number(el.value)/100;draw();});});
  $('seek-video').addEventListener('input',()=>{stopPlayback();video.currentTime=start+Number($('seek-video').value);});
  $('play-video').addEventListener('click',async()=>{try{if(!video.paused){stopPlayback();return;}await audio();if(video.currentTime>=end-.03||video.currentTime<start)await seek(start);await video.play();$('play-video').textContent='Pausar';}catch{status('load-status','No se pudo reproducir. Vuelve a intentarlo o selecciona otro archivo.',true);}});
  $('cancel-export').addEventListener('click',()=>{cancelled=true;if(recorder&&recorder.state!=='inactive')finishRecord();else{recording=false;updateControls();$('export-progress').hidden=true;status('export-status','Exportación cancelada. Tu edición sigue disponible.');}});
  $('export-video').addEventListener('click',async()=>{
    if(!loaded||recording||cueError)return;clearResult();stopPlayback();recording=true;cancelled=false;lastProgress=0;updateControls();$('export-progress').hidden=false;$('export-progress').value=0;status('export-status','Preparando tu archivo…');
    try{
      await audio();await seek(start);if(cancelled)return;draw();
      const capture=canvas.captureStream(24);recordDestination=audioContext.createMediaStreamDestination();voiceGain.connect(recordDestination);recordStream=new MediaStream([...capture.getVideoTracks(),...recordDestination.stream.getAudioTracks()]);
      recorder=new MediaRecorder(recordStream,mime?{mimeType:mime,videoBitsPerSecond:4500000,audioBitsPerSecond:128000}:undefined);const chunks=[];
      recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
      recorder.onerror=()=>{cancelled=true;status('export-status','La grabación se interrumpió. Prueba con un fragmento más corto.',true);finishRecord();};
      recorder.onstop=()=>{
        clearTimeout(watchdog);const type=recorder.mimeType||mime||'video/webm';recording=false;recordStream.getTracks().forEach(t=>t.stop());try{voiceGain.disconnect(recordDestination);}catch{}
        updateControls();$('export-progress').hidden=true;
        if(cancelled){status('export-status','Exportación cancelada. Tu edición sigue disponible.');return;}
        const blob=new Blob(chunks,{type});if(blob.size<100){status('export-status','El archivo quedó vacío. Vuelve a exportar o prueba otro navegador.',true);return;}
        const ext=type.includes('mp4')?'mp4':'webm';resultURL=URL.createObjectURL(blob);$('download-video').href=resultURL;$('download-video').download=`solanch-video-${new Date().toISOString().slice(0,10)}.${ext}`;$('download-video').hidden=false;status('export-status',`Tu archivo está listo (${(blob.size/1048576).toFixed(1)} MB, ${ext.toUpperCase()}). Descárgalo y revísalo.`);
      };
      recorder.start(250);await video.play();status('export-status','Creando tu archivo… Mantén esta pestaña visible.');
      watchdog=setTimeout(()=>{if(recording){cancelled=true;finishRecord();status('export-status','La reproducción tardó demasiado. Vuelve a intentar con esta pestaña visible.',true);}},(end-start)*1000+20000);
    }catch(error){if(recorder&&recorder.state!=='inactive'){cancelled=true;finishRecord();}else{recording=false;recordStream?.getTracks().forEach(t=>t.stop());updateControls();$('export-progress').hidden=true;status('export-status',error.message||'No se pudo exportar en este navegador.',true);}}
  });
  $('make-demo').addEventListener('click',async()=>{
    if(!recorderAvailable)return;stopPlayback();makingDemo=true;updateControls();status('load-status','Creando una muestra de práctica de cuatro segundos…');
    let demoStream,demoAudio,osc;
    try{
      const d=document.createElement('canvas');d.width=640;d.height=360;const g=d.getContext('2d');demoStream=d.captureStream(24);const Audio=window.AudioContext||window.webkitAudioContext;demoAudio=new Audio();await demoAudio.resume();const dest=demoAudio.createMediaStreamDestination();osc=demoAudio.createOscillator();const gain=demoAudio.createGain();gain.gain.value=.07;osc.frequency.value=440;osc.connect(gain);gain.connect(dest);osc.start();dest.stream.getAudioTracks().forEach(t=>demoStream.addTrack(t));
      const demoRec=new MediaRecorder(demoStream,mime?{mimeType:mime}:undefined),parts=[];
      const result=new Promise((resolve,reject)=>{demoRec.ondataavailable=e=>{if(e.data.size)parts.push(e.data);};demoRec.onerror=()=>reject(new Error());demoRec.onstop=()=>resolve(new Blob(parts,{type:demoRec.mimeType||mime||'video/webm'}));});demoRec.start(100);const begin=performance.now();
      await new Promise(resolve=>{function animate(now){const t=(now-begin)/1000;g.fillStyle='#f6e4ea';g.fillRect(0,0,640,360);g.fillStyle='#b6577c';g.beginPath();g.arc(90+t*100,180,55,0,Math.PI*2);g.fill();g.fillStyle='#5b2946';g.font='36px Georgia';g.textAlign='center';g.fillText('Una idea en movimiento',320,72);g.font='16px Arial';g.fillText('Muestra de práctica · Solanch',320,315);if(t>=4){resolve();return;}requestAnimationFrame(animate);}requestAnimationFrame(animate);});
      demoRec.stop();const blob=await result;makingDemo=false;chooseFile(new File([blob],'muestra-solanch.webm',{type:blob.type}),4);
    }catch{status('load-status','No se pudo crear la muestra. Selecciona un video corto de tu dispositivo.',true);}
    finally{osc?.stop();demoStream?.getTracks().forEach(t=>t.stop());await demoAudio?.close();makingDemo=false;updateControls();}
  });
  window.addEventListener('beforeunload',()=>{cancelAnimationFrame(frames);recordStream?.getTracks().forEach(t=>t.stop());if(sourceURL)URL.revokeObjectURL(sourceURL);if(resultURL)URL.revokeObjectURL(resultURL);audioContext?.close();});
  updateControls();tick();
})();
