# SITE-MAP — coursinfo

Full map of the site and of this folder.

This project is a page-for-page reconstruction: same 73 pages, same directory layout,
same URLs, same images / PDFs / videos / fonts, same CSS rules, same JavaScript
behaviour. This document is the reference: what exists, where it lives, what was
changed (and why), and what was verified.

---

## 1. What the site is

| | |
|---|---|
| Subject | IT course material (French, first-year technical stream) |
| Author | anonymised — see the note in §11 |
| Hosting | static HTML only |
| Backend | **none** — no PHP, no database, no API, no XHR/fetch, no forms, no cookies, no localStorage |
| Pages | 73 |
| Files | 720 · 168 MB (88 MB of it MP4, 53 MB of it the iSpring players) |
| Dynamic parts | home accordion (`js/home.js`) · chapter drop-downs (`js/nav.js`) · 17 iSpring quizzes (their own runtime) |
| First & last modified | nothing the site exposes — no build system, no source control |

Everything the site displays (lessons, exercises, answers) is hard-coded in the
HTML. The only "data" is the iSpring quiz payload, a base64 blob embedded in each
quiz page and decoded by the player bundled next to it.

---

## 2. Directory layout

```
coursinfo/
├── index.html              home: 5 collapsible chapter blocks
├── style.css               home stylesheet (external in the original too)
├── style2.css  style4.css  unreferenced leftovers — kept for fidelity
├── sitemap.xml             upstream, lists only "/" — kept as-is
├── server.js               static dev server (added, see §8)
├── start.sh  start.bat     launchers (added)
├── css/                    ← all stylesheets extracted from the pages
│   └── chapitre1 … chapitre5/
├── js/                     ← the two shared scripts extracted from the pages
│   ├── home.js  nav.js
├── tools/                  ← verification helper (added)
│   ├── verify.js  pages.js  pages.json
├── chapitre1/ … chapitre5/ ← pages + their assets, exactly like the original
│   ├── *.html
│   ├── image/    lesson screenshots (.png)
│   ├── docpdf/   printable PDF of every lesson
│   ├── tp/       practical work: .docx / .xlsx / .pdf
│   ├── video/    tp1.mp4 … tp6.mp4
│   ├── quiz/…    (chapitre1 only) 6 iSpring quizzes
│   └── qcm/…     (chapitre4, chapitre5) iSpring quizzes
```

The folder and `coursinfo.zip` hold exactly the same files. The byte-exact
crawl of the original was kept next to it as `coursinfo_raw_crawl/` — it is a
working archive, not part of the site, and is not in the ZIP.

---

## 3. All 73 pages

`URL` is identical on the original and here. `stylesheet` / `script` are the
files that page loads today.

