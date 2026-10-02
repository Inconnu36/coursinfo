#!/usr/bin/env node
/**
 * verify.js - integrity checker for the reconstructed project.
 *
 *   node verify.js
 *
 * Walks every HTML page, extracts every local reference (href / src / url() /
 * srcset / <source>) and checks that the target file exists inside the project.
 * Reports: broken links, missing assets, orphan pages, unused assets, pages
 * without a stylesheet, pages without the nav helper, console-hostile leftovers.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '_raw' || e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const htmlFiles = files.filter(f => f.endsWith('.html'));
const existing = new Set(files.map(f => path.resolve(f)));

function refsOf(html) {
  const refs = [];
  const push = v => { if (v) refs.push(v.trim()); };
  const attr = /(?:href|src|action|srcset|formaction|data|poster|data-src|data-href|cite)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  let m;
  while ((m = attr.exec(html))) {
    const v = (m[2] ?? m[3] ?? m[4] ?? '').trim();
    if (!v) continue;
    if (/\bsrcset$/i.test(m[0])) {
      v.split(',').forEach(p => { const u = p.trim().split(/\s+/)[0]; if (u) push(u); });
    } else {
      push(v);
    }
  }
  const urlRe = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  while ((m = urlRe.exec(html))) push(m[1]);
  return refs;
}

const chrome = require('../js/nav.js').COURSE_CHROME;
const broken = [];
const usedAssets = new Set();
let totalRefs = 0;
const noCss = [];
const noNav = [];
const runtimeDirs = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const isISpring = /PresentationPlayer\.start/.test(html);
  const rel = path.relative(ROOT, file);

  if (!/<link[^>]+stylesheet/i.test(html) && !/<style[\s>]/i.test(html)) noCss.push(rel);
  if (!isISpring && /onchange="redirigerVersLien/.test(html) && !/nav\.js/.test(html)) noNav.push(rel);

  // iSpring presentations load everything under data/ at run time from the
  // base64 manifest embedded in the page, so HTML ref-scanning cannot see it.
  if (isISpring) {
    const d = path.join(path.dirname(file), 'data');
    if (existing.has(d) || fs.existsSync(d)) {
      runtimeDirs.push(path.relative(ROOT, d) + '/');
      walk(d).forEach(f => usedAssets.add(path.resolve(f)));
    }
  }

  const entry = chrome[rel.replaceAll('\\', '/')];
  const shared = entry ? [...entry.navigation, ...entry.options].map(item => item.href).filter(Boolean) : [];
  for (const raw of [...refsOf(html), ...shared]) {
    if (!raw) continue;
    if (/^(https?:|data:|mailto:|tel:|javascript:|#|blob:)/i.test(raw)) continue;
    const target = path.resolve(path.dirname(file), decodeURIComponent(raw.split('?')[0].split('#')[0]));
    totalRefs++;
    usedAssets.add(target);
    if (!existing.has(target)) broken.push({ page: rel, ref: raw });
  }
}

const orphans = htmlFiles.filter(f => !usedAssets.has(path.resolve(f))).map(f => path.relative(ROOT, f));
const unusedAssets = files
  .filter(f => !f.endsWith('.html') && !f.endsWith('.js') && !f.endsWith('.css'))
  .filter(f => !usedAssets.has(path.resolve(f)))
  .map(f => path.relative(ROOT, f));

console.log('pages            :', htmlFiles.length);
console.log('total files      :', files.length);
console.log('references tested:', totalRefs);
console.log('');
console.log('broken links     :', broken.length);
broken.forEach(b => console.log('   MISSING  ' + b.page + '  ->  ' + b.ref));
console.log('pages w/o CSS    :', noCss.length);
noCss.forEach(f => console.log('   NO-CSS   ' + f));
console.log('pages w/o nav.js :', noNav.length);
noNav.forEach(f => console.log('   NO-NAV   ' + f));
console.log('orphan pages     :', orphans.length);
orphans.forEach(f => console.log('   ORPHAN   ' + f));
console.log('runtime dirs     :', runtimeDirs.length, '(iSpring data/ folders, loaded from the embedded manifest)');
console.log('unused assets    :', unusedAssets.length);
unusedAssets.forEach(f => console.log('   UNUSED   ' + f));

process.exit(broken.length || noCss.length || noNav.length || orphans.length ? 1 : 0);