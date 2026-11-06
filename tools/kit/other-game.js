/* Layer: engine. The engine runs a game other than The Moth House (MOTH-166).
   Serves a made-up one-player game's settings in place of next/landscape/game.js, borrowing one Moth House stage so there are rooms,
   and checks that the engine takes the game's name, title screen, hint button, save name and plain end card, and skips the
   choose screen. Run with the local server up:  node tools/kit/other-game.js */
const PORT = 8765;
const GAME = `window.GAME = {
  name: 'Test Game', store: 'testgame', saveKey: 'testgame.landscape.v1', postcard: false, howto: false,
  title: {kicker: 'A test', name: 'Test Game', tag: 'One player, one room.', hero: null},
  helper: {says: 'The helper says:', label: 'Ask for a hint', button: '<span id="testHelper">?</span>', fly: false},
  players: {tester: {name: 'Tester', first: 'evalroom', notebook: 'The job sheet', colour: '#555'}},
  released: ['evalroom'], stages: ['stages/evalroom.js']
};`;
(async () => {
  const {chromium} = require('playwright');
  const b = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
  const p = await (await b.newContext({viewport: {width: 1600, height: 700}})).newPage(), errs = [], fails = [];
  const check = (ok, what) => { console.log((ok ? 'ok   ' : 'FAIL ') + what); if (!ok) fails.push(what); };
  p.on('pageerror', e => errs.push(e.message.split('\n')[0]));
  await p.route(/\/next\/landscape\/game\.js/, r => r.fulfill({contentType: 'text/javascript', body: GAME}));
  await p.goto(`http://localhost:${PORT}/next/landscape/`, {waitUntil: 'networkidle'});
  await p.evaluate(() => { const s = document.getElementById('splash'); if (s && !s.hidden) s.click(); });
  await p.waitForFunction(() => !document.getElementById('title').hidden, null, {timeout: 8000});
  check(await p.evaluate(() => document.title) === 'Test Game', 'the page takes the game\'s name');
  check(/Test Game/.test(await p.textContent('#title h1')) && !/Moth/.test(await p.textContent('#title h1')), 'the title screen shows the game\'s title');
  check(await p.evaluate(() => document.querySelector('#title .hero').hidden), 'no moth on the title screen');
  await p.click('#tNew');
  await p.waitForFunction(() => document.getElementById('title').hidden && typeof S !== 'undefined' && S && ROOMS[S.room], null, {timeout: 15000});
  check(await p.evaluate(() => document.getElementById('choose').hidden), 'New game goes straight in: no choose screen');
  check(await p.evaluate(() => CHILD === 'tester'), 'the one player is playing');
  check(!!(await p.$('#hintBtn #testHelper')) && (await p.getAttribute('#hintBtn', 'aria-label')) === 'Ask for a hint', 'the hint button is the game\'s');
  const keys = await p.evaluate(() => Object.keys(localStorage));
  check(keys.includes('testgame.landscape.v1.tester') && !keys.some(k => k.startsWith('mothhouse.landscape')), 'saves under the game\'s own name, none under The Moth House\'s');
  await p.evaluate(() => openMenu('settings'));
  check(await p.evaluate(() => document.querySelector('.tab[data-tab="family"]').hidden), 'no Family tab with one player');
  await p.evaluate(() => closeMenu());
  await p.evaluate(() => { S.done = true; showEnd('The end', 'Test over.', ''); });
  await p.waitForTimeout(2600);
  const card = await p.innerHTML('#postcard');
  check(!/Dear Mum/.test(card) && /Test over/.test(card), 'a plain end card, no postcard home');
  check(!(await p.$('.flymoth')), 'no moth crosses the room');
  check(!errs.length, 'no page errors' + (errs.length ? ': ' + errs.join(' / ') : ''));
  console.log(fails.length ? `OTHER GAME FAIL: ${fails.length} check(s)` : 'OTHER GAME PASS');
  process.exitCode = fails.length ? 1 : 0;
  await b.close();
})();
