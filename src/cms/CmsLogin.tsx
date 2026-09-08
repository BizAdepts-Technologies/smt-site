import { useState } from 'react';
import { api } from './api';

export default function CmsLogin({ onLogin }: { onLogin: () => void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.login(username, password);
            localStorage.setItem('cms_token', res.data.token);
            onLogin();
        } catch {
            setError('Invalid username or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #3b1f0e 0%, #7a4522 50%, #b8712a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif",
        }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.04)',
                        width: `${120 + i * 80}px`,
                        height: `${120 + i * 80}px`,
                        top: `${10 + i * 12}%`,
                        left: `${-5 + i * 18}%`,
                    }} />
                ))}
            </div>

            <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '48px 44px',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
                position: 'relative',
                zIndex: 1,
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <img
                        src="/smt-site/smt-logo.png"
                        alt="SMT Logo"
                        style={{
                            width: '90px',
                            height: 'auto',
                            objectFit: 'contain',
                            marginBottom: '14px',
                            filter: 'drop-shadow(0 4px 12px rgba(122,69,34,0.25))',
                        }}
                    />
                    <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1c0f06' }}>
                        SMT Content Portal
                    </h1>
                    <p style={{ margin: '6px 0 0', color: '#8a6a55', fontSize: '13.5px' }}>
                        Sign in to manage your website content
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#4a2e1a', marginBottom: '6px' }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            style={{
                                width: '100%', boxSizing: 'border-box',
                                padding: '11px 14px',
                                border: '1.5px solid #e8d9cc',
                                borderRadius: '10px',
                                fontSize: '14px',
                                color: '#1c0f06',
                                outline: 'none',
                                fontFamily: 'inherit',
                                background: '#fdf9f6',
                            }}
                            onFocus={e => e.target.style.borderColor = '#b8712a'}
                            onBlur={e => e.target.style.borderColor = '#e8d9cc'}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#4a2e1a', marginBottom: '6px' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            style={{
                                width: '100%', boxSizing: 'border-box',
                                padding: '11px 14px',
                                border: '1.5px solid #e8d9cc',
                                borderRadius: '10px',
                                fontSize: '14px',
                                color: '#1c0f06',
                                outline: 'none',
                                fontFamily: 'inherit',
                                background: '#fdf9f6',
                            }}
                            onFocus={e => e.target.style.borderColor = '#b8712a'}
                            onBlur={e => e.target.style.borderColor = '#e8d9cc'}
                        />
                    </div>

                    {error && (
                        <div style={{
                            background: '#fff5f0', border: '1px solid #f5b8a0',
                            borderRadius: '8px', padding: '10px 14px',
                            color: '#a0330a', fontSize: '13px', marginBottom: '16px',
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: loading ? '#c4956a' : 'linear-gradient(135deg, #3b1f0e, #b8712a)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '15px',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontFamily: 'inherit',
                            boxShadow: '0 4px 16px rgba(122,69,34,.35)',
                            letterSpacing: '0.2px',
                        }}
                    >
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '24px', color: '#b09480', fontSize: '12px' }}>
                    © 2026 Sahab Al Mabelah Trading LLC
                </p>
            </div>

            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>
        </div>
    );
}
