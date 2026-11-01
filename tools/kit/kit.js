/* Layer: engine. The testing kit's shared verdict (docs: tools/kit/README.md).
   Every play script calls watch(p) before it opens the game and finish(p, b, {...}) instead of b.close().
   finish() decides pass or fail the same way for every stage, prints one "KIT PASS <stage>" or "KIT FAIL <stage>: ..." line,
   sets the exit code, and, when KIT_SAVES names a folder, writes the saves the play made there for the save check. */
const fs = require('fs'), path = require('path');

/* Records every save the game writes, in order, so the save check gets a save from the middle of a level as well as the end. */
async function watch(p){
  await p.addInitScript(() => {
    window.__kitSaves = [];
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function(k, v){
      try{ if (this === window.localStorage && /^mothhouse\.landscape\.v\d+\.(?!last$)/.test(k)) window.__kitSaves.push([k, v]); }catch(e){}
      return set.call(this, k, v);
    };
  });
}

/* extra: {errors: [...page errors], failed: [...the script's own failed checks], fails: number} — whatever the script kept. */
async function finish(p, b, extra = {}){
  const why = [];
  let stage = '?';
  try{
    const r = await p.evaluate(() => ({
      stage: typeof S !== 'undefined' && S ? S.stage : null,
      done: typeof S !== 'undefined' && S ? !!S.done : false,
      endDrawn: !!(document.getElementById('endTitle') && document.getElementById('endTitle').textContent.trim()),
      saves: window.__kitSaves || []
    }));
    stage = r.stage || '?';
    if (!r.done) why.push('the stage never counted as done');
    if (!r.endDrawn) why.push('the end card was never drawn');
    if (process.env.KIT_SAVES && r.saves.length){
      const dir = process.env.KIT_SAVES; fs.mkdirSync(dir, {recursive:true});
      const progressed = r.saves.filter(([, v]) => { try{ const s = JSON.parse(v); return s.got && s.got.length && !s.done; }catch(e){ return false; } });
      const mid = progressed[Math.floor(progressed.length / 2)], end = r.saves[r.saves.length - 1];
      for (const [name, pair] of [['mid', mid], ['end', end]]){
        if (!pair) continue;
        fs.writeFileSync(path.join(dir, `${stage}-${name}.json`), JSON.stringify({key:pair[0], save:JSON.parse(pair[1])}, null, 1) + '\n');
      }
    }
  }catch(e){ why.push('could not read the game state: ' + e.message.split('\n')[0]); }
  const errors = extra.errors || [], failed = [...new Set(extra.failed || [])];
  if (errors.length) why.push(`${errors.length} page error(s): ${errors.slice(0, 3).join(' / ')}`);
  if (failed.length) why.push(`${failed.length} failed check(s): ${failed.slice(0, 5).join(' / ')}`);
  if (extra.fails) why.push(`${extra.fails} failed check(s)`);
  console.log(why.length ? `KIT FAIL ${stage}: ${why.join('; ')}` : `KIT PASS ${stage}`);
  if (why.length) process.exitCode = 1;
  await b.close();
  return !why.length;
}

module.exports = {watch, finish};
