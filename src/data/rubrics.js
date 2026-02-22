// ═══════════════════════════════════════════════════════════
// Rubric Definitions per Round Type
// ═══════════════════════════════════════════════════════════

export const rubrics = {
    dsa: {
        dimensions: [
            { id: 'understanding', label: 'Understanding', icon: '🧠', description: 'Grasped the problem, asked clarifying questions, identified constraints' },
            { id: 'correctness', label: 'Correctness', icon: '✅', description: 'Code produces correct output for all cases including edge cases' },
            { id: 'optimality', label: 'Optimality', icon: '⚡', description: 'Achieved optimal time/space complexity, identified optimization opportunities' },
            { id: 'codeQuality', label: 'Code Quality', icon: '💎', description: 'Clean, readable code with good naming, structure, and error handling' },
            { id: 'testing', label: 'Testing', icon: '🧪', description: 'Proposed comprehensive test cases including edge cases and boundary conditions' },
            { id: 'communication', label: 'Communication', icon: '💬', description: 'Clearly articulated thought process, tradeoffs, and reasoning' }
        ],
        stages: ['intro', 'clarify', 'approach', 'code', 'test', 'optimize', 'wrapUp'],
        timeMinutes: 45
    },

    lld: {
        dimensions: [
            { id: 'requirements', label: 'Requirements', icon: '📋', description: 'Identified functional and non-functional requirements, asked good questions' },
            { id: 'entityDesign', label: 'Entity Design', icon: '🏗️', description: 'Proper entities, relationships, and responsibilities identified' },
            { id: 'solid', label: 'SOLID Principles', icon: '🔧', description: 'Applied SOLID principles appropriately, good abstraction boundaries' },
            { id: 'patterns', label: 'Design Patterns', icon: '🎨', description: 'Identified and applied relevant design patterns with justification' },
            { id: 'extensibility', label: 'Extensibility', icon: '🔌', description: 'Design allows for future extensions without major refactoring' },
            { id: 'communication', label: 'Communication', icon: '💬', description: 'Clearly explained design decisions and tradeoffs' }
        ],
        stages: ['intro', 'requirements', 'entities', 'relationships', 'patterns', 'code', 'wrapUp'],
        timeMinutes: 45
    },

    hld: {
        dimensions: [
            { id: 'scaleAwareness', label: 'Scale Awareness', icon: '📊', description: 'Proper capacity estimation, understood scale implications' },
            { id: 'architecture', label: 'Architecture', icon: '🏛️', description: 'Clear service decomposition, appropriate technology choices' },
            { id: 'dataModel', label: 'Data Model', icon: '🗄️', description: 'Proper schema design, indexing strategy, partitioning approach' },
            { id: 'tradeoffs', label: 'Tradeoffs', icon: '⚖️', description: 'Discussed CAP, consistency models, and justified decisions' },
            { id: 'reliability', label: 'Reliability', icon: '🛡️', description: 'Addressed failure modes, monitoring, security, and scaling' },
            { id: 'communication', label: 'Communication', icon: '💬', description: 'Clear presentation, good use of diagrams and structured thinking' }
        ],
        stages: ['intro', 'requirements', 'estimation', 'architecture', 'dataModel', 'api', 'tradeoffs', 'wrapUp'],
        timeMinutes: 45
    },

    hr: {
        dimensions: [
            { id: 'clarity', label: 'Clarity', icon: '🎯', description: 'Clear, structured responses with specific examples' },
            { id: 'ownership', label: 'Ownership', icon: '🏆', description: 'Demonstrates personal accountability and initiative' },
            { id: 'impact', label: 'Impact', icon: '💥', description: 'Quantifiable results and meaningful contributions' },
            { id: 'reflection', label: 'Reflection', icon: '🔍', description: 'Shows genuine learning and growth from experiences' },
            { id: 'collaboration', label: 'Collaboration', icon: '🤝', description: 'Works effectively with others, values diverse perspectives' }
        ],
        stages: ['intro', 'question', 'followUp1', 'followUp2', 'followUp3', 'wrapUp'],
        timeMinutes: 30
    }
};

export function getRubric(roundType) {
    return rubrics[roundType] || rubrics.dsa;
}

export function getScoreLevel(score) {
    if (score >= 4.5) return 'excellent';
    if (score >= 3.5) return 'good';
    if (score >= 2.5) return 'average';
    return 'poor';
}

export function getScoreColor(score) {
    if (score >= 4.5) return 'var(--accent-emerald)';
    if (score >= 3.5) return 'var(--accent-indigo)';
    if (score >= 2.5) return 'var(--accent-amber)';
    return 'var(--accent-rose)';
}
