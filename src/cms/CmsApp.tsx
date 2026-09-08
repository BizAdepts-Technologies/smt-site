import { useState } from 'react';
import CmsLogin from './CmsLogin';
import CmsDashboard from './CmsDashboard';

export default function CmsApp() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('cms_token'));

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => {
        localStorage.removeItem('cms_token');
        setIsLoggedIn(false);
    };

    return isLoggedIn
        ? <CmsDashboard onLogout={handleLogout} />
        : <CmsLogin onLogin={handleLogin} />;
}
