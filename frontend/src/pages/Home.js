import React from 'react';

function Home() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", minHeight: '100vh', background: '#f0f2f5' }}>

      {/* Navbar */}
      <nav style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🎓</span>
          <span style={{ color: '#2E5FA3', fontSize: '22px', fontWeight: 'bold' }}>InternTrack</span>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <a href="/login" style={{ color: '#2E5FA3', textDecoration: 'none', fontSize: '15px', padding: '8px 20px', borderRadius: '25px', border: '1px solid #2E5FA3' }}>Login</a>
          <a href="/register" style={{ background: '#2E5FA3', color: 'white', textDecoration: 'none', fontSize: '15px', padding: '8px 24px', borderRadius: '25px', fontWeight: 'bold' }}>Register</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '80px 20px 60px', background: 'linear-gradient(135deg, #EEF2FF 0%, #E8F4FD 100%)' }}>
        <div style={{ display: 'inline-block', background: '#E3F2FD', border: '1px solid #90CAF9', borderRadius: '25px', padding: '8px 20px', marginBottom: '25px' }}>
          <span style={{ color: '#2E5FA3', fontSize: '14px', fontWeight: '500' }}>⚡ MPOnline Internship Program • JIT Khargone</span>
        </div>
        <h1 style={{ color: '#1a3a6b', fontSize: '52px', margin: '0 0 20px', lineHeight: '1.2', fontWeight: '800' }}>
          Track Your Internship<br />
          <span style={{ color: '#2E5FA3' }}>Progress Like a Pro</span>
        </h1>
        <p style={{ color: '#555', fontSize: '18px', maxWidth: '580px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Manage tasks on Kanban board, submit weekly reports, get mentor feedback and visualize your growth — all in one place.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/register" style={{ background: '#2E5FA3', color: 'white', padding: '14px 40px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 15px rgba(46,95,163,0.3)' }}>
            Get Started →
          </a>
          <a href="/login" style={{ background: 'white', color: '#2E5FA3', padding: '14px 40px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', border: '2px solid #2E5FA3' }}>
            Login
          </a>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', padding: '30px 20px', background: 'white', borderBottom: '1px solid #eee', flexWrap: 'wrap' }}>
        {[['📋', 'Task Management', 'Kanban Board'], ['📝', 'Weekly Reports', 'Structured Format'], ['💬', 'Mentor Feedback', 'Real-time'], ['📊', 'Analytics', 'Visual Charts']].map(([icon, title, sub]) => (
          <div key={title} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>{icon}</div>
            <div style={{ color: '#333', fontWeight: 'bold', fontSize: '15px' }}>{title}</div>
            <div style={{ color: '#888', fontSize: '13px' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', padding: '60px 60px', flexWrap: 'wrap' }}>

        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', width: '240px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
          <div style={{ width: '60px', height: '60px', background: '#E3F2FD', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '28px' }}>📋</div>
          <h3 style={{ color: '#2E5FA3', margin: '0 0 10px', fontSize: '17px' }}>Kanban Board</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Tasks ko Todo, In Progress aur Done mein manage karo</p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', width: '240px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
          <div style={{ width: '60px', height: '60px', background: '#E8F5E9', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '28px' }}>📝</div>
          <h3 style={{ color: '#388e3c', margin: '0 0 10px', fontSize: '17px' }}>Weekly Reports</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Structured weekly progress reports submit karo</p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', width: '240px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
          <div style={{ width: '60px', height: '60px', background: '#FFF3E0', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '28px' }}>💬</div>
          <h3 style={{ color: '#f57c00', margin: '0 0 10px', fontSize: '17px' }}>Mentor Feedback</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Mentor se personalized feedback pao har report pe</p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', width: '240px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
          <div style={{ width: '60px', height: '60px', background: '#F3E5F5', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '28px' }}>📊</div>
          <h3 style={{ color: '#9c27b0', margin: '0 0 10px', fontSize: '17px' }}>Analytics</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Charts aur progress tracking se apni growth dekho</p>
        </div>

      </div>

      {/* CTA Section */}
      <div style={{ textAlign: 'center', padding: '50px 20px', background: '#2E5FA3' }}>
        <h2 style={{ color: 'white', fontSize: '32px', margin: '0 0 15px' }}>Ready to get started?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', margin: '0 0 30px' }}>Join the MPOnline Internship Program today</p>
        <a href="/register" style={{ background: 'white', color: '#2E5FA3', padding: '14px 50px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
          Register Now →
        </a>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px', background: '#1a3a6b' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '13px' }}>© 2026 InternTrack • MPOnline Internship Program • JIT Khargone</p>
      </div>

    </div>
  );
}

export default Home;