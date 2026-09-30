/* The Moth House, landscape engine: Mary's stage 1, the last day of school (Knightsbrook International School).
   Five rooms and three parallel trails; see STORY.md and next/PLAYBOOK.md. Registered with the engine in index.html. */
'use strict';
registerStage('school', (function(){
/* ---------- rooms: each is a box, its views in turning order; a door names the room and the view you arrive facing ---------- */
const ROOMS = {
  classroom:{name:'Classroom 5H', into:'your classroom', views:['c1','c2','c3','c4']},
  corridor:{name:'Corridor', into:'the corridor', views:['h1','h2','h3','h4']},
  library:{name:'Library', into:'the library', views:['ln','le','ls','lw']},
  /* the hall: the stage with the chime bars, the STEM cabinet, the doors back to the corridor, the indoor playground */
  hall:{name:'Hall', into:'the hall', views:['hn','he','hs','hw']},
  /* the art room: the drying rack, the paint cupboard, the doorway back, the sink and the aprons */
  art:{name:'Art room', into:'the art room', views:['an','ae','as','aw']}
};
const WALLS = {
  c1:'../art/classroom/landscape-c1-front-whiteboard.jpg', c2:'../art/classroom/landscape-c2-window.jpg', c3:'../art/classroom/landscape-c3-door.jpg', c4:'../art/classroom/landscape-c4-timetable-desk.jpg',
  h1:'../art/school/h1.jpg', h2:'../art/school/h2.jpg', h3:'../art/school/h3.jpg', h4:'../art/school/h4.jpg',
  ln:'../art/school/ln.jpg', le:'../art/school/le.jpg', ls:'../art/school/ls.jpg', lw:'../art/school/lw.jpg',
  hn:'../art/school/hn.jpg', he:'../art/school/he.jpg', hs:'../art/school/hs.jpg', hw:'../art/school/hw.jpg',
  an:'../art/school/an.jpg', ae:'../art/school/ae.jpg', as:'../art/school/as.jpg', aw:'../art/school/aw.jpg'
};
/* door hotspot -> [room, index of the view you arrive facing (away from the door you came through)] */
const DOORS = {door:['corridor', 1], h_door5H:['classroom', 0], h_libdoors:['library', 0], l_doors:['corridor', 3],
  h_hall:['hall', 0], hs_doors:['corridor', 0], h_artdoor:['art', 0], as_door:['corridor', 1]};
/* Every doorway is drawn open and can be walked through; cupboards and cabinets are the locked things. */
const HOTS = {
  c1:[
    {id:'cupboard', l:8, t:34, w:20, h:54, label:'Supplies cupboard', anim:'peek', layer:'doors', sound:'knock'},
    {id:'mug', l:70.5, t:61.5, w:6.5, h:9.5, label:"Mr Hollis's mug", anim:'wobble', layer:'mug', sound:'tap'},
    {id:'board', l:32, t:34, w:37, h:37, label:'Whiteboard', sound:'tap'},
    {id:'apple', l:87.5, t:57.5, w:6.5, h:8.5, label:'Apple on the books', anim:'wobble', layer:'apple', sound:'tap'},
    {id:'tdesk', l:71, t:62, w:24, h:27, label:"Mr Hollis's desk", sound:'tap'}],
  c2:[
    {id:'window', l:30, t:17, w:40, h:31, label:'Classroom window', sound:'tap'},
    {id:'beans', l:33, t:30, w:35, h:37, label:'Bean plants on the window sill', anim:'bend', layer:'plant', sound:'leaf'},
    {id:'radiator', l:36, t:71, w:28, h:19, label:'Radiator', sound:'knock'}],
  c3:[
    {id:'bin', l:27, t:69, w:11, h:24, label:'Recycling bin', anim:'flip', layer:'lid', sound:'knock'},
    {id:'door', l:40, t:27, w:19, h:63, label:'Open door to the corridor', sound:'knock'},
    {id:'pegs', l:66, t:44, w:25, h:34, label:'Coat pegs', anim:'swing', layer:'coat', sound:'leaf'},
    {id:'lost', l:73, t:73, w:19, h:25, label:'Lost property box', anim:'pop', layer:'lost', sound:'paper'}],
  c4:[
    {id:'rules', l:26, t:30, w:8.5, h:18, label:'Class rules', sound:'paper'},
    {id:'timetable', l:38.5, t:25, w:23, h:30, label:'Class timetable', sound:'paper'},
    {id:'clock', l:67, t:23, w:8.5, h:16, label:'Clock', sound:'tick'},
    {id:'bookshelf', l:21, t:59, w:17.5, h:29, label:'Bookshelf', sound:'knock'},
    {id:'desk', l:41, t:61, w:18, h:33, label:"Mary's desk", sound:'tap'},
    {id:'envelope', l:50, t:65, w:8, h:8.5, label:"Envelope on Mary's desk", key:true, anim:'lift', layer:'envelope', sound:'paper', hideWhen:() => S.got.includes('envelope')},
    {id:'bag', l:55.5, t:77, w:9, h:17, label:"Mary's schoolbag", anim:'wobble', layer:'backpack', sound:'tap'},
    {id:'hamster', l:67, t:51.5, w:11, h:11, label:'Nutmeg the hamster', anim:'sniff', layer:'hamster', sound:'squeak'},
    {id:'cabinet', l:66, t:62.5, w:13, h:27, label:'Filing cabinet', sound:'knock'}],
  /* corridor */
  h1:[
    {id:'h_lockers', l:19, t:31, w:62, h:50, label:'The lockers', sound:'knock'},
    {id:'h_locker', l:34, t:31, w:9, h:51, label:"Mary's locker", sound:'knock', key:true, anim:'lockerTap', layer:'lockerdoor'},
    {id:'h_certs', l:36.5, t:17, w:27, h:12, label:'Certificates', sound:'paper'},
    {id:'h_bench', l:24, t:81, w:52, h:12, label:'Bench', sound:'knock'}],
  h2:[
    {id:'h_libdoors', l:38, t:38, w:24, h:50, label:'Open doorway to the library', sound:'knock'},
    {id:'h_fountain', l:14, t:56, w:12, h:26, label:'Water fountain', sound:'tap', anim:'squirt', layer:'water'},
    {id:'h_trophies', l:71, t:37, w:19, h:56, label:'Trophy cabinet', sound:'tap'}],
  h3:[
    {id:'h_notices', l:31.5, t:26.5, w:37, h:35, label:'Notice board', sound:'paper'},
    {id:'h_bonus', l:59.5, t:49, w:8.5, h:10.5, label:'Bonus riddle card', sound:'paper', anim:'swing', layer:'bonuscard'},
    {id:'h_hall', l:70, t:27, w:15, h:57, label:'Open doorway to the hall', sound:'knock'}],
  h4:[
    {id:'h_door5H', l:12, t:32, w:22, h:58, label:'Open doorway to classroom 5H', sound:'knock'},
    {id:'h_artdoor', l:72, t:32, w:16, h:58, label:'Open doorway to the art room', sound:'knock'},
    {id:'h_bunting', l:25, t:13, w:50, h:20, label:'Bunting', sound:'leaf', anim:'swing', layer:'bunting'}],
  /* hall: arrive facing the stage; the STEM cabinet on the right, the doors behind, the indoor playground on the left */
  hn:[
    {id:'hn_stage', l:15, t:70, w:70, h:21, label:'The stage', sound:'knock'},
    {id:'hn_bars', l:39, t:43, w:22, h:33, label:'Chime bars on the stage', sound:'tick'},
    {id:'hn_drawer', l:43, t:77, w:14, h:11, label:'Little drawer in the front of the stage', sound:'knock', anim:'rattle', layer:'drawer', key:true},
    {id:'hn_banner', l:34, t:24, w:32, h:14, label:'HAPPY HOLIDAYS banner', sound:'leaf'}],
  he:[
    {id:'he_cabinet', l:27, t:31, w:24, h:59, label:'STEM week cabinet', sound:'knock', key:true},
    {id:'he_lock', l:36.5, t:55.5, w:6.5, h:13, label:'Padlock with a star on it', sound:'tick', anim:'rattle', layer:'starlock'},
    {id:'he_points', l:12, t:34, w:14, h:24, label:'House points chart', sound:'paper'},
    {id:'he_sign', l:32, t:13, w:14, h:17, label:'STEM WEEK poster', sound:'paper'}],
  hs:[
    {id:'hs_doors', l:19, t:27, w:37, h:65, label:'Open doors to the corridor', sound:'knock'},
    {id:'hs_bench', l:58, t:77, w:33, h:16, label:'Bench', sound:'knock'}],
  hw:[
    {id:'hw_mat', l:5, t:74, w:90, h:17, label:'Soft play mat', sound:'leaf'},
    {id:'hw_slide', l:60, t:54, w:24, h:31, label:'Little slide', sound:'knock'},
    {id:'hw_blocks', l:23, t:52, w:11, h:34, label:'Stack of soft blocks', sound:'leaf', anim:'topple', layer:'blocks', hideWhen:() => S.toppled},
    {id:'hw_blocks2', l:27, t:70, w:21, h:18, label:'Toppled soft blocks', sound:'leaf', hideWhen:() => !S.toppled},
    {id:'hw_mallet', l:20, t:74, w:8, h:13, label:'Wooden beater', sound:'tap', key:true, anim:'lift', layer:'mallet', hideWhen:() => !S.toppled || S.got.includes('mallet') || S.beater}],
  /* art room: arrive facing the drying rack; the paint cupboard on the right, the doorway behind, the sink and aprons on the left */
  an:[
    {id:'an_rack', l:28, t:22, w:44, h:52, label:'Drying rack', sound:'knock'},
    {id:'an_p1', l:30.5, t:42, w:9, h:19, label:'Painting of a house', sound:'paper'},
    {id:'an_p2', l:40, t:43, w:9.5, h:16, label:'Painting of a rainbow', sound:'paper'},
    {id:'an_p3', l:50, t:43, w:8.5, h:18, label:'Painting of a cat', sound:'paper'},
    {id:'an_moth', l:58.5, t:42, w:11.5, h:23, label:"Mary's moth painting, with three colour stripes under it", sound:'paper'}],
  ae:[
    {id:'ae_cupboard', l:38, t:36, w:24, h:56, label:'Paint cupboard', sound:'knock', key:true},
    {id:'ae_lock', l:45.5, t:59.5, w:9, h:15, label:'Padlock with three colour dials', sound:'tick', anim:'rattle', layer:'diallock'},
    {id:'ae_pots', l:38, t:17, w:24, h:14, label:'Shelf of paint pots', sound:'tap'}],
  as:[
    {id:'as_door', l:39, t:29, w:19, h:62, label:'Open doorway to the corridor', sound:'knock'},
    {id:'as_bench', l:61, t:76, w:26, h:17, label:'Bench of clay things', sound:'knock'},
    {id:'as_clay', l:61, t:65, w:26, h:12, label:'Clay animals', sound:'tap'}],
  aw:[
    {id:'aw_sink', l:16, t:55, w:31, h:21, label:'Paint sink', sound:'knock'},
    {id:'aw_tap', l:29.5, t:43, w:7.5, h:13, label:'Tap', sound:'tap', anim:'pour', layer:'pour'},
    {id:'aw_jar', l:39.5, t:37, w:7.5, h:19, label:'Jar of brushes', sound:'tap'},
    {id:'aw_apronB', l:56.5, t:38, w:9, h:43, label:'Blue apron', sound:'leaf'},
    {id:'aw_apronG', l:65.5, t:38, w:8, h:43, label:'Green apron', sound:'leaf'},
    {id:'aw_apronP', l:73.5, t:38, w:9.5, h:43, label:"Mr Hollis's splattered apron", sound:'leaf'},
    {id:'aw_key', l:74.5, t:54.5, w:8.5, h:9, label:'Star key in the apron pocket', sound:'tap', key:true, anim:'lift', layer:'starkey', hideWhen:() => !S.keyOut || S.got.includes('starkey') || S.stemOpen}],
  /* library: a square room. Arrive facing the Science and Music wall, window on the right, entrance behind, Art and Stories on the left. */
  ln:[
    {id:'l_shelfSci', l:5, t:29, w:22.5, h:61, label:'Science shelf', sound:'paper'},
    {id:'l_shelfMus', l:72.5, t:29, w:22.5, h:61, label:'Music shelf', sound:'paper'},
    {id:'l_globe', l:35, t:58, w:9, h:19, label:'Globe', sound:'tap', anim:'spin', layer:'globe'},
    {id:'l_headphones', l:44.5, t:66, w:7, h:11, label:'Headphones', sound:'tap', anim:'wobble', layer:'headphones'},
    {id:'l_rocks', l:51, t:66, w:16, h:10, label:'Rock collection', sound:'knock'},
    {id:'l_cabinet', l:33, t:76, w:34, h:14, label:'Cabinet', sound:'knock'}],
  le:[
    {id:'l_window', l:33, t:19, w:34, h:46, label:'Library window', sound:'tap'},
    {id:'l_cushions', l:35, t:57, w:14, h:11, label:'Cushions on the window seat', sound:'leaf', anim:'plump', layer:'cushions'},
    {id:'l_seat', l:32, t:66, w:36, h:18, label:'Window seat', sound:'knock'},
    {id:'l_knit', l:77.5, t:67, w:6, h:11.5, label:'Knitted hamster on the chair', sound:'squeak', anim:'wobble', layer:'knit'},
    {id:'l_chair', l:66, t:56, w:22, h:37, label:'Storytime chair', sound:'knock'},
    {id:'l_rug', l:52, t:85, w:37, h:12, label:'Rug', sound:'leaf'}],
  ls:[
    {id:'l_doors', l:24, t:30, w:17, h:50, label:'Open doorway to the corridor', sound:'knock'},
    {id:'l_quiet', l:56.5, t:28, w:24, h:12, label:'QUIET PLEASE sign', sound:'tap'},
    {id:'l_card', l:57, t:58, w:7, h:8, label:'BACK SOON card', sound:'paper'},
    {id:'l_bell', l:64.5, t:58.5, w:6, h:8, label:'Desk bell', sound:'tick', anim:'ding', layer:'bell'},
    {id:'l_desk', l:54, t:60, w:37, h:31, label:"Librarian's desk", sound:'paper'}],
  lw:[
    {id:'l_shelfArt', l:4, t:28, w:25, h:66, label:'Art shelf', sound:'paper'},
    {id:'l_notice', l:43.5, t:32, w:12, h:28, label:'Notice about the trolley', sound:'paper'},
    {id:'l_trolley', l:51, t:66, w:15, h:28, label:'Returns trolley', sound:'knock', anim:'roll', layer:'trolley'},
    {id:'l_shelfSto', l:72, t:28, w:25, h:66, label:'Stories shelf', sound:'paper'}]
};
/* Cut-out layers drawn over each wall: the wall pictures have these things removed, so the cut-out is the only copy.
   l,t,w,h are the cut-out's box in picture percentages; clipBottom hides anything below that line (things inside a box). */
const LAYERS = {
  c1:[
    {src:'../art/classroom/layer-doors.png', group:'doors', l:8.6, t:36, w:17, h:51},
    {src:'../art/classroom/layer-mug.png', group:'mug', l:71.7, t:62.8, w:4.2, h:7.2, shadow:.6},
    {src:'../art/classroom/layer-apple.png', group:'apple', l:89.5, t:59.3, w:2.6, h:5.5, shadow:.5}],
  c2:[ /* each plant is split at the rim: the plant bends, the pot below it never moves and is drawn in front */
    {src:'../art/classroom/layer-plant1-top.png', group:'plant', l:34.4, t:54.0, w:5.6, h:3.82},
    {src:'../art/classroom/layer-plant2-top.png', group:'plant', l:42.4, t:49.5, w:5.5, h:8.26},
    {src:'../art/classroom/layer-plant3-top.png', group:'plant', l:51.0, t:36.1, w:6.8, h:21.7},
    {src:'../art/classroom/layer-plant4-top.png', group:'plant', l:59.3, t:31.5, w:7.7, h:26.31},
    {src:'../art/classroom/layer-plant1-pot.png', l:34.4, t:57.71, w:5.6, h:8.79, shadow:.5},
    {src:'../art/classroom/layer-plant2-pot.png', l:42.4, t:57.65, w:5.5, h:8.85, shadow:.5},
    {src:'../art/classroom/layer-plant3-pot.png', l:51.0, t:57.69, w:6.8, h:8.81, shadow:.5},
    {src:'../art/classroom/layer-plant4-pot.png', l:59.3, t:57.70, w:7.7, h:8.80, shadow:.5}],
  c3:[
    {src:'../art/classroom/layer-coat.png', group:'coat', l:67.1, t:50.6, w:10.8, h:24.2, lit:.45},
    {src:'../art/classroom/layer-lost.png', group:'lost', l:79.2, t:77.2, w:8.8, h:7.85},
    /* the front of the box, cut from the wall picture itself, drawn over the things inside it */
    {src:'../art/classroom/layer-boxfront.png', l:75.78, t:82.31, w:13.85, h:14.72},
    {src:'../art/classroom/layer-lid.png', group:'lid', l:27.4, t:68.6, w:10.4, h:10.7}],
  c4:[
    {src:'../art/classroom/layer-envelope.png', group:'envelope', l:50.5, t:66.5, w:6.5, h:5.5, hideWhen:() => S.got.includes('envelope')},
    /* the hamster lives inside the cage: it is clipped to the cage and the cage's glass is drawn faintly over it */
    {src:'../art/classroom/layer-hamster.png', group:'hamster', l:68.1, t:56.3, w:3.9, h:5.5, glass:[67.3, 52.2, 10.2, 9.3], shadow:.5, tone:'saturate(.72) brightness(.94) contrast(.92)', idle:'breathe', amount:.02, period:2.4},
    {src:'../art/classroom/layer-backpack.png', group:'backpack', l:58.2, t:78.5, w:7, h:15.3, shadow:.8}],
  /* corridor */
  h1:[
    /* the report and postcard sit on the lower shelf, hidden by the door until it opens, gone once collected */
    {src:'../art/school/layer-report.png', group:'report', l:35.4, t:61.4, w:6.2, h:8.0, showWhen:() => S.opened && !S.done},
    /* Mary's locker door: cut from the wall's own lockers and coloured purple, so it matches exactly; open once the code is right */
    {src:'../art/school/layer-lockerdoor.png', group:'lockerdoor', l:34.75, t:31.6, w:7.4, h:50.8, openWhen:() => S.opened}],
  h2:[{draw:'water', group:'water', l:20.6, t:62.5, w:5.4, h:9.2, flash:true}],
  h3:[{src:'../art/school/layer-bonuscard.png', group:'bonuscard', l:60.4, t:50.2, w:6.4, h:8.6, lit:.6}],
  h4:[{src:'../art/school/layer-bunting.png', group:'bunting', l:25, t:14, w:50, h:19.9}],
  /* hall */
  hn:[ /* the little drawer in the front of the stage: closed until the tune is played, then it slides out with the slip inside */
    {src:'../art/school/layer-drawer.png', group:'drawer', kind:'drawer', inside:'../art/school/item-slipMu.png', l:44, t:78.2, w:12, h:8.6}],
  he:[ /* the star padlock hangs on the cabinet's hasp; the star key makes it drop off and it is gone for good */
    {src:'../art/school/layer-starlock.png', group:'starlock', l:38.1, t:58, w:3.4, h:8.84, padBelow:1.6, gone:() => S.stemOpen, over:(ctx, ox, oy, W, H) => drawStaple(ctx, ox, oy, W, H, 50, 7)}],
  hw:[ /* the beater lies where the stack stood; the stack of three soft blocks tumbles apart when tapped */
    {src:'../art/school/layer-mallet.png', group:'mallet', l:21.5, t:76, w:5, h:9.45, shadow:.6, showWhen:() => S.toppled, hideWhen:() => S.got.includes('mallet') || S.beater},
    {src:'../art/school/layer-blocks.png', group:'blocks', kind:'blocks', l:24, t:53.4, w:9, h:31.6, padX:2.3, bands:[[0, .318], [.318, .612], [.612, 1]]}],
  /* art room */
  ae:[ /* the combination padlock: its three white dials show the colours the player has set, drawn over the picture */
    {src:'../art/school/layer-diallock.png', group:'diallock', l:47.7, t:62, w:4.4, h:10.19, padBelow:1.6, gone:() => S.paintOpen, over:drawDials}],
  aw:[
    {draw:'pour', group:'pour', l:32.3, t:48.5, w:4.4, h:8.5, flash:true},
    /* the star key pokes out of the apron pocket: the layer is clipped at the pocket's rim, so the rest of the key is inside it */
    {src:'../art/school/layer-starkey.png', group:'starkey', l:76.4, t:57.6, w:4.6, h:8.04, clipBottom:62.2, hideWhen:() => !S.keyOut || S.got.includes('starkey') || S.stemOpen}],
  /* library */
  ln:[
    {src:'../art/school/layer-globe.png', group:'globe', l:36.5, t:60.5, w:6.5, h:14.5, shadow:.6, sphere:[230, 260, 227]},
    {src:'../art/school/layer-headphones.png', group:'headphones', l:44.5, t:69.5, w:6, h:7.1, shadow:.5},
    {src:'../art/school/layer-sticky.png', l:83.6, t:46, w:2.6, h:4.7}],
  le:[
    {src:'../art/school/layer-cushions.png', group:'cushions', l:36, t:58.5, w:12, h:9.05, shadow:.5},
    {src:'../art/school/layer-knithamster.png', group:'knit', l:78.6, t:68.2, w:3.4, h:8.71, shadow:.6}],
  ls:[{src:'../art/school/layer-bell.png', group:'bell', l:65, t:59.5, w:4, h:5.85, shadow:.6}],
  lw:[{src:'../art/school/layer-trolley.png', group:'trolley', l:52, t:69, w:13, h:24, shadow:.7}]
};

/* close-up pictures that belong to a room, loaded with it */
const EXTRA = {library:['../art/school/shelf-sci.jpg', '../art/school/shelf-mus.jpg', '../art/school/shelf-art.jpg', '../art/school/shelf-trolley.jpg', '../art/school/shelf-sto.jpg'],
  hall:['../art/school/closeup-bells.jpg', '../art/school/closeup-stem.jpg'], art:['../art/school/closeup-mothpainting.jpg', '../art/school/closeup-paint.jpg']};

/* ---------- text: notes, shelves, timetable, items, hints (the same puzzle as the story plan) ---------- */
/* the four chime bars and their notes; the page of music names them in the order they must be struck */
const BARS = {red:{hex:'#d9453d', hz:523.25, name:'red'}, yellow:{hex:'#f2c53d', hz:659.25, name:'yellow'}, green:{hex:'#4fa64a', hz:783.99, name:'green'}, blue:{hex:'#3f6fcf', hz:1046.5, name:'blue'}};
const TUNE_ORDER = ['green', 'red', 'blue', 'yellow'];
/* the six paint pots, in the order the padlock's dials turn through them; the moth's three stripes are the code */
const PAINTS = [['red', '#d9453d'], ['yellow', '#f2c53d'], ['blue', '#3f6fcf'], ['green', '#4fa64a'], ['orange', '#ee8a2e'], ['purple', '#8a5cc2']];
const PAINT_CODE = [5, 3, 4]; /* purple, green, orange */
/* the page of music, drawn by the game so the colours are exact: four notes on a stave */
function staff(){
  const ys = {green:35, red:55, blue:25, yellow:45};
  let s = '<svg class="staff" viewBox="0 0 300 76" aria-label="Four notes on a stave: green, red, blue, yellow">';
  [15,25,35,45,55].forEach(y => s += `<line x1="10" y1="${y}" x2="290" y2="${y}" stroke="#2b2836" stroke-width="1.2"/>`);
  s += '<line x1="10" y1="15" x2="10" y2="55" stroke="#2b2836" stroke-width="2"/><line x1="290" y1="15" x2="290" y2="55" stroke="#2b2836" stroke-width="2"/>';
  TUNE_ORDER.forEach((c, i) => { const x = 60 + i*60, y = ys[c]; s += `<line x1="${x+9}" y1="${y-2}" x2="${x+9}" y2="${y-30}" stroke="#2b2836" stroke-width="2"/><ellipse cx="${x}" cy="${y}" rx="10" ry="7" fill="${BARS[c].hex}" stroke="#2b2836" stroke-width="1.8" transform="rotate(-18 ${x} ${y})"/>`; });
  return s + '</svg>';
}
/* the three colour stripes Mary painted under her moth: drawn on the wall picture and in the close-up from the same code */
function stripesSVG(vb){
  let s = `<svg viewBox="${vb}" preserveAspectRatio="none" width="100%" height="100%" style="position:absolute;left:0;top:0;width:100%;height:100%" aria-hidden="true">`;
  PAINT_CODE.forEach((p, i) => { const x = 130 + i*270, tilt = [-1.2, 1, -0.6][i]; s += `<rect x="${x}" y="600" width="230" height="66" rx="10" fill="${PAINTS[p][1]}" transform="rotate(${tilt} ${x+115} 633)"/><rect x="${x+18}" y="612" width="150" height="9" rx="4" fill="rgba(255,255,255,.28)" transform="rotate(${tilt} ${x+115} 633)"/>`; });
  return s + '</svg>';
}
/* the colour discs on the padlock's three dials, drawn over the cut-out (and over the same picture in the close-up) */
const DIALS = [[31.9, 72.4], [60.0, 70.6], [86.1, 68.9]];
/* a metal staple through the padlock's shackle, drawn over the cut-out, so the lock hangs from the hasp instead of sitting on the doors */
function drawStaple(ctx, ox, oy, W, H, cx, cy){
  const rx = W*0.16, ry = H*0.052; ctx.save(); ctx.lineCap = 'round';
  ctx.strokeStyle = '#2b2b2b'; ctx.lineWidth = Math.max(2, W*0.075); ctx.beginPath(); ctx.ellipse(ox + cx/100*W, oy + cy/100*H, rx, ry, 0, Math.PI*0.95, Math.PI*2.05); ctx.stroke();
  ctx.strokeStyle = '#9a9ea3'; ctx.lineWidth = Math.max(1, W*0.04); ctx.beginPath(); ctx.ellipse(ox + cx/100*W, oy + cy/100*H, rx, ry, 0, Math.PI*1.05, Math.PI*1.95); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = Math.max(1, W*0.014); ctx.beginPath(); ctx.ellipse(ox + cx/100*W, oy + cy/100*H - ry*0.35, rx*0.85, ry*0.7, 0, Math.PI*1.15, Math.PI*1.85); ctx.stroke(); ctx.restore();
}
function drawDials(ctx, ox, oy, W, H){ drawStaple(ctx, ox, oy, W, H, 50, 7); DIALS.forEach(([cx, cy], i) => { ctx.fillStyle = PAINTS[S.cdials[i]][1]; ctx.beginPath(); ctx.ellipse(ox + cx/100*W, oy + cy/100*H, W*0.075, H*0.068, 0, 0, Math.PI*2); ctx.fill(); }); }
const NOTES = {
  envelope:{hand:true, html:'<span class="head">For Mary</span><span>It’s our last-day treasure hunt! Three riddles lead to three library books. Each book starts a trail, and at the end of each trail is a slip with a lesson and a day. Look each one up on our timetable: its period number is one number of your locker code, in riddle order.</span><span class="big">1. At night I’m full of lights, but I’m not a city.<br>2. I have eighty-eight keys, but I can’t open a single door.<br>3. I’m full of colour, but I’m not a rainbow. Brushes are my best friends.</span><span>Mr Hollis</span>'},
  noteStar:{hand:true, html:'<span class="head">Found me!</span><span class="big">The key to the stars is in my art apron, the one with all the paint on it. Then look for the star.</span><span>Mr H</span>'},
  notePaint:{hand:true, html:'<span class="head">Found me!</span><span class="big">Your slip is locked in the paint cupboard. My moth knows the colours: look under it on the drying rack.</span><span>Mr H</span>'},
  music:{hand:false, html:'<span class="head">Playing the Piano, page 12: Holiday Song</span>' + staff() + '<span>Four notes. Play me in the hall!</span>'},
  slipSc:{hand:true, html:'<span class="head">Slip for riddle 1</span><span class="big">SCIENCE on THURSDAY</span><span>Find it on the timetable. Its period number is the first number of your locker code.</span>'},
  slipMu:{hand:true, html:'<span class="head">Slip for riddle 2</span><span class="big">MUSIC on TUESDAY</span><span>Find it on the timetable. Its period number is the second number of your locker code.</span>'},
  slipAr:{hand:true, html:'<span class="head">Slip for riddle 3</span><span class="big">ART on WEDNESDAY</span><span>Find it on the timetable. Its period number is the third number of your locker code.</span>'},
  bonus:{hand:false, html:'<span class="head">Bonus riddle for super-sleuths</span><span>Someone in London loves postcards and moths. Spell her name with the first letters of four stories.</span>'},
};
/* Each shelf close-up is a generated picture of the real shelf; `slots` are the books' boxes on it in picture percentages [left, top, right, bottom]. */
const SHELVES = {
  sci:{title:'Science shelf', pic:'../art/school/shelf-sci.jpg', slots:[[39.3,22,39.3,88,7],[46.5,21.5,46.5,88,6],[53.2,21,53.2,88,6.5],[60.7,23,62.5,89,7]], books:[
    ['Volcanoes!','Hot, rocky and a bit loud. No slip inside.'],
    ['The Night Sky','noteStar'],
    ['Bugs Up Close','Very close. Too close! No slip inside.'],
    ['Weather Watch','All about rain. Singapore has plenty. No slip inside.']]},
  mus:{title:'Music shelf', pic:'../art/school/shelf-mus.jpg', slots:[[13.5,17,14,90,9.5],[23.8,25,23.8,89,7],[43,39,56,60]], books:[
    ['Drums for Beginners','Boom, boom, tish! No slip inside.'],
    ['Songs of the Sea','Sailors’ songs. No slip inside.'],
    ['gap','A sticky note in the gap: “Returned today. See the trolley.”']]},
  art:{title:'Art shelf', pic:'../art/school/shelf-art.jpg', slots:[[35.3,26,35.3,89,6],[41.5,35,41.5,89,6],[49.7,26,49.5,89,7.5],[59,30,59,89,8]], books:[
    ['Clay Creatures','Squishy animals to make. No slip inside.'],
    ['Sketching','Pencils, and more pencils. No slip inside.'],
    ['The Painting Book','notePaint'],
    ['Paper Folding','How to fold paper birds, boats and moths. No slip inside.']]},
  trolley:{title:'Returns trolley', pic:'../art/school/shelf-trolley.jpg', slots:[[50.5,22,50.5,80,7],[74.7,24,74.5,82,8],[86,21,86,81,7]] /* the spine panels, not the tilted covers beside them */, books:[
    ['Dinosaur Days','Roar! No slip inside.'],
    ['Playing the Piano','music'],
    ['Football Stars','No slip inside.']]},
  sto:{title:'Stories shelf', pic:'../art/school/shelf-sto.jpg', slots:[[42.7,21,42.7,88,8.5],[51.5,21,51.5,88,8],[60.2,18,60.2,88,8.5],[70,20,70,88,10],[81,21,81,88,10],[90.5,19,91,87,8]], books:[
    ['Nobody’s Garden','A secret garden story.'],
    ['Jam for Tea','A story about a greedy bear.'],
    ['A Quiet Moon','A bedtime story.'],
    ['Owls at Dusk','A story about night birds.'],
    ['Nine Lanterns','A story about a festival of lights.'],
    ['Along the River','A story about a boat trip.']]}
};
const TIMETABLE = {Mon:['En','Ma','Sc','Ar','PE','Mu'], Tue:['Ma','En','Mu','Ge','Sc','Li'], Wed:['Sc','Ma','En','PE','Mu','Ar'], Thu:['En','Ar','Ma','Sc','Li','PE'], Fri:['Ma','Mu','Ar','En','PE','Sc']};
const CODE = [4, 3, 6]; /* Science on Thursday = 4, Music on Tuesday = 3, Art on Wednesday = 6 */
const SUBJECT = {Ma:['i-ma','#2f7c83','Maths'], En:['i-en','#d9a622','English'], Sc:['i-sc','#3b78b8','Science'], Mu:['i-mu','#7a5cc2','Music'], Ar:['i-ar','#d0602f','Art'], PE:['i-pe','#27794c','PE'], Ge:['i-ge','#a8744a','Geography'], Li:['i-li','#c4589a','Library']};

const ITEMS = {
  envelope:{name:'riddle envelope', note:'envelope', icon:'<img src="../art/classroom/item-envelope.png" alt="">'},
  noteStar:{name:'note from The Night Sky', note:'noteStar', found:'A folded note falls out of {b}!', icon:'<img src="../art/school/item-note.png" alt="">'},
  music:{name:'page of music', note:'music', found:'A loose page slips out of {b}!', icon:'<img src="../art/school/item-music.png" alt="">'},
  notePaint:{name:'note from the painting book', note:'notePaint', found:'A folded note falls out of {b}!', icon:'<img src="../art/school/item-note.png" alt="">'},
  starkey:{name:'star key', icon:'<img src="../art/school/item-starkey.png" alt="">'},
  mallet:{name:'beater', icon:'<img src="../art/school/item-mallet.png" alt="">'},
  slipSc:{name:'Science slip', note:'slipSc', icon:'<img src="../art/school/item-slipSc.png" alt="">'},
  slipMu:{name:'Music slip', note:'slipMu', icon:'<img src="../art/school/item-slipMu.png" alt="">'},
  slipAr:{name:'Art slip', note:'slipAr', icon:'<img src="../art/school/item-slipAr.png" alt="">'}
};
/* Hints follow three threads at once: the moth helps with whichever trail the player has got furthest along. */
const HINTS = [
  {goal:() => S.got.includes('envelope'), tips:[
    'Mr Hollis left something on your desk.',
    'Turn to the timetable wall and look at your desk.',
    'Tap the envelope on your desk.']},
  /* thread 1: the night sky, the apron, the star key, the STEM cabinet */
  {thread:1, goal:() => S.got.includes('noteStar'), tips:[
    'Riddle 1: what is full of lights at night, but isn’t a city?',
    'The night sky! Find a book about it in the library.',
    'Go through the corridor to the library. Open The Night Sky on the blue Science shelf.']},
  {thread:1, goal:() => S.got.includes('starkey') || S.stemOpen, tips:[
    'The note says the key is in Mr Hollis’s art apron.',
    'The art room is off the corridor. Which apron has the paint on it?',
    'In the art room, tap the splattered apron by the sink, then take the key from its pocket.']},
  {thread:1, goal:() => S.stemOpen, tips:[
    'A key with a star. Where have you seen a star on a lock?',
    'The STEM cabinet in the hall has a star on its padlock.',
    'In the hall, tap the star key in the strip, then tap the cabinet’s padlock.']},
  {thread:1, goal:() => S.got.includes('slipSc'), tips:[
    'The padlock is off. What did Mr Hollis leave in the STEM cabinet?',
    'Look inside the cabinet in the hall.',
    'Tap the STEM cabinet and take the slip from the shelf.']},
  /* thread 2: the piano book, the beater under the blocks, the chime bars, the stage drawer */
  {thread:2, goal:() => S.got.includes('music'), tips:[
    'Riddle 2: eighty-eight keys, and no doors. What could it be?',
    'A piano! But the Music shelf has a gap. Where do returned books go?',
    'In the library, find the returns trolley next to the Art shelf. Open Playing the Piano.']},
  {thread:2, goal:() => S.got.includes('mallet') || S.beater, tips:[
    'Four coloured notes. Something in the school has four colours you can play.',
    'The chime bars on the hall stage. But what do you hit them with?',
    'In the hall’s playground corner, tap the stack of soft blocks. Something is under them.']},
  {thread:2, goal:() => S.beater, tips:[
    'You have a beater. What does it play?',
    'Take the beater to the chime bars on the hall stage.',
    'Tap the beater in the strip, then tap the chime bars.']},
  {thread:2, goal:() => S.drawerOpen, tips:[
    'Play the four notes from the page, in the order they are written.',
    'The colours on the page are the bars. Green first.',
    'Tap the bars green, red, blue, then yellow.']},
  {thread:2, goal:() => S.got.includes('slipMu'), tips:[
    'Something clicked in the stage.',
    'A little drawer in the front of the stage has slid open.',
    'Tap the open drawer in the front of the stage.']},
  /* thread 3: the painting book, the moth's stripes, the colour padlock */
  {thread:3, goal:() => S.got.includes('notePaint'), tips:[
    'Riddle 3: full of colour, and brushes are its best friends.',
    'It’s a book about painting. Try the orange Art shelf in the library.',
    'Open The Painting Book on the Art shelf.']},
  {thread:3, goal:() => S.paintOpen, tips:[
    'The note says Mr Hollis’s moth knows the colours.',
    'Mary’s moth painting is on the drying rack in the art room. Look under it.',
    'The three stripes under the moth are the padlock’s colours: purple, green, orange. Set the dials on the paint cupboard and tap Open.']},
  {thread:3, goal:() => S.got.includes('slipAr'), tips:[
    'The paint cupboard is open.',
    'Look inside the paint cupboard in the art room.',
    'Tap the paint cupboard and take the slip from the shelf.']},
  {goal:() => S.opened, tips:[
    'You have three lessons and three days. The class timetable turns each into a number.',
    'The whiteboard says which picture is which lesson. Find each lesson on its day: the period number at the top is one number of your locker code.',
    'Science Thursday is 4, Music Tuesday is 3, Art Wednesday is 6. Set your locker in the corridor to 4, 3, 6.']},
  {goal:() => S.done, tips:[
    'Your locker is open. What did Mr Hollis leave inside?',
    'Look inside your locker in the corridor.',
    'Tap the report and the postcard in your open locker.']}
];


/* The timetable poster on the wall is the real grid, drawn over the picture's poster in the same paper and ink,
   so what you see on the wall is exactly what the close-up shows. */
function wallTimetable(){
  const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:38.6%;top:25.3%;width:22.9%;height:29.4%';
  wrap.innerHTML = `<svg viewBox="0 0 230 166" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="228" height="164" rx="2" fill="#fffdf6" stroke="#2b2836" stroke-width="2"/><rect x="1" y="1" width="228" height="20" fill="#2f7c83" stroke="#2b2836" stroke-width="2"/><text x="115" y="15.5" text-anchor="middle" font-size="12" font-weight="700" fill="#fffdf6" letter-spacing="1.5" font-family="Atkinson Hyperlegible,Verdana,sans-serif">5H TIMETABLE</text><g>${ttGrid(8, 27, 34, 28, 22, 16, 9.5)}</g></svg>`;
  return wrap;
}


function ttGrid(x0, y0, dayW, cw, rh, ic, fs){
  let out = '';
  [1,2,3,4,5,6].forEach((n,i) => out += `<text x="${x0+dayW+cw*i+cw/2}" y="${y0+fs}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="#2f7c83" font-family="Atkinson Hyperlegible,Verdana,sans-serif">${n}</text>`);
  Object.entries(TIMETABLE).forEach(([d,row],r) => {
    const y = y0 + fs + 4 + r*rh;
    out += `<rect x="${x0}" y="${y}" width="${dayW+cw*6}" height="${rh}" fill="${r%2?'#eef3ee':'#f7f9f3'}" stroke="#cfc8b4" stroke-width=".6"/>`;
    out += `<text x="${x0+4}" y="${y+rh/2+fs*.36}" font-size="${fs}" font-weight="700" fill="#2b2836" font-family="Atkinson Hyperlegible,Verdana,sans-serif">${d}</text>`;
    row.forEach((c,i) => { const [id,col] = SUBJECT[c]; out += `<use href="#${id}" x="${x0+dayW+cw*i+(cw-ic)/2}" y="${y+(rh-ic)/2}" width="${ic}" height="${ic}" style="color:${col}"/>`; });
  });
  return out;
}
function openTimetable(){
  openCloseup(`<div class="card tt"><svg viewBox="0 0 230 140" aria-label="The class timetable, with a picture for each lesson"><rect width="230" height="140" rx="4" fill="#fffdf6"/><rect width="230" height="18" fill="#2f7c83"/><text x="115" y="13" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fffdf6" letter-spacing="1" font-family="Atkinson Hyperlegible,Verdana,sans-serif">5H TIMETABLE</text><g>${ttGrid(8, 24, 34, 28, 17, 13, 9)}</g></svg></div>`);
  say('The class timetable: days down the side, period numbers along the top. But which picture is which lesson? Mr Hollis drew the key on the whiteboard.');
}
/* the whiteboard: Mr Hollis's key to the timetable pictures, in his marker pen. Without it the timetable cannot be read, so the front wall matters. */
function boardKey(x0, y0, colW, rowH, ic, fs){
  let key = '';
  Object.values(SUBJECT).forEach(([id,col,name],i) => {
    const x = x0 + (i%3)*colW, y = y0 + Math.floor(i/3)*rowH;
    key += `<use href="#${id}" x="${x}" y="${y}" width="${ic}" height="${ic}" style="color:${col}"/><text x="${x+ic+4}" y="${y+ic*0.8}" font-size="${fs}" fill="#2f5f8a" font-family="Atkinson Hyperlegible,Verdana,sans-serif" font-weight="700">${name}</text>`;
  });
  return key;
}
function openBoard(){
  openCloseup(`<div class="card tt"><svg viewBox="0 0 230 136" aria-label="The whiteboard: which picture means which lesson"><rect width="230" height="136" rx="3" fill="#fffdf6" stroke="#8a97a3" stroke-width="3"/><text x="115" y="22" text-anchor="middle" font-size="13" fill="#2f5f8a" font-family="Atkinson Hyperlegible,Verdana,sans-serif" font-weight="700">Our timetable pictures</text><g>${boardKey(14, 32, 74, 26, 15, 10)}</g><text x="115" y="126" text-anchor="middle" font-size="10" fill="#c0541f" font-family="Atkinson Hyperlegible,Verdana,sans-serif">Happy holidays, Year 5!  Mr H</text></svg></div>`);
  say('Mr Hollis has drawn the timetable pictures on the board, with what each one means.');
}
/* the same key, drawn small on the whiteboard itself so the wall and the close-up agree */
function wallBoard(){
  const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:33%;top:36%;width:35%;height:33%';
  wrap.innerHTML = `<svg viewBox="0 0 230 136" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true"><text x="115" y="22" text-anchor="middle" font-size="13" fill="#2f5f8a" font-family="Atkinson Hyperlegible,Verdana,sans-serif" font-weight="700">Our timetable pictures</text><g>${boardKey(14, 32, 74, 26, 15, 10)}</g><text x="115" y="126" text-anchor="middle" font-size="10" fill="#c0541f" font-family="Atkinson Hyperlegible,Verdana,sans-serif">Happy holidays, Year 5!  Mr H</text></svg>`;
  return wrap;
}
/* the three colour stripes under Mary's moth, drawn small on the wall picture so the wall and the close-up agree */
function wallStripes(){
  const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:59.6%;top:58.9%;width:9.4%;height:4.3%';
  wrap.innerHTML = stripesSVG('92 585 840 96'); return wrap;
}
function openMoth(){
  openCloseup(`<div class="card pic" style="width:calc(var(--u)*58)"><div class="picwrap" style="aspect-ratio:4/3;background-image:url(../art/school/closeup-mothpainting.jpg?v=${BUILD})">${stripesSVG('0 0 1024 768')}<p class="otitle">Mary’s moth</p></div></div>`);
  S.seen.stripes = true; save();
  say('Mary’s moth, pegged up to dry. Underneath it she painted the three colours she mixed for it: ' + PAINT_CODE.map(p => PAINTS[p][0]).join(', ') + '.');
}
/* the chime bars: the beater strikes a bar, it flashes and rings; four in the right order opens the stage drawer */
let struck = [];
function openBells(){
  struck = [];
  const boxes = {red:[10, 6, 29, 83], yellow:[31, 6, 48, 83], green:[51, 6, 69, 83], blue:[71, 6, 90, 83]};
  const bars = Object.entries(boxes).map(([c, [x0, y0, x1, y1]]) => `<button class="bar" data-c="${c}" style="left:${x0}%;top:${y0}%;width:${x1-x0}%;height:${y1-y0}%" aria-label="${c} chime bar"></button>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="bells" style="background-image:url(../art/school/closeup-bells.jpg?v=${BUILD})"><p class="otitle">Chime bars</p>${bars}</div><div class="shelffoot"><div class="row spellrow"><p class="tune" id="tune"></p><button class="ob quiet" id="tuneReset">Start again</button></div><p class="ofb" id="bellFb">Tap the bars with the beater. Four notes make the tune.</p></div></div>`);
  const showTune = () => { $('tune').innerHTML = [0,1,2,3].map(i => `<span class="dot" style="${struck[i] ? 'background:' + BARS[struck[i]].hex : ''}"></span>`).join(''); };
  showTune();
  $('tuneReset').onclick = () => { struck = []; showTune(); $('bellFb').textContent = 'Tap the bars with the beater. Four notes make the tune.'; };
  $('bells').querySelectorAll('.bar').forEach(b => b.onclick = () => {
    if (S.drawerOpen){ chime(BARS[b.dataset.c].hz); flash(b); $('bellFb').textContent = 'Ding! Lovely. The drawer is already open.'; return; }
    if (struck.length >= 4){ struck = []; }
    struck.push(b.dataset.c); chime(BARS[b.dataset.c].hz); flash(b); showTune();
    if (struck.length < 4){ $('bellFb').textContent = `${struck.length} of 4.`; return; }
    if (struck.join() === TUNE_ORDER.join()){ S.drawerOpen = true; save(); setTimeout(() => sfx('pickup'), 500); $('bellFb').textContent = 'That’s the tune! And… a click from the front of the stage.';
      setTimeout(() => { closeCloseup(); render(); animate({anim:'slideOpen', layer:'drawer'}); say('A little drawer in the front of the stage slides open.'); }, 1400); }
    else { $('bellFb').textContent = 'That isn’t the tune. Start again from the first note.'; }
  });
}
function flash(b){ b.classList.add('hit'); setTimeout(() => b.classList.remove('hit'), 180); }
/* the paint cupboard's padlock: three colour dials, checked only when Open is tapped */
function openPaintLock(){
  const dials = DIALS.map(([cx, cy], i) => `<button class="cdial" data-i="${i}" style="left:${cx}%;top:${cy}%;background:${PAINTS[S.cdials[i]][1]}" aria-label="Dial ${i+1}, showing ${PAINTS[S.cdials[i]][0]}"></button>`).join('');
  openCloseup(`<div class="card locker"><p class="otitle">The paint cupboard’s padlock. Three colours.</p><div class="lockpic"><img src="../art/school/layer-diallock.png?v=${BUILD}" alt="">${dials}</div><p class="ofb" id="lockFb">Tap a dial to change its colour.</p><div class="row"><button class="ob" id="openPaint">Open</button></div></div>`);
  document.querySelectorAll('.cdial').forEach(b => b.onclick = () => { const i = +b.dataset.i; S.cdials[i] = (S.cdials[i] + 1) % PAINTS.length; b.style.background = PAINTS[S.cdials[i]][1]; b.setAttribute('aria-label', `Dial ${i+1}, showing ${PAINTS[S.cdials[i]][0]}`); sfx('tick'); save(); });
  $('openPaint').onclick = () => {
    if (S.cdials.join() === PAINT_CODE.join()){ S.paintOpen = true; save(); sfx('pickup'); $('lockFb').textContent = 'Click! The padlock springs open.';
      setTimeout(() => { closeCloseup(); render(); animate({anim:'drop', layer:'diallock'}); say('The padlock drops off the paint cupboard. Now look inside.'); }, 700); }
    else { sfx('knock'); $('lockFb').textContent = 'It doesn’t budge. Not those colours.'; }
  };
}
/* inside an opened cabinet or cupboard: a picture of the shelves, with the slip waiting to be tapped */
const INSIDE = {stem:{pic:'../art/school/closeup-stem.jpg', title:'Inside the STEM cabinet', slip:'slipSc', box:[53, 83, 67, 95]}, paint:{pic:'../art/school/closeup-paint.jpg', title:'Inside the paint cupboard', slip:'slipAr', box:[57, 80, 71, 91]}};
function openInside(key){
  const it = INSIDE[key], [x0, y0, x1, y1] = it.box;
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background-image:url(${it.pic}?v=${BUILD})"><p class="otitle">${it.title}</p><button class="book" id="insideSlip" style="left:${x0}%;top:${y0}%;width:${x1-x0}%;height:${y1-y0}%" aria-label="Folded slip"><span></span></button></div><div class="shelffoot"><p class="ofb">A folded slip, tucked on the shelf. Tap it.</p></div></div>`);
  $('insideSlip').onclick = () => { if (S.got.includes(it.slip)) return; S.got.push(it.slip); sfx('pickup'); closeCloseup(); render(); say('A slip from Mr Hollis. It goes in the strip below.'); setTimeout(() => openNote(it.slip), 350); };
}
/* a shelf: the books are big buttons; one of them hides a slip. The Stories shelf can also spell a name. */
let shelfKey = null;
function openShelf(key){
  shelfKey = key;
  const sh = SHELVES[key], spelling = key === 'sto' && S.bonus && !S.nightMoth;
  /* each book's slot is the line down the middle of its spine (top x, top y, bottom x, bottom y, width): the title sits on that
     line, leaning as the book leans, in one size unless the spine is too short for it (the picture is 58u wide, 32.6u tall) */
  const books = sh.books.map(([title], i) => { const sl = sh.slots[i];
    if (title === 'gap'){ const [x0,y0,x1,y1] = sl; return `<button class="book gap" data-i="${i}" style="left:${x0}%;top:${y0}%;width:${x1-x0}%;height:${y1-y0}%"><span>Returned today. See the trolley.</span></button>`; }
    const [xt,yt,xb,yb,w] = sl, cx = (xt+xb)/2, cy = (yt+yb)/2, dxu = (xb-xt)*0.58, dyu = (yb-yt)*0.326, len = Math.hypot(dxu, dyu), ang = Math.atan2(dxu, dyu)*180/Math.PI;
    const fs = Math.min(1.75, Math.max(1.1, len*0.9/(title.length*0.58))), hPct = len/0.326;
    return `<button class="book" data-i="${i}" style="left:${cx - w/2}%;top:${cy - hPct/2}%;width:${w}%;height:${hPct}%;transform:rotate(${-ang.toFixed(2)}deg)" aria-label="${title}"><span style="font-size:calc(var(--u)*${fs.toFixed(2)})">${title}</span></button>`; }).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="books" style="background-image:url(${sh.pic}?v=${BUILD})"><p class="otitle">${sh.title}</p>${books}</div><div class="shelffoot">${spelling ? `<div class="row spellrow"><p class="spell" id="spell">${S.spell || '· · · ·'}</p><button class="ob quiet" id="spellReset">Start again</button></div>` : ''}<p class="ofb" id="shelfFb">${spelling ? 'Tap four stories in order to spell a name.' : 'Tap a book to open it.'}</p></div></div>`);
  $('books').querySelectorAll('.book').forEach(b => b.onclick = () => pickBook(+b.dataset.i));
  const r = $('spellReset'); if (r) r.onclick = () => { S.spell = ''; $('spell').textContent = '· · · ·'; $('shelfFb').textContent = 'Tap four stories in order to spell a name.'; save(); };
}
function pickBook(i){
  const sh = SHELVES[shelfKey], [title, what] = sh.books[i], fb = $('shelfFb');
  sfx('paper');
  if (title === 'gap'){ fb.textContent = what; say('Someone returned a book today. Returned books go on the trolley.'); return; }
  if (shelfKey === 'sto' && S.bonus && !S.nightMoth){
    S.spell += title[0]; $('spell').textContent = S.spell.split('').join(' ');
    if (S.spell.length === 4){
      if (S.spell === 'NANA'){ S.nightMoth = true; fb.textContent = 'NANA! Nana loves postcards and moths. You are a super-sleuth.'; sfx('pickup'); say('★ Bonus riddle solved: NANA.'); }
      else { fb.textContent = `“${S.spell}” isn’t a name. Start the spelling again.`; }
    } else fb.textContent = what;
    save(); return;
  }
  if (ITEMS[what]){ /* each riddle's book holds the start of its trail; the three trails can be followed in any order */
    if (S.got.includes(what)){ fb.textContent = 'Nothing more in this one. You have what it was hiding.'; return; }
    S.got.push(what); sfx('pickup'); fb.textContent = ITEMS[what].found.replace('{b}', title);
    setTimeout(() => { render(); openNote(what); }, 500); say(`Something from ${title}. It goes in the strip below.`);
    return;
  }
  fb.textContent = what;
}
/* the locker: three dials, checked only when Open is tapped, so the answer cannot be found by watching for a click */
function openLock(){
  openCloseup(`<div class="card locker"><p class="otitle">Mary’s locker. Three numbers.</p><div class="dials" id="dials"></div><p class="ofb" id="lockFb">Tap a dial to turn it.</p><div class="row"><button class="ob" id="openLocker">Open</button></div></div>`);
  /* the dials update in place: rebuilding them inside the tap would detach the tapped button and count as a tap outside the card */
  $('dials').innerHTML = S.dials.map((d, i) => `<button class="dial" data-i="${i}" aria-label="Dial ${i+1}, showing ${d}">${d}</button>`).join('');
  $('dials').querySelectorAll('.dial').forEach(b => b.onclick = () => { const i = +b.dataset.i; S.dials[i] = (S.dials[i] + 1) % 10; b.textContent = S.dials[i]; b.setAttribute('aria-label', `Dial ${i+1}, showing ${S.dials[i]}`); sfx('tick'); save(); });
  $('openLocker').onclick = () => {
    if (S.dials.join() === CODE.join()){ S.opened = true; sfx('pickup'); $('lockFb').textContent = 'Click! The locker opens.'; setTimeout(() => { closeCloseup(); render(); animate({anim:'openDoor', layer:'lockerdoor'}); say('Your locker swings open. Something is inside.'); }, 700); }
    else { sfx('knock'); $('lockFb').textContent = 'It doesn’t budge. Not those numbers.'; }
  };
}
function ending(){
  S.done = true; save(); sfx('pickup');
  showEnd('The last bell rings!', 'Last day! Mr Hollis set a treasure hunt with three riddles. I found a star key in his apron, played a tune on the chime bars, and cracked the paint cupboard. My report says “a brilliant detective”, and there was a postcard from Nana in my locker: “Not long now!” The little moth on it seems to glow.',
    S.nightMoth ? 'I solved the bonus riddle too. It spelled NANA. ★' : 'There was a bonus riddle on the notice board. I didn’t crack it yet.');
}


function unlockStem(){ if (S.stemOpen) return; drop('starkey'); S.stemOpen = true; save(); render(); sfx('pickup'); animate({anim:'drop', layer:'starlock'}); say('The star key turns. Click! The padlock drops off the STEM cabinet. Now look inside.'); }
const USES = {
  'mallet>hn_bars': () => { drop('mallet'); S.beater = true; save(); render(); sfx('tick'); say('The beater rests on the stand. Now: which bars, and in which order?'); setTimeout(openBells, 600); },
  'starkey>he_lock': unlockStem, 'starkey>he_cabinet': unlockStem,
  'starkey>ae_lock': () => { sfx('knock'); say('The star key finds no keyhole. This padlock has colour dials instead.'); },
  'starkey>ae_cupboard': () => { sfx('knock'); say('The star key finds no keyhole. This padlock has colour dials instead.'); },
  'mallet>he_lock': () => { sfx('knock'); say('Bonk. The padlock doesn’t care.'); },
  'mallet>ae_lock': () => { sfx('knock'); say('Bonk. The padlock doesn’t care.'); }
};


function act(id){ /* returns false for a door the engine should open */
  if (id === 'door' && !S.got.includes('envelope')){ say('Not yet. Mr Hollis left something on your desk first.'); return true; }
  if (DOORS[id]) return false;
  switch(id){
    case 'envelope': S.got.push('envelope'); sfx('pickup'); setTimeout(() => { render(); openNote('envelope'); }, 700); say('An envelope from Mr Hollis! Tap it in the strip below any time to read it again.'); return;
    case 'desk': say(S.got.includes('envelope') ? 'Your desk, cleared out for the summer. Just your pencil case.' : 'Your desk. There’s an envelope on it with your name.'); break;
    case 'hamster': openNotebook(); return;
    case 'rules': say('<b>Class rules.</b> 1. Be kind. 2. Listen with your whole face. 3. Feed Nutmeg once a day, never twice. 4. Nobody goes home without their jumper.'); break;
    case 'timetable': openTimetable(); return;
    case 'clock': say('Twenty to three. The last bell goes at three.'); break;
    case 'bookshelf': say('Reading books, dictionaries, and a box of comics that everyone pretends not to read.'); break;
    case 'bag': say('Mary’s bag, packed and ready. Only the report and Nana’s postcard still to collect.'); break;
    case 'cabinet': say('Mr Hollis’s filing cabinet. Locked, and Nutmeg is sitting on it anyway.'); break;
    case 'cupboard': say('Glue sticks, glitter, and a smell of poster paint.'); break;
    case 'board': openBoard(); return;
    case 'tdesk': say('Mr Hollis’s desk. His mug says TEACHER OF THE YEAR (nearly).'); break;
    case 'mug': say('Mr Hollis’s mug. Cold tea, as usual.'); break;
    case 'apple': say('An apple for the teacher. Slightly bruised.'); break;
    case 'window': say('Sunshine, the sound of the party, and a plane climbing into the sky. Tomorrow, that’s you.'); break;
    case 'beans': say('The class bean plants. Mary’s is the tallest, of course.'); break;
    case 'radiator': say('Off, obviously. It is Singapore.'); break;
    case 'bin': say('Paper, and one sandwich crust that should not be in there.'); break;
    case 'pegs': say('Everyone has taken their coats. One forgotten raincoat drips quietly.'); break;
    case 'lost': say('A shoe, a hat, and a lunchbox that has been here since March.'); break;
    /* corridor */
    case 'h_lockers': say('Other people’s lockers. Yours is the purple one with your name on.'); break;
    case 'h_locker':
      if (S.done) say('Your empty locker. See you after the summer!');
      else if (S.opened){ ending(); return; }
      else openLock();
      return;
    case 'h_certs': say('Certificates: attendance, kindness, and one for “most improved handwriting”. Not Mary’s.'); break;
    case 'h_bench': say('The bench where you wait for your turn at everything.'); break;
    case 'h_fountain': say('A drink of cold water. Lovely.'); break;
    case 'h_trophies': say('The house cup. This year: Kingfishers. Mary’s house!'); break;
    case 'h_notices': say('The summer fair, the swimming gala, house points, and a lost cat called Biscuit. Ginger, very fluffy, answers to nothing.'); break;
    case 'h_bonus': S.bonus = true; save(); openNote('bonus'); say('A bonus riddle! This one is optional, for super-sleuths.'); return;
    case 'h_bunting': say('Bunting from the summer fair. Nobody has taken it down, and nobody will.'); break;
    /* hall */
    case 'hn_stage': say('The stage. Assemblies, the winter play, and the day Mary forgot her line and made up a better one.'); break;
    case 'hn_banner': say('HAPPY HOLIDAYS. Mrs Ng’s lettering, Mr Hollis’s spelling.'); break;
    case 'hn_bars': if (S.beater) openBells(); else say('Four chime bars: red, yellow, green and blue. There is nothing to strike them with.'); return;
    case 'hn_drawer':
      if (!S.drawerOpen){ say('A tiny drawer in the front of the stage. It won’t budge.'); break; }
      if (S.got.includes('slipMu')){ say('The little drawer, empty now.'); break; }
      S.got.push('slipMu'); sfx('pickup'); render(); say('A slip from Mr Hollis, in the drawer! It goes in the strip below.'); setTimeout(() => openNote('slipMu'), 350); return;
    case 'he_sign': say('STEM WEEK. Rockets, robots, and one small explosion nobody talks about.'); break;
    case 'he_points': say('House points: red 380, blue 275, yellow 180. Red is Mary’s house, and red is winning.'); break;
    case 'he_cabinet': case 'he_lock':
      if (S.stemOpen && !S.got.includes('slipSc')){ openInside('stem'); return; }
      if (S.stemOpen){ say('The STEM cabinet: a rocket, the planets on sticks and a cardboard robot. Nothing else now.'); break; }
      say(id === 'he_lock' ? 'A little padlock with a gold star on it. It wants a key with a star to match.' : 'The STEM week cabinet: a rocket, the planets on sticks and a cardboard robot. Locked, with a padlock that has a star on it.'); break;
    case 'hs_bench': say('The bench where the youngest class sits for assembly, swinging their legs.'); break;
    case 'hw_mat': say('The soft mat of the indoor playground. No shoes!'); break;
    case 'hw_slide': say('The little slide. Strictly for the little ones. Strictly.'); break;
    case 'hw_blocks': S.toppled = true; save(); setTimeout(render, 700); say('Whoops. The soft blocks tumble over… and there was something underneath!'); return;
    case 'hw_blocks2': say('Soft blocks all over the mat. Someone will have to stack those again. Not Mary.'); break;
    case 'hw_mallet': S.got.push('mallet'); sfx('pickup'); render(); say('A wooden beater! The kind you play chime bars with.'); return;
    /* art room */
    case 'an_rack': say('The drying rack: today’s paintings, pegged up to dry.'); break;
    case 'an_p1': say('Aisha’s house, with the sun in the corner where suns go.'); break;
    case 'an_p2': say('A rainbow by Ben. He ran out of purple.'); break;
    case 'an_p3': say('Priya’s cat. Or possibly her hamster.'); break;
    case 'an_moth': openMoth(); return;
    case 'ae_pots': say('Six pots of paint on the shelf: red, yellow, blue, green, orange and purple.'); break;
    case 'ae_cupboard': case 'ae_lock':
      if (S.paintOpen && !S.got.includes('slipAr')){ openInside('paint'); return; }
      if (S.paintOpen){ say('Paint, brushes and paper. The slip is in your strip.'); break; }
      if (id === 'ae_lock'){ openPaintLock(); return; }
      say('The paint cupboard, padlocked. The padlock has three colour dials instead of a keyhole.'); break;
    case 'as_bench': say('A bench of clay things. Don’t touch, they’re still soft.'); break;
    case 'as_clay': say('Clay animals waiting for the kiln: a cat, a dog, a bird and an elephant with one ear.'); break;
    case 'aw_sink': say('The paint sink, rinsed to a rainbow.'); break;
    case 'aw_tap': say('A gush of water. The sink gurgles.'); break;
    case 'aw_jar': say('A jar of brushes, washed clean for the holidays.'); break;
    case 'aw_apronB': say('A blue apron. Not Mary’s.'); break;
    case 'aw_apronG': say('A green apron: Mary’s, actually. Nothing in the pocket.'); break;
    case 'aw_apronP':
      if (!S.got.includes('noteStar')){ say('Mr Hollis’s apron, splattered with every colour in the room.'); break; }
      if (S.stemOpen || (S.keyOut && !S.got.includes('starkey'))){ say('Mr Hollis’s apron. The pocket is empty now.'); break; }
      if (S.got.includes('starkey')){ say('Mr Hollis’s apron. You have the key from its pocket.'); break; }
      S.keyOut = true; save(); render(); animate({anim:'lift', layer:'starkey'}); say('Something in the pocket! A little key with a star on it.'); return;
    case 'aw_key': S.got.push('starkey'); sfx('pickup'); render(); say('The star key. It goes in the strip below.'); return;
    /* library */
    case 'l_shelfSci': openShelf('sci'); return;
    case 'l_shelfMus': openShelf('mus'); return;
    case 'l_shelfArt': openShelf('art'); return;
    case 'l_shelfSto': openShelf('sto'); return;
    case 'l_trolley': openShelf('trolley'); return;
    case 'l_globe': say('The globe. Singapore is a tiny red dot. London is a long way up and to the left.'); break;
    case 'l_rocks': say('The rock collection. Nine shiny rocks and one that Mary suspects is a toffee.'); break;
    case 'l_headphones': say('The listening corner. Story time is on Fridays, but today is the last day, so no story.'); break;
    case 'l_beanbag': say('The squashiest beanbag in the school. Not now, Mary.'); break;
    case 'l_table': say('The CD player for story time. Nothing in it.'); break;
    case 'l_cabinet': say('Cupboards of old worksheets. Nobody has opened them since Easter.'); break;
    case 'l_window': say('Trees, sunshine and a butterfly on the glass. Only a few hours until the holidays.'); break;
    case 'l_seat': say('The window seat, with the squashiest cushions in the school.'); break;
    case 'l_rug': case 'l_rug2': say('A rug. Good for lying on with a book.'); break;
    case 'l_notice': say('“Returned books go on the trolley.” Worth remembering.'); break;
    case 'l_chair': say('The storytime chair. Someone has left a knitted hamster on it. It is not Nutmeg.'); break;
    case 'l_desk': say('Mrs Ng’s desk: a computer, a bell, and a sign.'); break;
    case 'l_quiet': say('QUIET PLEASE. Mary is being very quiet.'); break;
    case 'l_bell': say('Ding! Nobody comes. Mrs Ng is at the party.'); break;
    case 'l_card': say('<b>Back soon!</b> “I’m at the party in the playground. Please put books back where you found them. Mrs Ng”'); break;
    case 'l_knit': say('A knitted hamster. It is not Nutmeg, but it has his eyebrows.'); break;
    case 'l_cushions': say('Squashy cushions. Someone has plumped them for the holidays.'); break;
  }
}
/* Mary's notebook: the to-do list. Each riddle shows how far its trail has got; tap one and the helper's hint for that trail
   goes from a nudge to the answer over three taps. Underneath, what Mary has noticed, so nothing has to be written down. */

const speaker = () => 'The moth whispers';
const THREADS = {1:['Riddle 1: full of lights at night, but not a city', 'slipSc', ['', 'note found', 'star key found', 'cabinet unlocked']],
  2:['Riddle 2: eighty-eight keys, but no doors', 'slipMu', ['', 'page of music found', 'beater found', 'beater on the bars', 'drawer open']],
  3:['Riddle 3: full of colour, but not a rainbow', 'slipAr', ['', 'note found', 'cupboard unlocked']]};

/* the notebook's rows: the riddles with how far each has got, then the last steps */
function rows(){
  const out = [];
  if (!S.got.includes('envelope')) out.push([0, 'Something on my desk?', 'not yet', false]);
  else {
    Object.entries(THREADS).forEach(([th, [label, slip, steps]]) => {
      const idx = HINTS.map((h, k) => h.thread == th && !h.goal() ? k : -1).filter(k => k >= 0);
      const done = S.got.includes(slip), p = steps.length - idx.length;
      out.push([done ? -1 : idx[0], label, done ? '✓ slip found' : (steps[p] || 'not started'), done]);
    });
    if (['slipSc', 'slipMu', 'slipAr'].every(k => S.got.includes(k))) out.push([HINTS.findIndex(h => !h.thread && !h.goal()), 'Three slips, the timetable, then my locker', S.done ? '✓ done' : (S.opened ? 'locker open' : 'three numbers'), S.done]);
  }
  return out;
}
function noticed(){
  const n = [];
  if (S.seen.tune) n.push('The tune on the page: ' + TUNE_ORDER.join(', ') + '.');
  if (S.seen.stripes) n.push('Under my moth painting: ' + PAINT_CODE.map(p => PAINTS[p][0]).join(', ') + '.');
  if (S.seen.bonus && !S.nightMoth) n.push('Bonus riddle: someone in London loves postcards and moths. Four stories spell her name.');
  if (S.nightMoth) n.push('Bonus riddle solved: NANA. ★');
  return n;
}
function sparkle(id){
  if (id === 'envelope') return !S.got.includes('envelope');
  if (id === 'h_locker') return ['slipSc', 'slipMu', 'slipAr'].every(k => S.got.includes(k)) && !S.done;
  if (id === 'hw_mallet' || id === 'aw_key') return true; /* only shown while they can be taken */
  if (id === 'hn_drawer') return S.drawerOpen && !S.got.includes('slipMu');
  if (id === 'he_cabinet') return S.stemOpen && !S.got.includes('slipSc');
  if (id === 'ae_cupboard') return S.paintOpen && !S.got.includes('slipAr');
  return false;
}
return {
  card:{place:'SINGAPORE · THE LAST DAY OF TERM', text:'Everyone is at the goodbye party in the hall. Tomorrow the whole family flies to London, to Nana and Jedi’s. But Mr Hollis has left something on Mary’s desk.'},
  meanwhile:'Meanwhile, at Knightsbrook, Mary is still hunting for the words in Mr Hollis’s riddle.',
  comic:[{pic:'../art/comic/school-1.jpg', lines:['“Last day of school, Mary!” said Mum.', 'Two more sleeps, then the plane to Nana’s.']}, {pic:'../art/comic/school-2.jpg', lines:['Knightsbrook International School. Mary knew every corridor.', 'Today she would walk them one last time.']}, {pic:'../art/comic/school-3.jpg', lines:['On her desk: an envelope with her name on it, in Mr Hollis’s writing.', 'Inside, a riddle. Of course.']}, {pic:'../art/comic/school-4.jpg', lines:['And on the window, a little moth, watching.', 'The last bell was at three.']}],
  postcard:{pic:'../art/postcards/school.jpg'},
  title:'Last day of school', blurb:"Mary's last day of school: the classroom, the corridor, the library, the art room and the hall.",
  track:'../art/music/classroom.mp3', ambient:'school', next:'packing', nextLabel:'Go home and pack',
  intro:'<b>Last day of school.</b> Everyone is at the party, but Mr Hollis left something on your desk. And a little moth is watching from the window.',
  start:{room:'classroom', view:3},
  fresh:() => ({opened:false, bonus:false, spell:'', nightMoth:false, dials:[0,0,0], keyOut:false, stemOpen:false, toppled:false, beater:false, drawerOpen:false, cdials:[0,0,0], paintOpen:false, seen:{}}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, extra:EXTRA, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES,
  overlays:{c4:wallTimetable, c1:wallBoard, an:wallStripes},
  onNote:key => { if (key === 'music') S.seen.tune = true; if (key === 'bonus') S.seen.bonus = true; save(); },
  act, sparkle, rows, noticed, speaker, helper:() => 'the moth'
};

})());
