import './style.css';
import { bands, exercises } from './data.js';

const app = document.querySelector('#app');
let selected = exercises[0];
let selectedBand = bands[0];
let viewer;
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let playing = !motionPreference.matches;

app.innerHTML = `
  <header><a class="brand" href="./" aria-label="Band it, inicio">band<span>·</span>it</a><span class="header-note">MENOS EQUIPO. MÁS MOVIMIENTO.</span><a class="equipment-link" href="#equipo">Mi equipo <span>↗</span></a></header>
  <a class="skip-link" href="#exercise-name">Saltar a los pasos</a><main>
    <section class="intro"><div><p class="eyebrow">TU ESTUDIO DE MOVIMIENTO</p><h1>Haz más con<br>tus <em>bandas.</em></h1><p class="lead">Elige un ejercicio. Explora el movimiento.<br>Entrena con lo que ya tienes.</p></div><div class="intro-note"><span class="dot"></span> Bandas + agarraderas<br><small>Sin anclajes ni equipo adicional</small></div></section>
    <div class="workspace">
      <aside class="library"><div class="section-label">EXPLORA <span id="result-count" role="status" aria-live="polite"></span></div><label class="search-label" for="search">Buscar ejercicio</label><input id="search" type="search" placeholder="Buscar ejercicio…" /><div class="filters" role="group" aria-label="Filtrar por grupo muscular">${['Todos', ...new Set(exercises.map(e => e.group))].map((g, i) => `<button class="filter ${i === 0 ? 'active' : ''}" aria-pressed="${i === 0}" data-group="${g}">${g}</button>`).join('')}</div><div id="exercise-list"></div><button id="clear-filters" class="text-button" hidden>Limpiar búsqueda y filtros</button><p class="library-note">El apoyo depende del ejercicio: consulta sus pasos y el manual de tu banda.</p></aside>
      <section class="demo" aria-label="Demostración del ejercicio"><div class="demo-top"><span class="pill">MOVIMIENTO 3D</span><span id="muscle"></span></div><div id="viewport" role="img" aria-label="Modelo esquemático animado del ejercicio"><p id="loading" class="viewer-message">Preparando la demostración…</p></div><p id="viewer-status" class="viewer-caption" role="status">Modelo esquemático · No valida tu técnica ni simula la fuerza real.</p><p class="viewer-caption">Arrastra para girar o usa las vistas. El frente se identifica por la marca del pecho.</p><div class="camera-views" role="group" aria-label="Vistas de cámara"><button data-view="front">Frente</button><button data-view="side">Perfil</button><button data-view="perspective">Tres cuartos</button></div><div class="timeline"><label for="progress">Recorrer movimiento <span id="phase">Inicio</span></label><input id="progress" type="range" min="0" max="100" step="1" value="0" aria-label="Recorrer ciclo del movimiento" /><p id="motion-note">Puedes pausar y recorrer el ciclo sin animación automática.</p></div><div class="playback"><button id="play" aria-pressed="${playing}">${playing ? 'Pausar' : 'Reproducir'}</button><button id="reset">Restablecer vista</button><button id="zoom-in" aria-label="Acercar vista">+</button><button id="zoom-out" aria-label="Alejar vista">−</button><label>Velocidad <select id="speed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option></select></label></div></section>
      <section class="details" aria-labelledby="exercise-name"><p class="eyebrow">PASO A PASO</p><h2 id="exercise-name" tabindex="-1"></h2><p id="summary"></p><p id="support" class="support"></p><ol id="steps"></ol><h3>Tenlo presente</h3><div id="cues"></div><a id="source" class="source-link" target="_blank" rel="noopener noreferrer"></a><p class="model-limit">Figura simplificada: no representa todos los movimientos del hombro, los dedos ni la elasticidad de tu banda. Su recorrido no fija tu rango personal.</p></section>
    </div>
    <section class="equipment" id="equipo"><div><p class="eyebrow">TU EQUIPO</p><h2>Cinco bandas.<br>Muchas posibilidades.</h2><p>Elige el color que quieres ver en la demostración.</p></div><div><p id="band-status" role="status">Color visual: Amarilla · 10 lb nominales</p><div class="bands" role="group" aria-label="Color de banda en la demostración">${bands.map((b, i) => `<button class="band ${i === 0 ? 'selected' : ''}" data-band="${b.id}" aria-pressed="${i === 0}" style="--band:${b.color}"><span class="band-swatch"></span><strong>${b.lbs} <small>LB</small></strong><span>${b.name}</span></button>`).join('')}</div><p class="fine">Valores nominales de tus bandas. La resistencia cambia con el estiramiento; el color no es una recomendación de carga.</p></div></section>
    <section class="care"><span>↗</span><p><strong>Antes de empezar.</strong> Revisa banda, uniones y agarraderas. Písala de forma firme con calzado, si el fabricante permite ese uso. No uses puertas ni muebles como anclaje. Evita estirarla más de lo indicado por el fabricante y detente si aparece dolor. La animación es orientativa.</p></section>
  </main><footer><a class="brand" href="./">band<span>·</span>it</a><span>Tu equipo. Tu espacio. Tu ritmo.</span></footer>`;

