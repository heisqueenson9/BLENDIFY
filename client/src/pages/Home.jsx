import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import RecommendationSection from '../components/RecommendationSection';
import { showToast } from '../components/Toast';

function Home() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast("Subscribed successfully.", "success");
    setEmail('');
  };

  return (
    <div className="home-page" style={{ background: 'var(--black)', color: '#fff' }}>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="hero" style={{ 
        position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(10,10,10,1) 100%)'
      }}>
        <div className="hero-content" style={{ maxWidth: '1000px', width: '100%', padding: '0 20px' }}>
          <span 
            className="hero-eyebrow" 
            data-fade="up"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(197, 231, 16, 0.1)', color: 'var(--lime)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '32px' }}
          >
            <Icon name="leaf" size={16} />
            Next-Gen Portable Blenders
          </span>
          <h1 
            data-fade="left" 
            className="delay-100"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', lineHeight: '0.9', marginBottom: '24px', fontFamily: 'var(--font-display)', letterSpacing: '-2px' }}
          >
            BLEND THE <span style={{ color: 'var(--lime)', fontStyle: 'italic' }}>FUTURE</span><br />OF NUTRITION
          </h1>
          <p 
            data-fade="right"
            className="delay-200"
            style={{ fontSize: '1.25rem', margin: '0 auto 48px', color: 'rgba(255,255,255,0.6)', maxWidth: '650px', lineHeight: '1.6' }}
          >
            Your health shouldn't be stationary. Experience the world's most powerful portable blender with 20,000 RPM precision.
          </p>
          <div data-fade="up" className="hero-ctas delay-300" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link to="/shop" className="btn-primary" style={{ padding: '20px 48px', fontSize: '1.1rem', borderRadius: '16px' }}>
               Explore Shop <Icon name="rocket" size={20} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DYNAMIC RECOMMENDATIONS ───────────────────────────── */}
      <section className="container" style={{ padding: '60px 20px' }} data-fade="zoom">
         <RecommendationSection title="Tailored For You" />
      </section>

      {/* ── TRUST SECTION ───────────────────────────────────── */}
      <section className="container" style={{ padding: '80px 20px 140px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-label" data-fade="up">World Class Engineering</span>
          <h2 className="section-title" data-fade="up" style={{ transitionDelay: '0.2s', fontSize: '3.5rem' }}>BUILT TO LAST</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
           {[
             { icon: 'rocket', title: "20k RPM Motor", desc: "Industrial-grade power in the palm of your hand." },
             { icon: 'quality', title: "Diamond Blades", desc: "6-point stainless steel for zero-clump results." },
             { icon: 'shield', title: "Smart Safety", desc: "Magnetic sensing prevents accidental starts." }
           ].map((item, i) => (
             <div 
               key={i}
               data-fade="up"
               className={`card-luxury hover-lift delay-${(i + 1) * 200}`}
               style={{ padding: '40px', borderRadius: '32px' }}
             >
                <div style={{ color: 'var(--lime)', marginBottom: '24px' }}>
                   <Icon name={item.icon} size={36} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', background: 'var(--lime)', textAlign: 'center' }}>
        <div className="container">
          <h2 data-fade="up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--black)', letterSpacing: '2px' }}>NEVER MISS A DROP</h2>
          <p data-fade="up" className="delay-100" style={{ color: 'rgba(1,10,0,0.7)', margin: '16px auto 32px', maxWidth: '500px' }}>Join our community for exclusive early access to new collections and healthy recipes.</p>
          <form onSubmit={handleSubscribe} data-fade="up" className="delay-200" style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '12px' }}>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              style={{ flex: 1, padding: '16px 24px', borderRadius: 'var(--radius-md)', border: 'none', background: '#fff' }} 
            />
            <button type="submit" className="btn-primary" style={{ background: 'var(--black)', color: 'white' }}>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
