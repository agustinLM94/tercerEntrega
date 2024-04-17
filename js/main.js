let puntosUsuario = 0;
let puntosPC = 0;

let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let elegiTuArma = document.querySelector("#elegi-tu-arma");

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

function iniciarTurno(e) {
    let debugInfo = document.getElementById("debug-info");
    debugInfo.innerHTML = ""; 

    let eleccionPC = Math.floor(Math.random() * armas.length);
    let eleccionUsuarioObj = armas.find(arma => arma.nombre === e.currentTarget.id);

    
    if (!eleccionUsuarioObj) {
        debugInfo.innerHTML += "Arma inválida seleccionada.<br>";
        return;
    }

    let eleccionUsuario = eleccionUsuarioObj.nombre;
    let eleccionPCObj = armas[eleccionPC];

    debugInfo.innerHTML += "Elección del usuario: " + eleccionUsuario + "<br>";
    debugInfo.innerHTML += "Elección de la computadora: " + eleccionPCObj.nombre + "<br>";

    
    if (
        (eleccionUsuario === "piedra🪨" && eleccionPCObj.nombre === "tijera✂️") ||
        (eleccionUsuario === "tijera✂️" && eleccionPCObj.nombre === "papel📋") ||
        (eleccionUsuario === "papel📋" && eleccionPCObj.nombre === "piedra🪨")
    ) {
        ganaUsuario(); 
    } else if (
        (eleccionPCObj.nombre === "piedra🪨" && eleccionUsuario === "tijera✂️") ||
        (eleccionPCObj.nombre === "tijera✂️" && eleccionUsuario === "papel📋") ||
        (eleccionPCObj.nombre === "papel📋" && eleccionUsuario === "piedra🪨")
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
    contenedorGanaPunto.innerText = "¡Ganaste un punto! 🔥";

    const armasQueVencen = armas.filter(arma => arma.venceA.includes(contenedorEleccionPC.innerText));
    if (armasQueVencen.length > 0) {
        contenedorGanaPunto.innerText += `\nArmas que vencen: ${armasQueVencen.map(arma => arma.nombre).join(', ')}`;
    }
}

function ganaPC() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    contenedorGanaPunto.innerText = "¡La computadora ganó un punto! 😭";

    const armasQueVencen = armas.filter(arma => arma.venceA.includes(contenedorEleccionUsuario.innerText));
    if (armasQueVencen.length > 0) {
        contenedorGanaPunto.innerText += `\nArmas que vencen: ${armasQueVencen.map(arma => arma.nombre).join(', ')}`;
    }
}

function empate() {
    contenedorGanaPunto.innerText = "¡Empate! 😱";
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