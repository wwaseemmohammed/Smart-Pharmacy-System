import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth, OWNER_EMAIL } from '../context/AuthContext.jsx'
import { useToast } from '../components/Toast.jsx'

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg,#f0fdf6 0%,#e1f5ee 45%,#dceefb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Background circles */}
      <div style={{ position:'fixed', top:'-10%', right:'-8%', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(29,158,117,.1) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'fixed', bottom:'-10%', left:'-8%', width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(56,130,221,.08) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth:440, position:'relative' }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <div style={{
              width:48, height:48, borderRadius:14,
              background:'linear-gradient(135deg,#1D9E75,#0F6E56)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 8px 24px rgba(29,158,117,.35)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{width:24,height:24}}>
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5"/>
              </svg>
            </div>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontSize:22, fontWeight:700, color:'#0a2e1f', fontFamily:'Georgia,serif', lineHeight:1 }}>MediCare</div>
              <div style={{ fontSize:10, color:'#1D9E75', letterSpacing:'0.15em', textTransform:'uppercase', marginTop:2 }}>Smart Pharmacy</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          background:'#fff',
          borderRadius:20,
          padding:36,
          border:'0.5px solid #e8eeed',
          boxShadow:'0 20px 60px rgba(29,158,117,.08), 0 4px 16px rgba(0,0,0,.06)',
        }}>
          {/* Tabs */}
          <div style={{
            display:'flex', gap:0,
            background:'#f7f9f8',
            borderRadius:12,
            padding:4,
            marginBottom:28,
          }}>
            {[['login','Sign In'], ['signup','Create Account']].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setError('') }}
                style={{
                  flex:1, padding:'9px 0', borderRadius:9,
                  fontSize:13, fontWeight:600,
                  border:'none', cursor:'pointer',
                  transition:'all .2s',
                  background: mode === m ? '#fff' : 'transparent',
                  color: mode === m ? '#1a2d27' : '#8fa89f',
                  boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,.08)' : 'none',
                }}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div style={{ marginBottom:22 }}>
              <h2 style={{ fontSize:20, fontWeight:700, color:'#1a2d27', fontFamily:'Georgia,serif', marginBottom:4 }}>
                {mode === 'login' ? 'Welcome back 👋' : 'Join MediCare'}
              </h2>
              <p style={{ fontSize:12, color:'#8fa89f' }}>
                {mode === 'login'
                  ? 'Sign in to continue to your account'
                  : 'Create your account to get started'}
              </p>
            </div>

            {/* Name field — signup only */}
            {mode === 'signup' && (
              <div style={{ marginBottom:16 }}>
                <label style={{ display:'block', fontSize:11, fontWeight:600, color:'#4a6660', marginBottom:5 }}>Full Name</label>
                <div style={{ position:'relative' }}>
                  <svg style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:'#8fa89f' }}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
                  </svg>
                  <input name="name" value={form.name} onChange={h} placeholder="Your full name" autoComplete="name"
                    style={inputStyle} />
                </div>
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:11, fontWeight:600, color:'#4a6660', marginBottom:5 }}>Email Address</label>
              <div style={{ position:'relative' }}>
                <svg style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:'#8fa89f' }}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input name="email" type="email" value={form.email} onChange={h} placeholder="your@email.com" autoComplete="email"
                  style={inputStyle} />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: mode === 'signup' ? 16 : 20 }}>
              <label style={{ display:'block', fontSize:11, fontWeight:600, color:'#4a6660', marginBottom:5 }}>Password</label>
              <div style={{ position:'relative' }}>
                <svg style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:'#8fa89f' }}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={h}
                  placeholder={mode === 'signup' ? 'Min 6 characters' : 'Enter your password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  style={{ ...inputStyle, paddingRight:42 }} />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#8fa89f', padding:4 }}>
                  {showPw
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:15,height:15}}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:15,height:15}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Confirm password — signup only */}
            {mode === 'signup' && (
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:11, fontWeight:600, color:'#4a6660', marginBottom:5 }}>Confirm Password</label>
                <div style={{ position:'relative' }}>
                  <svg style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:'#8fa89f' }}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <input name="confirm" type={showPw ? 'text' : 'password'} value={form.confirm} onChange={h}
                    placeholder="Repeat your password" autoComplete="new-password"
                    style={inputStyle} />
                </div>
              </div>
            )}

            {/* Owner hint */}
            {mode === 'signup' && form.email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase() && (
              <div style={{
                background:'#E1F5EE', border:'0.5px solid #9FE1CB',
                borderRadius:10, padding:'10px 14px', marginBottom:16,
                display:'flex', alignItems:'center', gap:8,
              }}>
                <span style={{ fontSize:16 }}>🔑</span>
                <p style={{ fontSize:11, color:'#0F6E56', lineHeight:1.5, margin:0 }}>
                  <strong>Owner account detected.</strong> You will have full admin access to the dashboard.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                background:'#FEF2F2', border:'0.5px solid #FECACA',
                borderRadius:10, padding:'10px 14px', marginBottom:16,
                display:'flex', alignItems:'center', gap:8,
              }}>
                <span style={{ fontSize:14 }}>⚠️</span>
                <p style={{ fontSize:11, color:'#991B1B', margin:0 }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{
                width:'100%', padding:'12px 0',
                borderRadius:12, border:'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontSize:14, fontWeight:700, color:'#fff',
                background: loading ? '#9FE1CB' : 'linear-gradient(135deg,#1D9E75,#0F6E56)',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(29,158,117,.3)',
                transition:'all .2s',
              }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:12, margin:'20px 0' }}>
            <div style={{ flex:1, height:1, background:'#e8eeed' }} />
            <span style={{ fontSize:11, color:'#8fa89f' }}>or continue as</span>
            <div style={{ flex:1, height:1, background:'#e8eeed' }} />
          </div>

          {/* Guest access */}
          <Link to="/" style={{ textDecoration:'none' }}>
            <button style={{
              width:'100%', padding:'11px 0',
              borderRadius:12, border:'0.5px solid #d0d9d7', cursor:'pointer',
              fontSize:13, fontWeight:600, color:'#4a6660',
              background:'#f7f9f8', transition:'all .2s',
            }}>
              👤 Browse as Guest
            </button>
          </Link>
        </div>

        {/* Footer note */}
        <p style={{ textAlign:'center', fontSize:11, color:'#8fa89f', marginTop:20 }}>
          By signing in, you agree to our{' '}
          <span style={{ color:'#1D9E75', cursor:'pointer' }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '11px 12px 11px 38px',
  border: '0.5px solid #e8eeed',
  borderRadius: 10,
  fontSize: 13,
  color: '#1a2d27',
  background: '#f7f9f8',
  outline: 'none',
  fontFamily: "'Inter', system-ui, sans-serif",
  boxSizing: 'border-box',
  transition: 'border-color .2s',
}
