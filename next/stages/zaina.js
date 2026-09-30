/* Zaina, stages 1 to 3. See STORY.md. Hotspot ids start with z_. No reading needed: every clue is a picture. */

const ZAINA_CSS = `
.big4{display:grid;grid-template-columns:1fr 1fr;gap:clamp(8px,3cqw,14px);width:min(100%,70cqw)}
.big4 button{aspect-ratio:1;border-radius:16px;border:3px solid #e8dcc6;background:#fffdf6;cursor:pointer;padding:8px;display:grid;place-items:center}
.big4 button.done{border-color:#5fc08a;background:#d8ecdf}
.big4 svg{width:100%;height:100%}
.strip{display:flex;gap:6px;align-items:center;justify-content:center}
.strip .st{width:clamp(34px,10cqw,46px);height:clamp(34px,10cqw,46px);border-radius:10px;background:#fffdf6;display:grid;place-items:center;position:relative}
.strip .st svg{width:70%;height:70%}
.strip .st i{position:absolute;top:-8px;left:-8px;width:20px;height:20px;border-radius:50%;background:#f0b44c;color:#2b2836;font-style:normal;font-weight:700;font-size:.8em;display:grid;place-items:center}
.strip .st.hit{outline:3px solid #5fc08a}
.count{font-family:Caprasimo,Georgia,serif;font-size:3em;color:#f0b44c;line-height:1;min-height:1em}
.socks{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:min(100%,80cqw)}
.socks button{width:clamp(48px,14cqw,64px);height:clamp(48px,14cqw,64px);border-radius:12px;border:3px solid #e8dcc6;background:#fffdf6;cursor:pointer;padding:6px}
.socks button.done{opacity:.35}
.socks svg{width:100%;height:100%}
.cloudz{width:100%;max-width:92cqw;height:auto;display:block;border-radius:10px}
.ask{display:flex;align-items:center;gap:10px;justify-content:center}
.ask svg{width:clamp(36px,12cqw,54px);height:clamp(36px,12cqw,54px)}
`;

const ZSHAPES = {
  star:'<path d="M20 4l4.7 10 10.8 1.2-8 7.3 2.2 10.7L20 27.8l-9.7 5.4 2.2-10.7-8-7.3L15.3 14Z" fill="#f0b44c" stroke="#2b2836" stroke-width="1.5" stroke-linejoin="round"/>',
  circle:'<circle cx="20" cy="20" r="13" fill="#d0602f" stroke="#2b2836" stroke-width="1.5"/>',
  triangle:'<path d="M20 6l14 26H6Z" fill="#3b78b8" stroke="#2b2836" stroke-width="1.5" stroke-linejoin="round"/>',
  square:'<rect x="8" y="8" width="24" height="24" rx="3" fill="#3a8f5c" stroke="#2b2836" stroke-width="1.5"/>'
};
const ZINST = {
  drum:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="14" rx="14" ry="6" fill="#fffdf6" stroke="#2b2836" stroke-width="1.5"/><path d="M6 14v14c0 3 6 6 14 6s14-3 14-6V14" fill="#d0602f" stroke="#2b2836" stroke-width="1.5"/><path d="M10 6l6 8M30 6l-6 8" stroke="#2b2836" stroke-width="2"/></svg>',
  shaker:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="14" rx="10" ry="9" fill="#f0b44c" stroke="#2b2836" stroke-width="1.5"/><rect x="17" y="22" width="6" height="14" rx="2" fill="#a8744a" stroke="#2b2836" stroke-width="1.5"/><g fill="#2b2836"><circle cx="16" cy="12" r="1.2"/><circle cx="23" cy="10" r="1.2"/><circle cx="20" cy="16" r="1.2"/></g></svg>',
  bell:'<svg viewBox="0 0 40 40"><path d="M20 6c-8 0-11 6-11 14v6l-4 5h30l-4-5v-6c0-8-3-14-11-14Z" fill="#f5d76e" stroke="#2b2836" stroke-width="1.5" stroke-linejoin="round"/><circle cx="20" cy="34" r="3" fill="#2b2836"/></svg>',
  xylo:'<svg viewBox="0 0 40 40"><g stroke="#2b2836" stroke-width="1.5"><rect x="6" y="8" width="28" height="5" fill="#d0602f"/><rect x="8" y="15" width="24" height="5" fill="#f0b44c"/><rect x="10" y="22" width="20" height="5" fill="#3a8f5c"/><rect x="12" y="29" width="16" height="5" fill="#3b78b8"/></g></svg>'
};
const ZPIC = {
  bunny:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="26" rx="12" ry="9" fill="#fffdf6" stroke="#2b2836" stroke-width="1.5"/><ellipse cx="14" cy="10" rx="4" ry="9" fill="#fffdf6" stroke="#2b2836" stroke-width="1.5"/><ellipse cx="26" cy="10" rx="4" ry="9" fill="#fffdf6" stroke="#2b2836" stroke-width="1.5"/><circle cx="16" cy="25" r="1.5" fill="#2b2836"/><circle cx="24" cy="25" r="1.5" fill="#2b2836"/></svg>',
  boat:'<svg viewBox="0 0 40 40"><path d="M6 26h28l-5 8H11Z" fill="#d0602f" stroke="#2b2836" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 6v20M20 8l12 14H20" fill="#fffdf6" stroke="#2b2836" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  elephant:'<svg viewBox="0 0 40 40"><ellipse cx="22" cy="24" rx="13" ry="10" fill="#9aa5ab" stroke="#2b2836" stroke-width="1.5"/><circle cx="11" cy="20" r="7" fill="#8a97a3" stroke="#2b2836" stroke-width="1.5"/><path d="M6 24c-2 4 0 8 3 10" fill="none" stroke="#9aa5ab" stroke-width="4" stroke-linecap="round"/><circle cx="10" cy="19" r="1.4" fill="#2b2836"/></svg>'
};

