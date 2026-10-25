/* The Moth House, landscape engine: the second test level, "Packing Day, from scratch" (levels/LEVEL-eval2.md), not a level of any
   child's story. Mary's room, the corridor and Elliot and Zaina's room, drawn by GPT Image 2.5 Sunburst on 25 Oct 2026 from
   evals/images/rooms/{mary-room,flat-corridor,kids-room}.json and passed by the owner ("Walls pass", 25 Oct 2026).
   Every picture is real since the batch (build 2026-10-25d, Gates A to E signed 25 Oct 2026): the game draws only the words,
   colours and shapes the puzzle reads (the list and its ticks, the labels, the piano's colours, the lock's shapes, the sheet).
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

/* ---------- the stage's own styles ---------- */
(function(){ const st = document.createElement('style'); st.textContent = `
.e2dot{position:absolute;width:1.1%;aspect-ratio:1;border-radius:50%;pointer-events:none}
.e2dot.on{animation:e2tw 1.6s ease-in-out infinite;box-shadow:0 0 calc(var(--u)*.8) currentColor}
@keyframes e2tw{0%,100%{opacity:1}50%{opacity:.35}}
.e2win{position:absolute;pointer-events:none;background:radial-gradient(rgba(255,226,140,.95),rgba(255,200,90,.55));border-radius:40% 40% 8% 8%;opacity:0}
.e2win.lit{opacity:1}.e2win.go{animation:e2lit .5s ease-out forwards}
@keyframes e2lit{from{opacity:0}to{opacity:1}}
.e2btn{position:absolute;border-radius:50%;border:2px solid #2b2836;cursor:pointer;padding:0;background:#fff;display:grid;place-items:center}
.e2btn svg{width:100%;height:100%}
.e2btn.flash{animation:e2fl .35s ease-out}
@keyframes e2fl{50%{transform:scale(1.18);filter:brightness(1.4)}}
@keyframes e2swing{from{transform:perspective(calc(var(--u)*60)) rotateY(0)}to{transform:perspective(calc(var(--u)*60)) rotateY(-82deg)}}
@media (prefers-reduced-motion:reduce){.e2dot.on,.e2win.go,.e2btn.flash{animation:none}.e2win.go{opacity:1}}
`; document.head.appendChild(st); })();
const ov = html => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;pointer-events:none'; d.innerHTML = html; return d; };

