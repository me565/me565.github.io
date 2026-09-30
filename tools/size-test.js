const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  for (const [w, h, name] of [[740, 360, 'phone'], [2200, 1300, 'desk']]){
    for (const stage of ['eschool', 'zschool']){
      const p = await b.newPage({viewport:{width:w, height:h}});
      const errors = []; p.on('pageerror', e => errors.push(e.message));
      await p.goto(`http://localhost:8765/next/landscape/?stage=${stage}`, {waitUntil:'networkidle'}); await p.evaluate(() => { try{ localStorage.clear(); }catch(e){} }); await p.reload({waitUntil:'networkidle'}); await p.waitForTimeout(800); await p.click('#cardGo'); await p.waitForTimeout(300);
      const noOverflow = async (label) => { const r = await p.evaluate(() => { const c = document.querySelector('#closeup .card'); if (!c) return 'no card'; const cu = document.querySelector('#closeup').getBoundingClientRect(), r = c.getBoundingClientRect(); return (c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1) ? 'inner' : (r.bottom > cu.bottom + 1 || r.right > cu.right + 1 ? 'outer' : false); }); console.log(name, stage, label, r === false ? 'fits' : 'OVERFLOW ' + r); };
      const pageScroll = await p.evaluate(() => document.documentElement.scrollHeight > innerHeight + 1 || document.documentElement.scrollWidth > innerWidth + 1); if (pageScroll) console.log(name, stage, 'PAGE SCROLLS');
      if (stage === 'eschool'){
        await p.click('.hs[data-id="e_card"]', {force:true}); await p.waitForTimeout(500); await noOverflow('card note'); await p.keyboard.press('Escape');
        await p.click('#right'); await p.waitForTimeout(400); await p.click('.hs[data-id="e_run"]', {force:true}); await p.waitForTimeout(500); await noOverflow('run'); await p.screenshot({path:`sz-${name}-run.png`}); await p.keyboard.press('Escape');
        await p.click('.hs[data-id="e_tank"]', {force:true}); await p.waitForTimeout(500); await noOverflow('notebook'); await p.keyboard.press('Escape');
        await p.click('#right'); await p.waitForTimeout(400); await p.click('.hs[data-id="e_pegs"]', {force:true}); await p.waitForTimeout(500); await noOverflow('pegs'); await p.screenshot({path:`sz-${name}-pegs.png`}); await p.keyboard.press('Escape');
      } else {
        await p.click('.hs[data-id="z_shelf"]', {force:true}); await p.waitForTimeout(500); await noOverflow('bottles'); await p.keyboard.press('Escape');
        await p.click('#right'); await p.waitForTimeout(400); await p.click('#right'); await p.waitForTimeout(400); await p.click('.hs[data-id="z_shelf3"]', {force:true}); await p.waitForTimeout(500); await noOverflow('instruments'); await p.screenshot({path:`sz-${name}-inst.png`}); await p.keyboard.press('Escape');
        await p.click('#hintBtn'); await p.waitForTimeout(1400); await p.screenshot({path:`sz-${name}-point.png`});
      }
      if (errors.length) console.log(name, stage, 'ERRORS', errors);
      await p.close();
    }
  }
  await b.close();
})();
