// ═══════════════════════════════════════════════════════════
// DSA Round — Interview flow logic
// ═══════════════════════════════════════════════════════════

export class DSARound {
    constructor(engine) {
        this.engine = engine;
        this.q = engine.question;
        this.approachDiscussed = false;
        this.codeSubmitted = false;
        this.testsRun = false;
        this.optimizationDiscussed = false;
    }

    getInitialMessage() {
        const statement = this.q.statement;
        const examples = this.q.examples.map((e, i) =>
            `**Example ${i + 1}:**\n\`\`\`\nInput: ${e.input}\nOutput: ${e.output}${e.explanation ? '\nExplanation: ' + e.explanation : ''}\n\`\`\``
        ).join('\n\n');

        const constraints = this.q.constraints.map(c => `- ${c}`).join('\n');

        return `Let's begin. Here's your problem:\n\n## ${this.q.title}\n\n${statement}\n\n${examples}\n\n**Constraints:**\n${constraints}\n\nTake a moment to read through this. Before jumping into a solution, what **clarifying questions** do you have about the problem?`;
    }

    processInput(input) {
        const stage = this.engine.currentStage;
        const text = input.toLowerCase().trim();

        switch (stage) {
            case 'intro':
                this.engine.advanceStage();
                return this.getInitialMessage();

            case 'clarify':
                return this.handleClarify(input);

            case 'approach':
                return this.handleApproach(input);

            case 'code':
                return this.handleCode(input);

            case 'test':
                return this.handleTest(input);

            case 'optimize':
                return this.handleOptimize(input);

            case 'wrapUp':
                return this.handleWrapUp(input);

            default:
                return "Let's continue. What are your thoughts?";
        }
    }

    handleClarify(input) {
        const text = input.toLowerCase();

        // Score understanding based on quality of clarifying questions
        if (/constraint|edge|empty|null|negative|overflow|duplicate|sort|order|unique/i.test(text)) {
            this.engine.updateScore('understanding', 0.3);
        }

        // Check if they're ready to move on
        if (/ready|proceed|move on|let me start|approach|solution|i think|my approach/i.test(text)) {
            this.engine.advanceStage();
            return "Good. Now walk me through your **initial approach**. Don't jump to code yet — I want to hear your thought process. What algorithm or data structure would you consider, and why?\n\nAlso tell me the **time and space complexity** of this initial approach.";
        }

        // Answer clarifying questions
        const answers = this.generateClarifyingAnswer(text);
        return answers + "\n\nAny other clarifying questions, or are you ready to discuss your approach?";
    }

    generateClarifyingAnswer(text) {
        if (/empty|null|zero/.test(text)) {
            return "Good question. Yes, the input could be empty — consider what your function should return in that case.";
        }
        if (/negative/.test(text)) {
            return "Check the constraints carefully — they specify the range of values. Think about whether negatives are possible given those constraints.";
        }
        if (/duplicate|same/.test(text)) {
            return "Duplicates are allowed unless stated otherwise. Consider how your approach handles them.";
        }
        if (/sorted|order/.test(text)) {
            return "The input is not guaranteed to be sorted unless explicitly stated. Would sorting help your approach?";
        }
        if (/overflow|large/.test(text)) {
            return "Good thinking about range. Check the constraints for the maximum possible values and plan accordingly.";
        }
        return "That's a fair question. Refer to the constraints I mentioned. Make any reasonable assumptions and state them.";
    }

    handleApproach(input) {
        const text = input.toLowerCase();

        // Look for complexity mentions
        const hasComplexity = /o\(.*\)|time|space|complex/i.test(text);
        const hasBruteForce = /brute|naive|simple|n\^2|n squared|nested loop/i.test(text);
        const hasOptimal = /sliding|window|hash|map|two.?pointer|binary.?search|dp|dynamic|greedy|bfs|dfs|topological|stack/i.test(text);

        if (!hasComplexity && this.approachDiscussed) {
            return "You mentioned an approach, but I didn't hear the **time and space complexity**. What would they be?";
        }

        if (!this.approachDiscussed) {
            this.approachDiscussed = true;

            if (hasOptimal) {
                this.engine.updateScore('optimality', 0.5);
                this.engine.updateScore('understanding', 0.3);
                this.engine.advanceStage();
                return "Good approach. You're heading in the right direction.\n\n" +
                    (hasComplexity ? "Your complexity analysis looks reasonable. " : "What's the **time and space complexity** of this approach?\n\n") +
                    "Go ahead and **implement this in code**. Choose your preferred language.";
            }

            if (hasBruteForce) {
                this.engine.updateScore('understanding', 0.2);
                return "Okay, that's a valid starting point. You identified a brute-force solution.\n\nThe complexity there would be high. **Can you think of a more efficient approach?** What data structure or technique might help reduce the time complexity?\n\nHint: Think about what redundant work is being done.";
            }

            return "I see you have some initial thoughts. Can you be more **specific** about:\n1. The exact data structure(s) you'd use\n2. The step-by-step algorithm\n3. The time and space complexity\n\nWalk me through it as if you're explaining to a colleague.";
        }

        if (hasComplexity) {
            this.engine.advanceStage();
            return "Alright, that analysis makes sense. Let's see this in code. Go ahead and **implement your solution**. You can use the code editor on the right.";
        }

        return "Can you be more precise about the complexity? What's the **time complexity** and **space complexity**?";
    }