/* ---------- tap targets, in picture percentages ---------- */
const HOTS = {
  m3:[
    {id:'e2_board', l:42, t:49, w:15, h:17, label:'Mary’s whiteboard', key:true, sound:'paper'},
    {id:'e2_case', l:58, t:41, w:18, h:30, label:'Mary’s case', sound:'open'},
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
    {id:'e2_drawing', l:56, t:32, w:9.5, h:16, label:'Framed drawing', key:true, sound:'paper', anim:'lift', layer:'drawing', hideWhen:() => taken('drawing')},
    {id:'e2_postcard', l:50.5, t:36, w:5, h:8, label:'Postcard', sound:'paper'},
    {id:'e2_canvases', l:66, t:35, w:14, h:12, label:'Family pictures', sound:'tap'},
    {id:'e2_penpot', l:72.5, t:46, w:5.5, h:8, label:'Pen pot', sound:'tick'},
    {id:'e2_mug', l:78, t:45, w:5, h:9, label:'Mug of paintbrushes', sound:'tick'},
    {id:'e2_chair', l:55, t:52, w:15, h:32, label:'Desk chair', sound:'tap'},
    {id:'e2_dtop', l:75.5, t:56, w:9, h:6, label:'Top drawer', sound:'open'},
    {id:'e2_dmid', l:75.5, t:62, w:9, h:6, label:'Middle drawer', sound:'open'},
    {id:'e2_dbot', l:75.5, t:68, w:9, h:6, label:'Bottom drawer', sound:'open'},
    {id:'e2_organiser', l:83.5, t:30, w:7.5, h:21, label:'Pocket organiser', key:true, sound:'leaf', anim:'swing', layer:'org'}],
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
    {id:'e2_enote', l:22.5, t:56.5, w:9, h:7, label:'Elliot’s note', key:true, sound:'paper', hideWhen:() => S.houseOpen}, /* on the front: it swings away with it, and stays in the notebook */
    {id:'e2_dlock', l:22.5, t:64, w:8.5, h:10, label:'Elliot’s cardboard lock', key:true, sound:'tick', hideWhen:() => S.houseOpen},
    {id:'e2_passport', l:21, t:55, w:9, h:9, label:'The passport on the tiny bed', key:true, sound:'paper', showWhen:() => S.houseOpen && !taken('passport')},
    {id:'e2_kcubes', l:37, t:19, w:37, h:66, label:'Cube shelves', sound:'knock'},
    {id:'e2_ktoys', l:37, t:3, w:37, h:15, label:'Toys on top of the shelves', sound:'squeak'}]
};
/* the samples (Gate E, 25 Oct 2026): Zaina, the bath and the tub, the stool lifted from m1 with the patch behind it (the m1 edit), the passport */
const CUT = {bath:{l:19.5, t:71.5, w:13, h:11.7}, tub:{l:21, t:61, w:10.5, h:12.11}, bathAside:{l:1, t:76, w:12, h:10.8}, tubAside:{l:3, t:64.5, w:9, h:10.38},
  stool:{l:21.09, t:65.28, w:9.77, h:17.25}, patch:{l:19.99, t:63.31, w:11.98, h:21.18}, zaina:{l:45.5, t:49, w:9, h:23}}; /* sized against the bunk: a four-year-old sitting is about 58 cm, the bed 180 cm */
const lay = (src, c, more = {}) => Object.assign({src:A + src, l:c.l, t:c.t, w:c.w, h:c.h}, more);
const LAYERS = {
  m1:[lay('layer-drawing.png', {l:57, t:33, w:7.5, h:12.77}, {group:'drawing', hideWhen:() => taken('drawing')}), /* Mary's drawing for Nana, on the panel's blank space: about 30 cm against the 120 cm desk */
    lay('layer-org.png', {l:84, t:30, w:6.5, h:20.11}, {group:'org', hideWhen:() => taken('shelly')}), lay('layer-org-empty.png', {l:84, t:30, w:6.5, h:20.08}, {group:'org', showWhen:() => taken('shelly')}),
    lay('layer-stoolpatch.png', CUT.patch, {showWhen:() => taken('stool')}), /* the floor and wall where the stool stood, from the m1 edit */
    lay('layer-bath.png', CUT.bath, {group:'bath', shadow:.6, hideWhen:() => S.bathMoved}), lay('layer-bath.png', CUT.bathAside, {shadow:.6, showWhen:() => S.bathMoved}),
    lay('layer-tub.png', CUT.tub, {group:'tub', shadow:.5, hideWhen:() => S.tubMoved}), lay('layer-tub.png', CUT.tubAside, {shadow:.5, showWhen:() => S.tubMoved})],
  m4:[lay('layer-stool.png', {l:40, t:66, w:9.77, h:17.25}, {shadow:.6, showWhen:() => S.stoolAt})], /* the same stool, stood at the wardrobe's foot */
  k2:[lay('layer-zaina.png', CUT.zaina, {group:'zaina', shadow:.5, idle:'breathe', amount:.012, period:2.6})],
  m2:[{draw:'rain', l:37, t:6, w:27, h:68, count:16, hideWhen:() => S.wiped}],
  k1:[{draw:'rain', l:21, t:6, w:46, h:72, count:20, hideWhen:() => S.wiped}]
};

