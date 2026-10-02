'use strict';
// Chargement des motifs d'anonymisation.
//
// Les motifs réels — nom de l'auteur, code d'établissement, ancien nom
// d'hôte — ne sont écrits dans AUCUN fichier de ce dépôt, y compris dans les
// outils. Un dépôt public expose autant ses scripts que ses pages : un
// auditeur doit donc savoir ce qu'il cherche sans le publier.
//
// Ils vivent dans <racine>/.identity-patterns.txt, hors du projet publié et
// ignoré par git (voir .gitignore). Une ligne par motif, `#` pour commenter.
// Sans ce fichier, l'audit n'est pas silencieusement faux : il bascule sur les
// traces génériques et le signale.

const fs = require('fs');
const path = require('path');

const PATTERN_FILE = path.resolve(__dirname, '..', '.identity-patterns.txt');

// Trace toujours vérifiable sans liste secrète : une adresse électronique
// n'apparaît nulle part dans le cours, donc toute occurrence est un signal.
const GENERIQUE = ['[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+'];

const echapperRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function fileMotifs() {
  let brut;
  try {
    brut = fs.readFileSync(PATTERN_FILE, 'utf8');
  } catch {
    return [];
  }
  return brut
    .split('\n')
    .map(l => l.replace(/#.*$/, '').trim())
    .filter(Boolean);
}

function identityRegExp(flags = 'i') {
  const motifs = fileMotifs();
  return motifs.length ? new RegExp(motifs.map(echapperRe).join('|'), flags) : null;
}

function genericRegExp(flags = 'i') {
  return new RegExp(GENERIQUE.map(echapperRe).join('|'), flags);
}

const aPatternFile = () => fs.existsSync(PATTERN_FILE);

module.exports = { PATTERN_FILE, aPatternFile, fileMotifs, identityRegExp, genericRegExp };