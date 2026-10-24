/* The Moth House: the checklist's automatic lines (next/CHECKLIST.md), run over every stage.
   usage: node tools/audit.js [stage ...]   (needs the local server: cd <repo> && python3 -m http.server 8765)
   Checks: cut-out proportions (B9), a shadow on things that stand (B10, listed for a look), pictures that fail to load (G38),
   hotspot bounds, size and the turn-arrow strips (E32), unique hotspot ids, close-up overflow and page scroll at three sizes (G36, G37),
   unrecorded voice keys (F34), targets low enough to sit under the caption band (32d), and an error-free run with reduced motion at the owner's screen shape (G36).
   Writes screenshots of every view to tools/audit-out/<stage>-<view>.png for the visual lines. */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'audit-out'); fs.mkdirSync(OUT, {recursive:true});
const base = 'http://localhost:8765/next/landscape/';
const lines = JSON.parse(fs.readFileSync(path.join(__dirname, 'lines.json'), 'utf8'));
const voiced = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, '../next/art/voice/index.json'), 'utf8')));
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const probe = await b.newPage(); await probe.goto(base + '?stage=school', {waitUntil:'networkidle'});
  const all = await probe.evaluate(() => Object.keys(STAGES)); await probe.close();
  const stages = process.argv.slice(2).length ? process.argv.slice(2) : all;
  const report = [];
  const say = (stage, line, what) => report.push(`${stage}\t${line}\t${what}`);
  /* hotspot ids unique across stages */
  { const p = await b.newPage(); await p.goto(base + '?stage=school', {waitUntil:'networkidle'});
    const ids = await p.evaluate(() => { const out = []; for (const [k, st] of Object.entries(STAGES)) for (const v of Object.keys(st.hots)) for (const h of st.hots[v]) out.push([k, h.id]); return out; });
    const SUP = await p.evaluate(() => Object.fromEntries(Object.entries(STAGES).map(([k, st]) => [k, st.supersedes || null]))); /* a stage built to replace another (school3 for school) may share its ids: they never load together */
    const sup = (a, b) => SUP[a] === b || SUP[b] === a;
    const seen = new Map(); ids.forEach(([k, id]) => { if (seen.has(id) && seen.get(id) !== k && !sup(k, seen.get(id))) say(k, 'E32', `hotspot id ${id} also in ${seen.get(id)}`); seen.set(id, k); }); await p.close(); }
  for (const stage of stages){
    /* voice */
    Object.keys(lines).filter(k => k.startsWith(stage + '.')).forEach(k => { if (!voiced.has(k)) say(stage, 'F34', `unrecorded: ${k}`); });
    for (const [w, h, name, reduce] of [[1600, 1000, 'tablet', false], [2000, 700, 'owner', true], [740, 360, 'phone', false], [2200, 1300, 'desk', false]]){
      const p = await b.newPage({viewport:{width:w, height:h}, reducedMotion:reduce ? 'reduce' : 'no-preference'});
      const errors = [], failed = [];
      /* only our own files count: fonts and other hosts may be blocked where the audit runs */
      const ours = u => u.startsWith(base.slice(0, base.indexOf('/next'))) && !/voice\//.test(u);
      p.on('pageerror', e => errors.push(e.message)); p.on('requestfailed', r => { if (ours(r.url())) failed.push(r.url()); }); p.on('response', r => { if (r.status() >= 400 && ours(r.url())) failed.push(r.url() + ' ' + r.status()); });
      await p.goto(base + `?stage=${stage}`, {waitUntil:'networkidle'}); await p.evaluate(() => { try{ localStorage.clear(); }catch(e){} }); await p.reload({waitUntil:'networkidle'}); await p.waitForTimeout(900);
      if (!(await p.evaluate(() => document.getElementById('comic').hidden))) await p.click('#cskip'); await p.waitForTimeout(300);
      if (!(await p.evaluate(() => document.getElementById('stagecard').hidden))) await p.click('#cardGo'); await p.waitForTimeout(300);
      const scroll = await p.evaluate(() => document.documentElement.scrollHeight > innerHeight + 1 || document.documentElement.scrollWidth > innerWidth + 1); if (scroll) say(stage, 'G37', `page scrolls at ${name}`);
      /* the strip, the scene and the caption all inside the window (the body hides overflow, so a scroll test misses it): the inventory's second column was off the owner's tablet, 24 Oct 2026 */
      const off = await p.evaluate(() => ['inv', 'scene', 'msg'].map(id => { const r = document.getElementById(id).getBoundingClientRect(); return [id, Math.round(r.left), Math.round(r.right), Math.round(r.bottom)]; }).filter(([id, l, r, b]) => l < -1 || r > innerWidth + 1 || b > innerHeight + 1)); if (off.length) say(stage, 'G37', `off the screen at ${name}: ${off.map(o => o.join(' ')).join('; ')}`);
      const views = await p.evaluate(() => Object.entries(ROOMS).flatMap(([r, R]) => R.views.map((v, i) => [r, i, v])));
      for (const [room, i, v] of views){
        await p.evaluate(([r, i]) => { S.room = r; S.view = i; save(); render(); say(''); }, [room, i]); await p.waitForTimeout(name === 'tablet' ? 900 : 250);
        if (name === 'tablet'){
          const facts = await p.evaluate(v => { const out = []; (LAYERS[v] || []).forEach(L => { if (!L.src) return; const im = IMG[L.src]; out.push({src:L.src.split('/').pop(), group:L.group || '', w:L.w, h:L.h, shadow:!!L.shadow, glass:!!L.glass, lit:L.lit || 0, idle:L.idle || '', kind:L.kind || ''}); }); return out; }, v);
          for (const L of facts){
            const dims = await p.evaluate(src => new Promise(res => { const im = new Image(); im.onload = () => res([im.naturalWidth, im.naturalHeight]); im.onerror = () => res(null); im.src = LAYERS && Object.values(LAYERS).flat().find(x => x.src && x.src.endsWith(src)).src + '?v=' + BUILD; }), L.src);
            if (!dims){ say(stage, 'G38', `${v}: ${L.src} did not load`); continue; }
            if (L.kind === 'block' || L.idle === 'swim') {} else { const want = L.w*dims[1]/dims[0]*16/9; if (Math.abs(L.h - want)/want > 0.04) say(stage, 'B9', `${v}: ${L.src} box ${L.w}×${L.h} but the picture wants h=${want.toFixed(2)}`); }
            if (!L.shadow && !L.glass && !L.lit && L.idle !== 'sway' && L.idle !== 'swim') say(stage, 'B10?', `${v}: ${L.src} has no shadow (fine if it hangs, lies flat on a wall, or is inside something)`);
          }
          const hs = await p.evaluate(v => HOTS[v].map(h => ({id:h.id, l:h.l, t:h.t, w:h.w, h:h.h, secret:!!h.secret})), v);
          for (const h of hs){
            if (h.l < 0 || h.t < 0 || h.l + h.w > 100 || h.t + h.h > 100) say(stage, 'E32', `${v}: ${h.id} leaves the picture`);
            if (!h.secret && (h.w < 4 || h.h < 6)) say(stage, 'E32', `${v}: ${h.id} is small for a finger (${h.w}×${h.h})`);
            /* the caption band reaches up to about 16% of the scene when the moth says two lines (owner's shape, 2000×700): a target that low is covered while she speaks (checklist 32d; the fallen key in the test room, 22 Oct 2026) */
            if (!h.secret && h.t + h.h > 84 && h.h < 30) say(stage, 'E32?', `${v}: ${h.id} reaches ${(h.t + h.h).toFixed(0)}% down, under the caption band while a two-line message shows (32d; fine only if a big target that is still tappable above it)`);
            /* the turn arrows sit halfway up each side: a strip 7% wide (6.5u + .4u), 11u tall, so 40–60% of the height */
            if (!h.secret){ const ox = Math.max(0, Math.min(h.l + h.w, 7) - h.l) + Math.max(0, h.l + h.w - Math.max(h.l, 93)), oy = Math.max(0, Math.min(h.t + h.h, 60) - Math.max(h.t, 40));
              const part = ox*oy/(h.w*h.h), cx = h.l + h.w/2; /* a big target losing a sliver to the arrow is fine; one mostly hidden, or small with its middle under the arrow, is not */
              if (part > 0.4 || (h.w < 12 && (cx < 7 || cx > 93) && h.t < 60 && h.t + h.h > 40)) say(stage, 'E32', `${v}: ${h.id} lies under a turn arrow (the side strips, 40–60% up; ${Math.round(part*100)}% covered)`); }

          }
          /* a smaller target drawn over the middle of a bigger one takes the bigger one's tap (the engine puts small things on top): fine for a mug on a desk, wrong for a window on the stairs (14 Oct 2026) */
          for (const h of hs) for (const g of hs){ if (g === h || g.w*g.h <= h.w*h.h) continue; const gx = g.l + g.w/2, gy = g.t + g.h/2;
            if (gx > h.l && gx < h.l + h.w && gy > h.t && gy < h.t + h.h) say(stage, 'E32?', `${v}: ${h.id} covers the middle of ${g.id}, so a tap on ${g.id}'s centre goes to ${h.id} (fine only if that is the intent)`); }
          await p.screenshot({path:path.join(OUT, `${stage}-${v}.png`), clip:await p.locator('#scene').boundingBox()});
        }
      }
      /* close-ups: open every hotspot once and check the card fits; only at the phone and owner sizes */
      if (name === 'phone' || name === 'owner'){
        for (const [room, i, v] of views){
          const ids = await p.evaluate(v => HOTS[v].filter(h => !h.secret).map(h => h.id), v);
          for (const id of ids){
            await p.evaluate(([r, i]) => { closeCloseup(); S.room = r; S.view = i; S.held = null; save(); render(); }, [room, i]); await p.waitForTimeout(120);
            const n = await p.locator(`.hs[data-id="${id}"]`).count(); if (!n) continue;
            try{ await p.evaluate(id => { const b = document.querySelector(`.hs[data-id="${id}"]`); if (b) b.click(); }, id); }catch(e){ say(stage, 'D28', `${v}: tapping ${id} threw: ${e.message.slice(0, 80)}`); continue; }
            await p.waitForTimeout(800); /* a note can open half a second after its tap (the envelope), so wait for it, or the fault is pinned on the next hotspot */
            const r = await p.evaluate(() => { const c = document.querySelector('#closeup .card'); if (!c || document.getElementById('closeup').hidden) return null; const cu = document.getElementById('closeup').getBoundingClientRect(), r = c.getBoundingClientRect(); const inner = c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1; const outer = r.bottom > cu.bottom + 1 || r.right > cu.right + 1 || r.top < cu.top - 1;
              const spans = [...c.querySelectorAll('.book span, .ofb, .otitle, .cbox, .head, .big')].filter(s => s.scrollWidth > s.clientWidth + 2 || s.scrollHeight > s.clientHeight + 2).map(s => s.textContent.slice(0, 30)); return {inner, outer, spans}; });
            if (r && (r.inner || r.outer)) say(stage, 'E29', `${v}: ${id} close-up overflows at ${name} (${r.inner ? 'inside' : 'outside'})`);
            if (r && r.spans.length) say(stage, 'C18', `${v}: ${id} text spills at ${name}: ${r.spans.join(' | ')}`);
            await p.keyboard.press('Escape'); await p.waitForTimeout(80);
            if (!(await p.evaluate(() => document.getElementById('closeup').hidden))) await p.evaluate(() => closeCloseup());
          }
        }
      }
      if (errors.length) say(stage, 'D28', `errors at ${name}${reduce ? ' (reduced motion)' : ''}: ${errors.slice(0, 3).join(' | ')}`);
      /* a load that failed once is asked for again before it is reported: the local server drops a request now and then under load */
      for (const u of new Set(failed)){ const ok = await p.evaluate(u => fetch(u, {cache:'reload'}).then(r => r.ok).catch(() => false), u.split(' ')[0]); if (!ok) say(stage, 'G38', `failed to load at ${name}: ${u.split('/').slice(-2).join('/')}`); }
      await p.close();
    }
  }
  await b.close();
  /* failures first (fix them), then the lines that only ask for a look (B10?) */
  const fails = report.filter(r => !/\t[A-Z]\d+\?\t/.test(r)), looks = report.filter(r => /\t[A-Z]\d+\?\t/.test(r)); /* a code ending in ? only asks for a look */
  const txt = (fails.length ? 'FAILS (fix before committing)\n' + fails.join('\n') : 'no failures') + (looks.length ? '\n\nFOR A LOOK (B10?: no shadow, fine only if it hangs, lies flat or sits inside something; E32?: a small target over a big one\'s middle, fine only if meant)\n' + looks.join('\n') : '');
  fs.writeFileSync(path.join(OUT, 'report.txt'), txt); console.log(txt); console.log(`\n${fails.length} failures, ${looks.length} to look at; screenshots in ${OUT}`);
})();
