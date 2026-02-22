// ═══════════════════════════════════════════════════════════
// Interview Page — Main Interview UI
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';
import { InterviewEngine } from '../engine/interviewEngine.js';
import { DSARound } from '../engine/dsaRound.js';
import { LLDRound } from '../engine/lldRound.js';
import { HLDRound } from '../engine/hldRound.js';
import { HRRound } from '../engine/hrRound.js';
import { generateReport } from '../engine/rubricScorer.js';
import { getRandomQuestion } from '../data/questions.js';
import { getRubric } from '../data/rubrics.js';
import { ChatComponent } from '../components/chat.js';
import { CodeEditorComponent } from '../components/codeEditor.js';
import { TimerComponent } from '../components/timer.js';

const ROUND_HANDLERS = { dsa: DSARound, lld: LLDRound, hld: HLDRound, hr: HRRound };
const ROUND_LABELS = { dsa: 'DSA Coding', lld: 'Low-Level Design', hld: 'System Design', hr: 'Behavioral' };

export function renderInterviewPage(container, params = {}) {
    const round = params.round || 'dsa';
    const mode = params.mode || 'coaching';
    const difficulty = params.difficulty || 'medium';

    const question = getRandomQuestion(round, difficulty);
    if (!question) {
        container.innerHTML = `<div class="page-container"><h2>No questions found for ${round} (${difficulty})</h2></div>`;
        return;
    }

    const rubric = getRubric(round);
    const engine = new InterviewEngine({ roundType: round, mode, question, difficulty });
    const RoundHandler = ROUND_HANDLERS[round];
    const roundLogic = new RoundHandler(engine);

    // Store globally for report access
    window.__interviewEngine = engine;
    window.__interviewReport = null;

    const showEditor = round === 'dsa' || round === 'lld';

    container.innerHTML = `
    <div class="interview-layout ${!showEditor ? 'full-chat' : ''}">
      <div class="interview-topbar">
        <div class="interview-topbar-left">
          <button class="back-button" id="back-btn">← Exit</button>
          <span class="badge badge-${round === 'dsa' ? 'indigo' : round === 'lld' ? 'emerald' : round === 'hld' ? 'amber' : 'rose'}">${ROUND_LABELS[round]}</span>
          <span class="badge badge-${mode === 'strict' ? 'rose' : 'emerald'}">${mode === 'strict' ? '🔒 Strict' : '💡 Coaching'}</span>
        </div>
        <div class="interview-topbar-center">
          <div class="stage-pills" id="stage-pills">
            ${rubric.stages.map((s, i) => `<div class="stage-pill ${i === 0 ? 'active' : ''}" data-stage="${s}">${formatStageName(s)}</div>`).join('')}
          </div>
        </div>
        <div class="interview-topbar-right">
          <div id="timer-container"></div>
          <button class="btn btn-primary btn-sm" id="end-btn" style="display:none;">📊 View Report</button>
        </div>
      </div>

      <div class="interview-chat-panel" id="chat-panel"></div>

      ${showEditor ? '<div class="interview-editor-panel" id="editor-panel"></div>' : ''}
    </div>
  `;

    // Add interview-specific styles
    addInterviewStyles(container, showEditor);

    // Initialize components
    const chatPanel = container.querySelector('#chat-panel');
    const chat = new ChatComponent(chatPanel, {
        onSend: (text) => handleCandidateInput(text),
        onHint: () => handleHintRequest()
    });

    let editor = null;
    if (showEditor) {
        const editorPanel = container.querySelector('#editor-panel');
        editor = new CodeEditorComponent(editorPanel, {
            onSubmit: (code, lang) => {
                engine.candidateCode = code;
                engine.addArtifact('code', code);
                handleCandidateInput('I have submitted my code. Please review it.');
            }
        });
    }

    const timerContainer = container.querySelector('#timer-container');
    const timer = new TimerComponent(timerContainer, {
        totalMinutes: rubric.timeMinutes,
        onComplete: () => {
            chat.addSystemMessage('⏰ Time is up! Let\'s wrap up.');
            if (!engine.isComplete) {
                engine.goToStage('wrapUp');
                const response = roundLogic.processInput('Time is up, let me wrap up.');
                showInterviewerResponse(response);
            }
        },
        onWarning: () => {
            chat.addSystemMessage('⚠️ 5 minutes remaining!');
        }
    });

    const endBtn = container.querySelector('#end-btn');
    const backBtn = container.querySelector('#back-btn');

    // Start the interview
    timer.start();
    const introMsg = roundLogic.processInput('');
    showInterviewerResponse(introMsg);

    // Set initial quick actions
    updateQuickActions();

    // Event listeners
    backBtn.addEventListener('click', () => {
        timer.destroy();
        router.navigate('/');
    });

    endBtn.addEventListener('click', () => {
        timer.destroy();
        const report = generateReport(engine);
        window.__interviewReport = report;
        router.navigate('/report');
    });

    // Input handler
    function handleCandidateInput(text) {
        chat.addMessage('candidate', text);
        engine.addMessage('candidate', text);

        chat.showTyping();

        // Simulate thinking delay
        setTimeout(() => {
            chat.hideTyping();

            const response = roundLogic.processInput(text);
            showInterviewerResponse(response);
            updateStageIndicator();
            updateQuickActions();

            if (engine.isComplete) {
                endBtn.style.display = 'inline-flex';
                chat.addSystemMessage('Interview complete! Click "View Report" to see your evaluation.');
            }
        }, 800 + Math.random() * 700);
    }

    function handleHintRequest() {
        if (engine.hintsUsed >= engine.maxHints) {
            chat.addSystemMessage(`No more hints available (${engine.hintsUsed}/${engine.maxHints} used).`);
            return;
        }
        handleCandidateInput('I need a hint please.');
    }

    function showInterviewerResponse(text) {
        chat.addMessage('interviewer', text);
        engine.addMessage('interviewer', text);
    }

    function updateStageIndicator() {
        const pills = container.querySelectorAll('.stage-pill');
        pills.forEach((pill, i) => {
            pill.classList.remove('active', 'completed');
            if (i < engine.currentStageIndex) pill.classList.add('completed');
            if (i === engine.currentStageIndex) pill.classList.add('active');
        });
    }

    function updateQuickActions() {
        const stage = engine.currentStage;
        const actions = [];

        if (mode === 'coaching' && engine.hintsUsed < engine.maxHints) {
            actions.push({ label: '💡 Get Hint', action: 'hint' });
        }

        if (stage === 'clarify') {
            actions.push({ label: 'Ready for approach', action: 'text' });
        } else if (stage === 'code') {
            actions.push({ label: 'Code is ready', action: 'text' });
        } else if (stage === 'test') {
            actions.push({ label: 'Edge cases covered', action: 'text' });
        }

        chat.setQuickActions(actions);
    }
}

function formatStageName(stage) {
    const names = {
        intro: 'Start',
        clarify: 'Clarify',
        approach: 'Approach',
        code: 'Code',
        test: 'Test',
        optimize: 'Optimize',
        wrapUp: 'Wrap Up',
        requirements: 'Reqs',
        entities: 'Entities',
        relationships: 'Relations',
        patterns: 'Patterns',
        estimation: 'Estimate',
        architecture: 'Arch',
        dataModel: 'Data',
        api: 'API',
        tradeoffs: 'Tradeoffs',
        question: 'Question',
        followUp1: 'Follow-up',
        followUp2: 'Follow-up',
        followUp3: 'Follow-up'
    };
    return names[stage] || stage;
}

function addInterviewStyles(container, showEditor) {
    const style = document.createElement('style');
    style.textContent = `
    .interview-layout.full-chat {
      grid-template-columns: 1fr !important;
    }
    .interview-layout.full-chat .interview-chat-panel {
      border-right: none;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
    }
  `;
    container.appendChild(style);
}
