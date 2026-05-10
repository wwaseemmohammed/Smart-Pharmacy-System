import Navbar  from '../components/Navbar.jsx'
import Footer  from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

const stats    = [{ num: '14+', label: 'Years of Service' }, { num: '12k+', label: 'Happy Patients' }, { num: '5k+', label: 'Products' }]
const services = ['Prescription Filling', 'Vitamins & Supplements', 'Blood Pressure Monitoring', 'Vaccination Services']
const features = [
  { icon: '🛡️', title: 'Certified Medicines', desc: 'Every product is sourced from licensed manufacturers and verified for quality and authenticity.', color: '#1D9E75', bg: '#E1F5EE' },
  { icon: '👨‍⚕️', title: 'Expert Pharmacists', desc: 'Licensed team providing personalized consultations, drug interaction checks, and ongoing guidance.', color: '#185FA5', bg: '#E6F1FB' },
  { icon: '⚡', title: 'Fast & Reliable', desc: 'Walk in or order online — we process prescriptions quickly with same-day pickup for urgent needs.', color: '#BA7517', bg: '#FAEEDA' },
  { icon: '💰', title: 'Affordable Prices', desc: 'Competitive pricing, insurance support, and a loyalty program so you always get the best value.', color: '#7F77DD', bg: '#EEEDFE' },
]
const team = [
  { name: 'Dr. Ahmad Al-Khaldi', role: 'Clinic Owner & General Manager', initials: 'AK', color: '#1D9E75', bg: '#E1F5EE', desc: 'Founder of MediCare Clinic, specialized in healthcare management with over 20 years of experience.' },
  { name: 'Sarah Al-Najjar',     role: 'Finance & Accounting Manager',   initials: 'SN', color: '#185FA5', bg: '#E6F1FB', desc: 'Responsible for budgeting, financial reporting, and payroll management. CPA certified.' },
  { name: 'Khaled Abu Omar',     role: 'Operations Manager',             initials: 'KO', color: '#B85A30', bg: '#FAECE7', desc: 'Oversees daily operations, coordinates departments, and ensures high-quality service.' },
  { name: 'Rana Mustafa',        role: 'Human Resources Manager',        initials: 'RM', color: '#7F77DD', bg: '#EEEDFE', desc: 'Handles employee affairs, recruitment, training, and fostering a healthy work environment.' },
]

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-16"
        style={{ background: 'linear-gradient(145deg,#f0fdf6 0%,#e1f5ee 45%,#dceefb 100%)' }}>
        <div className="absolute top-[-10%] right-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(29,158,117,.12) 0%,transparent 70%)' }} />
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-1.5 mb-7">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Open Now · Serving Since 2010</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 mb-5 font-serif">
              Your Trusted <span className="text-emerald-600">Pharmacy</span><br />for Health & Care
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-9 max-w-md">
              From prescription medicines to wellness products, MediCare Pharmacy has been your community health partner for over 14 years.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/medicines" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm hover:-translate-y-0.5 transition-transform"
                style={{ background: 'linear-gradient(135deg,#1D9E75,#0F6E56)', boxShadow: '0 8px 24px rgba(29,158,117,.35)' }}>
                View Medicines
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="/team" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-emerald-700 text-sm border border-emerald-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                Meet Our Team
              </Link>
            </div>
            <div className="flex gap-10 mt-12">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-emerald-600 font-serif">{s.num}</div>
                  <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="bg-white rounded-3xl p-8 relative overflow-hidden"
              style={{ boxShadow: '0 24px 64px rgba(29,158,117,.12),0 4px 16px rgba(0,0,0,.06)' }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{ background: 'linear-gradient(90deg,#1D9E75,#185FA5)' }} />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#1D9E75,#0F6E56)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-slate-800">MediCare Pharmacy</div>
                  <div className="text-emerald-600 text-xs font-semibold">Certified & Trusted</div>
                </div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-4 mb-4">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Today's Hours</div>
                <div className="font-semibold text-slate-800">8:00 AM – 10:00 PM</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-600 font-medium">Currently Open</span>
                </div>
              </div>
              {services.map((s, i) => (
                <div key={s} className={`flex items-center gap-2.5 py-2.5 ${i < services.length - 1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <svg viewBox="0 0 20 20" fill="#1D9E75" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-600 font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(180deg,#f8fffe 0%,#f0fdf6 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-4">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4 font-serif">The MediCare Difference</h2>
            <p className="text-base text-slate-500 max-w-md mx-auto leading-relaxed">We combine clinical expertise with heartfelt service to deliver a pharmacy experience that truly puts patients first.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(f => (
              <div key={f.title} className="bg-white border border-emerald-100 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-xl transition-all cursor-default">
                <div className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 text-2xl" style={{ background: f.bg, width: 52, height: 52 }}>{f.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 font-serif">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-4">Our Team</span>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4 font-serif">Leadership & Management Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(m => (
              <div key={m.name} className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="h-20 relative flex justify-center" style={{ background: m.bg }}>
                  <div className="absolute -bottom-8 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center font-bold text-white font-serif"
                    style={{ background: m.color, boxShadow: '0 4px 12px rgba(0,0,0,.12)' }}>{m.initials}</div>
                </div>
                <div className="pt-12 pb-7 px-6 text-center">
                  <h3 className="font-bold text-slate-800 text-base mb-0.5 font-serif">{m.name}</h3>
                  <div className="text-xs font-semibold mb-3" style={{ color: m.color }}>{m.role}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/team" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-50 transition-all text-sm">
              Meet All Pharmacists →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0a2e1f 0%,#0F6E56 50%,#185FA5 100%)' }}>
        <div className="max-w-2xl mx-auto text-center relative">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border"
            style={{ background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.85)', borderColor: 'rgba(255,255,255,.2)' }}>
            Get Started Today
          </span>
          <h2 className="text-4xl font-bold text-white leading-tight tracking-tight mb-5 font-serif">
            Visit us today or explore our medicines online
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/medicines" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-emerald-700 text-sm bg-white hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,.2)' }}>
              Browse Medicines →
            </Link>
            <Link to="/careers" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white hover:-translate-y-0.5 transition-all"
              style={{ border: '1.5px solid rgba(255,255,255,.35)', background: 'rgba(255,255,255,.08)' }}>
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
