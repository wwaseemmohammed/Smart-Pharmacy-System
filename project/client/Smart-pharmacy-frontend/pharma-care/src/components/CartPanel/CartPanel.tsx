import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import type { Medication, CartState } from '../../data/medications';
import styles from './CartPanel.module.css';

// رقم واتساب الصيدلية — يمكن تغييره
const PHARMACY_WA = '970591000001';

const WaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface Props {
  cart: CartState;
  meds: Medication[];
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}

function buildWaMessage(cart: CartState, meds: Medication[], total: number): string {
  const lines: string[] = [];
  lines.push('🛒 *طلب أدوية جديد — PharmaCare*');
  lines.push('─────────────────────');

  const entries = Object.entries(cart) as [string, number][];
  entries.forEach(([id, qty]) => {
    const m = meds.find(x => x.id === Number(id));
    if (!m) return;
    lines.push(`💊 *${m.name}*`);
    lines.push(`   الكمية: ${qty}  |  السعر: $${(m.price * qty).toFixed(2)}`);
  });

  lines.push('─────────────────────');
  lines.push(`💰 *الإجمالي: $${total.toFixed(2)}*`);
  lines.push('');
  lines.push('يرجى تأكيد الطلب وإرسال عنوان التوصيل. شكراً 🙏');

  return encodeURIComponent(lines.join('\n'));
}

export default function CartPanel({ cart, meds, onChangeQty, onRemove, onCheckout, onClose }: Props) {
  const entries = Object.entries(cart) as [string, number][];
  const total = entries.reduce((sum, [id, qty]) => {
    const m = meds.find(x => x.id === Number(id));
    return sum + (m ? m.price * qty : 0);
  }, 0);

  const isEmpty = entries.length === 0;

  const handleWhatsApp = () => {
    const msg = buildWaMessage(cart, meds, total);
    window.open(`https://wa.me/${PHARMACY_WA}?text=${msg}`, '_blank');
    onCheckout(); // clear cart after sending
  };

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h3>Shopping cart</h3>
        <button className={styles.closeBtn} onClick={onClose}><X size={16} /></button>
      </div>

      <div className={styles.items}>
        {isEmpty ? (
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

        {/* WhatsApp order button */}
        <button
          className={styles.waBtn}
          onClick={handleWhatsApp}
          disabled={isEmpty}
        >
          <WaIcon />
          اطلب عبر واتساب
        </button>

        {/* Classic checkout */}
        <button
          className={styles.checkoutBtn}
          onClick={onCheckout}
          disabled={isEmpty}
        >
          Complete purchase
        </button>
      </div>
    </aside>
  );
}
