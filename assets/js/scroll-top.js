// assets/js/scroll-top.js
(function () {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  const TOGGLE_OFFSET = 300; // px de scroll para mostrar el botón
  let lastKnownScrollY = 0;

  function onScroll() {
    lastKnownScrollY = window.scrollY || window.pageYOffset;

    if (lastKnownScrollY > TOGGLE_OFFSET) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // eventos
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', scrollToTop);
  btn.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      scrollToTop();
    }
  });

  // llamada inicial por si entras con scroll ya hecho (navegador recuerda posición)
  onScroll();
})();
