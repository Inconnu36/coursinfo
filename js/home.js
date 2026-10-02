const buttons = document.querySelectorAll('.accordion-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isOpen = content.style.display === 'block';

            document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');

            content.style.display = isOpen ? 'none' : 'block';
        });
    });
