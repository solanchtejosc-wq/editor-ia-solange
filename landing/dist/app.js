'use strict';
(() => {
  const KEY = 'solanch-playbook-v1';
  const state = {done: [], os: 'mac', ai: 'claude'};
  let canSave = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    state.done = Array.isArray(saved.done) ? [...new Set(saved.done.filter(n => Number.isInteger(n) && n >= 1 && n <= 10))] : [];
    if (['mac', 'windows'].includes(saved.os)) state.os = saved.os;
    else if (/Win/i.test(navigator.platform || '')) state.os = 'windows';
    if (['claude', 'codex'].includes(saved.ai)) state.ai = saved.ai;
  } catch { canSave = false; }

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  let toastTimer;
  function toast(message) {
    const box = $('.toast'); box.textContent = message; box.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { box.hidden = true; }, 2800);
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch { canSave = false; }
    $('#storage-note').textContent = canSave ? 'Se guarda en este navegador.' : 'El navegador no permite guardar. Tu avance durará esta visita.';
  }
  function render() {
    const count = state.done.length;
    $$('[data-completed]').forEach(el => { el.textContent = String(count); });
    $('#guide-progress').value = count;
    $('#progress-caption').textContent = count === 10 ? '¡Completaste tu guía! Es hora de compartir.' : count ? `${10 - count} pasos más para completar tu guía.` : 'Aquí empieza tu primer video.';
    $$('[data-done]').forEach(input => {
      const done = state.done.includes(Number(input.dataset.done));
      input.checked = done; input.closest('.step').classList.toggle('done', done);
    });
    $$('[data-step-link]').forEach(link => link.classList.toggle('is-done', state.done.includes(Number(link.dataset.stepLink))));
    const next = Array.from({length:10}, (_, i) => i + 1).find(n => !state.done.includes(n)) || 10;
    $$('[data-resume]').forEach(link => {
      link.href = `#paso-${next}`;
      if (link.classList.contains('button')) link.firstChild.textContent = count ? 'Continuar mi guía ' : 'Comenzar mi guía ';
      if (link.classList.contains('header-cta')) link.firstChild.textContent = count ? 'Continuar ' : 'Comenzar ';
    });
    $('.completion-banner').hidden = count !== 10;
    $$('[data-os]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.os === state.os)));
    $$('[data-ai]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.ai === state.ai)));
    $$('[data-platform]').forEach(block => { block.hidden = block.dataset.platform !== state.os; });
    $$('[data-assistant]').forEach(block => { block.hidden = block.dataset.assistant !== state.ai; });
    $$('[data-skill]').forEach(code => { code.textContent = (state.ai === 'codex' ? '$' : '/') + code.dataset.skill; });
    $('#storage-note').textContent = canSave ? 'Se guarda en este navegador.' : 'El navegador no permite guardar. Tu avance durará esta visita.';
  }
  function openStep(number, move = true) {
    const step = document.getElementById(`paso-${number}`);
    if (!step) return;
    step.open = true;
    if (move) step.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  }
  $$('[data-done]').forEach(input => input.addEventListener('change', () => {
    const n = Number(input.dataset.done);
    state.done = input.checked ? [...new Set([...state.done, n])].sort((a, b) => a - b) : state.done.filter(value => value !== n);
    save(); render();
    if (input.checked) toast(state.done.length === 10 ? '¡Guía completada! Ya puedes compartir tu video.' : `Paso ${n} guardado como hecho.`);
  }));
  $$('[data-os]').forEach(button => button.addEventListener('click', () => { state.os = button.dataset.os; save(); render(); }));
  $$('[data-ai]').forEach(button => button.addEventListener('click', () => { state.ai = button.dataset.ai; save(); render(); }));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#paso-"]');
    if (link) { const n = Number(link.getAttribute('href').slice(6)); openStep(n, false); }
    const next = event.target.closest('[data-next]');
    if (next) { openStep(Number(next.dataset.next)); history.replaceState(null, '', `#paso-${next.dataset.next}`); }
  });
  async function copy(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      const label = button.classList.contains('prompt-copy') ? button.querySelector('.prompt-action') : button;
      const old = label.textContent; label.textContent = 'Copiado ✓';
      setTimeout(() => { label.textContent = old; }, 1800);
      toast('Copiado. Pégalo en tu asistente de IA.');
    } catch { toast('No se pudo copiar automáticamente. Selecciona el texto y cópialo.'); }
  }
  $$('.copy-command').forEach(button => button.addEventListener('click', () => copy(button.closest('.command').querySelector('code').textContent, button)));
  $$('.prompt-copy').forEach(button => button.addEventListener('click', () => copy(button.querySelector('span').textContent, button)));
  $('.reset-progress').addEventListener('click', () => { $('#reset-dialog').showModal(); });
  $('#reset-dialog').addEventListener('close', () => {
    if ($('#reset-dialog').returnValue !== 'confirm') return;
    state.done = []; save(); render(); toast('Tu guía está lista para empezar de nuevo.');
  });
  const form = $('#registration-form');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submit = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.form-status');
    submit.disabled = true; status.textContent = 'Enviando tu registro…';
    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const response = await fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body});
      if (!response.ok) throw new Error('El envío no fue aceptado');
      location.assign('/gracias/');
    } catch {
      status.textContent = 'No pudimos enviar tu registro. Revisa tu conexión e inténtalo otra vez. Puedes seguir usando la guía.';
      submit.disabled = false;
    }
  });
  render();
  if (/^#paso-\d+$/.test(location.hash)) openStep(Number(location.hash.slice(6)), false);
  window.addEventListener('hashchange', () => { if (/^#paso-\d+$/.test(location.hash)) openStep(Number(location.hash.slice(6)), false); });
})();
