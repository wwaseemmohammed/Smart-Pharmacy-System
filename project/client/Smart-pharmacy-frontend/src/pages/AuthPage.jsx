import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth, OWNER_EMAIL } from '../context/AuthContext.jsx'
import { useToast } from '../component/Toast/Toast.jsx'

export default function AuthPage() {
  const { login, register, loading } = useAuth()
  const toast    = useToast()
  const navigate = useNavigate()

  const [mode, setMode]   = useState('login')   // 'login' | 'signup'
  const [form, setForm]   = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError]   = useState('')

  const h = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); setError('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'signup') {
      if (!form.name.trim())                       return setError('Please enter your name')
      if (!form.email.trim())                      return setError('Please enter your email')
      if (form.password.length < 6)                return setError('Password must be at least 6 characters')
      if (form.password !== form.confirm)          return setError('Passwords do not match')

      const res = await register(form.name.trim(), form.email.trim(), form.password)
      if (!res.ok) return setError(res.message)
      toast('Account created! Welcome 🎉')
      // إذا إيميل صاحب الصيدلية → داشبورد، غيره → الرئيسية
      navigate(res.user.email?.toLowerCase() === OWNER_EMAIL.toLowerCase() ? '/admin' : '/')
    } else {
      if (!form.email.trim() || !form.password)    return setError('Please fill all fields')

      const res = await login(form.email.trim(), form.password)
      if (!res.ok) return setError(res.message)
      toast(`Welcome back, ${res.user.name}! 👋`)
      navigate(res.user.email?.toLowerCase() === OWNER_EMAIL.toLowerCase() || res.user.role === 'admin'
        ? '/admin' : '/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Background circles */}
      <div className="fixed top-[-10%] right-[-8%] w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-gradient-radial from-green-500/10 to-transparent pointer-events-none hidden sm:block" />
      <div className="fixed bottom-[-10%] left-[-8%] w-80 sm:w-[400px] h-80 sm:h-[400px] rounded-full bg-gradient-radial from-blue-500/8 to-transparent pointer-events-none hidden sm:block" />

      <div className="w-full max-w-sm sm:max-w-md px-4 sm:px-0 relative">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-10">
          <Link to="/" className="inline-flex items-center gap-2.5 no-underline">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-6 h-6 sm:w-7 sm:h-7">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-lg sm:text-xl font-bold text-green-900 font-serif leading-none">MediCare</div>
              <div className="text-xs sm:text-[10px] text-green-600 tracking-widest uppercase mt-1 sm:mt-1.5">Smart Pharmacy</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 border border-gray-100 shadow-lg sm:shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-0 bg-gray-100 rounded-xl sm:rounded-2xl p-1 mb-6 sm:mb-7">
            {[['login','Sign In'], ['signup','Create Account']].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setError('') }}
                className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border-none cursor-pointer transition-all ${
                  mode === m 
                    ? 'bg-white text-gray-900 shadow-md' 
                    : 'bg-transparent text-gray-500 hover:text-gray-700'
                }`}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Title */}
            <div className="mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 font-serif mb-2">
                {mode === 'login' ? 'Welcome back 👋' : 'Join MediCare'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {mode === 'login'
                  ? 'Sign in to continue to your account'
                  : 'Create your account to get started'}
              </p>
            </div>

            {/* Name field — signup only */}
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-2 sm:mb-2.5">Full Name</label>
                <div className="relative">
                  <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4 sm:h-4 text-gray-500"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
                  </svg>
                  <input name="name" value={form.name} onChange={h} placeholder="Your full name" autoComplete="name"
                    className="w-full py-2 sm:py-2.5 px-3 sm:px-4 pl-9 sm:pl-10 border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50 text-xs sm:text-sm text-gray-900 outline-none focus:border-green-400 focus:bg-white transition-colors" />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-2 sm:mb-2.5">Email Address</label>
              <div className="relative">
                <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input name="email" type="email" value={form.email} onChange={h} placeholder="your@email.com" autoComplete="email"
                  className="w-full py-2 sm:py-2.5 px-3 sm:px-4 pl-9 sm:pl-10 border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50 text-xs sm:text-sm text-gray-900 outline-none focus:border-green-400 focus:bg-white transition-colors" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-2 sm:mb-2.5">Password</label>
              <div className="relative">
                <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={h}
                  placeholder={mode === 'signup' ? 'Min 6 characters' : 'Enter your password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className="w-full py-2 sm:py-2.5 px-3 sm:px-4 pl-9 sm:pl-10 pr-10 sm:pr-12 border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50 text-xs sm:text-sm text-gray-900 outline-none focus:border-green-400 focus:bg-white transition-colors" />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-gray-500 hover:text-gray-700 p-1">
                  {showPw
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Confirm password — signup only */}
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-2 sm:mb-2.5">Confirm Password</label>
                <div className="relative">
                  <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <input name="confirm" type={showPw ? 'text' : 'password'} value={form.confirm} onChange={h}
                    placeholder="Repeat your password" autoComplete="new-password"
                    className="w-full py-2 sm:py-2.5 px-3 sm:px-4 pl-9 sm:pl-10 border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50 text-xs sm:text-sm text-gray-900 outline-none focus:border-green-400 focus:bg-white transition-colors" />
                </div>
              </div>
            )}

            {/* Owner hint */}
            {mode === 'signup' && form.email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase() && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-start gap-3">
                <span className="text-base sm:text-lg flex-shrink-0">🔑</span>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed m-0">
                  <strong>Owner account detected.</strong> You will have full admin access to the dashboard.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-start gap-3">
                <span className="text-base sm:text-lg flex-shrink-0">⚠️</span>
                <p className="text-xs sm:text-sm text-red-900 m-0">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-none cursor-pointer text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 sm:gap-4 my-5 sm:my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] sm:text-xs text-gray-600 whitespace-nowrap">or continue as</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Guest access */}
          <Link to="/" className="no-underline">
            <button className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors">
              👤 Browse as Guest
            </button>
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] sm:text-xs text-gray-600 mt-4 sm:mt-6">
          By signing in, you agree to our{' '}
          <span className="text-green-600 cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}
