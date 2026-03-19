import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { STATIC_PRODUCTS, BLENDER_IMAGES } from '../data/constants';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import RecommendationSection from '../components/RecommendationSection';
import { Icon } from '../components/Icon';

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

  return (
    <div className="container" style={{ padding: '120px 24px' }}>
      <div className="breadcrumb" style={{ opacity: 0.5, marginBottom: '40px', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px' }}>
        <Link to="/" style={{ color: '#fff' }}>Home</Link><span> / </span><Link to="/shop" style={{ color: '#fff' }}>Shop</Link><span> / </span><span style={{ color: 'var(--lime)' }}>{product.name}</span>
      </div>

      <div className="product-detail" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'start' }}>
        
        {/* Visuals */}
        <div className="product-gallery" data-fade="right">
          <div className="product-img-main" style={{ background: product.bg, borderRadius: '48px', padding: '60px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
            <img src={activeThumb} alt={product.name} style={{ width: '100%', transform: 'scale(1.1)', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }} />
          </div>
          <div className="product-thumbs" style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
            {[product.image, ...BLENDER_IMAGES.filter(img => img !== product.image).slice(0, 2)].map((src, i) => (
              <div key={i} className={`product-thumb ${activeThumb === src ? 'active' : ''}`} onClick={() => setActiveThumb(src)} style={{ 
                width: '80px', height: '80px', borderRadius: '20px', border: activeThumb === src ? '2px solid var(--lime)' : '1px solid rgba(255,255,255,0.1)',
                padding: '12px', background: 'rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'all 0.3s'
              }}>
                <img src={src} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-info-block" data-fade="left">
          {product.badge && <span className={`product-badge ${product.badgeClass}`} style={{ background: 'var(--lime)', color: 'var(--black)', padding: '6px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 900, marginBottom: '24px', display: 'inline-block' }}>{product.badge}</span>}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '24px' }}>{product.name}</h1>
          <div className="product-stars" style={{ color: 'var(--lime)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
             {product.stars} <small style={{ opacity: 0.5 }}>({product.reviews} verified reviews)</small>
          </div>
          <p className="product-desc" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '40px' }}>{product.description}</p>
          
          <div className="product-price-lg" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '48px', color: 'var(--lime)' }}>
            GHS {product.price.toFixed(2)} {product.oldPrice && <span className="price-old" style={{ textDecoration: 'line-through', opacity: 0.3, fontSize: '1.5rem', marginLeft: '12px' }}>GHS {product.oldPrice.toFixed(2)}</span>}
          </div>

          <div className="product-actions" style={{ display: 'flex', gap: '16px' }}>
            <div className="qty-picker">
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <div className="qty-display" style={{ minWidth: '40px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 800 }}>{qty}</div>
              <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className="btn-primary" style={{ flex: 1, padding: '20px', fontSize: '1.1rem' }} onClick={() => addToCart(product, qty)}>
               <Icon name="cart" size={20} style={{ marginRight: '10px' }} /> Add to Cart
            </button>
          </div>
          
          <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
               <Icon name="shipping" size={24} color="var(--lime)" />
               <div><strong style={{ display: 'block' }}>Free Delivery</strong><p style={{ fontSize: '0.8rem', opacity: 0.4 }}>On orders over GHS 200</p></div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
               <Icon name="returns" size={24} color="var(--lime)" />
               <div><strong style={{ display: 'block' }}>Warranty</strong><p style={{ fontSize: '0.8rem', opacity: 0.4 }}>30-day money back</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="product-reviews" style={{ marginTop: '120px', paddingTop: '100px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 data-fade="up" style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '60px' }}>What People <span style={{ color: 'var(--lime)' }}>Are Saying</span></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {[
            { name: "Kwesi O.", rating: 5, comment: "This blender changed my morning routine completely. The power is insane for its size!" },
            { name: "Abena S.", rating: 5, comment: "Delivery was super fast. The rider was very professional and the packaging was top notch." },
            { name: "John D.", rating: 4, comment: "Beautiful design. It looks great in my kitchen and works perfectly for my smoothies." }
          ].map((r, i) => (
             <div 
               key={i} 
               data-fade="up"
               className={`card-luxury delay-${(i + 1) * 200}`}
               style={{ padding: '40px', borderRadius: '32px' }}
             >
                <div style={{ color: 'var(--lime)', marginBottom: '16px' }}>
                   {Array(r.rating).fill('★').join('')}
                </div>
                <p style={{ fontStyle: 'italic', opacity: 0.7, marginBottom: '32px', lineHeight: 1.6 }}>"{r.comment}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'var(--lime)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                      {r.name.charAt(0)}
                   </div>
                   <div>
                      <h6 style={{ fontWeight: 800, fontSize: '1rem' }}>{r.name}</h6>
                      <small style={{ opacity: 0.4 }}>Verified Buyer</small>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>

      <RecommendationSection title="Compatible Blenders" excludeId={product.id} />
    </div>
  );
}

export default ProductDetails;
