import React, { useState } from 'react';

export default function DashboardOverview() {
  const [timeRange, setTimeRange] = useState('Today');

  return (
    <>
      <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-5 pr-10">
        <h2 className="text-[34px] font-extrabold font-serif text-[#0f2922] tracking-tight">Dashboard Overview</h2>
        
        {/* Time Range Selector */}
        <div className="flex bg-white shadow-sm rounded-xl p-1 border border-gray-100">
          <button 
             onClick={() => setTimeRange('Today')}
             className={`px-5 py-2 text-sm font-bold rounded-lg tracking-wide transition-colors ${timeRange === 'Today' ? 'bg-[#eefaf3] text-[#38d373]' : 'text-gray-500 hover:text-gray-700'}`}>
             Today
          </button>
          <button 
             onClick={() => setTimeRange('This Week')}
             className={`px-5 py-2 text-sm font-bold rounded-lg tracking-wide transition-colors ${timeRange === 'This Week' ? 'bg-[#eefaf3] text-[#38d373]' : 'text-gray-500 hover:text-gray-700'}`}>
             This Week
          </button>
          <button 
             onClick={() => setTimeRange('This Month')}
             className={`px-5 py-2 text-sm font-bold rounded-lg tracking-wide transition-colors ${timeRange === 'This Month' ? 'bg-[#eefaf3] text-[#38d373]' : 'text-gray-500 hover:text-gray-700'}`}>
             This Month
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-7 mb-10 pr-10">
         {/* Card 1 */}
         <div className="bg-white rounded-3xl p-7 flex items-center gap-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 hover:shadow-md transition-shadow">
           <div className="w-[72px] h-[72px] rounded-[22px] bg-[#eefaf3] text-[#38d373] flex items-center justify-center">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
           </div>
           <div>
             <h3 className="text-[32px] font-bold font-serif text-[#0f2922] tracking-tight leading-none mb-1.5">{timeRange === 'Today' ? '248' : timeRange === 'This Week' ? '1,540' : '6,200'}</h3>
             <p className="text-[15px] text-gray-400 font-medium tracking-wide">Total Orders</p>
           </div>
         </div>
         
         {/* Card 2 */}
         <div className="bg-white rounded-3xl p-7 flex items-center gap-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 hover:shadow-md transition-shadow">
           <div className="w-[72px] h-[72px] rounded-[22px] bg-[#eef5fd] text-[#5e9de6] flex items-center justify-center">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
           </div>
           <div>
             <h3 className="text-[32px] font-bold font-serif text-[#0f2922] tracking-tight leading-none mb-1.5">1,847</h3>
             <p className="text-[15px] text-gray-400 font-medium tracking-wide">Total Users</p>
           </div>
         </div>

         {/* Card 3 */}
         <div className="bg-white rounded-3xl p-7 flex items-center gap-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 hover:shadow-md transition-shadow">
           <div className="w-[72px] h-[72px] rounded-[22px] bg-[#f5effb] text-[#aa7eed] flex items-center justify-center">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
           </div>
           <div>
             <h3 className="text-[32px] font-bold font-serif text-[#0f2922] tracking-tight leading-none mb-1.5">{timeRange === 'Today' ? '63' : timeRange === 'This Week' ? '410' : '1,205'}</h3>
             <p className="text-[15px] text-gray-400 font-medium tracking-wide">Appointments</p>
           </div>
         </div>

         {/* Card 4 */}
         <div className="bg-white rounded-3xl p-7 flex items-center gap-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 hover:shadow-md transition-shadow">
           <div className="w-[72px] h-[72px] rounded-[22px] bg-[#fdf4eb] text-[#eaa05e] flex items-center justify-center">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           </div>
           <div>
             <h3 className="text-[32px] font-bold font-serif text-[#0f2922] tracking-tight leading-none mb-1.5">{timeRange === 'Today' ? '$18.4K' : timeRange === 'This Week' ? '$115.2K' : '$450.8K'}</h3>
             <p className="text-[15px] text-gray-400 font-medium tracking-wide">Revenue</p>
           </div>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-7 mb-10 pr-10">
         {/* Sales Report Chart Placeholder */}
         <div className="col-span-2 bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 p-7">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-[20px] font-bold text-[#2a3835]">Sales Reports</h3>
                <p className="text-[13px] text-gray-400 font-medium mt-1">Revenue over time</p>
              </div>
              <button className="text-[#38d373] text-[13px] font-bold hover:underline">Download Report</button>
            </div>
            
            <div className="h-48 border-b-2 border-l-2 border-gray-100 flex items-end justify-between px-4 pb-2 pt-4">
              <div className="w-12 bg-gradient-to-t from-[#38d373]/20 to-[#38d373] h-20 rounded-t-sm"></div>
              <div className="w-12 bg-gradient-to-t from-[#38d373]/20 to-[#38d373] h-32 rounded-t-sm"></div>
              <div className="w-12 bg-gradient-to-t from-[#38d373]/20 to-[#38d373] h-16 rounded-t-sm"></div>
              <div className="w-12 bg-gradient-to-t from-[#38d373]/20 to-[#38d373] h-40 rounded-t-sm"></div>
              <div className="w-12 bg-gradient-to-t from-[#38d373]/20 to-[#38d373] h-28 rounded-t-sm"></div>
              <div className="w-12 bg-gradient-to-t from-[#38d373]/20 to-[#38d373] h-48 rounded-t-sm"></div>
            </div>
            <div className="flex justify-between px-4 mt-2 text-xs font-bold text-gray-400">
               <span>Mon</span>
               <span>Tue</span>
               <span>Wed</span>
               <span>Thu</span>
               <span>Fri</span>
               <span>Sat</span>
            </div>
         </div>

         {/* Low Stock Alerts Placeholder */}
         <div className="col-span-1 bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-bold text-[#2a3835]">Low Stock Alerts</h3>
              <span className="bg-red-100 text-red-500 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">2</span>
            </div>

            <div className="space-y-4 flex-1">
               <div className="p-4 border border-red-100 bg-red-50/40 rounded-xl relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                 <h4 className="text-[15px] font-bold text-[#2a3835] mb-1">Vitamin C 1000mg</h4>
                 <div className="flex justify-between items-center mt-2">
                    <span className="text-[12px] text-gray-500 font-medium">Stock: <strong className="text-red-500">0 left</strong></span>
                    <button className="text-[11px] font-bold text-red-500 bg-red-100 px-2 py-1 rounded">Reorder</button>
                 </div>
               </div>

               <div className="p-4 border border-orange-100 bg-orange-50/40 rounded-xl relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>
                 <h4 className="text-[15px] font-bold text-[#2a3835] mb-1">Amoxicillin 250mg</h4>
                 <div className="flex justify-between items-center mt-2">
                    <span className="text-[12px] text-gray-500 font-medium">Stock: <strong className="text-orange-500">15 left</strong> (Min: 50)</span>
                    <button className="text-[11px] font-bold text-orange-500 bg-orange-100 px-2 py-1 rounded">Reorder</button>
                 </div>
               </div>
            </div>
         </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 pr-10 max-w-full">
        <div className="p-7 flex justify-between items-center border-b border-gray-50">
          <h3 className="text-[20px] font-bold text-[#2a3835]">Recent Orders</h3>
          <span className="bg-[#eefaf3] text-[#38d373] text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">{timeRange}</span>
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
    </>
  );
}
