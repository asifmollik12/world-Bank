import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaBars, FaTimes, FaUniversity } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-blue-500 rounded-full p-2">
              <FaUniversity className="text-white text-xl" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-base">World Bank Group</div>
              <div className="text-xs text-blue-300">Easy · Fast · Secure</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-blue-300 transition">Home</Link>
            <Link to="/loan-plans" className="hover:text-blue-300 transition">Loan Plans</Link>
            <Link to="/about" className="hover:text-blue-300 transition">About</Link>
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="hover:text-red-300 transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
                <Link to="/register" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-lg transition">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-800 px-4 pb-4 flex flex-col gap-3 text-sm">
          <Link to="/" onClick={() => setOpen(false)} className="py-2 border-b border-blue-700">Home</Link>
          <Link to="/loan-plans" onClick={() => setOpen(false)} className="py-2 border-b border-blue-700">Loan Plans</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="py-2 border-b border-blue-700">About</Link>
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setOpen(false)} className="py-2">Dashboard</Link>
              <button onClick={handleLogout} className="text-left text-red-300 py-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="py-2">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="py-2 text-yellow-400 font-semibold">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
