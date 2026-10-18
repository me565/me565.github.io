/* The Moth House, landscape engine: Mary's stage 1, version 3, "The Last Bell" (owner, 17 Oct 2026). GREYBOX: the walls and
   cut-outs of version 2, labelled grey boxes for the new things, every drawn-over thing drawn as it will be. See levels/LEVEL-school.md. */
'use strict';
registerStage('school3', (function(){
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
    {id:'blind', l:30, t:9, w:40, h:9, label:'The blind and its cord', sound:'leaf'},
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
    {id:'tin', l:79, t:55, w:6, h:7, label:"Nutmeg's food tin", sound:'tap'},
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
    {id:'hw_blocks2', l:25, t:68, w:26, h:19, label:'Toppled soft blocks', sound:'leaf', hideWhen:() => !S.toppled},
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
    {id:'aw_key', l:74.5, t:54.5, w:8.5, h:9, label:'Star key in the apron pocket', sound:'tap', hideWhen:() => true}],
  /* library: a square room. Arrive facing the Science and Music wall, window on the right, entrance behind, Art and Stories on the left. */
  ln:[
    {id:'l_shelfSci', l:5, t:29, w:22.5, h:61, label:'Science shelf', sound:'paper'},
    {id:'l_shelfMus', l:72.5, t:29, w:22.5, h:61, label:'Music shelf', sound:'paper'},
    {id:'l_globe', l:35, t:58, w:9, h:19, label:'Globe', sound:'tap', anim:'spin', layer:'globe'},
    {id:'l_headphones', l:44.5, t:66, w:7, h:11, label:'Headphones', sound:'tap', anim:'wobble', layer:'headphones'},
    {id:'l_rocks', l:51, t:66, w:16, h:10, label:'Rock collection', sound:'knock'},
    {id:'l_cabinet', l:33, t:76, w:34, h:14, label:'Cabinet', sound:'knock'}],
  le:[
    {id:'l_map', l:6, t:27, w:21, h:28, label:'World map', sound:'paper'},
    {id:'l_window', l:33, t:19, w:34, h:46, label:'Library window', sound:'tap'},
    {id:'l_cushions', l:35, t:57, w:14, h:11, label:'Cushions on the window seat', sound:'leaf', anim:'plump', layer:'cushions'},
    {id:'l_seat', l:32, t:66, w:36, h:18, label:'Window seat', sound:'knock'},
    {id:'l_knit', l:77.2, t:65.5, w:6, h:11.5, label:'Knitted hamster on the chair', sound:'squeak', anim:'wobble', layer:'knit'},
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
    {id:'l_trolley', l:51, t:69.5, w:15, h:28, label:'Returns trolley', sound:'knock', anim:'roll', layer:'trolley'},
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
    {src:'../art/school/layer-drawer.png', group:'drawer', kind:'drawer',  l:44, t:78.2, w:12, h:8.6}],
  he:[ /* the star padlock hangs on the cabinet's hasp; the star key makes it drop off and it is gone for good */
    {src:'../art/school/layer-starlock.png', group:'starlock', l:38.1, t:58, w:3.4, h:8.84, padBelow:1.6, gone:() => S.stemOpen, over:(ctx, ox, oy, W, H) => drawStaple(ctx, ox, oy, W, H, 50, 7)}],
  hw:[ /* the beater lies where the stack stood; the stack of three soft blocks tumbles apart when tapped */
    {src:'../art/school/layer-mallet.png', group:'mallet', l:21.5, t:76, w:5, h:9.45, shadow:.6, showWhen:() => S.toppled, hideWhen:() => S.got.includes('mallet') || S.beater},
    /* three whole soft blocks, stacked; each flies to its own landing place when the stack is tapped (kind 'block', see drawBlock) */
    {src:'../art/school/layer-block-blue.png', group:'blocks', kind:'block', l:24, t:69.7, w:9, h:15.36, padX:2.8, drop:0, fall:{dx:.15, rot:.03, delay:.2, lift:.05}, done:() => S.toppled},
    {src:'../art/school/layer-block-red.png', group:'blocks', kind:'block', l:24.8, t:60.9, w:7.4, h:13.3, padX:2.8, padBelow:1.1, drop:.82, fall:{dx:1.3, rot:.08, delay:.1, lift:.3}, done:() => S.toppled},
    {src:'../art/school/layer-block-yellow.png', group:'blocks', kind:'block', l:24.3, t:53.3, w:8.4, h:11.35, padX:2.8, padBelow:2.1, drop:1.81, fall:{dx:2.3, rot:.62, delay:0, lift:.5}, done:() => S.toppled}],
  /* art room */
  ae:[ /* the combination padlock: its three white dials show the colours the player has set, drawn over the picture */
    {src:'../art/school/layer-diallock.png', group:'diallock', l:47.7, t:62, w:4.4, h:10.19, padBelow:1.6, gone:() => S.paintOpen, over:drawDials}],
  aw:[
    {draw:'pour', group:'pour', l:32.3, t:48.5, w:4.4, h:8.5, flash:true},
    /* the star key pokes out of the apron pocket: the layer is clipped at the pocket's rim, so the rest of the key is inside it */
    {src:'../art/school/layer-starkey.png', group:'starkey', l:76.4, t:57.6, w:4.6, h:8.04, clipBottom:62.2, hideWhen:() => true}],
  /* library */
  ln:[
    {src:'../art/school/layer-globe.png', group:'globe', l:36.5, t:60.5, w:6.5, h:14.5, shadow:.6, sphere:[230, 260, 227]},
    {src:'../art/school/layer-headphones.png', group:'headphones', l:44.5, t:69.5, w:6, h:7.1, shadow:.5},
    {src:'../art/school/layer-sticky.png', l:83.6, t:46, w:2.6, h:4.7}],
  le:[
    {src:'../art/school/layer-cushions.png', group:'cushions', l:36, t:58.5, w:12, h:9.05, shadow:.5},
    {src:'../art/school/layer-knithamster.png', group:'knit', l:78.4, t:66.7, w:3.4, h:8.71, shadow:.85} /* sat back on the seat, not on its front edge */],
  ls:[{src:'../art/school/layer-bell.png', group:'bell', l:65, t:59.5, w:4, h:5.85, shadow:.6}],
  lw:[{src:'../art/school/layer-trolley.png', group:'trolley', l:52, t:72.6, w:13, h:24, shadow:.8}] /* wheels on the floor, in front of the skirting */
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
const PAINT_CODE = [5, 3, 4]; /* purple, green, orange: the stripes under the moth */
/* version 3: the cupboard's dials offer pairs of primaries; each pair mixes to one of the six pots' colours */
const PAIRS = [['red', 'yellow', 'orange', '#ee8a2e'], ['red', 'blue', 'purple', '#8a5cc2'], ['yellow', 'blue', 'green', '#4fa64a']];
const PAIR_CODE = [1, 2, 0]; /* purple, green, orange */
const ROUTE = ['N', 'W', 'W', 'N'], ARROWS = ['N', 'E', 'S', 'W'], ARROW_GLYPH = {N:'↑', E:'→', S:'↓', W:'←'};
/* the Kite: seven glow stars on the whiteboard wall (picture %), the brightest at the tail (index 6) */
const KITE = [[40, 22], [48, 30], [40, 38], [32, 30], [40, 46], [36, 54], [44, 62]], TAIL = 6;
const LAPS = 7, BADGES = {badgeSc:3, badgeAr:5, badgeGe:2};
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
/* the three colour stripes are drawn inside the label card's own shape: TL, TR and BL are the card's corners in the container's
   percent coordinates, and the stripes sit in that parallelogram, slanting as the card slants (on the wall and in the close-up) */
const CARD_WALL = [[59.7, 59.4], [69.0, 58.15], [59.8, 63.1]]; /* the card under the moth on the art-room wall */
const CARD_CU = [[9.5, 74.5], [90, 74], [9.5, 88.5]];            /* the same card in the close-up picture */
function stripesSVG([tl, tr, bl]){
  const a = tr[0]-tl[0], b = tr[1]-tl[1], c = bl[0]-tl[0], d = bl[1]-tl[1];
  let s = `<svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style="position:absolute;left:0;top:0;width:100%;height:100%" aria-hidden="true"><g transform="matrix(${a} ${b} ${c} ${d} ${tl[0]} ${tl[1]})">`;
  PAINT_CODE.forEach((p, i) => { const x = 0.075 + i*0.3; s += `<rect x="${x}" y="0.2" width="0.25" height="0.6" rx="0.02" ry="0.08" fill="${PAINTS[p][1]}"/><rect x="${x+0.03}" y="0.3" width="0.15" height="0.08" rx="0.01" ry="0.04" fill="rgba(255,255,255,.28)"/>`; });
  return s + '</g></svg>';
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
  envelope:{hand:true, html:'<span class="head">For Mary</span><span>The bell has gone missing, and nobody goes home until it rings. So: one last hunt. Four lessons left you four numbers around the school; my board says their order; your locker has the rest.</span><span><b>Maths:</b> count what runs but never leaves. <b>Science:</b> some stars only come out when you shut out the sun. <b>Art:</b> three colours I never bought. <b>Geography:</b> follow the plane from home to Nana’s. <b>Music:</b> the bell is where the whole school sings.</span><span>Mr Hollis</span>'},
  last:{hand:true, html:'<span class="head">Well done, detective</span><span class="big">Now ring it.</span><span>Mr H</span>'},
  bonus:{hand:false, html:'<span class="head">Bonus riddle for super-sleuths</span><span>Someone in London loves postcards and moths. Spell her name with the first letters of four stories.</span>'},
};
/* Each shelf close-up is a generated picture of the real shelf; `slots` are the books' boxes on it in picture percentages [left, top, right, bottom]. */
const SHELVES = {
  sci:{title:'Science shelf', pic:'../art/school/shelf-sci.jpg', slots:[[39.3,22,39.3,88,7],[46.5,21.5,46.5,88,6],[53.2,21,53.2,88,6.5],[60.7,23,62.5,89,7]], books:[
    ['Volcanoes!','Hot, rocky and a bit loud. No slip inside.'],
    ['The Night Sky','page:nightsky'],
    ['Bugs Up Close','Very close. Too close! No slip inside.'],
    ['Weather Watch','All about rain. Singapore has plenty. No slip inside.']]},
  mus:{title:'Music shelf', pic:'../art/school/shelf-mus.jpg', slots:[[13.5,17,14,90,9.5],[23.8,25,23.8,89,7],[43,39,56,60]], books:[
    ['Drums for Beginners','Boom, boom, tish! No slip inside.'],
    ['Songs of the Sea','Sailors’ songs. No slip inside.'],
    ['gap','A sticky note in the gap: “Returned today. See the trolley.”']]},
  art:{title:'Art shelf', pic:'../art/school/shelf-art.jpg', slots:[[35.3,26,35.3,89,6],[41.5,35,41.5,89,6],[49.7,26,49.5,89,7.5],[59,30,59,89,8]], books:[
    ['Clay Creatures','Squishy animals to make. No slip inside.'],
    ['Sketching','Pencils, and more pencils. No slip inside.'],
    ['The Painting Book','page:painting'],
    ['Paper Folding','How to fold paper birds, boats and moths. No slip inside.']]},
  trolley:{title:'Returns trolley', pic:'../art/school/shelf-trolley.jpg', slots:[[50.5,22,50.5,80,7],[74.7,24,74.5,82,8],[86,21,86,81,7]] /* the spine panels, not the tilted covers beside them */, books:[
    ['Dinosaur Days','Roar! No slip inside.'],
    ['Playing the Piano','page:piano'],
    ['Football Stars','No slip inside.']]},
  sto:{title:'Stories shelf', pic:'../art/school/shelf-sto.jpg', slots:[[42.7,21,42.7,88,8.5],[51.5,21,51.5,88,8],[60.2,18,60.2,88,8.5],[70,20,70,88,10],[81,21,81,88,10],[90.5,19,91,87,8]], books:[
    ['Nobody’s Garden','A secret garden story.'],
    ['Jam for Tea','A story about a greedy bear.'],
    ['A Quiet Moon','A bedtime story.'],
    ['Owls at Dusk','A story about night birds.'],
    ['Nine Lanterns','A story about a festival of lights.'],
    ['Along the River','A story about a boat trip.']]}
};
const TIMETABLE = {Mon:['En','Ma','Sc','Ar','PE','Mu'], Tue:['Ma','En','Mu','PE','Sc','Li'], Wed:['Sc','Ma','En','PE','Mu','Ar'], Thu:['En','Ar','Ma','Ge','Sc','Li'], Fri:['Ma','Mu','Ar','En','PE','Sc']};
const CODE = [5, 7, 2, 3]; /* Thursday's order: Art 5, Maths 7, Geography 2, Science 3 */
const SUBJECT = {Ma:['i-ma','#2f7c83','Maths'], En:['i-en','#d9a622','English'], Sc:['i-sc','#3b78b8','Science'], Mu:['i-mu','#7a5cc2','Music'], Ar:['i-ar','#d0602f','Art'], PE:['i-pe','#27794c','PE'], Ge:['i-ge','#a8744a','Geography'], Li:['i-li','#c4589a','Library']};

const gicon = (t, bg) => `<span style="display:grid;place-items:center;width:80%;height:80%;margin:10%;background:${bg || '#8a8a94'};border:2px solid #2a2a33;border-radius:12%;color:#fff;font-weight:700;font-size:calc(var(--u)*2)">${t}</span>`;
const ITEMS = {
  envelope:{name:'letter from Mr Hollis', note:'envelope', icon:'<img src="../art/classroom/item-envelope.png" alt="">'},
  mallet:{name:'beater', icon:'<img src="../art/school/item-mallet.png" alt="">'},
  bell:{name:'handbell', icon:gicon('BELL', '#a8844a')},
  badgeSc:{name:'Science badge: 3', icon:gicon('3', '#3b78b8')},
  badgeAr:{name:'Art badge: 5', icon:gicon('5', '#d0602f')},
  badgeGe:{name:'Geography badge: 2', icon:gicon('2', '#a8744a')}
};
/* Hints follow three threads at once: the moth helps with whichever trail the player has got furthest along. */
const HINTS = [
  {goal:() => S.lit, target:'blind', tips:['It is dark in here.', 'The blind is down. Pull the cord.', 'Drag the pull tab on the blind cord all the way down, then let go.']},
  {goal:() => S.got.includes('envelope'), target:'envelope', tips:['Mr Hollis left something on your desk.', 'Turn to the timetable wall and look at your desk.', 'Tap the envelope on your desk.']},
  {thread:1, goal:() => S.laps >= LAPS, target:'tin', tips:['Count what runs but never leaves. Who runs in this room?', 'Nutmeg runs when he is fed. Rule 3 says how often.', 'Tap the food tin by his cage once. Read the counter on his wheel: 7.']},
  {thread:2, goal:() => S.seen.stars, target:'blind', tips:['Some stars only come out when you shut out the sun.', 'Pull the blind down again and look at the whiteboard wall.', 'Tap the blind to lower it. Seven glow stars appear on the whiteboard wall: a kite. One is brighter.']},
  {thread:2, goal:() => S.seen.kite, target:'l_shelfSci', tips:['Which star matters? A book would know.', 'The Night Sky on the library’s Science shelf.', 'Open The Night Sky: the Kite’s brightest star is at its tail.']},
  {thread:2, goal:() => S.stemOpen, target:'he_lock', tips:['The STEM cabinet’s padlock has stars on it.', 'It is a dial with the same kite. Pick the star that shone brightest.', 'On the STEM padlock, tap the tail star of the kite, then Open.']},
  {thread:2, goal:() => S.got.includes('badgeSc'), target:'he_cabinet', tips:['The padlock is off.', 'Look inside the STEM cabinet.', 'Tap the cabinet and take the Science badge: 3.']},
  {thread:3, goal:() => S.seen.stripes, target:'an_moth', tips:['Three colours I never bought. Where are colours in this school?', 'The drying rack in the art room. Mary’s painting has something under it.', 'Tap Mary’s moth: three stripes, purple, green, orange.']},
  {thread:3, goal:() => S.paintOpen, target:'ae_lock', tips:['The cupboard’s dials only have red, yellow and blue, in pairs.', 'Ben ran out of purple and mixed red and blue. What mixes to green? To orange?', 'Set the dials to red+blue, yellow+blue, red+yellow and tap Open.']},
  {thread:3, goal:() => S.got.includes('badgeAr'), target:'ae_cupboard', tips:['The paint cupboard is open.', 'Look inside.', 'Tap the cupboard and take the Art badge: 5.']},
  {thread:4, goal:() => S.seen.route, target:'l_map', tips:['Follow the plane from home to Nana’s. There is a map somewhere.', 'The world map in the library, by the window seat.', 'Tap the map: the dotted route turns north, west, west, north.']},
  {thread:4, goal:() => S.cabOpen, target:'l_cabinet', tips:['Something in the library has arrows on it.', 'The cabinet under the globe. Four arrows.', 'Set the arrows to up, left, left, up and tap Open.']},
  {thread:4, goal:() => S.got.includes('badgeGe'), target:'l_cabinet', tips:['The cabinet is open.', 'Look inside.', 'Tap the cabinet and take the Geography badge: 2.']},
  {thread:5, goal:() => S.seen.tune, target:'hn_banner', tips:['The bell is where the whole school sings. Where is that?', 'The hall. Look closely at the banner over the stage.', 'Tap the banner: four letters are coloured, green, red, blue, yellow, in that order.']},
  {thread:5, goal:() => S.got.includes('mallet') || S.beater, target:'hw_blocks', tips:['Four colours you can play. But with what?', 'The chime bars want a beater. Something is under the soft blocks.', 'In the hall’s playground corner, tap the stack of blocks, then the beater.']},
  {thread:5, goal:() => S.drawerOpen, target:'hn_bars', tips:['Play the banner’s colours on the bars, in order.', 'Beater on the bars, then green first.', 'Tap the bars green, red, blue, yellow.']},
  {thread:5, goal:() => S.got.includes('bell'), target:'hn_drawer', tips:['Something clicked in the stage.', 'A little drawer in the front of the stage has slid open.', 'Tap the open drawer and take the handbell.']},
  {goal:() => S.lockerOpen, target:'board', tips:['Four numbers. In what order? Mr Hollis said his board tells you.', 'One line on the whiteboard is written backwards: “In Thursday’s order.” Thursday is on the timetable.', 'Thursday: Art, Maths, Geography, Science. So 5, 7, 2, 3 on the locker.']},
  {goal:() => S.done, target:'h_locker', tips:['Mr Hollis said: now ring it.', 'Hold the bell and tap the corridor.', 'Tap the handbell in the strip, then tap the lockers, and swing.']}
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
function openTimetable(again){
  openCloseup(`<div class="card tt"><svg viewBox="0 0 230 140" aria-label="The class timetable, with a picture for each lesson"><rect width="230" height="140" rx="4" fill="#fffdf6"/><rect width="230" height="18" fill="#2f7c83"/><text x="115" y="13" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fffdf6" letter-spacing="1" font-family="Atkinson Hyperlegible,Verdana,sans-serif">5H TIMETABLE</text><g>${ttGrid(8, 24, 34, 28, 17, 13, 9)}</g></svg></div>`);
  if (!again) say('The class timetable: days down the side, period numbers along the top. But which picture is which lesson? Mr Hollis drew the key on the whiteboard.' + copyClue('timetable'));
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
const PLAN = ['Friday: last day!', 'Maths: tidy the cupboard', 'Art: paintings home', 'PE: party in the playground', 'Then: find the bell'];
const MIRROR = 'In Thursday’s order';
function boardCard(){ /* the whiteboard: the picture key on the left, Mr Hollis's plan for the day on the right, one line of it in mirror writing */
  return `<div class="card shelf"><div class="shelfpic" style="background:#f7f7f4;border-radius:calc(var(--u)*.6)"><p class="otitle">Whiteboard</p>
    <svg viewBox="0 0 320 180" style="position:absolute;inset:0;width:100%;height:100%" aria-label="The whiteboard">${boardKey(12, 30, 60, 24, 8.5, 8.5)}
    ${PLAN.map((t, i) => `<text x="200" y="${44 + i*22}" font-size="9.5" fill="#2b2836" font-family="Caprasimo,Georgia,serif">${t}</text>`).join('')}
    <text x="200" y="${44 + PLAN.length*22 + 4}" font-size="10.5" fill="#b22222" font-family="Caprasimo,Georgia,serif" transform="translate(${200*2 + 112},0) scale(-1,1)">${MIRROR}</text></svg>
  </div><p class="ofb">Mr Hollis’s picture key, and the plan for the day in his writing. One line is back to front.</p></div>`;
}
function openBoard(again){
  if (!again){ S.seen.mirror = Date.now(); save(); } openCloseup(boardCard());
  if (!again) say('Mr Hollis has drawn the timetable pictures on the board, with the plan for the day. One line is written backwards. Mary knows that trick.' + copyClue('board'));
}
function wallBoard(){
  const d = document.createElement('div'); d.style.cssText = 'position:absolute;left:33.5%;top:36%;width:34%;height:33%;pointer-events:none';
  d.innerHTML = `<svg viewBox="0 0 320 180" style="width:100%;height:100%" aria-hidden="true">${boardKey(8, 22, 58, 22, 8, 8)}${PLAN.map((t, i) => `<text x="190" y="${36 + i*20}" font-size="8.5" fill="#2b2836" font-family="Caprasimo,Georgia,serif">${t}</text>`).join('')}<text x="190" y="${36 + PLAN.length*20 + 2}" font-size="9" fill="#b22222" font-family="Caprasimo,Georgia,serif" transform="translate(${190*2 + 98},0) scale(-1,1)">${MIRROR}</text></svg>`;
  return d;
}
/* the glow stars: seven stars on the whiteboard wall, visible only when the blind is down; the brightest at the tail of the kite */
function wallGlow(){
  const d = document.createElement('div'); d.className = 'glow'; d.style.cssText = 'position:absolute;inset:0;pointer-events:none';
  d.innerHTML = `<svg viewBox="0 0 1600 900" preserveAspectRatio="none" style="width:100%;height:100%" aria-hidden="true">${KITE.map(([x, y], i) => `<circle cx="${x*16}" cy="${y*9}" r="${i === TAIL ? 13 : 7}" fill="${i === TAIL ? '#fff6b0' : '#d9f0a0'}" style="filter:drop-shadow(0 0 ${i === TAIL ? 18 : 9}px #e8ffb0)"/>`).join('')}<polyline points="${[0,1,2,3,0,4,5,6].map(i => `${KITE[i][0]*16},${KITE[i][1]*9}`).join(' ')}" fill="none" stroke="#d9f0a0" stroke-width="1.5" stroke-dasharray="6 8" opacity=".5"/></svg>`;
  return d;
}
/* greybox stand-ins: labelled boxes where a picture will be */
function gbox(label, l, t, w, h){ const d = document.createElement('div'); d.className = 'gbox'; d.style.cssText = `left:${l}%;top:${t}%;width:${w}%;height:${h}%`; d.textContent = label; return d; }
function wrap(...kids){ const d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;pointer-events:none'; kids.forEach(k => d.appendChild(k)); return d; }
function wallBlind(){ return wrap(S.blind === 'down' ? gbox('BLIND (down)', 30, 15, 40, 33) : gbox('BLIND (up)', 30, 9, 40, 6), gbox('cord', 69, 15, 2.5, S.blind === 'down' ? 12 : 30)); }
function wallTinCounter(){ const c = gbox(String(S.shown || 0), 72.5, 51, 4, 4); c.id = 'lapCounter'; c.style.background = '#2a2a33'; c.style.color = '#ffe68a'; return wrap(gbox('FOOD TIN', 79, 55, 6, 7), c); }
function wallMap(){ return wrap(gbox('WORLD MAP', 6, 27, 21, 28)); }
const BANNER = [...'HAPPY HOLIDAYS'].map(ch => [ch, null]);
/* green H(0), red P(2), blue L(8), yellow Y(13): read left to right they are the tune */
BANNER[0][1] = BARS.green.hex; BANNER[2][1] = BARS.red.hex; BANNER[8][1] = BARS.blue.hex; BANNER[13][1] = BARS.yellow.hex;
const bannerHTML = size => BANNER.map(([ch, col]) => `<span style="color:${col || '#2b2836'};${col ? 'font-size:' + size : ''}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
function wallBanner(){ /* the banner's letters drawn over the picture: four of them in the chime bars' colours, out of order in the word */
  const d = document.createElement('div'); d.style.cssText = 'position:absolute;left:34%;top:26%;width:32%;height:10%;pointer-events:none;background:rgba(255,250,240,.92);border-radius:calc(var(--u)*.6);display:flex;justify-content:center;align-items:center;font-family:Caprasimo,Georgia,serif;font-size:calc(var(--u)*2.4);letter-spacing:.06em;color:#2b2836';
  d.innerHTML = bannerHTML('115%'); return d;
}
function wallBen(){ const d = document.createElement('div'); d.style.cssText = 'position:absolute;left:38.5%;top:60%;width:13%;height:5%;pointer-events:none;background:#fff8e6;border:1px solid #c9b48a;border-radius:3px;font-size:calc(var(--u)*1.05);line-height:1.1;padding:1px 3px;color:#4a3a2a;font-style:italic;transform:rotate(-2deg)'; d.textContent = 'ran out of purple so I mixed red and blue. Ben'; return d; }
function wallStripes(){
  const wrap = document.createElement('div'); wrap.className = 'layer'; wrap.style.cssText = 'left:0;top:0;width:100%;height:100%';
  wrap.innerHTML = stripesSVG(CARD_WALL); return wrap;
}
function openMoth(){ S.seen.stripes = Date.now(); save();
  openCloseup(`<div class="card pic" style="width:calc(var(--u)*58)"><div class="picwrap" style="aspect-ratio:4/3;background-image:url(../art/school/closeup-mothpainting.jpg?v=${BUILD})">${stripesSVG(CARD_CU)}<p class="otitle">Mary’s moth</p></div></div>`);
  S.seen.stripes = Date.now(); save();
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
  const dials = () => S.cdials.map((d, i) => { const [a, b] = PAIRS[d]; return `<button class="cdial" data-i="${i}" aria-label="Dial ${i+1}: ${a} and ${b}" style="background:linear-gradient(90deg, ${PAINTS.find(p => p[0] === a)[1]} 50%, ${PAINTS.find(p => p[0] === b)[1]} 50%)"></button>`; }).join('');
  openCloseup(`<div class="card locker"><p class="otitle">The paint cupboard’s padlock. Three dials, each a pair of colours.</p><div class="dials" id="cdials">${dials()}</div><p class="ofb" id="lockFb">Tap a dial to change its pair. Mr Hollis never bought purple, green or orange.</p><div class="row"><button class="ob" id="openPaint">Open</button></div></div>`);
  const wire = () => $('cdials').querySelectorAll('.cdial').forEach(b => b.onclick = () => { const i = +b.dataset.i; S.cdials[i] = (S.cdials[i] + 1) % PAIRS.length; sfx('tick'); save(); $('cdials').innerHTML = dials(); wire(); });
  wire();
  $('openPaint').onclick = () => {
    if (S.cdials.join() === PAIR_CODE.join()){ S.paintOpen = true; save(); sfx('pickup'); $('lockFb').textContent = 'Click! Purple, green, orange: mixed, not bought.'; setTimeout(() => { closeCloseup(); render(); animate({anim:'drop', layer:'diallock'}); say('The padlock drops off the paint cupboard. Now look inside.'); }, 700); }
    else { sfx('knock'); const made = S.cdials.map(d => PAIRS[d][2]).join(', '); $('lockFb').textContent = `That mixes to ${made}. Not the moth’s colours.`; }
  };
}
/* the STEM cabinet's padlock: a dial with the Kite on it; pick the star that shone brightest */
function openStarDial(){
  const stars = () => KITE.map(([x, y], i) => `<button class="kstar" data-i="${i}" aria-label="Star ${i+1}" style="position:absolute;left:${(x-24)*2.4}%;top:${(y-16)*1.8}%;width:9%;height:11%;border-radius:50%;border:2px solid #4a3a2a;background:${S.starPick === i ? '#ffe68a' : '#efe6c8'}"></button>`).join('');
  openCloseup(`<div class="card shelf"><div class="shelfpic" id="kdial" style="background:#2b2f4a;border-radius:calc(var(--u)*.6)"><p class="otitle" style="color:#fff">The STEM padlock: a star dial</p>${stars()}</div><p class="ofb" id="lockFb">Seven stars in the shape of a kite. Tap the one that matters, then Open.</p><div class="row"><button class="ob" id="openStem">Open</button></div></div>`);
  $('kdial').querySelectorAll('.kstar').forEach(b => b.onclick = () => { S.starPick = +b.dataset.i; sfx('tick'); save(); $('kdial').querySelectorAll('.kstar').forEach(k => { k.style.background = +k.dataset.i === S.starPick ? '#ffe68a' : '#efe6c8'; }); });
  $('openStem').onclick = () => {
    if (S.starPick === TAIL){ S.stemOpen = true; save(); sfx('pickup'); $('lockFb').textContent = 'Click! The brightest star, at the tail.'; setTimeout(() => { closeCloseup(); render(); animate({anim:'drop', layer:'starlock'}); say('The padlock drops off the STEM cabinet. Now look inside.'); }, 700); }
    else { sfx('knock'); $('lockFb').textContent = S.starPick === null ? 'Pick a star first.' : 'Not that star. Which one shone brightest on the wall?'; }
  };
}
/* the library cabinet's lock: four arrows, the route of the plane on the map */
function openArrowLock(){
  const dials = () => S.arrows.map((d, i) => `<button class="dial" data-i="${i}" aria-label="Arrow ${i+1}, ${ARROWS[d]}">${ARROW_GLYPH[ARROWS[d]]}</button>`).join('');
  openCloseup(`<div class="card locker"><p class="otitle">The library cabinet. Four arrows.</p><div class="dials" id="adials">${dials()}</div><p class="ofb" id="lockFb">Tap an arrow to turn it.</p><div class="row"><button class="ob" id="openCab">Open</button></div></div>`);
  const wire = () => $('adials').querySelectorAll('.dial').forEach(b => b.onclick = () => { const i = +b.dataset.i; S.arrows[i] = (S.arrows[i] + 1) % 4; sfx('tick'); save(); $('adials').innerHTML = dials(); wire(); });
  wire();
  $('openCab').onclick = () => {
    if (S.arrows.map(d => ARROWS[d]).join() === ROUTE.join()){ S.cabOpen = true; save(); sfx('pickup'); $('lockFb').textContent = 'Click! North, west, west, north: the way to Nana’s.'; setTimeout(() => { closeCloseup(); render(); say('The cabinet unlocks. Now look inside.'); }, 700); }
    else { sfx('knock'); $('lockFb').textContent = 'The plane would end up in the sea. Not that way.'; }
  };
}
/* the world map: the dotted flight route from Singapore to London, four legs */
function openMap(again){
  if (!again){ S.seen.route = Date.now(); save(); }
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background:#dfe9f0;border-radius:calc(var(--u)*.6)"><p class="otitle">World map (greybox)</p>
    <svg viewBox="0 0 320 180" style="position:absolute;inset:0;width:100%;height:100%" aria-label="A map with a dotted route from Singapore to London: north, west, west, north">
      <rect x="20" y="30" width="280" height="120" fill="#cfe3d2" stroke="#7a8a7a"/><text x="236" y="146" font-size="9" fill="#2b2836">Singapore</text><text x="52" y="52" font-size="9" fill="#2b2836">London</text>
      <polyline points="232,138 232,98 150,98 70,98 70,58" fill="none" stroke="#b22222" stroke-width="3" stroke-dasharray="5 5"/>
      <circle cx="232" cy="138" r="4" fill="#b22222"/><circle cx="70" cy="58" r="4" fill="#b22222"/>
      <g transform="translate(290,40)" font-size="8" fill="#2b2836" text-anchor="middle"><text y="-6">N</text><text y="18">S</text><text x="-11" y="6">W</text><text x="11" y="6">E</text></g>
    </svg></div><p class="ofb">The plane from home to Nana’s: up, left, left, up. Four legs.</p></div>`);
  if (!again) say('A world map, with the way home to Nana’s drawn on in red: north, then west, west, and north again.' + copyClue('map'));
}
/* the book pages the library gives as references: never an answer, always the key to one */
function openPage(key, again){
  const pages = {
    nightsky:{title:'The Night Sky, page 40: the Kite', body:`<svg viewBox="0 0 320 180" style="position:absolute;inset:0;width:100%;height:100%" aria-label="The Kite: seven stars, the brightest at the tail">${KITE.map(([x, y], i) => `<circle cx="${(x-24)*7.5 + 40}" cy="${(y-16)*3.5 + 10}" r="${i === TAIL ? 7 : 4}" fill="${i === TAIL ? '#ffe68a' : '#fff'}"/>`).join('')}<text x="180" y="60" font-size="10" fill="#fff">The Kite</text><text x="180" y="80" font-size="8" fill="#fff">A small constellation of seven stars.</text><text x="180" y="96" font-size="8" fill="#fff">Its brightest star is at the tail,</text><text x="180" y="112" font-size="8" fill="#fff">the last star of the string.</text></svg>`, bg:'#1d2240', fb:'A constellation shaped like a kite. Its brightest star is at the tail.', seen:'kite', line:'The Night Sky. A kite of seven stars, and its brightest is at the tail.'},
    piano:{title:'Playing the Piano, page 12', body:staff() + '<p style="position:absolute;left:6%;right:6%;bottom:8%;font-size:calc(var(--u)*1.5)">Chime bars are tuned like the piano: each colour is one note. Red is the lowest, then yellow, green, and blue the highest.</p>', bg:'#f7f3e8', fb:'Which bar is which note. The tune itself is written somewhere else.', seen:'bars', line:'Playing the Piano. Each coloured bar is one note; red low, blue high.'},
    painting:{title:'The Painting Book: the colour wheel', body:`<svg viewBox="0 0 320 180" style="position:absolute;inset:0;width:100%;height:100%" aria-label="Colour wheel: red and yellow make orange, red and blue make purple, yellow and blue make green">${[['red', 160, 40], ['orange', 230, 80], ['yellow', 230, 140], ['green', 160, 170], ['blue', 90, 140], ['purple', 90, 80]].map(([c, x, y]) => `<circle cx="${x}" cy="${y}" r="18" fill="${PAINTS.find(p => p[0] === c)[1]}" stroke="#2b2836"/>`).join('')}<text x="160" y="105" font-size="9" fill="#2b2836" text-anchor="middle">two neighbours make the one between</text></svg>`, bg:'#fffaf0', fb:'Red and yellow make orange. Red and blue make purple. Yellow and blue make green.', seen:'wheel', line:'The Painting Book. Two primaries make the colour between them.'}
  };
  const pg = pages[key]; if (!again){ S.seen[pg.seen] = Date.now(); save(); }
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background:${pg.bg};border-radius:calc(var(--u)*.6)"><p class="otitle" style="${pg.bg === '#1d2240' ? 'color:#fff' : ''}">${pg.title}</p>${pg.body}</div><p class="ofb">${pg.fb}</p></div>`);
  if (!again) say(pg.line + copyClue({nightsky:'kite', painting:'wheel', piano:'bars'}[key]));
}
/* Clues travel (owner, 18 Oct 2026): a page, a map, a banner or a board read in one room is copied into Mary's notebook the first
   time she sees it, and reopens from the notebook anywhere, so nothing has to be memorised or walked back to. */
const CLUES = {
  kite:{label:'The Kite', open:() => openPage('nightsky', true)},
  wheel:{label:'Colour wheel', open:() => openPage('painting', true)},
  bars:{label:'Piano page', open:() => openPage('piano', true)},
  map:{label:'World map', open:() => openMap(true)},
  banner:{label:'The banner', open:() => openBanner(true)},
  board:{label:'Whiteboard', open:() => openBoard(true)},
  timetable:{label:'Timetable', open:() => openTimetable(true)}
};
function clues(){ return (S.clues || []).map(k => CLUES[k]).filter(Boolean); }
function copyClue(key){
  if (!S.clues) S.clues = [];
  if (S.clues.includes(key)) return '';
  S.clues.push(key); save();
  return S.clues.length === 1 ? ' Mary copies it into her notebook: tap the moth to look at it again, wherever you are.' : ' Copied into the notebook.';
}
function openBanner(again){
  if (!again){ S.seen.tune = Date.now(); save(); }
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background:#fff7e8;border-radius:calc(var(--u)*.6)"><p class="otitle">The banner</p><div style="position:absolute;inset:30% 6% 30% 6%;display:flex;justify-content:center;align-items:center;font-family:Caprasimo,Georgia,serif;font-size:calc(var(--u)*5);letter-spacing:.08em;color:#2b2836">${bannerHTML('120%')}</div></div><p class="ofb">Mrs Ng’s lettering. Four of the letters are coloured: green, red, blue, yellow, reading left to right. Like the chime bars.</p></div>`);
  if (!again) say('HAPPY HOLIDAYS. Four of the letters are painted in colours. Green, red, blue, yellow, left to right.' + copyClue('banner'));
}
/* badges inside the opened cabinets: a numbered token each (greybox: a labelled box) */
function openBadge(which){
  const [title, key, subj] = {stem:['Inside the STEM cabinet', 'badgeSc', 'Science'], paint:['Inside the paint cupboard', 'badgeAr', 'Art'], cab:['Inside the library cabinet', 'badgeGe', 'Geography']}[which];
  openCloseup(`<div class="card shelf"><div class="shelfpic" style="background:#4a4a55;border-radius:calc(var(--u)*.6)"><p class="otitle" style="color:#fff">${title} (greybox)</p><button class="ob" id="takeBadge" style="position:absolute;left:38%;top:38%;width:24%;height:30%;font-size:calc(var(--u)*3)">${BADGES[key]}</button></div><p class="ofb">A ${subj} badge with a number on it: ${BADGES[key]}. Take it.</p></div>`);
  $('takeBadge').onclick = () => { if (!S.got.includes(key)){ S.got.push(key); save(); } sfx('pickup'); closeCloseup(); render(); say(`The ${subj} badge: ${BADGES[key]}. It goes in the strip below.`); };
}
/* Nutmeg: fed once he runs and the counter climbs; fed twice he is too full and sleeps it off (rule 3) */
let feedTimer = null;
function feed(){
  if (S.asleep){ say('Nutmeg is fast asleep, far too full. Give him a minute.'); return; }
  S.fed = (S.fed || 0) + 1; save();
  if (S.fed === 1){ sfx('squeak'); say('Nutmeg bolts his seed and hops onto his wheel. Round and round… the little counter is climbing.'); animate({anim:'sniff', layer:'hamster'});
    let n = 0; clearInterval(feedTimer); feedTimer = setInterval(() => { n++; S.shown = n; const c = $('lapCounter'); if (c) c.textContent = n; if (n >= LAPS){ clearInterval(feedTimer); S.laps = LAPS; S.seen.laps = Date.now(); save(); say(`Nutmeg stops at ${LAPS}. Seven laps, and not one more. Count what runs but never leaves.`); } }, 350); return; }
  sfx('knock'); say('Rule 3! Never twice. Nutmeg is far too full now. He curls up and the counter resets.'); clearInterval(feedTimer); S.asleep = true; S.shown = 0; S.laps = 0; S.fed = 0; S.seen.laps = false; save(); render();
  setTimeout(() => { S.asleep = false; save(); if (S.room === 'classroom') say('Nutmeg yawns and wakes up. He looks hungry again.'); }, 9000);
}
/* the blind: the opening gesture pulls it up; after that a tap lowers or raises it, and the room darkens or brightens */
function openBlindDrag(then){
  openDrag({pic:WALLS.c2, title:'Pull the blind up', tab:'../art/greybox/tab-cord.png', tabW:4, tabRatio:'300/120', path:[[70, 22], [70, 62]], label:'Take hold of the pull and drag it down.', missLabel:'Take hold of the pull on the cord.', moreLabel:'Keep pulling, all the way down.', doneLabel:'Up it goes!', lineColour:'#7a6a4a', lineWidth:8,
    done:() => { S.blind = 'up'; S.lit = true; save(); render(); sfx('leaf'); if (then) then(); }});
}
function toggleBlind(){
  if (!S.lit){ openBlindDrag(() => say('Light pours in. On the glass, a small moth with golden wings is watching.')); return; }
  S.blind = S.blind === 'down' ? 'up' : 'down'; save(); sfx('leaf'); render();
  if (S.blind === 'down') say('The blind comes down and the room goes dim. Something is glowing on the whiteboard wall…');
  else say('Up goes the blind. Sunshine again.');
}
/* the bell: the ending. Held and used in the corridor after the locker has opened; a swing, then the clock strikes three */
function ringBell(){
  if (!S.lockerOpen){ sfx('knock'); say('Not yet. Mr Hollis said the bell comes last: the locker first.'); return; }
  openDrag({pic:WALLS.h1, title:'Ring the last bell', tab:'../art/greybox/tab-bell.png', tabW:7, tabRatio:'200/160', path:[[30, 55], [50, 40], [70, 55]], label:'Take the bell and swing it right across.', missLabel:'Take hold of the bell.', moreLabel:'A proper swing, all the way across.', doneLabel:'DING!', lineColour:'#a8844a', lineWidth:10,
    done:() => { S.rung = true; drop('bell'); save(); chime(1046.5); setTimeout(() => chime(1318.5), 300); setTimeout(() => chime(1567.98), 600); say('The bell rings out down the corridor, and far away the classroom clock strikes three.'); setTimeout(ending, 1800); }});
}
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
  if (typeof what === 'string' && what.startsWith('page:')){ closeCloseup(); setTimeout(() => openPage(what.slice(5)), 150); return; }
  if (ITEMS[what]){ /* (version 2 kept books as containers; version 3 has none) */
    if (S.got.includes(what)){ fb.textContent = 'Nothing more in this one. You have what it was hiding.'; return; }
    S.got.push(what); sfx('pickup'); fb.textContent = ITEMS[what].found.replace('{b}', title);
    setTimeout(() => { render(); openNote(what); }, 500); say(`Something from ${title}. It goes in the strip below.`);
    return;
  }
  fb.textContent = what;
}
/* the locker: three dials, checked only when Open is tapped, so the answer cannot be found by watching for a click */
function openLock(){
  openCloseup(`<div class="card locker"><p class="otitle">Mary’s locker. Four numbers, in the right order.</p><div class="dials" id="dials"></div><p class="ofb" id="lockFb">Tap a dial to turn it.</p><div class="row"><button class="ob" id="openLocker">Open</button></div></div>`);
  $('dials').innerHTML = S.dials.map((d, i) => `<button class="dial" data-i="${i}" aria-label="Dial ${i+1}, showing ${d}">${d}</button>`).join('');
  $('dials').querySelectorAll('.dial').forEach(b => b.onclick = () => { const i = +b.dataset.i; S.dials[i] = (S.dials[i] + 1) % 10; b.textContent = S.dials[i]; b.setAttribute('aria-label', `Dial ${i+1}, showing ${S.dials[i]}`); sfx('tick'); save(); });
  $('openLocker').onclick = () => {
    if (S.dials.join() === CODE.join()){ S.lockerOpen = true; S.opened = true; sfx('pickup'); $('lockFb').textContent = 'Click! The locker opens.'; setTimeout(() => { closeCloseup(); render(); animate({anim:'openDoor', layer:'lockerdoor'}); say('Your locker swings open. Nana’s postcard, your report… and one more note from Mr Hollis.'); setTimeout(() => openNote('last'), 900); }, 700); }
    else { sfx('knock'); $('lockFb').textContent = 'It doesn’t budge. Not those numbers, or not that order.'; }
  };
}
function ending(){
  S.done = true; save(); sfx('pickup');
  showEnd('The last bell rings!', 'Last day! The bell went missing, so Mr Hollis set a hunt. I fed Nutmeg once (never twice), found glow stars on the wall when I pulled the blind down, mixed the colours for the paint cupboard, followed the plane on the map, and played the tune hidden in the banner. The bell was in the stage! My report says “a brilliant detective”, and Nana’s postcard says “Not long now!” The little moth on it seems to glow. I rang the bell myself.',
    S.nightMoth ? 'I solved the bonus riddle too. It spelled NANA. ★' : 'There was a bonus riddle on the notice board. I didn’t crack it yet.');
}
function unlockStem(){ if (S.stemOpen) return; drop('starkey'); S.stemOpen = true; save(); render(); sfx('pickup'); animate({anim:'drop', layer:'starlock'}); say('The star key turns. Click! The padlock drops off the STEM cabinet. Now look inside.'); }
const USES = {
  'mallet>hn_bars': () => { drop('mallet'); S.beater = true; save(); render(); sfx('tick'); say('The beater rests on the stand. Now: which bars, and in which order?'); setTimeout(openBells, 600); },
  'mallet>he_lock': () => { sfx('knock'); say('Bonk. The padlock doesn’t care.'); },
  'mallet>ae_lock': () => { sfx('knock'); say('Bonk. The padlock doesn’t care.'); },
  'mallet>tin': () => { sfx('knock'); say('Nutmeg does not want to be drummed.'); }
};
['h_lockers', 'h_locker', 'h_certs', 'h_bench', 'h_libdoors', 'h_fountain', 'h_trophies', 'h_notices', 'h_bonus', 'h_hall', 'h_door5H', 'h_artdoor', 'h_bunting'].forEach(id => USES['bell>' + id] = ringBell);
['hn_bars', 'hn_stage', 'he_cabinet', 'ae_cupboard', 'l_desk', 'desk', 'board'].forEach(id => USES['bell>' + id] = () => { sfx('knock'); say('Not here. Mr Hollis said the bell is rung where everyone will hear it: the corridor.'); });
function act(id){ /* returns false for a door the engine should open */
  if (id === 'door' && !S.got.includes('envelope')){ say('Not yet. Mr Hollis left something on your desk first.'); return true; }
  if (!S.lit && id !== 'blind'){ say('It is too dim to see much. The blind is down.'); return true; }
  if (DOORS[id]) return false;
  switch(id){
    case 'envelope': S.got.push('envelope'); sfx('pickup'); setTimeout(() => { render(); openNote('envelope'); }, 700); say('A letter from Mr Hollis! Tap it in the strip below any time to read it again.'); return;
    case 'blind': toggleBlind(); return;
    case 'tin': feed(); return;
    case 'desk': say(S.got.includes('envelope') ? 'Your desk, cleared out for the summer. Just your pencil case.' : 'Your desk. There’s an envelope on it with your name.'); break;
    case 'hamster': if (S.asleep){ say('Nutmeg is asleep, full to the whiskers.'); break; } openNotebook(); return;
    case 'rules': say('<b>Class rules.</b> 1. Be kind. 2. Listen with your whole face. 3. Feed Nutmeg once a day, never twice. 4. Nobody goes home without their jumper.'); break;
    case 'timetable': openTimetable(); return;
    case 'clock': say('Twenty to three. The last bell goes at three.'); break;
    case 'bookshelf': say('Reading books, dictionaries, and a box of comics that everyone pretends not to read.'); break;
    case 'bag': say('Mary’s bag, packed and ready. Only the report and Nana’s postcard still to collect. And the bell to find.'); break;
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
      else if (S.lockerOpen) say(S.got.includes('bell') ? 'Nana’s postcard and your report, safe in your locker. Now ring the bell.' : 'Nana’s postcard and your report. Mr Hollis says: now ring it. But the bell is still hiding.');
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
    case 'hn_banner': openBanner(); return;
    case 'hn_bars': if (S.beater) openBells(); else say('Four chime bars: red, yellow, green and blue. There is nothing to strike them with.'); return;
    case 'hn_drawer':
      if (!S.drawerOpen){ say('A tiny drawer in the front of the stage. It won’t budge.'); break; }
      if (S.got.includes('bell') || S.rung){ say('The little drawer, empty now.'); break; }
      S.got.push('bell'); sfx('pickup'); render(); say('The school handbell, hiding in the drawer! Mr Hollis, you rascal. It goes in the strip below.'); return;
    case 'he_sign': say('STEM WEEK. Rockets, robots, and one small explosion nobody talks about.'); break;
    case 'he_points': say('House points: red 380, blue 275, yellow 180. Red is Mary’s house, and red is winning.'); break;
    case 'he_cabinet': case 'he_lock':
      if (S.stemOpen && !S.got.includes('badgeSc')){ openBadge('stem'); return; }
      if (S.stemOpen){ say('The STEM cabinet: a rocket, the planets on sticks and a cardboard robot. Nothing else now.'); break; }
      if (id === 'he_lock'){ openStarDial(); return; }
      say('The STEM week cabinet: a rocket, the planets on sticks and a cardboard robot. Locked, with a padlock that has little stars all over it.'); break;
    case 'hs_bench': say('The bench where the youngest class sits for assembly, swinging their legs.'); break;
    case 'hw_mat': say('The soft mat of the indoor playground. No shoes!'); break;
    case 'hw_slide': say('The little slide. Strictly for the little ones. Strictly.'); break;
    case 'hw_blocks': S.toppled = true; save(); setTimeout(render, 700); say('Whoops. The soft blocks tumble over… and there was something underneath!'); return;
    case 'hw_blocks2': say('Soft blocks all over the mat. Someone will have to stack those again. Not Mary.'); break;
    case 'hw_mallet': S.got.push('mallet'); sfx('pickup'); render(); say('A wooden beater! The kind you play chime bars with.'); return;
    /* art room */
    case 'an_rack': say('The drying rack: today’s paintings, pegged up to dry.'); break;
    case 'an_p1': say('Aisha’s house, with the sun in the corner where suns go.'); break;
    case 'an_p2': S.seen.ben = Date.now(); save(); say('A rainbow by Ben. His note says he ran out of purple, so he mixed red and blue.'); break;
    case 'an_p3': say('Priya’s cat. Or possibly her hamster.'); break;
    case 'an_moth': openMoth(); return;
    case 'ae_pots': say('Six pots of paint on the shelf: red, yellow, blue, green, orange and purple.'); break;
    case 'ae_cupboard': case 'ae_lock':
      if (S.paintOpen && !S.got.includes('badgeAr')){ openBadge('paint'); return; }
      if (S.paintOpen){ say('Paint, brushes and paper. The badge is in your strip.'); break; }
      if (id === 'ae_lock'){ openPaintLock(); return; }
      say('The paint cupboard, padlocked. The padlock has three dials, each showing two colours.'); break;
    case 'as_bench': say('A bench of clay things. Don’t touch, they’re still soft.'); break;
    case 'as_clay': say('Clay animals waiting for the kiln: a cat, a dog, a bird and an elephant with one ear.'); break;
    case 'aw_sink': say('The paint sink, rinsed to a rainbow.'); break;
    case 'aw_tap': say('A gush of water. The sink gurgles.'); break;
    case 'aw_jar': say('A jar of brushes, washed clean for the holidays.'); break;
    case 'aw_apronB': say('A blue apron. Not Mary’s.'); break;
    case 'aw_apronG': say('A green apron: Mary’s, actually. Nothing in the pocket.'); break;
    case 'aw_apronP': say('Mr Hollis’s apron, splattered with every colour in the room. Nothing in the pocket but a tissue.'); break;
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
    case 'l_cabinet':
      if (S.cabOpen && !S.got.includes('badgeGe')){ openBadge('cab'); return; }
      if (S.cabOpen){ say('Old worksheets, and the space where the badge was.'); break; }
      openArrowLock(); return;
    case 'l_map': openMap(); return;
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
const THREADS = {1:['Maths: count what runs but never leaves', () => S.laps >= LAPS, ['', 'counter read']],
  2:['Science: stars that only come out in the dark', () => S.got.includes('badgeSc'), ['', 'stars seen', 'the Kite read', 'cabinet open']],
  3:['Art: three colours he never bought', () => S.got.includes('badgeAr'), ['', 'stripes seen', 'cupboard open']],
  4:['Geography: follow the plane', () => S.got.includes('badgeGe'), ['', 'route seen', 'cabinet open']],
  5:['Music: where the whole school sings', () => S.got.includes('bell'), ['', 'tune seen', 'beater found', 'drawer open']]};
function rows(){
  const out = [];
  if (!S.lit) out.push([0, 'Too dark to see', 'not yet', false]);
  else if (!S.got.includes('envelope')) out.push([1, 'Something on my desk?', 'not yet', false]);
  else {
    Object.entries(THREADS).forEach(([th, [label, doneFn, steps]]) => {
      const idx = HINTS.map((h, k) => h.thread == th && !h.goal() ? k : -1).filter(k => k >= 0);
      const done = doneFn(), p = steps.length - idx.length;
      out.push([done ? -1 : idx[0], label, done ? '✓ done' : (steps[p] || 'not started'), done]);
    });
    const four = S.laps >= LAPS && ['badgeSc', 'badgeAr', 'badgeGe'].every(k => S.got.includes(k));
    if (four) out.push([HINTS.findIndex(h => h.target === 'board'), 'Four numbers, the order, my locker', S.lockerOpen ? '✓ open' : 'what order?', S.lockerOpen]);
    if (S.lockerOpen) out.push([HINTS.findIndex(h => h.target === 'h_locker'), 'Ring the last bell', S.done ? '✓ rung' : (S.got.includes('bell') ? 'I have the bell' : 'find the bell'), S.done]);
  }
  return out;
}
function noticed(){ /* what Mary has noticed and still needs: the newest four, so the notebook stays on one card */
  const n = [];
  const add = (when, text) => { if (when) n.push([typeof when === 'number' ? when : 0, text]); };
  if (!S.lockerOpen) add(S.seen.laps, `Nutmeg ran ${LAPS} laps.`);
  if (!S.stemOpen){ add(S.seen.stars, 'Glow stars on the whiteboard wall when the blind is down: a kite, one star brighter.'); add(S.seen.kite, 'The Kite’s brightest star is at the tail.'); }
  if (!S.paintOpen){ add(S.seen.stripes, 'Under my moth painting: ' + PAINT_CODE.map(p => PAINTS[p][0]).join(', ') + '.'); add(S.seen.ben || S.seen.wheel, 'Red and blue make purple; two primaries make the colour between.'); }
  if (!S.cabOpen) add(S.seen.route, 'The plane’s route: north, west, west, north.');
  if (!S.drawerOpen) add(S.seen.tune, 'The banner’s coloured letters: ' + TUNE_ORDER.join(', ') + '.');
  if (!S.lockerOpen) add(S.seen.mirror, 'A line on the board is written backwards' + (Object.values(S.hint).some(v => v >= 2) ? ': “In Thursday’s order.”' : '.'));
  if (S.seen.bonus && !S.nightMoth) add(S.seen.bonus, 'Bonus riddle: someone in London loves postcards and moths. Four stories spell her name.');
  if (S.nightMoth) add(1, 'Bonus riddle solved: NANA. ★');
  return n.sort((x, y) => y[0] - x[0]).slice(0, 4).map(x => x[1]);
}
function sparkle(){ return false; } /* no sparkles by default (owner, 17 Oct 2026): the second hint tier pulses the thing instead */

return {
  card:{place:'SINGAPORE · THE LAST DAY OF TERM', text:'Everyone is at the goodbye party. Nobody can go home until the last bell rings, and the bell has gone missing. Mr Hollis has left something on Mary’s desk.'},
  meanwhile:'Meanwhile, at Knightsbrook, Mary is still hunting for the last bell.',
  comic:[{pic:'../art/comic/school-1.jpg', lines:['“Last day of school, Mary!” said Mum.', 'Two more sleeps, then the plane to Nana’s.']}, {pic:'../art/comic/school-2.jpg', lines:['Knightsbrook International School. Mary knew every corridor.', 'Today she would walk them one last time.']}, {pic:'../art/comic/school-3.jpg', lines:['On her desk: an envelope with her name on it, in Mr Hollis’s writing.', 'Inside, a hunt. Of course.']}, {pic:'../art/comic/school-4.jpg', lines:['And on the window, a little moth, watching.', 'The last bell was at three. If anyone could find it.']}],
  postcard:{pic:'../art/postcards/school.jpg'},
  supersedes:'school', /* built to replace version 2; shares its hotspot ids (the audit allows it) */
  title:'Last day of school', blurb:"Mary's last day of school, version 3: the last bell has gone missing.",
  track:'../art/music/classroom.mp3', ambient:'school', next:'packing', nextLabel:'Go home and pack',
  intro:'<b>Last day of school.</b> Nobody goes home until the last bell rings, and the bell is missing. Mr Hollis left something on your desk. And a little moth is watching from the window.',
  start:{room:'classroom', view:1},
  begin:then => openBlindDrag(then), /* the opening gesture: pull the blind up */
  fresh:() => ({blind:'down', lit:false, fed:0, laps:0, shown:0, asleep:false, starPick:null, stemOpen:false, cdials:[0,0,0], paintOpen:false, arrows:[0,0,0,0], cabOpen:false, toppled:false, beater:false, drawerOpen:false, dials:[0,0,0,0], lockerOpen:false, opened:false, rung:false, bonus:false, spell:'', nightMoth:false, seen:{}, clues:[]}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, extra:EXTRA, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES,
  overlays:{c4:() => wrap(wallTimetable(), wallTinCounter()), c1:() => wrap(wallBoard(), wallGlow()), c2:wallBlind, an:() => wrap(wallStripes(), wallBen()), le:wallMap, hn:wallBanner},
  onRender:v => { const dark = S.room === 'classroom' && (!S.lit || S.blind === 'down'); $('scene').classList.toggle('dark', dark); /* the blind darkens the classroom only */ if (dark && v === 'c1' && !S.seen.stars){ S.seen.stars = Date.now(); save(); } },
  onNote:key => { if (key === 'bonus') S.seen.bonus = Date.now(); save(); },
  act, sparkle, rows, noticed, clues, speaker, helper:() => 'the moth'
};

})());
