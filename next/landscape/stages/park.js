/* The Moth House, landscape engine: Mary's stage 5, Trent Park, the next evening.
   Five places and three parallel trails that meet at a little gate in an old wall at dusk; see STORY.md (stage 5, version 2,
   with the facts checked) and next/PLAYBOOK.md (4c for the trails, 4t and 4u for the rules). Registered with the engine in index.html. */
'use strict';
registerStage('park', (function(){
const A = '../art/park/', N = '../art/nana/';
/* the park: the lawn by the café (north the café, east Jedi's bench, south the finger-post and the gates, west the big house up its slope);
   the terrace of the big house (north the museum door, east the urn and the speaking pipe, south the steps down, west the long avenue);
   the listening room in the basement; the obelisk at the far end of the avenue (north the obelisk, east the hollow tree its shadow points at,
   south the avenue back, west the path into the wood); Camlet Moat (north the moat, east the ribbon trees, south the path back, west the old wall). */
const ROOMS = {
  lawn:{name:'The lawn', into:'the lawn by the café', views:['w1','w2','w3','w4']},
  terrace:{name:'The terrace', into:'the terrace of the big house', views:['t1','t2','t3','t4']},
  room:{name:'The listening room', into:'the listening room', views:['r1','r2','r3','r4']},
  obelisk:{name:'The obelisk', into:'the obelisk', views:['o1','o2','o3','o4']},
  moat:{name:'Camlet Moat', into:'the wood by the moat', views:['m1','m2','m3','m4']}
};
const WALLS = Object.fromEntries(['w1','w2','w3','w4','t1','t2','t3','t4','r1','r2','r3','r4','o1','o2','o3','o4','m1','m2','m3','m4'].map(k => [k, A + k + '.jpg']));
/* doors: the path up the lawn to the terrace; the museum door down to the listening room and its stairs back up; the avenue from the terrace to the
   obelisk and back; the path from the obelisk into the wood and back. The finger-post is a short cut to each (openSign). */
const DOORS = {pw_house:['terrace', 0], pw_path:['terrace', 0], pt_steps:['lawn', 0], pt_door:['room', 0], pr_stairs:['terrace', 2], pr_steps:['terrace', 2],
  pt_avenue:['obelisk', 0], po_avenue:['terrace', 0], po_path:['moat', 0], pm_path2:['obelisk', 0]};
const got = k => S.got.includes(k);
/* the tap code: a 5×5 grid, C and K sharing a square; a letter is (row, column). The lamp on the terrace sends EAR; the oldest tape says NANA */
const GRID = ['ABCDE', 'FGHIJ', 'LMNOP', 'QRSTU', 'VWXYZ'];
const tapsFor = word => [...word].flatMap(ch => { const r = GRID.findIndex(row => row.includes(ch)); return [r + 1, GRID[r].indexOf(ch) + 1]; });
const WORD = tapsFor('EAR'), TAPE = tapsFor('NANA');
/* the sundial: the obelisk's shadow at Enfield's latitude. Hour lines on a horizontal dial: tan(angle) = sin(51.5°) × tan(15° × hours from noon) */
const LAT = Math.sin(51.5*Math.PI/180);
const hourAngle = h => { const H = 15*h*Math.PI/180; let a = Math.atan(LAT*Math.tan(H)); if (h > 6) a += Math.PI; if (h < -6) a -= Math.PI; return a; };
const RING = {cx:50, cy:76, rx:27, ry:14}; /* the ring of stones round the obelisk's base, in picture percentages of o1 */
const ANSWER = {h:7, lo:30, hi:55};     /* the shadow lies between VII and VIII: twenty to eight, or thereabouts */
const HOTS = {
  /* the lawn */
  w1:[
    {id:'pw_nana', l:62, t:36, w:20, h:32, label:'Nana, at the café table', sound:'leaf', key:true},
    {id:'pw_zaina', l:48, t:54, w:12, h:30, label:'Zaina', sound:'leaf'},
    {id:'pw_elliot', l:80, t:50, w:10, h:34, label:'Elliot', sound:'leaf'},
    {id:'pw_spade', l:40, t:72, w:11, h:17, label:'Zaina’s spade, on the grass', sound:'tick', key:true, anim:'wobble', layer:'spade', hideWhen:() => S.spadeGot},
    {id:'pw_cafe', l:50, t:22, w:24, h:30, label:'The café', sound:'knock'},
    {id:'pw_umbrellas', l:30, t:40, w:18, h:16, label:'Tables and umbrellas', sound:'leaf'}],
  w2:[
    {id:'pw_jedi', l:35, t:46, w:18, h:30, label:'Jedi, on the bench', sound:'leaf', key:true, anim:'sniff', layer:'jedibench', hideWhen:() => S.jediMoved},
    {id:'pw_bench', l:36, t:56, w:16, h:16, label:'The bench', sound:'knock', showWhen:() => S.jediMoved},
    {id:'pw_bin', l:69, t:58, w:6, h:12, label:'Litter bin', sound:'knock'},
    {id:'pw_chestnut', l:10, t:4, w:45, h:40, label:'Chestnut tree', sound:'leaf'}],
  w3:[
    {id:'pw_sign', l:42, t:10, w:26, h:26, label:'Finger-post', sound:'knock', key:true},
    {id:'pw_gates', l:16, t:36, w:14, h:22, label:'The park gates', sound:'knock'},
    {id:'pw_flowers', l:6, t:76, w:36, h:20, label:'Flower bed', sound:'leaf'}],
  w4:[
    {id:'pw_house', l:52, t:34, w:38, h:26, label:'The big house', sound:'knock', key:true},
    {id:'pw_path', l:40, t:60, w:22, h:34, label:'The path up to the house', sound:'leaf'},
    {id:'pw_oaks', l:2, t:2, w:30, h:56, label:'Old oaks', sound:'leaf'}],
  /* the terrace */
  t1:[
    {id:'pt_door', l:80, t:16, w:14, h:34, label:'The museum door, open', sound:'knock', key:true},
    {id:'pt_board', l:68, t:56, w:12, h:24, label:'A board by the door', sound:'knock'},
    {id:'pt_rose', l:56, t:20, w:10, h:40, label:'Climbing rose', sound:'leaf'},
    {id:'pt_lawnview', l:10, t:30, w:40, h:30, label:'The lawn below', sound:'leaf'}],
  t2:[
    {id:'pt_urn', l:15, t:22, w:16, h:30, label:'Stone urn of geraniums', sound:'leaf'},
    {id:'pt_pipe', l:70, t:42, w:12, h:13, label:'A brass mouthpiece in the wall', sound:'tick', key:true},
    {id:'pt_lamp', l:70, t:29, w:12, h:12, label:'A little brass lamp', sound:'tick', key:true},
    {id:'pt_bench2', l:84, t:58, w:15, h:24, label:'A bench against the wall', sound:'knock'},
    {id:'pt_trees2', l:34, t:20, w:30, h:30, label:'The trees beyond the balustrade', sound:'leaf'}],
  t3:[
    {id:'pt_steps', l:38, t:62, w:26, h:30, label:'The steps down to the lawn', sound:'knock'},
    {id:'pt_view', l:28, t:26, w:44, h:34, label:'The park, from the terrace', sound:'leaf'},
    {id:'pt_balustrade', l:4, t:58, w:30, h:20, label:'Balustrade', sound:'knock'}],
  t4:[
    {id:'pt_avenue', l:48, t:36, w:30, h:34, label:'The long avenue to the obelisk', sound:'leaf', key:true},
    {id:'pt_pineapple', l:20, t:24, w:14, h:28, label:'A stone pineapple', sound:'knock'},
    {id:'pt_trees4', l:10, t:4, w:30, h:18, label:'Tall trees', sound:'leaf'}],
  /* the listening room */
  r1:[
    {id:'pr_recorder', l:26, t:46, w:20, h:18, label:'An old tape recorder', sound:'tick', key:true},
    {id:'pr_headphones', l:18, t:44, w:10, h:16, label:'Headphones on a hook', sound:'tick', key:true},
    {id:'pr_pipe2', l:44, t:36, w:14, h:16, label:'The other end of the speaking pipe, with its lamp', sound:'tick'},
    {id:'pr_chair', l:37, t:62, w:12, h:24, label:'A wooden chair', sound:'knock'},
    {id:'pr_desk', l:22, t:64, w:34, h:20, label:'The listener’s desk', sound:'knock'},
    {id:'pr_window', l:35, t:0, w:12, h:9, label:'A small high window', sound:'tap'}],
  r2:[
    {id:'pr_cabinet', l:36, t:30, w:28, h:42, label:'The display cabinet', sound:'tap'},
    {id:'pr_card', l:66, t:34, w:12, h:18, label:'A framed card on the wall', sound:'paper', key:true},
    {id:'pr_window2', l:32, t:0, w:12, h:10, label:'A small high window', sound:'tap'}],
  r3:[
    {id:'pr_box', l:42, t:30, w:22, h:20, label:'The listeners’ box', sound:'knock', key:true},
    {id:'pr_plinth', l:40, t:50, w:26, h:32, label:'The plinth', sound:'knock'},
    {id:'pr_board', l:66, t:32, w:16, h:26, label:'A board on a stand', sound:'paper'},
    {id:'pr_cable', l:16, t:30, w:12, h:30, label:'A coil of old cable', sound:'leaf'}],
  r4:[
    {id:'pr_stairs', l:58, t:8, w:34, h:36, label:'The stairs up to the terrace', sound:'knock'},
    {id:'pr_steps', l:60, t:46, w:30, h:36, label:'The stairs up to the terrace', sound:'knock'},
    {id:'pr_notice', l:16, t:28, w:26, h:30, label:'The museum’s notice', sound:'paper', key:true}],
  /* the obelisk */
  o1:[
    {id:'po_obelisk', l:42, t:8, w:16, h:62, label:'The obelisk', sound:'knock', key:true},
    {id:'po_shadow', l:54, t:68, w:24, h:14, label:'The obelisk’s shadow', sound:'leaf', key:true},
    {id:'po_ring', l:26, t:62, w:20, h:28, label:'A ring of stones in the grass', sound:'tick'},
    {id:'po_woods', l:0, t:20, w:30, h:36, label:'The wood', sound:'leaf'}],
  o2:[
    {id:'po_tree', l:36, t:14, w:34, h:40, label:'An old tree at the wood’s edge', sound:'leaf'},
    {id:'po_hollow', l:47, t:54, w:16, h:16, label:'A hollow among the roots', sound:'leaf', key:true},
    {id:'po_log', l:12, t:44, w:26, h:20, label:'A fallen log', sound:'knock'},
    {id:'po_bracken', l:72, t:52, w:22, h:30, label:'Bracken', sound:'leaf'},
    {id:'po_key', l:50, t:64, w:8, h:12, label:'An old key, in the hole', sound:'tick', key:true, showWhen:() => S.dug && !S.keyGot}],
  o3:[
    {id:'po_avenue', l:34, t:40, w:34, h:36, label:'The avenue back to the big house', sound:'leaf'},
    {id:'po_jedi2', l:61, t:50, w:11, h:26, label:'Jedi, come to supervise', sound:'leaf', anim:'sniff', layer:'jedistand', showWhen:() => S.jediMoved},
    {id:'po_sky', l:30, t:4, w:40, h:30, label:'The evening sky', sound:'leaf'}],
  o4:[
    {id:'po_path', l:40, t:44, w:30, h:40, label:'The path into the wood', sound:'leaf', key:true},
    {id:'po_post', l:72, t:46, w:8, h:30, label:'A waymark post', sound:'knock'},
    {id:'po_oaks2', l:4, t:4, w:30, h:50, label:'Oaks', sound:'leaf'}],
  /* Camlet Moat */
  m1:[
    {id:'pm_bridge', l:40, t:50, w:22, h:22, label:'The plank bridge', sound:'knock', key:true},
    {id:'pm_island', l:30, t:16, w:40, h:34, label:'The island', sound:'leaf'},
    {id:'pm_water', l:6, t:56, w:30, h:28, label:'The moat', sound:'leaf'},
    {id:'pm_wall', l:44, t:30, w:16, h:14, label:'Old stones on the island', sound:'knock'}],
  m2:[
    {id:'pm_carvings', l:26, t:52, w:16, h:30, label:'Carvings on the bark', sound:'tap', key:true},
    {id:'pm_ribbons', l:10, t:8, w:70, h:30, label:'Ribbons in the branches', sound:'leaf'},
    {id:'pm_charms', l:62, t:20, w:20, h:30, label:'Little charms on strings', sound:'tick'},
    {id:'pm_bluebells', l:2, t:74, w:30, h:20, label:'Bluebell leaves', sound:'leaf'}],
  m3:[
    {id:'pm_path2', l:34, t:42, w:34, h:40, label:'The path back to the avenue', sound:'leaf'},
    {id:'pm_post2', l:70, t:46, w:8, h:30, label:'A waymark post', sound:'knock'}],
  m4:[
    {id:'pm_gate', l:44, t:32, w:16, h:46, label:'A little iron gate in the wall', sound:'knock', key:true, hideWhen:() => S.houseSeen},
    {id:'pm_house', l:45, t:36, w:14, h:36, label:'A little house in the trees', sound:'leaf', key:true, showWhen:() => S.houseSeen},
    {id:'pm_wall2', l:10, t:24, w:30, h:40, label:'The old wall', sound:'knock'},
    {id:'pm_ivy', l:70, t:22, w:24, h:40, label:'Ivy on the wall', sound:'leaf'},
    {id:'pm_ferns', l:2, t:70, w:30, h:24, label:'Ferns', sound:'leaf'}]
};
const LAYERS = {
  w1:[{src:A+'item-spade.png', group:'spade', l:41.5, t:74, w:8, h:14.76, shadow:.4, hideWhen:() => S.spadeGot}],
  w2:[{src:A+'layer-jedibench.png', group:'jedibench', l:34, t:46, w:20, h:31.19, shadow:.5, hideWhen:() => S.jediMoved}],
  o2:[{src:A+'layer-hole.png', group:'hole', l:46, t:62, w:16, h:14.1, showWhen:() => S.dug},
      {src:A+'item-key.png', group:'key', l:51.5, t:65, w:5, h:10.3, showWhen:() => S.dug && !S.keyGot}],
  o3:[{src:A+'layer-jedistand.png', group:'jedistand', l:62, t:50, w:9, h:25.41, shadow:.5, showWhen:() => S.jediMoved}],
  /* the open gate is two pieces lifted from the wall painted with it open: the dark arch where the gate was, and the leaf swung out on its hinge */
  m4:[{src:A+'layer-gatearch.png', group:'gatearch', l:45.28, t:33.59, w:11.77, h:46.37, showWhen:() => S.gateOpen},
      {src:A+'layer-gateleaf.png', group:'gateleaf', l:26.6, t:30.99, w:19.11, h:48.96, hinge:'right', showWhen:() => S.gateOpen},
      {src:A+'layer-house.png', group:'house', l:47.6, t:51, w:8.5, h:13.4, showWhen:() => S.houseSeen}]
};
const EXTRA = {lawn:[N+'closeup-map.jpg'], room:[A+'closeup-box.jpg'], moat:[A+'closeup-carvings.jpg']};

/* ---------- things the game draws ---------- */
const FONT = 'Atkinson Hyperlegible,Verdana,sans-serif';
/* the hour numerals round the obelisk's ring of stones, on the true hour lines of a sundial at this latitude: a museum's paint on Nana's stones */
function dialSVG(){
  const marks = []; const roman = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  for (let h = -6; h <= 9; h++){ const a = hourAngle(h), x = RING.cx + RING.rx*1.1*Math.sin(a), y = RING.cy - RING.ry*1.1*Math.cos(a) + 1.2;
    const t = roman[Math.abs(h)]; marks.push(`<text x="${x*16}" y="${y*9}" text-anchor="middle" font-size="22" font-family="${FONT}" font-weight="700" fill="#f4ead0" stroke="#3a2a14" stroke-width="3" paint-order="stroke">${t}</text>`); }
  return `<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" aria-hidden="true">${marks.join('')}</svg>`;
}
const dialOverlay = () => { const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:0;top:0;width:100%;height:100%;pointer-events:none'; wrap.innerHTML = dialSVG(); return wrap; };
/* a brass lamp that flashes a word in tap code: on for a beat, off for a beat, a longer pause between numbers, a long pause before it starts again.
   The flashes are the clue; the knocks come with them only while Mary is listening (a tap on the lamp or the headphones), so the clue is never sound alone */
function flasher(box, seq, opts){
  const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = `left:${box[0]}%;top:${box[1]}%;width:${box[2]}%;height:${box[3]}%;pointer-events:none`;
  const g = document.createElement('div'); g.className = 'glow'; wrap.appendChild(g);
  const steps = []; seq.forEach((n, i) => { for (let k = 0; k < n; k++){ steps.push(['on', 320]); steps.push(['off', k === n - 1 ? 900 : 300]); } if (i % 2 === 1) steps[steps.length - 1][1] = 1500; });
  steps.push(['off', opts.loop ? 3200 : 0]);
  let i = 0, stopped = false;
  const run = () => { if (!wrap.isConnected || stopped) return; const [st, ms] = steps[i]; g.classList.toggle('on', st === 'on'); if (st === 'on' && opts.knock && opts.knock()) sfx('knock');
    i++; if (i >= steps.length){ i = 0; if (opts.done) opts.done(); if (!opts.loop){ stopped = true; return; } } setTimeout(run, ms); };
  if (opts.loop || opts.go) setTimeout(run, opts.loop ? 600 : 200);
  wrap.flasher = {start:() => { if (stopped || i === 0) { stopped = false; i = 0; run(); } }};
  return wrap;
}
const lampOverlay = () => flasher([72.2, 30.5, 7.2, 8.5], WORD, {loop:true, knock:() => S.listening, done:() => { S.listening = false; }});
const tapeOverlay = () => flasher([51, 46, 5, 7], TAPE, {loop:false, go:false, knock:() => true, done:() => { S.listening = false; S.tapeHeard = true; save(); }});
/* dusk: once Mary knows how late it is, the whole park goes blue and gold, and in the wood the first moths come out */
const WOOD = {o2:1, o4:1, m1:1, m2:1, m3:1, m4:1};
const duskVeil = v => () => { const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:0;top:0;width:100%;height:100%;pointer-events:none';
  if (S.dusk){ wrap.innerHTML = '<div class="dusk"></div>' + (WOOD[v] ? [[22, 48], [70, 38], [55, 62], [84, 70], [12, 66]].map(([x, y], i) => `<span class="mothdot" style="left:${x}%;top:${y}%;animation-delay:${i*0.7}s"></span>`).join('') : ''); }
  return wrap; };
const houseGlow = () => { const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:40%;top:30%;width:24%;height:50%;pointer-events:none'; if (S.houseSeen) wrap.innerHTML = '<div class="hglow"></div>'; return wrap; };
const compose = (...fns) => () => { const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:0;top:0;width:100%;height:100%;pointer-events:none'; fns.forEach(f => wrap.appendChild(f())); return wrap; };
const overlays = {}; Object.keys(WALLS).forEach(v => { overlays[v] = duskVeil(v); });
overlays.t2 = compose(lampOverlay, duskVeil('t2')); overlays.r1 = compose(tapeOverlay, duskVeil('r1')); overlays.o1 = compose(dialOverlay, duskVeil('o1')); overlays.m4 = compose(duskVeil('m4'), houseGlow);

/* ---------- notes and items ---------- */
const gridHTML = `<table class="tapgrid" aria-label="The tap code grid"><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>${GRID.map((row, r) => `<tr><th>${r+1}</th>${[...row].map(ch => `<td>${ch === 'C' ? 'C/K' : ch}</td>`).join('')}</tr>`).join('')}</table>`;
const NOTES = {
  card:{html:`<div class="compact"><p class="head">THE LISTENERS’ TAP CODE</p>${gridHTML}<p>Tap the row, pause, tap the column. Two taps, a pause, three taps is H. C and K share a square.</p></div>`,
    voice:'The listeners’ tap code. Tap the row, pause, tap the column. Two taps, a pause, three taps is H. C and K share a square.'},
  history:{html:`<div class="compact"><p class="head">THIS HOUSE IN THE WAR</p><p>From 1942 to 1945 the most important prisoners of the war were kept in this house, and treated like guests. They did not know that the house was listening: down here, people with headphones on wrote down everything the prisoners said, through tiny microphones hidden in the lamps, the plant pots, even the garden benches.</p><p>Most of the listeners had themselves escaped from Germany and Austria. What they heard helped to end the war sooner. The house is a museum now.</p></div>`},
  paper:{hand:true, html:`<div class="compact"><p>If you are reading this, you listened, like the men downstairs did.</p><p>There is a house in the trees past the moat that is not on any map. It shows itself at dusk, to someone who is looking, through the little gate in the old wall. I buried the key where the obelisk’s shadow points when the moths come out.</p><p>If you’re reading this, bring them home.</p><p class="sign">N., age 9</p></div>`}
};
const ITEMS = {
  map:{name:'Nana’s map', icon:`<img src="${N}item-map.png" alt="">`, open:() => openMap()},
  spade:{name:'spade', icon:`<img src="${A}item-spade.png" alt="">`},
  card:{name:'code card', icon:`<img src="${A}item-card.png" alt="">`, open:() => openNote('card')},
  paper:{name:'folded paper', icon:`<img src="${A}item-paper.png" alt="">`, open:() => openNote('paper')},
  key:{name:'rusty key', icon:`<img src="${A}item-key.png" alt="">`},
  watch:{name:'Jedi’s watch', icon:`<img src="${A}item-watch.png" alt="">`, open:() => openWatch()}
};
const HINTS = [
  {goal:() => S.briefed, tips:['Nana said the little house is past the obelisk, in the trees by the moat, and only shows itself at dusk to someone who is looking.', 'Nana is at the café table. Her map is in the strip.', 'Tap Nana at the café, and open the map in the strip.']},
  /* trail 1: the listeners' word */
  {thread:1, goal:() => S.lampSeen, tips:['People once listened very carefully in the big house. Something there is still sending.', 'On the terrace of the big house a little brass lamp keeps flashing, beside a brass mouthpiece in the wall.', 'Go up to the terrace, turn to the urn, and tap the little lamp. Count the flashes.']},
  {thread:1, goal:() => S.cardSeen, tips:['The flashes come in pairs of numbers. Numbers in pairs want a grid.', 'The museum in the basement keeps the listeners’ code card on the wall.', 'Through the museum door, turn to the display cabinet and tap the framed card.']},
  {thread:1, goal:() => S.boxOpen, tips:['The lamp is sending a word: one, five; one, one; four, two. The card turns each pair into a letter.', 'Row one, column five is E. Row one, column one is A. Row four, column two is R. The listeners’ box opens on the word it is sent.', 'At the box, tap once, pause, tap five times, pause, tap once, pause, tap once, pause, tap four times, pause, tap twice. Then Open.']},
  {thread:1, goal:() => got('paper') || S.paperRead, tips:['The box is open.', 'Among the replicas is a folded paper that is not one.', 'Take the folded paper from the box and read it.']},
  /* trail 2: the key */
  {thread:2, goal:() => S.mapSeen, tips:['Nana drew her map when she was nine. She marked something on it.', 'Open the map in the strip and look near the obelisk.', 'There is a cross by the obelisk, where its shadow points, and a line about digging at dusk.']},
  {thread:2, goal:() => got('spade'), tips:['Digging needs something to dig with.', 'Zaina brought her spade from the sandpit. It is on the grass by her chair at the café.', 'Tap the little red spade on the grass by Zaina’s chair.']},
  {thread:2, goal:() => S.dug, tips:['Where does the obelisk’s shadow point?', 'The shadow lies across the grass towards the old tree at the wood’s edge, east of the obelisk, with a hollow in its roots.', 'Tap the spade in the strip, then the hollow among the old tree’s roots.']},
  {thread:2, goal:() => S.keyGot, tips:['Something in the hole.', 'A key.', 'Tap the key in the hole.']},
  /* trail 3: the time */
  {thread:3, goal:() => got('watch') || S.timeSet, tips:['Nana said back by dark. Nobody knows what time it is.', 'Jedi’s watch has stopped. He is on the bench on the lawn, resting his eyes.', 'Tap Jedi on the bench.']},
  {thread:3, goal:() => S.ringSeen, tips:['A stopped watch needs a clock. The park has an old one.', 'The obelisk is a sundial: Nana’s ring of stones has the hours painted on it, and the shadow is the hand.', 'Go to the obelisk and look at the shadow and the stones.']},
  {thread:3, goal:() => S.timeSet, tips:['The shadow lies between the stones marked VII and VIII.', 'That is about twenty to eight. Open the watch in the strip.', 'Set the watch to seven forty and tap Set.']},
  /* convergence */
  {goal:() => S.gateOpen, tips:['The paper said: through the little gate in the old wall, past the moat.', 'The gate is in the old wall in the wood beyond the moat, and it is locked.', 'Tap the rusty key in the strip, then the gate.']},
  {goal:() => S.houseSeen, tips:['The paper said: at dusk, to someone who is looking.', 'It is not dusk until Mary knows how late it is: Jedi’s watch, set by the sundial.', 'Set the watch to twenty to eight; then open the gate and look.']},
  {goal:() => S.done, tips:['There it is.', 'Go on, then.', 'Tap the little house in the trees.']}
];
const THREADS = {1:['The listeners’ word', () => S.boxOpen, ['', 'lamp counted', 'code card found']],
  2:['The buried key', () => S.keyGot, ['', 'cross on the map', 'spade borrowed', 'hole dug']],
  3:['What time is it?', () => S.timeSet, ['', 'Jedi’s watch', 'sundial found']]};
const speaker = () => 'The moth says';

/* ---------- close-ups ---------- */
/* the finger-post: four blank fingers, and the moth reads them; each is a short cut */
function openSign(){
  openCloseup(`<div class="card locker"><p class="otitle">The finger-post. Four ways.</p><div class="row wrap" id="fingers"><button class="ob quiet" data-go="terrace">The big house</button><button class="ob quiet" data-go="obelisk">The obelisk</button><button class="ob quiet" data-go="moat">Camlet Moat</button><button class="ob quiet" data-go="lake">The lake</button></div><p class="ofb" id="signFb">Tap a finger to go that way.</p></div>`);
  $('fingers').querySelectorAll('button').forEach(b => b.onclick = () => { const to = b.dataset.go; if (to === 'lake'){ sfx('knock'); $('signFb').textContent = 'The lake is the other way, and Nana said not today.'; return; } closeCloseup(); go(to, 0); });
  say('A finger-post with four fingers. The paint has worn off the words, but Nana said: the big house, the obelisk, the moat, the lake.');
}
/* the map, opened from the strip: Nana's Trent Park, with the cross she drew by the obelisk */
function openMap(){
  S.mapSeen = true; save();
  const labels = [['TRENT PARK', 20, 11, 44], ['the lake', 28, 88.6, 22], ['Camlet Moat', 69, 93.2, 22], ['the obelisk', 50, 61.6, 20], ['the big house', 52, 23.8, 20], ['Moth House?', 81, 38.4, 20], ['✕', 57, 60, 30], ['dig here, where the shadow points,', 47, 75, 15], ['when the moths come out', 47, 79, 15]];
  const svg = `<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">${labels.map(([t, x, y, s]) => `<text x="${x*16}" y="${y*9}" text-anchor="middle" font-size="${s}" font-family="Caprasimo,Georgia,serif" fill="${t === '✕' ? '#a83a2a' : '#4a5a8a'}" transform="rotate(-1 ${x*16} ${y*9})">${t}</text>`).join('')}</svg>`;
  openPic(N+'closeup-map.jpg', '16/9', '', svg, 64);
  say('Nana’s map: the lake, the obelisk, the moat, the big house, and the little house in the trees. By the obelisk, a red cross where its shadow points, and underneath in her nine-year-old writing: dig here, where the shadow points, when the moths come out.');
}
/* the listeners' box: tap the word, a pause between numbers, then Open. Nothing is checked until Open, so the answer cannot be found by watching for a click */
function openBox(){
  if (S.boxOpen){ openBoxInside(); return; }
  const dots = () => S.taps.map(n => '●'.repeat(n)).join('<span class="gap"></span>') + (S.cur ? (S.taps.length ? '<span class="gap"></span>' : '') + `<b>${'●'.repeat(S.cur)}</b>` : '');
  openCloseup(`<div class="card locker tapper"><p class="otitle">The listeners’ box. Tap the word the lamp is sending.</p><p class="taps" id="taps" aria-live="polite"></p><div class="row"><button class="ob" id="tapBtn">Tap</button><button class="ob quiet" id="pauseBtn">Pause</button><button class="ob quiet" id="clearBtn">Clear</button></div><p class="ofb" id="boxFb">A tap for the row, a pause, a tap for the column.</p><div class="row"><button class="ob" id="openBox">Open</button></div></div>`);
  const show = () => { $('taps').innerHTML = dots() || '<span class="nbsmall">nothing yet</span>'; };
  show();
  $('tapBtn').onclick = () => { S.cur = Math.min(9, S.cur + 1); sfx('knock'); save(); show(); };
  $('pauseBtn').onclick = () => { if (S.cur){ S.taps.push(S.cur); S.cur = 0; save(); sfx('tick'); show(); } };
  $('clearBtn').onclick = () => { S.taps = []; S.cur = 0; save(); sfx('leaf'); show(); $('boxFb').textContent = 'Cleared.'; };
  $('openBox').onclick = () => { if (S.cur){ S.taps.push(S.cur); S.cur = 0; } save(); show(); const w = S.taps.join();
    if (w === WORD.join()){ S.boxOpen = true; save(); sfx('pickup'); $('boxFb').textContent = 'E, A, R. Click: the lid lifts.'; setTimeout(() => { closeCloseup(); openBoxInside(); }, 900); }
    else if (w === TAPE.join()){ if (!S.nightMoth){ S.nightMoth = true; save(); sfx('pickup'); } $('boxFb').textContent = '★ N, A, N, A. The little lamp on the box flashes back, four times, as if it knew her.'; }
    else { sfx('knock'); $('boxFb').textContent = S.taps.length ? 'Nothing. The lamp on the terrace is still sending; count it in pairs.' : 'Tap something first.'; S.taps = []; S.cur = 0; save(); show(); } };
  say('A brass-bound box with one big button, and a plate the museum people put beside it: tap the word the lamp on the terrace is sending, and the box opens.');
}
function openBoxInside(){
  const paperBtn = got('paper') || S.paperTaken ? '' : `<button class="book" id="takePaper" style="left:40%;top:30%;width:22%;height:36%" aria-label="A folded paper"><span></span></button>`;
  openPic(A+'closeup-box.jpg', '16/9', 'The listeners’ box, open', (got('paper') || S.paperTaken ? '' : `<img class="part" data-part="paper" src="${A}item-paper.png" alt="" style="left:43%;top:34%;width:14%">`) + paperBtn, 62);
  if (paperBtn) $('takePaper').onclick = e => { e.stopPropagation(); S.paperTaken = true; S.got.push('paper'); save(); sfx('pickup'); const im = $('picwrap').querySelector('.part'); if (im){ im.classList.add('taken'); setTimeout(() => im.remove(), 400); } $('takePaper').remove(); render(); say('A square of yellowed paper, folded in four, with a pencil moth on the outside. Not a replica. It goes in the strip below: tap it there to read it.'); };
  say(got('paper') || S.paperTaken ? 'Headphones, a pencil, a notebook, a reel of tape, a badge. The museum’s replicas.' : 'Headphones, a pencil, a notebook, a reel of tape, a badge… and on top, a small folded paper with a moth drawn on it, which the plate says was found inside the speaking pipe. Tap it.');
}
/* Jedi's watch: set the hands, then Set. The sundial by the obelisk gives the time */
function openWatch(){
  const face = () => { const h = S.watch.h % 12, m = S.watch.m, ah = (h + m/60)*30, am = m*6;
    return `<svg viewBox="-50 -50 100 100" class="watchface" aria-hidden="true"><circle r="46" fill="#f7efd8" stroke="#8a6a2a" stroke-width="3"/>${[...Array(12)].map((_, i) => `<line x1="0" y1="-40" x2="0" y2="-35" stroke="#5a4a2a" stroke-width="${i % 3 ? 1.5 : 3}" transform="rotate(${i*30})"/>`).join('')}<line x1="0" y1="4" x2="0" y2="-24" stroke="#2a2016" stroke-width="4" stroke-linecap="round" transform="rotate(${ah})"/><line x1="0" y1="5" x2="0" y2="-35" stroke="#2a2016" stroke-width="2.5" stroke-linecap="round" transform="rotate(${am})"/><circle r="2.5" fill="#2a2016"/></svg>`; };
  openCloseup(`<div class="card locker watch"><p class="otitle">Jedi’s watch, stopped. Set it.</p><div class="row watchrow"><button class="ob quiet" id="wH" aria-label="Move the hour hand on">hour +</button><div id="face">${face()}</div><button class="ob quiet" id="wM" aria-label="Move the minute hand on five minutes">minutes +</button></div><p class="ofb" id="wFb">${S.timeSet ? 'Set to twenty to eight.' : 'Tap the buttons to move the hands.'}</p><div class="row"><button class="ob" id="wSet">Set</button></div></div>`);
  const show = () => { $('face').innerHTML = face(); };
  $('wH').onclick = () => { S.watch.h = (S.watch.h % 12) + 1; sfx('tick'); save(); show(); };
  $('wM').onclick = () => { S.watch.m = (S.watch.m + 5) % 60; sfx('tick'); save(); show(); };
  $('wSet').onclick = () => { const {h, m} = S.watch;
    if (h === ANSWER.h && m >= ANSWER.lo && m <= ANSWER.hi){ if (!S.timeSet) setTime(); $('wFb').textContent = 'Twenty to eight, near enough. Jedi will say he knew.'; setTimeout(closeCloseup, 1200); }
    else { sfx('knock'); $('wFb').textContent = S.ringSeen ? 'Is that where the shadow lies? Look at the stones again.' : 'Set to what? Something in the park must tell the time.'; } };
  say(S.ringSeen ? 'Jedi’s watch. The shadow at the obelisk lies between VII and VIII.' : 'Jedi’s watch, stopped at ten past three, which it has not been for years. Something in the park must know the time.');
}
function setTime(){ S.timeSet = true; S.dusk = true; S.jediMoved = true; save(); render(); sfx('pickup');
  say('Twenty to eight. Mary looks up from the watch, and the park has changed while she was not looking: the light has gone blue and gold, the shadows have run together, and in the wood something small and pale is flying. Dusk. “Knew it,” says Jedi, somewhere behind her.'); }
function openCarvings(){
  S.carvingsSeen = true; save();
  openPic(A+'closeup-carvings.jpg', '16/9', 'Carvings on the bark', `<button class="book" id="mothCarving" style="left:62%;top:58%;width:30%;height:30%" aria-label="A moth and an arrow"><span></span></button>`, 60);
  $('mothCarving').onclick = e => { e.stopPropagation(); S.arrowSeen = true; save(); sfx('tap'); say('A little moth, cut into the bark a long time ago, and beside it an arrow. Pointing on through the wood, away from the moat.'); };
  say('Old carvings, grey with age: a heart, a star, a bird. And low down at the right, a moth, with an arrow beside it.');
}
function dig(){
  if (S.dug) return; S.dug = true; save(); render(); sfx('leaf'); animate({anim:'pop', layer:'hole'});
  say('Mary digs in the soft earth among the roots. A hand’s depth down, the spade clinks on something. An old iron key, rusty as a conker, with a round bow. Nana buried it when she was nine.');
}
function openGate(){
  if (S.gateOpen) return; S.gateOpen = true; drop('key'); save(); render(); sfx('turn'); animate({anim:'wipe', layer:'gateleaf'});
  if (S.dusk) { setTimeout(revealHouse, 1400); say('The key turns, stiff, then all at once. The gate swings out on a shriek of hinges.'); }
  else say('The key turns, stiff, then all at once. The gate swings out on a shriek of hinges… onto trees, and bracken, and more trees. Nothing. The paper said at dusk, to someone who is looking. It is not dusk. Is it?');
}
function revealHouse(){ if (S.houseSeen) return; S.houseSeen = true; save(); render(); sfx('pickup'); animate({anim:'pop', layer:'house'});
  say('Between the trees beyond the gate, where there was nothing, there is a little crooked house with a pointed roof, and every window lit, and moths going in and out of its door like bees. “Oh,” says Mary.'); }
const USES = {
  'spade>po_hollow':dig,
  'spade>po_log':() => { sfx('knock'); say('Mary digs beside the log. Worms, and a disappointed beetle.'); },
  'spade>po_bracken':() => { sfx('knock'); say('Mary digs in the bracken. Roots, and more roots.'); },
  'spade>po_ring':() => { sfx('knock'); say('Not Nana’s stones. She would know.'); },
  'spade>pw_flowers':() => { sfx('knock'); say('Not the flower bed. The park keeper is watching.'); },
  'spade>pt_urn':() => { sfx('knock'); say('Geraniums. Nothing underneath but more geranium.'); },
  'spade>pw_zaina':() => { sfx('tap'); say('“You can keep it till the house,” says Zaina.'); },
  'key>pm_gate':openGate,
  'key>pr_box':() => { sfx('knock'); say('The box has no keyhole, only its one big button.'); },
  'key>pw_jedi':() => { sfx('tap'); say('“A key? Not mine. Mine are in the car. I think.”'); },
  'watch>pw_jedi':() => { sfx('tap'); say(S.timeSet ? '“Twenty to eight. I knew.”' : '“Set it first, Mary. The obelisk will tell you.”'); },
  'watch>po_obelisk':() => { S.ringSeen = true; save(); sfx('tap'); say('Mary holds the watch up to the shadow. The shadow does not care. Between VII and VIII, it says, and Mary works the rest out: about twenty to eight. Open the watch in the strip and set it.'); },
  'watch>po_shadow':() => { S.ringSeen = true; save(); sfx('tap'); say('The shadow lies between the stones marked VII and VIII. About twenty to eight. Open the watch in the strip and set it.'); },
  'card>pr_box':() => { sfx('tap'); say('The card is for reading; the box is for tapping. Row, pause, column.'); },
  'card>pt_lamp':() => { sfx('tap'); say('One, five. One, one. Four, two. Row and column, says the card: E, A, R.'); },
  'paper>pw_nana':() => { sfx('paper'); say('Nana reads it, and reads it again, and gives it back without a word. Her eyes are very bright. “Go on, then,” she says at last.'); },
  'paper>pw_jedi':() => { sfx('tap'); say('“N.? Could be anyone. Could be me.” It could not be him.'); },
  'map>pw_nana':() => { sfx('paper'); say('“My map. I marked where I buried it, in case I forgot. I never forgot.”'); },
  'map>pw_jedi':() => { sfx('tap'); say('“A map of where I left my glasses, I hope.”'); }
};

function act(id){
  switch(id){
    /* the lawn */
    case 'pw_nana': S.briefed = true; save();
      if (S.done) say('“Go on, then.”');
      else if (S.houseSeen) say('“You found it. I knew you would. Go on, then, love.”');
      else if (S.keyGot) say('“Found something? I buried that in 1967. Dusk, Mary. Not before.”');
      else if (S.timeSet) say('“Twenty to eight? Then you have an hour. Mind the moat.”');
      else say('“The little house is past the obelisk, in the trees by the moat. It only shows itself at dusk, to someone who is looking. We will be here with the cake. Back by dark, mind.”'); break;
    case 'pw_zaina': say(S.spadeGot ? '“Bring my spade back,” says Zaina, with cake on her chin.' : '“Peanut wants to see the moat,” says Zaina. “Peanut can wait,” says Nana.'); break;
    case 'pw_elliot': say('Elliot is counting the layers in his cake. “Four,” he says. “Five, if you count the jam.”'); break;
    case 'pw_spade': S.spadeGot = true; S.got.push('spade'); save(); render(); sfx('pickup'); say('Zaina’s red spade from the sandpit, on the grass by her chair. “You can borrow it,” says Zaina, “if you bring it back.” It goes in the strip below.'); break;
    case 'pw_cafe': say('The café: tea, cake, and a queue of dogs outside.'); break;
    case 'pw_umbrellas': say('Café tables with their umbrellas furled. The sun is low enough not to need them.'); break;
    case 'pw_jedi':
      if (!got('watch') && !S.timeSet){ S.got.push('watch'); save(); render(); sfx('pickup'); say('“Resting my eyes, Mary. What’s the time? My watch has stopped.” He fishes it out of his waistcoat and hands it over without looking. “Set it for me. The obelisk will tell you the time, if you can read it. Your Nana’s stones.” The watch goes in the strip below.'); }
      else say('“Set it yet? The obelisk, Mary. Nana laid a ring of stones round it when she was nine, one every hour on the hour, one summer’s day. The museum painted the numbers on. Noon at the top.”'); break;
    case 'pw_bench': say('The bench, empty and still warm. Jedi has gone to supervise.'); break;
    case 'pw_bin': say('A litter bin with a squirrel in it. The squirrel leaves.'); break;
    case 'pw_chestnut': say('A horse chestnut, enormous. Conkers in October, says Jedi. Not now.'); break;
    case 'pw_sign': openSign(); return;
    case 'pw_gates': say('The park gates, where Jedi left the car. “Back by dark,” said Nana, twice.'); break;
    case 'pw_flowers': say('A flower bed, very tidy. The park keeper is proud of it.'); break;
    case 'pw_oaks': say('Oaks older than the house. Older than anything, says Nana.'); break;
    /* the terrace */
    case 'pt_board': say('A board by the museum door. The words have gone in the sun, but the picture is a pair of headphones.'); break;
    case 'pt_rose': say('A climbing rose up the house wall, the last flowers going brown.'); break;
    case 'pt_lawnview': say('The lawn, far below, and the café the size of a sugar lump.'); break;
    case 'pt_urn': say('A stone urn of red geraniums, warm from the day.'); break;
    case 'pt_pipe': S.pipeSeen = true; save(); say('A round brass mouthpiece set into the wall, worn bright where a hundred years of mouths have spoken into it. A speaking pipe, down to the basement. Mary says hello into it. Nothing says hello back; but the little lamp above it flashes on.'); break;
    case 'pt_lamp': S.lampSeen = true; S.listening = true; save(); render();
      say('A little brass lamp above the mouthpiece, flashing in a pattern, over and over, with a knock from the pipe at every flash. Mary counts: one. Five. One. One. Four. Two. Then a long gap, and it starts again.'); break;
    case 'pt_bench2': say('A bench against the warm wall. Jedi would like it.'); break;
    case 'pt_trees2': say('Trees going gold, and rooks going home.'); break;
    case 'pt_view': say('The whole park from up here: the lawn, the café, the long shadows, and away to the left the top of the obelisk over the trees.'); break;
    case 'pt_balustrade': say('A stone balustrade, cool under Mary’s hands.'); break;
    case 'pt_pineapple': say('A stone pineapple. Rich people put pineapples on things, says Nana, to show they could.'); break;
    case 'pt_trees4': say('The tall trees of the avenue, two straight rows.'); break;
    /* the listening room */
    case 'pr_recorder': S.tapeSeen = true; save(); say('An old tape recorder with two big reels. The plate under it, in the museum’s words: the oldest tape in the house, 1967, which nobody can explain. Put the headphones on to hear it.'); break;
    case 'pr_headphones': { S.tapeSeen = true; S.listening = true; save(); const lay = [...document.querySelectorAll('#hots .layer')].find(l => l.flasher); if (lay) lay.flasher.start();
      say('Mary puts the headphones on. Knocks, faint and far away, with the little lamp by the pipe flashing in time: three. Three. One. One. Three. Three. One. One. Then nothing. Somebody, once, tapping a word.'); break; }
    case 'pr_pipe2': say('The other end of the speaking pipe, with a little lamp beside it that flashes when someone knocks on the pipe upstairs.'); break;
    case 'pr_chair': say('A hard wooden chair. The listeners sat on these all night.'); break;
    case 'pr_desk': say('A desk with a scratched top, and the ring of a hundred tea mugs.'); break;
    case 'pr_window': case 'pr_window2': say('A little window up at the top of the wall, at the level of the grass outside.'); break;
    case 'pr_cabinet': say('In the cabinet: a table lamp, a plant pot and a slat from a garden bench, each with a microphone the size of a button hidden in it. The walls had ears, and so did the benches.'); break;
    case 'pr_card': S.cardSeen = true; if (!got('card')){ S.got.push('card'); } save(); render(); sfx('paper'); openNote('card'); return;
    case 'pr_box': openBox(); return;
    case 'pr_plinth': say('A wooden plinth for the box, polished by children’s hands.'); break;
    case 'pr_board': say('The board, in the museum’s words: Can you crack the code? The lamp on the terrace is sending a word. Tap it back here and the listeners’ box will open.'); break;
    case 'pr_cable': say('A coil of old black cable. Miles of it ran through this house once, inside the walls.'); break;
    case 'pr_notice': openNote('history'); return;
    /* the obelisk */
    case 'po_obelisk': S.ringSeen = true; save(); say('The obelisk, tall and grey, with a long blue shadow lying away from it across the grass. Round its base, a ring of stones with numbers painted on them, like a clock. The shadow is the hand.'); break;
    case 'po_shadow': S.ringSeen = true; save(); say('The shadow points to the right, towards the wood, and lies between the stones marked VII and VIII. Where it ends, at the wood’s edge, stands an old tree.'); break;
    case 'po_ring': S.ringSeen = true; save(); say('Twelve flat stones in a ring. Nana laid them when she was nine, one every hour on the hour, one whole summer’s day, and the museum painted the hours on them. Noon at the top.'); break;
    case 'po_woods': say('The wood, dark already under the trees.'); break;
    case 'po_tree': say('An old tree at the wood’s edge, all knuckles and roots, exactly where the obelisk’s shadow points.'); break;
    case 'po_hollow': say(S.dug ? 'The hole Mary dug, and the heap of earth beside it.' : 'A hollow among the roots, full of leaves and soft earth. Something to dig with would do it.'); break;
    case 'po_log': say('A fallen log, mossy and soft. Woodlice.'); break;
    case 'po_bracken': say('Bracken, taller than Zaina.'); break;
    case 'po_key': S.keyGot = true; S.got.push('key'); save(); render(); sfx('pickup'); say('The key, out of the earth after all these years. It goes in the strip below.'); break;
    case 'po_jedi2': say(S.keyGot ? '“Found it, did you? I was about to dig there myself.” He was not.' : '“Come to supervise. Carry on.”'); break;
    case 'po_sky': say('The sky going from gold to blue, and one bright star that Nana says is not a star.'); break;
    case 'po_post': case 'pm_post2': say('A waymark post with a blank disc. The arrow has worn off, but the path knows the way.'); break;
    case 'po_oaks2': say('Oaks, with the light coming through sideways.'); break;
    /* the moat */
    case 'pm_bridge': say('A plank bridge onto the island, with a rail. Mary keeps both hands on it. Nobody goes near the water.'); break;
    case 'pm_island': say('A little wooded island in a square moat. There was a house here once, Nana says, six hundred years ago, with a knight in it.'); break;
    case 'pm_water': say('Dark still water, with the sky in it. Not for paddling. Not for anything.'); break;
    case 'pm_wall': say('Old flint stones in the grass on the island: the last of the house that stood here.'); break;
    case 'pm_carvings': openCarvings(); return;
    case 'pm_ribbons': say('Ribbons tied in the branches, dozens of them, faded and new. People make wishes here.'); break;
    case 'pm_charms': say('Little charms on strings: a bell, a button, a key that is not Nana’s.'); break;
    case 'pm_bluebells': say('Bluebell leaves, the flowers long over.'); break;
    case 'pm_gate': if (S.gateOpen) say(S.dusk ? 'The gate stands open.' : 'The gate stands open on trees and nothing. Not dusk yet.'); else say('A little arched iron gate in the old wall, with a ring handle and a keyhole, locked. Through the bars, dark wood.'); break;
    case 'pm_house': if (!S.done){ S.done = true; save(); sfx('pickup');
      setTimeout(() => showEnd('The house in the trees', 'Trent Park, at dusk! Nana’s map had a cross by the obelisk, and a lamp in the big house was flashing a word in the listeners’ tap code: EAR. The box it opened had a note in it from a girl called N., age nine, and I dug up her key where the obelisk’s shadow points. Jedi’s watch had stopped, so I read the time off the sundial (twenty to eight) and while I was looking down the whole park turned blue. Then, through a little gate in an old wall in the wood: a house. With moths. Nana just said: go on, then. So I am going.', S.nightMoth ? 'The oldest tape in the museum tapped NANA. I think N. is Nana. ★' : 'The oldest tape in the museum is tapping something too. I have not worked out what.'), 400); }
      else say('Go on, then.'); return;
    case 'pm_wall2': say('An old garden wall, crumbling, from when the park was somebody’s garden.'); break;
    case 'pm_ivy': say('Ivy, thick as a coat.'); break;
    case 'pm_ferns': say('Ferns, uncurling.'); break;
    default: return false;
  }
}
function rows(){
  const out = [];
  if (!S.briefed) out.push([0, 'The little house, past the obelisk', 'ask Nana', false]);
  else {
    Object.entries(THREADS).forEach(([th, [label, done, steps]]) => {
      const idx = HINTS.map((h, k) => h.thread == th && !h.goal() ? k : -1).filter(k => k >= 0);
      const d = done(), p = steps.length - idx.length;
      out.push([d ? -1 : idx[0], label, d ? '✓ done' : (steps[p] || 'not started'), d]);
    });
    if (S.keyGot || S.boxOpen) out.push([HINTS.findIndex(h => !h.thread && !h.goal()), 'The gate in the old wall', S.done ? '✓ found' : S.houseSeen ? 'there it is' : S.gateOpen ? 'open, but not dusk' : 'locked', S.done]);
  }
  return out;
}
function noticed(){
  const n = [];
  if (S.briefed) n.push('Nana: the little house shows itself at dusk, to someone who is looking.');
  if (S.lampSeen) n.push('The lamp on the terrace: 1, 5. 1, 1. 4, 2.');
  if (S.cardSeen) n.push('The tap code: row, then column.');
  if (S.tapeHeard) n.push('The old tape: 3, 3. 1, 1. 3, 3. 1, 1.');
  if (S.mapSeen) n.push('The map: a cross where the obelisk’s shadow points; dig when the moths come out.');
  if (S.ringSeen) n.push('The sundial: the shadow lies between VII and VIII.');
  if (S.paperRead) n.push('N., age 9: through the little gate in the old wall, at dusk. Bring them home.');
  if (S.arrowSeen) n.push('A moth and an arrow carved on the ribbon tree, pointing on through the wood.');
  if (S.nightMoth) n.push('The oldest tape tapped NANA. ★');
  return n;
}
function sparkle(id){
  if (id === 'pw_nana') return !S.briefed;
  if (id === 'pw_jedi') return !got('watch') && !S.timeSet;
  if (id === 'pw_spade') return S.mapSeen && !S.spadeGot;
  if (id === 'pt_lamp') return !S.lampSeen;
  if (id === 'pr_card') return S.lampSeen && !S.cardSeen;
  if (id === 'pr_box') return S.cardSeen && !S.boxOpen;
  if (id === 'po_shadow') return got('watch') && !S.ringSeen;
  if (id === 'po_hollow') return got('spade') && S.mapSeen && !S.dug;
  if (id === 'po_key') return true;
  if (id === 'pm_gate') return got('key') && !S.gateOpen;
  if (id === 'pm_house') return !S.done;
  return false;
}
return {
  card:{place:'Trent Park, the next evening', text:'Nana’s map, and a whole golden evening. Nana, Jedi, Elliot and Zaina at the café on the lawn, and Nana has said: “The little house is past the obelisk, in the trees by the moat. It only shows itself at dusk, to someone who is looking. Back by dark.”'},
  meanwhile:'Meanwhile, in Trent Park, Mary is following Nana’s map towards the trees.',
  comic:[{pic:'../art/comic/park-1.jpg', lines:['Jedi parked by the gates, mostly on the grass.', 'Mary had the map. Zaina had the spade.']}, {pic:'../art/comic/park-2.jpg', lines:['“Past the obelisk, in the trees by the moat,” said Nana.', '“It only shows itself at dusk, to someone who is looking.”']}, {pic:'../art/comic/park-3.jpg', lines:['The avenue went on for ever, and the moth went first.', '“Back by dark,” called Nana. Twice.']}],
  postcard:{pic:'../art/postcards/park.jpg'},
  title:'Trent Park', blurb:'The next evening: the lawn, the big house and its listening room, the obelisk and Camlet Moat. A little gate in an old wall, at dusk.',
  track:'../art/music/park.mp3', ambient:'evening', next:null,
  intro:'<b>Trent Park, the next evening.</b> Nana’s map in the strip, the family at the café, and the little house past the obelisk, if it shows itself.',
  start:{room:'lawn', view:0},
  fresh:() => ({got:['map'], briefed:false, mapSeen:false, spadeGot:false, lampSeen:false, pipeSeen:false, listening:false, cardSeen:false, taps:[], cur:0, boxOpen:false, paperTaken:false, paperRead:false, tapeSeen:false, tapeHeard:false,
    dug:false, keyGot:false, ringSeen:false, watch:{h:3, m:10}, timeSet:false, dusk:false, jediMoved:false, carvingsSeen:false, arrowSeen:false, gateOpen:false, houseSeen:false, nightMoth:false}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, extra:EXTRA, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES, overlays,
  onNote:key => { if (key === 'paper'){ S.paperRead = true; save(); } },
  moves:'Jedi: asleep on the bench on the lawn with his stopped watch, until Mary sets it by the sundial; then standing in the avenue by the obelisk, come to supervise, the bench empty. The light: golden evening until the watch is set, then dusk over the whole park, with moths in the wood. The gate: locked until the key, then open; the little house shows in its arch only at dusk.',
  act, sparkle, rows, noticed, speaker, helper:() => 'the moth'
};
})());
