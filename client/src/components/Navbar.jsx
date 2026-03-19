import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 2C8 2 4 10 4 17a10 10 0 0020 0C24 10 20 2 14 2z" fill="#C5E710" />
            <path d="M10 18 Q14 10 18 18" stroke="#010A00" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          BLEND<span>IFY</span>
        </Link>

        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
          <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link></li>
          <li className="dropdown">
             <Link to="#">Products ▾</Link>
             <ul className="dropdown-menu">
               <li><Link to="/portable-blenders">Portable Blenders</Link></li>
               <li><Link to="/commercial-blenders">Commercial Blenders</Link></li>
               <li><Link to="/smart-blenders">Smart Blenders</Link></li>
             </ul>
          </li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
          <li className="mobile-only">
            {user ? (
              <button className="nav-icon-btn" onClick={logout}>Logout</button>
            ) : (
              <Link to="/login" className="nav-icon-btn">Login</Link>
            )}
          </li>
        </ul>

        <div className="nav-actions">
          {user ? (
            <div className="user-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="user-name" style={{ color: 'var(--white)', opacity: 0.7, fontSize: '0.8rem' }}>{user.name}</span>
              <button className="nav-icon-btn" onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="nav-icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span className="nav-label">Log In</span>
            </Link>
          )}

          <Link to="/cart" className="nav-icon-btn cart-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
