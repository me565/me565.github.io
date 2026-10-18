/* Draws the game map: one diagram per stage, read straight from the stage files, so it can never disagree with the game.
   Each room is a box with its four walls round it in turning order (first view at the top, then clockwise); every door is an arrow
   from the wall it is on to the room it leads to, labelled with the wall you arrive facing. Writes tools/map.html.
   Run: node tools/map.js */
const fs = require('fs'), vm = require('vm');
const STAGES = [['school', 'Mary 1: last day of school'], ['school3', 'Mary 1, version 3: The Last Bell (greybox)'], ['packing', 'Mary 2: packing day'], ['flight', 'Mary 3: the flight'], ['nana', 'Mary 4: Nana and Jedi’s'], ['park', 'Mary 5: Trent Park'], ['eschool', 'Elliot 1: last day of school'], ['zschool', 'Zaina 1: the goodbye party']];
const noop = () => {};
function load(st){
  const src = fs.readFileSync(`${__dirname}/../next/landscape/stages/${st}.js`, 'utf8');
  const ctx = {S:{got:[], seen:{}, moths:[], packed:[], placed:[], cogs:[], put:[], hint:{}, cdials:[0,0,0], xw:[null,null,null,null], time:null, dials:[0,0,0,0], cipher:[null,null,null,null], lifted:[]}, registerStage:(k, s) => { ctx.STAGE = s; }, save:noop, render:noop, say:noop, sfx:noop, openCloseup:noop, closeCloseup:noop, openNote:noop, openPic:noop, animate:noop, showEnd:noop, drop:noop, go:noop, chime:noop, $:() => ({querySelectorAll:() => [], querySelector:() => null, onclick:null, innerHTML:''}), BUILD:'map', document:{createElement:() => ({style:{}, classList:{add:noop, toggle:noop}, appendChild:noop, querySelectorAll:() => []}), querySelectorAll:() => [], querySelector:() => null, getElementById:() => null}, setTimeout:noop, matchMedia:() => ({matches:false}), openDrag:noop, openAside:noop, openLiftPull:noop, useItem:noop, speak:noop, tip:noop, performance:{now:() => 0}, requestAnimationFrame:noop, console};
  vm.createContext(ctx); vm.runInContext(src, ctx); return ctx.STAGE;
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
function diagram(key, title, s){
  const rooms = Object.entries(s.rooms); const byView = {}; rooms.forEach(([r, o]) => o.views.forEach(v => { byView[v] = r; }));
  /* doors: id -> [room, view]; the wall a door is on is the view whose hotspots hold it */
  const doors = []; Object.entries(s.hots).forEach(([v, list]) => list.forEach(h => { if (s.doors[h.id]) doors.push({id:h.id, from:byView[v], wall:v, label:h.label, to:s.doors[h.id][0], arrive:s.rooms[s.doors[h.id][0]].views[s.doors[h.id][1]]}); }));
  /* layout: breadth-first from the start room, one column per step, so the way in reads left to right */
  const start = s.start.room; const level = {[start]:0}; const q = [start];
  while (q.length){ const r = q.shift(); doors.filter(d => d.from === r && !(d.to in level)).forEach(d => { level[d.to] = level[r] + 1; q.push(d.to); }); }
  rooms.forEach(([r]) => { if (!(r in level)) level[r] = Math.max(0, ...Object.values(level)) + 1; });
  const cols = {}; rooms.forEach(([r]) => { (cols[level[r]] = cols[level[r]] || []).push(r); });
  const BW = 150, BH = 110, GX = 150, GY = 60, PAD = 60;
  const pos = {}; Object.entries(cols).forEach(([c, list]) => { const tallest = Math.max(...Object.values(cols).map(l => l.length)); const y0 = PAD + ((tallest - list.length)*(BH + GY))/2; list.forEach((r, i) => { pos[r] = {x:PAD + c*(BW + GX), y:y0 + i*(BH + GY)}; }); });
  const W = PAD*2 + (Object.keys(cols).length)*(BW + GX) - GX, H = PAD*2 + Math.max(...Object.values(cols).map(l => l.length))*(BH + GY) - GY;
  /* a wall's anchor point on its box: first view top, second right, third bottom, fourth left */
  const anchor = (r, v) => { const i = s.rooms[r].views.indexOf(v), p = pos[r]; return [[p.x + BW/2, p.y], [p.x + BW, p.y + BH/2], [p.x + BW/2, p.y + BH], [p.x, p.y + BH/2]][Math.min(i, 3)]; };
  let out = `<h2>${esc(title)}</h2><p class="note">Start: ${esc(s.rooms[start].name)}, facing ${esc(s.rooms[start].views[s.start.view])}.${s.moves ? ' ' + esc(s.moves) : ''}</p><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Map of ${esc(title)}"><defs><marker id="a-${key}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#5a4a3a"/></marker></defs>`;
  doors.forEach(d => { const [x1, y1] = anchor(d.from, d.wall); const p = pos[d.to]; const x2 = Math.max(p.x, Math.min(p.x + BW, x1)), y2 = Math.max(p.y, Math.min(p.y + BH, y1));
    const tx = x2 === p.x ? p.x : x2 === p.x + BW ? p.x + BW : x2, ty = y2 === p.y ? p.y : y2 === p.y + BH ? p.y + BH : y2;
    const mx = (x1 + tx)/2, my = (y1 + ty)/2, dx = tx - x1, dy = ty - y1, len = Math.hypot(dx, dy) || 1, cx = mx - dy/len*24, cy = my + dx/len*24;
    out += `<path d="M${x1} ${y1} Q${cx} ${cy} ${tx} ${ty}" fill="none" stroke="#5a4a3a" stroke-width="1.6" marker-end="url(#a-${key})"/><text x="${cx}" y="${cy}" font-size="9" text-anchor="middle" fill="#8a5a1a" stroke="#fff8ec" stroke-width="3" paint-order="stroke">${esc(d.wall)} → ${esc(d.arrive)}</text>`; });
  rooms.forEach(([r, o]) => { const p = pos[r]; const v = o.views; out += `<rect x="${p.x}" y="${p.y}" width="${BW}" height="${BH}" rx="10" fill="${r === start ? '#fff1c4' : '#fff8ec'}" stroke="#2b2836" stroke-width="1.5"/><text x="${p.x + BW/2}" y="${p.y + BH/2 + 4}" font-size="13" font-weight="700" text-anchor="middle" fill="#2b2836">${esc(o.name)}</text>`;
    [[p.x + BW/2, p.y + 12, 'middle'], [p.x + BW - 6, p.y + BH/2 + 4, 'end'], [p.x + BW/2, p.y + BH - 5, 'middle'], [p.x + 6, p.y + BH/2 + 4, 'start']].forEach(([x, y, a], i) => { if (v[i]) out += `<text x="${x}" y="${y}" font-size="10" text-anchor="${a}" fill="#6a5a4a">${esc(v[i])}</text>`; }); });
  out += '</svg>';
  out += `<table><tr><th>Door</th><th>On wall</th><th>Leads to</th><th>Arrive facing</th></tr>${doors.map(d => `<tr><td>${esc(d.label)} <code>${esc(d.id)}</code></td><td>${esc(s.rooms[d.from].name)} · ${esc(d.wall)}</td><td>${esc(s.rooms[d.to].name)}</td><td>${esc(d.arrive)}</td></tr>`).join('')}</table>`;
  return out;
}
let html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Moth House: game map</title>
<style>body{font:15px/1.4 Georgia,serif;background:#fff8ec;color:#2b2836;margin:0;padding:20px 24px;max-width:1400px}h1{font-size:24px}h2{font-size:19px;margin:36px 0 4px;border-top:1px solid #d9ccb0;padding-top:16px}.note{color:#6a5a4a;font-size:13px;margin:0 0 10px}svg{display:block;max-width:100%;height:auto;background:#fffdf7;border:1px solid #e6dcc8;border-radius:8px}table{border-collapse:collapse;font-size:12px;margin-top:8px}td,th{border:1px solid #d9ccb0;padding:3px 8px;text-align:left}code{color:#8a5a1a}
.key{font-size:13px;color:#6a5a4a}</style></head><body><h1>The Moth House: game map</h1><p class="key">Drawn by <code>tools/map.js</code> from the stage files, so it always matches the game. Each box is a room; the four words round it are its walls in turning order, the first at the top then clockwise; the starting room is gold. Each arrow is a door, from the wall it is on to the room it opens into, labelled with the wall you arrive facing.</p>`;
STAGES.forEach(([k, t]) => { try { html += diagram(k, t, load(k)); } catch(e){ html += `<h2>${esc(t)}</h2><p>Could not read: ${esc(e.message)}</p>`; } });
html += '</body></html>';
fs.writeFileSync(`${__dirname}/map.html`, html); console.log('wrote tools/map.html');
