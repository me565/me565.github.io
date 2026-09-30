/* The Moth House, landscape engine: Zaina's stage 1, the goodbye party at Little Waves Kindergarten.
   One square room, nothing to read: her mark is a yellow star. Every line is spoken by the moth, and a hint is the moth flying to the
   thing to tap (hintStyle 'point'); see STORY.md and next/PLAYBOOK.md. Registered with the engine in index.html. */
'use strict';
registerStage('zschool', (function(){
const A = '../art/zaina/';
const ROOMS = {kindy:{name:'Little Waves', into:'the party room', views:['z1', 'z2', 'z3', 'z4']}};
const WALLS = {z1:A+'z1.jpg', z2:A+'z2.jpg', z3:A+'z3.jpg', z4:A+'z4.jpg'};
const DOORS = {};
const got = k => S.got.includes(k);
const put = k => S.put.includes(k);
const MARKS = ['triangle', 'circle', 'heart', 'star', 'square']; /* the five cubbies' marks; Zaina's is the star, the fourth */
const ZC = 3;
const CUBBY_X = [11, 18.3, 25.6, 33, 40.3]; /* the left edge of each cubby door on the wall */
const HOTS = {
  z1:[
    {id:'z_cubbies', l:10, t:57, w:39, h:32, label:'The cubbies', sound:'knock'},
    ...CUBBY_X.map((x, i) => ({id:'z_cubby'+i, l:x, t:66, w:6.6, h:18, label:i === ZC ? 'Zaina’s cubby, with the yellow star' : 'A cubby with a ' + MARKS[i], sound:'knock', key:i === ZC})),
    {id:'z_shelf', l:12, t:30, w:34, h:16, label:'The shelf of water bottles', sound:'tap', key:true}],
  z2:[
    {id:'z_line', l:14, t:28, w:72, h:28, label:'The drying line of paintings', sound:'paper', key:true},
    {id:'z_paints', l:23, t:79, w:18, h:12, label:'Pots of paint', sound:'tap'},
    {id:'z_window', l:90, t:12, w:10, h:55, label:'The window', sound:'tap'}],
  z3:[
    {id:'z_poster', l:37, t:24, w:27, h:22, label:'The goodbye-song poster', sound:'paper'},
    {id:'z_shelf3', l:31, t:53, w:38, h:34, label:'The music shelf', sound:'knock', key:true},
    {id:'z_rug', l:14, t:84, w:72, h:16, label:'The rug', sound:'leaf'}],
  z4:[
    {id:'z_bunting', l:12, t:15, w:76, h:25, label:'Bunting', sound:'leaf'},
    {id:'z_table', l:33, t:60, w:34, h:28, label:'The party table', sound:'knock'},
    {id:'z_cake', l:45, t:48, w:11, h:20, label:'The cake', sound:'leaf'},
    {id:'z_cups', l:36, t:56, w:8, h:12, label:'Paper cups', sound:'tap'},
    {id:'z_fruit', l:56, t:58, w:9, h:9, label:'Fruit', sound:'leaf'},
    {id:'z_cushion', l:10, t:75, w:26, h:16, label:'The pink cushion', sound:'leaf'},
    {id:'z_peanut', l:15.5, t:63, w:10, h:16, label:'Peanut, Zaina’s elephant', sound:'leaf', anim:'hop', layer:'peanut', key:true},
    {id:'z_misslin', l:68, t:55, w:10, h:35, label:'Miss Lin', sound:'leaf', anim:'wobble', layer:'misslin', key:true}]
};
const LAYERS = {
  z1:[{src:A+'layer-bottle.png', group:'bottle', l:22.3, t:30.2, w:2.4, h:10.3, shadow:.5, hideWhen:() => got('bottle') || put('bottle')},
      /* once put away, her things show inside her cubby */
      {src:A+'layer-painting.png', group:'inpainting', l:35.8, t:75.6, w:3.4, h:7.6, showWhen:() => put('painting')},
      {src:A+'layer-bottle.png', group:'inbottle', l:33.4, t:77, w:1.5, h:6.4, shadow:.4, showWhen:() => put('bottle')}],
  z2:[{src:A+'layer-painting.png', group:'painting', l:42.3, t:40.5, w:7.5, h:16.7, hideWhen:() => got('painting') || put('painting')}],
  z4:[{src:A+'layer-peanut.png', group:'peanut', l:16.5, t:64.5, w:7.2, h:14.1, shadow:.6}, {src:A+'layer-misslin.png', group:'misslin', l:70, t:57.3, w:6, h:30.7, shadow:.5}]
};
const EXTRA = {kindy:[A+'closeup-bottles.jpg', A+'closeup-paintings.jpg', A+'closeup-instruments.jpg', A+'poster.jpg', A+'layer-sticker.png']};
/* Zaina's mark and her portrait, drawn on her cubby; the other cubbies get their marks */
function cubbyOverlay(){
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); el.setAttribute('viewBox', '0 0 1600 900'); el.setAttribute('aria-hidden', 'true');
  el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
  const SH = {triangle:'<path d="M50 12 92 84 8 84Z" fill="#7cc47a" stroke="#2f6b3a" stroke-width="7" stroke-linejoin="round"/>', circle:'<circle cx="50" cy="50" r="36" fill="#5b9bd5" stroke="#2f5f8a" stroke-width="7"/>', heart:'<path d="M50 88 14 52a20 20 0 0 1 36-24 20 20 0 0 1 36 24Z" fill="#e5533d" stroke="#8a2a1a" stroke-width="7" stroke-linejoin="round"/>', star:'<path d="M50 6 62 38 96 38 68 58 79 92 50 71 21 92 32 58 4 38 38 38Z" fill="#f2c53d" stroke="#8a5a1a" stroke-width="7" stroke-linejoin="round"/>', square:'<rect x="14" y="14" width="72" height="72" rx="8" fill="#5b9bd5" stroke="#2f5f8a" stroke-width="7"/>'};
  /* the round marks on the doors are at y 70–74; each mark is drawn centred on its door's circle */
  el.innerHTML = CUBBY_X.map((x, i) => { const cx = (x + 3.3)*16, cy = 72*9, s = 3.2*9; return `<g transform="translate(${cx - s/2} ${cy - s/2}) scale(${s/100})">${SH[MARKS[i]]}</g>`; }).join('')
    + `<image href="../art/portraits/zaina.png?v=${BUILD}" x="${(CUBBY_X[ZC] + 0.6)*16}" y="${77.5*9}" width="${5.4*16}" height="${5.4*16}" preserveAspectRatio="xMidYMid meet"/>`;
  return el;
}

/* every line in this stage is spoken: the text is shown too, and the moth says it (key zschool.line.<name>) */
const LINES = {
  cubbies:'Everyone has a cubby. Yours has the yellow star.',
  cubbyMine:'Your cubby! The yellow star. Your bottle and your painting go in here.',
  cubbyOther:'Not that one. Look for the yellow star.',
  cubbyFull:'Your bottle and your painting, safe in your cubby.',
  shelf:'The bottles are up on the shelf. Which one is yours?',
  shelfEmpty:'Only the other children’s bottles now.',
  bottleWrong:'Not that one. Yours has the yellow star.',
  bottleMine:'The yellow star! That’s your bottle. Now put it in your cubby.',
  line:'Paintings on the line. Which one is yours?',
  lineEmpty:'Only the other children’s paintings now.',
  paintingWrong:'Not that one. Yours has the yellow star in the corner.',
  paintingMine:'The star! That’s your painting: the sun and the elephant. Now put it in your cubby.',
  paints:'Red, blue and yellow. All the colours you need.',
  window:'Sunshine outside. Mummy is coming soon.',
  poster:'The goodbye song! Drum, shaker, bell, xylophone. Play them in that order.',
  shelf3:'Drum, shaker, bell, xylophone. Look at the poster and play them in order.',
  songNotYet:'Not that one yet. Look at the poster.',
  songDone:'That’s the goodbye song! Everyone claps.',
  songAgain:'You played the goodbye song. Lovely.',
  rug:'The story rug. No story today, it’s party day.',
  bunting:'Flags! Red, yellow and blue.',
  table:'The party table. Cake for later.',
  cake:'The cake! Three candles. Not yet.',
  cups:'Cups for juice.',
  fruit:'Apples, an orange and a banana.',
  cushion:'The pink cushion. Peanut’s spot.',
  peanut:'Peanut says: follow me!',
  misslinWait:'Miss Lin is busy with the party. Bottle, painting and the song first.',
  misslinDone:'Miss Lin turns round. “Zaina! All done? Then this is for you.”',
  sticker:'A shiny moth sticker! For being a star.',
  putBottle:'In it goes. Your bottle, in your cubby.',
  putPainting:'In it goes. Your painting, in your cubby.',
  wrongPlace:'Not there. It goes in your cubby, with the star.'
};
const L = k => line(k, LINES[k]);
const ITEMS = {
  bottle:{name:'your bottle', icon:`<img src="${A}layer-bottle.png" alt="">`},
  painting:{name:'your painting', icon:`<img src="${A}layer-painting.png" alt="">`}
};
const NOTES = {};
/* pointed hints: the moth flies to the thing and says one line; each is where to look next */
const HINTS = [
  {goal:() => got('bottle') || put('bottle'), at:{room:'kindy', view:0, id:'z_shelf'}, tips:['Your bottle is on the shelf. Find the yellow star!']},
  {goal:() => put('bottle'), at:{room:'kindy', view:0, id:'z_cubby3'}, tips:['Put it in your cubby: the one with the yellow star.']},
  {goal:() => got('painting') || put('painting'), at:{room:'kindy', view:1, id:'z_line'}, tips:['Your painting is on the line. Which one has the star?']},
  {goal:() => put('painting'), at:{room:'kindy', view:0, id:'z_cubby3'}, tips:['Pop it in your cubby, with the star.']},
  {goal:() => S.song, at:{room:'kindy', view:2, id:'z_shelf3'}, tips:['Play the goodbye song! Drum, shaker, bell, xylophone.']},
  {goal:() => S.done, at:{room:'kindy', view:3, id:'z_misslin'}, tips:['All done! Go and see Miss Lin.']}
];
const speaker = () => 'The moth';

/* ---------- close-ups ---------- */
function openBottles(){
  const bots = [['triangle', 5], ['star', 28], ['heart', 50], ['circle', 73]]; /* left to right in the close-up */
  const btns = bots.map(([m, l], i) => `<button class="book" data-i="${i}" style="left:${l}%;top:24%;width:20%;height:62%" aria-label="Bottle with a ${m}"><span></span></button>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="botpic" style="background-image:url(${A}closeup-bottles.jpg?v=${BUILD})">${got('bottle') || put('bottle') ? '' : btns}<p class="otitle">The bottle shelf</p></div><div class="shelffoot"><p class="ofb" id="botFb">${got('bottle') || put('bottle') ? LINES.shelfEmpty : LINES.shelf}</p></div></div>`);
  $('botpic').querySelectorAll('.book').forEach(b => b.onclick = () => { const i = +b.dataset.i; sfx('tap');
    if (i === 1){ S.got.push('bottle'); sfx('pickup'); closeCloseup(); render(); L('bottleMine'); }
    else { $('botFb').textContent = LINES.bottleWrong; L('bottleWrong'); } });
}
function openPaintings(){
  const pics = [[2, 32, 24, 42], [27, 38, 26, 47], [55, 32, 24, 43], [79, 32, 19, 40]]; /* left, top, width, height: rainbow, Zaina's, cat, flower */
  const btns = pics.map(([l, t, w, h], i) => `<button class="book" data-i="${i}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%" aria-label="${['Painting of a rainbow', 'Painting with the yellow star', 'Painting of a cat', 'Painting of a flower'][i]}"><span></span></button>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="paintpic" style="background-image:url(${A}closeup-paintings.jpg?v=${BUILD})">${got('painting') || put('painting') ? '' : btns}<p class="otitle">The drying line</p></div><div class="shelffoot"><p class="ofb" id="paintFb">${got('painting') || put('painting') ? LINES.lineEmpty : LINES.line}</p></div></div>`);
  $('paintpic').querySelectorAll('.book').forEach(b => b.onclick = () => { const i = +b.dataset.i; sfx('paper');
    if (i === 1){ S.got.push('painting'); sfx('pickup'); closeCloseup(); render(); L('paintingMine'); }
    else { $('paintFb').textContent = LINES.paintingWrong; L('paintingWrong'); } });
}
const SONG = ['drum', 'shaker', 'bell', 'xylophone'];
let played = [];
function playInst(k){
  if (k === 'drum'){ sfx('knock'); rasp(0); }
  else if (k === 'shaker'){ rasp(2); setTimeout(() => rasp(2), 120); }
  else if (k === 'bell') chime(1568);
  else { chime(1046.5); setTimeout(() => chime(1318.5), 140); setTimeout(() => chime(1568), 280); }
}
function openInstruments(){
  played = [];
  const inst = [['drum', 10, 46, 26, 32], ['shaker', 32, 54, 20, 24], ['bell', 52, 36, 16, 40], ['xylophone', 67, 56, 31, 24]];
  const btns = inst.map(([k, l, t, w, h]) => `<button class="book inst" data-k="${k}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%" aria-label="${k}"><span></span></button>`).join('');
  const dots = () => SONG.map((k, i) => `<span class="dot${played[i] ? ' on' : ''}"></span>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="instpic" style="background-image:url(${A}closeup-instruments.jpg?v=${BUILD})"><img class="poster" src="${A}poster.jpg?v=${BUILD}" alt="The poster: drum, shaker, bell, xylophone">${btns}<p class="otitle">The music corner</p></div><div class="shelffoot"><div class="row spellrow"><p class="tune" id="songDots">${dots()}</p></div><p class="ofb" id="instFb">${S.song ? LINES.songAgain : LINES.shelf3}</p></div></div>`);
  $('instpic').querySelectorAll('.inst').forEach(b => b.onclick = () => { const k = b.dataset.k; playInst(k); b.classList.add('hit'); setTimeout(() => b.classList.remove('hit'), 200);
    if (S.song) return;
    if (k === SONG[played.length]){ played.push(k); $('songDots').innerHTML = dots();
      if (played.length === SONG.length){ S.song = true; save(); sfx('pickup'); $('instFb').textContent = LINES.songDone; L('songDone'); setTimeout(() => { closeCloseup(); render(); }, 1600); } }
    else { played = []; $('songDots').innerHTML = dots(); $('instFb').textContent = LINES.songNotYet; L('songNotYet'); } });
}
function allDone(){ return put('bottle') && put('painting') && S.song; }
function missLin(){
  if (S.done){ L('misslinDone'); return; }
  if (!allDone()){ L('misslinWait'); return; }
  S.done = true; save(); render(); sfx('pickup'); L('misslinDone');
  setTimeout(() => { openPic(A+'layer-sticker.png', '627/640', '', '', 34); L('sticker'); }, 1500);
  setTimeout(() => { closeCloseup(); showEnd('A star!', 'I found my bottle and my painting (they have my STAR on) and put them in my cubby, and I played the goodbye song on the drum and the shaker and the bell and the xylophone, and Miss Lin gave me a moth sticker. Peanut helped. (Miss Lin wrote this down for me.)'); }, 5200);
}
function putAway(k){ return () => { drop(k); S.put.push(k); save(); render(); sfx('pickup'); animate({anim:'lift', layer:'in'+k}); L(k === 'bottle' ? 'putBottle' : 'putPainting'); }; }
const USES = {'bottle>z_cubby3':putAway('bottle'), 'painting>z_cubby3':putAway('painting')};
function miss(item, id){ if (/^z_cubby\d$/.test(id)) L('cubbyOther'); else L('wrongPlace'); }
function act(id){
  switch(id){
    case 'z_cubbies': L('cubbies'); break;
    case 'z_shelf': openBottles(); return;
    case 'z_line': openPaintings(); return;
    case 'z_paints': L('paints'); break;
    case 'z_window': L('window'); break;
    case 'z_poster': L('poster'); break;
    case 'z_shelf3': openInstruments(); return;
    case 'z_rug': L('rug'); break;
    case 'z_bunting': L('bunting'); break;
    case 'z_table': L('table'); break;
    case 'z_cake': L('cake'); break;
    case 'z_cups': L('cups'); break;
    case 'z_fruit': L('fruit'); break;
    case 'z_cushion': L('cushion'); break;
    case 'z_peanut': L('peanut'); setTimeout(pointNext, 900); return;
    case 'z_misslin': missLin(); return;
    default:
      if (/^z_cubby\d$/.test(id)){ const i = +id.slice(-1); if (i === ZC) L(put('bottle') && put('painting') ? 'cubbyFull' : 'cubbyMine'); else L('cubbyOther'); return; }
      return false;
  }
}
function rows(){
  return [[put('bottle') ? -1 : 0, 'Find your bottle', put('bottle') ? '✓ in your cubby' : got('bottle') ? 'put it in your cubby' : 'not yet', put('bottle')],
    [put('painting') ? -1 : 2, 'Find your painting', put('painting') ? '✓ in your cubby' : got('painting') ? 'put it in your cubby' : 'not yet', put('painting')],
    [S.song ? -1 : 4, 'Play the goodbye song', S.song ? '✓ played' : 'not yet', S.song],
    [S.done ? -1 : 5, 'See Miss Lin', S.done ? '✓ a sticker!' : 'when the rest is done', S.done]];
}
function sparkle(id){
  if (id === 'z_shelf') return !got('bottle') && !put('bottle');
  if (id === 'z_line') return !got('painting') && !put('painting');
  if (id === 'z_cubby3') return (got('bottle') || got('painting'));
  if (id === 'z_shelf3') return put('bottle') && put('painting') && !S.song;
  if (id === 'z_misslin') return allDone() && !S.done;
  if (id === 'z_peanut') return !S.done;
  return false;
}
return {
  child:'zaina', hintStyle:'point', lines:LINES, miss,
  card:{place:'SINGAPORE · PARTY DAY', text:'Little Waves Kindergarten, with flags across the ceiling and a cake on the table. Zaina’s mark is a yellow star. Her bottle, her painting and the goodbye song, then Miss Lin has something shiny.'},
  meanwhile:'Meanwhile, at Little Waves, Zaina’s party is about to start.',
  postcard:{pic:'../art/postcards/zschool.jpg'},
  title:'Party day', blurb:'Zaina’s goodbye party at Little Waves. Find the things with her yellow star and play the goodbye song.',
  track:'../art/music/zschool.mp3', ambient:'school', next:null,
  intro:'<b>Party day!</b> Find your bottle and your painting, they have your yellow star. Then the goodbye song, then Miss Lin.',
  start:{room:'kindy', view:0},
  fresh:() => ({put:[], song:false}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, extra:EXTRA, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES, overlays:{z1:cubbyOverlay},
  act, sparkle, rows, noticed:() => [], speaker, helper:() => 'the moth'
};
})());
