import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

const PRIVACY_SECTIONS = [
  { id: 'data-collection', title: 'Data Collection', icon: 'check', content: "We collect only the essential information needed to process your orders and provide a personalized experience. This includes your name, shipping address, email, and order history. We do not store full credit card details on our servers." },
  { id: 'data-usage', title: 'How We Use Your Data', icon: 'support', content: "Your data is used to process transactions, communicate order updates, and occasionally send promotional materials if you've opted in. We use anonymized data to analyze site performance and improve our user experience." },
  { id: 'data-sharing', title: 'Data Sharing', icon: 'lock', content: "We never sell or rent your personal data to third parties. We only share information with critical service providers needed for logistics, payments, and communications, all of whom are compliant with strict privacy regulations." },
  { id: 'your-rights', title: 'Your Rights', icon: 'shield', content: "You have the right to access, correct, or delete your personal data at any time. You can also opt-out of marketing communications with a single click. Contact us to request a full data export." }
];

export default function Privacy() {
  return (
    <div className="about-page" style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <section className="page-header" style={{ background: 'var(--black)', color: 'white', padding: '120px 24px 80px', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--lime)' }}>Legal & Governance</span>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', letterSpacing: '4px' }}>PRIVACY POLICY</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px' }}>How we protect and handle your personal data across our systems.</p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 24px' }}>
        <div className="shop-layout">
          <aside className="shop-sidebar" style={{ height: 'max-content', position: 'sticky', top: '120px' }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', color: 'var(--text-muted)' }}>NAVIGATE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {PRIVACY_SECTIONS.map((s, i) => (
                <a key={i} href={`#${s.id}`} style={{ fontSize: '0.9rem', color: 'var(--black)', fontWeight: '600', transition: 'var(--transition)' }} className="hover-shadow">
                  {s.title}
                </a>
              ))}
            </div>
          </aside>
          
          <div style={{ paddingLeft: '40px' }}>
            {PRIVACY_SECTIONS.map((s, i) => (
              <div key={i} id={s.id} className="card-luxury" style={{ marginBottom: '40px', padding: '48px', border: '1px solid var(--gray-200)' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ color: 'var(--lime)' }}><Icon name={s.icon} size={40} /></span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '2px' }}>{s.title}</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '2', fontSize: '1.05rem', marginTop: '20px' }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--black)', color: 'white', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '2px', marginBottom: '24px' }}>GOT PRIVACY QUESTIONS?</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Contact our dedicated privacy and security team for more information.</p>
        <Link to="/contact" className="btn-primary" style={{ padding: '16px 40px' }}>Get In Touch</Link>
      </section>
    </div>
  );
}