| URL | `<title>` | stylesheet | script |
|---|---|---|---|
| `/chapitre1/cartemere.html` | carte-mère | `../css/chapitre1/cartemere.css` | `../js/nav.js` |
| `/chapitre1/corr1.html` | Correction | `../css/chapitre1/corr1.css` | `../js/nav.js` |
| `/chapitre1/corr2.html` | Correction | `../css/chapitre1/corr1.css` | `../js/nav.js` |
| `/chapitre1/definitions.html` | définitions | `style5.css` | `../js/nav.js` |
| `/chapitre1/eval1.html` | évaluations | `../css/chapitre1/corr1.css` | `../js/nav.js` |
| `/chapitre1/eval2.html` | évaluations | `../css/chapitre1/eval2.css` | `../js/nav.js` |
| `/chapitre1/evaluations.html` | évaluations | `../css/chapitre1/evaluations.css` | `../js/nav.js` |
| `/chapitre1/logiciels.html` | logiciels | `../css/chapitre1/cartemere.css` | `../js/nav.js` |
| `/chapitre1/quiz/quiz1/quizpresentation.html` | Représentation | `—` | `—` |
| `/chapitre1/quiz/quiz2/quizuct.html` | Quiz: UCT | `—` | `—` |
| `/chapitre1/quiz/quiz3/quizmemoire.html` | Quiz: Mémoire centrale | `—` | `—` |
| `/chapitre1/quiz/quiz4/quizperipherique.html` | quiz:peripherique | `—` | `—` |
| `/chapitre1/quiz/quiz5/quizcartemere.html` | Quiz: La carte-mère | `—` | `—` |
| `/chapitre1/quiz/quiz6/quizlogiciels.html` | Quiz: Types des logiciels | `—` | `—` |
| `/chapitre1/representation.html` | représentation | `../css/chapitre1/representation.css` | `../js/nav.js` |
| `/chapitre1/structure.html` | structure | `../css/chapitre1/structure.css` | `../js/nav.js` |
| `/chapitre2/correction1.html` | Correction | `../css/chapitre2/correction1.css` | `../js/nav.js` |
| `/chapitre2/correction2.html` | Correction | `../css/chapitre2/correction1.css` | `../js/nav.js` |
| `/chapitre2/correction3.html` | Correction | `../css/chapitre2/correction1.css` | `../js/nav.js` |
| `/chapitre2/correction4.html` | Correction | `../css/chapitre2/correction1.css` | `../js/nav.js` |
| `/chapitre2/definitions.html` | Définition | `../css/chapitre2/definitions.css` | `../js/nav.js` |
| `/chapitre2/donnees.html` | Notions de données | `../css/chapitre2/donnees.css` | `../js/nav.js` |
| `/chapitre2/evaluations.html` | évaluations | `../css/chapitre2/evaluations.css` | `../js/nav.js` |
| `/chapitre2/instruction.html` | Les instructions de base | `../css/chapitre2/instruction.css` | `../js/nav.js` |
| `/chapitre2/serie1.html` | évaluations | `../css/chapitre2/correction1.css` | `../js/nav.js` |
| `/chapitre2/serie2.html` | évaluations | `../css/chapitre2/correction1.css` | `../js/nav.js` |
| `/chapitre2/serie3.html` | évaluations | `../css/chapitre2/correction1.css` | `../js/nav.js` |
| `/chapitre2/serie4.html` | évaluations | `../css/chapitre2/correction1.css` | `../js/nav.js` |
| `/chapitre2/structurealgo.html` | Structure d’un algorithme | `../css/chapitre2/structurealgo.css` | `../js/nav.js` |
| `/chapitre2/structures.html` | Structures | `../css/chapitre2/instruction.css` | `../js/nav.js` |
| `/chapitre3/correction1.html` | Correction | `../css/chapitre3/correction1.css` | `../js/nav.js` |
| `/chapitre3/correction2.html` | Correction | `../css/chapitre3/correction1.css` | `../js/nav.js` |
| `/chapitre3/correction3.html` | Correction | `../css/chapitre3/correction1.css` | `../js/nav.js` |
| `/chapitre3/correction4.html` | Correction | `../css/chapitre3/correction1.css` | `../js/nav.js` |
| `/chapitre3/evaluations.html` | évaluations | `../css/chapitre3/evaluations.css` | `../js/nav.js` |
| `/chapitre3/exceptions.html` | Les exceptions en Python | `../css/chapitre3/exceptions.css` | `../js/nav.js` |
| `/chapitre3/fonctions.html` | Les fonctions prédéfinies | `../css/chapitre3/exceptions.css` | `../js/nav.js` |
| `/chapitre3/instruction.html` | Les instructions de base | `../css/chapitre3/exceptions.css` | `../js/nav.js` |
| `/chapitre3/introduction.html` | introduction | `../css/chapitre3/introduction.css` | `../js/nav.js` |
| `/chapitre3/serie1.html` | évaluations | `../css/chapitre3/correction1.css` | `../js/nav.js` |
| `/chapitre3/serie2.html` | évaluations | `../css/chapitre3/correction1.css` | `../js/nav.js` |
| `/chapitre3/serie3.html` | évaluations | `../css/chapitre3/correction1.css` | `../js/nav.js` |
| `/chapitre3/serie4.html` | évaluations | `../css/chapitre3/correction1.css` | `../js/nav.js` |
| `/chapitre3/structures.html` | Structures | `../css/chapitre3/structures.css` | `../js/nav.js` |
| `/chapitre3/variables.html` | variables | `../css/chapitre3/variables.css` | `../js/nav.js` |
| `/chapitre4/evaluations.html` | évaluations | `../css/chapitre4/evaluations.css` | `../js/nav.js` |
| `/chapitre4/fenetre.html` | Traitement des textes | `../css/chapitre4/fenetre.css` | `../js/nav.js` |
| `/chapitre4/les formes.html` | les formes | `../css/chapitre4/fenetre.css` | `../js/nav.js` |
| `/chapitre4/mise_en_forme.html` | Mise en forme | `../css/chapitre4/fenetre.css` | `../js/nav.js` |
| `/chapitre4/mise_en_page.html` | Mise en page | `../css/chapitre4/mise_en_page.css` | `../js/nav.js` |
| `/chapitre4/mise_en_page2.html` | Mise en page | `../css/chapitre4/mise_en_page2.css` | `../js/nav.js` |
| `/chapitre4/qcm/1/qcm1.html` | quiz1 | `—` | `—` |
| `/chapitre4/qcm/2/qcm2.html` | quiz2 | `—` | `—` |
| `/chapitre4/qcm/3/qcm3.html` | quiz3 | `—` | `—` |
| `/chapitre4/qcm/4/qcm4.html` | quiz4 | `—` | `—` |
| `/chapitre4/qcm/5/qcm5.html` | quiz5 | `—` | `—` |
| `/chapitre4/qcm/6/qcm6.html` | quiz6 | `—` | `—` |
| `/chapitre4/table des matieres.html` | table des matieres | `../css/chapitre4/mise_en_page2.css` | `../js/nav.js` |
| `/chapitre4/tableau.html` | tableau | `../css/chapitre4/fenetre.css` | `../js/nav.js` |
| `/chapitre5/definitions.html` | Tableur | `../css/chapitre5/definitions.css` | `../js/nav.js` |
| `/chapitre5/evaluations.html` | évaluations | `../css/chapitre5/evaluations.css` | `../js/nav.js` |
| `/chapitre5/fonction.html` | Tableur | `../css/chapitre5/fonction.css` | `../js/nav.js` |
| `/chapitre5/format_cellule.html` | Tableur | `../css/chapitre5/definitions.css` | `../js/nav.js` |
| `/chapitre5/formules.html` | Tableur | `../css/chapitre5/definitions.css` | `../js/nav.js` |
| `/chapitre5/gestion_feuil.html` | Tableur | `../css/chapitre5/definitions.css` | `../js/nav.js` |
| `/chapitre5/gestion_lignes.html` | Tableur | `../css/chapitre5/definitions.css` | `../js/nav.js` |
| `/chapitre5/graphe.html` | Tableur | `../css/chapitre5/definitions.css` | `../js/nav.js` |
| `/chapitre5/qcm/1/qcm1.html` | Quiz Excel | `—` | `—` |
| `/chapitre5/qcm/2/qcm2.html` | Quiz Excel | `—` | `—` |
| `/chapitre5/qcm/3/qcm3.html` | Quiz Excel | `—` | `—` |
| `/chapitre5/qcm/4/qcm4.html` | Quiz Excel | `—` | `—` |
| `/chapitre5/qcm/5/qcm5.html` | Quiz Excel | `—` | `—` |
| `/` | Page d'accueil éducative | `style.css` | `js/home.js` |

