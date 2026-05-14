import { ShoppingCart, ClipboardList } from 'lucide-react';
import { CAT_LABELS, CAT_EMOJI, getStockStatus } from '../../data/medications';

export default function MedCard({ med, cartQty, onAdd }) {
  const status = getStockStatus(med.stock);

  const getCategoryBg = (cat) => {
    const colors = {
      pain: 'bg-coral-50',
      antibiotic: 'bg-blue-50',
      vitamin: 'bg-amber-50',
      cardiac: 'bg-teal-50',
      allergy: 'bg-gray-50'
    };
    return colors[cat] || 'bg-gray-50';
  };

  const price = Number(med.price);
  const priceLabel = Number.isFinite(price) ? `$${price.toFixed(2)}` : 'N/A';

  return (
    <article className="bg-bg-primary border border-border-light rounded-lg overflow-hidden transition-all hover:border-border-medium hover:-translate-y-0.5 hover:shadow-md">
      <div className={`h-27.5 flex items-center justify-center relative ${getCategoryBg(med.cat)} border border-white`}>
        <span className="text-[38px]">{CAT_EMOJI[med.cat]}</span>
        {med.isNew && <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-400 text-white">New</span>}
        {status === 'low' && <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-100">Low stock</span>}
        {status === 'out' && <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-coral-50 text-coral-800 border border-coral-100">Out of stock</span>}
      </div>

      <div className="p-2.5 pt-2.5 pb-3 border border-white">
        <p className="text-[11px] font-bold text-teal-600 mb-0.75 uppercase tracking-wider">{CAT_LABELS[med.cat]}</p>
        <h3 className="text-sm font-semibold text-text-primary mb-1.25 tracking-tight">{med.name}</h3>
        <p className="text-xs text-text-secondary leading-6 mb-1.5 line-clamp-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{med.desc}</p>

        <div className="flex items-start gap-1.25 text-xs text-text-secondary bg-bg-secondary rounded-sm p-1.25 p-1.25 mb-2.5 leading-5.5">
          <ClipboardList size={11} className="mt-0.25 flex-shrink-0 text-teal-400" />
          <span>{med.usage}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-teal-600 tracking-tight">{priceLabel}</span>
          <button
            className={`flex items-center gap-1.25 py-1.25 px-3 bg-teal-400 text-white border-none rounded-md text-xs font-semibold transition-colors ${
              status === 'out' ? 'bg-bg-secondary text-text-hint cursor-not-allowed' : 
              cartQty ? 'bg-teal-50 text-teal-700 border border-teal-950' : 
              'hover:bg-teal-600'
            }`}
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
