import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

const JOBS = [
  { title: "Senior UI/UX Designer", location: "Accra / Remote", type: "Full-time", dept: "Design" },
  { title: "React Developer", location: "Remote", type: "Full-time", dept: "Engineering" },
  { title: "Growth Marketing Manager", location: "Accra", type: "Full-time", dept: "Marketing" },
  { title: "Customer Success Lead", location: "Accra", type: "Part-time", dept: "Support" }
];

export default function Careers() {
  return (
    <div className="about-page" style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <section className="page-header" style={{ background: 'var(--black)', color: 'white', padding: '160px 24px 100px', textAlign: 'center' }}>
        <div className="container">
          <div data-fade style={{ color: 'var(--lime)', marginBottom: '32px' }}>
            <Icon name="rocket" size={64} style={{ opacity: 0.8 }} />
          </div>
          <span className="section-label" style={{ color: 'var(--white)', border: '1px solid rgba(255,255,255,0.2)' }}>Join Our Mission</span>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', letterSpacing: '4px' }}>SHAPE THE FUTURE <br/> <span style={{ color: 'var(--lime)' }}>OF NUTRITION</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px', maxWidth: '700px', margin: '24px auto 0' }}>Work with a team of innovators dedicated to building portable technology for healthy living.</p>
        </div>
      </section>

      {/* CORE PERKS */}
      <section className="container" style={{ padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <div className="card-luxury" style={{ textAlign: 'left', padding: '40px' }}>
            <span style={{ color: 'var(--lime)' }}><Icon name="globe" size={32} /></span>
            <h4 style={{ margin: '16px 0 8px' }}>Unlimited PTO</h4>
            <p style={{ color: 'var(--text-muted)' }}>We trust our team to take the time they need to recharge.</p>
          </div>
          <div className="card-luxury" style={{ textAlign: 'left', padding: '40px' }}>
            <span style={{ color: 'var(--lime)' }}><Icon name="trend" size={32} /></span>
            <h4 style={{ margin: '16px 0 8px' }}>Equity Options</h4>
            <p style={{ color: 'var(--text-muted)' }}>Everyone at Blendify is an owner and shares in our success.</p>
          </div>
          <div className="card-luxury" style={{ textAlign: 'left', padding: '40px' }}>
            <span style={{ color: 'var(--lime)' }}><Icon name="leaf" size={32} /></span>
            <h4 style={{ margin: '16px 0 8px' }}>Free Blenders</h4>
            <p style={{ color: 'var(--text-muted)' }}>Keep yourself healthy with our full product collection.</p>
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="container" style={{ padding: '80px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', letterSpacing: '2px' }}>OPEN POSITIONS</h2>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{JOBS.length} Active Listings</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {JOBS.map((j, i) => (
            <div key={i} className="glass" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '32px 40px', 
              borderRadius: 'var(--radius-lg)', 
              border: '1px solid var(--gray-200)',
              width: '100%',
              transition: 'var(--transition)'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--lime)', letterSpacing: '1px', textTransform: 'uppercase' }}>{j.dept}</span>
                <h3 style={{ margin: '8px 0 4px', fontSize: '1.4rem' }}>{j.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{j.location} • {j.type}</p>
              </div>
              <Link to="/contact" className="btn-primary">Apply Now →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CALL */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>NOT A FIT FOR THESE ROLES?</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Send your portfolio to <span style={{ color: 'var(--black)', fontWeight: '700' }}>careers@blendify.com</span></p>
        <Link to="/about" className="btn-ghost" style={{ border: '2px solid var(--black)', color: 'var(--black)' }}>About Our Team</Link>
      </section>
    </div>
  );
}
