function toggleTasks(cardId) {
    const card = document.getElementById(cardId);
    const btn = card.querySelector('.btn-enter');
    
    card.classList.toggle('expanded');
    
    if (card.classList.contains('expanded')) {
        btn.innerText = "CERRAR TAREAS";
    } else {
        btn.innerText = "CONTINUAR";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const progreso = JSON.parse(localStorage.getItem('progresoSemanas')) || {}; 

    for (let i = 1; i <= 5; i++) {
        const tarjeta = document.querySelector(`.course-card[data-week="${i}"]`);
        
        if (tarjeta) {
            
            if (progreso[i]) {
                const tareasCompletadas = progreso[i].tareas.length;
                const porcentaje = Math.min((tareasCompletadas / 5) * 100, 100);

                const barra = tarjeta.querySelector('.progress-bar-fill');
                if (barra) barra.style.width = porcentaje + '%';

                const textoProgreso = tarjeta.querySelector('.course-progress span');
                if (textoProgreso) textoProgreso.innerText = Math.round(porcentaje) + '%';
            }

            
            if (i > 1) {
                
                const tareasSemanaAnterior = progreso[i-1] ? progreso[i-1].tareas.length : 0;
                
                
                if (tareasSemanaAnterior === 5) {
                    tarjeta.classList.remove('locked');
                    const candado = tarjeta.querySelector('.lock-overlay');
                    if (candado) candado.style.display = 'none';
                } else {
                    
                    tarjeta.classList.add('locked');
                    const candado = tarjeta.querySelector('.lock-overlay');
                    if (candado) candado.style.display = 'flex';
                }
            }
        }
    }
});