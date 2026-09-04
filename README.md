# Mueblería Hermanos Jota

Sitio web de fachada para una mueblería, construido íntegramente con tecnologías del lado del cliente (HTML, CSS y JavaScript). Simula una experiencia de compra sin backend: el catálogo, el detalle de producto y el carrito se manejan por completo en el navegador.

## Integrantes

- [Nombre Apellido]
- [Nombre Apellido]
- [Nombre Apellido]

## Descripción de funcionalidad

- **Inicio (`index.html`)**: header con logo y navegación, hero principal, historia de la empresa y 4 productos destacados cargados de forma asíncrona.
- **Catálogo (`productos.html`)**: grilla con todos los productos, renderizada dinámicamente desde un array de objetos, con buscador funcional por nombre o categoría.
- **Detalle de producto (`producto.html`)**: página dinámica (`producto.html?id=N`) que muestra imagen grande, descripción completa, detalles de fabricación, precio y botón para añadir al carrito.
- **Carrito (`carrito.html`)**: carrito simulado persistido en `localStorage`, con contador visible en el header de todas las páginas, listado de productos agregados, subtotales, total y opción de quitar ítems o vaciar el carrito.
- **Contacto (`contacto.html`)**: formulario de nombre, email y mensaje con validación del lado del cliente en JavaScript y mensaje de éxito/error mostrado mediante manipulación del DOM.

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 (Mobile First, Flexbox y CSS Grid)
- JavaScript (ES6+): arrays de objetos, manipulación del DOM, `Promise`/`async`-`await` para simular carga asíncrona, `addEventListener` para interactividad, `localStorage` para persistir el carrito

## Cómo correr el proyecto

Al ser un sitio 100% estático, alcanza con abrir `index.html` en el navegador, o servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```
