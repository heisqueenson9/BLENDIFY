import { useState, useMemo } from 'react';
import { Icon } from '../components/Icon';

const FAQ_DATA = [
  { 
    id: 1, 
    category: 'Orders', 
    icon: 'shipping',
    q: "How can I track my order?", 
    a: "Once your order is shipped, you will receive an email with a tracking number and a link to trace your delivery in real-time." 
  },
  { 
    id: 2, 
    category: 'Orders', 
    icon: 'shipping',
    q: "Do you ship internationally?", 
    a: "Yes! We ship to over 50 countries. International shipping times vary between 7–14 business days depending on location." 
  },
  { 
    id: 3, 
    category: 'Payments', 
    icon: 'credit',
    q: "What payment methods do you accept?", 
    a: "We accept all major credit cards (Visa, Mastercard, AMEX), Apple Pay, Google Pay, and localized bank transfers." 
  },
  { 
    id: 4, 
    category: 'Payments', 
    icon: 'lock',
    q: "Is my payment secure?", 
    a: "Absolutely. We use 256-bit SSL encryption and PCI-compliant payment gateways to ensure your data is 100% secure." 
  },
  { 
    id: 5, 
    category: 'Product & Warranty', 
    icon: 'quality',
    q: "Is the blender BPA-free?", 
    a: "Yes, all Blendify products are made with 100% BPA-free, food-grade materials for your safety and health." 
  },
  { 
    id: 6, 
    category: 'Product & Warranty', 
    icon: 'shield',
    q: "What is the warranty period?", 
    a: "We offer a 1-year limited warranty on the motor and electrical components for all our blender models." 
  }
];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState(null);

  const filteredFaq = useMemo(() => {
    return FAQ_DATA.filter(item => 
      item.q.toLowerCase().includes(search.toLowerCase()) || 
      item.a.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="faq-page" style={{ background: 'var(--white)', minHeight: '100vh' }}>
      {/* FAQ HERO */}
      <section className="page-header" style={{ background: 'var(--black)', color: 'white', padding: '160px 24px 100px', textAlign: 'center' }}>
        <div className="container">
          <div data-fade style={{ color: 'var(--lime)', marginBottom: '32px' }}>
            <Icon name="support" size={64} style={{ opacity: 0.8 }} />
          </div>
          <span className="section-label" style={{ color: 'var(--lime)', border: '1px solid var(--lime)' }}>Help Center</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'var(--font-display)', letterSpacing: '4px' }}>QUESTIONS & ANSWERS</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px', maxWidth: '600px', margin: '24px auto 32px' }}>
            Everything you need to know about our products, shipping, and security. Can't find an answer? Our AI agent is ready to help below.
          </p>
          
          <div data-fade className="search-container" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
             <input 
              type="text" 
              placeholder="Search for a question..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '20px 32px', 
                borderRadius: 'var(--radius-full)', 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: 'white',
                fontSize: '1.1rem',
                outline: 'none',
                transition: 'var(--transition)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--lime)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
             />
             <div style={{ position: 'absolute', right: '28px', top: '50%', transform: 'translateY(-50%)', color: 'var(--lime)', opacity: 0.5 }}>
               <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="container" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item, i) => (
              <div 
                key={item.id} 
                className="faq-item glass" 
                style={{ 
                  marginBottom: '16px', 
                  borderRadius: 'var(--radius-lg)', 
                  overflow: 'hidden', 
                  border: '1px solid var(--gray-100)',
                  transition: 'var(--transition)'
                }}
              >
                <button 
                  onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                  style={{ 
                    width: '100%', 
                    padding: '28px 32px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ color: 'var(--lime)', background: 'var(--black)', padding: '10px', borderRadius: '10px' }}>
                      <Icon name={item.icon} size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1px' }}>{item.category}</span>
                      <h4 style={{ margin: '4px 0 0', fontSize: '1.1rem', color: 'var(--black)' }}>{item.q}</h4>
                    </div>
                  </div>
                  <span style={{ transform: activeId === item.id ? 'rotate(45deg)' : 'none', transition: 'var(--transition)', fontSize: '1.5rem', color: 'var(--gray-400)' }}>+</span>
                </button>
                
                <div style={{ 
                  maxHeight: activeId === item.id ? '200px' : '0', 
                  transition: 'var(--transition)', 
                  overflow: 'hidden',
                  background: 'var(--gray-50)',
                  borderTop: activeId === item.id ? '1px solid var(--gray-100)' : 'none'
                }}>
                  <p style={{ padding: '32px', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
               <div style={{ fontSize: '3rem', marginBottom: '20px', opacity: 0.3 }}>
                 <Icon name="warning" size={64} />
               </div>
               <h3>No results found for "{search}"</h3>
               <button onClick={() => setSearch('')} style={{ color: 'var(--lime)', fontWeight: '700', textLink: 'none', background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px' }}>View all questions</button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER CALL */}
      <section style={{ padding: '80px 24px', textAlign: 'center', borderTop: '1px solid var(--gray-100)' }}>
         <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>STILL NEED HELP?</h3>
         <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Our human support team is available Mon-Fri, 9am - 5pm EST.</p>
         <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:support@blendify.com" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Icon name="mail" size={18} /> Email Support
            </a>
            <a href="/contact" className="btn-ghost" style={{ border: '2px solid var(--black)', color: 'var(--black)', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Icon name="phone" size={18} /> Schedule a Call
            </a>
         </div>
      </section>
    </div>
  );
}
