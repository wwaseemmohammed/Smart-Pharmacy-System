import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const team = [
  {
    name: 'Dr. Ahmad Al-Khaldi',
    role: 'Clinic Owner & General Manager',
    initials: 'AK',
    color: '#1D9E75',
    bg: '#E1F5EE',
    desc: 'Founder of MediCare Clinic, specialized in healthcare management with over 20 years of experience in the medical field.',
  },
  {
    name: 'Sarah Al-Najjar',
    role: 'Finance & Accounting Manager',
    initials: 'SN',
    color: '#185FA5',
    bg: '#E6F1FB',
    desc: 'Responsible for budgeting, financial reporting, and payroll management. Holds a CPA certification with 10 years of experience.',
  },
  {
    name: 'Khaled Abu Omar',
    role: 'Operations Manager',
    initials: 'KO',
    color: '#B85A30',
    bg: '#FAECE7',
    desc: 'Oversees daily operations, coordinates departments, and ensures high-quality service for all patients and visitors.',
  },
  {
    name: 'Rana Mustafa',
    role: 'Human Resources Manager',
    initials: 'RM',
    color: '#7F77DD',
    bg: '#EEEDFE',
    desc: 'Handles employee affairs, recruitment, training, and fostering a productive and healthy work environment.',
  },
]

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-4"
          >
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Leadership & Management Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="text-base text-slate-500 max-w-sm mx-auto leading-relaxed"
          >
            A professional administrative team working behind the scenes to ensure the best healthcare experience for you.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all"
            >
              {/* Top band */}
              <div className="h-20 relative flex justify-center" style={{ background: m.bg }}>
                <div
                  className="absolute -bottom-8 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center font-bold text-white text-base"
                  style={{ background: m.color, boxShadow: '0 4px 12px rgba(0,0,0,0.12)', fontFamily: 'Georgia, serif' }}
                >
                  {m.initials}
                </div>
              </div>

              <div className="pt-12 pb-7 px-6 text-center">
                <h3 className="font-bold text-slate-800 text-base mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>
                  {m.name}
                </h3>
                <div className="text-xs font-semibold mb-3" style={{ color: m.color }}>
                  {m.role}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {m.desc}
                </p>

                <div className="flex justify-center gap-2">
                  {['email', 'phone'].map((type) => (
                    <button
                      key={type}
                      className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center hover:border-emerald-200 transition-colors"
                    >
                      {type === 'email' ? (
                        <svg viewBox="0 0 20 20" className="w-4 h-4" style={{ fill: m.color }}>
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 20 20" className="w-4 h-4" style={{ fill: m.color }}>
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}