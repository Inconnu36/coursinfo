'use strict';
const searchForm = document.getElementById('form-recherche');
const searchInput = document.getElementById('requete');
const chapterInput = document.getElementById('chapitre-recherche');
const searchResults = document.getElementById('resultats');
const searchCount = document.getElementById('nombre-resultats');
function normaliseSearch(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }
function runSearch() {
    const tokens = normaliseSearch(searchInput.value).trim().split(/\s+/).filter(Boolean);
    const hits = window.COURSE_SEARCH_INDEX.filter(page => {
        if (chapterInput.value && page.chapter !== chapterInput.value) return false;
        const text = normaliseSearch(page.title+' '+page.body+' '+page.keywords.join(' '));
        return tokens.every(token => text.includes(token));
    });
    searchResults.replaceChildren();
    searchCount.textContent = hits.length+' résultat'+(hits.length>1?'s':'');
    for (const page of hits) {
        const item=document.createElement('li');const link=document.createElement('a');
        link.href=page.url;link.textContent=page.title;
        const excerpt=document.createElement('p');excerpt.textContent=page.body.slice(0,220)+(page.body.length>220?'…':'');
        item.append(link,excerpt);searchResults.append(item);
    }
}
searchInput.value = new URLSearchParams(window.location.search).get('q') || '';
searchForm.addEventListener('submit', event => { event.preventDefault(); runSearch(); });
searchInput.addEventListener('input', runSearch);
chapterInput.addEventListener('change', runSearch);
runSearch();
