// ═══════════════════════════════════════════════════════════
// Rubric Scorer — Score calculation and report generation
// ═══════════════════════════════════════════════════════════

import { getScoreLevel } from '../data/rubrics.js';

export function generateReport(engine) {
    const report = engine.getReport();

    // Generate strengths and mistakes
    report.strengths = identifyStrengths(report);
    report.mistakes = identifyMistakes(report);
    report.practicePlan = generatePracticePlan(report);

    return report;
}

function identifyStrengths(report) {
    const strengths = [];
    const dims = report.dimensions;

    for (const dim of dims) {
        const score = report.scores[dim.id];
        if (score >= 4) {
            strengths.push({
                title: `Strong ${dim.label}`,
                description: getStrengthDescription(dim.id, score),
                score
            });
        }
    }

    // Sort by score desc, take top 5
    return strengths.sort((a, b) => b.score - a.score).slice(0, 5);
}

function identifyMistakes(report) {
    const mistakes = [];
    const dims = report.dimensions;

    for (const dim of dims) {
        const score = report.scores[dim.id];
        if (score < 3.5) {
            mistakes.push({
                title: `Improve ${dim.label}`,
                description: getMistakeDescription(dim.id, score, report.roundType),
                score
            });
        }
    }

    if (report.hintsUsed > 0) {
        mistakes.push({
            title: 'Relied on Hints',
            description: `Used ${report.hintsUsed} hint(s) during the interview. Practice solving problems independently before asking for help.`,
            score: 0
        });
    }

    return mistakes.sort((a, b) => a.score - b.score).slice(0, 5);
}

function getStrengthDescription(dimId, score) {
    const descriptions = {
        understanding: 'Demonstrated clear problem comprehension and asked insightful clarifying questions.',
        correctness: 'Code was correct and handled edge cases properly.',
        optimality: 'Achieved optimal or near-optimal solution with good complexity analysis.',
        codeQuality: 'Wrote clean, readable code with good structure and naming.',
        testing: 'Proposed comprehensive test cases covering edge and boundary conditions.',
        communication: 'Articulated thought process clearly and maintained good dialogue.',
        requirements: 'Thorough requirements gathering with good functional and non-functional coverage.',
        entityDesign: 'Identified appropriate entities with clear responsibilities and attributes.',
        solid: 'Applied SOLID principles effectively in the design.',
        patterns: 'Recognized and justified relevant design patterns.',
        extensibility: 'Design allows for future extensions without major changes.',
        scaleAwareness: 'Good understanding of scale requirements and capacity planning.',
        architecture: 'Proposed a well-structured architecture with appropriate technology choices.',
        dataModel: 'Designed an effective data model with proper indexing and partitioning.',
        tradeoffs: 'Discussed meaningful tradeoffs and justified design decisions.',
        reliability: 'Addressed failure modes, monitoring, and security considerations.',
        clarity: 'Provided clear, structured answers with specific examples.',
        ownership: 'Demonstrated personal accountability and initiative.',
        impact: 'Quantified results and showed meaningful contributions.',
        reflection: 'Showed genuine learning and growth from experiences.',
        collaboration: 'Demonstrated effective teamwork and communication skills.'
    };
    return descriptions[dimId] || `Scored ${score}/5 in this dimension.`;
}

function getMistakeDescription(dimId, score, roundType) {
    const descriptions = {
        understanding: 'Didn\'t fully clarify the problem. Practice reading problem statements carefully and asking edge case questions.',
        correctness: 'Solution had correctness issues. Focus on handling edge cases and testing your code mentally before running.',
        optimality: 'Didn\'t reach optimal complexity. Practice identifying patterns that lead to better algorithms.',
        codeQuality: 'Code could be cleaner. Practice writing readable code with meaningful variable names and clear structure.',
        testing: 'Didn\'t propose enough test cases. Always think about normal, edge, and stress test cases.',
        communication: 'Could communicate more clearly. Practice explaining your approach before coding.',
        requirements: 'Missed some requirements. Practice systematic requirement gathering with checklists.',
        entityDesign: 'Entity identification could be improved. Practice identifying nouns in requirements as potential classes.',
        solid: 'Review SOLID principles and practice applying them in design exercises.',
        patterns: 'Learn more design patterns and when to apply them. Focus on Strategy, Observer, and Factory first.',
        extensibility: 'Design was tightly coupled. Practice designing for change using dependency injection and interfaces.',
        scaleAwareness: 'Practice back-of-envelope estimation. Learn common numbers (QPS, storage, bandwidth).',
        architecture: 'Architecture needs work. Practice drawing system diagrams and identifying key components.',
        dataModel: 'Data model could be improved. Practice schema design, indexing, and partitioning strategies.',
        tradeoffs: 'Discuss more tradeoffs explicitly. Learn CAP theorem and consistency models deeply.',
        reliability: 'Address failure modes more proactively. Learn about circuit breakers, retries, and monitoring.',
        clarity: 'Answers were vague. Use STAR format and include specific, concrete details.',
        ownership: 'Show more personal ownership. Use "I" instead of "we" and describe your specific contributions.',
        impact: 'Quantify your impact. Always include numbers, percentages, or measurable outcomes.',
        reflection: 'Show deeper reflection. Describe what you truly learned and how you changed your behavior.',
        collaboration: 'Show more collaboration skills. Describe how you worked with cross-functional teams.'
    };
    return descriptions[dimId] || `Scored ${score}/5. Focus on improving this area.`;
}

