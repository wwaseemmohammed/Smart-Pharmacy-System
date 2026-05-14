import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';
import MedCard from '../MedCard/MedCard';
import CartPanel from '../CartPanel/CartPanel';
import { INITIAL_MEDS, SORT_OPTS } from '../../data/medications';

export default function UserView({ cart, cartOpen, onAdd, onChangeQty, onRemove, onCheckout, onCartClose }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 50,
    availability: { inStock: true, lowStock: true, outOfStock: false },
  });

  const filtered = INITIAL_MEDS.filter(m => {
    if (filters.category !== 'all' && m.cat !== filters.category) return false;
    if (m.price > filters.maxPrice) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'newest')     return Number(b.isNew) - Number(a.isNew);
    return b.popular - a.popular;
  });

  return (
    <div className="flex flex-1" style={{ minHeight: 'calc(100vh - 56px)' }}>
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

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2.5 p-16 text-text-hint text-xs">
            <SlidersHorizontal size={32} strokeWidth={1.2} />
            <p>No medications match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(195px,1fr))] gap-3.5">
            {filtered.map(m => (
              <MedCard key={m.id} med={m} cartQty={cart[m.id] ?? 0} onAdd={onAdd} />
            ))}
          </div>
        )}
      </main>

      {cartOpen && (
        <CartPanel
          cart={cart}
          meds={INITIAL_MEDS}
          onChangeQty={onChangeQty}
          onRemove={onRemove}
          onCheckout={onCheckout}
          onClose={onCartClose}
        />
      )}
    </div>
  );
}
