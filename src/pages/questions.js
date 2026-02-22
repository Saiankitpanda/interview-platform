// ═══════════════════════════════════════════════════════════
// Questions Page — Browse & Upload Questions
// ═══════════════════════════════════════════════════════════

import { questions, getQuestionsByRound } from '../data/questions.js';
import { parseQuestionDocument } from '../services/questionParser.js';
import { router } from '../router.js';

const ROUND_TABS = [
    { id: 'dsa', label: 'DSA', icon: '⚡', color: 'indigo' },
    { id: 'lld', label: 'LLD', icon: '🏗️', color: 'emerald' },
    { id: 'hld', label: 'HLD', icon: '🏛️', color: 'amber' },
    { id: 'hr', label: 'HR', icon: '🤝', color: 'rose' }
];

export function renderQuestionsPage(container) {
    let activeTab = 'dsa';
    let customQuestions = JSON.parse(localStorage.getItem('customQuestions') || '[]');

    container.innerHTML = `
    <div class="page-container">
      <div class="questions-header animate-fade-in-up">
        <h1 class="questions-title">📚 Question Bank</h1>
        <p class="questions-subtitle">Browse built-in questions or upload your own.</p>
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
    renderQuestionsList(container, activeTab, customQuestions);

    // Tab switching
    container.querySelectorAll('.q-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.q-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeTab = tab.dataset.tab;
            renderQuestionsList(container, activeTab, customQuestions);
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

function renderQuestionsList(container, tab, customQuestions) {
    const list = container.querySelector('#q-list');
    const builtIn = getQuestionsByRound(tab);
    const custom = customQuestions.filter(q => q.roundType === tab);
    const allQuestions = [...builtIn, ...custom];

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
        return `
      <div class="q-item glass animate-fade-in-up">
        <div class="q-item-header">
          <h3 class="q-item-title">${q.title}</h3>
          <span class="badge badge-${diffColor}">${q.difficulty}</span>
        </div>
        <p class="q-item-statement">${q.statement.slice(0, 150)}${q.statement.length > 150 ? '...' : ''}</p>
        <div class="q-item-footer">
          <div class="q-item-tags">
            ${(q.tags || []).slice(0, 4).map(t => `<span class="q-tag">${t}</span>`).join('')}
          </div>
          <button class="btn btn-primary btn-sm q-practice-btn" data-qid="${q.id}">Practice →</button>
        </div>
        ${q.source === 'uploaded' ? '<span class="q-custom-badge">Custom</span>' : ''}
        ${q.needsReview ? '<span class="q-review-badge">⚠ Needs Review</span>' : ''}
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
    const style = document.createElement('style');
    style.textContent = `
    .questions-header { margin-bottom: var(--space-8); }
    .questions-title { font-size: var(--text-3xl); font-weight: 800; letter-spacing: -0.03em; margin-bottom: var(--space-2); }
    .questions-subtitle { color: var(--text-secondary); font-size: var(--text-base); }
    .questions-tabs { display: flex; gap: var(--space-2); margin-bottom: var(--space-6); flex-wrap: wrap; }
    .q-tab {
      padding: var(--space-3) var(--space-5); border-radius: var(--radius-md);
      background: var(--bg-surface); border: 1px solid var(--glass-border);
      color: var(--text-secondary); cursor: pointer; font-size: var(--text-sm);
      font-weight: 500; transition: all var(--transition-fast);
      display: flex; align-items: center; gap: var(--space-2);
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
    .q-item-statement { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-4); }
    .q-item-footer { display: flex; justify-content: space-between; align-items: center; }
    .q-item-tags { display: flex; gap: var(--space-2); flex-wrap: wrap; }
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
