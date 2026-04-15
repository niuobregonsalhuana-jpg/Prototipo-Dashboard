document.addEventListener('DOMContentLoaded', () => {
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    const correoGuardado = localStorage.getItem('correoUsuario');

    if (nombreGuardado) {
        const saludoSpan = document.querySelector('h1 span') || document.querySelector('.welcome-text span');
        if (saludoSpan) saludoSpan.innerText = nombreGuardado;

        const profileName = document.getElementById('user-display-name');
        const profileHandle = document.getElementById('user-handle');
        
        const profileImgContainer = document.getElementById('user-photo-container');

        if (profileName) profileName.innerText = nombreGuardado;
        if (profileHandle && correoGuardado) {
            const handle = correoGuardado.split('@')[0];
            profileHandle.innerText = `@${handle}`;
        }

        if (profileImgContainer) {
            const iniciales = nombreGuardado
                .split(' ')
                .map(palabra => palabra[0])
                .join('')
                .toUpperCase()
                .substring(0, 2);
            
            profileImgContainer.innerText = iniciales;
        }

        const dropName = document.getElementById('dropdown-full-name');
        const dropEmail = document.getElementById('dropdown-email');
        
        if (dropName) dropName.innerText = nombreGuardado;
        if (dropEmail) dropEmail.innerText = correoGuardado;

    } else {
        window.location.href = "registro.html";
    }

    const profileBlock = document.getElementById('user-profile-block');
    const dropdown = document.getElementById('profile-dropdown');
    const logoutBtn = document.getElementById('logout-btn'); 

    if (profileBlock) {
        profileBlock.addEventListener('click', (e) => {
            e.stopPropagation(); 
            dropdown.classList.toggle('show');
        });
    }

    document.addEventListener('click', (e) => {
        if (dropdown && dropdown.classList.contains('show') && !dropdown.contains(e.target) && !profileBlock.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    if (dropdown) {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear(); 
            window.location.href = "index.html"; 
        });
    }
});