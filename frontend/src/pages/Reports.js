import React, { useState, useEffect } from 'react';
import API from '../services/api';

function Reports() {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReport, setNewReport] = useState({ week_number: '', content: '', intern_id: 1 });
  const [feedback, setFeedback] = useState({});
  const [newFeedback, setNewFeedback] = useState('');
  const [activeFeedback, setActiveFeedback] = useState(null);
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get('/reports/');
      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitReport = async () => {
    try {
      await API.post('/reports/', newReport);
      setShowForm(false);
      setNewReport({ week_number: '', content: '', intern_id: 1 });
      fetchReports();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFeedback = async (reportId) => {
    try {
      const res = await API.get(`/feedback/${reportId}`);
      setFeedback(prev => ({ ...prev, [reportId]: res.data }));
      setActiveFeedback(reportId);
    } catch (err) {
      console.log(err);
    }
  };

  const submitFeedback = async (reportId) => {
    try {
      await API.post(`/feedback/${reportId}`, { content: newFeedback, mentor_id: 1 });
      setNewFeedback('');
      fetchFeedback(reportId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', background: '#f0f2f5', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#2E5FA3' }}>📝 Weekly Reports</h2>
        <div>
          <a href="/dashboard" style={{ marginRight: '15px', color: '#2E5FA3', textDecoration: 'none' }}>← Dashboard</a>
          {role === 'intern' && (
            <button onClick={() => setShowForm(true)} style={{ background: '#2E5FA3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
              + Submit Report
            </button>
          )}
        </div>
      </div>

      {/* Report Form */}
      {showForm && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 15px', color: '#2E5FA3' }}>Submit Weekly Report</h3>
          <input type="number" placeholder="Week Number (e.g. 1)" value={newReport.week_number}
            onChange={e => setNewReport({ ...newReport, week_number: parseInt(e.target.value) })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
          <textarea placeholder="Write your weekly report here... (What did you do? Any blockers? Plans for next week?)"
            value={newReport.content} onChange={e => setNewReport({ ...newReport, content: e.target.value })}
            rows={8} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', resize: 'vertical' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={submitReport} style={{ background: '#2E5FA3', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer' }}>Submit</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#eee', color: '#333', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Reports List */}
      {reports.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}>
          <p style={{ color: '#aaa', fontSize: '18px' }}>No reports submitted yet</p>
        </div>
      )}

      {reports.map(report => (
        <div key={report.id} style={{ background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0, color: '#2E5FA3' }}>Week {report.week_number}</h3>
            <span style={{ color: '#999', fontSize: '14px' }}>
              {new Date(report.submitted_at).toLocaleDateString()}
            </span>
          </div>
          <p style={{ color: '#444', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{report.content}</p>

          {/* Feedback Section */}
          <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <button onClick={() => fetchFeedback(report.id)}
              style={{ background: '#f0f2f5', color: '#2E5FA3', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', marginBottom: '10px' }}>
              💬 View Feedback
            </button>

            {activeFeedback === report.id && (
              <div>
                {feedback[report.id]?.length === 0 && <p style={{ color: '#aaa' }}>No feedback yet</p>}
                {feedback[report.id]?.map((fb, i) => (
                  <div key={i} style={{ background: '#f8f9fa', borderRadius: '8px', padding: '12px', marginBottom: '8px', borderLeft: '4px solid #2E5FA3' }}>
                    <p style={{ margin: 0, color: '#444' }}>{fb.content}</p>
                    <p style={{ margin: '5px 0 0', color: '#999', fontSize: '12px' }}>{new Date(fb.created_at).toLocaleDateString()}</p>
                  </div>
                ))}

                {role === 'mentor' && (
                  <div style={{ marginTop: '10px' }}>
                    <textarea placeholder="Write feedback..." value={newFeedback}
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