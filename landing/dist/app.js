'use strict';
(() => {
  const key = 'solanch-instalacion-2026-v1';
  const boxes = [...document.querySelectorAll('[data-station]')];
  let done = [], storageOK = true, toastTimer;
  try { const saved = JSON.parse(localStorage.getItem(key) || '[]'); if (Array.isArray(saved)) done = [...new Set(saved.filter(n => Number.isInteger(n) && n >= 1 && n <= 8))]; } catch { storageOK = false; }
  function toast(message) { const el = document.getElementById('toast'); el.textContent = message; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 3200); }
  function render() {
    boxes.forEach(box => { box.checked = done.includes(Number(box.dataset.station)); box.closest('.station').classList.toggle('finished', box.checked); });
    document.getElementById('done-count').textContent = String(done.length);
    document.getElementById('route-progress').value = done.length;
    document.getElementById('progress-message').textContent = done.length === 8 ? 'Tu instalación y primer video están completos.' : done.length ? `Te esperan ${8 - done.length} pasos.` : 'Comienza por tu asistente.';
    document.getElementById('completion').hidden = done.length !== 8;
    document.getElementById('storage-message').textContent = storageOK ? 'Tu avance se guarda en este navegador.' : 'Este navegador no permite guardarlo: el avance durará esta visita.';
  }
  function save() { try { localStorage.setItem(key, JSON.stringify(done)); } catch { storageOK = false; } render(); }
  boxes.forEach(box => box.addEventListener('change', () => { const n = Number(box.dataset.station); done = box.checked ? [...new Set([...done, n])] : done.filter(v => v !== n); save(); }));
  document.getElementById('reset-route').addEventListener('click', () => document.getElementById('reset-dialog').showModal());
  document.getElementById('reset-dialog').addEventListener('close', event => { if (event.target.returnValue === 'reset') { done = []; save(); toast('Tus pasos están listos para empezar.'); } });
  document.querySelectorAll('.copy').forEach(button => button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(button.parentElement.querySelector('p').textContent); toast('Instrucción copiada. Pégala en tu asistente.'); } catch { toast('Selecciona el texto para copiarlo en tu dispositivo.'); } }));
  const form = document.getElementById('registration-form');
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const button = form.querySelector('button[type=submit]'), status = form.querySelector('.form-status');
    button.disabled = true; status.textContent = 'Enviando tu registro…';
    try { const body = new URLSearchParams(new FormData(form)); const response = await fetch('/', { method: 'POST', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: body.toString() }); if (!response.ok) throw new Error(); location.assign('/gracias/'); }
    catch { button.disabled = false; status.textContent = 'No se pudo enviar. Revisa tu conexión e inténtalo otra vez. La guía sigue disponible.'; }
  });
  function openHash() { if (/^#paso-[1-8]$/.test(location.hash)) { const el = document.querySelector(location.hash); if (el) el.open = true; } }
  document.querySelectorAll('a[href^="#paso-"]').forEach(a => a.addEventListener('click', () => { const el = document.querySelector(a.getAttribute('href')); if (el) el.open = true; })); window.addEventListener('hashchange', openHash); render(); openHash();
})();
