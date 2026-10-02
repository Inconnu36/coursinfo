#!/usr/bin/env node
'use strict';
// Contrôle de développement facultatif : npm install --no-save playwright
// puis npx playwright install chromium ; le site lui-même n’en dépend pas.
const fs=require('fs'),path=require('path');
const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'playwright'):'playwright');
const pages=JSON.parse(fs.readFileSync(path.join(__dirname,'pages.json')));
(async()=>{
 const browser=await chromium.launch({headless:true});const results=[];
 try{
  for(const width of [360,768,1280]){
   const context=await browser.newContext({viewport:{width,height:900}});
   for(const url of pages){
    const page=await context.newPage();const errors=[],failures=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});
    page.on('requestfailed',request=>failures.push(request.url()));
    page.on('response',response=>{if(response.status()>=400)failures.push(response.url()+' '+response.status());});
    await page.goto('http://localhost:8080'+encodeURI(url),{waitUntil:'networkidle'});
    const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelectorAll('h1').length,main:!!document.querySelector('main'),nav:!!document.querySelector('nav'),footer:!!document.querySelector('footer'),emptyImages:[...document.images].filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src)}));
    results.push({url,width,...state,errors,failures});await page.close();
   }
   await context.close();
  }
 }finally{await browser.close();}
 fs.writeFileSync('/tmp/coursinfo-browser-report.json',JSON.stringify(results,null,2)+'\n');
 const bad=results.filter(x=>x.overflow||x.h1!==1||!x.main||!x.nav||!x.footer||x.errors.length||x.failures.length||x.emptyImages.length);
 console.log(JSON.stringify({pages:pages.length,largeurs:3,visites:results.length,visitesEnEchec:bad.length,report:'/tmp/coursinfo-browser-report.json'},null,2));
 if(bad.length)process.exitCode=1;
 // Le démarrage et le score de chaque quiz demandent encore une revue de ses interactions.
})().catch(error=>{console.error(error.message);process.exitCode=1;});
