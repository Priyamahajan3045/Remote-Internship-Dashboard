import React, { useState, useEffect } from 'react';
import API from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchTasks();
    fetchReports();
  }, []);

  const fetchTasks = async () => {
    try {
     const res = await API.get('/tasks/');
const user_id = parseInt(localStorage.getItem('user_id'));
const role = localStorage.getItem('role');
const filtered = role === 'intern' ? res.data.filter(t => t.intern_id === user_id) : res.data;
setTasks(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await API.get('/reports/');
      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  const completionRate = tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100) : 0;

  return (
    <div style={{ fontFamily: 'Arial', minHeight: '100vh', background: '#f0f2f5' }}>

      {/* Navbar */}
      <div style={{ background: '#2E5FA3', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'white', margin: 0 }}>🎓 InternTrack</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
         <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Welcome, {localStorage.getItem('name')}! ({role})</span>
          <a href="/profile" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px' }}>👤 Profile</a>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: 'white', color: '#2E5FA3', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: '30px' }}>

        {/* Welcome */}
        <h2 style={{ color: '#333', marginBottom: '25px' }}>Welcome back! 👋</h2>

        {/* Stats Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: '4px solid #2E5FA3', textAlign: 'center' }}>
            <h3 style={{ color: '#2E5FA3', margin: '0 0 10px' }}>Total Tasks</h3>
            <p style={{ fontSize: '42px', fontWeight: 'bold', margin: 0 }}>{tasks.length}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: '4px solid #388e3c', textAlign: 'center' }}>
            <h3 style={{ color: '#388e3c', margin: '0 0 10px' }}>Completed</h3>
            <p style={{ fontSize: '42px', fontWeight: 'bold', margin: 0 }}>{tasks.filter(t => t.status === 'Done').length}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: '4px solid #f57c00', textAlign: 'center' }}>
            <h3 style={{ color: '#f57c00', margin: '0 0 10px' }}>Completion Rate</h3>
            <p style={{ fontSize: '42px', fontWeight: 'bold', margin: 0 }}>{completionRate}%</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: '4px solid #9c27b0', textAlign: 'center' }}>
            <h3 style={{ color: '#9c27b0', margin: '0 0 10px' }}>Reports</h3>
            <p style={{ fontSize: '42px', fontWeight: 'bold', margin: 0 }}>{reports.length}</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <h3 style={{ color: '#333', marginBottom: '15px' }}>Quick Access</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <a href="/kanban" style={{ textDecoration: 'none', flex: 1 }}>
            <div style={{ background: 'linear-gradient(135deg, #2E5FA3, #4a90d9)', padding: '25px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📋</div>
              <h3 style={{ color: 'white', margin: '0 0 5px' }}>Kanban Board</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '14px' }}>Manage your tasks</p>
            </div>
          </a>
          <a href="/reports" style={{ textDecoration: 'none', flex: 1 }}>
            <div style={{ background: 'linear-gradient(135deg, #388e3c, #66bb6a)', padding: '25px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📝</div>
              <h3 style={{ color: 'white', margin: '0 0 5px' }}>Weekly Reports</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '14px' }}>Submit & view reports</p>
            </div>
          </a>
          <a href="/analytics" style={{ textDecoration: 'none', flex: 1 }}>
            <div style={{ background: 'linear-gradient(135deg, #f57c00, #ffb74d)', padding: '25px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📊</div>
              <h3 style={{ color: 'white', margin: '0 0 5px' }}>Analytics</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '14px' }}>Track your progress</p>
            </div>
          </a>
          {role === 'mentor' && (
  <a href="/manage-users" style={{ textDecoration: 'none', flex: 1 }}>
    <div style={{ background: 'linear-gradient(135deg, #9c27b0, #ce93d8)', padding: '25px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      <div style={{ fontSize: '40px', marginBottom: '10px' }}>👥</div>
      <h3 style={{ color: 'white', margin: '0 0 5px' }}>Manage Users</h3>
      <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '14px' }}>Delete & reset passwords</p>
    </div>
  </a>
)}
        </div>

        {/* Recent Tasks */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h3 style={{ color: '#2E5FA3', margin: '0 0 15px' }}>Recent Tasks</h3>
          {tasks.length === 0 && <p style={{ color: '#aaa', textAlign: 'center' }}>No tasks yet</p>}
          {tasks.slice(0, 5).map(task => (
            <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ color: '#333' }}>{task.title}</span>
              <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '13px', background: task.status === 'Done' ? '#e1f5e1' : task.status === 'In Progress' ? '#fff3e0' : '#e3f2fd', color: task.status === 'Done' ? 'green' : task.status === 'In Progress' ? 'orange' : 'blue' }}>
                {task.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;