/* ---------- the things Mary finds (stand-in icons until Gate D) ---------- */
const pic = (f, turn = '') => `<span style="position:absolute;inset:12%;display:grid;place-items:center"><img src="${A}${f}" alt="" style="position:static;width:100%;height:100%;object-fit:contain;transform:${turn || 'none'}"></span>`; /* an icon centred in its slot whatever its shape (MOTH-86's way) */
const ITEMS = {
  shelly:{name:'Shelly the mermaid', icon:pic('item-shelly.png', 'rotate(-10deg)')},
  sheet:{name:'carol sheet', note:'sheet', usable:true, icon:pic('item-sheet.png', 'rotate(-6deg)')},
  stool:{name:'step stool', icon:pic('layer-stool.png')},
  hat:{name:'hat and gloves', icon:pic('item-hat.png')},
  drawing:{name:'framed drawing', icon:pic('layer-drawing.png')},
  paper:{name:'wrapping paper', icon:pic('item-roll.png')},
  tape:{name:'sticky tape', icon:pic('item-tape.png')},
  parcel:{name:'half-wrapped present', icon:pic('item-parcel.png')},
  present:{name:'Nana’s present', icon:pic('item-present.png')},
  passport:{name:'passport', icon:pic('item-passport.png', 'rotate(-8deg)')}
};

