import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CAT_LABELS } from '../../data/medications';
import type { Medication, MedFormData, Category } from '../../data/medications';
import styles from './MedModal.module.css';

interface Props {
  med: Medication | null;
  onSave: (data: MedFormData) => void;
  onClose: () => void;
}

const EMPTY: MedFormData = { name: '', cat: 'pain', price: 0, stock: 0, desc: '', usage: '' };

export default function MedModal({ med, onSave, onClose }: Props) {
  const [form, setForm] = useState<MedFormData>(EMPTY);

  useEffect(() => {
    if (med) {
      const { name, cat, price, stock, desc, usage } = med;
      setForm({ name, cat, price, stock, desc, usage });
    } else {
      setForm(EMPTY);
    }
  }, [med]);

  const set = <K extends keyof MedFormData>(k: K, v: MedFormData[K]) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim() || !form.price) return;
    onSave({ ...form, name: form.name.trim(), desc: form.desc.trim(), usage: form.usage.trim() });
  };

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.head}>
          <h3>{med ? 'Edit medication' : 'Add medication'}</h3>
          <button className={styles.closeBtn} onClick={onClose}><X size={16} /></button>
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Name <span className={styles.req}>*</span></label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Amoxicillin 500mg" />
            </div>
            <div className={styles.field}>
              <label>Category</label>
              <select value={form.cat} onChange={e => set('cat', e.target.value as Category)}>
                {(Object.entries(CAT_LABELS) as [Category, string][]).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Price ($) <span className={styles.req}>*</span></label>
              <input type="number" step="0.01" min="0" value={form.price || ''} onChange={e => set('price', parseFloat(e.target.value) || 0)} placeholder="0.00" />
            </div>
            <div className={styles.field}>
              <label>Stock quantity</label>
              <input type="number" min="0" value={form.stock || ''} onChange={e => set('stock', parseInt(e.target.value) || 0)} placeholder="0" />
            </div>
          </div>

          <div className={styles.field}>
            <label>Description</label>
            <textarea value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Brief description..." rows={3} />
          </div>

          <div className={styles.field}>
            <label>Usage instructions</label>
            <input value={form.usage} onChange={e => set('usage', e.target.value)} placeholder="e.g. Take 1 tablet twice daily" />
          </div>
        </div>

        <div className={styles.foot}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSave}>
            {med ? 'Save changes' : 'Add medication'}
          </button>
        </div>
      </div>
    </div>
  );
}
