import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import {
  FaTachometerAlt, FaUserCheck, FaKey, FaUsers,
  FaFileAlt, FaBars, FaSignOutAlt, FaChevronRight, FaExclamationTriangle
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
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [logoutHover, setLogoutHover] = useState(false)

  const handleLogout = async () => {
    setShowLogoutModal(false)
    await logout()
    toast.success('লগআউট হয়েছে')
    navigate('/')
  }

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
        {/* ── Staff Panel Title ── */}
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: '1px solid #1e293b' }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <span className="text-white font-extrabold text-base tracking-wide">Staff Panel</span>
          </div>
        </div>

        {/* ── Menu label ── */}
        <div className="px-5 pt-4 pb-1 text-xs uppercase tracking-widest" style={{ color: '#475569' }}>
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
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm mb-0.5 transition"
                style={{
                  backgroundColor: active ? '#2563eb' : 'transparent',
                  color: active ? '#fff' : '#94a3b8',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#e2e8f0' }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94a3b8' }}}
              >
                <span className="flex items-center gap-2.5 font-medium">
                  {item.icon}
                  {item.label}
                </span>
                {active && <FaChevronRight size={10} className="opacity-60" />}
              </Link>
            )
          })}
        </nav>

        {/* ── Logout Button ── */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid #1e293b' }}>
          <button
            onClick={() => setShowLogoutModal(true)}
            onMouseEnter={() => setLogoutHover(true)}
            onMouseLeave={() => setLogoutHover(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: logoutHover ? '#7f1d1d' : '#0f172a',
              color: logoutHover ? '#fca5a5' : '#94a3b8',
              border: `1px solid ${logoutHover ? '#dc2626' : '#1e293b'}`,
            }}
          >
            <FaSignOutAlt size={13} />
            লগআউট
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* ── LOGOUT CONFIRMATION MODAL ── */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div
            className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
            style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#1a0a0a', border: '2px solid #dc2626' }}
              >
                <FaExclamationTriangle className="text-red-500" size={22} />
              </div>
            </div>

            {/* Text */}
            <h3 className="text-white font-bold text-lg text-center mb-1">লগআউট করবেন?</h3>
            <p className="text-slate-400 text-sm text-center mb-6">
              আপনি কি নিশ্চিতভাবে স্টাফ প্যানেল থেকে লগআউট করতে চান?
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition"
                style={{ backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#e2e8f0' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#94a3b8' }}
              >
                বাতিল
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2"
                style={{ backgroundColor: '#dc2626', color: '#fff', border: '1px solid #b91c1c' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#b91c1c' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#dc2626' }}
              >
                <FaSignOutAlt size={12} /> হ্যাঁ, লগআউট
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className="lg:hidden flex items-center gap-3 px-4 py-3"
          style={{ backgroundColor: '#080f1a', borderBottom: '1px solid #1e293b' }}
        >
          <button onClick={() => setOpen(true)} className="text-slate-400"><FaBars size={20} /></button>
          <span className="text-white font-bold text-sm">Staff Panel</span>
        </header>

        <main className="flex-1 overflow-y-auto p-5" style={{ backgroundColor: '#0f172a' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
