import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-blue-900/80 backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <svg viewBox="0 0 100 100" className="w-9 h-9 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="4">
              <circle cx="50" cy="50" r="44" />
              <ellipse cx="50" cy="50" rx="22" ry="44" />
              <ellipse cx="50" cy="50" rx="44" ry="17" />
              <line x1="6" y1="50" x2="94" y2="50" />
            </svg>
            <div className="leading-tight">
              <div className="font-bold text-sm tracking-wide">WORLD BANK GROUP</div>
              <div className="text-xs text-blue-300">সহজ · দ্রুত · নিরাপদ</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-blue-300 transition">হোম</Link>
            <Link to="/loan-plans" className="hover:text-blue-300 transition">লোন প্ল্যান</Link>
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
                >
                  ড্যাশবোর্ড
                </Link>
                <button onClick={handleLogout} className="hover:text-red-300 transition text-sm">
                  লগআউট
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-300 transition">লগইন</Link>
                <Link to="/register"
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold px-5 py-2 rounded-full transition">
                  নিবন্ধন করুন
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
        <div className="md:hidden bg-blue-900 px-4 pb-4 flex flex-col gap-3 text-sm border-t border-blue-800">
          <Link to="/" onClick={() => setOpen(false)} className="py-2 border-b border-blue-800">হোম</Link>
          <Link to="/loan-plans" onClick={() => setOpen(false)} className="py-2 border-b border-blue-800">লোন প্ল্যান</Link>
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setOpen(false)} className="py-2">ড্যাশবোর্ড</Link>
              <button onClick={handleLogout} className="text-left text-red-300 py-2">লগআউট</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="py-2">লগইন</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="py-2 text-yellow-400 font-bold">নিবন্ধন করুন</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
