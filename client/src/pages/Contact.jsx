import { useState } from 'react';
import { Icon } from '../components/Icon';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Message sent successfully!");
      setIsSubmitting(false);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="about-page" style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <section className="page-header" style={{ background: 'var(--black)', color: 'white', padding: '160px 24px 100px', textAlign: 'center' }}>
        <div className="container">
          <div data-fade style={{ color: 'var(--lime)', marginBottom: '32px' }}>
            <Icon name="mail" size={64} style={{ opacity: 0.8 }} />
          </div>
          <span className="section-label" style={{ color: 'var(--lime)', border: '1px solid var(--lime)' }}>Connect</span>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', letterSpacing: '4px' }}>GET IN TOUCH</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px', maxWidth: '700px', margin: '24px auto 0' }}>Our support team is available 24/7. Have a question about our blenders or an order? We're here to help.</p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 24px' }}>
        <div className="shop-layout">
          {/* LEFT: FORM */}
          <div style={{ flex: 1.5 }}>
            <div className="glass" style={{ padding: '48px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-200)', background: 'var(--white)' }}>
               <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', marginBottom: '32px' }}>SEND A MESSAGE</h3>
               <form onSubmit={handleSubmit}>
                  <div className="form-group" style={{ marginBottom: '24px' }}>
                     <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-muted)' }}>YOUR NAME</label>
                     <input 
                      type="text" 
                      required 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      placeholder="Full Name" 
                      style={{ width: '100%', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', outline: 'none' }} 
                     />
                  </div>
                  <div className="form-group" style={{ marginBottom: '24px' }}>
                     <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-muted)' }}>EMAIL ADDRESS</label>
                     <input 
                      type="email" 
                      required 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      placeholder="name@email.com" 
                      style={{ width: '100%', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', outline: 'none' }} 
                     />
                  </div>
                  <div className="form-group" style={{ marginBottom: '32px' }}>
                     <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-muted)' }}>MESSAGE</label>
                     <textarea 
                      required 
                      rows="6"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      placeholder="How can we help you today?" 
                      style={{ width: '100%', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', outline: 'none', resize: 'none' }} 
                     ></textarea>
                  </div>
                  <button 
                   type="submit" 
                   disabled={isSubmitting}
                   className="btn-primary" 
                   style={{ width: '100%', justifyContent: 'center', padding: '18px', opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE →'}
                  </button>
               </form>
            </div>
          </div>

          {/* RIGHT: INFO */}
          <aside style={{ flex: 1, paddingLeft: '40px' }}>
             <div className="card-luxury" style={{ padding: '48px', border: '1px solid var(--gray-200)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '24px', letterSpacing: '1px' }}>QUICK CONTACT</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                   <div>
                      <div style={{ color: 'var(--lime)', marginBottom: '12px' }}>
                        <Icon name="pin" size={24} />
                      </div>
                      <strong>Headquarters</strong>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Blendify Innovations HQ, Accra Tech Park, Ghana</p>
                   </div>
                   <div>
                      <div style={{ color: 'var(--lime)', marginBottom: '12px' }}>
                        <Icon name="phone" size={24} />
                      </div>
                      <strong>Direct Support</strong>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>+233 000 000 000</p>
                   </div>
                   <div>
                      <div style={{ color: 'var(--lime)', marginBottom: '12px' }}>
                        <Icon name="mail" size={24} />
                      </div>
                      <strong>Email Alias</strong>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>support@blendify.com</p>
                   </div>
                    <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '32px' }}>
                       <strong>Social Channels</strong>
                       <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                          <a href="#" style={{ color: 'var(--lime)' }}><Icon name="instagram" size={24} /></a>
                          <a href="#" style={{ color: 'var(--lime)' }}><Icon name="twitter" size={24} /></a>
                          <a href="#" style={{ color: 'var(--lime)' }}><Icon name="facebook" size={24} /></a>
                       </div>
                    </div>
                </div>
             </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
