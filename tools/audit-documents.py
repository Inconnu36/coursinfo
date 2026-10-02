#!/usr/bin/env python3
"""Audit de maintenance : PyMuPDF et Pillow requis, jamais au runtime du site."""
from pathlib import Path
import fitz, re, zipfile, json, hashlib, sys
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent))
from identity_patterns import identity_regex, generic_regex, PATTERN_FILE
root=Path(__file__).resolve().parent.parent
# Motifs réels si le fichier local existe, traces génériques sinon : le contrôle
# reste actif même sans liste locale, il perd seulement en précision.
rx=identity_regex() or generic_regex()
report={'pdf':[], 'ooxml':[], 'medias':[], 'identites':[]}
for p in sorted(root.rglob('*')):
 if '.git' in p.parts or not p.is_file():continue
 rel=p.relative_to(root).as_posix()
 if p.suffix=='.pdf':
  d=fitz.open(p)
  texts=[str(d.metadata), d.get_xml_metadata()]+[page.get_text() for page in d]
  for i in range(1,d.xref_length()):
   texts.append(d.xref_object(i));texts.append((d.xref_stream(i)or b'').decode('latin1'))
  if any(rx.search(t) for t in texts):report['identites'].append(rel)
  report['pdf'].append({'path':rel,'pages':len(d),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
 elif p.suffix in ['.docx','.xlsx']:
  with zipfile.ZipFile(p) as z:
   assert z.testzip() is None, rel
   if any(rx.search(z.read(n).decode('utf8','ignore')) for n in z.namelist() if n.endswith('.xml')):report['identites'].append(rel)
   report['ooxml'].append({'path':rel,'entries':len(z.namelist()),'bytes':p.stat().st_size})
 elif p.suffix.lower() in ['.mp4','.png','.jpg','.jpeg','.gif','.bmp']:
  if rx.search(p.read_bytes().decode('latin1')):report['identites'].append(rel)
  if p.suffix.lower()!='.mp4':
   with Image.open(p) as im:
    if rx.search(str(im.info)):report['identites'].append(rel)
  report['medias'].append(rel)
print(json.dumps(report,ensure_ascii=False,indent=2))
raise SystemExit(bool(report['identites']))
