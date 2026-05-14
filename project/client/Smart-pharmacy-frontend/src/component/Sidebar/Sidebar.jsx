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
    <aside className="w-72 min-w-72 bg-bg-primary border-r border-border-light overflow-y-auto p-0 pt-0 pb-0 flex-shrink-0" style={{ height: 'calc(100vh - 56px)', position: 'sticky', top: '56px' }}>
      <div className="px-5 mb-8">
        <p className="text-[13px] font-bold text-emerald-600 tracking-widest uppercase px-2 mb-3">Categories</p>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-lg border-none bg-transparent text-sm text-text-secondary text-left transition-all ${
              category === c.id ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200' : 'hover:bg-green-50 hover:text-green-700'
            }`}
            onClick={() => setFilters(prev => ({ ...prev, category: c.id }))}
          >
            <span>{c.label}</span>
            <span className={`text-[12px] px-2 py-0.5 rounded-full font-medium ${
              category === c.id ? 'text-emerald-700' : 'text-green-600'
            }`}>{c.count}</span>
          </button>
        ))}
      </div>

      <div className="px-5 mb-8">
        <p className="text-[13px] font-bold text-emerald-600 tracking-widest uppercase px-2 mb-3">Price range</p>
        <div className="px-2">
          <div className="flex justify-between text-sm text-text-secondary mb-3">
            <span>$0</span>
            <span className="font-semibold text-emerald-600">${maxPrice}</span>
          </div>
          <input
            type="range" min={0} max={100} step={1} value={maxPrice}
            onChange={e => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full h-2 accent-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="px-5 pb-5">
        <p className="text-[13px] font-bold text-emerald-600 tracking-widest uppercase px-2 mb-3">Availability</p>
        {(
          [
            { key: 'inStock',     label: 'In stock'      },
            { key: 'lowStock',    label: 'Low stock'     },
            { key: 'outOfStock',  label: 'Out of stock'  },
          ]
        ).map(({ key, label }) => (
          <label key={key} className="flex items-center gap-3 text-sm text-text-secondary cursor-pointer py-2 px-2 rounded-lg transition-colors hover:bg-green-50">
            <input type="checkbox" checked={availability[key]} onChange={() => toggleAvail(key)} className="w-4 h-4 accent-emerald-500" />
            {label}
          </label>
        ))}
      </div>
    </aside>
  );
}
