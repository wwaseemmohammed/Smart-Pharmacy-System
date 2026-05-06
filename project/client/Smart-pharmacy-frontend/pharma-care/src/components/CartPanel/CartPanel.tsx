import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import type { Medication, CartState } from '../../data/medications';
import styles from './CartPanel.module.css';

interface Props {
  cart: CartState;
  meds: Medication[];
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export default function CartPanel({ cart, meds, onChangeQty, onRemove, onCheckout, onClose }: Props) {
  const entries = Object.entries(cart) as [string, number][];
  const total = entries.reduce((sum, [id, qty]) => {
    const m = meds.find(x => x.id === Number(id));
    return sum + (m ? m.price * qty : 0);
  }, 0);

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h3>Shopping cart</h3>
        <button className={styles.closeBtn} onClick={onClose}><X size={16} /></button>
      </div>

      <div className={styles.items}>
        {entries.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingBag size={32} strokeWidth={1.2} />
            <p>Your cart is empty</p>
          </div>
        ) : entries.map(([id, qty]) => {
          const m = meds.find(x => x.id === Number(id));
          if (!m) return null;
          return (
            <div key={id} className={styles.item}>
              <div className={styles.itemTop}>
                <span className={styles.itemName}>{m.name}</span>
                <button className={styles.removeBtn} onClick={() => onRemove(Number(id))}>Remove</button>
              </div>
              <div className={styles.itemBottom}>
                <div className={styles.qtyCtrl}>
                  <button onClick={() => onChangeQty(Number(id), -1)}><Minus size={11} /></button>
                  <span>{qty}</span>
                  <button onClick={() => onChangeQty(Number(id), 1)}><Plus size={11} /></button>
                </div>
                <span className={styles.itemPrice}>${(m.price * qty).toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className={styles.checkoutBtn} onClick={onCheckout} disabled={entries.length === 0}>
          Complete purchase
        </button>
      </div>
    </aside>
  );
}
