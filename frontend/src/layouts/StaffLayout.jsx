import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import {
  FaTachometerAlt, FaUserCheck, FaKey, FaUsers,
  FaFileAlt, FaBars, FaSignOutAlt, FaChevronRight
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

  const initials = user?.name?.charAt(0).toUpperCase() || 'S'

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: '#0f172a', fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      {/* ── SIDEBAR ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-52 flex flex-col
          transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
        style={{ backgroundColor: '#080f1a', borderRight: '1px solid #1e293b' }}
      >
        {/* ── User Badge ── */}
        <div className="px-4 pt-5 pb-4" style={{ borderBottom: '1px solid #1e293b' }}>
          {/* Avatar + name */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
            >
              {initials}
            </div>
            <div className="overflow-hidden">
              <div className="text-white font-bold text-sm truncate">{user?.name || 'Staff'}</div>
              <div
                className="text-xs font-semibold px-2 py-0.5 rounded-full w-fit mt-0.5"
                style={{ backgroundColor: '#1e3a5f', color: '#60a5fa' }}
              >
                Staff
              </div>
            </div>
          </div>
          {/* Panel label */}
          <div className="text-blue-400 font-extrabold text-base tracking-wide">Staff Panel</div>
        </div>

        {/* ── Menu label ── */}
        <div className="px-4 pt-4 pb-1 text-xs uppercase tracking-widest" style={{ color: '#475569' }}>
          মেনু
        </div>

        {/* ── Nav Links ── */}
        <nav className="flex-1 overflow-y-auto px-3 pt-1">
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm mb-0.5 transition group"
                style={{
                  backgroundColor: active ? '#2563eb' : 'transparent',
                  color: active ? '#fff' : '#94a3b8',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = '#1e293b'; if (!active) e.currentTarget.style.color = '#e2e8f0' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; if (!active) e.currentTarget.style.color = '#94a3b8' }}
              >
                <span className="flex items-center gap-2.5 font-medium">
                  {item.icon}
                  {item.label}
                </span>
                {active && <FaChevronRight size={10} className="opacity-70" />}
              </Link>
            )
          })}
        </nav>

        {/* ── Logout Button ── */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid #1e293b' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition"
            style={{ backgroundColor: '#1a0a0a', color: '#f87171', border: '1px solid #450a0a' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#7f1d1d'; e.currentTarget.style.color = '#fca5a5' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1a0a0a'; e.currentTarget.style.color = '#f87171' }}
          >
            <FaSignOutAlt size={13} />
            লগআউট
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header
          className="lg:hidden flex items-center gap-3 px-4 py-3"
          style={{ backgroundColor: '#080f1a', borderBottom: '1px solid #1e293b' }}
        >
          <button onClick={() => setOpen(true)} className="text-slate-400">
            <FaBars size={20} />
          </button>
          <span className="text-blue-400 font-bold text-sm">Staff Panel</span>
        </header>

        <main className="flex-1 overflow-y-auto p-5" style={{ backgroundColor: '#0f172a' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
