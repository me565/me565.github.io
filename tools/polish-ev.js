/* The polish walk for the test room (checklist 36, 36b, 37, 43): every view and close-up at the owner's three screen shapes, with overflow and off-screen checks. node tools/polish-ev.js (server on 8765; SHOTS=dir for the screenshots). Reduced motion: REDUCE=1 node tools/play-ev.js. */
const { chromium } = require('playwright');
const OUT = (process.env.SHOTS || '/tmp') + '/polish-ev-';

(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  for (const [w, h] of [[2000, 700], [740, 360], [2200, 1300]]){
    const p = await b.newPage({viewport:{width:w, height:h}}); const errs = []; p.on('pageerror', e => errs.push(e.message)); const notes = [];
    const shot = n => p.screenshot({path:`${OUT}${w}x${h}-${n}.png`});
    const check = async label => { const r = await p.evaluate(() => { const out = {}; const c = document.querySelector('#closeup .card'); if (c && !document.getElementById('closeup').hidden){ out.inner = c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1; const r = c.getBoundingClientRect(); out.cardOff = r.left < -1 || r.right > innerWidth + 1 || r.top < -1 || r.bottom > innerHeight + 1; } out.page = document.documentElement.scrollHeight > innerHeight + 1 || document.documentElement.scrollWidth > innerWidth + 1; out.off = ['inv', 'scene', 'msg'].map(id => { const r = document.getElementById(id).getBoundingClientRect(); return [id, r.left < -1 || r.right > innerWidth + 1 || r.bottom > innerHeight + 1]; }).filter(x => x[1]).map(x => x[0]); return out; }); if (r.inner || r.cardOff || r.page || r.off.length) notes.push(`${label}: ${JSON.stringify(r)}`); };
    const tap = async (id, wait = 600) => { await p.evaluate(id => document.querySelector(`.hs[data-id="${id}"]`).click(), id); await p.waitForTimeout(wait); };
    const back = async () => { await p.keyboard.press('Escape'); await p.waitForTimeout(250); };
    const turnTo = async v => { for (let i = 0; i < 5; i++){ if ((await p.evaluate(() => ROOMS[S.room].views[S.view])) === v) return; await p.evaluate(() => document.getElementById('right').click()); await p.waitForTimeout(320); } };
    await p.goto('http://localhost:8765/next/landscape/?stage=evalroom&fresh', {waitUntil:'networkidle'}); await p.waitForTimeout(900);
    await p.evaluate(() => { const f = document.getElementById('fsask'); if (f && !f.hidden){ const bt = f.querySelector('button:last-of-type'); if (bt) bt.click(); else f.hidden = true; } });
    await shot('00-card'); await check('title card');
    if (!(await p.evaluate(() => document.getElementById('stagecard').hidden))) await p.evaluate(() => document.getElementById('cardGo').click()); await p.waitForTimeout(800);
    for (const v of ['c4', 'c1', 'c3', 'c2']){ await turnTo(v); await p.waitForTimeout(300); await shot(`01-${v}`); await check(v); }
    await turnTo('c4'); await tap('ev_envelope', 1200); await shot('02-note'); await check('note'); await back();
    await tap('ev_timetable'); await shot('03-timetable'); await check('timetable'); await back();
    await tap('ev_cabinet'); await shot('04-cabinet'); await check('cabinet'); await back();
    await turnTo('c2'); await tap('ev_beans'); await shot('05-pots'); await check('pots'); await back();
    await turnTo('c3'); await tap('ev_bin'); await shot('06-bin'); await check('bin'); await back();
    await tap('ev_lost'); await shot('07-box'); await check('box'); await p.evaluate(() => document.querySelector('#closeup .cuhot[data-cu="ev_hat"]').click()); await p.waitForTimeout(500); await shot('08-hat'); await check('hat'); await back();
    await turnTo('c1'); await tap('ev_tdrawer'); await shot('09-dials'); await check('dials'); await back();
    await p.evaluate(() => openNotebook()); await p.waitForTimeout(300); await shot('10-notebook'); await check('notebook'); await back();
    await p.evaluate(() => openMenu()); await p.waitForTimeout(300); await shot('11-menu'); await check('menu'); await back();
    // the ending states by hand: the open drawers' close-ups and the lock
    await p.evaluate(() => { S.cabUnlocked = true; S.cabOut = true; S.deskOpen = true; S.deskOut = true; S.got.push('dkey'); save(); render(); }); await p.waitForTimeout(400);
    await turnTo('c4'); await tap('ev_cabdrawer'); await shot('12-cab-open'); await check('cab open'); await back();
    await turnTo('c1'); await tap('ev_tdrawer'); await shot('13-desk-open'); await check('desk open'); await back();
    await turnTo('c3'); await p.evaluate(() => { S.held = 'dkey'; render(); }); await tap('ev_door', 1200); await shot('14-lock'); await check('lock'); await back();
    console.log(`${w}x${h}: ${notes.length ? notes.join(' | ') : 'all clear'}; errors: ${errs.length ? errs.join('; ') : 'none'}`);
    await p.close();
  }
  await b.close();
})();
