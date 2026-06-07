import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import {
  FaTachometerAlt, FaUserCheck, FaKey, FaUsers,
  FaFileAlt, FaBars, FaTimes, FaSignOutAlt
} from 'react-icons/fa'

const navItems = [
  { path: '/staff',           icon: <FaTachometerAlt size={13} />, label: 'ড্যাশবোর্ড' },
  { path: '/staff/verify',    icon: <FaUserCheck size={13} />,     label: 'গ্রাহক নিরীক্ষা' },
  { path: '/staff/password',  icon: <FaKey size={13} />,           label: 'পাসওয়ার্ড পরিবর্তন' },
  { path: '/staff/customers', icon: <FaUsers size={13} />,         label: 'সব গ্রাহক' },
  { path: '/staff/notes',     icon: <FaFileAlt size={13} />,       label: 'নথি তৈরি' },
]

export default function StaffLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success('লগআউট হয়েছে')
    navigate('/')
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: '#0f172a', fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-44 flex flex-col
        transform transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `} style={{ backgroundColor: '#0f172a' }}>

        {/* Brand */}
        <div className="px-4 py-4">
          <div className="text-blue-400 font-extrabold text-base tracking-wide">Staff Panel</div>
        </div>

        {/* Menu label */}
        <div className="px-4 pb-1 text-xs text-slate-500 uppercase tracking-widest">মেনু</div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 pt-1">
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-0.5 transition ${
                  active
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition"
          >
            <FaSignOutAlt size={12} /> লগআউট
          </button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3" style={{ backgroundColor: '#0f172a' }}>
          <button onClick={() => setOpen(true)} className="text-slate-400"><FaBars size={20} /></button>
          <span className="text-blue-400 font-bold text-sm">Staff Panel</span>
        </header>

        <main className="flex-1 overflow-y-auto p-5" style={{ backgroundColor: '#0f172a' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