/* ---------- Stage 1: the goodbye party at Little Waves ---------- */
registerStage('zainaSchool', {
  css: ZAINA_CSS,
  boxes:{ kinder:{ceil:['#fbf8ef','#f0ebdd'], back:['#fff4e0','#f6e6c8'], left:['#e2d3b6','#ecdfc6'], right:['#f6ebd4','#eee0c4'], floor:['#7fb5c9','#5e97ab'], boards:'carpet', skirt:['#5e97ab','#7fb5c9','#4d7f92'], lamp:false} },
  views: `
<!-- z1: the party table and Miss Lin -->
<g class="view" id="v-z1" data-box="kinder" data-light="right">
  <g><path d="M40 74Q180 98 320 74" fill="none" stroke="#8a6440" stroke-width="1.4"/><g class="t"><path d="M70 82l7 16 7-16Z" fill="#d0602f"/><path d="M110 90l7 16 7-16Z" fill="#f0b44c"/><path d="M150 94l7 16 7-16Z" fill="#3a8f5c"/><path d="M190 94l7 16 7-16Z" fill="#3b78b8"/><path d="M230 90l7 16 7-16Z" fill="#7a5cc2"/><path d="M270 82l7 16 7-16Z" fill="#c4589a"/></g></g>
  <g><rect x="60" y="120" width="240" height="70" rx="6" fill="#fffdf6" class="o"/><text x="180" y="150" text-anchor="middle" font-size="16" fill="#2f7c83" class="hand">Bye bye, Little Waves!</text><text x="180" y="176" text-anchor="middle" font-size="12" fill="#d0602f" class="hand">See you in September</text></g>
  <g class="hs" data-id="z_teacher" role="button" tabindex="0" aria-label="Miss Lin">
    <ellipse cx="270" cy="446" rx="40" ry="6" fill="#2b2836" opacity=".16" filter="url(#blur3)"/>
    <path d="M238 310c0-24 14-36 32-36s32 12 32 36v130h-64Z" fill="#c4589a" class="o"/>
    <rect x="260" y="262" width="20" height="18" fill="#c9925f"/>
    <ellipse cx="270" cy="244" rx="20" ry="22" fill="#c9925f" class="o"/>
    <path d="M250 240c0-14 8-24 20-24s20 10 20 24c-4-6-10-9-20-9s-16 3-20 9Z" fill="#2b2836"/><path d="M250 240c-4 20-2 36 6 44" fill="none" stroke="#2b2836" stroke-width="7" stroke-linecap="round"/>
    <circle cx="263" cy="246" r="2.4" fill="#2b2836"/><circle cx="277" cy="246" r="2.4" fill="#2b2836"/><path d="M262 256c4 4 12 4 16 0" fill="none" stroke="#2b2836" stroke-width="1.6" stroke-linecap="round"/><circle cx="256" cy="252" r="3" fill="#e0664f" opacity=".45"/><circle cx="284" cy="252" r="3" fill="#e0664f" opacity=".45"/>
    <path d="M238 320c-10 10-12 30-6 50" fill="none" stroke="#c9925f" stroke-width="10" stroke-linecap="round" class="t"/>
    <g id="z_stickerArt"><rect x="296" y="330" width="26" height="26" rx="4" fill="#fffdf6" class="o" transform="rotate(10 309 343)"/><path d="M309 335c-3-5-9-5-9-1 0 3 6 3 9 1 3 2 9 2 9-1 0-4-6-4-9 1z" fill="#f0b44c" transform="rotate(10 309 343)"/></g>
    <rect class="hit" x="232" y="220" width="96" height="220" fill="transparent"/>
  </g>
  <g class="hs" data-id="z_cake" role="button" tabindex="0" aria-label="The party table">
    <ellipse cx="130" cy="446" rx="90" ry="8" fill="#2b2836" opacity=".16" filter="url(#blur6)"/>
    <polygon points="56,340 204,340 220,376 40,376" fill="#fffdf6" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/><rect x="48" y="376" width="8" height="64" fill="#7a8794" class="o"/><rect x="204" y="376" width="8" height="64" fill="#7a8794" class="o"/>
    <g class="t"><rect x="100" y="296" width="60" height="44" rx="4" fill="#f2c89a"/><rect x="100" y="296" width="60" height="12" rx="4" fill="#c4589a"/><path d="M112 296v-12M130 296v-12M148 296v-12" stroke="#3b78b8" stroke-width="3"/><g fill="#f0b44c"><circle cx="112" cy="282" r="3"/><circle cx="130" cy="282" r="3"/><circle cx="148" cy="282" r="3"/></g><circle cx="70" cy="330" r="10" fill="#7fb5c9"/><circle cx="180" cy="332" r="9" fill="#f0b44c"/></g>
    <rect class="hit" x="40" y="276" width="184" height="104" fill="transparent"/>
  </g>
</g>

<!-- z2: the water bottles shelf and the coat pegs -->
<g class="view" id="v-z2" data-box="kinder" data-light="front">
  <g><rect x="60" y="72" width="240" height="110" rx="3" fill="#fffdf6" class="o"/><rect x="68" y="80" width="224" height="94" fill="#bfe0ea"/><circle cx="250" cy="106" r="14" fill="#fbe78a" class="t"/><g fill="#6fa36a"><circle cx="100" cy="168" r="22"/><circle cx="160" cy="174" r="18"/><circle cx="230" cy="170" r="24"/></g></g>
  <g class="hs" data-id="z_bottles" role="button" tabindex="0" aria-label="The water bottles">
    <rect x="52" y="250" width="256" height="10" rx="2" fill="#a8744a" class="o"/>
    <g class="t"><rect x="74" y="206" width="26" height="44" rx="5" fill="#7fb5c9"/><rect x="80" y="196" width="14" height="12" rx="3" fill="#3b78b8"/><rect x="134" y="206" width="26" height="44" rx="5" fill="#f0b44c"/><rect x="140" y="196" width="14" height="12" rx="3" fill="#d0602f"/><rect x="194" y="206" width="26" height="44" rx="5" fill="#5fc08a"/><rect x="200" y="196" width="14" height="12" rx="3" fill="#27794c"/><rect x="254" y="206" width="26" height="44" rx="5" fill="#b09ae8"/><rect x="260" y="196" width="14" height="12" rx="3" fill="#7a5cc2"/></g>
    <g fill="#fffdf6" class="t"><rect x="79" y="222" width="16" height="14" rx="2"/><rect x="139" y="222" width="16" height="14" rx="2"/><rect x="199" y="222" width="16" height="14" rx="2"/><rect x="259" y="222" width="16" height="14" rx="2"/></g>
    <rect class="hit" x="60" y="190" width="240" height="72" fill="transparent"/>
  </g>
  <g><rect x="60" y="292" width="240" height="10" rx="3" fill="#a8744a" class="o"/><g fill="#8a6440"><circle cx="84" cy="310" r="4" class="t"/><circle cx="132" cy="310" r="4" class="t"/><circle cx="180" cy="310" r="4" class="t"/><circle cx="228" cy="310" r="4" class="t"/><circle cx="276" cy="310" r="4" class="t"/></g><path d="M180 312c-8 14-10 30-4 40h14c4-10 2-26-6-40Z" fill="#c4589a" class="o"/></g>
</g>

<!-- z3: the paintings on the drying line -->
<g class="view" id="v-z3" data-box="kinder" data-light="left">
  <path d="M44 100Q180 118 316 100" fill="none" stroke="#8a6440" stroke-width="1.6"/>
  <g class="hs" data-id="z_paintings" role="button" tabindex="0" aria-label="The paintings on the line">
    <g transform="rotate(-3 90 150)"><rect x="60" y="110" width="60" height="80" fill="#fffdf6" class="o"/><circle cx="90" cy="140" r="14" fill="#f0b44c"/><path d="M76 176c6-14 22-14 28 0" fill="#3a8f5c"/><rect x="64" y="176" width="14" height="10" fill="#fffdf6" class="t"/><circle cx="71" cy="181" r="4" fill="#d0602f"/></g>
    <g transform="rotate(2 150 150)"><rect x="120" y="112" width="60" height="80" fill="#fffdf6" class="o"/><path d="M130 180l20-40 20 40Z" fill="#7a5cc2"/><rect x="124" y="176" width="14" height="10" fill="#fffdf6" class="t"/><rect x="127" y="178" width="8" height="6" fill="#3a8f5c"/></g>
    <g transform="rotate(-2 210 150)"><rect x="180" y="110" width="60" height="80" fill="#fffdf6" class="o"/><ellipse cx="210" cy="150" rx="18" ry="12" fill="#9aa5ab"/><circle cx="196" cy="146" r="8" fill="#8a97a3"/><path d="M190 152c-3 4-2 8 1 10" stroke="#9aa5ab" stroke-width="3" fill="none"/><rect x="184" y="176" width="14" height="10" fill="#fffdf6" class="t"/><path d="M191 177l1.6 3.4 3.6.4-2.7 2.4.8 3.6-3.3-1.8-3.3 1.8.8-3.6-2.7-2.4 3.6-.4Z" fill="#f0b44c"/></g>
    <g transform="rotate(3 270 150)"><rect x="240" y="112" width="60" height="80" fill="#fffdf6" class="o"/><path d="M250 170c10-30 30-30 40 0Z" fill="#3b78b8"/><rect x="244" y="176" width="14" height="10" fill="#fffdf6" class="t"/><path d="M248 184l3-6 3 6Z" fill="#3b78b8"/></g>
    <g fill="#c9a24a"><rect x="88" y="102" width="4" height="12" rx="1.5" class="t"/><rect x="148" y="106" width="4" height="12" rx="1.5" class="t"/><rect x="208" y="104" width="4" height="12" rx="1.5" class="t"/><rect x="268" y="106" width="4" height="12" rx="1.5" class="t"/></g>
    <rect class="hit" x="56" y="100" width="248" height="100" fill="transparent"/>
  </g>
  <g><rect x="60" y="280" width="240" height="80" rx="6" fill="#9dc5b8" class="o"/><g class="t"><rect x="72" y="292" width="40" height="28" rx="4" fill="#d0602f"/><rect x="120" y="292" width="40" height="28" rx="4" fill="#f0b44c"/><rect x="168" y="292" width="40" height="28" rx="4" fill="#3b78b8"/><rect x="216" y="292" width="40" height="28" rx="4" fill="#7a5cc2"/><rect x="72" y="328" width="184" height="24" rx="4" fill="#fffdf6"/></g></g>
</g>

<!-- z4: the music corner -->
<g class="view" id="v-z4" data-box="kinder" data-light="back">
  <g class="hs" data-id="z_music" role="button" tabindex="0" aria-label="The music corner">
    <rect x="70" y="90" width="220" height="60" rx="6" fill="#fffdf6" class="o"/>
    <g id="z_stripWall"></g>
    <rect x="50" y="240" width="260" height="12" rx="3" fill="#a8744a" class="o"/>
    <g class="t"><ellipse cx="90" cy="222" rx="24" ry="8" fill="#fffdf6"/><path d="M66 222v20c0 5 10 8 24 8s24-3 24-8v-20" fill="#d0602f"/><ellipse cx="150" cy="212" rx="12" ry="11" fill="#f0b44c"/><rect x="146" y="222" width="8" height="20" fill="#a8744a"/><path d="M210 200c-10 0-14 8-14 18v6l-5 6h38l-5-6v-6c0-10-4-18-14-18Z" fill="#f5d76e"/><g><rect x="246" y="208" width="44" height="6" fill="#d0602f"/><rect x="249" y="216" width="38" height="6" fill="#f0b44c"/><rect x="252" y="224" width="32" height="6" fill="#3a8f5c"/><rect x="255" y="232" width="26" height="6" fill="#3b78b8"/></g></g>
    <rect class="hit" x="48" y="84" width="264" height="172" fill="transparent"/>
  </g>
  <g><ellipse cx="180" cy="424" rx="120" ry="30" fill="#f0b44c" class="o"/><ellipse cx="180" cy="424" rx="90" ry="22" fill="#e0664f"/><ellipse cx="180" cy="424" rx="60" ry="14" fill="#7fb5c9"/><ellipse cx="180" cy="424" rx="28" ry="7" fill="#fffdf6"/></g>
</g>
`,
  closeups: `
<div class="overlay closeup" id="pickUI" hidden>
  <p class="otitle" id="pickTitle"></p>
  <div class="ask" id="pickAsk"></div>
  <div class="big4" id="pick4"></div>
  <p class="ofb" id="pickFb" aria-live="polite"></p>
  <button class="ob" data-close>Step back</button>
</div>
<div class="overlay closeup" id="songUI" hidden>
  <p class="otitle">Tap the instruments in the order the pictures show.</p>
  <div class="strip" id="songStrip"></div>
  <div class="big4" id="songInst"></div>
  <p class="ofb" id="songFb" aria-live="polite"></p>
  <button class="ob" data-close>Step back</button>
</div>
`,
  stage:{
    rooms:{party:{name:'Little Waves', into:'the party room', views:['z1','z2','z3','z4']}},
    doors:{},
    start:['party','z1'],
    intro:'<b>Goodbye party!</b> Zaina needs her bottle, her painting, and to play the goodbye song. Then Miss Lin has a surprise.',
    hinter:'The moth points',
    hintStyle:'point',
    items:{bottle:{name:'Zaina’s bottle', icon:'<svg viewBox="0 0 40 40"><rect x="12" y="12" width="16" height="24" rx="4" fill="#f0b44c" stroke="#2b2836" stroke-width="1.5"/><rect x="15" y="5" width="10" height="8" rx="2" fill="#d0602f" stroke="#2b2836" stroke-width="1.5"/><path d="M20 20l1.6 3.4 3.6.4-2.7 2.4.8 3.6-3.3-1.8-3.3 1.8.8-3.6-2.7-2.4 3.6-.4Z" fill="#fffdf6"/></svg>'},
           painting:{name:'Zaina’s painting', icon:'<svg viewBox="0 0 40 40"><rect x="6" y="6" width="28" height="28" fill="#fffdf6" stroke="#2b2836" stroke-width="1.5"/><ellipse cx="20" cy="22" rx="9" ry="6" fill="#9aa5ab"/><circle cx="13" cy="20" r="4" fill="#8a97a3"/></svg>'}},
    uses:{},
    spark:S => !S.bottle ? ['z_bottles'] : (!S.painting ? ['z_paintings'] : (!S.song ? ['z_music'] : ['z_teacher'])),
    fresh:() => ({bottle:false, painting:false, song:false, seq:[]}),
    draw(S){ tog('z_stickerArt', !S.done); },
    act(id){
      switch(id){
        case 'z_bottles': if (S.bottle){ say('Just the other bottles now.'); break; } openPick('bottles'); return;
        case 'z_paintings': if (S.painting){ say('The other paintings will dry by tomorrow.'); break; } openPick('paintings'); return;
        case 'z_music': if (S.song){ say('The goodbye song is done. Everyone clapped!'); break; } openSong(); return;
        case 'z_teacher':
          if (S.bottle && S.painting && S.song){ say('Miss Lin gives Zaina a shiny moth sticker. “For a super summer!”'); render(); finish(); return; }
          say('Miss Lin: “Bottle, painting, and the song. Then I have something shiny for you!”'); break;
        case 'z_cake': say('A big cake with three candles. One for each summer at Little Waves.'); break;
      }
      render();
    },
    hints:[
      {goal:() => S.bottle, tips:['Find your bottle. It has your star sticker on it.','','']},
      {goal:() => S.painting, tips:['Find your painting. Look for your star.','','']},
      {goal:() => S.song, tips:['Play the song. Look at the pictures, and tap in that order.','','']},
      {goal:() => false, tips:['Go and see Miss Lin!','','']}
    ],
    ending(){
      saveStage('zainaSchool');
      return ['<p class="fade big" style="animation-delay:.2s">Bye bye, Little Waves!</p>',
        '<p class="fade" style="animation-delay:1.4s">Zaina sticks the moth sticker on her hand. It is very shiny. She shows everyone. Twice.</p>',
        '<p class="fade" style="animation-delay:2.8s">On the way home, the sticker glows a tiny bit in the dark of the taxi. Zaina is the only one who notices.</p>',
        '<p class="fade next" style="animation-delay:4.2s">Next for Zaina: packing day.</p>'];
    }
  },
  setup(){
    const bottleSvg = (c, sh) => `<svg viewBox="0 0 40 40"><rect x="12" y="12" width="16" height="24" rx="4" fill="${c}" stroke="#2b2836" stroke-width="1.5"/><rect x="15" y="5" width="10" height="8" rx="2" fill="#5b6f7a" stroke="#2b2836" stroke-width="1.5"/><g transform="translate(12 16) scale(.4)">${ZSHAPES[sh]}</g></svg>`;
    const paintSvg = (inner, sh) => `<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" fill="#fffdf6" stroke="#2b2836" stroke-width="1.5"/>${inner}<g transform="translate(22 22) scale(.32)">${ZSHAPES[sh]}</g></svg>`;
    const SETS = {
      bottles:{title:'Which bottle is Zaina’s?', ask:'star', items:[['circle', bottleSvg('#7fb5c9','circle')],['star', bottleSvg('#f0b44c','star')],['square', bottleSvg('#5fc08a','square')],['triangle', bottleSvg('#b09ae8','triangle')]], win:'star', flag:'bottle', item:'bottle', line:'Zaina’s bottle, with her star on it. She has a big drink.'},
      paintings:{title:'Which painting is Zaina’s?', ask:'star', items:[['circle', paintSvg('<circle cx="18" cy="16" r="7" fill="#f0b44c"/>','circle')],['square', paintSvg('<path d="M10 28l8-16 8 16Z" fill="#7a5cc2"/>','square')],['star', paintSvg('<ellipse cx="18" cy="18" rx="9" ry="6" fill="#9aa5ab"/><circle cx="11" cy="16" r="4" fill="#8a97a3"/>','star')],['triangle', paintSvg('<path d="M10 24c4-14 12-14 16 0Z" fill="#3b78b8"/>','triangle')]], win:'star', flag:'painting', item:'painting', line:'Zaina’s painting: Peanut, with a star in the corner. Miss Lin says it is a masterpiece.'}
    };
    window.openPick = key => {
      const set = SETS[key];
      $('pickTitle').textContent = set.title;
      $('pickAsk').innerHTML = `<span>Look for</span><svg viewBox="0 0 40 40">${ZSHAPES[set.ask]}</svg>`;
      $('pick4').innerHTML = set.items.map(([sh, svg]) => `<button data-sh="${sh}" aria-label="${sh} sticker">${svg}</button>`).join('');
      $('pick4').querySelectorAll('button').forEach(b => b.onclick = () => {
        if (b.dataset.sh === set.win){ S[set.flag] = true; add(set.item); b.classList.add('done'); $('pickFb').textContent = 'Yes! That one!'; setTimeout(() => { $('pickUI').hidden = true; say(set.line); render(); }, 700); }
        else $('pickFb').textContent = 'Not that one. Look for the star.';
      });
      $('pickFb').textContent = ''; $('pickUI').hidden = false;
    };
    const ORDER = ['drum','shaker','bell','xylo'];
    $('z_stripWall').innerHTML = ORDER.map((k, i) => `<g transform="translate(${86 + i*52} 100)"><rect width="40" height="40" rx="6" fill="#fff4e0" class="t"/><circle cx="4" cy="4" r="7" fill="#f0b44c" class="t"/><text x="4" y="7" text-anchor="middle" font-size="8" font-weight="700" fill="#2b2836" class="lbl">${i+1}</text><g transform="translate(4 4) scale(.8)"><svg viewBox="0 0 40 40" width="40" height="40">${ZINST[k].replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg></g></g>`).join('');
    window.openSong = () => {
      $('songStrip').innerHTML = ORDER.map((k, i) => `<span class="st${S.seq.length > i ? ' hit' : ''}"><i>${i+1}</i>${ZINST[k]}</span>`).join('');
      $('songInst').innerHTML = [['bell'],['drum'],['xylo'],['shaker']].map(([k]) => `<button data-k="${k}" aria-label="${k}">${ZINST[k]}</button>`).join('');
      $('songInst').querySelectorAll('button').forEach(b => b.onclick = () => {
        const k = b.dataset.k, want = ORDER[S.seq.length];
        if (k === want){ S.seq.push(k); if (S.seq.length === ORDER.length){ S.song = true; $('songFb').textContent = 'Hooray! Everyone claps!'; setTimeout(() => { $('songUI').hidden = true; say('Drum, shaker, bell, xylophone. The whole class sings along. Zaina takes a bow.'); render(); }, 900); } else $('songFb').textContent = `${S.seq.length} of 4. Keep going!`; }
        else { S.seq = []; $('songFb').textContent = 'Oops! Start again from number 1.'; }
        openSong();
      });
      $('songUI').hidden = false;
    };
  }
});

