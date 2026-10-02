'use strict';
// Audit sans dépendances : métadonnées Office et chaînes PDF décompressées.
const fs=require('fs'),zlib=require('zlib');
const identity=/nfissi|abdesslam|inssaf|1lmr|22web|infinityfree/i;
function hasIdentity(buffer){return identity.test(buffer.toString('utf8'))||identity.test(buffer.toString('utf16le'));}
function officeEntries(buffer){
 const entries=[];
 for(let p=0;p+46<buffer.length;p++){
  if(buffer.readUInt32LE(p)!==0x02014b50)continue;
  const size=buffer.readUInt32LE(p+20),method=buffer.readUInt16LE(p+10),nameLength=buffer.readUInt16LE(p+28),extraLength=buffer.readUInt16LE(p+30),commentLength=buffer.readUInt16LE(p+32),offset=buffer.readUInt32LE(p+42);
  const name=buffer.subarray(p+46,p+46+nameLength).toString('utf8');
  if(name.endsWith('.xml')){
   if(buffer.readUInt32LE(offset)!==0x04034b50)throw new Error('Entrée ZIP invalide');
   const start=offset+30+buffer.readUInt16LE(offset+26)+buffer.readUInt16LE(offset+28);
   const data=buffer.subarray(start,start+size);
   entries.push(method===8?zlib.inflateRawSync(data):data);
  }
  p+=45+nameLength+extraLength+commentLength;
 }
 return entries;
}
function auditFile(file){
 const bytes=fs.readFileSync(file);let errors=hasIdentity(bytes)?1:0;
 if(/\.(docx|xlsx)$/i.test(file))for(const content of officeEntries(bytes))if(hasIdentity(content))errors++;
 if(file.endsWith('.pdf')){
  const text=bytes.toString('latin1');const stream=/stream\r?\n([\s\S]*?)\r?\nendstream/g;let match;
  while((match=stream.exec(text))){
   const prefix=text.slice(Math.max(0,match.index-400),match.index);
   if(!prefix.includes('FlateDecode'))continue;
   try{if(hasIdentity(zlib.inflateSync(Buffer.from(match[1],'latin1'))))errors++;}catch(error){/* Certains flux emploient des filtres combinés ; l’audit PyMuPDF de maintenance les complète. */}
  }
 }
 return errors;
}
module.exports={auditFile};
