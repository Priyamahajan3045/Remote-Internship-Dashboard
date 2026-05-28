import React, { useState } from 'react';
import API from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('user_id', res.data.user_id);
      localStorage.setItem('name', res.data.name);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid email or password!');
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotError('Email daalo!');
      return;
    }
    if (!newPassword) {
      setForgotError('Naya password daalo!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotError('Dono passwords match nahi kar rahe!');
      return;
    }
    if (newPassword.length < 6) {
      setForgotError('Password kam se kam 6 characters ka hona chahiye!');
      return;
    }
    try {
      await API.post('/auth/forgot-password', { email: forgotEmail, new_password: newPassword });
      setForgotMessage('Password successfully reset ho gaya! Ab login karo.');
      setForgotError('');
    } catch (err) {
      setForgotError('Email nahi mila! Sahi email daalo.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', width: '350px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#2E5FA3' }}>🎓 InternTrack</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>Login to continue</p>

        {!showForgot ? (
          <>
            {error && <p style={{ color: 'red', textAlign: 'center', background: '#ffebee', padding: '8px', borderRadius: '6px' }}>{error}</p>}
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
            <button onClick={handleLogin}
              style={{ width: '100%', padding: '10px', background: '#2E5FA3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
              Login
            </button>
            <p style={{ textAlign: 'center', marginTop: '15px', marginBottom: '5px' }}>
              <span onClick={() => setShowForgot(true)}
                style={{ color: '#2E5FA3', cursor: 'pointer', fontSize: '14px' }}>
                🔑 Forgot Password?
              </span>
            </p>
            <p style={{ textAlign: 'center', margin: 0 }}>
              Account nahi hai? <a href="/register" style={{ color: '#2E5FA3' }}>Register</a>
            </p>
          </>
        ) : (
          <>
            <h3 style={{ textAlign: 'center', color: '#2E5FA3' }}>🔑 Reset Password</h3>
            {forgotMessage && (
              <p style={{ color: 'green', background: '#e1f5e1', padding: '10px', borderRadius: '6px', fontSize: '13px' }}>
                {forgotMessage}
              </p>
            )}
            {forgotError && (
              <p style={{ color: 'red', background: '#ffebee', padding: '10px', borderRadius: '6px', fontSize: '13px' }}>
                {forgotError}
              </p>
            )}
            <input type="email" placeholder="Registered Email" value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
            <input type="password" placeholder="Naya Password" value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
            <input type="password" placeholder="Naya Password Confirm Karo" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
            <button onClick={handleForgotPassword}
              style={{ width: '100%', padding: '10px', background: '#2E5FA3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginBottom: '10px' }}>
              Reset Password
            </button>
            <button onClick={() => { setShowForgot(false); setForgotMessage(''); setForgotError(''); }}
              style={{ width: '100%', padding: '10px', background: '#eee', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>
              ← Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;