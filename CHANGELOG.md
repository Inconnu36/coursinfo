# Journal des modifications

## Phase 0

- Référence `baseline-1.0` : commit initial existant, 73 pages, 720 fichiers, 830 références, aucun lien cassé.
- Manifeste SHA-256 et contrôle des régressions ajoutés.

## Phase 1

- Identité regroupée dans l’objet `SITE` de `js/nav.js`.
- La version reçue était déjà anonymisée. Aucun PDF, document Office, vidéo ou image n’a été réencodé ni modifié.
- Audit des 65 PDF : métadonnées, texte extractible, objets et flux décompressés. Audit de tous les fichiers Office XML et intégrité ZIP ; audit binaire et métadonnées des médias. Aucun identifiant de la liste recherchée. Résultats dans `tools/document-audit.json`.
- 249 images ouvertes en planches pour revue visuelle. Cette revue ne certifie pas la lisibilité des petits textes ; aucune suppression arbitraire.

### À revoir manuellement

- `chapitre5/image/deplacer_graphique.png` : compte affiché « Michel M… » dans le ruban Excel ; conservé pour examen manuel.
- `chapitre5/image/tableau.png` : prénoms SAMIR, HIND, KAMAL, AMIN et SAIDA dans le tableau de notes ; exemples pédagogiques, identité réelle non établie.
- `chapitre1/quiz/quiz1/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre1/quiz/quiz2/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre1/quiz/quiz3/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre1/quiz/quiz4/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre1/quiz/quiz5/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre1/quiz/quiz6/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre4/qcm/1/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre4/qcm/2/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre4/qcm/3/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre4/qcm/4/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre4/qcm/5/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.
- `chapitre4/qcm/6/data/thmb1.png` : vignette de quiz ; les petits textes ne permettent pas de certifier l’absence d’identité.

## Phase 2

- Navigation et menus extraits dans `COURSE_CHROME` ; rendu par `js/nav.js`, sans changer les liens valides et leur ordre.
- Lien Instructions de base du chapitre 2 corrigé ; menu tronqué de la série 3 corrigé ; menu Algorithmique copié par erreur dans les évaluations Python remplacé par le menu Python.
- Les résultats TP3 demandés sont absents de la version reçue : l’ancien lien vers TP1 reste disponible avec un intitulé explicite, sans fabriquer une correction.
- CSS regroupés dans `css/base.css` et cinq fichiers de chapitre ; variantes limitées à leur page sans augmenter la spécificité. Les anciens chemins CSS restent des alias de compatibilité. Suppression des neuf duplications de fichiers CSS.
- Soulignement des tableaux de contenu corrigé ; liens de navigation toujours soulignés.
- Titres distincts, descriptions, canonical relatif, métadonnées sociales, favicon local ; sitemap régénérable pour le domaine de déploiement.
- 204 images avec dimensions intrinsèques, descriptions françaises et décodage asynchrone ; lazy loading sauf les deux premières de chaque page.
- 12 vidéos avec posters du premier frame et preload metadata ; MP4 inchangés.
- 73 pages avec langue, titre H1 unique et repères ; ajout de chrome accessible autour des quiz, sans modification du lecteur ni du contenu iSpring.
- Styles d’impression, focus clavier et réduction des mouvements. Thème clair conservé ; options de thème sombre et de progression omises.
- Vérification : aucun lien cassé, aucun orphelin. Les tests de rendu navigateur restent à effectuer (navigateur de test indisponible dans cette session).

## Phase 3

- Index JSON et script local de recherche générés depuis les vrais textes HTML ; filtrage par mots et chapitre, sans CDN ni fetch (compatible file://).
- Catalogue complet ajouté à l’accueil : les 73 pages originales y sont liées directement, y compris séries, corrections et quiz.
- Recherche accessible au clavier, résultats annoncés avec aria-live et catalogue disponible sans JavaScript.

## Phase 4

- Programme : objectifs reliés aux leçons, exercices et quiz des cinq chapitres.
- Glossaire : 27 notions reformulées, chacune avec sa page source.
- Fiches de révision : synthèses par chapitre depuis les leçons existantes.
- Erreurs courantes : points de vigilance depuis les règles et exemples. Les codes d’erreur Excel absents des leçons n’ont pas été ajoutés comme contenu du cours.
- 12 aides textuelles de vidéos, explicitement marquées brouillons issus de la leçon et non transcription audio vérifiée. Les aides du chapitre 5 signalent les vidéos de substitution.
- Atelier Python facultatif : moteur Pyodide 0.27.3 chargé sur clic, dans un worker arrêtable, délai d’exécution de 10 secondes et sortie limitée. Explication statique, exemple du cours et liens restent accessibles hors ligne. Le chargement CDN n’a pas pu être exécuté dans le navigateur de cette session.
- Toutes les additions accessibles depuis l’accueil, le programme et la navigation partagée.

## Phase 5

- Protection des 607 fichiers binaires et ressources iSpring : aucun changement, aucun original supprimé ; les 72 pages originales hors accueil sont dans le catalogue.
- Les 17 ensembles de scripts et de données des quiz restent identiques ; cela ne constitue pas un test interactif de leur score.
- Syntaxe JavaScript vérifiée ; contrôles d’intégrité et d’audit sans dépendances ajoutés, avec seuils de régression fixés à zéro.
- Serveur statique : chemins cachés refusés, plages HTTP prises en charge pour les médias.
- Réponses HTTP vérifiées avec taille et SHA-256 pour tous les fichiers livrés.
- Balayage navigateur à 360, 768 et 1280 px : non exécuté, Chromium indisponible et téléchargement échoué. Le script facultatif `tools/browser-sweep.js` est fourni ; erreurs console, requêtes échouées, débordements et scores interactifs ne sont pas certifiés.
- L’atelier Python n’a pas été exécuté avec son moteur CDN dans cette session.
- Publication GitHub bloquée par la revue automatique : pas de modification de la branche principale ni de publication des changements.
- Archive sans `.git`, extraite dans un dossier temporaire et vérifiée avant livraison.

### Historique de la branche

```text
a8ba3d4 chore: freeze verified baseline and add regression audit
be09ee0 refactor: centralise neutral identity and verify document anonymity
08cafe8 refactor: consolidate chrome and styles with accessible lesson metadata
b254e73 feat: add offline course search and complete home-page catalogue
36efe8f feat: add sourced study resources and optional Python workshop
```
