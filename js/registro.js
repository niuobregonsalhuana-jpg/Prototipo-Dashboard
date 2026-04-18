import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
  const btnToggle = document.getElementById("btn-toggle-auth");
  const authTitle = document.getElementById("auth-title");
  const authSubtitle = document.getElementById("auth-subtitle");
  const btnSubmit = document.getElementById("btn-submit-auth");
  
  
  const groupNombre = document.getElementById("group-nombre");
  const groupSede = document.getElementById("group-sede");
  const groupDni = document.getElementById("group-dni");
  const stepsContainer = document.getElementById("steps-container");

  
  const pasosRegistroHTML = stepsContainer.innerHTML;

  
  btnToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const esModoRegistro = authTitle.innerText === "¡Regístrate ahora!";

    if (esModoRegistro) {
      authTitle.innerText = "¡Bienvenido de nuevo!";
      authSubtitle.innerText = "Ingresa tus credenciales para continuar.";
      btnSubmit.innerText = "INICIAR SESIÓN";
      btnToggle.innerText = "¿No tienes cuenta? Regístrate aquí";
      
      groupNombre.style.display = "none";
      groupSede.style.display = "none";
      groupDni.className = "col-12";

      document.getElementById("nombre").required = false;
      document.getElementById("sede").required = false;

      stepsContainer.innerHTML = `
    <div class="step-row">
        <div class="badge-duo">1</div>
        <div class="text-duo">
            <h3>Identifícate</h3>
            <p>Ingresa con tu correo institucional y tu DNI autorizado.</p>
        </div>
    </div>
    <div class="step-row">
        <div class="badge-duo">2</div>
        <div class="text-duo">
            <h3>Retoma tu ruta</h3>
            <p>Accede directamente al módulo donde te quedaste.</p>
        </div>
    </div>
    <div class="step-row">
        <div class="badge-duo">3</div>
        <div class="text-duo">
            <h3>Mide tu progreso</h3>
            <p>Visualiza cuánto te falta para completar tus metas del mes.</p>
        </div>
    </div>
    <div class="step-row">
        <div class="badge-duo">4</div>
        <div class="text-duo">
            <h3>Soporte</h3>
            <p>Si tienes problemas con tu acceso, contacta a Mesa de Ayuda.</p>
        </div>
    </div>
`;
    } else {
     
      authTitle.innerText = "¡Regístrate ahora!";
      authSubtitle.innerText = "Únete a la nueva generación de asesores.";
      btnSubmit.innerText = "INGRESAR";
      btnToggle.innerText = "¿Ya tienes una cuenta?";
      
      groupNombre.style.display = "block";
      groupSede.style.display = "block";
      groupDni.className = "col-5";

      document.getElementById("nombre").required = true;
      document.getElementById("sede").required = true;
      stepsContainer.innerHTML = pasosRegistroHTML;
    }
  });

 
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value;
    const dni = document.getElementById("dni").value;
    const password = dni; 
    const esModoLogin = authTitle.innerText === "¡Bienvenido de nuevo!";

    try {
      if (esModoLogin) {
       
        const userCredential = await signInWithEmailAndPassword(auth, correo, password);
        
       
        const q = query(collection(db, "colaboradores"), where("uid", "==", userCredential.user.uid));
        const querySnapshot = await getDocs(q);
        let nombreRecuperado = "Usuario";
        querySnapshot.forEach((doc) => { nombreRecuperado = doc.data().nombreCompleto; });

        finalizarIngreso(nombreRecuperado, correo);

      } else {
        
        const nombre = document.getElementById("nombre").value;
        const sede = document.getElementById("sede").value;

        const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
        await addDoc(collection(db, "colaboradores"), {
          uid: userCredential.user.uid, 
          nombreCompleto: nombre,
          correo: correo,
          dni: dni,
          sede: sede,
          fecha: new Date(),
        });

        finalizarIngreso(nombre, correo);
      }
    } catch (error) {
      console.error("Error:", error.code);
      if (error.code === 'auth/invalid-credential') {
        alert("Credenciales incorrectas. Verifique su correo y DNI.");
      } else if (error.code === 'auth/email-already-in-use') {
        alert("Este correo ya está registrado. Por favor, inicie sesión.");
      } else {
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