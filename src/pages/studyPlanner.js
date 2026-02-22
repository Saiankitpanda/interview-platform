// ═══════════════════════════════════════════════════════════
// 90-Day Study Planner Page
// ═══════════════════════════════════════════════════════════

import { STUDY_PLAN, REWARDS } from '../data/studyPlan.js';

const PROGRESS_KEY = 'study_planner_progress';
const EDITS_KEY = 'study_planner_edits';
const START_DATE_KEY = 'study_planner_start';

function getProgress() { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
function saveProgress(p) { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); }
function getEdits() { return JSON.parse(localStorage.getItem(EDITS_KEY) || '{}'); }
function saveEdits(e) { localStorage.setItem(EDITS_KEY, JSON.stringify(e)); }
function getStartDate() {
    let d = localStorage.getItem(START_DATE_KEY);
    if (!d) { d = new Date().toISOString().split('T')[0]; localStorage.setItem(START_DATE_KEY, d); }
    return d;
}

export function renderStudyPlannerPage(container) {
    let progress = getProgress();
    let edits = getEdits();
    let expandedWeek = null;
    let editingDay = null;

    const startDate = new Date(getStartDate());

    function getDayDate(dayNum) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + dayNum - 1);
        return d;
    }

    function completedCount() {
        return Object.values(progress).filter(v => v === true).length;
    }

    function getEarnedRewards() {
        const done = progress;
        return REWARDS.filter(r => {
            for (let d = 1; d <= r.day; d++) {
                if (!done[`day-${d}`]) return false;
            }
            return true;
        });
    }

    function render() {
        const totalDays = 90;
        const completed = completedCount();
        const percent = Math.round((completed / totalDays) * 100);
        const earnedRewards = getEarnedRewards();
        const today = new Date();
        const currentDay = Math.max(1, Math.min(90, Math.ceil((today - startDate) / 86400000) + 1));

        container.innerHTML = `
        <div class="page-container planner">
          <!-- Hero -->
          <div class="planner-hero animate-fade-in-up">
            <div class="hero-badge badge badge-cyan">📅 90-Day Plan</div>
            <h1 class="hero-title">
              Your <span class="hero-gradient-planner">Study Planner</span>
            </h1>
            <p class="hero-subtitle">
              Master DSA, LLD, HLD & Behavioral — one day at a time.
            </p>
          </div>

          <!-- Progress Overview -->
          <div class="planner-overview glass animate-fade-in-up">
            <div class="overview-main">
              <div class="overview-progress">
                <div class="progress-ring-container">
                  <svg class="progress-ring" viewBox="0 0 120 120">
                    <circle class="ring-bg" cx="60" cy="60" r="52" />
                    <circle class="ring-fill" cx="60" cy="60" r="52"
                      stroke-dasharray="${2 * Math.PI * 52}"
                      stroke-dashoffset="${2 * Math.PI * 52 * (1 - percent / 100)}" />
                  </svg>
                  <div class="ring-text">
                    <span class="ring-percent">${percent}%</span>
                    <span class="ring-label">done</span>
                  </div>
                </div>
              </div>
              <div class="overview-stats">
                <div class="stat-item">
                  <span class="stat-value">${completed}</span>
                  <span class="stat-label">Days Done</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">${totalDays - completed}</span>
                  <span class="stat-label">Days Left</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">Day ${currentDay}</span>
                  <span class="stat-label">Today</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">${earnedRewards.length}/${REWARDS.length}</span>
                  <span class="stat-label">Rewards</span>
                </div>
              </div>
            </div>
            <div class="progress-bar-full">
              <div class="progress-bar-fill" style="width:${percent}%"></div>
              ${REWARDS.map(r => `
                <div class="reward-marker ${earnedRewards.includes(r) ? 'earned' : ''}" 
                     style="left:${(r.day / 90) * 100}%" title="${r.title}">
                  ${r.icon}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Rewards Showcase -->
          ${earnedRewards.length > 0 ? `
          <div class="rewards-row animate-fade-in-up">
            ${earnedRewards.map(r => `
              <div class="reward-badge glass">
                <span class="reward-icon">${r.icon}</span>
                <span class="reward-name">${r.title}</span>
              </div>
            `).join('')}
          </div>
          ` : ''}

          <!-- Phase Legend -->
          <div class="phase-legend animate-fade-in-up">
            <span class="phase-chip phase-indigo">🔵 Phase 1: DSA (W1-4)</span>
            <span class="phase-chip phase-amber">🟡 Phase 2: DSA+LLD (W5-8)</span>
            <span class="phase-chip phase-emerald">🟢 Phase 3: System Design (W9-11)</span>
            <span class="phase-chip phase-rose">🔴 Phase 4: Interview Ready (W12-13)</span>
          </div>

          <!-- Week Cards -->
          <div class="weeks-container">
            ${STUDY_PLAN.map(week => renderWeekCard(week, currentDay)).join('')}
          </div>
        </div>
        `;

        addPlannerStyles(container);
        bindPlannerEvents();
    }

    function renderWeekCard(week, currentDay) {
        const weekDays = week.days;
        const weekCompleted = weekDays.filter(d => progress[`day-${d.day}`]).length;
        const weekTotal = weekDays.length;
        const weekPercent = Math.round((weekCompleted / weekTotal) * 100);
        const isExpanded = expandedWeek === week.week;
        const isCurrentWeek = weekDays.some(d => d.day === currentDay);
        const reward = REWARDS.find(r => r.day === weekDays[weekDays.length - 1].day);
        const rewardEarned = reward && getEarnedRewards().includes(reward);

        return `
        <div class="week-card glass animate-fade-in-up ${isCurrentWeek ? 'current-week' : ''} ${weekPercent === 100 ? 'week-done' : ''}">
          <div class="week-header" data-week="${week.week}">
            <div class="week-info">
              <div class="week-badges">
                <span class="badge badge-${week.phaseColor}">Week ${week.week}</span>
                <span class="week-phase-tag">${week.phase}</span>
                ${isCurrentWeek ? '<span class="badge badge-cyan">📍 Current</span>' : ''}
                ${weekPercent === 100 ? '<span class="badge badge-emerald">✅ Complete</span>' : ''}
              </div>
              <h3 class="week-title">${week.theme}</h3>
              <div class="week-progress-mini">
                <div class="mini-bar"><div class="mini-fill" style="width:${weekPercent}%"></div></div>
                <span>${weekCompleted}/${weekTotal} days</span>
              </div>
            </div>
            <div class="week-right">
              ${reward ? `<span class="week-reward ${rewardEarned ? 'earned' : 'locked'}">${rewardEarned ? reward.icon : '🔒'}</span>` : ''}
              <span class="week-toggle">${isExpanded ? '▲' : '▼'}</span>
            </div>
          </div>

          ${isExpanded ? `
          <div class="week-days">
            ${weekDays.map(day => renderDayCard(day, currentDay)).join('')}
            ${reward && !rewardEarned ? `
              <div class="reward-preview glass">
                <span style="font-size:32px;">🔒</span>
                <div>
                  <strong>${reward.icon} ${reward.title}</strong>
                  <p>${reward.desc}</p>
                  <small>Complete all ${weekTotal} days to unlock!</small>
                </div>
              </div>
            ` : ''}
            ${reward && rewardEarned ? `
              <div class="reward-preview glass earned-glow">
                <span style="font-size:32px;">${reward.icon}</span>
                <div>
                  <strong>${reward.title}</strong>
                  <p>${reward.desc}</p>
                </div>
              </div>
            ` : ''}
          </div>
          ` : ''}
        </div>`;
    }

    function renderDayCard(day, currentDay) {
        const done = progress[`day-${day.day}`];
        const isToday = day.day === currentDay;
        const dayDate = getDayDate(day.day);
        const dateStr = dayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const customTasks = edits[`day-${day.day}`];
        const tasks = customTasks || day.tasks;
        const catColors = { dsa: 'indigo', lld: 'amber', hld: 'emerald', hr: 'rose', revision: 'cyan', mock: 'rose', mixed: 'amber', celebration: 'amber' };
        const catEmojis = { dsa: '⚡', lld: '🏗️', hld: '🌐', hr: '🤝', revision: '📝', mock: '🎯', mixed: '🔀', celebration: '🎉' };

        return `
        <div class="day-card ${done ? 'day-done' : ''} ${isToday ? 'day-today' : ''}" data-day="${day.day}">
          <div class="day-left">
            <button class="day-check ${done ? 'checked' : ''}" data-check="${day.day}">
              ${done ? '✅' : '⬜'}
            </button>
          </div>
          <div class="day-content">
            <div class="day-top">
              <span class="day-num">Day ${day.day}</span>
              <span class="day-date">${dateStr}</span>
              <span class="badge badge-${catColors[day.category] || 'indigo'}">${catEmojis[day.category] || '📚'} ${day.category.toUpperCase()}</span>
              <span class="day-time">⏱ ${day.time}</span>
              ${isToday ? '<span class="badge badge-cyan">Today</span>' : ''}
            </div>
            <h4 class="day-title">${day.title}</h4>
            ${editingDay === day.day ? `
              <textarea class="edit-tasks-area" id="edit-area-${day.day}">${tasks.join('\n')}</textarea>
              <div class="edit-actions">
                <button class="btn btn-primary btn-sm save-edit" data-day="${day.day}">💾 Save</button>
                <button class="btn btn-ghost btn-sm cancel-edit" data-day="${day.day}">Cancel</button>
                ${customTasks ? `<button class="btn btn-ghost btn-sm reset-edit" data-day="${day.day}">↩ Reset</button>` : ''}
              </div>
            ` : `
              <ul class="day-tasks">
                ${tasks.map(t => `<li>${t}</li>`).join('')}
              </ul>
              <button class="btn btn-ghost btn-sm edit-day-btn" data-edit="${day.day}" style="margin-top:var(--space-2);font-size:11px;">
                ✏️ Edit Tasks
              </button>
            `}
          </div>
        </div>`;
    }

    function bindPlannerEvents() {
        // Toggle week expand
        container.querySelectorAll('.week-header').forEach(h => {
            h.addEventListener('click', () => {
                const w = parseInt(h.dataset.week);
                expandedWeek = expandedWeek === w ? null : w;
                render();
            });
        });

        // Day completion toggle
        container.querySelectorAll('.day-check').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const day = btn.dataset.check;
                progress[`day-${day}`] = !progress[`day-${day}`];
                saveProgress(progress);
                render();
            });
        });

        // Edit day tasks
        container.querySelectorAll('.edit-day-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                editingDay = parseInt(btn.dataset.edit);
                render();
            });
        });

        // Save edit
        container.querySelectorAll('.save-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const day = btn.dataset.day;
                const area = container.querySelector(`#edit-area-${day}`);
                const newTasks = area.value.split('\n').filter(t => t.trim());
                if (newTasks.length > 0) {
                    edits[`day-${day}`] = newTasks;
                    saveEdits(edits);
                }
                editingDay = null;
                render();
            });
        });

        // Cancel edit
        container.querySelectorAll('.cancel-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                editingDay = null;
                render();
            });
        });

        // Reset to original
        container.querySelectorAll('.reset-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const day = btn.dataset.day;
                delete edits[`day-${day}`];
                saveEdits(edits);
                editingDay = null;
                render();
            });
        });

        // Auto-expand current week on first load
        if (expandedWeek === null) {
            const today = new Date();
            const currentDay = Math.max(1, Math.min(90, Math.ceil((today - startDate) / 86400000) + 1));
            for (const week of STUDY_PLAN) {
                if (week.days.some(d => d.day === currentDay)) {
                    expandedWeek = week.week;
                    render();
                    return;
                }
            }
        }
    }

    render();
}