/* ---------- the words Mary reads ---------- */
const boardWrap = big => `<div style="position:relative;width:100%;aspect-ratio:800/533;filter:drop-shadow(calc(var(--u)*${big ? .6 : .3}) calc(var(--u)*${big ? .8 : .4}) calc(var(--u)*${big ? .8 : .4}) rgba(30,25,40,.35))"><img src="${A}layer-board.png?v=${BUILD}" alt="" style="position:absolute;inset:0;width:100%;height:100%"><div class="e2bt" style="position:absolute;left:11%;top:11%;right:10%;bottom:16%;overflow:hidden">${S.wiped ? '' : boardHTML(big)}</div></div>`; /* the face is 7–93% across and 7–90% down the picture */
function boardHTML(big){ /* the whiteboard, in Mary's hand; the boxes tick as things go in the case */
  const fs = big ? 2.15 : .62;
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
const gold = () => S.wiped ? '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%,rgba(255,214,140,.32),rgba(255,190,110,.12) 60%,rgba(0,0,0,0));mix-blend-mode:soft-light"></div>' : '';
const LIGHTS = [[15, 37.5], [17, 40], [19, 42.4], [21, 44.8], [23, 47.2], [20.2, 53], [19.8, 58.5], [20.4, 64], [19.8, 69.5], [20.3, 75]];
const DOT = ['#ff6b8a', '#ffd34d', '#6fd08c', '#6fb6ff', '#ff9a4d'];
const WINDOWS = [[24, 36, 3.5, 4.5], [20, 45, 3.5, 10], [28, 45, 3.5, 10], [20, 61, 3.5, 10], [29, 61, 3.5, 10], [20, 75, 2.5, 5], [29.5, 75, 2.2, 5]]; /* the doll's house's windows on k4 */
const OVERLAYS = {
  m3:() => ov(gold() /* the case (about 60 cm, against the 200 cm sofa) and the board propped on the seat; the game writes on the board */
    + `<img src="${A}layer-case.png?v=${BUILD}" alt="" style="position:absolute;left:59%;top:42%;width:16%;filter:drop-shadow(calc(var(--u)*.4) calc(var(--u)*.5) calc(var(--u)*.5) rgba(30,25,40,.35))">`
    + `<div style="position:absolute;left:43%;top:50%;width:13%">${boardWrap(false)}</div>`),
  m2:() => ov(gold() + LIGHTS.map(([l, t], i) => `<span class="e2dot${S.lightsOff ? '' : ' on'}" style="left:${l}%;top:${t}%;background:${S.lightsOff ? '#8a8a8a' : DOT[i % DOT.length]};color:${DOT[i % DOT.length]};animation-delay:${(i*0.37) % 1.6}s"></span>`).join('')),
  m1:() => ov(gold() + (taken('drawing') ? '' : `<div style="position:absolute;left:58.2%;top:45.6%;padding:0 .3em;background:#fffaf0;border:1px solid #9a8a70;transform:rotate(-3deg);font:400 calc(var(--u)*.6)/1.3 ${HAND};color:#2f5f8a">For Nana</div>`)),
  m4:() => ov(gold()),
  k1:() => ov(gold()),
  k2:() => ov(gold() /* Zaina is a cut-out now; the keys of her piano carry the KEYS colours, baked from the same list */
    + (S.traded ? `<img src="${A}item-shelly.png?v=${BUILD}" alt="" style="position:absolute;left:54.4%;top:62.5%;width:3%;transform:rotate(14deg);filter:drop-shadow(1px 2px 2px rgba(0,0,0,.35))">` : (taken('sheet') ? '' : `<div style="position:absolute;left:49.6%;top:66.6%;width:2.2%;height:2.6%;background:#fffaf0;border:1px solid #6a5a44;transform:rotate(-4deg)"></div>`))
    + (S.trundleOut ? `<div style="position:absolute;left:20%;top:77.5%;width:56%;height:10%;background:#1c1612;box-shadow:inset 0 0 calc(var(--u)*1.5) #000"></div><img src="${A}layer-trundlefront.png?v=${BUILD}" alt="" style="position:absolute;left:20%;top:77.5%;width:56%;transform:translateY(22%) scale(1.03);filter:drop-shadow(0 calc(var(--u)*.4) calc(var(--u)*.4) rgba(0,0,0,.35))">` : '')),
  k4:() => ov(gold() + (S.houseOpen ? '' : `<div style="position:absolute;left:24%;top:59.4%;width:4%;text-align:center;font:400 calc(var(--u)*.5)/1.15 ${HAND};color:#c0392b;transform:rotate(-2deg)">KEEP OUT<br>MARY</div>`)
    + (S.houseOpen ? houseOpen()
      : `<div style="position:absolute;left:23.2%;top:65.5%;width:6.6%;height:7%;background:#d9c09a;border:2px solid #6a5a44;border-radius:.2em;display:flex;align-items:center;justify-content:space-evenly;padding:0 .2em;box-sizing:border-box">${BUTTONS.map(k => `<svg viewBox="0 0 10 10" style="width:22%" aria-hidden="true"><circle cx="5" cy="5" r="4.6" fill="${KEYS[k].c}" stroke="#2b2836" stroke-width=".5"/></svg>`).join('')}</div>`))
};
/* The doll's house opens (the reward moment): the windows on its front light one by one, then the front, lifted from the wall,
   swings open on its left edge and shows the inside (asset 25) with the passport on the tiny bed. */
const FRONT = {l:18.5, t:41, w:14.5, h:42.5}, INSIDE = {l:16.5, t:28.5, w:18, h:55.08};
function houseOpen(){
  const lit = WINDOWS.slice(1).map(([l, t, w, h], i) => `<span class="e2win${S.justLit ? ' go' : ' lit'}" style="left:${(l - FRONT.l)/FRONT.w*100}%;top:${(t - FRONT.t)/FRONT.h*100}%;width:${w/FRONT.w*100}%;height:${h/FRONT.h*100}%;animation-delay:${reduce() ? 0 : i*0.35}s"></span>`).join('');
  const swing = S.justLit && !reduce() ? 'animation:e2swing 1.1s cubic-bezier(.3,.7,.3,1) 2.4s both' : 'transform:perspective(calc(var(--u)*60)) rotateY(-82deg)';
  return `<img src="${A}layer-inside.png?v=${BUILD}" alt="" style="position:absolute;left:${INSIDE.l}%;top:${INSIDE.t}%;width:${INSIDE.w}%">`
    + (taken('passport') ? '' : `<img src="${A}item-passport.png?v=${BUILD}" alt="" style="position:absolute;left:24.3%;top:57.6%;width:2.2%;transform:rotate(-72deg);filter:drop-shadow(1px 2px 2px rgba(0,0,0,.4))">`)
    + `<div style="position:absolute;left:${FRONT.l}%;top:${FRONT.t}%;width:${FRONT.w}%;height:${FRONT.h}%;transform-origin:0 50%;${swing};filter:drop-shadow(calc(var(--u)*.6) 0 calc(var(--u)*.8) rgba(0,0,0,.35))"><img src="${A}layer-housefront.png?v=${BUILD}" alt="" style="position:absolute;inset:0;width:100%;height:100%">${S.justLit ? lit : ''}</div>`;
}

/* ---------- close-ups ---------- */
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
  openCard('Mary’s whiteboard', 'background:#e9dccb', `<div style="position:absolute;left:15%;top:8%;width:70%">${boardWrap(true)}</div>`,
    nPacked() === 4 ? (S.lightsOff ? 'Four ticks. Mary’s done. Time to wipe it clean.' : 'Four ticks… and a P.S.') : 'Mary’s list, in her own writing. Everything on it has walked.', row(obtn('e2wipe', 'Wipe it clean')));
  $('e2wipe').onclick = e => { e.stopPropagation(); sfx('tap');
    if (nPacked() < 4){ fb('Not yet. There’s still something to find.'); return; }
    if (!S.lightsOff){ fb('P.S.! The lights.'); return; }
    closeCloseup(); setTimeout(wipe, 150); };
  if (!again){ const c = copyClue('list'); if (c) say('Mary’s list: the carol, hat and gloves, Nana’s present, her passport.' + c); }
}
function wipe(){ /* the closing gesture: one drag across the board, the writing erased behind the cloth (MECH-137) */
  openDrag({pic:WALLS.m3, title:'Wipe the board', tab:A + 'tab-wiper.png', tabW:9, tabRatio:'300/161', path:[[22, 26], [78, 26], [22, 46], [78, 46], [22, 66], [78, 66]],
    label:'Take the wiper and rub the board clean, side to side.', missLabel:'Take hold of the wiper.', moreLabel:'Keep wiping, all of it.', doneLabel:'Clean!', lineColour:'#f7f7f4', lineLight:'#f7f7f4', lineWidth:150,
    done:() => { S.wiped = true; save(); render(); sfx('pickup'); say('The board is clean. Outside, the rain stops, and the light goes gold.'); setTimeout(() => { say('From the hall, Mum: <b>“Mary! The taxi’s downstairs!”</b>'); setTimeout(ending, 2400); }, 2200); }});
  const pic = $('dragpic'); pic.style.backgroundImage = 'none'; pic.style.background = '#e9dccb';
  pic.insertAdjacentHTML('afterbegin', `<div style="position:absolute;left:15%;top:8%;width:70%;pointer-events:none">${boardWrap(true)}</div>`);
  const sv = pic.querySelector('svg.dline'); if (sv){ sv.style.clipPath = 'inset(13.8% 19.9% 17.3% 19.9%)'; } /* the cloth wipes only the board's face */
}
function openCase(){
  const IN = {carol:'item-sheet.png', hat:'item-hat.png', present:'item-present.png', passport:'item-passport.png'};
  openCard('Mary’s case', `background-image:url(${A}closeup-caseup.jpg?v=${BUILD})`, LIST.map(([k], i) => packed(k) ? `<img src="${A}${IN[k]}?v=${BUILD}" alt="${k}" style="position:absolute;left:${9 + i*21}%;top:7%;width:15%;height:26%;object-fit:contain;transform:rotate(${[-6, 4, -3, 8][i]}deg);filter:drop-shadow(calc(var(--u)*.3) calc(var(--u)*.4) calc(var(--u)*.4) rgba(0,0,0,.4))">` : '').join(''),
    nPacked() === 4 ? 'All four in. The case zips shut.' : nPacked() ? `${nPacked()} of 4 in. Clothes folded underneath.` : 'Clothes folded, and room on top for four things. Hold one and tap the case.');
}
function pack(item, k, line){ drop(item); if (!S.packed) S.packed = {}; S.packed[k] = true; save(); sfx('knock'); setTimeout(() => sfx('tick'), 300); render();
  say(line + (nPacked() === 4 ? ' Four ticks on the board. Mary’s done… almost.' : ` The board ticks itself: ${nPacked()} of 4.`)); }
