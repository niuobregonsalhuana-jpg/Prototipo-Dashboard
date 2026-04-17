document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.benefit-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');

                filterButtons.forEach(b => {
                    b.classList.remove('active', 'color-salud', 'color-educacion', 'color-finanzas', 'color-vida', 'color-comunidad');
                });

         
                btn.classList.add('active');

         
                if (category !== 'todos') {
                    btn.classList.add(`color-${category}`);
                }

     
                cards.forEach(card => {
                    if (category === 'todos' || card.classList.contains(`cat-${category}`)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }


    const profileBlock = document.getElementById('user-profile-block');
    const dropdown = document.getElementById('profile-dropdown');
    const logoutBtn = document.getElementById('logout-btn');

    if (profileBlock && dropdown) {
        profileBlock.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
    }

    document.addEventListener('click', () => {
        if (dropdown) dropdown.classList.remove('show');
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = "index.html";
        });
    }

    const userDisplayName = document.getElementById('user-display-name');
    const storedName = localStorage.getItem('userName');
    if (userDisplayName && storedName) {
        userDisplayName.textContent = storedName;
    }
});