/* The Moth House, landscape engine: Mary's stage 3, the fourteen-hour flight to London.
   Two rooms (row 34 and the galley at the back) and three parallel trails that meet at the moth on the flight map;
   see STORY.md and next/PLAYBOOK.md. Registered with the engine in index.html. The cabin is shared with Elliot's and
   Zaina's flights later, each child seeing their own things in it. */
'use strict';
registerStage('flight', (function(){
const A = '../art/flight/';
/* turning order is clockwise: forward (the seat in front), the window on the right, back down the aisle, across the aisle on the left.
   The galley: the curtain back to the cabin, the counter with the clocks, the big screen on the far wall, the toilet door. */
const ROOMS = {
  seat:{name:'Row 34', into:'row 34', views:['s1','s2','s4','s3']},
  galley:{name:'The galley', into:'the galley', views:['g4','g1','g3','g2']}
};
const WALLS = {s1:A+'s1.jpg', s2:A+'s2.jpg', s3:A+'s3.jpg', s4:A+'s4.jpg', g1:A+'g1.jpg', g2:A+'g2.jpg', g3:A+'g3.jpg', g4:A+'g4.jpg'};
/* through the curtain at the back of the cabin you arrive in the galley facing its far wall (the big screen); back through it you face your seat */
/* once Priya and the trolley stand in the aisle, the way to the back is the whole end of the cabin around her (she is drawn on top) */
const DOORS = {f_curtain:['galley', 2], f_curtain2:['galley', 2], g_curtain:['seat', 0]};
const got = k => S.got.includes(k);
const LAND = {h:13, m:40};            /* landing, Singapore time, on the flight card */
const BEHIND = 7;                     /* London is seven hours behind Singapore in the British summer: the two galley clocks show it */
const ANSWER = {h:6, m:40};
const HOTS = {
  s1:[
    {id:'f_screen', l:42, t:34, w:16, h:18, label:'Seat-back screen', sound:'tap', key:true},
    {id:'f_tray', l:40, t:53, w:20, h:17, label:'Tray table, latched', sound:'tick'},
    {id:'f_pocket', l:40, t:74, w:20, h:17, label:'Seat pocket', sound:'paper', key:true},
    {id:'f_note', l:42, t:67, w:9, h:11.5, label:'A folded note poking out of the seat pocket', sound:'paper', anim:'lift', layer:'notecorner', key:true, hideWhen:() => S.noteSeen},
    {id:'f_mag', l:49, t:63, w:9, h:15.5, label:'Magazine in the seat pocket', sound:'paper', anim:'lift', layer:'magtop', key:true, hideWhen:() => S.magTaken},
    {id:'f_light', l:44, t:16, w:10, h:8, label:'Reading light', sound:'tick'},
    {id:'f_seatl', l:18, t:28, w:19, h:44, label:'The seat on the left, and a sleeping head', sound:'leaf'},
    {id:'f_seatr', l:63, t:28, w:19, h:44, label:'The seat on the right, and a sleeping head', sound:'leaf'}],
  s2:[
    {id:'f_window', l:42, t:31, w:16, h:31, label:'Window', sound:'tap'},
    {id:'f_seatfront', l:16, t:28, w:22, h:55, label:'The seat in front, from the side', sound:'leaf'},
    {id:'f_sleeper', l:66, t:36, w:28, h:58, label:'The sleeping passenger behind Mary', sound:'leaf'},
    {id:'f_light2', l:45, t:13, w:10, h:8, label:'Reading light', sound:'tick'}],
  s4:[
    {id:'f_curtain', l:42, t:31, w:9, h:38, label:'The curtain to the galley at the back', sound:'leaf', hideWhen:() => S.awake},
    {id:'f_toiletfar', l:51, t:33, w:9, h:36, label:'The toilet door at the back', sound:'knock', hideWhen:() => S.awake},
    {id:'f_curtain2', l:38, t:28, w:22, h:44, label:'The back of the cabin: the curtain and the toilet door, past Priya', sound:'leaf', hideWhen:() => !S.awake},
    {id:'f_priya', l:45.5, t:38, w:9, h:36, label:'Priya with the breakfast trolley', sound:'leaf', key:true, anim:'sniff', layer:'priya2', hideWhen:() => !S.awake},
    {id:'f_trolley', l:45, t:62, w:10, h:28, label:'The breakfast trolley', sound:'knock', anim:'sniff', layer:'priya2', hideWhen:() => !S.awake},
    {id:'f_rowsl', l:8, t:54, w:30, h:42, label:'Rows of sleeping passengers', sound:'leaf'},
    {id:'f_rowsr', l:62, t:54, w:30, h:42, label:'Rows of sleeping passengers', sound:'leaf'}],
  s3:[
    {id:'f_kids', l:10, t:40, w:30, h:58, label:'Elliot, asleep', sound:'leaf'},
    {id:'f_zaina', l:56, t:45, w:26, h:52, label:'Zaina, asleep with Peanut', sound:'leaf'},
    {id:'f_sleeper2', l:33, t:38, w:12, h:30, label:'A sleeping passenger by the window', sound:'leaf'},
    {id:'f_sleeper3', l:71, t:35, w:14, h:36, label:'A sleeping passenger by the window', sound:'leaf'}],
  /* the galley */
  g4:[
    {id:'g_curtain', l:30, t:14, w:40, h:76, label:'The curtain back to the cabin', sound:'leaf'}],
  g1:[
    {id:'g_counter', l:36, t:53, w:28, h:33, label:'Galley counter', sound:'knock'},
    {id:'g_lockers', l:37, t:15, w:27, h:17, label:'Galley lockers', sound:'knock'},
    {id:'g_priya', l:41, t:27, w:12, h:27, label:'Priya, the flight attendant', sound:'leaf', key:true, anim:'sniff', layer:'priya', hideWhen:() => S.awake},
    {id:'g_pot', l:53, t:45, w:6, h:9, label:'Coffee pot', sound:'tap'},
    {id:'g_cups', l:58, t:43, w:5, h:11, label:'Paper cups', sound:'tap'},
    {id:'g_clocks', l:65, t:19, w:17, h:20, label:'Two clocks on the wall', sound:'tick', key:true}],
  g3:[
    {id:'g_screen', l:32, t:20, w:37, h:40, label:'The big screen', sound:'tap', key:true},
    {id:'g_panell', l:12, t:18, w:17, h:42, label:'Blank panel', sound:'knock'},
    {id:'g_panelr', l:71, t:18, w:17, h:42, label:'Blank panel', sound:'knock'}],
  g2:[
    {id:'g_toilet', l:40, t:14, w:20, h:72, label:'Toilet door', sound:'knock', key:true},
    {id:'g_holder', l:34, t:27, w:6, h:10, label:'Holder on the wall', sound:'paper'},
    {id:'g_hatch', l:61, t:50, w:12, h:36, label:'Serving counter', sound:'knock'}]
};
const LAYERS = {
  g1:[{src:A+'layer-priya.png', group:'priya', l:41.64, t:27.73, w:9.77, h:24.67, hideWhen:() => S.awake}],
  s4:[{src:A+'layer-priya2.png', group:'priya2', l:45.24, t:37.76, w:9.63, h:51.56, shadow:.5, showWhen:() => S.awake}],
  s1:[{src:A+'layer-notecorner.png', group:'notecorner', l:43, t:68.68, w:7.01, h:9.18, hideWhen:() => S.noteSeen},
      {src:A+'layer-magtop.png', group:'magtop', l:49.89, t:64.78, w:6.98, h:12.89, hideWhen:() => S.magTaken}]
};
const EXTRA = {seat:[A+'closeup-magazine.jpg', A+'item-flightcard.png', A+'item-note.png', A+'item-mag.png', A+'item-lens.png'], galley:[A+'closeup-toilet.jpg']};

/* ---------- things the game draws over the pictures, so wall and close-up agree ---------- */
const fmt = t => `${String(t.h).padStart(2, '0')}:${String(t.m).padStart(2, '0')}`;
const FONT = 'Atkinson Hyperlegible,Verdana,sans-serif';
/* one clock face: hours and minutes, the hands drawn from them */
function clockSVG(cx, cy, r, h, m){
  const ticks = []; for (let i = 0; i < 12; i++){ const a = i*Math.PI/6, big = i%3 === 0; ticks.push(`<line x1="${cx + Math.sin(a)*r*(big ? .72 : .8)}" y1="${cy - Math.cos(a)*r*(big ? .72 : .8)}" x2="${cx + Math.sin(a)*r*.88}" y2="${cy - Math.cos(a)*r*.88}" stroke="#2b2622" stroke-width="${big ? r*.07 : r*.045}" stroke-linecap="round"/>`); }
  const ha = (h%12 + m/60)*Math.PI/6, ma = m*Math.PI/30;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#8d94a3" stroke="#2b2622" stroke-width="${r*.06}"/><circle cx="${cx}" cy="${cy}" r="${r*.86}" fill="#eef1f4" stroke="#2b2622" stroke-width="${r*.05}"/>${ticks.join('')}` +
    `<line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(ha)*r*.48}" y2="${cy - Math.cos(ha)*r*.48}" stroke="#2b2622" stroke-width="${r*.09}" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(ma)*r*.7}" y2="${cy - Math.cos(ma)*r*.7}" stroke="#2b2622" stroke-width="${r*.06}" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${r*.07}" fill="#2b2622"/>`;
}
/* the time now, by the clocks: an hour before landing */
const NOW_SG = {h:12, m:40}, NOW_LDN = {h:5, m:40};
/* the two clocks and their labels, as they sit on the galley wall (measured on a 1% grid: centres at 69.6% and 77.55%, 27% down, ring 3.1% wide) */
function clocksSVG(){
  const W = 307.2, H = 183.6, lx = (69.6-65.5)*19.2, rx = (77.55-65.5)*19.2, cy = (27.0-20.5)*10.8, r = 3.1*19.2;
  const label = (x0, x1, text) => `<rect x="${x0}" y="${(34.2-20.5)*10.8}" width="${x1-x0}" height="${(36.4-34.2)*10.8}" rx="2" fill="#d9dee6" stroke="#2b2622" stroke-width="1.6"/><text x="${(x0+x1)/2}" y="${(35.3-20.5)*10.8 + 4.5}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#2b2622" font-family="${FONT}" letter-spacing="1">${text}</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" aria-hidden="true">${clockSVG(lx, cy, r, NOW_SG.h, NOW_SG.m)}${clockSVG(rx, cy, r, NOW_LDN.h, NOW_LDN.m)}${label((67.3-65.5)*19.2, (71.8-65.5)*19.2, 'SINGAPORE')}${label((75.3-65.5)*19.2, (79.8-65.5)*19.2, 'LONDON')}</svg>`;
}
function wallClocks(){ const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:65.5%;top:20.5%;width:16%;height:17%'; wrap.innerHTML = clocksSVG(); return wrap; }
/* the flight map on a screen: the route from Singapore to London, the plane nearly there, and beside London a smudge too small to make out */
function mapSVG(){
  return `<svg viewBox="0 0 220 140" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true"><rect width="220" height="140" fill="#17395c"/>
    <g fill="#2e6a86"><path d="M14 40c20-14 40-10 56 0s30 6 40 20-6 30-20 24-30 6-46 0-30-30-30-44Z"/><path d="M120 24c16-8 40-6 60 4s26 24 12 34-30-2-46 6-30 6-40-6 4-30 14-38Z"/><path d="M150 96c10-8 26-8 36 0s6 22-6 24-24-4-30-24Z"/></g>
    <path d="M186 112C160 80 110 44 34 36" fill="none" stroke="#f3c26a" stroke-width="2" stroke-dasharray="4 4"/>
    <circle cx="186" cy="112" r="4" fill="#d0602f"/><text x="186" y="128" text-anchor="middle" font-size="9" fill="#fffaf0" font-family="${FONT}">Singapore</text>
    <circle cx="34" cy="36" r="4" fill="#f3c26a"/><text x="34" y="54" text-anchor="middle" font-size="9" fill="#fffaf0" font-family="${FONT}">London</text>
    <circle cx="37" cy="29" r="1.4" fill="#f3c26a" opacity=".7"/>
    <path d="M48 44l10-4 6 2-4 4 8 2-12 3-6-3Z" fill="#fffaf0"/>
    <text x="110" y="132" text-anchor="middle" font-size="8" fill="#9fc4d8" font-family="${FONT}">Landing in 58 minutes · London 05:42</text></svg>`;
}
const screenLayer = (l, t, w, h) => () => { const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = `left:${l}%;top:${t}%;width:${w}%;height:${h}%`; wrap.innerHTML = S.awake ? mapSVG() : ''; return wrap; };

/* ---------- notes and items ---------- */
const NOTES = {
  flightcard:{html:'<span class="head">Flight information</span><span class="big">Landing: 13:40 Singapore time</span><span>Flight time: 14 hours.<br>Breakfast is served one hour before landing.<br>Please keep your seat belt fastened while seated.</span>'},
  /* the note as it is: every line written backwards. The moth reads it the way Mary sees it, not the words (that would give the puzzle away) */
  noteMirror:{hand:true, mirror:true, voice:'It’s all backwards. Every letter the wrong way round. Mary can’t read a word of it.', html:'<span class="head">A folded note</span><span class="big">Look at the map.<br>Find the moth.<br>It knows the way.</span><span>– N</span>'},
  noteRead:{hand:true, html:'<span class="head">The note, in the mirror</span><span class="big">Look at the map.<br>Find the moth.<br>It knows the way.</span><span>– N</span>'}
};
const ITEMS = {
  flightcard:{name:'flight card', icon:`<img src="${A}item-flightcard.png" alt="">`, note:'flightcard', spent:() => S.awake},
  note:{name:'backwards note', icon:`<img src="${A}item-note.png" alt="">`, note:'noteMirror', usable:true},
  noteread:{name:'note from N', icon:`<img src="${A}item-note.png" alt="" style="transform:scaleX(-1)">`, note:'noteRead', spent:() => S.done},
  mag:{name:'magazine', icon:`<img src="${A}item-mag.png" alt="">`, open:() => openMagazine()},
  lens:{name:'magnifying glass', icon:`<img src="${A}item-lens.png" alt="">`}
};
const HINTS = [
  {goal:() => S.noteSeen, tips:['Something in the seat pocket is not the usual magazine.', 'Turn to the seat in front of Mary and look at the pocket.', 'Tap the folded note poking out of the seat pocket.']},
  /* trail 1: wake the screen */
  {thread:1, goal:() => S.cardRead, tips:['The screen in front of Mary is asleep. What does it want?', 'Tap the dark screen: it asks for the London time when we land. The flight card in the seat pocket knows when we land.', 'Tap the seat pocket and take the flight card: landing at 13:40, Singapore time.']},
  {thread:1, goal:() => S.clocksSeen || S.priyaTip, tips:['13:40 is Singapore time. London is behind Singapore. How far behind?', 'The crew keep two clocks in the galley at the back, one for each city.', 'Go through the curtain at the back and tap the two clocks: Singapore 12:40, London 05:40. Seven hours apart.']},
  {thread:1, goal:() => S.awake, tips:['Landing at 13:40 in Singapore. Take seven hours off for London.', 'Tap the dark seat-back screen and turn the hours down, seven times.', 'Set the screen to 06:40 and tap Wake.']},
  /* trail 2: read the note */
  {thread:2, goal:() => S.noteRead, tips:['The note is written backwards. What turns writing the right way round?', 'A mirror does. The dark seat-back screen is as shiny as one, and the toilet at the back has a real mirror over its basin.', 'Hold the backwards note (tap it in the strip), then tap the dark seat-back screen; or open the toilet door in the galley and tap the mirror with the note.']},
  /* trail 3: the magnifying glass */
  {thread:3, goal:() => S.magRead, tips:['The magazine in the seat pocket is worth a look.', 'Tap the magazine in the seat pocket, then tap it in the strip to open it.', 'Open the magazine: the Junior Explorer page says to ask the crew for a magnifying glass.']},
  {thread:3, goal:() => S.lensGiven || S.awake, tips:['The magazine says to ask the crew for the magnifying glass.', 'Priya is in the galley behind the curtain, with the breakfast trays.', 'Tap Priya in the galley and she will give you the magnifying glass.']},
  {thread:3, goal:() => S.lensGiven || !S.awake, tips:['The magazine says to ask the crew for the magnifying glass.', 'Priya has left the galley: breakfast is coming up the aisle.', 'Turn to the back of the cabin and tap Priya at the trolley; she will give you the magnifying glass.']},
  /* convergence */
  {goal:() => S.zoomed, tips:['The map is awake, and the note says: find the moth.', 'The moth is too small to see. A magnifying glass makes small things big.', 'Tap the magnifying glass in the strip, then tap the map on the screen.']},
  {goal:() => S.done, tips:['Someone has doodled on the map. The note says which drawing matters.', 'Find the moth among the drawings, near the top of London.', 'Tap the little moth beside Enfield.']}
];
const THREADS = {1:['Wake the sleepy screen', () => S.awake, ['', 'flight card read', 'clocks seen', 'set it to London time']],
  2:['Read the backwards note', () => S.noteRead, ['', 'needs a mirror']],
  3:['A magnifying glass', () => S.lensGiven, ['', 'ask the crew', 'ask the crew']]};
const speaker = () => 'The moth says';

/* ---------- close-ups ---------- */
/* the sleepy seat-back screen: it wakes only when the London landing time is set, checked when Wake is tapped (so the answer cannot be found by watching for a click) */
function openWake(){
  if (!S.time) S.time = {h:LAND.h, m:LAND.m};
  openCloseup(`<div class="card locker"><p class="otitle">The seat-back screen, asleep</p><div class="wake"><p class="wq">Good morning! Local time at landing?</p><div class="wrow"><div class="wcol"><button class="wb" data-k="h" data-d="1" aria-label="Hour up">+</button><button class="wb" data-k="h" data-d="-1" aria-label="Hour down">−</button></div><span class="wdigits" id="wDigits">${fmt(S.time)}</span><div class="wcol"><button class="wb" data-k="m" data-d="10" aria-label="Minutes up">+</button><button class="wb" data-k="m" data-d="-10" aria-label="Minutes down">−</button></div></div><p class="wsmall">hours · minutes</p></div><p class="ofb" id="wakeFb">It shows 13:40, and asks what that is in London.</p><div class="row"><button class="ob" id="wakeGo">Wake</button></div></div>`);
  document.querySelectorAll('.wb').forEach(b => b.onclick = () => { const d = +b.dataset.d; if (b.dataset.k === 'h') S.time.h = (S.time.h + d + 24) % 24; else S.time.m = (S.time.m + d + 60) % 60; $('wDigits').textContent = fmt(S.time); sfx('tick'); save(); });
  $('wakeGo').onclick = () => { sfx('tap');
    if (S.time.h === ANSWER.h && S.time.m === ANSWER.m){ S.awake = true; save(); sfx('pickup'); $('wakeFb').textContent = 'Beep! The screen lights up.';
      setTimeout(() => { closeCloseup(); render(); say('The screen flickers on: a map, and a little plane nearly at London. The big screen in the galley will be awake too.'); }, 800); }
    else { S.screenTried = true; save(); $('wakeFb').textContent = S.time.h === LAND.h && S.time.m === LAND.m ? 'The screen blinks. 13:40 is Singapore time. London is behind.' : 'The screen blinks and stays dark. Not that time.'; } };
}
/* the clocks, close up: drawn by the same hand as the ones on the wall */
function openClocks(){
  S.clocksSeen = true; save();
  openCloseup(`<div class="card pic" style="width:calc(var(--u)*56)"><div class="picwrap" style="aspect-ratio:307/184;background:#cfd5df"><svg viewBox="0 0 307.2 183.6" width="100%" height="100%" aria-hidden="true"><rect width="307.2" height="183.6" fill="#cfd5df"/>${clocksSVG().replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg><p class="otitle">The galley clocks</p></div></div>`);
  say('Two clocks, side by side. SINGAPORE says 12:40. LONDON says 05:40. Seven hours apart.');
}
/* the magazine: the crossword (optional, for grown-ups) and the Junior Explorer page */
function openMagazine(){
  S.magRead = true; save();
  const overlay = `<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true"><text x="1140" y="150" text-anchor="middle" font-size="54" font-family="Caprasimo,Georgia,serif" fill="#2f7c83">JUNIOR EXPLORER</text><text x="1080" y="650" text-anchor="middle" font-size="34" font-family="${FONT}" fill="#2b2622">Free magnifying glass!</text><text x="1080" y="705" text-anchor="middle" font-size="34" font-family="${FONT}" fill="#2b2622">Ask the crew for yours.</text><text x="460" y="150" text-anchor="middle" font-size="54" font-family="Caprasimo,Georgia,serif" fill="#6d4fb8">CROSSWORD</text></svg>`;
  openPic(A+'closeup-magazine.jpg', '16/9', 'Cloud Nine magazine', overlay + `<button class="book" id="magXw" style="left:14%;top:20%;width:30%;height:60%" aria-label="The crossword"><span></span></button>`, 62);
  $('magXw').onclick = e => { e.stopPropagation(); openXword(); };
  say(S.lensGiven ? 'The Junior Explorer page. Mary has her magnifying glass already.' : 'A crossword someone has started, and a Junior Explorer page: free magnifying glass, ask the crew.');
}
/* the crossword: four clues with a choice of words; the first letters of the right answers spell KAYA (Night Moth) */
const XW = [['A baby cat', ['KITTEN', 'PUPPY', 'LAMB'], 'KITTEN'], ['The opposite of below', ['UNDER', 'ABOVE', 'BESIDE'], 'ABOVE'], ['The colour of the sun', ['PURPLE', 'GREEN', 'YELLOW'], 'YELLOW'], ['A fruit that keeps the doctor away', ['PEAR', 'APPLE', 'PLUM'], 'APPLE']];
function openXword(){
  const rows = XW.map(([q, opts], i) => { const pick = S.xw[i];
    const cells = (pick || '_____').split('').map((ch, j) => `<span class="cell${j === 0 ? ' gold' : ''}">${ch === '_' ? '' : ch}</span>`).join('');
    return `<div class="clue"><span class="q">${i+1}. ${q}</span><span class="letters">${cells}</span><span class="opts">${opts.map(o => `<button class="ob quiet${pick === o ? ' on' : ''}" data-i="${i}" data-o="${o}">${o.charAt(0) + o.slice(1).toLowerCase()}</button>`).join('')}</span></div>`; }).join('');
  openCloseup(`<div class="card xw"><p class="otitle">The crossword. The gold squares spell a word.</p><div class="xwlist" id="xw">${rows}</div><p class="ofb" id="xwFb"></p></div>`);
  $('xw').querySelectorAll('button').forEach(b => b.onclick = () => { S.xw[+b.dataset.i] = b.dataset.o; save(); sfx('tick'); openXword(); });
  const word = S.xw.map(w => w ? w[0] : '·').join('');
  if (S.xw.every((w, i) => w === XW[i][2])){ if (!S.nightMoth){ S.nightMoth = true; save(); sfx('pickup'); } $('xwFb').textContent = '★ K, A, Y, A. Kaya! Nana would approve.'; }
  else $('xwFb').textContent = `Gold squares so far: ${word}`;
}
/* London under the magnifying glass: the map's top corner, drawn by the game, with four felt-tip doodles someone has added. The note says which one. */
function openLondon(){
  S.zoomed = true; save();
  const doodles = [['moth', 56, 18], ['boat', 44, 70], ['star', 14, 40], ['bird', 84, 36]];
  const pen = '#6d4fb8';
  const draw = {
    moth:`<path d="M0 0c-3-5-9-5-9-1 0 3 6 3 9 1 3 2 9 2 9-1 0-4-6-4-9 1z" fill="#f3c26a" stroke="#b8731a" stroke-width="1"/><path d="M0 -1v4M-2-4l2 3 2-3" fill="none" stroke="#b8731a" stroke-width="1" stroke-linecap="round"/>`,
    boat:`<path d="M-9 2h18l-4 5h-10z" fill="none" stroke="${pen}" stroke-width="1.6" stroke-linejoin="round"/><path d="M0 2v-10l7 8z" fill="none" stroke="${pen}" stroke-width="1.6" stroke-linejoin="round"/>`,
    star:`<path d="M0-9 2.6-2.8 9.2-2.4 4.2 1.8 5.6 8.4 0 5 -5.6 8.4 -4.2 1.8 -9.2-2.4 -2.6-2.8Z" fill="none" stroke="${pen}" stroke-width="1.6" stroke-linejoin="round"/>`,
    bird:`<path d="M-10 2c3-6 7-6 10 0 3-6 7-6 10 0" fill="none" stroke="${pen}" stroke-width="1.8" stroke-linecap="round"/>`
  };
  const svg = `<svg viewBox="0 0 400 240" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true"><rect width="400" height="240" fill="#dfe8d8"/>
    <path d="M0 150c40-10 70 10 110 0s60-30 100-18 70 40 110 30 50-20 80-14v92H0Z" fill="#cfe0ec"/>
    <path d="M0 150c40-10 70 10 110 0s60-30 100-18 70 40 110 30 50-20 80-14" fill="none" stroke="#7fb0cf" stroke-width="7" stroke-linecap="round"/>
    <g fill="#b9d6a8"><ellipse cx="220" cy="52" rx="30" ry="18"/><ellipse cx="150" cy="120" rx="26" ry="14"/><ellipse cx="300" cy="120" rx="22" ry="12"/><ellipse cx="90" cy="90" rx="18" ry="10"/></g>
    <g fill="none" stroke="#f1efe8" stroke-width="3"><path d="M40 0c20 60 60 100 140 120s140 30 180 100"/><path d="M0 110c80 10 160-10 240-60s120-50 160-40"/><path d="M200 0c-20 60-10 120 20 240"/></g>
    <g font-family="${FONT}" fill="#4a3b2a" font-weight="700"><text x="196" y="148" text-anchor="middle" font-size="22" letter-spacing="3">LONDON</text><text x="225" y="40" text-anchor="middle" font-size="12">Enfield</text><text x="225" y="78" text-anchor="middle" font-size="9" font-weight="400">Trent Park</text></g>
    <g font-family="${FONT}" fill="#4a3b2a" font-size="9"><text x="372" y="18">N</text><path d="M375 36v-10m-4 4 4-4 4 4" fill="none" stroke="#4a3b2a" stroke-width="1.4"/></g>
    ${doodles.map(([k, x, y]) => `<g transform="translate(${x*4} ${y*2.4}) scale(1.3)">${draw[k]}</g>`).join('')}</svg>`;
  const btns = doodles.map(([k, x, y]) => `<button class="book" data-k="${k}" style="left:${x-7}%;top:${y-10}%;width:14%;height:20%" aria-label="${k} drawn on the map"><span></span></button>`).join('');
  openPic('', '400/240', 'London, under the magnifying glass', svg + btns, 60);
  $('picwrap').querySelectorAll('.book').forEach(b => b.onclick = e => { e.stopPropagation(); const k = b.dataset.k; sfx('tap');
    if (k === 'moth'){ if (!S.noteRead){ say('A tiny moth, drawn in felt tip, right beside Enfield. Odd. Why would anyone draw that?'); return; }
      if (S.done) return; S.done = true; save(); sfx('pickup'); closeCloseup(); render(); say('Mary touches the little moth. It glows, just for a second. “Cabin crew, seats for landing,” says a voice.');
      setTimeout(() => showEnd('Wheels down', 'Wheels down! Fourteen hours and I did not sleep a wink. Somebody left a backwards note in my seat pocket, so I read it in the dark screen like a mirror: look at the map, find the moth. I woke the screen with London time (06:40, seven hours behind Singapore, the galley clocks told me), borrowed a magnifying glass from Priya, and there it was: a tiny moth drawn right beside Enfield. Elliot and Zaina slept through all of it.', S.nightMoth ? 'I did the crossword too. The gold squares spelled KAYA! ★' : 'The magazine crossword is still waiting for someone clever.'), 1800); return; }
    say({boat:'A little boat on the river, in felt tip.', star:'A star, in felt tip, out to the west.', bird:'A bird, in felt tip, over the east.'}[k] + (S.noteRead ? ' Not what the note said. Find the moth.' : ' Someone has doodled on the map. Which one matters?')); });
  say(S.noteRead ? 'London, big as a page. Someone has drawn on the map in felt tip: a boat, a star, a bird… and a moth, up near Enfield.' : 'London, big as a page. Someone has drawn little pictures on the map in felt tip. Why?');
}
/* inside the toilet: the basin and the mirror. A thing held in the strip can be used on the mirror from here, the way it would on the wall */
function openToilet(){
  const target = (id, l, t, w, h, label) => `<button class="book" data-id="${id}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%" aria-label="${label}"><span></span></button>`;
  openPic(A+'closeup-toilet.jpg', '16/9', 'The toilet', target('t_mirror', 40, 14, 20, 38, 'The mirror over the basin') + target('t_basin', 34, 62, 32, 14, 'Basin') + target('t_sign', 28, 22, 7, 16, 'A round sign') + target('t_button', 36, 55, 6, 8, 'The big button'), 60);
  $('picwrap').querySelectorAll('.book').forEach(b => b.onclick = e => { e.stopPropagation(); const id = b.dataset.id; if (S.held){ const item = S.held; S.held = null; useItem(item, id, null); return; } sfx(id === 't_mirror' ? 'tap' : 'knock'); act(id); });
}
function readNote(where){
  if (!S.noteRead){ S.noteRead = true; drop('note'); S.got.push('noteread'); save(); render(); }
  say(where === 'screen' ? 'Mary holds the note up to the dark screen. In the reflection, the writing turns the right way round!' : 'Mary holds the note up to the mirror over the basin. The writing turns the right way round!');
  setTimeout(() => openNote('noteRead'), 600);
}
const USES = {
  'note>f_screen':() => { if (S.awake){ sfx('knock'); say('The screen is bright now, and shows no reflection at all. The toilet at the back has a real mirror.'); return; } readNote('screen'); },
  /* the note on the door only opens the door: the mirror is inside, and the note goes on the mirror (checklist E30b) */
  'note>g_toilet':() => { S.held = 'note'; render(); openToilet(); say('The door folds open. A mirror over the basin: tap it, with the note.'); },
  'note>t_mirror':() => readNote('mirror'),
  'note>t_basin':() => { sfx('knock'); say('Not the basin. The mirror above it is the shiny thing.'); },
  'note>t_sign':() => { sfx('knock'); say('The sign is shiny, but not that shiny. The mirror.'); },
  'note>t_button':() => { sfx('knock'); say('Not the button! Never the button. The mirror.'); },
  'note>g_screen':() => { sfx('knock'); say(S.awake ? 'Bright, and no reflection. The toilet beside the galley has a mirror.' : 'Too far away and too high up to read anything in. The screen at Mary’s seat is closer.'); },
  'lens>f_screen':() => { if (!S.awake){ sfx('knock'); say('A magnifying glass on a dark screen shows Mary her own nose, bigger.'); return; } S.lensUsed = true; save(); openLondon(); },
  'lens>g_screen':() => { if (!S.awake){ sfx('knock'); say('The big screen is asleep too. Nothing to make bigger yet.'); return; } S.lensUsed = true; save(); openLondon(); },
  'lens>f_window':() => { sfx('tap'); say('Clouds, bigger. Still clouds.'); },
  'lens>f_kids':() => { sfx('tap'); say('Elliot’s open mouth, enormous. He does not wake up.'); },
  'lens>f_zaina':() => { sfx('tap'); say('Zaina’s nose, enormous. She does not wake up.'); },
  'lens>g_clocks':() => { sfx('tap'); say('Bigger clocks. Still 12:40 and 05:40.'); },
  'flightcard>f_screen':() => { sfx('knock'); say('The screen can’t read the card. But Mary can: tap it in the strip.'); },
  'mag>g_priya':() => { sfx('tap'); say('“The crossword? Someone beat you to it, I think. The Junior Explorer page is the one for you.”'); },
  'note>g_priya':() => { sfx('tap'); say('“Backwards writing! Someone in your family likes puzzles. Try a mirror.”'); }
};

function act(id){
  switch(id){
    /* row 34 */
    case 'f_screen':
      if (S.awake){ say('The flight map: Singapore to London, and the little plane nearly there. London is a dot with a smudge beside it, too small to make out.'); break; }
      openWake(); return;
    case 'f_tray': say('The tray table, latched. Breakfast is still an hour away.'); break;
    case 'f_pocket':
      if (!S.cardRead){ S.cardRead = true; S.got.push('flightcard'); save(); sfx('pickup'); render(); say('Behind the safety card, a flight card: landing times and a little map. It goes in the strip below.'); setTimeout(() => openNote('flightcard'), 700); return; }
      say(S.magTaken && S.noteSeen ? 'The seat pocket. Only the safety card left.' : 'The seat pocket. The safety card, and something else still tucked in it.'); break;
    case 'f_note': S.noteSeen = true; S.got.push('note'); save(); sfx('pickup'); render(); say('A folded note in loopy purple handwriting. But the writing is all backwards!'); setTimeout(() => openNote('noteMirror'), 700); return;
    case 'f_mag': S.magTaken = true; S.got.push('mag'); save(); sfx('pickup'); render(); say('Cloud Nine, the in-flight magazine. It goes in the strip below: tap it there to open it.'); return;
    case 'f_light': case 'f_light2': say('Mary’s reading light, the only one on in row 34.'); break;
    case 'f_seatl': say('The seat in front on the left. A head is tipped against the headrest, fast asleep.'); break;
    case 'f_seatr': say('The seat in front on the right. Someone is snoring, very gently.'); break;
    case 'f_window': say('Clouds like a duvet, and a sunrise the colour of kaya. London is somewhere under there.'); break;
    case 'f_seatfront': say('The side of the seat in front, with its tray table folded up.'); break;
    case 'f_sleeper': say('The passenger behind Mary, asleep under a blanket, one hand on the armrest. Best not to wake him.'); break;
    case 'f_rowsl': case 'f_rowsr': say('Rows and rows of sleeping passengers, all the way to the back. Somebody is snoring.'); break;
    case 'f_toiletfar': say('The toilet door, right at the back beside the galley curtain. A walk down the aisle.'); break;
    case 'f_kids': say('Elliot, straight across the aisle, has slept through the whole film. Mouth open.'); break;
    case 'f_zaina': say('Zaina, in the row in front of Elliot, hugging Peanut. Both of them snoring, very slightly.'); break;
    case 'f_sleeper2': case 'f_sleeper3': say('A sleeping stranger in a window seat. The whole plane is asleep but Mary.'); break;
    /* the galley */
    case 'g_counter': say(S.awake ? 'The galley counter, empty: breakfast has gone out on the trolley.' : 'The galley counter, with the breakfast still to come.'); break;
    case 'g_lockers': say('Galley lockers. Crew only.'); break;
    case 'g_priya': case 'f_priya': case 'f_trolley':
      if (S.magRead && !S.lensGiven){ S.lensGiven = true; S.got.push('lens'); save(); sfx('pickup'); render(); say('“A junior explorer! Here you are: one magnifying glass. Mind you don’t lose it.” It goes in the strip below.'); return; }
      if (S.screenTried && !S.awake){ if (!S.priyaTip){ S.priyaTip = true; save(); } say('“The sleepy screen? It wants London time. London is seven hours behind Singapore, all summer long. See the two clocks?”'); break; }
      if (S.done) say('“Seats for landing, junior explorer!”');
      else if (S.awake) say(S.lensGiven ? '“Breakfast! Eggs or pancakes? And found anything with that magnifying glass yet?”' : '“Breakfast! Eggs or pancakes? An hour to go.”');
      else if (S.lensGiven && !S.zoomed) say('“Found anything with that magnifying glass yet?”');
      else say('“Can’t sleep? Nearly there now. Breakfast in a little while.”');
      break;
    case 'g_pot': say('Coffee. Not for ten-year-olds.'); break;
    case 'g_cups': say('Paper cups, stacked like a tower.'); break;
    case 'g_clocks': openClocks(); return;
    case 'g_screen':
      if (S.awake) say('The big map: the whole route, the little plane nearly at London. There’s a smudge beside London, far too small to make out.');
      else say('The big screen on the far wall, dark and asleep, like the one at Mary’s seat.');
      break;
    case 'g_panell': case 'g_panelr': say('A blank panel. The crew keep their notices in their heads.'); break;
    case 'g_toilet': openToilet(); say('The door folds open. The toilet is free: a tiny basin, and a mirror above it.'); return;
    case 't_mirror': say(S.noteRead ? 'The mirror over the basin. Mary, looking tired, and the wall behind her.' : 'A mirror over the basin: Mary, and the wall behind her. A mirror turns everything the wrong way round. Or the right way.'); break;
    case 't_basin': say('A tiny basin and a tap that runs for exactly three seconds.'); break;
    case 't_sign': say('A round sign with no words on it. Mary knows what it means anyway.'); break;
    case 't_button': say('The big button. A sticker beside it once said PLEASE DO NOT PRESS. Mary would never.'); break;
    case 'g_holder': say('A holder on the wall, full of menus. Breakfast: eggs or pancakes.'); break;
    case 'g_hatch': say('The serving counter. Nothing on it yet.'); break;
    default: return false;
  }
}
function rows(){
  const out = [];
  if (!S.noteSeen) out.push([0, 'What is in the seat pocket?', 'not yet', false]);
  else {
    Object.entries(THREADS).forEach(([th, [label, done, steps]]) => {
      const idx = HINTS.map((h, k) => h.thread == th && !h.goal() ? k : -1).filter(k => k >= 0);
      const d = done(), p = steps.length - idx.length;
      out.push([d ? -1 : idx[0], label, d ? '✓ done' : (steps[p] || 'not started'), d]);
    });
    if (S.awake && S.noteRead && S.lensGiven) out.push([HINTS.findIndex(h => !h.thread && !h.goal()), 'Find the moth on the map', S.done ? '✓ found' : S.zoomed ? 'which drawing?' : 'look closer', S.done]);
  }
  return out;
}
function noticed(){
  const n = [];
  if (S.cardRead) n.push('Flight card: landing 13:40, Singapore time.');
  if (S.clocksSeen) n.push('Galley clocks: Singapore 12:40, London 05:40.');
  if (S.priyaTip) n.push('Priya: London is seven hours behind Singapore.');
  if (S.awake && !S.lensGiven && S.magRead) n.push('Priya is in the aisle now, with the breakfast trolley.');
  if (S.noteRead) n.push('The note: look at the map, find the moth. Signed N.');
  if (S.magRead && !S.lensGiven) n.push('Junior Explorer: ask the crew for a magnifying glass.');
  if (S.nightMoth) n.push('The crossword’s gold squares spell KAYA. ★');
  return n;
}
function sparkle(id){
  if (id === 'f_note') return !S.noteSeen;
  if (id === 'f_mag') return !S.magTaken;
  if (id === 'f_pocket') return S.noteSeen && !S.cardRead;
  if (id === 'f_screen') return (S.noteSeen && !S.noteRead) || (S.cardRead && (S.clocksSeen || S.priyaTip) && !S.awake) || (S.awake && S.lensGiven && !S.done);
  if (id === 'g_clocks') return S.cardRead && !S.clocksSeen;
  if (id === 'g_priya' || id === 'f_priya' || id === 'f_trolley') return (S.magRead && !S.lensGiven) || (S.screenTried && !S.priyaTip && !S.clocksSeen && !S.awake);
  if (id === 'g_toilet') return S.noteSeen && !S.noteRead;
  if (id === 'g_screen') return S.awake && S.lensGiven && !S.done;
  return false;
}
return {
  card:{place:'Somewhere over Europe, hour thirteen of fourteen', text:'Elliot and Zaina are asleep across the aisle. Mary is not. The cabin is dark and quiet, and something in the seat pocket in front of her is not the usual magazine.'},
  meanwhile:'Meanwhile, somewhere over Europe, Mary is the only one awake in row 34.',
  comic:[{pic:'../art/comic/flight-1.jpg', lines:['Night at the airport. Suitcases on the pavement, one with a jar of kaya in it.', 'Fourteen hours to London.']}, {pic:'../art/comic/flight-2.jpg', lines:['Hour thirteen. Everyone asleep.', 'Everyone except Mary.']}, {pic:'../art/comic/flight-3.jpg', lines:['And in the seat pocket, beside the magazine…', 'something that was not the usual magazine.']}],
  postcard:{pic:'../art/postcards/flight.jpg'},
  title:'The flight', blurb:'Hour thirteen of fourteen, somewhere over Europe: row 34 and the galley. A backwards note, a sleepy screen and a moth on the map.',
  track:'../art/music/flight.mp3', ambient:'plane', next:null,
  intro:'<b>Hour thirteen of fourteen.</b> Dawn at the window, and everyone asleep but you. Something in the seat pocket in front of you is not the usual magazine.',
  start:{room:'seat', view:1},
  fresh:() => ({noteSeen:false, cardRead:false, magTaken:false, magRead:false, noteRead:false, clocksSeen:false, priyaTip:false, screenTried:false, awake:false, time:null, lensGiven:false, lensUsed:false, zoomed:false, xw:[null, null, null, null], nightMoth:false}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, extra:EXTRA, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES, moves:'Priya: behind the galley counter with the breakfast trays until the screen is awake; then in the aisle with the trolley, the counter empty.',
  overlays:{g1:wallClocks, s1:screenLayer(41.5, 36.2, 17, 18.8), g3:screenLayer(33.5, 23.5, 33, 31.5)},
  act, sparkle, rows, noticed, speaker, helper:() => 'the moth'
};
})());
