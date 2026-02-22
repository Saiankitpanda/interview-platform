// ═══════════════════════════════════════════════════════════
// Rubric Card Component
// ═══════════════════════════════════════════════════════════

import { getScoreLevel, getScoreColor } from '../data/rubrics.js';

export function renderRubricCard(dimension, score) {
    const level = getScoreLevel(score);
    const pct = (score / 5) * 100;

    return `
    <div class="score-card glass" data-level="${level}">
      <div class="score-card-header">
        <span class="score-card-title">${dimension.icon} ${dimension.label}</span>
        <span class="score-card-value">${score.toFixed(1)}</span>
      </div>
      <div class="score-card-bar">
        <div class="score-card-bar-fill" style="width: ${pct}%"></div>
      </div>
      <p class="score-card-feedback">${dimension.description}</p>
    </div>
  `;
}

export function renderRadarChart(canvas, dimensions, scores) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(cx, cy) * 0.75;
    const n = dimensions.length;

    ctx.clearRect(0, 0, w, h);

    // Draw grid
    for (let ring = 1; ring <= 5; ring++) {
        const ringR = (ring / 5) * r;
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * ringR;
            const y = cy + Math.sin(angle) * ringR;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Draw data polygon
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
        const idx = i % n;
        const angle = (idx / n) * Math.PI * 2 - Math.PI / 2;
        const val = scores[dimensions[idx].id] || 0;
        const pr = (val / 5) * r;
        const x = cx + Math.cos(angle) * pr;
        const y = cy + Math.sin(angle) * pr;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw dots and labels
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const val = scores[dimensions[i].id] || 0;
        const pr = (val / 5) * r;
        const dx = cx + Math.cos(angle) * pr;
        const dy = cy + Math.sin(angle) * pr;

        // Dot
        ctx.beginPath();
        ctx.arc(dx, dy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        const lx = cx + Math.cos(angle) * (r + 20);
        const ly = cy + Math.sin(angle) * (r + 20);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = Math.cos(angle) < -0.1 ? 'right' : Math.cos(angle) > 0.1 ? 'left' : 'center';
        ctx.textBaseline = Math.sin(angle) < -0.1 ? 'bottom' : Math.sin(angle) > 0.1 ? 'top' : 'middle';
        ctx.fillText(dimensions[i].label, lx, ly);
    }
}
