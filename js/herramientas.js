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

function verPDF(ruta) {
    console.log("Intentando abrir:", ruta); 
    
    const modal = document.getElementById('videoModal');
    const contenedor = document.querySelector('.iframe-wrapper');

    if (modal && contenedor) {
   
        contenedor.innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
        modal.style.display = 'flex';
    } else {
        alert("Error técnico: Falta el div 'videoModal' o 'iframe-wrapper' en el HTML.");
    }
}

function cerrarVideo() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.style.display = 'none';
        document.querySelector('.iframe-wrapper').innerHTML = ''; 
    }
}

function cerrarVideo() {
    const modalPDF = document.getElementById('videoModal');
    const celebration = document.getElementById('celebration-screen');
    const contenedor = document.querySelector('.iframe-wrapper');

    if (modalPDF) {
        modalPDF.style.display = 'none'; 
        if (contenedor) contenedor.innerHTML = ''; 
        
        
        if (celebration) {
            celebration.style.display = 'flex';
            registrarProgresoSilencioso(1, 5); 
        }
    }
}

function cerrarCelebracion() {
    document.getElementById('celebration-screen').style.display = 'none';
}

function verOrganigrama() {
    semanaActual = 5;
    tareaActual = 5;
    verPDF('documentos/MOF.pdf'); 
}