import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Unauthorized() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 border border-gray-100 shadow-lg max-w-sm w-full text-center">
        <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🔐</div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif mb-3 sm:mb-4">
          Access Restricted
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 sm:mb-6">
          The dashboard is only accessible to the pharmacy owner.
        </p>
        {user && (
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
            <p className="text-xs sm:text-sm text-gray-700 m-0">
              Signed in as <strong className="text-gray-900">{user.email}</strong>
            </p>
          </div>
        )}
        <div className="flex flex-col gap-3 sm:gap-4">
          <Link to="/" className="no-underline">
            <button className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-none bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs sm:text-sm font-bold cursor-pointer transition-all shadow-md hover:shadow-lg">
              ← Back to Home
            </button>
          </Link>
          <button onClick={logout} className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold cursor-pointer transition-colors">
            Sign Out & Switch Account
          </button>
        </div>
      </div>
    </div>
  )
}