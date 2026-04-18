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

// --- LÓGICA DE VIDEOS E INTERACTIVIDAD ---
const capacitacionVideos = {
    "1-1": "https://www.youtube.com/embed/wdkPOiEkW1Y", 
    "1-2": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "1-3": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "1-4": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "2-1": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "2-2": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "2-3": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "2-4": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "3-1": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "3-2": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "3-3": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "3-4": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "4-1": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "4-2": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "4-3": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "4-4": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "5-1": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "5-2": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "5-3": "https://www.youtube.com/embed/wdkPOiEkW1Y",
    "5-4": "https://www.youtube.com/embed/wdkPOiEkW1Y",


};

function verPDF(ruta, semana, tarea) {

    semanaActual = semana; 
    tareaActual = tarea; 

    const modalVideo = document.getElementById('videoModal');
    const contenedor = document.querySelector('.iframe-wrapper');

    if (modalVideo && contenedor) {

        contenedor.innerHTML = `<embed src="${ruta}#view=FitH" type="application/pdf" width="100%" height="100%" />`;
        modalVideo.style.display = 'flex'; 
    }
}

let semanaActual = null;
let tareaActual = null;

function verVideo(semana, tarea) {
    semanaActual = semana;
    tareaActual = tarea;
    
    const videoKey = `${semana}-${tarea}`;
    const url = capacitacionVideos[videoKey];

    if (url) {
        const player = document.getElementById('youtubePlayer');
        const modalVideo = document.getElementById('videoModal');
        const contenedor = document.querySelector('.iframe-wrapper');

        if (player) {
            player.src = url + "?autoplay=1"; 
        } else if (contenedor) {
            
            contenedor.innerHTML = `<iframe id="youtubePlayer" src="${url}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        }
        
        modalVideo.style.display = 'flex'; 
    }
}

function cerrarVideo() {
    const modalVideo = document.getElementById('videoModal');
    const player = document.getElementById('youtubePlayer');
    const contenedor = document.querySelector('.iframe-wrapper');
    
    if (modalVideo) modalVideo.style.display = 'none';
    
    if (player) {
        player.src = ""; 
    }
    
    if (contenedor && !player) {
        contenedor.innerHTML = "";
    }

    if (semanaActual == 5 && tareaActual == 5) {
        localStorage.setItem('acabaDeTerminarTodo', 'true'); 

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 150);
    } else {

        registrarProgreso(semanaActual, tareaActual);
    }
}

function registrarProgreso(semana, tarea) {
    try {
        let progreso = JSON.parse(localStorage.getItem('progresoSemanas')) || {
            1: { tareas: [] }, 2: { tareas: [] }, 3: { tareas: [] }, 4: { tareas: [] }, 5: { tareas: [] }
        };

        if (!progreso[semana]) progreso[semana] = { tareas: [] };

        const tareasSemana = progreso[semana].tareas;
        const modalExito = document.getElementById('custom-modal'); 
        const message = document.getElementById('modal-message');


        if (message) {
            message.style.fontSize = "18px"; 
            message.style.fontFamily = "'Montserrat', sans-serif";
            message.style.color = "#555";
            message.style.lineHeight = "1.6";
        }

        if (!tareasSemana.includes(tarea)) {
            tareasSemana.push(tarea);
            localStorage.setItem('progresoSemanas', JSON.stringify(progreso));

            if (modalExito && message) {

                message.innerHTML = `¡Excelente! Has ganado puntos por completar la <br> 
                <span style="color: #00c1ff; font-weight: 800; font-size: 20px;">Semana ${semana} - Lección ${tarea}</span>.`;
                modalExito.style.display = 'flex';
                lanzarConfeti();
            }
        } else {
            if (modalExito && message) {
                message.innerHTML = `¡Ya habías visto esta cápsula!<br> 
                <span style="color: #00c1ff; font-weight: 800; font-size: 20px;">Semana ${semana} - Lección ${tarea}</span>.`;
                modalExito.style.display = 'flex';
                lanzarConfeti();
            }
        }
        
        if (modalExito) {
            const btnCerrar = document.getElementById('close-modal');
            if (btnCerrar) {

                btnCerrar.style.fontSize = "16px";
                btnCerrar.style.fontWeight = "800";
                btnCerrar.onclick = () => { 
                    modalExito.style.display = 'none'; 
                };
            }
        }

    } catch (error) {
        console.error("Error al procesar el registro:", error);
    }
}

function lanzarConfeti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffc107', '#58cc02', '#e91e63', '#00aeef'],
        zIndex: 10001 
    });
}

