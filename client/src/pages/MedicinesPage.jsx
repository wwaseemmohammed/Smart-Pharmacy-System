import { useState, useEffect, useCallback } from 'react'
import { Search, SlidersHorizontal, ShoppingCart, X, Minus, Plus, ShoppingBag, ClipboardList, Pill } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../api.js'
import { useToast } from '../components/Toast.jsx'

const CAT_LABELS = { pain:'Pain Relief', antibiotic:'Antibiotics', vitamin:'Vitamins', cardiac:'Cardiac Care', allergy:'Allergy', other:'Other' }
const CAT_EMOJI  = { pain:'💊', antibiotic:'🧫', vitamin:'🌿', cardiac:'❤️', allergy:'🌸', other:'🔵' }
const SORT_OPTS  = [
  { value:'popular',    label:'Most Popular' },
  { value:'price-asc',  label:'Price: Low → High' },
  { value:'price-desc', label:'Price: High → Low' },
  { value:'newest',     label:'Newest Arrivals' },
]
const CATEGORIES = [
  { id:'all', label:'All Medications' },
  { id:'pain', label:'Pain Relief' },
  { id:'antibiotic', label:'Antibiotics' },
  { id:'vitamin', label:'Vitamins' },
  { id:'cardiac', label:'Cardiac Care' },
  { id:'allergy', label:'Allergy' },
]
const PHARMACY_WA = '970591000001'

function getStockStatus(stock) {
  if (stock === 0)  return 'out'
  if (stock <= 10)  return 'low'
  return 'ok'
}

function buildWaMessage(cart, meds, total) {
  const lines = ['🛒 *طلب أدوية جديد — MediCare*', '─────────────────────']
  Object.entries(cart).forEach(([id, qty]) => {
    const m = meds.find(x => x.id === Number(id))
    if (!m) return
    lines.push(`💊 *${m.name}*`)
    lines.push(`   الكمية: ${qty}  |  السعر: $${(m.price * qty).toFixed(2)}`)
  })
  lines.push('─────────────────────')
  lines.push(`💰 *الإجمالي: $${total.toFixed(2)}*`)
  lines.push('', 'يرجى تأكيد الطلب وإرسال عنوان التوصيل. شكراً 🙏')
  return encodeURIComponent(lines.join('\n'))
}

