const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const p = await b.newPage({viewport:{width:1180,height:820}});
  const errors = []; p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type()==='error' && !/CERT|google|net::/.test(m.text())) errors.push(m.text()); });
  await p.goto('http://localhost:8765/next/landscape/?stage=school', {waitUntil:'networkidle'}); await p.evaluate(() => { try{ localStorage.clear(); }catch(e){} }); await p.reload({waitUntil:'networkidle'}); await p.waitForTimeout(900); if (!(await p.evaluate(() => document.getElementById('comic').hidden))) await p.click('#cskip'); await p.waitForTimeout(300); if (!(await p.evaluate(() => document.getElementById('stagecard').hidden))) await p.click('#cardGo'); await p.waitForTimeout(300);
  const st = () => p.evaluate(() => ({room:S.room, view:S.view, got:S.got.join(','), keyOut:S.keyOut, stem:S.stemOpen, top:S.toppled, beater:S.beater, drawer:S.drawerOpen, paint:S.paintOpen, opened:S.opened, done:S.done}));
  const msg = () => p.textContent('#msg');
  const tap = async (id, wait=400) => { const n = await p.locator(`.hs[data-id="${id}"]`).count(); if (!n){ console.log('NO HOTSPOT', id, JSON.stringify(await st())); return; } await p.click(`.hs[data-id="${id}"]`, {force:true}); await p.waitForTimeout(wait); };
  const turnTo = async (view) => { for (let i=0;i<5;i++){ const v = await p.evaluate(() => ROOMS[S.room].views[S.view]); if (v===view) return; await p.click('#right'); await p.waitForTimeout(320); } console.log('could not turn to', view); };
  const go = async (id) => { await tap(id, 1500); };
  const back = async () => { await p.keyboard.press('Escape'); await p.waitForTimeout(250); };
  const noOverflow = async (label) => { const r = await p.evaluate(() => { const c = document.querySelector('#closeup .card'); if (!c) return 'no card'; const cu = document.querySelector('#closeup').getBoundingClientRect(), r = c.getBoundingClientRect(); return (c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1) ? 'inner' : (r.bottom > cu.bottom + 1 || r.right > cu.right + 1 ? 'outer' : false); }); if (r !== false) console.log('OVERFLOW?', label, r); };
  const shot = async (n) => p.screenshot({path:`p2-${n}.png`});
  // classroom
  await tap('envelope', 900); await noOverflow('envelope'); await shot('env'); await back();
  await turnTo('c3'); await go('door'); console.log('corridor', JSON.stringify(await st()));
  // library: three books, any order (take the painting book first to prove no forced order)
  await turnTo('h2'); await go('h_libdoors');
  await turnTo('lw'); await tap('l_shelfArt'); await p.click('#books .book:nth-of-type(3)'); await p.waitForTimeout(900); await noOverflow('paint note'); await back();
  await tap('l_trolley'); await p.click('#books .book:nth-of-type(2)'); await p.waitForTimeout(900); await noOverflow('music page'); await shot('music'); await back();
  await turnTo('ln'); await tap('l_shelfSci'); await p.click('#books .book:nth-of-type(2)'); await p.waitForTimeout(900); await back();
  console.log('after library', JSON.stringify(await st()));
  // wrong-use check: hold the note? notes open; hold nothing. back to corridor, then the art room
  await turnTo('ls'); await go('l_doors'); await turnTo('h4'); await go('h_artdoor'); console.log('art room', JSON.stringify(await st()));
  await tap('an_moth'); await noOverflow('moth'); await shot('moth'); console.log('moth says:', await msg()); await back();
  await turnTo('aw'); await tap('aw_apronG'); console.log('green apron:', await msg());
  await tap('aw_apronP', 800); console.log('splattered apron:', await msg()); await shot('key-out');
  await tap('aw_key'); console.log('key:', JSON.stringify(await st()));
  await tap('aw_tap', 300); await shot('pour');
  await turnTo('ae'); await tap('ae_lock'); await noOverflow('paint lock'); await shot('paintlock');
  await p.click('#openPaint'); await p.waitForTimeout(300); console.log('wrong colours:', await p.textContent('#lockFb'));
  const cd = async (i, n) => { for (let k=0;k<n;k++){ await p.click(`.cdial[data-i="${i}"]`); await p.waitForTimeout(40); } };
  await cd(0, 5); await cd(1, 3); await cd(2, 4); await p.click('#openPaint'); await p.waitForTimeout(1100); console.log('paint open:', JSON.stringify(await st()), await msg()); await shot('paint-drop');
  await p.waitForTimeout(1200); await tap('ae_cupboard'); await noOverflow('inside paint'); await shot('inside-paint'); await p.click('#insideSlip'); await p.waitForTimeout(800); await noOverflow('slipAr'); await back();
  console.log('slipAr:', JSON.stringify(await st()));
  // hall
  await turnTo('as'); await go('as_door'); await turnTo('h3'); await go('h_hall'); console.log('hall', JSON.stringify(await st()));
  await tap('hn_bars'); console.log('bars without beater:', await msg());
  await tap('hn_drawer'); console.log('drawer closed:', await msg());
  await turnTo('hw'); await shot('blocks-rest'); await tap('hw_blocks', 500); await shot('blocks-mid'); await p.waitForTimeout(2300); await shot('blocks-after'); console.log('blocks:', await msg(), JSON.stringify(await st()));
  await tap('hw_mallet'); console.log('mallet:', JSON.stringify(await st()));
  await turnTo('he'); await tap('he_lock'); console.log('star lock:', await msg());
  // use star key on the lock
  await p.click('.slot[aria-label="star key"]'); await p.waitForTimeout(200); console.log('holding:', await msg());
  await tap('ae_lock'); // not here
  await tap('he_lock', 600); console.log('unlock:', await msg(), JSON.stringify(await st())); await shot('star-drop'); await p.waitForTimeout(1200);
  await tap('he_cabinet'); await noOverflow('inside stem'); await shot('inside-stem'); await p.click('#insideSlip'); await p.waitForTimeout(800); await back();
  console.log('slipSc:', JSON.stringify(await st()));
  // beater on the bars
  await turnTo('hn'); await p.click('.slot[aria-label="beater"]'); await p.waitForTimeout(200); await tap('hn_bars', 900); await noOverflow('bells'); await shot('bells');
  const bar = async (c) => { await p.click(`.bar[data-c="${c}"]`); await p.waitForTimeout(250); };
  for (const c of ['red','red','red','red']) await bar(c); console.log('wrong tune:', await p.textContent('#bellFb'));
  for (const c of ['green','red','blue','yellow']) await bar(c); console.log('right tune:', await p.textContent('#bellFb'));
  await p.waitForTimeout(1800); await shot('drawer-open'); console.log('drawer:', await msg(), JSON.stringify(await st()));
  await tap('hn_drawer', 800); await noOverflow('slipMu'); await back(); console.log('slipMu:', JSON.stringify(await st()));
  // hints
  await p.click('#hintBtn'); await p.waitForTimeout(300); await noOverflow('notebook'); await p.click('.nbrow:nth-child(4)'); await p.waitForTimeout(200); console.log('notebook tip:', await p.textContent('#nbFb')); await back();
  // back to corridor: locker
  await turnTo('hs'); await go('hs_doors'); await turnTo('h1'); await tap('h_locker'); await noOverflow('locker');
  const dial = async (i, n) => { for (let k=0;k<n;k++){ await p.click(`.dial[data-i="${i}"]`); await p.waitForTimeout(50); } };
  await dial(0, 4); await dial(1, 3); await dial(2, 6); await p.click('#openLocker'); await p.waitForTimeout(1200);
  await tap('h_locker', 2600); await shot('end-beat'); console.log('ending shown:', await p.evaluate(() => !document.getElementById('endUI').hidden), JSON.stringify(await st())); await shot('end');
  // phone and large-size overflow checks on the close-ups, opened through their hotspots
  for (const [w,h] of [[844,390],[2000,1200]]){ await p.setViewportSize({width:w,height:h}); await p.waitForTimeout(300);
    await p.evaluate(() => { document.getElementById('endUI').hidden = true; S.got.push('music'); S.room='art'; S.view=0; S.paintOpen=false; S.stemOpen=false; render(); });
    await tap('an_moth'); await noOverflow(`moth ${w}`); await back(); await turnTo('ae'); await tap('ae_lock'); await noOverflow(`paintlock ${w}`); await back();
    await p.evaluate(() => { S.room='hall'; S.view=0; S.beater=true; render(); }); await tap('hn_bars'); await noOverflow(`bells ${w}`); await back();
    await p.click('.slot[aria-label="page of music"]'); await p.waitForTimeout(200); await noOverflow(`music ${w}`); await back();
    await p.click('#hintBtn'); await p.waitForTimeout(200); await noOverflow(`notebook ${w}`); await back();
    const ovp = await p.evaluate(() => document.documentElement.scrollHeight > innerHeight || document.documentElement.scrollWidth > innerWidth); console.log('page overflow', w, ovp); }
  console.log('errors:', errors.length ? errors : 'none');
  await b.close();
})();
