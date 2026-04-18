document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE PERFIL DINÁMICO (LO QUE TE FALTABA) ---
    const userDisplayName = document.getElementById('user-display-name');
    const userHandle = document.getElementById('user-handle');
    const userPhotoContainer = document.getElementById('user-photo-container');
    const dropdownEmail = document.getElementById('dropdown-email');
    const dropdownFullName = document.getElementById('dropdown-full-name');

    // Obtenemos los datos de localStorage (Asegúrate que se guarden al iniciar sesión)
    const storedName = localStorage.getItem('userName') || "Niurka Obregon";
    const storedEmail = localStorage.getItem('userEmail') || "obregonsalhuananiurka@gmail.com";

    if (userDisplayName) {
        userDisplayName.textContent = storedName;
    }

    if (dropdownFullName) {
        dropdownFullName.textContent = storedName;
    }

    if (dropdownEmail) {
        dropdownEmail.textContent = storedEmail;
    }

    // Generar el handle @nombre (todo junto y en minúsculas)
    if (userHandle) {
        const handle = "@" + storedName.toLowerCase().replace(/\s+/g, '');
        userHandle.textContent = handle;
    }

    // Generar el círculo con iniciales "NO"
    if (userPhotoContainer) {
        const initials = storedName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        userPhotoContainer.innerHTML = `<span>${initials}</span>`;
    }

    // --- LÓGICA DEL DROPDOWN (MENÚ DESPLEGABLE) ---
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

    // --- FILTROS (SI LOS NECESITAS EN ESTA SECCIÓN) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.benefit-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

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
});


window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error("No se encontró el modal con ID:", modalId);
    }
};

window.openModal = function(modalId, titulo, mensaje, iconoUrl) {
    const modal = document.getElementById(modalId);
    const tituloElement = document.getElementById('modal-dinamico-titulo');
    const textoElement = document.getElementById('modal-dinamico-texto');
    const iconoElement = document.querySelector('.modal-main-icon'); // Buscamos la imagen

    if (modal && tituloElement && textoElement) {
        tituloElement.innerText = titulo;
        textoElement.innerText = mensaje;
        
        // Si pasamos un icono, lo cambiamos; si no, dejamos el por defecto
        if (iconoElement && iconoUrl) {
            iconoElement.src = iconoUrl;
        }
        
        modal.style.display = 'flex';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Diccionario de datos para cada botón
    const configuracionBotones = {
        "Reiniciar mi clave de Corebank": {
            titulo: "¡SEGURIDAD COREBANK!",
            mensaje: "Se ha solicitado el reinicio de tu clave. Recibirás un SMS de confirmación.",
            icono: "https://cdn-icons-png.flaticon.com/512/3208/3208680.png"
        },
        "Recuperar mi correo electrónico": {
            titulo: "¡CORREO DETECTADO!",
            mensaje: "Estamos validando tu identidad para mostrarte tu cuenta institucional.",
            icono: "https://cdn-icons-png.flaticon.com/512/3208/3208665.png"
        },
        "Simuladores de Créditos": {
            titulo: "¡SIMULADOR ACTIVO!",
            mensaje: "Cargando el módulo de cálculos financieros personalizados...",
            icono: "https://cdn-icons-png.flaticon.com/512/3208/3208689.png"
        },
        "Reportar falla de equipo": {
            titulo: "¡REPORTE TÉCNICO!",
            mensaje: "Tu solicitud ha sido enviada al área de soporte de hardware.",
            icono: "https://cdn-icons-png.flaticon.com/512/3208/3208750.png"
        },
        "Ingresar un ticket": {
            titulo: "¡TICKET ABIERTO!",
            mensaje: "Redirigiendo al formulario de ingreso de requerimientos...",
            icono: "https://cdn-icons-png.flaticon.com/512/3208/3208722.png"
        }
    };

    // 2. Eventos para los botones de autogestión
    document.querySelectorAll('.btn-action-outline').forEach(boton => {
        boton.addEventListener('click', function() {
            const nombreBoton = this.innerText.trim();
            const data = configuracionBotones[nombreBoton];

            if (data) {
                // Usamos los datos del diccionario
                openModal('modal-solicitud', data.titulo, data.mensaje, data.icono);
            } else {
                // Fallback por si el texto no coincide exactamente
                openModal('modal-solicitud', '¡SOLICITUD INICIADA!', `Procesando: ${nombreBoton}`, "https://cdn-icons-png.flaticon.com/512/3208/3208680.png");
            }
        });
    });

    // 3. Evento para el botón de llamar
    const btnLlamar = document.querySelector('.btn-primary-blue');
    if (btnLlamar) {
        btnLlamar.addEventListener('click', () => {
            openModal(
                'modal-solicitud', 
                ' LLAMANDO...', 
                'Conectando con un asesor en menos de 30 segundos.',
                'https://cdn-icons-png.flaticon.com/512/3208/3208775.png' // Icono de teléfono
            );
        });
    }
});