import { useState } from 'react';
import Topbar from './components/Topbar/Topbar';
import UserView from './components/UserView/UserView';
import PharmacistView from './components/PharmacistView/PharmacistView';
import { ToastProvider, useToast } from './components/Toast/Toast';
import { useCart } from './hooks/useCart';
import { useMedications } from './hooks/useMedications';

type View = 'user' | 'pharmacist';

function AppInner() {
  const [view,     setView]     = useState<View>('user');
  const [cartOpen, setCartOpen] = useState(false);

  const toast = useToast();
  const { meds, addMed, updateMed, deleteMed, updateStock } = useMedications();
  const { cart, addToCart, changeQty, removeFromCart, clearCart, cartCount } = useCart();

  /* handlers */
  const handleAddToCart = (id: number) => {
    addToCart(id);
    toast('Added to cart');
  };

  const handleCheckout = () => {
    clearCart();
    toast('Purchase completed successfully!');
  };

  const handleAddMed = (data: Parameters<typeof addMed>[0]) => {
    addMed(data);
    toast('Medication added');
  };

  const handleUpdateMed = (id: number, data: Parameters<typeof updateMed>[1]) => {
    updateMed(id, data);
    toast('Medication updated');
  };

  const handleDeleteMed = (id: number) => {
    deleteMed(id);
    removeFromCart(id);
    toast('Medication deleted', 'error');
  };

  const handleUpdateStock = (id: number, stock: number) => {
    updateStock(id, stock);
    toast('Stock updated');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar
        view={view}
        setView={setView}
        cartCount={cartCount}
        onCartToggle={() => setCartOpen(o => !o)}
      />

      {view === 'user' ? (
        <UserView
          meds={meds}
          cart={cart}
          cartOpen={cartOpen}
          onAdd={handleAddToCart}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
          onCartClose={() => setCartOpen(false)}
        />
      ) : (
        <PharmacistView
          meds={meds}
          onAdd={handleAddMed}
          onUpdate={handleUpdateMed}
          onDelete={handleDeleteMed}
          onUpdateStock={handleUpdateStock}
        />
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
