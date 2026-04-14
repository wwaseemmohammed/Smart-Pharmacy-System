import { ShoppingCart, ClipboardList } from 'lucide-react';
import { CAT_LABELS, CAT_EMOJI, getStockStatus } from '../../data/medications';
import type { Medication } from '../../data/medications';
import styles from './MedCard.module.css';

interface Props {
  med: Medication;
  cartQty: number;
  onAdd: (id: number) => void;
}

export default function MedCard({ med, cartQty, onAdd }: Props) {
  const status = getStockStatus(med.stock);

  return (
    <article className={styles.card}>
      <div className={`${styles.imgWrap} ${styles[`cat_${med.cat}`]}`}>
        <span className={styles.emoji}>{CAT_EMOJI[med.cat]}</span>
        {med.isNew  && <span className={`${styles.badge} ${styles.badgeNew}`}>New</span>}
        {status === 'low' && <span className={`${styles.badge} ${styles.badgeLow}`}>Low stock</span>}
        {status === 'out' && <span className={`${styles.badge} ${styles.badgeOut}`}>Out of stock</span>}
      </div>

      <div className={styles.body}>
        <p className={styles.catTag}>{CAT_LABELS[med.cat]}</p>
        <h3 className={styles.name}>{med.name}</h3>
        <p className={styles.desc}>{med.desc}</p>

        <div className={styles.usageRow}>
          <ClipboardList size={11} />
          <span>{med.usage}</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>${med.price.toFixed(2)}</span>
          <button
            className={`${styles.addBtn} ${status === 'out' ? styles.disabled : ''} ${cartQty ? styles.inCart : ''}`}
            onClick={() => status !== 'out' && onAdd(med.id)}
            disabled={status === 'out'}
          >
            {status === 'out' ? (
              'Unavailable'
            ) : cartQty ? (
              <><ShoppingCart size={12} />{cartQty} in cart</>
            ) : '+ Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
