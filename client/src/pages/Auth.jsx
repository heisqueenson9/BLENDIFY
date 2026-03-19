import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Auth({ mode = 'login' }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      // Simulate login for Demo
      login({ fullName: formData.email.split('@')[0], email: formData.email });
    } else {
      signup({ fullName: formData.name, email: formData.email });
    }
    navigate('/');
  };

  return (
    <div className="auth-page" style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      background: 'var(--black)', padding: '40px 20px' 
    }}>
      <div className="auth-form-box card-luxury" style={{ maxWidth: '450px', width: '100%', padding: '40px', borderRadius: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '8px' }}>
          {mode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          {mode === 'login' ? 'Login to access your orders.' : 'Join for exclusive healthy living tips.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Full Name</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                required 
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Email Address</label>
            <input 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              type="email" 
              style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Password</label>
            <input 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              type="password" 
              style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
              required 
            />
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', marginTop: '12px' }}>
            {mode === 'login' ? 'Log In →' : 'Sign Up →'}
          </button>
        </form>

        <div className="auth-switch" style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
           {mode === 'login' ? (
              <>Don't have an account? <Link to="/register" style={{ color: 'var(--lime)', textDecoration: 'none' }}>Sign up</Link></>
           ) : (
              <>Already member? <Link to="/login" style={{ color: 'var(--lime)', textDecoration: 'none' }}>Log in</Link></>
           )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
