import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import API from '../services/api';

function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const taskRes = await API.get('/tasks/');
      const reportRes = await API.get('/reports/');
      setTasks(taskRes.data);
      setReports(reportRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const taskStatusData = [
    { name: 'Todo', value: tasks.filter(t => t.status === 'Todo').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Done', value: tasks.filter(t => t.status === 'Done').length },
  ];

  const priorityData = [
    { name: 'Low', tasks: tasks.filter(t => t.priority === 'Low').length },
    { name: 'Medium', tasks: tasks.filter(t => t.priority === 'Medium').length },
    { name: 'High', tasks: tasks.filter(t => t.priority === 'High').length },
  ];

  const reportData = reports.map(r => ({
    name: `Week ${r.week_number}`,
    reports: 1
  }));

  const COLORS = ['#2E5FA3', '#f57c00', '#388e3c'];
  const completionRate = tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100) : 0;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', background: '#f0f2f5', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#2E5FA3' }}>📊 Analytics</h2>
        <a href="/dashboard" style={{ color: '#2E5FA3', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', borderTop: '4px solid #2E5FA3' }}>
          <h3 style={{ color: '#2E5FA3', margin: '0 0 10px' }}>Total Tasks</h3>
          <p style={{ fontSize: '42px', fontWeight: 'bold', margin: 0, color: '#333' }}>{tasks.length}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', borderTop: '4px solid #388e3c' }}>
          <h3 style={{ color: '#388e3c', margin: '0 0 10px' }}>Completed</h3>
          <p style={{ fontSize: '42px', fontWeight: 'bold', margin: 0, color: '#333' }}>{tasks.filter(t => t.status === 'Done').length}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', borderTop: '4px solid #f57c00' }}>
          <h3 style={{ color: '#f57c00', margin: '0 0 10px' }}>Completion Rate</h3>
          <p style={{ fontSize: '42px', fontWeight: 'bold', margin: 0, color: '#333' }}>{completionRate}%</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', borderTop: '4px solid #9c27b0' }}>
          <h3 style={{ color: '#9c27b0', margin: '0 0 10px' }}>Reports Submitted</h3>
          <p style={{ fontSize: '42px', fontWeight: 'bold', margin: 0, color: '#333' }}>{reports.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

        {/* Bar Chart - Priority */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '300px' }}>
          <h3 style={{ color: '#2E5FA3', margin: '0 0 20px' }}>Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#2E5FA3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Status */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '300px' }}>
          <h3 style={{ color: '#2E5FA3', margin: '0 0 20px' }}>Task Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={taskStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {taskStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Bar */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '300px' }}>
          <h3 style={{ color: '#2E5FA3', margin: '0 0 20px' }}>Overall Progress</h3>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#666' }}>Task Completion</span>
              <span style={{ color: '#2E5FA3', fontWeight: 'bold' }}>{completionRate}%</span>
            </div>
            <div style={{ background: '#f0f2f5', borderRadius: '10px', height: '12px' }}>
              <div style={{ background: 'linear-gradient(90deg, #2E5FA3, #4a90d9)', height: '12px', borderRadius: '10px', width: `${completionRate}%`, transition: 'width 1s ease' }} />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#666' }}>Reports Submitted</span>
              <span style={{ color: '#388e3c', fontWeight: 'bold' }}>{reports.length} / 5 weeks</span>
            </div>
            <div style={{ background: '#f0f2f5', borderRadius: '10px', height: '12px' }}>
              <div style={{ background: 'linear-gradient(90deg, #388e3c, #66bb6a)', height: '12px', borderRadius: '10px', width: `${Math.min((reports.length / 5) * 100, 100)}%`, transition: 'width 1s ease' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;