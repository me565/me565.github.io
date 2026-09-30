/* The Moth House, landscape engine: Mary's stage 2, packing day in the family flat.
   Three rooms and three parallel trails; see STORY.md and next/PLAYBOOK.md. Registered with the engine in index.html. */
'use strict';
registerStage('packing', (function(){
const A = '../art/flat/';
const ROOMS = {
  bedroom:{name:"Mary's room", into:'your room', views:['b1','b2','b3','b4']},
  living:{name:'Living room', into:'the living room', views:['l1','l2','l3','l4']},
  kitchen:{name:'Kitchen', into:'the kitchen', views:['k1','k2','k3','k4']}
};
const WALLS = {b1:A+'b1.jpg', b2:A+'b2.jpg', b3:A+'b3.jpg', b4:A+'b4.jpg', l1:A+'l1.jpg', l2:A+'l2.jpg', l3:A+'l3.jpg', l4:A+'l4.jpg', k1:A+'k1.jpg', k2:A+'k2.jpg', k3:A+'k3.jpg', k4:A+'k4.jpg'};
/* the bedroom door is on b2 (east), so you arrive in the living room facing its east wall; the living room's doorways are on l4 (west) */
const DOORS = {b_door:['living', 1], l_bedroom:['bedroom', 3], l_kitchen:['kitchen', 3], k_door:['living', 1]};
const got = k => S.got.includes(k);
const packed = k => S.packed.includes(k);
const PACK = ['torch', 'passports', 'present']; /* the three things on Mum's list */
const HOTS = {
  b1:[
    {id:'b_bed', l:28, t:58, w:44, h:40, label:'Bed', sound:'leaf'},
    {id:'b_case', l:41, t:49, w:18, h:26, label:'Open suitcase on the bed', sound:'knock', key:true},
    {id:'b_shelf', l:29, t:23, w:14, h:18, label:'Shelf of books', sound:'paper'}],
  b2:[
    {id:'b_door', l:41, t:24, w:18, h:63, label:'Open doorway to the living room', sound:'knock'},
    {id:'b_list', l:26, t:38, w:11, h:16, label:"Mum's list on the wall", sound:'paper', anim:'lift', layer:'list'},
    {id:'b_basket', l:60, t:73, w:10, h:18, label:'Laundry basket', sound:'leaf'}],
  b3:[
    {id:'b_window', l:33, t:17, w:35, h:47, label:'Rainy window', sound:'tap'},
    {id:'b_moth2', l:32, t:17, w:5, h:5, label:'Paper moth in the window frame', sound:'leaf', secret:true, anim:'lift', layer:'moth2', hideWhen:() => S.moths.includes(2)},
    {id:'b_mug', l:41, t:53, w:5, h:11, label:'Mug of pencils', sound:'tap'},
    {id:'b_desk', l:39, t:66, w:22, h:27, label:"Mary's desk", sound:'knock'},
    {id:'b_pencilcase', l:52.5, t:63, w:9, h:9, label:'Pencil case', sound:'leaf', anim:'wobble', layer:'pencilcase', key:true, hideWhen:() => got('tape') || S.tapeGone}],
  b4:[
    {id:'b_wardrobe', l:31, t:20, w:38, h:70, label:'Wardrobe', sound:'knock'},
    {id:'b_moth1', l:55.5, t:16, w:6, h:6, label:'Paper moth on top of the wardrobe', sound:'leaf', secret:true, anim:'lift', layer:'moth1', hideWhen:() => S.moths.includes(1)},
    {id:'b_jumper', l:50.5, t:29, w:10, h:18, label:'Purple jumper', sound:'leaf', anim:'swing', layer:'jumper', key:true, hideWhen:() => got('jumper') || packed('jumper')}],
  /* living room */
  l1:[
    {id:'l_window', l:32, t:11, w:37, h:46, label:'Living-room window', sound:'tap'},
    {id:'l_desk', l:35, t:64, w:30, h:30, label:"Dad's desk", sound:'knock'},
    {id:'l_drawer', l:43, t:69, w:14, h:8, label:"Dad's desk drawer", sound:'knock', key:true},
    {id:'l_paper', l:58, t:44, w:6, h:23, label:'Roll of moth wrapping paper', sound:'paper', anim:'wobble', layer:'paper', key:true, hideWhen:() => S.paperGone},
    {id:'l_hooks', l:71, t:31, w:15, h:23, label:'Keys on hooks', sound:'tick', key:true}],
  l2:[
    {id:'l_shelf', l:16, t:32, w:56, h:15, label:'Shelf', sound:'knock'},
    {id:'l_globe', l:18.5, t:30, w:8.5, h:15, label:'Durian snow globe', sound:'tap', anim:'wobble', layer:'snowglobe'},
    {id:'l_orchid', l:59.5, t:29, w:8, h:16, label:'Orchid', sound:'leaf', anim:'bend', layer:'orchid'},
    {id:'l_sofa', l:15, t:62, w:42, h:33, label:'Sofa', sound:'leaf'},
    {id:'l_moth3', l:31, t:89, w:6, h:7, label:'Paper moth under the sofa', sound:'leaf', secret:true, anim:'lift', layer:'moth3', hideWhen:() => S.moths.includes(3)},
    {id:'l_tv', l:62, t:57, w:22, h:37, label:'Television', sound:'tap'}],
  l3:[
    {id:'l_front', l:18, t:26, w:17, h:60, label:'Front door', sound:'knock'},
    {id:'l_cabinet', l:36, t:63, w:12, h:27, label:'Hall cabinet', sound:'knock'},
    {id:'l_halldrawer', l:36.5, t:66, w:11, h:9, label:'Hall drawer, where the torch lives', sound:'knock', key:true},
    {id:'l_fort', l:50, t:62, w:35, h:33, label:"Elliot's blanket fort", sound:'leaf', key:true}],
  l4:[
    {id:'l_bedroom', l:19, t:32, w:15, h:52, label:"Open doorway to Mary's room", sound:'knock'},
    {id:'l_kitchen', l:65, t:32, w:14, h:52, label:'Open doorway to the kitchen', sound:'knock'},
    {id:'l_photos', l:38, t:32, w:23, h:25, label:'Family photos', sound:'tap'},
    {id:'l_moth4', l:59, t:42, w:5, h:6, label:'Paper moth behind a photo', sound:'leaf', secret:true, anim:'lift', layer:'moth4', hideWhen:() => S.moths.includes(4)}],
  /* kitchen */
  k1:[
    {id:'k_counter', l:8, t:60, w:84, h:30, label:'Kitchen counter', sound:'knock'},
    {id:'k_cupboards', l:10, t:16, w:80, h:27, label:'Wall cupboards', sound:'knock'},
    {id:'k_hob', l:11, t:60, w:16, h:7, label:'Hob', sound:'tap'},
    {id:'k_toaster', l:29, t:52, w:8, h:12, label:'Toaster', sound:'tap'},
    {id:'k_mum', l:38, t:30, w:21, h:64, label:'Mum, making kaya toast', sound:'leaf', anim:'sniff', layer:'mum', key:true}],
  k2:[
    {id:'k_cupboardtall', l:8, t:19, w:13, h:71, label:'Tall cupboard', sound:'knock'},
    {id:'k_fridge', l:41, t:25, w:18, h:67, label:'Fridge', sound:'knock'},
    {id:'k_moth5', l:46, t:21, w:6, h:6, label:'Paper moth on top of the fridge', sound:'leaf', secret:true, anim:'lift', layer:'moth5', hideWhen:() => S.moths.includes(5)},
    {id:'k_postcard', l:43, t:51, w:9, h:11, label:"Nana's postcard on the fridge", sound:'paper', anim:'lift', layer:'postcard', key:true},
    {id:'k_drawing', l:44.5, t:63, w:11, h:15, label:"Elliot's drawing on the fridge", sound:'paper', anim:'lift', layer:'drawing', key:true},
    {id:'k_calendar', l:62, t:31, w:11, h:21, label:'Calendar', sound:'paper'}],
  k3:[
    {id:'k_door', l:43, t:26, w:15, h:57, label:'Open doorway to the living room', sound:'knock'},
    {id:'k_bin', l:33, t:62, w:8, h:23, label:'Pedal bin', sound:'knock'},
    {id:'k_broom', l:60, t:45, w:8, h:40, label:'Broom', sound:'leaf'}],
  k4:[
    {id:'k_window', l:39, t:27, w:23, h:49, label:'Kitchen window', sound:'tap'},
    {id:'k_fruit', l:23, t:72, w:12, h:16, label:'Fruit bowl', sound:'tap'},
    {id:'k_sink', l:38, t:72, w:24, h:19, label:'Sink', sound:'knock'},
    {id:'k_jars', l:69, t:26, w:18, h:40, label:'Cupboard by the sink', sound:'knock', key:true},
    {id:'k_moth6', l:76, t:22, w:6, h:6, label:'Paper moth on top of the cupboard', sound:'leaf', secret:true, anim:'lift', layer:'moth6', hideWhen:() => S.moths.includes(6)}]
};
/* six paper moths for the Night Moth hunt: the same small cut-out, tucked in six places */
const moth = (n, l, t) => ({src:A+'layer-moth.png', group:'moth'+n, l, t, w:2.4, h:2.63, hideWhen:() => S.moths.includes(n)});
/* the things packed so far are drawn inside the open suitcase on the bed */
const inCase = (key, l, t, w, h) => ({src:A+'layer-'+key+'.png', group:'in'+key, l, t, w, h, shadow:.5, showWhen:() => packed(key)});
const rain = (l, t, w, h) => ({draw:'rain', group:'rain', l, t, w, h, count:12});
const LAYERS = {
  b1:[inCase('jumper', 45.5, 60.5, 4.5, 9.85), inCase('passports', 44, 65.5, 5, 7.1), inCase('torch', 49.5, 64.5, 6.5, 7.8), inCase('present', 53.5, 66, 3.4, 6.5)],
  b2:[{src:A+'layer-list.png', group:'list', l:27.5, t:38, w:8, h:19, lit:.5}],
  b3:[rain(35, 19, 31, 43), moth(2, 33.5, 18.5), {src:A+'layer-pencilcase.png', group:'pencilcase', l:53.5, t:65.5, w:6.5, h:5.4, shadow:.5, hideWhen:() => got('tape') || S.tapeGone}],
  b4:[moth(1, 57, 17.6), {src:A+'layer-jumper.png', group:'jumper', l:52, t:30.5, w:7, h:15.3, hideWhen:() => got('jumper') || packed('jumper')}],
  l1:[rain(34, 13, 33, 42), {src:A+'layer-key.png', group:'key', l:73.4, t:34.8, w:2.8, h:7.97, hideWhen:() => S.keyTaken},
      {src:A+'layer-paper.png', group:'paper', l:60, t:46, w:2.4, h:19.7, shadow:.5, hideWhen:() => S.paperGone}],
  l2:[{src:A+'layer-snowglobe.png', group:'snowglobe', l:20, t:32.3, w:5.5, h:11.2, shadow:.6}, {src:A+'layer-orchid.png', group:'orchid', l:61, t:30.6, w:5, h:12.95, shadow:.5}, moth(3, 33, 91.5)],
  l4:[moth(4, 59.8, 44)],
  k1:[{draw:'steam', group:'steam', l:30, t:44, w:6, h:9}, {src:A+'layer-mum.png', group:'mum', l:40, t:31, w:17, h:61.8, shadow:.7}],
  k2:[moth(5, 47, 23.4), {src:A+'layer-postcard.png', group:'postcard', l:44, t:52, w:7, h:9.7},
      {src:A+'layer-drawing.png', group:'drawing', l:45.5, t:64, w:9, h:13.5, over:drawSymbols}],
  k4:[rain(41, 29, 19, 45), moth(6, 77, 24.6)]
};
const EXTRA = {living:[A+'closeup-hooks.jpg', A+'closeup-drawer.jpg', A+'closeup-drawer-open.jpg', A+'layer-drawerfront.png', A+'closeup-fort.jpg', A+'closeup-infort.jpg'], kitchen:[A+'closeup-jars.jpg']};

/* the fort's password: three crayon symbols, drawn by the game on Elliot's drawing and on the fort's flap so they match exactly */
const SYM = {
  sun:'<circle cx="50" cy="50" r="22" fill="#f2c53d" stroke="#8a5a1a" stroke-width="5"/><g stroke="#e0902a" stroke-width="6" stroke-linecap="round">' + [0,45,90,135,180,225,270,315].map(a => `<line x1="50" y1="12" x2="50" y2="4" transform="rotate(${a} 50 50)"/>`).join('') + '</g>',
  star:'<path d="M50 8 61 38 93 38 67 57 77 88 50 69 23 88 33 57 7 38 39 38Z" fill="#f2c53d" stroke="#8a5a1a" stroke-width="5" stroke-linejoin="round"/>',
  moon:'<path d="M62 10a40 40 0 1 0 0 80 32 32 0 1 1 0-80Z" fill="#8fb7e8" stroke="#2f5f8a" stroke-width="5" stroke-linejoin="round"/>',
  cloud:'<path d="M28 70a14 14 0 0 1 2-28 18 18 0 0 1 34-6 14 14 0 0 1 12 34Z" fill="#dfe6ee" stroke="#5b6a7a" stroke-width="5" stroke-linejoin="round"/>'
};
const CODE = ['sun', 'star', 'moon'];
const symSVG = (name, cls) => `<svg viewBox="0 0 100 100" class="${cls || ''}" aria-hidden="true">${SYM[name]}</svg>`;
/* the three squares on Elliot's drawing, in picture percentages */
const DRAW_SQ = [[13, 59, 28, 76], [31, 59, 46, 76], [49, 59, 64, 76]];
let symImgs = null;
function drawSymbols(ctx, ox, oy, W, H){ /* on the wall the drawing is tiny: the symbols are painted as simple shapes */
  DRAW_SQ.forEach(([x0, y0, x1, y1], i) => { const cx = ox + (x0+x1)/2/100*W, cy = oy + (y0+y1)/2/100*H, r = (x1-x0)/100*W*0.3;
    ctx.save(); ctx.translate(cx, cy); ctx.lineWidth = Math.max(1.5, r*0.18); ctx.strokeStyle = CODE[i] === 'moon' ? '#2f5f8a' : '#8a5a1a';
    if (CODE[i] === 'sun'){ ctx.fillStyle = '#f2c53d'; ctx.beginPath(); ctx.arc(0, 0, r*0.7, 0, Math.PI*2); ctx.fill(); ctx.stroke(); for (let a = 0; a < 8; a++){ ctx.beginPath(); ctx.moveTo(0, -r*0.95); ctx.lineTo(0, -r*1.25); ctx.stroke(); ctx.rotate(Math.PI/4); } }
    else if (CODE[i] === 'star'){ ctx.fillStyle = '#f2c53d'; ctx.beginPath(); for (let k = 0; k < 10; k++){ const rr = k%2 ? r*0.5 : r*1.2, a = -Math.PI/2 + k*Math.PI/5; ctx.lineTo(Math.cos(a)*rr, Math.sin(a)*rr); } ctx.closePath(); ctx.fill(); ctx.stroke(); }
    else { ctx.fillStyle = '#8fb7e8'; ctx.beginPath(); ctx.arc(0, 0, r*1.1, Math.PI*0.25, Math.PI*1.75); ctx.arc(r*0.55, 0, r*0.85, Math.PI*1.6, Math.PI*0.4, true); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ctx.restore(); });
}

const NOTES = {
  list:{hand:true, html:'<span class="head">Mary, before the taxi at four:</span><span class="big">1. The torch<br>2. The passports<br>3. Nana’s present</span><span>And wear something warm on the plane! Mum x</span>'},
  postcard:{hand:true, html:'<span class="head">From Nana</span><span class="big">Dear Mary, not long now! Bring the little torch, you’ll need it. Jedi says hello (he is resting his eyes). Love, Nana x</span><span>P.S. I’ve run out of kaya.</span>'},
  ehnote:{hand:true, html:'<span class="head">In Elliot’s crayon:</span><span class="big">BORROWED THE TORCH FOR MY BASE. PASSWORD ON THE FRIDGE. E</span>'},
};
const ITEMS = {
  key:{name:'desk key', icon:`<img src="${A}layer-key.png" alt="">`},
  paper:{name:'moth paper', icon:`<img src="${A}layer-paper.png" alt="">`},
  tape:{name:'sticky tape', icon:`<img src="${A}layer-tape.png" alt="">`},
  kaya:{name:'jar of kaya', icon:`<img src="${A}layer-kaya.png" alt="">`},
  wrapped:{name:'half-wrapped present', icon:`<img src="${A}layer-kaya.png" alt="" style="filter:sepia(.5) opacity(.85)">`},
  present:{name:"Nana's present", icon:`<img src="${A}layer-present.png" alt="">`},
  torch:{name:'torch', icon:`<img src="${A}layer-torch.png" alt="">`},
  passports:{name:'passports', icon:`<img src="${A}layer-passports.png" alt="">`},
  jumper:{name:'jumper', icon:`<img src="${A}layer-jumper.png" alt="">`}
};
const HINTS = [
  {goal:() => S.listRead, tips:['Mum stuck a list up for you.', 'It’s on the wall by your bedroom door.', 'Tap the list beside your door.']},
  /* trail 1: the torch */
  {thread:1, goal:() => S.postcardRead, tips:['What did Nana ask you to bring? Her postcard says.', 'Nana’s postcard is on the fridge in the kitchen.', 'Go to the kitchen and tap the postcard on the fridge.']},
  {thread:1, goal:() => S.ehnoteRead, tips:['The torch lives in the hall drawer by the front door.', 'Open the hall drawer in the living room. Something is in it, but not the torch.', 'Tap the hall drawer by the front door and read Elliot’s note.']},
  {thread:1, goal:() => S.drawingSeen, tips:['Elliot says the password is on the fridge.', 'His crayon drawing on the fridge shows his base, and three symbols on its door.', 'Tap Elliot’s drawing on the fridge: sun, star, moon.']},
  {thread:1, goal:() => S.fortOpen, tips:['The password goes on the fort under the dining table.', 'Tap the blanket fort. Press the three symbols from Elliot’s drawing, in that order, then Knock.', 'On the fort: sun, star, moon, then Knock.']},
  {thread:1, goal:() => got('torch') || packed('torch'), tips:['The fort is open. Elliot’s things are inside.', 'Tap the fort to look inside.', 'Take the torch from the cushion inside the fort.']},
  /* trail 2: the passports */
  {thread:2, goal:() => got('key') || S.keyTaken, tips:['Passports are kept somewhere safe. Somewhere with a lock.', 'Dad’s desk drawer has a keyhole. The keys hang on hooks beside the window.', 'Tap the hooks by the living-room window and take the key whose tag says DESK.']},
  {thread:2, goal:() => S.drawerStuck, tips:['You have the desk key. Try it in the drawer.', 'Tap the desk key in the strip, then Dad’s desk drawer.', 'Use the key on the drawer, then take hold of the handle and pull.']},
  {thread:2, goal:() => S.mumTip, tips:['The drawer is stuck. Someone in this flat will know the trick.', 'Ask Mum. She is in the kitchen.', 'Tap Mum in the kitchen.']},
  {thread:2, goal:() => got('passports') || packed('passports'), tips:['Mum said: lift it up a little while you pull.', 'Back at Dad’s desk drawer: drag the front up a little, and keep hold.', 'Tap the drawer, drag the front up a finger’s width, then, still holding, drag it down and out.']},
  /* trail 3: the present */
  {thread:3, goal:() => S.postcardRead, tips:['What would Nana like? Her postcard might say.', 'Nana’s postcard is on the fridge in the kitchen.', 'Tap the postcard on the fridge and read the P.S.']},
  {thread:3, goal:() => got('kaya') || got('wrapped') || got('present') || packed('present'), tips:['Nana has run out of kaya.', 'Kaya is a jam. Where are the jars kept?', 'Tap the cupboard by the kitchen sink and take the kaya.']},
  {thread:3, goal:() => got('wrapped') || got('present') || packed('present'), tips:['A present should be wrapped.', 'There is a roll of moth paper on Dad’s desk.', 'Take the paper from Dad’s desk, then tap the paper in the strip and tap the kaya.']},
  {thread:3, goal:() => got('present') || packed('present'), tips:['The paper springs open. It needs tape.', 'Your pencil case on your desk has sticky tape in it.', 'Take the tape from your pencil case, tap it in the strip, then tap the half-wrapped present.']},
  {goal:() => PACK.every(packed), tips:['Everything on the list goes in the suitcase.', 'The suitcase is open on your bed.', 'Tap each thing in the strip, then tap the suitcase.']},
  {goal:() => S.done, tips:['Everything is in. Now the suitcase has to be shut.', 'Tap the suitcase, then pull the zip across with your finger.', 'Tap the suitcase, take hold of the zip pull and drag it all the way round to the right corner.']}
];
const THREADS = {1:['Find the torch', 'torch', ['', 'postcard read', 'Elliot’s note read', 'password seen', 'fort open']],
  2:['Find the passports', 'passports', ['', 'desk key found', 'drawer stuck', 'Mum’s tip']],
  3:['Nana’s present', 'present', ['', 'postcard read', 'kaya found', 'half wrapped']]};
const speaker = () => 'The moth whispers';

/* ---------- close-ups ---------- */
function openHooks(){
  const tags = [['DESK', 35.5, 31, 40], ['POST', 50.5, 46, 55], ['BIKE', 63.5, 59, 68]];
  const words = tags.map(([w, cx]) => `<text x="${cx*12.8}" y="${71*7.2}" text-anchor="middle" font-size="46" font-family="Atkinson Hyperlegible,Verdana,sans-serif" font-weight="700" fill="#4a3b2a" transform="rotate(-2 ${cx*12.8} ${71*7.2})">${w}</text>`).join('');
  const btns = tags.map(([w, cx, x0, x1], i) => `<button class="book" data-i="${i}" style="left:${x0-2}%;top:32%;width:${x1-x0+4}%;height:56%" aria-label="${w} key"><span></span></button>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="hooks" style="background-image:url(${A}closeup-hooks.jpg?v=${BUILD})"><svg viewBox="0 0 1280 720" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">${words}</svg><p class="otitle">Keys on hooks</p>${btns}</div><div class="shelffoot"><p class="ofb" id="hookFb">Three keys, three tags. Which one is for the desk?</p></div></div>`);
  $('hooks').querySelectorAll('.book').forEach(b => b.onclick = () => { const i = +b.dataset.i; sfx('tick');
    if (i === 0){ S.keyTaken = true; S.got.push('key'); sfx('pickup'); closeCloseup(); render(); say('The desk key. It goes in the strip below.'); }
    else $('hookFb').textContent = i === 1 ? 'POST: the letterbox key. Not today.' : 'BIKE: the key to Dad’s bike lock. Not today.'; });
}
/* Dad's desk drawer, worked by hand beside the room (playbook 4j and backlog 12): the front is a cut-out over the empty cavity.
   A straight pull jams; lift it a little first, then pull, and the passports come out. Mum's tip says so, but a player who
   tries it before asking her is simply right. Once emptied, a tap slides the drawer shut or open again (backlog 15). */
function openDrawer(h){
  const side = sideAwayFrom(h || HOTS.l1.find(x => x.id === 'l_drawer'));
  if (!S.keyTurned){ openAside(`<div class="card shelf"><div class="shelfpic" style="background-image:url(${A}closeup-drawer.jpg?v=${BUILD})"><p class="otitle">Dad’s desk drawer</p></div><div class="shelffoot"><p class="ofb">Locked. A small keyhole.</p></div></div>`, side); return; }
  if (S.passportsOut){ /* empty: open or shut on a tap */
    const open = !!S.drawerOpen;
    openAside(`<div class="card shelf"><div class="shelfpic hands" id="hands" style="background-image:url(${A}closeup-drawer-open.jpg?v=${BUILD})"><span class="part" id="front" style="left:3%;top:27%;width:94%;transform-origin:50% 0;transform:${open ? 'translateY(22%) scale(1.16)' : 'none'};transition:transform .35s ease-out"><img src="${A}layer-drawerfront.png?v=${BUILD}" alt=""></span><p class="otitle">Dad’s desk drawer</p></div><div class="shelffoot"><p class="ofb" id="handsFb">${open ? 'Empty now, except for paperclips. Tap to slide it shut.' : 'Shut. Tap to slide it open.'}</p></div></div>`, side);
    $('hands').onclick = () => { S.drawerOpen = !S.drawerOpen; save(); sfx(S.drawerOpen ? 'open' : 'knock'); rasp(0.5); $('front').style.transform = S.drawerOpen ? 'translateY(22%) scale(1.16)' : 'none'; $('handsFb').textContent = S.drawerOpen ? 'Empty now, except for paperclips. Tap to slide it shut.' : 'Shut. Tap to slide it open.'; };
    return;
  }
  openLiftPull({side, title:'Dad’s desk drawer', bg:A+'closeup-drawer-open.jpg', front:{src:A+'layer-drawerfront.png', l:3, t:27, w:94}, inside:{src:A+'layer-passports.png', l:40, t:27, w:18},
    label:S.mumTip ? 'Mum said: lift it up a little while you pull.' : 'Unlocked. Take hold of the handle and pull.',
    stuckLabel:'Stuck! It jams after a finger’s width.' + (S.mumTip ? ' Lift it up a little first.' : ' Someone must know the trick.'),
    liftedLabel:'It lifts a little… now pull.', doneLabel:'Lift, pull… and out it comes!',
    stuck:() => { if (!S.drawerStuck){ S.drawerStuck = true; save(); } },
    done:() => { S.passportsOut = true; S.drawerOpen = true; S.got.push('passports'); save(); render(); say('Lift, pull… and out it comes. The passports! They go in the strip below.'); }});
}
let pressed = [];
function openFort(){
  pressed = [];
  const flap = [['moon', 31, 44, 38, 57], ['sun', 41, 46, 48, 59], ['cloud', 51, 47, 58, 60], ['star', 61, 44, 68, 56]];
  const btns = flap.map(([n, x0, y0, x1, y1]) => `<button class="bar sym" data-n="${n}" style="left:${x0-1}%;top:${y0-2}%;width:${x1-x0+2}%;height:${y1-y0+4}%" aria-label="${n}">${symSVG(n)}</button>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="fort" style="background-image:url(${A}closeup-fort.jpg?v=${BUILD})"><svg viewBox="0 0 1280 720" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true"><text x="640" y="150" text-anchor="middle" font-size="62" font-family="Caprasimo,Georgia,serif" fill="#d9453d" transform="rotate(-2 640 150)">SECRET BASE</text><text x="640" y="215" text-anchor="middle" font-size="40" font-family="Atkinson Hyperlegible,Verdana,sans-serif" fill="#2f5f8a">password, then knock</text></svg>${btns}<p class="otitle">Elliot’s fort</p></div><div class="shelffoot"><div class="row spellrow"><p class="tune" id="pw"></p><button class="ob quiet" id="pwReset">Start again</button><button class="ob" id="knock">Knock</button></div><p class="ofb" id="fortFb">Press the password, then knock.</p></div></div>`);
  const show = () => { $('pw').innerHTML = [0,1,2].map(i => pressed[i] ? `<span class="dot sym">${symSVG(pressed[i])}</span>` : '<span class="dot"></span>').join(''); };
  show();
  $('fort').querySelectorAll('.sym').forEach(b => b.onclick = () => { if (pressed.length >= 3) return; pressed.push(b.dataset.n); sfx('tick'); b.classList.add('hit'); setTimeout(() => b.classList.remove('hit'), 180); show(); });
  $('pwReset').onclick = () => { pressed = []; show(); $('fortFb').textContent = 'Press the password, then knock.'; };
  $('knock').onclick = () => { sfx('knock');
    if (pressed.join() === CODE.join()){ S.fortOpen = true; save(); sfx('pickup'); $('fortFb').textContent = '“Password correct,” says the fort, in Elliot’s voice. The flap lifts.'; setTimeout(() => { closeCloseup(); render(); openInFort(); }, 1200); }
    else { $('fortFb').textContent = pressed.length < 3 ? 'Three symbols make the password.' : '“Wrong password!” says a voice from inside. Start again.'; pressed = []; show(); } };
}
function openInFort(){
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background-image:url(${A}closeup-infort.jpg?v=${BUILD})"><p class="otitle">Inside the fort</p><button class="book" id="fortTorch" style="left:46%;top:57%;width:17%;height:17%" aria-label="Torch"><span></span></button></div><div class="shelffoot"><p class="ofb">A cushion, comics, a dinosaur… and the torch. Tap it.</p></div></div>`);
  $('fortTorch').onclick = () => { S.got.push('torch'); sfx('pickup'); closeCloseup(); render(); say('The torch! Click: it works. It goes in the strip below.'); };
}
function openJars(){
  const jars = [['JAM', 27], ['PEANUT', 43], ['KAYA', 59], ['HONEY', 75]];
  const words = jars.map(([w, cx]) => `<text x="${cx*12.8}" y="${72*7.2}" text-anchor="middle" font-size="${w.length > 4 ? 34 : 40}" font-family="Atkinson Hyperlegible,Verdana,sans-serif" font-weight="700" fill="#4a3b2a">${w}</text>`).join('');
  const btns = jars.map(([w, cx], i) => `<button class="book" data-i="${i}" style="left:${cx-8}%;top:48%;width:16%;height:40%" aria-label="${w}"><span></span></button>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="jars" style="background-image:url(${A}closeup-jars.jpg?v=${BUILD})"><svg viewBox="0 0 1280 720" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">${words}</svg><p class="otitle">The jar cupboard</p>${btns}</div><div class="shelffoot"><p class="ofb" id="jarFb">Four jars. Nana has run out of one of them.</p></div></div>`);
  $('jars').querySelectorAll('.book').forEach(b => b.onclick = () => { const i = +b.dataset.i; sfx('tap');
    if (i === 2){ if (S.kayaTaken){ $('jarFb').textContent = 'You have the kaya already.'; return; } S.kayaTaken = true; S.got.push('kaya'); sfx('pickup'); closeCloseup(); render(); say('A brand-new jar of kaya. Nana will be thrilled. It goes in the strip below.'); }
    else $('jarFb').textContent = ['Jam. Nice, but Nana didn’t ask for jam.', 'Peanut butter. Elliot’s. Do not touch.', 'Honey. Nana has bees next door.'][i === 3 ? 2 : i]; });
}
function openDrawing(){
  S.drawingSeen = true; save();
  const overlay = `<svg viewBox="0 0 100 84" style="position:absolute;inset:0;width:100%;height:100%" preserveAspectRatio="none" aria-hidden="true">${DRAW_SQ.map(([x0, y0, x1, y1], i) => `<g transform="translate(${x0+1.5} ${y0*0.84+1.5}) scale(${(x1-x0-3)/100} ${(y1-y0)*0.84/100 - 0.03})">${SYM[CODE[i]]}</g>`).join('')}</svg>`;
  openPic(A+'layer-drawing.png', '881/742', 'Elliot’s drawing', overlay, 52);
  say('Elliot’s base, and Elliot. On the door: sun, star, moon. That’ll be the password.');
}
function suitcaseTap(){
  if (S.done){ say('Packed, zipped and ready.'); return; }
  const missing = PACK.filter(k => !packed(k));
  if (!missing.length){ if (!S.zipped){ openZip(); return; } S.done = true; save(); sfx('pickup'); say('Zip! And a horn outside: “Taxi’s here!” calls Mum.');
    setTimeout(() => showEnd('Taxi’s here!', 'Packed! The torch was in Elliot’s secret base (password: sun, star, moon), the passports were in Dad’s stuck drawer (Mum knew the trick), and I wrapped a jar of kaya for Nana in the moth paper. Fourteen hours to London. Elliot has his dinosaur, Zaina has Peanut, and I have my jumper on top.', S.moths.length === 6 ? 'I found all six paper moths in the flat! ★' : `I found ${S.moths.length} of the six paper moths hidden in the flat.`), 800); return; }
  say('The suitcase, open on the bed. Still to pack: ' + missing.map(k => ITEMS[k].name).join(', ') + '.');
}
/* the last thing: the lid comes down and the zip must be pulled across by hand, from the left corner round to the right */
function openZip(){
  openDrag({pic:A+'closeup-suitcase.jpg', title:'Zip it shut', tab:A+'layer-zip.png', tabW:4.2, tabRatio:'99/300', path:[[16,41],[29,64],[84,46]],
    label:'Everything’s in. Pull the zip all the way across.', missLabel:'Take hold of the zip pull first.', moreLabel:'Keep pulling, right to the corner.', doneLabel:'Zzzzip!',
    done:() => { S.zipped = true; save(); render(); suitcaseTap(); }});
}
function pack(key){ return () => { drop(key); S.packed.push(key); save(); render(); sfx('pickup'); animate({anim:'lift', layer:'in'+key}); const missing = PACK.filter(k => !packed(k)); say(missing.length ? `In it goes. Still to pack: ${missing.map(k => ITEMS[k].name).join(', ')}.` : 'That’s everything on the list! Tap the suitcase and zip it shut.'); }; }
const USES = {
  'torch>b_case':pack('torch'), 'passports>b_case':pack('passports'), 'present>b_case':pack('present'), 'jumper>b_case':pack('jumper'),
  'kaya>b_case':() => { sfx('knock'); say('Not like that! A present should be wrapped first.'); },
  'wrapped>b_case':() => { sfx('knock'); say('It springs open again. It needs tape.'); },
  'key>l_drawer':h => { S.keyTurned = true; drop('key'); save(); render(); sfx('tick'); say('The key turns with a click. Now pull.'); setTimeout(() => openDrawer(h), 500); },
  'key>l_desk':() => { S.keyTurned = true; drop('key'); save(); render(); sfx('tick'); say('The key turns in the drawer with a click. Now pull.'); setTimeout(openDrawer, 500); },
  'key>l_front':() => { sfx('knock'); say('Not the front door key. And nobody goes out without Mum.'); },
  'paper>item:kaya':wrapKaya, 'kaya>item:paper':wrapKaya,
  'tape>item:wrapped':tapeIt, 'wrapped>item:tape':tapeIt,
  'tape>item:kaya':() => { sfx('knock'); say('Tape on a bare jar? Wrap it in the paper first.'); },
  'torch>k_mum':() => { sfx('tap'); say('“Found it! Well done. Into the suitcase with it.”'); },
  'kaya>k_mum':() => { sfx('tap'); say('“For Nana? Perfect. Wrap it nicely, there’s paper on Dad’s desk.”'); }
};
function wrapKaya(){ drop('paper'); drop('kaya'); S.paperGone = true; S.got.push('wrapped'); save(); render(); sfx('paper'); say('Fold, fold, tuck… and it springs open again. It needs tape.'); }
function tapeIt(){ drop('tape'); drop('wrapped'); S.tapeGone = true; S.got.push('present'); save(); render(); sfx('pickup'); say('Taped! Nana’s present, wrapped in moths.'); }

function act(id){
  switch(id){
    /* bedroom */
    case 'b_bed': say('Your bed, made for once, with the suitcase on it.'); break;
    case 'b_case': suitcaseTap(); return;
    case 'b_shelf': say('Three books for the plane. Fourteen hours is a lot of pages.'); break;
    case 'b_list': S.listRead = true; save(); openNote('list'); return;
    case 'b_basket': say('The laundry basket. Nothing in it goes to London.'); break;
    case 'b_window': say('Rain, rain, rain. In London it will be… also rain, says Nana.'); break;
    case 'b_mug': say('Pencils. Mary is taking three, in case.'); break;
    case 'b_desk': say(S.tapeGone || got('tape') ? 'Your desk, cleared for the summer.' : 'Your desk. Your pencil case is on it.'); break;
    case 'b_pencilcase': S.got.push('tape'); sfx('pickup'); render(); say('Sticky tape, from the pencil case. It goes in the strip below.'); return;
    case 'b_wardrobe': say(got('jumper') || packed('jumper') ? 'The wardrobe. Summer things only, now.' : 'The wardrobe. One jumper left on the rail: nobody goes home without their jumper.'); break;
    case 'b_jumper': S.got.push('jumper'); sfx('pickup'); render(); say('Your purple jumper. Mum said something warm for the plane.'); return;
    /* living room */
    case 'l_window': say('Rain on the window and a plane climbing through it. Tomorrow, that’s you.'); break;
    case 'l_desk': say(S.keyTurned ? 'Dad’s desk. The drawer is unlocked now.' : 'Dad’s desk. One drawer, with a little keyhole.'); break;
    case 'l_drawer': if (S.keyTurned) openDrawer(); else say('Locked. A small keyhole. The keys hang by the window.'); return;
    case 'l_paper': S.paperGone = true; S.got.push('paper'); sfx('pickup'); render(); say('A roll of wrapping paper covered in little moths. It goes in the strip below.'); return;
    case 'l_hooks': if (S.keyTaken) say('Two keys left: POST and BIKE.'); else openHooks(); return;
    case 'l_shelf': say('Books, a snow globe and an orchid.'); break;
    case 'l_globe': say('A durian in a snow globe. Dad’s, and Dad’s favourite. Not a present for Nana.'); break;
    case 'l_orchid': say('Mum’s orchid. It would not survive fourteen hours in a suitcase.'); break;
    case 'l_sofa': say('The sofa. Something papery is stuck underneath it, but Mary is packing.'); break;
    case 'l_tv': say('Off. Nobody watches the TV on packing day.'); break;
    case 'l_front': say('The front door. Nobody goes out until the taxi.'); break;
    case 'l_cabinet': say('The hall cabinet, with the drawer where the torch lives.'); break;
    case 'l_halldrawer':
      if (!S.postcardRead){ say('The hall drawer. Batteries, string, and no torch. Odd.'); break; }
      S.ehnoteRead = true; save(); openNote('ehnote'); say('No torch. Just a note in crayon.'); return;
    case 'l_fort':
      if (S.fortOpen){ if (got('torch') || packed('torch')) say('Elliot’s fort. A cushion, comics and a dinosaur. Password: still sun, star, moon.'); else openInFort(); return; }
      if (!S.ehnoteRead){ say('Elliot’s fort under the table. SECRET BASE, says the sign. It has a password, and Mary does not know it.'); break; }
      openFort(); return;
    case 'l_photos': say('Nana and Jedi on the beach; the three of you at the zoo; Mum and Dad, younger. One frame sits a little crooked.'); break;
    /* kitchen */
    case 'k_counter': say('Toast, a jar and crumbs. Mum’s kaya toast, the last of the kaya.'); break;
    case 'k_cupboards': say('Plates, cups and the good bowls.'); break;
    case 'k_hob': say('Off. Mum makes toast, not fires.'); break;
    case 'k_toaster': say('Warm. Someone has just made toast.'); break;
    case 'k_mum':
      if (S.done) say('“Ready? Let’s go!”');
      else if (S.drawerStuck && !S.mumTip){ S.mumTip = true; save(); say('“That drawer! It always jams. Lift it up a little while you pull.”'); }
      else if (S.mumTip && !(got('passports') || packed('passports'))) say('“Lift it up a little while you pull, love.”');
      else say('“Nearly done, love. Have you got everything on the list?”');
      break;
    case 'k_cupboardtall': say('The tall cupboard: the broom’s cupboard, the mop’s cupboard, nothing for London.'); break;
    case 'k_fridge': say('The fridge. Nana’s postcard and Elliot’s drawing are on it.'); break;
    case 'k_postcard': S.postcardRead = true; save(); openNote('postcard'); return;
    case 'k_drawing': openDrawing(); return;
    case 'k_calendar': say('The calendar. Today is circled in red: FLIGHT, 14 hrs.'); break;
    case 'k_bin': say('The pedal bin. Nothing in it is going to London either.'); break;
    case 'k_broom': say('The broom. It leans.'); break;
    case 'k_window': say('Rain over the car park. The taxi will be wet.'); break;
    case 'k_fruit': say('Apples and a banana for the journey.'); break;
    case 'k_sink': say('The sink, with one spoon of kaya in it.'); break;
    case 'k_jars': openJars(); return;
    default:
      if (/^[blk]_moth\d$/.test(id)){ const n = +id.slice(-1); S.moths.push(n); save(); sfx('pickup'); setTimeout(render, 900); say(`A paper moth! ${S.moths.length} of 6.` + (S.moths.length === 6 ? ' That’s all of them. ★' : '')); return; }
      return false;
  }
}
function rows(){
  const out = [];
  if (!S.listRead) out.push([0, 'What does Mum want packed?', 'not yet', false]);
  else {
    Object.entries(THREADS).forEach(([th, [label, item, steps]]) => {
      const idx = HINTS.map((h, k) => h.thread == th && !h.goal() ? k : -1).filter(k => k >= 0);
      const done = got(item) || packed(item), p = steps.length - idx.length;
      out.push([done ? -1 : idx[0], label, packed(item) ? '✓ packed' : done ? '✓ found' : (steps[p] || 'not started'), done]);
    });
    if (PACK.every(k => got(k) || packed(k))) out.push([HINTS.findIndex(h => !h.thread && !h.goal()), 'Everything into the suitcase', S.done ? '✓ zipped' : PACK.every(packed) ? 'zip it shut' : `${PACK.filter(packed).length} of 3 packed`, S.done]);
  }
  return out;
}
function noticed(){
  const n = [];
  if (S.drawingSeen) n.push('Elliot’s password: sun, star, moon.');
  if (S.mumTip) n.push('Mum: lift the drawer a little while you pull.');
  n.push(`Paper moths found: ${S.moths.length} of 6.`);
  return n;
}
function sparkle(id){
  if (id === 'b_list') return !S.listRead;
  if (id === 'b_case') return PACK.some(got);
  if (id === 'b_pencilcase' || id === 'b_jumper' || id === 'l_paper') return true;
  if (id === 'l_hooks') return !S.keyTaken;
  if (id === 'l_drawer') return S.keyTurned && !S.passportsOut && S.mumTip;
  if (id === 'l_halldrawer') return S.postcardRead && !S.ehnoteRead;
  if (id === 'l_fort') return (S.ehnoteRead && !S.fortOpen) || (S.fortOpen && !got('torch') && !packed('torch'));
  if (id === 'k_mum') return S.drawerStuck && !S.mumTip;
  if (id === 'k_postcard') return !S.postcardRead;
  if (id === 'k_drawing') return S.ehnoteRead && !S.drawingSeen;
  if (id === 'k_jars') return S.postcardRead && !S.kayaTaken;
  return false;
}
return {
  card:{place:'SINGAPORE · LATER THAT AFTERNOON', text:'Rain on the windows and the taxi at four. Mum has stuck a list on Mary’s bedroom door: three things that must not be forgotten.'},
  meanwhile:'Meanwhile, at home, the taxi is at four and Mary’s suitcase is still open on the bed.',
  postcard:{pic:'../art/postcards/flat.jpg'},
  title:'Packing day', blurb:"Packing day at home: Mary's room, the living room and the kitchen. The taxi is at four.",
  track:'../art/music/flat.mp3', ambient:'rain', next:null,
  intro:'<b>Packing day.</b> Rain outside, the taxi at four, and a list from Mum on the wall by your door.',
  start:{room:'bedroom', view:0},
  fresh:() => ({packed:[], moths:[], zipped:false, listRead:false, postcardRead:false, ehnoteRead:false, drawingSeen:false, fortOpen:false, keyTaken:false, keyTurned:false, drawerStuck:false, drawerOpen:false, mumTip:false, passportsOut:false, kayaTaken:false, paperGone:false, tapeGone:false}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, extra:EXTRA, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES,
  act, sparkle, rows, noticed, speaker, helper:() => 'the moth'
};
})());
