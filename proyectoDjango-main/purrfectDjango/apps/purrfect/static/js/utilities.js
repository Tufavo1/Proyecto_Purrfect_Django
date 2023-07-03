window.onload = displayClock();
function displayClock() {
  var display = new Date().toLocaleTimeString();
  document.getElementById("reloj").innerHTML = display;
  setTimeout(displayClock, 1000);
}

$(document).ready(function () {
  if (localStorage.getItem("darkMode") == "true") {
    darkMode();
  }

  let valorDolar;
  let valorEuro;
  let precios = {
    clp: [],
    usd: [],
    euro: [],
  };

  $.getJSON("https://mindicador.cl/api", function (data) {
    valorDolar = data.dolar.valor;
    valorEuro = data.euro.valor;
    let html = `
    <div id="usdVal" style="display: none;">${valorDolar}</div>
    <div id="eurVal" style="display: none;">${valorEuro}</div>`;
    $(".topbar").append(html);
    calcPrecios();
  });

  function calcPrecios() {
    let clp = [];
    let usd = [];
    let eur = [];
    $(".precio").each(function () {
      let valor = $(this).text();
      clp.push(valor);
      usd.push(Math.round((valor / valorDolar + Number.EPSILON) * 100) / 100);
      eur.push(Math.round((valor / valorEuro + Number.EPSILON) * 100) / 100);
    });
    precios.clp = clp;
    precios.usd = usd;
    precios.eur = eur;
  }

  $(".precio").attr("data-before", "$");
  $("#currency").change(function () {
    let array;
    switch ($("#currency").val()) {
      case "1":
        $(".precio").attr("data-before", "$");
        array = precios.clp;
        break;
      case "2":
        $(".precio").attr("data-before", "$");
        array = precios.usd;
        break;
      case "3":
        $(".precio").attr("data-before", "€");
        array = precios.eur;
        break;
    }
    $(".precio").each(function (i) {
      $(this).text(array[i]);
    });
    localStorage.setItem("currency", $("#currency").val());
  });

  setTimeout(function () {
    let selectedCurrency = localStorage.getItem("currency");
    if (selectedCurrency !== null) {
      $("#currency").val(selectedCurrency).change();
    }
  }, 200);

  function darkMode() {
    $("#lightBtn").addClass("darkMode");
    $("#lightBtn").html('<i class="fa-solid fa-moon"></i>');
    $("nav").addClass("darkMode");
    $(".section-box").addClass("darkMode");
    $(".content-box").addClass("darkMode");
    $("footer").addClass("darkMode");
    $(".card").addClass("darkCard");
    $(".modal-content").addClass("darkMode");
    $(".utilities-container").addClass("darkClock");
    $(".log-form").addClass("darkMode");
    $(".data-container").addClass("darkMode");
    $(".offcanvas").addClass("darkMode");
  }

  function lightMode() {
    $("#lightBtn").removeClass("darkMode");
    $("#lightBtn").html('<i class="fa-solid fa-sun"></i>');
    $("nav").removeClass("darkMode");
    $(".section-box").removeClass("darkMode");
    $(".content-box").removeClass("darkMode");
    $("footer").removeClass("darkMode");
    $(".card").removeClass("darkCard");
    $(".modal-content").removeClass("darkMode");
    $(".utilities-container").removeClass("darkClock");
    $(".log-form").removeClass("darkMode");
    $(".data-container").removeClass("darkMode");
    $(".offcanvas").removeClass("darkMode");
  }

  $("#lightBtn").on("click", function () {
    if ($("#lightBtn").hasClass("darkMode")) {
      lightMode();
      localStorage.setItem("darkMode", false);
    } else {
      darkMode();
      localStorage.setItem("darkMode", true);
    }
  });

  $("#filtroBtn").on("click", function () {
    let filtroCategoria = $("#filtroCategoria").val();
    if (filtroCategoria != 0) {
      filtroCategoria = $("#filtroCategoria").find(":selected").text();
    }
    let filtroMarca = $("#filtroMarca").val();
    if (filtroMarca != 0) {
      filtroMarca = $("#filtroMarca").find(":selected").text();
    }
    $(".card").each(function () {
      let cardCategoria = $(this)
        .children()
        .children()
        .children(".categoria")
        .text();
      let cardMarca = $(this).children().children().children(".marca").text();
      if (cardCategoria == filtroCategoria || filtroCategoria == 0) {
        if (cardMarca == filtroMarca || filtroMarca == 0) {
          $(this).parent().fadeIn();
        } else {
          $(this).parent().fadeOut();
        }
      } else {
        $(this).parent().fadeOut();
      }
    });
  });

  $("#filtroDltBtn").on("click", function () {
    $("#filtroCategoria").val("0");
    $("#filtroMarca").val("0");
    $(".card").each(function () {
      $(this).parent().fadeIn();
    });
  });

  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };
  $("#btn-comprar").on("click", function () {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito.length === 0) {
      appendAlert('Debe agregar productos al carrito para acceder a la pantalla de pago')
    } else {
      window.location.replace("/carrito");
    }
  });
});
