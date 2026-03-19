import React, { createContext, useContext, useState, useEffect } from 'react';
import { showToast } from '../components/Toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [riderMessages, setRiderMessages] = useState({}); // { orderId: [{ sender: 'user|rider', text: '', time: '' }] }
  const [reviews, setReviews] = useState([]);

  // Load and sync Cart (Universal)
  useEffect(() => {
    const savedCart = localStorage.getItem('blendify_cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('blendify_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync user-specific data (Isolation)
  useEffect(() => {
    if (user && user.email) {
      const email = user.email;
      const savedOrders = localStorage.getItem(`blendify_${email}_orders`) || '[]';
      const savedMessages = localStorage.getItem(`blendify_${email}_messages`) || '{}';
      const savedReviews = localStorage.getItem(`blendify_${email}_reviews`) || '[]';

      setOrders(JSON.parse(savedOrders));
      setRiderMessages(JSON.parse(savedMessages));
      setReviews(JSON.parse(savedReviews));
    } else {
      setOrders([]);
      setRiderMessages({});
      setReviews([]);
    }
  }, [user]);

  // Persistent storage updates for user data
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`blendify_${user.email}_orders`, JSON.stringify(orders));
    }
  }, [orders, user]);

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`blendify_${user.email}_messages`, JSON.stringify(riderMessages));
    }
  }, [riderMessages, user]);

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`blendify_${user.email}_reviews`, JSON.stringify(reviews));
    }
  }, [reviews, user]);

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCartItems([]);

  const sendRiderMessage = (orderId, text, sender = 'user') => {
    const newMessage = { sender, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setRiderMessages(prev => {
      const orderMsgs = prev[orderId] || [];
      return { ...prev, [orderId]: [...orderMsgs, newMessage] };
    });

    // Simulated rider reply after 2 seconds
    if (sender === 'user') {
      setTimeout(() => {
        const replies = ["I'm on my way!", "Almost there!", "I've picked up your order.", "I'm outside.", "Got it!", "On it!"];
        const reply = { sender: 'rider', text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setRiderMessages(prev => {
          const orderMsgs = prev[orderId] || [];
          return { ...prev, [orderId]: [...orderMsgs, reply] };
        });
      }, 2000);
    }
  };

  const addReview = (reviewData) => {
    const newReview = { ...reviewData, id: Date.now(), date: new Date().toISOString() };
    setReviews(prev => [newReview, ...prev]);
    showToast("Review submitted successfully!", "success");
  };

  const placeOrder = (locationInfo, paymentMethod = 'card', selectedRider = null, deliveryFee = 0) => {
    if (!user) return null;
    
    const coordsMap = {
      "Accra Central": { lat: 5.556, lng: -0.196 },
      "East Legon": { lat: 5.632, lng: -0.158 },
      "Kumasi": { lat: 6.666, lng: -1.616 },
      "Tema": { lat: 5.666, lng: -0.016 },
      "Takoradi": { lat: 4.883, lng: -1.758 },
      "Cape Coast": { lat: 5.105, lng: -1.246 },
      "Tamale": { lat: 9.407, lng: -0.853 },
      "Dansoman": { lat: 5.549, lng: -0.274 },
      "Airport Residential": { lat: 5.605, lng: -0.187 }
    };

    const newOrder = {
      id: `ORDER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: [...cartItems],
      subtotal: cartTotal,
      deliveryFee: deliveryFee,
      total: cartTotal + deliveryFee,
      date: new Date().toISOString(),
      location: locationInfo,
      coordinates: coordsMap[locationInfo] || { lat: 5.603, lng: -0.187 },
      status: 'Order Received',
      timestamp: Date.now(),
      paymentMethod,
      rider: selectedRider,
      eta: '25-35 min'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order placed successfully!`, 'success');
    clearCart();
    return newOrder;
  };

  const getOrderStatus = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return 'Pending';
    if (order.status === 'Cancelled') return 'Cancelled';
    
    const elapsedSeconds = (Date.now() - order.timestamp) / 1000;
    
    if (elapsedSeconds < 10) return 'Order Received';
    if (elapsedSeconds < 30) return 'Preparing';
    if (elapsedSeconds < 60) return 'Rider Assigned';
    if (elapsedSeconds < 120) return 'Picked Up';
    if (elapsedSeconds < 240) return 'On the Way';
    return 'Delivered';
  };

  const cancelOrder = (orderId, refundAmount, refundFn) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
    if (refundFn) refundFn(refundAmount);
    showToast("Order Cancelled and Refunded", "info");
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart, 
      orders, placeOrder, getOrderStatus, cancelOrder,
      riderMessages, sendRiderMessage, reviews, addReview
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
