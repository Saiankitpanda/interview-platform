// ═══════════════════════════════════════════════════════════
// Tracker Dashboard — Expenses, Rapid Revision, Job Applications
// ═══════════════════════════════════════════════════════════

const EXPENSE_KEY = 'tracker_expenses';
const JOBS_KEY = 'tracker_jobs';
const REVISION_KEY = 'tracker_revision';

function load(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }
function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

export function renderTrackerPage(container) {
    let activeTab = 'expenses';
    let expenses = load(EXPENSE_KEY);
    let jobs = load(JOBS_KEY);
    let revisionDone = JSON.parse(localStorage.getItem(REVISION_KEY) || '{}');

    // ─── Bi-weekly revision schedule ──────────────
    const REVISION_CYCLES = [
        {
            id: 'cycle-1', label: 'Cycle 1 — Days 1-14', period: 'Week 1-2',
            slots: [
                { id: 'c1-1', day: 'Sat Morning', topic: 'Arrays & Two Pointers', details: 'Revise prefix sums, sliding window, 2-pointer patterns. Re-solve 2 problems.', time: '2 hrs' },
                { id: 'c1-2', day: 'Sat Afternoon', topic: 'Linked Lists & Stacks', details: 'Fast/slow pointers, monotonic stack, LRU cache impl.', time: '2 hrs' },
                { id: 'c1-3', day: 'Sun Morning', topic: 'Timed Problem Drill', details: 'Solve 3 random medium problems in 60 min. No hints.', time: '1.5 hrs' },
            ]
        },
        {
            id: 'cycle-2', label: 'Cycle 2 — Days 15-28', period: 'Week 3-4',
            slots: [
                { id: 'c2-1', day: 'Sat Morning', topic: 'Trees & Binary Search', details: 'BST operations, tree DFS, binary search template. Re-solve Serialize Tree.', time: '2 hrs' },
                { id: 'c2-2', day: 'Sat Afternoon', topic: 'Graphs & Backtracking', details: 'BFS/DFS, topo sort, Dijkstra, backtracking template. Re-solve N-Queens.', time: '2 hrs' },
                { id: 'c2-3', day: 'Sun Morning', topic: 'Month 1 Mega Review', details: 'Write cheat sheet for all patterns. Solve 1 problem from each category.', time: '3 hrs' },
            ]
        },
        {
            id: 'cycle-3', label: 'Cycle 3 — Days 29-42', period: 'Week 5-6',
            slots: [
                { id: 'c3-1', day: 'Sat Morning', topic: 'Dynamic Programming', details: '1D, 2D, knapsack, string DP. Re-solve Edit Distance & LIS.', time: '2.5 hrs' },
                { id: 'c3-2', day: 'Sat Afternoon', topic: 'Heaps, Tries & Greedy', details: 'Heap operations, trie impl, greedy patterns. Median from stream.', time: '2 hrs' },
                { id: 'c3-3', day: 'Sun Morning', topic: 'DSA Pattern Sprint', details: 'Flash-card style: identify pattern for 20 problems in 30 min.', time: '1.5 hrs' },
            ]
        },
        {
            id: 'cycle-4', label: 'Cycle 4 — Days 43-56', period: 'Week 7-8',
            slots: [
                { id: 'c4-1', day: 'Sat Morning', topic: 'OOP & SOLID Revision', details: 'Revisit all 5 SOLID principles with code examples. UML diagrams.', time: '2 hrs' },
                { id: 'c4-2', day: 'Sat Afternoon', topic: 'Design Patterns Drill', details: 'Creational, Structural, Behavioral. Code 3 patterns from memory.', time: '2 hrs' },
                { id: 'c4-3', day: 'Sun Morning', topic: 'LLD Mock Design', details: 'Timed: design one LLD problem end-to-end in 40 min (Parking Lot or Elevator).', time: '2 hrs' },
            ]
        },
        {
            id: 'cycle-5', label: 'Cycle 5 — Days 57-70', period: 'Week 9-10',
            slots: [
                { id: 'c5-1', day: 'Sat Morning', topic: 'HLD Fundamentals Recap', details: 'Scaling, DBs, caching, message queues, API design. Create reference cards.', time: '2.5 hrs' },
                { id: 'c5-2', day: 'Sat Afternoon', topic: 'HLD Practice Designs', details: 'Quick-draw 3 system designs: URL shortener, chat system, news feed.', time: '2.5 hrs' },
                { id: 'c5-3', day: 'Sun Morning', topic: 'Cross-Domain Drill', details: 'Solve 1 DSA hard, sketch 1 LLD, outline 1 HLD. Simulate interview day.', time: '3 hrs' },
            ]
        },
        {
            id: 'cycle-6', label: 'Cycle 6 — Days 71-84', period: 'Week 11-12',
            slots: [
                { id: 'c6-1', day: 'Sat Morning', topic: 'Advanced Design Review', details: 'Distributed cache, search engine, ride-sharing, video streaming designs.', time: '2.5 hrs' },
                { id: 'c6-2', day: 'Sat Afternoon', topic: 'Behavioral Stories Drill', details: 'Practice all 5 STAR stories out loud. Keep each under 2 min.', time: '1.5 hrs' },
                { id: 'c6-3', day: 'Sun Morning', topic: 'Full Mock Interview', details: 'Simulate 3 back-to-back rounds: DSA (45m) + Design (45m) + HR (30m).', time: '3 hrs' },
            ]
        },
        {
            id: 'cycle-7', label: 'Cycle 7 — Days 85-90', period: 'Week 13 (Final)',
            slots: [
                { id: 'c7-1', day: 'Sat Morning', topic: 'Weak Areas Blitz', details: 'Your 3 weakest topics. Drill until confident.', time: '2 hrs' },
                { id: 'c7-2', day: 'Sat Afternoon', topic: 'All Cheat Sheets Review', details: 'Read through every cheat sheet and note card you\'ve made.', time: '1.5 hrs' },
                { id: 'c7-3', day: 'Sun', topic: '🎓 Final Confidence Check', details: 'Light revision. You\'re ready. Relax and trust the process.', time: '1 hr' },
            ]
        }
    ];

    function render() {
        expenses = load(EXPENSE_KEY);
        jobs = load(JOBS_KEY);
        revisionDone = JSON.parse(localStorage.getItem(REVISION_KEY) || '{}');

        container.innerHTML = `
        <div class="page-container tracker-dash">
          <div class="tracker-hero animate-fade-in-up">
            <div class="hero-badge badge badge-amber">📊 Dashboard</div>
            <h1 class="hero-title">My <span class="hero-gradient-tracker">Tracker</span></h1>
            <p class="hero-subtitle">Expenses, revision sessions, and job applications — all in one place.</p>
          </div>

          <div class="tracker-tabs animate-fade-in-up">
            <button class="tracker-tab ${activeTab === 'expenses' ? 'active' : ''}" data-tab="expenses">
              💰 Expenses <span class="tab-count">${expenses.length}</span>
            </button>
            <button class="tracker-tab ${activeTab === 'revision' ? 'active' : ''}" data-tab="revision">
              📋 Rapid Revision
            </button>
            <button class="tracker-tab ${activeTab === 'jobs' ? 'active' : ''}" data-tab="jobs">
              🏢 Applications <span class="tab-count">${jobs.length}</span>
            </button>
          </div>

          <div id="tracker-content" class="animate-fade-in-up">
            ${activeTab === 'expenses' ? renderExpenses() : ''}
            ${activeTab === 'revision' ? renderRevision() : ''}
            ${activeTab === 'jobs' ? renderJobs() : ''}
          </div>
        </div>
        `;
        addTrackerStyles(container);
        bindTrackerEvents();
    }

    // ═══════════════════════════════════════════
    // EXPENSE TRACKER
    // ═══════════════════════════════════════════
    function renderExpenses() {
        const categories = ['🍔 Food', '🚌 Transport', '📚 Study Materials', '💻 Subscriptions', '🏠 Rent/Utilities', '🎮 Entertainment', '🩺 Health', '📦 Other'];
        const now = new Date();
        const currentMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');

        // Monthly summary
        const monthExpenses = expenses.filter(e => e.date && e.date.startsWith(currentMonth));
        const monthTotal = monthExpenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

        // Category breakdown
        const catTotals = {};
        monthExpenses.forEach(e => {
            catTotals[e.category] = (catTotals[e.category] || 0) + (parseFloat(e.amount) || 0);
        });
        const maxCat = Math.max(1, ...Object.values(catTotals));

        return `
        <div class="expense-section">
          <!-- Add Expense Form -->
          <div class="expense-form glass">
            <h3>➕ Add Expense</h3>
            <div class="expense-form-grid">
              <div class="form-group">
                <label>Amount (₹)</label>
                <input type="number" id="exp-amount" class="t-input" placeholder="500" min="0" />
              </div>
              <div class="form-group">
                <label>Category</label>
                <select id="exp-category" class="t-input">
                  ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Date</label>
                <input type="date" id="exp-date" class="t-input" value="${now.toISOString().split('T')[0]}" />
              </div>
              <div class="form-group">
                <label>Notes</label>
                <input type="text" id="exp-notes" class="t-input" placeholder="Lunch at cafe..." />
              </div>
            </div>
            <button class="btn btn-primary" id="btn-add-expense" style="margin-top:var(--space-3);">💰 Add Expense</button>
          </div>

          <!-- Monthly Summary -->
          <div class="expense-summary glass">
            <div class="summary-header">
              <h3>📊 ${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
              <span class="month-total">₹${monthTotal.toLocaleString('en-IN')}</span>
            </div>
            ${Object.keys(catTotals).length > 0 ? `
            <div class="cat-bars">
              ${Object.entries(catTotals).sort((a, b) => b[1] - a[1]).map(([cat, total]) => `
                <div class="cat-bar-row">
                  <span class="cat-name">${cat}</span>
                  <div class="cat-bar-bg">
                    <div class="cat-bar-fill" style="width:${(total / maxCat) * 100}%"></div>
                  </div>
                  <span class="cat-amount">₹${total.toLocaleString('en-IN')}</span>
                </div>
              `).join('')}
            </div>
            ` : '<p style="color:var(--text-muted);text-align:center;padding:var(--space-4);">No expenses this month yet.</p>'}
          </div>

          <!-- Expense List -->
          <div class="expense-list">
            <h3>📜 Recent Expenses</h3>
            ${expenses.length === 0 ? '<p style="color:var(--text-muted);">No expenses recorded yet.</p>' : ''}
            ${expenses.slice().reverse().slice(0, 30).map((e, i) => `
              <div class="expense-row glass">
                <div class="exp-cat">${e.category}</div>
                <div class="exp-detail">
                  <span class="exp-notes-text">${e.notes || 'No notes'}</span>
                  <span class="exp-date-text">${e.date || ''}</span>
                </div>
                <span class="exp-amount">₹${parseFloat(e.amount).toLocaleString('en-IN')}</span>
                <button class="btn btn-ghost btn-sm exp-delete" data-idx="${expenses.length - 1 - i}">🗑️</button>
              </div>
            `).join('')}
          </div>
        </div>`;
    }

    // ═══════════════════════════════════════════
    // BI-WEEKLY RAPID REVISION
    // ═══════════════════════════════════════════
    function renderRevision() {
        const totalSlots = REVISION_CYCLES.reduce((s, c) => s + c.slots.length, 0);
        const doneSlots = Object.values(revisionDone).filter(Boolean).length;

        return `
        <div class="revision-section">
          <div class="revision-overview glass">
            <h3>📋 Bi-Weekly Rapid Revision Plan</h3>
            <p style="color:var(--text-secondary);margin-bottom:var(--space-3);">
              Every 2 weeks, block a weekend for focused revision. Study in the morning, relax/work in the afternoon.
            </p>
            <div class="revision-progress">
              <div class="rev-bar-bg"><div class="rev-bar-fill" style="width:${(doneSlots / totalSlots) * 100}%"></div></div>
              <span>${doneSlots}/${totalSlots} sessions done</span>
            </div>
          </div>

          <div class="revision-cycles">
            ${REVISION_CYCLES.map(cycle => {
            const cycleDone = cycle.slots.filter(s => revisionDone[s.id]).length;
            return `
                <div class="revision-cycle glass">
                  <div class="cycle-header">
                    <div>
                      <h4>${cycle.label}</h4>
                      <span class="cycle-period">${cycle.period}</span>
                    </div>
                    <span class="cycle-progress-text">${cycleDone}/${cycle.slots.length} ${cycleDone === cycle.slots.length ? '✅' : ''}</span>
                  </div>
                  <div class="cycle-slots">
                    ${cycle.slots.map(slot => `
                      <div class="rev-slot ${revisionDone[slot.id] ? 'slot-done' : ''}">
                        <button class="rev-check" data-rev="${slot.id}">${revisionDone[slot.id] ? '✅' : '⬜'}</button>
                        <div class="slot-content">
                          <div class="slot-top">
                            <span class="slot-day">${slot.day}</span>
                            <span class="slot-time">⏱ ${slot.time}</span>
                          </div>
                          <h5 class="slot-topic">${slot.topic}</h5>
                          <p class="slot-details">${slot.details}</p>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>`;
        }).join('')}
          </div>
        </div>`;
    }

    // ═══════════════════════════════════════════
    // JOB APPLICATION TRACKER
    // ═══════════════════════════════════════════
    function renderJobs() {
        const statuses = ['Applied', 'OA Received', 'OA Done', 'Interview Scheduled', 'Interviewed', 'Offer', 'Rejected', 'Ghosted'];
        const statusColors = {
            'Applied': 'indigo', 'OA Received': 'amber', 'OA Done': 'amber',
            'Interview Scheduled': 'cyan', 'Interviewed': 'cyan',
            'Offer': 'emerald', 'Rejected': 'rose', 'Ghosted': 'rose'
        };
        const statusEmojis = {
            'Applied': '📤', 'OA Received': '📝', 'OA Done': '✍️',
            'Interview Scheduled': '📅', 'Interviewed': '🎤',
            'Offer': '🎉', 'Rejected': '❌', 'Ghosted': '👻'
        };

        // Stats
        const statusCounts = {};
        jobs.forEach(j => { statusCounts[j.status] = (statusCounts[j.status] || 0) + 1; });

        return `
        <div class="jobs-section">
          <!-- Add Job Form -->
          <div class="job-form glass">
            <h3>➕ Add Application</h3>
            <div class="job-form-grid">
              <div class="form-group">
                <label>Company Name *</label>
                <input type="text" id="job-company" class="t-input" placeholder="Google, Amazon, Flipkart..." />
              </div>
              <div class="form-group">
                <label>Role</label>
                <input type="text" id="job-role" class="t-input" placeholder="SDE-1, SDE-2, etc." />
              </div>
              <div class="form-group">
                <label>Date Applied</label>
                <input type="date" id="job-date" class="t-input" value="${new Date().toISOString().split('T')[0]}" />
              </div>
              <div class="form-group">
                <label>Status</label>
                <select id="job-status" class="t-input">
                  ${statuses.map(s => `<option value="${s}">${statusEmojis[s]} ${s}</option>`).join('')}
                </select>
              </div>
              <div class="form-group full-width">
                <label>Notes / Response</label>
                <input type="text" id="job-notes" class="t-input" placeholder="Referral from Ankit, portal link, response details..." />
              </div>
            </div>
            <button class="btn btn-primary" id="btn-add-job" style="margin-top:var(--space-3);">🏢 Add Application</button>
          </div>

          <!-- Stats -->
          <div class="job-stats-row">
            ${['Applied', 'OA Received', 'Interview Scheduled', 'Offer', 'Rejected'].map(s => `
              <div class="job-stat glass">
                <span class="job-stat-emoji">${statusEmojis[s]}</span>
                <span class="job-stat-count">${statusCounts[s] || 0}</span>
                <span class="job-stat-label">${s}</span>
              </div>
            `).join('')}
          </div>

          <!-- Job List -->
          <div class="job-list">
            <h3>📋 All Applications</h3>
            ${jobs.length === 0 ? '<p style="color:var(--text-muted);">No applications tracked yet. Start adding!</p>' : ''}
            <div class="job-table">
              ${jobs.slice().reverse().map((j, i) => `
                <div class="job-row glass">
                  <div class="job-main">
                    <div class="job-company-name">${j.company}</div>
                    <div class="job-role-text">${j.role || '—'}</div>
                  </div>
                  <div class="job-meta">
                    <span class="badge badge-${statusColors[j.status] || 'indigo'}">${statusEmojis[j.status] || '📤'} ${j.status}</span>
                    <span class="job-date-text">${j.date || ''}</span>
                  </div>
                  <div class="job-notes-text">${j.notes || ''}</div>
                  <div class="job-actions">
                    <select class="t-input t-input-sm job-status-update" data-idx="${jobs.length - 1 - i}">
                      ${statuses.map(s => `<option value="${s}" ${j.status === s ? 'selected' : ''}>${statusEmojis[s]} ${s}</option>`).join('')}
                    </select>
                    <button class="btn btn-ghost btn-sm job-edit-notes" data-idx="${jobs.length - 1 - i}" title="Edit notes">✏️</button>
                    <button class="btn btn-ghost btn-sm job-delete" data-idx="${jobs.length - 1 - i}">🗑️</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>`;
    }

    // ═══════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════
    function bindTrackerEvents() {
        // Tab switching
        container.querySelectorAll('.tracker-tab').forEach(tab => {
            tab.addEventListener('click', () => { activeTab = tab.dataset.tab; render(); });
        });

        // ─── Expenses ──────────────
        container.querySelector('#btn-add-expense')?.addEventListener('click', () => {
            const amount = container.querySelector('#exp-amount').value;
            const category = container.querySelector('#exp-category').value;
            const date = container.querySelector('#exp-date').value;
            const notes = container.querySelector('#exp-notes').value;
            if (!amount || parseFloat(amount) <= 0) return alert('Please enter a valid amount.');
            expenses.push({ amount, category, date, notes, id: Date.now() });
            save(EXPENSE_KEY, expenses);
            render();
        });

        container.querySelectorAll('.exp-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                expenses.splice(parseInt(btn.dataset.idx), 1);
                save(EXPENSE_KEY, expenses);
                render();
            });
        });

        // ─── Revision ──────────────
        container.querySelectorAll('.rev-check').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.rev;
                revisionDone[id] = !revisionDone[id];
                localStorage.setItem(REVISION_KEY, JSON.stringify(revisionDone));
                render();
            });
        });

        // ─── Jobs ──────────────────
        container.querySelector('#btn-add-job')?.addEventListener('click', () => {
            const company = container.querySelector('#job-company').value.trim();
            if (!company) return alert('Company name is required.');
            jobs.push({
                company,
                role: container.querySelector('#job-role').value.trim(),
                date: container.querySelector('#job-date').value,
                status: container.querySelector('#job-status').value,
                notes: container.querySelector('#job-notes').value.trim(),
                id: Date.now()
            });
            save(JOBS_KEY, jobs);
            render();
        });

        container.querySelectorAll('.job-status-update').forEach(sel => {
            sel.addEventListener('change', () => {
                const idx = parseInt(sel.dataset.idx);
                jobs[idx].status = sel.value;
                save(JOBS_KEY, jobs);
                render();
            });
        });

        container.querySelectorAll('.job-edit-notes').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                const newNotes = prompt('Update notes/response:', jobs[idx].notes || '');
                if (newNotes !== null) {
                    jobs[idx].notes = newNotes;
                    save(JOBS_KEY, jobs);
                    render();
                }
            });
        });

        container.querySelectorAll('.job-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('Delete this application?')) {
                    jobs.splice(parseInt(btn.dataset.idx), 1);
                    save(JOBS_KEY, jobs);
                    render();
                }
            });
        });
    }

    render();
}


// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════
function addTrackerStyles(container) {
    if (container.querySelector('#tracker-styles')) return;
    const style = document.createElement('style');
    style.id = 'tracker-styles';
    style.textContent = `
    .tracker-dash { max-width: 1000px; }
    .tracker-hero { text-align: center; padding: var(--space-10) 0 var(--space-6); }
    .hero-gradient-tracker {
      background: linear-gradient(135deg, var(--accent-amber), var(--accent-rose), var(--accent-indigo));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    /* Tabs */
    .tracker-tabs { display: flex; gap: var(--space-2); margin-bottom: var(--space-6); flex-wrap: wrap; }
    .tracker-tab {
      padding: var(--space-3) var(--space-5); border-radius: var(--radius-full);
      background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border);
      color: var(--text-secondary); font-weight: 600; font-size: var(--text-sm);
      cursor: pointer; transition: all var(--transition-fast); display: flex; align-items: center; gap: var(--space-2);
    }
    .tracker-tab:hover { background: rgba(255,255,255,0.08); }
    .tracker-tab.active { background: var(--accent-indigo); color: white; border-color: var(--accent-indigo); }
    .tab-count {
      background: rgba(255,255,255,0.15); padding: 1px 8px; border-radius: var(--radius-full);
      font-size: 11px; font-weight: 700;
    }

    /* Shared form styles */
    .t-input {
      width: 100%; padding: var(--space-2) var(--space-3); border-radius: var(--radius-md);
      background: var(--bg-surface); border: 1px solid var(--glass-border);
      color: var(--text-primary); font-size: var(--text-sm); outline: none;
      font-family: var(--font-sans); transition: border-color var(--transition-fast);
    }
    .t-input:focus { border-color: var(--accent-amber); }
    .t-input-sm { padding: 4px 8px; font-size: 12px; width: auto; }
    .form-group { display: flex; flex-direction: column; gap: 4px; }
    .form-group label { font-size: 12px; font-weight: 600; color: var(--text-muted); }
    .form-group.full-width { grid-column: 1 / -1; }

    /* ─── EXPENSE STYLES ────────────── */
    .expense-form { padding: var(--space-5); border-radius: var(--radius-xl); margin-bottom: var(--space-5); }
    .expense-form h3 { margin-bottom: var(--space-3); font-size: var(--text-base); }
    .expense-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }

    .expense-summary { padding: var(--space-5); border-radius: var(--radius-xl); margin-bottom: var(--space-5); }
    .summary-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
    .summary-header h3 { font-size: var(--text-base); }
    .month-total { font-size: var(--text-xl); font-weight: 800; color: var(--accent-amber); }

    .cat-bars { display: flex; flex-direction: column; gap: var(--space-2); }
    .cat-bar-row { display: flex; align-items: center; gap: var(--space-3); }
    .cat-name { width: 160px; font-size: 13px; flex-shrink: 0; }
    .cat-bar-bg { flex: 1; height: 10px; background: rgba(255,255,255,0.06); border-radius: var(--radius-full); }
    .cat-bar-fill { height: 100%; border-radius: var(--radius-full); background: linear-gradient(90deg, var(--accent-amber), var(--accent-rose)); transition: width 0.5s; }
    .cat-amount { font-size: 13px; font-weight: 700; color: var(--accent-amber); min-width: 80px; text-align: right; }

    .expense-list h3 { margin-bottom: var(--space-3); font-size: var(--text-base); }
    .expense-row {
      display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-md); margin-bottom: var(--space-2);
    }
    .exp-cat { font-size: 13px; width: 160px; flex-shrink: 0; }
    .exp-detail { flex: 1; min-width: 0; }
    .exp-notes-text { font-size: 13px; color: var(--text-secondary); display: block; }
    .exp-date-text { font-size: 11px; color: var(--text-muted); }
    .exp-amount { font-weight: 700; color: var(--accent-rose); font-size: var(--text-sm); min-width: 70px; text-align: right; }

    /* ─── REVISION STYLES ───────────── */
    .revision-overview { padding: var(--space-5); border-radius: var(--radius-xl); margin-bottom: var(--space-5); }
    .revision-overview h3 { margin-bottom: var(--space-2); }
    .revision-progress { display: flex; align-items: center; gap: var(--space-3); }
    .rev-bar-bg { flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: var(--radius-full); }
    .rev-bar-fill { height: 100%; border-radius: var(--radius-full); background: linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald)); transition: width 0.5s; }
    .revision-progress span { font-size: 13px; color: var(--text-muted); }

    .revision-cycles { display: flex; flex-direction: column; gap: var(--space-4); }
    .revision-cycle { padding: var(--space-5); border-radius: var(--radius-xl); }
    .cycle-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
    .cycle-header h4 { font-size: var(--text-sm); font-weight: 700; }
    .cycle-period { font-size: 11px; color: var(--text-muted); }
    .cycle-progress-text { font-size: 13px; color: var(--text-muted); font-weight: 600; }
    .cycle-slots { display: flex; flex-direction: column; gap: var(--space-3); }

    .rev-slot {
      display: flex; gap: var(--space-3); padding: var(--space-3);
      border-radius: var(--radius-md); background: rgba(255,255,255,0.02);
      transition: all var(--transition-fast);
    }
    .rev-slot.slot-done { opacity: 0.5; }
    .rev-slot.slot-done .slot-topic { text-decoration: line-through; }
    .rev-check { background: none; border: none; font-size: 18px; cursor: pointer; padding: 0; }
    .rev-check:hover { transform: scale(1.15); }
    .slot-content { flex: 1; }
    .slot-top { display: flex; justify-content: space-between; margin-bottom: 2px; }
    .slot-day { font-size: 11px; font-weight: 700; color: var(--accent-cyan); }
    .slot-time { font-size: 11px; color: var(--text-muted); }
    .slot-topic { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
    .slot-details { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }

    /* ─── JOB STYLES ────────────────── */
    .job-form { padding: var(--space-5); border-radius: var(--radius-xl); margin-bottom: var(--space-5); }
    .job-form h3 { margin-bottom: var(--space-3); font-size: var(--text-base); }
    .job-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }

    .job-stats-row { display: flex; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-5); }
    .job-stat {
      flex: 1; min-width: 100px; padding: var(--space-4); border-radius: var(--radius-lg);
      text-align: center; display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
    .job-stat-emoji { font-size: 24px; }
    .job-stat-count { font-size: var(--text-xl); font-weight: 800; color: var(--text-primary); }
    .job-stat-label { font-size: 11px; color: var(--text-muted); }

    .job-list h3 { margin-bottom: var(--space-3); font-size: var(--text-base); }
    .job-row {
      padding: var(--space-4); border-radius: var(--radius-lg); margin-bottom: var(--space-3);
      display: grid; grid-template-columns: 1fr auto; gap: var(--space-2);
    }
    .job-main { }
    .job-company-name { font-weight: 700; font-size: var(--text-sm); }
    .job-role-text { font-size: 12px; color: var(--text-muted); }
    .job-meta { display: flex; align-items: center; gap: var(--space-2); justify-self: end; }
    .job-date-text { font-size: 11px; color: var(--text-muted); }
    .job-notes-text { grid-column: 1 / -1; font-size: 12px; color: var(--text-secondary); font-style: italic; }
    .job-actions { grid-column: 1 / -1; display: flex; gap: var(--space-2); align-items: center; margin-top: var(--space-2); }

    @media (max-width: 768px) {
      .expense-form-grid { grid-template-columns: 1fr; }
      .job-form-grid { grid-template-columns: 1fr; }
      .job-stats-row { flex-direction: column; }
      .cat-bar-row { flex-direction: column; align-items: flex-start; }
      .cat-name { width: auto; }
    }
    `;
    container.appendChild(style);
}
