import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8YLxPnnCUI43fb5dW_Z2Xq-y98xTfA40",
  authDomain: "onboarding-caja-los-andes.firebaseapp.com",
  projectId: "onboarding-caja-los-andes",
  storageBucket: "onboarding-caja-los-andes.firebasestorage.app",
  messagingSenderId: "164557285830",
  appId: "1:164557285830:web:2e1571f229819cc9842ac7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 5. Escuchar cuando se envía el formulario
document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que tu <form> en el HTML tenga id="registrationForm"
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Obtenemos los valores de tus cuadros de texto
        const nombre = document.querySelector('input[placeholder="Ej. Juan Pérez"]').value;
        const correo = document.querySelector('input[placeholder="usuario@cajalosandes.pe"]').value;
        const dni = document.querySelector('input[placeholder="8 dígitos"]').value;
        const sede = document.querySelector('select').value;

        try {
            // 6. Guardar en la colección "colaboradores"
            await addDoc(collection(db, "colaboradores"), {
                nombreCompleto: nombre,
                correo: correo,
                dni: dni,
                sede: sede,
                fecha: new Date()
            });

            // GUARDAR EL NOMBRE PARA EL DASHBOARD
localStorage.setItem('nombreUsuario', nombre);
localStorage.setItem('correoUsuario', correo);

            alert("¡Registro exitoso en Firebase! Bienvenido.");
            
            // Redirigir a tu página de inicio
            window.location.href = "dashboard.html";

        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Hubo un fallo al conectar con la base de datos.");
        }
    });
});