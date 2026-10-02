# coursinfo — cours d'informatique (français)

A French computer-science course site: 5 chapters, 73 pages, fully static.
Every page is a plain HTML file with its own stylesheet and a small shared
script. No build step, no framework, no server-side code.

All personal and institutional identifiers have been replaced with the
placeholders `[Auteur du cours]` and `[Établissement]`. To re-brand the site,
find and replace those two placeholders across the `.html` files (they appear
once per page, in the footer).

---

## How to run

```bash
node server.js          # http://localhost:8080
node server.js 3000     # or pick another port
```

`start.sh` / `start.bat` do the same thing if you prefer double-clicking.
No install step, no dependencies — Node.js 18+ only.

---

## Where the pages are

```
index.html                     home, chapter accordion
chapitre1/ … chapitre5/        one folder per chapter, one .html per page
  <page>.html
  evaluations.html             index of the chapter exercises / PDFs / videos
  quiz/…  qcm/…               self-contained iSpring quizzes (own runtime)
css/<chapter>/<page>.css       stylesheets (see below)
js/                            shared scripts
```

73 pages. A page lives at the same path on the server as it does in this
folder: `chapitre3/variables.html` is served as
`http://localhost:8080/chapitre3/variables.html`.

---

## Where the CSS is

| file | used by |
|---|---|
| `style.css` | `index.html` |
| `style2.css`, `style4.css` | unreferenced leftovers of the original site, kept as-is |
| `chapitre1/style5.css` | `chapitre1/definitions.html` (the original already linked it externally) |
| `css/chapitre1/*.css` | 6 files |
| `css/chapitre2/*.css` | 6 files |
| `css/chapitre3/*.css` | 6 files |
| `css/chapitre4/*.css` | 4 files |
| `css/chapitre5/*.css` | 3 files |

25 files in `css/` — one per page that had its own inline stylesheet, named
after the page.
On the original the same CSS was inlined in each page; it is now external and
linked at exactly the same place in `<head>`. Full page → stylesheet table in
`SITE-MAP.md`.

---

## Where the JS is

| file | used by |
|---|---|
| `js/home.js` | `index.html` — the accordion |
| `js/nav.js` | every chapter page — `redirigerVersLien()` (chapter drop-down) and `showPage()` (QUIZ buttons) |

Both were inline `<script>` blocks in the original (55 pages for `nav.js`);
they are now one file each, loaded from the same position in the document.
The iSpring quizzes keep their own bundled runtime under `…/data/*.js` —
those are third-party and were **not** touched.

---

## Where the assets are

They stay exactly where the pages expect them, one folder per chapter:

```
chapitreN/image/*.png     screenshots of the lessons
chapitreN/docpdf/*.pdf    printable version of each lesson
chapitreN/tp/             exercises: .docx / .xlsx / .pdf
chapitreN/video/*.mp4     the practical-work videos
chapitreN/quiz|N/qcm/N/   iSpring quiz: <page>.html + data/ (player + content + fonts + images)
```

---

## Where the data is

There is no database and no data directory. Everything the site displays is
hard-coded in the HTML (lessons, exercises, answers). The only dynamic content
is the iSpring quiz payload, which is a base64 blob embedded in each quiz page
and decoded by its own bundled player.

---

## Backend / database

**None — nothing was rewritten.** The site runs on plain static files: no PHP,
no API, no XHR/fetch calls, no forms, no cookies, no localStorage.
`server.js` is only a static file server added so the project can be opened
locally.
