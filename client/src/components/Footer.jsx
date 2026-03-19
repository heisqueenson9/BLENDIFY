import { Link } from 'react-router-dom';
import { Icon } from './Icon';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <svg width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 2C8 2 4 10 4 17a10 10 0 0020 0C24 10 20 2 14 2z" fill="#C5E710" />
                <path d="M10 18 Q14 10 18 18" stroke="#010A00" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              BLEND<span>IFY</span>
            </Link>
            <p>Your go-to destination for portable blending. We're on a mission to make healthy living effortless, delicious, and accessible for everyone on the move.</p>
            <div className="social-links" style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ padding: '8px', display: 'flex' }}>
                <Icon name="instagram" size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ padding: '8px', display: 'flex' }}>
                <Icon name="twitter" size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ padding: '8px', display: 'flex' }}>
                <Icon name="facebook" size={18} />
              </a>
              <a href="https://wa.me/233000000000" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ padding: '8px', display: 'flex' }}>
                <Icon name="whatsapp" size={18} />
              </a>
            </div>
          </div>
          <div>
            <h5>Shop</h5>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/portable-blenders">Portable Blenders</Link></li>
              <li><Link to="/commercial-blenders">Commercial Blenders</Link></li>
              <li><Link to="/smart-blenders">Smart Blenders</Link></li>
            </ul>
          </div>
          <div>
            <h5>Support</h5>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Return & Refund</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Blendify. All rights reserved. Engineered for a healthy living.</span>
          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
