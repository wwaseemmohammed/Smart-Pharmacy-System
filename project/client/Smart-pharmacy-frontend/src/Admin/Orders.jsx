import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from '../component/Toast/Toast';

const parseOrderCode = (notes) => {
  if (!notes) return null;
  const match = notes.match(/Code:\s*([^|]+)/);
  return match ? match[1].trim() : null;
};

export default function Orders() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders');
      setOrders(data.orders || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/orders/${id}/status`, { status: newStatus });
      setOrders(prev => prev.map(order => order.id === id ? { ...order, status: newStatus } : order));
      toast('Order status updated');
    } catch (err) {
      toast(err.response?.data?.message || err.message || 'Failed to update order', 'error');
    }
  };

  const deleteOrder = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;
    try {
      await api.delete(`/orders/${id}`);
      setOrders(prev => prev.filter(order => order.id !== id));
      toast('Order deleted successfully');
    } catch (err) {
      toast(err.response?.data?.message || err.message || 'Failed to delete order', 'error');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10 border-b border-gray-200 pb-5 pr-0 md:pr-10">
        <div>
          <h2 className="text-3xl md:text-[34px] font-extrabold font-serif text-[#0f2922] tracking-tight">Orders Management</h2>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 pr-10 max-w-full">
        <div className="p-7 flex justify-between items-center border-b border-gray-50">
          <h3 className="text-[20px] font-bold text-[#2a3835]">Order History</h3>
          <button
            onClick={fetchOrders}
            className="text-sm font-semibold text-teal-600 hover:text-teal-700"
          >
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto px-1">
          {loading ? (
            <div className="p-10 text-center text-slate-500">Loading orders...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-[12px] font-semibold uppercase tracking-wider border-b border-gray-50/50">
                  <th className="px-6 py-5">Order ID</th>
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Code</th>
                  <th className="px-6 py-5">Payment</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Notes</th>
                  <th className="px-6 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(order => {
                  const orderCode = parseOrderCode(order.notes);
                  return (
                    <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-[14.5px] text-gray-500 font-bold">#{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-[15px] text-[#2a3835] font-bold">{order.customer_name}</div>
                        <div className="text-[12px] text-gray-500">{order.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#4a5553] font-medium">{orderCode || '-'}</td>
                      <td className="px-6 py-4 text-[14px] text-[#2a3835] font-semibold">{order.payment_method}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-bold ${
                          order.status === 'Delivered' ? 'bg-[#eefaf3] text-[#38d373]' :
                          order.status === 'Accepted' ? 'bg-[#eef5fd] text-[#5e9de6]' :
                          order.status === 'Pending' ? 'bg-[#fff7ea] text-[#f2a95c]' :
                          'bg-[#fee2e2] text-[#ef4444]'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[13px] text-slate-600 max-w-[280px] truncate">{order.notes || '-'}</td>
                      <td className="px-6 py-4 space-y-2">
                        <button
                          onClick={() => updateStatus(order.id, 'Accepted')}
                          className="w-full px-3 py-1.5 bg-[#38d373] hover:bg-[#2eaa5c] text-white text-[12px] font-bold rounded-lg transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(order.id, 'Delivered')}
                          className="w-full px-3 py-1.5 bg-[#5e9de6] hover:bg-[#4078d0] text-white text-[12px] font-bold rounded-lg transition-colors"
                        >
                          Delivered
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="w-full px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-[12px] font-bold rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {orders.length === 0 && (
                  <tr><td colSpan="7" className="text-center py-10 text-gray-400">No orders found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
