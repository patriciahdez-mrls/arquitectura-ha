// assets/js/projects.js
(function () {
  const items = document.querySelectorAll('.project-item');
  if (!items.length) return;

  items.forEach(item => {
    const link = item.querySelector('a');
    if (!link) return;

    // Ratón: entrar / salir
    item.addEventListener('mouseenter', () => {
      item.classList.add('is-active');
    });

    item.addEventListener('mouseleave', () => {
      item.classList.remove('is-active');
    });

    // Teclado: foco en el enlace (accesible con TAB)
    link.addEventListener('focus', () => {
      item.classList.add('is-active');
    });

    link.addEventListener('blur', () => {
      item.classList.remove('is-active');
    });
  });
})();
