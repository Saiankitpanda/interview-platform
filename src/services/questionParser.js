// ═══════════════════════════════════════════════════════════
// Question Parser — Parse uploaded docs into question format
// ═══════════════════════════════════════════════════════════

export function parseQuestionDocument(text) {
    const questions = [];
    const blocks = text.split(/(?=^#{1,2}\s)/m).filter(b => b.trim());

    for (const block of blocks) {
        const q = parseBlock(block);
        if (q) questions.push(q);
    }

    return questions;
}

function parseBlock(block) {
    const lines = block.trim().split('\n');
    if (lines.length < 2) return null;

    const titleMatch = lines[0].match(/^#{1,2}\s+(.+)/);
    if (!titleMatch) return null;

    const title = titleMatch[1].trim();
    const body = lines.slice(1).join('\n');

    // Detect round type
    const roundType = detectRoundType(title, body);

    // Extract fields
    const statement = extractSection(body, ['statement', 'description', 'problem']) || body.split('\n\n')[0] || '';
    const constraintsRaw = extractSection(body, ['constraints', 'limits']);
    const constraints = constraintsRaw ? constraintsRaw.split('\n').map(c => c.replace(/^[-*]\s*/, '').trim()).filter(Boolean) : [];

    const examples = extractExamples(body);
    const tags = extractTags(title, body);
    const difficulty = detectDifficulty(title, body);

    return {
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        roundType,
        difficulty,
        tags,
        statement: statement.trim(),
        constraints,
        examples,
        expectedOutline: extractSection(body, ['solution', 'approach', 'outline']) || '',
        pitfalls: extractListSection(body, ['pitfalls', 'edge cases', 'gotchas']),
        rubricHints: {},
        source: 'uploaded',
        needsReview: containsProprietary(body)
    };
}

function detectRoundType(title, body) {
    const text = (title + ' ' + body).toLowerCase();
    if (/\b(design system|scale|distributed|architecture|traffic|throughput|availability|latency)\b/.test(text) && /\b(million|billion|qps|tps|users)\b/.test(text))
        return 'hld';
    if (/\b(class|interface|entity|solid|pattern|oop|design pattern|extensib)\b/.test(text) && !/\b(million|billion|scale)\b/.test(text))
        return 'lld';
    if (/\b(tell me|behavioral|leadership|conflict|failure|star|situation|teamwork)\b/.test(text))
        return 'hr';
    return 'dsa';
}

function extractSection(text, keywords) {
    for (const kw of keywords) {
        const re = new RegExp(`(?:^|\\n)(?:#{1,4}\\s*)?(?:${kw})[:\\s]*\\n([\\s\\S]*?)(?=\\n#{1,4}\\s|$)`, 'i');
        const m = text.match(re);
        if (m) return m[1].trim();
    }
    return null;
}

function extractListSection(text, keywords) {
    const section = extractSection(text, keywords);
    if (!section) return [];
    return section.split('\n').map(l => l.replace(/^[-*•]\s*/, '').trim()).filter(Boolean);
}

function extractExamples(text) {
    const examples = [];
    const exRe = /(?:example|sample|test case)\s*\d*[:\s]*\n?([\s\S]*?)(?=(?:example|sample|test case)\s*\d|#{1,4}\s|$)/gi;
    let m;
    while ((m = exRe.exec(text)) !== null) {
        const block = m[1];
        const input = block.match(/input[:\s]*(.*)/i)?.[1]?.trim() || '';
        const output = block.match(/output[:\s]*(.*)/i)?.[1]?.trim() || '';
        if (input || output) examples.push({ input, output });
    }
    return examples;
}

function extractTags(title, body) {
    const tagKeywords = [
        'arrays', 'strings', 'trees', 'graphs', 'dp', 'dynamic-programming',
        'sorting', 'searching', 'hash-map', 'linked-list', 'stack', 'queue',
        'binary-search', 'recursion', 'greedy', 'backtracking', 'sliding-window',
        'two-pointers', 'dfs', 'bfs', 'topological-sort', 'oop', 'design-patterns',
        'system-design', 'caching', 'databases', 'concurrency'
    ];
    const text = (title + ' ' + body).toLowerCase();
    return tagKeywords.filter(tag => text.includes(tag.replace('-', ' ')) || text.includes(tag));
}

function detectDifficulty(title, body) {
    const text = (title + ' ' + body).toLowerCase();
    if (/\b(hard|difficult|advanced|complex)\b/.test(text)) return 'hard';
    if (/\b(easy|simple|basic|beginner)\b/.test(text)) return 'easy';
    return 'medium';
}

function containsProprietary(text) {
    return /\b(leetcode|hackerrank|codeforces|interviewbit|geeksforgeeks|copyright|all rights reserved)\b/i.test(text);
}
