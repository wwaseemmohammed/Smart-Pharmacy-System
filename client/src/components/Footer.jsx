import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6" style={{ background: '#0a2e1f' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(29,158,117,0.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" className="w-5 h-5">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-base font-serif">MediCare</div>
                <div className="text-emerald-500 text-[10px] tracking-widest uppercase">Pharmacy</div>
              </div>
            </Link>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Smart healthcare solutions with easy booking and trusted medical services.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            {[{ label: 'Home', to: '/' }, { label: 'Medicines', to: '/medicines' }, { label: 'Our Team', to: '/team' }, { label: 'Careers', to: '/careers' }].map(l => (
              <Link key={l.label} to={l.to} className="block text-sm mb-2.5 transition-colors hover:text-emerald-400"
                style={{ color: 'rgba(255,255,255,0.45)' }}>{l.label}</Link>
            ))}
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
            {['Online Booking', 'Prescription Filling', 'Health Consultations', 'Blood Monitoring', 'Home Delivery'].map(s => (
              <p key={s} className="text-sm mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{s}</p>
            ))}
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>
            {[
              { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text: 'Tubas, West Bank, Palestine' },
              { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+970 599 000 111' },
              { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'info@medicare.ps' },
            ].map((item, i) => (
              <div key={i} className="flex gap-2.5 mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" className="w-4 h-4 mt-0.5 flex-shrink-0">
                  <path d={item.icon} />
                </svg>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 flex justify-between flex-wrap gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>© 2025 MediCare. All rights reserved.</span>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="text-xs hover:text-emerald-400 transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
