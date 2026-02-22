// ═══════════════════════════════════════════════════════════
// Sidebar Component
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';

export function renderSidebar(container, activePage = 'home') {
  container.innerHTML = `
    <div class="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">IO</div>
        <div class="sidebar-brand-text">Interview<span>OS</span></div>
      </div>

      <nav class="sidebar-nav">
        <div class="sidebar-section-label">Main</div>
        <button class="sidebar-nav-item ${activePage === 'home' ? 'active' : ''}" data-page="home">
          <span class="nav-icon">🏠</span>
          <span>Dashboard</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'questions' ? 'active' : ''}" data-page="questions">
          <span class="nav-icon">📚</span>
          <span>Question Bank</span>
        </button>

        <div class="sidebar-section-label">Resources</div>
        <button class="sidebar-nav-item ${activePage === 'resources' ? 'active' : ''}" data-page="resources">
          <span class="nav-icon">📚</span>
          <span>LLD Resources</span>
        </button>

        <div class="sidebar-section-label">Quick Start</div>
        <button class="sidebar-nav-item" data-quick="dsa">
          <span class="nav-icon">⚡</span>
          <span>DSA Round</span>
        </button>
        <button class="sidebar-nav-item" data-quick="lld">
          <span class="nav-icon">🏗️</span>
          <span>LLD Round</span>
        </button>
        <button class="sidebar-nav-item" data-quick="hld">
          <span class="nav-icon">🏛️</span>
          <span>HLD Round</span>
        </button>
        <button class="sidebar-nav-item" data-quick="hr">
          <span class="nav-icon">🤝</span>
          <span>HR Round</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-nav-item" style="cursor:default; opacity:0.5;">
          <span class="nav-icon">💡</span>
          <span style="font-size:11px;">v1.0 — Built with ♥</span>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  container.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      router.navigate(page === 'home' ? '/' : '/' + page);
    });
  });

  container.querySelectorAll('[data-quick]').forEach(btn => {
    btn.addEventListener('click', () => {
      router.navigate(`/interview?round=${btn.dataset.quick}&mode=coaching&difficulty=medium`);
    });
  });
}
