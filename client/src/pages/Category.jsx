import { useParams, Link } from 'react-router-dom';
import { STATIC_PRODUCTS } from '../data/constants';
import ProductCard from '../components/ProductCard';

export default function Category({ type }) {
  const products = type === 'all' 
    ? STATIC_PRODUCTS 
    : STATIC_PRODUCTS.filter(p => p.category.toLowerCase().includes(type.toLowerCase()));

  const categoryTitles = {
    all: "ALL PRODUCTS",
    portable: "PORTABLE BLENDERS",
    commercial: "COMMERCIAL BLENDERS",
    smart: "SMART BLENDERS"
  };

  const categoryDescs = {
    all: "Explore our complete collection of high-performance blenders.",
    portable: "Fresh smoothies anywhere. Lightweight, powerful, and TSA-friendly.",
    commercial: "The heavy hitters. Designed for high volume and maximum torque.",
    smart: "Next-gen blending. App-connected, auto-sensing, and perfectly balanced."
  };

  return (
    <div className="about-page" style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <section className="page-header" style={{ background: 'var(--black)', color: 'white', padding: '120px 24px 80px', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--lime)' }}>Collection</span>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', letterSpacing: '4px' }}>
            {categoryTitles[type] || "BLENDER COLLECTION"}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '24px', maxWidth: '600px', margin: '24px auto 0' }}>
            {categoryDescs[type] || "Browse our premium selection of blending technology."}
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: '60px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Showing {products.length} Products</p>
          <div style={{ display: 'flex', gap: '16px' }}>
             <select style={{ padding: '10px 16px', borderRadius: ' var(--radius-sm)', border: '1px solid var(--gray-200)', fontSize: '0.85rem' }}>
                <option>Sort by: Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
             </select>
          </div>
        </div>

        <div className="products-grid">
          {products.length > 0 ? products.map(p => (
            <ProductCard key={p.id} p={p} />
          )) : (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '100px 0' }}>
               <h3>No products found in this category.</h3>
               <Link to="/shop" className="btn-primary" style={{ marginTop: '20px' }}>Back to All Products</Link>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--gray-50)', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>NEED A CUSTOM SOLUTION?</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>We offer bulk discounts for gyms, offices, and commercial juice bars.</p>
        <Link to="/contact" className="btn-outline">Corporate Inquiries</Link>
      </section>
    </div>
  );
}
