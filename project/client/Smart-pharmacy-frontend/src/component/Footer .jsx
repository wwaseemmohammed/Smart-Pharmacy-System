import { Link } from 'react-router-dom'

const quickLinks = ['Home', 'Medicines', 'Our Team', 'About Us', 'Contact']
const services = ['Prescription Filling', 'Vaccinations', 'Health Consultations', 'Blood Monitoring', 'Home Delivery']

const contactItems = [
  {
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    text: 'Main Street, Tubas, West Bank, Palestine',
  },
  {
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    text: '+970 599 000 111',
  },
  {
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    text: 'info@medicare-pharmacy.ps',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    text: 'Mon–Sat: 8AM – 10PM\nSun: 9AM – 6PM',
  },
]

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6" style={{ background: '#0a2e1f' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(29,158,117,0.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" className="w-5 h-5">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-3a1 1 0 011-1h2a1 1 0 011 1v3m-4 0h4" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-base leading-none" style={{ fontFamily: 'Georgia, serif' }}>MediCare</div>
                <div className="text-emerald-500 text-[10px] tracking-widest uppercase leading-none">Pharmacy</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Your community pharmacy since 2010. Trusted, certified, and always here for your health needs.
            </p>
            <div className="flex gap-2">
              {['M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'].map((d, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(29,158,117,0.25)'; e.currentTarget.style.borderColor = '#1D9E75' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Quick Links</h4>
            {quickLinks.map(l => (
              <Link key={l} to="/"
                className="block text-sm mb-2.5 transition-colors"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => e.target.style.color = '#1D9E75'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
              >{l}</Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Services</h4>
            {services.map(s => (
              <Link key={s} to="/"
                className="block text-sm mb-2.5 transition-colors"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => e.target.style.color = '#1D9E75'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
              >{s}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Contact Us</h4>
            {contactItems.map((item, i) => (
              <div key={i} className="flex gap-2.5 mb-3.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0 mt-0.5">
                  <path d={item.icon} />
                </svg>
                <span className="text-xs leading-relaxed whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 flex flex-wrap justify-between items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>© 2025 MediCare Pharmacy. All rights reserved.</span>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="text-xs transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={e => e.target.style.color = '#1D9E75'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}