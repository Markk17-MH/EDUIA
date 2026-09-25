/**
 * EDU-IA: Buscador y Filtro del lado del cliente (sin base de datos)
 * Funciona en categoria.html y sincroniza con los parámetros URL (?cat=... &q=... &aud=...)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('tools-container');
    const searchInput = document.getElementById('search-input');
    const heroSearchInput = document.getElementById('hero-search-input');
    const categoryChips = document.querySelectorAll('[data-category-filter]');
    const audienceBtns = document.querySelectorAll('[data-audience-filter]');
    const resultsCountEl = document.getElementById('results-count');
    const resetBtn = document.getElementById('reset-filters-btn');

    // Estado de filtros
    let currentCategory = 'todos';
    let currentAudience = 'todos';
    let searchQuery = '';

    // Si estamos en la portada (index.html), permitir que la barra hero redirija a categoria.html
    if (heroSearchInput) {
      heroSearchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const q = encodeURIComponent(heroSearchInput.value.trim());
          window.location.href = `categoria.html?q=${q}`;
        }
      });
    }

    // Si no hay contenedor dinámico de herramientas en esta página, salir
    if (!container || typeof TOOLS_DATA === 'undefined') {
      return;
    }

    // Leer parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('cat')) {
      currentCategory = urlParams.get('cat').toLowerCase();
    }
    if (urlParams.has('q')) {
      searchQuery = urlParams.get('q').toLowerCase();
      if (searchInput) {
        searchInput.value = urlParams.get('q');
      }
    }
    if (urlParams.has('aud')) {
      currentAudience = urlParams.get('aud').toLowerCase();
    }

    // Actualizar estados visuales de los botones de filtro
    function syncFilterUI() {
      categoryChips.forEach(chip => {
        const val = chip.getAttribute('data-category-filter');
        if (val === currentCategory) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });

      audienceBtns.forEach(btn => {
        const val = btn.getAttribute('data-audience-filter');
        if (val === currentAudience) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Renderizar tarjetas de herramientas
    function renderTools(tools) {
      if (tools.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg);">
            <div style="width: 56px; height: 56px; margin: 0 auto 1.25rem; border-radius: 50%; background-color: var(--bg-subtle); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3 style="margin-bottom: 0.5rem;">No se encontraron herramientas</h3>
            <p style="color: var(--text-muted); max-width: 440px; margin: 0 auto 1.5rem;">No hay resultados con los filtros actuales. Prueba a cambiar el término de búsqueda o seleccionar otra categoría.</p>
            <button id="empty-reset-btn" class="btn btn-secondary btn-sm">Limpiar todos los filtros</button>
          </div>
        `;
        const emptyReset = document.getElementById('empty-reset-btn');
        if (emptyReset) {
          emptyReset.addEventListener('click', resetFilters);
        }
        if (resultsCountEl) {
          resultsCountEl.textContent = 'Mostrando 0 herramientas';
        }
        return;
      }

      container.innerHTML = tools.map(tool => {
        let audienceClass = 'estudiante';
        if (tool.audience === 'profesores') audienceClass = 'docente';
        if (tool.audience === 'ambos') audienceClass = 'primary';

        // Estrellas de valoración
        const fullStars = Math.floor(tool.rating);

        return `
          <article class="tool-card" data-category="${tool.category}" data-audience="${tool.audience}">
            <div class="tool-card-header">
              <div class="tool-brand">
                <div class="tool-avatar">${tool.initials}</div>
                <div class="tool-brand-info">
                  <h3><a href="${tool.articleUrl}">${tool.name}</a></h3>
                  <div class="tool-rating">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>${tool.rating.toFixed(1)}</span>
                    <span style="color: var(--text-muted); font-size: 0.78rem;">(${tool.ratingCount})</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="tool-card-badges">
              <span class="badge badge-accent">${tool.categoryLabel}</span>
              <span class="badge badge-audience ${audienceClass}">${tool.audienceLabel}</span>
              <span class="badge badge-success">${tool.pricing}</span>
            </div>

            <p class="tool-card-desc">${tool.description}</p>

            <ul class="tool-features-list">
              ${tool.features.map(f => `
                <li class="tool-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>

            <div class="tool-card-footer">
              <a href="${tool.articleUrl}" class="btn btn-secondary btn-sm" style="flex: 1;">
                Leer Reseña
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
              <a href="${tool.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm" title="Visitar sitio oficial (enlace de afiliado)">
                Visitar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </article>
        `;
      }).join('');

      if (resultsCountEl) {
        resultsCountEl.textContent = `Mostrando ${tools.length} herramienta${tools.length === 1 ? '' : 's'}`;
      }
    }

    // Filtrar herramientas según estado actual
    function filterTools() {
      const filtered = TOOLS_DATA.filter(tool => {
        // Filtro por categoría
        const matchCategory = (currentCategory === 'todos') || (tool.category === currentCategory);

        // Filtro por audiencia objetivo
        const matchAudience = (currentAudience === 'todos') || 
                              (tool.audience === currentAudience) || 
                              (tool.audience === 'ambos');

        // Filtro por término de búsqueda (nombre, descripción, categoría)
        const textTarget = `${tool.name} ${tool.description} ${tool.categoryLabel} ${tool.features.join(' ')}`.toLowerCase();
        const matchSearch = (!searchQuery) || textTarget.includes(searchQuery);

        return matchCategory && matchAudience && matchSearch;
      });

      renderTools(filtered);
      syncFilterUI();
      updateURL();
    }

    // Sincronizar URL para permitir compartir enlaces directos con filtros activos
    function updateURL() {
      const params = new URLSearchParams();
      if (currentCategory !== 'todos') params.set('cat', currentCategory);
      if (currentAudience !== 'todos') params.set('aud', currentAudience);
      if (searchQuery) params.set('q', searchQuery);

      const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    function resetFilters() {
      currentCategory = 'todos';
      currentAudience = 'todos';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      filterTools();
    }

    // Listeners de eventos
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterTools();
      });
    }

    categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        currentCategory = chip.getAttribute('data-category-filter');
        filterTools();
      });
    });

    audienceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentAudience = btn.getAttribute('data-audience-filter');
        filterTools();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', resetFilters);
    }

    // Inicializar visualización
    filterTools();
  });
})();
