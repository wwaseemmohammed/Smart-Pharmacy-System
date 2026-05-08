import { useState, useCallback } from 'react';

export function useCart() {
  const [cart, setCart] = useState({});

  const addToCart = useCallback((id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const changeQty = useCallback((id, delta) => {
    setCart(prev => {
      const next = { ...prev, [id]: (prev[id] ?? 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => { const n = { ...prev }; delete n[id]; return n; });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return { cart, addToCart, changeQty, removeFromCart, clearCart, cartCount };
}