// ═══════════════════════════════════════════════════════════
// Styles
// ═══════════════════════════════════════════════════════════

function addPlannerStyles(container) {
    if (container.querySelector('#planner-styles')) return;
    const style = document.createElement('style');
    style.id = 'planner-styles';
    style.textContent = `
    .planner { max-width: 1000px; }
    .planner-hero { text-align: center; padding: var(--space-10) 0 var(--space-6); }
    .hero-gradient-planner {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo), var(--accent-rose));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    /* Overview */
    .planner-overview { padding: var(--space-6); border-radius: var(--radius-xl); margin-bottom: var(--space-6); }
    .overview-main { display: flex; align-items: center; gap: var(--space-8); margin-bottom: var(--space-5); }
    .progress-ring-container { position: relative; width: 120px; height: 120px; }
    .progress-ring { width: 100%; height: 100%; transform: rotate(-90deg); }
    .ring-bg { fill: none; stroke: rgba(255,255,255,0.06); stroke-width: 8; }
    .ring-fill { fill: none; stroke: var(--accent-cyan); stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 0.8s ease; }
    .ring-text { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .ring-percent { font-size: 28px; font-weight: 800; color: var(--accent-cyan); }
    .ring-label { font-size: 11px; color: var(--text-muted); }
    .overview-stats { display: flex; gap: var(--space-6); flex: 1; }
    .stat-item { display: flex; flex-direction: column; }
    .stat-value { font-size: var(--text-xl); font-weight: 800; color: var(--text-primary); }
    .stat-label { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

    /* Progress bar with reward markers */
    .progress-bar-full {
      position: relative; height: 12px; border-radius: var(--radius-full);
      background: rgba(255,255,255,0.06); overflow: visible;
    }
    .progress-bar-fill {
      height: 100%; border-radius: var(--radius-full); transition: width 0.8s ease;
      background: linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo), var(--accent-rose));
    }
    .reward-marker {
      position: absolute; top: -10px; transform: translateX(-50%);
      font-size: 14px; opacity: 0.3; transition: all var(--transition-base);
      cursor: default;
    }
    .reward-marker.earned { opacity: 1; filter: none; transform: translateX(-50%) scale(1.2); }

    /* Rewards row */
    .rewards-row {
      display: flex; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-6);
      justify-content: center;
    }
    .reward-badge {
      display: flex; align-items: center; gap: var(--space-2);
      padding: var(--space-2) var(--space-4); border-radius: var(--radius-full);
      font-size: 13px;
    }
    .reward-icon { font-size: 18px; }
    .reward-name { font-weight: 600; }

    /* Phase legend */
    .phase-legend {
      display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center;
      margin-bottom: var(--space-6);
    }
    .phase-chip {
      padding: var(--space-1) var(--space-3); border-radius: var(--radius-full);
      font-size: 12px; font-weight: 600;
    }
    .phase-indigo { background: rgba(99,102,241,0.12); color: var(--accent-indigo); }
    .phase-amber { background: rgba(245,158,11,0.12); color: var(--accent-amber); }
    .phase-emerald { background: rgba(16,185,129,0.12); color: var(--accent-emerald); }
    .phase-rose { background: rgba(244,63,94,0.12); color: var(--accent-rose); }

    /* Week cards */
    .weeks-container { display: flex; flex-direction: column; gap: var(--space-4); }
    .week-card { border-radius: var(--radius-xl); overflow: hidden; transition: all var(--transition-base); }
    .week-card.current-week { border-color: var(--accent-cyan) !important; box-shadow: 0 0 20px rgba(6,182,212,0.1); }
    .week-card.week-done { border-color: var(--accent-emerald) !important; }
    .week-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: var(--space-5) var(--space-6); cursor: pointer;
      transition: background var(--transition-fast);
    }
    .week-header:hover { background: rgba(255,255,255,0.03); }
    .week-info { flex: 1; }
    .week-badges { display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-2); }
    .week-phase-tag { font-size: 11px; color: var(--text-muted); }
    .week-title { font-size: var(--text-base); font-weight: 700; }
    .week-progress-mini { display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-2); }
    .mini-bar { flex: 1; max-width: 200px; height: 6px; background: rgba(255,255,255,0.06); border-radius: var(--radius-full); }
    .mini-fill { height: 100%; border-radius: var(--radius-full); background: var(--accent-cyan); transition: width 0.4s; }
    .week-progress-mini span { font-size: 12px; color: var(--text-muted); }
    .week-right { display: flex; align-items: center; gap: var(--space-3); }
    .week-reward { font-size: 28px; }
    .week-reward.locked { filter: grayscale(1); opacity: 0.3; }
    .week-reward.earned { animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
    .week-toggle { color: var(--text-muted); font-size: 14px; }

    /* Day cards */
    .week-days { padding: 0 var(--space-5) var(--space-5); display: flex; flex-direction: column; gap: var(--space-3); }
    .day-card {
      display: flex; gap: var(--space-4); padding: var(--space-4) var(--space-5);
      background: rgba(255,255,255,0.02); border-radius: var(--radius-lg);
      border: 1px solid transparent; transition: all var(--transition-fast);
    }
    .day-card:hover { background: rgba(255,255,255,0.04); }
    .day-card.day-today { border-color: var(--accent-cyan); background: rgba(6,182,212,0.04); }
    .day-card.day-done { opacity: 0.6; }
    .day-card.day-done .day-title { text-decoration: line-through; }
    .day-left { padding-top: 2px; }
    .day-check {
      background: none; border: none; cursor: pointer; font-size: 20px;
      transition: transform var(--transition-fast); padding: 0;
    }
    .day-check:hover { transform: scale(1.2); }
    .day-content { flex: 1; min-width: 0; }
    .day-top { display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-1); }
    .day-num { font-size: 12px; font-weight: 700; color: var(--accent-cyan); }
    .day-date { font-size: 11px; color: var(--text-muted); }
    .day-time { font-size: 11px; color: var(--text-muted); margin-left: auto; }
    .day-title { font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-2); }
    .day-tasks { list-style: none; padding: 0; margin: 0; }
    .day-tasks li {
      font-size: 13px; color: var(--text-secondary); padding: 3px 0 3px 16px;
      position: relative; line-height: 1.5;
    }
    .day-tasks li::before { content: '→'; position: absolute; left: 0; color: var(--text-muted); font-size: 11px; }

    /* Edit mode */
    .edit-tasks-area {
      width: 100%; min-height: 120px; padding: var(--space-3); border-radius: var(--radius-md);
      background: var(--bg-surface); border: 1px solid var(--accent-cyan);
      color: var(--text-primary); font-family: var(--font-sans); font-size: 13px;
      line-height: 1.6; resize: vertical; outline: none;
    }
    .edit-actions { display: flex; gap: var(--space-2); margin-top: var(--space-2); }

    /* Reward preview in week */
    .reward-preview {
      display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4);
      border-radius: var(--radius-lg); opacity: 0.6;
    }
    .reward-preview strong { font-size: var(--text-sm); }
    .reward-preview p { font-size: 12px; color: var(--text-muted); margin: 2px 0; }
    .reward-preview small { font-size: 11px; color: var(--accent-amber); }
    .reward-preview.earned-glow {
      opacity: 1;
      background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.08));
      border: 1px solid rgba(16,185,129,0.2);
    }

    @media (max-width: 768px) {
      .overview-main { flex-direction: column; }
      .overview-stats { flex-wrap: wrap; gap: var(--space-4); }
      .day-top { flex-direction: column; align-items: flex-start; }
      .day-time { margin-left: 0; }
    }
    `;
    container.appendChild(style);
}
