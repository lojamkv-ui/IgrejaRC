/**
 * Proteção de páginas + sidebar + permissões + mobile menu
 */
(function () {
  if (typeof IARCristo === 'undefined') return;
  if (!IARCristo.exigirAuth()) return;

  const sessao = IARCristo.getSessao();
  if (!sessao) return;

  function atualizarSidebar() {
    const nameEl = document.querySelector('.user-name');
    const roleEl = document.querySelector('.user-role');
    const avatarEl = document.querySelector('.user-avatar');
    if (nameEl) nameEl.textContent = sessao.nome;
    if (roleEl) roleEl.textContent = sessao.perfilNome || sessao.perfil;
    if (avatarEl) avatarEl.textContent = IARCristo.iniciaisNome(sessao.nome);
  }

  function adicionarLogout() {
    const footer = document.querySelector('.sidebar-footer');
    if (!footer || footer.querySelector('[data-logout]')) return;
    const btn = document.createElement('button');
    btn.setAttribute('data-logout', '1');
    btn.type = 'button';
    btn.className = 'btn btn-sm btn-secondary';
    btn.style.cssText = 'width:100%;margin-top:10px';
    btn.textContent = 'Sair do sistema';
    btn.setAttribute('aria-label', 'Sair do sistema');
    btn.onclick = function () {
      if (confirm('Deseja sair do sistema?')) {
        IARCristo.logout();
        location.href = 'login.html';
      }
    };
    footer.appendChild(btn);
  }

  function aplicarPermissoesMenu() {
    const mapa = {
      'membros.html': 'membros_ver',
      'membro.html': 'membros_ver',
      'visitantes.html': 'visitantes',
      'familias.html': 'familias',
      'departamentos.html': 'departamentos',
      'agenda.html': 'agenda',
      'relatorios.html': 'relatorios',
      'usuarios.html': 'usuarios'
    };
    document.querySelectorAll('.sidebar-nav a.nav-item').forEach(a => {
      const href = (a.getAttribute('href') || '').split('?')[0];
      const perm = mapa[href];
      if (perm && !IARCristo.pode(perm)) {
        a.style.display = 'none';
      }
    });
  }

  function garantirLinkUsuarios() {
    const nav = document.querySelector('.sidebar-nav');
    if (!nav || nav.querySelector('a[href="usuarios.html"]')) return;
    if (!IARCristo.pode('usuarios')) return;
    let sistema = null;
    nav.querySelectorAll('.nav-section').forEach(sec => {
      const title = sec.querySelector('.nav-section-title');
      if (title && title.textContent.includes('Sistema')) sistema = sec;
    });
    if (!sistema) {
      sistema = document.createElement('div');
      sistema.className = 'nav-section';
      sistema.innerHTML = '<div class="nav-section-title">Sistema</div>';
      nav.appendChild(sistema);
    }
    const a = document.createElement('a');
    a.href = 'usuarios.html';
    a.className = 'nav-item' + (location.pathname.endsWith('usuarios.html') ? ' active' : '');
    a.textContent = 'Usuários';
    sistema.appendChild(a);
  }

  function setupMobileMenu() {
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }
    const sidebar = document.getElementById('sidebar');
    const toggles = document.querySelectorAll('.menu-toggle');
    if (!sidebar) return;

    function setOpen(isOpen) {
      sidebar.classList.toggle('open', isOpen);
      backdrop.classList.toggle('open', isOpen);
      backdrop.setAttribute('aria-hidden', String(!isOpen));
      toggles.forEach(btn => btn.setAttribute('aria-expanded', String(isOpen)));
    }

    toggles.forEach(btn => {
      if (btn.dataset.menuBound) return;   // evita registrar o clique duas vezes
      btn.dataset.menuBound = '1';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setOpen(!sidebar.classList.contains('open'));
      });
    });

    backdrop.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') setOpen(false);
    });

    // fecha ao navegar no menu (mobile)
    sidebar.querySelectorAll('a.nav-item').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 1024) setOpen(false);
      });
    });

    // se voltar para desktop, limpa o estado aberto
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) setOpen(false);
    });
  }

  function init() {
    atualizarSidebar();
    adicionarLogout();
    garantirLinkUsuarios();
    aplicarPermissoesMenu();
    setupMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
