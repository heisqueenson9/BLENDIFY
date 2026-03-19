import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

export default function About() {
  return (
    <div className="about-page" style={{ background: 'var(--white)' }}>
      {/* ── HIGH-END HERO (TEXT ONLY) ────────────────────────── */}
      <section className="hero" style={{ 
        minHeight: '60vh', 
        background: 'var(--black)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
        padding: '120px 24px'
      }}>
        <div className="hero-content" data-fade style={{ maxWidth: '900px' }}>
          <div style={{ color: 'var(--lime)', marginBottom: '32px' }}>
            <Icon name="shield" size={64} style={{ opacity: 0.8 }} />
          </div>
          <span className="hero-eyebrow" style={{ color: 'var(--lime)', border: '1px solid var(--lime)' }}>Our Values</span>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: 'white', letterSpacing: '8px' }}>
            TRANSPARENCY <br/>
            <span className="accent" style={{ color: 'var(--lime)' }}>& TRUST</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '24px auto 0', lineHeight: '1.8' }}>
            Blendify is more than a product—it's a commitment to your health and safety. We've built an infrastructure of security and quality in every blend.
          </p>
        </div>
      </section>

      {/* ── OUR STORY & VISION ────────────────────────────────── */}
      <section className="container" style={{ padding: '120px 24px' }} data-fade>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="section-label">THE GENESIS</span>
          <h2 className="section-title">A NEW STANDARD IN PORTABLE NUTRITION</h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '2', marginBottom: '32px' }}>
            Founded in 2022, Blendify was created to solve a universal struggle: eating healthy on a busy schedule. We realized that traditional "portable" blenders were either too weak to crush ice or too leaky to trust in a gym bag. 
          </p>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '2' }}>
            Our vision is to build a world where healthy decisions are the easiest decisions. We do this by engineering high-torque, medical-grade devices that go exactly where you go, with zero compromises on performance or safety.
          </p>
        </div>
      </section>

      {/* ── E-COMMERCE SECURITY & INFRASTRUCTURE ───────────────── */}
      <section style={{ padding: '120px 24px', background: 'var(--gray-50)' }} data-fade>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="section-label">UNCOMPROMISING</span>
            <h2 className="section-title">DIGITAL SECURITY & PRIVACY</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
            {/* Payment Security */}
            <div style={{ padding: '48px', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ color: 'var(--lime)', marginBottom: '16px' }}>
                <Icon name="lock" size={40} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>BANK-LEVEL SECURITY</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                All transactions are processed via Tier-1, PCI-DSS compliant payment gateways. We use 256-bit SSL encryption to ensure your credit card data remains invisible to everyone—including us.
              </p>
            </div>
            
            {/* Data Protection */}
            <div style={{ padding: '48px', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ color: 'var(--lime)', marginBottom: '16px' }}>
                <Icon name="shield" size={40} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>PRIVACY FIRST</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                Your data is your property. We never sell or rent your personal information to third parties. Our internal systems are audited twice a year for GDPR and CCPA compliance.
              </p>
            </div>

            {/* Support */}
            <div style={{ padding: '48px', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ color: 'var(--lime)', marginBottom: '16px' }}>
                <Icon name="support" size={40} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>24/7 ACCOUNT PROTECTION</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                Our dedicated security team monitors for suspicious activity. If we detect an unusual login from a new device, we lock your account and verify your identity instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGISTICS & QUALITY ────────────────────────────────── */}
      <section className="container" style={{ padding: '120px 24px' }} data-fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <div>
             <span className="section-label">Worldwide Fulfillment</span>
             <h2 className="section-title">GLOBAL LOGISTICS, <br/> LOCAL SERVICE</h2>
             <p style={{ color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '24px' }}>
                We operate from three strategic fulfillment centers across the globe to ensure that 95% of our orders reach customers in under 5 business days.
             </p>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)', lineHeight: '2.5' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon name="check" size={18} color="var(--lime)" /> <strong>Full Order Transparency:</strong> Real-time tracking from warehouse to doorstep.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon name="check" size={18} color="var(--lime)" /> <strong>Eco-Friendly Packaging:</strong> 100% recyclable, plastic-free shipping materials.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon name="check" size={18} color="var(--lime)" /> <strong>Quality Controlled:</strong> Every unit is individualy tested before boxing.
                </li>
             </ul>
          </div>
          <div style={{ padding: '60px', background: 'var(--black)', color: 'white', borderRadius: 'var(--radius-xl)' }}>
             <h4 style={{ color: 'var(--lime)', marginBottom: '16px', letterSpacing: '1px' }}>CERTIFIED STANDARDS</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div>
                   <h5 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>BPA-FREE MATERIALS</h5>
                   <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>We use food-grade 304 stainless steel and non-toxic Tritan polymers.</p>
                </div>
                <div>
                   <h5 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>SAFETY SENSOR TECHNOLOGY</h5>
                   <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>The motor only activates when the jar is properly locked into the base.</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                   <p style={{ fontSize: '0.85rem' }}>Proudly meeting FDA, CE, and RoHS international certifications.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── FINAL DOCUMENTATION SECTION ───────────────────────── */}
      <section style={{ padding: '120px 24px', background: 'var(--black)', color: 'white' }} data-fade>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '20px' }}>OUR PROMISE TO YOU</h2>
            <div style={{ height: '2px', width: '80px', background: 'var(--lime)', margin: '0 auto' }}></div>
          </div>
          
          <div style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '24px' }}>
               We don't just sell blenders; we sell a lifestyle of vitality. We stand behind our engineering with a 12-month limited warranty and a 30-day "No Flavor Left Behind" money-back guarantee.
            </p>
            <p style={{ marginBottom: '40px' }}>
               If you ever have a question about our sustainability practices, motor torque, or shipping times, our human support team is available 24 hours a day to provide immediate answers.
            </p>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
               <Link to="/contact" className="btn-primary" style={{ padding: '16px 40px' }}>Contact Governance Team</Link>
               <Link to="/shop" className="btn-ghost" style={{ padding: '16px 40px' }}>Explore the Collection</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
