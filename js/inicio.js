function cargarProductosDestacados() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(PRODUCTOS.filter((producto) => producto.destacado));
        }, 600);
    });
}

function crearTarjetaDestacada(producto) {
    const articulo = document.createElement("article");
    articulo.className = "tarjeta-mueble";
    articulo.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.alt}">
        <div class="contenido-tarjeta">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcionCorta}</p>
            <p><strong>Precio:</strong> ${formatearPrecio(producto.precio)}</p>
            <a class="boton" href="producto.html?id=${producto.id}">Ver detalle</a>
        </div>
    `;
    return articulo;
}

async function iniciarProductosDestacados() {
    const contenedor = document.querySelector("#productos-destacados .grilla-productos");
    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = '<p class="cargando">Cargando productos destacados...</p>';

    const productos = await cargarProductosDestacados();

    contenedor.innerHTML = "";
    productos.forEach((producto) => {
        contenedor.appendChild(crearTarjetaDestacada(producto));
    });
}

document.addEventListener("DOMContentLoaded", iniciarProductosDestacados);
