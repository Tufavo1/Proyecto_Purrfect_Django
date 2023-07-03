$(document).ready(function () {
  let active = ".login";
  let hidden = ".register";
  $("#switch").on("change", function () {
    $("#switch").prop("disabled", true);
    $(active).fadeToggle(300);
    setTimeout(function () {
      $(hidden).fadeToggle(300);
      $("#switch").prop("disabled", false);
      let temp = active;
      active = hidden;
      hidden = temp;
    }, 300);
  });

  $("#login").validate({
    rules: {
      username: {
        required: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      username: {
        required: "Debe ingresar su username",
      },
      password: {
        required: "Debe ingresar su contraseña",
      },
    },
  });

  $("#register").validate({
    rules: {
      rEmail: {
        required: true,
        email: true,
      },
      rNombre: {
        required: true,
      },
      rUsername: {
        required: true,
      },
      rContraseña: {
        required: true,
      },
      rDireccion: {
        required: true,
      },
      rTelefono: {
        required: true,
        digits: true,
        minlength: 9,
        maxlength: 9,
      },
    },
    messages: {
      rEmail: {
        required: "Debe ingresar un email",
        email: "El email no es válido",
      },
      rNombre: {
        required: "Debe ingresar su nombre",
      },
      rUsername: {
        required: "Debe crear un username",
      },
      rContraseña: {
        required: "Debe crear una contraseña",
      },
      rDireccion: {
        required: "Debe ingresar su dirección",
      },
      rTelefono: {
        required: "Debe ingresar su teléfono",
        digits: "Debe ingresar su teléfono",
        minlength: "El número debe tener 9 dígitos",
        maxlength: "El número debe tener 9 dígitos",
      },
    },
  });
});
