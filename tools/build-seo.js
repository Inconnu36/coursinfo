#!/usr/bin/env node
'use strict';
// Outil de maintenance facultatif : les fichiers produits sont déjà livrés.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname,'..');
const origin = process.argv.find(a=>a.startsWith('--origin='))?.slice(9) || 'http://localhost:8080/';
if(!/^https?:\/\//.test(origin)) throw new Error('Utilisez --origin=https://votre-site/');
function walk(dir) {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')||e.name==='node_modules'?[]:e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const pages = walk(root).filter(p=>p.endsWith('.html'));
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const lastmod = new Date().toISOString().slice(0,10);
const items=pages.map(file=>{
    const relative=path.relative(root,file).replaceAll('\\','/');
    const url=new URL(relative,origin.endsWith('/')?origin:origin+'/').href;
    let html=fs.readFileSync(file,'utf8');
    html=html.replace(/\s*<meta[^>]*property="og:url"[^>]*>/gi,'');
    html=html.replace('</head>','<meta property="og:url" content="'+esc(url)+'">\n</head>');
    fs.writeFileSync(file,html);
    return '  <url><loc>'+esc(url)+'</loc><lastmod>'+lastmod+'</lastmod></url>';
});
// Le domaine livré est un exemple réservé (RFC 2606) : le remplacer par le
// vrai domaine avant publication, via --origin=.
const isPlaceholder = /(^|\/\/)(www\.)?example\.(com|org|net)\//.test(origin);
const sitemapComment = isPlaceholder
  ? '<!-- Remplacer '+origin.replace(/\/$/,'')+' par votre propre domaine avant publication. -->\n'
  : '';
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n'+sitemapComment+'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+items.join('\n')+'\n</urlset>\n');
fs.writeFileSync(path.join(root,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+new URL('sitemap.xml',origin.endsWith('/')?origin:origin+'/').href+'\n');
console.log(pages.length+' pages indexées pour '+origin);
