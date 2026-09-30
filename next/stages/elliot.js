/* Elliot, stages 1 to 3. See STORY.md. Hotspot ids start with e_. */

/* ---------- shared bits for Elliot's puzzles ---------- */
const ELLIOT_CSS = `
.tray{display:flex;gap:clamp(6px,2cqw,12px);justify-content:center;flex-wrap:wrap}
.piece{min-width:56px;min-height:56px;border-radius:10px;border:2px solid #e8dcc6;background:transparent;color:#fffdf6;cursor:pointer;display:grid;place-items:center;padding:6px}
.piece.on{border-color:#f0b44c;background:rgba(240,180,76,.18)}
.piece svg{width:40px;height:40px}
.mrun{width:100%;max-width:92cqw;height:auto;display:block;border-radius:8px}
.kit{display:grid;grid-template-columns:1fr 1fr;gap:clamp(6px,2cqw,12px);width:min(100%,60cqw)}
.kit button{aspect-ratio:1;border-radius:12px;border:2px dashed #e8dcc6;background:transparent;cursor:pointer;padding:8px;display:grid;place-items:center}
.kit button.ok{border:2px solid #5fc08a;background:rgba(95,192,138,.15)}
.kit svg{width:100%;height:100%;transition:transform .25s ease}
.bats{display:flex;flex-direction:column;gap:10px;width:min(100%,70cqw)}
.bat{display:flex;align-items:center;gap:8px}
.bat button{flex:1;min-height:52px;border-radius:12px;border:2px solid #e8dcc6;background:transparent;cursor:pointer;padding:6px}
.bat svg{width:100%;height:36px}
.bat .slot{font-size:.85em;color:#e8dcc6;width:3.2em;text-align:right}
@media (prefers-reduced-motion:reduce){.kit svg{transition:none}}
`;

