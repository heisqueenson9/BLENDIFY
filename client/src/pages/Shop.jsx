import { useState, useMemo } from 'react';
import { STATIC_PRODUCTS } from '../data/constants';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { Icon } from '../components/Icon';

export default function Shop() {
  const { requestProduct } = useAuth();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      desc: formData.get('desc')
    };
    requestProduct(data);
    showToast("Product request submitted!", "success");
    setShowRequestModal(false);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast("Subscribed successfully.", "success");
    setEmail('');
  };

  const categories = ['All', 'Portable', 'Commercial', 'Smart'];

  const filteredProducts = useMemo(() => {
    let result = filter === 'All' 
      ? STATIC_PRODUCTS 
      : STATIC_PRODUCTS.filter(p => p.category.includes(filter.toLowerCase()));

    if (sort === 'Price: Low to High') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'Most Popular') result = [...result].sort((a, b) => b.popularity - a.popularity);

    return result;
  }, [filter, sort]);

  return (
    <div className="shop-page" style={{ background: 'var(--white)', minHeight: '100vh' }}>
      {/* SHOP HERO */}
      <section className="page-header" style={{ background: 'var(--black)', color: 'white', padding: '160px 24px 100px', textAlign: 'center' }}>
        <div className="container">
          <span data-fade="up" className="section-label" style={{ color: 'var(--lime)', border: '1px solid var(--lime)' }}>Discover</span>
          <h1 
            data-fade="left"
            className="delay-100"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', fontFamily: 'var(--font-display)', letterSpacing: '4px' }}
          >
            THE FULL <span style={{ color: 'var(--lime)' }}>COLLECTION</span>
          </h1>
          <p data-fade="right" className="delay-200" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px', maxWidth: '700px', margin: '24px auto 0', fontSize: '1.2rem' }}>
            Explore our collection of 20 high-performance blending machines, engineered for every possible environment. No gaps, just pure power.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="container" style={{ padding: '40px 24px', position: 'relative', zIndex: 10 }}>
        <div 
          data-fade
          className="shop-controls glass" 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '24px 32px', 
            borderRadius: 'var(--radius-xl)', 
            border: '1px solid var(--gray-200)',
            flexWrap: 'wrap',
            gap: '24px',
            background: 'var(--white)'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{ 
                  padding: '10px 24px', 
                  borderRadius: 'var(--radius-full)', 
                  border: '1px solid',
                  borderColor: filter === cat ? 'var(--lime)' : 'var(--gray-200)',
                  background: filter === cat ? 'var(--lime)' : 'transparent',
                  color: filter === cat ? 'var(--black)' : 'var(--text-muted)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  transition: 'var(--transition)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
             <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Showing {filteredProducts.length} Items</span>
             <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ 
                padding: '12px 20px', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--gray-200)', 
                fontSize: '0.85rem',
                outline: 'none',
                background: 'var(--white)',
                fontWeight: '600'
              }}
             >
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
             </select>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="container" style={{ paddingBottom: '100px' }}>
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((p, i) => (
              <div 
                key={p.id}
                data-fade
                style={{ transitionDelay: `${(i % 4) * 0.15 + 0.3}s` }}
              >
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px dotted rgba(255,255,255,0.1)' }}>
             <div style={{ color: 'var(--lime)', marginBottom: '24px' }}>
                <Icon name="search" size={60} />
             </div>
             <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Product Not Found</h3>
             <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
                We couldn't find any blenders matching your criteria. But don't worry, we can get it for you!
             </p>
             <button onClick={() => setShowRequestModal(true)} className="btn-primary" style={{ padding: '14px 40px' }}>
                Request This Product <Icon name="rocket" size={20} style={{ marginLeft: '10px' }} />
             </button>
          </div>
        )}
      </section>

      {/* REQUEST MODAL */}
      {showRequestModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
           <div className="card-luxury" style={{ maxWidth: '500px', width: '100%', padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                 <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Request <span style={{ color: 'var(--lime)' }}>Blender</span></h2>
                 <button onClick={() => setShowRequestModal(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
              </div>
              <form onSubmit={handleRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>Product Name</label>
                    <input required name="name" placeholder="e.g. BlendMaster 3000" style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                 </div>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>Description / Special Specs</label>
                    <textarea required name="desc" placeholder="Tell us what you're looking for..." style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', minHeight: '100px' }} />
                 </div>
                 <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '12px', marginTop: '10px' }}>
                    Submit Request
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* NEWSLETTER PREVIEW */}
      <section style={{ padding: '80px 24px', background: 'var(--lime)', textAlign: 'center' }}>
        <div className="container">
          <h2 data-fade style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--black)', letterSpacing: '2px' }}>NEVER MISS A DROP</h2>
          <p data-fade style={{ color: 'rgba(1,10,0,0.7)', margin: '16px auto 32px', maxWidth: '500px' }}>Join our community for exclusive early access to new collections and healthy recipes.</p>
          <form onSubmit={handleSubscribe} data-fade style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '12px' }}>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              style={{ flex: 1, padding: '16px 24px', borderRadius: 'var(--radius-md)', border: 'none', background: '#fff' }} 
            />
            <button className="btn-primary" style={{ background: 'var(--black)', color: 'white' }}>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
