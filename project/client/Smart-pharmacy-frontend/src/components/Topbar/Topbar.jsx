import { ShoppingCart, Pill, Users } from 'lucide-react';

export default function Topbar({ view, setView, cartCount, onCartToggle }) {
  return (
    <header className="sticky top-0 z-50 h-14 bg-bg-primary border-b border-border-light flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-2 text-sm font-bold text-teal-600 tracking-tight">
        <div className="w-[28px] h-[28px] bg-teal-400 rounded-md flex items-center justify-center flex-shrink-0"><Pill size={16} color="white" /></div>
        <span>PharmaCare</span>
      </div>

      <nav className="flex gap-0.5 bg-bg-secondary p-0.5 rounded-md border border-border-light">
        <button
          className={`px-3.5 py-1 rounded-sm text-xs font-medium border-none bg-transparent transition-all ${
            view === 'user' ? 'bg-bg-primary text-teal-600 shadow-sm' : 'text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => setView('user')}
        >
          Browse
        </button>
        <button
          className={`px-3.5 py-1 rounded-sm text-xs font-medium border-none bg-transparent transition-all flex items-center gap-1 ${
            view === 'team' ? 'bg-bg-primary text-teal-600 shadow-sm' : 'text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => setView('team')}
        >
          <Users size={12} className="inline align-middle" />
          Our Team
        </button>
      </nav>

      <button className="flex items-center gap-1.5 px-3.5 py-1.5 border border-border-medium rounded-md bg-bg-primary text-xs font-medium text-text-primary transition-all hover:bg-bg-secondary hover:border-teal-400 hover:text-teal-600" onClick={onCartToggle}>
        <ShoppingCart size={15} />
        <span>Cart</span>
        {cartCount > 0 && <span className="text-teal-600 w-4.25 h-4.25 rounded-full text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
      </button>
    </header>
  );
}