/* ---------- Stage 1: last day of school (classroom 2P and the playground) ---------- */
registerStage('elliotSchool', {
  css: ELLIOT_CSS,
  boxes: {
    classroom2:{ceil:['#f9f7ee','#ece9dc'], back:['#fbf3e0','#eee3cb'], left:['#d8ccb2','#e2d8c2'], right:['#f1e8d3','#e6dbc4'], floor:['#c9ad86','#ad8e66'], boards:'wood', skirt:['#b6ad9b','#c5bca8','#aaa290'], lamp:true},
    playground:{ceil:['#a9d8ee','#bfe0ea'], back:['#bfe0ea','#d5ecf2'], left:['#b3d7e6','#c4e2ec'], right:['#bde0ec','#cbe7ef'], floor:['#8d8f8a','#6f726d'], boards:'tarmac', skirt:['#7f8d98','#9fb0bb','#7f8d98'], lamp:false, outdoor:true}
  },
  views: `
<!-- p1: the front of class 2P: whiteboard and Miss Okafor's desk -->
<g class="view" id="v-p1" data-box="classroom2" data-light="right">
  <g><rect x="56" y="70" width="248" height="12" fill="#fffdf6" class="t"/><g fill="#d0602f"><rect x="60" y="72" width="8" height="8"/><rect x="92" y="72" width="8" height="8" fill="#f0b44c"/><rect x="124" y="72" width="8" height="8" fill="#3a8f5c"/><rect x="156" y="72" width="8" height="8" fill="#3b78b8"/><rect x="188" y="72" width="8" height="8" fill="#7a5cc2"/><rect x="220" y="72" width="8" height="8" fill="#c4589a"/><rect x="252" y="72" width="8" height="8" fill="#d0602f"/><rect x="284" y="72" width="8" height="8" fill="#f0b44c"/></g></g>
  <g class="hs" data-id="e_board" role="button" tabindex="0" aria-label="Whiteboard">
    <rect x="70" y="92" width="220" height="120" rx="3" fill="#fffdf6" stroke="#8a97a3" stroke-width="5" stroke-linejoin="round"/><rect x="70" y="92" width="220" height="120" rx="3" fill="none" class="o"/>
    <text x="180" y="136" text-anchor="middle" font-size="18" fill="#d0602f" class="hand">Goodbye 2P!</text>
    <text x="180" y="162" text-anchor="middle" font-size="14" fill="#2f7c83" class="hand">Party at 2 o'clock</text>
    <path d="M100 190c6-10 14-10 20 0M240 190c6-10 14-10 20 0" fill="none" stroke="#f0b44c" stroke-width="2.4"/><circle cx="110" cy="182" r="6" fill="#d0602f" class="t"/><circle cx="250" cy="182" r="6" fill="#3b78b8" class="t"/>
    <rect x="90" y="212" width="180" height="6" rx="2" fill="#9aa5ab" class="t"/>
    <rect class="hit" x="66" y="88" width="228" height="132" fill="transparent"/>
  </g>
  <g class="hs" data-id="e_tdesk" role="button" tabindex="0" aria-label="Miss Okafor's desk">
    <ellipse cx="240" cy="446" rx="86" ry="10" fill="#2b2836" opacity=".16" filter="url(#blur6)"/>
    <rect x="180" y="356" width="124" height="76" fill="#b98a5a" class="o"/><rect x="188" y="366" width="50" height="24" rx="2" fill="#a8744a" class="t"/><rect x="188" y="398" width="50" height="24" rx="2" fill="#a8744a" class="t"/>
    <polygon points="192,300 300,300 314,344 176,344" fill="#d8b98a" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/><rect x="176" y="344" width="138" height="12" fill="#b98a5a" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/>
    <g id="e_cardArt"><rect x="230" y="266" width="52" height="36" rx="2" fill="#fffdf6" class="o" transform="rotate(-8 256 284)"/><path d="M236 276h40M236 284h30M236 292h36" stroke="#c0541f" stroke-width="2" transform="rotate(-8 256 284)"/><circle cx="270" cy="272" r="4" fill="#f0b44c" transform="rotate(-8 256 284)"/></g>
    <rect x="200" y="280" width="22" height="22" rx="3" fill="#3b78b8" class="o"/><path d="M222 286c8 0 8 12 0 12" fill="none" class="o"/>
    <rect class="hit" x="174" y="256" width="142" height="180" fill="transparent"/>
  </g>
  <g><ellipse cx="96" cy="426" rx="60" ry="18" fill="#3b78b8" class="o"/><ellipse cx="96" cy="426" rx="42" ry="12" fill="#7fb5c9"/><ellipse cx="96" cy="426" rx="22" ry="6" fill="#f0b44c"/></g>
</g>

<!-- p2: the marble run by the window -->
<g class="view" id="v-p2" data-box="classroom2" data-light="front">
  <g><rect x="60" y="72" width="240" height="120" rx="3" fill="#fffdf6" class="o"/><rect x="68" y="80" width="224" height="104" fill="#bfe0ea"/><circle cx="252" cy="108" r="14" fill="#fbe78a" class="t"/><g fill="#6fa36a"><circle cx="100" cy="176" r="24"/><circle cx="160" cy="184" r="20"/><circle cx="230" cy="178" r="26"/></g><line x1="180" y1="80" x2="180" y2="184" stroke="#fffdf6" stroke-width="5"/></g>
  <g class="hs" data-id="e_marble" role="button" tabindex="0" aria-label="The class marble run">
    <ellipse cx="180" cy="446" rx="110" ry="10" fill="#2b2836" opacity=".16" filter="url(#blur6)"/>
    <polygon points="92,320 268,320 284,356 76,356" fill="#d8b98a" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/><rect x="82" y="356" width="8" height="84" fill="#7a8794" class="o"/><rect x="270" y="356" width="8" height="84" fill="#7a8794" class="o"/>
    <g class="o"><rect x="100" y="230" width="14" height="90" fill="#3b78b8"/><rect x="246" y="250" width="14" height="70" fill="#3b78b8"/></g>
    <g class="t"><path d="M106 232h60l16 20" fill="none" stroke="#d0602f" stroke-width="7" stroke-linecap="round"/><path d="M182 252l20 0" fill="none" stroke="#e8dcc6" stroke-width="7" stroke-dasharray="3 5"/><path d="M202 252l40 10" fill="none" stroke="#f0b44c" stroke-width="7" stroke-linecap="round"/><path d="M114 290h40" fill="none" stroke="#e8dcc6" stroke-width="7" stroke-dasharray="3 5"/><path d="M154 290h50l16 14" fill="none" stroke="#3a8f5c" stroke-width="7" stroke-linecap="round"/><path d="M220 304l10 6" fill="none" stroke="#e8dcc6" stroke-width="7" stroke-dasharray="3 5"/></g>
    <g id="e_bellArt"><path d="M244 300c0-10 6-14 12-14s12 4 12 14v10h-24Z" fill="#f0b44c" class="o"/><circle cx="256" cy="312" r="2.4" fill="#2b2836"/></g>
    <circle cx="108" cy="226" r="5" fill="#7a5cc2" class="t"/>
    <rect class="hit" x="86" y="216" width="190" height="144" fill="transparent"/>
  </g>
  <g><rect x="44" y="200" width="272" height="8" rx="2" fill="#d8cbb5" class="t"/><path d="M60 200h20l-3 -30H63Z" fill="#c9755a" class="t"/><path d="M70 170c0-14 4-22 8-26" stroke="#4d8a4f" stroke-width="2.4" fill="none"/></g>
</g>

<!-- p3: the door to the playground and the pegs -->
<g class="view" id="v-p3" data-box="classroom2" data-light="left">
  <g class="hs door" data-id="e_toPlayground" role="button" tabindex="0" aria-label="Door to the playground">
    <rect x="90" y="72" width="112" height="288" fill="#fffdf6" class="o"/>
    <rect x="98" y="80" width="96" height="280" fill="#d0602f" class="o"/>
    <rect x="112" y="96" width="68" height="64" rx="3" fill="#bfe0ea" class="t"/><g fill="#6fa36a"><circle cx="130" cy="150" r="12"/><circle cx="160" cy="154" r="10"/></g>
    <rect x="118" y="176" width="56" height="26" rx="4" fill="#fffdf6" class="t"/><text x="146" y="194" text-anchor="middle" font-size="14" font-weight="700" fill="#d0602f" class="lbl">2P</text>
    <rect x="112" y="220" width="68" height="120" rx="3" fill="#e0664f" class="t"/><circle cx="186" cy="232" r="5.5" fill="#f0b44c" class="t"/>
    <rect class="hit" x="88" y="70" width="116" height="292" fill="transparent"/>
  </g>
  <g><rect x="214" y="116" width="98" height="10" rx="3" fill="#a8744a" class="o"/><g fill="#8a6440"><circle cx="226" cy="133" r="4" class="t"/><circle cx="246" cy="133" r="4" class="t"/><circle cx="266" cy="133" r="4" class="t"/><circle cx="286" cy="133" r="4" class="t"/><circle cx="304" cy="133" r="4" class="t"/></g><path d="M244 136c-8 14-10 30-4 40h14c4-10 2-26-6-40Z" fill="#f0b44c" class="o"/><g fill="#fffdf6"><rect x="220" y="102" width="12" height="8" class="t"/><rect x="240" y="102" width="12" height="8" class="t"/><rect x="260" y="102" width="12" height="8" class="t"/><rect x="280" y="102" width="12" height="8" class="t"/><rect x="298" y="102" width="12" height="8" class="t"/></g></g>
  <g><rect x="230" y="290" width="70" height="70" rx="4" fill="#9dc5b8" class="o"/><rect x="238" y="298" width="54" height="26" rx="3" fill="#8ab4a6" class="t"/><rect x="238" y="330" width="54" height="24" rx="3" fill="#8ab4a6" class="t"/></g>
</g>

<!-- p4: Captain the goldfish and the reading corner -->
<g class="view" id="v-p4" data-box="classroom2" data-light="back">
  <g class="hs" data-id="e_fish" role="button" tabindex="0" aria-label="Captain the goldfish">
    <rect x="104" y="150" width="152" height="90" rx="6" fill="#a9d0de" class="o"/><rect x="104" y="150" width="152" height="12" fill="#7fb5c9"/><rect x="104" y="228" width="152" height="12" fill="#d9c69a"/>
    <path d="M124 228c4-20 2-34 8-40M236 228c-4-16-2-30-8-36" stroke="#3a8f5c" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g class="t"><ellipse cx="180" cy="196" rx="18" ry="11" fill="#f0b44c"/><path d="M198 196l12-8v16Z" fill="#e0a84a"/><circle cx="170" cy="193" r="2" fill="#2b2836"/><path d="M176 186c4-6 12-6 16 0" fill="none" stroke="#e0a84a" stroke-width="2"/></g>
    <g fill="#fffdf6" opacity=".8"><circle cx="196" cy="176" r="2"/><circle cx="200" cy="168" r="1.4"/></g>
    <g class="bubble"><path d="M198 120h20a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-9l-5 5v-5h-6a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4Z" fill="#fffdf6" class="t"/><text x="208" y="132" text-anchor="middle" font-size="10" font-weight="700" fill="#c98320" class="lbl">?</text></g>
    <rect x="96" y="240" width="168" height="120" fill="#a8744a" class="o"/><rect x="104" y="250" width="152" height="100" fill="#8a6440"/>
    <rect x="112" y="268" width="60" height="18" rx="3" fill="#fffdf6" class="t"/><text x="142" y="281" text-anchor="middle" font-size="8" font-weight="700" fill="#2f7c83" class="lbl">CAPTAIN</text>
    <rect class="hit" x="94" y="114" width="172" height="130" fill="transparent"/>
  </g>
  <g><ellipse cx="292" cy="410" rx="30" ry="14" fill="#7a5cc2" class="o"/><ellipse cx="292" cy="404" rx="30" ry="12" fill="#9a80dc"/><ellipse cx="60" cy="412" rx="30" ry="14" fill="#3a8f5c" class="o"/><ellipse cx="60" cy="406" rx="30" ry="12" fill="#5fc08a"/></g>
</g>

<!-- g1: the goodbye party table -->
<g class="view" id="v-g1" data-box="playground" data-light="none">
  <circle cx="290" cy="20" r="22" fill="#fbe78a" class="t"/><g fill="#fffdf6" opacity=".9"><ellipse cx="90" cy="30" rx="30" ry="9"/><ellipse cx="110" cy="24" rx="18" ry="8"/></g>
  <g><rect x="40" y="200" width="280" height="160" fill="#c9755a" opacity=".9"/><g stroke="#b8493f" stroke-width="1"><line x1="40" y1="240" x2="320" y2="240"/><line x1="40" y1="280" x2="320" y2="280"/><line x1="40" y1="320" x2="320" y2="320"/><line x1="100" y1="200" x2="100" y2="360"/><line x1="180" y1="200" x2="180" y2="360"/><line x1="260" y1="200" x2="260" y2="360"/></g><g fill="#bfe0ea" class="t"><rect x="60" y="120" width="60" height="60"/><rect x="150" y="120" width="60" height="60"/><rect x="240" y="120" width="60" height="60"/></g><rect x="40" y="100" width="280" height="8" fill="#a8412f" class="t"/></g>
  <g class="hs" data-id="e_party" role="button" tabindex="0" aria-label="The party table">
    <ellipse cx="180" cy="446" rx="120" ry="10" fill="#2b2836" opacity=".16" filter="url(#blur6)"/>
    <polygon points="70,330 290,330 310,372 50,372" fill="#fffdf6" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/><rect x="58" y="372" width="8" height="66" fill="#7a8794" class="o"/><rect x="294" y="372" width="8" height="66" fill="#7a8794" class="o"/>
    <g class="t"><rect x="150" y="286" width="60" height="44" rx="4" fill="#f2c89a"/><rect x="150" y="286" width="60" height="12" rx="4" fill="#e0664f"/><path d="M160 286v-14M180 286v-14M200 286v-14" stroke="#3b78b8" stroke-width="3"/><g fill="#f0b44c"><circle cx="160" cy="270" r="3"/><circle cx="180" cy="270" r="3"/><circle cx="200" cy="270" r="3"/></g></g>
    <g class="t"><rect x="84" y="308" width="40" height="22" rx="3" fill="#7fb5c9"/><rect x="236" y="310" width="36" height="20" rx="3" fill="#b09ae8"/><circle cx="104" cy="304" r="8" fill="#d0602f"/><circle cx="254" cy="306" r="8" fill="#3a8f5c"/></g>
    <g><path d="M96 100c0-30 40-30 40 0 0 20-20 26-20 36 0-10-20-16-20-36Z" fill="#d0602f" class="o"/><path d="M116 136v40" stroke="#2b2836" stroke-width="1.4"/><path d="M228 108c0-30 40-30 40 0 0 20-20 26-20 36 0-10-20-16-20-36Z" fill="#3b78b8" class="o"/><path d="M248 144v36" stroke="#2b2836" stroke-width="1.4"/></g>
    <rect class="hit" x="48" y="260" width="264" height="120" fill="transparent"/>
  </g>
</g>

<!-- g2: the climbing frame, the bench and the lost property box -->
<g class="view" id="v-g2" data-box="playground" data-light="none">
  <g fill="#fffdf6" opacity=".9"><ellipse cx="240" cy="40" rx="34" ry="10"/><ellipse cx="262" cy="34" rx="20" ry="8"/></g>
  <g><rect x="40" y="200" width="280" height="160" fill="#9dc59a"/><rect x="40" y="196" width="280" height="8" fill="#6f9f63" class="t"/></g>
  <g><g stroke="#d0602f" stroke-width="6" stroke-linecap="round" fill="none"><line x1="70" y1="360" x2="70" y2="180"/><line x1="150" y1="360" x2="150" y2="180"/><line x1="70" y1="180" x2="150" y2="180"/><line x1="70" y1="230" x2="150" y2="230"/><line x1="70" y1="280" x2="150" y2="280"/><line x1="70" y1="330" x2="150" y2="330"/></g><g stroke="#3b78b8" stroke-width="6" stroke-linecap="round" fill="none"><line x1="150" y1="180" x2="230" y2="180"/><line x1="230" y1="360" x2="230" y2="180"/><line x1="150" y1="230" x2="230" y2="230"/><line x1="190" y1="180" x2="190" y2="360"/></g></g>
  <g class="hs" data-id="e_lost" role="button" tabindex="0" aria-label="Lost property box on the bench">
    <ellipse cx="270" cy="446" rx="60" ry="8" fill="#2b2836" opacity=".16" filter="url(#blur6)"/>
    <polygon points="230,380 320,380 330,400 220,400" fill="#c9a26b" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/><rect x="226" y="400" width="8" height="40" fill="#8a6440" class="o"/><rect x="314" y="400" width="8" height="40" fill="#8a6440" class="o"/>
    <rect x="240" y="318" width="70" height="62" fill="#c9a26b" class="o"/><rect x="240" y="318" width="70" height="12" fill="#b08a58" class="t"/>
    <text x="275" y="356" text-anchor="middle" font-size="7" font-weight="700" fill="#5b4a2e" class="lbl">LOST PROPERTY</text>
    <path d="M248 318c2-10 10-14 16-10l-2 10Z" fill="#3a8f5c" class="t"/><path d="M286 318c-2-8 6-16 14-14 2 6-2 12-6 14Z" fill="#7a5cc2" class="t"/>
    <rect class="hit" x="222" y="300" width="106" height="100" fill="transparent"/>
  </g>
</g>

<!-- g3: the football goal and the flowerbed -->
<g class="view" id="v-g3" data-box="playground" data-light="none">
  <g fill="#fffdf6" opacity=".9"><ellipse cx="70" cy="36" rx="28" ry="9"/></g>
  <g><rect x="40" y="200" width="280" height="160" fill="#9dc59a"/><rect x="40" y="196" width="280" height="8" fill="#6f9f63" class="t"/></g>
  <g class="hs" data-id="e_goal" role="button" tabindex="0" aria-label="Football goal">
    <g stroke="#fffdf6" stroke-width="6" stroke-linecap="round" fill="none"><path d="M90 360V220h180v140"/></g>
    <g stroke="#fffdf6" stroke-width="1" opacity=".7"><path d="M96 240h168M96 262h168M96 284h168M96 306h168M96 328h168M116 224v136M142 224v136M168 224v136M194 224v136M220 224v136M246 224v136"/></g>
    <circle cx="200" cy="396" r="16" fill="#fffdf6" class="o"/><path d="M200 384l8 6-3 10h-10l-3-10Z" fill="#2b2836"/>
    <rect class="hit" x="84" y="214" width="192" height="200" fill="transparent"/>
  </g>
  <g><rect x="40" y="380" width="60" height="60" fill="#8a6440" class="o"/><g class="t"><circle cx="56" cy="384" r="6" fill="#d0602f"/><circle cx="72" cy="380" r="6" fill="#f0b44c"/><circle cx="88" cy="386" r="6" fill="#c4589a"/></g><path d="M56 390v10M72 386v14M88 392v8" stroke="#4d8a4f" stroke-width="2"/></g>
</g>

<!-- g4: the door back into 2P -->
<g class="view" id="v-g4" data-box="playground" data-light="none">
  <g><rect x="40" y="62" width="280" height="298" fill="#c9755a" opacity=".9"/><g stroke="#b8493f" stroke-width="1"><line x1="40" y1="120" x2="320" y2="120"/><line x1="40" y1="180" x2="320" y2="180"/><line x1="40" y1="240" x2="320" y2="240"/><line x1="40" y1="300" x2="320" y2="300"/><line x1="100" y1="62" x2="100" y2="360"/><line x1="260" y1="62" x2="260" y2="360"/></g></g>
  <g class="hs door" data-id="e_toClass" role="button" tabindex="0" aria-label="Door to classroom 2P">
    <rect x="124" y="72" width="112" height="288" fill="#fffdf6" class="o"/>
    <rect x="132" y="80" width="96" height="280" fill="#d0602f" class="o"/>
    <rect x="146" y="96" width="68" height="64" rx="3" fill="#fbf3e0" class="t"/>
    <rect x="152" y="176" width="56" height="26" rx="4" fill="#fffdf6" class="t"/><text x="180" y="194" text-anchor="middle" font-size="14" font-weight="700" fill="#d0602f" class="lbl">2P</text>
    <rect x="146" y="220" width="68" height="120" rx="3" fill="#e0664f" class="t"/><circle cx="140" cy="232" r="5.5" fill="#f0b44c" class="t"/>
    <rect class="hit" x="122" y="70" width="116" height="292" fill="transparent"/>
  </g>
  <g><rect x="60" y="130" width="50" height="60" rx="3" fill="#bfe0ea" class="t"/><rect x="250" y="130" width="50" height="60" rx="3" fill="#bfe0ea" class="t"/></g>
  <g><rect x="260" y="300" width="40" height="60" rx="4" fill="#3a8f5c" class="o"/><rect x="256" y="294" width="48" height="10" rx="3" fill="#27794c" class="o"/></g>
</g>
`,
  closeups: `
<div class="overlay closeup" id="marbleUI" hidden>
  <p class="otitle">The marble run. Three pieces are missing.</p>
  <svg class="mrun" viewBox="0 0 220 130" aria-label="The marble run">
    <rect width="220" height="130" rx="6" fill="#fbf3e0"/>
    <g class="t"><rect x="14" y="20" width="10" height="96" fill="#3b78b8"/><rect x="190" y="40" width="10" height="76" fill="#3b78b8"/></g>
    <path d="M24 26h50l14 14" fill="none" stroke="#d0602f" stroke-width="8" stroke-linecap="round"/>
    <g id="mg0"><path d="M88 40h30" fill="none" stroke="#c9bfa9" stroke-width="8" stroke-dasharray="3 5"/></g>
    <path d="M118 40l40 12" fill="none" stroke="#f0b44c" stroke-width="8" stroke-linecap="round"/>
    <g id="mg1"><path d="M158 52c14 6 16 20 4 30" fill="none" stroke="#c9bfa9" stroke-width="8" stroke-dasharray="3 5"/></g>
    <path d="M162 82H80" fill="none" stroke="#3a8f5c" stroke-width="8" stroke-linecap="round"/>
    <g id="mg2"><path d="M80 82l-14 12 10 12" fill="none" stroke="#c9bfa9" stroke-width="8" stroke-dasharray="3 5"/></g>
    <path d="M76 106h100" fill="none" stroke="#7a5cc2" stroke-width="8" stroke-linecap="round"/>
    <g id="mbell"><path d="M180 96c0-8 5-11 10-11s10 3 10 11v8h-20Z" fill="#f0b44c" class="t"/><circle cx="190" cy="106" r="2" fill="#2b2836"/></g>
    <circle id="marbleBall" cx="26" cy="20" r="5" fill="#7a5cc2" class="t"/>
  </svg>
  <div class="tray" id="mtray"></div>
  <p class="ofb" id="marbleFb" aria-live="polite"></p>
  <div class="row"><button class="ob" id="marbleRoll" hidden>Roll the marble!</button><button class="ob" data-close>Step back</button></div>
</div>
<div class="overlay closeup" id="lostUI" hidden>
  <p class="otitle">Four jumpers. Which one is Elliot's?</p>
  <div class="tray" id="jumpers"></div>
  <p class="ofb" id="lostFb" aria-live="polite">Look at the labels.</p>
  <button class="ob" data-close>Step back</button>
</div>
`,
  stage: {
    rooms:{classroom:{name:'Classroom 2P', into:'your classroom', views:['p1','p2','p3','p4']}, playground:{name:'Playground', into:'the playground', views:['g1','g2','g3','g4']}},
    doors:{e_toPlayground:['playground','g1'], e_toClass:['classroom','p1']},
    start:['classroom','p2'],
    intro:'<b>Last day of school.</b> The party is at two, and the class marble run is broken. Captain the goldfish is watching.',
    hinter:'Captain blows a bubble',
    items:{jumper:{name:'Elliot’s jumper', icon:'<svg viewBox="0 0 40 40"><path d="M8 12l8-4h8l8 4v8h-4v14H12V20H8Z" fill="#c0541f" stroke="#8a3526" stroke-width="2"/><text x="20" y="28" text-anchor="middle" font-size="9" font-weight="700" fill="#fffdf6" font-family="Verdana,sans-serif">E</text></svg>'}},
    uses:{},
    spark:S => !S.marbleDone ? ['e_marble'] : (!S.jumper ? ['e_lost'] : ['e_tdesk']),
    fresh:() => ({placed:[false,false,false], holding:null, marbleDone:false, jumper:false, card:false}),
    draw(S){ tog('e_cardArt', !S.card); },
    act(id){
      switch(id){
        case 'e_marble': openMarble(); return;
        case 'e_lost': openLost(); return;
        case 'e_tdesk':
          if (S.card) say('Miss Okafor’s desk. Her mug says WORLD’S OKAYEST TEACHER. She thinks it is very funny.');
          else if (!S.marbleDone) say('A goodbye card with your name on it! Miss Okafor: “After the marble run works, Elliot. The party needs it!”');
          else if (!S.jumper) say('Miss Okafor: “Nearly! Nobody goes home without their jumper. It’s in lost property, outside.”');
          else { S.card = true; say('Miss Okafor hands over the card. Everyone in 2P has signed it, and Captain has left a wet fin-print.'); render(); finish(); return; }
          break;
        case 'e_fish': hint(); return;
        case 'e_board': say('Miss Okafor has written GOODBYE 2P! and drawn balloons. One of them is a bit egg-shaped.'); break;
        case 'e_party': say('Cake, crisps, and balloons. The party starts at two, as soon as the marble run rings its bell.'); break;
        case 'e_goal': say('The football goal. Elliot scored here once. It was in his own goal, but it still counts.'); break;
        case 'e_toPlayground': case 'e_toClass': break;
      }
      render();
    },
    hints:[
      {goal:() => S.marbleDone, tips:['The marble run is missing some pieces. Try the tray of spare pieces.','Tap a piece in the tray, then tap the gap it fits. Straight bits go in straight gaps.','Straight piece in the top gap, curve in the middle gap, zigzag in the last gap. Then roll!']},
      {goal:() => S.jumper, tips:['Nobody goes home without their jumper. Where do lost things end up?','Lost property is on the bench in the playground. Elliot’s jumper has a label.','Go out to the playground, turn to the bench, and pick the jumper with an E on it.']},
      {goal:() => false, tips:['Marble run fixed and jumper found. Someone has a card for you.','Miss Okafor is at her desk in the classroom.','Go back to 2P and tap Miss Okafor’s desk.']}
    ],
    ending(){
      saveStage('elliotSchool');
      return ['<p class="fade big" style="animation-delay:.2s">Party time!</p>',
        '<p class="fade" style="animation-delay:1.4s">The marble rings the bell, the cake is cut, and everyone signs everyone’s card.</p>',
        '<p class="fade" style="animation-delay:2.8s">Inside Elliot’s card, someone has drawn a little moth. Nobody in 2P remembers drawing it.</p>',
        '<p class="fade next" style="animation-delay:4.2s">Next for Elliot: packing day.</p>'];
    }
  },
  setup(){
    const PIECES = [['straight','<svg viewBox="0 0 40 40"><path d="M6 20h28" stroke="#e8dcc6" stroke-width="8" stroke-linecap="round"/></svg>'],['curve','<svg viewBox="0 0 40 40"><path d="M8 10c16 4 20 18 8 26" fill="none" stroke="#e8dcc6" stroke-width="8" stroke-linecap="round"/></svg>'],['zigzag','<svg viewBox="0 0 40 40"><path d="M30 8l-16 12 12 12" fill="none" stroke="#e8dcc6" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>']];
    const FIT = [0,1,2]; // gap i takes piece FIT[i]
    const GAPART = ['<path d="M88 40h30" fill="none" stroke="#d0602f" stroke-width="8" stroke-linecap="round"/>','<path d="M158 52c14 6 16 20 4 30" fill="none" stroke="#f0b44c" stroke-width="8" stroke-linecap="round"/>','<path d="M80 82l-14 12 10 12" fill="none" stroke="#3a8f5c" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'];
    window.openMarble = () => {
      $('mtray').innerHTML = PIECES.map(([n, svg], i) => S.placed.includes(i) && S.placed.indexOf(i) >= 0 && S.placed.some((p, g) => p === i) ? '' : `<button class="piece${S.holding === i ? ' on' : ''}" data-i="${i}" aria-label="${n} piece">${svg}</button>`).join('');
      $('mtray').querySelectorAll('.piece').forEach(b => b.onclick = () => { S.holding = +b.dataset.i; $('marbleFb').textContent = 'Now tap the gap it fits.'; openMarble(); });
      [0,1,2].forEach(g => { const el = $('mg' + g); el.style.cursor = 'pointer'; el.onclick = () => placePiece(g); if (S.placed[g] !== false) el.innerHTML = GAPART[g]; });
      $('marbleRoll').hidden = !(S.placed.every(p => p !== false) && !S.marbleDone);
      if (!S.marbleDone && S.holding === null && !S.placed.every(p => p !== false)) $('marbleFb').textContent = 'Tap a piece, then tap a gap.';
      if (S.marbleDone) $('marbleFb').textContent = 'Ding! It works.';
      $('marbleUI').hidden = false;
    };
    const placePiece = g => {
      if (S.holding === null){ $('marbleFb').textContent = 'Pick a piece from the tray first.'; return; }
      if (S.placed[g] !== false){ $('marbleFb').textContent = 'That gap is already filled.'; return; }
      if (FIT[g] !== S.holding){ $('marbleFb').textContent = 'That piece does not fit there. Try another gap.'; return; }
      S.placed[g] = S.holding; S.holding = null; $('marbleFb').textContent = 'Click! It fits.'; openMarble();
    };
    $('marbleRoll').onclick = () => {
      if (S.marbleDone) return;
      const ball = $('marbleBall');
      const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      anim.setAttribute('dur', '2.2s'); anim.setAttribute('fill', 'freeze'); anim.setAttribute('path', 'M0 0 L50 6 L92 20 L132 20 L154 32 L138 62 L52 62 L40 74 L50 86 L154 86');
      ball.appendChild(anim); anim.beginElement();
      $('marbleRoll').hidden = true;
      setTimeout(() => { S.marbleDone = true; $('mbell').style.transform = 'rotate(-12deg)'; $('mbell').style.transformOrigin = '190px 86px'; $('marbleFb').textContent = 'DING! The bell rings. Miss Okafor cheers from the corridor.'; say('The marble rolls all the way down and rings the bell. The party can start!'); render(); }, 2300);
    };
    window.openLost = () => {
      const J = [['B','#3b78b8'],['E','#c0541f'],['M','#7a5cc2'],['?','#3a8f5c']];
      $('jumpers').innerHTML = J.map(([l, c], i) => `<button class="piece" data-l="${l}" aria-label="Jumper with label ${l}"><svg viewBox="0 0 40 40"><path d="M8 12l8-4h8l8 4v8h-4v14H12V20H8Z" fill="${c}" stroke="#2b2836" stroke-width="1.5"/><rect x="15" y="21" width="10" height="7" fill="#fffdf6"/><text x="20" y="27" text-anchor="middle" font-size="6" font-weight="700" fill="#2b2836" font-family="Verdana,sans-serif">${l}</text></svg></button>`).join('');
      $('jumpers').querySelectorAll('.piece').forEach(b => b.onclick = () => {
        if (b.dataset.l === 'E'){ if (!S.jumper){ S.jumper = true; add('jumper'); say('Elliot’s jumper, with a big E on the label. It smells of crisps.'); render(); } $('lostUI').hidden = true; }
        else $('lostFb').textContent = b.dataset.l === '?' ? 'That label has worn off. Not this one.' : `That says ${b.dataset.l}. Elliot starts with an E.`;
      });
      $('lostFb').textContent = S.jumper ? 'Only other people’s jumpers left.' : 'Look at the labels.';
      $('lostUI').hidden = false;
    };
  }
});

