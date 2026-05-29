(function () {
  'use strict';

  // Máscara de CPF: formata 000.000.000-00 enquanto o usuário digita.
  function aplicarMascaraCpf(el) {
    el.addEventListener('input', function () {
      let v = el.value.replace(/\D/g, '').slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
      el.value = v;
    });
  }

  document.querySelectorAll('[data-mask="cpf"]').forEach(aplicarMascaraCpf);

  // Confirmação antes de submeter formulários de exclusão.
  document.querySelectorAll('form[data-confirm]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!window.confirm(form.getAttribute('data-confirm'))) {
        e.preventDefault();
      }
    });
  });
})();
