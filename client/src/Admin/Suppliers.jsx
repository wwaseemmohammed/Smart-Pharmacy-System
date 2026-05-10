import { useState, useEffect } from 'react'
import api from '../api.js'
import { useToast } from '../components/Toast.jsx'

const EMPTY = { name:'', email:'', phone:'', address:'', status:'Active' }

export default function Suppliers() {
  const toast = useToast()
  const [rows, setRows]       = useState([])
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState(true)
  const [modal, setModal]     = useState(null)
  const [form, setForm]       = useState(EMPTY)
  const [saving, setSaving]   = useState(false)
  const [delId, setDelId]     = useState(null)

  const fetch = async () => {
    setLoading(true)
    try { const { data } = await api.get('/suppliers', { params: { search } }); setRows(data) }
    catch { toast('Failed to load', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [search])

  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (r) => { setForm({ ...r }); setModal(r) }
  const h        = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = async () => {
    if (!form.name) { toast('Name required', 'error'); return }
    setSaving(true)
    try {
      if (modal === 'add') await api.post('/suppliers', form)
      else                 await api.put(`/suppliers/${modal.id}`, form)
      toast(modal === 'add' ? 'Supplier added!' : 'Supplier updated!')
      setModal(null); fetch()
    } catch (err) { toast(err.response?.data?.message || 'Failed', 'error') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    try { await api.delete(`/suppliers/${id}`); toast('Deleted'); setDelId(null); fetch() }
    catch { toast('Delete failed', 'error') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
          <p className="text-sm text-gray-400">{rows.length} suppliers</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <input type="text" placeholder="Search suppliers..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 w-60" />
            <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button onClick={openAdd} className="px-5 py-2.5 bg-[#1D9E75] text-white rounded-xl text-sm font-semibold hover:bg-emerald-700">+ Add Supplier</button>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {loading ? <p className="text-gray-400 col-span-full text-center py-16">Loading...</p> :
        rows.length === 0 ? <p className="text-gray-400 col-span-full text-center py-16">No suppliers found</p> :
        rows.map(r => (
          <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg">🏭</div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{r.status}</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{r.name}</h3>
            <div className="text-xs text-gray-400 space-y-1 mb-4">
              {r.email   && <div>📧 {r.email}</div>}
              {r.phone   && <div>📞 {r.phone}</div>}
              {r.address && <div>📍 {r.address}</div>}
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
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">{modal === 'add' ? 'Add Supplier' : 'Edit Supplier'}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              {[['name','Company Name *'],['email','Email'],['phone','Phone'],['address','Address']].map(([n,l]) => (
                <div key={n}>
                  <label className="block text-xs font-bold text-gray-600 mb-1">{l}</label>
                  <input name={n} value={form[n] || ''} onChange={h}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Status</label>
                <select name="status" value={form.status} onChange={h} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
            <h3 className="font-bold text-gray-800 text-lg mb-2">Delete Supplier?</h3>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDelId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold">Cancel</button>
              <button onClick={() => handleDelete(delId)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
