import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const stats = [
  { num: '14+', label: 'Years of Service' },
  { num: '12k+', label: 'Happy Patients' },
  { num: '5k+', label: 'Products' },
]

const services = [
  'Prescription Filling',
  'Vitamins & Supplements',
  'Blood Pressure Monitoring',
  'Vaccination Services',
]

export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden pt-16"
      style={{ background: 'linear-gradient(145deg, #f0fdf6 0%, #e1f5ee 45%, #dceefb 100%)' }}
    >
      {/* Blobs */}
      <div
        className="absolute top-[-10%] right-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(29,158,117,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(24,95,165,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center w-full">

        {/* ── Text ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-1.5 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">
              Open Now · Serving Since 2010
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 mb-5"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Your Trusted <span className="text-emerald-600">Pharmacy</span>
            <br />for Health & Care
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed mb-9 max-w-md"
          >
            From prescription medicines to wellness products, MediCare Pharmacy has been your community health partner for over 14 years.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/medicines"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #1D9E75, #0F6E56)',
                boxShadow: '0 8px 24px rgba(29,158,117,0.35)',
              }}
            >
              View Medicines
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            {/* ✅ التعديل هنا */}
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-emerald-700 text-sm border border-emerald-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            >
              Meet Our Team
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-10 mt-12"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl font-bold text-emerald-600"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {s.num}
                </div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div
            className="bg-white rounded-3xl p-8 relative overflow-hidden"
            style={{
              boxShadow:
                '0 24px 64px rgba(29,158,117,0.12), 0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: 'linear-gradient(90deg, #1D9E75, #185FA5)' }}
            />

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1D9E75, #0F6E56)',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-base">
                  MediCare Pharmacy
                </div>
                <div className="text-emerald-600 text-xs font-semibold">
                  Certified & Trusted
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 mb-4">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                Today's Hours
              </div>
              <div className="font-semibold text-slate-800">
                8:00 AM – 10:00 PM
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-600 font-medium">
                  Currently Open
                </span>
              </div>
            </div>

            {services.map((s, i) => (
              <div
                key={s}
                className={`flex items-center gap-2.5 py-2.5 ${
                  i < services.length - 1
                    ? 'border-b border-slate-50'
                    : ''
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="#1D9E75" className="w-3.5 h-3.5">
                    <path d="M16.707 5.293l-8 8-4-4" />
                  </svg>
                </div>
                <span className="text-sm text-slate-600 font-medium">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}