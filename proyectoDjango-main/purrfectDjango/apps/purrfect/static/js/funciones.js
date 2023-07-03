// incrementar y decrementar
$(document).ready(function () {
  function agregarFuncionalidad(contenedor) {
    // aqui se obtendra la cantidad y los botobes incre y decre, estos se guardaran dentro del contenedor
        const contador = contenedor.querySelector('.input-quantity');
        const btnIncrementar = contenedor.querySelector('.btn-increment-decrement i.bi-chevron-compact-up');
        const btnDecrementar = contenedor.querySelector('.btn-increment-decrement i.bi-chevron-compact-down');
    // este le agregue un evento para los botones incrementar y decrementar
        btnIncrementar.addEventListener('click', () => {
          if (parseInt(contador.value) < contador.max) {
            contador.value = parseInt(contador.value) + 1;
          };
        });
        btnDecrementar.addEventListener('click', () => {
          if (parseInt(contador.value) > 1) {
            contador.value = parseInt(contador.value) - 1;
          };
        });
      };
    //este lo que hara es llamar la funcion para agregar a cada producto que este dentro de la card  
      const productos = document.querySelectorAll('.card');
      productos.forEach(producto => {
        agregarFuncionalidad(producto);
      });
    //lupa o buscador
    const form = document.querySelector('form');
    const searchInput = form.querySelector('input[type="search"]');
    const cards = document.querySelectorAll('.card');
    
    form.addEventListener('input', function(event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim().toLowerCase();
      cards.forEach(function(card) {
        const title = card.querySelector('.card-title').textContent.trim().toLowerCase();
        if (title.includes(searchTerm)) {
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0';
        }
      });
    });    
});
