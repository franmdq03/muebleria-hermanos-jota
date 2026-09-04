function obtenerIdDesdeUrl() {
    const parametros = new URLSearchParams(window.location.search);
    return Number(parametros.get("id"));
}

function renderizarDetalle(producto) {
    const contenedor = document.getElementById("detalle-producto");

    if (!producto) {
        contenedor.innerHTML = "<p>No encontramos el producto que buscás.</p>";
        return;
    }

    document.title = `Mueblería Hermanos Jota | ${producto.nombre}`;

    contenedor.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.alt}" width="600" height="450">
        <section>
            <p class="etiqueta">${producto.categoria}</p>
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcionLarga}</p>

            <h3>Detalles de fabricación</h3>
            <ul>
                ${producto.detallesFabricacion.map((detalle) => `<li>${detalle}</li>`).join("")}
            </ul>

            <p class="precio"><strong>Precio:</strong> ${formatearPrecio(producto.precio)}</p>

            <button class="boton" type="button" id="boton-agregar-carrito">Añadir al Carrito</button>
            <p class="mensaje-exito" id="mensaje-agregado" hidden>Producto añadido al carrito.</p>
        </section>
    `;

    document.getElementById("boton-agregar-carrito").addEventListener("click", () => {
        agregarAlCarrito(producto.id);

        const mensaje = document.getElementById("mensaje-agregado");
        mensaje.hidden = false;
        setTimeout(() => {
            mensaje.hidden = true;
        }, 2000);
    });
}

function iniciarDetalle() {
    const id = obtenerIdDesdeUrl();
    const producto = PRODUCTOS.find((p) => p.id === id) || PRODUCTOS[0];
    renderizarDetalle(producto);
}

document.addEventListener("DOMContentLoaded", iniciarDetalle);
