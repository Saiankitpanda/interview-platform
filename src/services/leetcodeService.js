// ═══════════════════════════════════════════════════════════
// LeetCode API Service — Fetch test cases & code templates
// Uses alfa-leetcode-api (https://github.com/alfaarghya/alfa-leetcode-api)
// ═══════════════════════════════════════════════════════════

const API_BASE = 'https://alfa-leetcode-api.onrender.com';
const CACHE_KEY = 'lc_problem_cache';

// In-memory cache + localStorage persistence
let cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');

function saveCache() {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch (e) { /* quota */ }
}

/**
 * Convert a problem title to a LeetCode slug.
 * "Two Sum" → "two-sum"
 * "Two Sum II - Input Array Is Sorted" → "two-sum-ii-input-array-is-sorted"
 */
export function titleToSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Fetch problem data from the alfa-leetcode-api.
 * Returns: { testCases, codeSnippets, content, exampleTestcases }
 */
export async function fetchProblemData(titleSlug) {
    // Check cache first
    if (cache[titleSlug] && cache[titleSlug].ts > Date.now() - 24 * 60 * 60 * 1000) {
        return cache[titleSlug].data;
    }

    try {
        const res = await fetch(`${API_BASE}/select/raw?titleSlug=${encodeURIComponent(titleSlug)}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const json = await res.json();
        const q = json.question || json;

        // Parse example test cases (inputs only, separated by newlines)
        const rawTestcases = q.exampleTestcases || q.sampleTestCase || '';

        // Parse expected outputs from HTML content
        const expectedOutputs = parseExpectedOutputs(q.content || '');

        // Build test cases array
        const testCases = buildTestCases(rawTestcases, expectedOutputs, q.content || '');

        // Code snippets per language
        const codeSnippets = {};
        (q.codeSnippets || []).forEach(s => {
            codeSnippets[s.langSlug] = {
                lang: s.lang,
                code: s.code
            };
        });

        const result = {
            testCases,
            codeSnippets,
            rawTestcases,
            questionId: q.questionFrontendId || '',
            difficulty: (q.difficulty || '').toLowerCase(),
        };

        // Cache for 24h
        cache[titleSlug] = { ts: Date.now(), data: result };
        saveCache();

        return result;
    } catch (err) {
        console.warn('LeetCode API fetch failed:', err.message);
        return null;
    }
}

/**
 * Parse expected outputs from problem HTML content.
 * Looks for patterns like "Output: [0,1]" or "Output: true"
 */
function parseExpectedOutputs(html) {
    const outputs = [];
    // Match Output: ... patterns in the HTML
    const patterns = [
        /Output:\s*(.+?)(?:<\/|\\n|\n|$)/gi,
        /<strong>Output:<\/strong>\s*(.+?)(?:<\/|\\n|\n|$)/gi,
    ];

    for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(html)) !== null) {
            let val = match[1].trim();
            // Clean HTML tags
            val = val.replace(/<[^>]+>/g, '').trim();
            if (val) outputs.push(val);
        }
    }

    return outputs;
}

/**
 * Build structured test cases from raw inputs + expected outputs.
 * Two Sum example:
 *   rawTestcases = "[2,7,11,15]\n9\n[3,2,4]\n6\n[3,3]\n6"
 *   expectedOutputs = ["[0,1]", "[1,2]", "[0,1]"]
 */
function buildTestCases(rawTestcases, expectedOutputs, html) {
    if (!rawTestcases) return [];

    // Parse examples from HTML for better structure
    const examples = parseExamplesFromHTML(html);
    if (examples.length > 0) return examples;

    // Fallback: split raw test cases
    const lines = rawTestcases.split('\n').filter(l => l.trim());
    const testCases = [];

    // If we have expected outputs, try to match them
    if (expectedOutputs.length > 0) {
        // Determine how many input lines per test case
        const linesPerCase = Math.floor(lines.length / expectedOutputs.length);
        if (linesPerCase > 0) {
            for (let i = 0; i < expectedOutputs.length; i++) {
                const start = i * linesPerCase;
                const inputLines = lines.slice(start, start + linesPerCase);
                testCases.push({
                    id: i + 1,
                    input: inputLines.join('\n'),
                    expected: expectedOutputs[i] || '',
                });
            }
        }
    }

    if (testCases.length === 0) {
        // Just show all lines as a single test case
        testCases.push({ id: 1, input: rawTestcases, expected: '' });
    }

    return testCases;
}

/**
 * Parse structured examples from problem HTML content.
 * Extracts "Input: ...", "Output: ...", "Explanation: ..." blocks.
 */
function parseExamplesFromHTML(html) {
    const examples = [];
    if (!html) return examples;

    // Clean HTML to text
    const text = html
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<\/p>/g, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"');

    // Match Example blocks
    const exampleRegex = /Example\s*\d*:?\s*\n?\s*Input:\s*(.+?)(?:\n|\s)+Output:\s*(.+?)(?:\n|$)(?:\s*Explanation:\s*(.+?))?(?=Example|\s*Constraints|$)/gis;

    let match;
    let id = 1;
    while ((match = exampleRegex.exec(text)) !== null) {
        examples.push({
            id: id++,
            input: match[1].trim(),
            expected: match[2].trim(),
            explanation: (match[3] || '').trim(),
        });
    }

    return examples;
}

/**
 * Map our language IDs to LeetCode langSlugs.
 */
export function getLangSlug(langId) {
    const map = {
        'javascript': 'javascript',
        'python': 'python3',
        'java': 'java',
        'cpp': 'cpp',
    };
    return map[langId] || langId;
}
