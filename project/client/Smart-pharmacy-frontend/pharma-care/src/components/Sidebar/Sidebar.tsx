import { CATEGORIES } from '../../data/medications';
import type { Filters } from '../../data/medications';
import styles from './Sidebar.module.css';

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function Sidebar({ filters, setFilters }: Props) {
  const { category, maxPrice, availability } = filters;

  const toggleAvail = (key: keyof Filters['availability']) => {
    setFilters(prev => ({
      ...prev,
      availability: { ...prev.availability, [key]: !prev.availability[key] },
    }));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <p className={styles.label}>Categories</p>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`${styles.catItem} ${category === c.id ? styles.active : ''}`}
            onClick={() => setFilters(prev => ({ ...prev, category: c.id }))}
          >
            <span>{c.label}</span>
            <span className={styles.count}>{c.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Price range</p>
        <div className={styles.priceWrap}>
          <div className={styles.priceLabels}>
            <span>$0</span>
            <span className={styles.priceVal}>${maxPrice}</span>
          </div>
          <input
            type="range" min={0} max={100} step={1} value={maxPrice}
            onChange={e => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          />
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Availability</p>
        {(
          [
            { key: 'inStock',     label: 'In stock'      },
            { key: 'lowStock',    label: 'Low stock'     },
            { key: 'outOfStock',  label: 'Out of stock'  },
          ] as const
        ).map(({ key, label }) => (
          <label key={key} className={styles.checkOpt}>
            <input type="checkbox" checked={availability[key]} onChange={() => toggleAvail(key)} />
            {label}
          </label>
        ))}
      </div>
    </aside>
  );
}
