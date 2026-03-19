import { useState, useMemo } from 'react';
import { STATIC_PRODUCTS } from '../data/constants';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');

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
          <span data-fade className="section-label" style={{ color: 'var(--lime)', border: '1px solid var(--lime)', transitionDelay: '0.1s' }}>Discover</span>
          <h1 
            data-fade
            style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', fontFamily: 'var(--font-display)', letterSpacing: '4px', transitionDelay: '0.3s' }}
          >
            THE FULL <span style={{ color: 'var(--lime)' }}>COLLECTION</span>
          </h1>
          <p data-fade style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px', maxWidth: '700px', margin: '24px auto 0', fontSize: '1.2rem', transitionDelay: '0.5s' }}>
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
      </section>

      {/* NEWSLETTER PREVIEW */}
      <section style={{ padding: '80px 24px', background: 'var(--lime)', textAlign: 'center' }}>
        <div className="container">
          <h2 data-fade style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--black)', letterSpacing: '2px' }}>NEVER MISS A DROP</h2>
          <p data-fade style={{ color: 'rgba(1,10,0,0.7)', margin: '16px auto 32px', maxWidth: '500px' }}>Join our community for exclusive early access to new collections and healthy recipes.</p>
          <div data-fade style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '12px' }}>
            <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: '16px 24px', borderRadius: 'var(--radius-md)', border: 'none' }} />
            <button className="btn-primary" style={{ background: 'var(--black)', color: 'white' }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
