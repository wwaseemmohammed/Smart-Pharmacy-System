import { CATEGORIES } from '../../data/medications';

export default function Sidebar({ filters, setFilters }) {
  const { category, maxPrice, availability } = filters;

  const toggleAvail = (key) => {
    setFilters(prev => ({
      ...prev,
      availability: { ...prev.availability, [key]: !prev.availability[key] },
    }));
  };

  return (
    <aside className="w-55 min-w-55 bg-bg-primary border-r border-border-light overflow-y-auto p-0 pt-0 pb-0 flex-shrink-0" style={{ height: 'calc(100vh - 56px)', position: 'sticky', top: '56px' }}>
      <div className="px-3 mb-7">
        <p className="text-[11px] font-bold text-text-hint tracking-widest uppercase px-1.25 mb-1.5">Categories</p>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`flex items-center justify-between w-full py-1.5 px-2.5 rounded-md border-none bg-transparent text-xs text-text-secondary text-left transition-all ${
              category === c.id ? 'bg-teal-50 text-teal-600 font-semibold' : 'hover:bg-bg-secondary hover:text-text-primary'
            }`}
            onClick={() => setFilters(prev => ({ ...prev, category: c.id }))}
          >
            <span>{c.label}</span>
            <span className={`text-[11px] px-1.75 py-0.25 rounded-full ${
              category === c.id ? 'bg-teal-100 text-teal-600' : 'bg-bg-secondary text-text-secondary'
            }`}>{c.count}</span>
          </button>
        ))}
      </div>

      <div className="px-3 mb-7">
        <p className="text-[11px] font-bold text-text-hint tracking-widest uppercase px-1.25 mb-1.5">Price range</p>
        <div className="px-1.25">
          <div className="flex justify-between text-xs text-text-secondary mb-2">
            <span>$0</span>
            <span className="font-semibold text-teal-600">${maxPrice}</span>
          </div>
          <input
            type="range" min={0} max={100} step={1} value={maxPrice}
            onChange={e => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-teal-400"
          />
        </div>
      </div>

      <div className="px-3">
        <p className="text-[11px] font-bold text-text-hint tracking-widest uppercase px-1.25 mb-1.5">Availability</p>
        {(
          [
            { key: 'inStock',     label: 'In stock'      },
            { key: 'lowStock',    label: 'Low stock'     },
            { key: 'outOfStock',  label: 'Out of stock'  },
          ]
        ).map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer py-1 px-1.25 rounded-sm transition-colors hover:bg-bg-secondary">
            <input type="checkbox" checked={availability[key]} onChange={() => toggleAvail(key)} className="accent-teal-400" />
            {label}
          </label>
        ))}
      </div>
    </aside>
  );
}