    handleCode(input) {
        const text = input.toLowerCase();

        if (/done|finish|complet|submit|ready|writ|implement|here|code/i.test(text)) {
            this.codeSubmitted = true;
            this.engine.updateScore('correctness', 0.2);
            this.engine.advanceStage();
            return "I see your code. Before I evaluate it, let's talk about **testing**.\n\n" +
                "Walk me through the test cases you'd write. Include:\n" +
                "1. **Normal cases** — typical inputs\n" +
                "2. **Edge cases** — empty input, single element, boundary values\n" +
                "3. **Large inputs** — performance testing\n\n" +
                "What test cases would you run?";
        }

        if (/hint|stuck|help|not sure/i.test(text)) {
            return this.provideHint('code');
        }

        return "Take your time with the implementation. When you're done, let me know and we'll discuss testing. Use the code editor on the right panel.";
    }

    handleTest(input) {
        const text = input.toLowerCase();

        // Check for good testing practices
        if (/edge|boundary|empty|null|single|max|min|large|overflow/i.test(text)) {
            this.engine.updateScore('testing', 0.3);
        }
        if (/normal|typical|basic|standard/i.test(text)) {
            this.engine.updateScore('testing', 0.1);
        }

        this.testsRun = true;
        this.engine.advanceStage();

        return "Good test coverage thinking.\n\nNow let's talk about **optimization**.\n\n" +
            "1. Is your current solution optimal? If not, what would you improve?\n" +
            "2. Are there any **space-time tradeoffs** you could make?\n" +
            "3. What's the **best possible complexity** for this problem, and does your solution achieve it?";
    }

    handleOptimize(input) {
        const text = input.toLowerCase();

        if (/optimal|can't improve|best possible|already optimal|no improvement/i.test(text)) {
            this.engine.updateScore('optimality', 0.2);
        }
        if (/trade.?off|space.*time|time.*space|cache|memo|precompute/i.test(text)) {
            this.engine.updateScore('optimality', 0.3);
        }

        this.engine.advanceStage();
        return this.getWrapUpMessage();
    }

    handleWrapUp(input) {
        this.finalizeScores(input);
        this.engine.complete();
        return "Great work. That concludes this coding round.\n\nI'll prepare your evaluation report now. Click **\"View Report\"** to see your detailed scores and feedback.";
    }

    getWrapUpMessage() {
        return "Let's wrap up. In summary:\n\n" +
            "1. What was the **final time and space complexity** of your solution?\n" +
            "2. If you had **more time**, what would you improve or add?\n" +
            "3. Any **alternative approaches** you considered but didn't pursue?";
    }

    provideHint(stage) {
        const hintNum = this.engine.getHint();
        if (hintNum === null) {
            if (this.engine.mode === 'strict') {
                return "I've provided the maximum hints I can in Strict mode. Try to work through it step by step.";
            }
            return "You've used all available hints. Let me give you a more detailed walkthrough...";
        }

        const hints = this.getHintsForStage(stage);
        const hint = hints[Math.min(hintNum - 1, hints.length - 1)];

        return `💡 **Hint ${hintNum}:** ${hint}`;
    }

    getHintsForStage(stage) {
        // Generic hints based on the question's expected outline
        const outline = this.q.expectedOutline || '';
        const pitfalls = this.q.pitfalls || [];

        if (stage === 'approach') {
            return [
                `Think about what information you need to track. Is there a way to avoid recomputing the same values?`,
                `Consider the key technique: ${outline.split('.')[0] || 'Think about common patterns for this type of problem'}.`,
                this.engine.mode === 'coaching' ? `The expected approach involves: ${outline}` : 'Try breaking the problem into smaller subproblems.'
            ];
        }

        if (stage === 'code') {
            return [
                `Start by writing the function signature and handling edge cases first.`,
                `Watch out for: ${pitfalls[0] || 'off-by-one errors and boundary cases'}`,
                this.engine.mode === 'coaching' ? `Key implementation detail: ${outline}` : 'Review your approach step by step before coding.'
            ];
        }

        return ['Think about the problem constraints — they often hint at the expected complexity.'];
    }

    finalizeScores(input) {
        // Adjust code quality based on submission
        if (this.codeSubmitted) this.engine.updateScore('codeQuality', 0.3);
        if (this.testsRun) this.engine.updateScore('testing', 0.2);

        // Communication score based on conversation length and quality
        const candidateMsgs = this.engine.conversation.filter(m => m.role === 'candidate');
        if (candidateMsgs.length >= 5) this.engine.updateScore('communication', 0.3);
        if (candidateMsgs.length >= 8) this.engine.updateScore('communication', 0.2);

        // Penalize excessive hints
        if (this.engine.hintsUsed > 2) {
            this.engine.updateScore('optimality', -0.5);
            this.engine.updateScore('understanding', -0.3);
        }
    }
}
