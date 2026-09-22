// Signature Funnels ad — 1080×1350 (4:5 feed) + 1080×1080 (square) + 1080×1920 (story)
const { chromium } = require('/Users/ken/Desktop/signature-site-video/node_modules/playwright-core');
const path = require('path'), fs = require('fs');
const OUT = '/Users/ken/Desktop/Signature All /signature-funnels/ads';
fs.mkdirSync(OUT, { recursive: true });
const MARK = 'file://' + path.join(__dirname, '../../funnels/img/mark.png');

const css = (W, H, phoneScale, story=false) => `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap');
:root{--bg:#010101;--card:#0a0a0a;--panel:#100f0d;--line:rgba(201,165,103,.22);--line2:rgba(201,165,103,.5);--gold:#c9a567;--gold-soft:#e6cf9a;--fg:#fff;--body:#d9d4c9;--muted:#989898;--dim:#6e6a62}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;background:var(--bg);font-family:Inter,sans-serif;color:var(--body);-webkit-font-smoothing:antialiased;overflow:hidden}
.ad{position:relative;width:${W}px;height:${H}px;padding:70px 72px 0;display:flex;flex-direction:column;background:radial-gradient(1000px 700px at 50% 100%,rgba(201,165,103,.22),transparent 60%),var(--bg)}
.top{display:flex;align-items:center;gap:16px}
.top img{height:${story?72:56}px}
.top b{font-size:${story?28:22}px;color:var(--fg);letter-spacing:.02em}.top b span{color:var(--gold)}
.top small{margin-left:auto;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);font-weight:600}
h1{margin-top:${story?64:44}px;font-family:"Playfair Display",serif;font-weight:500;color:var(--fg);font-size:${story?84:68}px;line-height:1.02;letter-spacing:-.01em}
h1 em{font-style:italic;color:var(--gold-soft)}
.sub{margin-top:${story?34:26}px;font-size:${story?34:27}px;line-height:1.45;color:var(--body);max-width:900px}
.sub b{color:var(--fg);font-weight:600}
.inc{margin-top:${story?30:22}px;display:flex;flex-wrap:wrap;gap:10px;max-width:940px}
.inc span{border:1px solid var(--line2);border-radius:999px;padding:${story?12:9}px ${story?20:16}px;font-size:${story?21:17}px;color:var(--fg);background:rgba(201,165,103,.06)}
.inc span:before{content:"✓ ";color:var(--gold);font-weight:700}
.cta{margin-top:${story?40:30}px;display:inline-flex;align-items:center;gap:14px;background:var(--gold);color:#0b0904;font-weight:700;font-size:${story?30:24}px;padding:${story?26:20}px ${story?42:34}px;border-radius:10px;width:max-content}
.cta i{font-style:normal;font-size:26px}
.phones{position:absolute;left:0;right:0;bottom:${story?40:-40}px;height:${Math.round(720*phoneScale)}px;display:flex;justify-content:center;align-items:flex-end;gap:-20px;transform:scale(${phoneScale});transform-origin:bottom center}
.ph{width:330px;height:680px;background:#0a0a0a;border:2px solid #2a2620;border-radius:44px;padding:18px 16px;box-shadow:0 40px 80px rgba(0,0,0,.7);position:relative;flex:none}
.ph:nth-child(1){transform:rotate(-8deg) translate(28px,40px);z-index:1}
.ph:nth-child(2){z-index:3;border-color:var(--line2);box-shadow:0 0 0 1px rgba(201,165,103,.25),0 50px 100px rgba(0,0,0,.8)}
.ph:nth-child(3){transform:rotate(8deg) translate(-28px,40px);z-index:1}
.notch{width:110px;height:10px;background:#1a1916;border-radius:8px;margin:0 auto 18px}
.st{display:flex;justify-content:space-between;font-size:12px;color:var(--dim);padding:0 8px;margin-bottom:14px}
.big{text-align:center;font-family:"Playfair Display",serif;font-size:40px;color:var(--fg);line-height:1}
.lab{text-align:center;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);margin:6px 0 16px}
.bub{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:12px 14px;font-size:14.5px;line-height:1.4;color:var(--body);margin-bottom:10px}
.bub small{display:block;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin-bottom:5px}
.bub.in{border-left:2px solid #8a3a2a}
.bub.ok{border-color:var(--gold);color:var(--fg)}.bub.ok small{color:var(--gold)}
.bub.me{background:var(--gold);color:#0b0904;border:0;margin-left:40px}.bub.me small{color:#5a4722}
.check{width:70px;height:70px;border-radius:50%;background:var(--gold);color:#0b0904;font-size:36px;display:flex;align-items:center;justify-content:center;margin:20px auto 14px;font-weight:700}
.row{display:flex;justify-content:space-between;align-items:center;padding:12px 4px;border-top:1px solid var(--line);font-size:14px;color:var(--body)}
.row b{color:var(--fg)}
.foot{position:absolute;left:0;right:0;bottom:22px;text-align:center;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.vm{margin-top:50px;text-align:center}
.vm b{display:block;font-family:"Playfair Display",serif;font-size:26px;color:var(--fg);line-height:1.15;padding:0 6px 0 22px}
.vm span{display:block;margin-top:10px;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.tabs{position:absolute;left:16px;right:16px;bottom:54px;display:flex;justify-content:space-around;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim)}
.tabs i{font-style:normal;color:var(--gold)}
`;

