// ═══════════════════════════════════════════════════════════
// Practice Lab — Create questions, add test cases, write code
// ═══════════════════════════════════════════════════════════

const STORAGE_KEY = 'practice_lab_questions';

function getCustomQuestions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveCustomQuestions(questions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

export function renderPracticeLabPage(container) {
  let customQuestions = getCustomQuestions();
  let activeView = 'list'; // 'list' | 'create' | 'solve'
  let editingIdx = null;
  let solvingIdx = null;

  function render() {
    container.innerHTML = `
        <div class="page-container practice-lab">
          <!-- Hero -->
          <div class="lab-hero animate-fade-in-up">
            <div class="hero-badge badge badge-rose">🧪 Practice Lab</div>
            <h1 class="hero-title">
              My <span class="hero-gradient-lab">Practice Lab</span>
            </h1>
            <p class="hero-subtitle">
              Create your own questions, add test cases, write & test solutions — all in one place.
            </p>
          </div>

          <!-- Action Bar -->
          <div class="lab-actions animate-fade-in-up">
            <button class="btn btn-primary" id="btn-create-new">
              <span>➕</span> Create New Question
            </button>
            <div class="lab-stats">
              <span class="stat-chip glass"><strong>${customQuestions.length}</strong> questions</span>
              <span class="stat-chip glass"><strong>${customQuestions.filter(q => q.solution).length}</strong> solved</span>
            </div>
          </div>

          <!-- Content -->
          <div id="lab-content" class="animate-fade-in-up">
            ${activeView === 'list' ? renderQuestionList() : ''}
            ${activeView === 'create' ? renderCreateForm() : ''}
            ${activeView === 'solve' ? renderSolveView() : ''}
          </div>
        </div>
        `;

    addLabStyles(container);
    bindLabEvents();
  }

  // ─── Question List ─────────────────────────────────────
  function renderQuestionList() {
    if (customQuestions.length === 0) {
      return `
            <div class="lab-empty glass">
              <span style="font-size:64px;">🧪</span>
              <h3>Your lab is empty!</h3>
              <p>Create your first question to start practicing. Add problem statements, test cases, and code your solutions right here.</p>
              <button class="btn btn-primary" id="btn-empty-create">➕ Create First Question</button>
            </div>`;
    }

    return `
        <div class="lab-grid">
          ${customQuestions.map((q, i) => `
            <div class="lab-card glass animate-fade-in-up" style="animation-delay: ${i * 50}ms">
              <div class="lab-card-header">
                <span class="badge badge-${q.difficulty === 'easy' ? 'emerald' : q.difficulty === 'medium' ? 'amber' : 'rose'}">${q.difficulty}</span>
                <span class="badge badge-${q.round === 'dsa' ? 'indigo' : q.round === 'lld' ? 'cyan' : q.round === 'hld' ? 'amber' : 'rose'}">${q.round.toUpperCase()}</span>
                ${q.solution ? '<span class="badge badge-emerald">✅ Solved</span>' : '<span class="badge" style="background:rgba(255,255,255,0.06);color:var(--text-muted);">⏳ Unsolved</span>'}
              </div>
              <h3 class="lab-card-title">${q.title}</h3>
              <p class="lab-card-desc">${q.statement.substring(0, 120)}${q.statement.length > 120 ? '...' : ''}</p>
              <div class="lab-card-meta">
                <span>${q.testCases?.length || 0} test cases</span>
                ${q.tags?.length ? `<span>${q.tags.join(', ')}</span>` : ''}
              </div>
              <div class="lab-card-actions">
                <button class="btn btn-primary btn-sm lab-solve" data-idx="${i}">💻 ${q.solution ? 'Edit Solution' : 'Solve'}</button>
                <button class="btn btn-ghost btn-sm lab-edit" data-idx="${i}">✏️ Edit</button>
                <button class="btn btn-ghost btn-sm lab-delete" data-idx="${i}">🗑️</button>
              </div>
            </div>
          `).join('')}
        </div>`;
  }

  // ─── Create/Edit Form ──────────────────────────────────
  function renderCreateForm() {
    const q = editingIdx !== null ? customQuestions[editingIdx] : {};
    return `
        <div class="lab-form glass">
          <div class="lab-form-header">
            <h2>${editingIdx !== null ? '✏️ Edit Question' : '➕ Create New Question'}</h2>
            <button class="btn btn-ghost btn-sm" id="btn-back-list">← Back to List</button>
          </div>

          <div class="form-grid">
            <div class="form-group full-width">
              <label>Question Title *</label>
              <input type="text" id="q-title" class="lab-input" value="${q.title || ''}" placeholder="e.g., Reverse a Linked List" />
            </div>

            <div class="form-group">
              <label>Round</label>
              <select id="q-round" class="lab-input">
                <option value="dsa" ${q.round === 'dsa' ? 'selected' : ''}>DSA</option>
                <option value="lld" ${q.round === 'lld' ? 'selected' : ''}>LLD</option>
                <option value="hld" ${q.round === 'hld' ? 'selected' : ''}>HLD</option>
                <option value="hr" ${q.round === 'hr' ? 'selected' : ''}>HR</option>
              </select>
            </div>

            <div class="form-group">
              <label>Difficulty</label>
              <select id="q-difficulty" class="lab-input">
                <option value="easy" ${q.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
                <option value="medium" ${q.difficulty === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="hard" ${q.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
              </select>
            </div>

            <div class="form-group full-width">
              <label>Tags (comma separated)</label>
              <input type="text" id="q-tags" class="lab-input" value="${(q.tags || []).join(', ')}" placeholder="e.g., arrays, two-pointers, greedy" />
            </div>

            <div class="form-group full-width">
              <label>Problem Statement *</label>
              <textarea id="q-statement" class="lab-input lab-textarea" rows="5" placeholder="Describe the problem clearly...">${q.statement || ''}</textarea>
            </div>

            <div class="form-group full-width">
              <label>Constraints / Notes</label>
              <textarea id="q-constraints" class="lab-input lab-textarea" rows="3" placeholder="e.g., 1 <= n <= 10^5, array is sorted...">${(q.constraints || []).join('\n')}</textarea>
            </div>

            <!-- Test Cases -->
            <div class="form-group full-width">
              <label>Test Cases</label>
              <div id="test-cases-container">
                ${(q.testCases || [{ input: '', expected: '' }]).map((tc, i) => `
                  <div class="test-case-row glass">
                    <div class="tc-num">${i + 1}</div>
                    <div class="tc-fields">
                      <input type="text" class="lab-input tc-input" placeholder="Input (e.g., [1,2,3])" value="${tc.input || ''}" />
                      <input type="text" class="lab-input tc-expected" placeholder="Expected Output" value="${tc.expected || ''}" />
                    </div>
                    <button class="btn btn-ghost btn-sm tc-remove" ${(q.testCases || []).length <= 1 ? 'disabled' : ''}>✕</button>
                  </div>
                `).join('')}
              </div>
              <button class="btn btn-ghost btn-sm" id="btn-add-test-case" style="margin-top:var(--space-2);">
                ➕ Add Test Case
              </button>
            </div>

            <!-- Hints -->
            <div class="form-group full-width">
              <label>Hints / Expected Approach (optional)</label>
              <textarea id="q-hints" class="lab-input lab-textarea" rows="2" placeholder="e.g., Use sliding window technique...">${q.hints || ''}</textarea>
            </div>
          </div>

          <div class="lab-form-footer">
            <button class="btn btn-ghost" id="btn-cancel-form">Cancel</button>
            <button class="btn btn-primary" id="btn-save-question">
              ${editingIdx !== null ? '💾 Update Question' : '✅ Save Question'}
            </button>
          </div>
        </div>`;
  }

  // ─── Solve View (Code Editor) ──────────────────────────
  function renderSolveView() {
    const q = customQuestions[solvingIdx];
    if (!q) return '<p>Question not found.</p>';

    return `
        <div class="lab-solve-container">
          <!-- Left: Problem -->
          <div class="solve-problem glass">
            <button class="btn btn-ghost btn-sm" id="btn-back-solve" style="margin-bottom:var(--space-4);">← Back</button>
            <div class="solve-header">
              <h2>${q.title}</h2>
              <div style="display:flex;gap:var(--space-2);margin:var(--space-2) 0;">
                <span class="badge badge-${q.difficulty === 'easy' ? 'emerald' : q.difficulty === 'medium' ? 'amber' : 'rose'}">${q.difficulty}</span>
                <span class="badge badge-indigo">${q.round.toUpperCase()}</span>
              </div>
            </div>
            <div class="solve-statement">${q.statement}</div>

            ${q.constraints?.length ? `
              <div class="solve-section">
                <h4>📋 Constraints</h4>
                <ul>${q.constraints.map(c => `<li>${c}</li>`).join('')}</ul>
              </div>
            ` : ''}

            ${q.testCases?.length ? `
              <div class="solve-section">
                <h4>🧪 Test Cases</h4>
                ${q.testCases.map((tc, i) => `
                  <div class="tc-display glass">
                    <div><strong>Case ${i + 1}</strong></div>
                    <div class="tc-row"><span class="tc-label">Input:</span> <code>${tc.input}</code></div>
                    <div class="tc-row"><span class="tc-label">Expected:</span> <code>${tc.expected}</code></div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${q.hints ? `
              <div class="solve-section">
                <h4>💡 Hints</h4>
                <p style="color:var(--text-secondary);">${q.hints}</p>
              </div>
            ` : ''}
          </div>

          <!-- Right: Code Editor -->
          <div class="solve-editor glass">
            <div class="editor-header">
              <h3>💻 Your Solution</h3>
              <div style="display:flex;gap:var(--space-2);">
                <select id="code-lang" class="lab-input" style="width:auto;margin:0;">
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <button class="btn btn-primary btn-sm" id="btn-run-code">▶ Run</button>
                <button class="btn btn-ghost btn-sm" id="btn-save-solution">💾 Save</button>
              </div>
            </div>
            <textarea id="code-editor" class="code-area" spellcheck="false" placeholder="// Write your solution here...">${q.solution || ''}</textarea>

            <!-- Output Panel -->
            <div class="editor-output" id="editor-output">
              <div class="output-header">
                <h4>📤 Output</h4>
              </div>
              <pre class="output-content" id="output-content">Click "Run" to execute your code...</pre>
            </div>

            <!-- Notes -->
            <div class="editor-notes">
              <h4>📝 Notes</h4>
              <textarea id="solve-notes" class="lab-input lab-textarea" rows="3" placeholder="Add your notes, time/space complexity, approach...">${q.notes || ''}</textarea>
            </div>
          </div>
        </div>`;
  }

  // ─── Event Bindings ────────────────────────────────────
  function bindLabEvents() {
    // Create buttons
    container.querySelector('#btn-create-new')?.addEventListener('click', () => { editingIdx = null; activeView = 'create'; render(); });
    container.querySelector('#btn-empty-create')?.addEventListener('click', () => { editingIdx = null; activeView = 'create'; render(); });
    container.querySelector('#btn-back-list')?.addEventListener('click', () => { activeView = 'list'; render(); });
    container.querySelector('#btn-cancel-form')?.addEventListener('click', () => { activeView = 'list'; render(); });
    container.querySelector('#btn-back-solve')?.addEventListener('click', () => { activeView = 'list'; render(); });

    // Save question
    container.querySelector('#btn-save-question')?.addEventListener('click', () => {
      const title = container.querySelector('#q-title').value.trim();
      const statement = container.querySelector('#q-statement').value.trim();
      if (!title || !statement) return alert('Title and statement are required.');

      const testCaseRows = container.querySelectorAll('.test-case-row');
      const testCases = Array.from(testCaseRows).map(row => ({
        input: row.querySelector('.tc-input').value,
        expected: row.querySelector('.tc-expected').value
      })).filter(tc => tc.input || tc.expected);

      const constraintsText = container.querySelector('#q-constraints').value.trim();
      const question = {
        id: editingIdx !== null ? customQuestions[editingIdx].id : 'custom-' + Date.now(),
        title,
        round: container.querySelector('#q-round').value,
        difficulty: container.querySelector('#q-difficulty').value,
        tags: container.querySelector('#q-tags').value.split(',').map(t => t.trim()).filter(Boolean),
        statement,
        constraints: constraintsText ? constraintsText.split('\n').filter(Boolean) : [],
        testCases,
        hints: container.querySelector('#q-hints').value.trim(),
        solution: editingIdx !== null ? customQuestions[editingIdx].solution : '',
        notes: editingIdx !== null ? customQuestions[editingIdx].notes : '',
        createdAt: editingIdx !== null ? customQuestions[editingIdx].createdAt : new Date().toISOString()
      };

      if (editingIdx !== null) {
        customQuestions[editingIdx] = question;
      } else {
        customQuestions.push(question);
      }
      saveCustomQuestions(customQuestions);
      activeView = 'list';
      render();
    });

    // Add test case
    container.querySelector('#btn-add-test-case')?.addEventListener('click', () => {
      const tcContainer = container.querySelector('#test-cases-container');
      const count = tcContainer.querySelectorAll('.test-case-row').length;
      const row = document.createElement('div');
      row.className = 'test-case-row glass';
      row.innerHTML = `
                <div class="tc-num">${count + 1}</div>
                <div class="tc-fields">
                  <input type="text" class="lab-input tc-input" placeholder="Input" />
                  <input type="text" class="lab-input tc-expected" placeholder="Expected Output" />
                </div>
                <button class="btn btn-ghost btn-sm tc-remove">✕</button>
            `;
      tcContainer.appendChild(row);
      row.querySelector('.tc-remove').addEventListener('click', () => row.remove());
    });

    // Remove test case
    container.querySelectorAll('.tc-remove').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.test-case-row').remove());
    });

    // Card actions: solve, edit, delete
    container.querySelectorAll('.lab-solve').forEach(btn => {
      btn.addEventListener('click', () => { solvingIdx = parseInt(btn.dataset.idx); activeView = 'solve'; render(); });
    });
    container.querySelectorAll('.lab-edit').forEach(btn => {
      btn.addEventListener('click', () => { editingIdx = parseInt(btn.dataset.idx); activeView = 'create'; render(); });
    });
    container.querySelectorAll('.lab-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this question?')) {
          customQuestions.splice(parseInt(btn.dataset.idx), 1);
          saveCustomQuestions(customQuestions);
          render();
        }
      });
    });

    // Code editor: run
    container.querySelector('#btn-run-code')?.addEventListener('click', () => {
      const code = container.querySelector('#code-editor').value;
      const outputEl = container.querySelector('#output-content');
      const originalLog = console.log;
      try {
        let output = '';
        console.log = (...args) => { output += args.join(' ') + '\n'; };
        const result = new Function(code)();
        console.log = originalLog;
        if (result !== undefined) output += '→ ' + JSON.stringify(result);
        outputEl.textContent = output || '(no output)';
        outputEl.className = 'output-content output-success';
      } catch (err) {
        console.log = originalLog;
        outputEl.textContent = '❌ Error: ' + err.message;
        outputEl.className = 'output-content output-error';
      }
    });

    // Code editor: save solution
    container.querySelector('#btn-save-solution')?.addEventListener('click', () => {
      if (solvingIdx === null) return;
      customQuestions[solvingIdx].solution = container.querySelector('#code-editor').value;
      customQuestions[solvingIdx].notes = container.querySelector('#solve-notes').value;
      saveCustomQuestions(customQuestions);
      const btn = container.querySelector('#btn-save-solution');
      btn.textContent = '✅ Saved!';
      setTimeout(() => btn.textContent = '💾 Save', 1500);
    });

    // Tab support in code editor
    container.querySelector('#code-editor')?.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const ta = e.target;
        const start = ta.selectionStart;
        ta.value = ta.value.substring(0, start) + '  ' + ta.value.substring(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = start + 2;
      }
    });
  }

  render();
}


