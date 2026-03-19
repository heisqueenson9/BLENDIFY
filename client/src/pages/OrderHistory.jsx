import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Icon } from '../components/Icon';

const OrderHistory = () => {
  const { orders } = useCart();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'var(--lime)';
      case 'Cancelled': return '#ff4757';
      case 'On the Way': return '#00d2ff';
      default: return 'rgba(255,255,255,0.5)';
    }
  };

  return (
    <div className="orders-page" style={{ padding: '120px 24px', minHeight: '100vh', background: 'var(--black)' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', marginBottom: '40px', letterSpacing: '2px' }}>Your <span style={{ color: 'var(--lime)' }}>Orders</span></h1>
        
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', background: 'rgba(255,255,255,0.02)', borderRadius: '32px' }}>
            <div style={{ color: 'var(--lime)', marginBottom: '24px' }}>
               <Icon name="package" size={80} />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '32px' }}>You haven't placed any orders yet.</p>
            <Link to="/shop" className="btn-primary" style={{ padding: '18px 48px', fontSize: '1.1rem' }}>Start Shopping →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {orders.map(order => (
              <div key={order.id} className="card-luxury" style={{ padding: '32px', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginTop: '8px', letterSpacing: '1px' }}>{order.id}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Location: <span style={{ color: '#fff' }}>{order.location}</span></p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      background: `${getStatusColor(order.status)}15`, 
                      color: getStatusColor(order.status),
                      padding: '12px 24px', borderRadius: '14px', border: `1px solid ${getStatusColor(order.status)}30`, 
                      fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px'
                    }}>{order.status}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '12px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ 
                      width: '70px', height: '70px', background: 'rgba(255,255,255,0.03)', 
                      borderRadius: '16px', overflow: 'hidden', padding: '12px', flexShrink: 0,
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} title={item.name} />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', paddingTop: '32px', borderTop: '2px solid rgba(255,255,255,0.03)' }}>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 700 }}>Total Paid</span>
                    <p style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--lime)', letterSpacing: '-0.5px' }}>GHS {order.total?.toFixed(2)}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Link to={`/track/${order.id}`} className="btn-primary" style={{ padding: '14px 28px', fontSize: '0.9rem' }}>
                      {order.status === 'Delivered' ? 'View Details' : 'Track Order Live'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
