import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    street: '',
    city: '',
    country: 'Ghana',
    zip: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);

    // MOCK PAYMENT
    setTimeout(() => {
      setLoading(false);
      showToast('Order placed successfully! Redirecting to home...', 'success');
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (items.length === 0) return <div className="container" style={{ textAlign: 'center', padding: '100px 24px' }}><h3>Cart is empty.</h3><Link to="/shop" className="btn-primary">Browse Shop</Link></div>;

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <h2 className="section-title">CHECKOUT</h2>
      <div className="shop-layout" style={{ gridTemplateColumns: 'minmax(0, 1fr) 400px' }}>
        <form className="auth-form-box" onSubmit={handleCheckout} style={{ maxWidth: '100%' }}>
          <div className="form-group">
            <span className="form-label">Email Address</span>
            <input name="email" value={formData.email} onChange={handleChange} className="form-input" required disabled={!!user} />
          </div>
          <div className="form-group">
            <span className="form-label">Full Name</span>
            <input name="name" value={formData.name} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <span className="form-label">Street Address</span>
            <input name="street" value={formData.street} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <span className="form-label">City</span>
              <input name="city" value={formData.city} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group">
              <span className="form-label">Zip / Area Code</span>
              <input name="zip" value={formData.zip} onChange={handleChange} className="form-input" required />
            </div>
          </div>
          <div className="form-group">
            <span className="form-label">Country</span>
            <input name="country" value={formData.country} onChange={handleChange} className="form-input" required />
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }} disabled={loading}>
            {loading ? 'Processing...' : 'Complete Payment →'}
          </button>
        </form>

        <aside>
          <div style={{ background: 'var(--gray-50)', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
            <h4 style={{ textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '1px' }}>Order Review</h4>
            {items.map(m => (
              <div key={m.id || m._id} className="cart-item" style={{ borderBottom: '1px solid var(--gray-100)', padding: '16px 0' }}>
                <div className="cart-item-img" style={{ width: '48px', height: '48px' }}>
                  <img src={m.image} alt={m.name} />
                </div>
                <div style={{ flex: 1, paddingLeft: '12px' }}>
                  <h5 style={{ fontSize: '0.82rem', fontWeight: '700' }}>{m.name} <span style={{ color: 'var(--text-muted)' }}>x{m.quantity}</span></h5>
                  <p style={{ fontSize: '0.85rem' }}>{Number(m.price * m.quantity).toFixed(2)}L</p>
                </div>
              </div>
            ))}
            <div className="cart-total-row" style={{ borderTop: '1px solid var(--gray-200)', marginTop: '20px', paddingTop: '20px' }}>
              <span className="cart-total-label" style={{ fontWeight: '700', color: 'var(--black)' }}>Total</span>
              <span className="cart-total-amount" style={{ color: 'var(--lime)', fontSize: '1.4rem' }}>{Number(cartTotal > 200 ? cartTotal : cartTotal + 20).toFixed(2)}L</span>
            </div>
            
            <div style={{ marginTop: '32px', border: '1.5px solid var(--lime)', borderRadius: 'var(--radius-sm)', padding: '16px', background: 'rgba(197,231,16,0.05)' }}>
               <h5 style={{ color: 'var(--black)', marginBottom: '8px' }}>🚀 Free Shipping Applied</h5>
               <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Orders over 200L qualify for free express delivery.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
