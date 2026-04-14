import { useState, useCallback } from 'react';
import type { CartState } from '../data/medications';

export function useCart() {
  const [cart, setCart] = useState<CartState>({});

  const addToCart = useCallback((id: number) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCart(prev => {
      const next = { ...prev, [id]: (prev[id] ?? 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => { const n = { ...prev }; delete n[id]; return n; });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return { cart, addToCart, changeQty, removeFromCart, clearCart, cartCount };
}
