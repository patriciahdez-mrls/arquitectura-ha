// ===========================================================
// HEADER.JS — comportamiento del menú sticky en scroll
// ===========================================================

// Autoejecutable para evitar variables globales
(function () {
  const nav = document.querySelector('.nav-box');
  if (!nav) return;

  const onScroll = () => {
    // Si hay desplazamiento, añade la clase que activa la sombra y compacta el nav
    if (window.scrollY > 0) {
      nav.classList.add('is-sticky');
    } else {
      nav.classList.remove('is-sticky');
    }
  };

  // Llamada inicial y al desplazarse
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
