import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const navItems = [
  { to: '/admin',              label: 'Dashboard',    icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z', end: true },
  { to: '/admin/medicines',    label: 'Medicines',    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { to: '/admin/orders',       label: 'Orders',       icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { to: '/admin/appointments', label: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { to: '/admin/doctors',      label: 'Pharmacists',  icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { to: '/admin/users',        label: 'Users',        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { to: '/admin/suppliers',    label: 'Suppliers',    icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
  { to: '/admin/applications', label: 'Applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()
    : 'A'

  return (
    <div className="flex bg-[#F8F9FA] h-screen font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#1a2d27] text-white flex flex-col h-screen overflow-y-auto shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5" />
              </svg>
            </div>
            <div>
              <h1 className="text-[18px] font-bold font-serif leading-tight">Admin Panel</h1>
              <p className="text-[11px] text-gray-400 font-medium">MediCare Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="mt-2 flex-1 px-4 text-[14px]">
          <div className="mb-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Overview</div>
          {navItems.slice(0,1).map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors mb-1
                ${isActive ? 'bg-[#38d373] text-white shadow-sm font-semibold' : 'text-[#7a9d94] hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {item.label}
            </NavLink>
          ))}
          <div className="mb-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-6">Management</div>
          {navItems.slice(1).map(item => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors mb-1
                ${isActive ? 'bg-[#38d373] text-white shadow-sm font-semibold' : 'text-[#7a9d94] hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout at bottom */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
            </div>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-semibold">Owner</span>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-red-500/20">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white border-b border-gray-100 h-20 px-10 flex items-center justify-between shrink-0">
          <div className="relative w-72 hidden md:block">
            <input type="text" placeholder="Search for anything..."
              className="w-full bg-[#F8F9FA] border-none text-sm rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-emerald-200 focus:outline-none placeholder-gray-400" />
            <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#38d373] transition-colors bg-gray-50 hover:bg-[#eefaf3] px-4 py-2.5 rounded-xl">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Store
            </Link>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-sm">{initials}</div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-[#2a3835] leading-tight">{user?.name || 'Admin'}</p>
                <p className="text-xs font-medium text-gray-400">Pharmacy Owner</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