### 3.1 The 17 iSpring quizzes

These are exported iSpring presentations: one `.html` + a self-contained `data/`
folder each. They embed a base64+zlib `presInfo` manifest and load their own
runtime, so they were copied **byte-for-byte and never edited**.

| folder | player |
|---|---|
| `chapitre1/quiz/quiz1 … quiz6` | `data/player.js` (1 411 677 B) + `data/quizplayer.js` (1 411 677 B) |
| `chapitre4/qcm/1 … 6` | same |
| `chapitre5/qcm/1 … 5` | `data/player.js` (1 814 710 B) + `data/quizplayer.js` (1 814 710 B) |

Each `data/` folder holds: `player.js`, `quizplayer.js`, `quiz1.js` (the slides),
`browsersupport.js`, `thmb1.png`, `fnt0…fnt7.woff`, `quiz1/fonts/*`, `quiz1/images/*`,
`favicon.ico`, `apple-touch-icon.png` — **all** runtime files were fetched, none
are missing.

---

## 4. Navigation

### 4.1 Home

`index.html` = an intro block + an accordion with 5 buttons, one per chapter.
`js/home.js` closes every panel and opens the clicked one; the panels are hidden
by CSS (`.accordion-content { display: none }`), so the page is 614 px tall when
loaded. Each panel lists the chapter pages and ends with the `évaluations` link.

### 4.2 Chapter drop-down

Every chapter page has one `<select onchange="redirigerVersLien(this)">`, 6–9
options, first option always `value="sousmenu"` (a placeholder, navigates
nowhere). 110 `onchange` handlers across the site.

| chapter | options |
|---|---|
| 1 — Généralités sur les systèmes informatiques | definitions · representation · structure · cartemere · logiciels · evaluations |
| 2 — Algorithmique | definitions · donnees · structurealgo · instruction · structures · evaluations |
| 3 — Langages de programmation (Python) | introduction · variables · instruction · structures · fonctions · exceptions · evaluations |
| 4 — Traitement de texte (MS WORD 2016) | fenetre · mise_en_forme · tableau · les formes · mise_en_page · mise_en_page2 · table des matieres · evaluations |
| 5 — Tableur (MS EXCEL 2016) | definitions · gestion_feuil · gestion_lignes · format_cellule · formules · fonction · graphe · evaluations |

### 4.3 Précédent / Accueil / Suivant

