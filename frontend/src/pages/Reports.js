import React, { useState, useEffect } from 'react';
import API from '../services/api';

function Reports() {
  const [reports, setReports] = useState([]);
  const [interns, setInterns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReport, setNewReport] = useState({ week_number: '', tasks_completed: '', blockers: '', next_week_plan: '', hours_worked: '' });
  const [reportFile, setReportFile] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [newFeedback, setNewFeedback] = useState('');
  const [activeFeedback, setActiveFeedback] = useState(null);
  const [selectedIntern, setSelectedIntern] = useState('all');
  const role = localStorage.getItem('role');
  const user_id = parseInt(localStorage.getItem('user_id'));

  useEffect(() => {
    fetchReports();
    if (role === 'mentor') fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const res = await API.get('/interns/');
      setInterns(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await API.get('/reports/');
      const allReports = res.data;
      const filtered = role === 'intern' ? allReports.filter(r => r.intern_id === user_id) : allReports;
      setReports(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowForm = () => {
    const myReports = reports.filter(r => r.intern_id === user_id);
    const lastWeek = myReports.length > 0 ? Math.max(...myReports.map(r => r.week_number)) : 0;
    setNewReport({ week_number: lastWeek + 1, tasks_completed: '', blockers: '', next_week_plan: '', hours_worked: '' });
    setShowForm(true);
  };

  const submitReport = async () => {
    try {
      const content = `## Tasks Completed:\n${newReport.tasks_completed}\n\n## Blockers:\n${newReport.blockers}\n\n## Next Week Plan:\n${newReport.next_week_plan}\n\n## Hours Worked: ${newReport.hours_worked}`;
      const res = await API.post('/reports/', { week_number: newReport.week_number, content, intern_id: user_id });
      const reportId = res.data.id;
      if (reportFile) {
        const formData = new FormData();
        formData.append('file', reportFile);
        await API.post(`/reports/${reportId}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setShowForm(false);
      setReportFile(null);
      fetchReports();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFeedback = async (reportId) => {
    try {
      const res = await API.get(`/feedback/${reportId}`);
      setFeedback(prev => ({ ...prev, [reportId]: res.data }));
      setActiveFeedback(activeFeedback === reportId ? null : reportId);
    } catch (err) {
      console.log(err);
    }
  };

  const submitFeedback = async (reportId) => {
    try {
      await API.post(`/feedback/${reportId}`, { content: newFeedback, mentor_id: user_id });
      setNewFeedback('');
      fetchFeedback(reportId);
    } catch (err) {
      console.log(err);
    }
  };

  const updateReportStatus = async (reportId, status) => {
    try {
      await API.put(`/reports/${reportId}/status?status=${status}`);
      fetchReports();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredReports = role === 'mentor' && selectedIntern !== 'all'
    ? reports.filter(r => r.intern_id === parseInt(selectedIntern))
    : reports;

  const getStatusStyle = (status) => {
    if (status === 'Approved') return { background: '#e1f5e1', color: 'green' };
    if (status === 'Rejected') return { background: '#ffebee', color: 'red' };
    return { background: '#fff3e0', color: 'orange' };
  };

  const inputStyle = { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '14px' };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', background: '#f0f2f5', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#2E5FA3' }}>📝 Weekly Reports</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="/dashboard" style={{ marginRight: '15px', color: '#2E5FA3', textDecoration: 'none' }}>← Dashboard</a>
          {role === 'mentor' && (
            <select value={selectedIntern} onChange={e => setSelectedIntern(e.target.value)}
              style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}>
              <option value="all">👥 Saare Interns</option>
              {interns.map(intern => (
                <option key={intern.id} value={intern.id}>👤 {intern.name}</option>
              ))}
            </select>
          )}
          {role === 'intern' && (
            <button onClick={handleShowForm} style={{ background: '#2E5FA3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
              + Submit Report
            </button>
          )}
        </div>
      </div>

      {/* Report Form */}
      {showForm && role === 'intern' && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 5px', color: '#2E5FA3' }}>Submit Weekly Report</h3>
          <p style={{ color: '#888', margin: '0 0 20px', fontSize: '14px' }}>Week {newReport.week_number} — Automatic</p>

          <label style={{ color: '#555', fontWeight: 'bold', fontSize: '14px' }}>✅ Tasks Completed this week:</label>
          <textarea placeholder="Is hafte kya kiya? List karo..." value={newReport.tasks_completed}
            onChange={e => setNewReport({ ...newReport, tasks_completed: e.target.value })}
            rows={4} style={{ ...inputStyle, resize: 'vertical', marginTop: '5px' }} />

          <label style={{ color: '#555', fontWeight: 'bold', fontSize: '14px' }}>🚧 Blockers / Problems:</label>
          <textarea placeholder="Koi problem aayi? Kya ruka?" value={newReport.blockers}
            onChange={e => setNewReport({ ...newReport, blockers: e.target.value })}
            rows={3} style={{ ...inputStyle, resize: 'vertical', marginTop: '5px' }} />

          <label style={{ color: '#555', fontWeight: 'bold', fontSize: '14px' }}>📅 Next Week Plan:</label>
          <textarea placeholder="Agle hafte kya karna hai?" value={newReport.next_week_plan}
            onChange={e => setNewReport({ ...newReport, next_week_plan: e.target.value })}
            rows={3} style={{ ...inputStyle, resize: 'vertical', marginTop: '5px' }} />

          <label style={{ color: '#555', fontWeight: 'bold', fontSize: '14px' }}>⏰ Hours Worked:</label>
          <input type="number" placeholder="e.g. 40" value={newReport.hours_worked}
            onChange={e => setNewReport({ ...newReport, hours_worked: e.target.value })}
            style={{ ...inputStyle, marginTop: '5px' }} />

          <label style={{ color: '#555', fontWeight: 'bold', fontSize: '14px' }}>📎 Document attach karo (optional):</label>
          <input type="file" onChange={e => setReportFile(e.target.files[0])}
            style={{ fontSize: '14px', marginTop: '5px', marginBottom: '15px', display: 'block' }} />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={submitReport} style={{ background: '#2E5FA3', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer' }}>Submit</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#eee', color: '#333', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Reports List */}
      {filteredReports.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}>
          <p style={{ color: '#aaa', fontSize: '18px' }}>Koi report nahi hai abhi</p>
        </div>
      )}

      {filteredReports.map(report => (
        <div key={report.id} style={{ background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div>
              <h3 style={{ margin: '0 0 5px', color: '#2E5FA3' }}>Week {report.week_number}</h3>
              {role === 'mentor' && (
                <span style={{ fontSize: '13px', color: '#888' }}>
                  👤 {interns.find(i => i.id === report.intern_id)?.name || 'Unknown'}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ ...getStatusStyle(report.status), padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
                {report.status || 'Pending'}
              </span>
              <span style={{ color: '#999', fontSize: '14px' }}>📅 {new Date(report.submitted_at).toLocaleDateString()}</span>
            </div>
          </div>

          <p style={{ color: '#444', lineHeight: '1.8', whiteSpace: 'pre-wrap', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>{report.content}</p>

          {report.document_path && (
            <a href={`http://127.0.0.1:8000/${report.document_path}`} target="_blank" rel="noreferrer"
              style={{ color: '#2E5FA3', fontSize: '14px', display: 'inline-block', margin: '10px 0' }}>
              📎 Attached Document
            </a>
          )}

          {role === 'mentor' && (
            <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
              <button onClick={() => updateReportStatus(report.id, 'Approved')}
                style={{ padding: '8px 20px', background: '#e1f5e1', color: 'green', border: '1px solid green', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                ✅ Approve
              </button>
              <button onClick={() => updateReportStatus(report.id, 'Rejected')}
                style={{ padding: '8px 20px', background: '#ffebee', color: 'red', border: '1px solid red', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                ❌ Reject
              </button>
            </div>
          )}

          <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <button onClick={() => fetchFeedback(report.id)}
              style={{ background: '#f0f2f5', color: '#2E5FA3', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', marginBottom: '10px' }}>
              💬 {activeFeedback === report.id ? 'Hide Feedback' : 'View Feedback'}
            </button>

            {activeFeedback === report.id && (
              <div>
                {feedback[report.id]?.length === 0 && <p style={{ color: '#aaa' }}>Abhi koi feedback nahi</p>}
                {feedback[report.id]?.map((fb, i) => (
                  <div key={i} style={{ background: '#f0f7ff', borderRadius: '8px', padding: '12px', marginBottom: '8px', borderLeft: '4px solid #2E5FA3' }}>
                    <p style={{ margin: 0, color: '#444' }}>{fb.content}</p>
                    <p style={{ margin: '5px 0 0', color: '#999', fontSize: '12px' }}>📅 {new Date(fb.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
                {role === 'mentor' && (
                  <div style={{ marginTop: '10px' }}>
                    <textarea placeholder="Feedback likho..." value={newFeedback}
                      onChange={e => setNewFeedback(e.target.value)}
                      rows={3} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', marginBottom: '8px' }} />
                    <button onClick={() => submitFeedback(report.id)}
                      style={{ background: '#2E5FA3', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}>
                      Submit Feedback
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reports;