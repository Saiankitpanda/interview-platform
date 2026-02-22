// ═══════════════════════════════════════════════════════════
// Timer Component — SVG Ring Countdown
// ═══════════════════════════════════════════════════════════

export class TimerComponent {
    constructor(container, { totalMinutes, onComplete, onWarning }) {
        this.container = container;
        this.totalMs = totalMinutes * 60 * 1000;
        this.remainingMs = this.totalMs;
        this.onComplete = onComplete;
        this.onWarning = onWarning;
        this.isRunning = false;
        this.isPaused = false;
        this.intervalId = null;
        this.warningShown = false;
        this.render();
    }

    render() {
        this.container.innerHTML = `
      <div class="timer-widget" id="timer-widget">
        <svg class="timer-ring" width="44" height="44" viewBox="0 0 44 44">
          <circle class="timer-ring-bg" cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/>
          <circle class="timer-ring-progress" id="timer-progress" cx="22" cy="22" r="18" fill="none"
            stroke="var(--accent-emerald)" stroke-width="3" stroke-linecap="round"
            stroke-dasharray="113.1" stroke-dashoffset="0"
            transform="rotate(-90 22 22)"/>
        </svg>
        <span class="timer-text" id="timer-text">${this.formatTime(this.remainingMs)}</span>
        <button class="timer-toggle" id="timer-toggle" title="Pause/Resume">⏸</button>
      </div>
    `;

        // Add timer styles inline (small component)
        const style = document.createElement('style');
        style.textContent = `
      .timer-widget {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 12px 4px 4px;
        border-radius: 999px;
        background: var(--bg-surface);
        border: 1px solid var(--glass-border);
      }
      .timer-ring { flex-shrink: 0; }
      .timer-text {
        font-family: var(--font-mono);
        font-size: 13px;
        font-weight: 600;
        color: var(--text-primary);
        min-width: 48px;
      }
      .timer-toggle {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 12px;
        padding: 2px;
        opacity: 0.6;
        transition: opacity 0.15s;
      }
      .timer-toggle:hover { opacity: 1; }
      .timer-widget.warning { border-color: var(--accent-amber); }
      .timer-widget.danger { border-color: var(--accent-rose); animation: glow-pulse 1.5s infinite; }
      @keyframes glow-pulse {
        0%,100% { box-shadow: 0 0 8px rgba(244,63,94,0.2); }
        50% { box-shadow: 0 0 16px rgba(244,63,94,0.4); }
      }
    `;
        this.container.appendChild(style);

        this.progressEl = this.container.querySelector('#timer-progress');
        this.textEl = this.container.querySelector('#timer-text');
        this.widgetEl = this.container.querySelector('#timer-widget');
        this.toggleBtn = this.container.querySelector('#timer-toggle');

        this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.isPaused = false;
        this.lastTick = Date.now();
        this.toggleBtn.textContent = '⏸';

        this.intervalId = setInterval(() => {
            if (this.isPaused) return;

            const now = Date.now();
            const elapsed = now - this.lastTick;
            this.lastTick = now;
            this.remainingMs = Math.max(0, this.remainingMs - elapsed);

            this.updateDisplay();

            if (this.remainingMs <= 0) {
                this.stop();
                if (this.onComplete) this.onComplete();
            }

            if (!this.warningShown && this.remainingMs <= 5 * 60 * 1000) {
                this.warningShown = true;
                if (this.onWarning) this.onWarning();
            }
        }, 1000);
    }

    stop() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    toggle() {
        if (!this.isRunning) {
            this.start();
        } else {
            this.isPaused = !this.isPaused;
            this.toggleBtn.textContent = this.isPaused ? '▶' : '⏸';
            if (!this.isPaused) this.lastTick = Date.now();
        }
    }

    updateDisplay() {
        const fraction = this.remainingMs / this.totalMs;
        const circumference = 2 * Math.PI * 18; // ~113.1
        const offset = circumference * (1 - fraction);

        this.progressEl.setAttribute('stroke-dashoffset', offset);
        this.textEl.textContent = this.formatTime(this.remainingMs);

        // Color transitions
        if (fraction > 0.3) {
            this.progressEl.setAttribute('stroke', 'var(--accent-emerald)');
            this.widgetEl.className = 'timer-widget';
        } else if (fraction > 0.1) {
            this.progressEl.setAttribute('stroke', 'var(--accent-amber)');
            this.widgetEl.className = 'timer-widget warning';
        } else {
            this.progressEl.setAttribute('stroke', 'var(--accent-rose)');
            this.widgetEl.className = 'timer-widget danger';
        }
    }

    formatTime(ms) {
        const totalSec = Math.ceil(ms / 1000);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }

    destroy() {
        this.stop();
    }
}
