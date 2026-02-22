// ═══════════════════════════════════════════════════════════
// Interview Engine — Core State Machine
// ═══════════════════════════════════════════════════════════

import { getRubric } from '../data/rubrics.js';

export class InterviewEngine {
    constructor({ roundType, mode, question, difficulty }) {
        this.roundType = roundType;
        this.mode = mode; // 'strict' or 'coaching'
        this.question = question;
        this.difficulty = difficulty;
        this.rubric = getRubric(roundType);
        this.stages = this.rubric.stages;
        this.currentStageIndex = 0;
        this.conversation = [];
        this.artifacts = [];
        this.scores = {};
        this.hintsUsed = 0;
        this.maxHints = mode === 'coaching' ? 3 : 1;
        this.startTime = Date.now();
        this.totalTimeMs = this.rubric.timeMinutes * 60 * 1000;
        this.candidateApproach = '';
        this.candidateCode = '';
        this.testResults = [];
        this.stageData = {};
        this.isComplete = false;

        // Initialize scores
        for (const dim of this.rubric.dimensions) {
            this.scores[dim.id] = 3; // default mid-range
        }
    }

    get currentStage() {
        return this.stages[this.currentStageIndex];
    }

    get elapsedMs() {
        return Date.now() - this.startTime;
    }

    get remainingMs() {
        return Math.max(0, this.totalTimeMs - this.elapsedMs);
    }

    get progress() {
        return (this.currentStageIndex / (this.stages.length - 1)) * 100;
    }

    advanceStage() {
        if (this.currentStageIndex < this.stages.length - 1) {
            this.currentStageIndex++;
            return true;
        }
        return false;
    }

    goToStage(stageName) {
        const idx = this.stages.indexOf(stageName);
        if (idx >= 0) {
            this.currentStageIndex = idx;
            return true;
        }
        return false;
    }

    addMessage(role, content, meta = {}) {
        this.conversation.push({
            id: Date.now() + Math.random(),
            role,
            content,
            timestamp: Date.now(),
            stage: this.currentStage,
            ...meta
        });
    }

    addSystemMessage(content) {
        this.conversation.push({
            id: Date.now() + Math.random(),
            role: 'system',
            content,
            timestamp: Date.now()
        });
    }

    addArtifact(type, content) {
        this.artifacts.push({ type, content, timestamp: Date.now() });
    }

    getHint() {
        if (this.hintsUsed >= this.maxHints) {
            return null;
        }
        this.hintsUsed++;
        // Hints deduct from score
        this.updateScore('communication', -0.3);
        return this.hintsUsed;
    }

    updateScore(dimension, delta) {
        if (this.scores[dimension] !== undefined) {
            this.scores[dimension] = Math.max(1, Math.min(5, this.scores[dimension] + delta));
        }
    }

    setScore(dimension, value) {
        if (this.scores[dimension] !== undefined) {
            this.scores[dimension] = Math.max(1, Math.min(5, value));
        }
    }

    getAverageScore() {
        const vals = Object.values(this.scores);
        return vals.reduce((a, b) => a + b, 0) / vals.length;
    }

    complete() {
        this.isComplete = true;
        this.endTime = Date.now();
    }

    getState() {
        return {
            roundType: this.roundType,
            mode: this.mode,
            question: this.question,
            currentStage: this.currentStage,
            stageIndex: this.currentStageIndex,
            totalStages: this.stages.length,
            progress: this.progress,
            conversation: this.conversation,
            scores: { ...this.scores },
            hintsUsed: this.hintsUsed,
            maxHints: this.maxHints,
            elapsedMs: this.elapsedMs,
            remainingMs: this.remainingMs,
            isComplete: this.isComplete
        };
    }

    getReport() {
        const avg = this.getAverageScore();
        let verdict, verdictClass;
        if (avg >= 4.5) { verdict = 'Excellent — Strong Hire'; verdictClass = 'excellent'; }
        else if (avg >= 3.5) { verdict = 'Good — Lean Hire'; verdictClass = 'good'; }
        else if (avg >= 2.5) { verdict = 'Average — Borderline'; verdictClass = 'average'; }
        else { verdict = 'Needs Improvement — No Hire'; verdictClass = 'needs-work'; }

        return {
            roundType: this.roundType,
            mode: this.mode,
            question: this.question,
            scores: { ...this.scores },
            dimensions: this.rubric.dimensions,
            averageScore: avg,
            verdict,
            verdictClass,
            hintsUsed: this.hintsUsed,
            duration: this.endTime ? this.endTime - this.startTime : this.elapsedMs,
            conversation: this.conversation,
            artifacts: this.artifacts,
            testResults: this.testResults,
            timestamp: new Date().toISOString()
        };
    }
}
