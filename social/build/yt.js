const { chromium } = require('/Users/ken/Desktop/signature-site-video/node_modules/playwright-core');
const path=require('path'), fs=require('fs');
const OUT='/Users/ken/Desktop/Signature All /signature-ops/social/youtube';
const LOGO='file://'+path.join(__dirname,'../../img/logo.png');
const css=`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,500&family=Inter:wght@500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{background:#010101;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.banner{width:2560px;height:1440px;position:relative;background:radial-gradient(1400px 700px at 50% 60%,rgba(201,165,103,.18),transparent 62%),#010101;display:flex;align-items:center;justify-content:center}
.safe{width:1546px;height:423px;display:flex;align-items:center;justify-content:center;gap:60px}
.safe img{height:300px}
.safe h1{font-family:"Playfair Display",serif;font-weight:500;color:#fff;font-size:58px;line-height:1.15}
.safe h1 em{font-style:italic;color:#e6cf9a}
.safe p{margin-top:16px;font-size:20px;letter-spacing:.3em;text-transform:uppercase;color:#c9a567;font-weight:600}
.avatar{width:800px;height:800px;display:flex;align-items:center;justify-content:center;background:radial-gradient(500px 500px at 50% 60%,rgba(201,165,103,.22),transparent 65%),#010101;border-radius:0}
.avatar img{width:640px}`;
const banner=`<html><head><style>${css}</style></head><body><div class="banner"><div class="safe"><img src="${LOGO}"><div><h1>Builds the brand. Powers the growth.<br><em>Automates the success.</em></h1><p>Brand · Execute · Automate &nbsp;·&nbsp; Winter Haven, FL</p></div></div></div></body></html>`;
const avatar=`<html><head><style>${css}</style></head><body><div class="avatar"><img src="${LOGO}"></div></body></html>`;
(async()=>{ const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 for(const [name,html,w,h] of [['youtube-banner-2560x1440.png',banner,2560,1440],['youtube-avatar-800.png',avatar,800,800]]){
  const p=await b.newPage({viewport:{width:w,height:h}}); const tmp=path.join(__dirname,'_yt.html'); fs.writeFileSync(tmp,html);
  await p.goto('file://'+tmp,{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(200);
  await p.screenshot({path:path.join(OUT,name)}); await p.close(); fs.unlinkSync(tmp); console.log('ok',name); }
 await b.close(); })();
