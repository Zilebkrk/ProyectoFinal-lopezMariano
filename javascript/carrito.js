const contenedor = document.getElementById("carrito");
const totalTexto = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderizarCarrito() {
  contenedor.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    totalTexto.innerText = "";
    return;
  }

  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.innerHTML = `
      <p>
        ${producto.objeto} (${producto.marca}) - 
        Cantidad: ${producto.cantidad} - 
        Precio unitario: $${producto.precio} - 
        Subtotal: $${subtotal}
      </p>
      <hr>
    `;
    contenedor.appendChild(div);
  });

  totalTexto.innerText = `Total: $${total}`;
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  renderizarCarrito();
}

botonVaciar.addEventListener("click", vaciarCarrito);

document.addEventListener("DOMContentLoaded", renderizarCarrito)