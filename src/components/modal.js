// ═══════════════════════════════════════════════════════════
// Modal Component
// ═══════════════════════════════════════════════════════════

export function showModal(title, content, actions = []) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modal-overlay';

    overlay.innerHTML = `
    <div class="modal animate-scale-in">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close" id="modal-close">✕</button>
      </div>
      <div class="modal-body">${content}</div>
      ${actions.length > 0 ? `
        <div class="modal-actions">
          ${actions.map(a => `<button class="btn ${a.class || 'btn-secondary'}" data-action="${a.id}">${a.label}</button>`).join('')}
        </div>` : ''}
    </div>
  `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.7);
      backdrop-filter: blur(4px); display: flex; align-items: center;
      justify-content: center; z-index: 1000; animation: fadeIn 0.2s ease-out;
    }
    .modal {
      background: var(--bg-secondary); border: 1px solid var(--glass-border);
      border-radius: var(--radius-xl); max-width: 500px; width: 90%;
      max-height: 80vh; display: flex; flex-direction: column;
    }
    .modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--space-5) var(--space-6); border-bottom: 1px solid var(--glass-border);
    }
    .modal-title { font-size: var(--text-lg); font-weight: 700; }
    .modal-close {
      background: none; border: none; color: var(--text-muted); cursor: pointer;
      font-size: 18px; padding: 4px; transition: color 0.15s;
    }
    .modal-close:hover { color: var(--text-primary); }
    .modal-body { padding: var(--space-6); overflow-y: auto; }
    .modal-actions {
      display: flex; justify-content: flex-end; gap: var(--space-3);
      padding: var(--space-4) var(--space-6); border-top: 1px solid var(--glass-border);
    }
  `;
    overlay.appendChild(style);
    document.body.appendChild(overlay);

    // Close events
    overlay.querySelector('#modal-close').addEventListener('click', () => closeModal());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Action events
    return new Promise((resolve) => {
        overlay.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                closeModal();
                resolve(btn.dataset.action);
            });
        });
    });
}

export function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.remove();
}
