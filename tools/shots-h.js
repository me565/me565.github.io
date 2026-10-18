/* Packing day (version 2) at three screen shapes (the owner's tablet, a phone, a desktop window): every close-up checked for overflow, a few views
   screenshotted to pt/. Run: NODE_PATH=<playwright's node_modules> node tools/shots-t.js */
const { chromium } = require('playwright');
const fs = require('fs'); fs.mkdirSync('ph', {recursive:true});
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  for (const [name, vw, vh] of [['owner', 2000, 700], ['phone', 740, 360], ['desk', 2200, 1300]]){
    const p = await b.newPage({viewport:{width:vw, height:vh}});
    await p.goto('http://localhost:8765/next/landscape/?stage=packing', {waitUntil:'networkidle'}); await p.evaluate(() => { try{ localStorage.clear(); }catch(e){} }); await p.reload({waitUntil:'networkidle'}); await p.waitForTimeout(1200);
    if (!(await p.evaluate(() => document.getElementById('comic').hidden))) await p.click('#cskip'); await p.waitForTimeout(300);
    if (!(await p.evaluate(() => document.getElementById('stagecard').hidden))) await p.click('#cardGo'); await p.waitForTimeout(300);
    const over = async (label) => { const r = await p.evaluate(() => { const c = document.querySelector('#closeup .card'); if (!c) return 'no card'; const cu = document.querySelector('#closeup').getBoundingClientRect(), r = c.getBoundingClientRect(); return (c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1) ? 'inner' : (r.bottom > cu.bottom + 1 || r.right > cu.right + 1 ? 'outer' : false); }); console.log(name, label, r === false ? 'ok' : 'OVERFLOW ' + r); await p.screenshot({path:`ph/${name}-${label}.png`}); await p.keyboard.press('Escape'); await p.waitForTimeout(200); };
    await p.screenshot({path:`ph/${name}-m4.png`});
    await p.evaluate(() => STAGE.act('mr_diary')); await p.waitForTimeout(300); await over('diary');
    await p.evaluate(() => { S.room = 'mary'; S.view = 2; render(); STAGE.act('mr_board'); }); await p.waitForTimeout(400); await over('board');
    await p.evaluate(() => openNote('postcard')); await p.waitForTimeout(300); await over('postcard');
    await p.evaluate(() => openNote('list')); await p.waitForTimeout(300); await over('list');
    await p.evaluate(() => openNote('booking')); await p.waitForTimeout(300); await over('booking');
    await p.evaluate(() => openNote('diary')); await p.waitForTimeout(300); await over('diarynote');
    await p.evaluate(() => { S.room = 'kitchen'; S.view = 1; render(); STAGE.act('nr_fridge'); }); await p.waitForTimeout(400); await over('fridge');
    await p.evaluate(() => { S.room = 'dining'; S.view = 0; render(); STAGE.act('dr_map'); }); await p.waitForTimeout(400); await over('worldmap');
    await p.evaluate(() => { S.room = 'living'; S.view = 1; render(); STAGE.act('lr_sofa'); }); await p.waitForTimeout(400); await over('sofa');
    await p.evaluate(() => { S.room = 'parents'; S.view = 0; S.dadAsked = true; render(); STAGE.act('pr_chest'); }); await p.waitForTimeout(300); await over('chest');
    await p.evaluate(() => { S.room = 'yard'; S.view = 1; render(); STAGE.act('yr_boxes'); }); await p.waitForTimeout(400); await over('boxes');
    await p.evaluate(() => { S.room = 'kitchen'; S.view = 0; S.clear = true; render(); }); await p.waitForTimeout(500); await p.screenshot({path:`ph/${name}-n1-gold.png`});
    await p.evaluate(() => showEnd('Taxi’s here', 'In the taxi, next to you both, which is a silly place to write to you from, but Nana says write everything down. Dad hid all three things, and told me where through the bathroom door: the passports in his drawer (code 2145, Mum moved the flight), Nana’s present in the yard in the box with Elliot’s rocket on it, and the torch was in Zaina’s oven, being a cake, until I found Peanut under the fourth sofa cushion. The rain stopped the moment the case was full. Fourteen hours to Nana.', 'My diary’s padlock said ATTIC: Nana’s postcards, in order. “The moth is real. Ask me in the attic.” ★')); await p.waitForTimeout(2600);
    const pc = await p.evaluate(() => { const c = document.querySelector('#postcard .pmsg'); return c ? (c.scrollHeight > c.clientHeight + 1 ? 'OVERFLOW' : 'ok') : 'none'; }); console.log(name, 'postcard', pc); await p.screenshot({path:`ph/${name}-end.png`});
    const scroll = await p.evaluate(() => document.documentElement.scrollHeight > innerHeight + 1 || document.documentElement.scrollWidth > innerWidth + 1); console.log(name, 'page scroll', scroll);
    await p.close();
  }
  await b.close();
})();
