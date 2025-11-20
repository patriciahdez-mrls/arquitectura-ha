document.querySelectorAll('[data-slider]').forEach(slider => {
  const track = slider.querySelector('.project-card__track');
  const imgs = track.children;
  const next = slider.querySelector('.pc-next');
  const prev = slider.querySelector('.pc-prev');

  let index = 0;

  function update() {
    // Mover carrusel
    track.style.transform = `translateX(-${index * 100}%)`;
    // Mostrar | ocultar botones según posición
    prev.style.display = index === 0 ? "none" : "inline-flex";
    next.style.display = index === imgs.length - 1 ? "none" : "inline-flex"
  }

  next.addEventListener('click', () => {
    if (index < imgs.length - 1) index++;
    update();
  });

  prev.addEventListener('click', () => {
    if (index > 0) index--;
    update();
  });

  // Inicializar estado de botones al cargar
  update();
});

// puntitos para carrusel
(function () {
  const sliders = document.querySelectorAll('[data-slider]');
  if (!sliders.length) return;

  sliders.forEach(initSlider);

  function initSlider(slider) {
    const track = slider.querySelector('.project-card__track');
    const images = Array.from(track.querySelectorAll('img'));
    const prevBtn = slider.querySelector('.pc-prev');
    const nextBtn = slider.querySelector('.pc-next');
    const dotsContainer = slider.querySelector('.project-card__dots');

    if (!track || images.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

    let currentIndex = 0;

    // Aseguramos estructura horizontal
    track.style.display = 'flex';
    track.style.transition = 'transform 0.35s ease';
    images.forEach(img => {
      img.style.flex = '0 0 100%';   // una imagen visible a la vez
      img.style.maxWidth = '100%';
    });

    // Crear dots
    const dots = images.map((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'project-card__dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir a la imagen ${index + 1}`);

      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
      return dot;
    });

    function updateSlider() {
      const offset = -(currentIndex * 100);
      track.style.transform = `translateX(${offset}%)`;

      // Actualizar dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
      });

      // Mostrar/ocultar flechas
      prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
      nextBtn.style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible';
    }

    // Listeners de flechas
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    // Estado inicial
    updateSlider();
  }
})();
