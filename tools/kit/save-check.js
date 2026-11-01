/* Layer: engine. The testing kit's save check (docs: tools/kit/README.md). The plan's rule: before any release, a save from the
   previous release must load and play.
   node tools/kit/save-check.js capture        plays every stage and keeps a mid-level and an end-of-level save from each in
                                               tools/kit/saves/<BUILD>/ (BUILD read from next/landscape/index.html). Run it on main
                                               right after each release, so the next release has saves to check against.
   node tools/kit/save-check.js [folder]       loads every save in the newest saves folder older than the current BUILD (or the
                                               folder named) through the title screen's Continue button, and checks the game resumes
                                               in the same stage, room and inventory, then turns and taps without a page error.
   Starts the local server on 8765 if nothing is answering there. */
const fs = require('fs'), path = require('path'), {spawnSync} = require('child_process');
const ROOT = path.resolve(__dirname, '../..'), SAVES = path.join(__dirname, 'saves'), PORT = 8765;
const BUILD = fs.readFileSync(path.join(ROOT, 'next/landscape/index.html'), 'utf8').match(/const BUILD = '([^']+)'/)[1];

function capture(){
  const dir = path.join(SAVES, BUILD); fs.rmSync(dir, {recursive:true, force:true});
  const r = spawnSync(process.execPath, [path.join(__dirname, 'run.js')], {cwd:ROOT, stdio:'inherit', env:Object.assign({}, process.env, {KIT_SAVES:dir})});
  const n = fs.existsSync(dir) ? fs.readdirSync(dir).length : 0;
  console.log(`\nKept ${n} save(s) from build ${BUILD} in tools/kit/saves/${BUILD}/.`);
  process.exit(r.status || (n ? 0 : 1));
}

async function check(folder){
  const builds = fs.existsSync(SAVES) ? fs.readdirSync(SAVES).filter(d => fs.statSync(path.join(SAVES, d)).isDirectory()).sort() : [];
  let from = folder || builds.filter(d => d < BUILD).pop();
  if (!from && builds.includes(BUILD)){ from = BUILD; console.log(`No saves from a build before ${BUILD}; checking this build's own saves instead.`); }
  if (!from){ console.log('No saves to check. Run "node tools/kit/save-check.js capture" on the released build first.'); process.exit(1); }
  const dir = path.join(SAVES, from), files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  console.log(`Loading ${files.length} save(s) from build ${from} into build ${BUILD}.`);

  const http = require('http'), {spawn} = require('child_process');
  const up = () => new Promise(res => { const r = http.get(`http://localhost:${PORT}/`, s => { s.resume(); res(true); }); r.on('error', () => res(false)); r.setTimeout(1500, () => { r.destroy(); res(false); }); });
  let srv = null; if (!(await up())){ srv = spawn('python3', ['-m', 'http.server', String(PORT)], {cwd:ROOT, stdio:'ignore'}); for (let i = 0; i < 40 && !(await up()); i++) await new Promise(r => setTimeout(r, 250)); }

  const {chromium} = require('playwright');
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  let fails = 0;
  for (const f of files){
    const {key, save} = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')), child = key.split('.').pop(), base = key.slice(0, key.lastIndexOf('.'));
    const ctx = await b.newContext({viewport:{width:1600, height:700}}), p = await ctx.newPage(), errs = [], why = [];
    p.on('pageerror', e => errs.push(e.message.split('\n')[0]));
    await p.addInitScript(([key, val, last, child]) => { if (!sessionStorage.getItem('kit.seeded')){ localStorage.setItem(key, val); localStorage.setItem(last, child); localStorage.setItem('mothhouse.howto', '1'); sessionStorage.setItem('kit.seeded', '1'); sessionStorage.setItem('mothhouse.fsasked', '1'); } }, [key, JSON.stringify(save), base + '.last', child]);
    try{
      await p.goto(`http://localhost:${PORT}/next/landscape/`, {waitUntil:'networkidle'});
      await p.evaluate(() => { const s = document.getElementById('splash'); if (s && !s.hidden) s.click(); });
      await p.waitForFunction(() => !document.getElementById('title').hidden, null, {timeout:8000});
      if (await p.evaluate(() => document.getElementById('tContinue').disabled)) why.push('Continue is greyed out on the title screen');
      else {
        await p.click('#tContinue');
        await p.waitForFunction(() => document.getElementById('title').hidden && document.getElementById('choose').hidden && typeof S !== 'undefined' && ROOMS && ROOMS[S.room], null, {timeout:15000});
        await p.waitForTimeout(800);
        const now = await p.evaluate(() => ({stage:S.stage, room:S.room, got:S.got, done:!!S.done}));
        if (now.stage !== save.stage) why.push(`resumed in ${now.stage}, saved in ${save.stage}`);
        if (now.room !== save.room) why.push(`resumed in room ${now.room}, saved in ${save.room}`);
        if (JSON.stringify(now.got) !== JSON.stringify(save.got)) why.push(`inventory ${JSON.stringify(now.got)}, saved ${JSON.stringify(save.got)}`);
        if (now.done !== !!save.done) why.push(`done is ${now.done}, saved ${!!save.done}`);
        /* and it still plays: turn round once and tap the first thing that can be tapped on the wall you face */
        await p.evaluate(() => document.getElementById('right').click()); await p.waitForTimeout(400);
        const tapped = await p.evaluate(() => { const h = [...document.querySelectorAll('.hs')].find(h => h.offsetParent !== null); if (h){ h.click(); return h.dataset.id; } return null; });
        await p.waitForTimeout(700); await p.keyboard.press('Escape'); await p.waitForTimeout(200);
        if (!tapped && !save.done) why.push('nothing to tap after turning');
      }
    }catch(e){ why.push(e.message.split('\n')[0]); }
    if (errs.length) why.push(`page error(s): ${errs.slice(0, 3).join(' / ')}`);
    console.log(why.length ? `FAIL  ${f} — ${why.join('; ')}` : `PASS  ${f}`); if (why.length) fails++;
    await ctx.close();
  }
  await b.close(); if (srv) srv.kill();
  console.log(`\n${files.length - fails} of ${files.length} saves from build ${from} load and play in build ${BUILD}.`);
  process.exit(fails ? 1 : 0);
}

if (process.argv[2] === 'capture') capture(); else check(process.argv[2]).catch(e => { console.error(e); process.exit(2); });
