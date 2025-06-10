const contenedor = document.getElementById("lista-productos");

async function obtenerProductos() {
    try {
        const respuesta = await fetch("productos.json");
        const productosJson = await respuesta.json();


        if (!localStorage.getItem("objetos")) {
            localStorage.setItem("objetos", JSON.stringify(productosJson));
        }

        const productosPrecargados = JSON.parse(localStorage.getItem("objetos")) || [];
        const productosManuales = JSON.parse(localStorage.getItem("arrayVacio")) || [];

        const productosTotales = [...productosPrecargados, ...productosManuales];

        mostrarProductos(productosTotales);
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
}

function mostrarProductos(productos) {
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto-item-lista");

        const nombre = producto.objeto || producto.modelo || "Sin nombre";
        const marca = producto.marca;
        const precio = producto.precio;

        const pProducto = document.createElement("p");
        pProducto.classList.add("info-producto-texto");
        pProducto.innerHTML = `<strong>${nombre}</strong> - Marca: ${marca} - Precio: $${precio}`;

        const buttonAgregar = document.createElement("button");
        buttonAgregar.textContent = "Agregar al carrito";
        buttonAgregar.classList.add("boton-agregar-producto");
        buttonAgregar.onclick = () => agregarAlCarrito(producto.id);

        div.appendChild(pProducto);
        div.appendChild(buttonAgregar);
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const todosLosProductos = [
        ...JSON.parse(localStorage.getItem("objetos") || "[]"),
        ...JSON.parse(localStorage.getItem("arrayVacio") || "[]")
    ];

    const productoOriginal = todosLosProductos.find(p => p.id === id);
    if (!productoOriginal) return       Swal.fire({
    icon: 'error',
    title: 'Producto no encontrado',
    showConfirmButton: false,
    timer: 1500
  });


    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...productoOriginal, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
      Swal.fire({
    icon: 'success',
    title: '¡Agregado!',
    text: 'Producto agregado al carrito',
    showConfirmButton: false,
    timer: 1500
  });
}


obtenerProductos();
