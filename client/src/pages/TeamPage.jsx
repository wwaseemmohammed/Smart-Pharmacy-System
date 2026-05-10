import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'
import Navbar  from '../components/Navbar.jsx'
import Footer  from '../components/Footer.jsx'
import api     from '../api.js'
import { useToast } from '../components/Toast.jsx'

const SHIFT_LABELS = {
  morning: { en:'Morning', ar:'صباحي', hours:'08:00 – 16:00', icon:'🌅' },
  evening: { en:'Evening', ar:'مسائي', hours:'16:00 – 00:00', icon:'🌇' },
  night:   { en:'Night',   ar:'ليلي',  hours:'00:00 – 08:00', icon:'🌙' },
}
const WaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function TeamPage() {
  const toast = useToast()
  const [pharmacists, setPharmacists] = useState([])
  const [filter, setFilter] = useState('all')
  const [bookingFor, setBookingFor] = useState(null)
  const [bookedTimes, setBookedTimes] = useState([])
  const [form, setForm] = useState({ patient_name:'', patient_phone:'', appointment_date:'', appointment_time:'', notes:'' })
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/pharmacists').then(r => setPharmacists(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const displayed = filter === 'all' ? pharmacists : pharmacists.filter(p => p.shift === filter)
  const totalExp  = pharmacists.reduce((s, p) => s + (p.experience || 0), 0)
  const avgExp    = pharmacists.length ? Math.round(totalExp / pharmacists.length) : 0

  const getShiftClass = s => ({ morning:'bg-amber-50 text-amber-500 border border-amber-100', evening:'bg-blue-50 text-blue-500 border border-blue-100', night:'bg-purple-50 text-purple-500 border border-purple-100' }[s] || '')

  const openBooking = async (p) => {
    setBookingFor(p)
    setForm({ patient_name:'', patient_phone:'', appointment_date:'', appointment_time:'', notes:'' })
    setBookedTimes([])
  }

  const fetchAvailability = async (pharmacist_id, date) => {
    if (!pharmacist_id || !date) return
    try {
      const { data } = await api.get('/appointments/availability', { params: { pharmacist_id, date } })
      setBookedTimes(data.bookedTimes || [])
    } catch {}
  }

  const handleBooking = async () => {
    if (!form.patient_name || !form.appointment_date || !form.appointment_time) {
      toast('Please fill all required fields', 'error'); return
    }
    setSubmitting(true)
    try {
      await api.post('/appointments', { ...form, pharmacist_id: bookingFor.id })
      toast('Appointment booked successfully! 🎉')
      setBookingFor(null)
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to book appointment', 'error')
    } finally { setSubmitting(false) }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-gray-50">
        <div className="flex-1 p-8 pb-12 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-widest uppercase text-teal-500 mb-1">Our Team</p>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Meet Our Pharmacists</h1>
                <p className="text-xs text-gray-500 mt-1">طاقم الصيادلة المتخصصين في خدمتكم</p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {['all','morning','evening','night'].map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`py-1 px-3.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1
                      ${filter === f ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600'}`}>
                    {f === 'all' ? 'All' : `${SHIFT_LABELS[f].icon} ${SHIFT_LABELS[f].en}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-0.5 bg-gray-200 border border-gray-200 rounded-lg overflow-hidden mb-7">
            {[
              { bg:'bg-teal-50', emoji:'👨‍⚕️', val: pharmacists.length, label:'Pharmacists' },
              { bg:'bg-amber-50', emoji:'⭐', val: `${avgExp}+ yrs`, label:'Avg. Experience' },
              { bg:'bg-blue-50', emoji:'🕐', val: '24/7', label:'Coverage' },
            ].map((s,i) => (
              <div key={i} className="flex-1 bg-white p-3.5 px-5 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-md flex items-center justify-center text-base flex-shrink-0 ${s.bg}`}>{s.emoji}</div>
                <div>
                  <div className="text-base font-bold text-gray-800 leading-none">{s.val}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading team...</div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
              {displayed.map(p => {
                const shift = SHIFT_LABELS[p.shift] || SHIFT_LABELS.morning
                return (
                  <div key={p.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="p-5 pb-4 flex items-start gap-3.5">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold text-white tracking-wide flex-shrink-0"
                        style={{ background: p.avatar_color || '#1D9E75' }}>
                        {p.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-gray-800 truncate">{p.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{p.name_ar}</div>
                        <span className="inline-flex items-center mt-1 py-0.5 px-2 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-600 border border-teal-100">{p.title_ar}</span>
                      </div>
                    </div>
                    <div className="h-px bg-gray-100 mx-5 mb-4" />
                    <div className="px-5 flex flex-col gap-2 mb-4">
                      {[
                        { icon:'🎓', label:'Specialty',   val: p.specialty_ar },
                        { icon:'📅', label:'Experience',  val: `${p.experience} years · ${p.experience} سنة` },
                        { icon: shift.icon, label:'Shift', val: `${shift.ar} · ${shift.hours}`, cls: getShiftClass(p.shift) },
                      ].map((row,i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="w-5 h-5 rounded-sm bg-gray-100 flex items-center justify-center text-[11px] flex-shrink-0">{row.icon}</div>
                          <span className="text-gray-400 text-[11px] min-w-[50px]">{row.label}</span>
                          {row.cls ? (
                            <span className={`inline-flex items-center gap-1 py-0.5 px-2 rounded-full text-[11px] font-medium ${row.cls}`}>{row.val}</span>
                          ) : (
                            <span className="text-gray-700 font-medium text-xs">{row.val}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-gray-100 mx-5" />
                    <div className="px-5 pb-5 flex gap-2 mt-4">
                      <a href={`tel:${p.phone}`}
                        className="flex-1 py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 bg-gray-50 text-gray-700 border border-gray-200 hover:border-teal-400 hover:text-teal-600 transition-all">
                        <Phone size={12} />{p.phone}
                      </a>
                      <button onClick={() => openBooking(p)}
                        className="flex-1 py-2 rounded-md text-xs font-semibold bg-teal-500 text-white hover:bg-teal-600 transition-all">
                        📅 Book Appointment
                      </button>
                    </div>
                    <div className="px-5 pb-4">
                      <a href={`https://wa.me/${p.whatsapp}`} target="_blank" rel="noopener noreferrer"
                        className="w-full py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 bg-[#25D366] text-white hover:bg-[#1ebe5a] transition-all">
                        <WaIcon /> واتساب
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Booking modal */}
      {bookingFor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-[420px] shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Book Appointment</h3>
            <p className="text-sm text-gray-500 mb-6">With <span className="font-semibold text-teal-600">{bookingFor.name}</span></p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Your Name *</label>
                <input type="text" placeholder="Full name" value={form.patient_name}
                  onChange={e => setForm(p => ({ ...p, patient_name: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Phone Number</label>
                <input type="tel" placeholder="+970 5xx xxx xxx" value={form.patient_phone}
                  onChange={e => setForm(p => ({ ...p, patient_phone: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Date *</label>
                  <input type="date" value={form.appointment_date} min={new Date().toISOString().split('T')[0]}
                    onChange={e => { const d = e.target.value; setForm(p => ({ ...p, appointment_date: d })); fetchAvailability(bookingFor.id, d) }}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Time *</label>
                  <select value={form.appointment_time} onChange={e => setForm(p => ({ ...p, appointment_time: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400">
                    <option value="">Select time</option>
                    {['09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00'].map(t => (
                      <option key={t} value={t} disabled={bookedTimes.includes(t+':00') || bookedTimes.includes(t)}>
                        {t} {bookedTimes.includes(t+':00') || bookedTimes.includes(t) ? '(Booked)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Notes (optional)</label>
                <textarea rows={2} placeholder="Any notes..." value={form.notes}
                  onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setBookingFor(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleBooking} disabled={submitting}
                className="flex-1 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold disabled:opacity-50">
                {submitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}
