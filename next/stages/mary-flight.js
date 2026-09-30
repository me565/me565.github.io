/* Mary, stage 3: the 14-hour flight. See STORY.md. */
registerStage('maryFlight', {
  css: `
.note.mirror{transform:rotate(-1deg) scaleX(-1)}
.watch{display:flex;align-items:center;gap:clamp(6px,2cqw,10px);background:#fffdf6;color:#1d2629;border-radius:14px;padding:clamp(8px,3cqw,14px) clamp(10px,4cqw,18px);border:3px solid #6d4fb8}
.watch .digits{font-family:"Atkinson Hyperlegible",Verdana,sans-serif;font-weight:700;font-size:2.2em;font-variant-numeric:tabular-nums;letter-spacing:.06em}
.watch .col{display:flex;flex-direction:column;gap:4px}
.wb{min-width:44px;min-height:40px;border-radius:10px;border:2px solid #6d4fb8;background:#e7e0f5;color:#1d2629;font:inherit;font-size:1.1em;font-weight:700;cursor:pointer}
.xw{display:flex;flex-direction:column;gap:clamp(4px,1.6cqw,8px);width:100%;max-height:62cqh;overflow:auto;font-size:.9em}
.xw .clue{display:grid;grid-template-columns:auto 1fr;gap:3px 8px;align-items:center;text-align:left;font-size:.9em}
.xw .clue .q{grid-column:1/-1;color:#fffdf6}
.xw .letters{display:flex;gap:4px}
.xw .cell{width:1.5em;height:1.5em;display:grid;place-items:center;background:#fffdf6;color:#2b3431;font-weight:700;border-radius:3px}
.xw .cell.gold{background:#f0b44c}
.xw .opts{display:flex;gap:6px;flex-wrap:wrap}
.xw .opts button{font:inherit;font-size:.9em;min-height:34px;padding:.1em .6em;border-radius:999px;border:2px solid #e8dcc6;background:transparent;color:#fffdf6;cursor:pointer}
.xw .opts button.on{background:#f0b44c;color:#2b3431;border-color:#f0b44c}
.mapz{width:100%;max-width:92cqw;height:auto;display:block;border-radius:8px}
`,
  boxes: {
    cabin:{ceil:['#f2f4f6','#dfe4e9'], back:['#eef1f4','#dde3e8'], left:['#c9d1d8','#d7dee4'], right:['#e6ebef','#d9e0e6'], floor:['#5b6f7a','#3d4a55'], boards:'carpet', skirt:['#8d9aa5','#9fb0bb','#7f8d98'], lamp:false}
  },
  views: `
<!-- f1: Mary's window seat: the seat in front, its screen and pocket, and her watch -->
<g class="view" id="v-f1" data-box="cabin" data-light="left">
  <g><rect x="40" y="62" width="280" height="40" fill="#d7dee4" class="o"/><rect x="40" y="62" width="140" height="40" fill="none" class="t"/><rect x="100" y="94" width="18" height="6" rx="2" fill="#8d9aa5"/><rect x="240" y="94" width="18" height="6" rx="2" fill="#8d9aa5"/></g>
  <g class="hs" data-id="fl_window" role="button" tabindex="0" aria-label="Window">
    <path d="M6 150c0-10 6-16 14-16h6c8 0 14 6 14 16v56c0 10-6 16-14 16h-6c-8 0-14-6-14-16Z" fill="#fffdf6" class="o"/>
    <path d="M12 154c0-6 4-10 9-10h4c5 0 9 4 9 10v48c0 6-4 10-9 10h-4c-5 0-9-4-9-10Z" fill="#f7c48a"/>
    <path d="M12 190c8-4 16-2 22 2v10c0 6-4 10-9 10h-4c-5 0-9-4-9-10Z" fill="#fbe0b8"/>
    <g fill="#fffdf6" opacity=".9"><ellipse cx="22" cy="182" rx="9" ry="3"/><ellipse cx="28" cy="170" rx="6" ry="2.4"/></g>
    <circle cx="30" cy="160" r="4" fill="#fbe78a"/>
    <rect class="hit" x="2" y="130" width="42" height="96" fill="transparent"/>
  </g>
  <g><rect x="72" y="110" width="216" height="250" rx="16" fill="#3f5a6b" class="o"/><rect x="82" y="120" width="196" height="230" rx="12" fill="#4a6b7e"/><rect x="72" y="110" width="216" height="26" rx="12" fill="#5b7e93"/></g>
  <g class="hs" data-id="fl_screen" role="button" tabindex="0" aria-label="Seat-back screen">
    <rect x="104" y="140" width="152" height="100" rx="6" fill="#2b2836" class="o"/>
    <rect id="fl_screenGlass" x="110" y="146" width="140" height="88" rx="4" fill="#0f1320"/>
    <g id="fl_screenInfo" class="off"><rect x="110" y="146" width="140" height="88" rx="4" fill="#1c4e53"/><text x="180" y="176" text-anchor="middle" font-size="9" font-weight="700" fill="#fffdf6" class="lbl">SET YOUR WATCH</text><text x="180" y="192" text-anchor="middle" font-size="8" fill="#bfe0ea" class="lbl">to London time</text><text x="180" y="214" text-anchor="middle" font-size="8" fill="#f0b44c" class="lbl">then the map unlocks</text></g>
    <g id="fl_screenMap" class="off"><rect x="110" y="146" width="140" height="88" rx="4" fill="#1c3f6b"/><path d="M122 214c20-30 44-42 106-50" fill="none" stroke="#f0b44c" stroke-width="1.6" stroke-dasharray="3 3"/><circle cx="226" cy="164" r="3" fill="#d0602f"/><circle cx="124" cy="212" r="3" fill="#f0b44c"/><text x="180" y="226" text-anchor="middle" font-size="8" fill="#bfe0ea" class="lbl">Landing soon</text></g>
    <path d="M120 156l30 0-14 22Z" fill="#fffdf6" opacity=".08"/>
    <rect class="hit" x="100" y="136" width="160" height="108" fill="transparent"/>
  </g>
  <g class="hs" data-id="fl_pocket" role="button" tabindex="0" aria-label="Seat pocket">
    <rect x="96" y="272" width="168" height="72" rx="8" fill="#3a5464" class="o"/>
    <g id="fl_pocketStuff"><rect x="118" y="252" width="40" height="30" rx="2" fill="#fffdf6" class="t" transform="rotate(-6 138 267)"/><rect x="164" y="248" width="60" height="34" rx="2" fill="#d0602f" class="t"/><text x="194" y="270" text-anchor="middle" font-size="9" font-weight="700" fill="#fffdf6" class="lbl">SKY MAG</text><rect x="222" y="256" width="30" height="26" rx="2" fill="#bfe0ea" class="t" transform="rotate(5 237 269)"/></g>
    <rect x="96" y="272" width="168" height="72" rx="8" fill="#2f4553" class="o"/><path d="M96 280h168" stroke="#5b7e93" stroke-width="3"/>
    <rect class="hit" x="92" y="242" width="176" height="106" fill="transparent"/>
  </g>
  <g><rect x="118" y="244" width="124" height="10" rx="3" fill="#8d9aa5" class="t"/><rect x="172" y="240" width="16" height="10" rx="3" fill="#f0b44c" class="t"/></g>
  <g class="hs" data-id="fl_watch" role="button" tabindex="0" aria-label="Mary's watch" transform="translate(-30 -22)">
    <rect x="252" y="368" width="88" height="40" rx="10" fill="#3f5a6b" class="o"/>
    <path d="M262 402c0-18 10-30 26-30 20 0 34 8 44 24v18H262Z" fill="#c9925f" class="o"/>
    <g class="t"><path d="M290 400c6-10 14-14 22-12M300 402c6-8 14-10 20-8" fill="none" stroke="#a8744a" stroke-width="1.4"/></g>
    <rect x="270" y="380" width="30" height="20" rx="6" fill="#6d4fb8" class="o"/><rect x="274" y="384" width="22" height="12" rx="3" fill="#fffdf6"/><text id="fl_watchFace" x="285" y="393.5" text-anchor="middle" font-size="7.5" font-weight="700" fill="#2b2836" class="lbl">13:40</text>
    <rect class="hit" x="252" y="364" width="84" height="46" fill="transparent"/>
  </g>
</g>

<!-- f2: forward down the aisle: the galley curtain and the snack trolley -->
<g class="view" id="v-f2" data-box="cabin" data-light="none">
  <g><rect x="40" y="62" width="120" height="40" fill="#d7dee4" class="o"/><rect x="200" y="62" width="120" height="40" fill="#d7dee4" class="o"/><rect x="160" y="62" width="40" height="300" fill="#e6ebef"/></g>
  <g fill="#4a6b7e" class="o"><rect x="44" y="200" width="60" height="120" rx="8"/><rect x="108" y="200" width="46" height="120" rx="8"/><rect x="206" y="200" width="46" height="120" rx="8"/><rect x="256" y="200" width="60" height="120" rx="8"/></g>
  <g fill="#5b7e93"><rect x="44" y="200" width="60" height="20" rx="8"/><rect x="108" y="200" width="46" height="20" rx="8"/><rect x="206" y="200" width="46" height="20" rx="8"/><rect x="256" y="200" width="60" height="20" rx="8"/></g>
  <g><rect x="160" y="102" width="40" height="150" fill="#3f8f96" class="o"/><path d="M164 106v146M172 106v146M180 106v146M188 106v146M196 106v146" stroke="#2f7c83" stroke-width="1"/></g>
  <g class="hs" data-id="fl_trolley" role="button" tabindex="0" aria-label="Flight attendant and the snack trolley">
    <ellipse cx="180" cy="424" rx="60" ry="8" fill="#2b2836" opacity=".18" filter="url(#blur6)"/>
    <rect x="140" y="270" width="80" height="120" rx="4" fill="#9aa5ab" class="o"/><rect x="146" y="280" width="68" height="30" rx="2" fill="#8d9aa5" class="t"/><rect x="146" y="320" width="68" height="30" rx="2" fill="#8d9aa5" class="t"/><rect x="146" y="360" width="68" height="24" rx="2" fill="#8d9aa5" class="t"/>
    <g class="t"><rect x="150" y="256" width="20" height="16" rx="2" fill="#d0602f"/><rect x="174" y="252" width="18" height="20" rx="2" fill="#f0b44c"/><rect x="196" y="258" width="18" height="14" rx="2" fill="#3b78b8"/></g>
    <circle cx="150" cy="396" r="7" fill="#2b2836"/><circle cx="210" cy="396" r="7" fill="#2b2836"/>
    <!-- the attendant, behind the trolley -->
    <path d="M198 270c0-20 14-30 32-30s32 10 32 30v20h-64Z" fill="#2f7c83" class="o"/>
    <rect x="216" y="222" width="28" height="22" fill="#c9925f"/>
    <ellipse cx="230" cy="206" rx="19" ry="21" fill="#c9925f" class="o"/>
    <path d="M211 202c0-14 8-22 19-22s19 8 19 22c-4-6-10-9-19-9s-15 3-19 9Z" fill="#2b2836"/><path d="M244 190c8 2 12 10 10 22" fill="none" stroke="#2b2836" stroke-width="5" stroke-linecap="round"/>
    <circle cx="224" cy="208" r="2" fill="#2b2836"/><circle cx="236" cy="208" r="2" fill="#2b2836"/><path d="M224 216c3 3 9 3 12 0" fill="none" stroke="#2b2836" stroke-width="1.4" stroke-linecap="round"/>
    <rect x="216" y="250" width="22" height="8" rx="2" fill="#fffdf6" class="t"/><text x="227" y="256.5" text-anchor="middle" font-size="5" font-weight="700" fill="#2f7c83" class="lbl">PRIYA</text>
    <rect class="hit" x="136" y="176" width="130" height="230" fill="transparent"/>
  </g>
</g>

<!-- f3: across the aisle: Elliot and Zaina, fast asleep -->
<g class="view" id="v-f3" data-box="cabin" data-light="right">
  <g><rect x="40" y="62" width="280" height="40" fill="#d7dee4" class="o"/><rect x="60" y="94" width="18" height="6" rx="2" fill="#8d9aa5"/><rect x="200" y="94" width="18" height="6" rx="2" fill="#8d9aa5"/></g>
  <path d="M322 150c0-10 6-16 14-16h6c8 0 14 6 14 16v56c0 10-6 16-14 16h-6c-8 0-14-6-14-16Z" fill="#fffdf6" class="o"/><path d="M328 154c0-6 4-10 9-10h4c5 0 9 4 9 10v48c0 6-4 10-9 10h-4c-5 0-9-4-9-10Z" fill="#f7c48a"/>
  <g class="hs" data-id="fl_kids" role="button" tabindex="0" aria-label="Elliot and Zaina, asleep">
    <g fill="#3f5a6b" class="o"><rect x="60" y="150" width="110" height="210" rx="16"/><rect x="190" y="150" width="110" height="210" rx="16"/></g>
    <g fill="#4a6b7e"><rect x="70" y="160" width="90" height="190" rx="12"/><rect x="200" y="160" width="90" height="190" rx="12"/></g>
    <!-- Elliot -->
    <path d="M86 300c0-18 12-28 29-28s29 10 29 28v60H86Z" fill="#c0541f" class="o"/>
    <rect x="106" y="252" width="18" height="24" fill="#c9925f"/>
    <ellipse cx="115" cy="238" rx="19" ry="21" fill="#c9925f" class="o"/>
    <path d="M96 234c0-14 8-24 19-24 6 0 8-4 12-4 4 4 8 10 8 28-4-6-12-8-20-8-8 0-14 2-19 8Z" fill="#3b2a20" class="o"/>
    <path d="M94 226c-6-2-8-10-4-14M136 226c6-2 8-10 4-14" fill="none" stroke="#2b2836" stroke-width="5" stroke-linecap="round"/><rect x="88" y="222" width="10" height="16" rx="4" fill="#d0602f" class="t"/><rect x="132" y="222" width="10" height="16" rx="4" fill="#d0602f" class="t"/>
    <path d="M106 240c2-2 5-2 7 0M118 240c2-2 5-2 7 0" fill="none" stroke="#2b2836" stroke-width="1.6" stroke-linecap="round"/><path d="M110 250c3 2 7 2 10 0" fill="none" stroke="#2b2836" stroke-width="1.4" stroke-linecap="round"/>
    <!-- Zaina, hugging Peanut -->
    <path d="M220 306c0-16 10-26 25-26s25 10 25 26v54h-50Z" fill="#27794c" class="o"/>
    <rect x="236" y="262" width="16" height="22" fill="#c9925f"/>
    <circle cx="224" cy="246" r="9" fill="#3b2a20" class="o"/><circle cx="266" cy="246" r="9" fill="#3b2a20" class="o"/>
    <ellipse cx="245" cy="248" rx="18" ry="18" fill="#c9925f" class="o"/>
    <path d="M227 246c0-12 8-20 18-20s18 8 18 20c-4-6-9-8-12-8-3 3-9 3-12 0-3 0-8 2-12 8Z" fill="#3b2a20"/>
    <path d="M237 250c2-2 5-2 7 0M248 250c2-2 5-2 7 0" fill="none" stroke="#2b2836" stroke-width="1.6" stroke-linecap="round"/><path d="M241 258c3 2 6 2 9 0" fill="none" stroke="#2b2836" stroke-width="1.4" stroke-linecap="round"/>
    <g><ellipse cx="250" cy="308" rx="16" ry="12" fill="#9aa5ab" class="o"/><circle cx="236" cy="302" r="7" fill="#8a97a3" class="o"/><path d="M262 310c8 2 10 10 4 16" fill="none" stroke="#9aa5ab" stroke-width="5" stroke-linecap="round" class="t"/><circle cx="252" cy="305" r="1.4" fill="#2b2836"/></g>
    <path d="M198 292h60c8 0 12 4 12 12v56h-72Z" fill="#7fb5c9" opacity=".85" class="t"/>
    <rect class="hit" x="56" y="146" width="248" height="216" fill="transparent"/>
  </g>
</g>

<!-- f4: back down the aisle: the big screen with the flight map -->
<g class="view" id="v-f4" data-box="cabin" data-light="none">
  <g><rect x="40" y="62" width="120" height="40" fill="#d7dee4" class="o"/><rect x="200" y="62" width="120" height="40" fill="#d7dee4" class="o"/><rect x="160" y="62" width="40" height="300" fill="#e6ebef"/></g>
  <g fill="#4a6b7e" class="o"><rect x="44" y="210" width="60" height="120" rx="8"/><rect x="108" y="210" width="46" height="120" rx="8"/><rect x="206" y="210" width="46" height="120" rx="8"/><rect x="256" y="210" width="60" height="120" rx="8"/></g>
  <g class="hs" data-id="fl_map" role="button" tabindex="0" aria-label="The flight map on the big screen">
    <rect x="112" y="108" width="136" height="90" rx="6" fill="#2b2836" class="o"/>
    <g id="fl_bigLocked"><rect x="118" y="114" width="124" height="78" rx="4" fill="#1c4e53"/><text x="180" y="148" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fffdf6" class="lbl">FLIGHT MAP</text><text x="180" y="164" text-anchor="middle" font-size="7.5" fill="#bfe0ea" class="lbl">Set your watch to London</text><text x="180" y="176" text-anchor="middle" font-size="7.5" fill="#bfe0ea" class="lbl">time to unlock</text></g>
    <g id="fl_bigMap" class="off"><rect x="118" y="114" width="124" height="78" rx="4" fill="#1c3f6b"/><path d="M130 180c20-30 44-42 96-50" fill="none" stroke="#f0b44c" stroke-width="1.6" stroke-dasharray="3 3"/><circle cx="226" cy="130" r="3" fill="#d0602f"/><circle cx="132" cy="178" r="3" fill="#f0b44c"/><text x="180" y="188" text-anchor="middle" font-size="7" fill="#bfe0ea" class="lbl">Tap to look closer</text></g>
    <rect class="hit" x="108" y="104" width="144" height="98" fill="transparent"/>
  </g>
  <g class="hs" data-id="fl_toilet" role="button" tabindex="0" aria-label="Toilet sign">
    <rect x="160" y="212" width="40" height="150" fill="#c9d1d8" class="o"/><rect x="166" y="230" width="28" height="22" rx="3" fill="#3a8f5c" class="o"/><text x="180" y="245" text-anchor="middle" font-size="7" font-weight="700" fill="#fffdf6" class="lbl">FREE</text><circle cx="180" cy="300" r="4" fill="#8d9aa5" class="t"/>
    <rect class="hit" x="158" y="210" width="44" height="100" fill="transparent"/>
  </g>
  <g><path d="M260 240c0-16 10-24 24-24s24 8 24 24v14h-48Z" fill="#7a5cc2" class="o"/><ellipse cx="284" cy="200" rx="16" ry="17" fill="#c9925f" class="o"/><rect x="266" y="192" width="36" height="12" rx="4" fill="#2b2836" class="t"/><path d="M270 176c4-6 24-6 28 0" fill="none" stroke="#3b2a20" stroke-width="6" stroke-linecap="round"/><text x="284" y="168" text-anchor="middle" font-size="8" fill="#8d9aa5" class="lbl">z z z</text></g>
</g>
`,
  closeups: `
<div class="overlay closeup" id="watchUI" hidden>
  <p class="otitle">Mary's watch. Set it to London time.</p>
  <div class="watch"><div class="col"><button class="wb" id="wHup" aria-label="Hour up">+</button><button class="wb" id="wHdn" aria-label="Hour down">−</button></div><span class="digits" id="wDigits">13:40</span><div class="col"><button class="wb" id="wMup" aria-label="Minutes up">+</button><button class="wb" id="wMdn" aria-label="Minutes down">−</button></div></div>
  <p class="ofb" id="watchFb" aria-live="polite"></p>
  <div class="row"><button class="ob" id="watchSet">Set</button><button class="ob" data-close>Step back</button></div>
</div>
<div class="overlay closeup" id="mapUI" hidden>
  <p class="otitle">Singapore to London</p>
  <svg class="mapz" viewBox="0 0 220 140" aria-label="A map of the route from Singapore to London">
    <rect width="220" height="140" rx="6" fill="#1c3f6b"/>
    <g fill="#2f6b8a"><path d="M14 40c20-14 40-10 56 0s30 6 40 20-6 30-20 24-30 6-46 0-30-30-30-44Z"/><path d="M120 24c16-8 40-6 60 4s26 24 12 34-30-2-46 6-30 6-40-6 4-30 14-38Z"/><path d="M150 96c10-8 26-8 36 0s6 22-6 24-24-4-30-24Z"/></g>
    <path d="M186 112C160 80 110 44 34 36" fill="none" stroke="#f0b44c" stroke-width="2" stroke-dasharray="4 4"/>
    <circle cx="186" cy="112" r="4" fill="#d0602f" class="t"/><text x="186" y="128" text-anchor="middle" font-size="8" fill="#fffdf6" class="lbl">Singapore</text>
    <path d="M34 36l2-6 2 6 6 2-6 2-2 6-2-6-6-2Z" fill="#f0b44c" class="t"/><text x="34" y="54" text-anchor="middle" font-size="8" fill="#fffdf6" class="lbl">London</text>
    <path id="mapPlane" d="M120 66l10-4 6 2-4 4 8 2-12 3-6-3Z" fill="#fffdf6" class="t"/>
    <g id="mapMoth" style="cursor:pointer"><circle cx="52" cy="22" r="11" fill="#ffd977" opacity=".35"/><path d="M52 22c-3-5-9-5-9-1 0 3 6 3 9 1 3 2 9 2 9-1 0-4-6-4-9 1z" fill="#f0b44c" class="t"/><rect x="38" y="8" width="28" height="28" fill="transparent"/></g>
  </svg>
  <p class="ofb" id="mapFb" aria-live="polite">A tiny moth is drawn beside London, in felt tip.</p>
  <button class="ob" data-close>Step back</button>
</div>
<div class="overlay closeup" id="xwUI" hidden>
  <p class="otitle" style="font-size:.95em">Sky Mag crossword. Gold squares spell a word.</p>
  <div class="xw" id="xw"></div>
  <p class="ofb" id="xwFb" aria-live="polite"></p>
  <button class="ob" data-close>Step back</button>
</div>
`,
  stage: {
    rooms:{cabin:{name:'The plane', into:'the cabin', views:['f1','f2','f3','f4']}},
    doors:{},
    start:['cabin','f1'],
    intro:'<b>Hour thirteen of fourteen.</b> Elliot and Zaina are asleep. Mary is not. Something in the seat pocket is not the usual magazine.',
    hinter:'The moth on the postcard whispers',
    items:{
      note:{name:'strange note', icon:'<svg viewBox="0 0 40 40"><rect x="8" y="7" width="24" height="28" rx="2" fill="#fffdf6" stroke="#6d4fb8" stroke-width="2" transform="rotate(-6 20 21)"/><path d="M13 16h14M13 22h14M13 28h9" stroke="#6d4fb8" stroke-width="2" transform="rotate(-6 20 21) scale(-1 1) translate(-40 0)"/></svg>', open:() => openNote('noteMirror', true)},
      infocard:{name:'flight card', icon:'<svg viewBox="0 0 40 40"><rect x="6" y="9" width="28" height="22" rx="2" fill="#bfe0ea" stroke="#2f7c83" stroke-width="2"/><path d="M10 15h20M10 20h14M10 25h18" stroke="#2f7c83" stroke-width="2"/></svg>', note:'flightcard'},
      magazine:{name:'Sky Mag', icon:'<svg viewBox="0 0 40 40"><rect x="8" y="6" width="24" height="30" rx="2" fill="#d0602f" stroke="#8a3526" stroke-width="2"/><rect x="12" y="10" width="16" height="8" fill="#fffdf6"/><path d="M12 24h16M12 29h10" stroke="#fffdf6" stroke-width="2"/></svg>', open:() => openXword()}
    },
    uses:{note:'fl_screen'},
    spark:S => !S.pocket ? ['fl_pocket'] : (!S.noteRead ? ['fl_screen'] : (!S.watchSet ? ['fl_watch'] : ['fl_map'])),
    fresh:() => ({pocket:0, noteRead:false, watchSet:false, watch:{h:13, m:40}, xw:[null,null,null,null], nightMoth:false}),
    draw(S){
      tog('fl_pocketStuff', S.pocket < 3);
      tog('fl_screenInfo', S.noteRead && !S.watchSet); tog('fl_screenMap', S.watchSet);
      tog('fl_bigLocked', !S.watchSet); tog('fl_bigMap', S.watchSet);
      $('fl_watchFace').textContent = fmt(S.watch);
    },
    act(id, item){
      switch(id){
        case 'fl_pocket':
          if (S.pocket === 0){ S.pocket = 1; add('infocard'); say('A flight card: landing times and a little map. Something else is tucked behind it.'); }
          else if (S.pocket === 1){ S.pocket = 2; add('note'); openNote('noteMirror'); say('A folded note in loopy handwriting. But the writing is all backwards!'); render(); return; }
          else if (S.pocket === 2){ S.pocket = 3; add('magazine'); say('Sky Mag. Someone has already started the crossword.'); }
          else say('The seat pocket. Empty now, except for the safety card.');
          break;
        case 'fl_screen':
          if (item === 'note'){
            if (!S.noteRead){ S.noteRead = true; say('Mary holds the note up to the dark screen. In the reflection, the writing turns the right way round!'); }
            openNote('noteRead'); render(); return;
          }
          if (S.watchSet) say('The screen shows the flight map. Nearly there.');
          else if (S.noteRead) say('The screen says: SET YOUR WATCH to London time, then the map unlocks.');
          else say('The seat-back screen is off. It is as dark and shiny as a mirror.');
          break;
        case 'fl_watch': openWatch(); return;
        case 'fl_map':
          if (S.watchSet){ $('mapUI').hidden = false; say('The route curls from Singapore all the way to London.'); return; }
          say('The big screen says the flight map is locked until you set your watch to London time.');
          break;
        case 'fl_window': say('Clouds like a duvet, and a sunrise the colour of kaya. London is somewhere under there.'); break;
        case 'fl_trolley': say('Priya the flight attendant: “A snack for the detective? Nearly there now.”'); break;
        case 'fl_kids': say('Elliot has slept through the whole film. Zaina is hugging Peanut. Both are snoring, very slightly.'); break;
        case 'fl_toilet': say('The toilet is free. It has a sign that says PLEASE DO NOT PRESS THE BIG BUTTON. Mary would never.'); break;
      }
      render();
    },
    hints:[
      {goal:() => S.pocket >= 2, tips:['Something odd is in the seat pocket.','Look in the seat pocket in front of Mary. Keep looking.','Turn to your seat and tap the pocket until it is empty.']},
      {goal:() => S.noteRead, tips:['The note is written backwards. What would turn it round?','A mirror would. Is there anything dark and shiny nearby?','Tap the note at the bottom, then tap the dark seat-back screen.']},
      {goal:() => S.watchSet, tips:['The screen wants London time. The flight card knows the landing time.','Landing is 13:40 Singapore time. London is 7 hours behind. Take 7 hours off.','Tap your watch and set it to 06:40, then tap Set.']},
      {goal:() => false, tips:['The map is unlocked now.','Look at the big screen at the back of the cabin.','Turn to the back of the cabin, tap the big screen, then tap the little moth beside London.']}
    ],
    ending(){
      saveStage('maryFlight', S.nightMoth ? {nightMothFlight:true} : null);
      return ['<p class="fade big" style="animation-delay:.2s">Wheels down.</p>',
        '<p class="fade" style="animation-delay:1.4s">London in the evening light. Fields, roads, a park full of trees.</p>',
        '<p class="fade" style="animation-delay:2.8s">And in the trees, just for a second, a little golden glow.</p>',
        `<p class="fade next" style="animation-delay:4.2s">${S.nightMoth ? '★ You solved the crossword too! ' : 'The Sky Mag crossword is waiting. '}End of Part 1. Enfield is next.</p>`];
    }
  },
  setup(){
    Object.assign(NOTES, {
      noteMirror:'<span class="head">A folded note</span><span>Look at the map.</span><span>Find the moth.</span><span>It knows the way.</span><span class="big">– N</span>',
      noteRead:'<span class="head">The note, in the mirror</span><span>Look at the map.</span><span>Find the moth.</span><span>It knows the way.</span><span class="big">– N</span>',
      flightcard:'<span class="head">Flight card</span><span class="big">Landing: 13:40 Singapore time</span><span>Flight time: 14 hours</span><span>London is 7 hours behind Singapore in summer.</span>'
    });
    window.fmt = t => `${String(t.h).padStart(2,'0')}:${String(t.m).padStart(2,'0')}`;
    window.openWatch = () => { $('wDigits').textContent = fmt(S.watch); $('watchFb').textContent = ''; $('watchUI').hidden = false; say('Mary’s watch still says Singapore time.'); };
    const bump = (k, d) => { if (k === 'h') S.watch.h = (S.watch.h + d + 24) % 24; else S.watch.m = (S.watch.m + d + 60) % 60; $('wDigits').textContent = fmt(S.watch); $('watchFb').textContent = ''; render(); };
    $('wHup').onclick = () => bump('h', 1); $('wHdn').onclick = () => bump('h', -1);
    $('wMup').onclick = () => bump('m', 10); $('wMdn').onclick = () => bump('m', -10);
    $('watchSet').onclick = () => {
      if (S.watchSet) return;
      if (S.watch.h === 6 && S.watch.m === 40){ S.watchSet = true; $('watchFb').textContent = 'Beep! The seat-back screen lights up.'; setTimeout(() => { $('watchUI').hidden = true; say('The screen flickers on: a map, and a plane, nearly at London. The big screen at the back lights up too.'); render(); }, 900); }
      else $('watchFb').textContent = 'The screen stays dark. Check the flight card: landing time, take away 7 hours.';
    };
    $('mapMoth').onclick = () => { if (S.done) return; $('mapUI').hidden = true; say('Mary touches the little moth. It glows, just for a second.'); finish(); };
    // the crossword: four clues; the gold letters spell KAYA
    const XW = [
      ['A baby cat', ['KITTEN','PUPPY','LAMB'], 'KITTEN'],
      ['The opposite of below', ['UNDER','ABOVE','BESIDE'], 'ABOVE'],
      ['The colour of the sun', ['PURPLE','GREEN','YELLOW'], 'YELLOW'],
      ['A fruit that keeps the doctor away', ['PEAR','APPLE','PLUM'], 'APPLE']
    ];
    window.openXword = () => {
      $('xw').innerHTML = XW.map(([q, opts], i) => {
        const pick = S.xw[i];
        const cells = (pick || '_____').split('').map((ch, j) => `<span class="cell${j === 0 ? ' gold' : ''}">${ch === '_' ? '' : ch}</span>`).join('');
        return `<div class="clue"><span class="q">${i+1}. ${q}</span><span class="letters">${cells}</span><span class="opts">${opts.map(o => `<button data-i="${i}" data-o="${o}" class="${pick === o ? 'on' : ''}">${o.charAt(0) + o.slice(1).toLowerCase()}</button>`).join('')}</span></div>`;
      }).join('');
      $('xw').querySelectorAll('button').forEach(b => b.onclick = () => { S.xw[+b.dataset.i] = b.dataset.o; openXword(); checkXword(); });
      $('xwUI').hidden = false;
    };
    const checkXword = () => {
      const word = S.xw.map(w => w ? w[0] : '_').join('');
      if (S.xw.every((w, i) => w === XW[i][2])){ if (!S.nightMoth){ S.nightMoth = true; say('<b>★ Crossword solved!</b> The gold squares spell KAYA. Nana’s favourite.'); } $('xwFb').textContent = '★ K, A, Y, A. Kaya! Nana would approve.'; }
      else $('xwFb').textContent = `Gold squares so far: ${word.replace(/_/g, '·')}`;
    };
  }
});
