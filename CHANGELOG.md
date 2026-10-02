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

- `chapitre5/image/deplacer_graphiq.png` : compte affiché « Michel M… » dans le ruban Excel ; conservé pour examen manuel.
- `chapitre5/image/tableau.png` : prénoms SAMIR, HIND, KAMAL, AMIN et SAIDA dans le tableau de notes ; exemples pédagogiques, identité réelle non établie.
- Les 17 fichiers `…/data/thmb1.png` : vignettes de quiz avec de petits textes, à examiner en taille native ; contenus internes conservés.
