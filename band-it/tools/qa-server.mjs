// Solo para QA local del build. No forma parte de dist ni del producto desplegado.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const script = `<script>
const mode = new URL(location.href).searchParams.get('qa');
let reducedQuery;
if (mode === 'no-webgl') {
  const getContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(type, ...args) {
    return /webgl/.test(type) ? null : getContext.call(this, type, ...args);
  };
}
if (mode === 'reduced') {
  const original = window.matchMedia.bind(window);
  window.matchMedia = query => query.includes('prefers-reduced-motion')
    ? (reducedQuery ||= Object.assign(new EventTarget(), { matches: true, media: query })) : original(query);
}
if (mode === 'audit' || mode === 'reduced') addEventListener('load', () => {
  const panel = document.createElement('aside');
  panel.id = 'qa-panel';
  panel.style = 'position:fixed;top:0;right:0;z-index:100;background:#fff;color:#000;padding:8px;max-width:90vw;font:12px monospace';
  const output = document.createElement('pre'); output.id = 'qa-report';
  output.style = 'white-space:pre-wrap;max-height:35vh;overflow:auto';
  const button = document.createElement('button'); button.textContent = 'Medir 2 segundos';
  const frames = [];
  let measuring = false;
  const clear = WebGL2RenderingContext.prototype.clear;
  WebGL2RenderingContext.prototype.clear = function(...args) {
    if (measuring) frames.push(performance.now()); return clear.apply(this, args);
  };
  button.onclick = () => {
    frames.length = 0; measuring = true;
    const start = Number(document.querySelector('#progress').value);
    const begin = performance.now(); button.disabled = true;
    setTimeout(() => {
      measuring = false;
      const intervals = frames.slice(1).map((t, i) => t - frames[i]).sort((a,b) => a-b);
      output.textContent = JSON.stringify({
        viewport: [innerWidth, innerHeight], hidden: document.hidden,
        durationMs: Math.round(performance.now() - begin), renders: frames.length,
        medianMs: Math.round(intervals[Math.floor(intervals.length / 2)] || 0),
        p95Ms: Math.round(intervals[Math.floor(intervals.length * .95)] || 0),
        progress: [start, Number(document.querySelector('#progress').value)],
        resources: performance.getEntriesByType('resource').map(r => ({name:r.name.split('/').pop(), bytes:r.encodedBodySize, ms:Math.round(r.duration)})),
        domReadyMs: Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd),
      }, null, 2); button.disabled = false;
    }, 2000);
  };
  panel.append(button);
  if (mode === 'reduced') {
    const toggle = document.createElement('button'); toggle.textContent = 'Alternar movimiento reducido';
    toggle.onclick = () => { reducedQuery.matches = !reducedQuery.matches; reducedQuery.dispatchEvent(new Event('change')); };
    panel.append(toggle);
  }
  panel.append(output); document.body.append(panel);
});
if (mode === 'context') addEventListener('load', () => {
  const panel = document.createElement('div');
  panel.style = 'position:fixed;top:0;right:0;z-index:100;background:#fff;color:#000;padding:8px';
  panel.textContent = 'QA local: ';
  let extension;
  for (const [label, action] of [['Perder contexto', () => {
    extension = document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context');
    extension.loseContext();
  }], ['Recuperar contexto', () => extension.restoreContext()]]) {
    const button = document.createElement('button'); button.textContent = label;
    button.onclick = action; panel.append(button);
  }
  document.body.append(panel);
});
</script>`;
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1');
    const path = resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!path.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    let body = await readFile(path);
    if (extname(path) === '.html') body = body.toString().replace('<head>', '<head>' + script);
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(body);
  } catch { response.writeHead(404).end(); }
}).listen(4174, '127.0.0.1', () => console.log('QA local: http://127.0.0.1:4174/?qa=reduced | no-webgl | context'));
