/* The Moth House, landscape engine: the test room "Lock-up Duty" (levels/LEVEL-evalroom.md), not a level. Classroom 5H drawn by
   GPT Image 2.5 Sunburst on 21 Oct 2026 from evals/images/rooms/classroom5h.json (playbook 4aa, 4ab). Gate E signed and the batch
   placed on 24 Oct 2026 (playbook 4ac → 6b): every picture is real now (the keys, the ruler, the torn note and its halves, the pots,
   both drawers looked into, the door's lock plate); the drawer fronts, the door and the lost-property things are lifted from the walls.
   The engine is frozen (school3 at Gate C), so the reward moments are single movements and the small key appears on the floor
   after the coat swings. Open with ?stage=evalroom. Nothing here is part of a child's story. */
'use strict';
registerStage('evalroom', (function(){
const GEO2 = {"pots": {"l": 31.0, "t": 13.15, "w": 38.0, "h": 39.65}, "coat": {"l": 66.71, "t": 27.5, "w": 13.57, "h": 34.0}, "lid": {"l": 18.95, "t": 49.82, "w": 14.5, "h": 4.98}, "doors": {"l": 11.2, "t": 12.6, "w": 19.6, "h": 69.97}, "pot1": {"l": 32.9, "t": 41.47, "w": 6.2, "h": 11.33}, "pot2": {"l": 41.9, "t": 35.45, "w": 6.2, "h": 17.35}, "pot3": {"l": 50.9, "t": 27.43, "w": 6.2, "h": 25.37}, "pot4": {"l": 59.9, "t": 14.27, "w": 6.2, "h": 38.53}};
/* the doors cut-out was resampled to 751×1508 on 24 Oct 2026 so it spans the whole carcass, 11.2% to 30.8% of the wall, with no gap at either side (MOTH-67) */
const GEO = {"hamster": {"l": 76.1, "t": 43.0, "w": 3.03, "h": 7.5}, "envelope": {"l": 47.1, "t": 51.4, "w": 4.2, "h": 4.76}, "backpack": {"l": 56.25, "t": 70.0, "w": 7.49, "h": 16.0}};
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
    {src:'../art/eval/c5h/layer-lost.png', group:'lost', l:CUT.lost.l, t:CUT.lost.t, w:CUT.lost.w, h:CUT.lost.h}, /* the shoe and hat, behind the box's front */
    {src:'../art/eval/c5h/layer-boxfront.png', l:CUT.boxfront.l, t:CUT.boxfront.t, w:CUT.boxfront.w, h:CUT.boxfront.h},
    {src:'../art/eval/c5h/item-skey.png', group:'fkey', l:61.3, t:78.6, w:4.4, h:4.45, shadow:.5, showWhen:() => S.keyDown && !taken('skey')}], /* the small key where it landed */
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
/* ---------- the found things' pictures ---------- */
const HALF = {L:'item-half1.png', R:'item-half2.png'}; /* the torn halves (assets 3a, 3b, 24 Oct 2026) */
const torn = (id, side, [l, t, w], rot = -8, label) => `<button id="${id}" aria-label="${label}" style="pointer-events:auto;position:absolute;left:${l}%;top:${t}%;width:${w}%;transform:rotate(${rot}deg);background:transparent;border:0;padding:0;cursor:pointer;filter:drop-shadow(1px 2px 2px rgba(0,0,0,.35))"><img src="../art/eval/c5h/${HALF[side]}?v=${BUILD}" alt="" style="width:100%;display:block;pointer-events:none"></button>`;
const NOTES = {
  ev_env:{hand:true, html:'<span class="head" style="font-size:1.25em">For Mary</span><span class="big">Last day! I’ve gone to the hall.</span><span style="font-size:1.18em;line-height:1.35">Will you lock up 5H for me, Mary? The classroom key is in my desk drawer. Its code is the beans’ heights, read in the order I asked you to water them.</span><span class="sign" style="font-size:1.15em">— Mr H.</span>'},
  wnote:{hand:true, html:`<div style="position:relative;width:100%;height:calc(var(--u)*34);flex:none;background:url(../art/eval/c5h/closeup-note.jpg?v=${BUILD}) center/cover;border-radius:calc(var(--u)*.6);overflow:hidden"><div style="position:absolute;left:20%;top:10%;width:60%;height:80%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:calc(var(--u)*.6)"><span class="head" style="display:block">A torn note, taped together</span><span class="big" style="display:block">Beans: water one pot per lesson,</span><span style="display:block">in today’s lesson order.</span><span class="sign" style="display:block">— H.</span></div></div>`}
};
/* an icon centred in its slot whatever its shape or turn (MOTH-86): the engine places a bare img at the slot's 12% inset; a turned or long one goes in a centred box inside that inset */
const slotIcon = (file, turn, more = '') => `<span style="position:absolute;inset:12%;display:grid;place-items:center"><img src="../art/eval/c5h/${file}" alt="" style="position:static;width:100%;height:100%;object-fit:contain;transform:${turn};${more}"></span>`;
const ITEMS = { /* every icon a picture now (the batch, 24 Oct 2026) */
  ev_env:{name:'note from Mr Hollis', note:'ev_env', icon:'<img src="../art/classroom/item-envelope.png" alt="">', spent:() => S.deskOpen},
  skey:{name:'small key', icon:'<img src="../art/eval/c5h/item-skey.png" alt="">'},
  ruler:{name:'ruler', icon:slotIcon('item-ruler.png', 'rotate(-40deg) scale(1.28)')},
  half1:{name:'left half of a note', icon:slotIcon('item-half1.png', 'rotate(-8deg)')},
  half2:{name:'right half of a note', icon:slotIcon('item-half2.png', 'rotate(6deg)')},
  wnote:{name:'watering note', note:'wnote', icon:slotIcon('item-wnote.jpg', 'rotate(-6deg)', 'box-shadow:1px 1px 2px rgba(0,0,0,.35)'), spent:() => S.deskOpen},
  dkey:{name:'classroom key', icon:'<img src="../art/eval/c5h/item-dkey.png" alt="">'}
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
  d.innerHTML = `<div style="position:absolute;left:${c.l}%;top:${c.t}%;width:${c.w}%;height:${c.h}%;background:url(../art/school/h1.jpg?v=${BUILD}) 42% 55%/360% auto no-repeat;filter:brightness(.9) saturate(.95);box-shadow:inset 0 0 calc(var(--u)*2.5) rgba(0,0,0,.45)"></div><div style="position:absolute;left:${c.l + c.w*0.1}%;top:${c.t + c.h}%;width:${c.w*0.95}%;height:14%;background:linear-gradient(rgba(255,248,220,.55),rgba(255,248,220,0));clip-path:polygon(8% 0,92% 0,100% 100%,0 100%)"></div>${leafImg(true)}`;
  return d;
}
function doorSwing(){ /* the leaf swings open on its left hinge, in perspective, then stays open (MOTH-66) */
  const leaf = $('leaf'); if (!leaf) return;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  leaf.animate([{transform:'perspective(900px) rotateY(0deg)'}, {transform:LEAF_OPEN}], {duration:reduce ? 10 : 1100, easing:'cubic-bezier(.3,.7,.3,1)', fill:'forwards'});
}
/* Drawers open and shut (owner, 22 Oct 2026; MOTH-54). Once unlocked, a drawer is drawn by the stage: a dark gap (solid: the wall must never show through it, MOTH-78) and the front,
   which slides out and back with a short transition on each tap, in the room and in its close-up alike; what is inside shows only
   while it is out. The engine has slide-open only, so this stays in the stage until backlog 26. */
const DRAWERS = {cab:{cut:CUT.cabdrawer, src:'layer-cabdrawer.png', out:() => S.cabOut, unlocked:() => S.cabUnlocked}, desk:{cut:CUT.tdrawer, src:'layer-tdrawer.png', out:() => S.deskOut, unlocked:() => S.deskOpen}};
const OUT_T = 'translateY(50%) scale(1.1)', OUT_F = 'drop-shadow(0 4px 4px rgba(0,0,0,.35))';
function drawerHTML(k, id, inside){ const D = DRAWERS[k], out = D.out();
  const lock = k === 'cab' ? `<div class="khole" style="position:absolute;left:6.5%;top:36%;width:6.5%;aspect-ratio:1">${KEYHOLE}</div>` : '';
  return `<div style="position:absolute;left:3%;top:8%;width:94%;height:90%;background:#140e0b;box-shadow:inset 0 0 calc(var(--u)*1.6) #000;pointer-events:none"></div>${inside || ''}<div id="${id}" style="position:absolute;inset:0;pointer-events:none;transform-origin:50% 50%;transform:${out ? OUT_T : 'none'};filter:${out ? OUT_F : 'none'};transition:transform .45s cubic-bezier(.3,.9,.4,1),filter .45s"><img src="../art/eval/c5h/${D.src}?v=${BUILD}" alt="" style="position:absolute;left:0;top:0;width:100%">${lock}</div>`; }
function wallDrawer(k){ const c = DRAWERS[k].cut, d = document.createElement('div'); d.style.cssText = `position:absolute;left:${c.l}%;top:${c.t}%;width:${c.w}%;height:${c.h}%;pointer-events:none`; d.innerHTML = drawerHTML(k, 'ov-' + k); return d; }
/* The key tumbles out of the coat pocket (MOTH-63): a stage overlay animates the fall from the pocket to the floor with two bounces,
   then the floor cut-out takes over at rest. The engine's fall-and-land movement is still on the backlog. */
const KEYHOLE = '<svg viewBox="0 0 10 10" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%"><circle cx="5" cy="5" r="4.6" fill="#c3c7ce" stroke="#2b2836" stroke-width=".6"/><circle cx="5" cy="5" r="3.3" fill="#aeb3bb"/><rect x="4.25" y="2.2" width="1.5" height="5.6" rx=".6" fill="#1d1d22"/></svg>'; /* a round cam-lock face with a thin slot: the small key is flat (MOTH-74) */
function wallKeyhole(){ /* the lock on the top drawer, drawn on the wall as well as in the close-up (MOTH-59) */
  const c = CUT.cabdrawer, d = document.createElement('div'); d.style.cssText = `position:absolute;left:${c.l + c.w*0.065}%;top:${c.t + c.h*0.36}%;width:${c.w*0.065}%;aspect-ratio:1;pointer-events:none`; d.innerHTML = KEYHOLE; return d;
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
const NO_CLOSE = {ev_beans:true, ev_pot1:true, ev_pot2:true, ev_pot3:true, ev_pot4:true}; /* measuring shows its result in the same close-up */
/* USES keys for close-up-only targets: a held item on the shoe or the hat gets the friendly miss line */
/* a found thing in a close-up, tapped to take (finding is a close-up, MOTH-49) */
const paper = (id, text, [l, t, w], rot = -8) => `<button id="${id}" style="position:absolute;left:${l}%;top:${t}%;width:${w}%;aspect-ratio:1.6;transform:rotate(${rot}deg);background:#fbf4e2;border:1px solid #6a5a44;border-radius:2px;box-shadow:1px 2px 3px rgba(0,0,0,.3);font-size:calc(var(--u)*1.6);color:#4a3b2a;font-family:Caprasimo,Georgia,serif;cursor:pointer">${text}</button>`;
/* The bin, looked into from the top (owner, 22 Oct 2026; MOTH-52; the pictures are the Gate E samples). Five bits of rubbish lie
   on top of each other; a tap shoves one aside (it slides to the rim and stays there), and the half note is under the last two.
   Moving the rubbish by dragging is backlog 27; a tap-to-shove stands in. */
const RUBBISH = [ /* id, label, resting spot (l, t, w, rotation) on the bin's floor, where it goes when shoved (up the inside wall), and the picture (Gate E samples, 24 Oct 2026) */
  {id:'r1', label:'a crumpled page', at:[33, 30, 23, -12], to:[27, 26, 20, 28], src:'layer-rub-page.png'},
  {id:'r2', label:'a juice carton', at:[52, 24, 14, 18], to:[62, 22, 13, 40], src:'layer-rub-carton.png'},
  {id:'r3', label:'a crust', at:[28, 50, 19, 6], to:[26, 56, 17, -24], src:'layer-rub-crust.png'},
  {id:'r4', label:'a ball of paper', at:[48, 44, 17, 0], to:[61, 52, 16, -30], src:'layer-rub-ball.png'},
  {id:'r5', label:'an apple core', at:[40, 36, 16, -20], to:[30, 40, 14, 26], src:'layer-rub-core.png'}
];
const UNDER = ['r4', 'r5']; /* the half note is under these two */
function openBin(){
  const gone = S.binDone || S.got.includes('half1') || S.got.includes('wnote'), moved = S.binMoved || [];
  const noteShows = !gone && UNDER.every(id => moved.includes(id));
  const pieces = RUBBISH.map(r => { const m = moved.includes(r.id), [l, t, w, rot] = m ? r.to : r.at;
    return `<button class="rub" data-r="${r.id}" aria-label="${r.label}${m ? ', pushed aside' : ''}" style="position:absolute;left:${l}%;top:${t}%;width:${w}%;aspect-ratio:1;transform:rotate(${rot}deg);background:transparent;border:0;padding:0;cursor:pointer;transition:left .5s cubic-bezier(.3,.9,.4,1),top .5s cubic-bezier(.3,.9,.4,1),transform .5s;filter:drop-shadow(2px 4px 3px rgba(0,0,0,.45))"><img src="../art/eval/c5h/${r.src}?v=${BUILD}" alt="" style="width:100%;display:block;pointer-events:none"></button>`; }).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background-image:url(../art/eval/c5h/closeup-bin.jpg?v=${BUILD})"><p class="otitle">Into the bin</p>
    ${noteShows ? torn('takeHalf1', 'L', [42, 44, 14], -14, 'Half a torn note') : (!gone ? `<div id="binNote" style="position:absolute;left:42%;top:44%;width:14%;aspect-ratio:1.6;transform:rotate(-14deg);background:#fbf4e2;border:1px solid #6a5a44;opacity:${UNDER.some(id => moved.includes(id)) ? .9 : .35}"></div>` : '')}
    ${pieces}</div><p class="ofb" id="binFb">${gone ? 'Paper, a crust, a carton and an apple core. Nothing else now.' : noteShows ? 'There! Half a note, torn down the middle, in Mr Hollis’s writing.' : 'Looking down into the bin. Paper, a crust, a carton… Push things aside to see what is underneath.'}</p></div>`);
  document.querySelectorAll('#closeup .rub').forEach(b => b.onclick = e => { e.stopPropagation(); const id = b.dataset.r, r = RUBBISH.find(x => x.id === id); if (!S.binMoved) S.binMoved = [];
    const m = S.binMoved.includes(id); S.binMoved = m ? S.binMoved.filter(x => x !== id) : [...S.binMoved, id]; save(); sfx('paper');
    const [l, t, w, rot] = m ? r.at : r.to; b.style.left = l + '%'; b.style.top = t + '%'; b.style.transform = `rotate(${rot}deg)`;
    const shows = !gone && UNDER.every(x => S.binMoved.includes(x)); const n = $('binNote'); if (n) n.style.opacity = UNDER.some(x => S.binMoved.includes(x)) ? .9 : .35;
    if (shows && !$('takeHalf1')){ const n = $('binNote'); if (n) n.remove(); const pic = document.querySelector('#closeup .shelfpic'); pic.insertAdjacentHTML('beforeend', torn('takeHalf1', 'L', [42, 44, 14], -14, 'Half a torn note')); wireHalf1(); $('binFb').textContent = 'There! Half a note, torn down the middle, in Mr Hollis’s writing.'; }
    else $('binFb').textContent = m ? 'Back it goes.' : UNDER.some(x => S.binMoved.includes(x)) ? 'Pushed aside. Something pale underneath…' : 'Pushed aside.'; });
  wireHalf1();
}
function wireHalf1(){ const b = $('takeHalf1'); if (b) b.onclick = e => { e.stopPropagation(); S.binDone = true; S.got.push('half1'); save(); sfx('pickup'); closeCloseup(); render(); say('Half a note, torn down the middle, in Mr Hollis’s writing. It goes in the strip below.'); }; }
function openBox(){ /* the lost property box, close up, from the wall; the hat is a target that opens its own close-up */
  const gone = S.got.includes('half2') || S.got.includes('wnote');
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="${zoom(WALLS.c3, 1230, 600)}">${cuTarget('ev_hat', 'The blue hat', [50, 14, 24, 28])}${cuTarget('ev_shoe', 'The red shoe', [24, 8, 26, 30])}<p class="otitle">Lost property</p></div><p class="ofb">${gone ? 'A shoe, a hat, and a lunchbox that has been here since March.' : S.popped ? 'A red shoe and a blue hat. Have a look in the hat.' : 'A red shoe and a blue hat.'}</p></div>`);
  wireCu({ev_hat:openHat, ev_shoe:() => say('One red shoe, size small. Nobody has missed it.')});
}
/* Into the hat (owner, 22 Oct 2026; MOTH-53; the picture is the Gate E sample, redone in the box). The cap upturned, its band, and the torn corner
   tucked under the band once the box has been bumped. The scrap is clipped to the band's inner ellipse (BAND), so the band lies over it. */
const BAND = {cx:49.5, cy:40, rx:20.3, ry:32.3}; /* the sweatband's inner edge on closeup-hat.jpg, as an ellipse: the scrap is clipped to it, so it reads as tucked under the band (MOTH-79); re-measure when the picture is remade */
function openHat(){
  const gone = S.got.includes('half2') || S.got.includes('wnote');
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background-image:url(../art/eval/c5h/closeup-hat.jpg?v=${BUILD})"><p class="otitle">Inside the hat</p>
    ${S.popped && !gone ? `<div style="position:absolute;inset:0;clip-path:ellipse(${BAND.rx}% ${BAND.ry}% at ${BAND.cx}% ${BAND.cy}%);pointer-events:none">${torn('takeHalf2', 'R', [54.5, 42.6, 11], 30, 'A torn corner of paper')}</div>` : ''}</div><p class="ofb">${gone ? 'The inside of the cap: a sweatband and a name tape, worn blank.' : S.popped ? 'Tucked under the band: a torn corner of paper.' : 'The inside of the cap. The band is tight all the way round.'}</p></div>`);
  const b = $('takeHalf2'); if (b) b.onclick = e => { e.stopPropagation(); S.got.push('half2'); save(); sfx('pickup'); closeCloseup(); render(); say('The other half of the note, tucked in the hat’s band. Torn, taped once already, and torn again. It goes in the strip below.'); };
}
function openBoard(again){
  if (!again){ S.seen.day = Date.now(); save(); }
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background:#f7f7f4;border-radius:calc(var(--u)*.6)"><p style="position:absolute;left:6%;top:24%;margin:0;font-family:Caprasimo,Georgia,serif;font-size:calc(var(--u)*4.2);color:#2f5f8a;transform:rotate(-1.5deg)">${DATE}</p><p class="otitle">Whiteboard</p></div><p class="ofb">Wiped clean for the holidays. Only today’s date is left, in Mr Hollis’s pen.</p></div>`);
  if (!again) say(copyClue('board').trim());
}
function openTimetable(again){
  if (!again){ S.seen.thu = Date.now(); save(); }
  const key = HEADER.map((k, i) => `<rect x="${8 + i*52}" y="24" width="50" height="26" rx="2" fill="${['#f6c445', '#5aa7d8', '#b48be0', '#f0a0a8', '#8ad0a8', '#f4a040'][i]}"/>` + ic(k, 8 + i*52 + 15, 27, 20)).join('');
  openCloseup(`<div class="card tt"><svg viewBox="0 0 322 190" aria-label="The class timetable: six lessons across the top, the days down the side, each day’s lessons in order"><rect width="322" height="190" rx="4" fill="#fffdf6"/><rect width="322" height="20" fill="#2f7c83"/><text x="161" y="14.5" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fffdf6" letter-spacing="1" font-family="${FONT}">5H TIMETABLE</text>${key}<g>${Object.keys(WEEK).map((d, r) => `<rect x="8" y="${54 + r*26}" width="312" height="26" fill="${r%2 ? '#eef3ee' : '#f7f9f3'}" stroke="#cfc8b4" stroke-width=".6"/>`).join('')}${ttRows(8, 54, 52, 26, 10, 18)}</g></svg></div>`);
  if (!again) say(copyClue('timetable').trim());
}
/* Measuring (MOTH-77): one ruler. Held and put against a plant, it stands in that pot and a mark at the plant's top reads its
   height; a tap on another plant slides the same ruler there. The readings found so far stay at their plants, and once all four are
   known the clue is copied to the notebook. The close-up is asset 11 (24 Oct 2026); the game draws the labels, the ruler and the marks. */
const PLANTS = [{cx:17, top:56}, {cx:38, top:44}, {cx:57, top:28}, {cx:80, top:6}]; /* each stem and its top, in picture percentages; the soil at 68 */
const PLABEL = [[13.3, 75.5, 7.9, 7], [33.7, 75.5, 7.8, 7], [54.3, 75.5, 7.7, 7], [77, 75.5, 8.2, 7]]; /* each pot's blank label, measured from the picture's pixels (MOTH-83) */
const RULER = {h:66, bottom:69, w:66*9/16*161/1009}; /* the ruler stands in the soil, as tall as the picture allows: one ruler, one length */
const known = () => S.heights || [];
const rulerStyle = i => `left:${PLANTS[i].cx + 3}%;top:${RULER.bottom - RULER.h}%;width:${RULER.w.toFixed(2)}%;height:${RULER.h}%`;
function rulerHTML(){ const at = S.rulerAt; if (at == null) return '';
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  return `<div id="rulerEl" aria-hidden="true" style="position:absolute;${rulerStyle(at)};pointer-events:none;filter:drop-shadow(2px 2px 3px rgba(0,0,0,.35));transition:${reduce ? 'none' : 'left .55s cubic-bezier(.3,.8,.3,1)'}"><img src="../art/eval/c5h/item-ruler.png?v=${BUILD}" alt="" style="position:absolute;left:50%;top:50%;width:${RULER.h}cqh;height:auto;transform:translate(-50%,-50%) rotate(-90deg);transform-origin:50% 50%"></div>`; }
function marksHTML(){ /* one reading at a time (MOTH-87): a line from the top of the plant the ruler stands by to the ruler's edge, and its reading */
  return (S.rulerAt == null ? [] : [S.rulerAt]).map(i => { const P = PLANTS[i], h = POTS[i][1];
    return `<div class="mark" style="position:absolute;left:${P.cx - 3}%;top:${P.top}%;width:${6 + RULER.w + 0.6}%;border-top:2px dashed #2b2836;pointer-events:none"></div><div class="mark" style="position:absolute;right:${100 - (P.cx - 3.6)}%;top:${P.top - 2.6}%;padding:.1em .4em;background:var(--paper);border-radius:.3em;font-family:${FONT};font-weight:700;font-size:calc(var(--u)*1.9);color:#2b2836;box-shadow:0 0 0 1px rgba(0,0,0,.25);pointer-events:none">${h} cm</div>`; }).join(''); }
function labelsHTML(){ return PLABEL.map(([l, t, w, h], i) => `<div style="position:absolute;left:${l}%;top:${t}%;width:${w}%;height:${h}%;display:grid;place-items:center;pointer-events:none"><svg viewBox="0 0 12 12" style="height:92%;aspect-ratio:1" aria-hidden="true">${ic(POTS[i][0], 0, 0, 12)}</svg></div>`).join(''); }
const potLine = () => S.rulerAt != null ? `${LESSON[POTS[S.rulerAt][0]][2]}: ${POTS[S.rulerAt][1]} cm. Tap another plant to move the ruler.` : S.got.includes('ruler') ? 'You have a ruler. Tap it in the strip, then tap a plant.' : 'Four pots, each with a lesson picture on its label. Mr H wants their heights.'; /* never a summary of all four: that is the player's job (MOTH-87) */
const potsAria = () => S.rulerAt != null ? `The four bean plants on the sill; the ruler stands by the ${LESSON[POTS[S.rulerAt][0]][2]} plant, which is ${POTS[S.rulerAt][1]} centimetres` : 'The four bean plants on the sill, each pot with a lesson picture on its label';
function openPots(again){
  const targets = [[6, 0, 22, 100], [28, 0, 21, 100], [48, 0, 21, 100], [70, 0, 22, 100]].map((b, i) => cuTarget('ev_pot' + (i+1), `The ${LESSON[POTS[i][0]][2]} plant`, b)).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="potspic" role="img" aria-label="${potsAria()}" style="background-image:url(../art/eval/c5h/closeup-pots.jpg?v=${BUILD});container-type:size">${labelsHTML()}<div id="marks">${marksHTML()}</div>${rulerHTML()}${targets}<p class="otitle">The bean pots</p></div><p class="ofb" id="potFb">${potLine()}</p></div>`);
  const plain = {}; POTS.forEach((p, i) => { plain['ev_pot' + (i+1)] = () => { if (S.rulerAt != null) placeRuler(i); else $('potFb').textContent = S.got.includes('ruler') ? 'Hold the ruler first: tap it in the strip below, then tap the plant.' : 'Four bean plants, four heights. Nothing to measure them with yet.'; }; });
  wireCu(plain);
  if (!again) say('');
}
function placeRuler(i){ /* the one ruler stands in pot i; the first time it is put there, the height is written down */
  const first = !known().includes(i); if (!S.heights) S.heights = []; if (first) S.heights.push(i);
  if (S.rulerAt == null){ drop('ruler'); render(); } /* the ruler lives by the plants from now on, not in the strip (MOTH-88) */
  S.rulerAt = i; sfx('tick');
  if (first && S.heights.length === 4 && !S.measured){ S.measured = Date.now(); S.seen.heights = S.measured; }
  save();
  if (!$('potspic')){ openPots(true); } /* used from the room: open the close-up with the ruler in place */
  else { $('marks').innerHTML = marksHTML(); $('potspic').setAttribute('aria-label', potsAria()); const r = $('rulerEl'); if (!r) $('marks').insertAdjacentHTML('afterend', rulerHTML()); else r.style.left = PLANTS[i].cx + 3 + '%'; $('potFb').textContent = potLine(); }
  if (first && S.heights.length === 4) say(copyClue('pots').trim());
}
function openCabinet(){ /* locked: the cabinet close up, with the keyhole the game draws; unlocked: the top drawer close up (MOTH-61), opening and shutting on a tap, the ruler inside while it is out */
  if (!S.cabUnlocked){
    openCloseup(`<div class="card shelf"><div class="shelfpic" style="${zoom(WALLS.c4, 1160, 560, 640)}">${cuTarget('ev_cabinet', 'The top drawer and its lock', [30, 10, 45, 42])}<div style="position:absolute;left:36.5%;top:27%;width:3.6%;aspect-ratio:1;pointer-events:none">${KEYHOLE}</div><p class="otitle">Filing cabinet</p></div><p class="ofb" id="cabFb">The top drawer has a tiny lock. A small key would fit it.</p></div>`);
    wireCu({ev_cabinet:() => { $('cabFb').textContent = S.got.includes('skey') ? 'A tiny lock. Hold the small key: tap it in the strip below, then tap the lock.' : 'A tiny lock on the top drawer. It wants a small key.'; }});
    return;
  }
  if (S.cabOut){ /* looked into (asset 15b, MOTH-80): the ruler lies along the front until it is taken; a tap on the rim shuts it */
    const ruler = !S.got.includes('ruler') ? `<button id="takeRuler" aria-label="A ruler" style="position:absolute;left:21%;top:58%;width:54%;height:20%;background:transparent;border:0;padding:0;cursor:pointer;pointer-events:auto;filter:drop-shadow(3px 4px 4px rgba(0,0,0,.4))"><img src="../art/eval/c5h/item-ruler.png?v=${BUILD}" alt="" style="width:100%;display:block;transform:rotate(-2.5deg);pointer-events:none"></button>` : '';
    openCloseup(`<div class="card shelf"><div class="shelfpic" style="background-image:url(../art/eval/c5h/closeup-cab.jpg?v=${BUILD})">${cuTarget('ev_tray', 'The drawer’s tray', [0, 0, 100, 100])}${ruler}<p class="otitle">The top drawer</p></div><p class="ofb" id="cabFb">${taken('ruler') ? 'Open. Empty now.' : 'Open. A ruler inside.'}</p><div class="row" style="padding:0 calc(var(--u)*1.5) calc(var(--u)*1)"><button class="ob" id="shutCab" style="min-height:40px;padding:calc(var(--u)*.6) calc(var(--u)*2.2);font-size:calc(var(--u)*1.9)">Shut the drawer</button></div></div>`);
    const b = $('takeRuler'); if (b) b.onclick = e => { e.stopPropagation(); take('ruler'); sfx('pickup'); closeCloseup(); render(); say('A ruler, thirty centimetres, with a bite out of one corner. It goes in the strip below.'); };
    $('shutCab').onclick = e => { e.stopPropagation(); toggleDrawer('cab'); openCabinet(); };
    wireCu({ev_tray:() => { $('cabFb').textContent = taken('ruler') ? 'A metal tray with nothing in it now.' : 'A metal tray, and a ruler lying along the front.'; }});
    return;
  }
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="${zoom(WALLS.c4, 1290, 580, 400)}">${cuTarget('ev_cabdrawer', 'The top drawer', [18, 8, 68, 70])}<div style="position:absolute;left:22.5%;top:12%;width:58.25%;height:56.9%;pointer-events:none">${drawerHTML('cab', 'cu-cab')}</div><p class="otitle">The top drawer</p></div><p class="ofb" id="cabFb">Shut. Tap it to open it.</p></div>`);
  wireCu({ev_cabdrawer:() => { toggleDrawer('cab'); setTimeout(openCabinet, 420); }});
}
function unlockCabinet(){ /* the stage's drawer (front and keyhole as one) takes over the moment the key turns, then slides out; the engine's layer is never shown again (MOTH-84) */
  drop('skey'); S.cabUnlocked = true; S.cabOut = false; save(); render(); sfx('pickup');
  setTimeout(() => toggleDrawer('cab'), 220); setTimeout(() => animate({anim:'sniff', layer:'hamster'}), 1000); /* the reward moment, as two single movements until backlog 20 */
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
function openInsideDesk(){ /* Mr Hollis's drawer (MOTH-61, MOTH-65, MOTH-80): out, it is looked into from above (asset 15) with the key in the empty middle; shut, the front zoomed from the wall; a tap on it shuts or opens it */
  if (S.deskOut){
    const key = !taken('dkey') ? `<button id="takeKey" aria-label="The classroom key" style="position:absolute;left:30%;top:20%;width:30%;height:54%;background:transparent;border:0;padding:0;cursor:pointer;pointer-events:auto;filter:drop-shadow(3px 4px 4px rgba(0,0,0,.4))"><img src="../art/eval/c5h/item-dkey.png?v=${BUILD}" alt="" style="width:100%;display:block;transform:rotate(-22deg);pointer-events:none"></button>` : '';
    openCloseup(`<div class="card shelf"><div class="shelfpic" style="background-image:url(../art/eval/c5h/closeup-desk.jpg?v=${BUILD})">${cuTarget('ev_dtray', 'The drawer’s tray', [0, 0, 100, 100])}${cuTarget('ev_clips', 'Paper clips', [6, 20, 20, 60])}${cuTarget('ev_whistle', 'A whistle', [72, 18, 24, 64])}${key}<p class="otitle">Mr Hollis’s drawer</p></div><p class="ofb" id="deskFb2">${taken('dkey') ? 'Paper clips, a whistle, and the space where the key was.' : 'Paper clips, a whistle, and the classroom key on its 5H tag.'}</p><div class="row" style="padding:0 calc(var(--u)*1.5) calc(var(--u)*1)"><button class="ob" id="shutDesk" style="min-height:40px;padding:calc(var(--u)*.6) calc(var(--u)*2.2);font-size:calc(var(--u)*1.9)">Shut the drawer</button></div></div>`);
    const b = $('takeKey'); if (b) b.onclick = e => { e.stopPropagation(); take('dkey'); sfx('pickup'); closeCloseup(); render(); say('The classroom key, on its 5H tag. It goes in the strip below. Now: lock up.'); };
    $('shutDesk').onclick = e => { e.stopPropagation(); toggleDrawer('desk'); openInsideDesk(); };
    wireCu({ev_clips:() => { $('deskFb2').textContent = 'Paper clips. Not what Mary is after.'; }, ev_whistle:() => { $('deskFb2').textContent = 'Mr Hollis’s whistle, for the playground. Leave it.'; }, ev_dtray:() => { $('deskFb2').textContent = taken('dkey') ? 'Bare wood where the key was.' : 'The key is right there.'; }});
    return;
  }
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="${zoom(WALLS.c1, 1480, 600, 320)}">${cuTarget('ev_tdrawer', 'The drawer', [16, 28, 68, 56])}<div style="position:absolute;left:21.6%;top:35%;width:57.2%;height:41.1%;pointer-events:none">${drawerHTML('desk', 'cu-desk')}</div><p class="otitle">Mr Hollis’s drawer</p></div><p class="ofb" id="deskFb2">Shut. Tap it to open it.</p></div>`);
  wireCu({ev_tdrawer:() => { toggleDrawer('desk'); setTimeout(openInsideDesk, 420); }});
}
/* The key turn (MOTH-90, MOTH-93). The engine's drag follows a path with the finger, which a key turning on the spot has none of:
   the owner's finger on the bow mapped to one point of a tiny circle and the turn stuck halfway. So the stage turns the key itself:
   the bow sits in the keyhole at (40, 57) on the lock plate, and a finger anywhere on the plate sweeps round it; the bow turns by
   the angle swept, clockwise, and once it has gone all the way round the lock clicks. Turning back unwinds it. Nothing to aim at. */
const KH = {x:40, y:57};
function lockUp(){
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="turnpic" style="background-image:url(../art/eval/c5h/closeup-lock.jpg?v=${BUILD});touch-action:none;cursor:grab"><img id="bow" src="../art/eval/c5h/item-dkey-bow.png?v=${BUILD}" alt="" style="position:absolute;left:${KH.x}%;top:${KH.y}%;width:13%;transform:translate(-50%,-50%) rotate(0deg);pointer-events:none;filter:drop-shadow(0 calc(var(--u)*.3) calc(var(--u)*.4) rgba(0,0,0,.45))"><p class="otitle">Turn the key</p></div><p class="ofb" id="turnFb">Put the key in the lock and turn it, all the way round.</p></div>`);
  const pic = $('turnpic'), bow = $('bow'), fb = $('turnFb'); let turning = false, last = 0, total = 0, done = false, lastTick = 0;
  const ang = e => { const r = pic.getBoundingClientRect(); const x = (e.clientX - r.left)/r.width*100 - KH.x, y = ((e.clientY - r.top)/r.height*100 - KH.y)*9/16; return Math.atan2(y, x)*180/Math.PI; };
  const draw = () => { bow.style.transform = `translate(-50%,-50%) rotate(${total}deg)`; };
  const finish = () => { if (done) return; done = true; turning = false; total = 360; draw(); sfx('pickup'); fb.textContent = 'Click, clunk.';
    setTimeout(() => { closeCloseup(); drop('dkey'); S.locked = true; save(); render(); sfx('tick'); doorSwing(); say('The key turns. Mary slips out into the corridor, pulls the door to, and locks 5H behind her for the summer.'); setTimeout(ending, 2200); }, 700); };
  pic.onpointerdown = e => { if (done) return; turning = true; last = ang(e); pic.setPointerCapture(e.pointerId); e.preventDefault(); e.stopPropagation(); };
  pic.onpointermove = e => { if (!turning || done) return; const a = ang(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
    total = Math.max(0, Math.min(360, total + d)); draw(); if (total - lastTick >= 45){ sfx('tick'); lastTick = total; } if (total >= 350) finish(); };
  pic.onpointerup = pic.onpointercancel = e => { if (!turning) return; turning = false; if (total >= 320) finish(); else if (total > 15) fb.textContent = 'Keep turning, all the way.'; };
  pic.onclick = e => e.stopPropagation();
}
function ending(){
  S.done = true; save();
  showEnd('Locked up!', 'Mr Hollis asked ME to lock up 5H on the last day! The key was in his drawer behind a code, and the code was the beans’ heights in watering order, which was Thursday’s lessons: flask, music, pencil, atlas. I found a tiny key in a coat pocket, measured the beans with a ruler from the filing cabinet, and taped two halves of a note back together. Nutmeg watched the whole thing. Then I turned the big key and the classroom was shut for the summer.');
}
/* ---------- using things ---------- */
const USES = {
  'skey>ev_cabinet': unlockCabinet, 'skey>ev_cabdrawer': unlockCabinet, /* the drawer is the lock's (MOTH-92) */
  'ruler>ev_beans': () => placeRuler(0), 'ruler>ev_pot1': () => placeRuler(0), 'ruler>ev_pot2': () => placeRuler(1), 'ruler>ev_pot3': () => placeRuler(2), 'ruler>ev_pot4': () => placeRuler(3),
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
      if (!S.cabOut){ toggleDrawer('cab', taken('ruler') ? 'The top drawer slides open. Empty now.' : 'The top drawer slides open.'); return; }
      openCabinet(); return;
    case 'ev_tdesk': say(S.deskOpen ? (S.deskOut ? 'Mr Hollis’s desk, its drawer open.' : 'Mr Hollis’s desk. The drawer is unlocked now.') : 'Mr Hollis’s desk: his mug, his books, an apple. The drawer has a little lock with four number dials.'); return;
    case 'ev_tdrawer': /* the drawer is the only way to the dials (MOTH-61); unlocked, it opens on a tap and zooms on the next */
      if (!S.deskOpen){ openDeskLock(); return; }
      if (!S.deskOut){ toggleDrawer('desk', taken('dkey') ? 'The drawer slides open. Paper clips and a whistle.' : 'The drawer slides open. Something glints inside.'); return; }
      openInsideDesk(); return;
    case 'ev_board': { const first = !S.seen.day; if (first){ S.seen.day = Date.now(); save(); } say('The whiteboard, wiped clean for the holidays. Only today’s date is left: ' + DATE + '.' + (first ? copyClue('board') : '')); return; } /* no zoom: the date is big enough on the wall (owner, 24 Oct 2026) */
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
  {trail:'a', goal:() => taken('ruler'), target:'ev_cabinet', tips:['That little key fits something small and locked.', 'The filing cabinet under Nutmeg has a tiny lock.', 'Hold the small key and tap the filing cabinet. Tap the open drawer to look inside, and take the ruler.']},
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
  out.push([a ? -1 : first('a'), 'The beans’ heights', a ? '✓ measured' : known().length ? `${known().length} of 4 measured` : taken('ruler') ? 'I have a ruler' : taken('skey') ? 'a small key' : 'not started', a]);
  out.push([b ? -1 : first('b'), 'The order he watered them', b ? '✓ the note' : (S.got.includes('half1') || S.got.includes('half2')) ? 'half a note' : 'not started', b]);
  out.push([c ? -1 : first('c'), 'The code on his drawer', c ? '✓ open' : (S.seen.thu ? 'Thursday’s lessons' : S.seen.day ? 'it’s Thursday' : 'four numbers'), c]);
  if (c) out.push([S.done ? -1 : S.got.includes('dkey') ? 11 : 10, 'Lock up 5H', S.done ? '✓ locked' : S.got.includes('dkey') ? 'I have the key' : 'the key is in the drawer', S.done]);
  return out;
}
function noticed(){
  const n = [];
  if (S.rulerAt != null && !S.deskOpen) n.push('The ruler is by the beans: tap The beans above to measure them again.'); /* no heights written down for the player (MOTH-87) */
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
  fresh:() => ({seen:{}, clues:[], taken:{}, keyDown:false, binMoved:[], binDone:false, popped:false, measured:0, heights:[], rulerAt:null, cabUnlocked:false, cabOut:false, dials:[0,0,0,0], deskOpen:false, deskOut:false, locked:false}),
  extra:{classroom:['closeup-bin.jpg', 'closeup-hat.jpg', 'closeup-pots.jpg', 'closeup-desk.jpg', 'closeup-cab.jpg', 'closeup-note.jpg', 'closeup-lock.jpg', 'item-skey.png', 'item-ruler.png', 'item-half1.png', 'item-half2.png', 'item-wnote.jpg', 'item-dkey.png', 'item-dkey-bow.png', ...RUBBISH.map(r => r.src)].map(f => '../art/eval/c5h/' + f).concat(['../art/school/h1.jpg'])}, /* the close-ups' pictures load with the room, so no card opens half drawn (MOTH-76) */
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES,
  overlays:{c4:() => S.cabUnlocked ? wrap(wallTimetable(), wallDrawer('cab')) : wrap(wallTimetable(), wallKeyhole()), c1:() => S.deskOpen ? wrap(wallBoard(), wallDrawer('desk')) : wrap(wallBoard()), c2:wallLabels, c3:() => wrap(...[S.locked ? wallDoorway() : null].filter(Boolean))},
  act, miss, sparkle, rows, noticed, clues, speaker, helper:() => 'the moth', child:'mary'
};
})());
