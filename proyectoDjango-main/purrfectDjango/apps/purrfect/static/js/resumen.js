$(document).ready(function () {
  if (typeof Storage !== "undefined") {
    localStorage.removeItem("carrito");
    $("#btn-inicio").on("click", function() {
        window.location.replace("/");
    });
  } else {
    alert("El Storage no está disponible");
  }
});
