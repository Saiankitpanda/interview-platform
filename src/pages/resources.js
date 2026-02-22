// ═══════════════════════════════════════════════════════════
// Resources Page — LLD Books, GitHub Repos & Topics
// ═══════════════════════════════════════════════════════════

import { LLD_BOOKS, LLD_GITHUB_REPOS, LLD_TOPICS } from '../data/resources.js';

export function renderResourcesPage(container) {
    let activeTab = 'books';

    function render() {
        container.innerHTML = `
        <div class="page-container resources-page">
          <!-- Hero Section -->
          <div class="res-hero animate-fade-in-up">
            <div class="hero-badge badge badge-emerald">📚 LLD Resource Hub</div>
            <h1 class="hero-title">
              Low-Level Design <span class="hero-gradient-green">Resources</span>
            </h1>
            <p class="hero-subtitle">
              Curated books, GitHub repositories, and key topics to ace your LLD interviews at FAANG companies.
            </p>
          </div>

          <!-- Key Topics Strip -->
          <div class="topics-strip animate-fade-in-up">
            ${LLD_TOPICS.map(t => `
              <div class="topic-chip glass">
                <span class="topic-icon">${t.icon}</span>
                <div class="topic-info">
                  <span class="topic-name">${t.name}</span>
                  <span class="topic-desc">${t.description}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Tab Navigation -->
          <div class="res-tabs animate-fade-in-up">
            <button class="res-tab ${activeTab === 'books' ? 'active' : ''}" data-tab="books">
              <span>📖</span> Books <span class="tab-count">${LLD_BOOKS.length}</span>
            </button>
            <button class="res-tab ${activeTab === 'repos' ? 'active' : ''}" data-tab="repos">
              <span>🐙</span> GitHub Repos <span class="tab-count">${LLD_GITHUB_REPOS.length}</span>
            </button>
          </div>

          <!-- Content Area -->
          <div class="res-content" id="res-content">
            ${activeTab === 'books' ? renderBooksGrid() : renderReposGrid()}
          </div>
        </div>
        `;

        addResourceStyles(container);
        bindEvents();
    }

    function renderBooksGrid() {
        return `
        <div class="book-grid">
          ${LLD_BOOKS.map((book, i) => `
            <div class="book-card glass animate-fade-in-up" style="animation-delay: ${i * 60}ms" data-color="${book.color}">
              <div class="book-card-header">
                <div class="book-cover">${book.cover}</div>
                <div class="book-meta">
                  <span class="badge badge-${book.color}">${book.difficulty}</span>
                  <div class="book-rating">
                    <span class="star-icon">★</span> ${book.rating}
                  </div>
                </div>
              </div>
              <h3 class="book-title">${book.title}</h3>
              <p class="book-author">by ${book.author}</p>
              <p class="book-desc">${book.description}</p>
              <div class="book-topics">
                ${book.topics.map(t => `<span class="mini-tag">${t}</span>`).join('')}
              </div>
              <a href="${book.link}" target="_blank" rel="noopener" class="book-link btn btn-secondary btn-sm">
                View Book →
              </a>
            </div>
          `).join('')}
        </div>
        `;
    }

    function renderReposGrid() {
        return `
        <div class="repo-grid">
          ${LLD_GITHUB_REPOS.map((repo, i) => `
            <div class="repo-card glass animate-fade-in-up" style="animation-delay: ${i * 60}ms" data-color="${repo.color}">
              <div class="repo-header">
                <div class="repo-icon-wrap">
                  <svg class="github-icon" viewBox="0 0 16 16" width="24" height="24">
                    <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </div>
                <div class="repo-stars">
                  <span class="star-icon">★</span> ${repo.stars}
                </div>
              </div>
              <h3 class="repo-name">${repo.name}</h3>
              <p class="repo-desc">${repo.description}</p>
              <div class="repo-topics">
                ${repo.topics.map(t => `<span class="badge badge-${repo.color}">${t}</span>`).join('')}
              </div>
              <a href="${repo.link}" target="_blank" rel="noopener" class="repo-link btn btn-secondary btn-sm">
                <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M3.75 2h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-3.5a.75.75 0 011.5 0v3.5A1.75 1.75 0 0112.25 14h-8.5A1.75 1.75 0 012 12.25v-8.5C2 2.784 2.784 2 3.75 2zm6.854-1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1z"/></svg>
                Open on GitHub
              </a>
            </div>
          `).join('')}
        </div>
        `;
    }

    function bindEvents() {
        container.querySelectorAll('.res-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                activeTab = tab.dataset.tab;
                render();
            });
        });
    }

    render();
}


function addResourceStyles(container) {
    if (container.querySelector('#resource-styles')) return;
    const style = document.createElement('style');
    style.id = 'resource-styles';
    style.textContent = `
    /* ── Hero ──────────────────────────────────────────────── */
    .res-hero { text-align: center; padding: var(--space-12) 0 var(--space-8); }
    .hero-gradient-green {
      background: linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan), #a78bfa);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    /* ── Topics Strip ─────────────────────────────────────── */
    .topics-strip {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: var(--space-3); margin-bottom: var(--space-8);
    }
    .topic-chip {
      display: flex; align-items: center; gap: var(--space-3);
      padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg);
      transition: all var(--transition-base);
    }
    .topic-chip:hover {
      transform: translateY(-2px);
      border-color: rgba(255,255,255,0.15);
      background: var(--bg-surface-hover);
    }
    .topic-icon { font-size: 24px; flex-shrink: 0; }
    .topic-info { display: flex; flex-direction: column; gap: 2px; }
    .topic-name { font-size: var(--text-sm); font-weight: 700; color: var(--text-primary); }
    .topic-desc { font-size: 11px; color: var(--text-muted); line-height: 1.4; }

    /* ── Tabs ─────────────────────────────────────────────── */
    .res-tabs {
      display: flex; gap: var(--space-2); margin-bottom: var(--space-6);
      border-bottom: 1px solid var(--glass-border); padding-bottom: var(--space-2);
    }
    .res-tab {
      display: inline-flex; align-items: center; gap: var(--space-2);
      padding: var(--space-3) var(--space-5); border-radius: var(--radius-md) var(--radius-md) 0 0;
      background: transparent; border: none; color: var(--text-muted);
      font-size: var(--text-sm); font-weight: 600; cursor: pointer;
      transition: all var(--transition-fast); font-family: var(--font-sans);
    }
    .res-tab:hover { color: var(--text-primary); background: var(--bg-surface); }
    .res-tab.active {
      color: var(--accent-emerald); background: rgba(16,185,129,0.08);
      border-bottom: 2px solid var(--accent-emerald); margin-bottom: -3px;
    }
    .tab-count {
      background: rgba(255,255,255,0.08); padding: 1px 8px;
      border-radius: var(--radius-full); font-size: 11px;
    }
    .res-tab.active .tab-count {
      background: rgba(16,185,129,0.15); color: var(--accent-emerald);
    }

    /* ── Book Cards ───────────────────────────────────────── */
    .book-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-5);
    }
    .book-card {
      padding: var(--space-6); border-radius: var(--radius-xl);
      transition: all var(--transition-base); position: relative; overflow: hidden;
      display: flex; flex-direction: column;
    }
    .book-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
      opacity: 0; transition: opacity var(--transition-base);
    }
    .book-card[data-color="emerald"]::before { background: linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan)); }
    .book-card[data-color="rose"]::before { background: linear-gradient(90deg, var(--accent-rose), #fb7185); }
    .book-card[data-color="indigo"]::before { background: linear-gradient(90deg, var(--accent-indigo), #818cf8); }
    .book-card[data-color="amber"]::before { background: linear-gradient(90deg, var(--accent-amber), #fbbf24); }
    .book-card[data-color="cyan"]::before { background: linear-gradient(90deg, var(--accent-cyan), #22d3ee); }
    .book-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); }
    .book-card:hover::before { opacity: 1; }

    .book-card-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: var(--space-4);
    }
    .book-cover { font-size: 40px; }
    .book-meta { display: flex; flex-direction: column; align-items: flex-end; gap: var(--space-2); }
    .book-rating { font-size: var(--text-sm); color: #fbbf24; font-weight: 700; }
    .star-icon { color: #fbbf24; }
    .book-title { font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-1); line-height: 1.3; }
    .book-author { font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-3); }
    .book-desc {
      font-size: var(--text-sm); color: var(--text-secondary);
      line-height: 1.6; margin-bottom: var(--space-4); flex: 1;
    }
    .book-topics {
      display: flex; flex-wrap: wrap; gap: var(--space-1);
      margin-bottom: var(--space-4);
    }
    .mini-tag {
      font-size: 10px; font-weight: 600; padding: 2px 8px;
      background: rgba(255,255,255,0.06); border-radius: var(--radius-full);
      color: var(--text-muted); letter-spacing: 0.02em;
    }
    .book-link { width: 100%; justify-content: center; text-decoration: none; }

    /* ── Repo Cards ───────────────────────────────────────── */
    .repo-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--space-5);
    }
    .repo-card {
      padding: var(--space-6); border-radius: var(--radius-xl);
      transition: all var(--transition-base); display: flex; flex-direction: column;
      position: relative; overflow: hidden;
    }
    .repo-card::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
      opacity: 0; transition: opacity var(--transition-base);
    }
    .repo-card[data-color="emerald"]::after { background: linear-gradient(90deg, var(--accent-emerald), transparent); }
    .repo-card[data-color="indigo"]::after { background: linear-gradient(90deg, var(--accent-indigo), transparent); }
    .repo-card[data-color="amber"]::after { background: linear-gradient(90deg, var(--accent-amber), transparent); }
    .repo-card[data-color="rose"]::after { background: linear-gradient(90deg, var(--accent-rose), transparent); }
    .repo-card[data-color="cyan"]::after { background: linear-gradient(90deg, var(--accent-cyan), transparent); }
    .repo-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); }
    .repo-card:hover::after { opacity: 1; }

    .repo-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-4);
    }
    .repo-icon-wrap {
      width: 40px; height: 40px; border-radius: var(--radius-md);
      background: rgba(255,255,255,0.08); display: flex; align-items: center;
      justify-content: center; color: var(--text-primary);
    }
    .repo-stars {
      font-size: var(--text-sm); font-weight: 700; color: #fbbf24;
      display: flex; align-items: center; gap: var(--space-1);
    }
    .repo-name {
      font-size: var(--text-sm); font-weight: 700; color: var(--accent-cyan);
      margin-bottom: var(--space-2); font-family: var(--font-mono); word-break: break-all;
    }
    .repo-desc {
      font-size: var(--text-sm); color: var(--text-secondary);
      line-height: 1.6; margin-bottom: var(--space-4); flex: 1;
    }
    .repo-topics {
      display: flex; flex-wrap: wrap; gap: var(--space-2);
      margin-bottom: var(--space-4);
    }
    .repo-link {
      width: 100%; justify-content: center; gap: var(--space-2);
      text-decoration: none;
    }

    /* ── Responsive ───────────────────────────────────────── */
    @media (max-width: 768px) {
      .topics-strip { grid-template-columns: 1fr 1fr; }
      .book-grid, .repo-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 480px) {
      .topics-strip { grid-template-columns: 1fr; }
    }
    `;
    container.appendChild(style);
}
