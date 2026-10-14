/* The Moth House, landscape engine: Mary's stage 4, Nana and Jedi's house in Enfield, the first evening.
   Five rooms and three parallel trails that meet at Nana's childhood tin in the attic; see STORY.md and next/PLAYBOOK.md
   (4c for the trails, 4t for the opening, the real layout, the moving people). Registered with the engine in index.html. */
'use strict';
registerStage('nana', (function(){
const A = '../art/nana/', F = '../art/flat/';
/* the house: a semi in Enfield. Hall (front door north, the stairs rising on the east wall, the kitchen through the south end, the hall table west);
   living room off the hall; kitchen at the back; the landing upstairs with the attic hatch; the attic. Turning order is clockwise from north. */
const ROOMS = {
  hall:{name:'The hall', into:'the hall', views:['h1','h2','h3','h4']},
  living:{name:'Living room', into:'the living room', views:['l1','l2','l3','l4']},
  kitchen:{name:'Kitchen', into:'the kitchen', views:['k1','k2','k3','k4']},
  landing:{name:'The landing', into:'the landing', views:['d1','d2','d3','d4']},
  attic:{name:'The attic', into:'the attic', views:['a1','a2','a3','a4']}
};
const WALLS = Object.fromEntries(['h1','h2','h3','h4','l1','l2','l3','l4','k1','k2','k3','k4','d1','d2','d3','d4','a1','a2','a3','a4'].map(k => [k, A + k + '.jpg']));
/* doors: the living room and kitchen open off the back of the hall; the stairs go up from the hall's east wall; the hatch, once open, leads up; the ladder leads down */
const DOORS = {nh_living:['living', 0], nh_kitchen:['kitchen', 0], nh_stairs:['landing', 0], nl_door:['hall', 0], nk_door:['hall', 0], nk_door2:['hall', 0], nd_stairs:['hall', 3], nd_hatch:['attic', 0], na_hatchdown:['landing', 1]};
const got = k => S.got.includes(k);
const CODE = [1, 9, 6, 7];           /* Nana was nine in 1967: baby Nana's photo says 1958 */
const HOTS = {
  /* the hall (measured on each wall's 5% grid) */
  h1:[
    {id:'nh_door', l:40, t:20, w:21, h:70, label:'Front door', sound:'knock'},
    {id:'nh_hooks', l:65, t:30, w:20, h:46, label:'Coat hooks', sound:'leaf'},
    {id:'nh_stand', l:8, t:62, w:9, h:30, label:'Umbrella stand', sound:'knock'}],
  h2:[
    {id:'nh_photos', l:24, t:18, w:52, h:40, label:'The photographs going up the stairs', sound:'tap', key:true},
    {id:'nh_stairs', l:50, t:44, w:28, h:44, label:'The stairs up', sound:'knock'},
    {id:'nh_sgwindow', l:43, t:9, w:9, h:14, label:'Stained-glass window', sound:'tap'}],
  h3:[
    {id:'nh_kitchen', l:42, t:26, w:15, h:56, label:'Through to the kitchen', sound:'knock'},
    {id:'nh_living', l:26, t:22, w:12, h:66, label:'The living-room doorway', sound:'knock'},
    {id:'nh_dog', l:35, t:33, w:8, h:11, label:'China dog', sound:'tap'},
    {id:'nh_radiator', l:34, t:62, w:9, h:20, label:'Radiator', sound:'knock'}],
  h4:[
    {id:'nh_phone', l:13, t:58, w:12, h:13, label:'The telephone', sound:'tick'},
    {id:'nh_bag', l:28, t:58, w:9, h:13, label:'Nana’s handbag', sound:'leaf'},
    {id:'nh_mirror', l:19, t:26, w:14, h:24, label:'Round mirror', sound:'tap'},
    {id:'nh_cupboard', l:40, t:46, w:13, h:46, label:'Cupboard under the stairs', sound:'knock'},
    {id:'nh_plant', l:81, t:44, w:10, h:46, label:'Tall plant', sound:'leaf'}],
  /* the living room */
  l1:[
    {id:'nl_jedi', l:36, t:46, w:24, h:46, label:'Jedi, resting his eyes', sound:'leaf', key:true, anim:'sniff', layer:'jedi', hideWhen:() => S.jediMoved},
    {id:'nl_chair', l:30, t:50, w:26, h:44, label:'Jedi’s armchair', sound:'leaf'},
    {id:'nl_pole', l:84, t:62, w:9, h:32, label:'A long pole with a hook', sound:'knock', key:true, anim:'wobble', layer:'pole', hideWhen:() => S.poleGot},
    {id:'nl_lamp', l:46, t:22, w:11, h:33, label:'Standard lamp', sound:'tick'},
    {id:'nl_tv', l:60, t:54, w:17, h:38, label:'Television', sound:'tap'},
    {id:'nl_table', l:27, t:76, w:12, h:19, label:'Side table: newspaper and glasses', sound:'paper'},
    {id:'nl_swindow', l:13, t:17, w:28, h:42, label:'Window to the street', sound:'tap'}],
  l2:[
    {id:'nl_fire', l:36, t:50, w:30, h:44, label:'Fireplace', sound:'knock'},
    {id:'nl_clock', l:47, t:40, w:7, h:10, label:'Mantel clock', sound:'tick'},
    {id:'nl_wedding', l:59, t:41, w:6, h:10, label:'Wedding photograph', sound:'tap'},
    {id:'nl_painting', l:42, t:15, w:18, h:23, label:'Painting of a park', sound:'tap'},
    {id:'nl_window', l:5, t:12, w:14, h:32, label:'Bay window', sound:'tap'}],
  l3:[
    {id:'nl_sofa', l:28, t:54, w:46, h:40, label:'Sofa', sound:'leaf'},
    {id:'nl_books', l:73, t:22, w:18, h:68, label:'Bookcase', sound:'paper'},
    {id:'nl_tray', l:36, t:76, w:24, h:16, label:'Tea tray', sound:'tick'},
    {id:'nl_radio', l:74, t:20, w:12, h:13, label:'Wireless', sound:'tick'}],
  l4:[
    {id:'nl_door', l:40, t:20, w:19, h:74, label:'Back to the hall', sound:'knock'},
    {id:'nl_gclock', l:16, t:18, w:14, h:76, label:'Grandfather clock', sound:'tick'},
    {id:'nl_coatstand', l:70, t:24, w:13, h:70, label:'Coat stand', sound:'leaf'}],
  /* the kitchen */
  k1:[
    {id:'nk_nana', l:16.0, t:31.0, w:27.1, h:68.2, label:'Nana', sound:'leaf', key:true, anim:'sniff', layer:'nana'},
    {id:'nk_counter', l:7, t:62, w:62, h:32, label:'Kitchen counter', sound:'knock'},
    {id:'nk_kettle', l:13, t:45, w:10, h:16, label:'Kettle', sound:'tick'},
    {id:'nk_teapot', l:23, t:49, w:10, h:12, label:'Teapot in its cosy', sound:'tap'},
    {id:'nk_window', l:36, t:17, w:30, h:40, label:'Window over the counter', sound:'tap'},
    {id:'nk_cupboard', l:12, t:12, w:20, h:28, label:'Glass cupboard', sound:'knock'}],
  k2:[
    {id:'nk_tin', l:39, t:17, w:9, h:11, label:'Biscuit tin, high on the dresser', sound:'tap', key:true},
    {id:'nk_dresser', l:24, t:26, w:26, h:48, label:'Dresser', sound:'knock'},
    {id:'nk_table', l:18, t:62, w:30, h:24, label:'Kitchen table', sound:'knock'},
    {id:'nk_jedi2', l:40, t:48, w:12, h:20, label:'Jedi, at the table', sound:'leaf', anim:'sniff', layer:'jedi2', hideWhen:() => !S.jediMoved},
    {id:'nk_fruit', l:29, t:58, w:8, h:9, label:'Fruit bowl', sound:'tap'},
    {id:'nk_door2', l:52, t:25, w:16, h:60, label:'Doorway to the hall', sound:'knock'},
    {id:'nk_calendar', l:71, t:32, w:9, h:19, label:'Calendar', sound:'paper'}],
  k3:[
    {id:'nk_backdoor', l:44, t:20, w:18, h:74, label:'Back door, open to the garden', sound:'knock'},
    {id:'nk_geranium', l:31, t:42, w:8, h:18, label:'Geranium', sound:'leaf'},
    {id:'nk_catflap', l:45, t:71, w:7, h:10, label:'Cat flap', sound:'tick'},
    {id:'nk_washing', l:53, t:30, w:8, h:22, label:'Washing line outside', sound:'leaf'}],
  k4:[
    {id:'nk_door', l:38, t:20, w:20, h:74, label:'Back to the hall', sound:'knock'},
    {id:'nk_fridge', l:14, t:32, w:16, h:62, label:'Fridge', sound:'knock'},
    {id:'nk_larder', l:66, t:14, w:20, h:76, label:'Larder cupboard', sound:'knock'},
    {id:'nk_shelf', l:16, t:14, w:16, h:16, label:'Shelf with the best teapot', sound:'tap'}],
  /* the landing */
  d1:[
    {id:'nd_hatch', l:40, t:1, w:20, h:14, label:'Attic hatch', sound:'knock', key:true},
    {id:'nd_cord', l:47, t:13, w:7, h:13, label:'The hatch cord, out of reach', sound:'tick'},
    {id:'nd_vase', l:45, t:48, w:12, h:36, label:'Dried flowers on the little table', sound:'leaf'},
    {id:'nd_window', l:82, t:30, w:9, h:30, label:'Landing window', sound:'tap'}],
  d2:[
    {id:'nd_spare', l:16, t:20, w:28, h:72, label:'The spare room, and your suitcase', sound:'knock', key:true},
    {id:'nd_chair', l:50, t:58, w:12, h:36, label:'Chair with a towel', sound:'leaf'}],
  d3:[
    {id:'nd_bathroom', l:12, t:26, w:16, h:68, label:'Bathroom door', sound:'knock'},
    {id:'nd_airing', l:32, t:26, w:14, h:68, label:'Airing cupboard', sound:'knock'},
    {id:'nd_picture', l:52, t:32, w:14, h:18, label:'Seaside picture', sound:'tap'},
    {id:'nd_basket', l:58, t:64, w:10, h:26, label:'Laundry basket', sound:'leaf'}],
  d4:[
    {id:'nd_stairs', l:34, t:42, w:32, h:52, label:'The stairs down', sound:'knock'},
    {id:'nd_bookcase', l:12, t:24, w:18, h:70, label:'Bookcase', sound:'paper'}],
  /* the attic: pitch dark until the torch is on, then everything shows */
  a1:[
    {id:'na_dark', l:8, t:6, w:84, h:84, label:'The dark', sound:'leaf', hideWhen:() => S.lit},
    {id:'na_tin', l:33, t:41, w:15, h:22, label:'An old tin on the shelf', sound:'tick', key:true},
    {id:'na_boxes', l:5, t:60, w:23, h:34, label:'Boxes', sound:'knock'},
    {id:'na_teddy', l:72, t:58, w:20, h:26, label:'A teddy in a box', sound:'leaf'}],
  a2:[
    {id:'na_dark2', l:8, t:6, w:84, h:84, label:'The dark', sound:'leaf', hideWhen:() => S.lit},
    {id:'na_trunk', l:14, t:68, w:26, h:27, label:'Steamer trunk', sound:'knock'},
    {id:'na_dollshouse', l:42, t:56, w:18, h:36, label:'Doll’s house', sound:'tap'},
    {id:'na_rug', l:64, t:44, w:8, h:48, label:'A rolled rug', sound:'leaf'},
    {id:'na_lampbase', l:74, t:28, w:10, h:62, label:'A lamp with no shade', sound:'tick'}],
  a3:[
    {id:'na_dark3', l:8, t:6, w:84, h:84, label:'The dark', sound:'leaf', hideWhen:() => S.lit},
    {id:'na_window', l:42, t:20, w:15, h:24, label:'Round window', sound:'tap'},
    {id:'na_horse', l:28, t:60, w:20, h:32, label:'Rocking horse', sound:'leaf'},
    {id:'na_cases', l:52, t:62, w:24, h:30, label:'Old suitcases', sound:'knock'}],
  a4:[
    {id:'na_dark4', l:8, t:6, w:84, h:50, label:'The dark', sound:'leaf', hideWhen:() => S.lit},
    {id:'na_hatchdown', l:36, t:60, w:28, h:36, label:'The ladder down', sound:'knock'},
    {id:'na_tank', l:11, t:34, w:20, h:56, label:'Water tank', sound:'knock'},
    {id:'na_dummy', l:68, t:36, w:12, h:56, label:'Dressmaker’s dummy', sound:'leaf'}]
};
const LAYERS = {
  l1:[{src:A+'layer-jedi.png', group:'jedi', l:36.23, t:48.05, w:23.84, h:48.11, hideWhen:() => S.jediMoved},
      {src:A+'layer-pole.png', group:'pole', l:86.08, t:41.67, w:5.01, h:53.52, hideWhen:() => S.poleGot}],
  k1:[{src:A+'layer-nana.png', group:'nana', l:16.97, t:31.97, w:25.11, h:67.19}],
  k2:[{src:A+'layer-jedi2.png', group:'jedi2', l:36.95, t:47.79, w:19.11, h:43.16, showWhen:() => S.jediMoved}],
  d1:[{src:A+'layer-hatchopen.png', group:'hatchopen', l:40.19, t:2.8, w:25.91, h:77.34, showWhen:() => S.hatchOpen}]
};
const EXTRA = {hall:[A+'closeup-photos.jpg'], landing:[A+'closeup-suitcase.jpg'], attic:[A+'closeup-tin.jpg', A+'closeup-map.jpg']};

/* ---------- things the game draws ---------- */
const FONT = 'Atkinson Hyperlegible,Verdana,sans-serif';
/* the five plates under the photographs, in picture percentages of the close-up (measured on its grid) */
const PLATES = [[['Baby Nana', '1958'], 9.7, 84], [['Nana and Tom', 'the park'], 31, 76], [['Wedding day', '1984'], 52, 69], [['Mum at school', '1991'], 73, 60], [['Elliot walks', '2020'], 92.5, 52]];
const platesSVG = size => `<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">${PLATES.map(([t, x, y]) => `<text x="${x*16}" y="${y*9}" text-anchor="middle" font-size="${size}" font-family="${FONT}" font-weight="700" fill="#3a2a14"><tspan x="${x*16}" dy="0">${t[0]}</tspan><tspan x="${x*16}" dy="${size*1.1}">${t[1]}</tspan></text>`).join('')}</svg>`;
/* the dark attic before the torch: a near-black veil with the faintest shapes, so a tap shows something and nothing can be read */
const darkVeil = () => () => { const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:0;top:0;width:100%;height:100%'; if (!S.lit) wrap.innerHTML = '<div class="veil"></div>'; return wrap; };
/* Nana's secret alphabet (the Night Moth): a pigpen key drawn inside the tin's lid, and four symbols on the back of the map that spell DUSK */
const PIG = {
  /* each letter: the lines of its cell in a 3×3 grid (t, r, b, l), or an X-grid wedge (up, right, down, left), and whether it carries a dot */
  grid:['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR'], x:['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};
function pigSymbol(ch, size){ /* an SVG group for one letter at a given size */
  const s = size, h = s/2, dot = `<circle cx="${h}" cy="${h}" r="${s*.08}" fill="#4a3b2a"/>`, L = `stroke="#4a3b2a" stroke-width="${s*.09}" stroke-linecap="round" fill="none"`;
  const gi = PIG.grid.findIndex(r => r.includes(ch));
  if (gi >= 0){ const row = gi % 3, col = PIG.grid[gi].indexOf(ch), d = gi >= 3; let p = '';
    if (row > 0) p += `M0 0H${s}`; if (row < 2) p += `M0 ${s}H${s}`; if (col > 0) p += `M0 0V${s}`; if (col < 2) p += `M${s} 0V${s}`;
    return `<path d="${p}" ${L}/>${d ? dot : ''}`; }
  const xi = PIG.x.indexOf(ch), wedge = xi % 4, d = xi >= 4; const pts = [[`0 0`, `${h} ${h}`, `${s} 0`], [`${s} 0`, `${h} ${h}`, `${s} ${s}`], [`0 ${s}`, `${h} ${h}`, `${s} ${s}`], [`0 0`, `${h} ${h}`, `0 ${s}`]][wedge];
  return `<polyline points="${pts.join(' ')}" ${L}/>${d ? dot : ''}`;
}
const SECRET = 'DUSK';
const CIPHER_OPTS = [['B', 'D', 'E', 'H'], ['S', 'T', 'U', 'V'], ['S', 'T', 'U', 'V'], ['J', 'K', 'L', 'N']];
function keySVG(){ /* the whole alphabet laid out as a key, for the inside of the lid */
  const cells = []; let x = 0;
  const grid = (letters, dotted, ox) => { letters.forEach((row, r) => [...row].forEach((ch, c) => { cells.push(`<g transform="translate(${ox + c*34} ${r*34})">${pigSymbol(ch, 30)}<text x="15" y="21" text-anchor="middle" font-size="13" font-family="${FONT}" fill="#8a5a1a">${ch}</text></g>`); })); };
  grid(PIG.grid.slice(0, 3), false, 0); grid(PIG.grid.slice(3), true, 120);
  const xs = (letters, ox) => letters.forEach((ch, i) => { cells.push(`<g transform="translate(${ox + i*34} 0)">${pigSymbol(ch, 30)}<text x="15" y="${i === 0 ? 27 : i === 2 ? 9 : 21}" text-anchor="middle" font-size="13" font-family="${FONT}" fill="#8a5a1a">${ch}</text></g>`); });
  xs(PIG.x.slice(0, 4), 240); xs(PIG.x.slice(4), 240 + 0);
  return `<svg viewBox="-6 -6 390 110" style="position:absolute;left:25%;top:2%;width:30%;height:auto;opacity:.75" aria-hidden="true"><g transform="translate(0 0)">${cells.slice(0, 18).join('')}</g><g transform="translate(0 0)">${cells.slice(18, 22).join('')}</g><g transform="translate(0 40)">${cells.slice(22).join('')}</g></svg>`;
}

/* ---------- notes and items ---------- */
const NOTES = {};
const ITEMS = {
  present:{name:'Nana’s present', icon:`<img src="${F}layer-present.png" alt="">`},
  torch:{name:'torch', icon:`<img src="${F}layer-torch.png" alt="">`},
  biscuit:{name:'biscuit', icon:`<img src="${A}item-biscuit.png" alt="">`},
  pole:{name:'hook pole', icon:`<img src="${A}item-pole.png" alt="">`},
  map:{name:'Nana’s map', icon:`<img src="${A}item-map.png" alt="">`, open:() => openMap()} /* opens from the strip; 'Carry it to Nana' on the map puts it in hand */
};
const HINTS = [
  {goal:() => S.hatchSeen, tips:['Nana said there is something of hers in the attic, from when she was nine.', 'The attic is above the landing, up the stairs.', 'Go up the stairs and look at the hatch in the landing ceiling.']},
  /* trail 1: the way up */
  {thread:1, goal:() => S.jediAsked || S.poleGot, tips:['The hatch cord is too high to reach. Something long with a hook would do it.', 'Jedi has a pole with a hook, leaning by the telly in the living room. He bargains with biscuits.', 'Tap Jedi in the living room and see what he wants for the pole.']},
  {thread:1, goal:() => got('biscuit') || S.biscuitGiven, tips:['Jedi wants a biscuit. The tin is on top of the dresser in the kitchen, and Nana says not before tea.', 'Nana might make an exception if you brought her something. Your suitcase is upstairs in the spare room.', 'Take Nana’s present out of your suitcase and give it to her in the kitchen.']},
  {thread:1, goal:() => S.poleGot, tips:['A biscuit, for Jedi.', 'Tap the biscuit in the strip, then Jedi in his armchair.', 'Give Jedi the biscuit; the pole is yours.']},
  {thread:1, goal:() => S.hatchOpen, tips:['The hook on the pole reaches the hatch cord.', 'Go up to the landing with the pole.', 'Tap the pole in the strip, then the hatch in the landing ceiling.']},
  /* trail 2: the code */
  {thread:2, goal:() => S.photosSeen, tips:['A tin hidden by a nine-year-old has a code a nine-year-old would choose.', 'The photographs going up the stairs have dates on their plates.', 'Tap the photographs on the stair wall and read every plate.']},
  {thread:2, goal:() => S.tinSeen, tips:['The tin is in the attic.', 'Once you are up and can see, look on the shelf.', 'Tap the old tin on the shelf in the attic.']},
  {thread:2, goal:() => S.tinOpen, tips:['Nana was nine when she hid the tin. Which year was she nine?', 'Baby Nana was born in 1958, says the first photo. Nine years later is the year.', 'Set the tin’s dials to 1, 9, 6, 7 and tap Open.']},
  /* trail 3: light */
  {thread:3, goal:() => got('torch') || S.lit, tips:['The attic will be dark. Nana said to bring the little torch.', 'The torch is in your suitcase, in the spare room upstairs.', 'Tap the spare room door on the landing, then take the torch from the suitcase.']},
  {thread:3, goal:() => S.lit, tips:['Pitch dark up here.', 'You have a torch.', 'Tap the torch in the strip, then tap the dark.']},
  /* convergence */
  {goal:() => got('map') || S.done, tips:['The tin is open. Nana’s map is inside.', 'Tap the map to take it.', 'Take the folded map from the tin.']},
  {goal:() => S.done, tips:['Nana said: show me.', 'Nana is in the kitchen.', 'Tap the map in the strip, then Nana.']}
];
const THREADS = {1:['Get up into the attic', () => S.hatchOpen, ['', 'Jedi wants a biscuit', 'biscuit found', 'pole found']],
  2:['Open Nana’s tin', () => S.tinOpen, ['', 'photos read', 'tin found']],
  3:['A light in the attic', () => S.lit, ['', 'torch found']]};
const speaker = () => 'The moth says';

/* ---------- close-ups ---------- */
function openPhotos(){
  S.photosSeen = true; save();
  openPic(A+'closeup-photos.jpg', '16/9', 'The photographs on the stairs', platesSVG(19), 64);
  say('Five photographs, five little brass plates: Baby Nana, 1958. Nana and Tom. Wedding day, 1984. Mum at school, 1991. Elliot walks, 2020.');
}
function openCase(){
  S.caseOpen = true; save();
  const btn = (id, l, t, w, h, label) => got(id) || S[id + 'Taken'] ? '' : `<button class="book" data-id="${id}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%" aria-label="${label}"><span></span></button>`;
  openPic(A+'closeup-suitcase.jpg', '16/9', 'Your suitcase', btn('torch', 54, 48, 11, 16, 'The torch') + btn('present', 35, 55, 17, 28, 'Nana’s present'), 60);
  $('picwrap').querySelectorAll('.book').forEach(b => b.onclick = e => { e.stopPropagation(); const id = b.dataset.id; S[id + 'Taken'] = true; S.got.push(id); save(); sfx('pickup'); b.remove(); render();
    say(id === 'torch' ? 'The little torch. Nana said you’d need it. It goes in the strip below.' : 'Nana’s present, the jar of kaya wrapped in moths. It goes in the strip below.'); });
  const left = ['torch', 'present'].filter(k => !got(k) && !S[k + 'Taken']);
  say(left.length ? 'Your suitcase, unzipped on the bed: your jumper, your things, ' + (left.length === 2 ? 'the torch and Nana’s present.' : left[0] === 'torch' ? 'and the torch.' : 'and Nana’s present.') : 'Your suitcase. Just clothes now.');
}
/* the tin's lock: four dials, checked only when Open is tapped */
function openTin(){
  if (!S.lit){ say('Something square on the shelf. Too dark to see more.'); return; }
  S.tinSeen = true; save();
  if (S.tinOpen){ openTinInside(); return; }
  openCloseup(`<div class="card locker"><p class="otitle">Nana’s tin. Four numbers.</p><p class="scratch">Scratched on the lid: AGE 9. KEEP OUT. THIS MEANS YOU, TOM.</p><div class="dials" id="dials"></div><p class="ofb" id="lockFb">Tap a dial to turn it.</p><div class="row"><button class="ob" id="openTin">Open</button></div></div>`);
  $('dials').innerHTML = S.dials.map((d, i) => `<button class="dial" data-i="${i}" aria-label="Dial ${i+1}, showing ${d}">${d}</button>`).join('');
  $('dials').querySelectorAll('.dial').forEach(b => b.onclick = () => { const i = +b.dataset.i; S.dials[i] = (S.dials[i] + 1) % 10; b.textContent = S.dials[i]; b.setAttribute('aria-label', `Dial ${i+1}, showing ${S.dials[i]}`); sfx('tick'); save(); });
  $('openTin').onclick = () => { sfx('tap');
    if (S.dials.join() === CODE.join()){ S.tinOpen = true; save(); sfx('pickup'); $('lockFb').textContent = 'Click. The clasp springs up.'; setTimeout(() => { closeCloseup(); openTinInside(); }, 800); }
    else $('lockFb').textContent = 'The clasp does not budge. Nana was nine: which year was that?'; };
  say('An old green tin with a little number lock, and words scratched on the lid by a nine-year-old: AGE 9. KEEP OUT. THIS MEANS YOU, TOM.');
}
/* inside the tin: the map on top of Nana's treasures, and the secret alphabet inside the lid */
function openTinInside(){
  const mapBtn = got('map') || S.mapTaken ? '' : `<button class="book" id="takeMap" style="left:34%;top:24%;width:30%;height:38%" aria-label="The folded map"><span></span></button>`;
  openPic(A+'closeup-tin.jpg', '16/9', 'Nana’s tin, open', keySVG() + mapBtn + `<button class="book" id="lidKey" style="left:22%;top:0;width:36%;height:26%" aria-label="Letters and shapes inside the lid"><span></span></button>`, 62);
  $('lidKey').onclick = e => { e.stopPropagation(); S.keySeen = true; save(); sfx('paper'); say('Inside the lid, in pencil: every letter of the alphabet with a little shape beside it. A nine-year-old’s secret code.'); };
  if (mapBtn) $('takeMap').onclick = e => { e.stopPropagation(); S.mapTaken = true; S.got.push('map'); save(); sfx('pickup'); closeCloseup(); render(); say('A folded map, soft as cloth. Nana drew it when she was nine. It goes in the strip below: tap it there to open it.'); };
  say(got('map') || S.mapTaken ? 'Marbles, a badge, a pressed flower, a conker. And the shapes inside the lid.' : 'Marbles, a badge, a pressed flower, a conker… and a folded map on top. Tap it.');
}
/* the map, opened from the strip: Nana's Trent Park, and on its back four symbols in her secret alphabet */
function openMap(){
  const labels = [['TRENT PARK', 20, 11, 44], ['the lake', 28, 88.6, 22], ['Camlet Moat', 69, 93.2, 22], ['the obelisk', 50, 61.6, 20], ['the big house', 52, 23.8, 20], ['Moth House?', 81, 38.4, 20]];
  const svg = `<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">${labels.map(([t, x, y, s]) => `<text x="${x*16}" y="${y*9}" text-anchor="middle" font-size="${s}" font-family="Caprasimo,Georgia,serif" fill="#4a5a8a" transform="rotate(-1 ${x*16} ${y*9})">${t}</text>`).join('')}</svg>`;
  openPic(A+'closeup-map.jpg', '16/9', '', svg + `<button class="book gap" id="mapBack" style="left:76%;top:82%;width:20%;height:12%" aria-label="Turn the map over"><span>turn it over</span></button>` + (S.done ? '' : `<button class="book gap" id="holdMap" style="left:38%;top:84%;width:22%;height:12%" aria-label="Carry the map to Nana"><span>carry it to Nana</span></button>`), 64);
  $('mapBack').onclick = e => { e.stopPropagation(); openCipher(); };
  if ($('holdMap')) $('holdMap').onclick = e => { e.stopPropagation(); closeCloseup(); S.held = 'map'; render(); say('Holding Nana’s map. Tap Nana, in the kitchen.'); };
  say('Trent Park, in pencil and crayon: the lake, the obelisk, the moat, the big house. And in the trees, a little house with a moth over it, and a dotted line to it. There is no house there on any real map.');
}
function openCipher(){
  const rows = [...SECRET].map((ch, i) => { const pick = S.cipher[i];
    return `<div class="cph"><svg viewBox="-4 -4 38 38" width="100%" height="auto" aria-hidden="true">${pigSymbol(ch, 30)}</svg><div class="opts">${CIPHER_OPTS[i].map(o => `<button class="ob quiet${pick === o ? ' on' : ''}" data-i="${i}" data-o="${o}">${o}</button>`).join('')}</div></div>`; }).join('');
  openCloseup(`<div class="card xw"><p class="otitle">The back of the map: four shapes, in Nana’s secret alphabet.</p><p class="nbsmall">${S.keySeen ? 'The key is inside the tin’s lid.' : 'Somewhere there must be a key to it.'}</p><div class="cphrow" id="cph">${rows}</div><p class="ofb" id="cphFb"></p></div>`);
  $('cph').querySelectorAll('button').forEach(b => b.onclick = () => { S.cipher[+b.dataset.i] = b.dataset.o; save(); sfx('tick'); openCipher(); });
  const word = S.cipher.map(c => c || '·').join('');
  if (word === SECRET){ if (!S.nightMoth){ S.nightMoth = true; save(); sfx('pickup'); } $('cphFb').textContent = '★ D, U, S, K. Dusk! When the moths come out.'; }
  else $('cphFb').textContent = `So far: ${word}`;
}

function readTorch(){ S.lit = true; save(); render(); sfx('tick'); say('Click. The torch beam swings round: rafters, boxes, cobwebs, a rocking horse… and a shelf with an old green tin on it.'); }
const USES = {
  'present>nk_nana':() => { drop('present'); S.presentGiven = true; S.got.push('biscuit'); save(); render(); sfx('pickup'); say('“Kaya! Oh, Mary. All the way from home.” Nana reaches the tin down. “Two biscuits: one for you, and one for your grandfather, who will tell you he was about to get it himself.” A biscuit goes in the strip below.'); },
  'biscuit>nl_jedi':() => { drop('biscuit'); S.biscuitGiven = true; S.poleGot = true; S.got.push('pole'); save(); render(); sfx('pickup'); say('“Lovely. Was just about to get one myself.” He hands over the pole without opening his eyes. “Tell your Nana I helped.” The pole goes in the strip below.'); setTimeout(() => { S.jediMoved = true; save(); render(); }, 2500); },
  'biscuit>nk_nana':() => { sfx('knock'); say('“That one’s for your grandfather. I know you.”'); },
  'present>nl_jedi':() => { sfx('knock'); say('“For me?” One eye opens. “It says Nana on it. Try the kitchen.”'); },
  'pole>nd_hatch':() => openHatch(), 'pole>nd_cord':() => openHatch(),
  'pole>nl_jedi':() => { sfx('knock'); say('“Not me, the hatch. Upstairs.”'); },
  'torch>na_dark':readTorch, 'torch>na_dark2':readTorch, 'torch>na_dark3':readTorch, 'torch>na_dark4':readTorch,
  'torch>na_tin':readTorch, 'torch>na_trunk':readTorch, 'torch>na_window':readTorch,
  'torch>nh_cupboard':() => { sfx('tap'); say('The torch finds a hoover, a box of Christmas lights and a spider. Nothing of Nana’s.'); },
  'map>nk_nana':() => { if (S.done) return; S.done = true; save(); sfx('pickup'); say('Nana unfolds it, and for a moment she is nine years old. “My map.” She looks at the little house in the trees, and at Mary. “Well,” she says. “Go on, then.”');
    setTimeout(() => showEnd('Well, go on then', 'Enfield at last! Nana sent me up to the attic for a tin she hid when she was nine. Jedi charged me a biscuit for the loft pole, the attic was pitch dark (the torch, Nana was right), and the code was the year she was nine: 1967, from the photos on the stairs. Inside was a map she drew of Trent Park, with a little house in the trees that is not on any real map. I showed her. She just smiled and said: well, go on then.', S.nightMoth ? 'The back of the map was in Nana’s secret alphabet. It said DUSK. ★' : 'There is writing in a secret alphabet on the back of the map. I have not cracked it yet.'), 2200); },
  'map>nl_jedi':() => { sfx('tap'); say('“A map? Of where I put my glasses, I hope.”'); },
  'map>nk_jedi2':() => { sfx('tap'); say('“A map? Of where I put my glasses, I hope.”'); }
};
function openHatch(){ if (S.hatchOpen) return; S.hatchOpen = true; drop('pole'); save(); render(); sfx('knock'); animate({anim:'drop', layer:'hatchopen'}); say('The hook catches the cord. The hatch swings down, and a ladder slides out with a clatter. “Mind that ladder!” calls Nana from the kitchen.'); }

function act(id){
  if (S.room === 'attic' && !S.lit && !/^na_dark|^na_hatchdown/.test(id)){ say('Shapes in the dark. Nothing you can make out without a light.'); return; }
  switch(id){
    /* the hall */
    case 'nh_door': say('The front door, with its leaves of coloured glass. Nobody goes out: it is nearly bedtime, Singapore time.'); break;
    case 'nh_hooks': say('Jedi’s cap and raincoat. Nana’s coat is on her: she never takes it off till the kettle has boiled.'); break;
    case 'nh_stand': say('An umbrella and a walking stick. Jedi says the stick is for pointing at things.'); break;
    case 'nh_photos': openPhotos(); return;
    case 'nh_sgwindow': say('A little window of coloured glass on the half-landing, going pink with the evening.'); break;
    case 'nh_dog': say('A china dog. Jedi calls him the Colonel.'); break;
    case 'nh_radiator': say('The radiator, off. It is summer, even in Enfield.'); break;
    case 'nh_phone': say('The telephone, cream, with a curly cord. It rings about once a week, says Jedi.'); break;
    case 'nh_bag': say('Nana’s handbag. Mary would never.'); break;
    case 'nh_mirror': say('A round mirror. Mary, with aeroplane hair.'); break;
    case 'nh_cupboard': say('The cupboard under the stairs. The hoover lives here, and it is dark.'); break;
    case 'nh_plant': say('A plant as tall as Zaina. Nana talks to it.'); break;
    /* the living room */
    case 'nl_jedi': S.jediAsked = true; save();
      if (S.poleGot) say('“Resting my eyes.”');
      else say('“Resting my eyes, Mary. The pole? Fetch us a biscuit first. Your Nana keeps them on top of the dresser, out of my reach, which is not an accident.”'); break;
    case 'nl_chair': say(S.jediMoved ? 'Jedi’s armchair, still warm. He has gone to the kitchen with his biscuit.' : 'Jedi’s armchair, with Jedi in it.'); break;
    case 'nl_pole': say('A long pole with a brass hook, leaning against the wall by the telly. For the attic hatch. “Mine,” says Jedi, with his eyes shut.'); break;
    case 'nl_lamp': say('The standard lamp, with its fringed shade. Jedi reads under it, when he is not resting his eyes.'); break;
    case 'nl_tv': say('The television, in a wooden cupboard of its own. Off.'); break;
    case 'nl_table': say('The newspaper, folded to the crossword, and Jedi’s reading glasses. Two clues done.'); break;
    case 'nl_fire': say('The fireplace, swept and empty. No fires in summer.'); break;
    case 'nl_clock': say('The mantel clock says ten past seven. Still light outside: Enfield evenings go on for ever.'); break;
    case 'nl_wedding': say('Nana and Jedi on their wedding day, 1984. Jedi had hair.'); break;
    case 'nl_painting': say('A painting of a park with a lake and big trees. “Trent Park,” says Nana. “We will walk there tomorrow.”'); break;
    case 'nl_window': say('The bay window, net curtains, the street going gold.'); break;
    case 'nl_sofa': say('The sofa, where Elliot and Zaina fell asleep ten minutes after arriving.'); break;
    case 'nl_books': say('Nana’s books, hundreds of them. Mary could live here.'); break;
    case 'nl_tray': say('The tea tray, waiting for the tea.'); break;
    case 'nl_radio': say('The wireless. Jedi calls it the wireless.'); break;
    case 'nl_gclock': say('The grandfather clock, tick, tock, slow as Jedi.'); break;
    case 'nl_coatstand': say('A coat stand with nothing on it. It is summer.'); break;
    /* the kitchen */
    case 'nk_nana':
      if (S.done) say('“Go on, then.”');
      else if (got('map') || S.mapTaken) say('“Found it, did you? Show me.”');
      else if (S.hatchOpen) say('“Mind that ladder. And take the torch, it is black as a hat up there.”');
      else if (S.presentGiven) say('“Did he give you the pole? He will say he was going to fetch it himself.”');
      else if (S.jediAsked) say('“Biscuits are for after tea, love. Unless… did you bring me anything, all the way from Singapore?”');
      else say('“Tea in a minute, love. There is something of mine up in the attic for you, from when I was nine. If you can get up there. Jedi has the pole, and he is resting his eyes on it.”');
      break;
    case 'nk_kettle': say('The kettle, just boiled. Tea in a minute.'); break;
    case 'nk_teapot': say('A brown teapot in a knitted cosy. The cosy has a bobble.'); break;
    case 'nk_window': say('The garden, gold and green, and a blackbird on the lawn.'); break;
    case 'nk_cupboard': say('Plates and cups behind glass. The good ones.'); break;
    case 'nk_tin': say(S.presentGiven ? 'The biscuit tin, back on its high shelf.' : 'A red biscuit tin, on the very top shelf of the dresser. Out of reach of children and grandfathers. “After tea,” says Nana, without turning round.'); break;
    case 'nk_dresser': say('The dresser: blue and white plates, and the biscuit tin on top.'); break;
    case 'nk_table': say(S.jediMoved ? 'The kitchen table. Jedi has his biscuit.' : 'The kitchen table, laid for tea.'); break;
    case 'nk_jedi2': say('“Best biscuit I ever fetched.” He is resting his eyes again.'); break;
    case 'nk_calendar': say('A calendar with a lighthouse. Today has a circle round it: THEY ARRIVE.'); break;
    case 'nk_fruit': say('Apples, from the tree in the garden.'); break;
    case 'nk_backdoor': say('The back door, open on the garden. Nana says the park is at the end of the road, and the woods are at the end of the park.'); break;
    case 'nk_geranium': say('A red geranium, in the last of the sun.'); break;
    case 'nk_catflap': say('A cat flap. “The cat,” says Nana, “left years ago. The flap stayed.”'); break;
    case 'nk_washing': say('Washing on the line, drying in the evening air.'); break;
    case 'nk_fridge': say('The fridge, with a few magnets holding nothing. Nana keeps her notes in her head.'); break;
    case 'nk_shelf': say('The best teapot, on the shelf where nobody uses it.'); break;
    case 'nk_door2': return false;
    case 'nk_counter': say('The counter, with the tea things out.'); break;
    case 'nl_swindow': say('The street outside, going gold. A cat on a wall.'); break;
    case 'na_rug': say('A rolled-up rug, taller than Mary.'); break;
    case 'nk_larder': say('The larder. Jam, and more jam.'); break;
    /* the landing */
    case 'nd_hatch': S.hatchSeen = true; save(); if (S.hatchOpen) return false; say('The attic hatch, shut, with a loop of cord hanging from it. Far too high to reach, even on tiptoe.'); break;
    case 'nd_cord': S.hatchSeen = true; save(); say('The cord. Mary jumps. Not even close. Something with a hook would do it.'); break;
    case 'nd_vase': say('Dried flowers in a vase, on the little table under the hatch. Not for standing on.'); break;
    case 'nd_window': say('The landing window: rooftops, and the tops of the park’s trees.'); break;
    case 'nd_spare': openCase(); return;
    case 'nd_chair': say('A chair with a towel folded on it, for Mary.'); break;
    case 'nd_bathroom': say('The bathroom. A bath with feet.'); break;
    case 'nd_airing': say('The airing cupboard, warm and full of sheets.'); break;
    case 'nd_picture': say('A picture of the seaside. Nana and Jedi went once, says Jedi, and it rained.'); break;
    case 'nd_basket': say('The laundry basket. Fourteen hours of aeroplane clothes will go in it.'); break;
    case 'nd_bookcase': say('More books. Nana has run out of walls.'); break;
    /* the attic */
    case 'na_dark': case 'na_dark2': case 'na_dark3': case 'na_dark4': say('Pitch dark, and the smell of dust and old paper. Shapes, and nothing else.'); break;
    case 'na_tin': openTin(); return;
    case 'na_boxes': say('Boxes of Christmas things, boxes of books, a box marked with a drawing of a teapot.'); break;
    case 'na_teddy': say('A teddy with one ear, looking out of a box. He was Mum’s.'); break;
    case 'na_trunk': say('A steamer trunk with brass corners. Full of dressing-up: Nana’s, then Mum’s.'); break;
    case 'na_dollshouse': say('A doll’s house with its front shut. Every room inside is dark too.'); break;
    case 'na_lampbase': say('A lamp with no shade and no bulb. No help.'); break;
    case 'na_window': say('A little round window, and beyond it the park going blue with dusk. In the trees, just for a second, a tiny light. Then another.'); break;
    case 'na_horse': say('A rocking horse with a worn patch where a hundred hands have held on.'); break;
    case 'na_cases': say('Old suitcases, older than Mary’s. Labels, but nothing written on them.'); break;
    case 'na_tank': say('The water tank, gurgling to itself.'); break;
    case 'na_dummy': say('A dressmaker’s dummy. Mary thought it was a person. Just for a second.'); break;
    default: return false;
  }
}
function rows(){
  const out = [];
  if (!S.hatchSeen) out.push([0, 'Something of Nana’s, in the attic', 'not yet', false]);
  else {
    Object.entries(THREADS).forEach(([th, [label, done, steps]]) => {
      const idx = HINTS.map((h, k) => h.thread == th && !h.goal() ? k : -1).filter(k => k >= 0);
      const d = done(), p = steps.length - idx.length;
      out.push([d ? -1 : idx[0], label, d ? '✓ done' : (steps[p] || 'not started'), d]);
    });
    if (S.tinOpen) out.push([HINTS.findIndex(h => !h.thread && !h.goal()), 'Nana’s map', S.done ? '✓ shown to Nana' : got('map') ? 'show Nana' : 'take it', S.done]);
  }
  return out;
}
function noticed(){
  const n = [];
  n.push('Nana was nine when she hid the tin.');
  if (S.photosSeen) n.push('Photos: Baby Nana 1958; wedding 1984; Mum’s first day 1991; Elliot’s first steps 2020.');
  if (S.tinSeen) n.push('The tin: AGE 9. KEEP OUT. THIS MEANS YOU, TOM.');
  if (S.jediAsked && !S.poleGot) n.push('Jedi wants a biscuit for the pole.');
  if (S.keySeen) n.push('Nana’s secret alphabet is inside the tin’s lid.');
  if (S.nightMoth) n.push('The back of the map says DUSK. ★');
  return n;
}
function sparkle(id){
  if (id === 'nh_photos') return !S.photosSeen;
  if (id === 'nl_jedi') return !S.poleGot && (!S.jediAsked || got('biscuit'));
  if (id === 'nl_pole') return S.jediAsked && !S.poleGot && !got('biscuit');
  if (id === 'nk_nana') return (S.jediAsked && !S.presentGiven && got('present')) || got('map');
  if (id === 'nk_tin') return S.jediAsked && !S.presentGiven;
  if (id === 'nd_hatch') return !S.hatchSeen || (got('pole') && !S.hatchOpen);
  if (id === 'nd_spare') return S.hatchSeen && !(S.torchTaken && S.presentTaken);
  if (id === 'na_tin') return S.lit && !S.tinOpen;
  return false;
}
return {
  card:{place:'Enfield, the first evening', text:'Nana and Jedi’s house, with the last of the sun on the front door. Elliot and Zaina are asleep on the sofa. Nana is making tea, Jedi is resting his eyes, and Nana has said one thing to Mary: “There is something of mine in the attic, from when I was nine. If you can get up there.”'},
  meanwhile:'Meanwhile, in Enfield, Mary has been sent up to the attic for something of Nana’s.',
  comic:[{pic:'../art/comic/nana-1.jpg', lines:['Nana at the barrier, waving with both arms.', 'Jedi said he had carried all the bags.']}, {pic:'../art/comic/nana-2.jpg', lines:['The end of the road, the end of the day.', 'The last of the sun on Nana’s front door.']}, {pic:'../art/comic/nana-3.jpg', lines:['“There is something of mine in the attic,” said Nana.', '“From when I was nine. If you can get up there.”']}],
  postcard:{pic:'../art/postcards/nana.jpg'},
  title:'Nana and Jedi’s', blurb:'Enfield, the first evening: the hall, the living room, the kitchen, the landing and the attic. A tin from when Nana was nine.',
  track:'../art/music/nana.mp3', ambient:'evening', next:null,
  intro:'<b>Enfield, the first evening.</b> Tea in a minute, Jedi resting his eyes, and something of Nana’s in the attic, if you can get up there.',
  start:{room:'hall', view:0},
  fresh:() => ({hatchSeen:false, jediAsked:false, caseOpen:false, torchTaken:false, presentTaken:false, presentGiven:false, biscuitGiven:false, poleGot:false, jediMoved:false, hatchOpen:false, lit:false, photosSeen:false, tinSeen:false, dials:[0, 0, 0, 0], tinOpen:false, mapTaken:false, keySeen:false, cipher:[null, null, null, null], nightMoth:false}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, extra:EXTRA, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES,
  overlays:{a1:darkVeil(), a2:darkVeil(), a3:darkVeil(), a4:darkVeil()},
  moves:'Jedi: in his armchair in the living room with the pole beside him, until he has his biscuit; then at the kitchen table, the armchair empty, the pole gone. The hatch: shut until the pole hooks its cord, then open with the ladder down.',
  act, sparkle, rows, noticed, speaker, helper:() => 'the moth'
};
})());
