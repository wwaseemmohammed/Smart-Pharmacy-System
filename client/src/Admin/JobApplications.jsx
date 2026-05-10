import { useState, useEffect } from 'react'
import api from '../api.js'
import { useToast } from '../components/Toast.jsx'

const STATUS_COLORS = {
  Pending:  'bg-yellow-50 text-yellow-700',
  Reviewed: 'bg-blue-50 text-blue-700',
  Accepted: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-500',
}

export default function JobApplications() {
  const toast = useToast()
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)
  const [detail, setDetail]   = useState(null)

  const fetch = async () => {
    setLoading(true)
    try { const { data } = await api.get('/jobs'); setRows(data) }
    catch { toast('Failed to load', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const changeStatus = async (id, status) => {
    try {
      await api.patch(`/jobs/${id}/status`, { status })
      toast('Status updated'); fetch()
      if (detail?.id === id) setDetail(p => ({ ...p, status }))
    } catch { toast('Failed', 'error') }
  }

  const downloadCV = (id) => {
    window.open(`/api/jobs/${id}/cv`, '_blank')
  }

  const counts = rows.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
          <p className="text-sm text-gray-400">{rows.length} total applications</p>
        </div>
        <div className="flex gap-2 flex-wrap text-xs">
          {Object.entries(STATUS_COLORS).map(([s, cls]) => (
            <span key={s} className={`px-3 py-1.5 rounded-full font-semibold border ${cls.replace('bg-','border-').replace('-50','-200').replace('text-','')}`} style={{ borderColor: 'transparent' }}>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{s}: {counts[s] || 0}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Name','Email','Position','Experience','Status','Date','Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? <tr><td colSpan={7} className="text-center py-16 text-gray-400">Loading...</td></tr> :
            rows.length === 0 ? <tr><td colSpan={7} className="text-center py-16 text-gray-400">No applications yet</td></tr> :
            rows.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-5 py-3.5 font-semibold text-gray-800">{r.full_name}</td>
                <td className="px-5 py-3.5 text-gray-500 text-xs">{r.email}</td>
                <td className="px-5 py-3.5">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">{r.position}</span>
                </td>
                <td className="px-5 py-3.5 text-gray-500">{r.experience} yrs</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[r.status] || ''}`}>{r.status}</span>
                </td>
                <td className="px-5 py-3.5 text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-3.5 flex gap-1.5 flex-wrap">
                  <button onClick={() => setDetail(r)} className="px-2.5 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-100">View</button>
                  {r.cv_filename && (
                    <button onClick={() => downloadCV(r.id)} className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100">CV ↓</button>
                  )}
                  {r.status === 'Pending' && <>
                    <button onClick={() => changeStatus(r.id,'Reviewed')} className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-lg text-xs font-semibold hover:bg-purple-100">Review</button>
                    <button onClick={() => changeStatus(r.id,'Accepted')} className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-semibold hover:bg-emerald-100">Accept</button>
                    <button onClick={() => changeStatus(r.id,'Rejected')} className="px-2.5 py-1 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100">Reject</button>
                  </>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Application Details</h3>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ['Name',           detail.full_name],
                  ['Email',          detail.email],
                  ['Phone',          detail.phone || '—'],
                  ['Position',       detail.position],
                  ['Experience',     `${detail.experience} years`],
                  ['Specialization', detail.specialization || '—'],
                ].map(([l,v]) => (
                  <div key={l}>
                    <span className="text-xs text-gray-400">{l}</span>
                    <p className="font-semibold text-gray-800">{v}</p>
                  </div>
                ))}
              </div>
              {detail.about && (
                <div>
                  <span className="text-xs text-gray-400">About</span>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed bg-gray-50 rounded-xl p-3">{detail.about}</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[detail.status] || ''}`}>{detail.status}</span>
                {detail.cv_filename && (
                  <button onClick={() => downloadCV(detail.id)} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-100">Download CV</button>
                )}
              </div>
              <div className="flex gap-2 flex-wrap pt-2">
                {['Reviewed','Accepted','Rejected'].map(s => (
                  <button key={s} onClick={() => changeStatus(detail.id, s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all
                      ${s==='Accepted' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' :
                        s==='Rejected' ? 'bg-red-500 hover:bg-red-600 text-white' :
                        'bg-purple-500 hover:bg-purple-600 text-white'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
