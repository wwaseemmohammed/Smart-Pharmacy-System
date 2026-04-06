import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a2e1f 0%, #0F6E56 50%, #185FA5 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }} />

      <div className="max-w-2xl mx-auto text-center relative">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border"
          style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.2)' }}
        >
          Get Started Today
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-white leading-tight tracking-tight mb-5"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Visit us today or explore our medicines online
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="text-base leading-relaxed mb-9"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          Whether you walk through our doors or browse from home, our team is ready to help you find exactly what you need.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/medicines"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-emerald-700 text-sm bg-white hover:-translate-y-0.5 transition-all"
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
          >
            Browse Medicines
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{
              color: 'white',
              border: '1.5px solid rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.08)',
            }}
          >
            Find Our Location
          </Link>
        </motion.div>
      </div>
    </section>
  )
}