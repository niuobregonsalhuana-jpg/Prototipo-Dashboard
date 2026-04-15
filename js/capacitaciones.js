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