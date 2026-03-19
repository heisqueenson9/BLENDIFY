import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

const TERMS_SECTIONS = [
  { id: 'general-terms', title: 'General Terms', icon: 'check', content: "By accessing this website, we assume you accept these terms and conditions. Do not continue to use Blendify if you do not agree to take all of the terms and conditions stated on this page." },
  { id: 'user-accounts', title: 'User Accounts', icon: 'shield', content: "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer to prevent unauthorized access to your account." },
  { id: 'intellectual-property', title: 'Intellectual Property', icon: 'quality', content: "The content, organization, graphics, design, and other matters related to the Site are protected under applicable copyrights and other proprietary laws, including but not limited to intellectual property laws." },
  { id: 'limit-liability', title: 'Limit of Liability', icon: 'warning', content: "In no event shall Blendify, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this Website." }
];

export default function Terms() {
  return (
    <div className="about-page" style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <section className="page-header" style={{ background: 'var(--black)', color: 'white', padding: '120px 24px 80px', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--lime)' }}>Usage & Agreement</span>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', letterSpacing: '4px' }}>TERMS & CONDITIONS</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px' }}>Please read these terms carefully before using our services.</p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 24px' }}>
        <div className="shop-layout">
          <aside className="shop-sidebar" style={{ height: 'max-content', position: 'sticky', top: '120px' }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', color: 'var(--text-muted)' }}>NAVIGATE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TERMS_SECTIONS.map((s, i) => (
                <a key={i} href={`#${s.id}`} style={{ fontSize: '0.9rem', color: 'var(--black)', fontWeight: '600', transition: 'var(--transition)' }} className="hover-shadow">
                  {s.title}
                </a>
              ))}
            </div>
          </aside>
          
          <div style={{ paddingLeft: '40px' }}>
            {TERMS_SECTIONS.map((s, i) => (
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
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '2px', marginBottom: '24px' }}>WANT TO DISCUSS THESE TERMS?</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Our legal team is available to clarify any points of our software terms.</p>
        <Link to="/contact" className="btn-primary" style={{ padding: '16px 40px' }}>Get In Touch</Link>
      </section>
    </div>
  );
}
