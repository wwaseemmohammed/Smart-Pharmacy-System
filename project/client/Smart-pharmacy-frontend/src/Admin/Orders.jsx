import React, { useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([
    { id: '#ORD-2099', date: 'Oct 24, 2023', time: '09:41 AM', customer: 'Maria Garcia', email: 'maria.g@example.com', amount: 124.50, payment: 'Credit Card', status: 'Delivered' },
    { id: '#ORD-2098', date: 'Oct 24, 2023', time: '08:15 AM', customer: 'James Wilson', email: 'j.wilson@example.com', amount: 45.00, payment: 'PayPal', status: 'Pending' },
    { id: '#ORD-2097', date: 'Oct 23, 2023', time: '06:30 PM', customer: 'Sarah Connor', email: 'sarah.c@example.com', amount: 210.75, payment: 'Credit Card', status: 'Pending' },
  ]);

  const [filter, setFilter] = useState('All');

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = orders.filter(o => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return o.status === 'Pending';
    if (filter === 'Completed') return o.status === 'Delivered' || o.status === 'Accepted';
    return true;
  });

  return (
    <>
      <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-5 pr-10">
        <h2 className="text-[34px] font-extrabold font-serif text-[#0f2922] tracking-tight">Orders Management</h2>
        
        <div className="flex bg-white shadow-sm rounded-xl p-1 border border-gray-100">
          <button 
            onClick={() => setFilter('All')}
            className={`px-5 py-2 text-sm font-bold rounded-lg tracking-wide transition-colors ${filter === 'All' ? 'bg-[#eefaf3] text-[#38d373]' : 'text-gray-500 hover:text-gray-700'}`}>
            All Orders
          </button>
          <button 
            onClick={() => setFilter('Pending')}
            className={`px-5 py-2 text-sm font-bold rounded-lg tracking-wide transition-colors ${filter === 'Pending' ? 'bg-[#eefaf3] text-[#38d373]' : 'text-gray-500 hover:text-gray-700'}`}>
            Pending
          </button>
          <button 
            onClick={() => setFilter('Completed')}
            className={`px-5 py-2 text-sm font-bold rounded-lg tracking-wide transition-colors ${filter === 'Completed' ? 'bg-[#eefaf3] text-[#38d373]' : 'text-gray-500 hover:text-gray-700'}`}>
            Completed
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 pr-10 max-w-full">
        <div className="p-7 flex justify-between items-center border-b border-gray-50">
          <h3 className="text-[20px] font-bold text-[#2a3835]">Order History</h3>
          <button className="text-gray-400 hover:text-[#38d373] transition-colors p-2 rounded-full hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          </button>
        </div>
        <div className="overflow-x-auto px-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[12px] font-semibold uppercase tracking-wider border-b border-gray-50/50">
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">Date & Time</th>
                <th className="px-6 py-5">Customer Info</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map(order => (
                <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-[14.5px] text-gray-500 font-bold">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-[14.5px] text-[#2a3835] font-semibold">{order.date}</div>
                    <div className="text-[12px] text-gray-400">{order.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[15px] text-[#2a3835] font-bold">{order.customer}</div>
                    <div className="text-[12.5px] text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-[15px] text-[#2a3835] font-bold">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-bold ${
                      order.status === 'Delivered' || order.status === 'Accepted' ? 'bg-[#eefaf3] text-[#38d373]' :
                      order.status === 'Rejected' ? 'bg-[#fee2e2] text-[#ef4444]' :
                      'bg-[#fff7ea] text-[#f2a95c]'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.status === 'Pending' ? (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateStatus(order.id, 'Accepted'); }}
                          className="px-3 py-1.5 bg-[#38d373] hover:bg-[#2eaa5c] text-white text-[12px] font-bold rounded-lg transition-colors">
                            Accept
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateStatus(order.id, 'Rejected'); }}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-[12px] font-bold rounded-lg transition-colors">
                            Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs font-semibold">Done</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr><td colSpan="6" className="text-center py-10 text-gray-400">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
