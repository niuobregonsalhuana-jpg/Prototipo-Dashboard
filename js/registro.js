import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8YLxPnnCUI43fb5dW_Z2Xq-y98xTfA40",
  authDomain: "onboarding-caja-los-andes.firebaseapp.com",
  projectId: "onboarding-caja-los-andes",
  storageBucket: "onboarding-caja-los-andes.firebasestorage.app",
  messagingSenderId: "164557285830",
  appId: "1:164557285830:web:2e1571f229819cc9842ac7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const dni = document.getElementById("dni").value;
    const sede = document.getElementById("sede").value;
    const password = dni; 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const user = userCredential.user;

      await addDoc(collection(db, "colaboradores"), {
        uid: user.uid, 
        nombreCompleto: nombre,
        correo: correo,
        dni: dni,
        sede: sede,
        fecha: new Date(),
      });

      finalizarIngreso(nombre, correo);

    } catch (error) {
      // 
      if (error.code === 'auth/email-already-in-use') {
        try {
          await signInWithEmailAndPassword(auth, correo, password);
          finalizarIngreso(nombre, correo);
        } catch (loginError) {
          console.error("Error de login:", loginError);
          alert("Error al ingresar: Verifique que su DNI sea el correcto.");
        }
      } else {
        console.error("Error de registro:", error);
        alert("Error: " + error.message);
      }
    }
  });

  function finalizarIngreso(nombre, correo) {
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("correoUsuario", correo);
    window.location.href = "dashboard.html";
  }
});