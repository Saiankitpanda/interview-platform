// ═══════════════════════════════════════════════════════════
// HR Round — Behavioral Interview Flow
// ═══════════════════════════════════════════════════════════

export class HRRound {
    constructor(engine) {
        this.engine = engine;
        this.q = engine.question;
        this.followUpIndex = 0;
        this.starDetected = false;
    }

    getInitialMessage() {
        return `Let's begin the **Behavioral** round.\n\nI'll ask you a question, and I'd like you to answer using the **STAR format**:\n- **S**ituation — Set the context\n- **T**ask — What was your responsibility\n- **A**ction — What did you specifically do\n- **R**esult — What was the outcome (ideally with metrics)\n\nHere's your question:\n\n> ${this.q.statement}\n\nTake a moment to think, then walk me through your experience.`;
    }

    processInput(input) {
        const stage = this.engine.currentStage;
        switch (stage) {
            case 'intro': this.engine.advanceStage(); return this.getInitialMessage();
            case 'question': return this.handleMainAnswer(input);
            case 'followUp1': return this.handleFollowUp(input, 0);
            case 'followUp2': return this.handleFollowUp(input, 1);
            case 'followUp3': return this.handleFollowUp(input, 2);
            case 'wrapUp': return this.handleWrapUp(input);
            default: return "Continue with your answer.";
        }
    }

    handleMainAnswer(input) {
        const text = input.toLowerCase();
        const wordCount = input.split(/\s+/).length;

        // Check STAR format
        this.starDetected = /situation|task|action|result|context|responsible|did|outcome|impact/i.test(text);

        if (wordCount < 30) {
            return "Your answer is quite brief. Can you provide more detail?\n\n" +
                "Remember the **STAR format**:\n" +
                "- **Situation**: What was the context?\n" +
                "- **Task**: What were you responsible for?\n" +
                "- **Action**: What specific steps did you take?\n" +
                "- **Result**: What was the measurable outcome?";
        }

        // Score clarity
        if (this.starDetected) {
            this.engine.updateScore('clarity', 0.4);
        } else {
            this.engine.updateScore('clarity', -0.3);
        }

        // Score ownership
        if (/\bi\b.*\b(did|led|drove|initiated|decided|built|created|proposed)\b/i.test(text)) {
            this.engine.updateScore('ownership', 0.3);
        }
        if (/\bwe\b/i.test(text) && !/\bi\b.*\b(specifically|personally|my role)\b/i.test(text)) {
            this.engine.updateScore('ownership', -0.2);
        }

        // Score impact
        if (/\d+%|\$\d|reduced|increased|improved|saved|revenue|users|growth|metric/i.test(text)) {
            this.engine.updateScore('impact', 0.4);
        }

        this.engine.advanceStage();
        const followUps = this.q.followUps || [];
        const followUp = followUps[0] || "What was the most challenging aspect of this situation?";

        let response = "";
        if (!this.starDetected) {
            response = "I appreciate the answer, but I'd like more structure. Try framing it with the STAR method.\n\n";
        }

        return response + `Let me dig deeper: **${followUp}**`;
    }

    handleFollowUp(input, index) {
        const text = input.toLowerCase();
        const wordCount = input.split(/\s+/).length;

        if (wordCount < 15) {
            return "Can you elaborate more? I'm looking for specific details and concrete examples.";
        }

        // Evaluate the follow-up response
        if (/specific|example|instance|for instance|particularly/i.test(text)) {
            this.engine.updateScore('clarity', 0.15);
        }
        if (/learn|reflect|realize|takeaway|lesson|change|improve/i.test(text)) {
            this.engine.updateScore('reflection', 0.3);
        }
        if (/team|collaborat|together|partner|stakeholder|cross.?functional/i.test(text)) {
            this.engine.updateScore('collaboration', 0.2);
        }
        if (/impact|result|outcome|success|metric|number|percent/i.test(text)) {
            this.engine.updateScore('impact', 0.2);
        }

        this.engine.advanceStage();
        const followUps = this.q.followUps || [];
        const nextFollowUp = followUps[index + 1];

        if (nextFollowUp && this.engine.currentStage !== 'wrapUp') {
            return `Got it. **${nextFollowUp}**`;
        }

        return "Thank you for those details.\n\nLet me ask one final question: **Looking back at this entire experience, what one thing would you do differently if you could, and why?**";
    }

    handleWrapUp(input) {
        const text = input.toLowerCase();

        if (/different|change|better|improve|learn|retrospect/i.test(text)) {
            this.engine.updateScore('reflection', 0.3);
        }
        if (/because|reason|led me to|made me realize/i.test(text)) {
            this.engine.updateScore('reflection', 0.2);
        }

        // Final communication score
        const msgs = this.engine.conversation.filter(m => m.role === 'candidate');
        const avgLength = msgs.reduce((s, m) => s + m.content.split(/\s+/).length, 0) / msgs.length;
        if (avgLength > 40) this.engine.updateScore('clarity', 0.2);

        this.engine.complete();
        return "Thank you for sharing your experiences. That concludes the behavioral round.\n\nClick **\"View Report\"** to see your detailed evaluation and suggestions for improvement.";
    }
}
