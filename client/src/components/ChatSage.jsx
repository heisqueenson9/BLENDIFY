import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { STATIC_PRODUCTS } from '../data/constants';
import { Icon } from './Icon';

const CHAT_LOGIC = {
  greetings: ["hello", "hi", "hey", "help", "who", "yo"],
  order: ["order", "track", "where", "status", "ship", "package", "arriving"],
  products: ["best", "recommend", "blender", "choose", "buy", "product", "smoothie", "power", "portable"],
  delivery: ["delivery", "arrive", "time", "how long", "ghana", "shipping", "cost", "free"],
  wallet: ["wallet", "balance", "money", "funds", "credit", "pay", "load"],
  cancel: ["cancel", "refund", "stop", "mistake"],
};

export default function ChatSage() {
  const { orders, getOrderStatus } = useCart();
  const { user, wallet } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm ChatSage, your AI shopping assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const getResponse = (userMsg) => {
    const msg = userMsg.toLowerCase();

    // 1. Wallet Logic
    if (CHAT_LOGIC.wallet.some(w => msg.includes(w))) {
      if (!user) return "You need to be logged in to check your wallet. Please login to see your balance.";
      return `Your current wallet balance is **GHS ${wallet.toFixed(2)}**. You can use this for instant checkout and it's where we send any refunds! Would you like to add more funds?`;
    }

    // 2. Order & Rider Status Logic
    if (CHAT_LOGIC.order.some(w => msg.includes(w)) || msg.includes("rider") || msg.includes("driver")) {
      if (orders.length === 0) {
        return "I can't find any recent orders in your history. Place your first order and I'll track it for you! Would you like to check our shop?";
      }
      const latest = orders[0];
      const status = getOrderStatus(latest.id);
      
      if (msg.includes("rider") || msg.includes("who") || msg.includes("driver")) {
         if (latest.status === 'Cancelled') return "Your order was cancelled, so no rider is assigned.";
         if (latest.rider && latest.rider.name) {
            return `Your rider is **${latest.rider.name}**. You can call them at **${latest.rider.phone}**. They are currently in the **${status}** stage with your order.`;
         }
         return `Your order is in the **${status}** stage. We'll assign a rider shortly and I'll let you know their name!`;
      }

      if (msg.includes("where") || msg.includes("status") || msg.includes("track")) {
        if (latest.status === 'Cancelled') return `Order **${latest.id}** was cancelled and fully refunded to your wallet.`;
        return `Your latest order **${latest.id}** is currently: **${status}**. ${status === 'Delivered' ? 'It has been successfully delivered!' : 'It is on its way to ' + latest.location + '.'} You can see full live tracking in your dashboard. ETA: **${latest.eta}**`;
      }
      return `Your latest order is **${latest.id}**. Status: **${status}**. How else can I help?`;
    }

    // 3. Cancel/Refund Logic
    if (CHAT_LOGIC.cancel.some(w => msg.includes(w))) {
       return "You can cancel any order that is still in the 'Order Received' stage for a full instant refund to your wallet. Just go to your Order Tracking page. If the order has already been picked up, please contact support for return help.";
    }

    // 4. Recommendation Logic
    if (CHAT_LOGIC.products.some(w => msg.includes(w))) {
      if (msg.includes("commercial") || msg.includes("pro") || msg.includes("power")) {
        const bestPro = STATIC_PRODUCTS.find(p => p.category === 'commercial');
        return `For high-power needs, the **${bestPro.name}** is a monster! It features a 1000W motor and can crush anything. Want to see more pro models?`;
      }
      if (msg.includes("portable") || msg.includes("travel") || msg.includes("mini")) {
        const bestPortable = STATIC_PRODUCTS.find(p => p.category === 'portable');
        return `Our most popular travel buddy is the **${bestPortable.name}**. It's USB-C rechargeable and fits in any car cup holder!`;
      }
      
      const topProduct = STATIC_PRODUCTS.sort((a,b) => b.popularity - a.popularity)[0];
      return `I highly recommend the **${topProduct.name}**. It's our #1 bestseller right now because of its balance of power and style. Would you like to see it?`;
    }

    // 5. Delivery Logic
    if (CHAT_LOGIC.delivery.some(w => msg.includes(w))) {
      return "We deliver across Ghana! **Free Shipping** on orders over GHS 200. \n\n• **Accra/Tema**: 24-48 hours\n• **Kumasi/Other Regions**: 3-5 days. \nOur delivery partners are super fast!";
    }

    // 6. Greeting Logic
    if (CHAT_LOGIC.greetings.some(w => msg.includes(w))) {
      const name = user ? user.fullName : "there";
      return `Hey ${name}! I'm ChatSage. I know everything about our blenders and your orders. Ask me to "track my order", "check my wallet", or "recommend a blender"!`;
    }

    return "I'm still learning! You can ask about:\n\n1. **Your Orders** (e.g. 'Where is my order?')\n2. **Wallet** (e.g. 'Check my wallet balance')\n3. **Product Advice** (e.g. 'What is the best portable blender?')\n4. **Shipping** (e.g. 'Delivery time to Kumasi')";
  };

  const handleSend = (textOverride) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    if (!textOverride) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(textToSend);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000); // Faster response feel
  };

  return (
    <>
      {/* Floating Toggle Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '40px', right: '40px',
          width: '70px', height: '70px', borderRadius: '35px',
          background: 'var(--lime)', border: 'none', cursor: 'pointer',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(197, 231, 16, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className="hover-lift chat-toggle"
      >
        {isOpen ? (
          <span style={{ fontSize: '2rem', color: 'var(--black)' }}>✕</span>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--black)" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window Container */}
      {isOpen && (
        <div className="chat-window" style={{
          position: 'fixed', bottom: '120px', right: '40px',
          width: '400px', height: '600px', background: 'var(--white)',
          borderRadius: '32px', boxShadow: '0 20px 80px rgba(0,0,0,0.2)',
          zIndex: 999, display: 'flex', flexDirection: 'column',
          overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)',
          animation: 'chatUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {/* Header */}
          <div style={{ 
            background: 'var(--black)', padding: '32px 24px', 
            color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
          }}>
            <div>
              <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', letterSpacing: '1px', fontSize: '1.2rem' }}>CHATSAGE <span style={{ color: 'var(--lime)' }}>AI</span></h4>
              <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '4px' }}>Context-Aware Assistant Active</p>
            </div>
          </div>

          {/* Messages Body */}
          <div ref={scrollRef} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: '#fcfcfc' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ 
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}>
                <div style={{ 
                  padding: '16px 20px', borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px', 
                  background: m.role === 'user' ? 'var(--lime)' : '#fff',
                  border: m.role === 'user' ? 'none' : '1px solid #eee',
                  color: 'var(--black)', fontSize: '0.95rem', lineHeight: '1.6',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                }}>
                  {m.text.split('**').map((part, index) => 
                     index % 2 === 1 ? <strong key={index} style={{ color: 'var(--black)' }}>{part}</strong> : part
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: '#eee', padding: '10px 24px', borderRadius: '20px', color: '#666', fontSize: '0.8rem', fontStyle: 'italic' }}>
                ChatSage is analyzing...
              </div>
            )}
          </div>

          {/* Prompt Suggestions */}
          <div style={{ padding: '0 20px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => handleSend("Track my order")} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #eee', padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', cursor: 'pointer' }}>
               <Icon name="pin" size={14} /> Track Order
            </button>
            <button onClick={() => handleSend("Best blender for me?")} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #eee', padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', cursor: 'pointer' }}>
               <Icon name="trend" size={14} /> Recommendations
            </button>
            <button onClick={() => handleSend("Delivery time to Accra")} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #eee', padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', cursor: 'pointer' }}>
               <Icon name="shipping" size={14} /> Shipping Info
            </button>
          </div>

          {/* Input Footer */}
          <div style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..." 
              style={{ flex: 1, padding: '16px 24px', borderRadius: '16px', border: '1px solid #eee', outline: 'none', background: '#f8f8f8', fontSize: '0.9rem' }} 
            />
            <button onClick={() => handleSend()} style={{ 
              background: 'var(--black)', color: 'white', border: 'none', 
              width: '50px', height: '50px', borderRadius: '12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>↑</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
