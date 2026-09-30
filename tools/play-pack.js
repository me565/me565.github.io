const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const p = await b.newPage({viewport:{width:1180,height:820}});
  const errors = []; p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type()==='error' && !/CERT|google|net::/.test(m.text())) errors.push(m.text()); });
  await p.goto('http://localhost:8765/next/landscape/?stage=school', {waitUntil:'networkidle'}); await p.evaluate(() => { try{ localStorage.clear(); }catch(e){} }); await p.reload({waitUntil:'networkidle'}); await p.waitForTimeout(900); if (!(await p.evaluate(() => document.getElementById('comic').hidden))) await p.click('#cskip'); await p.waitForTimeout(300); if (!(await p.evaluate(() => document.getElementById('stagecard').hidden))) await p.click('#cardGo'); await p.waitForTimeout(300);
  await p.evaluate(() => startStage('packing')); await p.waitForTimeout(2500); if (!(await p.evaluate(() => document.getElementById('comic').hidden))) await p.click('#cskip'); await p.waitForTimeout(300); await p.screenshot({path:'pp-card.png'}); await p.click('#cardGo'); await p.waitForTimeout(300);
  const st = () => p.evaluate(() => ({room:S.room, view:S.view, got:S.got.join(','), packed:S.packed.join(','), moths:S.moths.join(''), list:S.listRead, pc:S.postcardRead, eh:S.ehnoteRead, dr:S.drawingSeen, fort:S.fortOpen, key:S.keyTaken, turned:S.keyTurned, stuck:S.drawerStuck, tip:S.mumTip, done:S.done}));
  const msg = () => p.textContent('#msg');
  const tap = async (id, wait=400) => { const n = await p.locator(`.hs[data-id="${id}"]`).count(); if (!n){ console.log('NO HOTSPOT', id, JSON.stringify(await st())); return; } await p.click(`.hs[data-id="${id}"]`, {force:true}); await p.waitForTimeout(wait); };
  const turnTo = async (view) => { for (let i=0;i<5;i++){ const v = await p.evaluate(() => ROOMS[S.room].views[S.view]); if (v===view) return; await p.click('#right'); await p.waitForTimeout(320); } console.log('could not turn to', view); };
  const go = async (id) => { await tap(id, 1600); };
  const back = async () => { await p.keyboard.press('Escape'); await p.waitForTimeout(250); };
  const hold = async (name) => { await p.click(`.slot[aria-label="${name}"]`); await p.waitForTimeout(150); };
  const noOverflow = async (label) => { const r = await p.evaluate(() => { const c = document.querySelector('#closeup .card'); if (!c) return 'no card'; const cu = document.querySelector('#closeup').getBoundingClientRect(), r = c.getBoundingClientRect(); return (c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1) ? 'inner' : (r.bottom > cu.bottom + 1 || r.right > cu.right + 1 ? 'outer' : false); }); if (r !== false) console.log('OVERFLOW?', label, r); };
  const shot = async (n) => p.screenshot({path:`pp-${n}.png`});
  console.log('start', JSON.stringify(await st())); await shot('b1');
  await tap('b_case'); console.log('case:', await msg());
  await turnTo('b2'); await shot('b2'); await tap('b_list', 900); await noOverflow('list'); await shot('list'); await back();
  await turnTo('b3'); await shot('b3'); await tap('b_moth2', 300); await tap('b_pencilcase'); console.log('tape:', await msg());
  await turnTo('b4'); await shot('b4'); await tap('b_jumper'); await tap('b_moth1', 300); console.log('moths', JSON.stringify(await st()));
  await turnTo('b2'); await go('b_door'); console.log('living', JSON.stringify(await st())); await shot('l2');
  await tap('lv_globe'); console.log('globe:', await msg()); await tap('l_orchid'); await tap('l_moth3', 300);
  await turnTo('l1'); await shot('l1'); await tap('l_drawer'); console.log('drawer locked:', await msg()); await tap('l_hooks'); await noOverflow('hooks'); await shot('hooks');
  await p.click('#hooks .book[data-i="2"]'); await p.waitForTimeout(200); console.log('bike:', await p.textContent('#hookFb')); await p.click('#hooks .book[data-i="0"]'); await p.waitForTimeout(400); console.log('key:', JSON.stringify(await st()));
  await hold('desk key'); await tap('l_drawer', 900); await noOverflow('drawer'); await shot('drawer');
  { const box = await p.locator('#hands').boundingBox(); const cx = box.x + box.width/2, cy = box.y + box.height*0.6; await p.mouse.move(cx, cy); await p.mouse.down(); await p.mouse.move(cx, cy + box.height*0.15, {steps:8}); await p.mouse.up(); await p.waitForTimeout(200); console.log('pull:', await p.textContent('#handsFb')); } await back();
  await tap('l_paper'); console.log('paper:', await msg());
  await turnTo('l3'); await shot('l3'); await tap('l_halldrawer'); console.log('hall drawer before postcard:', await msg()); await tap('l_fort'); console.log('fort before note:', await msg());
  await turnTo('l4'); await shot('l4'); await tap('l_moth4', 300); await go('l_kitchen'); console.log('kitchen', JSON.stringify(await st())); await shot('k4');
  await tap('k_jars'); await noOverflow('jars'); await shot('jars'); await p.click('#jars .book[data-i="0"]'); await p.waitForTimeout(200); console.log('jam:', await p.textContent('#jarFb')); await p.click('#jars .book[data-i="2"]'); await p.waitForTimeout(400); console.log('kaya:', await msg());
  await tap('k_moth6', 300);
  await turnTo('k1'); await shot('k1'); await tap('k_mum'); console.log('mum before tip:', await msg()); await tap('k_mum', 600); console.log('mum tip:', await msg(), JSON.stringify(await st()));
  await turnTo('k2'); await shot('k2'); await tap('k_postcard', 900); await noOverflow('postcard'); await shot('postcard'); await back(); await tap('k_drawing', 900); await noOverflow('drawing'); await shot('drawing'); await back(); await tap('k_moth5', 300);
  // wrap the present in the strip
  await hold('moth paper'); await p.click('.slot[aria-label="jar of kaya"]'); await p.waitForTimeout(300); console.log('wrap:', await msg(), JSON.stringify(await st()));
  await hold('sticky tape'); await p.click('.slot[aria-label="half-wrapped present"]'); await p.waitForTimeout(300); console.log('tape:', await msg(), JSON.stringify(await st()));
  // back to the living room: fort, then the drawer
  await turnTo('k3'); await go('k_door'); await turnTo('l3'); await tap('l_halldrawer', 900); await noOverflow('eh note'); await back(); console.log('note:', JSON.stringify(await st()));
  await tap('l_fort'); await noOverflow('fort'); await shot('fort');
  for (const n of ['cloud','sun','star']) { await p.click(`#fort .sym[data-n="${n}"]`); await p.waitForTimeout(120); } await p.click('#knock'); await p.waitForTimeout(300); console.log('wrong pw:', await p.textContent('#fortFb'));
  for (const n of ['sun','star','moon']) { await p.click(`#fort .sym[data-n="${n}"]`); await p.waitForTimeout(120); } await p.click('#knock'); await p.waitForTimeout(1600); await noOverflow('in fort'); await shot('infort'); await p.click('#fortTorch'); await p.waitForTimeout(400); console.log('torch:', JSON.stringify(await st()));
  await turnTo('l1'); await tap('l_drawer', 600); { const box = await p.locator('#hands').boundingBox(); const cx = box.x + box.width/2, cy = box.y + box.height*0.6; await p.mouse.move(cx, cy); await p.mouse.down(); await p.mouse.move(cx, cy - box.height*0.05, {steps:6}); await p.waitForTimeout(60); await p.mouse.move(cx, cy + box.height*0.26, {steps:10}); await p.waitForTimeout(300); await p.mouse.up(); await p.waitForTimeout(1300); } console.log('passports:', JSON.stringify(await st()));
  // notebook
  await p.click('#hintBtn'); await p.waitForTimeout(300); await noOverflow('notebook'); await shot('notebook'); await back();
  // pack
  await turnTo('l4'); await go('l_bedroom'); await turnTo('b1');
  for (const it of ['torch','passports','jumper']) { await hold(it); await tap('b_case', 900); console.log(it, await msg()); }
  await shot('packing');
  await hold("Nana's present"); await tap('b_case', 900); console.log('present:', await msg()); await shot('packed');
  await tap('b_case', 600); await noOverflow('zip'); await shot('zip0');
  // the zip: a stray tap away from the pull does nothing; then drag the pull along the path in small steps
  const P = async (px, py) => { const r = await p.evaluate(() => { const b = document.getElementById('dragpic').getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; }); return [r[0] + px/100*r[2], r[1] + py/100*r[3]]; };
  let [mx, my] = await P(60, 20); await p.mouse.click(mx, my); console.log('stray tap:', await p.textContent('#dragFb'));
  [mx, my] = await P(16, 41); await p.mouse.move(mx, my); await p.mouse.down();
  const path = [[16,41],[29,64],[84,46]]; for (let seg = 1; seg < path.length; seg++){ for (let i = 1; i <= 25; i++){ const u = i/25; const x = path[seg-1][0] + (path[seg][0]-path[seg-1][0])*u, y = path[seg-1][1] + (path[seg][1]-path[seg-1][1])*u; [mx, my] = await P(x, y); await p.mouse.move(mx, my); await p.waitForTimeout(12); } if (seg === 1) await shot('zip-mid'); }
  await p.mouse.up(); await p.waitForTimeout(400); console.log('zip:', await p.evaluate(() => S.zipped)); await shot('zip-done');
  await p.waitForTimeout(3200); console.log('end shown:', await p.evaluate(() => !document.getElementById('endUI').hidden), JSON.stringify(await st())); await shot('end');
  for (const [w,h] of [[844,390],[2000,1200]]){ await p.setViewportSize({width:w,height:h}); await p.waitForTimeout(300);
    await p.evaluate(() => { document.getElementById('endUI').hidden = true; S.room='living'; S.view=0; S.keyTaken=false; S.keyTurned=true; S.passportsOut=false; S.mumTip=true; render(); });
    await tap('l_hooks'); await noOverflow(`hooks ${w}`); await back(); await tap('l_drawer'); await noOverflow(`drawer ${w}`); await back();
    await p.evaluate(() => { S.view=2; S.fortOpen=false; S.ehnoteRead=true; render(); }); await tap('l_fort'); await noOverflow(`fort ${w}`); await back(); await tap('l_halldrawer'); await noOverflow(`ehnote ${w}`); await back();
    await p.evaluate(() => { S.room='kitchen'; S.view=1; render(); }); await tap('k_drawing'); await noOverflow(`drawing ${w}`); await back(); await tap('k_postcard'); await noOverflow(`postcard ${w}`); await back();
    await p.evaluate(() => { S.view=3; S.kayaTaken=false; render(); }); await tap('k_jars'); await noOverflow(`jars ${w}`); await back();
    await p.click('#hintBtn'); await p.waitForTimeout(200); await noOverflow(`notebook ${w}`); if (w===844) await shot('phone-nb'); await back();
    await p.evaluate(() => { S.room='bedroom'; S.view=1; render(); }); await tap('b_list'); await noOverflow(`list ${w}`); await back();
    const ovp = await p.evaluate(() => document.documentElement.scrollHeight > innerHeight || document.documentElement.scrollWidth > innerWidth); console.log('page overflow', w, ovp); }
  await p.setViewportSize({width:1180,height:820}); await p.evaluate(() => { S.room='living'; S.view=2; render(); }); await p.waitForTimeout(300); await shot('strip');
  console.log('errors:', errors.length ? errors : 'none');
  // reload keeps the stage
  await p.reload({waitUntil:'networkidle'}); await p.waitForTimeout(800); console.log('after reload', await p.evaluate(() => S.stage + ' ' + S.room));
  await b.close();
})();
