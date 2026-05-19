import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Certified Medicines',
    desc: 'Every product is sourced from licensed manufacturers and verified for quality and authenticity.',
    color: '#1D9E75',
    bg: '#E1F5EE',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Expert Pharmacists',
    desc: 'Licensed team providing personalized consultations, drug interaction checks, and ongoing guidance.',
    color: '#185FA5',
    bg: '#E6F1FB',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast & Reliable',
    desc: 'Walk in or order online — we process prescriptions quickly with same-day pickup for urgent needs.',
    color: '#BA7517',
    bg: '#FAEEDA',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Affordable Prices',
    desc: 'Competitive pricing, insurance support, and a loyalty program so you always get the best value.',
    color: '#7F77DD',
    bg: '#EEEDFE',
  },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #f8fffe 0%, #f0fdf6 100%)' }}
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The MediCare Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
            className="text-base text-slate-500 max-w-md mx-auto leading-relaxed"
          >
            We combine clinical expertise with heartfelt service to deliver a pharmacy experience that truly puts patients first.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(29,158,117,0.12)' }}
              className="bg-white border border-emerald-100 rounded-2xl p-7 cursor-default"
            >
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: f.bg, color: f.color, width: 52, height: 52 }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {f.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}