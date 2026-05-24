import React, { useState } from 'react';
import API from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('intern');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', { name, email, password, role });
      setSuccess('Registration successful! Please login.');
      setError('');
    } catch (err) {
      setError('Registration failed! Try again.');
    }
  };

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5' }}>
      <div style={{ background:'white', padding:'40px', borderRadius:'10px', width:'350px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign:'center', color:'#2E5FA3' }}>Register</h2>
        {error && <p style={{ color:'red', textAlign:'center' }}>{error}</p>}
        {success && <p style={{ color:'green', textAlign:'center' }}>{success}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width:'100%', padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ddd', boxSizing:'border-box' }}
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width:'100%', padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ddd', boxSizing:'border-box' }}
        >
          <option value="intern">Intern</option>
          <option value="mentor">Mentor</option>
        </select>
        <button
          onClick={handleRegister}
          style={{ width:'100%', padding:'10px', background:'#2E5FA3', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'16px' }}
        >
          Register
        </button>
        <p style={{ textAlign:'center', marginTop:'15px' }}>
          Already have an account? <a href="/login" style={{ color:'#2E5FA3' }}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;