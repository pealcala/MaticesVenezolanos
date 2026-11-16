// Configuración compartida de rutas, logo, encabezado y menú lateral
const LOGO_PRIMARY = "https://raw.githubusercontent.com/pealcala/MaticesVenezolanos/main/assets/logo-matices.png?v=3";

function getBasePath() {
  // Detecta si la página actual está dentro de la subcarpeta /eventos/
  return window.location.pathname.includes("/eventos/") ? "../" : "";
}

function applyLogoFallback(imgElement) {
  const basePath = getBasePath();
  imgElement.src = LOGO_PRIMARY;
  imgElement.onerror = () => {
    if (!imgElement.dataset.triedLocal) {
      imgElement.dataset.triedLocal = "true";
      imgElement.src = `${basePath}assets/logo-matices.png?v=3`;
    }
  };
}

function initLayout(activePageId, taglineText = "Repertorio Musical") {
  const basePath = getBasePath();
  const isEventPage = activePageId.startsWith("evento-");

  // Renderizar Header
  const headerEl = document.getElementById("appHeader");
  if (headerEl) {
    headerEl.innerHTML = `
      <div class="header-left">
        <button class="menu-toggle-btn" id="toggleSidebarBtn" title="Alternar menú lateral">
          <i data-lucide="menu"></i>
        </button>
        <h1 class="header-title">Matices Venezolanos</h1>
      </div>
      <div class="header-tagline" id="headerTagline">${taglineText}</div>
    `;
  }

  // Renderizar Sidebar
  const sidebarEl = document.getElementById("sidebar");
  if (sidebarEl) {
    sidebarEl.innerHTML = `
      <a href="${basePath}index.html" class="sidebar-logo-container" title="Ir a Matices Venezolanos">
        <img id="sidebarLogo" alt="Logo Matices Venezolanos" class="sidebar-logo-img">
      </a>

      <nav class="sidebar-nav">
        <a href="${basePath}index.html" class="nav-btn ${activePageId === 'inicio' ? 'active' : ''}">
          <i data-lucide="sparkles"></i>
          <span class="nav-label">Matices Venezolanos</span>
        </a>
        <a href="${basePath}sobre-nosotros.html" class="nav-btn ${activePageId === 'sobre-nosotros' ? 'active' : ''}">
          <i data-lucide="compass"></i>
          <span class="nav-label">Sobre Nosotros</span>
        </a>
        <a href="${basePath}integrantes.html" class="nav-btn ${activePageId === 'integrantes' ? 'active' : ''}">
          <i data-lucide="users"></i>
          <span class="nav-label">Integrantes</span>
        </a>
        <a href="${basePath}repertorio.html" class="nav-btn ${activePageId === 'repertorio' ? 'active' : ''}">
          <i data-lucide="music-2"></i>
          <span class="nav-label">Repertorio</span>
        </a>

        <!-- SUBMENÚ EVENTOS -->
        <div class="nav-group ${isEventPage ? 'open' : 'open'}" id="eventosNavGroup">
          <button type="button" class="nav-btn" id="eventosParentBtn" onclick="toggleEventosMenu()">
            <i data-lucide="calendar-heart"></i>
            <span class="nav-label">Eventos</span>
            <i data-lucide="chevron-down" class="nav-chevron" style="width:18px;height:18px;"></i>
          </button>
          <div class="submenu-container" id="eventosSubmenu">
            <a href="${basePath}eventos/misa-aguinaldo-2026.html" class="submenu-btn ${activePageId === 'evento-misa-2026' ? 'active' : ''}">
              <i data-lucide="church" style="width:16px;height:16px;"></i>
              <span>Misa de Aguinaldo 2026</span>
            </a>
          </div>
        </div>
      </nav>
    `;
  }

  // Configurar todas las imágenes de logo presentes en la página
  ["sidebarLogo", "heroLogo", "aboutLogo"].forEach(id => {
    const img = document.getElementById(id);
    if (img) applyLogoFallback(img);
  });

  // Configurar botón hamburguesa del menú lateral
  const toggleBtn = document.getElementById("toggleSidebarBtn");
  if (toggleBtn && sidebarEl) {
    toggleBtn.addEventListener("click", () => {
      if (window.innerWidth <= 820) {
        sidebarEl.classList.toggle("mobile-open");
      } else {
        sidebarEl.classList.toggle("collapsed");
      }
    });
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function toggleEventosMenu() {
  const sidebar = document.getElementById("sidebar");
  const group = document.getElementById("eventosNavGroup");
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    group.classList.add("open");
  } else {
    group.classList.toggle("open");
  }
}

// Controles compartidos de Modal
let autoScrollInterval = null;
let currentFontSize = 1.12;

function closeLyricsModal() {
  stopAutoScroll();
  const modal = document.getElementById("lyricsModal");
  if (modal) modal.classList.remove("open");
}

function changeFontSize(delta) {
  currentFontSize = Math.max(0.85, Math.min(2.1, currentFontSize + (delta * 0.12)));
  const body = document.getElementById("modalLyricsText");
  if (body) body.style.fontSize = `${currentFontSize}rem`;
}

function toggleAutoScroll() {
  if (autoScrollInterval) {
    stopAutoScroll();
  } else {
    startAutoScroll();
  }
}

function startAutoScroll() {
  const container = document.getElementById("modalLyricsText");
  const btn = document.getElementById("autoScrollBtn");
  if (!container || !btn) return;

  btn.innerHTML = `<i data-lucide="pause-circle"></i> Pausar`;
  btn.style.background = "var(--vinotinto-accent)";
  btn.style.color = "#fff";
  if (window.lucide) lucide.createIcons();

  autoScrollInterval = setInterval(() => {
    container.scrollTop += 1;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      stopAutoScroll();
    }
  }, 50);
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
  const btn = document.getElementById("autoScrollBtn");
  if (btn) {
    btn.innerHTML = `<i data-lucide="arrow-down-circle"></i> Desplazamiento`;
    btn.style.background = "";
    btn.style.color = "";
    if (window.lucide) lucide.createIcons();
  }
}
