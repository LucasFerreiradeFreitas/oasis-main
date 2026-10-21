(() => {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#menu-principal');
  const heroVideo = document.querySelector('.hero-video');

  if (
    heroVideo &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    heroVideo.play().catch(() => {});
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Fechar menu' : 'Abrir menu',
      );
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuToggle.focus();
      }
    });
  }

  const year = document.querySelector('#ano-atual');
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.querySelector('#form-orcamento');
  const feedback = document.querySelector('#form-feedback');

  if (form && feedback) {
    const whatsappNumber = '5581993598095';

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.reportValidity()) {
        feedback.textContent =
          'Confira os campos obrigatórios antes de continuar.';
        return;
      }

      const data = new FormData(form);
      const value = (key) => String(data.get(key) || '').trim();

      const lines = [
        'Olá! Gostaria de solicitar informações e um orçamento para uma atividade de educação ambiental.',
        '',
        `Nome: ${value('nome')}`,
        value('instituicao')
          ? `Escola ou instituição: ${value('instituicao')}`
          : '',
        `Cidade e estado: ${value('cidade')}`,
        value('atividade')
          ? `Atividade de interesse: ${value('atividade')}`
          : '',
        value('publico') ? `Público / participantes: ${value('publico')}` : '',
        value('data') ? `Data pretendida: ${value('data')}` : '',
        value('mensagem') ? `Informações adicionais: ${value('mensagem')}` : '',
      ].filter(Boolean);

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
      feedback.textContent =
        'Sua mensagem está pronta. Revise os dados na janela do WhatsApp antes de enviar.';
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
})();
