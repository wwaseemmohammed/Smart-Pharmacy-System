import { useState } from 'react';
import Topbar from './components/Topbar/Topbar';
import UserView from './components/UserView/UserView';
import TeamPage from './components/TeamPage/TeamPage';
import { ToastProvider, useToast } from './components/Toast/Toast';
import { useCart } from './hooks/useCart';

function AppInner() {
  const [view, setView] = useState('user');
  const [cartOpen, setCartOpen] = useState(false);

  const toast = useToast();
  const { cart, addToCart, changeQty, removeFromCart, clearCart, cartCount } = useCart();

  /* handlers */
  const handleAddToCart = (id) => {
    addToCart(id);
    toast('Added to cart');
  };

  const handleCheckout = () => {
    clearCart();
    toast('Purchase completed successfully!');
  };

  
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar
        view={view}
        setView={setView}
        cartCount={cartCount}
        onCartToggle={() => setCartOpen(o => !o)}
      />

      {view === 'user' ? (
        <UserView
          cart={cart}
          cartOpen={cartOpen}
          onAdd={handleAddToCart}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
          onCartClose={() => setCartOpen(false)}
        />
      ) : (
        <TeamPage />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
