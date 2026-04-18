document.addEventListener('DOMContentLoaded', () => {
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    const correoGuardado = localStorage.getItem('correoUsuario');

    if (!localStorage.getItem('progresoSemanas')) {
        const estadoInicial = {
            1: { tareas: [], unlocked: true }, 
            2: { tareas: [], unlocked: false },
            3: { tareas: [], unlocked: false },
            4: { tareas: [], unlocked: false },
            5: { tareas: [], unlocked: false }
        };
        localStorage.setItem('progresoSemanas', JSON.stringify(estadoInicial));
    }

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
        return; 
    }

 
    function actualizarInterfazProgreso() {
        const progreso = JSON.parse(localStorage.getItem('progresoSemanas'));
        let totalTareasCompletadas = 0;

        for (let i = 1; i <= 5; i++) {
            const datosSemana = progreso[i];
            const completadas = datosSemana.tareas.length;
            totalTareasCompletadas += completadas;

           
            const weekItem = document.querySelector(`.week-item[data-week="${i}"]`) || document.querySelectorAll('.week-item')[i-1];
            
            if (weekItem) {
               
                const barra = weekItem.querySelector('.progress-bar-fill');
                if (barra) barra.style.width = `${(completadas / 5) * 100}%`;

                const stats = weekItem.querySelector('.week-stats');
                if (stats) stats.innerText = `${completadas}/5`;


                if (i > 1 && progreso[i-1].tareas.length === 5) {
                    weekItem.classList.remove('locked');
                    const icon = weekItem.querySelector('.week-icon');
                    if (icon) icon.innerText = i; 
                }
            }
        }

        const puntosActuales = totalTareasCompletadas * 5;
        

        const metaPuntos = document.querySelector('.goal-item:nth-child(1)');
        if (metaPuntos) {
            metaPuntos.querySelector('.progress-bar-fill').style.width = `${(puntosActuales/125)*100}%`;
            metaPuntos.querySelector('.week-stats').innerText = `${puntosActuales}/125`;
        }


        const metaActividades = document.querySelector('.goal-item:nth-child(2)');
        if (metaActividades) {
            metaActividades.querySelector('.progress-bar-fill').style.width = `${(totalTareasCompletadas/25)*100}%`;
            metaActividades.querySelector('.week-stats').innerText = `${totalTareasCompletadas}/25`;
        }
    }


    actualizarInterfazProgreso();


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

function actualizarMetaTiempo() {

    const progresoSemanas = JSON.parse(localStorage.getItem('progresoSemanas')) || {};
    let totalTareasCompletadas = 0;


    for (let i = 1; i <= 5; i++) {
        if (progresoSemanas[i] && progresoSemanas[i].tareas) {
            totalTareasCompletadas += progresoSemanas[i].tareas.length;
        }
    }


    const minutosTotales = totalTareasCompletadas * 6; 
    const metaMinutos = 150;
    const porcentaje = (minutosTotales / metaMinutos) * 100;


    const statsTexto = document.getElementById('tiempo-stats');
    const barraFill = document.getElementById('tiempo-bar');

    if (statsTexto) statsTexto.textContent = `${minutosTotales}/${metaMinutos}m`;
    if (barraFill) barraFill.style.width = `${porcentaje}%`;
}

document.addEventListener('DOMContentLoaded', actualizarMetaTiempo);

const bienestarPorSemana = {
    1: { frase: "La integridad es hacer lo correcto aunque nadie mire.", dato: "¿Sabías que prevenir el lavado de activos protege la economía del país?" },
    2: { frase: "Un riesgo gestionado es una oportunidad aprovechada.", dato: "¿Sabías que tomar un descanso de 5 min cada hora mejora tu retención?" },
    3: { frase: "Tu contraseña es la primera línea de defensa de nuestros clientes.", dato: "El 90% de los incidentes de ciberseguridad se evitan con prevención." },
    4: { frase: "La resiliencia no es solo resistir, es evolucionar tras la crisis.", dato: "Empresas con planes de respuesta se recuperan 3 veces más rápido." },
    5: { frase: "La privacidad no es un lujo, es un derecho de todos.", dato: "Proteger los datos personales fortalece la confianza de nuestros socios." }
};

function actualizarBienestar() {
    console.log("Cargando bienestar...");
    const progreso = JSON.parse(localStorage.getItem('progresoSemanas')) || {};
    
    let semanaActual = 1;
    for (let i = 1; i <= 5; i++) {
        semanaActual = i;
        const tareas = progreso[i]?.tareas || [];
        if (tareas.length < 5) break;
    }

    const sentimientoGuardado = localStorage.getItem(`voto_semana_${semanaActual}`);
    const indiceGuardado = localStorage.getItem(`voto_indice_${semanaActual}`);
    const contenedorMensaje = document.getElementById('mensaje-bienestar');
    const emojis = document.querySelectorAll('.emoji-btn');

    if (sentimientoGuardado && indiceGuardado !== null) {
        contenedorMensaje.innerText = sentimientoGuardado;
        contenedorMensaje.style.display = 'block';
        
        emojis.forEach((e, index) => {
            e.style.cursor = 'default';
            if (index == indiceGuardado) {
                e.style.opacity = '1';
                e.style.transform = 'scale(1.3)';
                e.style.filter = 'drop-shadow(0 0 5px #00aae4)';
            } else {
                e.style.opacity = '0.3';
                e.style.transform = 'scale(1)';
            }
        });
    }

    const contenido = bienestarPorSemana[semanaActual];
    if (contenido) {
        document.getElementById('frase-texto').textContent = `"${contenido.frase}"`;
        document.getElementById('dato-texto').textContent = contenido.dato;
    }
}

window.registrarSentimiento = function(texto, indice) {
    console.log("Registrando:", texto, "Índice:", indice);
    
    const progreso = JSON.parse(localStorage.getItem('progresoSemanas')) || {};
    let semanaActual = 1;
    for (let i = 1; i <= 5; i++) {
        semanaActual = i;
        if ((progreso[i]?.tareas || []).length < 5) break;
    }

    if (localStorage.getItem(`voto_semana_${semanaActual}`)) {
        console.log("Ya se votó esta semana.");
        return;
    }

    const contenedorMensaje = document.getElementById('mensaje-bienestar');
    if (contenedorMensaje) {
        contenedorMensaje.innerText = texto;
        contenedorMensaje.style.display = 'block';

        localStorage.setItem(`voto_semana_${semanaActual}`, texto);
        localStorage.setItem(`voto_indice_${semanaActual}`, indice);

        const emojis = document.querySelectorAll('.emoji-btn');
        emojis.forEach((e, i) => {
            e.style.cursor = 'default';
            if (i === indice) {
                e.style.opacity = '1';
                e.style.transform = 'scale(1.3)';
                e.style.filter = 'drop-shadow(0 0 5px #00aae4)';
            } else {
                e.style.opacity = '0.3';
                e.style.transform = 'scale(1)';
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', actualizarBienestar);

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(verificarGranFinal, 1000); 

function verificarGranFinal() {

    const progreso = JSON.parse(localStorage.getItem('progresoSemanas')) || {};
    let totalTareasCompletadas = 0;

    for (let i = 1; i <= 5; i++) {
        if (progreso[i] && progreso[i].tareas) {
            totalTareasCompletadas += progreso[i].tareas.length;
        }
    }

    const acabaDeTerminar = localStorage.getItem('acabaDeTerminarTodo');
    const yaVioElFinal = localStorage.getItem('finalMostradoPermanente');

    console.log("Tareas:", totalTareasCompletadas, "Señal:", acabaDeTerminar);

    if (totalTareasCompletadas >= 25 && acabaDeTerminar === 'true' && !yaVioElFinal) {
        const finalModal = document.getElementById('final-modal');
        if (finalModal) {
            finalModal.style.display = 'flex';

            if (typeof lanzarConfeti === 'function') lanzarConfeti();

            document.getElementById('btn-revisar').onclick = () => {
                finalModal.style.display = 'none';

                localStorage.removeItem('acabaDeTerminarTodo'); 
                localStorage.setItem('finalMostradoPermanente', 'true'); 
            };
        }
    }

    }
});