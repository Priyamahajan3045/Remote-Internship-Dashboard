import React, { useState, useEffect } from 'react';
import API from '../services/api';

function Kanban() {
  const [tasks, setTasks] = useState({ Todo: [], 'In Progress': [], Done: [] });
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '', priority: 'Low', intern_id: 1 });
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks/');
      const grouped = { Todo: [], 'In Progress': [], Done: [] };
      res.data.forEach(task => {
        if (grouped[task.status]) grouped[task.status].push(task);
      });
      setTasks(grouped);
    } catch (err) {
      console.log(err);
    }
  };

  const moveTask = async (task, newStatus) => {
    try {
      await API.put(`/tasks/${task.id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async () => {
    try {
      await API.post('/tasks/', { ...newTask, status: 'Todo', created_by: 1 });
      setShowForm(false);
      setNewTask({ title: '', description: '', deadline: '', priority: 'Low', intern_id: 1 });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = ['Todo', 'In Progress', 'Done'];
  const colors = { Todo: '#e3f2fd', 'In Progress': '#fff3e0', Done: '#e1f5e1' };
  const headerColors = { Todo: '#2E5FA3', 'In Progress': '#f57c00', Done: '#388e3c' };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', background: '#f0f2f5', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#2E5FA3' }}>📋 Kanban Board</h2>
        <div>
          <a href="/dashboard" style={{ marginRight: '15px', color: '#2E5FA3', textDecoration: 'none' }}>← Dashboard</a>
          {role === 'mentor' && (
            <button onClick={() => setShowForm(true)} style={{ background: '#2E5FA3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
              + New Task
            </button>
          )}
        </div>
      </div>

      {/* New Task Form */}
      {showForm && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 15px', color: '#2E5FA3' }}>Create New Task</h3>
          <input placeholder="Task Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
          <input placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
          <input type="date" value={newTask.deadline} onChange={e => setNewTask({ ...newTask, deadline: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
          <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input type="number" placeholder="Intern ID" value={newTask.intern_id} onChange={e => setNewTask({ ...newTask, intern_id: parseInt(e.target.value) })}
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={createTask} style={{ background: '#2E5FA3', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer' }}>Create</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#eee', color: '#333', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Kanban Columns */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {columns.map(col => (
          <div key={col} style={{ flex: 1, background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ background: headerColors[col], padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '16px' }}>{col}</h3>
              <span style={{ background: 'rgba(255,255,255,0.3)', color: 'white', borderRadius: '12px', padding: '2px 10px', fontSize: '14px' }}>{tasks[col].length}</span>
            </div>
            <div style={{ padding: '15px', minHeight: '400px', background: colors[col] }}>
              {tasks[col].map(task => (
                <div key={task.id} style={{ background: 'white', borderRadius: '8px', padding: '15px', marginBottom: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                  <h4 style={{ margin: '0 0 8px', color: '#333', fontSize: '15px' }}>{task.title}</h4>
                  <p style={{ margin: '0 0 8px', color: '#666', fontSize: '13px' }}>{task.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', background: task.priority === 'High' ? '#ffebee' : task.priority === 'Medium' ? '#fff3e0' : '#e8f5e9', color: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green' }}>
                      {task.priority}
                    </span>
                    <span style={{ fontSize: '12px', color: '#999' }}>📅 {task.deadline}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {col !== 'Todo' && <button onClick={() => moveTask(task, col === 'In Progress' ? 'Todo' : 'In Progress')} style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer', background: 'white' }}>← Back</button>}
                    {col !== 'Done' && <button onClick={() => moveTask(task, col === 'Todo' ? 'In Progress' : 'Done')} style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: '#2E5FA3', color: 'white' }}>Move →</button>}
                    {role === 'mentor' && <button onClick={() => deleteTask(task.id)} style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: '#ffebee', color: 'red' }}>🗑</button>}
                  </div>
                </div>
              ))}
              {tasks[col].length === 0 && <p style={{ textAlign: 'center', color: '#aaa', marginTop: '50px' }}>No tasks</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kanban;