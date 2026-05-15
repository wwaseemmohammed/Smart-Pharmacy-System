import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminTopNav({ onToggleSidebar }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

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

        <div className="flex items-center gap-3 pl-3 border-l border-gray-100 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="https://i.pravatar.cc/150?img=68" alt="Admin" className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-[#38d373] transition-colors" />
            <div className="hidden sm:block">
              <p className="text-[14px] font-bold text-[#2a3835] leading-tight">{user?.name || 'Admin User'}</p>
              <p className="text-[12px] font-medium text-gray-400">Superadmin</p>
            </div>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <div className="p-4 border-b border-gray-100">
                <p className="text-[14px] font-semibold text-[#2a3835]">{user?.name || 'Admin User'}</p>
                <p className="text-[12px] text-gray-500 mt-1">{user?.email || 'm@gmail.com'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sign Out & Switch Account
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
