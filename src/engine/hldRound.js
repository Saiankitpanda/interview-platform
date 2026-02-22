// ═══════════════════════════════════════════════════════════
// HLD Round — High-Level Design Interview Flow
// ═══════════════════════════════════════════════════════════

export class HLDRound {
    constructor(engine) {
        this.engine = engine;
        this.q = engine.question;
    }

    getInitialMessage() {
        return `Let's begin the **High-Level Design** round.\n\n## ${this.q.title}\n\n${this.q.statement}\n\nLet's start with **requirements gathering**:\n\n1. What are the **core functional requirements**?\n2. What are the **non-functional requirements** (latency, throughput, availability, consistency)?\n3. What's **out of scope** for this design?`;
    }

    processInput(input) {
        const stage = this.engine.currentStage;
        switch (stage) {
            case 'intro': this.engine.advanceStage(); return this.getInitialMessage();
            case 'requirements': return this.handleRequirements(input);
            case 'estimation': return this.handleEstimation(input);
            case 'architecture': return this.handleArchitecture(input);
            case 'dataModel': return this.handleDataModel(input);
            case 'api': return this.handleAPI(input);
            case 'tradeoffs': return this.handleTradeoffs(input);
            case 'wrapUp': return this.handleWrapUp(input);
            default: return "Continue with your design.";
        }
    }

    handleRequirements(input) {
        if (/functional|feature|requirement|scope/i.test(input)) {
            this.engine.updateScore('scaleAwareness', 0.2);
        }
        this.engine.advanceStage();

        const est = this.q.estimations || {};
        return "Good requirements.\n\nNow let's do some **back-of-the-envelope estimation**:\n\n" +
            "1. How many **users** do you expect? DAU/MAU?\n" +
            "2. What's the **read:write ratio**?\n" +
            "3. Estimate **QPS** for key operations\n" +
            "4. How much **storage** is needed over 5 years?\n" +
            "5. What **bandwidth** is required?\n\n" +
            "Show your math.";
    }

    handleEstimation(input) {
        if (/million|billion|thousand|qps|tps|gb|tb|pb|bytes|bandwidth/i.test(input)) {
            this.engine.updateScore('scaleAwareness', 0.4);
        }
        if (/\d+\s*[*x×]\s*\d+|\d+\s*\/\s*\d+/i.test(input)) {
            this.engine.updateScore('scaleAwareness', 0.2); // showed math
        }
        this.engine.advanceStage();

        return "Good estimations.\n\nNow let's design the **high-level architecture**:\n\n" +
            "1. What are the **main services/components**?\n" +
            "2. How do they **communicate**? (sync/async, REST/gRPC, message queues)\n" +
            "3. Where do you need **caching**? What caching strategy?\n" +
            "4. What **database(s)** would you use and why?\n" +
            "5. Do you need a **CDN**, **load balancer**, **message queue**?\n\n" +
            "Draw out the architecture in your explanation.";
    }

    handleArchitecture(input) {
        const text = input.toLowerCase();
        let score = 0;
        if (/load.?balancer|api.?gateway|nginx|reverse.?proxy/i.test(text)) score += 0.2;
        if (/cache|redis|memcached|cdn/i.test(text)) score += 0.2;
        if (/queue|kafka|rabbitmq|sqs|pub.?sub/i.test(text)) score += 0.2;
        if (/database|mysql|postgres|mongo|cassandra|dynamo/i.test(text)) score += 0.2;
        if (/microservice|service|component/i.test(text)) score += 0.1;

        this.engine.updateScore('architecture', score);
        this.engine.advanceStage();

        return "Solid architecture.\n\nNow let's dig into the **data model**:\n\n" +
            "1. What are the main **tables/collections**?\n" +
            "2. What are the **key fields** and their types?\n" +
            "3. How would you **index** for common queries?\n" +
            "4. Do you need **partitioning/sharding**? By what key?\n" +
            "5. What's your **replication** strategy?";
    }

    handleDataModel(input) {
        const text = input.toLowerCase();
        if (/table|collection|schema|field|column|index|shard|partition|replica/i.test(text)) {
            this.engine.updateScore('dataModel', 0.4);
        }
        if (/primary.?key|foreign.?key|index|composite|hash|range/i.test(text)) {
            this.engine.updateScore('dataModel', 0.2);
        }
        this.engine.advanceStage();

        return "Good data model.\n\nNow define the **key APIs**:\n\n" +
            "1. What are the main **endpoints**?\n" +
            "2. What are the **request/response formats**?\n" +
            "3. How do you handle **authentication** and **rate limiting**?\n" +
            "4. Any **versioning** strategy?";
    }

    handleAPI(input) {
        if (/endpoint|api|get|post|put|delete|rest|graphql|grpc/i.test(input)) {
            this.engine.updateScore('architecture', 0.2);
        }
        this.engine.advanceStage();

        return "Good API design.\n\nLet's discuss **tradeoffs and deep dives**:\n\n" +
            "1. How do you handle **consistency vs availability**? (CAP theorem)\n" +
            "2. What are the **single points of failure**? How do you mitigate?\n" +
            "3. How do you handle **scaling bottlenecks**?\n" +
            "4. What about **monitoring, alerting, and logging**?\n" +
            "5. **Security** considerations?";
    }

    handleTradeoffs(input) {
        const text = input.toLowerCase();
        if (/cap|consistency|availability|partition.?tolerance|eventual/i.test(text)) {
            this.engine.updateScore('tradeoffs', 0.3);
        }
        if (/failure|failover|redundan|replicate|circuit.?breaker|retry/i.test(text)) {
            this.engine.updateScore('reliability', 0.3);
        }
        if (/monitor|alert|log|metric|trace|observ/i.test(text)) {
            this.engine.updateScore('reliability', 0.2);
        }
        if (/security|auth|encrypt|ssl|tls|oauth|jwt/i.test(text)) {
            this.engine.updateScore('reliability', 0.2);
        }

        this.engine.advanceStage();
        return "Let's wrap up.\n\n1. Summarize the **key design decisions** and their justifications.\n2. What would you **do differently** with more time?\n3. What's the **most challenging** aspect to scale?";
    }

    handleWrapUp(input) {
        const msgs = this.engine.conversation.filter(m => m.role === 'candidate');
        if (msgs.length >= 6) this.engine.updateScore('communication', 0.4);

        this.engine.complete();
        return "Excellent work on the system design.\n\nClick **\"View Report\"** to see your detailed evaluation with scores across all dimensions.";
    }
}
