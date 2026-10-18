/* Plays Mary's school day, version 3 "The Last Bell" (stage school3), start to ending, with the wrong tries, by script. node tools/play-s3.js (server on 8765). */
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:2000, height:700}}); const errs = []; p.on('pageerror', e => errs.push(e.message));
  const OUT = '/tmp/claude-0/-home-user/dab19b28-f19a-5f83-a691-0a624ed86d88/scratchpad/s3-'; const shot = async n => p.screenshot({path:OUT + n + '.png', clip:await p.locator('#scene').boundingBox()});
  const st = () => p.evaluate(() => ({room:S.room, view:ROOMS[S.room].views[S.view], got:S.got.join(','), lit:S.lit, blind:S.blind, laps:S.laps, stem:S.stemOpen, paint:S.paintOpen, cab:S.cabOpen, drawer:S.drawerOpen, locker:S.lockerOpen, done:S.done}));
  const msg = () => p.evaluate(() => document.getElementById('msg').textContent);
  const tap = async (id, wait=400) => { const n = await p.locator(`.hs[data-id="${id}"]`).count(); if (!n){ console.log('NO HOTSPOT', id, JSON.stringify(await st())); return; } await p.evaluate(id => document.querySelector(`.hs[data-id="${id}"]`).click(), id); await p.waitForTimeout(wait); };
  const turnTo = async v => { for (let i = 0; i < 5; i++){ if ((await p.evaluate(() => ROOMS[S.room].views[S.view])) === v) return; await p.evaluate(() => document.getElementById('right').click()); await p.waitForTimeout(320); } console.log('could not turn to', v); };
  const go = async id => tap(id, 1500); const back = async () => { await p.keyboard.press('Escape'); await p.waitForTimeout(250); };
  const noOverflow = async label => { const r = await p.evaluate(() => { const c = document.querySelector('#closeup .card'); if (!c || document.getElementById('closeup').hidden) return null; return {inner:c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1}; }); if (r && r.inner) console.log('OVERFLOW', label); };
  const nbCheck = async label => { for (const [w, h] of [[844, 390], [2000, 700]]){ await p.setViewportSize({width:w, height:h}); await p.waitForTimeout(250); await p.evaluate(() => openNotebook()); await p.waitForTimeout(250); await noOverflow(`notebook ${label} at ${w}`); await back(); } };
  const P = async (px, py) => { const r = await p.evaluate(() => { const b = document.getElementById('dragpic').getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; }); return [r[0] + px/100*r[2], r[1] + py/100*r[3]]; };
  const drag = async path => { let [mx, my] = await P(path[0][0], path[0][1]); await p.mouse.move(mx, my); await p.mouse.down(); for (let seg = 1; seg < path.length; seg++){ for (let i = 1; i <= 25; i++){ const u = i/25; [mx, my] = await P(path[seg-1][0] + (path[seg][0]-path[seg-1][0])*u, path[seg-1][1] + (path[seg][1]-path[seg-1][1])*u); await p.mouse.move(mx, my); await p.waitForTimeout(12); } } await p.mouse.up(); await p.waitForTimeout(1000); };

  await p.goto('http://localhost:8765/next/landscape/?stage=school3&fresh', {waitUntil:'networkidle'}); await p.waitForTimeout(900);
  await p.evaluate(() => { const f = document.getElementById('fsask'); if (f && !f.hidden){ const bt = f.querySelector('button:last-of-type'); if (bt) bt.click(); else f.hidden = true; } });
  if (!(await p.evaluate(() => document.getElementById('comic').hidden))) await p.evaluate(() => document.getElementById('cskip').click()); await p.waitForTimeout(300);
  if (!(await p.evaluate(() => document.getElementById('stagecard').hidden))) await p.evaluate(() => document.getElementById('cardGo').click()); await p.waitForTimeout(800);
  console.log('opening: drag open?', !(await p.evaluate(() => document.getElementById('closeup').hidden)), JSON.stringify(await st())); await shot('01-blind-drag');
  await drag([[70, 22], [70, 62]]); console.log('after blind:', JSON.stringify(await st()), '|', await msg()); await shot('02-lit');
  await turnTo('c4'); await tap('envelope', 1200); await noOverflow('letter'); await shot('03-letter'); await back();
  await tap('rules'); console.log('rules:', await msg());
  // the hint tiers: tier two pulses the thing once the notebook closes (no sparkles by default)
  await p.evaluate(() => openNotebook()); await p.waitForTimeout(300); await p.evaluate(() => { const r = [...document.querySelectorAll('.nbrow')].find(r => r.textContent.includes('Maths')); r.click(); r.click(); }); await p.waitForTimeout(200); await back(); await p.waitForTimeout(500); console.log('tier-2 pulse on the tin:', await p.evaluate(() => { const el = document.querySelector('.hs.point'); return el ? el.dataset.id : 'none'; }), '| sparkles on view:', await p.evaluate(() => document.querySelectorAll('.spark').length));
  await tap('tin', 600); console.log('feed once:', await msg()); await p.waitForTimeout(3200); console.log('counter:', await p.evaluate(() => document.getElementById('lapCounter').textContent), JSON.stringify(await st())); await shot('04-counter');
  await tap('tin', 600); console.log('feed twice:', await msg(), 'laps', await p.evaluate(() => S.laps)); await p.waitForTimeout(9500); await tap('tin', 600); await p.waitForTimeout(3200); console.log('fed again, laps', await p.evaluate(() => S.laps));
  // Science: the blind down, the stars
  await turnTo('c2'); await tap('blind', 800); console.log('blind down:', await msg()); await shot('05-dark-c2');
  await turnTo('c1'); await p.waitForTimeout(700); console.log('stars seen', await p.evaluate(() => !!S.seen.stars)); await shot('06-dark-stars');
  await tap('board', 800); await noOverflow('board'); await shot('07-board'); await back();
  await turnTo('c3'); await go('door'); console.log('corridor dark while the blind is down?', await p.evaluate(() => document.getElementById('scene').classList.contains('dark')), '(must be false)'); await turnTo('h4'); await go('h_door5H'); console.log('classroom dark again?', await p.evaluate(() => document.getElementById('scene').classList.contains('dark')), '(must be true)');
  await turnTo('c2'); await tap('blind', 800); console.log('blind up:', await msg());
  // library
  await turnTo('c3'); await go('door'); await turnTo('h2'); await go('h_libdoors'); console.log('library', JSON.stringify(await st()));
  await tap('l_shelfSci', 800); await p.evaluate(() => document.querySelectorAll('.book')[1].click()); await p.waitForTimeout(600); await noOverflow('night sky'); await shot('08-nightsky'); console.log('kite seen', await p.evaluate(() => !!S.seen.kite)); await back();
  await tap('l_cabinet', 600); await p.click('#openCab'); await p.waitForTimeout(300); console.log('wrong arrows:', await p.textContent('#lockFb')); await back();
  await turnTo('le'); await tap('l_map', 800); await noOverflow('map'); await shot('09-map'); await back();
  await turnTo('ln'); await tap('l_cabinet', 600); const setA = async (i, n) => { for (let k = 0; k < n; k++){ await p.evaluate(i => document.querySelector(`#adials .dial[data-i="${i}"]`).click(), i); await p.waitForTimeout(60); } }; await setA(0, 0); await setA(1, 3); await setA(2, 3); await setA(3, 0); await p.click('#openCab'); await p.waitForTimeout(1100); console.log('arrows right:', JSON.stringify(await st()));
  await tap('l_cabinet', 600); await p.click('#takeBadge'); await p.waitForTimeout(500); console.log('badgeGe:', JSON.stringify(await st()));
  await turnTo('lw'); await tap('l_shelfArt', 800); await p.evaluate(() => document.querySelectorAll('.book')[2].click()); await p.waitForTimeout(600); await noOverflow('painting book'); await back();
  await tap('l_trolley', 800); await p.evaluate(() => document.querySelectorAll('.book')[1].click()); await p.waitForTimeout(600); await noOverflow('piano'); await back();
  await nbCheck('after library');
  // art room
  await turnTo('ls'); await go('l_doors'); await turnTo('h4'); await go('h_artdoor'); console.log('art', JSON.stringify(await st()));
  await tap('an_moth', 800); await back(); await tap('an_p2'); console.log('ben:', await msg()); await shot('10-rack');
  await turnTo('ae'); await tap('ae_lock', 600); await p.click('#openPaint'); await p.waitForTimeout(300); console.log('wrong pairs:', await p.textContent('#lockFb'));
  const setC = async (i, n) => { for (let k = 0; k < n; k++){ await p.evaluate(i => document.querySelector(`#cdials .cdial[data-i="${i}"]`).click(), i); await p.waitForTimeout(60); } }; await setC(0, 1); await setC(1, 2); await setC(2, 0); await shot('11-pairs'); await p.click('#openPaint'); await p.waitForTimeout(1100); console.log('pairs right:', JSON.stringify(await st()));
  await tap('ae_cupboard', 600); await p.click('#takeBadge'); await p.waitForTimeout(500); console.log('badgeAr:', JSON.stringify(await st()));
  // hall
  await turnTo('as'); await go('as_door'); await turnTo('h3'); await go('h_hall'); console.log('hall', JSON.stringify(await st()));
  await tap('hn_banner', 800); await noOverflow('banner'); await shot('12-banner'); await back(); console.log('tune seen', await p.evaluate(() => !!S.seen.tune), '| clues copied:', await p.evaluate(() => S.clues.join(',')));
  await p.evaluate(() => openNotebook()); await p.waitForTimeout(300); await noOverflow('notebook with clues'); await shot('12b-notebook-clues'); await p.evaluate(() => [...document.querySelectorAll('.nb .clue')].find(c => c.textContent === 'World map').click()); await p.waitForTimeout(500); console.log('world map reopened from the notebook in the hall:', await p.evaluate(() => { const t = document.querySelector('#closeup .otitle'); return t ? t.textContent : 'no card'; })); await back();
  await turnTo('he'); await tap('he_lock', 600); await p.evaluate(() => document.querySelector('#kdial .kstar[data-i="2"]').click()); await p.click('#openStem'); await p.waitForTimeout(300); console.log('wrong star:', await p.textContent('#lockFb'));
  await p.evaluate(() => document.querySelector('#kdial .kstar[data-i="6"]').click()); await shot('13-stardial'); await p.click('#openStem'); await p.waitForTimeout(1100); console.log('star right:', JSON.stringify(await st()));
  await tap('he_cabinet', 600); await p.click('#takeBadge'); await p.waitForTimeout(500); console.log('badgeSc:', JSON.stringify(await st()));
  await turnTo('hw'); await tap('hw_blocks', 3000); await tap('hw_mallet'); console.log('mallet:', JSON.stringify(await st()));
  await turnTo('hn'); await p.evaluate(() => document.querySelector('.slot[aria-label="beater"]').click()); await p.waitForTimeout(200); await tap('hn_bars', 900);
  const hit = async c => { const ok = await p.evaluate(c => { const el = [...document.querySelectorAll('#bells button, #bells .bar, #bells [data-c], #bells [data-bar]')].find(e => ((e.dataset.c || '') + ' ' + (e.dataset.bar || '') + ' ' + e.className + ' ' + (e.getAttribute('aria-label') || '')).toLowerCase().includes(c)); if (el){ el.click(); return true; } return false; }, c); if (!ok) console.log('NO BAR', c); await p.waitForTimeout(250); };
  await hit('red'); await hit('red'); await hit('red'); await hit('red'); console.log('wrong tune:', await p.evaluate(() => document.getElementById('tune') ? document.getElementById('tune').textContent : '?'), await msg());
  await hit('green'); await hit('red'); await hit('blue'); await hit('yellow'); await p.waitForTimeout(1500); await back(); console.log('tune:', JSON.stringify(await st()), '|', await msg());
  await tap('hn_drawer', 800); console.log('bell:', JSON.stringify(await st()));
  await nbCheck('after hall');
  // the bell before the locker
  await turnTo('hs'); await go('hs_doors'); await turnTo('h1'); await p.evaluate(() => document.querySelector('.slot[aria-label="handbell"]').click()); await p.waitForTimeout(200); await tap('h_lockers', 600); console.log('bell too early:', await msg());
  // the notebook and a tier-two pulse
  await p.evaluate(() => openNotebook()); await p.waitForTimeout(400); await noOverflow('notebook'); await shot('14-notebook'); const nb = await p.evaluate(() => [...document.querySelectorAll('.nbrow')].map(r => r.textContent)); console.log('notebook rows:', JSON.stringify(nb));
  await p.evaluate(() => { const r = [...document.querySelectorAll('.nbrow')].find(r => r.textContent.includes('order')); if (r){ r.click(); r.click(); } }); await p.waitForTimeout(300); console.log('order hint tier 2:', await p.textContent('#nbFb')); await back(); await p.waitForTimeout(400); console.log('pulse on board hotspot (not on this view, so none):', await p.evaluate(() => !!document.querySelector('.hs.point')));
  // the locker
  await tap('h_locker', 600); await p.click('#openLocker'); await p.waitForTimeout(300); console.log('wrong code:', await p.textContent('#lockFb'));
  const setD = async (i, n) => { for (let k = 0; k < n; k++){ await p.evaluate(i => document.querySelector(`#dials .dial[data-i="${i}"]`).click(), i); await p.waitForTimeout(40); } }; await setD(0, 5); await setD(1, 7); await setD(2, 2); await setD(3, 3); await p.click('#openLocker'); await p.waitForTimeout(2200); await noOverflow('last note'); await shot('15-last-note'); await back(); console.log('locker:', JSON.stringify(await st()));
  // ring the bell
  await p.evaluate(() => document.querySelector('.slot[aria-label="handbell"]').click()); await p.waitForTimeout(200); await tap('h_lockers', 900); console.log('bell drag open?', !(await p.evaluate(() => document.getElementById('closeup').hidden))); await shot('16-bell-drag');
  await drag([[30, 55], [50, 40], [70, 55]]); await p.waitForTimeout(4800); console.log('ending shown:', await p.evaluate(() => !document.getElementById('endUI').hidden), JSON.stringify(await st())); await shot('17-ending');
  for (const w of [844, 2000]){ await p.setViewportSize({width:w, height:w === 844 ? 390 : 700}); await p.waitForTimeout(300); console.log('page overflow', w, await p.evaluate(() => document.documentElement.scrollHeight > innerHeight + 1 || document.documentElement.scrollWidth > innerWidth + 1));
    await p.evaluate(() => { document.getElementById('endUI').hidden = true; openNotebook(); }); await p.waitForTimeout(300); await noOverflow('notebook at ' + w); await back(); }
  console.log('errors:', errs.length ? errs : 'none'); await b.close();
})();
