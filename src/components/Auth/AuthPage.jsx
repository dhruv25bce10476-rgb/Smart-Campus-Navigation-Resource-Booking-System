import { useState } from 'react';
import { USERS } from '../../data/constants';

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [err, setErr] = useState('');
  const [registered, setRegistered] = useState([...USERS]);

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (mode === 'login') {
      const u = registered.find(u => u.email === form.email && u.password === form.password);
      if (!u) { setErr('Invalid email or password.'); return; }
      onLogin(u);
    } else {
      if (!form.name || !form.email || !form.password) { setErr('All fields required.'); return; }
      if (registered.find(u => u.email === form.email)) { setErr('Email already registered.'); return; }
      const newU = {
        id: registered.length + 1,
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        rfid: `RFID-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        avatar: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      };
      setRegistered(p => [...p, newU]);
      setErr('');
      setMode('login');
      setForm(f => ({ ...f, password: '' }));
      alert('Registration successful! Please log in.');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-bg" />
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🏛️</div>
          <div className="auth-logo-text">
            <span>Smart</span> Campus
            <small>Navigation &amp; Booking</small>
          </div>
        </div>

        <h1 className="auth-title">{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>
        <p className="auth-sub">{mode === 'login' ? 'Access your campus resources' : 'Join the campus platform'}</p>

        {err && <div className="error-msg">{err}</div>}

        {mode === 'register' && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              id="register-name"
              className="form-input"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={e => handle('name', e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            id="login-email"
            className="form-input"
            type="email"
            placeholder="your@campus.edu"
            value={form.email}
            onChange={e => handle('email', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            id="login-password"
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => handle('password', e.target.value)}
          />
        </div>

        {mode === 'register' && (
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              id="register-role"
              className="form-select"
              value={form.role}
              onChange={e => handle('role', e.target.value)}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
        )}

        <button id="auth-submit-btn" className="btn btn-primary" onClick={submit}>
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        {mode === 'login' && (
          <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(0,212,255,0.05)', borderRadius: '8px', border: '1px solid rgba(0,212,255,0.1)', fontSize: '12px', color: '#94a3b8' }}>
            <strong style={{ color: '#e2e8f0' }}>Demo: </strong>
            rahul@campus.edu / rahul123 (Student) | priya@campus.edu / priya123 (Faculty) | admin@campus.edu / admin123 (Admin)
          </div>
        )}

        <div className="auth-toggle">
          {mode === 'login' ? (
            <span>Don&apos;t have an account? <a onClick={() => { setMode('register'); setErr(''); }}>Sign up</a></span>
          ) : (
            <span>Already have an account? <a onClick={() => { setMode('login'); setErr(''); }}>Sign in</a></span>
          )}
        </div>
      </div>
    </div>
  );
}
