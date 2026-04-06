import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const milestones = [
  { year: '2010', text: 'Founded in the heart of Tubas with a commitment to community health.' },
  { year: '2015', text: 'Expanded to include vaccination clinics and chronic disease management.' },
  { year: '2020', text: 'Launched 24/7 online consultation and home delivery services.' },
  { year: '2024', text: 'Certified as a model pharmacy by the Ministry of Health.' },
]

const highlights = [
  { icon: '🏥', label: 'Community-first approach' },
  { icon: '📋', label: 'Licensed & regulated' },
  { icon: '💊', label: '5,000+ products' },
  { icon: '🤝', label: 'Partner with 20+ clinics' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* Left visual */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-3xl p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #E1F5EE, #dceefb)' }}>
            <div className="absolute top-[-20px] right-[-20px] w-44 h-44 rounded-full opacity-30"
              style={{ background: 'rgba(29,158,117,0.15)' }} />

            <div className="text-center mb-8">
              <div className="text-7xl font-bold text-emerald-500 leading-none" style={{ fontFamily: 'Georgia, serif' }}>14</div>
              <div className="text-sm font-bold text-emerald-700 tracking-widest uppercase mt-1">Years of Service</div>
            </div>

            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="flex gap-3.5 mb-4"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-emerald-600">{m.year}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-1">{m.text}</p>
              </motion.div>
            ))}
          </div>

          {/* ISO badge */}
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 border border-emerald-100"
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <div className="text-xl font-bold text-blue-600" style={{ fontFamily: 'Georgia, serif' }}>ISO</div>
            <div className="text-xs text-slate-400">Certified 2018</div>
          </div>
        </motion.div>

        {/* Right text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-5">
            Our Story
          </span>

          <h2 className="text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-5"
            style={{ fontFamily: 'Georgia, serif' }}>
            Established in 2010,<br />Built on Trust
          </h2>

          <p className="text-base text-slate-500 leading-relaxed mb-4">
            MediCare Pharmacy was born from a simple belief: every person deserves access to quality medicines and informed healthcare. Founded by Dr. Layla Hassan in Tubas, we started as a small neighborhood pharmacy and grew into a trusted regional health hub.
          </p>

          <p className="text-base text-slate-500 leading-relaxed mb-8">
            Our <strong className="text-slate-700 font-semibold">mission</strong> is to make healthcare accessible, affordable, and personal. Our <strong className="text-slate-700 font-semibold">vision</strong> is a healthier community where no one has to choose between cost and care.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map((item) => (
              <div key={item.label}
                className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border border-emerald-100 rounded-xl">
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-semibold text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}