// ═══════════════════════════════════════════════════════════
// Report Page — Detailed Interview Evaluation
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';
import { renderRubricCard, renderRadarChart } from '../components/rubricCard.js';
import { getScoreLevel } from '../data/rubrics.js';

const ROUND_LABELS = { dsa: 'DSA Coding', lld: 'Low-Level Design', hld: 'System Design', hr: 'Behavioral' };

export function renderReportPage(container) {
    const report = window.__interviewReport;
    if (!report) {
        container.innerHTML = `
      <div class="page-container" style="text-align:center; padding-top:100px;">
        <p style="font-size:48px;">📊</p>
        <h2 style="margin:16px 0 8px;">No Report Available</h2>
        <p style="color:var(--text-secondary);">Complete an interview first to see your report.</p>
        <button class="btn btn-primary" style="margin-top:24px;" onclick="location.hash='/'">Start Interview</button>
      </div>
    `;
        return;
    }

    const durationMin = Math.floor(report.duration / 60000);
    const durationSec = Math.floor((report.duration % 60000) / 1000);

    container.innerHTML = `
    <div class="report-page">
      <!-- Header -->
      <div class="report-header">
        <h1 class="report-title">Interview Report</h1>
        <p class="report-subtitle">${ROUND_LABELS[report.roundType]} — ${report.mode === 'strict' ? '🔒 Strict' : '💡 Coaching'} Mode</p>
        <div class="report-meta">
          <span class="report-meta-item">📅 ${new Date(report.timestamp).toLocaleDateString()}</span>
          <span class="report-meta-item">⏱ ${durationMin}m ${durationSec}s</span>
          <span class="report-meta-item">💡 ${report.hintsUsed} hint(s) used</span>
        </div>
      </div>

      <!-- Overall Score -->
      <div class="report-overall">
        <div class="overall-score-ring">
          <canvas id="overall-canvas" width="160" height="160"></canvas>
          <div class="overall-score-value">
            <div class="overall-score-number">${report.averageScore.toFixed(1)}</div>
            <div class="overall-score-label">out of 5.0</div>
          </div>
        </div>
        <div class="overall-verdict">
          <div class="verdict-level ${report.verdictClass}">${report.verdict}</div>
          <p class="verdict-text">${getVerdictText(report)}</p>
        </div>
      </div>

      <!-- Radar Chart -->
      <div class="report-radar">
        <canvas class="radar-canvas" id="radar-canvas" width="360" height="360"></canvas>
      </div>

      <!-- Score Cards -->
      <div class="report-scores">
        ${report.dimensions.map(d => renderRubricCard(d, report.scores[d.id])).join('')}
      </div>

      <!-- Strengths -->
      ${report.strengths && report.strengths.length > 0 ? `
      <div class="report-section">
        <h2 class="report-section-title"><span class="report-section-icon">💪</span> Top Strengths</h2>
        <div class="finding-list">
          ${report.strengths.map((s, i) => `
            <div class="finding-item strength glass">
              <div class="finding-number">${i + 1}</div>
              <div class="finding-content">
                <div class="finding-title">${s.title}</div>
                <p class="finding-evidence">${s.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- Mistakes -->
      ${report.mistakes && report.mistakes.length > 0 ? `
      <div class="report-section">
        <h2 class="report-section-title"><span class="report-section-icon">🎯</span> Areas to Improve</h2>
        <div class="finding-list">
          ${report.mistakes.map((m, i) => `
            <div class="finding-item mistake glass">
              <div class="finding-number">${i + 1}</div>
              <div class="finding-content">
                <div class="finding-title">${m.title}</div>
                <p class="finding-evidence">${m.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- 7-Day Practice Plan -->
      ${report.practicePlan ? `
      <div class="report-section">
        <h2 class="report-section-title"><span class="report-section-icon">📅</span> 7-Day Practice Plan</h2>
        <div class="practice-plan">
          ${report.practicePlan.map(p => `
            <div class="practice-day glass">
              <div class="practice-day-number">Day ${p.day}</div>
              <div class="practice-day-topic" style="font-weight:600; margin-bottom:4px;">${p.topic}</div>
              <div class="practice-day-topic">${p.activity}</div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- Actions -->
      <div class="report-actions">
        <button class="btn btn-secondary" id="back-home">← Back to Dashboard</button>
        <button class="btn btn-primary" id="retry-btn">🔄 Try Again</button>
      </div>
    </div>
  `;

    // Draw overall score ring
    const overallCanvas = container.querySelector('#overall-canvas');
    drawScoreRing(overallCanvas, report.averageScore);

    // Draw radar chart
    const radarCanvas = container.querySelector('#radar-canvas');
    renderRadarChart(radarCanvas, report.dimensions, report.scores);

    // Animate score bars
    requestAnimationFrame(() => {
        container.querySelectorAll('.score-card-bar-fill').forEach(bar => {
            const card = bar.closest('.score-card');
            const dimId = report.dimensions.find(d => card.querySelector('.score-card-title').textContent.includes(d.label))?.id;
            if (dimId) {
                const pct = (report.scores[dimId] / 5) * 100;
                bar.style.width = pct + '%';
            }
        });
    });

    // Events
    container.querySelector('#back-home').addEventListener('click', () => router.navigate('/'));
    container.querySelector('#retry-btn').addEventListener('click', () => {
        router.navigate(`/interview?round=${report.roundType}&mode=${report.mode}&difficulty=medium`);
    });
}

function drawScoreRing(canvas, score) {
    const ctx = canvas.getContext('2d');
    const cx = 80, cy = 80, r = 65;
    const fraction = score / 5;

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Score arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + fraction * Math.PI * 2;

    const gradient = ctx.createLinearGradient(0, 0, 160, 160);
    if (fraction >= 0.8) {
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(1, '#34d399');
    } else if (fraction >= 0.6) {
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(1, '#818cf8');
    } else if (fraction >= 0.4) {
        gradient.addColorStop(0, '#f59e0b');
        gradient.addColorStop(1, '#fbbf24');
    } else {
        gradient.addColorStop(0, '#f43f5e');
        gradient.addColorStop(1, '#fb7185');
    }

    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function getVerdictText(report) {
    const avg = report.averageScore;
    if (avg >= 4.5) return 'Outstanding performance across all dimensions. You demonstrated strong problem-solving skills and clear communication.';
    if (avg >= 3.5) return 'Solid performance with room for improvement in specific areas. Focus on the weak spots identified below.';
    if (avg >= 2.5) return 'Average performance. Review the practice plan carefully and focus on fundamentals before your next attempt.';
    return 'More practice needed. Focus on the basics and work through the 7-day plan before attempting again.';
}
