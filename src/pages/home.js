// ═══════════════════════════════════════════════════════════
// Home Page — Landing with round selection
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';
import { getQuestionsByRound } from '../data/questions.js';

const ROUNDS = [
    {
        id: 'dsa',
        title: 'DSA Coding',
        icon: '⚡',
        color: 'indigo',
        description: 'Data structures & algorithms. Solve coding problems under time pressure.',
        tags: ['Arrays', 'Trees', 'Graphs', 'DP']
    },
    {
        id: 'lld',
        title: 'Low-Level Design',
        icon: '🏗️',
        color: 'emerald',
        description: 'Object-oriented design. Build classes, interfaces, and patterns.',
        tags: ['OOP', 'SOLID', 'Patterns', 'UML']
    },
    {
        id: 'hld',
        title: 'System Design',
        icon: '🏛️',
        color: 'amber',
        description: 'Scalable architecture. Design distributed systems from scratch.',
        tags: ['Scale', 'DB', 'Cache', 'Queues']
    },
    {
        id: 'hr',
        title: 'Behavioral',
        icon: '🤝',
        color: 'rose',
        description: 'Leadership & collaboration. Answer with STAR framework.',
        tags: ['STAR', 'Leadership', 'Impact', 'Growth']
    }
];

export function renderHomePage(container) {
    let selectedRound = null;
    let selectedMode = 'coaching';
    let selectedDifficulty = 'medium';

    container.innerHTML = `
    <div class="page-container">
      <!-- Hero -->
      <div class="home-hero animate-fade-in-up">
        <div class="hero-badge badge badge-indigo">🎯 FAANG Interview Simulator</div>
        <h1 class="hero-title">Master Your <span class="hero-gradient">Interview Skills</span></h1>
        <p class="hero-subtitle">Practice DSA, System Design, Low-Level Design, and Behavioral rounds with an AI interviewer that adapts to your level.</p>
      </div>

      <!-- Round Cards -->
      <div class="round-cards" id="round-cards">
        ${ROUNDS.map(r => `
          <div class="round-card glass" data-round="${r.id}" data-color="${r.color}">
            <div class="round-card-icon">${r.icon}</div>
            <h3 class="round-card-title">${r.title}</h3>
            <p class="round-card-desc">${r.description}</p>
            <div class="round-card-tags">
              ${r.tags.map(t => `<span class="badge badge-${r.color}">${t}</span>`).join('')}
            </div>
            <div class="round-card-count">${getQuestionsByRound(r.id).length} questions</div>
          </div>
        `).join('')}
      </div>

      <!-- Config Panel -->
      <div class="config-panel glass animate-fade-in-up" id="config-panel" style="display:none;">
        <h3 class="config-title" id="config-title">Configure Interview</h3>

        <div class="config-row">
          <label class="config-label">Mode</label>
          <div class="toggle-group" id="mode-toggle">
            <button class="toggle-btn" data-mode="strict">
              <span>🔒</span> Strict
            </button>
            <button class="toggle-btn active" data-mode="coaching">
              <span>💡</span> Coaching
            </button>
          </div>
          <p class="config-hint" id="mode-hint">Progressive hints available. Great for practice.</p>
        </div>

        <div class="config-row">
          <label class="config-label">Difficulty</label>
          <div class="toggle-group" id="diff-toggle">
            <button class="toggle-btn" data-diff="easy">Easy</button>
            <button class="toggle-btn active" data-diff="medium">Medium</button>
            <button class="toggle-btn" data-diff="hard">Hard</button>
          </div>
        </div>

        <button class="btn btn-primary btn-lg start-btn" id="start-btn">
          Start Interview →
        </button>
      </div>
    </div>
  `;

    // Add home styles
    addHomeStyles(container);

    // Round card selection
    container.querySelectorAll('.round-card').forEach(card => {
        card.addEventListener('click', () => {
            container.querySelectorAll('.round-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedRound = card.dataset.round;

            const panel = container.querySelector('#config-panel');
            panel.style.display = 'block';
            panel.classList.add('animate-fade-in-up');

            const roundData = ROUNDS.find(r => r.id === selectedRound);
            container.querySelector('#config-title').textContent = `Configure ${roundData.title} Interview`;
        });
    });

    // Mode toggle
    container.querySelectorAll('#mode-toggle .toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('#mode-toggle .toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedMode = btn.dataset.mode;
            container.querySelector('#mode-hint').textContent =
                selectedMode === 'coaching'
                    ? 'Progressive hints available. Great for practice.'
                    : 'No solutions given. Challenging and realistic.';
        });
    });

    // Difficulty toggle
    container.querySelectorAll('#diff-toggle .toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('#diff-toggle .toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDifficulty = btn.dataset.diff;
        });
    });

    // Start
    container.querySelector('#start-btn').addEventListener('click', () => {
        if (!selectedRound) return;
        router.navigate(`/interview?round=${selectedRound}&mode=${selectedMode}&difficulty=${selectedDifficulty}`);
    });
}

