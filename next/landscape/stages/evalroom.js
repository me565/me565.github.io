/* The Moth House, landscape engine: an evaluation stage, not a level. Classroom 5H drawn by GPT Image 2.5 Sunburst on 21 Oct 2026 from the
   room specification in evals/images/rooms/classroom5h.json, with the three moving things left off the walls and made as cut-outs
   (playbook 4aa, 4ab). One room, no puzzle: it exists so the owner can see the new walls and the engine's movements on the tablet.
   Open with ?stage=evalroom. Nothing here is part of a child's story. */
'use strict';
registerStage('evalroom', (function(){
const GEO = {"hamster": {"l": 75.68, "t": 38.0, "w": 3.03, "h": 7.5}, "envelope": {"l": 47.96, "t": 52.0, "w": 2.47, "h": 2.8}, "backpack": {"l": 56.25, "t": 70.0, "w": 7.49, "h": 16.0}};
const ROOMS = { classroom:{name:'Classroom 5H (evaluation)', into:'the evaluation classroom', views:['c1','c2','c3','c4']} };
const WALLS = { c1:'../art/eval/c5h/c1.jpg', c2:'../art/eval/c5h/c2.jpg', c3:'../art/eval/c5h/c3.jpg', c4:'../art/eval/c5h/c4.jpg' };
const DOORS = {};
const HOTS = {
  c1:[
    {id:'ev_cupboard', l:6, t:12, w:20, h:72, label:'Supplies cupboard', sound:'knock'},
    {id:'ev_board', l:33, t:14, w:34, h:27, label:'Whiteboard', sound:'tap'},
    {id:'ev_tdesk', l:68, t:46, w:22, h:36, label:"Mr Hollis's desk", sound:'tap'}],
  c2:[
    {id:'ev_window', l:27, t:5, w:46, h:30, label:'Classroom window', sound:'tap'},
    {id:'ev_beans', l:33, t:35, w:36, h:16, label:'Bean plants on the window sill', sound:'leaf'},
    {id:'ev_radiator', l:33, t:57, w:33, h:22, label:'Radiator', sound:'knock'}],
  c3:[
    {id:'ev_bin', l:12, t:60, w:10, h:24, label:'Recycling bin', sound:'knock'},
    {id:'ev_door', l:38, t:8, w:22, h:76, label:'Classroom door', sound:'knock'},
    {id:'ev_pegs', l:64, t:30, w:20, h:30, label:'Coat pegs', sound:'leaf'},
    {id:'ev_lost', l:68, t:62, w:15, h:20, label:'Lost property box', sound:'paper'}],
  c4:[
    {id:'ev_rules', l:21, t:18, w:10, h:22, label:'Class rules', sound:'paper'},
    {id:'ev_timetable', l:37, t:10, w:27, h:32, label:'Class timetable', sound:'paper'},
    {id:'ev_clock', l:70, t:15, w:9, h:15, label:'Clock', sound:'tick'},
    {id:'ev_bookshelf', l:14, t:48, w:20, h:34, label:'Bookshelf', sound:'knock'},
    {id:'ev_desk', l:39, t:54, w:21, h:34, label:"Mary's desk", sound:'tap'},
    {id:'ev_envelope', l:GEO.envelope.l-1.5, t:GEO.envelope.t-2, w:GEO.envelope.w+3, h:GEO.envelope.h+4, label:'Envelope on the desk', key:true, anim:'lift', layer:'envelope', sound:'paper', hideWhen:() => S.got.includes('ev_env')},
    {id:'ev_bag', l:GEO.backpack.l-1, t:GEO.backpack.t-1, w:GEO.backpack.w+2, h:GEO.backpack.h+2, label:'Schoolbag', anim:'wobble', layer:'backpack', sound:'tap'},
    {id:'ev_hamster', l:70, t:36.5, w:13.4, h:15.7, label:'Nutmeg the hamster', anim:'sniff', layer:'hamster', sound:'squeak'},
    {id:'ev_cabinet', l:69, t:52, w:16, h:33, label:'Filing cabinet', sound:'knock'}]
};
/* the three cut-outs over the places the walls were asked to leave empty; positions measured on the picture, the engine draws contact shadows */
const LAYERS = {
  c4:[
    {src:'../art/eval/c5h/layer-envelope.png', group:'envelope', l:GEO.envelope.l, t:GEO.envelope.t, w:GEO.envelope.w, h:GEO.envelope.h, hideWhen:() => S.got.includes('ev_env')},
    {src:'../art/eval/c5h/layer-hamster.png', group:'hamster', l:GEO.hamster.l, t:GEO.hamster.t, w:GEO.hamster.w, h:GEO.hamster.h, glass:[70, 36.5, 13.4, 15.7], shadow:.5, tone:'saturate(.72) brightness(.94) contrast(.92)', idle:'breathe', amount:.02, period:2.4},
    {src:'../art/eval/c5h/layer-backpack.png', group:'backpack', l:GEO.backpack.l, t:GEO.backpack.t, w:GEO.backpack.w, h:GEO.backpack.h, shadow:.8}]
};
const NOTES = { ev_env:{hand:true, html:'<span class="head">For Mary</span><span class="big">This is the evaluation classroom.</span><span>Walk round it, tap things, watch what moves. Nothing here is a puzzle.</span>'} };
const ITEMS = { ev_env:{name:'envelope', note:'ev_env', icon:'<img src="../art/classroom/item-envelope.png" alt="">'} };
const HINTS = [];
const USES = {};
function act(id){
  switch(id){
    case 'ev_envelope': S.got.push('ev_env'); sfx('pickup'); setTimeout(() => { render(); openNote('ev_env'); }, 700); say('An envelope. It lifts off the desk and into the strip.'); return;
    case 'ev_hamster': say('Nutmeg sniffs at the bars. He breathes all the time; a tap makes him sniff.'); return;
    case 'ev_bag': say('The schoolbag wobbles. In the game a tap would pick it up.'); return;
    case 'ev_desk': say(S.got.includes('ev_env') ? 'The desk, bare but for the pencil case.' : 'The desk. An envelope on it.'); return;
    case 'ev_clock': say('The clock face is blank: the game draws the hands.'); return;
    case 'ev_timetable': say('The grid is empty: the game draws the days and the cells.'); return;
    case 'ev_cabinet': say('The filing cabinet. The cage on top was drawn empty; Nutmeg is a cut-out.'); return;
    case 'ev_window': say('The window wall, the same room turned left from the timetable wall.'); return;
    case 'ev_door': say('The door wall, opposite the timetable wall.'); return;
    case 'ev_board': say('The whiteboard wall, turned right from the timetable wall.'); return;
    default: say('Painted into the wall: it does not move.'); return;
  }
}
const sparkle = id => id === 'ev_envelope' && !S.got.includes('ev_env');
const rows = () => [];
const noticed = () => [];
const speaker = () => 'The moth says';
return {
  card:{place:'An evaluation room', text:'Classroom 5H drawn by the new model from one room specification. Turn all the way round and tap what you like.'},
  meanwhile:'Meanwhile, in the evaluation classroom, nothing happens at all.',
  title:'Evaluation classroom', blurb:'Classroom 5H by the new image model: four walls, three cut-outs, the engine’s movements.',
  track:'../art/music/classroom.mp3', ambient:'school',
  intro:'<b>The evaluation classroom.</b> Four walls from one room specification, with the hamster, the envelope and the schoolbag made as cut-outs. Tap them.',
  start:{room:'classroom', view:3},
  fresh:() => ({seen:{}}),
  rooms:ROOMS, walls:WALLS, doors:DOORS, hots:HOTS, layers:LAYERS, notes:NOTES, items:ITEMS, hints:HINTS, uses:USES,
  act, sparkle, rows, noticed, speaker, helper:() => 'the moth', child:'mary'
};
})());
