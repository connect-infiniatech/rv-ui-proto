import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const ok = login(u, p);
    if (ok) nav('/');
    else setErr('Invalid credentials');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submit}>
        <div className="login-header">
          <img src={logo} alt="logo" className="login-logo" />
          <h2>Login</h2>
        </div>
        {err && <div className="error">{err}</div>}
        <input value={u} onChange={e => setU(e.target.value)} placeholder="Username" />
        <input value={p} onChange={e => setP(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;