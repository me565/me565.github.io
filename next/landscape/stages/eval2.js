/* The Moth House, landscape engine: the second test level, "Packing Day, from scratch" (levels/LEVEL-eval2.md), not a level of any
   child's story. Mary's room, the corridor and Elliot and Zaina's room, drawn by GPT Image 2.5 Sunburst on 25 Oct 2026 from
   evals/images/rooms/{mary-room,flat-corridor,kids-room}.json and passed by the owner ("Walls pass", 25 Oct 2026).
   This is the first playable (Gate C, playbook 4ac): the real puzzle, hints, saves, doors and ending on the twelve real walls, with
   labelled stand-ins drawn by the game for every picture that does not exist yet (the case, the whiteboard, the organiser,
   the drawing, the winter box, the doll's house lock and inside, every icon). Gate D replaces them.
   The engine is frozen, so every reward moment is drawn here. Open with ?stage=eval2. */
'use strict';
registerStage('eval2', (function(){
const A = '../art/eval2/';
const ROOMS = {
  mary:{name:'Mary’s room', into:'Mary’s room', views:['m3', 'm2', 'm1', 'm4']}, /* turning right: sofa (north), window (east), loft (south), door (west) */
  corridor:{name:'The corridor', into:'the corridor', views:['c4', 'c1', 'c2', 'c3']}, /* west (opposite Mary's door), north (the children's door), east (Mary's door), south (the dining end) */
  kids:{name:'Elliot and Zaina’s room', into:'Elliot and Zaina’s room', views:['k1', 'k2', 'k3', 'k4']} /* window (north), bunk (east), door (south), cubes (west) */
};
const WALLS = Object.fromEntries(['m1', 'm2', 'm3', 'm4', 'c1', 'c2', 'c3', 'c4', 'k1', 'k2', 'k3', 'k4'].map(k => [k, A + k + '.jpg']));
const DOORS = {e2_mdoor:['corridor', 0], e2_cmdoor:['mary', 1], e2_kdoor:['corridor', 3], e2_ckdoor:['kids', 0]}; /* each arrives facing away from the door (the level file's map) */

/* ---------- the puzzle's facts, all drawn by the game ---------- */
const KEYS = { /* Zaina's toy piano, left to right: colour, shape sticker, note (the shapes are for colour-blind players, MECH-112) */
  red:{c:'#d8423a', s:'heart', f:262}, orange:{c:'#ef8a2c', s:'sun', f:294}, yellow:{c:'#f2c230', s:'star', f:330}, green:{c:'#3f9d4a', s:'leaf', f:349},
  blue:{c:'#3a72c4', s:'moon', f:392}, indigo:{c:'#4b3f9e', s:'fish', f:440}, violet:{c:'#9b59b6', s:'flower', f:494}, pink:{c:'#ef8fb5', s:'cloud', f:523}};
const ORDER = Object.keys(KEYS);
const VERSE = ['yellow', 'yellow', 'green', 'blue']; /* the first line of the sheet: what Zaina plays before the trade (the decoy) */
const CHORUS = ['blue', 'red', 'red', 'green']; /* "everyone sings": what she plays after it, and the lock's answer */
const BUTTONS = ['red', 'yellow', 'green', 'blue']; /* Elliot's four felt-tip buttons, left to right (the second trap) */
const LIST = [['carol', 'the carol'], ['hat', 'hat + gloves'], ['present', 'Nana’s present'], ['passport', 'passport']]; /* the whiteboard, in Mary's order */
const FONT = 'Atkinson Hyperlegible,Verdana,sans-serif', HAND = 'Caprasimo,Georgia,serif';
const taken = k => !!(S.taken && S.taken[k]);
const take = k => { if (!S.taken) S.taken = {}; S.taken[k] = true; if (!S.got.includes(k)) S.got.push(k); save(); };
const packed = k => !!(S.packed && S.packed[k]);
const nPacked = () => LIST.filter(([k]) => packed(k)).length;
const reduce = () => matchMedia('(prefers-reduced-motion:reduce)').matches;
const note = f => { if (vol.fx && audio()){ if (AC.state !== 'running') AC.resume(); tone(f, 'triangle', .28, .01, .45); tone(f*2, 'sine', .06, .01, .3); } };

/* the shape stickers, drawn in a 10×10 box */
function shape(s, fill = '#fff'){
  const p = {
    heart:'<path d="M5 8.6 1.6 5.2C.4 4 .8 1.9 2.6 1.6 3.7 1.4 4.5 2 5 2.8 5.5 2 6.3 1.4 7.4 1.6 9.2 1.9 9.6 4 8.4 5.2Z"/>',
    sun:'<circle cx="5" cy="5" r="2.2"/><g stroke-width=".9" stroke="FILL">' + [0, 45, 90, 135, 180, 225, 270, 315].map(a => { const r = a*Math.PI/180; return `<line x1="${5 + 3*Math.cos(r)}" y1="${5 + 3*Math.sin(r)}" x2="${5 + 4.4*Math.cos(r)}" y2="${5 + 4.4*Math.sin(r)}"/>`; }).join('') + '</g>',
    star:'<path d="M5 .6 6.3 3.6 9.5 3.9 7.1 6 7.8 9.2 5 7.5 2.2 9.2 2.9 6 .5 3.9 3.7 3.6Z"/>',
    leaf:'<path d="M1.4 8.6C1 4.4 3.6 1.4 8.8 1.2 8.8 6 6 8.8 1.4 8.6Z"/><path d="M1.4 8.6 6.4 3.6" stroke="#0004" stroke-width=".5"/>',
    moon:'<path d="M6.6 1.2A4 4 0 1 0 8.9 7.4 3.3 3.3 0 1 1 6.6 1.2Z"/>',
    fish:'<path d="M1 5C2.4 2.6 5.6 2.4 7.2 5 5.6 7.6 2.4 7.4 1 5Z"/><path d="M7 5 9.4 3V7Z"/>',
    flower:[[5, 2.4], [7.5, 4.2], [6.6, 7.2], [3.4, 7.2], [2.5, 4.2]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7"/>`).join('') + '<circle cx="5" cy="5" r="1.3" fill="#ffe07a"/>',
    cloud:'<circle cx="3.4" cy="5.6" r="2"/><circle cx="5.4" cy="4.4" r="2.4"/><circle cx="7.2" cy="5.8" r="1.8"/><rect x="3.2" y="5.6" width="4.4" height="2" />'
  }[s];
  return `<g fill="${fill}">${p.replace('FILL', fill)}</g>`;
}
const keySvg = (k, cls = '', extra = '') => `<svg viewBox="0 0 10 10" class="${cls}" ${extra} aria-hidden="true"><circle cx="5" cy="5" r="4.8" fill="${KEYS[k].c}" stroke="#2b2836" stroke-width=".35"/><g transform="translate(2 2) scale(.6)">${shape(KEYS[k].s)}</g></svg>`;

/* ---------- stand-ins: labelled boxes where a picture will be (Gate D draws them) ---------- */
(function(){ const st = document.createElement('style'); st.textContent = `
.e2sb{position:absolute;box-sizing:border-box;border:2px dashed rgba(43,40,54,.7);border-radius:calc(var(--u)*.5);background:rgba(251,244,226,.88);color:#2b2836;font:700 calc(var(--u)*1.15)/1.15 ${FONT};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:.2em;pointer-events:none;overflow:hidden}
.e2sb small{display:block;font-weight:400;font-size:.8em;opacity:.75}
.e2ic{position:absolute;inset:10%;display:flex;align-items:center;justify-content:center;text-align:center;border-radius:calc(var(--u)*.6);font:700 calc(var(--u)*1.2)/1.1 ${FONT};color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5);border:2px solid rgba(0,0,0,.25)}
.e2dot{position:absolute;width:1.1%;aspect-ratio:1;border-radius:50%;pointer-events:none}
.e2dot.on{animation:e2tw 1.6s ease-in-out infinite;box-shadow:0 0 calc(var(--u)*.8) currentColor}
@keyframes e2tw{0%,100%{opacity:1}50%{opacity:.35}}
.e2win{position:absolute;pointer-events:none;background:radial-gradient(rgba(255,226,140,.95),rgba(255,200,90,.55));border-radius:40% 40% 8% 8%;opacity:0}
.e2win.lit{opacity:1}.e2win.go{animation:e2lit .5s ease-out forwards}
@keyframes e2lit{from{opacity:0}to{opacity:1}}
.e2key{position:absolute;bottom:6%;height:62%;border-radius:0 0 calc(var(--u)*.6) calc(var(--u)*.6);border:2px solid #2b2836;display:flex;align-items:flex-end;justify-content:center;transition:transform .12s,filter .12s}
.e2key svg{width:70%;margin-bottom:12%}
.e2key.lit{transform:translateY(6%);filter:brightness(1.35) drop-shadow(0 0 calc(var(--u)*1.2) #fff6c0)}
.e2btn{position:absolute;border-radius:50%;border:2px solid #2b2836;cursor:pointer;padding:0;background:#fff;display:grid;place-items:center}
.e2btn svg{width:100%;height:100%}
.e2btn.flash{animation:e2fl .35s ease-out}
@keyframes e2fl{50%{transform:scale(1.18);filter:brightness(1.4)}}
@media (prefers-reduced-motion:reduce){.e2dot.on,.e2win.go,.e2btn.flash{animation:none}.e2win.go{opacity:1}}
`; document.head.appendChild(st); })();
const sb = (l, t, w, h, label, small = '', more = '') => `<div class="e2sb" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%;${more}">${label}${small ? `<small>${small}</small>` : ''}</div>`;
const ov = html => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;pointer-events:none'; d.innerHTML = html; return d; };
const icon = (bg, label) => `<span class="e2ic" style="background:${bg}">${label}</span>`;

/* ---------- tap targets, in picture percentages ---------- */
const HOTS = {
  m3:[
    {id:'e2_board', l:43, t:41, w:15, h:24, label:'Mary’s whiteboard', key:true, sound:'paper'},
    {id:'e2_case', l:58, t:43, w:20, h:27, label:'Mary’s case', sound:'open'},
    {id:'e2_cushions', l:30, t:48, w:12, h:17, label:'Cushions', sound:'tap'},
    {id:'e2_poster', l:17, t:6, w:15, h:41, label:'Planets poster', sound:'paper'},
    {id:'e2_print', l:47, t:17, w:12, h:17, label:'Framed print', sound:'tap'},
    {id:'e2_leaf', l:7.5, t:11, w:8, h:68, label:'Mary’s door, open against the wall', sound:'knock'}],
  m2:[
    {id:'e2_folder', l:14, t:35, w:12, h:16, label:'Blue folder on the music stand', sound:'paper'},
    {id:'e2_lights', l:16, t:52, w:9, h:30, label:'Pompom lights on the stand', sound:'tick'},
    {id:'e2_window', l:37, t:5, w:27, h:34, label:'Window', sound:'tap'},
    {id:'e2_ledge', l:37, t:39, w:26, h:11, label:'Books and photos on the ledge', sound:'tap'},
    {id:'e2_mladder', l:84, t:3, w:9, h:82, label:'Loft ladder', sound:'knock'}],
  m1:[
    {id:'e2_loftbed', l:22, t:4, w:64, h:24, label:'Mary’s loft bed', sound:'leaf'},
    {id:'e2_ladder1', l:12, t:4, w:9, h:58, label:'Loft ladder', sound:'knock'},
    {id:'e2_cubes', l:31, t:31, w:16, h:50, label:'Cube shelves', sound:'knock'},
    {id:'e2_tub', l:20.5, t:60, w:11.5, h:11, label:'A plastic tub', sound:'knock', anim:'lift', layer:'tub', hideWhen:() => S.tubMoved},
    {id:'e2_bath', l:19, t:71, w:14, h:12, label:'Zaina’s old baby bath', sound:'knock', anim:'lift', layer:'bath', hideWhen:() => S.bathMoved},
    {id:'e2_stool', l:20, t:64, w:11, h:18, label:'A step stool', key:true, sound:'knock', showWhen:() => S.tubMoved && S.bathMoved && !taken('stool')},
    {id:'e2_drawing', l:56, t:32, w:10, h:15, label:'Framed drawing', key:true, sound:'paper', hideWhen:() => taken('drawing')},
    {id:'e2_postcard', l:50.5, t:36, w:5, h:8, label:'Postcard', sound:'paper'},
    {id:'e2_canvases', l:66, t:35, w:14, h:12, label:'Family pictures', sound:'tap'},
    {id:'e2_penpot', l:72.5, t:46, w:5.5, h:8, label:'Pen pot', sound:'tick'},
    {id:'e2_mug', l:78, t:45, w:5, h:9, label:'Mug of paintbrushes', sound:'tick'},
    {id:'e2_chair', l:55, t:52, w:15, h:32, label:'Desk chair', sound:'tap'},
    {id:'e2_dtop', l:75.5, t:56, w:9, h:6, label:'Top drawer', sound:'open'},
    {id:'e2_dmid', l:75.5, t:62, w:9, h:6, label:'Middle drawer', sound:'open'},
    {id:'e2_dbot', l:75.5, t:68, w:9, h:6, label:'Bottom drawer', sound:'open'},
    {id:'e2_organiser', l:84, t:30, w:8, h:21, label:'Pocket organiser', key:true, sound:'leaf'}],
  m4:[
    {id:'e2_wardrobe', l:32, t:4, w:25, h:79, label:'Wardrobe', sound:'knock'},
    {id:'e2_mdoor', l:66, t:12, w:24, h:70, label:'Door to the corridor', sound:'knock'},
    {id:'e2_mnotes', l:59.5, t:34, w:6.5, h:18, label:'Pinned-up pictures', sound:'paper'},
    {id:'e2_aircon', l:65, t:2, w:19, h:9, label:'Air conditioner', sound:'tap'}],
  c4:[
    {id:'e2_cwall', l:15, t:8, w:70, h:20, label:'The corridor wall', sound:'tap'},
    {id:'e2_switch', l:47.5, t:31, w:6, h:9, label:'Light switch', sound:'tick'}],
  c1:[
    {id:'e2_ckdoor', l:37, t:6, w:24, h:72, label:'Door to Elliot and Zaina’s room', sound:'knock'}],
  c2:[
    {id:'e2_cmdoor', l:22, t:7, w:20, h:71, label:'Door to Mary’s room', sound:'knock'},
    {id:'e2_cpic', l:45.5, t:22, w:8, h:16, label:'Framed picture', sound:'tap'},
    {id:'e2_cdoor2', l:56, t:6, w:21, h:72, label:'Bathroom door', sound:'knock'}],
  c3:[
    {id:'e2_ddoors', l:26, t:6, w:33, h:72, label:'Double doors', sound:'knock'},
    {id:'e2_cturn', l:73, t:6, w:17, h:74, label:'The dining end', sound:'tap'}],
  k1:[
    {id:'e2_kwindow', l:21, t:5, w:46, h:75, label:'Window and balcony door', sound:'tap'},
    {id:'e2_armchair', l:56, t:57, w:20, h:30, label:'Little armchair', sound:'tap'}],
  k2:[
    {id:'e2_zaina', l:44.5, t:48, w:11, h:24, label:'Zaina', key:true, sound:'squeak'},
    {id:'e2_piano', l:46.5, t:63.5, w:7.5, h:6, label:'Zaina’s toy piano', key:true, sound:'tick'},
    {id:'e2_trundle', l:20, t:74, w:56, h:10, label:'Trundle drawer under the bunk', key:true, sound:'open'},
    {id:'e2_toys', l:30, t:21, w:30, h:12, label:'Soft toys on the top bunk', sound:'squeak'},
    {id:'e2_topbunk', l:30, t:33, w:46, h:8, label:'Elliot’s bunk', sound:'leaf'},
    {id:'e2_kcanvases', l:36, t:5, w:19, h:18, label:'Family pictures', sound:'tap'},
    {id:'e2_kprint', l:57, t:7, w:8, h:15, label:'Print with bunting', sound:'paper'}],
  k3:[
    {id:'e2_kdoor', l:18, t:6, w:18, h:74, label:'Door to the corridor', sound:'knock'},
    {id:'e2_bells', l:36, t:2, w:5, h:66, label:'Elephants and bells', sound:'tick'},
    {id:'e2_kitchen', l:41, t:34, w:18, h:48, label:'Toy kitchen', sound:'knock'},
    {id:'e2_pockets', l:60, t:11, w:15, h:39, label:'Hanging pockets with soft toys', sound:'leaf'},
    {id:'e2_bricks', l:62, t:66, w:28, h:18, label:'Toys and bricks', sound:'knock'}],
  k4:[
    {id:'e2_house', l:17.5, t:27, w:17, h:57, label:'Zaina’s doll’s house', sound:'knock'},
    {id:'e2_enote', l:22.5, t:56.5, w:9, h:7, label:'Elliot’s note', key:true, sound:'paper'},
    {id:'e2_dlock', l:22.5, t:64, w:8.5, h:10, label:'Elliot’s cardboard lock', key:true, sound:'tick', hideWhen:() => S.houseOpen},
    {id:'e2_passport', l:21, t:66, w:11, h:12, label:'The passport on the tiny bed', key:true, sound:'paper', showWhen:() => S.houseOpen && !taken('passport')},
    {id:'e2_kcubes', l:37, t:19, w:37, h:66, label:'Cube shelves', sound:'knock'},
    {id:'e2_ktoys', l:37, t:3, w:37, h:15, label:'Toys on top of the shelves', sound:'squeak'}]
};
/* the samples (Gate E, 25 Oct 2026): Zaina, the bath and the tub, the stool lifted from m1 with the patch behind it (the m1 edit), the passport */
const CUT = {bath:{l:19.5, t:71.5, w:13, h:11.7}, tub:{l:21, t:61, w:10.5, h:12.11}, bathAside:{l:1, t:76, w:12, h:10.8}, tubAside:{l:3, t:64.5, w:9, h:10.38},
  stool:{l:21.09, t:65.28, w:9.77, h:17.25}, patch:{l:19.99, t:63.31, w:11.98, h:21.18}, zaina:{l:45.5, t:49, w:9, h:23}}; /* sized against the bunk: a four-year-old sitting is about 58 cm, the bed 180 cm */
const lay = (src, c, more = {}) => Object.assign({src:A + src, l:c.l, t:c.t, w:c.w, h:c.h}, more);
const LAYERS = {
  m1:[lay('layer-stoolpatch.png', CUT.patch, {showWhen:() => taken('stool')}), /* the floor and wall where the stool stood, from the m1 edit */
    lay('layer-bath.png', CUT.bath, {group:'bath', shadow:.6, hideWhen:() => S.bathMoved}), lay('layer-bath.png', CUT.bathAside, {shadow:.6, showWhen:() => S.bathMoved}),
    lay('layer-tub.png', CUT.tub, {group:'tub', shadow:.5, hideWhen:() => S.tubMoved}), lay('layer-tub.png', CUT.tubAside, {shadow:.5, showWhen:() => S.tubMoved})],
  m4:[lay('layer-stool.png', {l:40, t:66, w:9.77, h:17.25}, {shadow:.6, showWhen:() => S.stoolAt})], /* the same stool, stood at the wardrobe's foot */
  k2:[lay('layer-zaina.png', CUT.zaina, {group:'zaina', shadow:.5, idle:'breathe', amount:.012, period:2.6})],
  m2:[{draw:'rain', l:37, t:6, w:27, h:68, count:16, hideWhen:() => S.wiped}],
  k1:[{draw:'rain', l:21, t:6, w:46, h:72, count:20, hideWhen:() => S.wiped}]
};

/* ---------- the things Mary finds (stand-in icons until Gate D) ---------- */
const ITEMS = {
  shelly:{name:'Shelly the mermaid', icon:icon('#ef8fb5', 'Shelly')},
  sheet:{name:'carol sheet', note:'sheet', usable:true, icon:icon('#fbf4e2;color:#2b2836;text-shadow:none', '♪ carol')},
  stool:{name:'step stool', icon:`<img src="${A}layer-stool.png" alt="">`},
  hat:{name:'hat and gloves', icon:icon('#c0392b', 'hat + gloves')},
  drawing:{name:'framed drawing', icon:icon('#7a5c3e', 'drawing')},
  paper:{name:'wrapping paper', icon:icon('#2f7c83', 'paper')},
  tape:{name:'sticky tape', icon:icon('#8a8f99', 'tape')},
  parcel:{name:'half-wrapped present', icon:icon('#3b8f96', 'wrapped… nearly')},
  present:{name:'Nana’s present', icon:icon('#2f7c83', 'Nana’s present')},
  passport:{name:'passport', icon:`<img src="${A}item-passport.png" alt="">`}
};

/* ---------- the words Mary reads ---------- */
function boardHTML(big){ /* the whiteboard, in Mary's hand; the boxes tick as things go in the case */
  const fs = big ? 2.7 : 1.05;
  const rows = LIST.map(([k, label]) => `<div style="display:flex;align-items:center;gap:.4em"><span style="display:inline-grid;place-items:center;width:1em;height:1em;border:.12em solid #2f5f8a;border-radius:.12em;color:#2a8a3e;font-size:1em;line-height:1">${packed(k) ? '✓' : ''}</span><span style="${packed(k) ? 'text-decoration:line-through;text-decoration-color:#2a8a3e' : ''}">${label}</span></div>`).join('');
  return `<div style="font-family:${HAND};color:#2f5f8a;font-size:calc(var(--u)*${fs});line-height:1.2;transform:rotate(-1deg)"><div style="color:#c0392b">BEFORE THE TAXI — 6 o’clock!!</div>${rows}<div style="margin-top:.25em;font-size:.85em">P.S. LIGHTS OFF on the stand!!</div></div>`;
}
const SHEET = () => { const line = (seq, y) => seq.map((k, i) => `<g transform="translate(${70 + i*52} ${y - 10})"><circle cx="10" cy="10" r="11" fill="${KEYS[k].c}" stroke="#2b2836" stroke-width="1.2"/><g transform="translate(3.5 3.5) scale(1.3)">${shape(KEYS[k].s)}</g></g>`).join('');
  const stave = y => [0, 1, 2, 3, 4].map(i => `<line x1="10" x2="290" y1="${y - 16 + i*8}" y2="${y - 16 + i*8}" stroke="#9aa3b5" stroke-width="1"/>`).join('');
  return `<svg viewBox="0 0 300 150" style="width:100%;height:auto;display:block" aria-label="The carol sheet. Line one, verse: yellow star, yellow star, green leaf, blue moon. Line two, everyone sings: blue moon, red heart, red heart, green leaf.">${stave(48)}${stave(118)}<text x="12" y="22" font-family="${HAND}" font-size="15" fill="#2f5f8a">verse</text>${line(VERSE, 48)}<text x="12" y="92" font-family="${HAND}" font-size="15" fill="#c0392b">everyone sings:</text>${line(CHORUS, 118)}</svg>`; };
const NOTES = {
  sheet:{hand:true, html:`<span class="head">Nana’s carol — Christmas Eve</span>${SHEET()}<span class="sign" style="font-size:.9em">Mary’s colours for Zaina’s piano</span>`},
  enote:{hand:true, html:'<span class="head" style="font-size:1.3em">ZAINA’S HOUSE.</span><span class="big">KEEP OUT MARY.</span><span style="font-size:1.25em;line-height:1.35">Password: the bit everyone sings.</span><span style="font-size:1.05em">(I made the lock.)</span><span class="sign" style="font-size:1.2em">— E.</span>'}
};

/* ---------- what the game draws over the walls (stand-ins and states) ---------- */
const CASE_IN = () => LIST.filter(([k]) => packed(k)).map(([k, label]) => `<span style="display:inline-block;margin:.1em;padding:.05em .3em;border-radius:.3em;background:#fff;color:#2b2836;font-weight:400">${label}</span>`).join('');
const gold = () => S.wiped ? '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%,rgba(255,214,140,.32),rgba(255,190,110,.12) 60%,rgba(0,0,0,0));mix-blend-mode:soft-light"></div>' : '';
const LIGHTS = [[15, 37.5], [17, 40], [19, 42.4], [21, 44.8], [23, 47.2], [20.2, 53], [19.8, 58.5], [20.4, 64], [19.8, 69.5], [20.3, 75]];
const DOT = ['#ff6b8a', '#ffd34d', '#6fd08c', '#6fb6ff', '#ff9a4d'];
const WINDOWS = [[24, 36, 3.5, 4.5], [20, 45, 3.5, 10], [28, 45, 3.5, 10], [20, 61, 3.5, 10], [29, 61, 3.5, 10], [20, 75, 2.5, 5], [29.5, 75, 2.2, 5]]; /* the doll's house's windows on k4 */
const OVERLAYS = {
  m3:() => ov(gold() + (S.wiped ? `<div class="e2sb" style="left:43%;top:41%;width:15%;height:24%;background:#f7f7f4">board wiped clean</div>` : `<div class="e2sb" style="left:43%;top:41%;width:15%;height:24%;background:#f7f7f4;align-items:flex-start;justify-content:flex-start;padding:.4em">${boardHTML(false)}</div>`)
    + sb(58, 52, 20, 17, 'Mary’s case', nPacked() ? CASE_IN() : 'open, waiting', 'background:rgba(120,82,170,.88);color:#fff')),
  m2:() => ov(gold() + LIGHTS.map(([l, t], i) => `<span class="e2dot${S.lightsOff ? '' : ' on'}" style="left:${l}%;top:${t}%;background:${S.lightsOff ? '#8a8a8a' : DOT[i % DOT.length]};color:${DOT[i % DOT.length]};animation-delay:${(i*0.37) % 1.6}s"></span>`).join('')),
  m1:() => ov(gold() + (taken('drawing') ? '' : sb(57, 34, 8, 11, 'drawing', 'For Nana', 'background:#fffaf0;border-style:solid;border-color:#7a5c3e'))
    + sb(84.5, 31, 7, 19, 'pocket organiser', taken('shelly') ? '' : 'a pink tail in the window', 'background:rgba(150,150,160,.9);color:#fff')),
  m4:() => ov(gold()),
  k1:() => ov(gold()),
  k2:() => ov(gold() /* Zaina is a cut-out now; the keys of her piano carry the KEYS colours, baked from the same list */
    + (S.traded ? sb(54.8, 64, 3.6, 6, 'Shelly', '', 'background:#ef8fb5;color:#fff;font-size:calc(var(--u)*.9)') : (taken('sheet') ? '' : `<div style="position:absolute;left:49.6%;top:66.6%;width:2.2%;height:2.6%;background:#fffaf0;border:1px solid #6a5a44;transform:rotate(-4deg)"></div>`))
    + (S.trundleOut ? sb(20, 82, 56, 6, 'trundle open', taken('paper') ? 'spare bedding' : 'bedding and a roll of paper', 'background:rgba(255,255,255,.9)') : '')),
  k4:() => ov(gold() + WINDOWS.map(([l, t, w, h], i) => `<span class="e2win${S.houseOpen ? (S.justLit ? ' go' : ' lit') : ''}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%;animation-delay:${reduce() ? 0 : i*0.35}s"></span>`).join('')
    + (S.houseOpen ? (sb(20.5, 64.5, 12, 18, 'front open', taken('passport') ? 'a tiny empty bed' : 'a tiny bed…', 'background:rgba(255,236,200,.95)') + (taken('passport') ? '' : `<img src="${A}item-passport.png?v=${BUILD}" alt="" style="position:absolute;left:24.6%;top:72%;width:3.4%;transform:rotate(-12deg);filter:drop-shadow(1px 2px 2px rgba(0,0,0,.4))">`))
      : `<div style="position:absolute;left:23.2%;top:65.5%;width:6.6%;height:7%;background:#d9c09a;border:2px solid #6a5a44;border-radius:.2em;display:flex;align-items:center;justify-content:space-evenly;padding:0 .2em;box-sizing:border-box">${BUTTONS.map(k => `<svg viewBox="0 0 10 10" style="width:22%" aria-hidden="true"><circle cx="5" cy="5" r="4.6" fill="${KEYS[k].c}" stroke="#2b2836" stroke-width=".5"/></svg>`).join('')}</div>`)
    + sb(23.5, 58.5, 5, 5, 'E’s note', '', 'background:#fff;font-weight:400'))
};

/* ---------- close-ups ---------- */
const zoomP = (src, l, t, w) => `background-image:url(${src}?v=${BUILD});background-size:${(10000/w).toFixed(1)}% auto;background-position:${(l/(100 - w)*100).toFixed(1)}% ${(t/(100 - w)*100).toFixed(1)}%`;
const cuTarget = (id, label, [l, t, w, h]) => `<button class="cuhot" data-cu="${id}" aria-label="${label}" style="position:absolute;left:${l}%;top:${t}%;width:${w}%;height:${h}%;background:transparent;border:0;cursor:pointer"></button>`;
function wireCu(plain){ document.querySelectorAll('#closeup .cuhot').forEach(b => b.onclick = e => { e.stopPropagation(); const id = b.dataset.cu;
  if (S.held){ const item = S.held; S.held = null; if (USES[item + '>' + id]) closeCloseup(); useItem(item, id, null); return; }
  if (plain && plain[id]) plain[id](); }); }
const takeBtn = (id, label, [l, t, w, h], html) => `<button id="${id}" aria-label="${label}" style="position:absolute;left:${l}%;top:${t}%;width:${w}%;height:${h}%;padding:0;border:0;background:transparent;cursor:pointer">${html}</button>`;
const card = (title, pic, fb, foot = '') => `<div class="card shelf"><div class="shelfpic" id="e2pic" style="${pic}">${'PIC'}<p class="otitle">${title}</p></div><p class="ofb" id="e2fb">${fb}</p>${foot}</div>`;
const openCard = (title, pic, inner, fb, foot) => openCloseup(card(title, pic, fb, foot).replace('PIC', inner));
const row = btns => `<div class="row" style="padding:0 calc(var(--u)*1.5) calc(var(--u)*1);display:flex;gap:calc(var(--u)*1);justify-content:center">${btns}</div>`;
const obtn = (id, text) => `<button class="ob" id="${id}" style="min-height:40px;padding:calc(var(--u)*.6) calc(var(--u)*2.2);font-size:calc(var(--u)*1.9)">${text}</button>`;
const fb = t => { const el = $('e2fb'); if (el) el.textContent = t; };

function openBoard(again){
  if (!S.seen.list){ S.seen.list = Date.now(); save(); }
  openCard('Mary’s whiteboard', 'background:#f7f7f4', `<div style="position:absolute;left:8%;top:18%;right:8%">${boardHTML(true)}</div>`,
    nPacked() === 4 ? (S.lightsOff ? 'Four ticks. Mary’s done. Time to wipe it clean.' : 'Four ticks… and a P.S.') : 'Mary’s list, in her own writing. Everything on it has walked.', row(obtn('e2wipe', 'Wipe it clean')));
  $('e2wipe').onclick = e => { e.stopPropagation(); sfx('tap');
    if (nPacked() < 4){ fb('Not yet. There’s still something to find.'); return; }
    if (!S.lightsOff){ fb('P.S.! The lights.'); return; }
    closeCloseup(); setTimeout(wipe, 150); };
  if (!again){ const c = copyClue('list'); if (c) say('Mary’s list: the carol, hat and gloves, Nana’s present, her passport.' + c); }
}
function wipe(){ /* the closing gesture: one drag across the board, the writing erased behind the cloth (MECH-137) */
  openDrag({pic:WALLS.m3, title:'Wipe the board', tab:A + 'greybox/tab-wiper.png', tabW:9, tabRatio:'200/120', path:[[14, 30], [86, 30], [14, 52], [86, 52], [14, 74], [86, 74]],
    label:'Take the wiper and rub the board clean, side to side.', missLabel:'Take hold of the wiper.', moreLabel:'Keep wiping, all of it.', doneLabel:'Clean!', lineColour:'#f7f7f4', lineLight:'#f7f7f4', lineWidth:150,
    done:() => { S.wiped = true; save(); render(); sfx('pickup'); say('The board is clean. Outside, the rain stops, and the light goes gold.'); setTimeout(() => { say('From the hall, Mum: <b>“Mary! The taxi’s downstairs!”</b>'); setTimeout(ending, 2400); }, 2200); }});
  const pic = $('dragpic'); pic.style.backgroundImage = 'none'; pic.style.background = '#f7f7f4';
  pic.insertAdjacentHTML('afterbegin', `<div style="position:absolute;left:8%;top:18%;right:8%;pointer-events:none">${boardHTML(true)}</div>`);
}
function openCase(){
  openCard('Mary’s case', 'background:#6d4f99', `<div style="position:absolute;left:8%;top:22%;right:8%;bottom:10%;background:#efe6f7;border-radius:calc(var(--u)*.6);display:flex;flex-wrap:wrap;align-content:flex-start;gap:calc(var(--u)*.8);padding:calc(var(--u)*1.2);font:700 calc(var(--u)*2)/1.2 ${FONT};color:#2b2836">${LIST.map(([k, label]) => `<span style="padding:.2em .6em;border-radius:.4em;border:2px ${packed(k) ? 'solid #2a8a3e;background:#fff' : 'dashed #9a8fb0;opacity:.55'}">${packed(k) ? '✓ ' : ''}${label}</span>`).join('')}</div>`,
    nPacked() === 4 ? 'All four in. The case zips shut.' : nPacked() ? `${nPacked()} of 4 in. Clothes folded underneath.` : 'Clothes folded, and room on top for four things. Hold one and tap the case.');
}
function pack(item, k, line){ drop(item); if (!S.packed) S.packed = {}; S.packed[k] = true; save(); sfx('knock'); setTimeout(() => sfx('tick'), 300); render();
  say(line + (nPacked() === 4 ? ' Four ticks on the board. Mary’s done… almost.' : ` The board ticks itself: ${nPacked()} of 4.`)); }
function openFolder(){ if (!S.seen.folder){ S.seen.folder = Date.now(); save(); }
  openCard('The blue folder', 'background:#3a5f9e', sb(14, 18, 72, 64, 'Nana’s carol — Christmas Eve', 'the folder, flipped open: empty', 'background:#fffaf0;font-size:calc(var(--u)*2.4)'), 'Nana’s carol should be in here. The folder is empty.'); }
function openOrganiser(){
  const pockets = [0, 1, 2, 3, 4, 5].map(i => { const l = 10 + (i % 3)*28, t = 20 + Math.floor(i/3)*36;
    return `<div style="position:absolute;left:${l}%;top:${t}%;width:24%;height:30%;background:#8d8f99;border:2px solid #5a5c66;border-radius:.3em">${i === 4 ? `<div style="position:absolute;left:15%;top:18%;width:70%;height:55%;background:rgba(220,235,245,.55);border:2px solid #cfd8e3"></div>` : ''}</div>`; }).join('');
  const tail = !taken('shelly') ? takeBtn('takeShelly', 'Shelly the mermaid', [42, 62, 16, 22], `<svg viewBox="0 0 40 40" style="width:100%;height:100%"><path d="M20 2C26 10 26 22 22 30L30 38H10L18 30C14 22 14 10 20 2Z" fill="#ef8fb5" stroke="#9a3f66" stroke-width="2"/></svg>`) : '';
  openCard('Mary’s pocket organiser', 'background:#d9d2c5', pockets + tail, taken('shelly') ? 'Hair ties, a torch, and an empty window pocket.' : 'Six pockets. Through the clear window of one: a pink tail. Shelly!');
  const b = $('takeShelly'); if (b) b.onclick = e => { e.stopPropagation(); take('shelly'); sfx('pickup'); closeCloseup(); render(); say('Shelly the mermaid, Zaina’s favourite. How did she get in here? She goes in the strip below.'); };
}
function openDrawer(which){ /* look-alike things behave alike (MECH-107): all three open and are looked into */
  const D = {top:['The top drawer', 'one of Zaina’s pink hair clips', 'Empty, but for one of Zaina’s hair clips. Mary’s passport was in here. Zaina!'], mid:['The middle drawer', 'beads, glue, pipe cleaners', 'Beads and craft things. Not today.'], bot:['The bottom drawer', 'socks, odd ones', 'Socks. Mary already packed the good ones.']}[which];
  if (which === 'top' && !S.seen.drawer){ S.seen.drawer = Date.now(); save(); }
  openCard(D[0], 'background:#24382c', `<div style="position:absolute;left:10%;top:22%;width:80%;height:62%;background:#3b2a1e;border:3px solid #1c140e;box-shadow:inset 0 0 calc(var(--u)*2) #000"></div>` + sb(30, 40, 40, 26, D[1], 'looked into from above', 'background:rgba(255,250,240,.9)'), D[2]);
}
function openPenpot(){
  const pens = ['#c0392b', '#2f7c83', '#f2c230', '#3a72c4', '#3f9d4a', '#9b59b6'].map((c, i) => `<div style="position:absolute;left:${36 + i*4.5}%;top:${14 + (i % 2)*5}%;width:2.2%;height:46%;background:${c};border-radius:.3em .3em 0 0;transform:rotate(${(i - 2.5)*5}deg);transform-origin:50% 100%"></div>`).join('');
  const tape = !taken('tape') ? takeBtn('takeTape', 'Sticky tape', [55, 50, 14, 22], `<svg viewBox="0 0 40 40" style="width:100%;height:100%"><circle cx="20" cy="20" r="16" fill="#d8dde6" stroke="#6a6f7a" stroke-width="3"/><circle cx="20" cy="20" r="8" fill="#f3efe6" stroke="#6a6f7a" stroke-width="2"/></svg>`) : '';
  openCard('The pen pot', 'background:#e8e1d3', pens + `<div style="position:absolute;left:33%;top:48%;width:30%;height:40%;background:#9aa0aa;border:3px solid #5a5f68;border-radius:0 0 .5em .5em"></div>` + tape, taken('tape') ? 'Pens and pencils.' : 'Pens, pencils… and a roll of sticky tape, jammed in among them.');
  const b = $('takeTape'); if (b) b.onclick = e => { e.stopPropagation(); take('tape'); sfx('pickup'); closeCloseup(); render(); say('Sticky tape. It goes in the strip below.'); };
}
function openTrundle(){
  const roll = !taken('paper') ? takeBtn('takePaper', 'A roll of wrapping paper', [24, 46, 52, 18], `<div style="width:100%;height:100%;border-radius:1em;border:2px solid #1f5a60;background:repeating-linear-gradient(90deg,#2f7c83 0 12%,#fff 12% 14%);display:grid;place-items:center;font:700 calc(var(--u)*1.6) ${FONT};color:#fff;text-shadow:0 1px 2px #000">☃ snowmen ☃</div>`) : '';
  openCard('Inside the trundle', 'background:#f3efe6', sb(8, 18, 84, 70, '', '', 'background:repeating-linear-gradient(0deg,#fbf7ee 0 10%,#efe6d4 10% 12%);border-style:solid') + roll, taken('paper') ? 'Spare sheets and a pillow.' : 'Spare bedding, folded… and a roll of Christmas paper with snowmen on.');
  const b = $('takePaper'); if (b) b.onclick = e => { e.stopPropagation(); take('paper'); sfx('paper'); closeCloseup(); render(); say('Wrapping paper with snowmen on. It goes in the strip below.'); };
}
function openWardrobe(){
  if (S.stoolAt && !S.boxOpen){ ribbon(); return; }
  const box = S.boxOpen ? sb(26, 30, 48, 40, 'WINTER (London)', 'open, and empty now', 'background:#d9b98a;border-style:solid') : sb(26, 30, 48, 40, 'WINTER (London)', 'tied with a red ribbon', 'background:#d9b98a;border-style:solid');
  openCard('The wardrobe, top shelf', zoomP(WALLS.m4, 30, 2, 28), `<div style="position:absolute;left:4%;top:74%;width:92%;height:3%;background:#e8e2d6;border-bottom:2px solid #a89f8e"></div>` + box + cuTarget('e2_wardrobe', 'The winter box on the top shelf', [0, 0, 100, 100]),
    S.boxOpen ? 'The winter box, open and empty now.' : 'The winter box, top shelf. Mary’s arms are not that long.');
  if (!S.seen.box){ S.seen.box = Date.now(); save(); }
  wireCu({e2_wardrobe:() => fb(S.boxOpen ? 'Empty now.' : taken('stool') ? 'Too high. Hold the stool and tap the wardrobe.' : 'Mary’s arms are not that long.')});
}
function ribbon(){ /* stood on the stool: the bow is pulled open by its end (MECH-137) */
  openDrag({pic:WALLS.m4, title:'Pull the ribbon', tab:A + 'greybox/tab-ribbon.png', tabW:8, tabRatio:'200/120', path:[[52, 44], [64, 50], [80, 62]],
    label:'Mary’s on the stool. Take the ribbon’s end and pull the bow open.', missLabel:'Take hold of the ribbon’s loose end.', moreLabel:'Keep pulling…', doneLabel:'The bow slips open!', lineColour:'#c0392b', lineLight:'#e8786a', lineWidth:14,
    done:() => { S.boxOpen = true; take('hat'); save(); sfx('pickup'); render(); say('The lid lifts: Mary’s woolly hat and gloves, for a cold London. They go in the strip below.'); }});
  const pic = $('dragpic'); pic.setAttribute('style', zoomP(WALLS.m4, 30, 2, 28));
  pic.insertAdjacentHTML('afterbegin', `<div class="e2sb" style="left:26%;top:30%;width:48%;height:40%;background:#d9b98a;border-style:solid">WINTER (London)</div><svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"><path d="M50 30V70M26 50H74" stroke="#c0392b" stroke-width="2.4"/><path d="M50 44C42 36 40 46 50 44C58 36 62 46 52 44" fill="none" stroke="#c0392b" stroke-width="2.4"/></svg>`);
}
/* Zaina and her piano: four notes, each key lighting as it sounds (a clue by sound is shown too) */
const PKEYS = [[14.4, 7.9], [23.3, 7.9], [32.3, 7.9], [41.4, 7.9], [50.5, 7.9], [59.5, 7.9], [68.6, 7.9], [77.7, 7.9]]; /* each key's left and width on closeup-piano.jpg, measured from its pixels */
function pianoCard(){
  const keys = ORDER.map((k, i) => `<div class="e2pk" data-k="${k}" style="position:absolute;left:${PKEYS[i][0]}%;top:31.2%;width:${PKEYS[i][1]}%;height:30.2%;border-radius:calc(var(--u)*.7);background:${KEYS[k].c};mix-blend-mode:multiply;transition:filter .12s;pointer-events:none"></div><div style="position:absolute;left:${PKEYS[i][0] + PKEYS[i][1]/2 - 2.4}%;top:51%;width:4.8%;aspect-ratio:1;pointer-events:none">${keySvg(k, '', 'style="width:100%;height:100%;filter:drop-shadow(0 1px 1px rgba(0,0,0,.35))"')}</div>`).join('');
  const slot = !S.traded ? `<div style="position:absolute;left:46%;top:3%;width:18%;height:14%;background:#fffaf0;border:1px solid #6a5a44;transform:rotate(-2deg);display:grid;place-items:center;font:700 calc(var(--u)*1.4) ${HAND};color:#2f5f8a;pointer-events:none">♪ the carol ♪</div>` : '';
  const shelly = S.traded ? sb(2, 52, 11, 26, 'Shelly', 'on her lap', 'background:#ef8fb5;color:#fff') : '';
  return `${slot}${keys}${shelly}${cuTarget('e2_piano', 'The toy piano', [10, 8, 80, 62])}${cuTarget('e2_zaina', 'Zaina', [0, 72, 100, 28])}`;
}
function openPiano(){
  openCard('Zaina’s piano', `background-image:url(${A}closeup-piano.jpg?v=${BUILD})`, pianoCard(), '', row(obtn('e2again', 'Play it again')));
  $('e2again').onclick = e => { e.stopPropagation(); play(); };
  wireCu({e2_zaina:() => fb(zainaLine()), e2_piano:play});
  play();
}
let playing = null;
function play(){
  if (playing) return;
  const seq = S.traded ? CHORUS : VERSE, gap = 620;
  if (!S.traded){ S.verses = (S.verses || 0) + 1; S.versePlayed = true; } else S.chorusHeard = true; save();
  fb(S.traded ? 'Zaina, with Shelly on her lap: “Everyone sings this one!”' : (S.verses > 1 ? 'Zaina plays the same four again. “I only know the first bit.”' : 'Zaina plays four notes. “That’s Mary’s song. It’s MY song now.”'));
  playing = seq.map((k, i) => setTimeout(() => { const el = document.querySelector(`#closeup .e2pk[data-k="${k}"]`); note(KEYS[k].f); if (el){ el.style.filter = 'brightness(1.6) saturate(1.3)'; el.style.mixBlendMode = 'normal'; setTimeout(() => { el.style.filter = ''; el.style.mixBlendMode = 'multiply'; }, gap*0.8); } if (i === seq.length - 1) setTimeout(() => { playing = null; fb(S.traded ? 'Blue moon, red heart, red heart, green leaf. “Everyone sings this one!”' : 'Yellow star, yellow star, green leaf, blue moon. “You can have Mary’s song for Shelly.”'); }, gap); }, 300 + i*gap));
}
const zainaLine = () => S.traded ? 'Zaina hugs Shelly. “Shelly likes the bit everyone sings.” Tap her piano.' : 'Zaina, on her bunk with her piano: “I’m practising Mary’s song. It’s MY song now.” The carol sheet sticks out of the piano’s slot. “You can have it… for Shelly.”';
function trade(){
  drop('shelly'); S.traded = true; take('sheet'); save(); sfx('squeak'); render();
  say('“SHELLY!” Zaina hugs her tight. The carol sheet slides out of the piano’s slot and into Mary’s hand.' + copyClue('carol'));
  setTimeout(() => openNote('sheet'), 900);
}
/* Elliot's lock: four felt-tip buttons, then the little knob. Answer: the bit everyone sings */
function openLock(){
  const pressed = S.pressed || [];
  const btns = BUTTONS.map((k, i) => `<button class="e2btn" data-k="${k}" aria-label="${k} ${KEYS[k].s} button" style="left:${18 + i*17}%;top:30%;width:13%;aspect-ratio:1">${keySvg(k)}</button>`).join('');
  const shown = `<div id="e2pressed" style="position:absolute;left:30%;top:66%;width:40%;height:12%;display:flex;gap:4%;justify-content:center">${[0, 1, 2, 3].map(i => `<span style="width:20%;aspect-ratio:1;border:2px dashed #6a5a44;border-radius:50%;display:grid;place-items:center">${pressed[i] ? keySvg(pressed[i], '', 'style="width:90%"') : ''}</span>`).join('')}</div>`;
  openCard('Elliot’s lock', 'background:#d9c09a', `<p style="position:absolute;left:0;right:0;top:15%;margin:0;text-align:center;font:700 calc(var(--u)*1.7) ${HAND};color:#2b2836">PASSWORD →</p>` + btns + shown + `<button class="e2btn" id="e2knob" aria-label="The little door knob" style="left:84%;top:58%;width:9%;aspect-ratio:1;background:#c9a24a"></button>`,
    S.got.includes('sheet') || packed('carol') ? 'Four buttons, then the knob. The bit everyone sings…' : 'Four felt-tip buttons and a tiny knob. Press four, then turn the knob.');
  document.querySelectorAll('#closeup .e2btn[data-k]').forEach(b => b.onclick = e => { e.stopPropagation(); const k = b.dataset.k; S.pressed = [...(S.pressed || []), k].slice(-4); save(); sfx('tick'); note(KEYS[k].f);
    b.classList.remove('flash'); void b.offsetWidth; b.classList.add('flash'); refreshPressed(); });
  $('e2knob').onclick = e => { e.stopPropagation(); turnKnob(); };
}
function refreshPressed(){ const p = S.pressed || []; $('e2pressed').innerHTML = [0, 1, 2, 3].map(i => `<span style="width:20%;aspect-ratio:1;border:2px dashed #6a5a44;border-radius:50%;display:grid;place-items:center">${p[i] ? keySvg(p[i], '', 'style="width:90%"') : ''}</span>`).join(''); }
function turnKnob(){
  const p = (S.pressed || []).join();
  if ((S.pressed || []).length < 4){ sfx('knock'); fb('Four buttons first, then the knob.'); return; }
  S.pressed = []; save(); refreshPressed();
  if (p === CHORUS.join()){ sfx('pickup'); fb('Click… the knob turns!');
    const bs = [...document.querySelectorAll('#closeup .e2btn[data-k]')]; CHORUS.forEach((k, i) => setTimeout(() => { const b = bs.find(x => x.dataset.k === k); if (b){ b.classList.remove('flash'); void b.offsetWidth; b.classList.add('flash'); } note(KEYS[k].f); }, i*300));
    setTimeout(() => { closeCloseup(); S.houseOpen = true; S.justLit = true; save(); render(); WINDOWS.forEach((w, i) => setTimeout(() => sfx('tick'), reduce() ? 0 : i*350));
      say('The little windows light up one by one… and the whole front swings open. On the tiny bed: Mary’s passport!'); setTimeout(() => { S.justLit = false; save(); }, 3000); }, 1500);
    return; }
  sfx('knock');
  if (p === VERSE.join()) fb('That’s the bit Zaina plays. Elliot wants the bit everyone sings.');
  else if (p === BUTTONS.join()) fb('That’s just the buttons in a row. Elliot’s cleverer than that.');
  else fb('The little door stays shut. Elliot made it well.');
}
function openNoteE(again){ if (!S.seen.enote){ S.seen.enote = Date.now(); save(); } openNote('enote'); if (!again){ const c = copyClue('enote'); if (c) say('Elliot’s note, taped above the doll’s house door.' + c); } }
function ending(){
  S.done = true; save();
  showEnd('Packed!', 'On the plane now! My things had walked all over the flat. Zaina swapped my carol for Shelly, Elliot locked my passport in the doll’s house with a password (the bit everyone sings), Nana’s drawing needed wrapping and my hat and gloves were up on the top shelf. All four in the case, the lights off, the board wiped. London for Christmas!', 'Zaina says Shelly is coming too.');
}

/* ---------- using things ---------- */
const PACK = {sheet:['carol', 'Nana’s carol goes in the case.'], hat:['hat', 'Hat and gloves, in. London will be cold.'], present:['present', 'Nana’s present, wrapped, goes in on top.'], passport:['passport', 'The passport goes in the case’s front pocket.']};
const USES = {
  'shelly>e2_zaina':trade, 'shelly>e2_piano':trade,
  'stool>e2_wardrobe':() => { drop('stool'); S.stoolAt = true; save(); sfx('knock'); render(); say('Mary sets the stool at the wardrobe’s foot and steps up. Now she can reach.'); setTimeout(ribbon, 700); },
  'paper>item:drawing':wrapUp, 'drawing>item:paper':wrapUp,
  'tape>item:parcel':tapeUp, 'parcel>item:tape':tapeUp,
  ...Object.fromEntries(Object.entries(PACK).map(([item, [k, line]]) => [item + '>e2_case', () => pack(item, k, line)]))
};
function wrapUp(){ drop('paper'); drop('drawing'); take('parcel'); sfx('paper'); render(); say('The snowman paper folds round Nana’s drawing. Its flaps won’t stay down on their own.'); }
function tapeUp(){ drop('tape'); drop('parcel'); take('present'); S.wrapped = true; save(); sfx('paper'); render(); say('Tape on every flap. Nana’s present, wrapped. It goes in the strip below.'); }
function miss(item, id){
  if (id === 'e2_case' && !PACK[item]){ say(item === 'drawing' || item === 'parcel' ? 'Nana’s present goes in wrapped.' : 'Not on the list.'); return; }
  const msgs = {shelly:'Shelly is Zaina’s. Zaina is in her room.', stool:'Mary doesn’t need to be taller here.', tape:id === 'item:drawing' ? 'Nothing to stick it to yet.' : 'Tape is for Nana’s present.', paper:'That’s for wrapping Nana’s present.', drawing:'Nana’s drawing needs wrapping first.', parcel:'Nearly wrapped. It needs tape.'};
  say(msgs[item] || 'That goes in the case.');
}
function act(id){
  if (DOORS[id]) return false;
  switch(id){
    case 'e2_board': openBoard(); return;
    case 'e2_case': openCase(); return;
    case 'e2_cushions': say('A green knitted cushion and one printed like an old map. Nothing under either.'); return;
    case 'e2_poster': say('The planets. London is a long way, but not that far.'); return;
    case 'e2_print': say('A river and a city, in a white mat. Nana sent it last Christmas.'); return;
    case 'e2_leaf': say('Mary’s door, wide open against the wall.'); return;
    case 'e2_folder': openFolder(); return;
    case 'e2_lights':
      if (S.lightsOff){ say('Off, as the P.S. says.'); return; }
      S.lightsOff = true; save(); render(); say(S.seen.list ? 'Click. The pompom lights go out. P.S. done.' : 'Click. Zaina’s pompom lights, off.'); return;
    case 'e2_window': say(S.wiped ? 'The rain has stopped. The street shines.' : 'December rain, pouring down. The taxi comes at six.'); return;
    case 'e2_ledge': say('Mary’s books, two photos and a blue tin of hair clips. All staying here.'); return;
    case 'e2_mladder': case 'e2_ladder1': say('Up to Mary’s loft bed. Nothing of hers up there today.'); return;
    case 'e2_loftbed': say('Mary’s bed, way up high, with Zaina’s fairy dress hung on the rail. Of course.'); return;
    case 'e2_cubes': say('Books, craft boxes, and a pink handbag Zaina “lent” her.'); return;
    case 'e2_tub': S.tubMoved = true; save(); render(); say(S.bathMoved ? 'The tub, set aside.' : 'The tub comes off the top and goes to one side. Under it, Zaina’s old baby bath.'); return;
    case 'e2_bath':
      if (!S.tubMoved){ say('The tub is sitting on it.'); return; }
      S.bathMoved = true; save(); render(); say('The baby bath lifts aside… and there underneath is the little step stool.'); return;
    case 'e2_stool': take('stool'); sfx('pickup'); render(); say('A sturdy little step stool. It goes in the strip below.'); return;
    case 'e2_drawing': take('drawing'); sfx('pickup'); render(); say('Mary’s drawing of all of them, framed, labelled “For Nana”. It needs wrapping. It goes in the strip below.'); return;
    case 'e2_postcard': say('A postcard of a lake, from Nana and Jedi.'); return;
    case 'e2_canvases': say('Everyone, on holiday, squinting into the sun.'); return;
    case 'e2_penpot': openPenpot(); return;
    case 'e2_mug': say('Paintbrushes, washed and drying. Not today.'); return;
    case 'e2_chair': say(S.seen.box ? 'The chair has wheels. Mary knows better than to stand on that.' : 'Mary’s desk chair. It spins, which is the best thing about it.'); return;
    case 'e2_dtop': openDrawer('top'); return;
    case 'e2_dmid': openDrawer('mid'); return;
    case 'e2_dbot': openDrawer('bot'); return;
    case 'e2_organiser': openOrganiser(); return;
    case 'e2_wardrobe': openWardrobe(); return;
    case 'e2_mnotes': say('A postcard and a cat Zaina drew. It is mostly whiskers.'); return;
    case 'e2_aircon': say('Off. It’s raining anyway.'); return;
    case 'e2_cwall': say('A plain white wall. From the dining end, Mum: “Six o’clock, Mary!”'); return;
    case 'e2_switch': say('The corridor light. Best left on.'); return;
    case 'e2_cpic': say('A little lake picture, very straight. Dad straightens it every morning.'); return;
    case 'e2_cdoor2': say('The bathroom. Mary’s toothbrush is already packed.'); return;
    case 'e2_ddoors': say('The living room, doors shut. Mum’s in the kitchen.'); return;
    case 'e2_cturn': say('The dining end, and the kitchen beyond. Mum calls: “Is everything in your case?”'); return;
    case 'e2_kwindow': say(S.wiped ? 'The rain has stopped over the balcony.' : 'Rain on the balcony door. The tree is dripping.'); return;
    case 'e2_armchair': say('Zaina’s little patchwork armchair. Far too small for Mary now.'); return;
    case 'e2_zaina': if (!S.seen.zaina){ S.seen.zaina = Date.now(); save(); } say(zainaLine()); return;
    case 'e2_piano': if (!S.seen.zaina){ S.seen.zaina = Date.now(); save(); } openPiano(); return;
    case 'e2_trundle':
      if (!S.trundleOut){ S.trundleOut = true; save(); render(); sfx('open'); }
      openTrundle(); return;
    case 'e2_toys': say('Elliot’s soft toys, lined up on guard.'); return;
    case 'e2_topbunk': say('Elliot’s bunk, on top. He’s out at the shops with Dad.'); return;
    case 'e2_kcanvases': case 'e2_kprint': say('Family pictures, and a print with paper bunting. Nothing of Mary’s.'); return;
    case 'e2_bells': say('Little felt elephants and brass bells. They jingle.'); return;
    case 'e2_kitchen': say('Zaina’s kitchen. Nothing of Mary’s. For once.'); return;
    case 'e2_pockets': say('A koala, a fox and a dog peeping out. No mermaid.'); return;
    case 'e2_bricks': say('Bricks and balls. Elliot’s things.'); return;
    case 'e2_house': say(S.houseOpen ? (taken('passport') ? 'The doll’s house, lit up and open, its tiny bed empty.' : 'Open, lit, and on the tiny bed: Mary’s passport.') : 'Zaina’s doll’s house. Elliot has stuck a cardboard lock on its door, and a note above it.'); return;
    case 'e2_enote': openNoteE(); return;
    case 'e2_dlock': openLock(); return;
    case 'e2_passport': take('passport'); sfx('pickup'); render(); say('Mary’s passport, safe and sound. “For safety”, Elliot. It goes in the strip below.'); return;
    case 'e2_kcubes': say('Zaina’s drawers: hair clips, pants, crayons. Nothing of Mary’s.'); return;
    case 'e2_ktoys': say('A cat box, a dinosaur, a little aeroplane. Going to London too, Zaina says.'); return;
    default: say('Painted into the wall: it does not move.'); return;
  }
}
function onRender(v){ /* Mum's voice carries up the corridor the first time Mary walks into it */
  if (v[0] === 'c' && !S.seen.mum){ S.seen.mum = Date.now(); save(); setTimeout(() => say('From the dining end, Mum’s voice: “Six o’clock, Mary! Is everything in your case?”'), 1100); }
}

/* ---------- hints, the notebook, clues ---------- */
const HINTS = [
  /* 0 */ {goal:() => !!S.seen.list, target:'e2_board', tips:['Mary wrote herself a list.', 'The whiteboard, propped by the case.', 'Read the whiteboard by the case.']},
  /* 1 */ {trail:'a', goal:() => !!S.seen.zaina || S.traded, target:'e2_mdoor', tips:['The folder on the stand is empty. Who likes Mary’s things?', 'Through the door and down the corridor.', 'Zaina has it, in her room.']},
  /* 2 */ {trail:'a', goal:() => S.traded, target:'e2_organiser', tips:['Zaina wants her mermaid. Where would Mary have put her?', 'The pocket organiser under the loft.', 'Shelly is in the pocket organiser under the loft. Take her to Zaina: hold Shelly and tap Zaina.']},
  /* 3 */ {trail:'b', goal:() => taken('stool'), target:'e2_tub', tips:['The winter box is too high. Mary needs something safe to stand on.', 'Under the loft, by the ladder: the tubs.', 'Lift the tub, then the bath aside: the stool is under them.']},
  /* 4 */ {trail:'b', goal:() => taken('hat'), target:'e2_wardrobe', tips:['Stand on the stool at the wardrobe.', 'Hold the stool and tap the wardrobe.', 'Use the stool on the wardrobe, then pull the ribbon.']},
  /* 5 */ {trail:'c', goal:() => taken('drawing'), target:'e2_drawing', tips:['Nana’s present is something Mary made.', 'The panel under the loft, above the desk.', 'Take the framed drawing from the panel under the loft.']},
  /* 6 */ {trail:'c', goal:() => taken('paper'), target:'e2_trundle', tips:['Wrapping paper lives where spare things live.', 'Under the children’s bunk.', 'Open the trundle under the bunk: the paper is inside.']},
  /* 7 */ {trail:'c', goal:() => S.wrapped, target:'e2_penpot', tips:['Paper on its own won’t stay.', 'Mary’s desk, the pen pot.', 'The tape is in the pen pot on the desk. Paper on the frame, then tape.']},
  /* 8 */ {trail:'d', goal:() => !!S.chorusHeard || S.houseOpen, target:'e2_enote', tips:['Elliot’s note says where the password comes from.', 'Read the note above the doll’s house door.', 'The bit everyone sings: the second line of the carol sheet.']},
  /* 9 */ {trail:'d', goal:() => S.houseOpen, target:'e2_zaina', tips:['Zaina played the first bit before. What does she play now she has Shelly?', 'Zaina’s piano, on her bunk.', 'Tap her piano: blue, red, red, green. It is the sheet’s second line. Press those buttons, then the knob.']},
  /* 10 */ {trail:'d', goal:() => taken('passport'), target:'e2_passport', tips:['The doll’s house is open.', 'Look on the tiny bed.', 'Take the passport off the tiny bed.']},
  /* 11 */ {goal:() => nPacked() === 4, target:'e2_case', tips:['Everything on the list goes in the case.', 'The case, on the sofa.', 'Tap each thing in the strip, then the case.']},
  /* 12 */ {goal:() => S.lightsOff, target:'e2_lights', tips:['Mary’s P.S. The stand is still twinkling.', 'The music stand by the window.', 'Tap the lights on the music stand to switch them off.']},
  /* 13 */ {goal:() => S.done, target:'e2_board', tips:['Four ticks. Mary’s done.', 'The whiteboard.', 'Wipe the board: tap it, then Wipe it clean.']}
];
function rows(){
  const first = t => HINTS.findIndex(h => h.trail === t && !h.goal());
  if (!S.seen.list) return [[0, 'Something to read?', 'not yet', false]];
  const st = (k, found, steps) => packed(k) ? '✓ in the case' : found ? 'found: into the case' : steps;
  const out = [
    [packed('carol') ? -1 : taken('sheet') ? 11 : first('a'), 'The carol', st('carol', S.got.includes('sheet'), taken('shelly') ? 'I have Shelly' : S.seen.zaina ? 'Zaina has it' : S.seen.folder ? 'the folder is empty' : 'not started'), packed('carol')],
    [packed('hat') ? -1 : taken('hat') ? 11 : first('b'), 'Hat and gloves', st('hat', taken('hat'), S.stoolAt ? 'stool at the wardrobe' : taken('stool') ? 'I have a stool' : S.seen.box ? 'too high' : 'not started'), packed('hat')],
    [packed('present') ? -1 : taken('present') ? 11 : first('c'), 'Nana’s present', st('present', taken('present'), [taken('drawing'), taken('paper'), taken('tape')].filter(Boolean).length + ' of 3 things'), packed('present')],
    [packed('passport') ? -1 : taken('passport') ? 11 : first('d'), 'My passport', st('passport', taken('passport'), S.houseOpen ? 'the house is open' : S.seen.enote ? 'Elliot’s lock' : S.seen.drawer ? 'Zaina took it' : 'not started'), packed('passport')]
  ];
  if (nPacked() === 4){ out.push([S.lightsOff ? -1 : 12, 'P.S. lights off', S.lightsOff ? '✓ off' : 'still twinkling', S.lightsOff]); out.push([S.done ? -1 : 13, 'Wipe the board', S.done ? '✓ clean' : 'when it’s all done', !!S.done]); }
  return out;
}
function noticed(){
  const n = [];
  if (S.seen.folder && !S.got.includes('sheet') && !packed('carol')) n.push('The carol folder is empty.');
  if (S.seen.drawer && !taken('passport')) n.push('My passport was in the drawer. Zaina?');
  if (S.seen.box && !taken('hat')) n.push('The winter box is on the top shelf.');
  if (!S.houseOpen){ if (S.chorusHeard) n.push('Zaina plays everyone’s bit: blue, red, red, green.'); else if (S.versePlayed) n.push('Zaina plays the verse: yellow, yellow, green, blue.'); }
  if (nPacked() === 4 && !S.lightsOff) n.push('P.S. LIGHTS OFF on the stand!!');
  return n;
}
const CLUES = {list:{label:'Whiteboard', open:() => openBoard(true)}, carol:{label:'Carol sheet', open:() => openNote('sheet')}, enote:{label:'Elliot’s note', open:() => openNoteE(true)}};
function clues(){ return (S.clues || []).map(k => CLUES[k]).filter(Boolean); }
function copyClue(key){ if (!S.clues) S.clues = []; if (S.clues.includes(key)) return ''; S.clues.push(key); save(); return S.clues.length === 1 ? ' Mary copies it into her notebook: tap the moth to see it again, wherever you are.' : ' Copied into the notebook.'; }
const sparkle = () => false; /* no sparkles (owner, 17 Oct 2026): the second hint tier pulses the thing */
const speaker = () => 'The moth whispers';
return {
  card:{place:'THE FLAT · 22 DECEMBER · A TEST LEVEL', text:'The taxi to the airport comes at six. Mary’s case is open on her sofa, her list beside it, and everything on the list has walked.'},
  meanwhile:'Meanwhile, at home, Mary is still packing.',
  title:'Packing Day', blurb:'A test level: two rooms and a corridor. Four things to find before the taxi.',
  track:'../art/music/flat.mp3', ambient:'rain',
  postcard:{pic:'../art/postcards/packing.jpg'},
  intro:'<b>Packing day.</b> The taxi comes at six, and Mary’s things are all over the flat. Her list is on the whiteboard by the case.',
  start:{room:'mary', view:0},
  fresh:() => ({seen:{}, clues:[], taken:{}, packed:{}, pressed:[], tubMoved:false, bathMoved:false, stoolAt:false, boxOpen:false, traded:false, verses:0, versePlayed:false, chorusHeard:false, trundleOut:false, wrapped:false, houseOpen:false, justLit:false, lightsOff:false, wiped:false}),
  extra:{mary:[A + 'greybox/tab-wiper.png', A + 'greybox/tab-ribbon.png', A + 'item-passport.png'], kids:[A + 'closeup-piano.jpg', A + 'item-passport.png']},
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES, overlays:OVERLAYS,
  act, miss, sparkle, rows, noticed, clues, speaker, onRender, helper:() => 'the moth', child:'mary'
};
})());
