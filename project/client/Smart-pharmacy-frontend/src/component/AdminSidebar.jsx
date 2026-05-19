import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

export default function AdminSidebar({ isOpen, onClose }) {
  const iconClass = 'w-5 h-5 opacity-90';
  
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors mb-2 ${
      isActive 
        ? 'bg-[#38d373] text-white shadow-sm font-semibold' 
        : 'text-[#7a9d94] hover:text-white hover:bg-white/5'
    }`;

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform bg-[#1a2d27] text-white flex flex-col overflow-y-auto shadow-2xl transition-transform duration-300 md:static md:translate-x-0 md:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-3">
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L0 5.33333V13.3333C0 20.72 5.14667 27.5733 12 29.3333C18.8533 27.5733 24 20.72 24 13.3333V5.33333L12 0Z" fill="#3B82F6"/>
              <path d="M12 0V29.3333C18.8533 27.5733 24 20.72 24 13.3333V5.33333L12 0Z" fill="#2563EB"/>
            </svg>
            <div>
              <h1 className="text-lg font-bold font-serif tracking-wide leading-tight">Admin Panel</h1>
              <p className="text-xs text-gray-400 font-medium">MediGreen Dashboard</p>
            </div>
          </div>
          <button className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors" onClick={onClose} aria-label="Close sidebar">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-4 flex-1 px-4 text-sm">
          <div className="mb-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Overview</div>
          <NavLink to="/admin" end className={navLinkClass}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Dashboard
          </NavLink>

          <div className="mb-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-8">Management</div>
          <div className="space-y-1 pb-6">
            <NavLink to="/admin/medicines" className={navLinkClass}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              Medicines
            </NavLink>
            <NavLink to="/admin/orders" className={navLinkClass}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              Orders
            </NavLink>
            <NavLink to="/admin/appointments" className={navLinkClass}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Appointments
            </NavLink>
            <NavLink to="/admin/careers" className={navLinkClass}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              Careers
            </NavLink>
            <NavLink to="/admin/employees" className={navLinkClass}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Employees
            </NavLink>
            <NavLink to="/admin/users" className={navLinkClass}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              Users
            </NavLink>
            <NavLink to="/admin/suppliers" className={navLinkClass}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
              Suppliers
            </NavLink>
          </div>
        </nav>
      </div>
      {isOpen && <button className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden" onClick={onClose} aria-label="Close overlay" />}
    </>
  );
}
