import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col-reverse md:flex-row bg-gray-100 min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-gray-900 text-white flex-col h-screen overflow-y-auto flex-shrink-0">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
             {/* Shield Logo */}
             <svg width="20" height="24" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-7">
               <path d="M12 0L0 5.33333V13.3333C0 20.72 5.14667 27.5733 12 29.3333C18.8533 27.5733 24 20.72 24 13.3333V5.33333L12 0Z" fill="#3B82F6"/>
               <path d="M12 0V29.3333C18.8533 27.5733 24 20.72 24 13.3333V5.33333L12 0Z" fill="#2563EB"/>
             </svg>
             <div>
               <h1 className="text-base sm:text-lg font-bold font-serif tracking-wide leading-tight">Admin Panel</h1>
               <p className="text-[10px] sm:text-xs text-gray-400 font-medium">MediGreen Dashboard</p>
             </div>
          </div>
        </div>
        
        <nav className="mt-4 flex-1 px-3 sm:px-4 text-sm">
          <div className="mb-3 px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Overview</div>
          <a href="#" className="flex items-center gap-2 sm:gap-3 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg sm:rounded-xl mb-6 font-semibold shadow-sm transition-colors">
             <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
             <span className="hidden sm:inline">Dashboard</span>
          </a>

          <div className="mb-3 px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-8">Management</div>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-2 sm:gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                <span className="hidden sm:inline">Medicines</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 sm:gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                <span className="hidden sm:inline">Orders</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 sm:gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span className="hidden sm:inline">Appointments</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 sm:gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <span className="hidden sm:inline">Doctors</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-gray-900 mb-6 sm:mb-8 md:mb-10 tracking-tight">Dashboard Overview</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
           {/* Card 1 */}
           <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
             <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
             </div>
             <div>
               <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-gray-900 tracking-tight leading-none mb-1">248</h3>
               <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium tracking-wide">Total Orders</p>
             </div>
           </div>
           
           {/* Card 2 */}
           <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
             <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
             </div>
             <div>
               <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-gray-900 tracking-tight leading-none mb-1">1,847</h3>
               <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium tracking-wide">Total Users</p>
             </div>
           </div>

           {/* Card 3 */}
           <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
             <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             </div>
             <div>
               <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-gray-900 tracking-tight leading-none mb-1">63</h3>
               <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium tracking-wide">Appointments</p>
             </div>
           </div>

           {/* Card 4 */}
           <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
             <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <div>
               <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-gray-900 tracking-tight leading-none mb-1">$18.4K</h3>
               <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium tracking-wide">Revenue</p>
             </div>
           </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 max-w-full">
          <div className="p-5 sm:p-6 md:p-7 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Recent Orders</h3>
            <span className="bg-green-50 text-green-600 text-[10px] sm:text-xs font-bold px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full uppercase tracking-wider">Today</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600 text-[11px] sm:text-xs font-semibold uppercase tracking-wider border-b border-gray-200/50 bg-gray-50">
                  <th className="px-4 sm:px-6 py-3 sm:py-5">Order ID</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-5 hidden sm:table-cell">Customer</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-5 hidden md:table-cell">Items</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-5">Total</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-5 text-xs sm:text-sm md:text-base text-gray-700 font-medium">#ORD-1042</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-5 text-xs sm:text-sm md:text-base text-gray-900 font-semibold hidden sm:table-cell">
                    <div className="flex flex-col">
                      <span>Alice Johnson</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-5 text-xs sm:text-sm md:text-base text-gray-700 hidden md:table-cell">Paracetamol, Vitamin C</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-5 text-xs sm:text-sm md:text-base text-gray-900 font-semibold">$24.50</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-5">
                    <span className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold bg-green-50 text-green-600">
                      Confirmed
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-5 text-xs sm:text-sm md:text-base text-gray-700 font-medium">#ORD-1041</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-5 text-xs sm:text-sm md:text-base text-gray-900 font-semibold hidden sm:table-cell">
                    <div className="flex flex-col">
                      <span>Bob Smith</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-5 text-xs sm:text-sm md:text-base text-gray-700 hidden md:table-cell">Amoxicillin</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-5 text-xs sm:text-sm md:text-base text-gray-900 font-semibold">$18.00</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-5">
                    <span className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold bg-amber-50 text-amber-600">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
