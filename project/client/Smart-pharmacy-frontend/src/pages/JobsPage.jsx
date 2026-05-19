import { useState } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import api from '../services/api'
import { useToast } from '../component/Toast/Toast'

const POSITIONS = [
  'Pharmacist', 'Assistant Pharmacist', 'Pharmacy Technician',
  'Accountant', 'Cashier', 'Delivery Driver', 'Customer Service', 'Other'
]

const benefits = [
  { icon: '💰', title: 'Competitive Salary', desc: 'Fair compensation + performance bonuses' },
  { icon: '🏥', title: 'Health Insurance', desc: 'Full medical coverage for you & family' },
  { icon: '📚', title: 'Training & Growth', desc: 'Continuous learning programs' },
  { icon: '⏰', title: 'Flexible Shifts', desc: 'Morning, evening, and night options' },
]

export default function JobsPage() {
  const toast = useToast()
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', position: '',
    experience: '', specialization: '', about: ''
  })
  const [cvFile, setCvFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.full_name || !form.email || !form.position) {
      toast('Please fill all required fields', 'error'); return
    }
    setSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (cvFile) fd.append('cv', cvFile)
      await api.post('/jobs', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setSubmitted(true)
      toast('Application submitted successfully! 🎉')
    } catch (err) {
      toast(err.response?.data?.message || 'Submission failed', 'error')
    } finally { setSubmitting(false) }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-gray-50">
        {/* Hero */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 text-center" style={{ background: 'linear-gradient(135deg,#f0fdf6,#e1f5ee)' }}>
          <span className="inline-block bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">We're Hiring</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 sm:mb-3 md:mb-4 font-serif">Join the MediCare Family</h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-md mx-auto leading-relaxed">Be part of a team dedicated to providing exceptional pharmacy services to our community.</p>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
          {/* Benefits */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-1 sm:mb-2 md:mb-3 font-serif">Why Work With Us?</h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 sm:mb-8">We invest in our people and create an environment where everyone thrives.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {benefits.map(b => (
                <div key={b.title} className="bg-white border border-emerald-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="text-xl sm:text-2xl mb-2 sm:mb-3">{b.icon}</div>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm md:text-base mb-1">{b.title}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">{b.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 text-white">
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 font-serif">📋 Open Positions</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                {POSITIONS.map(p => (
                  <span key={p} className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,.15)' }}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-5 sm:p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-96 gap-3 sm:gap-4 text-center py-8 sm:py-12 md:py-16">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center text-2xl sm:text-3xl">✅</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 font-serif">Application Submitted!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xs leading-relaxed">Thank you for your interest. We'll review your application and get back to you within 3–5 business days.</p>
                <button onClick={() => { setSubmitted(false); setForm({ full_name:'', email:'', phone:'', position:'', experience:'', specialization:'', about:'' }); setCvFile(null) }}
                  className="mt-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-50 transition-colors">
                  📝 Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-4 sm:mb-5 md:mb-6 font-serif">Apply Now</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1.5 sm:mb-2">Full Name *</label>
                    <input name="full_name" required value={form.full_name} onChange={handle} placeholder="Your full name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50" />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1.5 sm:mb-2">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handle} placeholder="your@email.com"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50" />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1.5 sm:mb-2">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+970 5xx xxx xxx"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50" />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1.5 sm:mb-2">Position Applied *</label>
                    <select name="position" required value={form.position} onChange={handle}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 bg-white">
                      <option value="">Select a position</option>
                      {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1.5 sm:mb-2">Years of Experience</label>
                    <input name="experience" type="number" min="0" max="50" value={form.experience} onChange={handle} placeholder="e.g. 3"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50" />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1.5 sm:mb-2">Specialization</label>
                    <input name="specialization" value={form.specialization} onChange={handle} placeholder="e.g. Clinical Pharmacy"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50" />
                  </div>
                </div>
                <div className="mb-4 sm:mb-5">
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1.5 sm:mb-2">About Yourself</label>
                  <textarea name="about" rows={3} value={form.about} onChange={handle} placeholder="Tell us about your skills and experience..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 resize-none" />
                </div>
                <div className="mb-5 sm:mb-6 md:mb-7">
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-2 sm:mb-2.5">Upload CV (PDF)</label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-5 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                    <span className="text-xl sm:text-2xl mb-1">{cvFile ? '📄' : '☁️'}</span>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-600 text-center">{cvFile ? cvFile.name : 'Click to upload PDF or image'}</span>
                    <span className="text-[10px] sm:text-[11px] text-gray-500 mt-1">Max 10MB</span>
                    <input type="file" accept=".pdf,image/*" className="hidden" onChange={e => setCvFile(e.target.files[0])} />
                  </label>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm text-white disabled:opacity-50 transition-all hover:shadow-lg"
                  style={{ background: submitting ? '#9ca3af' : 'linear-gradient(135deg,#1D9E75,#0F6E56)' }}>
                  {submitting ? '⏳ Submitting...' : '✉️ Submit Application →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}