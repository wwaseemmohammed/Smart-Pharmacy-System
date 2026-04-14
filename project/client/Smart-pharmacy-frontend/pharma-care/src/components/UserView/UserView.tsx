import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';
import MedCard from '../MedCard/MedCard';
import CartPanel from '../CartPanel/CartPanel';
import { useFilteredMeds } from '../../hooks/useMedications';
import { SORT_OPTS } from '../../data/medications';
import type { Medication, CartState, Filters, SortOption } from '../../data/medications';
import styles from './UserView.module.css';

interface Props {
  meds: Medication[];
  cart: CartState;
  cartOpen: boolean;
  onAdd: (id: number) => void;
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onCartClose: () => void;
}

export default function UserView({ meds, cart, cartOpen, onAdd, onChangeQty, onRemove, onCheckout, onCartClose }: Props) {
  const [search, setSearch] = useState('');
  const [sort, setSort]     = useState<SortOption>('popular');
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    maxPrice: 50,
    availability: { inStock: true, lowStock: true, outOfStock: false },
  });

  const filtered = useFilteredMeds(meds, { ...filters, search, sort });

  return (
    <div className={styles.layout}>
      <Sidebar filters={filters} setFilters={setFilters} />

      <main className={styles.main}>
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <Search size={13} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search medications..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortOption)}
            className={styles.sortSelect}
          >
            {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <span className={styles.count}>{filtered.length} results</span>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <SlidersHorizontal size={32} strokeWidth={1.2} />
            <p>No medications match your filters</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(m => (
              <MedCard key={m.id} med={m} cartQty={cart[m.id] ?? 0} onAdd={onAdd} />
            ))}
          </div>
        )}
      </main>

      {cartOpen && (
        <CartPanel
          cart={cart}
          meds={meds}
          onChangeQty={onChangeQty}
          onRemove={onRemove}
          onCheckout={onCheckout}
          onClose={onCartClose}
        />
      )}
    </div>
  );
}
