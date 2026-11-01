/* Layer: engine. The testing kit's runner (docs: tools/kit/README.md).
   node tools/kit/run.js [stage ...]   plays every stage (or the ones named) by its play script and prints one line per stage.
   It starts the local server on 8765 if nothing is answering there. It fails when any stage in next/landscape/stages/ has no
   play script (the rule: no level is built until its script passes), and when any script does not end with "KIT PASS".
   KIT_SAVES=<folder> keeps the saves each play made, for tools/kit/save-check.js capture. */
const fs = require('fs'), path = require('path'), http = require('http'), {spawn, spawnSync} = require('child_process');
const ROOT = path.resolve(__dirname, '../..'), TOOLS = path.join(ROOT, 'tools'), PORT = 8765;

/* every stage the game has, from the stage plugins' registerStage('<key>' */
function stages(){
  const dir = path.join(ROOT, 'next/landscape/stages');
  return fs.readdirSync(dir).filter(f => f.endsWith('.js')).map(f => {
    const m = fs.readFileSync(path.join(dir, f), 'utf8').match(/registerStage\('([a-z0-9_]+)'/i); return m && m[1];
  }).filter(Boolean).sort();
}
/* every play script, by the stage named in its label line */
function scripts(){
  const map = {};
  for (const f of fs.readdirSync(TOOLS).filter(f => /^play-.*\.js$/.test(f))){
    const m = fs.readFileSync(path.join(TOOLS, f), 'utf8').match(/Play script for stage ([a-z0-9_]+)/i); if (m) map[m[1]] = f;
  }
  return map;
}
const up = () => new Promise(res => { const r = http.get(`http://localhost:${PORT}/`, s => { s.resume(); res(true); }); r.on('error', () => res(false)); r.setTimeout(1500, () => { r.destroy(); res(false); }); });

async function serve(){
  if (await up()) return null;
  const srv = spawn('python3', ['-m', 'http.server', String(PORT)], {cwd:ROOT, stdio:'ignore'});
  for (let i = 0; i < 40 && !(await up()); i++) await new Promise(r => setTimeout(r, 250));
  if (!(await up())){ srv.kill(); throw new Error('could not start the local server on ' + PORT); }
  return srv;
}

(async () => {
  const all = stages(), byStage = scripts(), want = process.argv.slice(2).length ? process.argv.slice(2) : all;
  const unknown = want.filter(s => !all.includes(s)); if (unknown.length){ console.log('No such stage:', unknown.join(', '), '| stages:', all.join(', ')); process.exit(2); }
  const srv = await serve();
  const outDir = path.join(TOOLS, 'kit/out'); fs.mkdirSync(outDir, {recursive:true});
  const rows = [];
  for (const st of want){
    const f = byStage[st];
    if (!f){ rows.push([st, 'FAIL', 'no play script (a level is not built until its script passes)']); continue; }
    const t0 = Date.now();
    const r = spawnSync(process.execPath, [path.join(TOOLS, f)], {cwd:ROOT, encoding:'utf8', timeout:10 * 60 * 1000, env:Object.assign({}, process.env, {SHOTS:process.env.SHOTS || outDir})});
    const log = (r.stdout || '') + (r.stderr || ''); fs.writeFileSync(path.join(outDir, `${st}.log`), log);
    const verdict = log.split('\n').reverse().find(l => l.startsWith('KIT PASS') || l.startsWith('KIT FAIL'));
    const ok = r.status === 0 && verdict && verdict.startsWith('KIT PASS');
    const why = ok ? '' : (verdict ? verdict.replace(/^KIT FAIL [^:]*: ?/, '') : (r.error ? r.error.message : `script stopped (exit ${r.status}) before its verdict; last line: ${log.trim().split('\n').pop()}`));
    rows.push([st, ok ? 'PASS' : 'FAIL', `${f}, ${Math.round((Date.now() - t0) / 1000)}s${why ? ' — ' + why : ''}`]);
    console.log(rows[rows.length - 1].join('  '));
  }
  if (srv) srv.kill();
  const failed = rows.filter(r => r[1] !== 'PASS');
  console.log(`\n${rows.length - failed.length} of ${rows.length} stages pass.${failed.length ? ' Failing: ' + failed.map(r => r[0]).join(', ') + '. Logs in tools/kit/out/.' : ''}`);
  process.exit(failed.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
