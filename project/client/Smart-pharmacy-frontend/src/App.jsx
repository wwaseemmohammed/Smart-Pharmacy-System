import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Booking from './pages/Booking';
import AdminLayout from './component/AdminLayout';
import DashboardOverview from './Admin/DashboardOverview';
import Medicines from './Admin/Medicines';
import Orders from './Admin/Orders';
import Appointments from './Admin/Appointments';
import Doctors from './Admin/Doctors';
import Users from './Admin/Users';
import Suppliers from './Admin/Suppliers';

import Navbar from './component/Navbar';
import UserView from './components/UserView/UserView';
import TeamPage from './components/TeamPage/TeamPage';
import { ToastProvider, useToast } from './components/Toast/Toast';
import { useCart } from './hooks/useCart';

function StoreFront({ initialView = 'user' }) {
  const [view, setView] = useState(initialView);
  const [cartOpen, setCartOpen] = useState(false);

  const toast = useToast();
  const { cart, addToCart, changeQty, removeFromCart, clearCart, cartCount } = useCart();

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
      <Navbar />

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

function AppInner() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<StoreFront initialView="user" />} />
        <Route path="/medicines" element={<StoreFront initialView="user" />} />
        <Route path="/doctors" element={<StoreFront initialView="team" />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="medicines" element={<Medicines />} />
          <Route path="orders" element={<Orders />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="users" element={<Users />} />
          <Route path="suppliers" element={<Suppliers />} />
        </Route>
      </Routes>
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
