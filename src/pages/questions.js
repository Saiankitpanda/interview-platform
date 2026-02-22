// ═══════════════════════════════════════════════════════════
// Questions Page — Browse, Upload & View Solutions (Admin-only)
// ═══════════════════════════════════════════════════════════

import { questions, getQuestionsByRound } from '../data/questions.js';
import { parseQuestionDocument } from '../services/questionParser.js';
import { router } from '../router.js';
import { auth } from '../services/auth.js';

const ROUND_TABS = [
  { id: 'dsa', label: 'DSA', icon: '⚡', color: 'indigo' },
  { id: 'lld', label: 'LLD', icon: '🏗️', color: 'emerald' },
  { id: 'hld', label: 'HLD', icon: '🏛️', color: 'amber' },
  { id: 'hr', label: 'HR', icon: '🤝', color: 'rose' }
];

export function renderQuestionsPage(container) {
  let activeTab = 'dsa';
  let expandedSolution = null;
  let customQuestions = JSON.parse(localStorage.getItem('customQuestions') || '[]');

  container.innerHTML = `
    <div class="page-container">
      <div class="questions-header animate-fade-in-up">
        <h1 class="questions-title">📚 Question Bank</h1>
        <p class="questions-subtitle">Browse built-in questions or upload your own.${auth.isAdmin() ? ' <span class="admin-badge-inline">🔓 Solutions visible</span>' : ' <span class="locked-badge-inline">🔒 Unlock to see solutions</span>'}</p>
      </div>

      <div class="questions-tabs" id="q-tabs">
        ${ROUND_TABS.map(t => `
          <button class="q-tab ${t.id === activeTab ? 'active' : ''}" data-tab="${t.id}" data-color="${t.color}">
            ${t.icon} ${t.label}
            <span class="q-tab-count">${getQuestionsByRound(t.id).length}</span>
          </button>
        `).join('')}
      </div>

      <div class="questions-list" id="q-list"></div>

      <div class="upload-section glass animate-fade-in-up">
        <h3 class="upload-title">📤 Upload Custom Questions</h3>
        <p class="upload-desc">Upload a markdown or text file with interview questions. They'll be parsed and added to your bank.</p>
        <div class="upload-area" id="upload-area">
          <input type="file" id="file-input" accept=".md,.txt,.text" style="display:none">
          <div class="upload-placeholder" id="upload-placeholder">
            <span style="font-size:32px;">📄</span>
            <p>Drop a file here or click to upload</p>
            <span class="upload-formats">.md, .txt</span>
          </div>
        </div>
        ${customQuestions.length > 0 ? `<p class="upload-count">${customQuestions.length} custom question(s) loaded</p>` : ''}
      </div>
    </div>
  `;

  addQuestionsStyles(container);
  renderQuestionsList(container, activeTab, customQuestions, expandedSolution, (id) => {
    expandedSolution = expandedSolution === id ? null : id;
    renderQuestionsList(container, activeTab, customQuestions, expandedSolution, arguments.callee);
  });

  // Tab switching
  container.querySelectorAll('.q-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.q-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      expandedSolution = null;
      renderQuestionsList(container, activeTab, customQuestions, expandedSolution, (id) => {
        expandedSolution = expandedSolution === id ? null : id;
        renderQuestionsList(container, activeTab, customQuestions, expandedSolution, arguments.callee);
      });
    });
  });

  // File upload
  const uploadArea = container.querySelector('#upload-area');
  const fileInput = container.querySelector('#file-input');

  uploadArea.addEventListener('click', () => fileInput.click());
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file, container, customQuestions);
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) handleFileUpload(file, container, customQuestions);
  });
}

