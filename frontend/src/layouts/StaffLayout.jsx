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

  const handleLogout = async () => {
    setShowLogoutModal(false)
    await logout()
    toast.success('লগআউট হয়েছে')
    navigate('/')
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: '#0f172a', fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }}
    >
      {/* ── SIDEBAR ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-44 flex flex-col
          transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
        style={{ backgroundColor: '#0b1120', borderRight: '1px solid #1e293b' }}
      >
        {/* ── Staff Panel Title ── */}
        <div className="px-4 py-4">
          <span className="text-blue-400 font-extrabold text-lg tracking-wide">Staff Panel</span>
        </div>

        {/* ── Menu label ── */}
        <div style={{ padding: '16px 20px 4px', fontSize: 13, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          মেনু
        </div>

        {/* ── Nav Links ── */}
        <nav className="flex-1 overflow-y-auto px-2 pt-3">
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base mb-0.5 transition"
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

        {/* ── আরও section + Logout ── */}
        <div className="px-4 pb-1 text-xs uppercase tracking-widest" style={{ color: '#475569' }}>
          আরও
        </div>
        <div className="px-2 pb-4">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium transition"
            style={{ color: '#94a3b8', backgroundColor: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#7f1d1d'; e.currentTarget.style.color = '#fca5a5' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94a3b8' }}
          >
            <FaSignOutAlt size={13} />
            লগ আউট
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* ── LOGOUT CONFIRMATION MODAL ── */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
          <div
            className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
            style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1a0a0a', border: '2px solid #dc2626' }}>
                <FaExclamationTriangle className="text-red-500" size={22} />
              </div>
            </div>
            <h3 className="text-white font-bold text-lg text-center mb-1">লগআউট করবেন?</h3>
            <p className="text-slate-400 text-sm text-center mb-6">
              আপনি কি নিশ্চিতভাবে স্টাফ প্যানেল থেকে লগআউট করতে চান?
            </p>
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
          style={{ backgroundColor: '#0b1120', borderBottom: '1px solid #1e293b' }}
        >
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
