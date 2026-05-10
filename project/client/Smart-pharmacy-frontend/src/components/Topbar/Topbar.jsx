import { Link } from 'react-router-dom'
import { ShoppingCart, Users, CalendarDays, Home } from 'lucide-react'

export default function Topbar({ view, setView, cartCount, onCartToggle }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
            <Home className="w-5 h-5" />
          </span>
          MediCare
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setView('user')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              view === 'user'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Medicines
          </button>

          <button
            type="button"
            onClick={() => setView('team')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              view === 'team'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'
            }`}
          >
            <Users className="w-4 h-4" />
            Team
          </button>

          <Link
            to="/booking"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-emerald-50 transition"
          >
            <CalendarDays className="w-4 h-4" />
            Booking
          </Link>
        </nav>

        <button
          type="button"
          onClick={onCartToggle}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
        >
          <ShoppingCart className="w-4 h-4" />
          Cart
          <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-white text-emerald-700 text-xs font-bold">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  )
}
