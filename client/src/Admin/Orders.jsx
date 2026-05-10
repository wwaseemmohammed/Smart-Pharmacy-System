import { useState, useEffect } from 'react'
import api from '../api.js'
import { useToast } from '../components/Toast.jsx'

const STATUS_COLORS = {
  Pending:   'bg-yellow-50 text-yellow-700 border-yellow-200',
  Accepted:  'bg-blue-50 text-blue-700 border-blue-200',
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Rejected:  'bg-red-50 text-red-600 border-red-200',
}

export default function Orders() {
  const toast = useToast()
  const [orders, setOrders]   = useState([])
  const [status, setStatus]   = useState('All')
  const [loading, setLoading] = useState(true)
  const [detail, setDetail]   = useState(null)

  const fetch = async () => {
    setLoading(true)
    try {
      const params = status !== 'All' ? { status } : {}
      const { data } = await api.get('/orders', { params })
      setOrders(data.orders || [])
    } catch { toast('Failed to load orders', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [status])

  const changeStatus = async (id, newStatus) => {
    try {
      await api.patch(`/orders/${id}/status`, { status: newStatus })
      toast(`Order ${newStatus.toLowerCase()}`)
      fetch()
      if (detail?.id === id) setDetail(p => ({ ...p, status: newStatus }))
    } catch { toast('Failed to update status', 'error') }
  }

  const openDetail = async (id) => {
    try {
      const { data } = await api.get(`/orders/${id}`)
      setDetail(data)
    } catch { toast('Failed to load order detail', 'error') }
  }

  const counts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-400">{orders.length} orders</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {['All','Pending','Accepted','Delivered','Rejected'].map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all
                ${status===s ? 'bg-[#1D9E75] text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600'}`}>
              {s} {counts[s] ? `(${counts[s]})` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-16 text-gray-400">Loading...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-16 text-gray-400">No orders found</td></tr>
            ) : orders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 font-bold text-gray-400">#{o.id}</td>
                <td className="px-4 py-3.5">
                  <div className="font-semibold text-gray-800">{o.customer_name}</div>
                  <div className="text-xs text-gray-400">{o.customer_email}</div>
                </td>
                <td className="px-4 py-3.5 text-xs text-gray-500 max-w-[180px] truncate">{o.items_summary || '—'}</td>
                <td className="px-4 py-3.5 font-bold text-gray-800">${Number(o.total).toFixed(2)}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[o.status] || ''}`}>{o.status}</span>
                </td>
                <td className="px-4 py-3.5 text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-3.5 text-right flex justify-end gap-2">
                  <button onClick={() => openDetail(o.id)} className="px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-100">View</button>
                  {o.status === 'Pending' && <>
                    <button onClick={() => changeStatus(o.id,'Accepted')} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100">Accept</button>
                    <button onClick={() => changeStatus(o.id,'Rejected')} className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100">Reject</button>
                  </>}
                  {o.status === 'Accepted' && (
                    <button onClick={() => changeStatus(o.id,'Delivered')} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-semibold hover:bg-emerald-100">Delivered</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order detail modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Order #{detail.id}</h3>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-400 text-xs">Customer</span><p className="font-semibold">{detail.customer_name}</p></div>
                <div><span className="text-gray-400 text-xs">Phone</span><p className="font-semibold">{detail.customer_phone || '—'}</p></div>
                <div className="col-span-2"><span className="text-gray-400 text-xs">Address</span><p className="font-semibold">{detail.address || '—'}</p></div>
                <div><span className="text-gray-400 text-xs">Payment</span><p className="font-semibold">{detail.payment_method}</p></div>
                <div><span className="text-gray-400 text-xs">Status</span>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mt-0.5 ${STATUS_COLORS[detail.status] || ''}`}>{detail.status}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-3">Items</p>
                <div className="space-y-2">
                  {(detail.items || []).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-emerald-600">${Number(detail.total).toFixed(2)}</span>
              </div>
              {detail.status === 'Pending' && (
                <div className="flex gap-3 pt-2">
                  <button onClick={() => { changeStatus(detail.id,'Accepted'); setDetail(p => ({ ...p, status:'Accepted' })) }}
                    className="flex-1 py-2.5 bg-blue-500 text-white rounded-xl font-semibold text-sm hover:bg-blue-600">Accept</button>
                  <button onClick={() => { changeStatus(detail.id,'Rejected'); setDetail(p => ({ ...p, status:'Rejected' })) }}
                    className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600">Reject</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
