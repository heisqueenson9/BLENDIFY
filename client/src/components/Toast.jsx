import { useState, useEffect } from 'react';

function Toast() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const { message, type = 'success' } = e.detail;
      const id = Date.now();
      setMessages(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== id));
      }, 3000);
    };
    window.addEventListener('show-toast', (e) => handleToast(e));
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  if (messages.length === 0) return null;

  return (
    <div className="toast-container">
      {messages.map(m => (
        <div key={m.id} className={`toast ${m.type}`}>
          {m.message}
        </div>
      ))}
    </div>
  );
}

export function showToast(message, type = 'success') {
  const event = new CustomEvent('show-toast', { detail: { message, type } });
  window.dispatchEvent(event);
}

export default Toast;
