import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import ManageUsers from './pages/ManageUsers';
import Profile from './pages/Profile';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/kanban" element={token ? <Kanban /> : <Navigate to="/login" />} />
        <Route path="/reports" element={token ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={token ? <Analytics /> : <Navigate to="/login" />} />
        <Route path="/manage-users" element={token ? <ManageUsers /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;