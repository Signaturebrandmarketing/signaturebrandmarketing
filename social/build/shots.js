const { chromium } = require('/Users/ken/Desktop/signature-site-video/node_modules/playwright-core');
const path=require('path'); const OUT=path.join(__dirname,'..');
(async()=>{
  const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
  const p=await b.newPage({viewport:{width:1080,height:1080},deviceScaleFactor:1});
  await p.goto('https://signaturebrandmarketing.com/assessment/',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.evaluate(()=>{ const $=id=>document.getElementById(id); $('p-business').value='Your business here'; $('p-industry').value='Insurance'; $('p-team').value='2–5'; $('p-revenue').value='$250K–$1M'; });
  // start + answer to land on ~64: answers B,C,C,B,C,B,C,B,A,D → 3+7+7+3+7+3+7+3+0+10 = 50 ; use C,C,D,B,C,C,C,B,B,D → 7+7+10+3+7+7+7+3+3+10=64
  const seq=[2,2,3,1,2,2,2,1,1,3];
  await p.click('text=Start the assessment'); await p.waitForTimeout(300);
  await p.click('text=Continue'); await p.waitForTimeout(300);
  for(let i=0;i<10;i++){ const opts=await p.$$('#s-quiz .opt'); await opts[seq[i]].click(); await p.waitForTimeout(150);
    const btn=await p.$('#s-quiz .qnav .btn.gold'); await btn.click(); await p.waitForTimeout(250); }
  await p.waitForSelector('#s-result.on'); await p.waitForTimeout(600);
  const card=await p.$('#s-result .score'); const box=await card.boundingBox();
  // capture the score card + pillars region as a square
  await p.setViewportSize({width:1080,height:1400});
  await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(300);
  const el=await p.$('#s-result .wrap'); const bb=await el.boundingBox();
  await p.screenshot({path:path.join(OUT,'assessment-result.png'),clip:{x:bb.x,y:Math.max(0,bb.y-20),width:bb.width,height:Math.min(1080,bb.height)}});
  console.log('result ok', bb);
  await b.close();
})();
