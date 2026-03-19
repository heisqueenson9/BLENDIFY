import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Icon } from './Icon';

function ProductCard({ p }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${p.id || p._id}`} className="product-img-wrap" style={{ background: p.bg }}>
        {p.badge && <span className={`product-badge ${p.badgeClass}`}>{p.badge}</span>}
        <img src={p.image} alt={p.name} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <Link to={`/product/${p.id || p._id}`} className="product-info">
          <h4 className="product-name">{p.name}</h4>
          <div className="product-stars" style={{ color: 'var(--lime)' }}>{p.stars} <small style={{ opacity: 0.5 }}>({p.reviews})</small></div>
          <div className="product-price">
            <span className="price-main">GHS {Number(p.price).toFixed(2)}</span>
            {p.oldPrice && <span className="price-old">GHS {Number(p.oldPrice).toFixed(2)}</span>}
          </div>
        </Link>
        <button className="btn-add-cart" onClick={handleAddToCart} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="cart" size={16} style={{ marginRight: '8px' }} /> Quick Add
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
