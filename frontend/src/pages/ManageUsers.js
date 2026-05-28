import React, { useState, useEffect } from 'react';
import API from '../services/api';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'mentor') window.location.href = '/dashboard';
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/users/');
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Kya aap sure hain? User delete ho jaayega!')) {
      try {
        await API.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const resetPassword = async (id, name) => {
    if (window.confirm(`${name} ka password "intern123" pe reset karein?`)) {
      try {
        await API.put(`/users/${id}/reset-password`);
        alert('Password reset ho gaya! Naya password: intern123');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', background: '#f0f2f5', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#2E5FA3' }}>👥 Manage Users</h2>
        <a href="/dashboard" style={{ color: '#2E5FA3', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      {/* Users Table */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f2f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2E5FA3' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2E5FA3' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2E5FA3' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2E5FA3' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#2E5FA3' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', color: '#666' }}>{user.id}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{user.name}</td>
                <td style={{ padding: '12px', color: '#666' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '13px', background: user.role === 'mentor' ? '#e3f2fd' : '#e1f5e1', color: user.role === 'mentor' ? '#2E5FA3' : '#388e3c' }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                   
                    <button onClick={() => deleteUser(user.id)}
                      style={{ padding: '6px 12px', background: '#ffebee', color: 'red', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p style={{ textAlign: 'center', color: '#aaa' }}>No users found</p>}
      </div>
    </div>
  );
}

export default ManageUsers;