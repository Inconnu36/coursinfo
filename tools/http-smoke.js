#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
const root=path.resolve(__dirname,'..');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')||e.name==='node_modules'?[]:e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk(root);let cursor=0,errors=0,passed=0;
function test(file){return new Promise(resolve=>{
 const relative=path.relative(root,file).replaceAll('\\','/');
 const hash=crypto.createHash('sha256');let bytes=0;
 const req=http.get('http://localhost:8080/'+encodeURI(relative),res=>{
  res.on('data',chunk=>{bytes+=chunk.length;hash.update(chunk);});
  res.on('end',()=>{
   const expected=fs.readFileSync(file);
   const valid=res.statusCode===200&&bytes===expected.length&&Number(res.headers['content-length'])===expected.length&&hash.digest('hex')===crypto.createHash('sha256').update(expected).digest('hex');
   if(!valid){errors++;console.error('ÉCHEC HTTP :',relative,res.statusCode,bytes,expected.length);}else passed++;
   resolve();
  });
 });
 req.setTimeout(20000,()=>req.destroy(new Error('Délai HTTP dépassé')));
 req.on('error',error=>{errors++;console.error(relative,error.message);resolve();});
});}
async function worker(){while(cursor<files.length){const file=files[cursor++];await test(file);}}
(async()=>{await Promise.all(Array.from({length:8},worker));console.log(JSON.stringify({fichiers:files.length,reponses200Conformes:passed,echecs:errors},null,2));process.exit(errors?1:0);})();
