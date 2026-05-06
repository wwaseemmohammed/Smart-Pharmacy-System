import { ShoppingCart, Pill } from 'lucide-react';
import styles from './Topbar.module.css';

type View = 'user' | 'pharmacist';

interface Props {
  view: View;
  setView: (v: View) => void;
  cartCount: number;
  onCartToggle: () => void;
}

export default function Topbar({ view, setView, cartCount, onCartToggle }: Props) {
  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}><Pill size={16} color="white" /></div>
        <span>PharmaCare</span>
      </div>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${view === 'user' ? styles.active : ''}`}
          onClick={() => setView('user')}
        >
          Browse
        </button>
        <button
          className={`${styles.tab} ${view === 'pharmacist' ? styles.active : ''}`}
          onClick={() => setView('pharmacist')}
        >
          Pharmacist
        </button>
      </nav>

      <button className={styles.cartBtn} onClick={onCartToggle}>
        <ShoppingCart size={15} />
        <span>Cart</span>
        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
      </button>
    </header>
  );
}
