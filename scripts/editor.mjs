import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const formats = { vertical: [720,1280], horizontal: [1280,720], cuadrado: [720,720] };
const help = `Editor local · Solanch | MINED/FWP
npm run diagnostico
npm run prueba
npm run preparar -- "entradas/mi-video.mp4"
npm run render -- "proyectos/mi-video.json" --muestra
npm run render -- "proyectos/mi-video.json"
npm run silencios -- "entradas/mi-video.mp4"

Edita el plan JSON con Claude Code o Codex. Consulta LEEME-PRIMERO.md.
Los subtítulos usan segundos del video original. --muestra exporta hasta 10 s.
Para sustituir una exportación existente agrega --reemplazar.`;

async function run(args, { cwd=root, allowFailure=false }={}) {
  if (!ffmpeg) throw new Error('Esta plataforma no dispone de binario FFmpeg en ffmpeg-static. Consulta TERCEROS.md.');
  return new Promise((resolve,reject) => {
    const child=spawn(ffmpeg,args,{cwd,windowsHide:true,stdio:['ignore','pipe','pipe']});
    let stdout='',stderr='';
    child.stdout.on('data',c=>{stdout=(stdout+c).slice(-100000);});
    child.stderr.on('data',c=>{stderr=(stderr+c).slice(-100000);});
    child.on('error',reject);
    child.on('close',code=>code===0||allowFailure ? resolve({code,stdout,stderr}) : reject(new Error(`FFmpeg terminó con código ${code}.\n${stderr.slice(-4500)}`)));
  });
}
async function probe(file) {
  await fs.access(file);
  const {stderr}=await run(['-hide_banner','-i',file],{allowFailure:true});
  const d=stderr.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
  const v=stderr.split('\n').find(l=>/Stream .*Video:/.test(l));
  const size=v?.match(/\b(\d{2,6})x(\d{2,6})\b/);
  if(!d || !v || !size) throw new Error('No se pudo leer la duración o la imagen. Usa un archivo de video local MP4 o MOV.');
  return {duration:Number(d[1])*3600+Number(d[2])*60+Number(d[3]),width:Number(size[1]),height:Number(size[2]),audio:/Stream .*Audio:/.test(stderr)};
}
const sec=(n)=>Number.isFinite(n) && n>=0;
function validate(plan,meta) {
  if(!formats[plan.format]) throw new Error('format debe ser vertical, horizontal o cuadrado.');
  if(!['contener','llenar'].includes(plan.framing)) throw new Error('framing debe ser contener o llenar.');
  if(!Array.isArray(plan.keep)||!plan.keep.length||plan.keep.length>100) throw new Error('keep debe contener entre 1 y 100 fragmentos.');
  let previous=0;
  for(const s of plan.keep) {
    if(!Array.isArray(s)||s.length!==2||!sec(s[0])||!sec(s[1])||s[1]<=s[0]||s[0]<previous||s[1]>meta.duration+0.04) throw new Error('Cada fragmento keep debe ser [inicio, fin], ordenado, sin solaparse y dentro del video.');
    previous=s[1];
  }
  if(!Array.isArray(plan.captions)||plan.captions.length>3000) throw new Error('captions debe ser una lista de hasta 3000 subtítulos.');
  for(const c of plan.captions) if(!sec(c.start)||!sec(c.end)||c.end<=c.start||c.end>meta.duration+0.04||typeof c.text!=='string'||c.text.length>500) throw new Error('Cada subtítulo requiere start, end y text (hasta 500 caracteres), con tiempos del original.');
  for(const k of ['title','brand']) if(typeof plan[k]!=='string'||plan[k].length>160) throw new Error(`${k} debe ser texto de hasta 160 caracteres.`);
}
function time(n) { const t=Math.round(n*100); return `${Math.floor(t/360000)}:${String(Math.floor(t/6000)%60).padStart(2,'0')}:${String(Math.floor(t/100)%60).padStart(2,'0')}.${String(t%100).padStart(2,'0')}`; }
function assText(t) { return t.replace(/\\/g,'／').replace(/{/g,'（').replace(/}/g,'）').replace(/\r?\n/g,'\\N'); }
function subtitleFile(plan,segments,w,h) {
  const total=segments.reduce((a,s)=>a+s[1]-s[0],0);
  const lines=[`[Script Info]\nScriptType: v4.00+\nPlayResX: ${w}\nPlayResY: ${h}\nWrapStyle: 0\nScaledBorderAndShadow: yes\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding`,
    `Style: Caption,Arial,${Math.round(w*.047)},&H00FFFFFF,&H000000FF,&H00352340,&H70352340,-1,0,0,0,100,100,0,0,1,2,1,2,${Math.round(w*.08)},${Math.round(w*.08)},${Math.round(h*.13)},1`,
    `Style: Title,Arial,${Math.round(w*.06)},&H00FFFFFF,&H000000FF,&H0046295B,&H0046295B,-1,0,0,0,100,100,0,0,3,9,0,8,${Math.round(w*.08)},${Math.round(w*.08)},${Math.round(h*.08)},1`,
    `Style: Brand,Arial,${Math.round(w*.026)},&H00FFFFFF,&H000000FF,&H00352340,&H70352340,0,0,0,0,100,100,0,0,1,1,0,2,25,25,${Math.round(h*.035)},1`,
    '\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'];
  const add=(a,b,style,text)=>{if(text.trim() && b-a>=0.01) lines.push(`Dialogue: 0,${time(a)},${time(b)},${style},,0,0,0,,${assText(text)}`);};
  add(0,total,'Title',plan.title); add(0,total,'Brand',plan.brand);
  let offset=0;
  for(const [a,b] of segments) {
    for(const c of plan.captions) { const start=Math.max(a,c.start),end=Math.min(b,c.end); if(end>start) add(offset+start-a,offset+end-a,'Caption',c.text); }
    offset+=b-a;
  }
  return lines.join('\n')+'\n';
}
async function render(planPath,{sample=false,replace=false}={}) {
  const base=path.dirname(planPath), plan=JSON.parse(await fs.readFile(planPath,'utf8'));
  if(typeof plan.source!=='string'||!plan.source || typeof plan.output!=='string'||!plan.output) throw new Error('El plan necesita source y output.');
  const source=path.resolve(base,plan.source), fullOut=path.resolve(base,plan.output);
  if(path.extname(fullOut).toLowerCase()!=='.mp4') throw new Error('La salida debe terminar en .mp4.');
  const output=sample ? path.join(path.dirname(fullOut),'muestra-'+path.basename(fullOut)) : fullOut;
  if(source===output || source===fullOut) throw new Error('La salida no puede sustituir al video original.');
  if(!replace) { try {await fs.access(output); throw new Error(`La salida ya existe: ${output}. Cambia output o agrega --reemplazar.`);} catch(e) {if(e.code!=='ENOENT') throw e;} }
  const meta=await probe(source); validate(plan,meta);
  let remaining=sample?10:Infinity,segments=[];
  for(const [a,b] of plan.keep) {const end=Math.min(b,a+remaining);if(end>a) segments.push([a,end]);remaining-=end-a;if(remaining<=0)break;}
  const factor=sample?.5:1, [w,h]=formats[plan.format].map(v=>Math.round(v*factor/2)*2);
  const graph=[];
  segments.forEach(([a,b],i)=>{
    graph.push(`[0:v:0]trim=start=${a}:end=${b},setpts=PTS-STARTPTS,setsar=1[v${i}]`);
    if(meta.audio) graph.push(`[0:a:0]atrim=start=${a}:end=${b},asetpts=PTS-STARTPTS,aresample=48000[a${i}]`);
  });
  graph.push(segments.map((_,i)=>`[v${i}]${meta.audio?`[a${i}]`:''}`).join('')+`concat=n=${segments.length}:v=1:a=${meta.audio?1:0}[joined]${meta.audio?'[audio]':''}`);
  const geometry=plan.framing==='llenar'?`scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}`:`scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=0x402335`;
  graph.push(`[joined]${geometry},setsar=1,fps=30,subtitles=filename=titulos.ass,format=yuv420p[video]`);
  const temp=await fs.mkdtemp(path.join(os.tmpdir(),'solanch-render-'));
  await fs.mkdir(path.dirname(output),{recursive:true});
  try {
    await fs.writeFile(path.join(temp,'titulos.ass'),subtitleFile(plan,segments,w,h));
    await fs.writeFile(path.join(temp,'graph.txt'),graph.join(';\n'));
    console.log(`Exportando ${sample?'muestra':'video'}: ${output}`);
    const args=['-hide_banner',replace?'-y':'-n','-i',source,'-filter_complex_script','graph.txt','-map','[video]'];
    if(meta.audio) args.push('-map','[audio]','-c:a','aac','-b:a','160k');
    args.push('-c:v','libx264','-preset','veryfast','-crf','20','-movflags','+faststart',output);
    await run(args,{cwd:temp});
    await run(['-v','error','-i',output,'-f','null','-']);
    const info=await probe(output);
    console.log(`MP4 verificado: ${info.width}×${info.height}, ${info.duration.toFixed(2)} s, ${info.audio?'con audio':'sin audio'}.`);
    return {output,...info};
  } finally {await fs.rm(temp,{recursive:true,force:true});}
}
async function prepare(input) {
  if(!input) throw new Error('Indica la ruta del video, entre comillas si contiene espacios.');
  const source=path.resolve(input),meta=await probe(source);
  const slug=path.basename(source,path.extname(source)).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9_-]/gi,'-').slice(0,60)||'mi-video';
  const file=path.join(root,'proyectos',slug+'.json'); await fs.mkdir(path.dirname(file),{recursive:true});
  const plan={source:path.relative(path.dirname(file),source).split(path.sep).join('/'),output:`../exportaciones/${slug}-editado.mp4`,format:'vertical',framing:'contener',keep:[[0,meta.duration]],title:'',brand:'',captions:[]};
  await fs.writeFile(file,JSON.stringify(plan,null,2)+'\n',{flag:'wx'});
  console.log(`Plan creado: ${file}\nOriginal: ${meta.duration}s · ${meta.width}×${meta.height} · ${meta.audio?'con audio':'sin audio'}\nPide al asistente que ajuste el plan y exporte una muestra.`);
}
async function diagnose() {
  if(Number(process.versions.node.split('.')[0])<22) throw new Error('Instala Node.js LTS 22 o posterior y reinicia el asistente.');
  const v=await run(['-version']);
  const f=await run(['-hide_banner','-filters']);
  if(!/\bsubtitles\b/.test(f.stdout+f.stderr)) throw new Error('Este FFmpeg no incluye el filtro de subtítulos libass.');
  console.log(`Node ${process.version} · ${process.platform}/${process.arch}\n${v.stdout.split('\n')[0]}\nFiltro de subtítulos disponible. Entorno listo para npm run prueba.`);
}
async function trial() {
  await diagnose();
  const demoDir=path.join(root,'proyectos','prueba-instalacion');await fs.mkdir(demoDir,{recursive:true});
  const video=path.join(demoDir,'original-demo.mp4'), planPath=path.join(demoDir,'plan-demo.json');
  if(await fs.access(video).then(()=>false,()=>true)) await run(['-hide_banner','-n','-f','lavfi','-i','testsrc2=size=640x360:rate=25:duration=4','-f','lavfi','-i','sine=frequency=440:sample_rate=48000:duration=4','-shortest','-c:v','libx264','-pix_fmt','yuv420p','-c:a','aac',video]);
  const stamp=Date.now();
  const plan={source:'original-demo.mp4',output:`../../exportaciones/prueba-solanch-${stamp}.mp4`,format:'vertical',framing:'contener',keep:[[.4,1.8],[2.2,3.6]],title:'Mi primera edición',brand:'SOLANCH · MINED/FWP',captions:[{start:.4,end:1.8,text:'Instalación lista'},{start:2.2,end:3.6,text:'Tu siguiente video empieza aquí'}]};
  await fs.writeFile(planPath,JSON.stringify(plan,null,2)+'\n');
  const result=await render(planPath,{sample:true});
  if(Math.abs(result.duration-2.8)>.2||result.width!==360||result.height!==640||!result.audio) throw new Error('El MP4 no coincide con la prueba esperada.');
  await fs.writeFile(path.join(root,'exportaciones','PRUEBA-OK.json'),JSON.stringify({date:new Date().toISOString(),node:process.version,platform:process.platform,arch:process.arch,...result},null,2)+'\n');
  console.log(`PRUEBA OK\nAbre este MP4 y comprueba imagen, sonido y subtítulos:\n${result.output}\nLa prueba usa patrones y sonido sintéticos, no un video personal.`);
}
async function silences(input) {
  if(!input)throw new Error('Indica el archivo de video.');
  const file=path.resolve(input),meta=await probe(file);
  if(!meta.audio) throw new Error('Este video no tiene pista de audio.');
  const {stderr}=await run(['-hide_banner','-i',file,'-vn','-af','silencedetect=noise=-35dB:d=0.5','-f','null','-']);
  console.log(stderr.split('\n').filter(l=>/silence_(start|end)/.test(l)).join('\n')||'No se detectaron pausas de al menos 0,5 s a -35 dB.');
  console.log('Son candidatos para revisar: no se modificó el video ni el plan.');
}
try {
  const [command,arg,...flags]=process.argv.slice(2);
  if(command==='diagnostico')await diagnose();
  else if(command==='prueba')await trial();
  else if(command==='preparar')await prepare(arg);
  else if(command==='render') {if(!arg)throw new Error('Indica el plan JSON.');await render(path.resolve(arg),{sample:flags.includes('--muestra'),replace:flags.includes('--reemplazar')});}
  else if(command==='silencios')await silences(arg);
  else {console.log(help);if(command) process.exitCode=1;}
} catch(error) {console.error(`\nNo se pudo completar: ${error.message}\nConsulta LEEME-PRIMERO.md o muestra este mensaje a tu asistente.`);process.exitCode=1;}
