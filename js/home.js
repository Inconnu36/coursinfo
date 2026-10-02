const buttons = document.querySelectorAll('.accordion-button');
buttons.forEach((button, index) => {
    const content = button.nextElementSibling;
    content.id = 'chapitre-accueil-' + (index + 1);
    button.setAttribute('aria-controls', content.id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
        const isOpen = content.style.display === 'block';
        buttons.forEach(other => {
            other.nextElementSibling.style.display = 'none';
            other.setAttribute('aria-expanded', 'false');
        });
        content.style.display = isOpen ? 'none' : 'block';
        button.setAttribute('aria-expanded', String(!isOpen));
    });
});
