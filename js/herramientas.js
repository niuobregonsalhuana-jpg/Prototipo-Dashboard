document.addEventListener('DOMContentLoaded', () => {
    // 1. RECUPERAR DATOS DEL LOCALSTORAGE
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    const correoGuardado = localStorage.getItem('correoUsuario');

    if (nombreGuardado) {
    
        const profileName = document.getElementById('user-display-name');
        const profileHandle = document.getElementById('user-handle');
        const profileImg = document.getElementById('user-photo');

        if (profileName) profileName.innerText = nombreGuardado;
        
        if (profileHandle && correoGuardado) {
            const handle = correoGuardado.split('@')[0];
            profileHandle.innerText = `@${handle}`;
        }
        
        if (profileImg) {
            profileImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nombreGuardado)}&background=00c1ff&color=fff`;
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

    if (profileBlock && dropdown) {
        profileBlock.addEventListener('click', (e) => {
            e.stopPropagation(); 
            dropdown.classList.toggle('show');
        });

        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    document.addEventListener('click', () => {
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    });

    //  BOTÓN DE CERRAR SESIÓN
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
});