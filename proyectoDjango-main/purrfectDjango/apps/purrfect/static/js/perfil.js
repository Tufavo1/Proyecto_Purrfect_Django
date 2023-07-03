$(document).ready(function () {
  $("#btn-edit").on("click", function () {
    $("#eNombre").val($("#nombre").text().trim());
    $("#eEmail").val($("#email").text().trim());
    $("#eUsername").val($("#username").text().trim());
    $("#ePassword").val($("#password").text().trim());
    $("#eDireccion").val($("#direccion").text().trim());
    $("#eTelefono").val($("#telefono").text().trim());
    $("#eUser").validate({
      rules: {
        eEmail: {
          required: true,
          email: true,
        },
        eNombre: {
          required: true,
        },
        eUsername: {
          required: true,
        },
        ePassword: {
          required: true,
        },
        eDireccion: {
          required: true,
        },
        eTelefono: {
          required: true,
          digits: true,
          minlength: 9,
          maxlength: 9,
        },
      },
      messages: {
        eEmail: {
          required: "Debe ingresar un email",
          email: "El email no es válido",
        },
        eNombre: {
          required: "Debe ingresar su nombre",
        },
        eUsername: {
          required: "Debe crear un username",
        },
        ePassword: {
          required: "Debe ingresar una contraseña",
        },
        eDireccion: {
          required: "Debe ingresar su dirección",
        },
        eTelefono: {
          required: "Debe ingresar su teléfono",
          digits: "Debe ingresar su teléfono",
          minlength: "El número debe tener 9 dígitos",
          maxlength: "El número debe tener 9 dígitos",
        },
      },
    });
  });

  $("#sub-form").validate({
    rules: {
      donacion: {
        required: true,
        digits: true,
      },
      titular: {
        required: true,
      },
      cardNumber: {
        required: true,
        digits: true,
        minlength: 16,
        maxlength: 16,
      },
      expireDate: {
        required: true,
      },
      cvv: {
        required: true,
        digits: true,
      },
    },
    messages: {
      donacion: {
        required: "Debe ingresar un monto",
        digits: "El monto no es válido",
      },
      titular: {
        required: "Debe ingresar el nombre del titular",
      },
      cardNumber: {
        required: "Debe ingresar el número de tarjeta",
        digits: "El número de tarjeta no es válido",
        minlength: "El número de tarjeta no es válido",
        maxlength: "El número de tarjeta no es válido",
      },
      expireDate: {
        required: "Debe ingresar la fecha de vencimiento",
      },
      cvv: {
        required: "Debe ingresar el CVV",
        digits: "El CVV no es válido",
        min: "El CVV no es válido",
        max: "El CVV no es válido",
      },
    },
  });
  console.log("XD");
  $(".pedDetail").on("click", function () {
    console.log("XD");
    $("#idPed").text("");
    $("#pedFecha").text("");
    $("#pedProd").text("");
    $("#pedTot").text("");
    $("#pedEst").text("");
    $("#pedIcon").text("");
    $("#pedMsg").text("");
    $("#pedAct").text("");
    let id = $(this).children(".celdaPedId").text().trim();
    $("#idPed").text(id);
    $("#pedFecha").text($(this).children(".celdaPedFecha").text());
    $("#pedProd").html($(this).children(".celdaPedProd").html());
    $("#pedTot").text($(this).children(".celdaPedTot").text());
    let estado = $(this).children(".celdaPedEst").text();
    $("#pedEst").text(estado);
    let htmlIcon, htmlMsg;
    if (estado == "Por enviar") {
      htmlIcon = `<i class="fa-solid fa-box-open fa-fade" style="font-size: 8rem"></i>`;
    } else if (estado == "Enviado") {
      htmlIcon = `<i class="fa-solid fa-truck-fast fa-fade" style="font-size: 8rem"></i>`;
      htmlMsg = `Tu pedido ha sido enviado, lo que significa que ha sido entregado a Starken y llegará próximamente a la dirección especificada en tu perfil.`;
      let htmlAct = `<button type="button" class="btn col-8">Seguimiento en Starken</button>`;
      $("#pedAct").append(htmlAct);
    } else {
      htmlIcon = `<i class="fa-solid fa-house-circle-check fa-fade" style="font-size: 8rem"></i>`;
    }
    $("#pedIcon").append(htmlIcon);
    $("#pedMsg").append(htmlMsg);
  });
});
