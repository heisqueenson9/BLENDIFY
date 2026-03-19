import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-page" style={{ padding: '120px 24px', minHeight: '100vh', background: 'var(--black)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 data-fade="right" style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '40px' }}>Your <span style={{ color: 'var(--lime)' }}>Profile</span></h1>
        
        <div data-fade="up" className="delay-100 card-luxury" style={{ padding: '48px', borderRadius: '32px', textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--lime)', color: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2.5rem', fontWeight: 900 }}>
             {user.fullName.charAt(0).toUpperCase()}
          </div>
          
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{user.fullName}</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px' }}>{user.email}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
             <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.5 }}>Account Status</span>
                <span style={{ color: 'var(--lime)', fontWeight: 700 }}>VERIFIED</span>
             </div>
             <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.5 }}>Member Since</span>
                <span style={{ fontWeight: 700 }}>March 2026</span>
             </div>
          </div>

          <button onClick={handleLogout} className="btn-primary" style={{ width: '100%', marginTop: '40px', padding: '18px', borderRadius: '16px', background: '#ff4757', border: 'none' }}>
             Logout Account
          </button>
        </div>
      </div>
    </div>
  );
}