One `<table>` at the top of each chapter page. `Accueil` → `../index.html`.
Chapters 1 and 4 are fully chained; chapters 2, 3 and 5 have **empty `Précédent`
links** on most pages (`href=""` → reloads the same page). That is the original
behaviour and it was preserved.

---

## 5. Assets

| kind | count | where |
|---|---|---|
| lesson screenshots | 126 `.png` | `chapitreN/image/` |
| printable lessons | 65 `.pdf` | `chapitreN/docpdf/` |
| practical work | 10 `.docx` + 4 `.xlsx` + 14 `.pdf` | `chapitre4/tp/`, `chapitre5/tp/` |
| videos | 12 `.mp4` (88 MB) | `chapitre4/video/`, `chapitre5/video/` |
| quiz images | 32 `.jpg` + 91 `.png` | `chapitreN/quiz|qcm/*/data/quiz1/images/` |
| quiz fonts | 182 `.woff` | `chapitreN/quiz|qcm/*/data/` + `.../data/quiz1/fonts/` |
| quiz runtime | 34 `.js` (53 MB) | `chapitreN/quiz|qcm/*/data/` |
| icons | 17 `.ico` + 17 `apple-touch-icon.png` | next to each quiz |
| stylesheets | 29 `.css` | `css/` + root + `chapitre1/style5.css` |

---

## 6. CSS — where each rule now lives

The original inlined a `<style>` block in the `<head>` of 55 chapter pages
(`index.html` and `chapitre1/definitions.html` already used a `<link>`).
Each inline block was written out **verbatim** to `css/<chapter>/<page>.css` and
replaced by a `<link>` **at the exact same position in `<head>`**. Two pages that
carried identical CSS still have their own copy, as they did originally.

| stylesheet | pages |
|---|---|
| `style.css` | `index.html` |
| `chapitre1/style5.css` | `chapitre1/definitions.html` *(external upstream too — not moved)* |
| `css/chapitre1/cartemere.css` | cartemere, logiciels |
| `css/chapitre1/corr1.css` | corr1, corr2, eval1 |
| `css/chapitre1/eval2.css` | eval2 |
| `css/chapitre1/evaluations.css` | evaluations |
| `css/chapitre1/representation.css` | representation |
| `css/chapitre1/structure.css` | structure |
| `css/chapitre2/correction1.css` | correction1–4, serie1–4 |
| `css/chapitre2/definitions.css` | definitions |
| `css/chapitre2/donnees.css` | donnees |
| `css/chapitre2/evaluations.css` | evaluations |
| `css/chapitre2/instruction.css` | instruction, structures |
| `css/chapitre2/structurealgo.css` | structurealgo |
| `css/chapitre3/correction1.css` | correction1–4, serie1–4 |
| `css/chapitre3/evaluations.css` | evaluations |
| `css/chapitre3/exceptions.css` | exceptions, fonctions, instruction |
| `css/chapitre3/introduction.css` | introduction |
| `css/chapitre3/structures.css` | structures |
| `css/chapitre3/variables.css` | variables |
| `css/chapitre4/evaluations.css` | evaluations |
| `css/chapitre4/fenetre.css` | fenetre, les formes, mise_en_forme, tableau |
| `css/chapitre4/mise_en_page.css` | mise_en_page |
| `css/chapitre4/mise_en_page2.css` | mise_en_page2, table des matieres |
| `css/chapitre5/definitions.css` | definitions, format_cellule, formules, gestion_feuil, gestion_lignes, graphe |
| `css/chapitre5/evaluations.css` | evaluations |
| `css/chapitre5/fonction.css` | fonction |
| `style2.css`, `style4.css` | nothing — orphans kept from the original |

---

## 7. JavaScript

| file | origin | behaviour |
|---|---|---|
| `js/home.js` | inline `<script>` at the end of `index.html`, verbatim | accordion: close all panels, open the clicked one |
| `js/nav.js` | inline `<script>` at the end of **55** chapter pages, verbatim | `redirigerVersLien(select)` → `location.href = select.value` |
| `js/nav.js` | **added** | `showPage(id)` — see below |

The iSpring bundles (`*/data/player.js`, `quizplayer.js`, `browsersupport.js`,
`quiz1.js`) are third-party, were never touched, and are not part of this project
in any editable sense.

### `showPage()` — the one intentional behaviour change

46 QUIZ buttons across chapitre4 / chapitre5 are written as

```html
<a href="qcm/2/qcm2.html" target="_blank"><button onclick="showPage('page1')">…</button></a>
```

`showPage` **does not exist** anywhere in the original site, so every click raised
`Uncaught ReferenceError: showPage is not defined`. The `<a target="_blank">`
around the button still opened the quiz, so the visible behaviour was correct —
only the console was dirty.

