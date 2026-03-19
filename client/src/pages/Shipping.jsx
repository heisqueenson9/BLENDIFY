import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

const SHIPPING_SECTIONS = [
  { id: 'fulfillment', title: 'Fulfillment Time', icon: 'check', content: "All orders are processed within 2–4 business days. No orders are shipped on weekends or public holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days." },
  { id: 'shipping-rates', title: 'Shipping Rates & Estimates', icon: 'shipping', content: "Shipping charges for your order will be calculated and displayed at checkout. Standard shipping takes 3–5 business days, and Express shipping takes 1–2 business days." },
  { id: 'shipment-confirmation', title: 'Shipment Confirmation & Tracking', icon: 'pin', content: "You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours." },
  { id: 'customs-taxes', title: 'Customs, Duties & Taxes', icon: 'globe', content: "Blendify is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer." }
];

export default function Shipping() {
  return (
    <div className="about-page" style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <section className="page-header" style={{ background: 'var(--black)', color: 'white', padding: '120px 24px 80px', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--lime)' }}>Customer Care</span>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', letterSpacing: '4px' }}>SHIPPING POLICY</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px' }}>Detailed information about our delivery process and timelines.</p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 24px' }}>
        <div className="shop-layout">
          <aside className="shop-sidebar" style={{ height: 'max-content', position: 'sticky', top: '120px' }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', color: 'var(--text-muted)' }}>NAVIGATE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SHIPPING_SECTIONS.map((s, i) => (
                <a key={i} href={`#${s.id}`} style={{ fontSize: '0.9rem', color: 'var(--black)', fontWeight: '600', transition: 'var(--transition)' }} className="hover-shadow">
                  {s.title}
                </a>
              ))}
            </div>
          </aside>
          
          <div style={{ paddingLeft: '40px' }}>
            {SHIPPING_SECTIONS.map((s, i) => (
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
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '2px', marginBottom: '24px' }}>GOT QUESTIONS ABOUT SHIPPING?</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Contact our dedicated logistics team for more information.</p>
        <Link to="/contact" className="btn-primary" style={{ padding: '16px 40px' }}>Get In Touch</Link>
      </section>
    </div>
  );
}
