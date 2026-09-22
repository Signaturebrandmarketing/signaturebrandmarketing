const { chromium } = require('/Users/ken/Desktop/signature-site-video/node_modules/playwright-core');
(async()=>{ const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const p=await b.newPage({viewport:{width:1440,height:900}}); await p.goto('https://signaturebrandmarketing.com/?v='+Date.now(),{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
 await p.hover('nav li.has-menu > a'); await p.waitForTimeout(500);
 await p.screenshot({path:'/private/tmp/claude-501/-Users-ken-Desktop-signature-agent-os-desk-demo-site/50ce9532-0ce1-4369-9477-f27c4af67db4/scratchpad/nav.png',clip:{x:0,y:0,width:1440,height:620}}); await b.close(); })();