let group = 'Todos';
function renderList() {
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();
  const query = normalize(document.querySelector('#search').value);
  const visible = exercises.filter(e => (group === 'Todos' || e.group === group) && normalize(`${e.name} ${e.keywords || ''}`).includes(query));
  document.querySelector('#result-count').textContent = `${visible.length} de ${exercises.length} ejercicios`;
  document.querySelector('#clear-filters').hidden = !query && group === 'Todos';
  document.querySelector('#exercise-list').innerHTML = visible.length ? visible.map(e => `<button class="exercise ${e.id === selected.id ? 'selected' : ''}" data-exercise="${e.id}" aria-pressed="${e.id === selected.id}"><span class="exercise-icon">${e.motion === 'curl' ? '↶' : e.motion === 'lateral' ? '↔' : '↑'}</span><span><small>${e.group}</small><strong>${e.name}</strong><span class="exercise-tag">Banda + agarraderas</span></span><span class="arrow">↗</span></button>`).join('') : '<p class="empty">No encontramos ejercicios. Prueba otro nombre o limpia los filtros. Los pasos del ejercicio seleccionado siguen disponibles.</p>';
}
function renderDetails() {
  document.querySelector('#exercise-name').textContent = selected.name;
  document.querySelector('#muscle').textContent = selected.group;
  document.querySelector('#summary').textContent = selected.summary;
  document.querySelector('#support').textContent = `${selected.equipment}. ${selected.support}`;
  const source = document.querySelector('#source');
  source.textContent = `Referencia: ${selected.source.label} ↗`; source.href = selected.source.url;
  document.querySelector('#steps').innerHTML = selected.steps.map(s => `<li>${s}</li>`).join('');
  document.querySelector('#cues').innerHTML = selected.cues.map(c => `<span class="cue">${c}</span>`).join('');
  document.querySelector('#viewport').setAttribute('aria-label', `Modelo esquemático: ${selected.name}. ${selected.steps.join(' ')}`);
  renderList();
}
document.querySelector('#exercise-list').addEventListener('click', event => {
  const button = event.target.closest('[data-exercise]');
  if (!button) return;
  selected = exercises.find(e => e.id === button.dataset.exercise);
  viewer?.setExercise(selected.motion);
  renderDetails();
  document.querySelector(`[data-exercise="${selected.id}"]`)?.focus({ preventScroll: true });
  if (matchMedia('(max-width: 700px)').matches) document.querySelector('.demo').scrollIntoView({ block: 'start' });
});
document.querySelector('#search').addEventListener('input', renderList);
document.querySelector('#clear-filters').addEventListener('click', () => {
  document.querySelector('#search').value = '';
  document.querySelector('[data-group="Todos"]').click();
  document.querySelector('#search').focus();
});
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  group = button.dataset.group;
  document.querySelectorAll('.filter').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  renderList();
}));
document.querySelectorAll('.band').forEach(button => button.addEventListener('click', () => {
  selectedBand = bands.find(b => b.id === button.dataset.band);
  viewer?.setColor(selectedBand.color);
  document.querySelector('#band-status').textContent = `Color visual: ${selectedBand.name} · ${selectedBand.lbs} lb nominales`;
  document.querySelectorAll('.band').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
}));
function setPlaying(value) {
  playing = value; viewer?.setPlaying(playing);
  const button = document.querySelector('#play');
  button.textContent = playing ? 'Pausar' : 'Reproducir';
  button.setAttribute('aria-pressed', String(playing));
}
document.querySelector('#play').addEventListener('click', () => setPlaying(!playing));
function updateProgress(value) {
  document.querySelector('#progress').value = Math.round(value * 100);
  document.querySelector('#phase').textContent = value < 0.02 || value > 0.98 ? 'Inicio' : value < 0.48 ? 'Ida' : value < 0.52 ? 'Extremo del recorrido' : 'Regreso';
}
document.querySelector('#progress').addEventListener('input', event => {
  setPlaying(false); const value = Number(event.target.value) / 100;
  viewer?.setProgress(value); updateProgress(value);
});
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => viewer?.view(button.dataset.view)));
function updateMotionPreference() {
  if (motionPreference.matches) setPlaying(false);
  document.querySelector('#motion-note').textContent = motionPreference.matches
    ? 'Movimiento reducido activo: empieza en pausa. Reproduce solo si lo deseas, o recorre el ciclo manualmente.'
    : 'Puedes pausar y recorrer el ciclo sin animación automática.';
}
motionPreference.addEventListener('change', updateMotionPreference);
updateMotionPreference();
document.querySelector('#reset').addEventListener('click', () => viewer?.reset());
document.querySelector('#zoom-in').addEventListener('click', () => viewer?.zoom(0.85));
document.querySelector('#zoom-out').addEventListener('click', () => viewer?.zoom(1.15));
document.querySelector('#speed').addEventListener('change', event => viewer?.setSpeed(Number(event.target.value)));
renderDetails();

