import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Icon } from '../components/Icon';

const Tracking = () => {
  const { id } = useParams();
  const { orders, getOrderStatus, cancelOrder, riderMessages, sendRiderMessage, addReview } = useCart();
  const { refundFunds, user } = useAuth();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [jitter, setJitter] = useState({ lat: 0, lng: 0 });
  const [showChat, setShowChat] = useState(false);
  const [chatText, setChatText] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [ratings, setRatings] = useState({ product: 5, rider: 5, comment: '' });
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    const foundOrder = orders.find(o => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [id, orders]);

  useEffect(() => {
    if (order && order.status !== 'Cancelled') {
      const timer = setInterval(() => {
        const nextStatus = getOrderStatus(order.id);
        setStatus(nextStatus);
        
        if (nextStatus === 'On the Way') {
          setJitter({ 
            lat: (Math.random() - 0.5) * 0.001, 
            lng: (Math.random() - 0.5) * 0.001 
          });
        }
      }, 5000);
      setStatus(getOrderStatus(order.id));
      return () => clearInterval(timer);
    }
  }, [order, getOrderStatus]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [riderMessages, showChat]);

  if (!order) return <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h2 style={{ color: 'var(--text-muted)' }}>Order Not Found</h2>
  </div>;

  const steps = [
    { label: 'Order Received', icon: 'zap' },
    { label: 'Preparing', icon: 'loader' },
    { label: 'Rider Assigned', icon: 'user' },
    { label: 'Picked Up', icon: 'package' },
    { label: 'On the Way', icon: 'truck' },
    { label: 'Delivered', icon: 'shield' }
  ];

  const currentStepIndex = steps.findIndex(step => step.label === (order.status === 'Cancelled' ? 'Cancelled' : status));
  const isDelivered = status === 'Delivered';
  const isCancelled = order.status === 'Cancelled';
  const messages = riderMessages[order.id] || [];

  const handleCancelClick = () => {
    if (window.confirm("Are you sure you want to cancel? Refund will be sent to your wallet.")) {
      cancelOrder(order.id, order.total, refundFunds);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    sendRiderMessage(order.id, chatText);
    setChatText('');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview({ orderId: order.id, ...ratings });
    setShowReview(false);
  };

  const ArchiveIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--lime)' }}>
      <polyline points="21 8 21 21 3 21 3 8"></polyline>
      <rect x="1" y="3" width="22" height="5"></rect>
      <line x1="10" y1="12" x2="14" y2="12"></line>
    </svg>
  );

  return (
    <div className="track-page" style={{ padding: '120px 24px', minHeight: '100vh', background: 'var(--black)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
          <div data-fade="right">
            <Link to="/orders" style={{ color: 'var(--lime)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>← My Orders</Link>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', marginTop: '12px', letterSpacing: '2px' }}>Track <span style={{ color: 'var(--lime)' }}>Live</span></h1>
            <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>ID: {order.id} • {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</p>
          </div>
          
          <div data-fade="left" style={{ textAlign: 'right' }}>
            {isCancelled ? (
               <div style={{ background: 'rgba(255, 71, 87, 0.1)', color: '#ff4757', padding: '16px 32px', borderRadius: '16px', border: '1px solid rgba(255, 71, 87, 0.2)', fontWeight: 800, fontSize: '1.1rem' }}>CANCELLED</div>
            ) : isDelivered ? (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                 <div style={{ background: 'var(--lime)', color: 'var(--black)', padding: '16px 32px', borderRadius: '16px', fontWeight: 900, fontSize: '1.1rem', boxShadow: '0 0 30px rgba(197, 231, 16, 0.3)' }}>DELIVERED SUCCESSFUL</div>
                 <button onClick={() => setShowInvoice(true)} className="btn-ghost" style={{ padding: '10px 20px', fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.1)' }}>View Invoice</button>
               </div>
            ) : (
               <div style={{ background: 'rgba(197, 231, 16, 0.1)', color: 'var(--lime)', padding: '16px 32px', borderRadius: '16px', border: '1px solid rgba(197, 231, 16, 0.2)', fontWeight: 800, fontSize: '1.1rem' }}>{status.toUpperCase()}</div>
            )}
            {!isCancelled && !isDelivered && status === 'Order Received' && (
              <button onClick={handleCancelClick} style={{ marginTop: '16px', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'underline', border: 'none', cursor: 'pointer' }}>Cancel Order?</button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div data-fade="up" className="delay-100 card-luxury" style={{ padding: '48px', borderRadius: '32px', marginBottom: '40px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', minWidth: '800px' }}>
               <div style={{ position: 'absolute', top: '28px', left: '0', right: '0', height: '4px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }}></div>
               <div style={{ position: 'absolute', top: '28px', left: '40px', width: `${Math.max(0, currentStepIndex) * (100 / (steps.length - 1)) - 8}%`, height: '4px', background: 'var(--lime)', zIndex: 1, transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
               
               {steps.map((step, idx) => {
                  const isActive = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex && !isCancelled;
                  return (
                    <div key={idx} style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                       <div style={{ 
                         width: '60px', height: '60px', background: isActive ? 'var(--lime)' : '#151515', 
                         color: isActive ? 'var(--black)' : 'rgba(255,255,255,0.2)', borderRadius: '20px',
                         display: 'flex', alignItems: 'center', justifyContent: 'center', 
                         boxShadow: isCurrent ? '0 0 40px rgba(197, 231, 16, 0.5)' : 'none',
                         transition: 'all 0.6s ease', transform: isCurrent ? 'scale(1.15)' : 'scale(1)',
                         border: isActive ? 'none' : '1px solid rgba(255,255,255,0.05)'
                       }}>
                         <Icon name={step.icon} size={24} />
                       </div>
                       <span style={{ fontSize: '0.8rem', marginTop: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: isActive ? 1 : 0.3, color: isActive ? 'var(--lime)' : '#fff' }}>{step.label}</span>
                    </div>
                  )
               })}
            </div>
        </div>

        {/* Grid: Map + Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
           
           {/* Left Column: Rider & Stats */}
           <div data-fade="right" className="delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="card-luxury" style={{ padding: '40px', borderRadius: '32px' }}>
                <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', marginBottom: '32px', fontWeight: 800 }}>Rider Information</h4>
                {currentStepIndex >= 2 && !isCancelled && order.rider ? (
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '24px', overflow: 'hidden', border: '3px solid var(--lime)', boxShadow: '0 0 20px rgba(197, 231, 16, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)' }}>
                       <Icon name={order.rider.icon} size={80} />
                    </div>
                    <div style={{ flex: 1 }}>
                       <h5 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '4px' }}>{order.rider.name}</h5>
                       <p style={{ color: 'var(--lime)', fontWeight: 700, fontSize: '0.9rem' }}>{order.rider.vehicle} • <span style={{ opacity: 0.7 }}>{order.rider.plate}</span></p>
                       <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '4px' }}>⭐ {order.rider.rating} Average Rating</p>
                       <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                          <a href={`tel:${order.rider.phone}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', background: 'var(--lime)', color: 'var(--black)', borderRadius: '14px', fontWeight: 800, fontSize: '0.9rem' }}>
                             📞 Call
                          </a>
                          <button onClick={() => setShowChat(true)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', background: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '14px', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                             💬 Chat
                          </button>
                       </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '40px', textAlign: 'center', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '24px', background: 'rgba(255,255,255,0.01)' }}>
                     <p style={{ opacity: 0.5, fontWeight: 600 }}>Matching you with a professional rider...</p>
                  </div>
                )}
                
                <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '4px' }}>Destination</label>
                      <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{order.location}</p>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div style={{ padding: '24px', background: isDelivered ? 'rgba(197, 231, 16, 0.1)' : 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                         <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '4px' }}>Estimated Time</label>
                         <p style={{ fontWeight: 800, color: isDelivered ? 'var(--lime)' : '#fff' }}>{isDelivered ? 'COMPLETED' : order.eta}</p>
                      </div>
                      <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                         <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '4px' }}>Price</label>
                         <p style={{ fontWeight: 800 }}>GHS {order.total?.toFixed(2)}</p>
                      </div>
                   </div>
                </div>
              </div>

              {isDelivered && (
                <div className="card-luxury" style={{ padding: '32px', border: '2px solid var(--lime)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                      <div style={{ fontSize: '2rem' }}>🎉</div>
                      <h4 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Arrival Confirmed</h4>
                   </div>
                   <p style={{ opacity: 0.6, fontSize: '0.95rem', marginBottom: '24px' }}>Your parcel has been delivered to your doorstep. Please take a moment to rate your experience.</p>
                   <button onClick={() => setShowReview(true)} className="btn-primary" style={{ width: '100%', padding: '16px' }}>Rate & Support →</button>
                </div>
              )}
           </div>

           {/* Right Column: Live Map */}
           <div data-fade="left" className="delay-300 card-luxury" style={{ padding: '12px', borderRadius: '32px', height: '600px', position: 'relative', overflow: 'hidden' }}>
              <div className="map-container" style={{ width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden' }}>
                 <iframe 
                    title="Live Tracking Map"
                    src={`https://maps.google.com/maps?q=${order.coordinates.lat + (status === 'On the Way' ? jitter.lat : 0)},${order.coordinates.lng + (status === 'On the Way' ? jitter.lng : 0)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                    style={{ width: '100%', height: '100%', border: 'none', filter: 'invert(90%) hue-rotate(180deg) brightness(95%)' }}
                 ></iframe>
                 <div style={{ position: 'absolute', top: '30px', left: '30px', background: 'rgba(0,0,0,0.8)', padding: '12px 24px', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid var(--lime)', zIndex: 5, pointerEvents: 'none' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <div style={{ width: '10px', height: '10px', background: 'var(--lime)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                       <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--lime)', letterSpacing: '1px' }}>LIVE LOCATION ACTIVE</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 💬 Chat Overlay */}
        {showChat && (
          <div style={{ position: 'fixed', right: '40px', bottom: '40px', width: '380px', height: '520px', background: '#0a0a0a', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
             <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)' }}>
                      <Icon name={order.rider?.icon} size={32} />
                   </div>
                   <div>
                      <h5 style={{ fontWeight: 800, fontSize: '1rem' }}>{order.rider?.name}</h5>
                      <span style={{ fontSize: '0.7rem', color: 'var(--lime)', fontWeight: 700 }}>Rider Assigned</span>
                   </div>
                </div>
                <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#fff', opacity: 0.5, cursor: 'pointer' }}>✕</button>
             </div>
             
             <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                     <div style={{ 
                        padding: '12px 18px', 
                        borderRadius: m.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                        background: m.sender === 'user' ? 'var(--lime)' : 'rgba(255,255,255,0.05)',
                        color: m.sender === 'user' ? 'var(--black)' : '#fff',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                     }}>
                        {m.text}
                     </div>
                     <span style={{ fontSize: '0.65rem', opacity: 0.4, marginTop: '4px', display: 'block', textAlign: m.sender === 'user' ? 'right' : 'left' }}>{m.time}</span>
                  </div>
                ))}
                <div ref={chatEndRef}></div>
             </div>

             <form onSubmit={handleSendMessage} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '12px' }}>
                <input 
                   disabled={isDelivered || isCancelled}
                   value={chatText} 
                   onChange={(e) => setChatText(e.target.value)} 
                   placeholder="Type a message..." 
                   style={{ flex: 1, padding: '14px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff' }} 
                />
                <button type="submit" style={{ padding: '14px', background: 'var(--lime)', color: 'var(--black)', borderRadius: '16px', fontWeight: 900 }}>➔</button>
             </form>
          </div>
        )}

        {/* 🧾 Invoice Modal (Receipt) */}
        {showInvoice && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)', zIndex: 2001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
             <div className="card-luxury" style={{ maxWidth: '550px', width: '100%', background: '#fff', color: '#000', borderRadius: '32px', padding: '50px', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                   <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                      <ArchiveIcon />
                   </div>
                   <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', letterSpacing: '2px', color: '#000' }}>BLENDIFY <span style={{ color: '#8fb000' }}>RECEIPT</span></h2>
                   <p style={{ opacity: 0.5 }}>Order Reference: {order.id}</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '32px', fontSize: '0.9rem' }}>
                   <div>
                      <h6 style={{ textTransform: 'uppercase', fontSize: '0.7rem', opacity: 0.4, marginBottom: '6px' }}>Billed To</h6>
                      <p style={{ fontWeight: 800 }}>{user?.fullName}</p>
                      <p style={{ opacity: 0.6 }}>{user?.email}</p>
                      <p style={{ opacity: 0.6 }}>{order.location}</p>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <h6 style={{ textTransform: 'uppercase', fontSize: '0.7rem', opacity: 0.4, marginBottom: '6px' }}>Date & Time</h6>
                      <p style={{ fontWeight: 800 }}>{new Date(order.date).toLocaleDateString()}</p>
                      <p style={{ opacity: 0.6 }}>{new Date(order.date).toLocaleTimeString()}</p>
                   </div>
                </div>

                <div style={{ borderTop: '2px dashed #eee', borderBottom: '2px dashed #eee', padding: '24px 0', marginBottom: '24px' }}>
                   {order.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' }}>
                         <span style={{ flex: 1 }}>{item.name} <strong style={{ opacity: 0.4 }}>x{item.quantity}</strong></span>
                         <span style={{ fontWeight: 700 }}>GHS {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                   ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.9rem' }}>
                      <span>Subtotal</span>
                      <span>GHS {order.subtotal?.toFixed(2)}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.9rem' }}>
                      <span>Delivery Fee</span>
                      <span>GHS {order.deliveryFee?.toFixed(2)}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.6rem', fontWeight: 900, marginTop: '12px', color: '#8fb000', borderTop: '1px solid #eee', paddingTop: '16px' }}>
                      <span style={{ color: '#000' }}>TOTAL</span>
                      <span>GHS {order.total?.toFixed(2)}</span>
                   </div>
                </div>

                <div style={{ marginTop: '40px', display: 'flex', gap: '12px' }}>
                   <button onClick={() => window.print()} className="btn-primary" style={{ flex: 1, background: '#000', color: '#fff' }}>Print Receipt</button>
                   <button onClick={() => setShowInvoice(false)} style={{ flex: 1, padding: '16px', borderRadius: '12px', background: '#f5f5f5', border: 'none', color: '#000', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                </div>
             </div>
          </div>
        )}

        {/* ⭐ Review Modal */}
        {showReview && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2002, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
             <div className="card-luxury" style={{ maxWidth: '450px', width: '100%', padding: '48px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '12px' }}>Rate Your <span style={{ color: 'var(--lime)' }}>Experience</span></h2>
                <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                   <div>
                      <label style={{ display: 'block', marginBottom: '12px', fontWeight: 700 }}>Blender Quality</label>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '1.5rem' }}>
                         {[1,2,3,4,5].map(s => <span key={s} onClick={() => setRatings({...ratings, product: s})} style={{ cursor: 'pointer', color: s <= ratings.product ? 'var(--lime)' : 'rgba(255,255,255,0.1)' }}>★</span>)}
                      </div>
                   </div>
                   <div>
                      <label style={{ display: 'block', marginBottom: '12px', fontWeight: 700 }}>Rider Performance</label>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '1.5rem' }}>
                         {[1,2,3,4,5].map(s => <span key={s} onClick={() => setRatings({...ratings, rider: s})} style={{ cursor: 'pointer', color: s <= ratings.rider ? 'var(--lime)' : 'rgba(255,255,255,0.1)' }}>★</span>)}
                      </div>
                   </div>
                   <textarea placeholder="Feedback?" value={ratings.comment} onChange={(e) => setRatings({...ratings, comment: e.target.value})} style={{ width: '100%', padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', minHeight: '100px' }} />
                   <button type="submit" className="btn-primary" style={{ padding: '18px', borderRadius: '16px' }}>Submit Review →</button>
                   <button type="button" onClick={() => setShowReview(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>Skip</button>
                </form>
             </div>
          </div>
        )}

      </div>
      
      <style>{`
        @keyframes pulse {
           0% { transform: scale(1); opacity: 0.5; }
           50% { transform: scale(1.5); opacity: 1; }
           100% { transform: scale(1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Tracking;
