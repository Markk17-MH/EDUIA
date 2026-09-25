/**
 * EDU-IA: Scripts principales
 * Manejo de modo claro/oscuro, navegación móvil y acordeones interactivos.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Gestión de Modo Claro / Oscuro con LocalStorage
  // --------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'edu_ia_theme';
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Actualizar botones de alternancia si existen
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(toggle => {
      toggle.setAttribute('aria-pressed', theme === 'dark');
      toggle.setAttribute('title', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }

  // Inicializar tema al cargar
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Escuchar cambios en la preferencia del sistema operativo si el usuario no ha forzado un tema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Configurar listeners cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    // Botones de modo oscuro
    const themeButtons = document.querySelectorAll('.theme-toggle');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });

    // Menú móvil responsive
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      });

      // Cerrar al pulsar Escape
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.focus();
        }
      });

      // Cerrar al hacer clic en un enlace interno
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Acordeón FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          
          // Opcional: cerrar otros si se desea comportamiento exclusivo
          faqItems.forEach(i => i.classList.remove('open'));
          
          if (!isOpen) {
            item.classList.add('open');
            question.setAttribute('aria-expanded', 'true');
          } else {
            question.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });

    // Formulario de contacto (simulación accesible del lado cliente)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const feedback = document.getElementById('form-feedback');
        if (feedback) {
          feedback.textContent = '¡Gracias por tu mensaje! Hemos recibido tu consulta y te responderemos lo antes posible.';
          feedback.className = 'form-feedback success';
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
      });
    }
  });
})();
