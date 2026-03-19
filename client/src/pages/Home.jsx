import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

function Home() {
  return (
    <div className="home-page">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="hero" style={{ 
        background: 'var(--black)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="hero-content" style={{ maxWidth: '900px', width: '100%' }}>
          <span className="hero-eyebrow" data-fade style={{ transitionDelay: '0.1s' }}>
            <Icon name="leaf" color="var(--lime)" size={18} style={{ marginRight: '8px' }} />
            New Collection 2025
          </span>
          <h1 
            data-fade 
            style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', lineHeight: '0.9', marginBottom: '24px', transitionDelay: '0.3s' }}
          >
            BLEND YOUR <span className="accent">HEALTH</span><br />ON THE GO
          </h1>
          <p 
            data-fade
            className="hero-desc" 
            style={{ fontSize: '1.25rem', margin: '0 auto 40px', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', transitionDelay: '0.5s' }}
          >
            Experience the power of portability. Fresh, nutritious smoothies anywhere, anytime. Perfect for gym, travel, or work.
          </p>
          <div data-fade className="hero-ctas" style={{ justifyContent: 'center', transitionDelay: '0.7s' }}>
            <Link to="/shop" className="btn-primary" style={{ padding: '20px 50px', fontSize: '1.1rem' }}>
              Get Started →
            </Link>
            <a 
              href="https://www.youtube.com/results?search_query=portable+blender+demonstration" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-ghost" 
              style={{ padding: '20px 50px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Watch Demo 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section className="features-strip">
        {[
          { icon: 'shipping', title: 'Fast Shipping', desc: 'Free on orders over 200L' },
          { icon: 'quality', title: 'Premium Quality', desc: 'BPA-Free materials' },
          { icon: 'support', title: '24/7 Support', desc: 'Ready to help anytime' },
          { icon: 'returns', title: '30-Day Returns', desc: 'Hassle-free process' }
        ].map((f, i) => (
          <div 
            key={i} 
            data-fade
            style={{ transitionDelay: `${i * 0.1}s` }}
            className="feat-card"
          >
            <div className="feat-icon" style={{ background: 'rgba(197, 231, 16, 0.1)', color: 'var(--lime)', padding: '12px', borderRadius: '12px' }}>
              <Icon name={f.icon} size={28} />
            </div>
            <div><h4>{f.title}</h4><p>{f.desc}</p></div>
          </div>
        ))}
      </section>

      {/* ── TRUST SECTION ───────────────────────────────────── */}
      <section className="container" style={{ padding: '120px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-label" data-fade>World Class Standards</span>
          <h2 className="section-title" data-fade style={{ transitionDelay: '0.2s' }}>ENGINEERED FOR EXCELLENCE</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
           {[
             { icon: 'rocket', title: "20k RPM Motor", desc: "Industrial-grade power in the palm of your hand." },
             { icon: 'quality', title: "Diamond Blades", desc: "6-point stainless steel for zero-clump results." },
             { icon: 'shield', title: "Smart Safety", desc: "Magnetic sensing prevents accidental starts." }
           ].map((item, i) => (
             <div 
               key={i}
               data-fade
               style={{ transitionDelay: `${i * 0.2}s` }}
               className="card-luxury hover-lift"
             >
                <div style={{ color: 'var(--lime)', marginBottom: '20px' }}>
                   <Icon name={item.icon} size={32} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '16px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
