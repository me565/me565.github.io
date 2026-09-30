// pull every story-led line out of the stage files: hints, notes, cards, intros, postcards
const fs = require('fs'), vm = require('vm');
const strip = h => h.replace(/<br\s*\/?>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g,' ').replace(/\s+/g, ' ').replace(/ ([.,!?])/g, '$1').trim();
const out = {};
for (const st of ['school', 'packing', 'eschool', 'zschool']){
  const src = fs.readFileSync(`${__dirname}/../next/landscape/stages/${st}.js`, 'utf8');
  const ctx = {S:{got:[], seen:{}, moths:[], packed:[], placed:[], cogs:[], put:[], hint:{}, cdials:[0,0,0]}, registerStage:(k, s) => { ctx.STAGE = s; }, save(){}, render(){}, say(){}, sfx(){}, openCloseup(){}, closeCloseup(){}, openNote(){}, openPic(){}, animate(){}, showEnd(){}, drop(){}, go(){}, chime(){}, $(){ return {}; }, document:{querySelectorAll(){ return []; }, createElementNS(){ return {setAttribute(){}, style:{}}; }}, line(){}, pointNext(){}, rasp(){}, matchMedia(){ return {matches:false}; }, requestAnimationFrame(){}, Image:function(){}, BUILD:'x', CHILDREN:{}, setTimeout(){}, console};
  vm.createContext(ctx); vm.runInContext(src, ctx);
  const s = ctx.STAGE;
  s.hints.forEach((h, i) => h.tips.forEach((t, n) => out[`${st}.hint.${i}.${n}`] = t));
  Object.entries(s.notes).forEach(([k, n]) => out[`${st}.note.${k}`] = strip(n.html));
  if (s.card) out[`${st}.card`] = s.card.text;
  out[`${st}.intro`] = strip(s.intro);
  if (s.lines) Object.entries(s.lines).forEach(([k, t]) => out[`${st}.line.${k}`] = t); /* a stage where every tap line is spoken (Zaina's) */
  const m = src.match(/showEnd\('([^']*)',\s*'([^']*)'/); if (m) out[`${st}.postcard`] = m[2];
}
out['nb.done'] = 'That’s everything. Well done!'; out['nb.that'] = 'That one’s done. Well found.';
const eng = fs.readFileSync(`${__dirname}/../next/landscape/index.html`, 'utf8'); const tm = eng.match(/const TIPS = \{([\s\S]*?)\n\};/);
if (tm) for (const m of tm[1].matchAll(/(\w+):'((?:[^'\\]|\\.)*)'/g)) out['tip.' + m[1]] = m[2];
fs.writeFileSync(__dirname + '/lines.json', JSON.stringify(out, null, 1)); console.log(Object.keys(out).length, 'lines,', Object.values(out).join(' ').split(' ').length, 'words');
