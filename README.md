# Cours d’informatique

## Lancer le site

```bash
node server.js 8080
```

Ouvrir `http://localhost:8080/`. `start.sh` et `start.bat` démarrent aussi le serveur. Node.js 18 ou plus suffit : aucune installation, aucune compilation et aucune dépendance de production.

Les pages et la recherche locale peuvent aussi s’ouvrir directement depuis les fichiers. Les quiz iSpring et le moteur Python facultatif sont à utiliser via le serveur local.

## Pages

`index.html` présente les cinq chapitres et le catalogue complet. Les 73 pages originales restent dans `chapitre1/` à `chapitre5/`, avec leurs chemins et noms conservés. Six pages ont été ajoutées : `recherche.html`, `syllabus.html`, `glossaire.html`, `fiches-de-revision.html`, `erreurs-courantes.html` et `atelier.html`.

## CSS

`style.css` conserve le style de l’accueil. `css/base.css` et `css/chapitre1.css` à `css/chapitre5.css` regroupent les styles des cours. `css/theme.css` ajoute les règles de lisibilité et d’accessibilité, `css/print.css` prépare l’impression. `css/quiz-chrome.css` ne concerne que les repères ajoutés autour des quiz. Les anciens chemins CSS restent des alias de compatibilité ; les styles internes iSpring restent inchangés.

## JavaScript

`js/nav.js` contient l’identité `SITE`, la carte `COURSE_CHROME` et le rendu partagé. Pour changer l’auteur et l’établissement, modifier uniquement `SITE.auteur` et `SITE.etablissement` au début de ce fichier.

`js/home.js` gère l’accordéon, `js/search.js` filtre l’index local. `js/atelier.js` et `js/python-worker.js` activent le moteur Python facultatif uniquement sur clic ; son premier chargement nécessite Internet. Le reste du cours n’effectue aucune requête externe.

## Documents et médias

Les images, PDF, documents Word et classeurs Excel restent dans leurs dossiers d’origine. Les MP4 restent dans `chapitreN/video/` ; des posters JPG ont été ajoutés sans modifier les vidéos. `transcripts/` contient douze aides textuelles issues des leçons, explicitement marquées brouillons. Les vidéos de substitution et les corrections indisponibles sont documentées dans `SITE-MAP.md` et `CHANGELOG.md`.

## Données et outils facultatifs

`data/search-index.json` et `js/search-index.js` contiennent l’index livré ; `data/image-descriptions.json` documente les textes alternatifs. Il n’y a aucune donnée personnelle de visiteur ni stockage de progression.

`tools/verify.js`, `tools/check.js` et `tools/verify-preservation.js` vérifient les liens, les régressions et les fichiers protégés. `tools/http-smoke.js` vérifie les réponses du serveur déjà lancé. `tools/build-search-index.js` régénère la recherche ; `tools/build-seo.js --origin=https://votre-domaine/` régénère le sitemap et les URL sociales pour le domaine choisi. Le domaine livré est celui du serveur local ; ces outils ne sont pas nécessaires pour utiliser le site.

L’audit PDF/Office de maintenance `tools/audit-documents.py` nécessite PyMuPDF et Pillow. Ces outils ne sont pas utilisés par les pages ni par le serveur.

## Backend

Aucun backend métier, aucune base de données, aucun framework et aucun compte utilisateur. `server.js` sert uniquement les fichiers statiques.
