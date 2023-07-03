$(document).ready(function () {
  // este es para dejar el carrito vacio
  let carrito = [];

  // esta funcion es para agregar un producto al carrito
  function agregarAlCarrito(id, nombre, precio, cantidad, imagen, peso, stock) {
    // busca si el producto ya está en el carrito
    let productoExistente = carrito.find(
      (producto) => producto.id === id && producto.peso === peso
    );
    if (productoExistente) {
      // en caso que el producto ya este en el carrito, actualiza o agrega la cantidad
      productoExistente.cantidad += cantidad;
      if (productoExistente.cantidad > productoExistente.stock) {
        productoExistente.cantidad = productoExistente.stock;
      }
    } else {
      // si el producto no está en el carrito, agrega un nuevo producto al carrito
      carrito.push({
        id,
        nombre,
        precio,
        cantidad,
        imagen,
        peso,
        stock
      });
    }
    //este localStorage es para que al momento de agregar los productos se guarden de forma local
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // esta funcion actualiza la tabla del carrito
  function actualizarCarrito() {
    let tablaCarrito = document.querySelector("#lista-carrito tbody");
    tablaCarrito.innerHTML = "";
    carrito.forEach((producto) => {
      let fila = document.createElement("tr");
      fila.innerHTML = `
        <td><img src="${producto.imagen}" width="50"></td>
        <td>${producto.nombre}</td>
        <td>${producto.peso}</td>
        <td>$${producto.precio}</td>
        <td>
          <button class="btn-decrementar" data-producto-id="${
            producto.id
          }">-</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button class="btn-incrementar" data-producto-id="${
            producto.id
          }">+</button>
        </td>
        <td>${(producto.precio * producto.cantidad).toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}</td>
        <td><button class="btn-eliminar-producto" data-producto-id="${
          producto.id
        }">X</button></td>`;
      tablaCarrito.appendChild(fila);
  
      //boton incrementar cantidad
      tablaCarrito.querySelectorAll(".btn-incrementar").forEach((btn) => {
        btn.addEventListener("click", () => {
          const productoId = btn.dataset.productoId;
          const producto = carrito.find((producto) => producto.id === productoId);
          if (producto.cantidad < producto.stock) {
            producto.cantidad = producto.cantidad + 1;
          }
          actualizarCarrito();
        });
      });
  
      //boton decrementar cantidad
      tablaCarrito.querySelectorAll(".btn-decrementar").forEach((btn) => {
        btn.addEventListener("click", () => {
          const productoId = btn.dataset.productoId;
          const producto = carrito.find((producto) => producto.id === productoId);
          if (producto.cantidad > 1) {
            producto.cantidad = producto.cantidad - 1;
            actualizarCarrito();
          }
        });
      });
  
      //aqui lo que hago es obtener cada boton X de cada articulo
      let botonesEliminar = document.querySelectorAll(".btn-eliminar-producto");
      //esta lo que hara es recorrer cada boton y asignar un evento
      botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", () => {
          //aqui lo que hare es obtener cada id de cada articulo para eliminar
          let id = boton.dataset.productoId;
          //al momento de dar click lo que hara es eliminar el articulo del carrito
          carrito = carrito.filter((producto) => producto.id !== id);
          //aqui ya dejo actualizar la tabla al momento de borrar
          actualizarCarrito();
        });
      });
    });

    // este actualiza el total del carrito
    let totalCarrito = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    document.querySelector("#total").textContent = `${totalCarrito.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    })}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  //esta funcion carga todo lo que este en el carrito al almacenamiento localstorage
  function cargarCarrito() {
    let contenidoCarrito = localStorage.getItem("carrito");
    if (contenidoCarrito) {
      carrito = JSON.parse(contenidoCarrito);
      actualizarCarrito();
    }
    actualizarCarrito();
  }

  cargarCarrito();

  // este busca todos los botones de "Añadir al carrito"
  let botonesAgregar = document.querySelectorAll(".agregar-carrito");

  // este le asigna un evento "click" a cada botón de "Añadir al carrito"
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
      // aqui se obtienen los datos del producto desde el botón
      let id = boton.parentElement.parentElement.querySelector(".id-prod").textContent;
      let stock = boton.parentElement.parentElement.querySelector(".stock").textContent;
      let nombre =
        boton.parentElement.parentElement.querySelector(
          ".card-title"
        ).textContent;

      let precioBase = parseFloat(
        boton.parentElement.parentElement
          .querySelector(".precio")
          .textContent.replace("$", "")
      );

      switch ($("#currency").val()) {
        case "2":
          let usdVal = $("#usdVal").text();
          precioBase = Math.round(precioBase * usdVal);
          break;
        case "3":
          let eurVal = $("#eurVal").text();
          precioBase = Math.round(precioBase * eurVal);
          break;
      }

      let cantidad = parseInt(
        boton.parentElement.parentElement.querySelector("#contador").value
      );
      let imagen =
        boton.parentElement.parentElement.querySelector(".card img").src;

      // se obtiene el peso seleccionado en el select de peso
      let pesoSelect =
        boton.parentElement.parentElement.querySelector("#kg-select");
      
      let precio = precioBase;

      let peso = "No Aplica";
      if (pesoSelect) {
        peso = pesoSelect.options[pesoSelect.selectedIndex].value;
        // actualiza el precio del producto en base al peso seleccionado
        switch (peso) {
          case "9KG":
            precio = Math.round(precioBase * 0.9);
            break;
          case "15KG":
            precio = Math.round(precioBase * 1.5);
            break;
          case "18KG":
            precio = Math.round(precioBase * 1.8);
            break;
        }
      }

      // este agrega el producto al carrito
      agregarAlCarrito(id, nombre, precio, cantidad, imagen, peso, stock);

      // este actualiza la tabla del carrito
      actualizarCarrito();
    });
  });


  // este busca el botón de "Vaciar Carrito"
  let botonVaciarCarrito = document.querySelector("#vaciar-carrito");

  // este le asigna un evento "click" al botón de "Vaciar Carrito"
  botonVaciarCarrito.addEventListener("click", () => {
    // este Vacía el carrito
    carrito = [];

    // este borra los productos del carrito del almacenamiento localstorage
    localStorage.removeItem("carrito");

    // este actualiza la tabla del carrito
    actualizarCarrito();
  });
});