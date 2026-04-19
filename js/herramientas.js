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
    const modalPDF = document.getElementById('videoModal');
    const customModal = document.getElementById('custom-modal'); 
    const contenedor = document.querySelector('.iframe-wrapper');
    const modalMessage = document.getElementById('modal-message');

    if (modalPDF) {
        modalPDF.style.display = 'none'; 
        if (contenedor) contenedor.innerHTML = ''; 
        

        if (customModal) {
            if (modalMessage) {
                modalMessage.innerText = "Has revisado el documento correctamente. ¡Sigue así!";
            }
            customModal.style.display = 'flex';
            

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            if (typeof registrarProgresoSilencioso === "function") {
                registrarProgresoSilencioso(1, 5); 
            }
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

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'close-modal') {
        const customModal = document.getElementById('custom-modal');

        if (customModal) {
            customModal.style.display = 'none';
        }
        
        console.log("Modal cerrado. El usuario permanece en Herramientas.");
    }
});

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'close-modal') {
        const customModal = document.getElementById('custom-modal');

        let progreso = JSON.parse(localStorage.getItem('progresoSemanas')) || {};

        if (progreso[5] && !progreso[5].tareas.includes('tarea_final')) {
            progreso[5].tareas.push('tarea_final');

            localStorage.setItem('acabaDeTerminarTodo', 'true');
        }

        localStorage.setItem('progresoSemanas', JSON.stringify(progreso));

        if (customModal) customModal.style.display = 'none';
        
        console.log("¡Tarea 5 registrada en el sistema global!");
    }
});