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
            const iniciales = nombreGuardado.split(' ').map(p => p[0]).join('').toUpperCase().substring(0, 2);
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

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear(); 
            window.location.href = "index.html"; 
        });
    }
});

function verVideo(semana, tarea) {
    try {

        let progreso = JSON.parse(localStorage.getItem('progresoSemanas')) || {
            1: { tareas: [] }, 2: { tareas: [] }, 3: { tareas: [] }, 4: { tareas: [] }, 5: { tareas: [] }
        };


        if (!progreso[semana]) {
            progreso[semana] = { tareas: [] };
        }

        
        const tareasSemana = progreso[semana].tareas;
        if (!tareasSemana.includes(tarea)) {
            tareasSemana.push(tarea);
            localStorage.setItem('progresoSemanas', JSON.stringify(progreso));
            
            alert(`✅ ¡Lección registrada! Semana ${semana} - Video ${tarea}`);
        } else {
            console.log("Lección ya completada.");
        }

    } catch (error) {
        console.error("Error al registrar video:", error);
        localStorage.removeItem('progresoSemanas');
    }
}