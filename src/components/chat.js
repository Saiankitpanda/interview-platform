// ═══════════════════════════════════════════════════════════
// Chat Component
// ═══════════════════════════════════════════════════════════

import { marked } from 'marked';

// Configure marked
marked.setOptions({
    gfm: true,
    breaks: true
});

export class ChatComponent {
    constructor(container, { onSend, onHint }) {
        this.container = container;
        this.onSend = onSend;
        this.onHint = onHint;
        this.messages = [];
        this.isTyping = false;
        this.render();
    }

    render() {
        this.container.innerHTML = `
      <div class="chat-container">
        <div class="chat-messages" id="chat-messages"></div>
        <div class="chat-input-area">
          <div class="chat-quick-actions" id="chat-quick-actions"></div>
          <div class="chat-input-wrapper">
            <textarea class="chat-input" id="chat-input" placeholder="Type your response..." rows="1"></textarea>
            <button class="chat-send-btn" id="chat-send" title="Send (Enter)">➤</button>
          </div>
        </div>
      </div>
    `;

        this.messagesEl = this.container.querySelector('#chat-messages');
        this.inputEl = this.container.querySelector('#chat-input');
        this.sendBtn = this.container.querySelector('#chat-send');
        this.quickActionsEl = this.container.querySelector('#chat-quick-actions');

        // Auto-resize textarea
        this.inputEl.addEventListener('input', () => {
            this.inputEl.style.height = 'auto';
            this.inputEl.style.height = Math.min(this.inputEl.scrollHeight, 120) + 'px';
        });

        // Send on Enter (Shift+Enter for new line)
        this.inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        this.sendBtn.addEventListener('click', () => this.handleSend());
    }

    handleSend() {
        const text = this.inputEl.value.trim();
        if (!text || this.isTyping) return;

        this.inputEl.value = '';
        this.inputEl.style.height = 'auto';
        this.clearQuickActions();

        if (this.onSend) this.onSend(text);
    }

    addMessage(role, content) {
        const msg = { role, content, id: Date.now() + Math.random() };
        this.messages.push(msg);
        this.renderMessage(msg);
        this.scrollToBottom();
    }

    addSystemMessage(content) {
        const el = document.createElement('div');
        el.className = 'chat-system-message animate-fade-in';
        el.innerHTML = `<div class="system-content">📋 ${content}</div>`;
        this.messagesEl.appendChild(el);
        this.scrollToBottom();
    }

    renderMessage(msg) {
        const el = document.createElement('div');
        el.className = `chat-message ${msg.role}`;

        const avatarEmoji = msg.role === 'interviewer' ? '🎯' : '👤';
        const htmlContent = marked.parse(msg.content);

        el.innerHTML = `
      <div class="chat-avatar">${avatarEmoji}</div>
      <div class="chat-bubble">${htmlContent}</div>
    `;

        this.messagesEl.appendChild(el);
    }

    showTyping() {
        this.isTyping = true;
        this.sendBtn.disabled = true;

        const el = document.createElement('div');
        el.className = 'typing-indicator';
        el.id = 'typing-indicator';
        el.innerHTML = `
      <div class="chat-avatar" style="background: linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))">🎯</div>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
        this.messagesEl.appendChild(el);
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        this.sendBtn.disabled = false;
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    setQuickActions(actions) {
        this.quickActionsEl.innerHTML = actions.map(a =>
            `<button class="quick-action-btn" data-action="${a.action}">${a.label}</button>`
        ).join('');

        this.quickActionsEl.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'hint' && this.onHint) {
                    this.onHint();
                } else {
                    this.inputEl.value = btn.textContent;
                    this.handleSend();
                }
            });
        });
    }

    clearQuickActions() {
        this.quickActionsEl.innerHTML = '';
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
        });
    }

    focus() {
        this.inputEl.focus();
    }
}