// ═══════════════════════════════════════════════════════════
// Styles
// ═══════════════════════════════════════════════════════════

function addLabStyles(container) {
  if (container.querySelector('#lab-styles')) return;
  const style = document.createElement('style');
  style.id = 'lab-styles';
  style.textContent = `
    .practice-lab { max-width: 1200px; }
    .lab-hero { text-align: center; padding: var(--space-10) 0 var(--space-6); }
    .hero-gradient-lab {
      background: linear-gradient(135deg, var(--accent-rose), var(--accent-amber), var(--accent-indigo));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    .lab-actions {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-3);
    }
    .lab-stats { display: flex; gap: var(--space-2); }
    .stat-chip {
      padding: var(--space-2) var(--space-4); border-radius: var(--radius-full);
      font-size: var(--text-sm); color: var(--text-secondary);
    }

    /* Empty state */
    .lab-empty {
      text-align: center; padding: var(--space-12); border-radius: var(--radius-xl);
    }
    .lab-empty h3 { font-size: var(--text-xl); margin: var(--space-4) 0 var(--space-2); }
    .lab-empty p { color: var(--text-muted); margin-bottom: var(--space-6); max-width: 400px; margin-inline: auto; }

    /* Question Grid */
    .lab-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: var(--space-5);
    }
    .lab-card {
      padding: var(--space-5); border-radius: var(--radius-xl);
      display: flex; flex-direction: column; transition: all var(--transition-base);
    }
    .lab-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.15); }
    .lab-card-header { display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-3); }
    .lab-card-title { font-size: var(--text-base); font-weight: 700; margin-bottom: var(--space-2); }
    .lab-card-desc { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5; flex: 1; margin-bottom: var(--space-3); }
    .lab-card-meta { font-size: 11px; color: var(--text-muted); display: flex; gap: var(--space-3); margin-bottom: var(--space-3); }
    .lab-card-actions { display: flex; gap: var(--space-2); }

    /* Form */
    .lab-form { padding: var(--space-8); border-radius: var(--radius-xl); }
    .lab-form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
    .lab-form-header h2 { font-size: var(--text-xl); }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
    .form-group { display: flex; flex-direction: column; gap: var(--space-2); }
    .form-group.full-width { grid-column: 1 / -1; }
    .form-group label { font-size: var(--text-sm); font-weight: 600; color: var(--text-secondary); }
    .lab-input {
      width: 100%; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md);
      background: var(--bg-surface); border: 1px solid var(--glass-border);
      color: var(--text-primary); font-size: var(--text-sm); outline: none;
      font-family: var(--font-sans); transition: border-color var(--transition-fast);
    }
    .lab-input:focus { border-color: var(--accent-rose); }
    .lab-textarea { resize: vertical; min-height: 60px; }
    .lab-form-footer { display: flex; justify-content: flex-end; gap: var(--space-3); margin-top: var(--space-6); }

    /* Test cases */
    .test-case-row {
      display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3);
      border-radius: var(--radius-md); margin-bottom: var(--space-2);
    }
    .tc-num { width: 28px; height: 28px; border-radius: var(--radius-full); background: var(--accent-rose); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
    .tc-fields { display: flex; gap: var(--space-2); flex: 1; }
    .tc-fields .lab-input { margin: 0; }

    /* Solve View */
    .lab-solve-container { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); min-height: 70vh; }
    .solve-problem { padding: var(--space-6); border-radius: var(--radius-xl); overflow-y: auto; max-height: 80vh; }
    .solve-header h2 { font-size: var(--text-xl); font-weight: 700; }
    .solve-statement { color: var(--text-secondary); line-height: 1.7; margin: var(--space-4) 0; font-size: var(--text-sm); }
    .solve-section { margin-top: var(--space-5); }
    .solve-section h4 { font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-2); }
    .solve-section ul { padding-left: var(--space-5); color: var(--text-secondary); font-size: var(--text-sm); }
    .solve-section li { margin-bottom: var(--space-1); }
    .tc-display { padding: var(--space-3); border-radius: var(--radius-md); margin-bottom: var(--space-2); font-size: var(--text-sm); }
    .tc-row { margin-top: var(--space-1); }
    .tc-label { color: var(--text-muted); font-size: 11px; }
    .tc-display code { background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 12px; }

    /* Code Editor */
    .solve-editor { padding: var(--space-5); border-radius: var(--radius-xl); display: flex; flex-direction: column; gap: var(--space-4); }
    .editor-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2); }
    .editor-header h3 { font-size: var(--text-base); font-weight: 700; }
    .code-area {
      width: 100%; min-height: 300px; padding: var(--space-4); border-radius: var(--radius-md);
      background: #0d1117; border: 1px solid var(--glass-border); color: #e6edf3;
      font-family: var(--font-mono); font-size: 13px; line-height: 1.6;
      resize: vertical; outline: none; tab-size: 2;
    }
    .code-area:focus { border-color: var(--accent-indigo); }
    .editor-output { border-radius: var(--radius-md); overflow: hidden; }
    .output-header { padding: var(--space-2) var(--space-4); background: rgba(255,255,255,0.03); }
    .output-header h4 { font-size: var(--text-sm); font-weight: 600; }
    .output-content {
      padding: var(--space-3) var(--space-4); background: #0d1117; color: var(--text-secondary);
      font-family: var(--font-mono); font-size: 12px; line-height: 1.6;
      max-height: 200px; overflow-y: auto; margin: 0; border-radius: 0 0 var(--radius-md) var(--radius-md);
      border: 1px solid var(--glass-border); border-top: none;
    }
    .output-success { color: var(--accent-emerald); }
    .output-error { color: var(--accent-rose); }
    .editor-notes h4 { font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--space-2); }

    @media (max-width: 768px) {
      .lab-grid { grid-template-columns: 1fr; }
      .lab-solve-container { grid-template-columns: 1fr; }
      .form-grid { grid-template-columns: 1fr; }
      .form-group.full-width { grid-column: auto; }
    }
    `;
  container.appendChild(style);
}
