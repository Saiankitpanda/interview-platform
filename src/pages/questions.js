// ═══════════════════════════════════════════════════════════
// Questions Page — NeetCode 150 + LLD/HLD/HR with Solution Editor
// ═══════════════════════════════════════════════════════════

import { questions, getQuestionsByRound } from '../data/questions.js';
import { NC_TOPICS } from '../data/neetcode150.js';
import { parseQuestionDocument } from '../services/questionParser.js';
import { router } from '../router.js';
import { auth } from '../services/auth.js';

const ROUND_TABS = [
  { id: 'dsa', label: 'DSA (NeetCode 150)', icon: '⚡', color: 'indigo' },
  { id: 'lld', label: 'LLD', icon: '🏗️', color: 'emerald' },
  { id: 'hld', label: 'HLD', icon: '🏛️', color: 'amber' },
  { id: 'hr', label: 'HR', icon: '🤝', color: 'rose' }
];

const SOLUTIONS_KEY = 'user_solutions';
function getSolutions() { return JSON.parse(localStorage.getItem(SOLUTIONS_KEY) || '{}'); }
function saveSolutions(s) { localStorage.setItem(SOLUTIONS_KEY, JSON.stringify(s)); }

export function renderQuestionsPage(container) {
  let activeTab = 'dsa';
  let activeTopic = 'all';
  let expandedQ = null;
  let editingApproach = null; // { qid, approach: 'brute'|'better'|'optimal' }
  let customQuestions = JSON.parse(localStorage.getItem('customQuestions') || '[]');

  function render() {
    const roundQs = getQuestionsByRound(activeTab);
    const custom = customQuestions.filter(q => q.roundType === activeTab);
    const allQuestions = [...roundQs, ...custom];
    const solutions = getSolutions();

    // Topic grouping for DSA
    let topics = [];
    let filteredQs = allQuestions;
    if (activeTab === 'dsa') {
      topics = NC_TOPICS;
      if (activeTopic !== 'all') {
        filteredQs = allQuestions.filter(q => q.topic === activeTopic);
      }
    }

    // Stats
    const solvedCount = allQuestions.filter(q => solutions[q.id] && (solutions[q.id].brute || solutions[q.id].better || solutions[q.id].optimal)).length;
    const diffCounts = { easy: 0, medium: 0, hard: 0 };
    allQuestions.forEach(q => { if (q.difficulty) diffCounts[q.difficulty]++; });

    container.innerHTML = `
    <div class="page-container qb">
      <div class="qb-hero animate-fade-in-up">
        <div class="hero-badge badge badge-indigo">📚 Question Bank</div>
        <h1 class="hero-title">NeetCode <span class="hero-gradient-qb">150</span></h1>
        <p class="hero-subtitle">Master every pattern. Write Brute → Better → Optimal for each problem.</p>
        <div class="qb-stats-row">
          <span class="qb-stat">${filteredQs.length} questions</span>
          <span class="qb-stat-sep">·</span>
          <span class="qb-stat qb-solved">${solvedCount} solved</span>
          <span class="qb-stat-sep">·</span>
          <span class="qb-stat qb-easy">🟢 ${diffCounts.easy} Easy</span>
          <span class="qb-stat qb-medium">🟡 ${diffCounts.medium} Medium</span>
          <span class="qb-stat qb-hard">🔴 ${diffCounts.hard} Hard</span>
        </div>
      </div>

      <!-- Round tabs -->
      <div class="qb-tabs animate-fade-in-up">
        ${ROUND_TABS.map(t => `
          <button class="qb-tab ${t.id === activeTab ? 'active' : ''}" data-tab="${t.id}">
            ${t.icon} ${t.label}
            <span class="tab-count">${getQuestionsByRound(t.id).length}</span>
          </button>
        `).join('')}
      </div>

      ${activeTab === 'dsa' ? `
      <!-- Topic filter for NeetCode -->
      <div class="topic-filter animate-fade-in-up">
        <button class="topic-pill ${activeTopic === 'all' ? 'active' : ''}" data-topic="all">All Topics</button>
        ${topics.map(t => {
      const count = allQuestions.filter(q => q.topic === t).length;
      return `<button class="topic-pill ${activeTopic === t ? 'active' : ''}" data-topic="${t}">${t} <span class="tp-count">${count}</span></button>`;
    }).join('')}
      </div>
      ` : ''}

      <!-- Question list -->
      <div class="qb-list">
        ${activeTab === 'dsa' && activeTopic === 'all'
        ? topics.map(topic => {
          const topicQs = allQuestions.filter(q => q.topic === topic);
          if (topicQs.length === 0) return '';
          return `
              <div class="topic-group">
                <h3 class="topic-heading">${topic} <span class="topic-count">(${topicQs.length})</span></h3>
                ${topicQs.map(q => renderCard(q, solutions, expandedQ, editingApproach)).join('')}
              </div>`;
        }).join('')
        : filteredQs.map(q => renderCard(q, solutions, expandedQ, editingApproach)).join('')
      }
        ${filteredQs.length === 0 ? '<div class="empty-state"><span style="font-size:48px;opacity:0.3;">📭</span><p>No questions found.</p></div>' : ''}
      </div>

      <!-- Upload -->
      <div class="upload-section glass animate-fade-in-up">
        <h3 class="upload-title">📤 Upload Custom Questions</h3>
        <p class="upload-desc">Upload a markdown or text file with interview questions.</p>
        <div class="upload-area" id="upload-area">
          <input type="file" id="file-input" accept=".md,.txt,.text" style="display:none">
          <div class="upload-placeholder" id="upload-placeholder">
            <span style="font-size:32px;">📄</span>
            <p>Drop a file here or click to upload</p>
            <span class="upload-formats">.md, .txt</span>
          </div>
        </div>
      </div>
    </div>`;

    addQBStyles(container);
    bindEvents();
  }

  function renderCard(q, solutions, expandedQ, editingApproach) {
    const diffColor = q.difficulty === 'easy' ? 'emerald' : q.difficulty === 'hard' ? 'rose' : 'amber';
    const isExpanded = expandedQ === q.id;
    const sol = solutions[q.id] || {};
    const hasSol = sol.brute || sol.better || sol.optimal;
    const lcNum = q.leetcodeNum ? `#${q.leetcodeNum}` : '';

    return `
    <div class="qb-card glass ${isExpanded ? 'expanded' : ''} ${hasSol ? 'has-solution' : ''}">
      <div class="qb-card-header" data-expand="${q.id}">
        <div class="qb-card-left">
          ${lcNum ? `<span class="lc-num">${lcNum}</span>` : ''}
          <span class="qb-card-title">${q.title}</span>
        </div>
        <div class="qb-card-right">
          ${hasSol ? '<span class="sol-badge">✅</span>' : ''}
          <span class="badge badge-${diffColor}" style="font-size:10px;">${q.difficulty}</span>
          <span class="expand-arrow">${isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>

      ${isExpanded ? `
      <div class="qb-card-body animate-fade-in-up">
        <p class="qb-statement">${q.statement || ''}</p>
        <div class="qb-tags">
          ${(q.tags || []).map(t => `<span class="q-tag">${t}</span>`).join('')}
          ${q.topic ? `<span class="q-tag topic-tag">${q.topic}</span>` : ''}
          ${lcNum ? `<a href="https://leetcode.com/problems/${q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}" target="_blank" class="lc-link">🔗 LeetCode</a>` : ''}
        </div>

        <!-- Solution Editor: Brute / Better / Optimal -->
        <div class="sol-editor">
          <h4 class="sol-editor-title">📝 Your Solutions</h4>
          ${['brute', 'better', 'optimal'].map(approach => {
      const label = approach === 'brute' ? '🐢 Brute Force' : approach === 'better' ? '🚀 Better' : '💎 Optimal';
      const approachColor = approach === 'brute' ? 'rose' : approach === 'better' ? 'amber' : 'emerald';
      const isEditing = editingApproach && editingApproach.qid === q.id && editingApproach.approach === approach;
      const saved = sol[approach] || '';

      return `
            <div class="sol-approach ${saved ? 'filled' : ''}">
              <div class="sol-approach-header" style="border-left: 3px solid var(--accent-${approachColor});">
                <span class="sol-approach-label">${label}</span>
                ${saved && !isEditing ? '<span class="sol-saved-badge">saved</span>' : ''}
              </div>
              ${isEditing ? `
                <textarea class="sol-textarea" id="sol-edit-${q.id}-${approach}" rows="8" placeholder="Write your ${approach} approach code here...">${saved}</textarea>
                <div class="sol-actions">
                  <button class="btn btn-primary btn-sm sol-save" data-qid="${q.id}" data-approach="${approach}">💾 Save</button>
                  <button class="btn btn-ghost btn-sm sol-cancel" data-qid="${q.id}" data-approach="${approach}">Cancel</button>
                </div>
              ` : `
                ${saved ? `<pre class="sol-code">${escapeHtml(saved)}</pre>` : '<p class="sol-empty">Not written yet</p>'}
                <button class="btn btn-ghost btn-sm sol-edit-btn" data-qid="${q.id}" data-approach="${approach}">${saved ? '✏️ Edit' : '➕ Write'}</button>
              `}
            </div>`;
    }).join('')}
        </div>
      </div>` : ''}
    </div>`;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function bindEvents() {
    // Tab switching
    container.querySelectorAll('.qb-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;
        activeTopic = 'all';
        expandedQ = null;
        editingApproach = null;
        render();
      });
    });

    // Topic filter
    container.querySelectorAll('.topic-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        activeTopic = pill.dataset.topic;
        expandedQ = null;
        editingApproach = null;
        render();
      });
    });

    // Expand/collapse cards
    container.querySelectorAll('.qb-card-header').forEach(header => {
      header.addEventListener('click', () => {
        const qid = header.dataset.expand;
        expandedQ = expandedQ === qid ? null : qid;
        editingApproach = null;
        render();
      });
    });

    // Edit solution
    container.querySelectorAll('.sol-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        editingApproach = { qid: btn.dataset.qid, approach: btn.dataset.approach };
        render();
      });
    });

    // Save solution
    container.querySelectorAll('.sol-save').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = btn.dataset.qid;
        const approach = btn.dataset.approach;
        const textarea = container.querySelector(`#sol-edit-${qid}-${approach}`);
        if (textarea) {
          const solutions = getSolutions();
          if (!solutions[qid]) solutions[qid] = {};
          solutions[qid][approach] = textarea.value;
          saveSolutions(solutions);
        }
        editingApproach = null;
        render();
      });
    });

    // Cancel editing
    container.querySelectorAll('.sol-cancel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        editingApproach = null;
        render();
      });
    });

    // File upload
    const uploadArea = container.querySelector('#upload-area');
    const fileInput = container.querySelector('#file-input');
    if (uploadArea && fileInput) {
      uploadArea.addEventListener('click', () => fileInput.click());
      uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
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
  }

  render();
}

