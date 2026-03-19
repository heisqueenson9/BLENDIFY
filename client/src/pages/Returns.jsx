import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

const RETURN_SECTIONS = [
  { id: 'returns', title: 'Return Eligibility', icon: 'returns', content: "We have a 7-day return policy, which means you have 7 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase." },
  { id: 'refunds', title: 'Refund Process', icon: 'credit', content: "We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too." },
  { id: 'damages', title: 'Damages & Issues', icon: 'warning', content: "Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right." },
  { id: 'exchanges', title: 'Exchanges', icon: 'rocket', content: "The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item." }
];

export default function Returns() {
  return (
    <div className="about-page" style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <section className="page-header" style={{ background: 'var(--black)', color: 'white', padding: '120px 24px 80px', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--lime)' }}>Customer Satisfaction</span>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', letterSpacing: '4px' }}>RETURNS & REFUND POLICY</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px' }}>Hassle-free returns and refunds for your peace of mind.</p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 24px' }}>
        <div className="shop-layout">
          <aside className="shop-sidebar" style={{ height: 'max-content', position: 'sticky', top: '120px' }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', color: 'var(--text-muted)' }}>NAVIGATE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {RETURN_SECTIONS.map((s, i) => (
                <a key={i} href={`#${s.id}`} style={{ fontSize: '0.9rem', color: 'var(--black)', fontWeight: '600', transition: 'var(--transition)' }} className="hover-shadow">
                  {s.title}
                </a>
              ))}
            </div>
          </aside>
          
          <div style={{ paddingLeft: '40px' }}>
            {RETURN_SECTIONS.map((s, i) => (
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
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '2px', marginBottom: '24px' }}>WANT TO START A RETURN?</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Our dedicated returns team is here to help you get started.</p>
        <Link to="/contact" className="btn-primary" style={{ padding: '16px 40px' }}>Get In Touch</Link>
      </section>
    </div>
  );
}
