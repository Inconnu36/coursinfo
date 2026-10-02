const SITE = Object.freeze({auteur: "[Auteur du cours]", etablissement: "[Établissement]", role: "Enseignant d'informatique"});
/*
 * nav.js - shared navigation helpers used by every lesson / evaluation page.
 * Loaded with <script src="../js/nav.js"></script> and referenced from the
 * inline attributes: onchange="redirigerVersLien(this)"  (chapter <select>)
 * and, on the evaluation pages, onclick="showPage('page1')" (QUIZ buttons).
 */

/* Chapter drop-down: navigates to the selected option (value = target file). */
function redirigerVersLien(select) {
    const lien = select.value;
    if (lien) {
      window.location.href = lien;
    }
  }

/*
 * showPage(id) - legacy helper still present in the inline onclick attributes of
 * the QUIZ buttons of chapitre4/chapitre5 evaluations.html.
 * On the live site this function does not exist, so every click raised
 * "showPage is not defined" in the console (the surrounding <a target="_blank">
 * still opened the quiz, so the visible behaviour was unaffected).
 * Re-implemented here with the behaviour its call sites imply: reveal the
 * element carrying that id if it exists, otherwise do nothing.
 */
function showPage(id) {
    var page = document.getElementById(id);
    if (page) {
      page.style.display = 'block';
    }
  }
function renderIdentity() {
    document.querySelectorAll('[data-site-footer]').forEach(footer => {
        footer.replaceChildren();
        [SITE.auteur, SITE.role, SITE.etablissement].forEach((text, index) => {
            if (index) { const separator = document.createElement('span'); separator.style.color = 'red'; separator.textContent = ' // '; footer.append(separator); }
            footer.append(document.createTextNode(text));
        });
    });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderIdentity);
else renderIdentity();
