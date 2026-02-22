// ═══════════════════════════════════════════════════════════
// Simple Hash-Based SPA Router
// ═══════════════════════════════════════════════════════════

export class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.beforeHooks = [];
        window.addEventListener('hashchange', () => this.resolve());
    }

    on(path, handler) {
        this.routes[path] = handler;
        return this;
    }

    before(hook) {
        this.beforeHooks.push(hook);
        return this;
    }

    navigate(path) {
        window.location.hash = path;
    }

    resolve() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, ...queryParts] = hash.split('?');
        const params = Object.fromEntries(new URLSearchParams(queryParts.join('?')));

        for (const hook of this.beforeHooks) {
            if (hook(path, params) === false) return;
        }

        const handler = this.routes[path] || this.routes['*'];
        if (handler) {
            this.currentRoute = path;
            handler(params);
        }
    }

    start() {
        this.resolve();
    }
}

export const router = new Router();
