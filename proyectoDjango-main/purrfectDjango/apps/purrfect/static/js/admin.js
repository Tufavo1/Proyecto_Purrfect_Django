$(document).ready(function () {
  $(".editProducto").on("click", function () {
    $("#id-producto").val($(this).children(".celdaId").text().trim());
    $("#marca-producto").val($(this).children(".celdaMarca").text());
    $("#nombre-producto").val($(this).children(".celdaProducto").text());
    $("#precio-producto").val($(this).children(".celdaPrecio").text());
    $("#stock-producto").val($(this).children(".celdaStock").text());
    $(
      "#animal-producto option[value='" +
        $(this).children(".celdaAnimal").children(".id").text() +
        "']"
    ).prop("selected", true);
    $(
      "#categoria-producto option[value='" +
        $(this).children(".celdaCategoria").children(".id").text() +
        "']"
    ).prop("selected", true);
    if (
      $(this).children(".celdaCategoria").children(".peso").text() == "True"
    ) {
      $("#nuevo-has-peso-producto").prop("checked", true);
    } else {
      $("#nuevo-has-peso-producto").prop("checked", false);
    }
    $("#imagen-actual").attr(
      "src",
      $(this).children(".celdaImagen").children().attr("src")
    );
    $("#btn-eliminar").attr(
      "href",
      "/delProd/" + $(this).children(".celdaId").text().trim()
    );
  });

  $(".pedDetail").on("click", function () {
    $("#idPed").text("");
    $("#pedCliente").text("");
    $("#pedFecha").text("");
    $("#pedProd").text("");
    $("#pedTot").text("");
    $("#pedEst").text("");
    $("#pedIcon").text("");
    $("#pedAct").text("");
    let id = $(this).children(".celdaPedId").text().trim();
    $("#idPed").text(id);
    $("#pedCliente").text($(this).children(".celdaPedCliente").text());
    $("#pedFecha").text($(this).children(".celdaPedFecha").text());
    $("#pedProd").html($(this).children(".celdaPedProd").html());
    $("#pedTot").text($(this).children(".celdaPedTot").text());
    let estado = $(this).children(".celdaPedEst").text();
    $("#pedEst").text(estado);
    let htmlIcon, htmlButton;
    if (estado == "Por enviar") {
      htmlIcon = `<i class="fa-solid fa-box-open fa-fade" style="font-size: 8rem"></i>`;
      htmlButton = `<a href="/sendPed/${id}" type="button" class="btn col-8">Marcar como enviado</a>`;
    } else if (estado == "Enviado") {
      htmlIcon = `<i class="fa-solid fa-truck-fast fa-fade" style="font-size: 8rem"></i>`;
      htmlButton = `<a href="/deliverPed/${id}" type="button" class="btn col-8">Marcar como recibido</a>`;
    } else {
      htmlIcon = `<i class="fa-solid fa-house-circle-check fa-fade" style="font-size: 8rem"></i>`;
      htmlButton = `<a type="button" class="btn col-8">Pedido Completado</a>`;
    }
    $("#pedIcon").append(htmlIcon);
    $("#pedAct").append(htmlButton);
  });

  $("#nuevaFicha").validate({
    rules: {
      nuevoSku: {
        required: true,
      },
      nuevoNombre: {
        required: true,
      },
      nuevoMarca: {
        required: true,
      },
      nuevoPrecio: {
        required: true,
      },
      nuevoStock: {
        required: true,
      },
      nuevoImagen: {
        required: true,
      },
    },
    messages: {
      nuevoSku: {
        required: "Sku obligatorio",
      },
      nuevoNombre: {
        required: "Debe ingresar un nombre",
      },
      nuevoMarca: {
        required: "Debe ingresar una marca",
      },
      nuevoPrecio: {
        required: "Debe ingresar un precio",
      },
      nuevoStock: {
        required: "Debe ingresar el stock",
      },
      nuevoImagen: {
        required: "Debe ingresar una imagen",
      },
    },
  });

  $("#fichaProducto").validate({
    rules: {
      idProducto: {
        required: true,
      },
      nombreProducto: {
        required: true,
      },
      marcaProducto: {
        required: true,
      },
      precioProducto: {
        required: true,
      },
      stockProducto: {
        required: true,
      },
    },
    messages: {
      idProducto: {
        required: "Sku obligatorio",
      },
      nombreProducto: {
        required: "Debe ingresar un nombre",
      },
      marcaProducto: {
        required: "Debe ingresar una marca",
      },
      precioProducto: {
        required: "Debe ingresar un precio",
      },
      stockProducto: {
        required: "Debe ingresar el stock",
      },
    },
  });
});
