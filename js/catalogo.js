let productosDelCatalogo = [];

function cargarCatalogo() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(PRODUCTOS), 600);
    });
}

function crearTarjetaCatalogo(producto) {
    const articulo = document.createElement("article");
    articulo.className = "tarjeta-mueble";
    articulo.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.alt}">
        <div class="contenido-tarjeta">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcionCorta}</p>
            <p><strong>Precio:</strong> ${formatearPrecio(producto.precio)}</p>
            <a class="boton" href="producto.html?id=${producto.id}">Ver detalle</a>
        </div>
    `;
    return articulo;
}

function renderizarCatalogo(productos) {
    const contenedor = document.querySelector(".grilla-productos");

    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="sin-resultados">No se encontraron productos para tu búsqueda.</p>';
        return;
    }

    productos.forEach((producto) => {
        contenedor.appendChild(crearTarjetaCatalogo(producto));
    });
}

function filtrarProductos(termino) {
    const texto = termino.trim().toLowerCase();

    if (!texto) {
        return productosDelCatalogo;
    }

    return productosDelCatalogo.filter((producto) =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto)
    );
}

async function iniciarCatalogo() {
    const contenedor = document.querySelector(".grilla-productos");
    const formulario = document.querySelector(".formulario-busqueda");
    const campoBusqueda = document.getElementById("busqueda");

    contenedor.innerHTML = '<p class="cargando">Cargando catálogo...</p>';

    productosDelCatalogo = await cargarCatalogo();
    renderizarCatalogo(productosDelCatalogo);

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        renderizarCatalogo(filtrarProductos(campoBusqueda.value));
    });

    campoBusqueda.addEventListener("input", () => {
        renderizarCatalogo(filtrarProductos(campoBusqueda.value));
    });
}

document.addEventListener("DOMContentLoaded", iniciarCatalogo);
