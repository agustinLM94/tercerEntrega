let puntosUsuario = 0;
let puntosPC = 0;

let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPC = document.querySelector("#eleccion-computadora");

let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach(boton => {
    boton.addEventListener("click", iniciarTurno);
});

const armas = [
    { nombre: 'piedra🪨', venceA: ['tijera✂️'] },
    { nombre: 'papel📋', venceA: ['piedra🪨'] },
    { nombre: 'tijera✂️', venceA: ['papel📋'] }
];

async function obtenerEleccionPC() {
    const url = 'https://rock-paper-scissor2.p.rapidapi.com/api/rock';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '560be7c699msh23d9a157833bd2ep150bd0jsnea69ed09db9a',
            'X-RapidAPI-Host': 'rock-paper-scissor2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Error al obtener la elección del oponente');
        }
        const result = await response.json();
        return result.choice;
    } catch (error) {
        console.error(error);
         
        return armas[Math.floor(Math.random() * armas.length)].nombre;
    }
}

async function iniciarTurno(e) {
    let eleccionUsuario = e.currentTarget.id;

    let eleccionPC = await obtenerEleccionPC();

    let eleccionUsuarioObj = armas.find(arma => arma.nombre === eleccionUsuario);

    contenedorEleccionUsuario.innerText = eleccionUsuarioObj.nombre;
    contenedorEleccionPC.innerText = eleccionPC;

    mensaje.innerText = ""; 

    if (
        (eleccionUsuario === "piedra🪨" && eleccionPC === "tijera✂️") ||
        (eleccionUsuario === "tijera✂️" && eleccionPC === "papel📋") ||
        (eleccionUsuario === "papel📋" && eleccionPC === "piedra🪨")
    ) {
        ganaUsuario();
    } else if (
        (eleccionPC === "piedra🪨" && eleccionUsuario === "tijera✂️") ||
        (eleccionPC === "tijera✂️" && eleccionUsuario === "papel📋") ||
        (eleccionPC === "papel📋" && eleccionUsuario === "piedra🪨")
    ) {
        ganaPC();
    } else {
        empate();
    }

    if (puntosUsuario === 5 || puntosPC === 5) {
        detenerJuego();
    }
}

function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    mensaje.innerText = "¡Ganaste un punto! 🔥";
    Swal.fire("¡Has ganado un punto!");
}

function ganaPC() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    mensaje.innerText = "¡La computadora ganó un punto! 😭";
    Swal.fire("La computadora ha ganado un punto.");
}

function empate() {
    mensaje.innerText = "¡Empate! 😱";
    Swal.fire("Empate!")
}

function detenerJuego() {
    if (puntosUsuario === 5) {
        instrucciones.innerText = "🔥 ¡Ganaste el juego! 🔥";
        Swal.fire("¡Felicidades!", "Has ganado el juego.");
    } else {
        instrucciones.innerText = "😭 ¡La computadora ganó el juego! 😭";
        Swal.fire("¡Lo siento!", "La computadora ha ganado el juego.");
    }

    botonesArmas.forEach(boton => {
        boton.disabled = true;
    });

    document.getElementById("reiniciar").classList.remove("disabled");
}

document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
    puntosUsuario = 0;
    puntosPC = 0;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;
    instrucciones.innerText = "El primero en llegar a 5 puntos gana.";

    botonesArmas.forEach(boton => {
        boton.disabled = false;
    });

    document.getElementById("reiniciar").classList.add("disabled");
}

const botonColorMode = document.querySelector("#color-mode");
const body = document.body;

let darkMode = localStorage.getItem("dark-mode");

function activarDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "activado");
}

function desactivarDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "desactivado");
}

if (darkMode === "activado") {
    activarDarkMode();
} else {
    desactivarDarkMode();
}

botonColorMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");

    if (darkMode === "activado") {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
});




