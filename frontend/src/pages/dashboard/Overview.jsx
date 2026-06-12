import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import { FaHome, FaLayerGroup, FaCreditCard, FaHeadset, FaUser, FaBell, FaGlobe } from 'react-icons/fa'

const BN = { fontFamily: "'Hind Siliguri', sans-serif" }

function BottomNav({ active }) {
  const items = [
    { icon: <FaHome size={20} />,      label: 'হোম',      path: '/dashboard' },
    { icon: <FaLayerGroup size={20} />, label: 'ঋণ',       path: '/dashboard/loans' },
    { icon: <FaCreditCard size={20} />, label: 'কার্ড',    path: '/dashboard/repayments' },
    { icon: <FaHeadset size={20} />,    label: 'সাহায়া',  path: '/dashboard/notifications' },
    { icon: <FaUser size={20} />,       label: 'প্রোফাইল', path: '/dashboard/profile' },
  ]
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      backgroundColor: '#fff', borderTop: '1px solid #e5e7eb',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 0 14px', zIndex: 50,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.06)',
    }}>
      {items.map(item => {
        const isActive = active === item.path
        return (
          <Link key={item.path} to={item.path} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isActive ? '#1d3a8a' : '#9ca3af',
            textDecoration: 'none', fontSize: 10, fontWeight: isActive ? 700 : 400, ...BN,
          }}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default function Overview() {
  const { user } = useAuth()
  const [loans, setLoans] = useState([])

  useEffect(() => {
    api.get('/loans').then(r => setLoans(r.data)).catch(() => {})
  }, [])

  const totalBalance = loans
    .filter(l => l.status === 'disbursed')
    .reduce((s, l) => s + Number(l.amount), 0)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'শুভ সকাল' : hour < 17 ? 'শুভ বিকেল' : 'শুভ সন্ধ্যা'

  const hasPending  = loans.length > 0 && loans.every(l => ['pending','under_review'].includes(l.status))
  const hasApproved = loans.some(l => ['approved','disbursed','completed'].includes(l.status))
  const noLoans     = loans.length === 0

  const initials = user?.name?.charAt(0).toUpperCase() || 'U'

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingBottom: 80, ...BN }}>

      {/* ── Top Navbar ── */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>World Bank</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <FaBell color="#fff" size={18} />
          {/* Avatar with dashed border */}
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            border: '2px dashed #93c5fd',
            backgroundColor: '#1e40af',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 15,
          }}>
            {initials}
          </div>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{user?.name}</span>
        </div>
      </div>

      {/* ── Greeting ── */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '8px 20px 28px' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
          {greeting}, {user?.name}!
        </div>
        <div style={{ color: '#93c5fd', fontSize: 13, marginTop: 2 }}>
          বিশ্ব ব্যাংক ঋণে আপনাকে স্বাগতম!
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '24px 16px' }}>

        {/* Balance card */}
        <div style={{
          backgroundColor: '#1d3a8a', borderRadius: 12, padding: '22px 24px',
          marginBottom: 28, boxShadow: '0 4px 20px rgba(29,58,138,0.25)',
          maxWidth: 560, margin: '0 auto 28px',        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ color: '#93c5fd', fontSize: 14 }}>আকাউন্ট ব্যালেন্স</span>
            {/* Globe icon bigger */}
            <svg viewBox="0 0 100 100" width="32" height="32" fill="none" stroke="#93c5fd" strokeWidth="4">
              <circle cx="50" cy="50" r="44"/>
              <ellipse cx="50" cy="50" rx="22" ry="44"/>
              <ellipse cx="50" cy="50" rx="44" ry="17"/>
              <line x1="6" y1="50" x2="94" y2="50"/>
            </svg>
          </div>
          <div style={{ color: '#fff', fontWeight: 900, fontSize: 32, marginBottom: 20 }}>
            ৳{totalBalance > 0 ? totalBalance.toLocaleString() + '.00' : '৳০.০০'}
          </div>
          <Link to="/dashboard/apply" style={{
            display: 'block', textAlign: 'center',
            border: '1.5px solid #fff', borderRadius: 8, padding: '12px',
            color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', ...BN,
          }}>
            ঋণ উত্তোলন
          </Link>
        </div>

        {/* ── State 1: No loans — fill profile prompt (no card, directly on grey bg) ── */}
        {noLoans && (
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto', padding: '8px 0' }}>
            {/* ID card icon — bigger, blue */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{
                width: 80, height: 58, backgroundColor: '#1d3a8a', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <div style={{ width: 22, height: 22, borderRadius: 3, backgroundColor: '#93c5fd' }} />
                <div>
                  <div style={{ width: 30, height: 4, backgroundColor: '#93c5fd', borderRadius: 2, marginBottom: 6 }} />
                  <div style={{ width: 22, height: 4, backgroundColor: '#93c5fd', borderRadius: 2 }} />
                </div>
              </div>
            </div>
            <div style={{ color: '#374151', fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
              ঋণ আবেদনের জন্য প্রথমে আপনাকে ব্যক্তিগত তথ্য পূরণ করতে হবে!
            </div>
            <Link to="/dashboard/personal-info" style={{
              display: 'inline-block', backgroundColor: '#1d3a8a',
              color: '#fff', fontWeight: 700, fontSize: 15,
              padding: '14px 40px', borderRadius: 8, textDecoration: 'none', ...BN,
            }}>
              ব্যক্তিগত তথ্য পূরণ করুন
            </Link>
          </div>
        )}

        {/* ── State 2: Loan pending/under review ── */}
        {hasPending && (
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto', padding: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{
                width: 52, height: 42, backgroundColor: '#dc2626', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              }}>
                <div style={{ width: 6, height: 20, backgroundColor: '#fff', borderRadius: 2 }} />
                <div style={{ width: 6, height: 20, backgroundColor: '#fff', borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ color: '#374151', fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
              আপনার ঋণের আবেদন পর্যবেক্ষণ করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন!
            </div>
            <button style={{
              backgroundColor: '#dc2626', color: '#fff', border: 'none',
              borderRadius: 8, padding: '14px 32px', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', ...BN,
            }}>
              অনুমোদন পেতে কতক্ষণ লাগতে পারে?
            </button>
          </div>
        )}

        {/* ── State 3: Approved/Disbursed loans ── */}
        {hasApproved && (
          <div style={{
            backgroundColor: '#fff', borderRadius: 12, padding: '20px',
            maxWidth: 360, margin: '0 auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontWeight: 700, color: '#1d3a8a', marginBottom: 12, fontSize: 14 }}>আমার ঋণ</div>
            {loans.filter(l => ['approved','disbursed','completed'].includes(l.status)).slice(0, 3).map(loan => (
              <div key={loan.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{loan.loan_plan?.name}</div>
                  <div style={{ color: '#6b7280', fontSize: 11 }}>৳{Number(loan.monthly_installment).toLocaleString()} / মাস</div>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, alignSelf: 'center',
                  backgroundColor: '#dcfce7', color: '#15803d',
                }}>অনুমোদিত</span>
              </div>
            ))}
            <Link to="/dashboard/loans" style={{ display: 'block', textAlign: 'center', marginTop: 12, color: '#1d3a8a', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              সব ঋণ দেখুন →
            </Link>
          </div>
        )}
      </div>

      <BottomNav active="/dashboard" />
    </div>
  )
}
