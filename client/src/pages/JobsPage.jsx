import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import api from '../api.js'
import { useToast } from '../components/Toast.jsx'

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
        <section className="py-16 px-6 text-center" style={{ background: 'linear-gradient(135deg,#f0fdf6,#e1f5ee)' }}>
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">We're Hiring</span>
          <h1 className="text-4xl font-bold text-slate-800 mb-3 font-serif">Join the MediCare Family</h1>
          <p className="text-base text-slate-500 max-w-md mx-auto">Be part of a team dedicated to providing exceptional pharmacy services to our community.</p>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 font-serif">Why Work With Us?</h2>
            <p className="text-sm text-slate-500 mb-8">We invest in our people and create an environment where everyone thrives.</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {benefits.map(b => (
                <div key={b.title} className="bg-white border border-emerald-100 rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <div className="text-2xl mb-3">{b.icon}</div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{b.title}</h3>
                  <p className="text-xs text-slate-400">{b.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2 font-serif">Open Positions</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {POSITIONS.map(p => (
                  <span key={p} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,.15)' }}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl">✅</div>
                <h3 className="text-xl font-bold text-slate-800 font-serif">Application Submitted!</h3>
                <p className="text-sm text-slate-500 max-w-xs">Thank you for your interest. We'll review your application and get back to you within 3–5 business days.</p>
                <button onClick={() => { setSubmitted(false); setForm({ full_name:'', email:'', phone:'', position:'', experience:'', specialization:'', about:'' }); setCvFile(null) }}
                  className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-50">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold text-slate-800 mb-6 font-serif">Apply Now</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Full Name *</label>
                    <input name="full_name" required value={form.full_name} onChange={handle} placeholder="Your full name"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handle} placeholder="your@email.com"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+970 5xx xxx xxx"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Position Applied *</label>
                    <select name="position" required value={form.position} onChange={handle}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 bg-white">
                      <option value="">Select a position</option>
                      {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Years of Experience</label>
                    <input name="experience" type="number" min="0" max="50" value={form.experience} onChange={handle} placeholder="e.g. 3"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Specialization</label>
                    <input name="specialization" value={form.specialization} onChange={handle} placeholder="e.g. Clinical Pharmacy"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-600 mb-1">About Yourself</label>
                  <textarea name="about" rows={3} value={form.about} onChange={handle} placeholder="Tell us about your skills and experience..."
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 resize-none" />
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-600 mb-2">Upload CV (PDF)</label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-5 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                    <span className="text-2xl mb-1">{cvFile ? '📄' : '☁️'}</span>
                    <span className="text-xs font-medium text-gray-500">{cvFile ? cvFile.name : 'Click to upload PDF or image'}</span>
                    <span className="text-[11px] text-gray-400 mt-0.5">Max 10MB</span>
                    <input type="file" accept=".pdf,image/*" className="hidden" onChange={e => setCvFile(e.target.files[0])} />
                  </label>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white disabled:opacity-50 transition-all"
                  style={{ background: 'linear-gradient(135deg,#1D9E75,#0F6E56)' }}>
                  {submitting ? 'Submitting...' : 'Submit Application →'}
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
