const CARRITO_STORAGE_KEY = "carritoHermanosJota";

function obtenerCarrito() {
    try {
        const datos = JSON.parse(localStorage.getItem(CARRITO_STORAGE_KEY));
        return Array.isArray(datos) ? datos : [];
    } catch {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function agregarAlCarrito(idProducto) {
    const carrito = obtenerCarrito();
    const item = carrito.find((p) => p.id === idProducto);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ id: idProducto, cantidad: 1 });
    }

    guardarCarrito(carrito);
}

function quitarDelCarrito(idProducto) {
    guardarCarrito(obtenerCarrito().filter((p) => p.id !== idProducto));
}

function vaciarCarrito() {
    guardarCarrito([]);
}

function obtenerCantidadTotalCarrito() {
    return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = obtenerCantidadTotalCarrito();
    }
}

function crearFilaCarrito(producto, cantidad) {
    const fila = document.createElement("article");
    fila.className = "fila-carrito";
    fila.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.alt}">
        <div class="fila-carrito-info">
            <h2>${producto.nombre}</h2>
            <p>Cantidad: ${cantidad}</p>
            <p><strong>Subtotal:</strong> ${formatearPrecio(producto.precio * cantidad)}</p>
        </div>
        <button class="boton boton-quitar" type="button" data-id="${producto.id}">Quitar</button>
    `;
    return fila;
}

function renderizarPaginaCarrito() {
    const contenedor = document.getElementById("contenido-carrito");
    if (!contenedor) {
        return;
    }

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="sin-resultados">Tu carrito está vacío.</p>';
        return;
    }

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach((item) => {
        const producto = PRODUCTOS.find((p) => p.id === item.id);
        if (!producto) {
            return;
        }
        total += producto.precio * item.cantidad;
        contenedor.appendChild(crearFilaCarrito(producto, item.cantidad));
    });

    const resumen = document.createElement("div");
    resumen.className = "resumen-carrito";
    resumen.innerHTML = `
        <p class="precio"><strong>Total:</strong> ${formatearPrecio(total)}</p>
        <button class="boton" type="button" id="boton-vaciar-carrito">Vaciar carrito</button>
    `;
    contenedor.appendChild(resumen);

    contenedor.querySelectorAll(".boton-quitar").forEach((boton) => {
        boton.addEventListener("click", () => {
            quitarDelCarrito(Number(boton.dataset.id));
            renderizarPaginaCarrito();
        });
    });

    document.getElementById("boton-vaciar-carrito").addEventListener("click", () => {
        vaciarCarrito();
        renderizarPaginaCarrito();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    renderizarPaginaCarrito();
});
