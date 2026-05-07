import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminSidebar() {
  const iconClass = "w-5 h-5 opacity-90";
  
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors mb-2 ${
      isActive 
        ? "bg-[#38d373] text-white shadow-sm font-semibold" 
        : "text-[#7a9d94] hover:text-white hover:bg-white/5"
    }`;

  return (
    <aside className="w-[260px] bg-[#1a2d27] text-white flex flex-col h-screen overflow-y-auto shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
            {/* Shield Logo */}
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L0 5.33333V13.3333C0 20.72 5.14667 27.5733 12 29.3333C18.8533 27.5733 24 20.72 24 13.3333V5.33333L12 0Z" fill="#3B82F6"/>
              <path d="M12 0V29.3333C18.8533 27.5733 24 20.72 24 13.3333V5.33333L12 0Z" fill="#2563EB"/>
            </svg>
            <div>
              <h1 className="text-[20px] font-bold font-serif tracking-wide leading-tight">Admin Panel</h1>
              <p className="text-[12px] text-gray-400 font-medium">MediGreen Dashboard</p>
            </div>
        </div>
      </div>
      
      <nav className="mt-4 flex-1 px-4 text-[14.5px]">
        <div className="mb-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Overview</div>
        <NavLink to="/admin" end className={navLinkClass}>
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
        </NavLink>

        <div className="mb-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-8">Management</div>
        <div className="space-y-1">
          <NavLink to="/admin/medicines" className={navLinkClass}>
            {/* Beaker / Flask icon */}
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            Medicines
          </NavLink>
          <NavLink to="/admin/orders" className={navLinkClass}>
            {/* Shopping Bag icon */}
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            Orders
          </NavLink>
          <NavLink to="/admin/appointments" className={navLinkClass}>
            {/* Calendar icon */}
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Appointments
          </NavLink>
          <NavLink to="/admin/doctors" className={navLinkClass}>
            {/* User icon */}
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Doctors
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClass}>
            {/* Users / Group icon */}
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Users
          </NavLink>
          <NavLink to="/admin/suppliers" className={navLinkClass}>
            {/* Truck / Supplier icon */}
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
            Suppliers
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
