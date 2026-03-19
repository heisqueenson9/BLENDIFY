import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Icon } from './Icon';

const Navbar = () => {
  const { user, wallet, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar" style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, 
      background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)', height: '80px'
    }}>
      <div className="container" style={{ width: '100%' }}>
        
        {/* LEFT: LOGO */}
        <div className="nav-left">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="brand" style={{ fontSize: '1.8rem', fontWeight: 800, textDecoration: 'none', color: '#fff', letterSpacing: '-1px' }}>
            BLEND<span style={{ color: 'var(--lime)' }}>IFY</span>
          </Link>
        </div>

        {/* CENTER: LINKS (Desktop Only) */}
        <div className={`nav-center nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/smart-blenders" onClick={() => setIsMenuOpen(false)}>Smart</Link>
          <Link to="/commercial-blenders" onClick={() => setIsMenuOpen(false)}>Pro</Link>
          {user && (
            <>
              <Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="mobile-only">Profile</Link>
              <button onClick={handleLogout} className="mobile-logout mobile-only" style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', padding: '16px 0', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
            </>
          )}
          {!user && <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mobile-only">Login</Link>}
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="nav-right">
          {user && (
            <Link to="/wallet" className="wallet-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(197, 231, 16, 0.1)', padding: '8px 20px', borderRadius: '40px', border: '1px solid rgba(197, 231, 16, 0.2)', textDecoration: 'none' }} id="walletBalance">
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--lime)', letterSpacing: '0.5px' }}>GHS {wallet.toFixed(2)}</span>
            </Link>
          )}

          {user ? (
            <div className="desktop-user" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link to="/orders" className="desktop-only" style={{ background: 'transparent', color: '#fff', fontSize: '0.8rem', opacity: 0.7, textDecoration: 'none', fontWeight: 600 }}>Orders</Link>
                <Link to="/profile" style={{ width: '36px', height: '36px', background: 'var(--lime)', color: 'var(--black)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none' }}>
                  {user.fullName.charAt(0).toUpperCase()}
                </Link>
            </div>
          ) : (
            <Link to="/login" className="btn-primary desktop-login" style={{ padding: '10px 24px', fontSize: '0.85rem', borderRadius: '12px' }}>Login</Link>
          )}
          
          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="cart-trigger" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#fff' }}>
            <Icon name="cart" size={26} />
            {cartCount > 0 && (
              <span className="cart-badge" style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--lime)', color: 'var(--black)', width: '20px', height: '20px', borderRadius: '50%', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
            )}
          </Link>

          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: '6px' }}>
            <div className={`bar ${isMenuOpen ? 'active' : ''}`} style={{ width: '24px', height: '2px', background: '#fff', transition: '0.3s' }}></div>
            <div className={`bar ${isMenuOpen ? 'active' : ''}`} style={{ width: '24px', height: '2px', background: '#fff', transition: '0.3s' }}></div>
            <div className={`bar ${isMenuOpen ? 'active' : ''}`} style={{ width: '24px', height: '2px', background: '#fff', transition: '0.3s' }}></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
