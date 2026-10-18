/* The Moth House, landscape engine: Mary's stage 2, packing day in the family flat, version 2 (16 Oct 2026).
   The first level built from the owner's own materials (the flat's plan and photographs, kept out of the repo) with the design approved on
   paper first; nine places, three parallel trails, built for players of 12 to 15. See STORY.md (stage 2) and next/PLAYBOOK.md (4c, 4t, 4u, 4x). */
'use strict';
registerStage('packing', (function(){
const A = '../art/home/', F = '../art/flat/', Z = '../art/zaina/';
/* the flat: Mary's room (north the window, east the sofa and suitcase, south the wardrobes and door, west the loft bed: the opening view);
   Elliot and Zaina's room; the corridor between the bedrooms and the dining end; Mum and Dad's room with the en suite shut; the living room;
   the dining end, which is the hub; the kitchen; the yard beyond it. The lift lobby is the last scene. */
const ROOMS = {
  mary:{name:'Mary’s room', into:'your room', views:['m1','m2','m3','m4']},
  kids:{name:'Elliot and Zaina’s room', into:'the little ones’ room', views:['k1','k2','k3','k4']},
  hall:{name:'The corridor', into:'the corridor', views:['c1','c2','c3','c4']},
  parents:{name:'Mum and Dad’s room', into:'Mum and Dad’s room', views:['p1','p2','p3','p4']},
  living:{name:'Living room', into:'the living room', views:['l1','l2','l3','l4']},
  dining:{name:'The dining end', into:'the dining end', views:['d1','d2','d3','d4']},
  kitchen:{name:'Kitchen', into:'the kitchen', views:['n1','n2','n3','n4']},
  yard:{name:'The yard', into:'the yard', views:['y1','y2','y3','y4']}
};
const WALLS = Object.fromEntries(Object.values(ROOMS).flatMap(r => r.views).map(k => [k, A + k + '.jpg']));
/* doors: each bedroom opens on the corridor; the corridor opens on the dining end; the dining end opens on the living room and the kitchen; the kitchen on the yard */
const DOORS = {mr_door:['hall', 1], cr_mary:['mary', 2], cr_kids:['kids', 1], kr_door:['hall', 0], cr_parents:['parents', 0], pr_door:['hall', 1], cr_dining:['dining', 2],
  dr_corridor:['hall', 0], dr_living:['living', 0], lr_todining:['dining', 3], dr_kitchen:['kitchen', 0], nr_door:['dining', 1], nr_yard:['yard', 0], yr_kitchen:['kitchen', 3]};
const got = k => S.got.includes(k);
const packed = k => S.packed.includes(k);
const PACK = ['passports', 'torch', 'present', 'jumper', 'toothbrush']; /* what must be in the case before it will zip */
const HIDDEN = ['passports', 'torch', 'present'];
const CODE = [2, 1, 4, 5];              /* departure 22:45, moved an hour earlier: 21:45 */
const WORD = 'ATTIC';                   /* Nana's postcards in date order: Athens, Tromsø, Trent Park, Istanbul, Cornwall */
const LETTERS = ['A', 'C', 'E', 'I', 'M', 'N', 'O', 'R', 'S', 'T'];
const HOTS = {
  /* Mary's room */
  m1:[
    {id:'mr_window', l:12, t:8, w:76, h:34, label:'The window, streaming', sound:'tap'},
    {id:'mr_sill', l:10, t:44, w:78, h:14, label:'The windowsill of frames', sound:'tap'},
    {id:'mr_diary', l:60, t:40, w:9, h:18, label:'Mary’s diary, with its little padlock', sound:'paper', key:true, anim:'lift', layer:'diary'},
    {id:'mr_stand', l:22, t:52, w:18, h:42, label:'Music stand', sound:'tick'},
    {id:'mr_bin', l:76, t:74, w:12, h:18, label:'Pedal bin', sound:'knock'}],
  m2:[
    {id:'mr_sofa', l:26, t:36, w:50, h:30, label:'The grey sofa', sound:'leaf'},
    {id:'mr_book', l:50, t:50, w:12, h:14, label:'A library book on the sofa', sound:'paper', anim:'lift', layer:'book', hideWhen:() => got('book') || packed('book') || S.bookBack},
    {id:'mr_tin', l:60, t:50, w:8, h:8, label:'A blue tin', sound:'tick'},
    {id:'mr_case', l:34, t:68, w:34, h:28, label:'Your suitcase, open on the rug', sound:'knock', key:true}],
  m3:[
    {id:'mr_wardrobe', l:10, t:18, w:28, h:70, label:'Wardrobes', sound:'knock'},
    {id:'mr_door', l:48, t:18, w:22, h:72, label:'Out to the corridor', sound:'knock'},
    {id:'mr_board', l:76, t:20, w:14, h:22, label:'The pinboard', sound:'paper', key:true},
    {id:'mr_whiteboard', l:84, t:46, w:10, h:12, label:'A little whiteboard', sound:'tap'}],
  m4:[
    {id:'mr_bed', l:22, t:6, w:56, h:24, label:'The loft bed', sound:'leaf'},
    {id:'mr_books', l:28, t:30, w:20, h:42, label:'The cube bookcase', sound:'paper'},
    {id:'mr_desk', l:56, t:54, w:22, h:22, label:'The desk', sound:'knock'},
    {id:'mr_chair', l:48, t:56, w:10, h:26, label:'Swivel chair', sound:'squeak'},
    {id:'mr_rainbow', l:70, t:14, w:8, h:16, label:'Paper rainbow', sound:'leaf'},
    {id:'mr_sheep', l:72, t:80, w:16, h:12, label:'Sheepskin', sound:'leaf'}],
  /* Elliot and Zaina's room */
  k1:[
    {id:'kr_bunkend', l:2, t:12, w:16, h:78, label:'The end of the bunks', sound:'knock'},
    {id:'kr_window', l:26, t:8, w:46, h:76, label:'The big tree, dripping', sound:'tap'},
    {id:'kr_chair', l:62, t:56, w:14, h:30, label:'Patchwork armchair', sound:'leaf'},
    {id:'kr_snake', l:16, t:82, w:22, h:10, label:'Toy snake', sound:'leaf'}],
  k2:[
    {id:'kr_bunk', l:20, t:38, w:52, h:54, label:'The bunks', sound:'leaf'},
    {id:'kr_frames', l:24, t:8, w:24, h:14, label:'Family pictures', sound:'tap'},
    {id:'kr_board', l:56, t:8, w:16, h:16, label:'Elliot’s pinboard', sound:'paper', key:true},
    {id:'kr_lamp', l:68, t:58, w:8, h:24, label:'Reading lamp', sound:'tick'}],
  k3:[
    {id:'kr_door', l:12, t:18, w:14, h:68, label:'Out to the corridor', sound:'knock'},
    {id:'kr_animals', l:30, t:22, w:8, h:40, label:'Felt animals on a string', sound:'leaf'},
    {id:'kr_pockets', l:44, t:34, w:20, h:14, label:'Soft toys in their pockets', sound:'leaf'},
    {id:'kr_clock', l:64, t:16, w:10, h:14, label:'Wooden clock', sound:'tick'},
    {id:'kr_zaina', l:50, t:44, w:12, h:40, label:'Zaina, cooking', sound:'leaf', key:true, anim:'wobble', layer:'zaina', hideWhen:() => S.zainaMoved},
    {id:'kr_kitchen', l:62, t:48, w:22, h:40, label:'The toy kitchen', sound:'knock', key:true},
    {id:'kr_bricks', l:44, t:72, w:16, h:16, label:'A box of bricks', sound:'tick'}],
  k4:[
    {id:'kr_toys', l:36, t:6, w:50, h:12, label:'Toys on top', sound:'leaf'},
    {id:'kr_cubes', l:36, t:18, w:50, h:76, label:'The cube wall', sound:'paper'},
    {id:'kr_clock2', l:72, t:56, w:10, h:14, label:'The teal clock', sound:'tick'},
    {id:'kr_dolls', l:6, t:64, w:20, h:30, label:'Doll’s house', sound:'tap'}],
  /* the corridor */
  c1:[
    {id:'cr_dining', l:20, t:10, w:66, h:82, label:'Through to the dining end', sound:'knock'},
    {id:'cr_intercom', l:72, t:38, w:6, h:12, label:'Intercom', sound:'tick'}],
  c2:[
    {id:'cr_mary', l:44, t:22, w:16, h:66, label:'Mary’s door', sound:'knock'},
    {id:'cr_pic', l:68, t:32, w:10, h:14, label:'A picture', sound:'tap'}],
  c3:[
    {id:'cr_kids', l:26, t:20, w:18, h:68, label:'Elliot and Zaina’s door', sound:'knock'},
    {id:'cr_bath', l:56, t:20, w:20, h:68, label:'The bathroom', sound:'knock', key:true},
    {id:'cr_pic2', l:14, t:30, w:8, h:12, label:'A picture', sound:'tap'}],
  c4:[
    {id:'cr_parents', l:36, t:18, w:20, h:72, label:'Mum and Dad’s door', sound:'knock'},
    {id:'cr_basket', l:62, t:62, w:10, h:24, label:'Laundry basket', sound:'leaf'}],
  /* Mum and Dad's room */
  p1:[
    {id:'pr_view', l:10, t:8, w:56, h:76, label:'The window and the view', sound:'tap'},
    {id:'pr_lamp', l:76, t:36, w:10, h:48, label:'The driftwood lamp', sound:'tick'},
    {id:'pr_chest', l:86, t:64, w:14, h:32, label:'Dad’s chest of drawers', sound:'knock', key:true}],
  p2:[
    {id:'pr_daddesk', l:8, t:48, w:22, h:34, label:'Dad’s desk', sound:'knock'},
    {id:'pr_wardrobe', l:26, t:22, w:12, h:62, label:'Wardrobe', sound:'knock'},
    {id:'pr_basket', l:38, t:62, w:10, h:22, label:'A basket', sound:'leaf'}],
  p3:[
    {id:'pr_door', l:4, t:14, w:22, h:80, label:'Out to the corridor', sound:'knock'},
    {id:'pr_pic', l:46, t:34, w:10, h:16, label:'A picture', sound:'tap'},
    {id:'pr_ensuite', l:66, t:16, w:14, h:76, label:'The bathroom door, shut, shower running', sound:'knock', key:true},
    {id:'pr_basket2', l:54, t:66, w:10, h:22, label:'A basket', sound:'leaf'}],
  p4:[
    {id:'pr_bed', l:12, t:44, w:58, h:50, label:'Mum and Dad’s bed', sound:'leaf'},
    {id:'pr_teddy', l:34, t:40, w:8, h:12, label:'An old bear', sound:'leaf'},
    {id:'pr_books', l:12, t:8, w:32, h:10, label:'Books on the shelf', sound:'paper'},
    {id:'pr_table', l:4, t:54, w:10, h:22, label:'Bedside table', sound:'tick'}],
  /* the living room */
  l1:[
    {id:'lr_balcony', l:12, t:8, w:62, h:40, label:'The balcony doors, rain hammering', sound:'tap'},
    {id:'lr_plants', l:14, t:46, w:30, h:28, label:'The balcony plants', sound:'leaf'},
    {id:'lr_armchair', l:70, t:44, w:20, h:34, label:'The navy armchair', sound:'leaf'},
    {id:'lr_pouffe', l:54, t:76, w:10, h:14, label:'Knitted pouffe', sound:'leaf'}],
  l2:[
    {id:'lr_lights', l:8, t:4, w:56, h:12, label:'Fairy lights', sound:'tick'},
    {id:'lr_pics', l:10, t:16, w:32, h:20, label:'Pictures over the sofa', sound:'tap'},
    {id:'lr_sofa', l:10, t:40, w:54, h:42, label:'The sofa, and its cushions', sound:'leaf', key:true},
    {id:'lr_shelf', l:68, t:10, w:16, h:52, label:'The shelf unit', sound:'tap'},
    {id:'lr_zaina2', l:30, t:46, w:22, h:18, label:'Zaina, asleep', sound:'leaf', anim:'sniff', layer:'zaina2', showWhen:() => S.zainaMoved}],
  l3:[
    {id:'lr_todining', l:48, t:24, w:34, h:46, label:'Through to the dining end', sound:'knock'},
    {id:'lr_elliot', l:30, t:48, w:16, h:30, label:'Elliot, building', sound:'leaf', key:true, anim:'wobble', layer:'elliot'},
    {id:'lr_bricks', l:26, t:72, w:22, h:14, label:'A spill of bricks', sound:'tick'},
    {id:'lr_box', l:58, t:60, w:14, h:14, label:'A green box', sound:'knock'},
    {id:'lr_fan', l:44, t:2, w:14, h:8, label:'Ceiling fan', sound:'leaf'}],
  l4:[
    {id:'lr_plant', l:6, t:46, w:20, h:40, label:'A big leafy plant', sound:'leaf'},
    {id:'lr_shelf2', l:56, t:14, w:18, h:60, label:'The shelf unit', sound:'tap'},
    {id:'lr_desk2', l:74, t:52, w:14, h:20, label:'A little desk', sound:'knock'},
    {id:'lr_bag', l:76, t:74, w:8, h:14, label:'Dad’s backpack', sound:'leaf'}],
  /* the dining end */
  d1:[
    {id:'dr_map', l:12, t:20, w:28, h:30, label:'The world map', sound:'paper', key:true},
    {id:'dr_banners', l:8, t:50, w:30, h:10, label:'Paper banners and lanterns', sound:'leaf'},
    {id:'dr_kitchen', l:64, t:18, w:22, h:74, label:'Into the kitchen', sound:'knock'},
    {id:'dr_table', l:16, t:60, w:32, h:32, label:'The end of the table, and Elliot’s tall chair', sound:'knock'}],
  d2:[
    {id:'dr_front', l:22, t:8, w:24, h:88, label:'The front door', sound:'knock', key:true},
    {id:'dr_intercom', l:50, t:28, w:10, h:10, label:'Intercom', sound:'tick'},
    {id:'dr_console', l:52, t:62, w:24, h:30, label:'The hall table', sound:'tap'}],
  d3:[
    {id:'dr_lamp', l:44, t:8, w:12, h:16, label:'The big round lamp', sound:'tick'},
    {id:'dr_pics', l:60, t:14, w:30, h:16, label:'Pictures', sound:'tap'},
    {id:'dr_bookcase', l:58, t:32, w:14, h:46, label:'The bookcase', sound:'paper'},
    {id:'dr_piano', l:76, t:52, w:16, h:30, label:'The piano', sound:'tick'},
    {id:'dr_table2', l:24, t:54, w:34, h:40, label:'The dining table', sound:'knock'}],
  d4:[
    {id:'dr_living', l:6, t:22, w:60, h:72, label:'Into the living room', sound:'knock'},
    {id:'dr_corridor', l:82, t:18, w:12, h:60, label:'The corridor to the bedrooms', sound:'knock'},
    {id:'dr_plant2', l:74, t:58, w:10, h:30, label:'A tall plant', sound:'leaf'}],
  /* the kitchen */
  n1:[
    {id:'nr_cupboards', l:10, t:10, w:62, h:24, label:'Cupboards', sound:'knock'},
    {id:'nr_hob', l:26, t:46, w:22, h:10, label:'The hob', sound:'tick'},
    {id:'nr_oven', l:30, t:56, w:16, h:20, label:'The oven, with its gloves', sound:'knock'},
    {id:'nr_mum', l:20, t:34, w:14, h:56, label:'Mum, cooking', sound:'leaf', key:true, anim:'sniff', layer:'mum', hideWhen:() => S.mumMoved}],
  n2:[
    {id:'nr_fridge', l:10, t:16, w:20, h:76, label:'The fridge, and everything on it', sound:'paper', key:true},
    {id:'nr_kettle', l:36, t:46, w:8, h:12, label:'Kettle', sound:'tick'},
    {id:'nr_window', l:74, t:12, w:22, h:60, label:'The kitchen window', sound:'tap'}],
  n3:[
    {id:'nr_door', l:6, t:18, w:22, h:76, label:'Back to the dining end', sound:'knock'},
    {id:'nr_clock', l:28, t:28, w:10, h:14, label:'The kitchen clock', sound:'tick'},
    {id:'nr_fruit', l:30, t:52, w:10, h:10, label:'Fruit bowl', sound:'tap'}],
  n4:[
    {id:'nr_window2', l:34, t:18, w:36, h:32, label:'Window over the sink', sound:'tap'},
    {id:'nr_sink', l:14, t:58, w:56, h:20, label:'The sink', sound:'tick'},
    {id:'nr_yard', l:72, t:18, w:22, h:74, label:'Through to the yard', sound:'knock'}],
  /* the yard */
  y1:[
    {id:'yr_jumper', l:18, t:28, w:12, h:24, label:'Your jumper, dry', sound:'leaf', key:true, anim:'swing', layer:'jumper', hideWhen:() => got('jumper') || packed('jumper')},
    {id:'yr_rack', l:14, t:8, w:62, h:24, label:'The drying rack', sound:'tick'},
    {id:'yr_window', l:14, t:34, w:48, h:30, label:'The yard window', sound:'tap'},
    {id:'yr_mop', l:6, t:60, w:12, h:34, label:'Mop and bucket', sound:'knock'}],
  y2:[
    {id:'yr_boxes', l:42, t:52, w:34, h:16, label:'Four boxes on the shelf', sound:'knock', key:true},
    {id:'yr_washer', l:40, t:70, w:20, h:24, label:'Washing machine', sound:'knock'},
    {id:'yr_win2', l:50, t:20, w:30, h:26, label:'Yard window', sound:'tap'},
    {id:'yr_broom', l:14, t:50, w:8, h:40, label:'Broom', sound:'leaf'}],
  y3:[
    {id:'yr_wc', l:10, t:30, w:50, h:60, label:'The little washroom', sound:'tap'},
    {id:'yr_wcdoor', l:62, t:28, w:16, h:60, label:'A door', sound:'knock'}],
  y4:[
    {id:'yr_fire', l:46, t:40, w:8, h:14, label:'A fire blanket', sound:'tap'},
    {id:'yr_kitchen', l:62, t:18, w:30, h:74, label:'Back into the kitchen', sound:'knock'}]
};
/* rain on every window while the storm lasts: a drawn layer, gone once the sky clears */
const rain = (l, t, w, h) => ({draw:'rain', group:'rain', l, t, w, h, count:12, hideWhen:() => S.clear});
const LAYERS = {
  m1:[rain(12, 8, 76, 36), {src:A+'item-diary.png', group:'diary', l:60.5, t:39, w:8, h:19.94, shadow:.3}],
  m2:[{src:A+'item-book.png', group:'book', l:51, t:50, w:10, h:13.9, shadow:.3, hideWhen:() => got('book') || packed('book') || S.bookBack}],
  k1:[rain(26, 8, 46, 76)],
  k2:[rain(82, 6, 16, 80)],
  k3:[{src:A+'layer-zaina-cook.png', group:'zaina', l:50, t:46, w:11, h:30.7, shadow:.5, hideWhen:() => S.zainaMoved}],
  p1:[rain(10, 8, 56, 76)],
  l1:[rain(12, 8, 62, 60)],
  l2:[rain(74, 6, 24, 60), {src:A+'layer-zaina-sleep.png', group:'zaina2', l:30, t:50, w:22, h:20.85, shadow:.4, showWhen:() => S.zainaMoved}],
  l3:[rain(2, 4, 50, 50), {src:A+'layer-elliot-bricks.png', group:'elliot', l:30, t:48, w:16, h:46.3, shadow:.5}],
  l4:[rain(2, 6, 30, 70)],
  d1:[rain(0, 10, 10, 70), rain(48, 10, 20, 44)],
  d3:[rain(0, 4, 56, 70)],
  d4:[rain(30, 20, 50, 40)],
  n1:[{src:A+'layer-mum-hob.png', group:'mum', l:20, t:36, w:14, h:44, shadow:.5, hideWhen:() => S.mumMoved}],
  n2:[rain(74, 10, 22, 62)],
  n4:[rain(34, 18, 36, 32)],
  y1:[{src:F+'layer-jumper.png', group:'jumper', l:19, t:28, w:11, h:24, hideWhen:() => got('jumper') || packed('jumper')}],
  k2b:[], /* Mum folding in the children's room appears on the bunk view once she has moved */
};
LAYERS.k2.push({src:A+'layer-mum-fold.png', group:'mumfold', l:24, t:56, w:22, h:38.2, shadow:.5, showWhen:() => S.mumMoved});
HOTS.k2.push({id:'kr_mum2', l:24, t:56, w:22, h:36, label:'Mum, folding', sound:'leaf', anim:'sniff', layer:'mumfold', showWhen:() => S.mumMoved});
const EXTRA = {mary:[A+'closeup-board.jpg', A+'pc-athens.jpg', A+'pc-tromso.jpg', A+'pc-trent.jpg', A+'pc-istanbul.jpg', A+'pc-cornwall.jpg', F+'closeup-suitcase.jpg', F+'layer-zip.png'],
  kids:[A+'closeup-oven.jpg', A+'rocket.jpg', A+'closeup-board.jpg', F+'layer-torch.png'], hall:[A+'closeup-bath.jpg', A+'item-toothbrush.png'],
  parents:[F+'closeup-drawer-open.jpg', F+'layer-drawerfront.png', F+'layer-passports.png'], living:[A+'closeup-sofa.jpg', A+'closeup-sofa-bare.jpg', Z+'layer-peanut.png'],
  dining:[A+'closeup-worldmap.jpg', A+'scene-lobby.jpg'], kitchen:[A+'closeup-fridge.jpg', A+'rocket.jpg'], yard:[A+'closeup-boxes.jpg', F+'layer-present.png']};
/* the light: rain on the glass until two of the three hidden things are in the case, then the sky clears and the evening goes gold */
const goldVeil = () => { const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:0;top:0;width:100%;height:100%;pointer-events:none'; if (S.clear) wrap.innerHTML = '<div class="gold"></div>'; return wrap; };
const overlays = {}; Object.keys(WALLS).forEach(v => { overlays[v] = goldVeil; });

/* ---------- things the game draws ---------- */
const FONT = 'Atkinson Hyperlegible,Verdana,sans-serif';
const CARDS = [['athens', 'Athens', 2018], ['tromso', 'Tromsø', 2019], ['trent', 'Trent Park', 2021], ['istanbul', 'Istanbul', 2023], ['cornwall', 'Cornwall', 2025]];
/* the six card places on the pinboard close-up (picture percentages): five old postcards and Nana's new one */
const SLOTS = [[12, 14], [37, 14], [62, 14], [12, 52], [37, 52], [62, 52]];
const PINS = {athens:[55, 37], tromso:[52.5, 15], trent:[47.5, 27], istanbul:[57.5, 33], cornwall:[45.5, 29]}; /* on the world map close-up */

/* ---------- notes and items ---------- */
const NOTES = {
  list:{html:`<p class="head">MUM’S LIST</p><p>Mary: your case, packed and zipped before the taxi. Clothes for three weeks (England: a JUMPER). Toothbrush. Reading book, NOT the library one, it goes back on Monday.</p><p>And the three things your father hid: passports, Nana’s torch, Nana’s present. Ask him. He’ll tell you. Eventually.</p>`},
  booking:{html:`<p class="head">THE BOOKING</p><p>Four passengers, Singapore to London.<br>Taxi: 18:30. Boarding: 21:05. Departure: 22:45. Arrival: 05:50.</p><p class="sticky">flight moved an hour EARLIER, Dad has NOT changed the printout, as usual. M.</p>`,
    voice:'The booking. Four passengers, Singapore to London. Taxi, half past six. Boarding, five past nine. Departure, a quarter to eleven. Arrival, ten to six. And a note stuck across it in Mum’s writing: flight moved an hour earlier. Dad has not changed the printout, as usual.'},
  postcard:{hand:true, html:`<p>Mary, love. Bring my old red torch, the little one. It was mine before it was yours, and I shall want it back for one evening. Elliot may have borrowed it. Zaina may have cooked it.</p><p>Pack your eyes. You will need them here.</p><p class="sign">Nana</p><p class="nbsmall">On the back, in pencil: a small moth.</p>`},
  diary:{hand:true, html:`<p>The first page, in Nana’s writing, from the day she gave Mary the diary:</p><p>A lock that only you can open, so you can write what you like. The word is the one my postcards spell, if you read them in the right order.</p><p>And on the last page, added since: The moth is real. Ask me in the attic.</p>`}
};
const ITEMS = {
  passports:{name:'passports', icon:`<img src="${F}layer-passports.png" alt="">`},
  torch:{name:'torch', icon:`<img src="${F}layer-torch.png" alt="">`},
  present:{name:'Nana’s present', icon:`<img src="${F}layer-present.png" alt="">`},
  jumper:{name:'jumper', icon:`<img src="${F}layer-jumper.png" alt="">`},
  toothbrush:{name:'toothbrush', icon:`<img src="${A}item-toothbrush.png" alt="">`},
  book:{name:'library book', icon:`<img src="${A}item-book.png" alt="">`},
  peanut:{name:'Peanut', icon:`<img src="${Z}layer-peanut.png" alt="">`},
  list:{name:'Mum’s list', note:'list', icon:`<img src="${F}layer-list.png" alt="">`, open:() => openNote('list')}
};
const HINTS = [
  {goal:() => S.briefed, tips:['Mum said the list is on the fridge, and that Dad hid the three things that matter.', 'The fridge is in the kitchen, past the dining table. Dad is wherever the shower is running.', 'Read the list on the fridge, then knock on the bathroom door in Mum and Dad’s room.']},
  /* trail 1: the passports */
  {thread:1, goal:() => S.dadAsked, tips:['Somebody in this flat knows where the passports are.', 'Dad is in the shower, and talks through the door.', 'In Mum and Dad’s room, tap the shut bathroom door.']},
  {thread:1, goal:() => S.chestSeen, tips:['“My drawer,” Dad said.', 'His chest of drawers is by the window in their room.', 'Tap the chest of drawers in Mum and Dad’s room.']},
  {thread:1, goal:() => S.bookingSeen, tips:['The code is “when we take off”. Something in the flat says when that is.', 'The fridge is covered in papers.', 'Open the fridge close-up and read the booking.']},
  {thread:1, goal:() => S.chestOpen, tips:['Four numbers: the time the plane takes off. The booking gives several times, and Mum has stuck a note on it.', 'Departure is printed as 22:45, and Mum’s note says the flight moved an hour earlier.', 'Set the dials to 2, 1, 4, 5 and tap Open.']},
  {thread:1, goal:() => got('passports') || packed('passports'), tips:['The drawer is open.', 'Lift the front and pull.', 'Take the passports from the drawer.']},
  /* trail 2: the torch */
  {thread:2, goal:() => S.postcardRead, tips:['Nana wrote this morning. She wants something.', 'Her postcard is on the pinboard in your room, by the door.', 'Open the pinboard and read today’s postcard.']},
  {thread:2, goal:() => S.ovenSeen, tips:['A small red torch could be anywhere a small person puts things.', 'Zaina is cooking. What is in her oven?', 'In the little ones’ room, tap the toy kitchen.']},
  {thread:2, goal:() => S.zainaAsked, tips:['Zaina has the torch and will not give it up for nothing.', 'Ask her what she wants.', 'Tap Zaina.']},
  {thread:2, goal:() => S.elliotAsked || got('peanut'), tips:['Peanut is lost. Somebody saw him last.', 'Elliot is on the living-room rug and notices everything.', 'Tap Elliot.']},
  {thread:2, goal:() => got('peanut') || S.peanutGiven, tips:['“On the sofa,” said Elliot. Sofas have more than one place to lose things.', 'Lift the cushions one by one.', 'In the sofa close-up, lift the fourth cushion.']},
  {thread:2, goal:() => got('torch') || packed('torch'), tips:['Peanut for the torch.', 'Tap Peanut in the strip, then Zaina.', 'Give Zaina Peanut; the torch is yours.']},
  /* trail 3: the present */
  {thread:3, goal:() => S.dadAsked2, tips:['Dad hid Nana’s present too.', 'He says where if you ask again.', 'Tap the bathroom door in Mum and Dad’s room a second time.']},
  {thread:3, goal:() => S.boxesSeen, tips:['“In the yard, in a box,” said Dad.', 'The yard is through the kitchen.', 'Tap the shelf of boxes in the yard.']},
  {thread:3, goal:() => S.rocketSeen, tips:['“The one Elliot drew on.” Which drawing is Elliot’s? He signs everything the same way.', 'Elliot’s drawings are on the fridge and on his pinboard. Look at the corner of each.', 'Elliot draws rockets, and puts a little cog in the corner.']},
  {thread:3, goal:() => got('present') || packed('present'), tips:['Four boxes, four drawings.', 'Open the one with Elliot’s mark on it.', 'In the yard, open the rocket box.']},
  /* the list */
  {goal:() => got('jumper') || packed('jumper'), tips:['A jumper, for England.', 'The washing is in the yard.', 'Take the purple jumper off the drying rack.']},
  {goal:() => got('toothbrush') || packed('toothbrush'), tips:['A toothbrush, says the list.', 'The children’s bathroom is off the corridor.', 'Take the toothbrush with the star from the cup.']},
  /* convergence */
  {goal:() => S.zipped, tips:['Everything on the list, and the three hidden things, into the case.', 'The case is in your room. Tap it with each thing held.', 'When nothing is missing, tap the case and pull the zip across.']},
  {goal:() => S.done, tips:['Zipped. Mum is calling.', 'The taxi is downstairs.', 'Go to the front door at the dining end.']}
];
const THREADS = {1:['The passports', () => packed('passports'), ['', 'Dad asked', 'the drawer found', 'the booking read', 'the drawer open']],
  2:['Nana’s torch', () => packed('torch'), ['', 'postcard read', 'the oven looked in', 'Zaina asked', 'Elliot asked', 'Peanut found']],
  3:['Nana’s present', () => packed('present'), ['', 'Dad asked again', 'the boxes found', 'Elliot’s mark known']]};
const speaker = () => 'The moth says';

/* ---------- close-ups ---------- */
/* the pinboard: five old postcards from Nana, pictures and dates, and today's */
function openBoard(){
  S.boardSeen = true; save();
  const cards = CARDS.map(([k, name, year], i) => { const [x, y] = SLOTS[i]; return `<img class="part" src="${A}pc-${k}.jpg" alt="" style="left:${x}%;top:${y}%;width:22%"><button class="book" data-k="${k}" style="left:${x}%;top:${y}%;width:22%;height:30%" aria-label="A postcard from ${year}"><span></span></button>`; }).join('');
  const dates = `<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" aria-hidden="true">${CARDS.map(([k, name, year], i) => { const [x, y] = SLOTS[i]; return `<text x="${(x+11)*16}" y="${(y+34)*9}" text-anchor="middle" font-size="22" font-family="${FONT}" font-weight="700" fill="#4a3a2a">${year}</text>`; }).join('')}</svg>`;
  const today = `<button class="book" id="todayCard" style="left:${SLOTS[5][0]}%;top:${SLOTS[5][1]}%;width:22%;height:30%" aria-label="Today’s postcard from Nana"><span></span></button>`;
  const moth = `<svg viewBox="0 0 100 100" style="position:absolute;left:${SLOTS[5][0]+6}%;top:${SLOTS[5][1]+6}%;width:10%;height:auto;pointer-events:none" aria-hidden="true"><path d="M50 30 C 35 10, 10 20, 20 45 C 30 60, 45 50, 50 55 C 55 50, 70 60, 80 45 C 90 20, 65 10, 50 30 Z" fill="none" stroke="#5a4a3a" stroke-width="3"/><line x1="50" y1="30" x2="50" y2="70" stroke="#5a4a3a" stroke-width="3"/></svg>`;
  openPic(A+'closeup-board.jpg', '16/9', 'The pinboard', cards + dates + moth + today, 62);
  $('picwrap').querySelectorAll('.book[data-k]').forEach(b => b.onclick = e => { e.stopPropagation(); const c = CARDS.find(x => x[0] === b.dataset.k); S.cardsSeen = true; save(); sfx('paper'); say(`A postcard from Nana, ${c[2]}: ${describe(c[0])}. The name on the back has faded to nothing.`); });
  $('todayCard').onclick = e => { e.stopPropagation(); S.postcardRead = true; save(); openNote('postcard'); };
  say('Nana’s postcards, one a year, with the names rubbed off their backs by Mary’s own thumbs. And a new one, with a moth drawn on it: today’s.');
}
const describe = k => ({athens:'white columns on a hill above a city', tromso:'a snowy fjord under green lights in the sky', trent:'a stone obelisk at the end of an avenue of trees', istanbul:'domes and thin towers above blue water', cornwall:'a lighthouse on green cliffs over the sea'})[k];
/* the world map: Dad's pins, each with its place and a tiny copy of the postcard */
function openWorldMap(){
  S.mapSeen = true; save();
  const pins = Object.entries(PINS).map(([k, [x, y]]) => { const c = CARDS.find(z => z[0] === k); const right = x < 50;
    return `<img class="part" src="${A}pc-${k}.jpg" alt="" style="left:${right ? x - 9 : x + 1.5}%;top:${y - 3}%;width:7%;box-shadow:0 1px 3px rgba(0,0,0,.4)"><span style="position:absolute;left:${x-0.6}%;top:${y-0.8}%;width:1.2%;aspect-ratio:1;border-radius:50%;background:#c33;box-shadow:0 0 0 2px #fff"></span>`; }).join('');
  const labels = `<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" aria-hidden="true">${Object.entries(PINS).map(([k, [x, y]]) => { const c = CARDS.find(z => z[0] === k); const right = x < 50; return `<text x="${(right ? x - 9.5 : x + 9)*16}" y="${(y + 6)*9}" text-anchor="${right ? 'end' : 'start'}" font-size="20" font-family="${FONT}" font-weight="700" fill="#2a2a4a" stroke="#fff" stroke-width="4" paint-order="stroke">${c[1]}</text>`; }).join('')}</svg>`;
  openPic(A+'closeup-worldmap.jpg', '16/9', 'Dad’s map', pins + labels, 64);
  say('The world map, with Dad’s pins in it: every place Nana has sent a postcard from, each with the little picture pinned beside it. Athens, Tromsø, Trent Park, Istanbul, Cornwall.');
}
/* the diary: a five-letter padlock Nana set */
function openDiary(){
  S.diarySeen = true; save();
  if (S.diaryOpen){ openNote('diary'); return; }
  openCloseup(`<div class="card locker"><p class="otitle">Mary’s diary. Five letters.</p><p class="nbsmall">${S.cardsSeen && S.mapSeen ? 'The word Nana’s postcards spell, in the right order.' : 'Nana set the word. Mary has forgotten it, which was the point.'}</p><div class="dials five" id="ldials"></div><p class="ofb" id="diaryFb">Tap a dial to turn it.</p><div class="row"><button class="ob" id="openDiary">Open</button></div></div>`);
  const draw = () => { $('ldials').innerHTML = S.ldials.map((d, i) => `<button class="dial" data-i="${i}" aria-label="Dial ${i+1}, showing ${LETTERS[d]}">${LETTERS[d]}</button>`).join('');
    $('ldials').querySelectorAll('.dial').forEach(b => b.onclick = () => { const i = +b.dataset.i; S.ldials[i] = (S.ldials[i] + 1) % LETTERS.length; sfx('tick'); save(); draw(); }); };
  draw();
  $('openDiary').onclick = () => { sfx('tap'); const w = S.ldials.map(d => LETTERS[d]).join('');
    if (w === WORD){ S.diaryOpen = true; if (!S.nightMoth){ S.nightMoth = true; } save(); sfx('pickup'); $('diaryFb').textContent = '★ A, T, T, I, C. The padlock springs.'; setTimeout(() => { closeCloseup(); openNote('diary'); }, 900); }
    else $('diaryFb').textContent = 'The padlock does not move. ' + (S.cardsSeen ? 'Five postcards, five years, five first letters.' : 'What did Nana say about the word?'); };
  say('Mary’s diary, purple, with a tiny padlock of five letter dials. Nana set the word and said: you will work it out.');
}
/* the fridge: four papers, each a close read */
function openFridge(){
  S.fridgeSeen = true; save();
  const b = (id, l, t, w, h, label) => `<button class="book" data-p="${id}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%" aria-label="${label}"><span></span></button>`;
  openPic(A+'closeup-fridge.jpg', '16/9', 'The fridge door', b('list', 20, 6, 14, 24, 'Mum’s list') + b('booking', 42, 16, 16, 40, 'A printed sheet') + b('sticky', 30, 46, 12, 14, 'A small square note') + b('rocket', 58, 60, 20, 30, 'A drawing of a rocket'), 60);
  $('picwrap').querySelectorAll('.book').forEach(x => x.onclick = e => { e.stopPropagation(); const p = x.dataset.p; sfx('paper');
    if (p === 'list'){ S.briefed = true; if (!got('list')) S.got.push('list'); save(); render(); openNote('list'); }
    else if (p === 'booking' || p === 'sticky'){ S.bookingSeen = true; save(); openNote('booking'); }
    else { S.rocketSeen = true; save(); openRocket(); } });
  say('The fridge door: Mum’s list, the printed booking with a note stuck across it, a drawing of Elliot’s, and magnets shaped like fruit.');
}
function openRocket(){ S.rocketSeen = true; save(); openPic(A+'rocket.jpg', '1/1', 'Elliot’s rocket', '', 36); say('A rocket in wax crayon, red and blue, with flames. And in the bottom corner, the way Elliot signs everything: a little cog.'); }
/* Elliot's pinboard in the children's room: another rocket, the same mark */
function openKidsBoard(){
  S.rocketSeen = true; save();
  openPic(A+'closeup-board.jpg', '16/9', 'Elliot’s pinboard', `<img class="part" src="${A}rocket.jpg" alt="" style="left:37%;top:14%;width:22%">`, 56);
  say('Elliot’s board: a rocket, drawn in the same hand as the one on the fridge, with the same little cog in the corner. He puts it on everything, including Zaina.');
}
/* the toy kitchen: the oven, with Nana's torch cooking in it */
function openOven(){
  S.ovenSeen = true; save();
  const torch = got('torch') || packed('torch') ? '' : `<img class="part" src="${F}layer-torch.png" alt="" style="left:44%;top:54%;width:14%">`;
  openPic(A+'closeup-oven.jpg', '16/9', 'Zaina’s oven', torch, 56);
  say(got('torch') || packed('torch') ? 'The toy oven, empty. Zaina’s cake is done.' : 'The toy oven, open, and inside it, on the little rack: a small red torch. “It’s a cake,” says Zaina, “and it is not ready.” She shuts the door.');
}
/* the sofa: four cushions to lift, Peanut under the last, the games drawer under everything */
function openSofa(){
  S.sofaSeen = true; save();
  const bare = S.lifted.length === 4;
  const cush = [[2, 36], [26, 36], [50, 36], [74, 36]].map(([l, t], i) => S.lifted.includes(i) ? '' : `<div class="part" data-c="${i}" style="left:${l}%;top:${t}%;width:24%;height:34%;background-image:url(${A}closeup-sofa.jpg?v=${BUILD});background-size:${100/24*100}% ${100/34*100}%;background-position:${l/(100-24)*100}% ${t/(100-34)*100}%"></div><button class="book" data-c="${i}" style="left:${l}%;top:${t}%;width:24%;height:34%" aria-label="Cushion ${i+1}"><span></span></button>`).join('');
  const peanut = S.lifted.includes(3) && !got('peanut') && !S.peanutGiven ? `<img class="part" id="peanutPic" src="${Z}layer-peanut.png" alt="" style="left:80%;top:46%;width:12%"><button class="book" id="takePeanut" style="left:76%;top:40%;width:20%;height:30%" aria-label="Peanut"><span></span></button>` : '';
  openPic(A+'closeup-sofa-bare.jpg', '16/9', 'The sofa', cush + peanut + `<button class="book" id="gamesDrawer" style="left:20%;top:78%;width:60%;height:18%" aria-label="The games drawer"><span></span></button>`, 62);
  $('picwrap').querySelectorAll('.book[data-c]').forEach(b => b.onclick = e => { e.stopPropagation(); const i = +b.dataset.c; S.lifted.push(i); save(); sfx('leaf'); const im = $('picwrap').querySelector(`.part[data-c="${i}"]`); if (im){ im.classList.add('taken'); setTimeout(() => { closeCloseup(); openSofa(); }, 380); } b.remove();
    say(i === 3 ? 'Under the last cushion: crumbs, a coin, a hair band… and one grey elephant, flat as a pancake. Peanut.' : ['Crumbs and a coin.', 'A hair band and a brick.', 'Nothing. A pen.'][i]); });
  if ($('takePeanut')) $('takePeanut').onclick = e => { e.stopPropagation(); S.got.push('peanut'); save(); sfx('pickup'); $('peanutPic').classList.add('taken'); $('takePeanut').remove(); render(); say('Peanut, rescued. He goes in the strip below.'); };
  $('gamesDrawer').onclick = e => { e.stopPropagation(); sfx('knock'); say('The games drawer: a word game, cards, half a jigsaw. No elephant. Elliot said the sofa, not under the sofa.'); };
  say(bare ? 'The sofa with its cushions off. Mum will have a word.' : 'The long sofa, and its four cushions. Things go down the sides of sofas. Lift them.');
}
/* the bathroom off the corridor: the toothbrush cup */
function openBath(){
  S.bathSeen = true; save();
  const tb = got('toothbrush') || packed('toothbrush') ? '' : `<img class="part" id="tbPic" src="${A}item-toothbrush.png" alt="" style="left:5%;top:46%;width:7%"><button class="book" id="takeTb" style="left:2%;top:40%;width:14%;height:30%" aria-label="The toothbrush with the star"><span></span></button>`;
  openPic(A+'closeup-bath.jpg', '16/9', 'The bathroom', tb, 60);
  if ($('takeTb')) $('takeTb').onclick = e => { e.stopPropagation(); S.got.push('toothbrush'); save(); sfx('pickup'); $('tbPic').classList.add('taken'); $('takeTb').remove(); render(); say('The purple toothbrush with the star: Mary’s. It goes in the strip below.'); };
  say(got('toothbrush') || packed('toothbrush') ? 'The bathroom: three toothbrushes in the cup now, and the bath toys.' : 'The bathroom: the cup of toothbrushes, Mum’s basin, and the rack of bath toys that are staying.');
}
/* Dad's chest of drawers: a four-digit lock, checked only when Open is tapped; then the drawer itself, lifted and pulled */
function openChest(side){
  S.chestSeen = true; save();
  if (S.chestOpen){ openDrawer(side); return; }
  openCloseup(`<div class="card locker"><p class="otitle">Dad’s drawer. Four numbers.</p><p class="nbsmall">${S.dadAsked ? '“When we take off,” said Dad.' : 'A little lock with four dials. Dad’s.'}</p><div class="dials" id="cdials"></div><p class="ofb" id="chestFb">Tap a dial to turn it.</p><div class="row"><button class="ob" id="openChest">Open</button></div></div>`);
  $('cdials').innerHTML = S.cdials.map((d, i) => `<button class="dial" data-i="${i}" aria-label="Dial ${i+1}, showing ${d}">${d}</button>`).join('');
  $('cdials').querySelectorAll('.dial').forEach(b => b.onclick = () => { const i = +b.dataset.i; S.cdials[i] = (S.cdials[i] + 1) % 10; b.textContent = S.cdials[i]; sfx('tick'); save(); });
  $('openChest').onclick = () => { sfx('tap');
    if (S.cdials.join() === CODE.join()){ S.chestOpen = true; save(); sfx('pickup'); $('chestFb').textContent = 'Click.'; setTimeout(() => { closeCloseup(); openDrawer(side); }, 700); }
    else if (S.cdials.join() === '2,2,4,5'){ sfx('knock'); $('chestFb').textContent = 'Nothing. That is what the printout says. What did Mum stick across it?'; }
    else { sfx('knock'); $('chestFb').textContent = S.dadAsked ? 'Nothing. When does the plane take off?' : 'Nothing. Dad would know.'; } };
  say('Dad’s chest of drawers, and the top drawer has a little lock with four number dials. Dad and his locks.');
}
function openDrawer(side){
  openLiftPull({side, title:'Dad’s drawer', bg:F+'closeup-drawer-open.jpg', front:{src:F+'layer-drawerfront.png', l:3, t:27, w:94}, inside:got('passports') || packed('passports') ? null : {src:F+'layer-passports.png', l:40, t:27, w:18},
    label:'Unlocked. Lift the front a little, then pull.', liftedLabel:'Lifted. Now pull.', stuckLabel:'It catches. Lift first, then pull.', doneLabel:got('passports') || packed('passports') ? 'Open. Socks.' : 'Open. Four passports, on top of the socks.',
    done:() => { if (!got('passports') && !packed('passports')){ S.got.push('passports'); save(); render(); sfx('pickup'); say('Four passports, in the drawer where Dad said. They go in the strip below.'); } }});
}
/* the yard boxes */
function openBoxes(){
  S.boxesSeen = true; save();
  const b = (i, l, label) => `<button class="book" data-b="${i}" style="left:${l}%;top:30%;width:22%;height:50%" aria-label="${label}"><span></span></button>`;
  openPic(A+'closeup-boxes.jpg', '16/9', 'Four boxes', b(0, 2, 'The box with the flower') + b(1, 26, 'The box with the rocket') + b(2, 50, 'The box with the cat') + b(3, 74, 'The box with the moth'), 62);
  $('picwrap').querySelectorAll('.book').forEach(x => x.onclick = e => { e.stopPropagation(); const i = +x.dataset.b; sfx('knock');
    if (i === 1){ if (!got('present') && !packed('present')){ S.got.push('present'); save(); render(); sfx('pickup'); say('Under the lid of the rocket box, in paper patterned with moths: a jar, heavy and cold. Kaya, for Nana. It goes in the strip below.'); } else say('The rocket box, empty now.'); }
    else say(['The flower box: Christmas lights, in a knot.', '', 'The cat box: a fan that does not go round.', 'The moth box: a spider, who would rather you shut the lid.'][i]); });
  say('Four cardboard boxes on the shelf, each with a drawing on it: a flower, a rocket, a cat, a moth. Dad said: the one Elliot drew on.');
}
/* the suitcase */
function suitcaseTap(){
  if (S.done){ say('Packed, zipped and ready.'); return; }
  const missing = PACK.filter(k => !packed(k));
  if (!missing.length){ if (!S.zipped){ openZip(); return; } say('Zipped. Mum is calling from the hall: the taxi. The front door is at the dining end.'); return; }
  say('The suitcase, open on the rug. Still to go in: ' + missing.map(k => ITEMS[k].name).join(', ') + '.');
}
function openZip(){
  openDrag({pic:F+'closeup-suitcase.jpg', title:'Zip it shut', tab:F+'layer-zip.png', tabW:4.2, tabRatio:'99/300', path:[[16,41],[29,64],[84,46]],
    label:'Everything’s in. Pull the zip all the way across.', missLabel:'Take hold of the zip pull first.', moreLabel:'Keep pulling, right to the corner.', doneLabel:'Zzzzip!',
    done:() => { S.zipped = true; S.clear = true; S.mumMoved = false; save(); render(); sfx('pickup'); say('Zzzzip. And from the hall, Mum: “Taxi! Shoes! Mary, have you seen my…” The sun has come out, late and gold, as if it had been waiting.'); }});
}
function pack(key){ return () => { drop(key); S.packed.push(key); const n = HIDDEN.filter(packed).length; if (n >= 2 && !S.clear){ S.clear = true; } save(); render(); sfx('pickup');
  const missing = PACK.filter(k => !packed(k)); say((n >= 2 && !S.clearSaid ? (S.clearSaid = true, 'Outside, the rain has stopped as suddenly as it started, and the glass is going gold. ') : '') + (missing.length ? `In it goes. Still to pack: ${missing.map(k => ITEMS[k].name).join(', ')}.` : 'That is everything. Now the zip.')); }; }
const USES = {
  'passports>mr_case':pack('passports'), 'torch>mr_case':pack('torch'), 'present>mr_case':pack('present'), 'jumper>mr_case':pack('jumper'), 'toothbrush>mr_case':pack('toothbrush'),
  'book>mr_case':() => { drop('book'); S.bookBack = true; save(); render(); sfx('knock'); say('In it goes, and out it comes again: Mum, from the kitchen, without turning round: “NOT the library book.” It goes back on the sofa.'); setTimeout(() => { S.bookBack = false; save(); render(); }, 1500); },
  'peanut>kr_zaina':() => { drop('peanut'); S.peanutGiven = true; S.got.push('torch'); save(); render(); sfx('pickup'); say('“PEANUT.” Zaina takes him with both arms, opens the oven with her foot and hands over the torch without looking at it. “Cake’s ready.” The torch goes in the strip below.'); setTimeout(() => { S.zainaMoved = true; S.mumMoved = true; save(); render(); }, 2500); },
  'peanut>kr_kitchen':() => { sfx('knock'); say('Peanut does not go in the oven. Give him to Zaina.'); },
  'torch>pr_ensuite':() => { sfx('tap'); say('“Found it? Good. In the case, not in my bathroom.”'); },
  'present>pr_ensuite':() => { sfx('tap'); say('“The rocket box. Told you.” He did not tell you which box.'); },
  'passports>pr_ensuite':() => { sfx('tap'); say('“Twenty-one forty-five. Your mother changed it. Put them in the case before anyone loses them.”'); },
  'list>pr_ensuite':() => { sfx('tap'); say('“Yes, I have read it. Twice.” The water goes on running.'); },
  'list>nr_mum':() => { sfx('tap'); say('“Read it, don’t wave it. And not the library book.”'); },
  'book>nr_mum':() => { sfx('knock'); say('“Back on the sofa. It goes to the library on Monday, with Dad, who will forget.”'); },
  'peanut>lr_elliot':() => { sfx('tap'); say('“Told you. The sofa.”'); },
  'torch>kr_zaina':() => { sfx('tap'); say('“That’s MY cake.”'); }
};

function act(id){
  switch(id){
    /* Mary's room */
    case 'mr_window': say('Rain going sideways across the glass, the block opposite gone soft and grey. Singapore rain: all at once, then none.'); break;
    case 'mr_sill': say('The sill: frames, a lamp, three small animals, and a diary with a padlock the size of a fingernail.'); break;
    case 'mr_diary': openDiary(); return;
    case 'mr_stand': say('The music stand, with a book open on a piece Mary has not practised. It is not coming.'); break;
    case 'mr_bin': say('The pedal bin. Three drafts of a postcard to Nana.'); break;
    case 'mr_sofa': say(got('book') || packed('book') ? 'The grey sofa, with a pink cloth thrown over its arm.' : 'The grey sofa, with a pink cloth over its arm, a tin, and a library book that is NOT coming to England.'); break;
    case 'mr_book': S.got.push('book'); save(); render(); sfx('paper'); say('The library book, green, with a clear jacket. It is due on Monday and it is not on Mum’s list. It goes in the strip, for now.'); break;
    case 'mr_tin': say('A blue tin of hair ties. Mary is taking the hair ties, not the tin.'); break;
    case 'mr_case': suitcaseTap(); return;
    case 'mr_wardrobe': say('The wardrobes, stickered, and inside them the clothes already packed and the clothes Mum said no to.'); break;
    case 'mr_board': openBoard(); return;
    case 'mr_whiteboard': say('A little whiteboard with nothing on it. Mary rubbed out a plan.'); break;
    case 'mr_bed': say('The loft bed, stripped for the summer. Mary has already said goodbye to it, privately.'); break;
    case 'mr_books': say('The cube bookcase, books and pencil pots and small boxes of small things. Too many to take.'); break;
    case 'mr_desk': say('The desk, bare, for once. Everything on it is either packed or on the sofa.'); break;
    case 'mr_chair': say('The swivel chair. It swivels.'); break;
    case 'mr_rainbow': say('A paper rainbow Zaina made, hanging from the bed. It is staying to look after the room.'); break;
    case 'mr_sheep': say('The sheepskin, where Mary reads. Warm.'); break;
    /* the children's room */
    case 'kr_bunkend': say('The end of the bunks, with the ladder. Elliot on top, Zaina below, both by treaty.'); break;
    case 'kr_window': say('The big tree outside, every leaf running with rain, and a bird in it, annoyed.'); break;
    case 'kr_chair': say('The patchwork armchair, where Zaina is read to and Elliot pretends not to listen.'); break;
    case 'kr_snake': say('A toy snake, friendly. He is called Rope.'); break;
    case 'kr_bunk': say('The bunks, every rail covered in stickers, a drawer of more toys underneath.'); break;
    case 'kr_frames': say('Family pictures over the bed, and one of Nana with a moth on her hand, taken by Jedi.'); break;
    case 'kr_board': openKidsBoard(); return;
    case 'kr_lamp': say('Elliot’s reading lamp, clipped to the bunk. He reads until it is taken away.'); break;
    case 'kr_door': return false;
    case 'kr_animals': say('A string of felt animals from a market: an elephant, a fish, a lion. The elephant is not Peanut. Zaina checked.'); break;
    case 'kr_pockets': say('Soft toys in hanging pockets: a koala, a fox, a panda. All present. Peanut is not among them.'); break;
    case 'kr_clock': say('A wooden teaching clock, set by Elliot to a quarter to four, which it very nearly is.'); break;
    case 'kr_zaina': S.zainaAsked = true; save(); say(got('torch') || packed('torch') ? '“Cake’s ready,” says Zaina, to Peanut.' : S.ovenSeen ? '“No torch. CAKE. You can have the cake when Peanut comes back.” Peanut is her elephant, and he is lost, and she has decided it is Mary’s fault.' : '“I am COOKING,” says Zaina, and stirs nothing.'); break;
    case 'kr_kitchen': openOven(); return;
    case 'kr_bricks': say('A box of bricks. Elliot’s, strictly, and strictly shared.'); break;
    case 'kr_mum2': say('Mum, folding the little ones’ clothes into piles by owner. “Done yours? Good. Zaina’s asleep on the sofa with that elephant. Leave her.”'); break;
    case 'kr_toys': say('On top of the cubes: boxes of soft toys, a cat-face box and a toy aeroplane that Elliot flies at bedtime.'); break;
    case 'kr_cubes': say('The cube wall: doors and drawers in every colour, books, boxes, and the places behind the books where things go to hide.'); break;
    case 'kr_clock2': say('A teal clock with no numbers, which suits Zaina, who cannot read them yet.'); break;
    case 'kr_dolls': say('The doll’s house, with its front open. The doll family is having a very tidy day.'); break;
    /* the corridor */
    case 'cr_intercom': say('The intercom to the lobby downstairs, with its little blank screen. It will buzz when the taxi is here.'); break;
    case 'cr_pic': case 'cr_pic2': say('A small framed picture of hills. Jedi painted it, says Dad. Nana says Jedi bought it.'); break;
    case 'cr_bath': openBath(); return;
    case 'cr_basket': say('The laundry basket, half full. Not Mary’s problem today.'); break;
    /* Mum and Dad's room */
    case 'pr_view': say('The best view in the flat: the white tower opposite, the palms below, the green hill, and the rain over all of it.'); break;
    case 'pr_lamp': say('The driftwood lamp, lit against the rain. Mum found the wood on a beach. Dad carried it.'); break;
    case 'pr_chest': openChest('right'); return;
    case 'pr_daddesk': say('Dad’s desk: a screen, off, and a tidy that happened this morning and will not last.'); break;
    case 'pr_wardrobe': say('The wardrobe, with the big suitcases’ shapes missing from the top of it.'); break;
    case 'pr_basket': case 'pr_basket2': say('A basket of things that did not make it into the big cases. A whole second holiday.'); break;
    case 'pr_pic': say('A picture of a beach. The one with the driftwood.'); break;
    case 'pr_ensuite':
      if (S.zipped) say('The shower has stopped. Dad is singing.');
      else if (!S.dadAsked){ S.dadAsked = true; save(); say('Mary knocks. Water, then Dad, through the door: “Passports are in my drawer. The code’s what it always is: when we take off. Don’t ask your mother, she’ll change it.”'); }
      else if (!S.dadAsked2){ S.dadAsked2 = true; save(); say('Mary knocks again. “Still here! Nana’s present? In the yard, in a box, wrapped in the moth paper. I put it in the one Elliot drew on. And the torch is wherever your sister put it, I am not responsible for the torch.”'); }
      else say('“I am IN THE SHOWER, Mary.” He has been in the shower since lunch.'); break;
    case 'pr_bed': say('Mum and Dad’s bed, made, with the big cases’ outlines still pressed into the quilt.'); break;
    case 'pr_teddy': say('An old bear on the pillows. He was Dad’s. He is not discussed.'); break;
    case 'pr_books': say('Dad’s books, on a shelf he put up himself, which is why it slopes.'); break;
    case 'pr_table': say('A bedside table with a lamp, and under it the charger everyone is looking for.'); break;
    /* the living room */
    case 'lr_balcony': say('The balcony doors, shut against the storm, the rail streaming, the plants getting the drink of their lives.'); break;
    case 'lr_plants': say('Mum’s balcony plants. The neighbour is watering them for three weeks, which they will survive.'); break;
    case 'lr_armchair': say('The navy armchair. Dad’s, by right of sitting in it first.'); break;
    case 'lr_pouffe': say('A knitted pouffe. Zaina’s boat.'); break;
    case 'lr_lights': say('Fairy lights over the sofa, on all day in the rain.'); break;
    case 'lr_pics': say('Three pictures over the sofa: a river, a forest, a sea. Places the family has been, says Mum, or is going to.'); break;
    case 'lr_sofa': openSofa(); return;
    case 'lr_zaina2': say('Zaina, asleep on the sofa with Peanut in a headlock. Nobody is moving her.'); break;
    case 'lr_shelf': case 'lr_shelf2': say('The shelf unit: plants, ornaments, a speaker, a photo of all five of them in which somebody is always blinking.'); break;
    case 'lr_elliot': S.elliotAsked = true; save(); say(got('peanut') || S.peanutGiven ? '“Told you,” says Elliot, without looking up.' : S.zainaAsked ? '“Peanut? She had him on the sofa,” says Elliot, without looking up from the tower. “Then she didn’t.”' : 'Elliot, building a tower that is mostly stairs. “Don’t touch anything.”'); break;
    case 'lr_bricks': say('A spill of bricks across the rug. Walk round.'); break;
    case 'lr_box': say('The green brick box. Emptier than it should be.'); break;
    case 'lr_fan': say('The ceiling fan, turning slowly. Singapore’s other weather.'); break;
    case 'lr_plant': say('A big leafy plant in a cream pot, which Zaina talks to.'); break;
    case 'lr_desk2': say('A little desk by the window where Mum works, with a view she never looks at.'); break;
    case 'lr_bag': say('Dad’s backpack, packed, by the desk. His passport is NOT in it. Mary checked.'); break;
    /* the dining end */
    case 'dr_map': openWorldMap(); return;
    case 'dr_banners': say('Red paper banners from New Year, still up in the summer, and a string of paper decorations the children made.'); break;
    case 'dr_table': say('The end of the long table, and Elliot’s tall chair, which he is too big for and will not give up.'); break;
    case 'dr_front': if (S.zipped){ finish(); return; } say('The front door, dark wood, with the lift lobby beyond. Nobody goes out until the case is zipped and the taxi has buzzed.'); break;
    case 'dr_intercom': say('The intercom. Silent. The taxi has not come, because nobody is ready.'); break;
    case 'dr_console': say('The hall table: a bowl of keys, a plant, and the place where the passports are NOT.'); break;
    case 'dr_lamp': say('The big round lamp over the table, like a moon on a string.'); break;
    case 'dr_pics': say('Two pictures of hills and a sea.'); break;
    case 'dr_bookcase': say('The grown-up bookcase. Mary has read the bottom two shelves and is working up.'); break;
    case 'dr_piano': say('The electric piano, lid up, where Mary practises the piece on the music stand. Not today.'); break;
    case 'dr_table2': say('The long pine table, cleared for once, with Elliot’s tall chair at the end.'); break;
    case 'dr_plant2': say('A tall plant by the corridor that has to be edged past.'); break;
    /* the kitchen */
    case 'nr_cupboards': say('Cupboards, tins, the good glasses on the top shelf.'); break;
    case 'nr_hob': say('The hob, two rings on, and the smell of dinner.'); break;
    case 'nr_oven': say('The oven, with the striped gloves on its rail. Something in it for later.'); break;
    case 'nr_mum': S.briefed = true; save();
      if (S.zipped) say('“Zipped? Then shoes. Shoes, everyone.”');
      else if (S.clear) say('“Rain’s stopped. Good. So should you have, by now.” She is stirring with one hand and holding the list with the other.');
      else if (S.dadAsked) say('“Did he tell you the code? He always makes it the flight time, and then I change the flight.”');
      else say('“Mary. Case. List is on the fridge, right there. And the three things your father hid are the ones that matter: ask HIM, he is in the shower, he can hear you.”'); break;
    case 'nr_fridge': openFridge(); return;
    case 'nr_kettle': say('The kettle, just boiled, for the flask.'); break;
    case 'nr_window': say('The kitchen window: the block across the way, the rain in sheets.'); break;
    case 'nr_door': return false;
    case 'nr_clock': say('The kitchen clock: ten past four. The taxi is at half past six. Dad has been in the shower since lunch.'); break;
    case 'nr_fruit': say('A bowl of fruit that will not keep three weeks. Mum has a plan for it.'); break;
    case 'nr_window2': say('The window over the sink, and the yard beyond it.'); break;
    case 'nr_sink': say('The sink, full of the lunch things.'); break;
    /* the yard */
    case 'yr_jumper': S.got.push('jumper'); save(); render(); sfx('pickup'); say('The purple jumper, dry and stiff from the heat. England, says Mum, is cold in summer. It goes in the strip below.'); break;
    case 'yr_rack': say(got('jumper') || packed('jumper') ? 'The drying rack: t-shirts and small clothes.' : 'The drying rack, hung with t-shirts, small clothes, and one purple jumper.'); break;
    case 'yr_window': say('A louvred window on the rain, and the block opposite, where someone else is packing.'); break;
    case 'yr_mop': say('A mop and bucket. The yard floods a little in weather like this.'); break;
    case 'yr_boxes': openBoxes(); return;
    case 'yr_washer': say('The washing machine, finished, and nobody has emptied it.'); break;
    case 'yr_win2': say('The yard window, streaming.'); break;
    case 'yr_broom': say('A broom.'); break;
    case 'yr_wc': say('The little washroom: a basin, a mirror, and a lightbulb that hums.'); break;
    case 'yr_wcdoor': say('A door to the back stairs. Locked, always.'); break;
    case 'yr_fire': say('A fire blanket in a red pouch. For grown-ups.'); break;
    default: return false;
  }
}
/* the last scene: the lobby, then the postcard home */
function finish(){
  if (S.done) return; S.done = true; save(); sfx('turn');
  openPic(A+'scene-lobby.jpg', '16/9', '', '', 68);
  say('The lobby: Dad, out at last and dressed, with the two big cases; Mum with Zaina asleep on her shoulder and Peanut dangling; Elliot on the lift button. The sun on the lobby floor, gold. “Got everything?” says Dad. Mary has.');
  setTimeout(() => { closeCloseup(); showEnd('Taxi’s here', 'In the taxi, next to you both, which is a silly place to write to you from, but Nana says write everything down. Dad hid all three things, and told me where through the bathroom door: the passports in his drawer (code 2145, Mum moved the flight), Nana’s present in the yard in the box with Elliot’s rocket on it, and the torch was in Zaina’s oven, being a cake, until I found Peanut under the fourth sofa cushion. The rain stopped the moment the case was full. Fourteen hours to Nana.', S.nightMoth ? 'My diary’s padlock said ATTIC: Nana’s postcards, in order. “The moth is real. Ask me in the attic.” ★' : 'My diary’s padlock is still shut. Nana set the word.'); }, 5200);
}
function rows(){
  const out = [];
  if (!S.briefed) out.push([0, 'Pack the case before the taxi', 'read the list', false]);
  else {
    Object.entries(THREADS).forEach(([th, [label, done, steps]]) => {
      const idx = HINTS.map((h, k) => h.thread == th && !h.goal() ? k : -1).filter(k => k >= 0);
      const d = done(), p = steps.length - idx.length;
      out.push([d ? -1 : idx[0], label, d ? '✓ packed' : (steps[p] || 'not started'), d]);
    });
    const list = ['jumper', 'toothbrush'].filter(k => !packed(k));
    out.push([HINTS.findIndex(h => !h.thread && !h.goal()), 'The list', list.length ? 'still: ' + list.join(', ') : '✓ done', !list.length]);
    if (PACK.every(packed)) out.push([HINTS.findIndex(h => !h.thread && !h.goal()), 'The zip, and the taxi', S.done ? '✓ gone' : S.zipped ? 'to the front door' : 'zip the case', S.done]);
  }
  return out;
}
function noticed(){
  const n = [];
  if (S.briefed) n.push('Mum: the three hidden things are the ones that matter. Ask Dad.');
  if (S.dadAsked) n.push('Dad: passports in his drawer; the code is when we take off.');
  if (S.bookingSeen) n.push('The booking: departure 22:45, and Mum’s note: moved an hour EARLIER.');
  if (S.postcardRead) n.push('Nana wants her old red torch. Zaina may have cooked it.');
  if (S.ovenSeen && !packed('torch')) n.push('The torch is in Zaina’s toy oven. She wants Peanut first.');
  if (S.elliotAsked && !(got('peanut') || S.peanutGiven)) n.push('Elliot: Zaina had Peanut on the sofa.');
  if (S.dadAsked2) n.push('Dad: the present is in the yard, in the box Elliot drew on.');
  if (S.rocketSeen) n.push('Elliot signs his drawings with a little cog.');
  if (S.cardsSeen) n.push('Nana’s postcards: 2018 columns; 2019 a fjord; 2021 an obelisk; 2023 domes; 2025 a lighthouse.');
  if (S.mapSeen) n.push('Dad’s pins: Athens, Tromsø, Trent Park, Istanbul, Cornwall.');
  if (S.nightMoth) n.push('The diary’s word is ATTIC. ★');
  return n;
}
function sparkle(id){
  if (id === 'nr_fridge') return !S.briefed;
  if (id === 'nr_mum') return !S.briefed;
  if (id === 'pr_ensuite') return S.briefed && (!S.dadAsked || !S.dadAsked2);
  if (id === 'pr_chest') return S.dadAsked && !S.chestOpen;
  if (id === 'mr_board') return S.briefed && !S.postcardRead;
  if (id === 'kr_kitchen') return S.postcardRead && !S.ovenSeen;
  if (id === 'kr_zaina') return (S.ovenSeen && !S.zainaAsked) || got('peanut');
  if (id === 'lr_elliot') return S.zainaAsked && !S.elliotAsked && !got('peanut');
  if (id === 'lr_sofa') return S.elliotAsked && !got('peanut') && !S.peanutGiven;
  if (id === 'yr_boxes') return S.dadAsked2 && !got('present') && !packed('present');
  if (id === 'mr_case') return PACK.some(got) || (PACK.every(packed) && !S.zipped);
  if (id === 'dr_front') return S.zipped && !S.done;
  return false;
}
return {
  card:{place:'Singapore, the afternoon before the flight', text:'Rain on every window of the flat, and dinner on early. Mum has said one thing to Mary: “Your case, packed and zipped before the taxi. My list is on the fridge. The three things that are not on the list are the ones that matter, and your father has hidden all three.”'},
  meanwhile:'Meanwhile, in the flat, Mary has a suitcase to fill and a father in the shower.',
  comic:[{pic:'../art/comic/packing-1.jpg', lines:['Rain all afternoon, and a postcard from Nana with a moth on the back.', '“Your case, packed and zipped before the taxi,” said Mum.']}, {pic:'../art/comic/packing-2.jpg', lines:['The case was open on the rug. It was empty.', '“The three things that are not on the list are the ones that matter.”']}, {pic:'../art/comic/packing-3.jpg', lines:['“And your father has hidden all three.”', 'Dad had been in the shower since lunch.']}],
  postcard:{pic:'../art/postcards/packing.jpg'},
  title:'Packing day', blurb:'The flat, the afternoon before the flight: nine places, Mum’s list, and three things Dad hid.',
  track:'../art/music/flat.mp3', ambient:'rain', next:'flight', nextLabel:'To the airport',
  intro:'<b>Singapore, the afternoon before the flight.</b> Rain on the windows, Mum’s list on the fridge, and three things Dad has hidden, if he will say where.',
  start:{room:'mary', view:3},
  fresh:() => ({packed:[], lifted:[], briefed:false, dadAsked:false, dadAsked2:false, chestSeen:false, chestOpen:false, cdials:[0, 0, 0, 0], bookingSeen:false, fridgeSeen:false, rocketSeen:false, boardSeen:false, cardsSeen:false, postcardRead:false, mapSeen:false,
    ovenSeen:false, zainaAsked:false, elliotAsked:false, sofaSeen:false, peanutGiven:false, zainaMoved:false, mumMoved:false, boxesSeen:false, bathSeen:false, bookBack:false, diarySeen:false, ldials:[0, 0, 0, 0, 0], diaryOpen:false, nightMoth:false, clear:false, clearSaid:false, zipped:false}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, extra:EXTRA, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES, overlays,
  moves:'Zaina: at her toy kitchen until she has Peanut, then asleep on the living-room sofa. Mum: at the hob until the torch is found, then folding in the children’s room, then (after the zip) back to the kitchen calling for shoes. Dad: a voice behind the en suite door until the case is zipped, then in the lobby with the big cases. The light: rain on every window until two of the three hidden things are packed, then clear and gold.',
  act, sparkle, rows, noticed, speaker, helper:() => 'the moth'
};
})());
