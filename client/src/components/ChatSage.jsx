import { useState, useEffect, useRef } from 'react';

const CHAT_LOGIC = {
  greetings: ["hello", "hi", "hey", "help"],
  products: ["best", "recommend", "portable", "smart", "commercial", "choose"],
  shipping: ["shipping", "deliver", "arrive", "time", "cost"],
  returns: ["return", "refund", "exchange", "broken", "faulty"],
  prices: ["price", "cost", "expensive", "cheapest"],
};

export default function ChatSage() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Welcome! Need help choosing the perfect blender?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = "I'm sorry, I didn't understand. Please contact our support team at support@blendify.com.";
      
      if (CHAT_LOGIC.greetings.some(w => userMsg.includes(w))) {
        response = "Hello! I am ChatSage, your AI nutrition assistant. How can I help you blend today?";
      } else if (CHAT_LOGIC.products.some(w => userMsg.includes(w))) {
        response = "For simple smoothies, the PureSip (Portable) is our best seller. For heavy commercial use, check out the PowerBlend Pro!";
      } else if (CHAT_LOGIC.shipping.some(w => userMsg.includes(w))) {
        response = "We fulfill orders in 2–4 business days. Standard shipping takes 3–5 days across the country.";
      } else if (CHAT_LOGIC.returns.some(w => userMsg.includes(w))) {
        response = "We have a 7-day hassle-free return policy. Items must be in original packaging.";
      } else if (CHAT_LOGIC.prices.some(w => userMsg.includes(w))) {
        response = "Our blenders start at 210L for the Mini and go up to 750L for Industrial models.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          background: 'var(--lime)',
          boxShadow: '0 8px 32px rgba(197, 231, 16, 0.4)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'var(--transition)'
        }}
        className="hover-lift"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--black)" strokeWidth="2.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '380px',
          height: '520px',
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 12px 64px rgba(0,0,0,0.15)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--gray-100)',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{ 
            background: 'var(--black)', 
            padding: '24px', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div>
              <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>CHATSAGE <span>AI</span></h4>
              <span style={{ fontSize: '0.75rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--lime)', borderRadius: '4px' }}></span> Online Assistant
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', opacity: 0.5, cursor: 'pointer' }}>✕</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ 
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}>
                <div style={{ 
                  padding: '12px 16px', 
                  borderRadius: 'var(--radius-md)', 
                  background: m.role === 'user' ? 'var(--lime)' : 'var(--gray-50)',
                  color: 'var(--black)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  fontWeight: m.role === 'user' ? '600' : '400'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--gray-50)', padding: '8px 16px', borderRadius: 'var(--radius-full)', opacity: 0.7, fontSize: '0.8rem' }}>
                ChatSage is typing...
              </div>
            )}
          </div>

          {/* Quick Buttons */}
          <div style={{ display: 'flex', gap: '8px', padding: '0 24px 16px', flexWrap: 'wrap' }}>
            <button onClick={() => {setInput("View Products"); handleSend();}} style={{ fontSize: '0.75rem', padding: '6px 12px', borderRadius: '12px', border: '1px solid var(--gray-200)', background: 'white' }}>View Products</button>
            <button onClick={() => {setInput("Track Order"); handleSend();}} style={{ fontSize: '0.75rem', padding: '6px 12px', borderRadius: '12px', border: '1px solid var(--gray-200)', background: 'white' }}>Track Order</button>
          </div>

          {/* Input Area */}
          <div style={{ padding: '24px', borderTop: '1px solid var(--gray-100)', display: 'flex', gap: '12px' }}>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..." 
              style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', outline: 'none' }} 
            />
            <button onClick={handleSend} style={{ background: 'var(--black)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>↑</button>
          </div>
        </div>
      )}
    </>
  );
}
