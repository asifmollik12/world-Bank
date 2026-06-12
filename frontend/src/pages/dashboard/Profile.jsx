import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FaHome, FaLayerGroup, FaCreditCard, FaHeadset, FaUser, FaBell, FaChevronRight, FaSignOutAlt, FaLock, FaShieldAlt, FaIdCard, FaCreditCard as FaCard } from 'react-icons/fa'

const BN = { fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }

function BottomNav({ active }) {
  const items = [
    { icon: <FaHome size={20} />,       label: 'হোম',      path: '/dashboard' },
    { icon: <FaLayerGroup size={20} />, label: 'ঋণ',       path: '/dashboard/loans' },
    { icon: <FaCreditCard size={20} />, label: 'কার্ড',    path: '/dashboard/repayments' },
    { icon: <FaHeadset size={20} />,    label: 'সাহায়া',  path: '/dashboard/notifications' },
    { icon: <FaUser size={20} />,       label: 'প্রোফাইল', path: '/dashboard/profile' },
  ]
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 0 14px', zIndex: 50, boxShadow: '0 -2px 10px rgba(0,0,0,0.06)' }}>
      {items.map(item => {
        const isActive = active === item.path
        return (
          <Link key={item.path} to={item.path} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: isActive ? '#1d3a8a' : '#9ca3af', textDecoration: 'none', fontSize: 10, fontWeight: isActive ? 700 : 400, ...BN }}>
            {item.icon}<span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

function MenuItem({ icon, label, to, red, onClick }) {
  const content = (
    <div style={{
      backgroundColor: '#fff', borderRadius: 12, padding: '16px 18px',
      display: 'flex', alignItems: 'center', gap: 14,
      cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <span style={{ color: red ? '#dc2626' : '#1a1a1a', fontSize: 20, width: 24, display: 'flex', justifyContent: 'center' }}>{icon}</span>
      <span style={{ flex: 1, fontWeight: 600, fontSize: 16, color: red ? '#dc2626' : '#1a1a1a', ...BN }}>{label}</span>
      <FaChevronRight size={14} color={red ? '#dc2626' : '#9ca3af'} />
    </div>
  )
  if (onClick) return <div onClick={onClick}>{content}</div>
  return <Link to={to} style={{ textDecoration: 'none' }}>{content}</Link>
}

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const name     = user?.name || 'User'
  const phone    = user?.phone || ''
  const initials = name.charAt(0).toUpperCase()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'শুভ সকাল' : hour < 17 ? 'শুভ বিকেল' : 'শুভ সন্ধ্যা'

  const handleLogout = async () => {
    setShowLogoutModal(false)
    await logout()
    toast.success('লগআউট হয়েছে')
    navigate('/')
  }

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingBottom: 80, ...BN }}>

      {/* Navbar */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>World Bank</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <FaBell color="#fff" size={18} />
          <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2px dashed #93c5fd', backgroundColor: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 15 }}>
            {initials}
          </div>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{name}</span>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '8px 20px 22px' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{greeting}, {name}!</div>
        <div style={{ color: '#93c5fd', fontSize: 12, marginTop: 2 }}>বিশ্ব ব্যাংক ঋণে আপনাকে স্বাগতম!</div>
      </div>

      <div style={{ padding: '20px 16px', maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Avatar card */}
        <div style={{
          backgroundColor: '#e8eaf0', borderRadius: 14, padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: 16,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          {/* Avatar with person icon */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            border: '2px dashed #9ca3af',
            backgroundColor: '#4a7ab5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, overflow: 'hidden',
          }}>
            <svg viewBox="0 0 64 64" width="64" height="64">
              <circle cx="32" cy="32" r="32" fill="#4a7ab5"/>
              {/* Head */}
              <circle cx="32" cy="22" r="11" fill="#f5cba7"/>
              {/* Body / suit */}
              <ellipse cx="32" cy="52" rx="18" ry="14" fill="#2c3e6b"/>
              {/* Shirt */}
              <polygon points="28,40 32,36 36,40 34,52 30,52" fill="#fff"/>
              {/* Tie */}
              <polygon points="31,38 33,38 34,48 30,48" fill="#c0392b"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#111' }}>{name}</div>
            <div style={{ color: '#6b7280', fontSize: 15, marginTop: 2, fontFamily: 'monospace' }}>{phone}</div>
          </div>
        </div>

        {/* Menu items */}
        <MenuItem
          icon={<FaIdCard />}
          label="ব্যক্তিগত তথ্য"
          to="/dashboard/personal-info-view"
        />
        <MenuItem
          icon={<FaCard />}
          label="ব্যাংক আকাউন্ট"
          to="/dashboard/bank-account"
        />
        <MenuItem
          icon={<FaShieldAlt />}
          label="নিয়মাবলী ও শর্তাবলী"
          to="/dashboard/terms"
        />
        <MenuItem
          icon={<FaLock />}
          label="পাসওয়ার্ড পরিবর্তন"
          to="/dashboard/change-password"
        />
        <MenuItem
          icon={<FaSignOutAlt />}
          label="লগ আউট"
          red
          onClick={() => setShowLogoutModal(true)}
        />
      </div>

      {/* ── Logout Confirmation Modal ── */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: 20,
            padding: '32px 28px', width: '100%', maxWidth: 360,
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            textAlign: 'center', ...BN,
          }}>
            {/* Icon */}
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              backgroundColor: '#fef2f2', border: '2px solid #fecaca',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: 28,
            }}>
              🚪
            </div>

            <h3 style={{ fontWeight: 800, fontSize: 20, color: '#111', marginBottom: 10, ...BN }}>
              লগ আউট
            </h3>
            <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 28, lineHeight: 1.6, ...BN }}>
              আপনি কি নিশ্চিতভাবে লগ আউট করতে চান?
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              {/* Cancel */}
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1, padding: '13px', borderRadius: 12,
                  border: '1.5px solid #e5e7eb', backgroundColor: '#f9fafb',
                  color: '#374151', fontSize: 15, fontWeight: 600, cursor: 'pointer', ...BN,
                }}
              >
                বাতিল
              </button>
              {/* Confirm */}
              <button
                onClick={handleLogout}
                style={{
                  flex: 1, padding: '13px', borderRadius: 12,
                  border: 'none', backgroundColor: '#dc2626',
                  color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', ...BN,
                }}
              >
                হ্যাঁ, লগ আউট
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="/dashboard/profile" />
    </div>
  )
}
