// ═══════════════════════════════════════════════════════════
// LLD Round — Low-Level Design Interview Flow
// ═══════════════════════════════════════════════════════════

export class LLDRound {
    constructor(engine) {
        this.engine = engine;
        this.q = engine.question;
        this.requirementsGathered = false;
        this.entitiesIdentified = false;
        this.patternsDiscussed = false;
    }

    getInitialMessage() {
        return `Let's begin the **Low-Level Design** round.\n\n## ${this.q.title}\n\n${this.q.statement}\n\nBefore jumping into design, let's establish the **requirements**.\n\n1. What are the **functional requirements**? What should the system do?\n2. What are the **non-functional requirements**? (scalability, performance, concurrency)\n3. What's explicitly **out of scope**?`;
    }

    processInput(input) {
        const stage = this.engine.currentStage;

        switch (stage) {
            case 'intro':
                this.engine.advanceStage();
                return this.getInitialMessage();

            case 'requirements':
                return this.handleRequirements(input);

            case 'entities':
                return this.handleEntities(input);

            case 'relationships':
                return this.handleRelationships(input);

            case 'patterns':
                return this.handlePatterns(input);

            case 'code':
                return this.handleCode(input);

            case 'wrapUp':
                return this.handleWrapUp(input);

            default:
                return "Let's continue with your design.";
        }
    }

    handleRequirements(input) {
        const text = input.toLowerCase();

        if (/functional|non.?functional|requirement|scope|feature|support/i.test(text)) {
            this.engine.updateScore('requirements', 0.3);
        }

        if (this.requirementsGathered) {
            this.engine.advanceStage();
            return "Good requirements gathering. Now let's identify the **core entities**.\n\n" +
                "What are the main **classes/objects** in this system? For each:\n" +
                "- What are its **attributes**?\n" +
                "- What are its **key responsibilities**?\n" +
                "- What **behaviors** does it expose?\n\n" +
                "Start with the most important entity first.";
        }

        this.requirementsGathered = true;

        const expectedReqs = this.q.requirements || [];
        const covered = expectedReqs.filter(r => text.includes(r.toLowerCase().split(' ')[0]));

        if (covered.length < expectedReqs.length / 2) {
            return "You've identified some requirements, but there are a few more to consider:\n\n" +
                "- Think about **concurrency** — will multiple users access this simultaneously?\n" +
                "- Think about **error handling** — what can go wrong?\n" +
                "- Are there any **capacity constraints**?\n\n" +
                "Anything else you'd add to the requirements?";
        }

        this.engine.advanceStage();
        return "Solid requirements coverage.\n\nNow, what are the **core entities** (classes/objects) you'd define? List them with their key **attributes** and **responsibilities**.";
    }

    handleEntities(input) {
        const text = input.toLowerCase();
        const expectedEntities = (this.q.expectedEntities || []).map(e => e.toLowerCase());
        const matched = expectedEntities.filter(e => text.includes(e.toLowerCase()));

        if (matched.length > 0) {
            this.engine.updateScore('entityDesign', 0.2 * matched.length);
        }

        if (this.entitiesIdentified) {
            this.engine.advanceStage();
            return "Good entity identification.\n\nNow let's talk about **relationships and interactions**:\n\n" +
                "1. How do these entities **relate** to each other? (has-a, is-a, uses)\n" +
                "2. Which entity **owns** or **contains** which?\n" +
                "3. How do they **interact** at runtime?\n" +
                "4. Are there any **interfaces** that should be abstracted?";
        }

        this.entitiesIdentified = true;

        if (matched.length < expectedEntities.length / 2) {
            const missing = expectedEntities.filter(e => !text.includes(e)).slice(0, 2);
            return `You've identified some key entities. Have you considered:\n\n` +
                missing.map(e => `- A **${e}** class — what role would it play?`).join('\n') +
                `\n\nAlso, think about the **Single Responsibility Principle** — is any entity doing too much?`;
        }

        this.engine.advanceStage();
        return "Excellent. You've identified the core entities well.\n\nNow describe the **relationships** between them. How do they interact?";
    }

    handleRelationships(input) {
        const text = input.toLowerCase();

        if (/composition|aggregation|inheritance|interface|abstract|has.?a|is.?a/i.test(text)) {
            this.engine.updateScore('solid', 0.3);
        }
        if (/single.?resp|open.?closed|liskov|interface.?seg|depend.?inv|solid/i.test(text)) {
            this.engine.updateScore('solid', 0.4);
        }

        this.engine.advanceStage();
        return "Good relationships mapping.\n\nNow let's discuss **design patterns**.\n\n" +
            "1. Which design patterns would you apply here and **why**?\n" +
            "2. How do they help with **extensibility** and **maintainability**?\n" +
            "3. Are there patterns you considered but **rejected**? Why?";
    }

    handlePatterns(input) {
        const text = input.toLowerCase();
        const expectedPatterns = (this.q.patterns || []).map(p => p.toLowerCase());

        let patternScore = 0;
        if (/strategy|observer|factory|singleton|builder|decorator|template|command|adapter|composite|visitor|chain/i.test(text)) {
            patternScore += 0.3;
        }
        if (/why|because|benefit|advantage|helps with|enables/i.test(text)) {
            patternScore += 0.2; // justification
        }

        this.engine.updateScore('patterns', patternScore);
        this.engine.updateScore('extensibility', patternScore > 0.3 ? 0.3 : 0);

        this.engine.advanceStage();
        return "Good discussion on patterns.\n\nNow let's see some **code**. I don't need a full implementation, but show me:\n\n" +
            "1. The **key interfaces** and **abstract classes**\n" +
            "2. The **most complex class** with its core methods\n" +
            "3. How a **typical interaction** flows through your design\n\n" +
            "Use the code editor and let me know when you're done.";
    }

    handleCode(input) {
        const text = input.toLowerCase();

        if (/done|finish|complet|ready|submit|implement/i.test(text)) {
            this.engine.updateScore('entityDesign', 0.2);
            this.engine.advanceStage();

            const followUps = this.q.followUps || [];
            const followUp = followUps[0] || 'How would you add a new feature to this design?';

            return "Nice code skeleton.\n\nLet's wrap up with a few questions:\n\n" +
                `1. ${followUp}\n` +
                "2. How would you **test** this design? What's your testing strategy?\n" +
                "3. What are the **tradeoffs** in your design?";
        }

        if (/hint|stuck|help/i.test(text)) {
            const hintNum = this.engine.getHint();
            if (hintNum === null) return "Try to think about the interfaces first — what methods does each entity need to expose?";
            return `💡 **Hint:** Start with the core interface. Think about what the client (caller) needs. Define the interface from the consumer's perspective, then implement.`;
        }

        return "Take your time. Show me the key interfaces and the core class implementation.";
    }

    handleWrapUp(input) {
        // Score communication
        const msgs = this.engine.conversation.filter(m => m.role === 'candidate');
        if (msgs.length >= 6) this.engine.updateScore('communication', 0.4);

        // Check for extensibility discussion
        if (/extend|add|new feature|modif|change|future/i.test(input.toLowerCase())) {
            this.engine.updateScore('extensibility', 0.3);
        }

        this.engine.complete();
        return "That wraps up the Low-Level Design round.\n\nYou demonstrated a structured approach to breaking down the system. Click **\"View Report\"** to see your detailed evaluation.";
    }
}