function handleFileUpload(file, container, customQuestions) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const parsed = parseQuestionDocument(text);
    if (parsed.length === 0) { alert('No questions could be parsed from this file.'); return; }
    customQuestions.push(...parsed);
    localStorage.setItem('customQuestions', JSON.stringify(customQuestions));
    const placeholder = container.querySelector('#upload-placeholder');
    placeholder.innerHTML = `<span style="font-size:32px;">✅</span><p>${parsed.length} question(s) imported!</p>`;
  };
  reader.readAsText(file);
}


// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════
function addQBStyles(container) {
  if (container.querySelector('#qb-styles')) return;
  const style = document.createElement('style');
  style.id = 'qb-styles';
  style.textContent = `
  .qb { max-width: 1000px; }
  .qb-hero { text-align: center; padding: var(--space-10) 0 var(--space-6); }
  .hero-gradient-qb {
    background: linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan), var(--accent-emerald));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .qb-stats-row { display: flex; gap: var(--space-3); justify-content: center; align-items: center; margin-top: var(--space-3); flex-wrap: wrap; }
  .qb-stat { font-size: 13px; color: var(--text-muted); }
  .qb-stat-sep { color: rgba(255,255,255,0.1); }
  .qb-solved { color: var(--accent-emerald); font-weight: 600; }
  .qb-easy { color: var(--accent-emerald); }
  .qb-medium { color: var(--accent-amber); }
  .qb-hard { color: var(--accent-rose); }

  /* Tabs */
  .qb-tabs { display: flex; gap: var(--space-2); margin-bottom: var(--space-4); flex-wrap: wrap; }
  .qb-tab {
    padding: var(--space-3) var(--space-5); border-radius: var(--radius-full);
    background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border);
    color: var(--text-secondary); font-weight: 600; font-size: var(--text-sm);
    cursor: pointer; transition: all var(--transition-fast); display: flex; align-items: center; gap: var(--space-2);
    font-family: var(--font-sans);
  }
  .qb-tab:hover { background: rgba(255,255,255,0.08); }
  .qb-tab.active { background: var(--accent-indigo); color: white; border-color: var(--accent-indigo); }
  .tab-count { background: rgba(255,255,255,0.15); padding: 1px 8px; border-radius: var(--radius-full); font-size: 11px; font-weight: 700; }

  /* Topic pills */
  .topic-filter {
    display: flex; gap: var(--space-2); margin-bottom: var(--space-6); flex-wrap: wrap;
    padding: var(--space-3); background: rgba(255,255,255,0.02); border-radius: var(--radius-lg);
  }
  .topic-pill {
    padding: 6px 14px; border-radius: var(--radius-full); font-size: 12px; font-weight: 600;
    background: rgba(255,255,255,0.04); border: 1px solid transparent;
    color: var(--text-muted); cursor: pointer; transition: all var(--transition-fast);
    display: flex; align-items: center; gap: 4px; font-family: var(--font-sans);
  }
  .topic-pill:hover { background: rgba(255,255,255,0.08); color: var(--text-primary); }
  .topic-pill.active { background: rgba(99,102,241,0.15); color: var(--accent-indigo); border-color: var(--accent-indigo); }
  .tp-count { font-size: 10px; opacity: 0.6; }

  /* Topic group */
  .topic-group { margin-bottom: var(--space-6); }
  .topic-heading { font-size: var(--text-sm); font-weight: 700; color: var(--text-secondary); margin-bottom: var(--space-3); padding-left: var(--space-2); }
  .topic-count { color: var(--text-muted); font-weight: 500; }

  /* Question cards */
  .qb-list { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-8); }
  .qb-card {
    border-radius: var(--radius-lg); transition: all var(--transition-fast);
    overflow: hidden;
  }
  .qb-card.has-solution { border-left: 3px solid var(--accent-emerald); }
  .qb-card-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: var(--space-3) var(--space-4); cursor: pointer;
    transition: background var(--transition-fast);
  }
  .qb-card-header:hover { background: rgba(255,255,255,0.03); }
  .qb-card-left { display: flex; align-items: center; gap: var(--space-3); min-width: 0; }
  .qb-card-right { display: flex; align-items: center; gap: var(--space-2); flex-shrink: 0; }
  .lc-num { font-size: 12px; color: var(--text-muted); font-weight: 700; min-width: 40px; }
  .qb-card-title { font-size: var(--text-sm); font-weight: 600; }
  .sol-badge { font-size: 12px; }
  .expand-arrow { font-size: 10px; color: var(--text-muted); }

  /* Card body */
  .qb-card-body { padding: 0 var(--space-4) var(--space-4); }
  .qb-statement { font-size: 13px; color: var(--text-secondary); line-height: 1.7; margin-bottom: var(--space-3); }
  .qb-tags { display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-4); }
  .q-tag { padding: 2px 8px; border-radius: var(--radius-full); background: var(--bg-surface); font-size: 11px; color: var(--text-muted); font-weight: 500; }
  .topic-tag { background: rgba(99,102,241,0.12); color: var(--accent-indigo); }
  .lc-link { font-size: 11px; color: var(--accent-cyan); text-decoration: none; font-weight: 600; }
  .lc-link:hover { text-decoration: underline; }

  /* Solution editor */
  .sol-editor { border-top: 1px solid var(--glass-border); padding-top: var(--space-4); }
  .sol-editor-title { font-size: 14px; font-weight: 700; margin-bottom: var(--space-3); }
  .sol-approach { margin-bottom: var(--space-3); padding: var(--space-3); border-radius: var(--radius-md); background: rgba(0,0,0,0.2); }
  .sol-approach.filled { background: rgba(0,0,0,0.3); }
  .sol-approach-header { display: flex; justify-content: space-between; align-items: center; padding-left: var(--space-3); margin-bottom: var(--space-2); }
  .sol-approach-label { font-size: 13px; font-weight: 700; }
  .sol-saved-badge { font-size: 10px; color: var(--accent-emerald); background: rgba(16,185,129,0.12); padding: 1px 8px; border-radius: var(--radius-full); }
  .sol-textarea {
    width: 100%; padding: var(--space-3); border-radius: var(--radius-md);
    background: rgba(0,0,0,0.4); border: 1px solid var(--glass-border);
    color: var(--text-primary); font-family: var(--font-mono); font-size: 13px;
    resize: vertical; outline: none; line-height: 1.6;
  }
  .sol-textarea:focus { border-color: var(--accent-indigo); }
  .sol-actions { display: flex; gap: var(--space-2); margin-top: var(--space-2); }
  .sol-code {
    background: rgba(0,0,0,0.4); border: 1px solid var(--glass-border);
    border-radius: var(--radius-md); padding: var(--space-3);
    font-family: var(--font-mono); font-size: 13px; line-height: 1.6;
    overflow-x: auto; color: var(--text-secondary); white-space: pre-wrap;
  }
  .sol-empty { font-size: 12px; color: var(--text-muted); font-style: italic; margin-bottom: var(--space-2); }
  .sol-edit-btn { font-size: 12px !important; }

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
  .empty-state { text-align: center; padding: var(--space-16) 0; }
  .empty-state p { color: var(--text-muted); margin-top: var(--space-3); }

  @media (max-width: 768px) {
    .topic-filter { gap: var(--space-1); }
    .topic-pill { font-size: 11px; padding: 4px 10px; }
  }
  `;
  container.appendChild(style);
}