const viewerControls = document.querySelectorAll('.playback button, .playback select, .camera-views button, #progress');
// El módulo 3D puede tardar en llegar: no aceptar acciones que se perderían al crearlo.
viewerControls.forEach(el => { el.disabled = true; });
try {
  const { createViewer } = await import('./viewer.js');
  const setAvailability = available => {
    document.querySelector('.demo').classList.toggle('unavailable', !available);
    document.querySelectorAll('.playback button, .playback select, .camera-views button, #progress').forEach(el => { el.disabled = !available; });
    document.querySelector('#viewer-status').textContent = available
      ? 'Modelo esquemático · No valida tu técnica ni simula la fuerza real.'
      : 'La vista 3D se interrumpió. Los pasos siguen disponibles debajo. Recarga si no se recupera.';
  };
  viewer = createViewer(document.querySelector('#viewport'), {
    playing, color: selectedBand.color, motion: selected.motion, onProgress: updateProgress,
    onUnavailable: () => setAvailability(false), onAvailable: () => setAvailability(true),
  });
  viewer.setSpeed(Number(document.querySelector('#speed').value));
  setAvailability(true);
  document.querySelector('#loading')?.remove();
} catch (error) {
  setPlaying(false);
  document.querySelector('.demo').classList.add('unavailable');
  document.querySelector('#viewport').removeAttribute('role');
  document.querySelector('#loading').textContent = 'La vista 3D no está disponible en este navegador. Puedes consultar los pasos del ejercicio.';
  document.querySelectorAll('.playback button, .playback select, .camera-views button, #progress').forEach(el => { el.disabled = true; });
  document.querySelector('#viewer-status').textContent = 'Modo textual · Instrucciones completas disponibles debajo.';
  console.warn('No se pudo iniciar la vista 3D', error);
}
window.addEventListener('pagehide', event => { if (!event.persisted) viewer?.dispose(); });