function generatePracticePlan(report) {
    const weakDims = report.dimensions
        .filter(d => report.scores[d.id] < 4)
        .sort((a, b) => report.scores[a.id] - report.scores[b.id]);

    const plans = {
        dsa: [
            { day: 1, topic: 'Arrays & Hashing', activity: 'Solve 3 medium array problems. Focus on hash map patterns.' },
            { day: 2, topic: 'Sliding Window', activity: 'Solve 3 sliding window problems. Practice variable-size windows.' },
            { day: 3, topic: 'Trees & Graphs', activity: 'Practice BFS/DFS. Solve 3 tree problems from scratch.' },
            { day: 4, topic: 'Dynamic Programming', activity: 'Solve 2 DP problems. Focus on identifying state and transitions.' },
            { day: 5, topic: 'System Design Basics', activity: 'Review time/space complexity. Practice analyzing your own solutions.' },
            { day: 6, topic: 'Mock Interview', activity: 'Do a timed mock interview. Focus on communication.' },
            { day: 7, topic: 'Review & Reflect', activity: 'Review all solutions. Identify patterns. Write down key learnings.' }
        ],
        lld: [
            { day: 1, topic: 'SOLID Review', activity: 'Study each SOLID principle with examples. Redesign a familiar system.' },
            { day: 2, topic: 'Creational Patterns', activity: 'Study Factory, Builder, Singleton. Implement each in code.' },
            { day: 3, topic: 'Behavioral Patterns', activity: 'Study Strategy, Observer, Command. Implement each with a real scenario.' },
            { day: 4, topic: 'Structural Patterns', activity: 'Study Adapter, Decorator, Composite. Focus on when to use each.' },
            { day: 5, topic: 'Practice Design', activity: 'Design a complete system (e.g., elevator system) from requirements.' },
            { day: 6, topic: 'Code Review', activity: 'Review open-source code. Identify patterns and SOLID violations.' },
            { day: 7, topic: 'Mock Interview', activity: 'Do a timed LLD interview. Focus on entity identification and patterns.' }
        ],
        hld: [
            { day: 1, topic: 'Estimation Practice', activity: 'Practice back-of-envelope calculations for 3 different systems.' },
            { day: 2, topic: 'Database Deep Dive', activity: 'Study SQL vs NoSQL tradeoffs. Practice sharding and replication.' },
            { day: 3, topic: 'Caching & CDN', activity: 'Study caching strategies. Design a cache for a specific use case.' },
            { day: 4, topic: 'Message Queues', activity: 'Study Kafka, RabbitMQ use cases. Design an async processing pipeline.' },
            { day: 5, topic: 'Reliability', activity: 'Study failure modes, circuit breakers, monitoring. Design for 99.99% uptime.' },
            { day: 6, topic: 'End-to-End Design', activity: 'Design a complete system (URL shortener or chat) from scratch.' },
            { day: 7, topic: 'Mock Interview', activity: 'Do a timed HLD interview. Focus on tradeoffs and bottlenecks.' }
        ],
        hr: [
            { day: 1, topic: 'STAR Framework', activity: 'Rewrite 3 key experiences using strict STAR format.' },
            { day: 2, topic: 'Impact Stories', activity: 'Quantify outcomes for 5 experiences. Add metrics everywhere.' },
            { day: 3, topic: 'Failure Stories', activity: 'Prepare 2 failure stories. Focus on genuine learning and growth.' },
            { day: 4, topic: 'Leadership Stories', activity: 'Prepare stories showing initiative, influence, and decision-making.' },
            { day: 5, topic: 'Collaboration Stories', activity: 'Prepare stories about cross-team work and conflict resolution.' },
            { day: 6, topic: 'Practice Delivery', activity: 'Practice telling stories aloud. Time yourself (2 min per story).' },
            { day: 7, topic: 'Mock Interview', activity: 'Do a full behavioral mock. Focus on clarity and conciseness.' }
        ]
    };

    return plans[report.roundType] || plans.dsa;
}
