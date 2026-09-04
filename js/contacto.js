function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function iniciarFormularioContacto() {
    const formulario = document.querySelector(".formulario-contacto");
    if (!formulario) {
        return;
    }

    const campoNombre = document.getElementById("nombre");
    const campoEmail = document.getElementById("email");
    const campoMensaje = document.getElementById("mensaje");
    const mensajeExito = document.getElementById("mensaje-exito");
    const mensajeError = document.getElementById("mensaje-error");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        mensajeExito.hidden = true;
        mensajeError.hidden = true;

        const errores = [];

        if (campoNombre.value.trim().length < 2) {
            errores.push("Ingresá un nombre de al menos 2 caracteres.");
        }
        if (!validarEmail(campoEmail.value.trim())) {
            errores.push("Ingresá un email válido.");
        }
        if (campoMensaje.value.trim().length < 10) {
            errores.push("El mensaje debe tener al menos 10 caracteres.");
        }

        if (errores.length > 0) {
            mensajeError.textContent = errores.join(" ");
            mensajeError.hidden = false;
            return;
        }

        formulario.reset();
        mensajeExito.hidden = false;
    });
}

document.addEventListener("DOMContentLoaded", iniciarFormularioContacto);