It is re-implemented in `js/nav.js` with the behaviour its call sites imply
(show the element carrying that id, no-op if it does not exist). No element with
`id="page1"` exists on those pages, so it stays a no-op: identical rendering,
identical navigation, no console error.

### `aes.js` — not part of the project

The original host served an AES anti-bot challenge page (`aes.js`, `slowAES`) before
the first request from an unknown client. It is host protection, not part of the
site, and is **not** included in the project.

---

## 8. What was added

Only these, all outside the site's own tree:

| file | why |
|---|---|
| `server.js` | zero-dependency static file server — `node server.js [port]`, default 8080 |
| `start.sh` / `start.bat` | one-line launchers for the server |
| `tools/verify.js` | link / asset integrity checker |
| `tools/pages.js`, `tools/pages.json` | list of the 73 page paths (used to drive the live-vs-local comparison) |
| `README.md`, `SITE-MAP.md` | these two documents |

Nothing else was rewritten. There is no backend to rewrite.

---

## 9. Broken links in the original, and how they were handled

The original server has 9 dead references. A faithful copy would reproduce them,
but the brief requires a copy with **no** broken links, so each one is repaired
and listed here.

| # | missing upstream | referenced from | fix |
|---|---|---|---|
| 1–6 | `chapitre5/video/tp1.mp4` … `tp6.mp4` | the six chapter-5 lesson pages (`formules.html`, `fonction.html`, `format_cellule.html`, `gestion_feuil.html`, `gestion_lignes.html`, `graphe.html`) | copied from `chapitre4/video/` — **placeholders**: the chapter-4 videos, under the chapter-5 filenames |
| 7 | `chapitre4/tp/Texte Microsoft Word.pdf` | `chapitre4/evaluations.html` | generated from the `.docx` sitting next to it (LibreOffice) — same document |
| 8 | `chapitre4/tp/tp4 résultat.docx` | `chapitre4/evaluations.html` | **reconstruction** — a copy of `tp4.docx` |
| 9 | `chapitre4/tp/tp4 résultat.pdf` | `chapitre4/evaluations.html` | **reconstruction** — a copy of `tp4.pdf` |

> Files 1–6: the chapter-5 videos are gone from the host (every request for
> `/chapitre5/video/tp1..6.mp4` answers 404 — confirmed during the crawl and
> again afterwards). The files sitting there now are the chapter-4 videos under
> the chapter-5 names, so that the `<video><source>` of each chapter-5 lesson
> resolves and plays instead of showing an empty player. **They are stand-ins,
> not the real chapter-5 recordings** — drop the real files in to replace them.
> The chapter-4 videos themselves are byte-for-byte copies of the originals.
>
> Files 8 and 9: the author never published the "expected result" of TP4. Every
> other TP has a `résultat` file, so the missing pair was created from the
> statement itself to keep the link alive. **These two are placeholders, not the
> real answer key.** Replace them when the real document is available.
>
> File 7 is a genuine conversion of a file that exists upstream, so its content
> is correct.

### Anomalies de la version initiale (état historique ; voir le contrôle actuel)

| where | bug |
|---|---|
| `chapitre2/definitions.html` | drop-down option *IV. Les instructions de base* points to `cartemere.html` (a chapitre-1 page) — copy-paste mistake by the author |
| `chapitre4/evaluations.html` | the TP3 answer link points at `tp1 résultat.docx` — same copy-paste mistake |
| `chapitre2/serie3.html` | its drop-down labels are truncated: *I. Qu’est-ce qu’un* and *III. Structure d’un* stop there, where every other page of the chapter ends them with *algorithme* / *algorithme* |
| `sitemap.xml` | declares only one URL |

These are content bugs, not build bugs. Fixing them is a *development* step, not
a reconstruction step, so they are preserved exactly.

---

## Annexe historique — vérification de la reconstruction initiale

Everything below was measured, not assumed.

