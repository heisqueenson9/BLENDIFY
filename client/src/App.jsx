import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import OrderHistory from './pages/OrderHistory';
import Tracking from './pages/Tracking';
import Wallet from './pages/Wallet';

// New Pages
import About from './pages/About';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Category from './pages/Category';
import Profile from './pages/Profile';
import ChatSage from './components/ChatSage';

import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';
import { useEffect } from 'react';

function MainRoutes() {
  const location = useLocation();
  
  return (
    <div className="page-transition" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/track/:id" element={<Tracking />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Information Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Category Routes */}
        <Route path="/smart-blenders" element={<Category type="smart" />} />
        <Route path="/commercial-blenders" element={<Category type="commercial" />} />
        <Route path="/portable-blenders" element={<Category type="portable" />} />
      </Routes>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      document.querySelectorAll('[data-fade]').forEach(el => el.classList.add('visible'));
      return;
    }

    const observerOptions = { threshold: 0.1 };
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, we can stop observing this element
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeElements = () => {
      document.querySelectorAll('[data-fade]:not(.visible)').forEach(el => {
        fadeObserver.observe(el);
      });
    };

    // Initial check
    observeElements();
    
    // Watch for dynamic content
    const observerMutation = new MutationObserver(() => {
      observeElements();
    });

    observerMutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      fadeObserver.disconnect();
      observerMutation.disconnect();
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
            <MainRoutes />
          </main>
          <Footer />
          <ChatSage />
          <Toast />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
