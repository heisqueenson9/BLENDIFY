import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getBlenderImage } from '../data/constants';

function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 24px' }}>
        <h2 className="section-title">YOUR CART IS EMPTY</h2>
        <p className="hero-desc" style={{ margin: '0 auto 32px', color: 'var(--text-muted)' }}>Looks like you haven't added any blenders to your cart yet.</p>
        <Link to="/shop" className="btn-primary">Browse Shop</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <div className="breadcrumb" style={{ color: 'var(--text-muted)' }}>
        <Link to="/">Home</Link><span>/</span><span>Cart</span>
      </div>
      <h2 className="section-title">YOUR SHOPPING CART</h2>

      <div className="shop-layout">
        <div style={{ flex: 1 }}>
          <div className="cart-items-list" style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
            {items.map(m => (
              <div key={m.id || m._id} className="cart-item" style={{ borderBottom: '1px solid var(--gray-100)', padding: '24px' }}>
                <div className="cart-item-img" style={{ width: '100px', height: '100px' }}>
                  <img src={m.image} alt={m.name} />
                </div>
                <div className="cart-item-info" style={{ marginLeft: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 className="cart-item-name">{m.name}</h4>
                    <button className="cart-remove" onClick={() => removeFromCart(m.id || m._id)}>×</button>
                  </div>
                  <div className="cart-item-price" style={{ margin: '10px 0' }}>{Number(m.price).toFixed(2)}L</div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQuantity(m.id || m._id, m.quantity - 1)}>−</button>
                    <span className="qty-display" style={{ margin: '0 12px' }}>{m.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(m.id || m._id, m.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/shop" className="btn-outline">← Continue Shopping</Link>
            <button className="btn-ghost" style={{ color: 'var(--black)', border: '1px solid var(--gray-200)' }} onClick={clearCart}>Clear Cart</button>
          </div>
        </div>

        <aside className="shop-sidebar" style={{ maxWidth: '380px' }}>
          <div style={{ background: 'var(--gray-50)', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
            <h4 style={{ textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '1px' }}>Order Summary</h4>
            <div className="cart-total-row" style={{ marginTop: '16px' }}>
              <span className="cart-total-label">Subtotal</span>
              <span className="cart-total-amount">{Number(cartTotal).toFixed(2)}L</span>
            </div>
            <div className="cart-total-row">
              <span className="cart-total-label">Shipping</span>
              <span className="cart-total-amount">{cartTotal > 200 ? 'Free' : '20.00L'}</span>
            </div>
            <div className="cart-total-row" style={{ borderTop: '1px solid var(--gray-200)', marginTop: '20px', paddingTop: '20px' }}>
              <span className="cart-total-label" style={{ fontWeight: '700', color: 'var(--black)' }}>Total</span>
              <span className="cart-total-amount" style={{ color: 'var(--lime)', fontSize: '1.4rem' }}>{Number(cartTotal > 200 ? cartTotal : cartTotal + 20).toFixed(2)}L</span>
            </div>
            <Link to="/checkout" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '32px' }}>Secure Checkout</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