const phones = `
<div class="phones">
  <div class="ph"><div class="notch"></div><div class="st"><span>9:41</span><span>●●●</span></div>
    <div class="big">Missed call</div><div class="lab">9:02 PM · no voicemail</div>
    <div class="bub in"><small>Incoming · (407) 555-0188</small>Rang 4×. You were with a client.</div>
    <div class="bub ok"><small>Text-back · sent in 4 seconds</small>Sorry we missed you! What can we help with? Reply here and we'll get you on the calendar.</div>
    <div class="bub me"><small>Reply · 9:04 PM</small>Looking for a June wedding planner, about 120 guests</div>
    <div class="foot">Capture</div></div>
  <div class="ph"><div class="notch"></div><div class="st"><span>9:41</span><span>●●●</span></div>
    <div class="check">✓</div><div class="big">Booked.</div><div class="lab">Nobody picked up. The lead still got booked.</div>
    <div class="row"><span>Signature Funnels</span><b>Thu · 2:30 PM</b></div>
    <div class="row"><span>Confirmation</span><b>Sent</b></div>
    <div class="row"><span>Reminder</span><b>24h + 1h</b></div>
    <div class="row"><span>Follow-up if no-show</span><b>Armed</b></div>
    <div class="foot">Convert</div></div>
  <div class="ph"><div class="notch"></div><div class="st"><span>9:41</span><span>●●●</span></div>
    <div class="big">Voicemail</div><div class="lab">This month</div>
    <div class="vm"><b>No voicemails —<br>every lead answered.</b><span>100% response rate</span></div>
    <div class="tabs"><span>Recents</span><i>Booked</i><span>Voicemail</span></div>
    <div class="foot">Nurture</div></div>
</div>`;

const page = (W, H, ps, h1, sub, story) => `<!doctype html><html><head><meta charset="utf-8"><style>${css(W,H,ps,story)}</style></head><body><div class="ad">
<div class="top"><img src="${MARK}"><b>Signature<span>Funnels</span></b><small>Capture · Convert · Nurture</small></div>
<h1>${h1}</h1><p class="sub">${sub}</p><div class="inc"><span>Missed-call text-back agent</span><span>AI chat agent that books</span><span>CRM — every lead on one board</span><span>Lead-capture funnel</span><span>Follow-up &amp; reminders</span></div><div class="cta">See the plans <i>→</i></div>${phones}</div></body></html>`;

const H1 = 'Two AI employees.<br>One system.<br><em>Starting at $129/mo.</em>';
const SUB = 'A receptionist costs about <b>$3,500 a month</b>. Signature Funnels answers the call you missed, books the appointment, and follows up until they say yes. <b>Installed for you in a week.</b>';

const VARIANTS = [
  ['funnels-ad-4x5.png', 1080, 1350, 0.80, H1, SUB],
  ['funnels-ad-1x1.png', 1080, 1080, 0.58, 'Two AI employees.<br>One system.<br><em>Starting at $129/mo.</em>', 'A receptionist costs about <b>$3,500 a month</b>. Signature Funnels answers the missed call, books it, and follows up until they say yes. <b>Installed in a week.</b>'],
  ['funnels-ad-9x16.png', 1080, 1920, 1.25, 'Two AI employees.<br>One system.<br><em>Starting at $129/mo.</em>', SUB, true],
];

(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  for (const [name, W, H, ps, h1, sub, story] of VARIANTS) {
    const p = await b.newPage({ viewport: { width: W, height: H } });
    const tmp = path.join(__dirname, '_ad.html'); fs.writeFileSync(tmp, page(W, H, ps, h1, sub, !!story));
    await p.goto('file://' + tmp, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(OUT, name) }); await p.close(); fs.unlinkSync(tmp); console.log('ok', name);
  }
  await b.close();
})();
