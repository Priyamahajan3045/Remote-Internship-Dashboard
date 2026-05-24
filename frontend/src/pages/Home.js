import React from 'react';

function Home() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", minHeight: '100vh', background: '#0f0c29' }}>

      {/* Animated Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', zIndex: -1 }} />

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🎓</span>
          <span style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', letterSpacing: '1px' }}>InternTrack</span>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <a href="/login" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '15px', padding: '8px 20px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.3)', transition: 'all 0.3s' }}>Login</a>
          <a href="/register" style={{ background: 'linear-gradient(90deg, #667eea, #764ba2)', color: 'white', textDecoration: 'none', fontSize: '15px', padding: '8px 24px', borderRadius: '25px', fontWeight: 'bold' }}>Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '100px 20px 60px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(102,126,234,0.2)', border: '1px solid rgba(102,126,234,0.5)', borderRadius: '25px', padding: '8px 20px', marginBottom: '25px' }}>
          <span style={{ color: '#a78bfa', fontSize: '14px', fontWeight: '500' }}>⚡ MPOnline Internship Program • JIT Khargone</span>
        </div>
        <h1 style={{ color: 'white', fontSize: '62px', margin: '0 0 20px', lineHeight: '1.15', fontWeight: '800' }}>
          Track Your Internship<br />
          <span style={{ background: 'linear-gradient(90deg, #667eea, #f093fb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Progress Like a Pro
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '20px', maxWidth: '580px', margin: '0 auto 50px', lineHeight: '1.6' }}>
          Manage tasks on Kanban board, submit weekly reports, get mentor feedback and visualize your growth — all in one place.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/register" style={{ background: 'linear-gradient(90deg, #667eea, #764ba2)', color: 'white', padding: '16px 40px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '17px', boxShadow: '0 8px 25px rgba(102,126,234,0.4)' }}>
            Start Now →
          </a>
          <a href="/login" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '16px 40px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '17px', border: '1px solid rgba(255,255,255,0.2)' }}>
            Login
          </a>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', padding: '40px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '80px', flexWrap: 'wrap' }}>
        {[['📋', 'Task Management', 'Kanban Board'], ['📝', 'Weekly Reports', 'Markdown Support'], ['💬', 'Mentor Feedback', 'Real-time'], ['📊', 'Analytics', 'Visual Charts']].map(([icon, title, sub]) => (
          <div key={title} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>{title}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', padding: '0 60px 80px', flexWrap: 'wrap' }}>

        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '35px', width: '260px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>📋</div>
          <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Kanban Board</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Drag tasks between Todo, In Progress and Done columns visually</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '35px', width: '260px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #11998e, #38ef7d)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>📝</div>
          <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Weekly Reports</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Submit structured weekly reports and track your learning journey</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '35px', width: '260px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #f093fb, #f5576c)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>💬</div>
          <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Mentor Feedback</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Get personalized feedback from your mentor on every report</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '35px', width: '260px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #f7971e, #ffd200)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>📊</div>
          <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Analytics</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Visual charts and progress tracking to measure your growth</p>
        </div>

      </div>

      {/* CTA Section */}
      <div style={{ textAlign: 'center', padding: '60px 20px 80px', background: 'rgba(102,126,234,0.1)', borderTop: '1px solid rgba(102,126,234,0.2)' }}>
        <h2 style={{ color: 'white', fontSize: '36px', margin: '0 0 15px' }}>Ready to get started?</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', margin: '0 0 35px' }}>Join the MPOnline Internship Program today</p>
        <a href="/register" style={{ background: 'linear-gradient(90deg, #667eea, #764ba2)', color: 'white', padding: '16px 50px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '17px', boxShadow: '0 8px 25px rgba(102,126,234,0.4)' }}>
          Register Now →
        </a>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '25px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', margin: 0, fontSize: '13px' }}>© 2026 InternTrack • MPOnline Internship Program • JIT Khargone</p>
      </div>

    </div>
  );
}

export default Home;