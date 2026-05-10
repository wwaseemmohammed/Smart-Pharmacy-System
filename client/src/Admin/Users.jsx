import { useState, useEffect } from 'react'
import api from '../api.js'
import { useToast } from '../components/Toast.jsx'

const EMPTY = { name:'', email:'', password:'', role:'customer', status:'Active' }

export default function Users() {
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
    try { const { data } = await api.get('/users', { params: { search } }); setRows(data) }
    catch { toast('Failed to load users', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [search])

  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (r) => { setForm({ ...r, password: '' }); setModal(r) }
  const h        = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = async () => {
    if (!form.name || !form.email) { toast('Name and email required', 'error'); return }
    setSaving(true)
    try {
      if (modal === 'add') await api.post('/users', form)
      else                 await api.put(`/users/${modal.id}`, form)
      toast(modal === 'add' ? 'User added!' : 'User updated!')
      setModal(null); fetch()
    } catch (err) { toast(err.response?.data?.message || 'Failed', 'error') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    try { await api.delete(`/users/${id}`); toast('User deleted'); setDelId(null); fetch() }
    catch { toast('Delete failed', 'error') }
  }

  const roleColor = r => ({ admin:'bg-purple-50 text-purple-700', pharmacist:'bg-blue-50 text-blue-700', customer:'bg-gray-100 text-gray-600' }[r] || '')

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <p className="text-sm text-gray-400">{rows.length} accounts</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 w-60" />
            <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button onClick={openAdd} className="px-5 py-2.5 bg-[#1D9E75] text-white rounded-xl text-sm font-semibold hover:bg-emerald-700">+ Add User</button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Name','Email','Role','Status','Joined','Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? <tr><td colSpan={6} className="text-center py-16 text-gray-400">Loading...</td></tr> :
            rows.length === 0 ? <tr><td colSpan={6} className="text-center py-16 text-gray-400">No users found</td></tr> :
            rows.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-5 py-3.5 font-semibold text-gray-800">{r.name}</td>
                <td className="px-5 py-3.5 text-gray-500">{r.email}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${roleColor(r.role)}`}>{r.role}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.status==='Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-500'}`}>{r.status}</span>
                </td>
                <td className="px-5 py-3.5 text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-3.5 flex gap-2">
                  <button onClick={() => openEdit(r)} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100">Edit</button>
                  <button onClick={() => setDelId(r.id)} className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">{modal === 'add' ? 'Add User' : 'Edit User'}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              {[['name','Full Name *'],['email','Email *']].map(([n,l]) => (
                <div key={n}>
                  <label className="block text-xs font-bold text-gray-600 mb-1">{l}</label>
                  <input name={n} value={form[n] || ''} onChange={h}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                </div>
              ))}
              {modal === 'add' && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Password *</label>
                  <input type="password" name="password" value={form.password || ''} onChange={h}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Role</label>
                  <select name="role" value={form.role} onChange={h} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
                    {['customer','pharmacist','admin'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Status</label>
                  <select name="status" value={form.status} onChange={h} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
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
            <h3 className="font-bold text-gray-800 text-lg mb-2">Delete User?</h3>
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
