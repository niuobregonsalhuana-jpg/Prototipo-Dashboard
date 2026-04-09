document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("btn-guardar");
  const pasos = document.querySelectorAll(".stepper-item");
  const listaUl = document.getElementById("task-list");
  const tituloH4 = document.getElementById("task-title");

  const contenidoSemanas = {
    1: {
      titulo: "Inducción y Cultura",
      tareas: [
        "Ver video de bienvenida del CEO",
        "Leer manual de valores",
        "Completar registro de usuario",
      ],
    },
    2: {
      titulo: "Herramientas Digitales",
      tareas: [
        "Configurar acceso al CRM",
        "Tutorial de créditos rápidos",
        "Registro de prueba en sistema",
      ],
    },
    3: {
      titulo: "Atención al Cliente",
      tareas: [
        "Simulación de llamada de servicio",
        "Guía de resolución de dudas",
        "Test de protocolo de atención",
      ],
    },
    4: {
      titulo: "Cierre de Metas",
      tareas: [
        "Revisión de KPI logrados",
        "Entrevista con mentor",
        "Plan de trabajo para el próximo mes",
      ],
    },
  };

  function renderizarTareas(num) {
    const data = contenidoSemanas[num];
    if (!data) return;
    tituloH4.innerText = `Tareas de la Semana ${num}: ${data.titulo}`;
    listaUl.innerHTML = "";
    data.tareas.forEach((texto, i) => {
      listaUl.innerHTML += `
                <li class="list-group-item d-flex align-items-center">
                    <input class="form-check-input me-3" type="checkbox" id="check_${num}_${i}">
                    <label class="form-check-label" for="check_${num}_${i}">${texto}</label>
                </li>
            `;
    });
  }

  renderizarTareas(2);

  pasos.forEach((paso, index) => {
    paso.addEventListener("click", () => {
      const num = index + 1;
      if (
        paso.classList.contains("active") ||
        paso.classList.contains("completed")
      ) {
        pasos.forEach((p) => p.classList.remove("active"));
        paso.classList.add("active");
        renderizarTareas(num);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  // BOTÓN GUARDAR CORREGIDO
  btnGuardar.addEventListener("click", () => {
    const checks = document.querySelectorAll(".form-check-input");
    const algunoHecho = Array.from(checks).some((c) => c.checked);

    if (algunoHecho) {
      const pasosArray = Array.from(pasos);
      const actual =
        document.querySelector(".stepper-item.active") ||
        pasosArray[pasosArray.length - 1];
      const indexActual = pasosArray.indexOf(actual);
      const siguiente = pasosArray[indexActual + 1];

      if (siguiente && actual.classList.contains("active")) {
        actual.classList.remove("active");
        actual.classList.add("completed");
        actual.querySelector(".step-counter").innerHTML =
          '<i class="fas fa-check"></i>';

        siguiente.classList.add("active");
        renderizarTareas(indexActual + 2);
      } else {
        const modalFinalElement = document.getElementById("modalFinal");
        const modalFinal = new bootstrap.Modal(modalFinalElement);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00c1ff", "#ff007c", "#fed001"],
        });
        modalFinal.show();

        actual.classList.remove("active");
        actual.classList.add("completed");
        actual.querySelector(".step-counter").innerHTML =
          '<i class="fas fa-check"></i>';
      }
    } else {
      alert("Marca al menos una tarea para continuar.");
    }
  });
});

const track = document.getElementById("cardsTrack");
const pages = document.querySelectorAll(".page-num");
const next = document.getElementById("nextCard");
const prev = document.getElementById("prevCard");

let currentIdx = 0;

function updateView(index) {
  currentIdx = index;

  track.style.transform = `translateX(-${currentIdx * 100}%)`;

  pages.forEach((p) => p.classList.remove("active"));
  pages[currentIdx].classList.add("active");
}

pages.forEach((page, i) => {
  page.addEventListener("click", () => {
    updateView(i);
  });
});

if (next && prev) {
  next.addEventListener("click", () => {
    if (currentIdx < pages.length - 1) updateView(currentIdx + 1);
  });

  prev.addEventListener("click", () => {
    if (currentIdx > 0) updateView(currentIdx - 1);
  });
}

const videoTrack = document.getElementById("videoTrack");
const videoPages = document.querySelectorAll(".page-num-video");
const nextVid = document.getElementById("nextVideo");
const prevVid = document.getElementById("prevVideo");

let videoIdx = 0;

function updateVideoView(index) {
  videoIdx = index;
  videoTrack.style.transform = `translateX(-${videoIdx * 100}%)`;
  videoPages.forEach((p) => p.classList.remove("active"));
  videoPages[videoIdx].classList.add("active");
}

videoPages.forEach((page, i) => {
  page.addEventListener("click", () => {
    updateVideoView(i);
  });
});

if (nextVid && prevVid) {
  nextVid.addEventListener("click", () => {
    if (videoIdx < videoPages.length - 1) {
      updateVideoView(videoIdx + 1);
    }
  });

  prevVid.addEventListener("click", () => {
    if (videoIdx > 0) {
      updateVideoView(videoIdx - 1);
    }
  });
}

document
  .querySelector(".btn-enviar-feedback")
  .addEventListener("click", function (e) {
    e.preventDefault(); 
    console.log("Feedback enviado correctamente");
    const campos = document.querySelectorAll(".form-control");
    campos.forEach((campo) => (campo.value = ""));
    const modalElement = document.getElementById("feedbackModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    alert("¡Gracias! Tu voz nos ayuda a mejorar.");
  });

if (siguiente && actual.classList.contains("active")) {

} else {
  const modalElement = document.getElementById("modalFinal");
  const modalFinal = new bootstrap.Modal(modalElement);
  modalFinal.show();

  setTimeout(() => {
    const kitSection = document.getElementById("herramientas");
    if (kitSection) {
      kitSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 1500);

  actual.classList.remove("active");
  actual.classList.add("completed");
  actual.querySelector(".step-counter").innerHTML =
    '<i class="fas fa-check"></i>';
} 

function irAlKit() {
  const modalElement = document.getElementById("modalFinal");
  const modalInstancia = bootstrap.Modal.getInstance(modalElement);

  if (modalInstancia) {
    modalInstancia.hide();
  }

  setTimeout(() => {
    const destino = document.getElementById("herramientas");

    if (destino) {
      const offset = 80;
      const posicion =
        destino.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: posicion,
        behavior: "smooth",
      });
    } else {
      console.error(
        "Error: La sección con ID 'herramientas' no existe en el HTML.",
      );
    }
  }, 400);
}