function addHomeStyles(container) {
    const style = document.createElement('style');
    style.textContent = `
    .home-hero { text-align: center; padding: var(--space-16) 0 var(--space-10); }
    .hero-badge { margin-bottom: var(--space-5); }
    .hero-title {
      font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800;
      letter-spacing: -0.03em; line-height: 1.1; margin-bottom: var(--space-4);
    }
    .hero-gradient {
      background: linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan), var(--accent-emerald));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .hero-subtitle {
      font-size: var(--text-lg); color: var(--text-secondary);
      max-width: 600px; margin: 0 auto; line-height: 1.7;
    }
    .round-cards {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: var(--space-5); margin-bottom: var(--space-10);
    }
    .round-card {
      padding: var(--space-6); border-radius: var(--radius-xl); cursor: pointer;
      transition: all var(--transition-base); position: relative; overflow: hidden;
    }
    .round-card::before {
      content: ''; position: absolute; inset: 0; opacity: 0;
      transition: opacity var(--transition-base); border-radius: inherit;
    }
    .round-card[data-color="indigo"]::before { background: linear-gradient(135deg, rgba(99,102,241,0.08), transparent); }
    .round-card[data-color="emerald"]::before { background: linear-gradient(135deg, rgba(16,185,129,0.08), transparent); }
    .round-card[data-color="amber"]::before { background: linear-gradient(135deg, rgba(245,158,11,0.08), transparent); }
    .round-card[data-color="rose"]::before { background: linear-gradient(135deg, rgba(244,63,94,0.08), transparent); }
    .round-card:hover::before, .round-card.selected::before { opacity: 1; }
    .round-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); }
    .round-card.selected {
      border-color: var(--accent-indigo);
      box-shadow: 0 0 30px var(--accent-indigo-glow);
    }
    .round-card[data-color="emerald"].selected { border-color: var(--accent-emerald); box-shadow: 0 0 30px var(--accent-emerald-glow); }
    .round-card[data-color="amber"].selected { border-color: var(--accent-amber); box-shadow: 0 0 30px var(--accent-amber-glow); }
    .round-card[data-color="rose"].selected { border-color: var(--accent-rose); box-shadow: 0 0 30px var(--accent-rose-glow); }
    .round-card-icon { font-size: 32px; margin-bottom: var(--space-4); }
    .round-card-title { font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-2); }
    .round-card-desc { font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.6; }
    .round-card-tags { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-3); }
    .round-card-count { font-size: var(--text-xs); color: var(--text-muted); }

    .config-panel {
      max-width: 520px; margin: 0 auto; padding: var(--space-8);
      border-radius: var(--radius-xl); text-align: center;
    }
    .config-title { font-size: var(--text-xl); font-weight: 700; margin-bottom: var(--space-6); }
    .config-row { margin-bottom: var(--space-6); }
    .config-label {
      display: block; font-size: var(--text-sm); font-weight: 600;
      margin-bottom: var(--space-3); color: var(--text-secondary);
    }
    .config-hint {
      font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-2);
    }
    .toggle-group { display: inline-flex; gap: var(--space-2); }
    .toggle-btn {
      padding: var(--space-3) var(--space-5); border-radius: var(--radius-md);
      background: var(--bg-surface); border: 1px solid var(--glass-border);
      color: var(--text-secondary); font-size: var(--text-sm); font-weight: 500;
      cursor: pointer; transition: all var(--transition-fast);
    }
    .toggle-btn:hover { border-color: rgba(255,255,255,0.15); color: var(--text-primary); }
    .toggle-btn.active {
      background: rgba(99,102,241,0.15); border-color: var(--accent-indigo);
      color: var(--accent-indigo); font-weight: 600;
    }
    .start-btn { margin-top: var(--space-4); width: 100%; justify-content: center; }
  `;
    container.appendChild(style);
}
