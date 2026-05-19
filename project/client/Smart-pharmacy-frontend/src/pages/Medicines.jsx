import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Sidebar from '../component/Sidebar/Sidebar';
import MedCard from '../component/MedCard/MedCard';
import CartPanel from '../component/CartPanel/CartPanel';
import { INITIAL_MEDS, SORT_OPTS } from '../data/medications';
import { useMedicines } from '../hooks/useApi';
import { useCart } from '../hooks/useCart';
import { useToast } from '../component/Toast/Toast';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function MedicinesPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');
  const [cartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 50,
    availability: { inStock: true, lowStock: true, outOfStock: false },
  });

  const { medicines, loading, error } = useMedicines(search, filters.category, sort);
  const { cart, addToCart, changeQty, removeFromCart, clearCart, cartCount } = useCart();
  const toast = useToast();
  const { user, isLoggedIn } = useAuth();

  const handleAddToCart = (id) => {
    addToCart(id);
    setCartOpen(true);
    toast('Item added to cart', 'success');
  };

  const handleCheckout = async () => {
    const entries = Object.entries(cart);
    if (!entries.length) {
      toast('Your cart is empty', 'error');
      return;
    }
    if (!isLoggedIn) {
      toast('Please log in to send an approval request', 'error');
      return;
    }

    const items = entries.map(([id, qty]) => ({ medicine_id: Number(id), quantity: qty }));
    try {
      const orderPayload = {
        customer_name: user.name || 'Customer',
        customer_email: user.email || null,
        customer_phone: user.phone || null,
        address: user.address || 'Not provided',
        payment_method: 'Cash',
        notes: 'Customer purchase approval request',
        items,
      };
      const { data } = await api.post('/orders', orderPayload);
      toast('Approval request sent to admin', 'success');
      clearCart();
      setCartOpen(false);
      console.log('Order request sent:', data);
    } catch (err) {
      toast(err.response?.data?.message || err.message || 'Failed to submit order', 'error');
    }
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const med = medicines.find(m => m.id === Number(id));
    return sum + (med ? med.price * qty : 0);
  }, 0);

  // Filter medicines based on local filters (price, availability)
  const filtered = medicines.filter(m => {
    if (m.price > filters.maxPrice) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1 pt-16 sm:pt-18 md:pt-20" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar - hidden on mobile, visible on md and up */}
        <aside className="hidden md:block md:w-56 lg:w-64 flex-shrink-0 border-r border-gray-200 bg-gray-50">
          <div className="sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto">
            <Sidebar filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 overflow-y-auto">
          {/* Search and Controls */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <div className="flex-1 min-w-0 relative">
                <Search size={14} className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search medications..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full py-2 sm:py-2.5 px-3 sm:px-4 pl-8 sm:pl-10 border border-gray-300 rounded-lg sm:rounded-xl bg-white text-xs sm:text-sm text-gray-900 outline-none transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
                />
              </div>

              <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="py-2 sm:py-2.5 px-2 sm:px-3 border border-gray-300 rounded-lg sm:rounded-xl bg-white text-xs sm:text-sm text-gray-900 cursor-pointer outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 whitespace-nowrap"
                >
                  {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>

                <button
                  type="button"
                  onClick={() => setCartOpen(prev => !prev)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm font-semibold transition-colors flex-shrink-0"
                >
                  <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white text-teal-600 text-[10px] sm:text-[11px] font-bold">{cartCount}</span>
                  <span className="hidden sm:inline">Cart</span>
                  🛒
                  <span className="hidden sm:inline text-[11px] text-teal-100">${cartTotal.toFixed(2)}</span>
                </button>
              </div>
            </div>

            {/* Mobile Sidebar Toggle - visible on mobile only */}
            <details className="md:hidden group">
              <summary className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm font-medium text-gray-900">
                🎚️ Filters
                <span className="ml-auto">▼</span>
              </summary>
              <div className="mt-2 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white">
                <Sidebar filters={filters} setFilters={setFilters} />
              </div>
            </details>
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
            <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">📦 {filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center gap-2.5 p-8 sm:p-12 md:p-16 text-gray-400 text-xs sm:text-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-teal-300 border-t-teal-600"></div>
              <p>Loading medicines...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-2.5 p-8 sm:p-12 md:p-16 text-red-600 text-xs sm:text-sm">
              <p>❌ Error loading medicines: {error}</p>
              <p>Using local data as fallback</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2.5 p-8 sm:p-12 md:p-16 text-gray-400 text-xs sm:text-sm">
              <SlidersHorizontal size={36} strokeWidth={1.2} />
              <p>No medications match your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map(m => (
                <MedCard key={m.id} med={m} cartQty={cart[m.id] ?? 0} onAdd={handleAddToCart} />
              ))}
            </div>
          )}
        </main>

        {/* Cart Panel */}
        {cartOpen && (
          <CartPanel
            cart={cart}
            meds={medicines.length > 0 ? medicines : INITIAL_MEDS}
            onChangeQty={changeQty}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
            onClose={() => setCartOpen(false)}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