/* ---------- Stage 2: packing day (Elliot's bedroom, and the flat) ---------- */
registerStage('elliotPacking', {
  boxes: {
    ebedroom:{ceil:['#f4f8f6','#e6efe9'], back:['#e3f0ea','#d3e4db'], left:['#bfd3c8','#cddfd4'], right:['#dbebe2','#cfe0d6'], floor:['#d2a574','#b98a5a'], boards:'wood', skirt:['#a58a62','#b8996c','#96794f'], lamp:false}
  },
  views: `
<!-- eb1: Elliot's bed and his backpack -->
<g class="view" id="v-eb1" data-box="ebedroom" data-light="left">
  <g><rect x="120" y="84" width="120" height="80" rx="4" fill="#3a8f5c" class="o"/><path d="M140 150c10-30 30-50 60-50-10 20-30 36-60 50Z" fill="#5fc08a"/><circle cx="196" cy="108" r="8" fill="#fbe78a"/><text x="180" y="156" text-anchor="middle" font-size="9" font-weight="700" fill="#fffdf6" class="lbl">DINOSAURS!</text></g>
  <g class="hs" data-id="e_bed" role="button" tabindex="0" aria-label="Elliot's bed">
    <rect x="52" y="184" width="256" height="66" rx="10" fill="#a8744a" class="o"/><rect x="62" y="194" width="236" height="46" rx="6" fill="#8a6440"/>
    <polygon points="70,246 290,246 320,360 40,360" fill="#7fb5c9" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/>
    <g fill="#3a8f5c" opacity=".7"><path d="M100 300l10-12 10 12Z"/><path d="M200 320l10-12 10 12Z"/><path d="M150 340l10-12 10 12Z"/><path d="M250 290l10-12 10 12Z"/></g>
    <rect x="78" y="232" width="74" height="30" rx="12" fill="#fffdf6" class="o"/>
    <rect x="40" y="356" width="280" height="12" rx="3" fill="#8a6440" class="o"/>
    <rect class="hit" x="40" y="180" width="280" height="190" fill="transparent"/>
  </g>
  <g class="hs" data-id="e_backpack" role="button" tabindex="0" aria-label="Elliot's backpack">
    <ellipse cx="232" cy="452" rx="40" ry="6" fill="#2b2836" opacity=".18" filter="url(#blur6)"/>
    <path d="M200 392c0-14 10-22 30-22s30 8 30 22v46a6 6 0 0 1-6 6h-48a6 6 0 0 1-6-6Z" fill="#c0541f" class="o"/>
    <path d="M202 398h56v16h-56Z" fill="#ef8a5a"/><path d="M208 416h44v22h-44Z" fill="#a8412f" class="t"/>
    <path d="M220 370c2-9 18-9 20 0" fill="none" class="o"/><circle cx="230" cy="428" r="3.4" fill="#f0b44c" class="t"/>
    <g id="e_packedArt"></g>
    <rect class="hit" x="196" y="364" width="70" height="86" fill="transparent"/>
  </g>
</g>

<!-- eb2: the shelf of models, the torch and the building kit on the rug -->
<g class="view" id="v-eb2" data-box="ebedroom" data-light="back">
  <rect x="56" y="140" width="248" height="10" rx="2" fill="#a8744a" class="o"/>
  <g class="t"><path d="M70 140v-30l14-10 14 10v30Z" fill="#d0602f"/><rect x="104" y="116" width="30" height="24" fill="#3b78b8"/><circle cx="160" cy="128" r="12" fill="#f0b44c"/><path d="M190 140l10-30 10 30Z" fill="#7a5cc2"/></g>
  <g class="hs" data-id="e_torch" role="button" tabindex="0" aria-label="Elliot's torch">
    <g id="e_torchArt"><rect x="232" y="122" width="40" height="18" rx="5" fill="#2f7c83" class="o"/><path d="M272 118h12l6-6v30l-6-6h-12z" fill="#5b6f7a" class="o"/><g id="e_torchBeam" class="off"><path d="M292 112l24-12M292 131h26M292 150l24 12" stroke="#f0b44c" stroke-width="3" stroke-linecap="round"/></g></g>
    <rect class="hit" x="226" y="104" width="76" height="46" fill="transparent"/>
  </g>
  <g><ellipse cx="180" cy="420" rx="120" ry="34" fill="#9aa5ab" class="o"/><g stroke="#fffdf6" stroke-width="2" stroke-dasharray="6 6" fill="none"><ellipse cx="180" cy="420" rx="90" ry="24"/></g><rect x="150" y="392" width="20" height="10" rx="2" fill="#d0602f" class="t"/></g>
  <g class="hs" data-id="e_kit" role="button" tabindex="0" aria-label="Elliot's building kit">
    <g id="e_kitOpen"><rect x="80" y="352" width="80" height="50" rx="4" fill="#3b78b8" class="o"/><g class="t"><rect x="90" y="340" width="20" height="14" fill="#f0b44c"/><rect x="118" y="336" width="14" height="18" fill="#d0602f"/><rect x="140" y="344" width="16" height="10" fill="#3a8f5c"/><rect x="200" y="380" width="18" height="12" fill="#7a5cc2"/><rect x="230" y="372" width="12" height="16" fill="#f0b44c"/></g></g>
    <g id="e_kitShut" class="off"><rect x="80" y="352" width="80" height="50" rx="4" fill="#3b78b8" class="o"/><rect x="80" y="346" width="80" height="12" rx="3" fill="#2c5f93" class="o"/></g>
    <rect class="hit" x="72" y="326" width="180" height="82" fill="transparent"/>
  </g>
</g>

<!-- eb3: the door to the living room -->
<g class="view" id="v-eb3" data-box="ebedroom" data-light="right">
  <g class="hs door" data-id="e_toLiving" role="button" tabindex="0" aria-label="Door to the living room">
    <rect x="110" y="66" width="140" height="294" fill="#fffdf6" class="o"/><rect x="118" y="74" width="124" height="286" fill="#f3eadb"/>
    <path d="M242 74 190 92v250l52 10Z" fill="#e8dcc6" class="t"/><rect x="118" y="310" width="124" height="50" fill="#d2a574"/>
    <text x="154" y="124" text-anchor="middle" font-size="12" fill="#55635d" class="lbl">Living</text><text x="154" y="140" text-anchor="middle" font-size="12" fill="#55635d" class="lbl">room</text>
    <rect class="hit" x="108" y="64" width="144" height="298" fill="transparent"/>
  </g>
  <g><rect x="50" y="100" width="46" height="36" rx="4" fill="#fffdf6" class="o"/><text x="73" y="123" text-anchor="middle" font-size="12" font-weight="700" fill="#c0541f" class="lbl">ELLIOT</text><path d="M56 140c4 20 10 40 17 60" stroke="#c9a24a" stroke-width="1.4" fill="none"/><circle cx="73" cy="200" r="3" fill="#c9a24a"/></g>
  <g><rect x="270" y="280" width="46" height="80" rx="3" fill="#a8744a" class="o"/><g class="t"><rect x="276" y="288" width="34" height="14" fill="#d0602f"/><rect x="276" y="306" width="34" height="14" fill="#3b78b8"/><rect x="276" y="324" width="34" height="14" fill="#f0b44c"/></g></g>
</g>

<!-- eb4: Elliot's workbench under the window -->
<g class="view" id="v-eb4" data-box="ebedroom" data-light="front">
  <clipPath id="glassEb4"><rect x="80" y="78" width="200" height="98"/></clipPath>
  <g><rect x="72" y="70" width="216" height="114" rx="3" fill="#fffdf6" class="o"/><rect x="80" y="78" width="200" height="98" fill="#a9bcc6"/><g clip-path="url(#glassEb4)"><g fill="#8497a2"><rect x="90" y="120" width="30" height="56"/><rect x="130" y="104" width="24" height="72"/><rect x="164" y="128" width="34" height="48"/><rect x="208" y="110" width="26" height="66"/></g><use href="#raindrops" class="rain" x="76" y="72"/><use href="#raindrops" class="rain" x="166" y="66"/></g><line x1="180" y1="78" x2="180" y2="176" stroke="#fffdf6" stroke-width="5"/></g>
  <g class="hs" data-id="e_bench" role="button" tabindex="0" aria-label="Elliot's workbench">
    <ellipse cx="180" cy="440" rx="120" ry="12" fill="#2b2836" opacity=".16" filter="url(#blur6)"/>
    <rect x="80" y="292" width="12" height="120" fill="#8a6440" class="o"/><rect x="268" y="292" width="12" height="120" fill="#8a6440" class="o"/>
    <polygon points="90,250 270,250 286,286 74,286" fill="#c9a26b" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/><rect x="74" y="286" width="212" height="10" fill="#a8744a" stroke="#2b2836" stroke-width="2.2" stroke-linejoin="round"/>
    <g class="t"><rect x="110" y="232" width="50" height="18" rx="3" fill="#d0602f"/><circle cx="120" cy="241" r="4" fill="#f0b44c"/><circle cx="150" cy="241" r="4" fill="#f0b44c"/><path d="M190 246l10-14 10 14M200 232v-10" stroke="#5b6f7a" stroke-width="3" fill="none"/><circle cx="240" cy="240" r="9" fill="none" stroke="#5b6f7a" stroke-width="3"/><path d="M240 231v18M231 240h18" stroke="#5b6f7a" stroke-width="2"/></g>
    <rect class="hit" x="70" y="220" width="220" height="130" fill="transparent"/>
  </g>
</g>
`,
  closeups: `
<div class="overlay closeup" id="kitUI" hidden>
  <p class="otitle">Turn each piece until it fits its shape. Then the lid closes.</p>
  <div class="kit" id="kit"></div>
  <p class="ofb" id="kitFb" aria-live="polite"></p>
  <button class="ob" data-close>Step back</button>
</div>
<div class="overlay closeup" id="batUI" hidden>
  <p class="otitle">Two batteries. The + end goes towards the light.</p>
  <div class="bats" id="bats"></div>
  <p class="ofb" id="batFb" aria-live="polite"></p>
  <div class="row"><button class="ob" id="batTry">Switch on</button><button class="ob" data-close>Step back</button></div>
</div>
`,
  stage: {
    rooms:{ebedroom:{name:'Elliot’s bedroom', into:'your bedroom', views:['eb1','eb2','eb3','eb4']}, living:{name:'Living room', into:'the living room', views:['lr1','lr2','lr3','lr4','lr5','lr6']}, kitchen:{name:'Kitchen', into:'the kitchen', views:['k1','k2','k3','k4']}},
    doors:{e_toLiving:['living','lr3'], toKitchen:['kitchen','k1'], toLivingK:['living','lr6'], toBedroom:['ebedroom','eb1']},
    start:['ebedroom','eb2'],
    intro:'<b>Packing day.</b> Elliot’s building kit will not fit in its box, and his torch has no batteries. Rain drums on the window.',
    hinter:'The moth on Nana’s postcard whispers',
    items:{
      torch:{name:'torch', icon:'<svg viewBox="0 0 40 40"><rect x="6" y="15" width="20" height="10" rx="3" fill="#2f7c83"/><path d="M26 13h6l3-3v20l-3-3h-6z" fill="#5b6f7a"/></svg>'},
      torchOn:{name:'working torch', icon:'<svg viewBox="0 0 40 40"><rect x="6" y="15" width="20" height="10" rx="3" fill="#2f7c83"/><path d="M26 13h6l3-3v20l-3-3h-6z" fill="#5b6f7a"/><path d="M36 14l3-2M36 20h3M36 26l3 2" stroke="#f0b44c" stroke-width="2"/></svg>'},
      batteries:{name:'batteries', icon:'<svg viewBox="0 0 40 40"><rect x="6" y="10" width="22" height="9" rx="2" fill="#5b6f7a" stroke="#2b2836"/><rect x="28" y="12" width="3" height="5" fill="#2b2836"/><rect x="6" y="22" width="22" height="9" rx="2" fill="#5b6f7a" stroke="#2b2836"/><rect x="28" y="24" width="3" height="5" fill="#2b2836"/><text x="10" y="17" font-size="6" fill="#fffdf6" font-family="Verdana">+</text><text x="10" y="29" font-size="6" fill="#fffdf6" font-family="Verdana">+</text></svg>'},
      kitbox:{name:'building kit', icon:'<svg viewBox="0 0 40 40"><rect x="6" y="14" width="28" height="18" rx="2" fill="#3b78b8" stroke="#2b2836"/><rect x="6" y="10" width="28" height="6" rx="2" fill="#2c5f93" stroke="#2b2836"/></svg>'}
    },
    uses:{batteries:'e_torch', torchOn:'e_backpack', kitbox:'e_backpack'},
    spark:S => !S.kitDone ? ['e_kit'] : (!S.gotTorch ? ['e_torch'] : (!S.gotBat ? ['e_drawer'] : (!S.torchOn ? ['e_torch'] : ['e_backpack']))),
    fresh:() => ({kit:[1,2,3,1], kitDone:false, gotTorch:false, mumTip:false, gotBat:false, bat:[1,0], torchOn:false, packed:[]}),
    draw(S){
      tog('e_kitOpen', !S.kitDone); tog('e_kitShut', S.kitDone && !S.packed.includes('kitbox'));
      tog('e_torchArt', !S.gotTorch); tog('e_torchBeam', S.torchOn);
      $('e_packedArt').innerHTML = S.packed.map((it, i) => `<svg x="${206 + i*26}" y="374" width="22" height="22" viewBox="0 0 40 40">${ST.items[it].icon.replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>`).join('');
      // the same flat as Mary's, but Mary's things stay out of Elliot's way
      document.querySelectorAll('.hs.pmoth, .hs[data-id="postcard"], .hs[data-id="keys"], .hs[data-id="paper"], .hs[data-id="boots"]').forEach(el => el.classList.toggle('off', ST.key === 'elliotPacking'));
    },
    act(id, item){
      switch(id){
        case 'e_kit': if (S.kitDone && !S.packed.includes('kitbox') && !S.inv.includes('kitbox')){ add('kitbox'); say('The lid clicks shut. The kit is ready to pack.'); break; } if (S.kitDone) say('The kit is packed away.'); else openKit(); return;
        case 'e_torch':
          if (item === 'batteries'){ openBat(); return; }
          if (S.torchOn) say('The torch, working. Nana said to bring it.');
          else if (S.gotTorch) say('The torch is empty. It needs two batteries, the right way round.');
          else { S.gotTorch = true; add('torch'); say('Elliot’s torch. He shakes it. No batteries. Mum will know where the spares are.'); }
          break;
        case 'e_drawer':
          if (S.gotBat) say('The kitchen drawer. String, rubber bands, and a candle nobody is allowed to touch.');
          else if (!S.mumTip) say('The drawer by the sink is full of everything. Which drawer did Mum mean?');
          else { S.gotBat = true; add('batteries'); $('e_drawerOpen').classList.remove('off'); say('Two batteries, still in their packet. Elliot checks the little + signs.'); }
          break;
        case 'mum':
          if (!S.gotBat){ S.mumTip = true; say('Mum: “Batteries? Second drawer down, by the sink. And take the whole packet, not one.”'); }
          else say('Mum stirs the pot: “Torch working? Good. Backpack packed?”');
          break;
        case 'e_backpack':
          if (item === 'torchOn' || item === 'kitbox'){ S.packed.push(item); use(item); if (S.packed.length === 2){ say('Torch and kit, packed. Elliot zips the bag with a satisfying zzzzip.'); render(); finish(); return; } say(`In goes the ${ST.items[item].name}. One more thing to pack.`); }
          else say('Elliot’s backpack: pants, socks, and room for the important things.');
          break;
        case 'e_bed': say('Dinosaur duvet. Elliot made the bed himself. Sort of.'); break;
        case 'e_bench': say('Elliot’s workbench: a robot with one arm, a screwdriver, and a very organised tin of screws.'); break;
        case 'sink': say('The sink. The drawers are underneath.'); break;
        case 'calendar': say('Tomorrow is circled: FLIGHT! Elliot has drawn a plane on it. And a rocket, for luck.'); break;
        case 'cupboard': say('Elliot’s secret biscuit stash is in here. It is not very secret.'); break;
        case 'fridge': say('The fridge. Elliot’s drawing of a shark is on it. Mum says it is a lovely dolphin.'); break;
        case 'sofa': say('Elliot once lost a sock under here. It is still there.'); break;
        case 'tv': say('No cartoons on packing day, says Mum. Elliot has asked four times.'); break;
        case 'photos': say('Photos of last summer. Jedi is asleep in every one.'); break;
        case 'plant': say('Dad’s big plant. Elliot is not allowed to water it any more.'); break;
        case 'frontdoor': say('The front door. The taxi comes tomorrow.'); break;
        case 'window': say('Rain. In London it will be summer, Mary says, but she also says it might rain there too.'); break;
        case 'fan': say('The ceiling fan. Elliot knows exactly how it works. He has explained it many times.'); break;
        case 'desk': say('Dad’s desk. Not Elliot’s business, says Dad.'); break;
        case 'jar': case 'globe': case 'orchid': say('Nana’s presents are Mary’s job this year.'); break;
      }
      render();
    },
    hints:[
      {goal:() => S.kitDone, tips:['The building kit is all over the rug.','Tap the kit. Each piece turns when you tap it.','Turn every piece until it matches the shape drawn under it.']},
      {goal:() => S.gotTorch, tips:['Nana asked for the torch.','It is on Elliot’s shelf, next to the models.','In Elliot’s bedroom, turn to the shelf and tap the torch.']},
      {goal:() => S.gotBat, tips:['The torch needs batteries. Who knows where the spares live?','Ask Mum in the kitchen. Go through the living room.','Mum says: the drawer by the sink. Tap that drawer in the kitchen.']},
      {goal:() => S.torchOn, tips:['Batteries have a + end and a flat end.','Use the batteries on the torch, then turn each one so + points to the light.','Tap the batteries at the bottom, then the torch. Flip until both + signs point right, then Switch on.']},
      {goal:() => false, tips:['Two things to pack: the working torch and the kit.','The backpack is by Elliot’s bed.','Tap each thing at the bottom, then tap the backpack.']}
    ],
    ending(){
      saveStage('elliotPacking');
      return ['<p class="fade big" style="animation-delay:.2s">Packed!</p>',
        '<p class="fade" style="animation-delay:1.4s">The torch works, the kit is in its box, and the backpack is zipped. Elliot tests the zip six more times.</p>',
        '<p class="fade" style="animation-delay:2.8s">When he switches the torch on under the duvet, a tiny moth shadow flutters across the ceiling. There is no moth in the room.</p>',
        '<p class="fade next" style="animation-delay:4.2s">Next for Elliot: the 14-hour flight.</p>'];
    }
  },
  setup(){
    // The drawer under the sink is Elliot's (Mary's own things in the flat are hidden by draw).
    const k2 = $('v-k2'), ns = 'http://www.w3.org/2000/svg', g = document.createElementNS(ns, 'g');
    g.innerHTML = `<g class="hs" data-id="e_drawer" data-stage="elliotPacking" role="button" tabindex="0" aria-label="Drawers by the sink"><rect x="138" y="290" width="84" height="26" rx="3" fill="#4f6270" class="t"/><rect x="138" y="322" width="84" height="26" rx="3" fill="#3f5260" class="t"/><rect x="168" y="300" width="24" height="5" rx="2" fill="#fffdf6"/><rect x="168" y="332" width="24" height="5" rx="2" fill="#fffdf6"/><g id="e_drawerOpen" class="off"><rect x="134" y="322" width="92" height="30" rx="3" fill="#2b3a44" class="t"/><rect x="150" y="330" width="30" height="14" rx="2" fill="#f0b44c" class="t"/><rect x="186" y="332" width="20" height="10" rx="2" fill="#d0602f" class="t"/></g><rect class="hit" x="132" y="284" width="96" height="70" fill="transparent"/></g>`;
    k2.appendChild(g);
    const L = c => `<svg viewBox="0 0 40 40"><path d="M8 6h12v14h12v14H8Z" fill="${c}" stroke="#2b2836" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
    const COLS = ['#f0b44c','#d0602f','#3a8f5c','#7a5cc2'];
    window.openKit = () => {
      $('kit').innerHTML = S.kit.map((r, i) => `<button data-i="${i}" class="${r === 0 ? 'ok' : ''}" aria-label="Piece ${i+1}"><span style="position:absolute;opacity:.35">${L('transparent')}</span><span style="display:block;transform:rotate(${r*90}deg)">${L(COLS[i])}</span></button>`).join('');
      $('kit').querySelectorAll('button').forEach(b => { b.style.position = 'relative'; b.onclick = () => { const i = +b.dataset.i; S.kit[i] = (S.kit[i] + 1) % 4; openKit(); if (S.kit.every(r => r === 0)){ S.kitDone = true; add('kitbox'); $('kitFb').textContent = 'Every piece fits. The lid closes with a click!'; say('The lid closes. The kit is ready to pack.'); setTimeout(() => { $('kitUI').hidden = true; render(); }, 900); } else $('kitFb').textContent = S.kit.filter(r => r === 0).length + ' of 4 pieces fit.'; }; });
      $('kitUI').hidden = false;
    };
    const BAT = (flip) => `<svg viewBox="0 0 100 24"><rect x="${flip ? 6 : 2}" y="4" width="88" height="16" rx="3" fill="#5b6f7a" stroke="#fffdf6" stroke-width="1.5"/><rect x="${flip ? 2 : 94}" y="8" width="4" height="8" fill="#fffdf6"/><text x="${flip ? 14 : 78}" y="17" font-size="12" font-weight="700" fill="#fffdf6" font-family="Verdana,sans-serif">+</text></svg>`;
    window.openBat = () => {
      $('bats').innerHTML = S.bat.map((f, i) => `<div class="bat"><span class="slot">${i+1}</span><button data-i="${i}" aria-label="Battery ${i+1}, tap to flip">${BAT(f)}</button><span style="color:#f0b44c">→ light</span></div>`).join('');
      $('bats').querySelectorAll('button').forEach(b => b.onclick = () => { S.bat[+b.dataset.i] ^= 1; $('batFb').textContent = ''; openBat(); });
      $('batUI').hidden = false;
    };
    $('batTry').onclick = () => {
      if (S.bat.every(f => f === 0)){ S.torchOn = true; use('batteries'); use('torch'); add('torchOn'); $('batFb').textContent = 'Click. Light!'; setTimeout(() => { $('batUI').hidden = true; say('The torch shines a bright circle on the ceiling. Elliot is very pleased with himself.'); render(); }, 800); }
      else $('batFb').textContent = 'Nothing. A battery is the wrong way round. The + must point to the light.';
    };
  }
});

/* ---------- Stage 3: the flight (the same cabin as Mary, Elliot's side of it) ---------- */
registerStage('elliotFlight', {
  views: `
<g class="view" id="v-ef-extra">
</g>
`,
  closeups: `
<div class="overlay closeup" id="plugUI" hidden>
  <p class="otitle">The headphone socket is round. Which plug fits?</p>
  <div class="tray" id="plugs"></div>
  <p class="ofb" id="plugFb" aria-live="polite"></p>
  <button class="ob" data-close>Step back</button>
</div>
`,
  stage: {
    rooms:{cabin:{name:'The plane', into:'the cabin', views:['f1','f2','f3','f4']}},
    doors:{},
    start:['cabin','f1'],
    intro:'<b>Hour nine of fourteen.</b> Elliot’s headphones will not work, and the bumpy bit is coming. Something rolls off the tray.',
    hinter:'The moth in the card whispers',
    items:{spoon:{name:'spoon', icon:'<svg viewBox="0 0 40 40"><ellipse cx="14" cy="14" rx="7" ry="9" fill="#c9d1d8" stroke="#2b2836"/><path d="M18 20l14 14" stroke="#c9d1d8" stroke-width="5" stroke-linecap="round"/><path d="M18 20l14 14" stroke="#2b2836" stroke-width="1" opacity=".5"/></svg>'}, car:{name:'toy car', icon:'<svg viewBox="0 0 40 40"><path d="M6 24l6-10h16l6 10v6H6Z" fill="#d0602f" stroke="#2b2836" stroke-width="1.5"/><circle cx="12" cy="30" r="4" fill="#2b2836"/><circle cx="28" cy="30" r="4" fill="#2b2836"/><rect x="14" y="16" width="12" height="6" fill="#bfe0ea"/></svg>'}},
    uses:{spoon:'e_wheel'},
    spark:S => !S.plug ? ['e_socket'] : (!S.carLost ? ['e_tray'] : (!S.carBack ? ['e_carUnder'] : (!S.wheel ? (S.inv.includes('spoon') ? ['e_wheel'] : ['e_tray']) : []))),
    fresh:() => ({plug:false, carLost:false, carBack:false, wheel:false, spoonTaken:false}),
    draw(S){
      document.querySelectorAll('[data-id="fl_pocket"],[data-id="fl_screen"],[data-id="fl_watch"],[data-id="fl_map"],[data-id="fl_kids"]').forEach(el => el.classList.toggle('off', ST.key === 'elliotFlight'));
      tog('e_carOnTray', !S.carLost); tog('e_carUnderArt', S.carLost && !S.carBack); tog('e_spoonArt', !S.spoonTaken);
    },
    act(id, item){
      switch(id){
        case 'e_socket': if (S.plug) say('The headphones work. Elliot is on his third film.'); else openPlug(); return;
        case 'e_tray':
          if (!S.carLost){ if (!S.plug) say('Elliot’s tray: a snack, a spoon, and his red toy car. He should probably hold onto that.'); else { S.carLost = true; say('BUMP! The plane wobbles. The car rolls off the tray, down the aisle, and out of sight. Elliot gasps.'); } }
          else if (!S.spoonTaken){ S.spoonTaken = true; add('spoon'); say('Elliot takes the spoon. A spoon is a very useful tool.'); }
          else say('Just the snack tray now. Elliot has eaten the snack.');
          break;
        case 'e_carUnder': if (S.carLost && !S.carBack){ S.carBack = true; add('car'); say('There! Under the seat at the back. Elliot crawls, grabs it, and bumps his head only a little.'); if (S.wheel && S.plug){ render(); finish(); return; } } break;
        case 'e_wheel':
          if (S.wheel) say('The trolley rolls straight now. Priya keeps saying thank you.');
          else if (item === 'spoon'){ S.wheel = true; use('spoon'); say('Elliot wedges the spoon under the wheel and levers it straight. Priya: “You are a genius.”'); if (S.carBack && S.plug){ render(); finish(); return; } }
          else say('The trolley’s wheel is bent sideways. Priya sighs. “If only I had a lever.”');
          break;
        case 'fl_trolley': say('Priya pushes the snack trolley. It wobbles. One wheel is bent.'); break;
        case 'fl_window': say('Clouds, clouds, and a wing. Elliot has counted the rivets. There are lots.'); break;
        case 'e_kidsE': say('Mary is reading. Zaina is asleep with Peanut. Neither of them wants to see the rivets.'); break;
        case 'fl_toilet': say('The toilet. Elliot has pressed the big button four times. It is very loud.'); break;
      }
      render();
    },
    hints:[
      {goal:() => S.plug, tips:['The headphones need to go into a socket on the armrest.','The socket is round. Only one plug is round.','Tap the armrest, then tap the round plug.']},
      {goal:() => S.carLost, tips:['The bumpy bit is coming. Better check the tray.','Tap the tray in front of Elliot.','Tap the tray. Then hold on.']},
      {goal:() => S.carBack, tips:['The car rolled down the aisle, towards the back.','Turn to the back of the cabin and look low down, under the seats.','Face the back of the cabin and tap the red car under the seat.']},
      {goal:() => S.wheel, tips:['Priya’s trolley wobbles. A wheel is bent. She needs a lever.','A spoon can be a lever. There was one on Elliot’s tray.','Take the spoon from the tray, then tap it at the bottom and tap the trolley wheel.']}
    ],
    ending(){
      saveStage('elliotFlight');
      return ['<p class="fade big" style="animation-delay:.2s">Wheels down.</p>',
        '<p class="fade" style="animation-delay:1.4s">Priya gives Elliot two extra biscuits for fixing the trolley. He gives one to Zaina. Eventually.</p>',
        '<p class="fade" style="animation-delay:2.8s">Out of the window, as the plane comes in over the trees, a little golden light flickers in the woods. Elliot is sure of it.</p>',
        '<p class="fade next" style="animation-delay:4.2s">That is the end of Part 1: Leaving Singapore. Enfield is next.</p>'];
    }
  },
  setup(){
    // Elliot's things, drawn into the shared cabin views
    const f1 = $('v-f1'), f2 = $('v-f2'), f3 = $('v-f3'), f4 = $('v-f4');
    const ns = 'http://www.w3.org/2000/svg';
    const addTo = (view, markup) => { const g = document.createElementNS(ns, 'g'); g.innerHTML = markup; view.appendChild(g); };
    addTo(f1, `<g class="hs" data-id="e_tray" data-stage="elliotFlight" role="button" tabindex="0" aria-label="Elliot's tray table"><rect x="92" y="296" width="176" height="60" rx="6" fill="#c9d1d8" class="o"/><rect x="100" y="304" width="76" height="40" rx="4" fill="#fffdf6" class="t"/><g class="t"><circle cx="118" cy="322" r="9" fill="#e0a84a"/><rect x="134" y="312" width="30" height="12" rx="2" fill="#d0602f"/></g><g id="e_spoonArt"><ellipse cx="150" cy="336" rx="6" ry="3.5" fill="#c9d1d8" class="t"/><path d="M156 336h14" stroke="#c9d1d8" stroke-width="3" stroke-linecap="round"/></g><g id="e_carOnTray"><path d="M196 330l8-12h26l8 12v8h-42Z" fill="#d0602f" class="o"/><circle cx="206" cy="340" r="5" fill="#2b2836"/><circle cx="228" cy="340" r="5" fill="#2b2836"/><rect x="206" y="320" width="18" height="8" fill="#bfe0ea"/></g><rect class="hit" x="90" y="292" width="180" height="68" fill="transparent"/></g>
    <g class="hs" data-id="e_socket" data-stage="elliotFlight" role="button" tabindex="0" aria-label="Armrest with the headphone socket"><rect x="20" y="372" width="70" height="36" rx="8" fill="#3f5a6b" class="o"/><circle cx="44" cy="390" r="6" fill="#2b2836" class="t"/><circle cx="44" cy="390" r="2.5" fill="#8d9aa5"/><rect x="58" y="384" width="22" height="12" rx="2" fill="#5b7e93" class="t"/><path d="M50 372c-6-14-2-26 10-30" fill="none" stroke="#2b2836" stroke-width="3" stroke-linecap="round"/><rect class="hit" x="16" y="340" width="80" height="72" fill="transparent"/></g>`);
    addTo(f2, `<g class="hs" data-id="e_wheel" data-stage="elliotFlight" role="button" tabindex="0" aria-label="The trolley's bent wheel"><circle cx="150" cy="396" r="9" fill="#2b2836" transform="rotate(25 150 396)" class="t"/><rect class="hit" x="128" y="376" width="46" height="40" fill="transparent"/></g>`);
    addTo(f3, `<g class="hs" data-id="e_kidsE" data-stage="elliotFlight" role="button" tabindex="0" aria-label="Mary and Zaina"><g fill="#3f5a6b" class="o"><rect x="60" y="150" width="110" height="210" rx="16"/><rect x="190" y="150" width="110" height="210" rx="16"/></g><g fill="#4a6b7e"><rect x="70" y="160" width="90" height="190" rx="12"/><rect x="200" y="160" width="90" height="190" rx="12"/></g>
      <path d="M86 300c0-18 12-28 29-28s29 10 29 28v60H86Z" fill="#6d4fb8" class="o"/><rect x="106" y="252" width="18" height="24" fill="#c9925f"/><path d="M90 250c-4-30 8-44 24-44s28 14 24 44c-2 10-6 16-6 30H96c0-14-4-20-6-30Z" fill="#3b2a20" class="o"/><ellipse cx="115" cy="238" rx="19" ry="21" fill="#c9925f" class="o"/><path d="M96 234c2-12 10-20 19-20s17 8 19 20c-4-6-10-9-19-9s-15 3-19 9Z" fill="#3b2a20"/><circle cx="108" cy="240" r="2.4" fill="#2b2836"/><circle cx="122" cy="240" r="2.4" fill="#2b2836"/><path d="M110 250c3 2 7 2 10 0" fill="none" stroke="#2b2836" stroke-width="1.4" stroke-linecap="round"/><g transform="rotate(-8 118 296)"><rect x="96" y="284" width="44" height="30" rx="2" fill="#fffdf6" class="o"/><rect x="96" y="284" width="44" height="6" fill="#d0602f"/><path d="M102 298h32M102 304h24" stroke="#9aa5ab" stroke-width="1.6"/></g>
      <path d="M220 306c0-16 10-26 25-26s25 10 25 26v54h-50Z" fill="#27794c" class="o"/><rect x="236" y="262" width="16" height="22" fill="#c9925f"/><circle cx="224" cy="246" r="9" fill="#3b2a20" class="o"/><circle cx="266" cy="246" r="9" fill="#3b2a20" class="o"/><ellipse cx="245" cy="248" rx="18" ry="18" fill="#c9925f" class="o"/><path d="M227 246c0-12 8-20 18-20s18 8 18 20c-4-6-9-8-12-8-3 3-9 3-12 0-3 0-8 2-12 8Z" fill="#3b2a20"/><path d="M237 250c2-2 5-2 7 0M248 250c2-2 5-2 7 0" fill="none" stroke="#2b2836" stroke-width="1.6" stroke-linecap="round"/><path d="M241 258c3 2 6 2 9 0" fill="none" stroke="#2b2836" stroke-width="1.4" stroke-linecap="round"/><g><ellipse cx="250" cy="308" rx="16" ry="12" fill="#9aa5ab" class="o"/><circle cx="236" cy="302" r="7" fill="#8a97a3" class="o"/><path d="M262 310c8 2 10 10 4 16" fill="none" stroke="#9aa5ab" stroke-width="5" stroke-linecap="round" class="t"/><circle cx="252" cy="305" r="1.4" fill="#2b2836"/></g>
      <rect class="hit" x="56" y="146" width="248" height="216" fill="transparent"/></g>`);
    addTo(f4, `<g class="hs" data-id="e_carUnder" data-stage="elliotFlight" role="button" tabindex="0" aria-label="Something red under a seat"><g id="e_carUnderArt"><path d="M262 340l6-9h20l6 9v6h-32Z" fill="#d0602f" class="o"/><circle cx="270" cy="347" r="4" fill="#2b2836"/><circle cx="286" cy="347" r="4" fill="#2b2836"/></g><rect class="hit" x="254" y="326" width="52" height="34" fill="transparent"/></g>`);
    window.openPlug = () => {
      const P = [['square','<svg viewBox="0 0 40 40"><rect x="12" y="6" width="16" height="16" fill="#e8dcc6"/><rect x="18" y="22" width="4" height="12" fill="#e8dcc6"/></svg>'],['round','<svg viewBox="0 0 40 40"><circle cx="20" cy="14" r="8" fill="#e8dcc6"/><rect x="18" y="22" width="4" height="12" fill="#e8dcc6"/></svg>'],['triangle','<svg viewBox="0 0 40 40"><path d="M20 4l10 18H10Z" fill="#e8dcc6"/><rect x="18" y="22" width="4" height="12" fill="#e8dcc6"/></svg>']];
      $('plugs').innerHTML = P.map(([n, svg]) => `<button class="piece" data-n="${n}" aria-label="${n} plug">${svg}</button>`).join('');
      $('plugs').querySelectorAll('.piece').forEach(b => b.onclick = () => {
        if (b.dataset.n === 'round'){ S.plug = true; $('plugFb').textContent = 'Click. Music!'; setTimeout(() => { $('plugUI').hidden = true; say('The round plug slides in. Sound! Elliot picks a film about a dog who drives a bus.'); render(); }, 700); }
        else $('plugFb').textContent = `The ${b.dataset.n} plug will not go in a round hole.`;
      });
      $('plugFb').textContent = ''; $('plugUI').hidden = false;
    };
  }
});
