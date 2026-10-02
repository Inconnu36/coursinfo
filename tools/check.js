#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {spawnSync} = require('child_process');
const root = path.resolve(__dirname, '..');
const manifestPath = path.join(__dirname, 'manifest.json');
const exclusions = new Set(['manifest.json', 'check-allow.json']);
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => {
    if (e.name.startsWith('.') || e.name === 'node_modules') return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : exclusions.has(e.name) ? [] : [p];
  });
}
const files = walk(root);
const snapshot = files.map(p => ({path:path.relative(root,p).replaceAll('\\','/'), bytes:fs.statSync(p).size, sha256:crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')}));
const counters = {imagesSansAlt:0, imagesSansDimensions:0, videosSansPoster:0, videosSansPreload:0, pagesSansH1:0, pagesH1Multiples:0, pagesSansLangue:0, pagesSansDescription:0, pagesSansReperes:0, titresDupliques:0, identites:0, cssDupliques:0};
const titles = new Map(), css = new Map();
const identity = /nfissi|abdesslam|inssaf|1lmr|22web|infinityfree/gi;
for (const file of files) {
  const rel = path.relative(root,file);
  if (/\.(html|css|js|md|xml|json|txt)$/i.test(file) && !rel.startsWith('tools/')) {
    const text=fs.readFileSync(file,'utf8');
    counters.identites += (text.match(identity)||[]).length;
  }
  if(file.endsWith('.css')) {
    const hash=snapshot.find(x=>x.path===rel).sha256;
    counters.cssDupliques += css.has(hash) ? 1 : 0; css.set(hash,rel);
  }
  if(!file.endsWith('.html')) continue;
  const html=fs.readFileSync(file,'utf8');
  for(const img of html.match(/<img\b[^>]*>/gi)||[]) {
    if(!/\balt\s*=/i.test(img)) counters.imagesSansAlt++;
    if(!/\bwidth\s*=/i.test(img)||!/\bheight\s*=/i.test(img)) counters.imagesSansDimensions++;
  }
  for(const video of html.match(/<video\b[^>]*>/gi)||[]) {
    if(!/\bposter\s*=/i.test(video)) counters.videosSansPoster++;
    if(!/\bpreload\s*=/i.test(video)) counters.videosSansPreload++;
  }
  const h1=(html.match(/<h1\b/gi)||[]).length;
  if(!h1)counters.pagesSansH1++;
  if(h1>1)counters.pagesH1Multiples++;
  if(!/<html[^>]*\blang=["']fr["']/i.test(html))counters.pagesSansLangue++;
  if(!/<meta[^>]*name=["']description["']/i.test(html))counters.pagesSansDescription++;
  if(!/<main\b/i.test(html)||!(/<nav\b/i.test(html)||/data-site-chrome/i.test(html))||!/<footer\b/i.test(html))counters.pagesSansReperes++;
  const title=(html.match(/<title>([\s\S]*?)<\/title>/i)||[])[1];
  if(titles.has(title))counters.titresDupliques++;
  titles.set(title,rel);
}
const verify=spawnSync(process.execPath,[path.join(__dirname,'verify.js')],{encoding:'utf8'});
process.stdout.write(verify.stdout);process.stderr.write(verify.stderr);
console.log('Audit :',JSON.stringify(counters));
const allowPath=path.join(__dirname,'check-allow.json');
let allowed=fs.existsSync(allowPath)?JSON.parse(fs.readFileSync(allowPath)):[];
const allowArg=process.argv.find(a=>a.startsWith('--allow'));
if(allowArg) {
  const value=allowArg.replace(/^--allow=?/,'');
  allowed=[...new Set([...allowed,...value.split(',').filter(Boolean)])];
  fs.writeFileSync(allowPath,JSON.stringify(allowed,null,2)+'\n');
}
const glob=s=>new RegExp('^'+s.replace(/[.+?^${}()|[\]\\]/g,'\\$&').replaceAll('*','.*')+'$');
const permitted=p=>allowed.some(g=>glob(g).test(p));
let regressions=verify.status ? 1 : 0;
if(fs.existsSync(manifestPath)) {
  const baseline=JSON.parse(fs.readFileSync(manifestPath));
  const old=new Map(baseline.files.map(f=>[f.path,f]));const current=new Map(snapshot.map(f=>[f.path,f]));
  for(const p of new Set([...old.keys(),...current.keys()])) {
    const a=old.get(p),b=current.get(p);
    if(a?.sha256===b?.sha256)continue;
    const ok=permitted(p);
    console.log(`${ok?'AUTORISÉ':'ÉCART'} ${!a?'ajout':!b?'suppression':'modification'} ${p} (${(b?.bytes||0)-(a?.bytes||0)} octets)`);
    if(!ok)regressions++;
  }
  for(const [key,value]of Object.entries(counters)) if(value>baseline.audit[key]) {console.error('Régression :',key,value);regressions++;}
}
if(process.argv.includes('--update')) {
  fs.writeFileSync(manifestPath,JSON.stringify({baseline:'baseline-1.0',files:snapshot,audit:counters},null,2)+'\n');
  console.log('Manifeste enregistré.');
  regressions=verify.status ? 1 : 0;
}
console.log('Régressions non autorisées :',regressions);
process.exit(regressions?1:0);
