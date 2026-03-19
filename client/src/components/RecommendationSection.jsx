import React from 'react';
import { Link } from 'react-router-dom';
import { STATIC_PRODUCTS } from '../data/constants';
import { useCart } from '../context/CartContext';

const RecommendationSection = ({ title = "Recommended For You", excludeId = null }) => {
  const { cartItems, orders } = useCart();
  
  // Logic: 
  // 1. Get categories of items already in cart or orders
  // 2. Filter products in those categories that aren't already in cart
  // 3. If nothing, show popular items
  
  const userInterests = new Set([
    ...cartItems.map(item => item.category),
    ...orders.flatMap(order => order.items.map(item => item.category))
  ]);

  let recommended = STATIC_PRODUCTS.filter(p => p.id !== excludeId);
  
  if (userInterests.size > 0) {
    recommended = recommended.filter(p => userInterests.has(p.category));
  }

  // If we have too many or too few, sort by popularity and take 4
  recommended = recommended
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  // Fallback if no specific category matches
  if (recommended.length < 2) {
    recommended = STATIC_PRODUCTS
      .filter(p => p.id !== excludeId)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);
  }

  return (
    <section className="recommendations" style={{ padding: '60px 0' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '32px' }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
        {recommended.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-luxury hover-lift" style={{ padding: '24px', borderRadius: '20px', transition: 'transform 0.3s ease' }}>
              <div style={{ height: '160px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>{product.name}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ color: 'var(--lime)', fontWeight: 700 }}>{product.price}L</span>
                 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.stars}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendationSection;
