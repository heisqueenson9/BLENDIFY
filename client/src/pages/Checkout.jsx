import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { SIMULATED_RIDERS } from '../data/constants';
import { Icon } from '../components/Icon';

const Checkout = () => {
  const { cartItems, cartTotal, placeOrder } = useCart();
  const { user, wallet, deductFunds } = useAuth();
  const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedRider, setSelectedRider] = useState(SIMULATED_RIDERS[0]);

  const deliveryFee = selectedRider ? selectedRider.price : 15;
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!user) {
      showToast("Please login to place an order.", "error");
      navigate('/login');
      return;
    }
    if (!location) {
      showToast("Please select a delivery location.", "error");
      return;
    }

    if (paymentMethod === 'wallet') {
      if (wallet < total) {
        showToast("Insufficient wallet balance.", "error");
        return;
      }
      deductFunds(total);
    }

    const order = placeOrder(location, paymentMethod, selectedRider, deliveryFee);
    if (order) {
      navigate(`/track/${order.id}`);
    }
  };

  const locations = ["Accra Central", "East Legon", "Kumasi", "Tema", "Takoradi", "Cape Coast", "Tamale", "Dansoman", "Airport Residential"];

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '120px 20px', minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>CART IS EMPTY</h2>
          <Link to="/shop" className="btn-primary">Go to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ padding: '120px 24px', minHeight: '100vh', background: 'var(--black)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h1 data-fade="right" style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', marginBottom: '48px' }}>Final <span style={{ color: 'var(--lime)' }}>Step</span></h1>

        <div className="checkout-container" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '48px', alignItems: 'start' }}>
          
          {/* Left: Forms */}
          <div data-fade="right" className="delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Delivery Location */}
            <div className="card-luxury" style={{ padding: '40px', borderRadius: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                  <Icon name="pin" size={24} color="var(--lime)" />
                  <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', fontWeight: 800 }}>Delivery Details</h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                 <select 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', fontWeight: 600, outline: 'none' }}
                 >
                    <option value="" disabled style={{ color: '#000' }}>-- Select Your Location --</option>
                    {locations.map(loc => <option key={loc} value={loc} style={{ color: '#000' }}>{loc}</option>)}
                 </select>
              </div>
            </div>

            {/* Rider Selection */}
            <div className="card-luxury" style={{ padding: '40px', borderRadius: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                  <Icon name="user" size={24} color="var(--lime)" />
                  <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', fontWeight: 800 }}>Select Delivery Rider</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {SIMULATED_RIDERS.map(rider => (
                  <div 
                    key={rider.id}
                    onClick={() => setSelectedRider(rider)}
                    style={{ 
                      padding: '24px', borderRadius: '24px', background: selectedRider?.id === rider.id ? 'rgba(197, 231, 16, 0.05)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${selectedRider?.id === rider.id ? 'var(--lime)' : 'rgba(255,255,255,0.05)'}`,
                      display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', overflow: 'hidden', border: `2px solid ${selectedRider?.id === rider.id ? 'var(--lime)' : 'transparent'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)' }}>
                      <Icon name={rider.icon} size={48} />
                    </div>
                    <div style={{ flex: 1 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h6 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{rider.name}</h6>
                          <span style={{ fontWeight: 900, color: 'var(--lime)' }}>GHS {rider.price.toFixed(2)}</span>
                       </div>
                       <p style={{ opacity: 0.5, fontSize: '0.85rem' }}>{rider.vehicle} • {rider.plate}</p>
                       <span style={{ fontSize: '0.75rem', color: 'var(--lime)' }}>⭐ {rider.rating} Rating</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="card-luxury" style={{ padding: '40px', borderRadius: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <Icon name="credit" size={24} color="var(--lime)" />
                    <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', fontWeight: 800 }}>Payment Method</h4>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                   <div 
                      onClick={() => setPaymentMethod('card')}
                      style={{ 
                        padding: '24px', borderRadius: '24px', background: paymentMethod === 'card' ? 'rgba(197, 231, 16, 0.05)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${paymentMethod === 'card' ? 'var(--lime)' : 'rgba(255,255,255,0.05)'}`,
                        cursor: 'pointer', transition: 'all 0.3s'
                      }}
                   >
                      <h6 style={{ fontWeight: 800, marginBottom: '8px' }}>Debit / Credit Card</h6>
                      <p style={{ fontSize: '0.8rem', opacity: 0.4 }}>Pay securely via Paystack</p>
                   </div>
                   <div 
                      onClick={() => setPaymentMethod('wallet')}
                      style={{ 
                        padding: '24px', borderRadius: '24px', background: paymentMethod === 'wallet' ? 'rgba(197, 231, 16, 0.05)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${paymentMethod === 'wallet' ? 'var(--lime)' : 'rgba(255,255,255,0.05)'}`,
                        cursor: 'pointer', transition: 'all 0.3s'
                      }}
                   >
                      <h6 style={{ fontWeight: 800, marginBottom: '4px' }}>Wallet Balance</h6>
                      <p style={{ color: 'var(--lime)', fontSize: '0.8rem', fontWeight: 700 }}>Available: GHS {wallet.toFixed(2)}</p>
                   </div>
                </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div data-fade="right" className="delay-200 card-luxury" style={{ padding: '40px', borderRadius: '32px', position: 'sticky', top: '120px' }}>
             <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '32px', fontWeight: 800 }}>Order Summary</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}>
                   <span>Subtotal</span>
                   <span>GHS {cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}>
                   <span>Delivery ({selectedRider?.name})</span>
                   <span>GHS {deliveryFee.toFixed(2)}</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '2rem', fontWeight: 900 }}>
                   <span>Total</span>
                   <span style={{ color: 'var(--lime)' }}>GHS {total.toFixed(2)}</span>
                </div>
             </div>
             
             <button onClick={handlePlaceOrder} className="btn-primary" style={{ width: '100%', padding: '24px', borderRadius: '16px', fontSize: '1.2rem' }}>
                CONFIRM & PAY →
             </button>
             
             <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.8rem', opacity: 0.4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Icon name="shield" size={14} /> Secured by Paystack Checkout
             </p>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
           .checkout-container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
