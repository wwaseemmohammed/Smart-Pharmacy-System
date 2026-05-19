import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api.js'

// ← الإيميل الخاص بصاحب الصيدلية فقط
export const OWNER_EMAIL = 'm@gmail.com'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('pharmacy_user')) || null }
    catch { return null }
  })
  const [loading, setLoading] = useState(false)

  // إذا كان في token محفوظ، نتأكد منه
  useEffect(() => {
    const token = localStorage.getItem('pharmacy_token')
    const saved = localStorage.getItem('pharmacy_user')
    if (token && saved) {
      try { setUser(JSON.parse(saved)) } catch { logout() }
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('pharmacy_token', data.token)
      localStorage.setItem('pharmacy_user', JSON.stringify(data.user))
      setUser(data.user)
      return { ok: true, user: data.user }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Login failed' }
    } finally { setLoading(false) }
  }, [])

  const register = useCallback(async (name, email, password) => {
    setLoading(true)
    try {
      // إذا الإيميل هو إيميل صاحب الصيدلية → role admin تلقائياً
      const role = email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase() ? 'admin' : 'customer'
      const { data } = await api.post('/auth/register', { name, email, password, role })
      localStorage.setItem('pharmacy_token', data.token)
      localStorage.setItem('pharmacy_user', JSON.stringify(data.user))
      setUser(data.user)
      return { ok: true, user: data.user }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Registration failed' }
    } finally { setLoading(false) }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('pharmacy_token')
    localStorage.removeItem('pharmacy_user')
    setUser(null)
  }, [])

  // هل المستخدم صاحب الصيدلية؟ (admin أو إيميله = OWNER_EMAIL)
  const isOwner = user
    ? (user.role === 'admin' || user.email?.toLowerCase() === OWNER_EMAIL.toLowerCase())
    : false

  const isLoggedIn = !!user

  return (
    <AuthCtx.Provider value={{ user, isLoggedIn, isOwner, loading, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}