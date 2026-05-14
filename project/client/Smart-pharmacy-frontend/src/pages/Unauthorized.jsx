import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Unauthorized() {
  const { user, logout } = useAuth()

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(145deg,#f0fdf6,#e1f5ee)',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:"'Inter', system-ui, sans-serif",
      padding:24,
    }}>
      <div style={{
        background:'#fff', borderRadius:20, padding:'48px 40px',
        border:'0.5px solid #e8eeed',
        boxShadow:'0 20px 60px rgba(0,0,0,.06)',
        maxWidth:420, width:'100%', textAlign:'center',
      }}>
        <div style={{ fontSize:56, marginBottom:16 }}>🔐</div>
        <h1 style={{ fontSize:22, fontWeight:700, color:'#1a2d27', fontFamily:'Georgia,serif', marginBottom:8 }}>
          Access Restricted
        </h1>
        <p style={{ fontSize:13, color:'#8fa89f', lineHeight:1.6, marginBottom:8 }}>
          The dashboard is only accessible to the pharmacy owner.
        </p>
        {user && (
          <div style={{ background:'#f7f9f8', borderRadius:10, padding:'10px 14px', marginBottom:24 }}>
            <p style={{ fontSize:12, color:'#4a6660', margin:0 }}>
              Signed in as <strong style={{ color:'#1a2d27' }}>{user.email}</strong>
            </p>
          </div>
        )}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <Link to="/" style={{ textDecoration:'none' }}>
            <button style={{
              width:'100%', padding:'11px 0', borderRadius:12, border:'none',
              background:'linear-gradient(135deg,#1D9E75,#0F6E56)',
              color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer',
            }}>
              ← Back to Home
            </button>
          </Link>
          <button onClick={logout} style={{
            width:'100%', padding:'11px 0', borderRadius:12,
            border:'0.5px solid #e8eeed',
            background:'#f7f9f8', color:'#4a6660',
            fontSize:13, fontWeight:600, cursor:'pointer',
          }}>
            Sign Out & Switch Account
          </button>
        </div>
      </div>
    </div>
  )
}