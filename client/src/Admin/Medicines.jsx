import { useState, useEffect, useRef } from 'react'
import api from '../api.js'
import { useToast } from '../components/Toast.jsx'

const CATS = ['pain','antibiotic','vitamin','cardiac','allergy','other']
const EMPTY = { name:'', name_ar:'', category:'pain', price:'', stock:'', min_stock:'10', description:'', usage_info:'', is_new:'0', popular:'50' }

export default function Medicines() {
  const toast = useToast()
  const [meds, setMeds]       = useState([])
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('all')
  const [sort, setSort]       = useState('name')
  const [loading, setLoading] = useState(true)
  const [modal, setModal]     = useState(null)  // null | 'add' | med-object
  const [form, setForm]       = useState(EMPTY)
  const [imgFile, setImgFile] = useState(null)
  const [saving, setSaving]   = useState(false)
  const [delId, setDelId]     = useState(null)
  const fileRef = useRef()

  const fetch = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/medicines', { params: { search, category: cat, sort, limit: 200 } })
      setMeds(data.medicines || [])
    } catch { toast('Failed to load medicines', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [search, cat, sort])

  const openAdd  = () => { setForm(EMPTY); setImgFile(null); setModal('add') }
  const openEdit = (m) => { setForm({ ...EMPTY, ...m, price: m.price, stock: m.stock, min_stock: m.min_stock, is_new: String(m.is_new), popular: String(m.popular) }); setImgFile(null); setModal(m) }

  const handleSave = async () => {
    if (!form.name || !form.price) { toast('Name and price are required', 'error'); return }
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k,v]) => fd.append(k, v ?? ''))
      if (imgFile) fd.append('image', imgFile)
      if (modal === 'add') await api.post('/medicines', fd, { headers: {'Content-Type':'multipart/form-data'} })
      else                 await api.put(`/medicines/${modal.id}`, fd, { headers: {'Content-Type':'multipart/form-data'} })
      toast(modal === 'add' ? 'Medicine added!' : 'Medicine updated!')
      setModal(null); fetch()
    } catch (err) { toast(err.response?.data?.message || 'Failed to save', 'error') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/medicines/${id}`)
      toast('Medicine deleted'); setDelId(null); fetch()
    } catch { toast('Delete failed', 'error') }
  }

  const h = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const stockColor = (s) => s === 0 ? 'text-red-600 bg-red-50' : s <= 10 ? 'text-orange-600 bg-orange-50' : 'text-emerald-600 bg-emerald-50'

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Medicines</h1>
          <p className="text-sm text-gray-400">{meds.length} total items</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#1D9E75] text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all">
          + Add Medicine
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-5">
        <div className="relative flex-1 min-w-48">
          <input type="text" placeholder="Search medicines..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 bg-white" />
          <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select value={cat} onChange={e => setCat(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
          <option value="all">All Categories</option>
          {CATS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
          <option value="name">Sort: Name</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Medicine</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-16 text-gray-400">Loading...</td></tr>
            ) : meds.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-16 text-gray-400">No medicines found</td></tr>
            ) : meds.map(m => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="font-semibold text-gray-800">{m.name}</div>
                  <div className="text-xs text-gray-400">{m.name_ar}</div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold capitalize">{m.category}</span>
                </td>
                <td className="px-4 py-3.5 font-bold text-gray-800">${Number(m.price).toFixed(2)}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${stockColor(m.stock)}`}>
                    {m.stock} {m.stock <= m.min_stock && m.stock > 0 ? '⚠️' : m.stock === 0 ? '✖' : ''}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right flex justify-end gap-2">
                  <button onClick={() => openEdit(m)} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100">Edit</button>
                  <button onClick={() => setDelId(m.id)} className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modal !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">{modal === 'add' ? 'Add Medicine' : 'Edit Medicine'}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                { name:'name',      label:'Name (EN) *',    col:1 },
                { name:'name_ar',   label:'Name (AR)',       col:1 },
                { name:'price',     label:'Price ($) *',     type:'number', col:1 },
                { name:'stock',     label:'Stock Qty',       type:'number', col:1 },
                { name:'min_stock', label:'Min Stock Level', type:'number', col:1 },
                { name:'popular',   label:'Popularity (0-100)', type:'number', col:1 },
              ].map(f => (
                <div key={f.name} className={f.col === 2 ? 'col-span-2' : ''}>
                  <label className="block text-xs font-bold text-gray-600 mb-1">{f.label}</label>
                  <input name={f.name} type={f.type || 'text'} value={form[f.name] || ''} onChange={h}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
                <select name="category" value={form.category} onChange={h} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
                  {CATS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">New Arrival?</label>
                <select name="is_new" value={form.is_new} onChange={h} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
                <textarea name="description" rows={2} value={form.description || ''} onChange={h}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 resize-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-1">Usage Instructions</label>
                <textarea name="usage_info" rows={2} value={form.usage_info || ''} onChange={h}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 resize-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-2">Medicine Image</label>
                <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-emerald-400 transition-all">
                  <span className="text-2xl">{imgFile ? '🖼️' : '📸'}</span>
                  <span className="text-xs text-gray-500">{imgFile ? imgFile.name : 'Click to upload image'}</span>
                  <input type="file" accept="image/*" className="hidden" ref={fileRef} onChange={e => setImgFile(e.target.files[0])} />
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-[#1D9E75] hover:bg-emerald-700 text-white rounded-xl font-semibold disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {delId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-80 shadow-2xl text-center">
            <div className="text-4xl mb-4">🗑️</div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Delete Medicine?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(delId)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
