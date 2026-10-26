/* The polish walk for the second test level, Packing Day (checklist 36, 36b, 37, 43): every view in each of the level's states, and every
   close-up its hotspots open, at the owner's three screen shapes, with overflow and off-screen checks. Close-ups are tapped through at the
   owner's tablet shape (2000×700) only; the other shapes walk the views.
   node tools/polish-e2.js (server on 8765; SHOTS=dir for the screenshots). Reduced motion: REDUCE=1 node tools/play-e2.js. */
const { chromium } = require('playwright');
const OUT = (process.env.SHOTS || '/tmp') + '/polish-e2-';
/* the level's states, each laid over a fresh save: what changes in the rooms as the puzzle goes */
const STATES = {
  start:{},
  middle:{taken:{drawing:true, stool:true, shelly:true}, got:['drawing', 'stool', 'shelly'], tubMoved:true, bathMoved:true, wardOpen:true, stoolAt:false, botOut:true, trundleOut:true, lightsOff:false, seen:{list:1, drawer:1, jam:1, box:1, folder:1, enote:1}},
  late:{taken:{drawing:true, stool:true, shelly:true, paper:true, tape:true, hat:true, sheet:true, passport:true}, got:[], tubMoved:true, bathMoved:true, wardOpen:true, stoolAt:true, boxOpen:true, botOut:true, trundleOut:true, traded:true, chorusHeard:true, houseOpen:true, wrapped:true, packed:{carol:true, hat:true, present:true, passport:true}, seen:{list:1}},
  shut:{taken:{drawing:true, stool:true, shelly:true, paper:true, tape:true, hat:true, sheet:true, passport:true}, got:[], tubMoved:true, bathMoved:true, wardOpen:false, stoolAt:true, boxOpen:true, botOut:true, trundleOut:true, traded:true, houseOpen:true, wrapped:true, packed:{carol:true, hat:true, present:true, passport:true}, caseShut:true, lightsOff:true, seen:{list:1}},
};
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}); let total = 0;
  for (const [w, h] of [[2000, 700], [740, 360], [2200, 1300]]){
    const p = await b.newPage({viewport:{width:w, height:h}}); const errs = []; p.on('pageerror', e => errs.push(e.message)); const notes = []; let n = 0;
    const shot = async name => { await p.screenshot({path:`${OUT}${w}x${h}-${String(++n).padStart(3, '0')}-${name}.png`}); total++; };
    const check = async label => { const r = await p.evaluate(() => { const out = {}; const c = document.querySelector('#closeup .card'); if (c && !document.getElementById('closeup').hidden){ out.inner = c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1; const r = c.getBoundingClientRect(); out.cardOff = r.left < -1 || r.right > innerWidth + 1 || r.top < -1 || r.bottom > innerHeight + 1; const spill = [...c.querySelectorAll('p, .ofb, .otitle')].filter(e => e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2).length; if (spill) out.spill = spill; } out.page = document.documentElement.scrollHeight > innerHeight + 1 || document.documentElement.scrollWidth > innerWidth + 1; out.off = ['inv', 'scene', 'msg'].map(id => { const r = document.getElementById(id).getBoundingClientRect(); return [id, r.left < -1 || r.right > innerWidth + 1 || r.bottom > innerHeight + 1]; }).filter(x => x[1]).map(x => x[0]); return out; }); if (r.inner || r.cardOff || r.page || r.off.length || r.spill) notes.push(`${label}: ${JSON.stringify(r)}`); };
    const close = async () => { await p.keyboard.press('Escape'); await p.waitForTimeout(200); await p.evaluate(() => { if (!document.getElementById('closeup').hidden) closeCloseup(); }); };
    await p.goto('http://localhost:8765/next/landscape/?stage=eval2&fresh', {waitUntil:'networkidle'}); await p.waitForTimeout(900);
    await p.evaluate(() => { const f = document.getElementById('fsask'); if (f && !f.hidden){ const bt = f.querySelector('button:last-of-type'); if (bt) bt.click(); else f.hidden = true; } });
    for (let k = 0; k < 6; k++){ if (await p.evaluate(() => document.getElementById('comic').hidden)) break; if (k % 2 === 1){ await p.waitForTimeout(400); await shot(`comic-${(k + 1)/2}`); await check(`comic page ${(k + 1)/2}`); } await p.evaluate(() => document.getElementById('comic').click()); await p.waitForTimeout(400); }
    await p.evaluate(() => { if (!document.getElementById('comic').hidden) document.getElementById('cskip').click(); }); await p.waitForTimeout(500);
    await shot('card'); await check('title card');
    if (!(await p.evaluate(() => document.getElementById('stagecard').hidden))) await p.evaluate(() => document.getElementById('cardGo').click()); await p.waitForTimeout(900);
    const fresh = await p.evaluate(() => JSON.stringify(STAGE.fresh()));
    for (const [sname, st] of Object.entries(STATES)){
      const views = await p.evaluate(([f, st]) => { const s = Object.assign(JSON.parse(f), JSON.parse(JSON.stringify(st))); Object.keys(s).forEach(k => S[k] = s[k]); S.held = null; save(); return Object.entries(ROOMS).flatMap(([r, R]) => R.views.map((v, i) => [r, i, v])); }, [fresh, st]);
      for (const [room, i, v] of views){
        await p.evaluate(([r, i]) => { S.room = r; S.view = i; S.held = null; save(); render(); say(''); }, [room, i]); await p.waitForTimeout(450);
        await shot(`${sname}-${v}`); await check(`${sname} ${v}`);
        if (w !== 2000) continue;
        const ids = await p.evaluate(v => HOTS[v].filter(h => !h.secret).map(h => h.id), v);
        for (const id of ids){
          await p.evaluate(([r, i]) => { if (!document.getElementById('closeup').hidden) closeCloseup(); S.room = r; S.view = i; S.held = null; render(); }, [room, i]); await p.waitForTimeout(100);
          if (!(await p.locator(`.hs[data-id="${id}"]`).count())) continue;
          const isDoor = await p.evaluate(id => !!(STAGE.doors || {})[id], id); if (isDoor) continue;
          await p.evaluate(id => document.querySelector(`.hs[data-id="${id}"]`).click(), id); await p.waitForTimeout(700);
          if (await p.evaluate(() => !document.getElementById('closeup').hidden)){ await shot(`${sname}-${v}-${id}`); await check(`${sname} ${v} ${id}`); }
          await close();
          await p.evaluate(([f, st, r, i]) => { const s = Object.assign(JSON.parse(f), JSON.parse(JSON.stringify(st))); Object.keys(s).forEach(k => S[k] = s[k]); S.room = r; S.view = i; S.held = null; save(); }, [fresh, st, room, i]);
        }
      }
    }
    await p.evaluate(() => openNotebook()); await p.waitForTimeout(300); await shot('notebook'); await check('notebook'); await close();
    await p.evaluate(() => openMenu()); await p.waitForTimeout(300); await shot('menu'); await check('menu'); await close();
    console.log(`${w}x${h}: ${n} screenshots; ${notes.length ? notes.join(' | ') : 'all clear'}; errors: ${errs.length ? errs.join('; ') : 'none'}`);
    await p.close();
  }
  await b.close(); console.log('total', total);
})();
