/* Trent Park at three screen shapes (the owner's tablet, a phone, a desktop window): every close-up checked for overflow, a few views
   screenshotted to pt/. Run: NODE_PATH=<playwright's node_modules> node tools/shots-t.js */
const { chromium } = require('playwright');
const fs = require('fs'); fs.mkdirSync('pt', {recursive:true});
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  for (const [name, vw, vh] of [['owner', 2000, 700], ['phone', 740, 360], ['desk', 2200, 1300]]){
    const p = await b.newPage({viewport:{width:vw, height:vh}});
    await p.goto('http://localhost:8765/next/landscape/?stage=park', {waitUntil:'networkidle'}); await p.evaluate(() => { try{ localStorage.clear(); }catch(e){} }); await p.reload({waitUntil:'networkidle'}); await p.waitForTimeout(1200);
    if (!(await p.evaluate(() => document.getElementById('comic').hidden))) await p.click('#cskip'); await p.waitForTimeout(300);
    if (!(await p.evaluate(() => document.getElementById('stagecard').hidden))) await p.click('#cardGo'); await p.waitForTimeout(300);
    const over = async (label) => { const r = await p.evaluate(() => { const c = document.querySelector('#closeup .card'); if (!c) return 'no card'; const cu = document.querySelector('#closeup').getBoundingClientRect(), r = c.getBoundingClientRect(); return (c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1) ? 'inner' : (r.bottom > cu.bottom + 1 || r.right > cu.right + 1 ? 'outer' : false); }); console.log(name, label, r === false ? 'ok' : 'OVERFLOW ' + r); await p.screenshot({path:`pt/${name}-${label}.png`}); await p.keyboard.press('Escape'); await p.waitForTimeout(200); };
    await p.screenshot({path:`pt/${name}-w1.png`});
    await p.evaluate(() => ITEMS.map.open()); await p.waitForTimeout(400); await over('map');
    await p.evaluate(() => STAGE.act('pw_sign')); await p.waitForTimeout(300); await over('sign');
    await p.evaluate(() => { S.got.push('card'); openNote('card'); }); await p.waitForTimeout(300); await over('card');
    await p.evaluate(() => openNote('history')); await p.waitForTimeout(300); await over('history');
    await p.evaluate(() => openNote('paper')); await p.waitForTimeout(300); await over('paper');
    await p.evaluate(() => { S.room = 'room'; S.view = 2; render(); STAGE.act('pr_box'); }); await p.waitForTimeout(300); await over('box');
    await p.evaluate(() => { S.boxOpen = true; STAGE.act('pr_box'); }); await p.waitForTimeout(300); await over('boxopen');
    await p.evaluate(() => { S.got.push('watch'); render(); ITEMS.watch.open(); }); await p.waitForTimeout(300); await over('watch');
    await p.evaluate(() => { S.room = 'moat'; S.view = 1; render(); STAGE.act('pm_carvings'); }); await p.waitForTimeout(300); await over('carvings');
    await p.evaluate(() => { S.room = 'obelisk'; S.view = 0; render(); }); await p.waitForTimeout(500); await p.screenshot({path:`pt/${name}-o1.png`});
    await p.evaluate(() => { S.dusk = true; S.gateOpen = true; S.houseSeen = true; S.room = 'moat'; S.view = 3; render(); }); await p.waitForTimeout(600); await p.screenshot({path:`pt/${name}-m4.png`});
    await p.evaluate(() => showEnd('The house in the trees', 'Trent Park, at dusk! Nana’s map had a cross by the obelisk, and a lamp in the big house was flashing a word in the listeners’ tap code: EAR. The box it opened had a note in it from a girl called N., age nine, and I dug up her key where the obelisk’s shadow points. Jedi’s watch had stopped, so I read the time off the sundial (twenty to eight) and while I was looking down the whole park turned blue. Then, through a little gate in an old wall in the wood: a house. With moths. Nana just said: go on, then. So I am going.', 'The oldest tape in the museum tapped NANA. I think N. is Nana. ★')); await p.waitForTimeout(2600);
    const pc = await p.evaluate(() => { const c = document.querySelector('#postcard .pmsg'); return c ? (c.scrollHeight > c.clientHeight + 1 ? 'OVERFLOW' : 'ok') : 'none'; }); console.log(name, 'postcard', pc); await p.screenshot({path:`pt/${name}-end.png`});
    const scroll = await p.evaluate(() => document.documentElement.scrollHeight > innerHeight + 1 || document.documentElement.scrollWidth > innerWidth + 1); console.log(name, 'page scroll', scroll);
    await p.close();
  }
  await b.close();
})();
