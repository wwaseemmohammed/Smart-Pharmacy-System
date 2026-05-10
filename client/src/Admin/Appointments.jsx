// Admin/Appointments.jsx
import { useState, useEffect } from 'react'
import api from '../api.js'
import { useToast } from '../components/Toast.jsx'

const STATUS_COLORS = {
  Waiting:     'bg-yellow-50 text-yellow-700',
  'In Progress':'bg-blue-50 text-blue-700',
  Completed:   'bg-emerald-50 text-emerald-700',
  Cancelled:   'bg-red-50 text-red-500',
}

export default function Appointments() {
  const toast = useToast()
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    try { const { data } = await api.get('/appointments'); setRows(data) }
    catch { toast('Failed to load', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const changeStatus = async (id, status) => {
    try { await api.patch(`/appointments/${id}/status`, { status }); toast('Updated'); fetch() }
    catch { toast('Failed', 'error') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-sm text-gray-400">{rows.length} total</p>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Patient','Pharmacist','Date','Time','Notes','Status','Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-16 text-gray-400">Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-16 text-gray-400">No appointments</td></tr>
            ) : rows.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-5 py-3.5">
                  <div className="font-semibold">{r.patient_name}</div>
                  <div className="text-xs text-gray-400">{r.patient_phone}</div>
                </td>
                <td className="px-5 py-3.5 font-medium">{r.pharmacist_name}</td>
                <td className="px-5 py-3.5 text-gray-600">{r.appointment_date}</td>
                <td className="px-5 py-3.5 text-gray-600">{String(r.appointment_time).slice(0,5)}</td>
                <td className="px-5 py-3.5 text-xs text-gray-400 max-w-[120px] truncate">{r.notes || '—'}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[r.status] || ''}`}>{r.status}</span>
                </td>
                <td className="px-5 py-3.5">
                  <select value={r.status} onChange={e => changeStatus(r.id, e.target.value)}
                    className="px-2 py-1 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none">
                    {['Waiting','In Progress','Completed','Cancelled'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