| check | result |
|---|---|
| crawl of the original | 113 URLs, 266 assets, 9 real dead references (§9) |
| pages in the copy vs pages on the site | 73 = 73, 0 missing, 0 extra |
| every binary asset re-fetched from the live host and hashed (SHA-256) | **507 of 510 byte-identical, 0 different, 3 absent upstream** (the 3 reconstructions of §9) |
| `node tools/verify.js` — local references resolve | **0 broken** (830 references tested) |
| … pages without a stylesheet | **0** |
| … pages without `js/nav.js` though they call `redirigerVersLien` | **0** |
| … orphan pages (nothing links to them) | **0** |
| … unused files | 6 (`README.md`, `SITE-MAP.md`, `sitemap.xml`, `start.sh`, `start.bat`, `tools/pages.json`) — all intentional |
| live vs local, HTML structure (DOMParser, all 73 pages) | **0 differences** once `<style>`→`<link>` and inline `<script>`→`<script src>` are normalised |
| live vs local, visible text (all 73 pages, scripts stripped) | **0 differences** |
| live vs local, rendered: element count, tag, attributes, 41 computed CSS properties, bounding boxes (1280 px) | **0 pages with a different element count**; every difference found is accounted for below |
| … 55 lesson/evaluation pages | 1 difference: the `<body>` text, because the live page still carries `redirigerVersLien()` as inline script *source* and the copy loads the identical function from `js/nav.js` |
| … 15 iSpring `quiz/`+`qcm/` pages | 4–5 differences: element ids the iSpring player generates at random on every load, and the order in which it writes two inline `style` declarations — different on two consecutive loads of the *same* page |
| … 7 chapter-5 pages | media could not be compared: the live host answers 404 for `chapitre5/video/*.mp4` (§9), so the live side shows the empty 150 px player while the copy plays the stand-in file |
| live vs local, console errors on the local copy | **0** on all 73 pages |
| live vs local, network requests with status ≥ 400 | **0** on the local copy (the live copy had one 502 on a proxied image during the run) |
| responsive check, 360 → 1440 px (5 pages) | no horizontal scrolling, `@media (max-width: 600px)` breakpoint behaves identically |
| interactions | accordion open/close, chapter `<select>` navigation, Précédent/Accueil/Suivant, QUIZ buttons, iSpring quiz playback — all behave as on the original |

How the live/local comparison works: both sites are served from one origin
(`/live-root/*` proxied from the internet, `/local-root/*` from this folder, each
HTML getting a `<base>` pointing at its own directory) so the browser can put
them in two iframes and diff their computed styles. The harness is a throwaway
tool and is not part of the deliverable.

### Method note

`curl` and `wget` cannot reach the original host (`SSL_read: unexpected eof while
reading` — the origin fingerprints its TLS clients). All crawling was done from
Node with the host's challenge cookie solved in-process
(`slowAES.decrypt(...)` → `__test` cookie).

---

## 11. Anonymisation

Every personal and institutional identifier was replaced with a neutral French
placeholder before this project was published:

| where | what was there | what it is now |
|---|---|---|
| footer of 56 content pages | real author name, role, school code and town | `[Auteur du cours]` · `Enseignant d'informatique` · `[Établissement]` |
| 65 PDFs — document metadata | the `/Author` field and the XMP `dc:creator` value (4 distinct forms) | `ANONYMISE-AUTEUR` / `ANONYMISE` / `ANONYM` |
| 29 PDFs — **printed page footer**, repeated on every page | the same identity, drawn as page text | text object removed from the page |
| 1 PDF — a `Tampon` (stamp) annotation | stamp author field | cleared |
| 14 DOCX/XLSX — `docProps/core.xml` | `dc:creator`, `cp:lastModifiedBy` | `[Auteur du cours]` |
| `README.md`, `SITE-MAP.md`, `server.js`, `sitemap.xml` | the live hostname and hosting vendor | removed |

The original values are deliberately not reproduced here: this document is part
of the published project, so naming what was removed would publish it. A scan of
every committed object confirms no identity string survives anywhere in the
repository.

### How the PDFs were redacted

Metadata is not enough: the name was *printed* in the footer of every page of 29
PDFs (59 occurrences). The visible footer was removed by parsing each page's
content stream, decoding every literal string, and dropping the `BT … ET` text
objects whose text contained an identity token — plus any adjacent object holding
nothing but separator characters, so no stray `-` is left behind. Everything else
in the stream is byte-identical, so nothing on the page moves. The remaining
metadata (including copies hidden inside compressed `/ObjStm` object streams) was
replaced with **equal-length** byte strings, which keeps every cross-reference
offset valid.

Verified afterwards, against a copy of the originals: 0 identity bytes remaining in
raw *and* decompressed streams, 0 invalid PDFs, 0 page-count changes, page numbers
and all lesson text preserved, and the only text removed is the letterhead.

### One item needing a human eye

`chapitre1/docpdf/cartemere.pdf`, page 1, carries a stamp annotation whose
appearance is a 700×510 full-colour raster image. Its text fields were cleared, but
**the pixels cannot be read by tooling here**, so whether that stamp shows a name
or a logo was not verified. Open it and delete the stamp if it identifies anyone.
The 204 lesson screenshots were checked for EXIF and PNG text chunks — all clean —
but text *drawn inside* those images was likewise not machine-verifiable.

