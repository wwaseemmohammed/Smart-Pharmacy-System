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
  const { cart, addToCart, changeQty, removeFromCart, clearCart } = useCart();

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  const handleCheckout = () => {
    clearCart();
  };

  // Filter medicines based on local filters (price, availability)
  const filtered = medicines.filter(m => {
    if (m.price > filters.maxPrice) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-1 pt-20" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Sidebar filters={filters} setFilters={setFilters} />

        <main className="flex-1 p-5 pt-5 px-6 overflow-y-auto min-w-0">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex-1 relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-hint pointer-events-none" />
              <input
                type="text"
                placeholder="Search medications..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full py-2 px-3 pl-8 border border-border-medium rounded-md bg-bg-primary text-xs text-text-primary outline-none transition-all focus:border-teal-400 focus:shadow-[0_0_0_3px_var(--teal-50)]"
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="py-2 px-2.5 border border-border-medium rounded-md bg-bg-primary text-xs text-text-primary cursor-pointer outline-none whitespace-nowrap"
            >
              {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <span className="text-xs text-text-hint whitespace-nowrap">{filtered.length} results</span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center gap-2.5 p-16 text-text-hint text-xs">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
              <p>Loading medicines...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-2.5 p-16 text-red-500 text-xs">
              <p>Error loading medicines: {error}</p>
              <p>Using local data as fallback</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2.5 p-16 text-text-hint text-xs">
              <SlidersHorizontal size={32} strokeWidth={1.2} />
              <p>No medications match your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(195px,1fr))] gap-3.5">
              {filtered.map(m => (
                <MedCard key={m.id} med={m} cartQty={cart[m.id] ?? 0} onAdd={handleAddToCart} />
              ))}
            </div>
          )}
        </main>

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
