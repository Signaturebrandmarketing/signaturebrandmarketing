const { chromium } = require('/Users/ken/Desktop/signature-site-video/node_modules/playwright-core');
const S='/private/tmp/claude-501/-Users-ken-Desktop-signature-agent-os-desk-demo-site/50ce9532-0ce1-4369-9477-f27c4af67db4/scratchpad/';
(async()=>{
  const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
  const p=await b.newPage({viewport:{width:1440,height:900}});
  await p.goto('https://signaturebrandmarketing.com/funnels/?v='+Date.now(),{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
  await p.screenshot({path:S+'funnels-full.png',fullPage:true});
  // assessment routing: non-insurance, gaps = missed calls / after-hours / CRM
  await p.goto('https://signaturebrandmarketing.com/assessment/?v='+Date.now(),{waitUntil:'networkidle'});
  await p.evaluate(()=>{const $=id=>document.getElementById(id); $('p-business').value='Brightwater Events'; $('p-industry').value='Other'; $('p-team').value='2–5'; $('p-revenue').value='$100K–$250K';});
  await p.click('text=Start the assessment'); await p.waitForTimeout(200); await p.click('text=Continue'); await p.waitForTimeout(200);
  const seq=[3,3,3,2,0,0,2,0,0,3]; // low on Q5,Q6,Q8,Q9
  for(let i=0;i<10;i++){ const o=await p.$$('#s-quiz .opt'); await o[seq[i]].click(); await p.waitForTimeout(120); await (await p.$('#s-quiz .qnav .btn.gold')).click(); await p.waitForTimeout(200); }
  await p.waitForSelector('#s-result.on'); await p.waitForTimeout(400);
  const fix=await p.$('#r-fix'); const bb=await fix.boundingBox(); await p.evaluate(y=>window.scrollTo(0,y-300),bb.y);
  await p.waitForTimeout(300); await p.screenshot({path:S+'assess-route.png'});
  console.log('fix text:', (await fix.innerText()).replace(/\n/g,' | '));
  await b.close();
})();
