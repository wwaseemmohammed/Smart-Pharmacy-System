import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#1a2d27] text-white flex flex-col h-screen overflow-y-auto">
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
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#38d373] text-white rounded-[12px] mb-6 font-semibold shadow-sm">
             <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
             Dashboard
          </a>

          <div className="mb-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-8">Management</div>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                Medicines
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Appointments
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Doctors
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-[34px] font-extrabold font-serif text-[#0f2922] mb-10 tracking-tight">Dashboard Overview</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-7 mb-10 pr-10">
           {/* Card 1 */}
           <div className="bg-white rounded-3xl p-7 flex items-center gap-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50">
             <div className="w-[72px] h-[72px] rounded-[22px] bg-[#eefaf3] text-[#38d373] flex items-center justify-center">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
             </div>
             <div>
               <h3 className="text-[32px] font-bold font-serif text-[#0f2922] tracking-tight leading-none mb-1.5">248</h3>
               <p className="text-[15px] text-gray-400 font-medium tracking-wide">Total Orders</p>
             </div>
           </div>
           
           {/* Card 2 */}
           <div className="bg-white rounded-3xl p-7 flex items-center gap-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50">
             <div className="w-[72px] h-[72px] rounded-[22px] bg-[#eef5fd] text-[#5e9de6] flex items-center justify-center">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
             </div>
             <div>
               <h3 className="text-[32px] font-bold font-serif text-[#0f2922] tracking-tight leading-none mb-1.5">1,847</h3>
               <p className="text-[15px] text-gray-400 font-medium tracking-wide">Total Users</p>
             </div>
           </div>

           {/* Card 3 */}
           <div className="bg-white rounded-3xl p-7 flex items-center gap-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50">
             <div className="w-[72px] h-[72px] rounded-[22px] bg-[#f5effb] text-[#aa7eed] flex items-center justify-center">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             </div>
             <div>
               <h3 className="text-[32px] font-bold font-serif text-[#0f2922] tracking-tight leading-none mb-1.5">63</h3>
               <p className="text-[15px] text-gray-400 font-medium tracking-wide">Appointments</p>
             </div>
           </div>

           {/* Card 4 */}
           <div className="bg-white rounded-3xl p-7 flex items-center gap-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50">
             <div className="w-[72px] h-[72px] rounded-[22px] bg-[#fdf4eb] text-[#eaa05e] flex items-center justify-center">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <div>
               <h3 className="text-[32px] font-bold font-serif text-[#0f2922] tracking-tight leading-none mb-1.5">$18.4K</h3>
               <p className="text-[15px] text-gray-400 font-medium tracking-wide">Revenue</p>
             </div>
           </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 pr-10 max-w-full">
          <div className="p-7 flex justify-between items-center border-b border-gray-50">
            <h3 className="text-[20px] font-bold text-[#2a3835]">Recent Orders</h3>
            <span className="bg-[#eefaf3] text-[#38d373] text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">Today</span>
          </div>
          <div className="overflow-x-auto px-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-[12px] font-semibold uppercase tracking-wider border-b border-gray-50/50">
                  <th className="px-6 py-5">Order ID</th>
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Items</th>
                  <th className="px-6 py-5">Total</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-[14.5px] text-gray-600 font-medium">#ORD-1042</td>
                  <td className="px-6 py-5 text-[15px] text-[#2a3835] font-semibold leading-snug">
                    <div className="flex flex-col">
                      <span>Alice</span>
                      <span>Johnson</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[15px] text-[#4a5553] font-medium">Paracetamol, Vitamin C</td>
                  <td className="px-6 py-5 text-[15px] text-[#2a3835] font-semibold">$24.50</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-bold bg-[#eefaf3] text-[#38d373]">
                      Confirmed
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-[14.5px] text-gray-600 font-medium">#ORD-1041</td>
                  <td className="px-6 py-5 text-[15px] text-[#2a3835] font-semibold leading-snug">
                    <div className="flex flex-col">
                      <span>Bob Smith</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[15px] text-[#4a5553] font-medium">Amoxicillin</td>
                  <td className="px-6 py-5 text-[15px] text-[#2a3835] font-semibold">$18.00</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-bold bg-[#fff7ea] text-[#f2a95c]">
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
