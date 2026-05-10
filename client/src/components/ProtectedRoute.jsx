import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

/**
 * ProtectedRoute — يحمي مسارات الداشبورد
 * - إذا غير مسجّل الدخول → /login
 * - إذا مسجّل لكن مش صاحب الصيدلية → /unauthorized
 */
export default function ProtectedRoute({ children }) {
  const { isLoggedIn, isOwner } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isOwner) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