export default function MedicinesPage() {
  const toast = useToast()
  const [meds, setMeds]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort]         = useState('popular')
  const [maxPrice, setMaxPrice] = useState(100)
  const [cart, setCart]         = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutForm, setCheckoutForm] = useState(false)
  const [orderData, setOrderData] = useState({ customer_name:'', customer_phone:'', address:'' })
  const [submitting, setSubmitting] = useState(false)

  const fetchMeds = useCallback(async () => {
    try {
      setLoading(true)
      const params = { search, category, sort, limit: 100 }
      const { data } = await api.get('/medicines', { params })
      setMeds(data.medicines || [])
    } catch {
      // fallback: show empty
      setMeds([])
    } finally {
      setLoading(false)
    }
  }, [search, category, sort])

  useEffect(() => { fetchMeds() }, [fetchMeds])

  const filtered = meds.filter(m => m.price <= maxPrice)

  const addToCart = (id) => { setCart(p => ({ ...p, [id]: (p[id] ?? 0) + 1 })); toast('Added to cart') }
  const changeQty = (id, d) => setCart(p => { const n = { ...p, [id]: (p[id] ?? 0) + d }; if (n[id] <= 0) delete n[id]; return n })
  const removeFromCart = (id) => setCart(p => { const n = { ...p }; delete n[id]; return n })
  const clearCart = () => setCart({})

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartEntries = Object.entries(cart)
  const total = cartEntries.reduce((sum, [id, qty]) => {
    const m = meds.find(x => x.id === Number(id))
    return sum + (m ? m.price * qty : 0)
  }, 0)

  const handleWhatsApp = () => {
    const msg = buildWaMessage(cart, meds, total)
    window.open(`https://wa.me/${PHARMACY_WA}?text=${msg}`, '_blank')
    clearCart(); setCartOpen(false)
    toast('Order sent via WhatsApp!')
  }

  const handleCheckout = async () => {
    if (!orderData.customer_name) { toast('Please enter your name', 'error'); return }
    setSubmitting(true)
    try {
      const items = cartEntries.map(([id, qty]) => ({ medicine_id: Number(id), quantity: qty }))
      await api.post('/orders', { ...orderData, items })
      clearCart(); setCartOpen(false); setCheckoutForm(false)
      toast('Order placed successfully! 🎉')
      fetchMeds()
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to place order', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 gap-4 shadow-sm">
        <Link to="/" className="flex items-center gap-2 text-sm font-bold text-teal-600">
          <div className="w-7 h-7 bg-teal-500 rounded-md flex items-center justify-center"><Pill size={15} color="white" /></div>
          <span>MediCare</span>
        </Link>
        <nav className="flex gap-0.5 bg-gray-100 p-0.5 rounded-md">
          {[{to:'/medicines',label:'Browse'},{to:'/team',label:'Our Team'},{to:'/careers',label:'Careers'}].map(l => (
            <Link key={l.to} to={l.to} className="px-3 py-1 rounded-sm text-xs font-medium text-gray-500 hover:text-teal-600 transition-all">{l.label}</Link>
          ))}
        </nav>
        <button onClick={() => setCartOpen(o => !o)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-200 rounded-md bg-white text-xs font-medium text-gray-700 hover:border-teal-400 hover:text-teal-600 transition-all">
          <ShoppingCart size={15} />
          <span>Cart</span>
          {cartCount > 0 && <span className="bg-teal-500 text-white w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
        </button>
      </header>

      <div className="flex flex-1" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Sidebar */}
        <aside className="w-64 min-w-64 bg-white border-r border-gray-100 overflow-y-auto p-5 flex-shrink-0 sticky top-14" style={{ height: 'calc(100vh - 56px)' }}>
          <p className="text-[11px] font-bold text-emerald-600 tracking-widest uppercase mb-3">Categories</p>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)}
              className={`flex items-center justify-between w-full py-2 px-3 rounded-lg text-sm text-left transition-all mb-1
                ${category === c.id ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200' : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'}`}>
              <span>{c.label}</span>
            </button>
          ))}
          <p className="text-[11px] font-bold text-emerald-600 tracking-widest uppercase mb-3 mt-6">Price Range</p>
          <div className="px-1">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>$0</span>
              <span className="font-semibold text-emerald-600">${maxPrice}</span>
            </div>
            <input type="range" min={0} max={100} step={1} value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 accent-emerald-500 rounded-lg" />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-5 overflow-y-auto min-w-0">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex-1 relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="text" placeholder="Search medications..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full py-2 px-3 pl-8 border border-gray-200 rounded-md bg-white text-xs outline-none focus:border-teal-400 transition-all" />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="py-2 px-2.5 border border-gray-200 rounded-md bg-white text-xs cursor-pointer outline-none">
              {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <span className="text-xs text-gray-400 whitespace-nowrap">{filtered.length} results</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Loading medicines...</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2.5 p-16 text-gray-400 text-xs">
              <SlidersHorizontal size={32} strokeWidth={1.2} />
              <p>No medications match your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(195px,1fr))] gap-3.5">
              {filtered.map(m => {
                const status = getStockStatus(m.stock)
                const qty = cart[m.id] ?? 0
                const catBg = { pain:'bg-red-50', antibiotic:'bg-blue-50', vitamin:'bg-amber-50', cardiac:'bg-teal-50', allergy:'bg-gray-50', other:'bg-gray-50' }[m.category] || 'bg-gray-50'
                return (
                  <article key={m.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden transition-all hover:border-gray-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className={`h-28 flex items-center justify-center relative ${catBg}`}>
                      <span className="text-[38px]">{CAT_EMOJI[m.category] || '💊'}</span>
                      {m.is_new   && <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500 text-white">New</span>}
                      {status==='low' && <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100">Low stock</span>}
                      {status==='out' && <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100">Out of stock</span>}
                    </div>
                    <div className="p-2.5">
                      <p className="text-[11px] font-bold text-teal-600 mb-0.5 uppercase tracking-wider">{CAT_LABELS[m.category] || m.category}</p>
                      <h3 className="text-sm font-semibold text-gray-800 mb-1 tracking-tight">{m.name}</h3>
                      <p className="text-xs text-gray-500 mb-1.5 line-clamp-2">{m.description}</p>
                      {m.usage_info && (
                        <div className="flex items-start gap-1.25 text-xs text-gray-500 bg-gray-50 rounded-sm p-1.5 mb-2 leading-relaxed">
                          <ClipboardList size={11} className="mt-0.5 flex-shrink-0 text-teal-500" />
                          <span>{m.usage_info}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-teal-600">${Number(m.price).toFixed(2)}</span>
                        <button
                          onClick={() => status !== 'out' && addToCart(m.id)}
                          disabled={status === 'out'}
                          className={`flex items-center gap-1 py-1 px-2.5 rounded-md text-xs font-semibold transition-colors
                            ${status === 'out'  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                              qty > 0           ? 'bg-teal-50 text-teal-700 border border-teal-200'  :
                                                  'bg-teal-500 text-white hover:bg-teal-600'}`}>
                          {status === 'out' ? 'Unavailable' : qty > 0 ? <><ShoppingCart size={11} />{qty} in cart</> : '+ Add'}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </main>

        {/* Cart Panel */}
        {cartOpen && (
          <aside className="w-72 min-w-72 bg-white border-l border-gray-100 overflow-hidden flex flex-col flex-shrink-0 sticky top-14" style={{ height: 'calc(100vh - 56px)' }}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold">Shopping Cart</h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600 p-1"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {cartEntries.length === 0 ? (
                <div className="flex flex-col items-center gap-2.5 p-10 text-gray-400 text-xs">
                  <ShoppingBag size={32} strokeWidth={1.2} />
                  <p>Your cart is empty</p>
                </div>
              ) : cartEntries.map(([id, qty]) => {
                const m = meds.find(x => x.id === Number(id))
                if (!m) return null
                return (
                  <div key={id} className="bg-gray-50 rounded-md p-2.5 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium leading-5">{m.name}</span>
                      <button className="text-[11px] text-red-400 whitespace-nowrap p-0" onClick={() => removeFromCart(Number(id))}>Remove</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-white border border-gray-200 rounded-sm overflow-hidden">
                        <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100" onClick={() => changeQty(Number(id), -1)}><Minus size={11} /></button>
                        <span className="text-xs font-bold min-w-6 text-center">{qty}</span>
                        <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100" onClick={() => changeQty(Number(id), 1)}><Plus size={11} /></button>
                      </div>
                      <span className="text-xs font-bold text-teal-600">${(m.price * qty).toFixed(2)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-4 border-t border-gray-100">
              {cartEntries.length > 0 && (
                <button onClick={() => cartEntries.forEach(([id]) => removeFromCart(Number(id)))}
                  className="w-full py-2 bg-red-50 text-red-500 border border-red-100 rounded-md text-xs font-semibold mb-3 hover:bg-red-100">
                  Clear Cart
                </button>
              )}
              <div className="flex justify-between text-sm font-bold mb-3">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              {/* WhatsApp */}
              <button onClick={handleWhatsApp} disabled={cartEntries.length === 0}
                className="w-full py-2.5 bg-[#25D366] text-white rounded-md text-xs font-bold flex items-center justify-center gap-1.5 mb-2 disabled:opacity-40 hover:bg-[#1ebe5a]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                اطلب عبر واتساب
              </button>
              {/* Classic checkout */}
              <button onClick={() => setCheckoutForm(true)} disabled={cartEntries.length === 0}
                className="w-full py-2.5 bg-teal-500 text-white rounded-md text-sm font-bold disabled:opacity-40 hover:bg-teal-600">
                Place Order
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Checkout modal */}
      {checkoutForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Confirm Your Order</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Full Name *</label>
                <input type="text" placeholder="Your name" value={orderData.customer_name}
                  onChange={e => setOrderData(p => ({ ...p, customer_name: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Phone Number</label>
                <input type="tel" placeholder="+970 5xx xxx xxx" value={orderData.customer_phone}
                  onChange={e => setOrderData(p => ({ ...p, customer_phone: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Delivery Address</label>
                <input type="text" placeholder="Street, City" value={orderData.address}
                  onChange={e => setOrderData(p => ({ ...p, address: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-sm">
                <div className="flex justify-between font-bold"><span>Total</span><span className="text-teal-600">${total.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setCheckoutForm(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleCheckout} disabled={submitting}
                className="flex-1 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold disabled:opacity-50">
                {submitting ? 'Placing...' : 'Confirm Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
