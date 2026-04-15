import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "onboarding-caja-los-andes.firebaseapp.com",
    projectId: "onboarding-caja-los-andes",
    storageBucket: "onboarding-caja-los-andes.appspot.com",
    messagingSenderId: "TU_ID",
    appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function abrirFeedback(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById("feedbackModal");
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

function cerrarModal() {
    const modal = document.getElementById("feedbackModal");
    const formulario = document.getElementById("formFeedback");

    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
    
    if (formulario) {
        formulario.reset(); 
        console.log("Formulario limpiado.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("btn-feedback");
    const span = document.querySelector(".close-modal");
    const modal = document.getElementById("feedbackModal");

    if (btn) btn.onclick = abrirFeedback;

    if (span) span.onclick = cerrarModal;

    window.onclick = function(event) {
        if (event.target == modal) {
            cerrarModal();
        }
    };
});

// --- ENVÍO A FIREBASE ---
const formFeedback = document.getElementById("formFeedback");
if (formFeedback) {
    formFeedback.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const boton = e.target.querySelector('button');
        boton.innerText = "ENVIANDO...";
        boton.disabled = true;

        try {
            await addDoc(collection(db, "feedback"), {
                semana: document.getElementById("semana").value,
                estado: document.getElementById("estado").value,
                desafio: document.getElementById("desafio").value,
                ayuda: document.getElementById("ayuda").value,
                comentarios: document.getElementById("comentarios").value,
                timestamp: new Date()
            });

            alert("¡Feedback enviado con éxito!");
            cerrarModal(); 

        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No se pudo enviar. Revisa la consola.");
        } finally {
            boton.innerText = "ENVIAR";
            boton.disabled = false;
        }
    });
}