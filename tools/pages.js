#!/usr/bin/env node
/**
 * fingerprint.js - prints the JS expression used to fingerprint a page in the
 * browser (live site vs local reconstruction) for the DOM/render comparison.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === '_raw' || e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push('/' + path.relative(ROOT, p).split(path.sep).join('/'));
  }
})(ROOT);
pages.sort();
console.log(JSON.stringify(pages, null, 0));