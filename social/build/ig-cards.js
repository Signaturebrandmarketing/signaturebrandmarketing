// Instagram cards — 1080×1350 (4:5). Square gives up a third of the feed height, so IG gets its own size.
// Run: node ig-cards.js
const { chromium } = require('/Users/ken/Desktop/signature-site-video/node_modules/playwright-core');
const path = require('path'), fs = require('fs');
const OUT = path.join(__dirname, '..');
const LOGO = 'file://' + path.join(__dirname, '../../img/logo.png');

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap');
:root{--bg:#010101;--card:#0a0a0a;--panel:#100f0d;--line:rgba(201,165,103,.22);--line2:rgba(201,165,103,.45);--gold:#c9a567;--gold-soft:#e6cf9a;--fg:#fff;--body:#d9d4c9;--muted:#989898;--dim:#6e6a62}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;background:var(--bg);color:var(--body);font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.c{position:relative;width:1080px;height:1350px;padding:80px;display:flex;flex-direction:column;background:radial-gradient(900px 620px at 50% 108%,rgba(201,165,103,.17),transparent 62%),var(--bg)}
.top{display:flex;align-items:center;justify-content:space-between;height:86px}
.top img{height:86px;width:auto}
.top .mark{font-size:14px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold);font-weight:600}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding:36px 0}
.eb{font-size:16px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:32px}
h1{font-family:"Playfair Display",serif;font-weight:500;color:var(--fg);font-size:86px;line-height:1.06;letter-spacing:-.01em}
h1.s{font-size:70px}h1.xs{font-size:58px}
h1 em{font-style:italic;color:var(--gold-soft)}
.sub{margin-top:36px;font-size:28px;line-height:1.5;color:var(--body);max-width:880px}
.sub b{color:var(--fg);font-weight:600}
.bot{display:flex;align-items:center;justify-content:space-between;height:48px;border-top:1px solid var(--line);padding-top:28px}
.bot span{font-size:18px;letter-spacing:.14em;color:var(--muted)}
.bot b{font-size:14px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);font-weight:600}
/* chat */
.chat{margin-top:44px;display:grid;gap:16px}
.bub{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:26px 30px;font-size:27px;line-height:1.42;color:var(--body)}
.bub small{display:block;font-size:14px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);margin-bottom:10px}
.bub.in{border-left:3px solid #8a3a2a}
.bub.ok{border-color:var(--line2);color:var(--fg)}.bub.ok small{color:var(--gold)}
.bub.me{background:var(--gold);color:#0b0904;border:0;margin-left:90px}.bub.me small{color:#5a4722}
/* rows */
.rows{margin-top:44px;display:grid;gap:14px}
.rows div{display:flex;align-items:center;gap:22px;padding:26px 30px;border:1px solid var(--line);border-radius:14px;background:var(--card);font-size:28px;color:var(--body)}
.rows div i{flex:none;width:14px;height:14px;border-radius:50%;background:var(--gold);font-style:normal}
.rows div b{color:var(--fg);font-weight:600}
`;

const page = (body, foot = 'signaturebrandmarketing.com', mark = '') => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="c"><div class="top"><img src="${LOGO}"><span class="mark">${mark}</span></div>
<div class="mid">${body}</div>
<div class="bot"><span>${foot}</span><b>Link in bio</b></div></div></body></html>`;

const CARDS = {
  'ig-05': page(`
    <div class="eb">The real diagnosis</div>
    <h1>Most businesses don't have a marketing problem.<br><em>They have a systems problem.</em></h1>
    <p class="sub">A brand over here. A website over there. A CRM nobody updates. Follow-up that depends on somebody remembering.</p>`),

  'ig-07': page(`
    <div class="eb">9:04 PM</div>
    <h1 class="s">The message that<br>waits until morning<br><em>doesn't wait for you.</em></h1>
    <div class="chat">
      <div class="bub in"><small>Incoming · 9:04 PM</small>Hi — do you have anything available next Thursday?</div>
      <div class="bub ok"><small>Answered in 4 seconds</small>We do. Thursday at 2:30 or 4:15 — which works better?</div>
      <div class="bub me"><small>9:05 PM</small>2:30 is perfect.</div>
    </div>`),

  'ig-09': page(`
    <div class="eb">Honest question</div>
    <h1 class="s">If you disappeared for two weeks — <em>would leads still get answered, followed up, and booked?</em></h1>
    <p class="sub">Most owners tell us "some of it." That's normal. It's also the exact gap we close.</p>`),

  'ig-13': page(`
    <div class="eb">Signature Rewards</div>
    <h1>You already refer people.<br><em>You're just not getting paid for it.</em></h1>
    <div class="rows">
      <div><i></i><span>Send us a business that needs a brand, a site, or the whole system</span></div>
      <div><i></i><span><b>Earn every month they stay.</b> Not a finder's fee. Not once.</span></div>
      <div><i></i><span>You don't sell anything. Make the introduction — we do the rest.</span></div>
    </div>`),
};

(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  for (const [name, html] of Object.entries(CARDS)) {
    const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
    const tmp = path.join(__dirname, `_${name}.html`);
    fs.writeFileSync(tmp, html);
    await p.goto('file://' + tmp, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(250);
    await p.screenshot({ path: path.join(OUT, `${name}.png`) });
    await p.close(); fs.unlinkSync(tmp);
    console.log('ok', name);
  }
  await b.close();
})();
