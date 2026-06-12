import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { FaHome, FaLayerGroup, FaCreditCard, FaHeadset, FaUser, FaBell } from 'react-icons/fa'

const BN = { fontFamily: "'Hind Siliguri', sans-serif" }

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

// Card chip SVG
function Chip() {
  return (
    <svg viewBox="0 0 50 40" width="52" height="42">
      <rect width="50" height="40" rx="5" fill="#d4a017"/>
      <rect x="5" y="5" width="40" height="30" rx="3" fill="#c49010" opacity="0.6"/>
      {/* Chip lines */}
      <line x1="25" y1="5" x2="25" y2="35" stroke="#b8860b" strokeWidth="1.5"/>
      <line x1="5" y1="20" x2="45" y2="20" stroke="#b8860b" strokeWidth="1.5"/>
      <line x1="5" y1="12" x2="45" y2="12" stroke="#b8860b" strokeWidth="1"/>
      <line x1="5" y1="28" x2="45" y2="28" stroke="#b8860b" strokeWidth="1"/>
      <rect x="15" y="12" width="20" height="16" rx="2" fill="#e8c84a" opacity="0.5"/>
    </svg>
  )
}

// Globe SVG for back of card
function Globe() {
  return (
    <svg viewBox="0 0 100 100" width="44" height="44" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="4">
      <circle cx="50" cy="50" r="44"/>
      <ellipse cx="50" cy="50" rx="22" ry="44"/>
      <ellipse cx="50" cy="50" rx="44" ry="17"/>
      <line x1="6" y1="50" x2="94" y2="50"/>
    </svg>
  )
}

export default function CardPage() {
  const { user } = useAuth()
  const name = user?.name || 'Card Holder'
  const initials = name.charAt(0).toUpperCase()

  // Generate a deterministic fake card number from user id
  const uid = user?.id || 1
  const last4 = String(1000 + (uid * 7 % 9000)).padStart(4, '0')
  const first4 = '4244'
  const cardNumber = `${first4}**********${last4}`

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'শুভ সকাল' : hour < 17 ? 'শুভ বিকেল' : 'শুভ সন্ধ্যা'

  const gradient = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #ec4899 100%)'

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: 80, ...BN }}>

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

      {/* Cards */}
      <div style={{ padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

        {/* Front of card */}
        <div style={{ width: '100%', maxWidth: 380, borderRadius: 16, padding: '24px 24px 20px', background: gradient, color: '#fff', boxShadow: '0 8px 32px rgba(79,70,229,0.35)', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle circle decorations */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: -20, width: 120, height: 120, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <Chip />
            <span style={{ fontStyle: 'italic', fontWeight: 900, fontSize: 28, letterSpacing: 1, color: '#fff', fontFamily: 'Georgia, serif' }}>VISA</span>
          </div>

          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 3, marginBottom: 20, fontFamily: 'monospace' }}>
            {cardNumber}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, marginBottom: 3 }}>CARD HOLDER</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{name}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, marginBottom: 3 }}>VALID TILL</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>12 / 29</div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div style={{ width: '100%', maxWidth: 380, borderRadius: 16, padding: '20px 0 20px', background: gradient, color: '#fff', boxShadow: '0 8px 32px rgba(79,70,229,0.25)', overflow: 'hidden', position: 'relative' }}>
          {/* Decorative circle */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px 16px' }}>
            <Globe />
            <span style={{ fontStyle: 'italic', fontWeight: 900, fontSize: 28, letterSpacing: 1, color: '#fff', fontFamily: 'Georgia, serif' }}>VISA</span>
          </div>

          {/* Magnetic stripe */}
          <div style={{ width: '100%', height: 46, backgroundColor: '#0a0a0a', margin: '0 0 20px' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px' }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, marginBottom: 4 }}>CVV</div>
              <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: 3 }}>***</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, marginBottom: 4 }}>STATUS</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Inactive</div>
            </div>
          </div>
        </div>

        {/* Inactive button */}
        <div style={{ width: '100%', maxWidth: 380 }}>
          <button style={{
            width: '100%', backgroundColor: '#ef4444', color: '#fff',
            border: 'none', borderRadius: 10, padding: '15px',
            fontSize: 17, fontWeight: 700, cursor: 'default', ...BN,
          }}>
            কার্ডটি সক্রিয় নয়!
          </button>
        </div>
      </div>

      <BottomNav active="/dashboard/repayments" />
    </div>
  )
}
