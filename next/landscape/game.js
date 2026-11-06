/* Layer: game. The Moth House's settings for the landscape engine (MOTH-166, 6 Nov 2026). The engine page beside this file
   reads window.GAME before it starts: the game's name, where it keeps its things in the browser (saves, tips, volumes, the How to
   play page), its players, the levels its title screen offers, and its level files in the order they run. The screens' words and
   pictures are this game's and still live in the engine page as its defaults, until the engine moves to its own home. */
window.GAME = {
  name: 'The Moth House',
  store: 'mothhouse',                 /* never change: players' tips, volumes and How to play are kept under it */
  saveKey: 'mothhouse.landscape.v1',  /* never change: every player's saves are kept under it */
  /* the three stories: each child's first stage, portrait and line on the choose screen */
  players: {
  mary:{name:'Mary', age:10, level:'for ages 10 and up, with puzzles for grown-ups', colour:'#8a5cc2', line:'Notices patterns, reads everything.', first:'evalroom', portrait:'../art/portraits/mary.png', grin:'../art/portraits/mary-grin.png'},
  elliot:{name:'Elliot', age:7, level:'for ages 7 and up', colour:'#2f7c83', line:'Wants to know how things work.', first:'eschool', portrait:'../art/portraits/elliot.png', grin:'../art/portraits/elliot-grin.png'},
  zaina:{name:'Zaina', age:4, level:'for ages 4 and up, nothing to read', colour:'#d9a622', line:'Sees the small things. Animals trust her.', first:'zschool', portrait:'../art/portraits/zaina.png', grin:'../art/portraits/zaina-grin.png'}
},
  /* the lite release (owner, 17 Oct 2026): only these first stages are playable from the title */
  released: ['evalroom', 'eval2'],
  stages: ['stages/evalroom.js', 'stages/eval2.js', 'stages/eschool.js', 'stages/zschool.js', 'stages/flight.js', 'stages/nana.js', 'stages/park.js']
};