function openFolder(){ if (!S.seen.folder){ S.seen.folder = Date.now(); save(); }
  openCard('The blue folder', `background-image:url(${A}closeup-folder.jpg?v=${BUILD})`, `<div style="position:absolute;left:70.6%;top:9.2%;width:9.6%;height:5.4%;display:grid;place-items:center;text-align:center;font:400 calc(var(--u)*.62)/1.05 ${HAND};color:#2f5f8a">Nana’s carol<br>Christmas Eve</div>`, 'Nana’s carol should be in here. The folder is empty.'); }
function openOrganiser(){
  /* Shelly behind the window pocket's plastic (as Nutmeg behind glass): her tail shows, the rest is in the pocket */
  const tail = !taken('shelly') ? takeBtn('takeShelly', 'Shelly the mermaid', [51.2, 42.5, 11.8, 18], `<span style="position:absolute;inset:0;overflow:hidden"><img src="${A}item-shelly.png?v=${BUILD}" alt="" style="position:absolute;left:8%;top:-62%;width:84%;transform:rotate(-8deg)"><span style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.28),rgba(255,255,255,.08) 45%,rgba(255,255,255,.22))"></span></span>`) : '';
  openCard('Mary’s pocket organiser', `background-image:url(${A}closeup-orgup.jpg?v=${BUILD})`, tail, taken('shelly') ? 'Hair ties, a torch, and an empty window pocket.' : 'Six pockets. Through the clear window of one: a pink tail. Shelly!');
  const b = $('takeShelly'); if (b) b.onclick = e => { e.stopPropagation(); take('shelly'); sfx('pickup'); closeCloseup(); render(); say('Shelly the mermaid, Zaina’s favourite. How did she get in here? She goes in the strip below.'); };
}
function openDrawer(which){ /* look-alike things behave alike (MECH-107): all three open and are looked into */
  const D = {top:['The top drawer', 'one of Zaina’s pink hair clips', 'Empty, but for one of Zaina’s hair clips. Mary’s passport was in here. Zaina!'], mid:['The middle drawer', 'beads, glue, pipe cleaners', 'Beads and craft things. Not today.'], bot:['The bottom drawer', 'socks, odd ones', 'Socks. Mary already packed the good ones.']}[which];
  if (which === 'top' && !S.seen.drawer){ S.seen.drawer = Date.now(); save(); }
  openCard(D[0], `background-image:url(${A}closeup-drawer-${which}.jpg?v=${BUILD})`, '', D[2]);
}
function openPenpot(){
  const tape = !taken('tape') ? takeBtn('takeTape', 'Sticky tape', [12, 62, 15, 27], `<img src="${A}item-tape.png?v=${BUILD}" alt="" style="width:100%;height:100%;object-fit:contain;transform:rotate(-10deg);filter:drop-shadow(calc(var(--u)*.3) calc(var(--u)*.5) calc(var(--u)*.4) rgba(0,0,0,.45))">`) : '';
  openCard('The pen pot', `background-image:url(${A}closeup-penpot.jpg?v=${BUILD})`, tape, taken('tape') ? 'Pens and pencils.' : 'Pens, pencils… and a roll of sticky tape, rolled up against the pot.');
  const b = $('takeTape'); if (b) b.onclick = e => { e.stopPropagation(); take('tape'); sfx('pickup'); closeCloseup(); render(); say('Sticky tape. It goes in the strip below.'); };
}
function openTrundle(){
  const roll = !taken('paper') ? takeBtn('takePaper', 'A roll of wrapping paper', [38, 44, 24, 42], `<img src="${A}item-roll.png?v=${BUILD}" alt="" style="width:100%;height:100%;object-fit:contain;transform:rotate(48deg);filter:drop-shadow(calc(var(--u)*.3) calc(var(--u)*.5) calc(var(--u)*.4) rgba(0,0,0,.4))">`) : '';
  openCard('Inside the trundle', `background-image:url(${A}closeup-trundle.jpg?v=${BUILD})`, roll, taken('paper') ? 'Spare sheets and a pillow.' : 'Spare bedding, folded… and a roll of Christmas paper with snowmen on.');
  const b = $('takePaper'); if (b) b.onclick = e => { e.stopPropagation(); take('paper'); sfx('paper'); closeCloseup(); render(); say('Wrapping paper with snowmen on. It goes in the strip below.'); };
}
function openWardrobe(){
  if (S.stoolAt && !S.boxOpen){ ribbon(); return; }
  openCard('The wardrobe, top shelf', `background-image:url(${A}closeup-${S.boxOpen ? 'box-open' : 'box'}.jpg?v=${BUILD})`, (S.boxOpen ? '' : BOXLABEL) + cuTarget('e2_wardrobe', 'The winter box on the top shelf', [0, 0, 100, 100]),
    S.boxOpen ? 'The winter box, open and empty now.' : 'The winter box, top shelf. Mary’s arms are not that long.');
  if (!S.seen.box){ S.seen.box = Date.now(); save(); }
  wireCu({e2_wardrobe:() => fb(S.boxOpen ? 'Empty now.' : taken('stool') ? 'Too high. Hold the stool and tap the wardrobe.' : 'Mary’s arms are not that long.')});
}
const BOXLABEL = `<div style="position:absolute;left:42%;top:49.5%;width:13%;height:8%;display:grid;place-items:center;font:400 calc(var(--u)*1.05)/1.05 ${HAND};color:#2b2836;text-align:center;pointer-events:none">WINTER<br>(London)</div>`; /* on the box's blank label */
function ribbon(){ /* stood on the stool: the bow is pulled open by its loose end (MECH-137) */
  openDrag({pic:A + 'closeup-box.jpg', title:'Pull the ribbon', tab:A + 'tab-ribbon.png', tabW:6, tabRatio:'300/299', path:[[64.5, 63], [72, 75], [82, 88]],
    label:'Mary’s on the stool. Take the ribbon’s end and pull the bow open.', missLabel:'Take hold of the ribbon’s loose end.', moreLabel:'Keep pulling…', doneLabel:'The bow slips open!', lineColour:'#c0392b', lineLight:'#e8786a', lineWidth:14,
    done:() => { S.boxOpen = true; take('hat'); save(); sfx('pickup'); render(); say('The lid lifts: Mary’s woolly hat and gloves, for a cold London. They go in the strip below.'); }});
  $('dragpic').insertAdjacentHTML('afterbegin', BOXLABEL);
}
/* Zaina and her piano: four notes, each key lighting as it sounds (a clue by sound is shown too) */
const PKEYS = [[14.4, 7.9], [23.3, 7.9], [32.3, 7.9], [41.4, 7.9], [50.5, 7.9], [59.5, 7.9], [68.6, 7.9], [77.7, 7.9]]; /* each key's left and width on closeup-piano.jpg, measured from its pixels */
function pianoCard(){
  const keys = ORDER.map((k, i) => `<div class="e2pk" data-k="${k}" style="position:absolute;left:${PKEYS[i][0]}%;top:31.2%;width:${PKEYS[i][1]}%;height:30.2%;border-radius:calc(var(--u)*.7);background:${KEYS[k].c};mix-blend-mode:multiply;transition:filter .12s;pointer-events:none"></div><div style="position:absolute;left:${PKEYS[i][0] + PKEYS[i][1]/2 - 2.4}%;top:51%;width:4.8%;aspect-ratio:1;pointer-events:none">${keySvg(k, '', 'style="width:100%;height:100%;filter:drop-shadow(0 1px 1px rgba(0,0,0,.35))"')}</div>`).join('');
  const slot = !S.traded ? `<div style="position:absolute;left:46%;top:3%;width:18%;height:14%;background:#fffaf0;border:1px solid #6a5a44;transform:rotate(-2deg);display:grid;place-items:center;font:700 calc(var(--u)*1.4) ${HAND};color:#2f5f8a;pointer-events:none">♪ the carol ♪</div>` : '';
  const shelly = S.traded ? `<img src="${A}item-shelly.png?v=${BUILD}" alt="Shelly on Zaina’s lap" style="position:absolute;left:1%;top:40%;width:12%;transform:rotate(-12deg);filter:drop-shadow(calc(var(--u)*.3) calc(var(--u)*.4) calc(var(--u)*.4) rgba(0,0,0,.35));pointer-events:none">` : '';
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
  const btns = BUTTONS.map((k, i) => `<button class="e2btn" data-k="${k}" aria-label="${k} ${KEYS[k].s} button" style="left:${LOCKX[i] - 3.4}%;top:41.5%;width:6.8%;aspect-ratio:1;background:transparent;border:0"><svg viewBox="0 0 10 10" aria-hidden="true"><g transform="translate(2.4 2.4) scale(.52)">${shape(KEYS[k].s, 'rgba(255,255,255,.92)')}</g></svg></button>`).join('');
  const shown = `<div id="e2pressed" style="position:absolute;left:66%;top:5%;width:30%;height:13%;display:flex;gap:4%;justify-content:center;align-items:center;background:rgba(251,244,226,.92);border-radius:calc(var(--u)*.6);padding:0 2%;box-sizing:border-box">${pressedHTML(pressed)}</div>`;
  openCard('Elliot’s lock', `background-image:url(${A}closeup-lock.jpg?v=${BUILD})`, btns + shown + `<button class="e2btn" id="e2knob" aria-label="The little door knob" style="left:61.5%;top:70.5%;width:7%;aspect-ratio:1;background:transparent;border:0"></button>`,
    S.got.includes('sheet') || packed('carol') ? 'Four buttons, then the knob. The bit everyone sings…' : 'Four felt-tip buttons and a tiny knob. Press four, then turn the knob.');
  document.querySelectorAll('#closeup .e2btn[data-k]').forEach(b => b.onclick = e => { e.stopPropagation(); const k = b.dataset.k; S.pressed = [...(S.pressed || []), k].slice(-4); save(); sfx('tick'); note(KEYS[k].f);
    b.classList.remove('flash'); void b.offsetWidth; b.classList.add('flash'); refreshPressed(); });
  $('e2knob').onclick = e => { e.stopPropagation(); turnKnob(); };
}
const LOCKX = [40.6, 46.8, 53.2, 59.4]; /* the felt-tip circles' centres on closeup-lock.jpg */
const pressedHTML = p => [0, 1, 2, 3].map(i => `<span style="width:20%;aspect-ratio:1;border:2px dashed #6a5a44;border-radius:50%;display:grid;place-items:center">${p[i] ? keySvg(p[i], '', 'style="width:90%"') : ''}</span>`).join('');
function refreshPressed(){ $('e2pressed').innerHTML = pressedHTML(S.pressed || []); }
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
  extra:{mary:['caseup', 'folder', 'drawer-top', 'drawer-mid', 'drawer-bot', 'penpot', 'orgup', 'box', 'box-open'].map(n => A + 'closeup-' + n + '.jpg').concat(['tab-wiper.png', 'tab-ribbon.png', 'layer-board.png', 'layer-case.png', 'item-sheet.png', 'item-hat.png', 'item-present.png', 'item-passport.png', 'item-shelly.png', 'item-tape.png'].map(f => A + f)),
    kids:['closeup-piano.jpg', 'closeup-trundle.jpg', 'closeup-lock.jpg', 'layer-inside.png', 'layer-housefront.png', 'layer-trundlefront.png', 'item-passport.png', 'item-shelly.png', 'item-roll.png'].map(f => A + f)}, /* the close-ups load with the room, so no card opens half drawn (MOTH-76) */
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES, overlays:OVERLAYS,
  act, miss, sparkle, rows, noticed, clues, speaker, onRender, helper:() => 'the moth', child:'mary'
};
})());
