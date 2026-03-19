import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BLENDER_IMAGES } from '../data/constants';

function Auth({ mode = 'login' }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, register, user, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
    setError('');
  }, [user, navigate, setError, mode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(formData.email, formData.password);
    } else {
      await register(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <span className="hero-eyebrow">🌿 Blend with us</span>
          <h2>JOIN THE <br /><span>BLEND FAMILY</span></h2>
          <p>Get exclusive recipes, early access to new product drops, and member-only discounts.</p>
          <div className="auth-img-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {BLENDER_IMAGES.slice(0, 4).map((src, i) => (
              <div key={i} className="auth-img-tile" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <img src={src} alt="Blender Lifestyle" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-box">
          <h1>{mode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</h1>
          <p>{mode === 'login' ? 'Login to manage your orders and profile.' : 'Join today for 10% off your first order.'}</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="form-group">
                <span className="form-label">Full Name</span>
                <input name="name" value={formData.name} onChange={handleChange} className="form-input" required />
              </div>
            )}
            <div className="form-group">
              <span className="form-label">Email Address</span>
              <input name="email" value={formData.email} onChange={handleChange} className="form-input" type="email" required />
            </div>
            <div className="form-group">
              <span className="form-label">Password</span>
              <input name="password" value={formData.password} onChange={handleChange} className="form-input" type="password" required />
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }} disabled={loading}>
              {loading ? 'Processing...' : (mode === 'login' ? 'Log In →' : 'Sign Up →')}
            </button>
          </form>

          <div className="auth-switch">
             {mode === 'login' ? (
                <>New to Blendify? <Link to="/register">Create an account</Link></>
             ) : (
                <>Already have an account? <Link to="/login">Log in here</Link></>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
