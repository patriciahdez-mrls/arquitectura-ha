// assets/js/contact.js
(function () {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  const successMsg = document.getElementById('contactSuccess');

  function setError(name, message) {
    const field = form.elements[name];
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (!field || !errorEl) return;
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
    } else {
      field.removeAttribute('aria-invalid');
      errorEl.textContent = '';
    }
  }

  function validate() {
    let ok = true;

    const nombre = form.elements.nombre.value.trim();
    if (!nombre) {
      setError('nombre', 'Por favor, indica tu nombre.');
      ok = false;
    } else {
      setError('nombre', '');
    }

    const email = form.elements.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('email', 'El correo es obligatorio.');
      ok = false;
    } else if (!emailRegex.test(email)) {
      setError('email', 'Introduce un correo válido.');
      ok = false;
    } else {
      setError('email', '');
    }

    const servicio = form.elements.servicio.value;
    if (!servicio) {
      setError('servicio', 'Selecciona un servicio.');
      ok = false;
    } else {
      setError('servicio', '');
    }

    const mensaje = form.elements.mensaje.value.trim();
    if (!mensaje || mensaje.length < 10) {
      setError('mensaje', 'Cuéntanos un poco más sobre tu proyecto (mínimo 10 caracteres).');
      ok = false;
    } else {
      setError('mensaje', '');
    }

    const tyc = form.elements['acepta-tyc'].checked;
    if (!tyc) {
      setError('acepta-tyc', 'Debes aceptar los términos y condiciones.');
      ok = false;
    } else {
      setError('acepta-tyc', '');
    }

    const priv = form.elements['acepta-privacidad'].checked;
    if (!priv) {
      setError('acepta-privacidad', 'Debes aceptar la política de privacidad.');
      ok = false;
    } else {
      setError('acepta-privacidad', '');
    }

    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    successMsg.textContent = '';

    if (!validate()) {
      return;
    }

    // Aquí iría el fetch/POST real si tuvieras backend.
    form.reset();
    Array.from(form.elements).forEach(el => el.removeAttribute && el.removeAttribute('aria-invalid'));

    successMsg.textContent = 'Gracias por tu mensaje. Nos pondremos en contacto contigo lo antes posible.';
  });
})();
