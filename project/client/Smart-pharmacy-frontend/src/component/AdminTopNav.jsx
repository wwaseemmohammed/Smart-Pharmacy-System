import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function AdminTopNav({ onToggleSidebar }) {
  return (
    <header className="bg-white border-b border-gray-100 h-20 px-4 sm:px-6 md:px-10 flex items-center justify-between shrink-0">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="md:hidden p-3 rounded-2xl text-gray-600 hover:text-[#2a3835] hover:bg-slate-50 transition-colors"
        aria-label="Open sidebar menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="relative flex-1 max-w-full md:max-w-[420px] mr-4">
        <input
          type="text"
          placeholder="Search for anything..."
          className="w-full bg-[#F8F9FA] border-none text-[14px] rounded-2xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-[#38d373]/20 focus:outline-none text-[#2a3835] placeholder-gray-400"
        />
        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Link
          to="/"
          className="hidden sm:flex items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-[#38d373] transition-colors bg-gray-50 hover:bg-[#eefaf3] px-4 py-2.5 rounded-2xl"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Store
        </Link>

        <button className="relative p-2.5 text-gray-400 hover:text-[#2a3835] transition-colors rounded-full hover:bg-gray-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-gray-100 cursor-pointer group">
          <img src="https://i.pravatar.cc/150?img=68" alt="Admin" className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-[#38d373] transition-colors" />
          <div className="hidden sm:block">
            <p className="text-[14px] font-bold text-[#2a3835] leading-tight">Admin User</p>
            <p className="text-[12px] font-medium text-gray-400">Superadmin</p>
          </div>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-[#38d373] transition-colors ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </header>
  );
}
