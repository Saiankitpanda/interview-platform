// ═══════════════════════════════════════════════════════════
// Code Runner — Piston API Integration
// ═══════════════════════════════════════════════════════════

const PISTON_API = 'https://emkc.org/api/v2/piston/execute';

const LANGUAGE_MAP = {
    python: { language: 'python', version: '3.10.0' },
    javascript: { language: 'javascript', version: '18.15.0' },
    java: { language: 'java', version: '15.0.2' },
    cpp: { language: 'c++', version: '10.2.0' }
};

export async function runCode(language, code, stdin = '') {
    const langConfig = LANGUAGE_MAP[language];
    if (!langConfig) {
        return { success: false, output: '', error: `Unsupported language: ${language}`, time: 0 };
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(PISTON_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
                language: langConfig.language,
                version: langConfig.version,
                files: [{ content: code }],
                stdin,
                compile_timeout: 10000,
                run_timeout: 10000,
                compile_memory_limit: -1,
                run_memory_limit: -1
            })
        });

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        const run = data.run || {};
        const compile = data.compile || {};

        if (compile.stderr) {
            return {
                success: false,
                output: compile.stdout || '',
                error: compile.stderr,
                time: 0
            };
        }

        return {
            success: !run.stderr && run.code === 0,
            output: run.stdout || '',
            error: run.stderr || '',
            time: run.wall_time || 0,
            signal: run.signal
        };
    } catch (err) {
        if (err.name === 'AbortError') {
            return { success: false, output: '', error: 'Execution timed out (15s limit)', time: 15 };
        }
        return { success: false, output: '', error: `Execution error: ${err.message}`, time: 0 };
    }
}

export function getSupportedLanguages() {
    return Object.keys(LANGUAGE_MAP);
}

export function getDefaultCode(language) {
    const templates = {
        python: `# Write your solution here\n\ndef solution():\n    pass\n\n# Test\nprint(solution())\n`,
        javascript: `// Write your solution here\n\nfunction solution() {\n  \n}\n\n// Test\nconsole.log(solution());\n`,
        java: `public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n        \n    }\n}\n`,
        cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    \n    return 0;\n}\n`
    };
    return templates[language] || templates.python;
}
