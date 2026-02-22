// ═══════════════════════════════════════════════════════════
// Auth Service — Simple Admin Access Control
// ═══════════════════════════════════════════════════════════

const ADMIN_PASSWORD = 'Kanha@2024';

export const auth = {
    login(password) {
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('ios_admin', 'true');
            window.dispatchEvent(new Event('auth-change'));
            return true;
        }
        return false;
    },

    logout() {
        sessionStorage.removeItem('ios_admin');
        window.dispatchEvent(new Event('auth-change'));
    },

    isAdmin() {
        return sessionStorage.getItem('ios_admin') === 'true';
    },

    onAuthChange(callback) {
        window.addEventListener('auth-change', callback);
        return () => window.removeEventListener('auth-change', callback);
    }
};
