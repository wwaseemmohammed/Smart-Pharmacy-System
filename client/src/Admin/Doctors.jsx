import { useState, useEffect } from 'react'
import api from '../api.js'
import { useToast } from '../components/Toast.jsx'

const SHIFTS = ['morning','evening','night']
const STATUSES = ['Available','On Leave','In Surgery']
const EMPTY = { name:'', name_ar:'', title:'', title_ar:'', specialty:'', specialty_ar:'', experience:'', shift:'morning', phone:'', whatsapp:'', avatar:'', avatar_color:'#1D9E75', status:'Available' }

export default function Doctors() {
  const toast = useToast()
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]     = useState(null)
  const [form, setForm]       = useState(EMPTY)
  const [saving, setSaving]   = useState(false)
  const [delId, setDelId]     = useState(null)

  const fetch = async () => {
    setLoading(true)
    try { const { data } = await api.get('/pharmacists'); setRows(data) }
    catch { toast('Failed to load', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (r) => { setForm({ ...EMPTY, ...r, experience: String(r.experience) }); setModal(r) }
  const h        = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = async () => {
    if (!form.name) { toast('Name required', 'error'); return }
    setSaving(true)
    try {
      if (modal === 'add') await api.post('/pharmacists', form)
      else                 await api.put(`/pharmacists/${modal.id}`, form)
      toast(modal === 'add' ? 'Pharmacist added!' : 'Pharmacist updated!')
      setModal(null); fetch()
    } catch (err) { toast(err.response?.data?.message || 'Failed', 'error') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    try { await api.delete(`/pharmacists/${id}`); toast('Deleted'); setDelId(null); fetch() }
    catch { toast('Delete failed', 'error') }
  }

  const shiftColor = s => ({ morning:'bg-amber-50 text-amber-600', evening:'bg-blue-50 text-blue-600', night:'bg-purple-50 text-purple-600' }[s] || '')

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pharmacists</h1>
          <p className="text-sm text-gray-400">{rows.length} team members</p>
        </div>
        <button onClick={openAdd} className="px-5 py-2.5 bg-[#1D9E75] text-white rounded-xl text-sm font-semibold hover:bg-emerald-700">+ Add Pharmacist</button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {loading ? <p className="text-gray-400 col-span-full text-center py-16">Loading...</p> :
        rows.map(r => (
          <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-base"
                style={{ background: r.avatar_color || '#1D9E75' }}>{r.avatar}</div>
              <div>
                <div className="font-bold text-gray-800">{r.name}</div>
                <div className="text-xs text-gray-400">{r.name_ar}</div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1 ${shiftColor(r.shift)}`}>{r.shift}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <div><span className="text-gray-400">Title:</span> {r.title}</div>
              <div><span className="text-gray-400">Specialty:</span> {r.specialty}</div>
              <div><span className="text-gray-400">Experience:</span> {r.experience} yrs</div>
              <div><span className="text-gray-400">Status:</span> {r.status}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(r)} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-100">Edit</button>
              <button onClick={() => setDelId(r.id)} className="flex-1 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-semibold hover:bg-red-100">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">{modal === 'add' ? 'Add Pharmacist' : 'Edit Pharmacist'}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                ['name','Name (EN) *'],['name_ar','Name (AR)'],
                ['title','Title (EN)'],['title_ar','Title (AR)'],
                ['specialty','Specialty (EN)'],['specialty_ar','Specialty (AR)'],
                ['experience','Experience (yrs)'],['phone','Phone'],
                ['whatsapp','WhatsApp'],['avatar','Avatar Initials'],
              ].map(([n,l]) => (
                <div key={n}>
                  <label className="block text-xs font-bold text-gray-600 mb-1">{l}</label>
                  <input name={n} value={form[n] || ''} onChange={h}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Shift</label>
                <select name="shift" value={form.shift} onChange={h} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
                  {SHIFTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Status</label>
                <select name="status" value={form.status} onChange={h} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-1">Avatar Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" name="avatar_color" value={form.avatar_color || '#1D9E75'} onChange={h} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                  <span className="text-xs text-gray-400">{form.avatar_color}</span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-[#1D9E75] text-white rounded-xl font-semibold disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {delId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-80 shadow-2xl text-center">
            <div className="text-4xl mb-4">🗑️</div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Delete Pharmacist?</h3>
            <p className="text-sm text-gray-500 mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold">Cancel</button>
              <button onClick={() => handleDelete(delId)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
