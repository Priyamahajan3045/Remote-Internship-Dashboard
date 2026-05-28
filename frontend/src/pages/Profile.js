import React, { useState } from 'react';
import API from '../services/api';

function Profile() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const role = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Naya password match nahi kar raha!');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password kam se kam 6 characters ka hona chahiye!');
      return;
    }
    try {
      await API.put(`/users/${user_id}/change-password`, {
        old_password: oldPassword,
        new_password: newPassword
      });
      setMessage('Password successfully change ho gaya!');
      setError('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Purana password galat hai!');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', background: '#f0f2f5', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#2E5FA3' }}>👤 My Profile</h2>
        <a href="/dashboard" style={{ color: '#2E5FA3', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      {/* Profile Info */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '25px' }}>
        <h3 style={{ color: '#2E5FA3', margin: '0 0 15px' }}>Profile Info</h3>
        <p style={{ margin: '0 0 10px', color: '#666' }}>👤 Role: <strong>{role}</strong></p>
        <p style={{ margin: 0, color: '#666' }}>🆔 User ID: <strong>{user_id}</strong></p>
      </div>

      {/* Change Password */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#2E5FA3', margin: '0 0 20px' }}>🔑 Change Password</h3>

        {message && <p style={{ color: 'green', background: '#e1f5e1', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>{message}</p>}
        {error && <p style={{ color: 'red', background: '#ffebee', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>{error}</p>}

        <input type="password" placeholder="Purana Password" value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input type="password" placeholder="Naya Password" value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input type="password" placeholder="Naya Password Confirm Karo" value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <button onClick={handleChangePassword}
          style={{ background: '#2E5FA3', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
          Change Password
        </button>
      </div>
    </div>
  );
}

export default Profile;