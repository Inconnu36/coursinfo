#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'manifest.json')));
let missing=0,changed=0,checked=0;
for(const file of baseline.files){
 const target=path.join(root,file.path);
 if(!fs.existsSync(target)){console.error('Fichier original absent :',file.path);missing++;continue;}
 if(!/\.(pdf|docx|xlsx|mp4|png|jpe?g|gif|bmp|woff2?|ttf|otf|eot)$/i.test(file.path)&&!file.path.includes('/data/'))continue;
 checked++;const hash=crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex');
 if(hash!==file.sha256){console.error('Contenu protégé modifié :',file.path);changed++;}
}
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
let unreachable=0;
for(const file of baseline.files.filter(f=>f.path.endsWith('.html')&&f.path!=='index.html')){
 const variants=[file.path,encodeURI(file.path)];
 if(!variants.some(v=>home.includes('href="'+v+'"'))){console.error('Absent du catalogue :',file.path);unreachable++;}
}
console.log(JSON.stringify({fichiersProteges:checked,fichiersAbsents:missing,contenusModifies:changed,pagesOriginalesAbsentesDuCatalogue:unreachable},null,2));
process.exit(missing||changed||unreachable?1:0);
