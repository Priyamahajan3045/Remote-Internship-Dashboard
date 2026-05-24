import React, { useState } from 'react';
import API from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid email or password!');
    }
  };

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5' }}>
      <div style={{ background:'white', padding:'40px', borderRadius:'10px', width:'350px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign:'center', color:'#2E5FA3' }}>Internship Dashboard</h2>
        <p style={{ textAlign:'center', color:'#666' }}>Login to continue</p>
        {error && <p style={{ color:'red', textAlign:'center' }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width:'100%', padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ddd', boxSizing:'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width:'100%', padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ddd', boxSizing:'border-box' }}
        />
        <button
          onClick={handleLogin}
          style={{ width:'100%', padding:'10px', background:'#2E5FA3', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'16px' }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;