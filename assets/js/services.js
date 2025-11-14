// assets/js/services.js
(function () {
  const slider   = document.querySelector('.services-slider');
  if (!slider) return;

  const viewport = slider.querySelector('.services-slider__viewport');
  const track    = slider.querySelector('.services-slider__track');
  const prevBtn  = slider.querySelector('.services-slider__btn--prev');
  const nextBtn  = slider.querySelector('.services-slider__btn--next');
  if (!viewport || !track || !prevBtn || !nextBtn) return;

  const SLIDES_TO_SHOW = 2;      // SIEMPRE 2, en todos los tamaños
  const STEP_PERCENT   = 100 / SLIDES_TO_SHOW; // 50%
  let position = 0;              // índice actual (incluyendo clones)
  let isAnimating = false;

  function setWidths() {
    const slides = track.querySelectorAll('.service-slide');
    slides.forEach(slide => {
      slide.style.flex = `0 0 ${STEP_PERCENT}%`; // 50% cada tarjeta
    });
  }

  function removeClones() {
    track.querySelectorAll('.service-slide.is-clone').forEach(c => c.remove());
  }

  function createClones() {
    const originals = Array.from(track.querySelectorAll('.service-slide'));
    const totalOriginal = originals.length;
    if (totalOriginal === 0) return;

    // clones al principio
    for (let i = totalOriginal - SLIDES_TO_SHOW; i < totalOriginal; i++) {
      const clone = originals[i].cloneNode(true);
      clone.classList.add('is-clone');
      track.insertBefore(clone, track.firstChild);
    }

    // clones al final
    for (let i = 0; i < SLIDES_TO_SHOW; i++) {
      const clone = originals[i].cloneNode(true);
      clone.classList.add('is-clone');
      track.appendChild(clone);
    }
  }

  function updateTransform(animated) {
    track.style.transition = animated ? 'transform .4s ease' : 'none';
    const offset = -(position * STEP_PERCENT);
    track.style.transform = `translateX(${offset}%)`;
  }

  function init() {
    track.style.transition = 'none';
    track.style.transform  = 'translateX(0)';

    removeClones();
    setWidths();
    createClones();

    // arrancamos en el primer slide REAL (después de los clones iniciales)
    position = SLIDES_TO_SHOW;
    updateTransform(false);
  }

  function handleTransitionEnd() {
    const allSlides      = track.querySelectorAll('.service-slide');
    const totalSlides    = allSlides.length;
    const maxIndexBeforeClones = totalSlides - SLIDES_TO_SHOW;

    // hemos avanzado a clones del final → saltamos al primer real
    if (position >= maxIndexBeforeClones) {
      position = SLIDES_TO_SHOW;
      updateTransform(false);
    }

    // hemos ido hacia atrás a clones del principio → saltamos al último real visible
    if (position <= SLIDES_TO_SHOW - 1) {
      position = totalSlides - SLIDES_TO_SHOW * 2;
      updateTransform(false);
    }

    isAnimating = false;
  }

  function go(delta) {
    if (isAnimating) return;
    isAnimating = true;
    position += delta;
    updateTransform(true);
  }

  nextBtn.addEventListener('click', () => go(1));
  prevBtn.addEventListener('click', () => go(-1));

  nextBtn.addEventListener('keyup', e => {
    if (e.key === 'Enter' || e.key === ' ') go(1);
  });
  prevBtn.addEventListener('keyup', e => {
    if (e.key === 'Enter' || e.key === ' ') go(-1);
  });

  track.addEventListener('transitionend', handleTransitionEnd);

  // iniciamos
  init();

  // si cambias ancho (giras móvil, etc.), recalculamos, pero SIEMPRE con 2 visibles
  window.addEventListener('resize', () => {
    init();
  });
})();
