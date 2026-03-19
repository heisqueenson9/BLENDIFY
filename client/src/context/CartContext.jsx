import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('blendify_cart');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('blendify_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id || i._id === product._id);
      if (existing) {
        return prev.map(i =>
          (i.id === product.id || i._id === product._id)
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(i => i.id !== productId && i._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setItems(prev => prev.map(i =>
      (i.id === productId || i._id === productId) ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
