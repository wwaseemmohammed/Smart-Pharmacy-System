import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { label: 'Home',      to: '/' },
  { label: 'Medicines', to: '/medicines' },
  { label: 'Our Team',  to: '/team' },
  { label: 'Careers',   to: '/careers' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [userMenu, setUserMenu]   = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const { isLoggedIn, isOwner, user, logout } = useAuth()
  const dropRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setUserMenu(false) }, [location.pathname])

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setUserMenu(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => { logout(); navigate('/') }
  const initials = user?.name ? user.name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase() : '?'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5"/></svg>
          </div>
          <div>
            <div className="font-bold text-emerald-800 text-base leading-none font-serif">MediCare</div>
            <div className="text-emerald-500 text-[10px] tracking-widest uppercase leading-none">Pharmacy</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === l.to ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'}`}>{l.label}</Link>
          ))}
          {isOwner && (
            <Link to="/admin" className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 transition-all shadow-sm">Dashboard</Link>
          )}
          <div className="ml-3 flex items-center gap-2">
            {isLoggedIn ? (
              <div className="relative" ref={dropRef}>
                <button onClick={() => setUserMenu(p => !p)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-100 bg-emerald-50 hover:bg-emerald-100 transition-all">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-[11px] font-bold">{initials}</div>
                  <span className="text-sm font-medium text-emerald-800 max-w-[80px] truncate">{user?.name?.split(' ')[0]}</span>
                  <svg className={`w-3.5 h-3.5 text-emerald-600 transition-transform ${userMenu ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-xs font-bold text-gray-800 truncate">{user?.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                      {isOwner && <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">🔑 Owner</span>}
                    </div>
                    {isOwner && (
                      <Link to="/admin" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-all">Sign In</Link>
            )}
          </div>
        </div>

        <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setMenuOpen(o => !o)}>
          <span className={`block w-5 h-0.5 bg-emerald-600 rounded transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-emerald-600 rounded transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-emerald-600 rounded transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-emerald-100 px-6 py-3 flex flex-col gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-emerald-50">{l.label}</Link>
          ))}
          {isOwner && <Link to="/admin" className="px-4 py-3 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50">Dashboard</Link>}
          <div className="border-t border-gray-100 pt-2 mt-1">
            {isLoggedIn ? (
              <>
                <div className="px-4 py-2 text-xs text-gray-400">{user?.email}</div>
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">Sign Out</button>
              </>
            ) : (
              <Link to="/login" className="block px-4 py-3 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
