// ═══════════════════════════════════════════════════════════
// Code Editor Component — CodeMirror 6 Wrapper
// ═══════════════════════════════════════════════════════════

import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, indentWithTab, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { bracketMatching, indentOnInput, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { closeBrackets } from '@codemirror/autocomplete';
import { runCode, getDefaultCode, getSupportedLanguages } from '../services/codeRunner.js';

const LANG_EXTENSIONS = {
    python: () => python(),
    javascript: () => javascript(),
    java: () => java(),
    cpp: () => cpp()
};

export class CodeEditorComponent {
    constructor(container, { onSubmit }) {
        this.container = container;
        this.onSubmit = onSubmit;
        this.currentLang = 'python';
        this.isRunning = false;
        this.editor = null;
        this.render();
    }

    render() {
        this.container.innerHTML = `
      <div class="editor-container">
        <div class="editor-toolbar">
          <div class="editor-toolbar-left">
            <select class="lang-selector" id="lang-selector">
              ${getSupportedLanguages().map(l =>
            `<option value="${l}" ${l === this.currentLang ? 'selected' : ''}>${l.charAt(0).toUpperCase() + l.slice(1)}</option>`
        ).join('')}
            </select>
          </div>
          <div class="editor-toolbar-right">
            <button class="run-btn" id="run-btn">▶ Run</button>
            <button class="submit-btn" id="submit-btn">Submit ✓</button>
          </div>
        </div>
        <div class="editor-area" id="editor-area"></div>
        <div class="output-panel" id="output-panel" style="display:none;">
          <div class="output-header">
            <span class="output-header-title">Output</span>
            <button class="btn-ghost btn-sm" id="close-output">✕</button>
          </div>
          <div class="output-body" id="output-body"></div>
          <div class="output-stats" id="output-stats" style="display:none;"></div>
        </div>
      </div>
    `;

        this.editorAreaEl = this.container.querySelector('#editor-area');
        this.outputPanelEl = this.container.querySelector('#output-panel');
        this.outputBodyEl = this.container.querySelector('#output-body');
        this.outputStatsEl = this.container.querySelector('#output-stats');
        this.runBtn = this.container.querySelector('#run-btn');
        this.submitBtn = this.container.querySelector('#submit-btn');
        this.langSelector = this.container.querySelector('#lang-selector');
        this.closeOutputBtn = this.container.querySelector('#close-output');

        // Initialize CodeMirror
        this.createEditor(this.currentLang);

        // Events
        this.langSelector.addEventListener('change', (e) => {
            this.currentLang = e.target.value;
            const code = this.getCode();
            this.createEditor(this.currentLang, code || getDefaultCode(this.currentLang));
        });

        this.runBtn.addEventListener('click', () => this.handleRun());
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
        this.closeOutputBtn.addEventListener('click', () => {
            this.outputPanelEl.style.display = 'none';
        });
    }

    createEditor(lang, initialCode = null) {
        if (this.editor) this.editor.destroy();

        const langExt = LANG_EXTENSIONS[lang] ? LANG_EXTENSIONS[lang]() : javascript();
        const code = initialCode || getDefaultCode(lang);

        const state = EditorState.create({
            doc: code,
            extensions: [
                lineNumbers(),
                highlightActiveLineGutter(),
                highlightSpecialChars(),
                history(),
                drawSelection(),
                EditorState.allowMultipleSelections.of(true),
                indentOnInput(),
                syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                bracketMatching(),
                closeBrackets(),
                highlightActiveLine(),
                keymap.of([
                    ...defaultKeymap,
                    ...historyKeymap,
                    indentWithTab
                ]),
                langExt,
                oneDark,
                EditorView.theme({
                    '&': { height: '100%' },
                    '.cm-scroller': { overflow: 'auto' }
                })
            ]
        });

        this.editor = new EditorView({
            state,
            parent: this.editorAreaEl
        });
    }

    getCode() {
        return this.editor ? this.editor.state.doc.toString() : '';
    }

    async handleRun() {
        if (this.isRunning) return;

        const code = this.getCode();
        if (!code.trim()) return;

        this.isRunning = true;
        this.runBtn.classList.add('running');
        this.runBtn.disabled = true;
        this.runBtn.textContent = '⏳ Running...';
        this.outputPanelEl.style.display = 'flex';
        this.outputBodyEl.textContent = 'Executing...';
        this.outputBodyEl.className = 'output-body';

        try {
            const result = await runCode(this.currentLang, code);

            if (result.success) {
                this.outputBodyEl.textContent = result.output || '(no output)';
                this.outputBodyEl.className = 'output-body success';
            } else {
                this.outputBodyEl.textContent = result.error || result.output || 'Error';
                this.outputBodyEl.className = 'output-body error';
            }

            if (result.time) {
                this.outputStatsEl.style.display = 'flex';
                this.outputStatsEl.innerHTML = `
          <span class="output-stat">⏱ ${result.time}s</span>
          <span class="output-stat">${result.success ? '✅ Success' : '❌ Error'}</span>
        `;
            }
        } catch (err) {
            this.outputBodyEl.textContent = `Error: ${err.message}`;
            this.outputBodyEl.className = 'output-body error';
        }

        this.isRunning = false;
        this.runBtn.classList.remove('running');
        this.runBtn.disabled = false;
        this.runBtn.textContent = '▶ Run';
    }

    handleSubmit() {
        const code = this.getCode();
        if (this.onSubmit) this.onSubmit(code, this.currentLang);
    }

    destroy() {
        if (this.editor) this.editor.destroy();
    }
}
