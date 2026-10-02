#!/usr/bin/env node
'use strict';
// Maintenance facultative : les deux index générés sont livrés et utilisables hors ligne.
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')||e.name==='node_modules'?[]:e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function plain(text){return text.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ').replace(/<!--[\s\S]*?-->/g,' ').replace(/<[^>]*>/g,' ').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&(amp|lt|gt|quot|apos|nbsp);/g,(_,n)=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '}[n])).replace(/\s+/g,' ').trim();}
const index=walk(root).filter(p=>p.endsWith('.html')).map(file=>{
 const text=fs.readFileSync(file,'utf8');
 const relative=path.relative(root,file).replaceAll('\\','/');
 const title=plain(text.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||relative);
 const chapter=relative.match(/^chapitre([1-5])\//)?.[1]||'ressources';
 const body=plain(text.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1]||text);
 const keywords=[...new Set((body.toLowerCase().match(/[\p{L}][\p{L}\d’'-]{3,}/gu)||[]))].slice(0,160);
 return {url:relative,title,chapter,keywords,body};
});
fs.mkdirSync(path.join(root,'data'),{recursive:true});
fs.writeFileSync(path.join(root,'data/search-index.json'),JSON.stringify(index,null,2)+'\n');
fs.writeFileSync(path.join(root,'js/search-index.js'),'/* Index local généré, sans requête fetch. */\nwindow.COURSE_SEARCH_INDEX = '+JSON.stringify(index,null,2).replaceAll('<','\\u003c')+';\n');
console.log(index.length+' pages dans l’index de recherche.');