function renderQuestionsList(container, tab, customQuestions, expandedSolution, onToggle) {
  const list = container.querySelector('#q-list');
  const builtIn = getQuestionsByRound(tab);
  const custom = customQuestions.filter(q => q.roundType === tab);
  const allQuestions = [...builtIn, ...custom];
  const isAdmin = auth.isAdmin();

  if (allQuestions.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <span style="font-size:48px; opacity:0.3;">📭</span>
        <p>No questions in this category yet.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = allQuestions.map(q => {
    const diffColor = q.difficulty === 'easy' ? 'emerald' : q.difficulty === 'hard' ? 'rose' : 'amber';
    const hasSolution = !!q.solution;
    const isExpanded = expandedSolution === q.id;

    return `
      <div class="q-item glass animate-fade-in-up">
        <div class="q-item-header">
          <h3 class="q-item-title">${q.title}</h3>
          <div class="q-item-badges">
            ${hasSolution ? `<span class="badge badge-emerald" style="font-size:10px;">${isAdmin ? '✅ Solution' : '🔒 Locked'}</span>` : ''}
            <span class="badge badge-${diffColor}">${q.difficulty}</span>
          </div>
        </div>
        <p class="q-item-statement">${q.statement.slice(0, 150)}${q.statement.length > 150 ? '...' : ''}</p>
        <div class="q-item-footer">
          <div class="q-item-tags">
            ${(q.tags || []).slice(0, 4).map(t => `<span class="q-tag">${t}</span>`).join('')}
          </div>
          <div class="q-item-actions">
            ${hasSolution ? `<button class="btn btn-ghost btn-sm q-solution-btn" data-qid="${q.id}">
              ${isAdmin ? (isExpanded ? '▲ Hide Solution' : '▼ View Solution') : '🔐 Unlock'}
            </button>` : ''}
            <button class="btn btn-primary btn-sm q-practice-btn" data-qid="${q.id}">Practice →</button>
          </div>
        </div>
        ${q.source === 'uploaded' ? '<span class="q-custom-badge">Custom</span>' : ''}
        ${q.needsReview ? '<span class="q-review-badge">⚠ Needs Review</span>' : ''}
        ${isExpanded && isAdmin && hasSolution ? renderSolution(q.solution) : ''}
        ${isExpanded && !isAdmin && hasSolution ? '<div class="solution-locked animate-fade-in-up"><span style="font-size:24px;">🔐</span><p>Unlock admin mode to view solutions</p></div>' : ''}
      </div>
    `;
  }).join('');

  // Practice button
  list.querySelectorAll('.q-practice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const roundType = tab;
      router.navigate(`/interview?round=${roundType}&mode=coaching&difficulty=medium`);
    });
  });

  // Solution toggle
  list.querySelectorAll('.q-solution-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      onToggle(btn.dataset.qid);
    });
  });
}

function renderSolution(solution) {
  return `
    <div class="solution-panel animate-fade-in-up">
      <div class="solution-section">
        <h4>💡 Approach</h4>
        <p>${solution.approach.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
      </div>
      <div class="solution-section">
        <h4>💻 Code</h4>
        <pre><code>${solution.code}</code></pre>
      </div>
      <div class="solution-complexity">
        <div class="complexity-item">
          <span class="complexity-label">⏱ Time</span>
          <span class="complexity-value">${solution.timeComplexity}</span>
        </div>
        <div class="complexity-item">
          <span class="complexity-label">💾 Space</span>
          <span class="complexity-value">${solution.spaceComplexity}</span>
        </div>
      </div>
    </div>
  `;
}

function handleFileUpload(file, container, customQuestions) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const parsed = parseQuestionDocument(text);

    if (parsed.length === 0) {
      alert('No questions could be parsed from this file. Check the format.');
      return;
    }

    customQuestions.push(...parsed);
    localStorage.setItem('customQuestions', JSON.stringify(customQuestions));

    const placeholder = container.querySelector('#upload-placeholder');
    placeholder.innerHTML = `<span style="font-size:32px;">✅</span><p>${parsed.length} question(s) imported successfully!</p>`;
  };
  reader.readAsText(file);
}

