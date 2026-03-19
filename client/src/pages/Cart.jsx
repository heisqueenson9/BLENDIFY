import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Icon } from '../components/Icon';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" style={{ padding: '120px 20px', minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--lime)', marginBottom: '32px' }}>
             <Icon name="cart" size={80} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', marginBottom: '24px' }}>YOUR CART IS <span style={{ color: 'var(--lime)', fontStyle: 'italic' }}>EMPTY</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '48px', fontSize: '1.2rem' }}>Looks like you haven't added any luxury blenders yet.</p>
          <Link to="/shop" className="btn-primary" style={{ padding: '20px 48px' }}>Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ padding: '120px 24px', minHeight: '100vh', background: 'var(--black)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h1 data-fade="right" style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', marginBottom: '48px', letterSpacing: '2px' }}>
          SHOPPING <span style={{ color: 'var(--lime)' }}>BAG</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start', transition: 'all 0.3s' }} className="cart-grid">
          
          {/* Cart Items List */}
          <div data-fade="right" className="delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {cartItems.map(item => (
              <div key={item.id} className="card-luxury" style={{ display: 'flex', gap: '32px', padding: '32px', borderRadius: '32px', alignItems: 'center' }}>
                <div style={{ width: '120px', height: '120px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '16px', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{item.name}</h3>
                    <p style={{ fontWeight: 800, color: 'var(--lime)', fontSize: '1.2rem' }}>GHS {item.price.toFixed(2)}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="qty-picker">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="qty-btn">−</button>
                      <div className="qty-display" style={{ minWidth: '40px', textAlign: 'center', fontWeight: 800 }}>{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="qty-btn">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ff4757', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
                      <Icon name="trash" size={18} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div data-fade="left" className="delay-200 card-luxury" style={{ padding: '40px', borderRadius: '32px', position: 'sticky', top: '120px' }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '32px', fontWeight: 800 }}>Order Summary</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}>
                <span>Subtotal</span>
                <span>GHS {cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900 }}>
                <span>Total</span>
                <span style={{ color: 'var(--lime)' }}>GHS {cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="btn-primary" 
              style={{ width: '100%', padding: '20px', borderRadius: '16px', fontSize: '1.1rem' }}
            >
              Secure Checkout →
            </button>
            <div style={{ marginTop: '24px', textAlign: 'center', opacity: 0.4, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Icon name="shield" size={14} /> Secure Encryption Active
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Cart;