/* ---------- Stage 2: packing day (Zaina's bedroom) ---------- */
registerStage('zainaPacking', {
  boxes:{ zbedroom:{ceil:['#fdf6f2','#f5e9e2'], back:['#fbe9df','#f3d8ca'], left:['#e0c4b4','#ead3c6'], right:['#f7e2d6','#efd6c6'], floor:['#d2a574','#b98a5a'], boards:'wood', skirt:['#a58a62','#b8996c','#96794f'], lamp:false} },
  views: `
<!-- zb1: the bed, the little suitcase and Mum's picture list -->
<g class="view" id="v-zb1" data-box="zbedroom" data-light="left">
  <g class="hs" data-id="z_list" role="button" tabindex="0" aria-label="Mum's picture list">
    <rect x="130" y="84" width="100" height="90" rx="4" fill="#fffdf6" class="o"/><circle cx="180" cy="86" r="4" fill="#d0602f" class="t"/>
    <g id="z_listArt"></g>
    <rect class="hit" x="124" y="76" width="112" height="104" fill="transparent"/>
  </g>
  <g class="hs" data-id="z_case" role="button" tabindex="0" aria-label="Zaina's little suitcase">
    <rect x="52" y="190" width="256" height="60" rx="10" fill="#a8744a" class="o"/><rect x="62" y="200" width="236" height="40" rx="6" fill="#8a6440"/>
    <polygon points="70,246 290,246 320,360 40,360" fill="#f7c48a" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/>
    <g fill="#fffdf6" opacity=".7"><circle cx="90" cy="320" r="4"/><circle cx="130" cy="340" r="3"/><circle cx="240" cy="330" r="4"/><circle cx="280" cy="310" r="3"/></g>
    <rect x="78" y="232" width="74" height="30" rx="12" fill="#fffdf6" class="o"/>
    <rect x="40" y="356" width="280" height="12" rx="3" fill="#8a6440" class="o"/>
    <g id="z_caseOpen"><path d="M126 262 134 228h92l8 34Z" fill="#c4589a" class="o"/><path d="M132 258 138 232h84l6 26Z" fill="#f6d8e6"/><rect x="124" y="262" width="112" height="56" rx="8" fill="#d97aa8" class="o"/><rect x="132" y="268" width="96" height="44" rx="5" fill="#f6d8e6"/><g id="z_packedArt"></g></g>
    <g id="z_caseShut" class="off"><rect x="124" y="266" width="112" height="52" rx="8" fill="#d97aa8" class="o"/><rect x="124" y="286" width="112" height="4" fill="#c4589a"/><rect x="168" y="258" width="24" height="10" rx="4" fill="none" stroke="#8a3556" stroke-width="4"/></g>
    <rect class="hit" x="120" y="222" width="120" height="102" fill="transparent"/>
  </g>
</g>

<!-- zb2: the toy shelf and the sun hat -->
<g class="view" id="v-zb2" data-box="zbedroom" data-light="back">
  <rect x="56" y="150" width="248" height="10" rx="2" fill="#a8744a" class="o"/>
  <g class="t"><ellipse cx="90" cy="134" rx="16" ry="12" fill="#f0b44c"/><circle cx="82" cy="128" r="5" fill="#fffdf6"/><rect x="130" y="120" width="30" height="30" rx="4" fill="#3b78b8"/><rect x="136" y="126" width="18" height="18" fill="#fffdf6"/><circle cx="200" cy="136" r="14" fill="#d0602f"/><rect x="236" y="114" width="14" height="36" fill="#3a8f5c"/><rect x="254" y="122" width="14" height="28" fill="#7a5cc2"/></g>
  <g class="hs" data-id="z_hat" role="button" tabindex="0" aria-label="Zaina's sun hat">
    <circle cx="270" cy="230" r="5" fill="#8a6440" class="t"/>
    <g id="z_hatArt"><ellipse cx="270" cy="272" rx="40" ry="10" fill="#f5d76e" class="o"/><path d="M246 270c0-24 10-36 24-36s24 12 24 36Z" fill="#f0b44c" class="o"/><path d="M248 262h44" stroke="#d0602f" stroke-width="5"/></g>
    <rect class="hit" x="224" y="226" width="92" height="60" fill="transparent"/>
  </g>
  <g><rect x="46" y="300" width="120" height="60" rx="6" fill="#7fb5c9" class="o"/><rect x="46" y="292" width="120" height="14" rx="4" fill="#5e97ab" class="o"/><g class="t"><circle cx="70" cy="290" r="8" fill="#d0602f"/><rect x="88" y="278" width="14" height="14" fill="#f0b44c"/><circle cx="124" cy="288" r="7" fill="#3a8f5c"/></g></g>
</g>

<!-- zb3: the drawers: swimsuit on top, socks inside -->
<g class="view" id="v-zb3" data-box="zbedroom" data-light="right">
  <g class="hs" data-id="z_swim" role="button" tabindex="0" aria-label="Zaina's swimsuit">
    <rect x="60" y="180" width="240" height="180" rx="6" fill="#c4589a" class="o"/>
    <g id="z_swimArt"><path d="M150 148c0-10 8-16 30-16s30 6 30 16l6 30h-72Z" fill="#7fb5c9" class="o"/><g fill="#fffdf6"><circle cx="166" cy="152" r="3"/><circle cx="184" cy="160" r="3"/><circle cx="200" cy="148" r="3"/></g></g>
    <rect class="hit" x="140" y="126" width="80" height="56" fill="transparent"/>
  </g>
  <g class="hs" data-id="z_socks" role="button" tabindex="0" aria-label="The sock drawer">
    <rect x="72" y="196" width="216" height="44" rx="4" fill="#d97aa8" class="o"/><rect x="164" y="214" width="32" height="8" rx="4" fill="#fffdf6" class="t"/>
    <rect x="72" y="252" width="216" height="44" rx="4" fill="#d97aa8" class="o"/><rect x="164" y="270" width="32" height="8" rx="4" fill="#fffdf6" class="t"/>
    <rect x="72" y="308" width="216" height="44" rx="4" fill="#d97aa8" class="o"/><rect x="164" y="326" width="32" height="8" rx="4" fill="#fffdf6" class="t"/>
    <g class="t"><path d="M84 214c4-8 12-8 16 0v18h-16Z" fill="#f0b44c"/><path d="M262 214c4-8 12-8 16 0v18h-16Z" fill="#3a8f5c"/></g>
    <rect class="hit" x="68" y="192" width="224" height="52" fill="transparent"/>
  </g>
</g>

<!-- zb4: the window seat and the toy box, where Peanut is hiding -->
<g class="view" id="v-zb4" data-box="zbedroom" data-light="front">
  <clipPath id="glassZb4"><rect x="80" y="78" width="200" height="98"/></clipPath>
  <g><rect x="72" y="70" width="216" height="114" rx="3" fill="#fffdf6" class="o"/><rect x="80" y="78" width="200" height="98" fill="#a9bcc6"/><g clip-path="url(#glassZb4)"><g fill="#8497a2"><rect x="90" y="120" width="30" height="56"/><rect x="130" y="104" width="24" height="72"/><rect x="164" y="128" width="34" height="48"/><rect x="208" y="110" width="26" height="66"/></g><use href="#raindrops" class="rain" x="76" y="72"/><use href="#raindrops" class="rain" x="166" y="66"/></g><line x1="180" y1="78" x2="180" y2="176" stroke="#fffdf6" stroke-width="5"/></g>
  <g class="hs" data-id="z_curtain" role="button" tabindex="0" aria-label="The curtain">
    <path d="M296 62c-16 4-22 30-22 60v120c0 14 8 20 22 20Z" fill="#f0b44c" class="o"/><path d="M280 100v140" stroke="#e0a84a" stroke-width="3"/>
    <g id="z_peanutFeet"><ellipse cx="284" cy="268" rx="8" ry="4" fill="#9aa5ab" class="t"/><ellipse cx="298" cy="268" rx="8" ry="4" fill="#9aa5ab" class="t"/></g>
    <rect class="hit" x="266" y="60" width="54" height="216" fill="transparent"/>
  </g>
  <g class="hs" data-id="z_cushion" role="button" tabindex="0" aria-label="The cushion">
    <rect x="52" y="226" width="220" height="14" rx="3" fill="#c9a26b" class="o"/><rect x="60" y="240" width="204" height="60" fill="#a8744a" class="o"/>
    <rect x="90" y="196" width="60" height="36" rx="10" fill="#c4589a" class="o"/>
    <rect class="hit" x="86" y="190" width="70" height="46" fill="transparent"/>
  </g>
  <g class="hs" data-id="z_toybox" role="button" tabindex="0" aria-label="The toy box">
    <ellipse cx="110" cy="446" rx="60" ry="7" fill="#2b2836" opacity=".16" filter="url(#blur6)"/>
    <rect x="60" y="360" width="100" height="70" rx="6" fill="#7fb5c9" class="o"/><rect x="56" y="352" width="108" height="14" rx="4" fill="#5e97ab" class="o"/>
    <g class="t"><circle cx="82" cy="350" r="8" fill="#d0602f"/><rect x="100" y="338" width="14" height="14" fill="#f0b44c"/><circle cx="136" cy="348" r="7" fill="#3a8f5c"/></g>
    <rect class="hit" x="54" y="330" width="112" height="104" fill="transparent"/>
  </g>
</g>
`,
  closeups: `
<div class="overlay closeup" id="listUI" hidden>
  <p class="otitle">Mum's list. Find these, then put them in the case.</p>
  <div class="strip" id="listStrip"></div>
  <button class="ob" data-close>Step back</button>
</div>
<div class="overlay closeup" id="sockUI" hidden>
  <p class="otitle">Count five pairs of socks into the case.</p>
  <div class="count" id="sockCount">0</div>
  <div class="socks" id="sockGrid"></div>
  <p class="ofb" id="sockFb" aria-live="polite"></p>
  <button class="ob" data-close>Step back</button>
</div>
`,
  stage:{
    rooms:{zbedroom:{name:'Zaina’s bedroom', into:'your bedroom', views:['zb1','zb2','zb3','zb4']}},
    doors:{},
    start:['zbedroom','zb1'],
    intro:'<b>Packing day.</b> Mum has drawn a list: a sun hat, a swimsuit, and Peanut. And five pairs of socks!',
    hinter:'The moth sticker glows',
    hintStyle:'point',
    items:{hat:{name:'sun hat', icon:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="26" rx="16" ry="5" fill="#f5d76e" stroke="#2b2836" stroke-width="1.5"/><path d="M10 25c0-10 4-16 10-16s10 6 10 16Z" fill="#f0b44c" stroke="#2b2836" stroke-width="1.5"/></svg>'},
           swim:{name:'swimsuit', icon:'<svg viewBox="0 0 40 40"><path d="M12 8c0-3 4-4 8-4s8 1 8 4l3 24H9Z" fill="#7fb5c9" stroke="#2b2836" stroke-width="1.5"/><g fill="#fffdf6"><circle cx="16" cy="18" r="2"/><circle cx="24" cy="24" r="2"/></g></svg>'},
           peanut:{name:'Peanut', icon:'<svg viewBox="0 0 40 40"><ellipse cx="22" cy="24" rx="13" ry="10" fill="#9aa5ab" stroke="#2b2836" stroke-width="1.5"/><circle cx="11" cy="20" r="7" fill="#8a97a3" stroke="#2b2836" stroke-width="1.5"/><path d="M6 24c-2 4 0 8 3 10" fill="none" stroke="#9aa5ab" stroke-width="4" stroke-linecap="round"/><circle cx="10" cy="19" r="1.4" fill="#2b2836"/></svg>'}},
    uses:{hat:'z_case', swim:'z_case', peanut:'z_case'},
    spark:S => !S.gotHat ? ['z_hat'] : (!S.gotSwim ? ['z_swim'] : (!S.gotPeanut ? ['z_curtain'] : (S.socks < 5 ? ['z_socks'] : ['z_case']))),
    fresh:() => ({gotHat:false, gotSwim:false, gotPeanut:false, socks:0, packed:[], warm:0}),
    draw(S){
      tog('z_hatArt', !S.gotHat); tog('z_swimArt', !S.gotSwim); tog('z_peanutFeet', !S.gotPeanut);
      tog('z_caseOpen', !S.done); tog('z_caseShut', S.done);
      $('z_packedArt').innerHTML = S.packed.map((it, i) => `<svg x="${136 + i*30}" y="276" width="26" height="26" viewBox="0 0 40 40">${ST.items[it].icon.replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>`).join('');
    },
    act(id, item){
      switch(id){
        case 'z_list': openList(); return;
        case 'z_hat': if (!S.gotHat){ S.gotHat = true; add('hat'); say('Zaina’s sun hat, with the red ribbon.'); } else say('The hat hook. Empty now.'); break;
        case 'z_swim': if (!S.gotSwim){ S.gotSwim = true; add('swim'); say('Zaina’s swimsuit, with the white spots. For paddling!'); } else say('The top of the drawers.'); break;
        case 'z_socks': if (S.socks < 5) { openSocks(); return; } say('Five pairs of socks, all packed.'); break;
        case 'z_toybox': say(S.gotPeanut ? 'The toy box. No Peanut needed, he is packed.' : 'Not in the toy box. The moth sticker feels a little warm.'); break;
        case 'z_cushion': say(S.gotPeanut ? 'The cushion. Comfy.' : 'Not under the cushion. The moth sticker feels warmer!'); break;
        case 'z_curtain':
          if (!S.gotPeanut){ S.gotPeanut = true; add('peanut'); say('Two little grey feet under the curtain. Peanut! The sticker is hot as toast.'); }
          else say('The curtain. Nobody behind it now.');
          break;
        case 'z_case':
          if (item && ST.uses[item] === 'z_case'){ S.packed.push(item); use(item); const left = 3 - S.packed.length; if (left === 0 && S.socks >= 5){ say('Hat, swimsuit, Peanut and socks. Zaina closes the case. Click!'); render(); finish(); return; } say(left ? `In goes the ${ST.items[item].name}. ${left} more thing${left > 1 ? 's' : ''} from the list.` : 'Everything from the list is in. Now the socks!'); }
          else say(S.packed.length === 3 && S.socks < 5 ? 'The case is nearly full. Socks next!' : 'Zaina’s little case. Mum’s list is above the bed.');
          break;
      }
      render();
    },
    hints:[
      {goal:() => S.gotHat, tips:['The sun hat is on its hook.','','']},
      {goal:() => S.gotSwim, tips:['The swimsuit is on the drawers.','','']},
      {goal:() => S.gotPeanut, tips:['Peanut is hiding. Follow the warm sticker.','','']},
      {goal:() => S.socks >= 5, tips:['Five pairs of socks. They live in the top drawer.','','']},
      {goal:() => false, tips:['Everything goes in the little case on the bed.','','']}
    ],
    ending(){
      saveStage('zainaPacking');
      return ['<p class="fade big" style="animation-delay:.2s">All packed!</p>',
        '<p class="fade" style="animation-delay:1.4s">Hat, swimsuit, five pairs of socks, and Peanut on top, where he can breathe.</p>',
        '<p class="fade" style="animation-delay:2.8s">That night, the moth sticker on Zaina’s hand glows softly, like a night light. She sleeps with her hand on Peanut.</p>',
        '<p class="fade next" style="animation-delay:4.2s">Next for Zaina: the 14-hour flight.</p>'];
    }
  },
  setup(){
    const LIST = [['hat', ST => ST.items.hat.icon],['swim', ST => ST.items.swim.icon],['peanut', ST => ST.items.peanut.icon]];
    $('z_listArt').innerHTML = LIST.map(([k, f], i) => `<g transform="translate(${140} ${94 + i*26})"><rect width="20" height="20" rx="3" fill="#fffdf6" stroke="#9aa5ab"/><svg x="0" y="0" width="20" height="20" viewBox="0 0 40 40">${f(STAGES.zainaPacking).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg><rect x="28" y="6" width="48" height="8" rx="4" fill="#e8dcc6"/></g>`).join('') + '<g transform="translate(140 172)"></g>';
    window.openList = () => {
      $('listStrip').innerHTML = LIST.map(([k, f]) => `<span class="st${S.packed.includes(k) ? ' hit' : ''}">${f(ST)}</span>`).join('') + `<span class="st${S.socks >= 5 ? ' hit' : ''}"><i>5</i><svg viewBox="0 0 40 40"><path d="M12 6h12v14l6 8c2 3 0 6-3 6H15c-3 0-5-2-3-6l0-8Z" fill="#f0b44c" stroke="#2b2836" stroke-width="1.5" stroke-linejoin="round"/></svg></span>`;
      $('listUI').hidden = false;
      say('Mum’s list: a sun hat, a swimsuit, Peanut, and five pairs of socks.');
    };
    const sockSvg = c => `<svg viewBox="0 0 40 40"><path d="M12 6h12v14l6 8c2 3 0 6-3 6H15c-3 0-5-2-3-6l0-8Z" fill="${c}" stroke="#2b2836" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10h12" stroke="#fffdf6" stroke-width="2"/></svg>`;
    const SOCKS = ['#f0b44c','#d0602f','#3a8f5c','#3b78b8','#c4589a'];
    window.openSocks = () => {
      $('sockCount').textContent = S.socks;
      $('sockGrid').innerHTML = SOCKS.map((c, i) => `<button data-i="${i}" class="${i < S.socks ? 'done' : ''}" aria-label="Pair of socks ${i+1}">${sockSvg(c)}</button>`).join('');
      $('sockGrid').querySelectorAll('button').forEach(b => b.onclick = () => {
        const i = +b.dataset.i; if (i !== S.socks) { $('sockFb').textContent = i < S.socks ? 'Already in the case!' : 'Count in order: next is ' + (S.socks + 1) + '.'; return; }
        S.socks++; $('sockFb').textContent = ['One!','Two!','Three!','Four!','Five! All done!'][i];
        if (S.socks === 5) setTimeout(() => { $('sockUI').hidden = true; say('Five pairs of socks, counted and packed. Zaina counts them again to be sure.'); render(); }, 900);
        openSocks();
      });
      $('sockUI').hidden = false;
    };
  }
});

/* ---------- Stage 3: the flight (the same cabin, Zaina's window seat) ---------- */
registerStage('zainaFlight', {
  closeups: `
<div class="overlay closeup" id="cloudUI" hidden>
  <p class="otitle">Cloud spotting! Find the cloud that looks like this.</p>
  <div class="ask" id="cloudAsk"></div>
  <svg class="cloudz" viewBox="0 0 220 140" aria-label="Clouds outside the window"><rect width="220" height="140" rx="10" fill="#8fc3dc"/><g id="clouds"></g></svg>
  <p class="ofb" id="cloudFb" aria-live="polite"></p>
  <button class="ob" data-close>Step back</button>
</div>
`,
  stage:{
    rooms:{cabin:{name:'The plane', into:'the cabin', views:['f1','f2','f3','f4']}},
    doors:{},
    start:['cabin','f1'],
    intro:'<b>Up in the sky!</b> Zaina has the window seat, Peanut, and a very long time to look at clouds.',
    hinter:'The moth sticker glows',
    hintStyle:'point',
    items:{peanut:{name:'Peanut', icon:'<svg viewBox="0 0 40 40"><ellipse cx="22" cy="24" rx="13" ry="10" fill="#9aa5ab" stroke="#2b2836" stroke-width="1.5"/><circle cx="11" cy="20" r="7" fill="#8a97a3" stroke="#2b2836" stroke-width="1.5"/><path d="M6 24c-2 4 0 8 3 10" fill="none" stroke="#9aa5ab" stroke-width="4" stroke-linecap="round"/><circle cx="10" cy="19" r="1.4" fill="#2b2836"/></svg>'}},
    uses:{},
    spark:S => S.clouds < 3 ? ['fl_window'] : (!S.dropped ? ['z_peanutLap'] : (!S.found ? ['z_peanutUnder'] : ['z_lights'])),
    fresh:() => ({clouds:0, dropped:false, found:false, lights:[1,1,1,1,1]}),
    draw(S){ tog('z_peanutLapArt', !S.dropped); tog('z_peanutUnderArt', S.dropped && !S.found); S.lights.forEach((on, i) => { const l = $('z_light' + i); if (l) l.setAttribute('fill', on ? '#fff6c8' : '#5b6f7a'); }); tog('z_dim', S.lights.every(l => !l)); },
    act(id){
      switch(id){
        case 'fl_window': if (S.clouds < 3){ openClouds(); return; } say('All the clouds have been spotted. Now they are just clouds again.'); break;
        case 'z_peanutLap': if (S.clouds < 3){ say('Peanut is on Zaina’s lap, looking at the clouds too.'); break; } if (!S.dropped){ S.dropped = true; say('Bump! Peanut slides off Zaina’s lap and under the seats. Oh no!'); } break;
        case 'z_peanutUnder': if (S.dropped && !S.found){ S.found = true; add('peanut'); say('There he is, under the seat at the back! Zaina hugs Peanut very hard.'); } break;
        case 'z_lights':
          if (!S.found){ say('The little lights are on. Zaina is not sleepy yet.'); break; }
          { const i = S.lights.findIndex(l => l); if (i >= 0){ S.lights[i] = 0; const left = S.lights.filter(l => l).length; say(left ? `Click. ${left} light${left > 1 ? 's' : ''} still on.` : 'Click. All dark and cosy. Zaina yawns a very big yawn.'); if (!left){ render(); finish(); return; } } }
          break;
        case 'fl_trolley': say('Priya brings Zaina a cup of juice with a lid. Very sensible.'); break;
        case 'fl_toilet': say('The toilet is free. It is very small and very loud.'); break;
        case 'z_kidsZ': say('Mary is reading. Elliot is watching a film about a dog who drives a bus.'); break;
      }
      render();
    },
    hints:[
      {goal:() => S.clouds >= 3, tips:['Look out of the window and find the cloud shapes.','','']},
      {goal:() => S.dropped, tips:['Peanut is on your lap. Hold on tight!','','']},
      {goal:() => S.found, tips:['Peanut rolled to the back. Look under the seats.','','']},
      {goal:() => false, tips:['Sleepy time. Switch off the little lights, one by one.','','']}
    ],
    ending(){
      saveStage('zainaFlight');
      return ['<p class="fade big" style="animation-delay:.2s">Sleepy time.</p>',
        '<p class="fade" style="animation-delay:1.4s">Zaina falls asleep with Peanut under her chin. When she wakes up, the plane is coming down over green fields.</p>',
        '<p class="fade" style="animation-delay:2.8s">In the trees below, a tiny golden light winks at her. She winks back.</p>',
        '<p class="fade next" style="animation-delay:4.2s">End of Part 1: Leaving Singapore. Enfield is next.</p>'];
    }
  },
  setup(){
    const ns = 'http://www.w3.org/2000/svg';
    const addTo = (view, markup) => { const g = document.createElementNS(ns, 'g'); g.innerHTML = markup; view.appendChild(g); };
    addTo($('v-f1'), `<g class="hs" data-id="z_peanutLap" data-stage="zainaFlight" role="button" tabindex="0" aria-label="Peanut on Zaina's lap"><g id="z_peanutLapArt"><ellipse cx="200" cy="392" rx="30" ry="22" fill="#9aa5ab" class="o"/><circle cx="172" cy="382" r="14" fill="#8a97a3" class="o"/><path d="M226 398c14 4 18 18 8 30" fill="none" stroke="#9aa5ab" stroke-width="9" stroke-linecap="round" class="t"/><circle cx="204" cy="386" r="2.6" fill="#2b2836"/><circle cx="172" cy="382" r="4" fill="#d9a3a3"/></g><rect class="hit" x="150" y="362" width="100" height="56" fill="transparent"/></g>`);
    addTo($('v-f3'), `<g class="hs" data-id="z_lights" data-stage="zainaFlight" role="button" tabindex="0" aria-label="The little reading lights"><g class="t"><circle id="z_light0" cx="70" cy="80" r="7" fill="#fff6c8"/><circle id="z_light1" cx="120" cy="80" r="7" fill="#fff6c8"/><circle id="z_light2" cx="180" cy="80" r="7" fill="#fff6c8"/><circle id="z_light3" cx="240" cy="80" r="7" fill="#fff6c8"/><circle id="z_light4" cx="290" cy="80" r="7" fill="#fff6c8"/></g><rect class="hit" x="56" y="64" width="248" height="34" fill="transparent"/></g>`);
    addTo($('v-f3'), `<g class="hs" data-id="z_kidsZ" data-stage="zainaFlight" role="button" tabindex="0" aria-label="Mary and Elliot"><g fill="#3f5a6b" class="o"><rect x="60" y="150" width="110" height="210" rx="16"/><rect x="190" y="150" width="110" height="210" rx="16"/></g><g fill="#4a6b7e"><rect x="70" y="160" width="90" height="190" rx="12"/><rect x="200" y="160" width="90" height="190" rx="12"/></g>
      <path d="M86 300c0-18 12-28 29-28s29 10 29 28v60H86Z" fill="#6d4fb8" class="o"/><rect x="106" y="252" width="18" height="24" fill="#c9925f"/><path d="M90 250c-4-30 8-44 24-44s28 14 24 44c-2 10-6 16-6 30H96c0-14-4-20-6-30Z" fill="#3b2a20" class="o"/><ellipse cx="115" cy="238" rx="19" ry="21" fill="#c9925f" class="o"/><path d="M96 234c2-12 10-20 19-20s17 8 19 20c-4-6-10-9-19-9s-15 3-19 9Z" fill="#3b2a20"/><circle cx="108" cy="240" r="2.4" fill="#2b2836"/><circle cx="122" cy="240" r="2.4" fill="#2b2836"/><path d="M110 250c3 2 7 2 10 0" fill="none" stroke="#2b2836" stroke-width="1.4" stroke-linecap="round"/><g transform="rotate(-8 118 296)"><rect x="96" y="284" width="44" height="30" rx="2" fill="#fffdf6" class="o"/><rect x="96" y="284" width="44" height="6" fill="#d0602f"/></g>
      <path d="M216 300c0-18 12-28 29-28s29 10 29 28v60h-58Z" fill="#c0541f" class="o"/><rect x="236" y="252" width="18" height="24" fill="#c9925f"/><ellipse cx="245" cy="238" rx="19" ry="21" fill="#c9925f" class="o"/><path d="M226 234c0-14 8-24 19-24 6 0 8-4 12-4 4 4 8 10 8 28-4-6-12-8-20-8-8 0-14 2-19 8Z" fill="#3b2a20" class="o"/><path d="M224 226c-6-2-8-10-4-14M266 226c6-2 8-10 4-14" fill="none" stroke="#2b2836" stroke-width="5" stroke-linecap="round"/><rect x="218" y="222" width="10" height="16" rx="4" fill="#d0602f" class="t"/><rect x="262" y="222" width="10" height="16" rx="4" fill="#d0602f" class="t"/><circle cx="238" cy="240" r="2.4" fill="#2b2836"/><circle cx="252" cy="240" r="2.4" fill="#2b2836"/><path d="M240 250c3 2 7 2 10 0" fill="none" stroke="#2b2836" stroke-width="1.4" stroke-linecap="round"/>
      <rect class="hit" x="56" y="146" width="248" height="216" fill="transparent"/><rect id="z_dim" class="off" width="360" height="480" fill="#0f1320" opacity=".55" pointer-events="none"/></g>`);
    addTo($('v-f4'), `<g class="hs" data-id="z_peanutUnder" data-stage="zainaFlight" role="button" tabindex="0" aria-label="Something grey under a seat"><g id="z_peanutUnderArt"><ellipse cx="80" cy="344" rx="16" ry="11" fill="#9aa5ab" class="o"/><circle cx="66" cy="338" r="7" fill="#8a97a3" class="o"/><circle cx="66" cy="338" r="2.4" fill="#d9a3a3"/></g><rect class="hit" x="52" y="322" width="60" height="36" fill="transparent"/></g>`);
    document.querySelectorAll('[data-id="fl_pocket"],[data-id="fl_screen"],[data-id="fl_watch"],[data-id="fl_map"],[data-id="fl_kids"]').forEach(el => { if (!el.dataset.stage) el.dataset.stage = 'maryFlight'; });
    // cloud spotting
    const CL = [['bunny', 30, 40, '<ellipse cx="0" cy="8" rx="16" ry="11"/><ellipse cx="-7" cy="-10" rx="5" ry="12"/><ellipse cx="7" cy="-10" rx="5" ry="12"/>'],['blob', 110, 30, '<ellipse cx="0" cy="0" rx="18" ry="10"/><ellipse cx="10" cy="-6" rx="10" ry="8"/>'],['boat', 180, 50, '<path d="M-20 4h40l-7 12h-26Z"/><path d="M0-22v26M0-20l16 20H0Z"/>'],['blob', 60, 100, '<ellipse cx="0" cy="0" rx="20" ry="9"/><ellipse cx="-8" cy="-6" rx="9" ry="7"/>'],['elephant', 150, 105, '<ellipse cx="4" cy="4" rx="18" ry="12"/><circle cx="-12" cy="0" r="9"/><path d="M-19 6c-3 5-1 10 3 13" stroke="#fffdf6" stroke-width="5" fill="none" stroke-linecap="round"/>'],['blob', 200, 110, '<ellipse cx="0" cy="0" rx="14" ry="8"/>']];
    const WANT = ['bunny','boat','elephant'];
    window.openClouds = () => {
      const want = WANT[S.clouds];
      $('cloudAsk').innerHTML = `<span>Find</span>${ZPIC[want]}`;
      $('clouds').innerHTML = CL.map(([k, x, y, d], i) => `<g data-k="${k}" transform="translate(${x} ${y})" style="cursor:pointer" fill="#fffdf6" opacity=".95">${d}<rect x="-26" y="-26" width="52" height="52" fill="transparent"/></g>`).join('');
      $('clouds').querySelectorAll('g').forEach(g => g.onclick = () => {
        if (g.dataset.k === want){ S.clouds++; $('cloudFb').textContent = ['A bunny cloud! ','A boat cloud! ','An elephant cloud, like Peanut! '][S.clouds - 1] + (S.clouds < 3 ? 'Find the next one.' : 'All found!'); if (S.clouds >= 3) setTimeout(() => { $('cloudUI').hidden = true; say('A bunny, a boat, and an elephant cloud. Peanut is very pleased about the elephant.'); render(); }, 900); else openClouds(); }
        else $('cloudFb').textContent = 'That one is just a cloud. Keep looking!';
      });
      if (!$('cloudFb').textContent) $('cloudFb').textContent = 'Tap the cloud that matches the picture.';
      $('cloudUI').hidden = false;
    };
  }
});