function addQuestionsStyles(container) {
  if (container.querySelector('#q-styles')) return;
  const style = document.createElement('style');
  style.id = 'q-styles';
  style.textContent = `
    .questions-header { margin-bottom: var(--space-8); }
    .questions-title { font-size: var(--text-3xl); font-weight: 800; letter-spacing: -0.03em; margin-bottom: var(--space-2); }
    .questions-subtitle { color: var(--text-secondary); font-size: var(--text-base); }
    .admin-badge-inline { color: var(--accent-emerald); font-weight: 600; }
    .locked-badge-inline { color: var(--text-muted); font-weight: 500; }
    .questions-tabs { display: flex; gap: var(--space-2); margin-bottom: var(--space-6); flex-wrap: wrap; }
    .q-tab {
      padding: var(--space-3) var(--space-5); border-radius: var(--radius-md);
      background: var(--bg-surface); border: 1px solid var(--glass-border);
      color: var(--text-secondary); cursor: pointer; font-size: var(--text-sm);
      font-weight: 500; transition: all var(--transition-fast);
      display: flex; align-items: center; gap: var(--space-2); font-family: var(--font-sans);
    }
    .q-tab:hover { background: var(--bg-surface-hover); color: var(--text-primary); }
    .q-tab.active { background: rgba(99,102,241,0.15); border-color: var(--accent-indigo); color: var(--accent-indigo); }
    .q-tab-count {
      background: rgba(255,255,255,0.1); padding: 1px 8px; border-radius: 99px;
      font-size: 11px; font-weight: 600;
    }
    .questions-list { display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-10); }
    .q-item {
      padding: var(--space-5) var(--space-6); border-radius: var(--radius-lg);
      transition: all var(--transition-fast); position: relative;
    }
    .q-item:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
    .q-item-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3); }
    .q-item-title { font-size: var(--text-base); font-weight: 700; }
    .q-item-badges { display: flex; gap: var(--space-2); align-items: center; }
    .q-item-statement { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-4); }
    .q-item-footer { display: flex; justify-content: space-between; align-items: center; }
    .q-item-tags { display: flex; gap: var(--space-2); flex-wrap: wrap; }
    .q-item-actions { display: flex; gap: var(--space-2); align-items: center; }
    .q-tag {
      padding: 2px 8px; border-radius: var(--radius-full); background: var(--bg-surface);
      font-size: 11px; color: var(--text-muted); font-weight: 500;
    }
    .q-custom-badge {
      position: absolute; top: var(--space-3); right: var(--space-3);
      font-size: 10px; font-weight: 700; color: var(--accent-cyan);
      background: rgba(6,182,212,0.12); padding: 2px 8px; border-radius: var(--radius-full);
    }
    .q-review-badge {
      position: absolute; top: var(--space-3); right: 80px;
      font-size: 10px; font-weight: 700; color: var(--accent-amber);
    }

    /* Solution Panel */
    .solution-panel {
      margin-top: var(--space-5); padding-top: var(--space-5);
      border-top: 1px solid var(--glass-border);
    }
    .solution-section { margin-bottom: var(--space-5); }
    .solution-section h4 { font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-2); color: var(--accent-emerald); }
    .solution-section p { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.7; }
    .solution-section strong { color: var(--text-primary); }
    .solution-section pre {
      background: rgba(0,0,0,0.5); border: 1px solid var(--glass-border);
      border-radius: var(--radius-md); padding: var(--space-4);
      overflow-x: auto; font-size: 13px; line-height: 1.6;
    }
    .solution-complexity {
      display: flex; gap: var(--space-5); padding: var(--space-4);
      background: var(--bg-surface); border-radius: var(--radius-md);
    }
    .complexity-item { display: flex; gap: var(--space-2); align-items: center; }
    .complexity-label { font-size: var(--text-xs); color: var(--text-muted); font-weight: 600; }
    .complexity-value { font-size: var(--text-xs); color: var(--text-secondary); }
    .solution-locked {
      margin-top: var(--space-5); padding: var(--space-6);
      text-align: center; border-top: 1px solid var(--glass-border);
    }
    .solution-locked p { color: var(--text-muted); font-size: var(--text-sm); margin-top: var(--space-2); }

    .upload-section { padding: var(--space-8); border-radius: var(--radius-xl); text-align: center; max-width: 600px; margin: 0 auto; }
    .upload-title { font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-2); }
    .upload-desc { font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-5); }
    .upload-area {
      border: 2px dashed var(--glass-border); border-radius: var(--radius-lg); padding: var(--space-10);
      cursor: pointer; transition: all var(--transition-fast);
    }
    .upload-area:hover, .upload-area.dragover { border-color: var(--accent-indigo); background: rgba(99,102,241,0.05); }
    .upload-placeholder p { margin-top: var(--space-3); color: var(--text-secondary); font-size: var(--text-sm); }
    .upload-formats { font-size: var(--text-xs); color: var(--text-muted); }
    .upload-count { margin-top: var(--space-4); font-size: var(--text-sm); color: var(--accent-emerald); }
    .empty-state { text-align: center; padding: var(--space-16) 0; }
    .empty-state p { color: var(--text-muted); margin-top: var(--space-3); }
  `;
  container.appendChild(style);
}
