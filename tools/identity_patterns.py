"""Chargement des motifs d'anonymisation (voir tools/identity.js).

Les motifs réels ne sont écrits dans aucun fichier de ce dépôt : un dépôt
public expose ses scripts autant que ses pages. Ils vivent dans
<racine>/.identity-patterns.txt, non versionné. Sans ce fichier, l'audit
bascule sur les traces génériques et le signale.
"""
from pathlib import Path
import re

PATTERN_FILE = Path(__file__).resolve().parent.parent / '.identity-patterns.txt'

# Trace toujours vérifiable sans liste secrète : aucune adresse électronique
# n'existe dans le cours, donc toute occurrence est un signal.
GENERIQUE = [r'[\w.+-]+@[\w-]+(?:\.[\w-]+)+']


def file_motifs():
    try:
        brut = PATTERN_FILE.read_text(encoding='utf8')
    except OSError:
        return []
    return [m for m in (l.split('#')[0].strip() for l in brut.split('\n')) if m]


def identity_regex():
    motifs = file_motifs()
    return re.compile('|'.join(re.escape(m) for m in motifs), re.I) if motifs else None


def generic_regex():
    return re.compile('|'.join(re.escape(m) for m in GENERIQUE), re.I)


def has_pattern_file():
    return PATTERN_FILE.exists()