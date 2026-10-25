/* Plays the second test level "Packing Day" (stage eval2), start to ending, with the wrong tries, by script. node tools/play-e2.js (server on 8765).
   REDUCE=1 plays it with prefers-reduced-motion (checklist 36); SHOTS=<dir> puts the screenshots there. */
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}); const p = await b.newPage({viewport:{width:2000, height:700}}); if (process.env.REDUCE){ await p.emulateMedia({reducedMotion:'reduce'}); console.log('reduced motion on'); } const errs = []; p.on('pageerror', e => errs.push(e.message));
  const OUT = (process.env.SHOTS || '/tmp') + '/e2-'; const shot = async n => p.screenshot({path:OUT + n + '.png', clip:await p.locator('#scene').boundingBox()});
  const st = () => p.evaluate(() => ({room:S.room, view:ROOMS[S.room].views[S.view], got:S.got.join(','), packed:Object.keys(S.packed || {}).join(','), done:S.done}));
  const msg = () => p.evaluate(() => document.getElementById('msg').textContent);
  const cufb = () => p.evaluate(() => { const e = document.getElementById('e2fb'); return e ? e.textContent : '(no card)'; });
  let fails = 0; const check = (ok, label) => { if (!ok){ fails++; console.log('FAIL', label); } else console.log('ok  ', label); };
  const tap = async (id, wait = 500) => { const n = await p.locator(`.hs[data-id="${id}"]`).count(); if (!n){ console.log('NO HOTSPOT', id, JSON.stringify(await st())); fails++; return; } await p.evaluate(id => document.querySelector(`.hs[data-id="${id}"]`).click(), id); await p.waitForTimeout(wait); };
  const view = () => p.evaluate(() => ROOMS[S.room].views[S.view]);
  const turnTo = async v => { for (let i = 0; i < 5; i++){ if ((await view()) === v) return; await p.evaluate(() => document.getElementById('right').click()); await p.waitForTimeout(300); } console.log('could not turn to', v); fails++; };
  const back = async () => { await p.keyboard.press('Escape'); await p.waitForTimeout(250); if (!(await p.evaluate(() => document.getElementById('closeup').hidden))) await p.evaluate(() => closeCloseup()); };
  const hold = async name => { await p.evaluate(n => document.querySelector(`.slot[aria-label="${n}"]`).click(), name); await p.waitForTimeout(200); };
  const walk = async (door, room) => { await tap(door, 1600); check((await p.evaluate(() => S.room)) === room, `through ${door} into ${room}`); };
  const cu = async id => { await p.evaluate(id => document.querySelector(`#closeup .cuhot[data-cu="${id}"]`).click(), id); await p.waitForTimeout(400); };
  const P = async (px, py) => { const r = await p.evaluate(() => { const b = document.getElementById('dragpic').getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; }); return [r[0] + px/100*r[2], r[1] + py/100*r[3]]; };
  const drag = async path => { let [mx, my] = await P(path[0][0], path[0][1]); await p.mouse.move(mx, my); await p.mouse.down(); for (let seg = 1; seg < path.length; seg++){ for (let i = 1; i <= 25; i++){ const u = i/25; [mx, my] = await P(path[seg-1][0] + (path[seg][0]-path[seg-1][0])*u, path[seg-1][1] + (path[seg][1]-path[seg-1][1])*u); await p.mouse.move(mx, my); await p.waitForTimeout(10); } } await p.mouse.up(); await p.waitForTimeout(1200); };
  const setWheels = async seq => { for (let i = 0; i < 4; i++){ const want = ['red','orange','yellow','green','blue','indigo','violet','pink'].indexOf(seq[i]); for (let k = 0; k < 8; k++){ if ((await p.evaluate(i => (S.wheels || [0,2,3,4])[i], i)) === want) break; await p.evaluate(i => document.querySelector(`#closeup .e2wheel[data-i="${i}"]`).click(), i); await p.waitForTimeout(40); } } };
  const press = async seq => { await setWheels(seq); await p.click('#e2go'); await p.waitForTimeout(300); return cufb(); };

  await p.goto('http://localhost:8765/next/landscape/?stage=eval2&fresh', {waitUntil:'networkidle'}); await p.waitForTimeout(900);
  await p.evaluate(() => { const f = document.getElementById('fsask'); if (f && !f.hidden){ const bt = f.querySelector('button:last-of-type'); if (bt) bt.click(); else f.hidden = true; } });
  if (!(await p.evaluate(() => document.getElementById('stagecard').hidden))) await p.evaluate(() => document.getElementById('cardGo').click()); await p.waitForTimeout(800);
  console.log('start:', JSON.stringify(await st())); await shot('01-start');
  check((await view()) === 'm3', 'starts facing the sofa (m3)');
  // the opening: the list, the wipe refused
  await tap('e2_board', 600); await shot('02-board'); await p.click('#e2wipe'); await p.waitForTimeout(200); console.log('wipe before four:', await cufb()); check(/Not yet/.test(await cufb()), 'the wipe waits for four ticks'); await back();
  check(await p.evaluate(() => S.clues.includes('list')), 'the list is copied into the notebook');
  // a walk round Mary's room
  await turnTo('m2'); await tap('e2_folder', 500); console.log('folder:', await cufb()); await back(); await shot('03-window');
  await turnTo('m1'); await tap('e2_dtop', 500); console.log('top drawer:', await cufb()); await back(); await tap('e2_dmid', 500); await back(); await tap('e2_dbot', 500); await back(); await shot('04-loft');
  await turnTo('m4'); await tap('e2_wardrobe', 1400); console.log('wardrobe:', await msg()); check(await p.evaluate(() => S.wardOpen), 'the wardrobe doors open in the room (MOTH-121)'); await shot('05a-wardrobe-open'); await tap('e2_wardrobe', 600); console.log('top shelf:', await cufb()); check(/not that long/.test(await cufb()), 'the child’s view: out of reach'); await shot('05-wardrobe'); await back(); await tap('e2_wdoorl', 1300); check(await p.evaluate(() => !S.wardOpen), 'the doors shut again'); await tap('e2_wardrobe', 1300);
  await turnTo('m1'); await tap('e2_chair', 300); console.log('chair:', await msg()); check(/wheels/.test(await msg()), 'the chair has wheels');
  // into the corridor and the children's room
  await turnTo('m4'); await walk('e2_mdoor', 'corridor'); check((await view()) === 'c4', 'arrive in the corridor facing c4'); await p.waitForTimeout(1200); console.log('corridor:', await msg()); await shot('06-corridor');
  await turnTo('c1'); await walk('e2_ckdoor', 'kids'); check((await view()) === 'k1', 'arrive in the children’s room facing k1'); await shot('07-kids');
  await turnTo('k2'); await tap('e2_zaina', 300); console.log('zaina:', await msg()); await shot('08-zaina');
  await tap('e2_piano', 3600); console.log('piano (verse):', await cufb()); await shot('09-piano'); await back();
  check(await p.evaluate(() => S.versePlayed), 'the verse played');
  await tap('e2_trundle', 600); console.log('trundle:', await cufb()); await p.click('#takePaper'); await p.waitForTimeout(400); check(await p.evaluate(() => S.got.includes('paper')), 'paper taken');
  await turnTo('k4'); await tap('e2_enote', 700); await back(); check(await p.evaluate(() => S.clues.includes('enote')), 'Elliot’s note copied');
  await tap('e2_dlock', 500); await shot('10-lock'); console.log('verse at the lock:', await press(['yellow', 'yellow', 'green', 'blue'])); check(/Zaina plays/.test(await cufb()), 'verse trap line');
  console.log('as Elliot left it:', await press(['red', 'yellow', 'green', 'blue'])); check(/left the wheels/.test(await cufb()), 'start-position trap line');
  console.log('nonsense:', await press(['green', 'green', 'green', 'green'])); check(/stays shut/.test(await cufb()), 'other line'); await back();
  // Shelly
  await turnTo('k3'); await walk('e2_kdoor', 'corridor'); check((await view()) === 'c3', 'arrive facing c3');
  await turnTo('c2'); await walk('e2_cmdoor', 'mary'); check((await view()) === 'm2', 'arrive in Mary’s room facing m2');
  await turnTo('m1'); await tap('e2_organiser', 500); await shot('11-organiser'); await p.click('#takeShelly'); await p.waitForTimeout(400);
  await hold('Shelly the mermaid'); await tap('e2_chair', 300); console.log('Shelly on the chair:', await msg()); check(/Zaina is in her room/.test(await msg()), 'Shelly miss line');
  // the present: drawing, tape, combine (tape first is refused)
  await tap('e2_drawing', 400); await tap('e2_penpot', 500); await p.click('#takeTape'); await p.waitForTimeout(400);
  await hold('sticky tape'); await hold('framed drawing'); console.log('tape on the frame:', await msg()); check(/Nothing to stick/.test(await msg()), 'tape-first line');
  await hold('wrapping paper'); await hold('framed drawing'); await hold('sticky tape'); await hold('half-wrapped present'); check(await p.evaluate(() => S.got.includes('present')), 'present wrapped');
  // the stool: the bath first is refused, the tub then the bath
  await tap('e2_bath', 300); check(/sitting on it/.test(await msg()), 'bath under the tub'); await tap('e2_tub', 300); await tap('e2_bath', 300); await shot('12-stool'); await tap('e2_stool', 400);
  await hold('step stool'); await tap('e2_cubes', 300); check(/taller/.test(await msg()), 'stool miss line');
  await turnTo('m4'); await hold('step stool'); await tap('e2_wardrobe', 1600); check(await p.evaluate(() => S.stoolAt && !document.getElementById('closeup').hidden), 'stool in the wardrobe, the box close-up open'); await shot('13-box'); await p.evaluate(() => document.querySelector('#closeup .cuhot[data-cu="e2_box"]').click()); await p.waitForTimeout(500); check((await p.locator('#takeHat').count()) === 1, 'box open, hat and gloves inside (MOTH-122)'); await shot('13b-box-open'); await p.click('#takeHat'); await p.waitForTimeout(500); check(await p.evaluate(() => S.got.includes('hat')), 'hat and gloves taken'); await shot('14-stool-at-wardrobe');
  // pack three, the stool refused
  await turnTo('m3'); await hold('hat and gloves'); await tap('e2_case', 400); console.log('packed hat and gloves :', await msg()); await back(); await tap('e2_case', 600); await hold('Nana’s present'); await p.evaluate(() => document.querySelector('#closeup .cuhot[data-cu="e2_case"]').click()); await p.waitForTimeout(500); check(await p.evaluate(() => S.packed.present && !document.getElementById('closeup').hidden), 'packed from the case close-up, which stays open (MOTH-123)'); await shot('15a-case-two'); await back();
  // back to Zaina with Shelly; the chorus; the lock
  await turnTo('m4'); await walk('e2_mdoor', 'corridor'); await turnTo('c1'); await walk('e2_ckdoor', 'kids'); await turnTo('k2');
  await tap('e2_piano', 400); await hold('Shelly the mermaid'); await cu('e2_zaina'); await p.waitForTimeout(1400); check(await p.evaluate(() => S.traded && S.got.includes('sheet')), 'traded Shelly for the sheet'); await shot('15-sheet'); await back();
  await tap('e2_piano', 3600); console.log('piano (chorus):', await cufb()); check(await p.evaluate(() => S.chorusHeard), 'the chorus played'); await back();
  await p.evaluate(() => openNotebook()); await p.waitForTimeout(300); console.log('noticed:', await p.evaluate(() => (document.querySelector('.nb .nbsmall') || {}).textContent)); await shot('16-notebook'); await back();
  await turnTo('k4'); await tap('e2_dlock', 500); console.log('chorus at the lock:', await press(['blue', 'red', 'red', 'green'])); await p.waitForTimeout(2600); check(await p.evaluate(() => S.houseOpen), 'the doll’s house opens'); await shot('17-house-open');
  await tap('e2_passport', 400); check(await p.evaluate(() => S.got.includes('passport')), 'passport taken');
  // home, pack the last two, the P.S., the wipe
  await turnTo('k3'); await walk('e2_kdoor', 'corridor'); await turnTo('c2'); await walk('e2_cmdoor', 'mary'); await turnTo('m3');
  for (const n of ['carol sheet', 'passport']){ await hold(n); await tap('e2_case', 400); console.log('packed', n, ':', await msg()); }
  await tap('e2_case', 600); await shot('18a-case-four'); await p.click('#e2zip'); await p.waitForTimeout(500); check(await p.evaluate(() => S.caseShut), 'the case zips shut (MOTH-133)'); await shot('18b-case-shut'); await back();
  check(await p.evaluate(() => Object.keys(S.packed).length === 4), 'four in the case'); await shot('18-four');
  await tap('e2_board', 500); await p.click('#e2wipe'); await p.waitForTimeout(200); check(/lights/i.test(await cufb()), 'the P.S. stops the wipe'); await back();
  await turnTo('m2'); await tap('e2_lights', 300); check(await p.evaluate(() => S.lightsOff), 'lights off'); await shot('19-lights-off');
  await turnTo('m3'); await tap('e2_board', 500); await p.click('#e2wipe'); await p.waitForTimeout(700); await shot('20-wipe');
  await p.waitForTimeout(9000); check(await p.evaluate(() => S.done && !document.getElementById('endUI').hidden), 'the ending shows'); await shot('21-ending');
  for (const w of [844, 2000]){ await p.setViewportSize({width:w, height:w === 844 ? 390 : 700}); await p.waitForTimeout(300); check(!(await p.evaluate(() => document.documentElement.scrollHeight > innerHeight + 1 || document.documentElement.scrollWidth > innerWidth + 1)), 'no page scroll at ' + w); }
  console.log('errors:', errs.length ? errs : 'none'); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); await b.close(); process.exit(fails || errs.length ? 1 : 0);
})();
