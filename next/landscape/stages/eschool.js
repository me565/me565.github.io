/* The Moth House, landscape engine: Elliot's stage 1, the last day of school (Classroom 2P and the playground).
   Two rooms and two parallel trails: the marble run's three missing pieces, and his jumper in lost property; see STORY.md and next/PLAYBOOK.md.
   Registered with the engine in index.html. */
'use strict';
registerStage('eschool', (function(){
const A = '../art/elliot/';
const ROOMS = {
  classroom:{name:'Classroom 2P', into:'Classroom 2P', views:['p1','p2','p3','p4']},
  playground:{name:'Playground', into:'the playground', views:['g1','g2','g3','g4']}
};
const WALLS = {p1:A+'p1.jpg', p2:A+'p2.jpg', p3:A+'p3.jpg', p4:A+'p4.jpg', g1:A+'g1.jpg', g2:A+'g2.jpg', g3:A+'g3.jpg', g4:A+'g4.jpg'};
/* the doorway out is on p3, so you arrive in the playground facing g1; the door back is on g3, so you arrive facing p1 */
const DOORS = {e_out:['playground', 0], e_in:['classroom', 0]};
const got = k => S.got.includes(k);
const PIECES = ['straight', 'curve', 'zigzag']; /* the three missing pieces, top gap to bottom gap */
const placed = k => S.placed.includes(k);
const allIn = () => PIECES.every(placed);
const HOTS = {
  p1:[
    {id:'e_board', l:31, t:32, w:38, h:38, label:'Whiteboard: GOODBYE 2P!', sound:'tap'},
    {id:'e_desk', l:72, t:70, w:25, h:24, label:'Miss Okafor’s desk', sound:'knock'},
    {id:'e_mug', l:73.5, t:66, w:5, h:7, label:'Miss Okafor’s mug', sound:'tap'},
    {id:'e_pencils', l:91, t:64, w:4.5, h:8, label:'Pot of pencils', sound:'tap'},
    {id:'e_card', l:79, t:55, w:9, h:17, label:'The goodbye card on the desk', sound:'paper', anim:'lift', layer:'card', key:true}],
  p2:[
    {id:'e_window', l:15, t:20, w:29, h:44, label:'Window', sound:'tap'},
    {id:'e_tank', l:17, t:60, w:11, h:16, label:'Captain, the class goldfish', sound:'leaf', key:true},
    {id:'e_castle', l:30, t:62, w:10, h:14, label:'Sandcastle ornament', sound:'tap'},
    {id:'e_run', l:54, t:29, w:33, h:38, label:'The marble run', sound:'knock', key:true},
    {id:'e_bell', l:77.5, t:66.5, w:6, h:10, label:'The little bell at the bottom of the run', sound:'tick'},
    {id:'e_tray', l:56.5, t:73, w:11, h:8, label:'Tray under the run', sound:'knock', anim:'wobble', layer:'straight', key:true},
    {id:'e_lowbench', l:55, t:80, w:30, h:14, label:'Low bench', sound:'knock'}],
  p3:[
    {id:'e_pegs', l:12, t:41, w:38, h:15, label:'Coat pegs with name cards', sound:'paper', key:true},
    {id:'e_out', l:65, t:24, w:21, h:64, label:'Open doorway to the playground', sound:'knock'},
    {id:'e_table', l:13, t:64, w:32, h:28, label:'Party table', sound:'knock'},
    {id:'e_cake', l:25, t:67, w:9, h:9, label:'The cake', sound:'leaf'},
    {id:'e_jug', l:38, t:64, w:6, h:12, label:'Jug of squash', sound:'tap'}],
  p4:[
    {id:'e_bookcase', l:30, t:56, w:37, h:30, label:'Bookcase', sound:'knock'},
    {id:'e_cog1', l:60.5, t:50.5, w:5.5, h:6.5, label:'Something brass on top of the bookcase', sound:'tick', secret:true, anim:'lift', layer:'cog1', hideWhen:() => S.cogs.includes(1)},
    {id:'e_robot', l:69, t:20, w:9, h:22, label:'The class robot', sound:'tick'},
    {id:'e_beanbag', l:70, t:62, w:23, h:30, label:'Beanbag', sound:'leaf'}],
  g1:[
    {id:'e_goal', l:38, t:42, w:24, h:28, label:'Football goal', sound:'knock'},
    {id:'e_cog2', l:50, t:57.5, w:5.5, h:6.5, label:'Something brass behind the net', sound:'tick', secret:true, anim:'lift', layer:'cog2', hideWhen:() => S.cogs.includes(2)},
    {id:'e_bench', l:64, t:56, w:29, h:14, label:'Bench', sound:'knock'},
    {id:'e_box', l:73, t:42, w:15, h:17, label:'Lost-property box', sound:'paper', key:true},
    {id:'e_hopscotch', l:20, t:74, w:56, h:16, label:'Hopscotch', sound:'tap'}],
  g2:[
    {id:'e_tree', l:16, t:0, w:37, h:24, label:'The big tree', sound:'leaf'},
    {id:'e_sandpit', l:16, t:66, w:40, h:22, label:'Sandpit', sound:'leaf', anim:'wobble', layer:'curve', key:true},
    {id:'e_frame', l:60, t:38, w:24, h:50, label:'Climbing frame', sound:'knock'},
    {id:'e_slide', l:70, t:54, w:15, h:34, label:'Slide', sound:'tap'}],
  g3:[
    {id:'e_in', l:37, t:33, w:20, h:54, label:'Open door back to Classroom 2P', sound:'knock'},
    {id:'e_tap', l:19.5, t:60, w:6, h:18, label:'Outdoor tap', sound:'tick'},
    {id:'e_bucket', l:24.5, t:71, w:7, h:13, label:'Bucket', sound:'knock'},
    {id:'e_tubs', l:59, t:66, w:29, h:20, label:'Flower tubs', sound:'leaf'},
    {id:'e_cog3', l:72, t:69, w:5.5, h:7, label:'Something brass in the middle tub', sound:'tick', secret:true, anim:'lift', layer:'cog3', hideWhen:() => S.cogs.includes(3)}],
  g4:[
    {id:'e_chalk', l:28, t:22, w:44, h:56, label:'The chalk wall: the class’s drawing of the finished run', sound:'paper', key:true},
    {id:'e_chalks', l:62, t:76, w:8, h:14, label:'Bucket of chalks', sound:'tap'}]
};
const cog = (n, l, t) => ({src:A+'layer-cog.png', group:'cog'+n, l, t, w:2, h:3.56, hideWhen:() => S.cogs.includes(n)});
const LAYERS = {
  p1:[{src:A+'layer-card.png', group:'card', l:80.5, t:57.5, w:5.6, h:15.4, shadow:.5, hideWhen:() => S.done}],
  p2:[{src:A+'layer-straight.png', group:'straight', l:58.5, t:74.2, w:7, h:6.1, shadow:.4, hideWhen:() => got('straight') || placed('straight')}],
  p4:[cog(1, 62.5, 52.7)],
  g1:[cog(2, 51.8, 59.5)],
  g2:[{src:A+'layer-curve.png', group:'curve', l:33, t:64, w:6, h:12.5, shadow:.4, hideWhen:() => got('curve') || placed('curve')}],
  g3:[cog(3, 73.6, 70.7)]
};
const EXTRA = {classroom:[A+'closeup-run.jpg', A+'closeup-pegs.jpg', A+'layer-peg.png'], playground:[A+'closeup-lost.jpg', A+'closeup-chalk.jpg']};

/* ---------- the peg cards: five names and five little drawings, drawn by the game on the wall and in the close-up so they match ---------- */
const PEGS = [['AVA', 'cat'], ['BEN', 'car'], ['ELLIOT', 'rocket'], ['PRIYA', 'flower'], ['SAM', 'star']];
/* the five cards on the wall, in wall percentages (left, top, right, bottom) */
const CARDS = [[13.5, 44, 18.5, 48.3], [21, 44, 26, 48.3], [28, 44, 33, 48.3], [35.5, 44, 40.5, 48.3], [42.5, 44, 47.5, 48.3]];
/* the close-up is a crop of the wall: x 10–50, y 25.8–66.2 */
const toCU = ([x0, y0, x1, y1]) => [(x0-10)*2.5, (y0-25.8)/40.4*100, (x1-10)*2.5, (y1-25.8)/40.4*100];
const MARK = { /* simple drawings in a 100×100 box */
  cat:'<circle cx="50" cy="56" r="30" fill="#e0a86a" stroke="#4a3b2a" stroke-width="5"/><path d="M26 36 22 8 46 28Z M74 36 78 8 54 28Z" fill="#e0a86a" stroke="#4a3b2a" stroke-width="5" stroke-linejoin="round"/><circle cx="39" cy="52" r="4" fill="#2b2b2b"/><circle cx="61" cy="52" r="4" fill="#2b2b2b"/><path d="M45 66q5 5 10 0" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round"/>',
  car:'<path d="M12 62V50l14-18h44l16 18v12Z" fill="#5b9bd5" stroke="#2f5f8a" stroke-width="5" stroke-linejoin="round"/><rect x="12" y="60" width="76" height="12" rx="4" fill="#5b9bd5" stroke="#2f5f8a" stroke-width="5"/><circle cx="30" cy="76" r="9" fill="#333" stroke="#2f5f8a" stroke-width="4"/><circle cx="70" cy="76" r="9" fill="#333" stroke="#2f5f8a" stroke-width="4"/>',
  flower:'<g fill="#e77" stroke="#a33" stroke-width="4"><circle cx="50" cy="26" r="13"/><circle cx="74" cy="44" r="13"/><circle cx="66" cy="72" r="13"/><circle cx="34" cy="72" r="13"/><circle cx="26" cy="44" r="13"/></g><circle cx="50" cy="52" r="12" fill="#f2c53d" stroke="#a33" stroke-width="4"/>',
  star:'<path d="M50 8 61 38 93 38 67 57 77 88 50 69 23 88 33 57 7 38 39 38Z" fill="#f2c53d" stroke="#8a5a1a" stroke-width="5" stroke-linejoin="round"/>',
  rocket:`<image href="${A}layer-peg.png" x="0" y="0" width="100" height="100"/>`
};
/* the cards' contents as SVG in a uniform space: boxes in picture percentages, sx and sy the units per percent (16 and 9 for a wall) */
function pegSVG(boxes, withNames, sx, sy, fontPx){
  return boxes.map(([x0, y0, x1, y1], i) => { const [name, mark] = PEGS[i]; const w = (x1-x0)*sx, h = (y1-y0)*sy, m = h*(withNames ? 0.66 : 0.86);
    const mx = x0*sx + (withNames ? w*0.06 : (w-m)/2), my = y0*sy + (h-m)/2;
    return `<g transform="translate(${mx} ${my}) scale(${m/100})">${MARK[mark]}</g>` + (withNames ? `<text x="${x0*sx + w*0.62}" y="${y0*sy + h*0.62}" text-anchor="middle" font-size="${fontPx}" font-family="Atkinson Hyperlegible,Verdana,sans-serif" font-weight="700" fill="#4a3b2a">${name}</text>` : ''); }).join('');
}
/* on the wall the marks are drawn over the blank cards by the game, so wall and close-up always agree */
function pegOverlay(){
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); el.setAttribute('viewBox', '0 0 1600 900'); el.setAttribute('aria-hidden', 'true');
  el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none'; el.innerHTML = pegSVG(CARDS, false, 16, 9); return el;
}

const ITEMS = {
  straight:{name:'straight piece', icon:`<img src="${A}layer-straight.png" alt="">`},
  curve:{name:'curved piece', icon:`<img src="${A}layer-curve.png" alt="">`},
  zigzag:{name:'zigzag piece', icon:`<img src="${A}layer-zigzag.png" alt="">`},
  jumper:{name:'your jumper', icon:`<img src="${A}layer-jumper.png" alt="">`}
};
const NOTES = {
  card:{hand:true, html:'<span class="head">On the front, in Miss Okafor’s writing:</span><span class="big">Goodbye, Elliot! Open me after the marble run works. And not without your jumper!</span><span>Love from everyone in 2P</span>'},
  cardOpen:{hand:true, html:'<span class="head">Inside the card, twenty-nine names, and:</span><span class="big">Have the best summer, Elliot. Keep asking how things work. Miss O x</span><span>And in the corner, in someone’s pencil: a little moth.</span>'}
};
const HINTS = [
  {goal:() => S.cardRead, tips:['Miss Okafor left a card on her desk.', 'The card is on the teacher’s desk, under the whiteboard.', 'Tap the card on Miss Okafor’s desk.']},
  /* trail 1: the marble run */
  {thread:1, goal:() => S.chalkSeen, tips:['Three pieces are missing from the marble run. Which goes where?', 'The class drew the finished run on the chalk wall in the playground.', 'Go outside and tap the chalk wall: straight at the top, curve in the middle, zigzag at the bottom.']},
  {thread:1, goal:() => got('straight') || placed('straight'), tips:['One piece is right under the run.', 'Look in the tray under the marble run.', 'Tap the tray under the run and take the straight piece.']},
  {thread:1, goal:() => got('curve') || placed('curve'), tips:['One piece is somewhere sandy.', 'Something bright is sticking out of the sandpit.', 'Tap the sandpit in the playground and take the curved piece.']},
  {thread:1, goal:() => got('zigzag') || placed('zigzag'), tips:['One piece is somewhere warm and woolly.', 'The lost-property box is on the bench outside. It is full of jumpers.', 'Take your jumper out of the lost-property box: the zigzag piece is underneath.']},
  {thread:1, goal:allIn, tips:['Hold a piece, then tap the marble run.', 'The chalk drawing shows the order: straight, curve, zigzag, top to bottom.', 'Tap a piece in the strip, tap the run, then tap the gap it belongs in.']},
  {thread:1, goal:() => S.bell, tips:['All three pieces are in. Now roll!', 'Tap the marble run and press Roll.', 'Tap the run, then Roll. The marble does the rest.']},
  /* trail 2: the jumper */
  {thread:2, goal:() => S.pegSeen, tips:['Which jumper is yours? Your peg knows.', 'Every peg has a name card with a little drawing. Find Elliot’s.', 'Tap the coat pegs by the doorway and look at Elliot’s card.']},
  {thread:2, goal:() => got('jumper'), tips:['Your jumper is in lost property, with three others.', 'The lost-property box is on the bench outside. Yours has the same picture as your peg card.', 'Tap the box on the bench and take the jumper with the rocket badge.']},
  {goal:() => S.done, tips:['Bell rung, jumper found. Time for the card.', 'Miss Okafor’s card is on her desk in the classroom.', 'Tap the card on Miss Okafor’s desk.']}
];
const THREADS = {1:['Mend the marble run', ['', 'chalk drawing seen', 'straight piece found', 'curved piece found', 'zigzag piece found', 'all three in']],
  2:['Find your jumper', ['', 'peg card seen']]};
const speaker = () => 'The moth says';

/* ---------- close-ups ---------- */
/* the marble run: three gaps as big targets; a held piece goes into the gap you tap (a wrong gap says why); when all three are in, Roll */
const GAPS = [[44, 33, 11, 15], [48, 49, 11, 15], [44, 66, 11, 15]]; /* left, top, width, height, in close-up percentages, top to bottom */
const IN_GAP = {straight:[43, 35.5, 13, '636/313'], curve:[48.5, 46, 9, '548/640'], zigzag:[43.5, 65, 12, '640/497']}; /* left, top, width, aspect */
const TRACK = [[11, 8], [10, 17], [91, 33], [9, 50], [91, 62], [9, 78]]; /* the marble's path, in close-up percentages */
function openRun(){
  const pieces = PIECES.map(k => placed(k) ? `<img class="inrun" src="${A}layer-${k}.png?v=${BUILD}" alt="" style="left:${IN_GAP[k][0]}%;top:${IN_GAP[k][1]}%;width:${IN_GAP[k][2]}%;aspect-ratio:${IN_GAP[k][3]}">` : '').join('');
  const gaps = GAPS.map(([l, t, w, h], i) => `<button class="book gap" data-i="${i}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%" aria-label="Gap ${i+1}"><span></span></button>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="runpic" style="background-image:url(${A}closeup-run.jpg?v=${BUILD})">${pieces}${gaps}<svg viewBox="0 0 1280 720" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" aria-hidden="true"><circle id="marble" r="13" fill="#7fb3e0" stroke="#2f5f8a" stroke-width="3" opacity="0"/></svg><p class="otitle">The marble run</p></div><div class="shelffoot"><div class="row"><p class="ofb" id="runFb">${runLine()}</p>${allIn() && !S.bell ? '<button class="ob" id="roll">Roll</button>' : ''}</div></div></div>`);
  $('runpic').querySelectorAll('.gap').forEach(b => b.onclick = () => { const i = +b.dataset.i; const want = PIECES[i];
    if (placed(want)){ sfx('tick'); $('runFb').textContent = `The ${ITEMS[want].name} is in there. It fits perfectly.`; return; }
    if (!S.held || !PIECES.includes(S.held)){ sfx('knock'); $('runFb').textContent = `A gap. Something is missing here. ${S.held ? '' : 'Hold a piece in the strip, then tap the gap.'}`; return; }
    if (S.held === want){ const k = S.held; S.held = null; drop(k); S.placed.push(k); save(); sfx('pickup'); render(); closeCloseup(); setTimeout(openRun, 250); return; }
    sfx('knock'); const why = {straight:'the marble would shoot straight off the edge', curve:'the marble would swing round and fall out', zigzag:'the marble would zig when it should zag'}[S.held];
    $('runFb').textContent = `The ${ITEMS[S.held].name} doesn’t fit here: ${why}. Look at the chalk drawing outside.`; });
  const r = $('roll'); if (r) r.onclick = roll;
}
const openRunWith = k => () => { S.held = k; render(); openRun(); };
function runLine(){
  if (S.bell) return 'Mended! The marble runs the whole way and the bell rings.';
  if (allIn()) return 'All three pieces are in. Press Roll!';
  const n = PIECES.filter(placed).length; return n ? `${n} of 3 pieces in. ${S.held && PIECES.includes(S.held) ? 'Tap the gap it belongs in.' : 'Hold a piece in the strip, then tap its gap.'}` : (S.held && PIECES.includes(S.held) ? 'Tap the gap this piece belongs in.' : 'Three gaps. Three pieces to find.');
}
function roll(){
  const m = $('marble'); if (!m) return; $('roll').disabled = true; sfx('tick');
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const segs = []; let total = 0; for (let i = 1; i < TRACK.length; i++){ const L = Math.hypot((TRACK[i][0]-TRACK[i-1][0])*16, (TRACK[i][1]-TRACK[i-1][1])*9); segs.push(L); total += L; }
  const at = k => { let d = k*total; for (let i = 0; i < segs.length; i++){ if (d <= segs[i] || i === segs.length-1){ const u = Math.min(1, d/segs[i]); return [TRACK[i][0] + (TRACK[i+1][0]-TRACK[i][0])*u, TRACK[i][1] + (TRACK[i+1][1]-TRACK[i][1])*u]; } d -= segs[i]; } return TRACK[TRACK.length-1]; };
  const dur = reduce ? 300 : 4200, t0 = performance.now(); m.setAttribute('opacity', '1'); let lastTick = 0;
  const tick = now => { const k = Math.min(1, (now-t0)/dur); const [x, y] = at(k); m.setAttribute('cx', x*12.8); m.setAttribute('cy', y*7.2 - 8);
    if (k - lastTick > 0.2){ lastTick = k; rasp(k); }
    if (k < 1) requestAnimationFrame(tick); else ding(); };
  requestAnimationFrame(tick);
}
function ding(){
  S.bell = true; save(); chime(1568); setTimeout(() => chime(2093), 180); sfx('pickup');
  const fb = $('runFb'); if (fb) fb.textContent = 'Ding! The marble ran the whole way. The party can start!';
  say('Ding! The bell! Everyone cheers.'); setTimeout(() => { closeCloseup(); render(); say(got('jumper') ? 'The run works. Now the card on Miss Okafor’s desk.' : 'The run works! Now, nobody goes home without their jumper.'); }, 1800);
}
function openPegs(){
  S.pegSeen = true; save();
  const boxes = CARDS.map(toCU);
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background-image:url(${A}closeup-pegs.jpg?v=${BUILD})"><svg viewBox="0 0 1280 720" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">${pegSVG(boxes, true, 12.8, 7.2, 30)}</svg><p class="otitle">The coat pegs</p></div><div class="shelffoot"><p class="ofb">Five pegs, five name cards, each with a drawing. Elliot’s has a rocket.</p></div></div>`);
  say('Your peg card has a rocket on it. Your jumper has the same.');
}
function openBox(){
  const jumpers = [['Ava’s, with the cat', 17, 22], ['rocket', 31, 22], ['Ben’s, with the car', 50, 22], ['Priya’s, with the flower', 66, 22]];
  const btns = jumpers.map(([w, l, ww], i) => `<button class="book" data-i="${i}" style="left:${l}%;top:30%;width:${ww}%;height:44%" aria-label="${w === 'rocket' ? 'Jumper with the rocket badge' : w}"><span></span></button>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="boxpic" style="background-image:url(${A}closeup-lost.jpg?v=${BUILD})">${got('jumper') ? '' : btns}<p class="otitle">Lost property</p></div><div class="shelffoot"><p class="ofb" id="boxFb">${got('jumper') ? (got('zigzag') || placed('zigzag') ? 'Three jumpers that are not yours.' : 'Under where your jumper was: a yellow zigzag. Tap it.') : 'Four jumpers, four badges. Which one is yours?'}</p>${got('jumper') && !(got('zigzag') || placed('zigzag')) ? `<button class="ob" id="takeZig">Take the zigzag piece</button>` : ''}</div></div>`);
  $('boxpic').querySelectorAll('.book').forEach(b => b.onclick = () => { const i = +b.dataset.i; sfx('leaf');
    if (i === 1){ S.got.push('jumper'); sfx('pickup'); render(); $('boxFb').innerHTML = 'The rocket badge: yours! And underneath it, something yellow and zigzaggy.'; setTimeout(openBox, 900); }
    else $('boxFb').textContent = `${['Ava’s, with the cat badge. Not yours.', '', 'Ben’s, with the car badge. Not yours.', 'Priya’s, with the flower badge. Not yours.'][i]} ${S.pegSeen ? 'Yours has a rocket, like your peg card.' : 'Which picture is yours? Your peg card would say.'}`; });
  const z = $('takeZig'); if (z) z.onclick = () => { S.got.push('zigzag'); sfx('pickup'); closeCloseup(); render(); say('The zigzag piece! It was under the jumpers all along. It goes in the strip below.'); };
}
function openChalk(){
  S.chalkSeen = true; save();
  openPic(A+'closeup-chalk.jpg', '1280/921', 'The chalk wall', '', 50);
  say('The finished run, in chalk: the straight piece at the top, the curve in the middle, the zigzag at the bottom.');
}
function cardTap(){
  if (S.done){ say('Your card, signed by everyone.'); return; }
  if (!S.cardRead){ S.cardRead = true; save(); render(); openNote('card'); return; }
  if (!S.bell || !got('jumper')){ openNote('card'); say(!S.bell && !got('jumper') ? 'Not yet: the marble run first, and your jumper.' : !S.bell ? 'Not yet: the marble run has to work first.' : 'Not yet: not without your jumper.'); return; }
  S.done = true; save(); render(); sfx('pickup'); openNote('cardOpen');
  setTimeout(() => { closeCloseup(); showEnd('Goodbye, 2P!', 'The marble run was missing three pieces: one in the tray, one in the sandpit and one under the jumpers in lost property. The chalk wall showed where they went, and when I pressed Roll the marble went ALL the way and rang the bell. I found my jumper too (rocket badge). Miss Okafor’s card has everybody’s name in it and someone drew a moth. See you at the airport!', S.cogs.length === 3 ? 'I found all three brass cogs hidden round the school! ★' : `I found ${S.cogs.length} of the three brass cogs hidden round the school.`); }, 5000);
}
const USES = {
  /* the engine puts a used item down before calling this; the piece stays in hand so the gap can be chosen in the close-up */
  'straight>e_run':openRunWith('straight'), 'curve>e_run':openRunWith('curve'), 'zigzag>e_run':openRunWith('zigzag'),
  'straight>e_tray':() => { sfx('knock'); say('It came out of the tray. It belongs in the run.'); },
  'jumper>e_card':() => { sfx('tap'); say('Jumper: check. ' + (S.bell ? 'Now tap the card.' : 'Now the marble run.')); },
  'jumper>e_box':() => { sfx('knock'); say('No! It took long enough to find.'); },
  'straight>e_chalk':() => { sfx('tap'); say('Blue, straight: the top of the drawing. Top gap, then.'); },
  'curve>e_chalk':() => { sfx('tap'); say('Red, curved: the middle of the drawing. Middle gap, then.'); },
  'zigzag>e_chalk':() => { sfx('tap'); say('Yellow, zigzag: the bottom of the drawing. Bottom gap, then.'); }
};
function act(id){
  switch(id){
    case 'e_board': say('GOODBYE 2P! in five colours. Miss Okafor did the balloons.'); break;
    case 'e_desk': say('Miss Okafor’s desk, tidy for once. ' + (S.done ? '' : 'Your card is on it.')); break;
    case 'e_mug': say('WORLD’S OKAYEST TEACHER, says the mug. She thinks it’s funny.'); break;
    case 'e_pencils': say('Pencils, sharpened. Twenty-nine of them, one each.'); break;
    case 'e_card': cardTap(); return;
    case 'e_window': say('Sunshine, and the playground. You can hear the party being set up.'); break;
    case 'e_tank': say('Captain, the class goldfish. He looks at you as if he knows something.'); openNotebook(); return;
    case 'e_castle': say('A sandcastle that never washes away. Captain lives behind it.'); break;
    case 'e_run': openRun(); return;
    case 'e_bell': say(S.bell ? 'The bell. It rang!' : 'The little bell at the end of the run. It rings when a marble gets all the way down. It hasn’t, all year.'); break;
    case 'e_tray': if (got('straight') || placed('straight')) say('The tray, empty now.'); else { S.got.push('straight'); sfx('pickup'); render(); say('A straight blue piece of track, in the tray. It goes in the strip below.'); } return;
    case 'e_lowbench': say('The low bench where the run lives.'); break;
    case 'e_pegs': openPegs(); return;
    case 'e_table': say('Cake, cups and squash. Nobody touches the cake until the run works, says Miss Okafor.'); break;
    case 'e_cake': say('The cake. Chocolate. Not yet.'); break;
    case 'e_jug': say('Orange squash, the strong kind.'); break;
    case 'e_bookcase': say('The class books. Something brass is on top, just out of reach. Well, almost.'); break;
    case 'e_robot': say('Beep, says the robot. It runs on three brass cogs, and it is missing three brass cogs.'); break;
    case 'e_beanbag': say('The reading beanbag. Very hard to get out of.'); break;
    case 'e_goal': say('The goal. The net has a hole in it, and something shiny behind.'); break;
    case 'e_bench': say('The bench, with the lost-property box on it.'); break;
    case 'e_box': openBox(); return;
    case 'e_hopscotch': say('Hopscotch. 1 to 10 and back again.'); break;
    case 'e_tree': say('The big tree. Leaves, a bird, and a lost tennis ball.'); break;
    case 'e_sandpit': if (got('curve') || placed('curve')) say('The sandpit. Sand, a bucket, no more track.'); else { S.got.push('curve'); sfx('pickup'); render(); say('A red curved piece of track, sticking out of the sand. It goes in the strip below.'); } return;
    case 'e_frame': say('The climbing frame. Top bar only if a grown-up is watching.'); break;
    case 'e_slide': say('The slide. Warm from the sun.'); break;
    case 'e_tap': say('The outdoor tap, dripping.'); break;
    case 'e_bucket': say('A bucket for the sandpit.'); break;
    case 'e_tubs': say('Three tubs of flowers the class planted. ' + (S.cogs.includes(3) ? '' : 'Something glints in the middle one.')); break;
    case 'e_chalk': openChalk(); return;
    case 'e_chalks': say('Chalks, worn to stubs.'); break;
    default:
      if (/^e_cog\d$/.test(id)){ const n = +id.slice(-1); S.cogs.push(n); save(); sfx('pickup'); setTimeout(render, 900); say(`A brass cog! ${S.cogs.length} of 3 for the robot.` + (S.cogs.length === 3 ? ' That’s all of them. ★' : '')); return; }
      return false;
  }
}
function rows(){
  const out = [];
  if (!S.cardRead) out.push([0, 'What does Miss Okafor’s card say?', 'not yet', false]);
  else {
    Object.entries(THREADS).forEach(([th, [label, steps]]) => {
      const idx = HINTS.map((h, k) => h.thread == th && !h.goal() ? k : -1).filter(k => k >= 0);
      const done = th == 1 ? S.bell : got('jumper'), p = steps.length - idx.length + (th == 1 ? 0 : 0);
      out.push([done ? -1 : idx[0], label, done ? (th == 1 ? '✓ bell rung' : '✓ found') : (steps[p] || 'not started'), done]);
    });
    if (S.bell && got('jumper')) out.push([HINTS.length - 1, 'Open the card', S.done ? '✓ opened' : 'tap the card', S.done]);
  }
  return out;
}
function noticed(){
  const n = [];
  if (S.chalkSeen) n.push('Chalk wall: straight at the top, curve in the middle, zigzag at the bottom.');
  if (S.pegSeen) n.push('Elliot’s peg card has a rocket.');
  n.push(`Brass cogs found: ${S.cogs.length} of 3.`);
  return n;
}
function sparkle(id){
  if (id === 'e_card') return !S.cardRead || (S.bell && got('jumper') && !S.done);
  if (id === 'e_tank') return false;
  if (id === 'e_run') return (S.held && PIECES.includes(S.held)) || (allIn() && !S.bell);
  if (id === 'e_tray') return S.cardRead && !got('straight') && !placed('straight');
  if (id === 'e_sandpit') return S.cardRead && !got('curve') && !placed('curve');
  if (id === 'e_pegs') return S.cardRead && !S.pegSeen;
  if (id === 'e_box') return S.cardRead && !got('jumper');
  if (id === 'e_chalk') return S.cardRead && !S.chalkSeen;
  return false;
}
return {
  child:'elliot',
  card:{place:'SINGAPORE · THE LAST DAY OF TERM', text:'Classroom 2P, with balloons on the whiteboard and a party waiting. Miss Okafor has left Elliot a card on her desk, and the marble run on the wall has never once rung its bell.'},
  meanwhile:'Meanwhile, in Classroom 2P, Elliot has a marble run to mend before anyone touches the cake.',
  postcard:{pic:'../art/postcards/eschool.jpg'},
  title:'Last day of school', blurb:'Elliot’s last day: Classroom 2P and the playground. Mend the marble run, find your jumper, open the card.',
  track:'../art/music/classroom.mp3', ambient:'school', next:null,
  intro:'<b>Last day of term.</b> Balloons on the whiteboard, cake on the table, and a card with your name on it on Miss Okafor’s desk.',
  start:{room:'classroom', view:0},
  fresh:() => ({placed:[], cogs:[], cardRead:false, chalkSeen:false, pegSeen:false, bell:false}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, extra:EXTRA, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES, overlays:{p3:pegOverlay},
  act, sparkle, rows, noticed, speaker, helper:() => 'the moth'
};
})());
