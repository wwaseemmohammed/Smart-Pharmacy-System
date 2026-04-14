import { useState } from 'react';
import { X, Package } from 'lucide-react';
import type { Medication } from '../../data/medications';
import styles from './StockModal.module.css';

interface Props {
  med: Medication;
  onSave: (stock: number) => void;
  onClose: () => void;
}

export default function StockModal({ med, onSave, onClose }: Props) {
  const [value, setValue] = useState<number>(med.stock);

  const handleChange = (raw: string) => {
    const n = parseInt(raw);
    setValue(isNaN(n) ? 0 : Math.max(0, n));
  };

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <Package size={16} color="var(--teal-400)" />
            <h3>Update stock</h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={16} /></button>
        </div>

        <div className={styles.body}>
          <p className={styles.medName}>{med.name}</p>
          <div className={styles.field}>
            <label>New quantity</label>
            <input
              type="number"
              min={0}
              value={value}
              onChange={e => handleChange(e.target.value)}
              autoFocus
            />
          </div>
          <p className={styles.hint}>
            Current stock: <strong>{med.stock}</strong> units
          </p>
        </div>

        <div className={styles.foot}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={() => onSave(value)}>Update stock</button>
        </div>
      </div>
    </div>
  );
}