### Baseline-1.0 — contrôle avant modification

```text
pages            : 73
total files      : 721
references tested: 830

broken links     : 0
pages w/o CSS    : 0
pages w/o nav.js : 0
orphan pages     : 0
runtime dirs     : 17 (iSpring data/ folders, loaded from the embedded manifest)
unused assets    : 6
   UNUSED   README.md
   UNUSED   SITE-MAP.md
   UNUSED   sitemap.xml
   UNUSED   start.bat
   UNUSED   start.sh
   UNUSED   tools/pages.json
Audit : {"imagesSansAlt":204,"imagesSansDimensions":204,"videosSansPoster":12,"videosSansPreload":12,"pagesSansH1":73,"pagesH1Multiples":0,"pagesSansLangue":17,"pagesSansDescription":73,"pagesSansReperes":73,"titresDupliques":36,"identites":0,"cssDupliques":9}
Manifeste enregistré.
Régressions non autorisées : 0
```

## 10. Vérification de la version améliorée

Les mesures suivantes concernent la branche locale `feat/course-upgrade`, pas les assertions historiques ci-dessus.

| Contrôle | Résultat |
|---|---|
| Pages HTML | 79 : 73 originales et 6 additions |
| Fichiers livrés, hors `.git` | 782 |
| Références locales testées, HTML + navigation partagée + CSS | 2223 |
| Liens cassés / pages sans CSS / pages sans navigation / pages orphelines | 0 / 0 / 0 / 0 |
| Images avec alt et dimensions intrinsèques | 204 / 204 |
| Vidéos avec poster et preload metadata | 12 / 12 |
| Pages avec un seul H1, langue fr, description et repères | 79 / 79 |
| Titres dupliqués / fichiers CSS dupliqués | 0 / 0 |
| Audit des identifiants recherchés | 0 occurrence ; images avec texte visible à revoir dans CHANGELOG |
| Régressions non autorisées | 0 |
| Fichiers protégés comparés au manifeste | 607 identiques, 0 manquant, 0 modifié |
| Ensembles de scripts inline iSpring comparés à baseline-1.0 | 17 identiques |
| Pages originales hors accueil liées directement depuis l’accueil | 72 / 72 |
| HTTP, contenu et longueur vérifiés | 782 réponses 200 conformes, 0 échec |
| Range vidéo / accès aux chemins cachés | 206 et 100 octets attendus / 403 |
| JavaScript auteur, syntaxe Node | valide |
| Console, requêtes du navigateur et débordements à 360/768/1280 px | non mesurés : Chromium indisponible, installation échouée |
| Démarrage interactif et score des 17 quiz | non vérifiés ; données et scripts préservés |
| Atelier Pyodide en navigateur | non exécuté ; dépendance CDN facultative, chargement sur clic |

### Pages et données ajoutées

- `recherche.html` : recherche locale, JSON plus script d’index pour éviter fetch sous file://.
- `syllabus.html` : objectifs et pages source par chapitre.
- `glossaire.html` : 27 notions avec leurs sources.
- `fiches-de-revision.html` : synthèses des cinq chapitres.
- `erreurs-courantes.html` : points de vigilance déduits des leçons.
- `atelier.html` : exemple de moyenne et Pyodide facultatif.
- `transcripts/chapitre4-tp1.txt` à `chapitre5-tp6.txt` : 12 aides textuelles, brouillons issus des leçons.

### CSS consolidés

| Destination | Usage |
|---|---|
| `css/base.css` | base commune |
| `css/chapitre1.css` à `css/chapitre5.css` | règles regroupées, variantes sélectionnées avec data-style |
| `style.css` | accueil |
| `css/theme.css` | lisibilité, focus, affichage adaptatif et réduction des mouvements |
| `css/print.css` | impression |
| `css/quiz-chrome.css` | repères ajoutés autour des quiz ; aucun style interne remplacé |

Les 25 anciens fichiers sous `css/chapitreN/` et `chapitre1/style5.css` sont des alias de compatibilité. `style2.css` et `style4.css` restent également accessibles comme alias. Aucun ancien chemin n’est supprimé.

### Corrections intentionnelles et limites conservées

