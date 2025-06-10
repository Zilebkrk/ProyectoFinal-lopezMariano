const input1 = document.getElementById("input1")
const input2 = document.getElementById("input2")
const input3 = document.getElementById("input3")
const input4 = document.getElementById("input4") // NUEVO
const button1 = document.getElementById("button1")
const productoMostrado = document.getElementById("productoMostrado")
const div2 = document.getElementById("div2")

let arrayVacio = JSON.parse(localStorage.getItem("arrayVacio")) || []

function agregarProducto() {
    const input1Value = input1.value.trim()
    const input2Value = input2.value.trim()
    const input3Value = input3.value.trim()
    const input4Value = input4.value.trim()

    if (input1Value === "" || input2Value === "" || input3Value === "" || input4Value === "") {
        Swal.fire({
            icon: 'warning',
            title: '¡Faltan datos!',
            text: 'Por favor, completa todos los campos.',
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }
    if (Number(input4Value) <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Stock inválido',
            text: 'El stock debe ser mayor a 0.',
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }

  
    let productos = JSON.parse(localStorage.getItem("arrayVacio")) || []

    const nuevoObjeto = {
        id: Date.now(),
        marca: input1Value,
        modelo: input2Value,
        precio: input3Value,
        stock: Number(input4Value)
    }

    productos.push(nuevoObjeto)

    input1.value = ""
    input2.value = ""
    input3.value = ""
    input4.value = ""

    localStorage.setItem("arrayVacio", JSON.stringify(productos))
    Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: 'El producto ha sido añadido correctamente.',
        showConfirmButton: false,
        timer: 1500
    });
    mostrarProducto()
}


button1.addEventListener("click", agregarProducto)

function mostrarProducto() {
    const productos = JSON.parse(localStorage.getItem("arrayVacio")) || []
    div2.innerHTML = ""

    if (productos.length === 0) {
        productoMostrado.style.display = "block"
        return
    }

    productoMostrado.style.display = "none"

    productos.forEach(objeto => {
        const div = document.createElement("div")

        div.innerHTML = `
            <p>
                Marca: <strong>${objeto.marca}</strong> - 
                Modelo: ${objeto.modelo} - 
                Precio: $${objeto.precio} - 
                Stock: <span>${objeto.stock}</span>
            </p>
        `

        const inputCantidad = document.createElement("input")
        inputCantidad.type = "number"
        inputCantidad.min = "1"
        inputCantidad.placeholder = "Cantidad a eliminar"

        const botonUnidad = document.createElement("button")
        botonUnidad.textContent = "eliminar por cantidad"
        botonUnidad.style.backgroundColor = '#f44336'; 
        botonUnidad.style.color = 'white';
        botonUnidad.style.border = '3px solid purple'; 
        botonUnidad.style.borderRadius = '5px';
        botonUnidad.style.cursor = 'pointer';
        botonUnidad.style.fontSize = '0.9rem';
        botonUnidad.style.margin = '10px'; 
        botonUnidad.addEventListener("click", () => {
            const cantidad = Number(inputCantidad.value)
            if (isNaN(cantidad) || cantidad <= 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'accion invalida',
                    showConfirmButton: false,
                    timer: 1500
                });
                return
            }

            restarStock(objeto.id, cantidad)
        })

        const botonEliminar = document.createElement("button")
        botonEliminar.textContent = "Eliminar producto"
        botonEliminar.style.padding = '10px 15px';
        botonEliminar.style.backgroundColor = '#f44336'; 
        botonEliminar.style.color = 'white';
        botonEliminar.style.border = '3px solid purple'; 
        botonEliminar.style.borderRadius = '5px';
        botonEliminar.style.cursor = 'pointer';
        botonEliminar.style.fontSize = '0.9rem';
        botonEliminar.style.margin = '10px'; 
        botonEliminar.addEventListener("click", () => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarProducto(objeto.id);
                    Swal.fire(
                        '¡Eliminado!',
                        'El producto ha sido eliminado.',
                        'success'
                    );
                }
            });
        });
        div.appendChild(inputCantidad)
        div.appendChild(botonUnidad)
        div.appendChild(botonEliminar)

        div2.appendChild(div)
    })
}


function eliminarProducto(id) {
    let productos = JSON.parse(localStorage.getItem("arrayVacio")) || []
    productos = productos.filter(producto => producto.id !== id)
    localStorage.setItem("arrayVacio", JSON.stringify(productos))
    mostrarProducto()
}

function restarStock(id, cantidad) {
    let productos = JSON.parse(localStorage.getItem("arrayVacio")) || []

    const index = productos.findIndex(producto => producto.id === id)

    if (index !== -1) {
        if (productos[index].stock < cantidad) {
            Swal.fire({
                icon: 'error',
                title: 'no hay stock disponible',
                showConfirmButton: false,
                timer: 1500
            });
            return
        }

        productos[index].stock -= cantidad

        if (productos[index].stock <= 0) {
            productos.splice(index, 1) 
        }


        localStorage.setItem("arrayVacio", JSON.stringify(productos))
        mostrarProducto()
    }
}


mostrarProducto()