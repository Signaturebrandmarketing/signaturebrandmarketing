// Social visuals renderer — 1080×1080 cards + mocks + composites → ../*.png
// Run: node render.js [id,id,...]
const { chromium } = require('/Users/ken/Desktop/signature-site-video/node_modules/playwright-core');
const path = require('path'), fs = require('fs');
const OUT = path.join(__dirname, '..');
const KEN = '/Users/ken/Desktop/Ken New Promo Materials /Ken New Ai Branding /';
const STY = '/Users/ken/Desktop/Signature All /Signature branding System All /style-examples-generated/';
const LOGO = 'file://' + path.join(__dirname, '../../img/logo.png');
const f = p => 'file://' + encodeURI(p).replace(/#/g, '%23');
const ken = n => f(KEN + n);

const FOOT = { agency: 'signaturebrandmarketing.com', agentos: 'signatureagentos.com', app: 'signaturebranding.app' };
const MARK = { agency: '', agentos: 'Signature Agent OS', app: 'Signature Branding System' };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap');
:root{--bg:#010101;--card:#0a0a0a;--panel:#100f0d;--line:rgba(201,165,103,.22);--line2:rgba(201,165,103,.45);--gold:#c9a567;--gold-soft:#e6cf9a;--fg:#fff;--body:#d9d4c9;--muted:#989898;--dim:#6e6a62}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;background:var(--bg);color:var(--body);font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.c{position:relative;width:1080px;height:1080px;padding:72px 80px;display:flex;flex-direction:column;background:radial-gradient(900px 520px at 50% 110%,rgba(201,165,103,.16),transparent 62%),var(--bg)}
.top{display:flex;align-items:center;justify-content:space-between;height:96px}
.top img{height:96px;width:auto}
.top .mark{font-size:15px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold);font-weight:600}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding:30px 0}
.eb{font-size:16px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:28px}
h1{font-family:"Playfair Display",serif;font-weight:500;color:var(--fg);font-size:78px;line-height:1.08;letter-spacing:-.01em}
h1.s{font-size:64px}h1.xs{font-size:54px}
h1 em{font-style:italic;color:var(--gold-soft)}
.sub{margin-top:34px;font-size:26px;line-height:1.5;color:var(--body);max-width:860px}
.q{font-family:"Playfair Display",serif;font-style:italic;font-weight:500;color:var(--fg);font-size:66px;line-height:1.15}
.q em{color:var(--gold-soft)}
.by{margin-top:30px;font-size:20px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
.bot{display:flex;align-items:center;justify-content:space-between;height:48px;border-top:1px solid var(--line);padding-top:26px}
.bot span{font-size:17px;letter-spacing:.14em;color:var(--muted)}
.bot b{font-size:14px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);font-weight:600}
/* ladder */
.lad{display:grid;gap:14px;margin-top:40px}
.lad div{display:flex;align-items:baseline;gap:22px;padding:22px 26px;border:1px solid var(--line);border-radius:12px;background:var(--card)}
.lad div i{font-family:"Playfair Display",serif;font-style:italic;color:var(--gold);font-size:26px;width:44px}
.lad div b{font-family:"Playfair Display",serif;font-weight:500;color:var(--fg);font-size:36px}
.lad div span{margin-left:auto;font-size:18px;color:var(--muted)}
/* 3 cols */
.cols3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:40px}
.cols3 div{padding:30px 24px;border:1px solid var(--line2);border-radius:14px;background:var(--card)}
.cols3 small{display:block;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:12px}
.cols3 b{display:block;font-family:"Playfair Display",serif;font-weight:500;font-size:40px;color:var(--fg);margin-bottom:14px}
.cols3 p{font-size:18px;line-height:1.5;color:var(--body)}
/* timeline */
.tl{display:grid;gap:12px;margin-top:36px}
.tl div{display:grid;grid-template-columns:150px 1fr;gap:20px;padding:20px 24px;border:1px solid var(--line);border-radius:12px;background:var(--card);align-items:start}
.tl b{font-family:"Playfair Display",serif;font-weight:500;color:var(--gold-soft);font-size:32px}
.tl span{font-size:21px;line-height:1.45;color:var(--body)}
/* flow */
.flow{display:flex;align-items:center;gap:14px;margin-top:44px}
.flow div{flex:1;padding:30px 16px;border:1px solid var(--line2);border-radius:14px;background:var(--card);text-align:center}
.flow small{display:block;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
.flow b{font-family:"Playfair Display",serif;font-weight:500;font-size:34px;color:var(--fg)}
.flow i{color:var(--gold);font-size:34px;font-style:normal}
/* doors */
.doors{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:40px}
.doors div{padding:40px 30px;border:1px solid var(--line2);border-radius:16px;background:var(--card)}
.doors b{display:block;font-family:"Playfair Display",serif;font-weight:500;font-size:64px;color:var(--gold-soft);line-height:1}
.doors span{display:block;margin-top:16px;font-size:24px;color:var(--fg);line-height:1.4}
.doors small{display:block;margin-top:18px;font-size:16px;color:var(--muted);letter-spacing:.06em}
/* calendar */
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;margin-top:40px}
.cal i{display:block;height:78px;border-radius:8px;border:1px solid var(--line);background:var(--card)}
.cal i.on{background:var(--gold);border-color:var(--gold)}
.cal i.dim{background:rgba(201,165,103,.18);border-color:transparent}
.wk{display:flex;justify-content:space-between;margin-top:14px;font-size:14px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim)}
/* board */
.board{margin-top:34px;border:1px solid var(--line2);border-radius:16px;background:var(--card);padding:22px;flex:1;display:flex;flex-direction:column}
.bar{display:flex;align-items:center;gap:8px;margin-bottom:18px}.bar i{width:11px;height:11px;border-radius:50%;background:#2a2620}.bar span{margin-left:auto;font-size:13px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold)}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px}
.tile{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px 18px}
.tile small{display:block;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}
.tile b{display:block;font-family:"Playfair Display",serif;font-weight:500;font-size:40px;color:var(--gold-soft);margin-top:4px}
.kcols{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;flex:1}
.col h5{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;display:flex;justify-content:space-between}.col h5 em{font-style:normal;color:var(--gold)}
.cm{background:#141310;border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin-bottom:10px}
.cm b{display:block;font-size:17px;color:var(--fg);font-weight:600}.cm span{display:block;font-size:14px;color:var(--dim);margin-top:4px}
.cm .av{float:right;width:24px;height:24px;border-radius:50%;background:var(--gold);color:#0b0904;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-left:8px}
.cm.hot{border-color:var(--line2);box-shadow:0 0 0 1px rgba(201,165,103,.18)}
/* team bars */
.owners{display:grid;gap:14px;margin-top:6px}
.owners div{display:grid;grid-template-columns:200px 1fr 70px;align-items:center;gap:16px;font-size:20px;color:var(--fg)}
.owners i{display:block;height:20px;border-radius:6px;background:rgba(201,165,103,.18);position:relative;overflow:hidden}
.owners i:after{content:"";position:absolute;left:0;top:0;bottom:0;width:var(--w);background:var(--gold)}
.owners span{text-align:right;color:var(--gold-soft);font-family:"Playfair Display",serif;font-size:28px}
/* chat */
.chat{margin-top:24px;border:1px solid var(--line2);border-radius:20px;background:var(--card);padding:22px;display:flex;flex-direction:column;gap:10px}
.chat .hd{display:flex;align-items:center;gap:14px;padding-bottom:16px;border-bottom:1px solid var(--line);margin-bottom:6px}
.chat .hd i{width:44px;height:44px;border-radius:50%;background:var(--gold);color:#0b0904;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:16px;font-style:normal}
.chat .hd b{display:block;color:var(--fg);font-size:20px}.chat .hd span{display:block;color:var(--dim);font-size:14px}
.chat .hd em{margin-left:auto;font-style:normal;font-size:13px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold)}
.m{max-width:80%;padding:12px 16px;border-radius:16px;font-size:17.5px;line-height:1.4}
.m.u{align-self:flex-end;background:var(--gold);color:#0b0904;border-bottom-right-radius:6px}
.m.b{align-self:flex-start;background:var(--panel);border:1px solid var(--line);color:var(--body);border-bottom-left-radius:6px}
.m small{display:block;font-size:11px;margin-top:5px;opacity:.7;letter-spacing:.1em}
.m.ok{align-self:center;background:transparent;border:1px solid var(--gold);color:var(--gold-soft);font-family:"Playfair Display",serif;font-size:21px;text-align:center;max-width:92%}
/* photo grids */
.g4{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:14px;margin-top:26px;height:600px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:26px;height:600px}
.g6{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr;gap:14px;margin-top:26px;height:600px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:26px;height:600px}
.ph{border-radius:14px;overflow:hidden;border:1px solid var(--line2);background:#111;position:relative;min-height:0}
.ph img{width:100%;height:100%;object-fit:cover;display:block}
.ph b{position:absolute;left:0;right:0;bottom:0;padding:12px 14px;font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);background:linear-gradient(transparent,rgba(0,0,0,.85))}
.cap{margin-top:22px;font-family:"Playfair Display",serif;font-weight:500;color:var(--fg);font-size:38px;line-height:1.15}
.cap em{font-style:italic;color:var(--gold-soft)}
`;

const shell = (brand, body, foot) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="c">
<div class="top"><img src="${LOGO}"><span class="mark">${MARK[brand]}</span></div>
<div class="mid">${body}</div>
<div class="bot"><span>${foot || FOOT[brand]}</span><b>${brand === 'agentos' ? 'Write more policies · Save more time · Scale' : 'Brand · Execute · Automate'}</b></div>
</div></body></html>`;

const H = (brand, eb, h1, sub = '', cls = '', foot) => shell(brand, `<div class="eb">${eb}</div><h1 class="${cls}">${h1}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}`, foot);
const Q = (brand, q, by) => shell(brand, `<p class="q">${q}</p>${by ? `<div class="by">${by}</div>` : ''}`);

const board = (title) => `<div class="eb">${title}</div><div class="board"><div class="bar"><i></i><i></i><i></i><span>Whitmore Insurance Group · Desk · demo</span></div>
<div class="tiles"><div class="tile"><small>Open leads</small><b>13</b></div><div class="tile"><small>Booked this week</small><b>7</b></div><div class="tile"><small>Booked by the inbox agent</small><b>4</b></div></div>
<div class="kcols">
<div class="col"><h5>New <em>4</em></h5><div class="cm hot"><i class="av">D</i><b>Marcus Bell</b><span>Final expense · web chat · 9:02 PM</span></div><div class="cm"><i class="av">M</i><b>Tasha Reed</b><span>Medicare · referral</span></div><div class="cm"><i class="av">R</i><b>Owen Price</b><span>IUL · Facebook</span></div><div class="cm"><i class="av">D</i><b>Keisha Long</b><span>Final expense · web</span></div></div>
<div class="col"><h5>Contacted <em>3</em></h5><div class="cm"><i class="av">M</i><b>Devon Carter</b><span>Term · called 2×</span></div><div class="cm"><i class="av">R</i><b>Alicia Grant</b><span>Medicare · texted</span></div><div class="cm"><i class="av">D</i><b>Sam Ortiz</b><span>Annuity · emailed</span></div></div>
<div class="col"><h5>Coverage review <em>4</em></h5><div class="cm hot"><i class="av">D</i><b>Marcus Bell</b><span>Thu 10:00 AM · confirmed</span></div><div class="cm"><i class="av">M</i><b>Tasha Reed</b><span>Mon 10:00 AM</span></div><div class="cm"><i class="av">R</i><b>Lena Brooks</b><span>Tue 2:30 PM</span></div><div class="cm"><i class="av">M</i><b>Ray Fields</b><span>Wed 11:00 AM</span></div></div>
<div class="col"><h5>Quoted <em>2</em></h5><div class="cm"><i class="av">D</i><b>Nia Holloway</b><span>$84/mo · sent</span></div><div class="cm"><i class="av">R</i><b>Chris Dunn</b><span>$142/mo · follow-up fires Fri</span></div></div>
</div></div>`;

const team = (title) => `<div class="eb">${title}</div><div class="board"><div class="bar"><i></i><i></i><i></i><span>Whitmore — Command · demo</span></div>
<div class="tiles"><div class="tile"><small>Leads this month</small><b>41</b></div><div class="tile"><small>Appointments booked</small><b>19</b></div><div class="tile"><small>Follow-ups sent by the system</small><b>127</b></div></div>
<div class="eb" style="margin:14px 0 18px;font-size:13px">Contacts by owner — the whole team on one screen</div>
<div class="owners"><div>Dana Whitmore<i style="--w:100%"></i><span>15</span></div><div>Marcus Cole<i style="--w:80%"></i><span>12</span></div><div>Renee Whitmore<i style="--w:93%"></i><span>14</span></div></div>
<div class="eb" style="margin:28px 0 0;font-size:13px;color:var(--dim)">No spreadsheet. No memory. No "did you follow up with…?"</div></div>`;

const chat = (title) => `<div class="eb">${title}</div><div class="chat"><div class="hd"><i>D</i><div><b>Dana's Assistant</b><span>Whitmore Insurance Group · online</span></div><em>demo · 9:02 PM</em></div>
<div class="m u">do you do final expense? my mom is 72 and has diabetes<small>9:02 PM</small></div>
<div class="m b">We do — and diabetes doesn't rule her out. Several carriers we work with accept it, and a few don't even require an exam. Is she looking to cover final expenses only, or leave something extra behind?<small>9:02 PM</small></div>
<div class="m u">just final expenses. can I talk to Dana this week?<small>9:03 PM</small></div>
<div class="m b">Of course. Dana has Thursday 10:00 AM, Thursday 2:30 PM, or Friday 11:00 AM open for a 15-minute Coverage Review. Which works?<small>9:03 PM</small></div>
<div class="m u">thursday 10<small>9:04 PM</small></div>
<div class="m ok">Booked — Thursday 10:00 AM with Dana. Confirmation sent. Reminder fires the night before.</div></div>`;

const grid = (cls, items, cap) => `${items.map(([src, lab]) => `<div class="ph"><img src="${src}">${lab ? `<b>${lab}</b>` : ''}</div>`).join('')}`;
const photos = (brand, eb, cls, items, cap) => shell(brand, `<div class="eb">${eb}</div><div class="${cls}">${grid(cls, items)}</div>${cap ? `<p class="cap">${cap}</p>` : ''}`);

const CARDS = {
  'fb-01': shell('agency', `<div class="eb">How we work</div><h1>Brand. <em>Execute.</em> Automate.</h1><div class="lad"><div><i>01</i><b>Brand</b><span>what people find when you're not in the room</span></div><div><i>02</i><b>Execute</b><span>a lead source you control, running every week</span></div><div><i>03</i><b>Automate</b><span>follow-up that fires on its own</span></div></div>`),
  'fb-04': H('agency', 'Question one', 'If a stranger looked you up online tonight — <em>what would they find?</em>', 'Not "do you have a website." What would they find — and would it sound like you?'),
  'fb-05': H('agency', 'Fifteen years, three thousand people', 'The ones who grew weren\'t the most talented. <em>They were the most consistent.</em>', 'Consistency is a system, not a personality trait. You can install it.', 's'),
  'fb-06': H('agency', 'The Signature Branding System', 'A brand that <em>sounds like you.</em>', 'Voice · Positioning · Visuals · A content engine that produces and publishes for you — in the app, not in a PDF.', '', 'signaturebranding.app'),
  'fb-07': H('agency', 'Where do new clients come from?', 'Referrals are a gift. <em>Not a plan.</em>', 'You can\'t turn the dial up on word of mouth. One source you control — that\'s the first thing we build after the brand.'),
  'fb-09': H('agency', 'Growth Partner', 'One team. One plan. <em>Top to bottom.</em>', 'We build the brand, run the marketing, and install the automation. You do what you\'re good at. We do the rest.'),
  'fb-10': H('agency', 'The assessment · 2 minutes', 'Two weeks off. <em>Would leads still get answered, followed up, and booked?</em>', 'Ten questions will tell you where you stand. signaturebrandmarketing.com/assessment', 's'),
  'fb-12': shell('agency', `<div class="eb">LiveLoop</div><h1 class="s">The hardest part of content isn't ideas. <em>It's the fourth week.</em></h1><div class="cal">${Array.from({length:28},(_,i)=>`<i class="${i<21?'on':'on'}"></i>`).join('')}</div><div class="wk"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4 — handled</span></div>`),
  'fb-13': Q('agency', '"Shoot the moment <em>before</em> the moment."', 'A wedding photographer, on marketing'),
  'fb-15': H('agency', 'Signature Branding &amp; Marketing', 'Builds the brand. Powers the growth. <em>Automates the success.</em>', 'One team, one plan, top to bottom — so your business runs when you\'re not in the room.', 's'),
  'fb-11': shell('agency', board('Every lead on one screen')),
  'fb-08': shell('agency', chat('A message comes in at 9 PM')),

  'li-01': H('agentos', 'Independent agencies', 'The policies you lose are the calls <em>you never hear.</em>', 'The 9 PM inquiry. The missed call during an appointment. The form that got an email three days later.'),
  'li-02': shell('agentos', `<div class="eb">One system. Three components.</div><div class="cols3"><div><small>01</small><b>The Brain</b><p>The AI that thinks and writes. Your carriers, your scripts, your compliance language — drafted before you sit down.</p></div><div><small>02</small><b>The Desk</b><p>Where the book lives. Every lead, every stage, every seat on one board. The inbox agent answers and books.</p></div><div><small>03</small><b>The Rainmaker</b><p>The leads. Done-for-you outbound, appointments on your calendar.</p></div></div>`),
  'li-04': H('agentos', 'Team leaders', 'You can\'t manage <em>what you can\'t see.</em>', 'Not "do you have a CRM." Can you see every agent\'s leads right now — every seat, every stage, one screen?'),
  'li-05': shell('agentos', board('The Desk, in one screenshot')),
  'li-07': H('agentos', 'AEP starts Oct 15', 'Same plan. <em>Same numbers.</em>', 'The agencies that win AEP won\'t answer more calls. They\'ll have a system that answers the ones they can\'t.'),
  'li-08': shell('agentos', `<div class="eb">What the Brain does on a Tuesday</div><div class="tl"><div><b>7:00</b><span>Three follow-up drafts for yesterday's quotes, in your voice, waiting for approval.</span></div><div><b>9:15</b><span>A lead asks about final expense for her 72-year-old mother with diabetes. The inbox agent answers, qualifies, offers three times, books one.</span></div><div><b>11:00</b><span>This week's compliant social posts, drafted.</span></div><div><b>2:30</b><span>A policy-renewal sequence starts for a client at 90 days out.</span></div></div><p class="sub" style="margin-top:28px">You approved four things and wrote none of them.</p>`),
  'li-09': H('agentos', 'The Complete System', 'One system. Three components. <em>Installed in 30 days.</em>', 'One number: install, then monthly. Agents who buy a piece build a gap.', 's'),
  'li-10': Q('agentos', '"I don\'t have a lead problem. <em>I have a time problem.</em>"', 'Every agent says one of these. Both are the same problem.'),
  'li-11': shell('agentos', `<div class="eb">The Rainmaker</div><h1 class="s">You run appointments. <em>That's the job.</em></h1><div class="flow"><div><small>01</small><b>List</b></div><i>→</i><div><small>02</small><b>Sequence</b></div><i>→</i><div><small>03</small><b>Replies</b></div><i>→</i><div><small>04</small><b>Booked</b></div></div><p class="sub">Nothing cold to a do-not-contact list. Nothing from your main domain. Your reputation is the asset we protect.</p>`),
  'li-12': shell('agentos', team('Every seat on one screen')),
  'li-13': H('agentos', 'The most expensive employee', 'Follow-up that lives in a head <em>leaves with the head.</em>', 'Your process should live in a system that fires on its own and stops when the client replies.'),
  'li-14': shell('agentos', team('Seats')),
  'li-15': shell('agentos', `<div class="eb">Two ways in</div><div class="doors"><div><b>15 min</b><span>Watch the system work — a message comes in, gets answered, gets booked, lands on the board.</span><small>The demo · signatureagentos.com</small></div><div><b>2 min</b><span>Score your own agency first. Ten questions, three gaps, no login.</span><small>signaturebrandmarketing.com/assessment</small></div></div>`),

  'aib-02': H('app', 'Signature Ambassadors', 'You\'ve been sending us clients <em>for free.</em>', 'If you\'ve ever said "you need to see Ken" — you\'re already one. DM "ambassador."'),
  'aib-06': shell('app', `<div class="eb">LiveLoop</div><h1 class="s">Everyone posts for three weeks. <em>Then week four.</em></h1><div class="cal">${Array.from({length:28},(_,i)=>`<i class="${i<21?'on':(i<24?'dim':'')}"></i>`).join('')}</div><div class="wk"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4 — LiveLoop</span></div>`),
  'aib-10': Q('app', '"Who did <em>your</em> photos?"', 'If people ask you that, you\'re already doing the job. Let us pay you for it.'),
  'aib-01': photos('app', 'The Signature Branding System', 'g4', [[ken('Signature Boss-10251c1c-1d81-4aaa-8e9e-bbe6965721f9.jpg'),'Boss'],[ken('Signature Content Creator Luxe-01d53514-916a-44b3-b135-ad944f5b51d6.jpg'),'Content Creator'],[ken('Signature Speaker & Author Elite-02bad93f-6b02-417a-b569-bc66a6fa15a1.jpg'),'Speaker & Author'],[ken('Signature Speaker & Author Elite-3c45dbea-a743-450f-98d5-f8bfb3343277.jpg'),'Speaker & Author']], 'A few photos. One conversation. <em>A brand.</em>'),
  'aib-05': photos('app', 'I did this to myself first', 'g3', [[ken('Signature Boss-6ea8e274-3940-454f-9020-59f311bd01fd.jpg')],[ken('Signature Content Creator Luxe-4e77818f-29f1-4166-b5d3-39f46f79dde2.jpg')],[ken('Signature Speaker & Author Elite-49153e91-00ca-4b41-8028-b958052f1b72.jpg')]], 'Same process. Same session. <em>Same app.</em>'),
  'aib-03': photos('app', 'Platinum styles · thirty-one looks', 'g6', [['insurance-professional','Insurance'],['consultant-authority','Consultant'],['faith-leader-authority','Faith leader'],['financial-advisor-authority','Financial advisor'],['fitness-authority','Fitness'],['educator-authority','Educator']].map(([d,l])=>[f(STY+d+'/'+d+'-01.jpg'),l]), 'One session. <em>Every setting you\'re headed for.</em>'),
  'aib-07': photos('app', 'VIP · built around you', 'g2', [[ken('Signature Boss-d32330cd-1687-471b-a249-504b1874057a.jpg'),'From the menu'],[ken('Signature Speaker & Author Elite-908ce810-836e-4508-95af-b270c2c52506.jpg'),'Custom VIP']], 'Some people want the menu <em>built around them.</em>'),
};

(async () => {
  const only = process.argv[2] ? process.argv[2].split(',') : Object.keys(CARDS);
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
  for (const id of only) {
    const html = CARDS[id]; if (!html) { console.log('skip', id); continue; }
    const tmp = path.join(__dirname, `_${id}.html`); fs.writeFileSync(tmp, html);
    await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(OUT, `${id}.png`), type: 'png' });
    fs.unlinkSync(tmp); console.log('ok', id);
  }
  await browser.close();
})();