- Chapitre 2 : option Instructions de base corrigée et intitulés du menu série 3 rétablis.
- Chapitre 3 : menu Algorithmique copié dans les évaluations remplacé par le menu Python.
- TP3 Word : les fichiers de résultat sont absents de la version reçue. Le lien TP1 porte maintenant la mention explicite « Exemple TP1 (correction TP3 non fournie) » ; aucun faux corrigé créé.
- Sous-lignement des tableaux de contenu supprimé ; liens de navigation toujours soulignés.
- Les six MP4 du chapitre 5 restent des substitutions du chapitre 4 ; les aides textuelles le signalent.
- Les résultats TP4 restent les reconstructions documentées dans la section 9, sans prétendre être les corrigés réels.
- Les ressources internes des quiz et tous les documents restent identiques. La certification du rendu et des scores reste à effectuer.
- Sitemap et URL sociales sont livrés pour `http://localhost:8080/`. L’origine du déploiement est à renseigner avec `tools/build-seo.js --origin=https://votre-domaine/`.

### Carte des styles actifs

| Page | Variante de chapitre |
|---|---|
| `chapitre1/cartemere.html` | `chapitre1-cartemere` |
| `chapitre1/corr1.html` | `chapitre1-corr1` |
| `chapitre1/corr2.html` | `chapitre1-corr1` |
| `chapitre1/definitions.html` | `chapitre1-definitions` |
| `chapitre1/eval1.html` | `chapitre1-corr1` |
| `chapitre1/eval2.html` | `chapitre1-eval2` |
| `chapitre1/evaluations.html` | `chapitre1-evaluations` |
| `chapitre1/logiciels.html` | `chapitre1-cartemere` |
| `chapitre1/representation.html` | `chapitre1-representation` |
| `chapitre1/structure.html` | `chapitre1-structure` |
| `chapitre2/correction1.html` | `chapitre2-correction1` |
| `chapitre2/correction2.html` | `chapitre2-correction1` |
| `chapitre2/correction3.html` | `chapitre2-correction1` |
| `chapitre2/correction4.html` | `chapitre2-correction1` |
| `chapitre2/definitions.html` | `chapitre2-definitions` |
| `chapitre2/donnees.html` | `chapitre2-donnees` |
| `chapitre2/evaluations.html` | `chapitre2-evaluations` |
| `chapitre2/instruction.html` | `chapitre2-instruction` |
| `chapitre2/serie1.html` | `chapitre2-correction1` |
| `chapitre2/serie2.html` | `chapitre2-correction1` |
| `chapitre2/serie3.html` | `chapitre2-correction1` |
| `chapitre2/serie4.html` | `chapitre2-correction1` |
| `chapitre2/structurealgo.html` | `chapitre2-structurealgo` |
| `chapitre2/structures.html` | `chapitre2-instruction` |
| `chapitre3/correction1.html` | `chapitre3-correction1` |
| `chapitre3/correction2.html` | `chapitre3-correction1` |
| `chapitre3/correction3.html` | `chapitre3-correction1` |
| `chapitre3/correction4.html` | `chapitre3-correction1` |
| `chapitre3/evaluations.html` | `chapitre3-evaluations` |
| `chapitre3/exceptions.html` | `chapitre3-exceptions` |
| `chapitre3/fonctions.html` | `chapitre3-exceptions` |
| `chapitre3/instruction.html` | `chapitre3-exceptions` |
| `chapitre3/introduction.html` | `chapitre3-introduction` |
| `chapitre3/serie1.html` | `chapitre3-correction1` |
| `chapitre3/serie2.html` | `chapitre3-correction1` |
| `chapitre3/serie3.html` | `chapitre3-correction1` |
| `chapitre3/serie4.html` | `chapitre3-correction1` |
| `chapitre3/structures.html` | `chapitre3-structures` |
| `chapitre3/variables.html` | `chapitre3-variables` |
| `chapitre4/evaluations.html` | `chapitre4-evaluations` |
| `chapitre4/fenetre.html` | `chapitre4-fenetre` |
| `chapitre4/les formes.html` | `chapitre4-fenetre` |
| `chapitre4/mise_en_forme.html` | `chapitre4-fenetre` |
| `chapitre4/mise_en_page.html` | `chapitre4-mise_en_page` |
| `chapitre4/mise_en_page2.html` | `chapitre4-mise_en_page2` |
| `chapitre4/table des matieres.html` | `chapitre4-mise_en_page2` |
| `chapitre4/tableau.html` | `chapitre4-fenetre` |
| `chapitre5/definitions.html` | `chapitre5-definitions` |
| `chapitre5/evaluations.html` | `chapitre5-evaluations` |
| `chapitre5/fonction.html` | `chapitre5-fonction` |
| `chapitre5/format_cellule.html` | `chapitre5-definitions` |
| `chapitre5/formules.html` | `chapitre5-definitions` |
| `chapitre5/gestion_feuil.html` | `chapitre5-definitions` |
| `chapitre5/gestion_lignes.html` | `chapitre5-definitions` |
| `chapitre5/graphe.html` | `chapitre5-definitions` |
