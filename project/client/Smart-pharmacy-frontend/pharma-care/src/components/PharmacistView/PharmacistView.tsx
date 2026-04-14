import { useState } from 'react';
import { Plus, Pencil, Trash2, Package, TrendingUp, AlertTriangle, XCircle } from 'lucide-react';
import { CAT_LABELS, getStockStatus } from '../../data/medications';
import type { Medication, MedFormData } from '../../data/medications';
import MedModal from '../MedModal/MedModal';
import StockModal from '../StockModal/StockModal';
import styles from './PharmacistView.module.css';

interface Props {
  meds: Medication[];
  onAdd: (data: MedFormData) => void;
  onUpdate: (id: number, data: MedFormData) => void;
  onDelete: (id: number) => void;
  onUpdateStock: (id: number, stock: number) => void;
}

// ── Stat card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  colorVar: string;   // e.g. 'teal' | 'amber' | 'coral'
}

function StatCard({ label, value, icon: Icon, colorVar }: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div
        className={styles.statIcon}
        style={{
          background: `var(--${colorVar}-50)`,
          color: `var(--${colorVar}-600, var(--${colorVar}-400))`,
        }}
      >
        <Icon size={16} />
      </div>
      <div>
        <p className={styles.statLabel}>{label}</p>
        <p
          className={styles.statVal}
          style={{ color: `var(--${colorVar}-600, var(--${colorVar}-400))` }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
const STATUS_META = {
  ok:  { label: 'In stock',      cls: 'ok'  },
  low: { label: 'Low stock',     cls: 'low' },
  out: { label: 'Out of stock',  cls: 'out' },
} as const;

// ── Main component ────────────────────────────────────────────────────────────
export default function PharmacistView({ meds, onAdd, onUpdate, onDelete, onUpdateStock }: Props) {
  const [addOpen,        setAddOpen]        = useState(false);
  const [editMed,        setEditMed]        = useState<Medication | null>(null);
  const [stockMed,       setStockMed]       = useState<Medication | null>(null);
  const [deleteConfirm,  setDeleteConfirm]  = useState<Medication | null>(null);

  const total    = meds.length;
  const inStock  = meds.filter(m => getStockStatus(m.stock) === 'ok').length;
  const low      = meds.filter(m => getStockStatus(m.stock) === 'low').length;
  const out      = meds.filter(m => getStockStatus(m.stock) === 'out').length;

  return (
    <div className={styles.view}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Medication management</h2>
          <p className={styles.subtitle}>Manage inventory, prices and stock levels</p>
        </div>
        <button className={styles.addBtn} onClick={() => setAddOpen(true)}>
          <Plus size={15} />
          Add medication
        </button>
      </div>

      {/* ── Stats ── */}
      <div className={styles.stats}>
        <StatCard label="Total"         value={total}   icon={TrendingUp}    colorVar="teal"  />
        <StatCard label="In stock"      value={inStock} icon={Package}       colorVar="teal"  />
        <StatCard label="Low stock"     value={low}     icon={AlertTriangle} colorVar="amber" />
        <StatCard label="Out of stock"  value={out}     icon={XCircle}       colorVar="coral" />
      </div>

      {/* ── Table ── */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Medication</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meds.map(m => {
              const st   = getStockStatus(m.stock);
              const meta = STATUS_META[st];
              return (
                <tr key={m.id} className={styles.row}>
                  <td>
                    <div className={styles.nameCell}>
                      <span className={styles.dot} data-status={st} />
                      <span className={styles.medName}>{m.name}</span>
                      {m.isNew && <span className={styles.newPill}>New</span>}
                    </div>
                  </td>
                  <td className={styles.secondary}>{CAT_LABELS[m.cat]}</td>
                  <td className={styles.priceCell}>${m.price.toFixed(2)}</td>
                  <td className={styles.secondary}>{m.stock}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[`badge_${meta.cls}`]}`}>
                      {meta.label}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actBtn} ${styles.actEdit}`}  onClick={() => setEditMed(m)}>
                        <Pencil size={11} /> Edit
                      </button>
                      <button className={`${styles.actBtn} ${styles.actStock}`} onClick={() => setStockMed(m)}>
                        <Package size={11} /> Stock
                      </button>
                      <button className={`${styles.actBtn} ${styles.actDel}`}   onClick={() => setDeleteConfirm(m)}>
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Add modal ── */}
      {addOpen && (
        <MedModal
          med={null}
          onSave={data => { onAdd(data); setAddOpen(false); }}
          onClose={() => setAddOpen(false)}
        />
      )}

      {/* ── Edit modal ── */}
      {editMed && (
        <MedModal
          med={editMed}
          onSave={data => { onUpdate(editMed.id, data); setEditMed(null); }}
          onClose={() => setEditMed(null)}
        />
      )}

      {/* ── Stock modal ── */}
      {stockMed && (
        <StockModal
          med={stockMed}
          onSave={val => { onUpdateStock(stockMed.id, val); setStockMed(null); }}
          onClose={() => setStockMed(null)}
        />
      )}

      {/* ── Delete confirm ── */}
      {deleteConfirm && (
        <div
          className={styles.deleteOverlay}
          onClick={e => e.target === e.currentTarget && setDeleteConfirm(null)}
        >
          <div className={styles.deleteModal}>
            <div className={styles.deleteIcon}><Trash2 size={20} /></div>
            <h3>Delete medication</h3>
            <p>
              Are you sure you want to delete{' '}
              <strong>{deleteConfirm.name}</strong>?{' '}
              This action cannot be undone.
            </p>
            <div className={styles.deleteFoot}>
              <button className={styles.cancelBtn} onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => { onDelete(deleteConfirm.id); setDeleteConfirm(null); }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
