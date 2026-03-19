import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { STATIC_PRODUCTS, BLENDER_IMAGES } from '../data/constants';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState('');

  useEffect(() => {
    const found = STATIC_PRODUCTS.find(p => p.id === id || p.id === parseInt(id));
    if (found) {
      setProduct(found);
      setActiveThumb(found.image);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div className="loader-wrap"><div className="spinner"></div></div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '100px 24px' }}><h3>Product not found.</h3><Link to="/shop" className="btn-primary">View shop</Link></div>;

  const related = STATIC_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <div className="breadcrumb">
        <Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span>{product.name}</span>
      </div>

      <div className="product-detail">
        <div className="product-gallery">
          <div className="product-img-main" style={{ background: product.bg }}>
            <img src={activeThumb} alt={product.name} />
          </div>
          <div className="product-thumbs">
            {[product.image, ...BLENDER_IMAGES.filter(img => img !== product.image).slice(0, 2)].map((src, i) => (
              <div key={i} className={`product-thumb ${activeThumb === src ? 'active' : ''}`} onClick={() => setActiveThumb(src)}>
                <img src={src} alt="Thumb" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info-block">
          {product.badge && <span className={`product-badge ${product.badgeClass}`}>{product.badge}</span>}
          <h1>{product.name}</h1>
          <div className="product-stars">{product.stars} <small>({product.reviews} reviews)</small></div>
          <p className="product-desc">{product.description}</p>
          <div className="product-price-lg">
            {product.price.toFixed(2)}L {product.oldPrice && <span className="price-old">{product.oldPrice.toFixed(2)}L</span>}
          </div>

          <div className="product-specs">
            <div className="spec"><div className="spec-label">Capacity</div><div className="spec-value">450ml BPA-Free</div></div>
            <div className="spec"><div className="spec-label">Power</div><div className="spec-value">USB-C Rechargeable</div></div>
            <div className="spec"><div className="spec-label">Runtime</div><div className="spec-value">20-30 blends/charge</div></div>
          </div>

          <div className="product-actions" style={{ display: 'flex', gap: '16px' }}>
            <div className="qty-picker">
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <div className="qty-display" style={{ padding: '0 16px' }}>{qty}</div>
              <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className="btn-primary" style={{ flex: 1 }} onClick={() => addToCart(product, qty)}>
              🛒 Add to Cart
            </button>
          </div>
          
          <div style={{ padding: '20px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', marginTop: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <span>🚚</span><div><strong>Free Shipping</strong><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>On orders over 200L</p></div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span>↩️</span><div><strong>30-Day Returns</strong><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hassle-free process</p></div>
            </div>
          </div>
        </div>
      </div>

      <section style={{ padding: '80px 0' }} data-fade>
        <div className="section-label">Recommender System</div>
        <h2 className="section-title">YOU MIGHT ALSO LIKE</h2>
        <div className="products-grid">
          {related.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
