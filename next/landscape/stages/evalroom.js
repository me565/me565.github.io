/* The Moth House, landscape engine: the test room "Lock-up Duty" (levels/LEVEL-evalroom.md), not a level. Classroom 5H drawn by
   GPT Image 2.5 Sunburst on 21 Oct 2026 from evals/images/rooms/classroom5h.json (playbook 4aa, 4ab). FIRST PLAYABLE (playbook 4ac):
   the real walls and cut-outs, the real puzzle, and plain stand-ins only for the pictures that do not exist yet (the keys, the
   ruler, the torn note, the pot close-up); the drawer fronts, the door and the lost-property things are lifted from the walls.
   The engine is frozen (school3 at Gate C), so the reward moments are single movements and the small key appears on the floor
   after the coat swings. Open with ?stage=evalroom. Nothing here is part of a child's story. */
'use strict';
registerStage('evalroom', (function(){
const GEO2 = {"pots": {"l": 31.0, "t": 13.15, "w": 38.0, "h": 39.65}, "coat": {"l": 66.71, "t": 27.5, "w": 13.57, "h": 34.0}, "lid": {"l": 18.95, "t": 49.82, "w": 14.5, "h": 4.98}, "doors": {"l": 12.39, "t": 12.5, "w": 16.62, "h": 69.5}, "pot1": {"l": 32.9, "t": 41.47, "w": 6.2, "h": 11.33}, "pot2": {"l": 41.9, "t": 35.45, "w": 6.2, "h": 17.35}, "pot3": {"l": 50.9, "t": 27.43, "w": 6.2, "h": 25.37}, "pot4": {"l": 59.9, "t": 14.27, "w": 6.2, "h": 38.53}};
const GEO = {"hamster": {"l": 76.1, "t": 43.0, "w": 3.03, "h": 7.5}, "envelope": {"l": 47.96, "t": 52.0, "w": 2.47, "h": 2.8}, "backpack": {"l": 56.25, "t": 70.0, "w": 7.49, "h": 16.0}};
/* lifted from the walls (crops, 22 Oct 2026): the desk drawer's front, the cabinet's top drawer front, the door leaf, the box front and the shoe and hat */
const CUT = {tdrawer:{l:80.68, t:61.39, w:9.53, h:6.85}, cabdrawer:{l:71.88, t:56.2, w:12.14, h:11.85}, door:{l:41.15, t:12.59, w:18.12, h:63.89}, boxfront:{l:69.17, t:64.35, w:14.95, h:14.35}, lost:{l:70.42, t:58.89, w:11.98, h:8.15}};
const ROOMS = { classroom:{name:'Classroom 5H', into:'the classroom', views:['c4','c1','c3','c2'] /* turning right: timetable (north), whiteboard (east), door (south), window (west); the room file's compass, not its file order */} };
const WALLS = { c1:'../art/eval/c5h/c1.jpg', c2:'../art/eval/c5h/c2.jpg', c3:'../art/eval/c5h/c3.jpg', c4:'../art/eval/c5h/c4.jpg' };
const DOORS = {};
/* ---------- the puzzle's facts, all drawn by the game ---------- */
const LESSON = {sc:['i-sc', '#3b78b8', 'flask'], mu:['i-mu', '#7a5cc2', 'music'], en:['i-en', '#d9a622', 'pencil'], ge:['i-ge', '#a8744a', 'atlas'], ar:['i-ar', '#d0602f', 'brush'], pe:['i-pe', '#27794c', 'ball']};
const HEADER = ['en', 'ge', 'sc', 'ar', 'pe', 'mu']; /* the six icons the wall's timetable already carries, left to right: the key */
const WEEK = {Mon:['en', 'ar', 'mu', 'sc'], Tue:['mu', 'sc', 'ge', 'en'], Wed:['ge', 'en', 'pe', 'mu'], Thu:['sc', 'mu', 'en', 'ge'], Fri:['en', 'mu', 'ar', 'sc']}; /* all six lessons happen somewhere (MOTH-57); Thursday's four are the potted ones */
const TODAY = 'Thu', DATE = 'Thursday 22 October';
const POTS = [['ge', 2], ['sc', 4], ['en', 6], ['mu', 9]]; /* left to right on the sill: label, height in cm */
const heightOf = k => { const p = POTS.find(p => p[0] === k); return p ? p[1] : null; };
/* Taken things stay taken (MOTH-55): whether a thing still lies where it was found is a flag set when it is picked up, never "is it in the strip", because a used-up item leaves the strip and the test would turn true again. */
const taken = k => !!(S.taken && S.taken[k]);
const take = k => { if (!S.taken) S.taken = {}; S.taken[k] = true; if (!S.got.includes(k)) S.got.push(k); save(); };
const codeFor = day => { const c = WEEK[day].map(heightOf); return c.includes(null) ? null : c; }; /* a day with an unpotted lesson has no code */
const CODE = codeFor(TODAY); /* 4 9 6 2 */
const TRAP_TALL = [...POTS].sort((a, b) => b[1] - a[1]).map(p => p[1]); /* 9 6 4 2 */
const TRAP_LEFT = POTS.map(p => p[1]); /* 2 4 6 9 */
const ic = (k, x, y, s) => `<use href="#${LESSON[k][0]}" x="${x}" y="${y}" width="${s}" height="${s}" style="color:${LESSON[k][1]}"/>`;
const FONT = 'Atkinson Hyperlegible,Verdana,sans-serif';
const HOTS = {
  c1:[
    {id:'ev_cupboard', l:6, t:12, w:20, h:72, label:'Supplies cupboard', anim:'peek', layer:'doors', sound:'knock'},
    {id:'ev_board', l:33, t:14, w:34, h:27, label:'Whiteboard', sound:'tap'},
    {id:'ev_tdesk', l:60, t:46, w:34, h:40, label:"Mr Hollis's desk", sound:'tap'},
    {id:'ev_tdrawer', l:79, t:59, w:13, h:12, label:"Mr Hollis's drawer", sound:'tick', anim:'rattle', layer:'tdrawer'}],
  c2:[
    {id:'ev_window', l:27, t:5, w:46, h:30, label:'Classroom window', sound:'tap'},
    {id:'ev_beans', l:28, t:36, w:44, h:17, label:'Bean plants on the window sill', anim:'bend', layer:'plant', sound:'leaf'},
    {id:'ev_radiator', l:33, t:57, w:33, h:22, label:'Radiator', sound:'knock'}],
  c3:[
    {id:'ev_bin', l:18, t:48, w:15, h:36, label:'Recycling bin', sound:'open'},
    {id:'ev_door', l:38, t:8, w:22, h:76, label:'Classroom door', sound:'knock'},
    {id:'ev_pegs', l:64, t:24, w:26, h:40, label:'Coat on the pegs', anim:'swing', layer:'coat', sound:'leaf'},
    {id:'ev_fkey', l:60, t:76, w:7, h:8, label:'A small key on the floor', key:true, sound:'tick', anim:'lift', layer:'fkey', showWhen:() => S.keyDown && !taken('skey')},
    {id:'ev_lost', l:68, t:62, w:17, h:20, label:'Lost property box', sound:'open'}],
  c4:[
    {id:'ev_rules', l:21, t:18, w:10, h:22, label:'Class rules', sound:'paper'},
    {id:'ev_timetable', l:37, t:10, w:27, h:32, label:'Class timetable', sound:'paper'},
    {id:'ev_clock', l:70, t:15, w:9, h:15, label:'Clock', sound:'tick'},
    {id:'ev_bookshelf', l:14, t:48, w:20, h:34, label:'Bookshelf', sound:'knock'},
    {id:'ev_desk', l:39, t:54, w:21, h:34, label:"Mary's desk", sound:'tap'},
    {id:'ev_envelope', l:GEO.envelope.l-1.5, t:GEO.envelope.t-2, w:GEO.envelope.w+3, h:GEO.envelope.h+4, label:'Envelope on the desk', key:true, anim:'lift', layer:'envelope', sound:'paper', hideWhen:() => S.got.includes('ev_env')},
    {id:'ev_bag', l:GEO.backpack.l-1, t:GEO.backpack.t-1, w:GEO.backpack.w+2, h:GEO.backpack.h+2, label:'Schoolbag', sound:'tap'},
    {id:'ev_hamster', l:70, t:36.5, w:13.4, h:15.7, label:'Nutmeg the hamster', anim:'sniff', layer:'hamster', sound:'squeak'},
    {id:'ev_cabinet', l:69, t:52, w:16, h:33, label:'Filing cabinet', sound:'knock'},
    {id:'ev_cabdrawer', l:71, t:55.5, w:13.5, h:13, label:"The cabinet's top drawer", sound:'tick', anim:'rattle', layer:'cabdrawer'}]
};
const LAYERS = {
  c3:[
    {src:'../art/eval/c5h/layer-door.png', group:'door', l:CUT.door.l, t:CUT.door.t, w:CUT.door.w, h:CUT.door.h, gone:() => S.locked}, /* the leaf, lifted from the wall; at the ending the stage swings it open on its hinge (MOTH-66) */
    {src:'../art/eval/c5h/layer-coat.png', group:'coat', l:GEO2.coat.l, t:GEO2.coat.t, w:GEO2.coat.w, h:GEO2.coat.h},
    {src:'../art/eval/c5h/layer-lid.png', group:'lid', l:GEO2.lid.l, t:GEO2.lid.t, w:GEO2.lid.w, h:GEO2.lid.h, shadow:.4},
    {src:'../art/eval/c5h/layer-lost.png', group:'lost', l:CUT.lost.l, t:CUT.lost.t, w:CUT.lost.w, h:CUT.lost.h}, /* the shoe and hat, behind the box's front */
    {src:'../art/eval/c5h/layer-boxfront.png', l:CUT.boxfront.l, t:CUT.boxfront.t, w:CUT.boxfront.w, h:CUT.boxfront.h},
    {src:'../art/eval/c5h/item-skey.png', group:'fkey', l:61.3, t:78.6, w:4.4, h:4.45, shadow:.5, showWhen:() => S.keyDown && !taken('skey')}], /* stand-in: the small key where it landed */
  c2:[
    {src:'../art/eval/c5h/layer-pot1.png', group:'plant', l:GEO2.pot1.l, t:GEO2.pot1.t, w:GEO2.pot1.w, h:GEO2.pot1.h, shadow:.5, pin:.90, phase:0.7}, /* pin: the share of each cut-out, from the bottom, that is pot and soil and never moves (MOTH-48) */
    {src:'../art/eval/c5h/layer-pot2.png', group:'plant', l:GEO2.pot2.l, t:GEO2.pot2.t, w:GEO2.pot2.w, h:GEO2.pot2.h, shadow:.5, pin:.59, phase:1.4},
    {src:'../art/eval/c5h/layer-pot3.png', group:'plant', l:GEO2.pot3.l, t:GEO2.pot3.t, w:GEO2.pot3.w, h:GEO2.pot3.h, shadow:.5, pin:.34, phase:2.1},
    {src:'../art/eval/c5h/layer-pot4.png', group:'plant', l:GEO2.pot4.l, t:GEO2.pot4.t, w:GEO2.pot4.w, h:GEO2.pot4.h, shadow:.5, pin:.28, phase:2.8},
    {draw:'beam', l:8, t:55, w:60, h:45, period:18, slant:0.3, strength:0.14},
    {draw:'motes', l:22, t:12, w:50, h:60, count:16}],
  c1:[
    {src:'../art/eval/c5h/layer-doors.png', group:'doors', l:GEO2.doors.l, t:GEO2.doors.t, w:GEO2.doors.w, h:GEO2.doors.h},
    {src:'../art/eval/c5h/layer-tdrawer.png', group:'tdrawer', l:CUT.tdrawer.l, t:CUT.tdrawer.t, w:CUT.tdrawer.w, h:CUT.tdrawer.h, hideWhen:() => S.deskOpen}, /* once open it is drawn by the overlay below (the engine's open-drawer rest state is tied to one flag) */
    {draw:'beam', l:0, t:50, w:55, h:50, period:22, slant:0.25, strength:0.10}],
  c4:[
    {draw:'clock', l:70.6, t:15.6, w:7.8, h:13.9, time:'14:40'},
    {draw:'beam', l:0, t:52, w:48, h:48, period:20, slant:0.3, strength:0.12},
    {src:'../art/eval/c5h/layer-cabdrawer.png', group:'cabdrawer', l:CUT.cabdrawer.l, t:CUT.cabdrawer.t, w:CUT.cabdrawer.w, h:CUT.cabdrawer.h, hideWhen:() => S.cabUnlocked}, /* the engine plays the first slide; after that the overlay below opens and shuts it (MOTH-54) */
    {src:'../art/eval/c5h/layer-envelope.png', group:'envelope', l:GEO.envelope.l, t:GEO.envelope.t, w:GEO.envelope.w, h:GEO.envelope.h, hideWhen:() => S.got.includes('ev_env')},
    {src:'../art/eval/c5h/layer-hamster.png', group:'hamster', l:GEO.hamster.l, t:GEO.hamster.t, w:GEO.hamster.w, h:GEO.hamster.h, glass:[70, 36.5, 13.4, 15.7], shadow:.5, tone:'saturate(.88)', idle:'breathe', amount:.02, period:2.4},
    {src:'../art/eval/c5h/layer-backpack.png', group:'backpack', l:GEO.backpack.l, t:GEO.backpack.t, w:GEO.backpack.w, h:GEO.backpack.h, shadow:.8}]
};
/* ---------- stand-in icons (the first playable: pictures come at Gate D) ---------- */
const gicon = (t, bg) => `<span style="display:grid;place-items:center;width:80%;height:80%;margin:10%;background:${bg || '#8a8a94'};border:2px solid #2a2a33;border-radius:12%;color:#fff;font-weight:700;font-size:calc(var(--u)*1.7);text-align:center;line-height:1.05">${t}</span>`;
const NOTES = {
  ev_env:{hand:true, html:'<span class="head">For Mary</span><span class="big">Last day! I’ve gone to the hall.</span><span>Will you lock up 5H for me, Mary? The classroom key is in my desk drawer. Its code is the beans’ heights, read in the order I asked you to water them.</span><span class="sign">— Mr H.</span>'},
  wnote:{hand:true, html:`<div style="position:relative;padding:calc(var(--u)*1.5) calc(var(--u)*2)"><svg viewBox="0 0 320 120" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true"><path d="M0 0H154l-6 14 8 12-7 13 9 11-8 14 7 12-6 14 8 12-5 18H0z" fill="#f6ecd3"/><path d="M160 0H320v120H152l5-18-8-12 6-14-7-12 8-14-9-11 7-13-8-12z" fill="#fbf4e2"/><path d="M154 0l-6 14 8 12-7 13 9 11-8 14 7 12-6 14 8 12-5 18" fill="none" stroke="#c9b98f" stroke-width="1.2" stroke-dasharray="3 2"/><rect x="128" y="34" width="58" height="22" rx="2" transform="rotate(-8 157 45)" fill="rgba(255,236,160,.55)" stroke="rgba(190,170,90,.6)"/><rect x="132" y="78" width="54" height="20" rx="2" transform="rotate(6 159 88)" fill="rgba(255,236,160,.55)" stroke="rgba(190,170,90,.6)"/></svg><span class="head" style="position:relative;display:block">A torn note, taped together</span><span class="big" style="position:relative;display:block">Beans: water one pot per lesson,</span><span style="position:relative;display:block">in today’s lesson order.</span><span class="sign" style="position:relative;display:block">— H.</span></div>`}
};
const ITEMS = {
  ev_env:{name:'note from Mr Hollis', note:'ev_env', icon:'<img src="../art/classroom/item-envelope.png" alt="">', spent:() => S.deskOpen},
  skey:{name:'small key', icon:'<img src="../art/eval/c5h/item-skey.png" alt="">'},
  ruler:{name:'ruler', icon:gicon('RULER', '#d9a622')},
  half1:{name:'left half of a note', icon:gicon('½ note', '#c8bfa8')},
  half2:{name:'right half of a note', icon:gicon('note ½', '#c8bfa8')},
  wnote:{name:'watering note', note:'wnote', icon:gicon('NOTE', '#c8bfa8'), spent:() => S.deskOpen},
  dkey:{name:'classroom key', icon:gicon('5H KEY', '#a8844a')}
};
/* ---------- what the game draws on the walls, so wall and close-up agree ---------- */
function wrap(...kids){ const d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;pointer-events:none'; kids.forEach(k => d.appendChild(k)); return d; }
function ttRows(x0, y0, cw, rh, fs, isz){ /* the five day rows: the day in the first cell, four lessons, one blank */
  let out = '';
  Object.entries(WEEK).forEach(([day, row], r) => {
    const y = y0 + r*rh;
    out += `<text x="${x0 + cw/2}" y="${y + rh/2 + fs*0.36}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="#2b2836" font-family="${FONT}">${day}</text>`;
    row.forEach((k, i) => { out += ic(k, x0 + cw*(i+1) + (cw-isz)/2, y + (rh-isz)/2, isz); });
  });
  return out;
}
function wallTimetable(){ /* the poster's grid has four rows and the week has five days, so the game paints the whole grid over the poster's cell area: six columns under the six icons (the poster's own column rules), five day rows */
  const d = document.createElement('div'); d.className = 'layer'; d.style.cssText = 'left:38.18%;top:24.17%;width:25.1%;height:17.5%';
  const cols = [733, 814, 894, 974, 1054, 1135, 1215].map(x => (x - 733)/482*482); /* the poster's rules, in the grid's own pixels */
  const rh = 189/5;
  d.innerHTML = `<svg viewBox="0 0 482 189" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true"><rect x="0" y="0" width="482" height="189" fill="#f4f1ea"/>${[1,2,3,4].map(r => `<line x1="0" x2="482" y1="${r*rh}" y2="${r*rh}" stroke="#b9cfd0" stroke-width="2"/>`).join('')}${cols.slice(1, -1).map(x => `<line x1="${x}" x2="${x}" y1="0" y2="189" stroke="#b9cfd0" stroke-width="2"/>`).join('')}<rect x="1" y="1" width="480" height="187" fill="none" stroke="#2f7c83" stroke-width="2"/>${ttRows(0, 0, 482/6, rh, 15, 24)}</svg>`;
  return d;
}
function wallBoard(){ /* the whiteboard: only the date, in marker pen, top left */
  const d = document.createElement('div'); d.style.cssText = 'position:absolute;left:38%;top:16.5%;pointer-events:none;font-family:Caprasimo,Georgia,serif;font-size:calc(var(--u)*2.1);color:#2f5f8a;transform:rotate(-1.5deg)';
  d.textContent = DATE; return d;
}
const LABEL = [[0.27, 0.50, 0.46, 0.19], [0.29, 0.67, 0.43, 0.13], [0.29, 0.80, 0.34, 0.07], [0.32, 0.84, 0.36, 0.06]]; /* each pot's blank label, as a share of its cut-out */
function wallLabels(){ /* one lesson icon on each pot's label; the pots are pinned, so the labels never move */
  const kids = [GEO2.pot1, GEO2.pot2, GEO2.pot3, GEO2.pot4].map((g, i) => { const [lx, ly, lw, lh] = LABEL[i], k = POTS[i][0];
    const d = document.createElement('div'); d.style.cssText = `position:absolute;left:${g.l + g.w*lx}%;top:${g.t + g.h*ly}%;width:${g.w*lw}%;height:${g.h*lh}%;display:grid;place-items:center`;
    d.innerHTML = `<svg viewBox="0 0 12 12" style="height:85%;aspect-ratio:1" aria-hidden="true">${ic(k, 0, 0, 12)}</svg>`; return d; });
  return wrap(...kids);
}
const LEAF_OPEN = 'perspective(900px) rotateY(-78deg)';
function leafImg(open){ const c = CUT.door; return `<img id="leaf" src="../art/eval/c5h/layer-door.png?v=${BUILD}" alt="" style="position:absolute;left:${c.l}%;top:${c.t}%;width:${c.w}%;transform-origin:0 50%;transform:${open ? LEAF_OPEN : 'none'};pointer-events:none;filter:drop-shadow(6px 0 8px rgba(0,0,0,.35))">`; }
function wallDoorway(){ /* the ending: the doorway behind the leaf is drawn as the corridor with its light on the floor, and the leaf stands open on its hinge */
  const c = CUT.door, d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;pointer-events:none';
  d.innerHTML = `<div style="position:absolute;left:${c.l}%;top:${c.t}%;width:${c.w}%;height:${c.h}%;background:linear-gradient(#f6f1e3 0%,#f1ebdb 62%,#d9c9a4 62.5%,#e9dcb8 100%);box-shadow:inset 0 0 calc(var(--u)*2) rgba(0,0,0,.25)"></div><div style="position:absolute;left:${c.l + c.w*0.1}%;top:${c.t + c.h}%;width:${c.w*0.95}%;height:14%;background:linear-gradient(rgba(255,248,220,.55),rgba(255,248,220,0));clip-path:polygon(8% 0,92% 0,100% 100%,0 100%)"></div>${leafImg(true)}`;
  return d;
}
function doorSwing(){ /* the leaf swings open on its left hinge, in perspective, then stays open (MOTH-66) */
  const leaf = $('leaf'); if (!leaf) return;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  leaf.animate([{transform:'perspective(900px) rotateY(0deg)'}, {transform:LEAF_OPEN}], {duration:reduce ? 10 : 1100, easing:'cubic-bezier(.3,.7,.3,1)', fill:'forwards'});
}
/* Drawers open and shut (owner, 22 Oct 2026; MOTH-54). Once unlocked, a drawer is drawn by the stage: a dark gap and the front,
   which slides out and back with a short transition on each tap, in the room and in its close-up alike; what is inside shows only
   while it is out. The engine has slide-open only, so this stays in the stage until backlog 26. */
const DRAWERS = {cab:{cut:CUT.cabdrawer, src:'layer-cabdrawer.png', out:() => S.cabOut, unlocked:() => S.cabUnlocked}, desk:{cut:CUT.tdrawer, src:'layer-tdrawer.png', out:() => S.deskOut, unlocked:() => S.deskOpen}};
const OUT_T = 'translateY(50%) scale(1.1)', OUT_F = 'drop-shadow(0 4px 4px rgba(0,0,0,.35))';
function drawerHTML(k, id, inside){ const D = DRAWERS[k], out = D.out();
  return `<div style="position:absolute;left:3%;top:8%;width:94%;height:90%;background:rgba(30,22,18,.82);box-shadow:inset 0 0 calc(var(--u)*1.2) #000;pointer-events:none"></div>${inside || ''}<img id="${id}" src="../art/eval/c5h/${D.src}?v=${BUILD}" alt="" style="position:absolute;left:0;top:0;width:100%;pointer-events:none;transform-origin:50% 50%;transform:${out ? OUT_T : 'none'};filter:${out ? OUT_F : 'none'};transition:transform .45s cubic-bezier(.3,.9,.4,1),filter .45s">`; }
function wallDrawer(k){ const c = DRAWERS[k].cut, d = document.createElement('div'); d.style.cssText = `position:absolute;left:${c.l}%;top:${c.t}%;width:${c.w}%;height:${c.h}%;pointer-events:none`; d.innerHTML = drawerHTML(k, 'ov-' + k); return d; }
/* The key tumbles out of the coat pocket (MOTH-63): a stage overlay animates the fall from the pocket to the floor with two bounces,
   then the floor cut-out takes over at rest. The engine's fall-and-land movement is still on the backlog. */
const KEYHOLE = '<svg viewBox="0 0 10 14" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%"><circle cx="5" cy="5" r="4" fill="#1d1d22"/><path d="M3.6 7h2.8l1 6H2.6z" fill="#1d1d22"/></svg>';
function wallKeyhole(){ /* the lock on the top drawer, drawn on the wall as well as in the close-up (MOTH-59) */
  const c = CUT.cabdrawer, d = document.createElement('div'); d.style.cssText = `position:absolute;left:${c.l + c.w*0.07}%;top:${c.t + c.h*0.38}%;width:${c.w*0.05}%;height:${c.h*0.11}%;pointer-events:none`; d.innerHTML = KEYHOLE; return d;
}
function keyTumble(){
  const im = document.createElement('img'); im.src = '../art/eval/c5h/item-skey.png?v=' + BUILD; im.alt = '';
  const L = LAYERS.c3.find(x => x.group === 'fkey'); im.style.cssText = `position:absolute;left:${L.l}%;top:${L.t}%;width:${L.w}%;pointer-events:none;transform-origin:50% 50%;filter:drop-shadow(1px 2px 2px rgba(0,0,0,.35))`;
  $('hots').appendChild(im);
  const dx = (72.5 - L.l), dy = (49 - L.t); /* from the pocket, in scene percentages */
  const toPx = (px, py) => { const r = $('hots').getBoundingClientRect(); return [px/100*r.width, py/100*r.height]; };
  const [sx, sy] = toPx(dx, dy), [bx] = toPx(dx*0.45, 0), [cx] = toPx(dx*0.18, 0), [, b1] = toPx(0, 6), [, b2] = toPx(0, 2.5);
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const anim = im.animate([
    {transform:`translate(${sx}px,${sy}px) rotate(-60deg)`, opacity:0}, {transform:`translate(${sx}px,${sy}px) rotate(-60deg)`, opacity:1, offset:0.08},
    {transform:`translate(${bx}px,0px) rotate(40deg)`, offset:0.5}, {transform:`translate(${cx}px,${-b1}px) rotate(80deg)`, offset:0.68},
    {transform:`translate(${cx*0.4}px,0px) rotate(110deg)`, offset:0.82}, {transform:`translate(0px,${-b2}px) rotate(120deg)`, offset:0.91}, {transform:'translate(0,0) rotate(0deg)'}
  ], {duration:reduce ? 10 : 1100, easing:'linear', fill:'forwards'});
  setTimeout(() => sfx('tick'), reduce ? 0 : 560);
  anim.onfinish = () => { S.keyDown = true; save(); render(); };
}
function toggleDrawer(k, line){ const D = DRAWERS[k], out = !D.out(); if (k === 'cab') S.cabOut = out; else S.deskOut = out; save(); sfx(out ? 'open' : 'close');
  ['ov-' + k, 'cu-' + k].forEach(id => { const im = $(id); if (im){ im.style.transform = out ? OUT_T : 'none'; im.style.filter = out ? OUT_F : 'none'; } });
  document.querySelectorAll('.inside-' + k).forEach(el => { el.style.display = out ? '' : 'none'; });
  if (line) say(line); return out; }
/* ---------- close-ups ---------- */
/* a close-up made from the wall itself: the region (x0, y0, w px of the 1920×1080 picture) fills the 16:9 card */
const zoom = (src, x0, y0, w = 480) => { const h = w*9/16; return `background-image:url(${src}?v=${BUILD});background-size:${(1920/w*100).toFixed(1)}% ${(1080/h*100).toFixed(1)}%;background-position:${(x0/(1920-w)*100).toFixed(1)}% ${(y0/(1080-h)*100).toFixed(1)}%`; };
/* What takes an item in the room takes it in its close-up (owner, 22 Oct 2026; MOTH-51, MOTH-50): a close-up carries its own
   tap target over the thing, and a held item is used on it exactly as on the room's hotspot of the same id. A plain tap says the line. */
const cuTarget = (id, label, [l, t, w, h]) => `<button class="cuhot" data-cu="${id}" aria-label="${label}" style="position:absolute;left:${l}%;top:${t}%;width:${w}%;height:${h}%;background:transparent;border:0;cursor:pointer"></button>`;
function wireCu(plain){ document.querySelectorAll('#closeup .cuhot').forEach(b => b.onclick = e => { e.stopPropagation(); const id = b.dataset.cu;
  if (S.held){ const item = S.held; S.held = null; if (USES[item + '>' + id] && !NO_CLOSE[id]) closeCloseup(); useItem(item, id, null); return; }
  if (plain && plain[id]) plain[id](); }); }
const NO_CLOSE = {ev_beans:true}; /* measuring shows its result in the same close-up */
/* USES keys for close-up-only targets: a held item on the shoe or the hat gets the friendly miss line */
/* a found thing, as a stand-in until Gate D: a scrap of paper or a tag the player taps to take (finding is a close-up, MOTH-49) */
const paper = (id, text, [l, t, w], rot = -8) => `<button id="${id}" style="position:absolute;left:${l}%;top:${t}%;width:${w}%;aspect-ratio:1.6;transform:rotate(${rot}deg);background:#fbf4e2;border:1px solid #6a5a44;border-radius:2px;box-shadow:1px 2px 3px rgba(0,0,0,.3);font-size:calc(var(--u)*1.6);color:#4a3b2a;font-family:Caprasimo,Georgia,serif;cursor:pointer">${text}</button>`;
/* The bin, looked into from the top (owner, 22 Oct 2026; MOTH-52): a stand-in drawn by code until Gate D. Five bits of rubbish lie
   on top of each other; a tap shoves one aside (it slides to the rim and stays there), and the half note is under the last two.
   Moving the rubbish by dragging is backlog 27; a tap-to-shove stands in. */
const RUBBISH = [ /* id, label, resting spot (l, t, w, rotation) on the bin's floor, where it goes when shoved (up the inside wall), and the picture (Gate E samples, 24 Oct 2026) */
  {id:'r1', label:'a crumpled page', at:[33, 30, 23, -12], to:[7, 12, 20, 28], src:'layer-rub-page.png'},
  {id:'r2', label:'a juice carton', at:[52, 24, 14, 18], to:[78, 10, 13, 40], src:'layer-rub-carton.png'},
  {id:'r3', label:'a crust', at:[28, 50, 19, 6], to:[5, 60, 17, -24], src:'layer-rub-crust.png'},
  {id:'r4', label:'a ball of paper', at:[48, 44, 17, 0], to:[78, 56, 16, -30], src:'layer-rub-ball.png'},
  {id:'r5', label:'an apple core', at:[40, 36, 16, -20], to:[8, 36, 14, 26], src:'layer-rub-core.png'}
];
const UNDER = ['r4', 'r5']; /* the half note is under these two */
function openBin(){
  const gone = S.binDone || S.got.includes('half1') || S.got.includes('wnote'), moved = S.binMoved || [];
  const noteShows = !gone && UNDER.every(id => moved.includes(id));
  const pieces = RUBBISH.map(r => { const m = moved.includes(r.id), [l, t, w, rot] = m ? r.to : r.at;
    return `<button class="rub" data-r="${r.id}" aria-label="${r.label}${m ? ', pushed aside' : ''}" style="position:absolute;left:${l}%;top:${t}%;width:${w}%;aspect-ratio:1;transform:rotate(${rot}deg);background:transparent;border:0;padding:0;cursor:pointer;transition:left .5s cubic-bezier(.3,.9,.4,1),top .5s cubic-bezier(.3,.9,.4,1),transform .5s;filter:drop-shadow(2px 4px 3px rgba(0,0,0,.45))"><img src="../art/eval/c5h/${r.src}?v=${BUILD}" alt="" style="width:100%;display:block;pointer-events:none"></button>`; }).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background-image:url(../art/eval/c5h/closeup-bin.jpg?v=${BUILD})"><p class="otitle">Into the bin</p>
    ${noteShows ? paper('takeHalf1', '½ note', [42, 44, 14], -14) : (!gone ? `<div id="binNote" style="position:absolute;left:42%;top:44%;width:14%;aspect-ratio:1.6;transform:rotate(-14deg);background:#fbf4e2;border:1px solid #6a5a44;opacity:${UNDER.some(id => moved.includes(id)) ? .9 : .35}"></div>` : '')}
    ${pieces}</div><p class="ofb" id="binFb">${gone ? 'Paper, a crust, a carton and an apple core. Nothing else now.' : noteShows ? 'There! Half a note, torn down the middle, in Mr Hollis’s writing.' : 'Looking down into the bin. Paper, a crust, a carton… Push things aside to see what is underneath.'}</p></div>`);
  document.querySelectorAll('#closeup .rub').forEach(b => b.onclick = e => { e.stopPropagation(); const id = b.dataset.r, r = RUBBISH.find(x => x.id === id); if (!S.binMoved) S.binMoved = [];
    const m = S.binMoved.includes(id); S.binMoved = m ? S.binMoved.filter(x => x !== id) : [...S.binMoved, id]; save(); sfx('paper');
    const [l, t, w, rot] = m ? r.at : r.to; b.style.left = l + '%'; b.style.top = t + '%'; b.style.transform = `rotate(${rot}deg)`;
    const shows = !gone && UNDER.every(x => S.binMoved.includes(x)); const n = $('binNote'); if (n) n.style.opacity = UNDER.some(x => S.binMoved.includes(x)) ? .9 : .35;
    if (shows && !$('takeHalf1')){ const n = $('binNote'); if (n) n.remove(); const pic = document.querySelector('#closeup .shelfpic'); pic.insertAdjacentHTML('beforeend', paper('takeHalf1', '½ note', [42, 44, 14], -14)); wireHalf1(); $('binFb').textContent = 'There! Half a note, torn down the middle, in Mr Hollis’s writing.'; }
    else $('binFb').textContent = m ? 'Back it goes.' : UNDER.some(x => S.binMoved.includes(x)) ? 'Pushed aside. Something pale underneath…' : 'Pushed aside.'; });
  wireHalf1();
}
function wireHalf1(){ const b = $('takeHalf1'); if (b) b.onclick = e => { e.stopPropagation(); S.binDone = true; S.got.push('half1'); save(); sfx('pickup'); closeCloseup(); render(); say('Half a note, torn down the middle, in Mr Hollis’s writing. It goes in the strip below.'); }; }
function openBox(){ /* the lost property box, close up, from the wall; the hat is a target that opens its own close-up */
  const gone = S.got.includes('half2') || S.got.includes('wnote');
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="${zoom(WALLS.c3, 1230, 600)}"><p class="otitle">Lost property</p>${cuTarget('ev_hat', 'The blue hat', [50, 14, 24, 28])}${cuTarget('ev_shoe', 'The red shoe', [24, 8, 26, 30])}</div><p class="ofb">${gone ? 'A shoe, a hat, and a lunchbox that has been here since March.' : S.popped ? 'A red shoe and a blue hat. Have a look in the hat.' : 'A red shoe and a blue hat.'}</p></div>`);
  wireCu({ev_hat:openHat, ev_shoe:() => say('One red shoe, size small. Nobody has missed it.')});
}
/* Into the hat (owner, 22 Oct 2026; MOTH-53): a stand-in drawn by code until Gate D. The cap upturned, its band, and the torn corner
   tucked under the band once the box has been bumped. */
function openHat(){
  const gone = S.got.includes('half2') || S.got.includes('wnote');
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background-image:url(../art/eval/c5h/closeup-hat.jpg?v=${BUILD})"><p class="otitle">Inside the hat</p>
    ${S.popped && !gone ? paper('takeHalf2', 'note ½', [58, 50, 11], 28) : ''}</div><p class="ofb">${gone ? 'The inside of the cap: a sweatband and a name tape, worn blank.' : S.popped ? 'Tucked under the band: a torn corner of paper.' : 'The inside of the cap. The band is tight all the way round.'}</p></div>`);
  const b = $('takeHalf2'); if (b) b.onclick = e => { e.stopPropagation(); S.got.push('half2'); save(); sfx('pickup'); closeCloseup(); render(); say('The other half of the note, tucked in the hat’s band. Torn, taped once already, and torn again. It goes in the strip below.'); };
}
function openBoard(again){
  if (!again){ S.seen.day = Date.now(); save(); }
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background:#f7f7f4;border-radius:calc(var(--u)*.6)"><p class="otitle">Whiteboard</p><p style="position:absolute;left:6%;top:24%;margin:0;font-family:Caprasimo,Georgia,serif;font-size:calc(var(--u)*4.2);color:#2f5f8a;transform:rotate(-1.5deg)">${DATE}</p></div><p class="ofb">Wiped clean for the holidays. Only today’s date is left, in Mr Hollis’s pen.</p></div>`);
  if (!again) say(copyClue('board').trim());
}
function openTimetable(again){
  if (!again){ S.seen.thu = Date.now(); save(); }
  const key = HEADER.map((k, i) => `<rect x="${8 + i*52}" y="24" width="50" height="26" rx="2" fill="${['#f6c445', '#5aa7d8', '#b48be0', '#f0a0a8', '#8ad0a8', '#f4a040'][i]}"/>` + ic(k, 8 + i*52 + 15, 27, 20)).join('');
  openCloseup(`<div class="card tt"><svg viewBox="0 0 322 190" aria-label="The class timetable: six lessons across the top, the days down the side, each day’s lessons in order"><rect width="322" height="190" rx="4" fill="#fffdf6"/><rect width="322" height="20" fill="#2f7c83"/><text x="161" y="14.5" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fffdf6" letter-spacing="1" font-family="${FONT}">5H TIMETABLE</text>${key}<g>${Object.keys(WEEK).map((d, r) => `<rect x="8" y="${54 + r*26}" width="312" height="26" fill="${r%2 ? '#eef3ee' : '#f7f9f3'}" stroke="#cfc8b4" stroke-width=".6"/>`).join('')}${ttRows(8, 54, 52, 26, 10, 18)}</g></svg></div>`);
  if (!again) say(copyClue('timetable').trim());
}
function potsSVG(measured){ /* stand-in for the pot close-up (Gate D asset 11): four pots on the sill, their labels, and the ruler against each once measured */
  const base = 150, scale = 11;
  const pots = POTS.map(([k, h], i) => { const x = 40 + i*70, top = base - h*scale;
    return `<rect x="${x}" y="${base}" width="40" height="22" rx="3" fill="#c9733e" stroke="#2b2836"/><rect x="${x+8}" y="${base+6}" width="24" height="11" rx="2" fill="#f3e9d2" stroke="#2b2836" stroke-width=".6"/>${ic(k, x+15, base+7, 9)}<path d="M${x+20} ${base} V${top}" stroke="#4c9a3a" stroke-width="3" stroke-linecap="round"/><ellipse cx="${x+14}" cy="${top+4}" rx="6" ry="3.5" fill="#6cc04a" stroke="#2b2836" stroke-width=".6"/><ellipse cx="${x+26}" cy="${top+2}" rx="6" ry="3.5" fill="#6cc04a" stroke="#2b2836" stroke-width=".6"/>${measured ? `<rect x="${x+44}" y="${top}" width="7" height="${h*scale}" fill="#f3d26a" stroke="#2b2836" stroke-width=".6"/><text x="${x+47.5}" y="${top-4}" text-anchor="middle" font-size="9" font-weight="700" fill="#2b2836" font-family="${FONT}">${h} cm</text>` : ''}`; }).join('');
  return `<svg viewBox="0 0 320 180" style="position:absolute;inset:0;width:100%;height:100%" aria-label="${measured ? 'The four bean plants measured: ' + POTS.map(p => p[1]).join(', ') + ' centimetres, left to right' : 'The four bean plants on the sill, each pot with a lesson picture on its label'}"><rect x="0" y="150" width="320" height="30" fill="#e6dcc3"/><rect x="0" y="150" width="320" height="4" fill="#cdbf9e"/>${pots}</svg>`;
}
function openPots(again){
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background:#d9ecf7;border-radius:calc(var(--u)*.6)"><p class="otitle">The bean pots (stand-in)</p>${potsSVG(S.measured)}${cuTarget('ev_beans', 'The four bean plants', [0, 0, 100, 100])}</div><p class="ofb">${S.measured ? 'Measured: ' + POTS.map(p => `${LESSON[p[0]][2]} ${p[1]} cm`).join(', ') + '.' : S.got.includes('ruler') ? 'You have a ruler. Tap it in the strip, then tap the plants.' : 'Four pots, each with a lesson picture on its label. Mr H wants their heights.'}</p></div>`);
  wireCu({ev_beans:() => { document.querySelector('#closeup .ofb').textContent = S.measured ? 'Measured already: ' + POTS.map(p => `${p[1]} cm`).join(', ') + '.' : S.got.includes('ruler') ? 'Hold the ruler first: tap it in the strip below, then tap the plants.' : 'Four bean plants, four heights. Nothing to measure them with yet.'; }});
  if (!again) say('');
}
function measure(){
  if (!S.measured){ S.measured = Date.now(); S.seen.heights = S.measured; save(); }
  openPots(true); say(copyClue('pots').trim());
}
function openCabinet(){ /* locked: the cabinet close up, with the keyhole the game draws; unlocked: the top drawer close up (MOTH-61), opening and shutting on a tap, the ruler inside while it is out */
  if (!S.cabUnlocked){
    openCloseup(`<div class="card shelf"><div class="shelfpic" style="${zoom(WALLS.c4, 1160, 560, 640)}"><p class="otitle">Filing cabinet</p>${cuTarget('ev_cabinet', 'The top drawer and its lock', [30, 10, 45, 42])}<div style="position:absolute;left:37%;top:28%;width:3%;aspect-ratio:10/14;pointer-events:none">${KEYHOLE}</div></div><p class="ofb" id="cabFb">The top drawer has a tiny lock. A small key would fit it.</p></div>`);
    wireCu({ev_cabinet:() => { $('cabFb').textContent = S.got.includes('skey') ? 'A tiny lock. Hold the small key: tap it in the strip below, then tap the lock.' : 'A tiny lock on the top drawer. It wants a small key.'; }});
    return;
  }
  const ruler = !S.got.includes('ruler') ? `<button class="inside-cab" id="takeRuler" aria-label="A ruler" style="position:absolute;left:10%;top:16%;width:64%;height:30%;background:transparent;border:0;cursor:pointer;pointer-events:auto;display:${S.cabOut ? '' : 'none'}"><span style="display:block;width:100%;height:40%;background:#f3d26a;border:1.5px solid #6a5a2a;border-radius:2px;transform:rotate(-4deg);background-image:repeating-linear-gradient(90deg,#6a5a2a 0 1px,transparent 1px 9%)"></span></button>` : '';
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="${zoom(WALLS.c4, 1290, 580, 400)}"><p class="otitle">The top drawer</p>${cuTarget('ev_cabdrawer', 'The top drawer', [18, 8, 68, 70])}<div style="position:absolute;left:22.5%;top:12%;width:58.25%;height:56.9%;pointer-events:none">${drawerHTML('cab', 'cu-cab', ruler)}</div></div><p class="ofb" id="cabFb">${S.got.includes('ruler') ? (S.cabOut ? 'Open. Empty now.' : 'Shut. Tap it to open it.') : S.cabOut ? 'Open. A ruler inside.' : 'Shut. Tap it to open it.'}</p></div>`);
  const b = $('takeRuler'); if (b) b.onclick = e => { e.stopPropagation(); if (!S.got.includes('ruler')){ S.got.push('ruler'); save(); } sfx('pickup'); closeCloseup(); render(); say('A ruler, thirty centimetres, with a bite out of one corner. It goes in the strip below.'); };
  wireCu({ev_cabdrawer:() => { const out = toggleDrawer('cab'); $('cabFb').textContent = out ? (S.got.includes('ruler') ? 'Open. Empty now.' : 'Open. A ruler inside.') : 'Shut. Tap it to open it.'; }});
}
function unlockCabinet(){
  drop('skey'); S.cabOut = true; save(); render(); sfx('pickup');
  animate({anim:'slideOpen', layer:'cabdrawer'}); setTimeout(() => animate({anim:'sniff', layer:'hamster'}), 900); /* the reward moment, as two single movements until backlog 20 */
  setTimeout(() => { S.cabUnlocked = true; save(); render(); }, 1300); /* then the stage's own drawer takes over, which can shut as well as open */
  say('The small key turns. Click, and the top drawer slides out. Nutmeg sits up to watch.');
}
function openDeskLock(){
  if (S.deskOpen){ openInsideDesk(); return; }
  openCloseup(`<div class="card locker"><p class="otitle">Mr Hollis’s drawer. Four numbers.</p><p class="nbsmall">${S.got.includes('ev_env') ? 'The beans’ heights, in watering order, said the note.' : 'A little lock with four dials.'}</p><div class="dials" id="ddials"></div><p class="ofb" id="deskFb">Tap a dial to turn it.</p><div class="row"><button class="ob" id="openDesk">Open</button></div></div>`);
  $('ddials').innerHTML = S.dials.map((d, i) => `<button class="dial" data-i="${i}" aria-label="Dial ${i+1}, showing ${d}">${d}</button>`).join('');
  $('ddials').querySelectorAll('.dial').forEach(b => b.onclick = () => { const i = +b.dataset.i; S.dials[i] = (S.dials[i] + 1) % 10; b.textContent = S.dials[i]; b.setAttribute('aria-label', `Dial ${i+1}, showing ${S.dials[i]}`); sfx('tick'); save(); });
  $('openDesk').onclick = () => { sfx('tap'); const got = S.dials.join();
    if (got === CODE.join()){ S.deskOpen = true; S.deskOut = true; save(); sfx('pickup'); $('deskFb').textContent = 'Click! Flask, music, pencil, atlas: Thursday’s order.'; setTimeout(() => { closeCloseup(); render(); say('The dials click round and the drawer slides open. Something glints inside.'); setTimeout(openInsideDesk, 1100); }, 800); return; }
    sfx('knock');
    if (got === TRAP_TALL.join()) $('deskFb').textContent = 'Tallest first? The beans don’t mind how tall they are. Read the notes again.';
    else if (got === TRAP_LEFT.join()) $('deskFb').textContent = 'That’s just left to right along the sill.';
    else if (Object.keys(WEEK).some(d => d !== TODAY && codeFor(d) && codeFor(d).join() === got)) $('deskFb').textContent = 'The right heights, but not today’s order.';
    else $('deskFb').textContent = 'It doesn’t budge.'; };
}
function openInsideDesk(){ /* Mr Hollis's drawer, close up (MOTH-61): a tap shuts or opens it; the key is inside while it is out. The look-down-into-it picture is a Gate D asset (MOTH-65); until then the front, zoomed tight, with the key large */
  const key = !taken('dkey') ? `<button class="inside-desk" id="takeKey" aria-label="The classroom key" style="position:absolute;left:14%;top:14%;width:72%;height:62%;background:transparent;border:0;cursor:pointer;pointer-events:auto;display:${S.deskOut ? '' : 'none'}"><img src="../art/greybox/tab-key.png?v=${BUILD}" alt="" style="width:80%;display:block;margin:auto;transform:rotate(-16deg);filter:drop-shadow(0 0 8px #ffe08a) drop-shadow(0 0 3px #fff)"></button>` : '';
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="${zoom(WALLS.c1, 1480, 600, 320)}"><p class="otitle">Mr Hollis’s drawer</p>${cuTarget('ev_tdrawer', 'The drawer', [16, 28, 68, 56])}<div style="position:absolute;left:21.6%;top:35%;width:57.2%;height:41.1%;pointer-events:none">${drawerHTML('desk', 'cu-desk', key)}</div></div><p class="ofb" id="deskFb2">${S.deskOut ? (taken('dkey') ? 'Paper clips, a whistle, and the space where the key was.' : 'Paper clips, a whistle, and the classroom key on its 5H tag.') : 'Shut. Tap it to open it.'}</p></div>`);
  const b = $('takeKey'); if (b) b.onclick = e => { e.stopPropagation(); take('dkey'); sfx('pickup'); closeCloseup(); render(); say('The classroom key, on its 5H tag. It goes in the strip below. Now: lock up.'); };
  wireCu({ev_tdrawer:() => { const out = toggleDrawer('desk'); $('deskFb2').textContent = out ? (taken('dkey') ? 'Open. Paper clips and a whistle.' : 'Open. The classroom key, on its 5H tag.') : 'Shut. Tap it to open it.'; }});
}
function lockUp(){ /* the drag: turn the key in the door; then the door swings, Mary steps out, and the end card */
  openDrag({pic:WALLS.c3, title:'Turn the key', tab:'../art/greybox/tab-key.png', tabW:4, tabRatio:'240/110', path:[[53.5, 44], [56.5, 45.5], [58, 48.5], [56.5, 51.5], [53.5, 53]], label:'Put the key in the lock and turn it, all the way round.', missLabel:'Take hold of the key, by the knob.', moreLabel:'Keep turning, all the way.', doneLabel:'Click, clunk.', lineColour:'rgba(0,0,0,0)', lineLight:'rgba(0,0,0,0)', lineWidth:1,
    done:() => { drop('dkey'); S.locked = true; save(); render(); sfx('tick'); doorSwing(); say('The key turns. Mary slips out into the corridor, pulls the door to, and locks 5H behind her for the summer.'); setTimeout(ending, 2200); }});
}
function ending(){
  S.done = true; save();
  showEnd('Locked up!', 'Mr Hollis asked ME to lock up 5H on the last day! The key was in his drawer behind a code, and the code was the beans’ heights in watering order, which was Thursday’s lessons: flask, music, pencil, atlas. I found a tiny key in a coat pocket, measured the beans with a ruler from the filing cabinet, and taped two halves of a note back together. Nutmeg watched the whole thing. Then I turned the big key and the classroom was shut for the summer.');
}
/* ---------- using things ---------- */
const USES = {
  'skey>ev_cabinet': unlockCabinet,
  'ruler>ev_beans': measure,
  'half1>item:half2': () => joinNote(), 'half2>item:half1': () => joinNote(),
  'dkey>ev_door': () => { if (S.done){ say('Locked already. Holidays!'); return; } lockUp(); }
};
function joinNote(){ drop('half1'); drop('half2'); S.got.push('wnote'); S.seen.wnote = Date.now(); save(); sfx('paper'); render(); say('The two halves fit. Taped together, the note reads again.'); setTimeout(() => openNote('wnote'), 500); }
function miss(item, id){
  const msgs = {skey:'Too small for that.', dkey:'That’s the classroom key. It locks the door.', ruler:'Mr H wants heights. Beans have heights.', half1:'Half a note. The other half must be somewhere.', half2:'Half a note. The other half must be somewhere.'};
  if (item === 'half1' && id === 'item:half2' || item === 'half2' && id === 'item:half1') return;
  say(msgs[item] || `The ${ITEMS[item].name} doesn’t go there.`);
}
function act(id){
  switch(id){
    case 'ev_envelope': S.got.push('ev_env'); sfx('pickup'); setTimeout(() => { render(); openNote('ev_env'); }, 700); say('An envelope with your name on it, in Mr Hollis’s writing.'); return;
    case 'ev_pegs':
      if (!S.keyDown){ keyTumble(); say('The raincoat swings on its peg… and something small drops out of the pocket and skitters across the floor, over by the door.'); return; }
      say(taken('skey') ? 'One forgotten raincoat, its pocket empty now.' : 'The raincoat swings. Whatever fell out is on the floor, over by the door.'); return;
    case 'ev_fkey': take('skey'); sfx('pickup'); setTimeout(render, 500); say('A small silver key. Far too small for a door. It goes in the strip below.'); return;
    case 'ev_bin': openBin(); return; /* the zoom is the whole answer to the tap (MOTH-58): the bin from the top (MOTH-49, MOTH-52) */
    case 'ev_lost':
      if (!S.popped){ S.popped = true; save(); }
      openBox(); return;
    case 'ev_cabinet': openCabinet(); return;
    case 'ev_cabdrawer': /* in the room (MOTH-54, MOTH-61): locked, the cabinet close up; shut, a tap slides it open; open, a tap zooms into the drawer, where it can be shut again */
      if (!S.cabUnlocked){ openCabinet(); return; }
      if (!S.cabOut){ toggleDrawer('cab', S.got.includes('ruler') ? 'The top drawer slides open. Empty now.' : 'The top drawer slides open.'); return; }
      openCabinet(); return;
    case 'ev_tdesk': say(S.deskOpen ? (S.deskOut ? 'Mr Hollis’s desk, its drawer open.' : 'Mr Hollis’s desk. The drawer is unlocked now.') : 'Mr Hollis’s desk: his mug, his books, an apple. The drawer has a little lock with four number dials.'); return;
    case 'ev_tdrawer': /* the drawer is the only way to the dials (MOTH-61); unlocked, it opens on a tap and zooms on the next */
      if (!S.deskOpen){ openDeskLock(); return; }
      if (!S.deskOut){ toggleDrawer('desk', taken('dkey') ? 'The drawer slides open. Paper clips and a whistle.' : 'The drawer slides open. Something glints inside.'); return; }
      openInsideDesk(); return;
    case 'ev_board': openBoard(); return;
    case 'ev_timetable': openTimetable(); return;
    case 'ev_beans': openPots(); return;
    case 'ev_door':
      if (S.done){ say('Locked for the summer.'); return; }
      say(S.got.includes('dkey') ? 'The door. Hold the key and tap the door to lock up.' : 'Mary could just go. But Mr H asked her to lock up, and the key is in his desk.'); return;
    case 'ev_hamster': animate({anim:'sniff', layer:'hamster'}); say(S.done ? 'Nutmeg, up on his back legs, watching you go.' : 'Nutmeg sniffs at the bars. He is staying for the holidays with Mr Hollis.'); return;
    case 'ev_bag': say('Mary’s bag, packed. Only the locking-up left.'); return;
    case 'ev_desk': say(S.got.includes('ev_env') ? 'The desk, bare but for the pencil case.' : 'Your desk. There is an envelope on it.'); return;
    case 'ev_clock': say('Twenty to three. Mr Hollis will be back from the hall at three.'); return;
    case 'ev_rules': say('<b>Class rules.</b> 1. Be kind. 2. Listen with your whole face. 3. Water the beans when it is your lesson. 4. Nobody goes home without their jumper.'); return;
    case 'ev_bookshelf': say('Reading books, dictionaries, and the comics everyone pretends not to read.'); return;
    case 'ev_window': say('Sunshine, a plane climbing into the sky, and dust turning in the light.'); return;
    case 'ev_radiator': say('Off, obviously. It is Singapore.'); return;
    case 'ev_cupboard': say('The supplies cupboard, swept bare for the holidays. A faint smell of poster paint.'); return;
    default: say('Painted into the wall: it does not move.'); return;
  }
}
/* ---------- hints, the notebook, clues ---------- */
const HINTS = [
  {goal:() => S.got.includes('ev_env'), target:'ev_envelope', tips:['Something’s waiting on your desk.', 'Turn to the timetable wall. Your desk.', 'Pick up the envelope and read it.']},
  {trail:'a', goal:() => taken('skey'), target:'ev_pegs', tips:['Coats keep all sorts in their pockets.', 'The raincoat on the pegs, by the door.', 'Tap the raincoat: a key falls out of its pocket. Pick it up off the floor.']},
  {trail:'a', goal:() => S.got.includes('ruler'), target:'ev_cabinet', tips:['That little key fits something small and locked.', 'The filing cabinet under Nutmeg has a tiny lock.', 'Hold the small key and tap the filing cabinet. Tap the open drawer to look inside, and take the ruler.']},
  {trail:'a', goal:() => !!S.measured, target:'ev_beans', tips:['Mr H wants heights. What could you measure with?', 'The ruler, against the bean plants on the sill.', 'Hold the ruler and tap the bean pots: 2, 4, 6 and 9 cm.']},
  {trail:'b', goal:() => S.got.includes('half1') || S.got.includes('wnote'), target:'ev_bin', tips:['Somebody threw something away.', 'The recycling bin by the door. Look right down into it.', 'Tap the bin, then push the rubbish aside: half a note is at the bottom.']},
  {trail:'b', goal:() => S.got.includes('half2') || S.got.includes('wnote'), target:'ev_lost', tips:['Half a note is only half a clue. Where does the rest of a thing end up?', 'The lost property box, under the pegs. Try the hat.', 'Tap the box, then the blue hat: the corner is tucked in its band.']},
  {trail:'b', goal:() => S.got.includes('wnote'), tips:['Two halves make a whole.', 'Both halves are in the strip below.', 'Hold one half and tap the other.']},
  {trail:'c', goal:() => !!S.seen.day, target:'ev_board', tips:['The note says today. What day is it?', 'Something in the room has the date on it.', 'Tap the whiteboard: Thursday.']},
  {trail:'c', goal:() => !!S.seen.thu, target:'ev_timetable', tips:['What happens on a Thursday in 5H?', 'The timetable, by Mary’s desk.', 'Tap the timetable. Thursday: flask, music, pencil, atlas.']},
  {trail:'c', goal:() => S.deskOpen, target:'ev_tdrawer', tips:['Each pot has a lesson on its label.', 'Thursday’s lessons, in order, each turned into its pot’s height.', 'Flask 4, music 9, pencil 6, atlas 2: set the drawer’s dials to 4 9 6 2.']},
  {goal:() => taken('dkey'), target:'ev_tdrawer', tips:['The drawer is unlocked.', 'Look inside Mr Hollis’s drawer.', 'Tap the drawer to open it, tap it again to look inside, and take the classroom key.']},
  {goal:() => S.done, target:'ev_door', tips:['You have the key. Mr H asked you to lock up.', 'Hold the classroom key and tap the door.', 'Hold the key, tap the door, then turn the key all the way round.']}
];
function rows(){
  const first = t => HINTS.findIndex(h => h.trail === t && !h.goal());
  const out = [];
  if (!S.got.includes('ev_env')){ out.push([0, 'Something on my desk?', 'not yet', false]); return out; }
  const a = !!S.measured, b = S.got.includes('wnote'), c = S.deskOpen;
  out.push([a ? -1 : first('a'), 'The beans’ heights', a ? '✓ measured' : S.got.includes('ruler') ? 'I have a ruler' : taken('skey') ? 'a small key' : 'not started', a]);
  out.push([b ? -1 : first('b'), 'The order he watered them', b ? '✓ the note' : (S.got.includes('half1') || S.got.includes('half2')) ? 'half a note' : 'not started', b]);
  out.push([c ? -1 : first('c'), 'The code on his drawer', c ? '✓ open' : (S.seen.thu ? 'Thursday’s lessons' : S.seen.day ? 'it’s Thursday' : 'four numbers'), c]);
  if (c) out.push([S.done ? -1 : S.got.includes('dkey') ? 11 : 10, 'Lock up 5H', S.done ? '✓ locked' : S.got.includes('dkey') ? 'I have the key' : 'the key is in the drawer', S.done]);
  return out;
}
function noticed(){
  const n = [];
  if (S.measured && !S.deskOpen) n.push('The beans: ' + POTS.map(p => `${LESSON[p[0]][2]} ${p[1]} cm`).join(', ') + '.');
  if (S.seen.wnote && !S.deskOpen) n.push('Water one pot per lesson, in today’s lesson order.');
  if (S.seen.day && !S.deskOpen) n.push('Today is Thursday.');
  if (S.seen.thu && !S.deskOpen) n.push('Thursday: ' + WEEK[TODAY].map(k => LESSON[k][2]).join(', ') + '.');
  if (S.deskOpen && !S.done) n.push('The classroom key locks the door from outside.');
  return n;
}
const CLUES = {board:{label:'Whiteboard', open:() => openBoard(true)}, timetable:{label:'Timetable', open:() => openTimetable(true)}, pots:{label:'The beans', open:() => openPots(true)}};
function clues(){ return (S.clues || []).map(k => CLUES[k]).filter(Boolean); }
function copyClue(key){ if (!S.clues) S.clues = []; if (S.clues.includes(key)) return ''; S.clues.push(key); save(); return S.clues.length === 1 ? ' Mary copies it into her notebook: tap the moth to see it again, wherever you are.' : ' Copied into the notebook.'; }
const sparkle = () => false; /* no sparkles by default (owner, 17 Oct 2026): the second hint tier pulses the thing */
const speaker = () => 'The moth whispers';
return {
  card:{place:'KNIGHTSBROOK · THE LAST DAY · A TEST ROOM', text:'Mr Hollis has gone to the hall and left Mary to lock up 5H. The classroom key is in his desk, behind a code. He has left a note on her desk.'},
  meanwhile:'Meanwhile, in 5H, Mary is still looking for the classroom key.',
  title:'Lock-up Duty', blurb:'A test room: lock up Classroom 5H. One room, three trails, one hard code.',
  track:'../art/music/classroom.mp3', ambient:'school',
  postcard:{pic:'../art/postcards/school.jpg'},
  intro:'<b>Lock-up duty.</b> Mr Hollis has left Mary to lock up 5H, and the key is in his desk behind a code. There is a note on her desk.',
  start:{room:'classroom', view:0},
  fresh:() => ({seen:{}, clues:[], taken:{}, keyDown:false, binMoved:[], binDone:false, popped:false, measured:0, cabUnlocked:false, cabOut:false, dials:[0,0,0,0], deskOpen:false, deskOut:false, locked:false}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES,
  overlays:{c4:() => S.cabUnlocked ? wrap(wallTimetable(), wallDrawer('cab')) : wrap(wallTimetable(), wallKeyhole()), c1:() => S.deskOpen ? wrap(wallBoard(), wallDrawer('desk')) : wrap(wallBoard()), c2:wallLabels, c3:() => wrap(...[S.locked ? wallDoorway() : null].filter(Boolean))},
  act, miss, sparkle, rows, noticed, clues, speaker, helper:() => 'the moth', child:'mary'
};
})());
