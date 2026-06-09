import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import { FaHome, FaLayerGroup, FaCreditCard, FaHeadset, FaUser, FaBell, FaGlobe } from 'react-icons/fa'

const BN = { fontFamily: "'Hind Siliguri', sans-serif" }

function BottomNav({ active }) {
  const items = [
    { icon: <FaHome size={20} />, label: 'হোম',    path: '/dashboard' },
    { icon: <FaLayerGroup size={20} />, label: 'ঋণ', path: '/dashboard/loans' },
    { icon: <FaCreditCard size={20} />, label: 'কার্ড', path: '/dashboard/repayments' },
    { icon: <FaHeadset size={20} />, label: 'সাহায়া', path: '/dashboard/notifications' },
    { icon: <FaUser size={20} />, label: 'প্রোফাইল', path: '/dashboard/profile' },
  ]
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      backgroundColor: '#fff', borderTop: '1px solid #e5e7eb',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 0 14px', zIndex: 50,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.08)',
    }}>
      {items.map(item => {
        const isActive = active === item.path
        return (
          <Link key={item.path} to={item.path} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isActive ? '#1d3a8a' : '#9ca3af',
            textDecoration: 'none', fontSize: 10, fontWeight: isActive ? 700 : 400,
            ...BN,
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
  const navigate = useNavigate()
  const [loans, setLoans] = useState([])

  useEffect(() => {
    api.get('/loans').then(r => setLoans(r.data)).catch(() => {})
  }, [])

  const totalBalance = loans
    .filter(l => l.status === 'disbursed')
    .reduce((s, l) => s + Number(l.amount), 0)

  const hasProfile = user?.nid && user?.address

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'শুভ সকাল' : hour < 17 ? 'শুভ বিকেল' : 'শুভ সন্ধ্যা'

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', paddingBottom: 80, ...BN }}>

      {/* Top navbar */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>World Bank</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <FaBell color="#fff" size={18} />
          <div style={{
            width: 36, height: 36, borderRadius: '50%', border: '2px dashed #93c5fd',
            backgroundColor: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 15,
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={{ color: '#fff', fontSize: 13 }}>{user?.name?.split(' ')[0]}</span>
        </div>
      </div>

      {/* Greeting banner */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '10px 20px 20px' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
          {greeting}, {user?.name?.split(' ')[0]}!
        </div>
        <div style={{ color: '#93c5fd', fontSize: 13, marginTop: 2 }}>
          বিশ্ব ব্যাংক ঋণে আপনাকে স্বাগতম!
        </div>
      </div>

      <div style={{ padding: '0 16px', marginTop: -10 }}>

        {/* Account balance card */}
        <div style={{
          backgroundColor: '#1d3a8a', borderRadius: 12, padding: '20px 24px',
          marginBottom: 20, boxShadow: '0 4px 20px rgba(29,58,138,0.3)',
          maxWidth: 380, margin: '0 auto 20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ color: '#93c5fd', fontSize: 13 }}>আকাউন্ট ব্যালেন্স</span>
            <FaGlobe color="#93c5fd" size={20} />
          </div>
          <div style={{ color: '#fff', fontWeight: 900, fontSize: 28, marginBottom: 16 }}>
            ৳{totalBalance.toLocaleString('bn-BD', { minimumFractionDigits: 2 }) || '৳০.০০'}
          </div>
          <Link to="/dashboard/apply" style={{
            display: 'block', textAlign: 'center',
            border: '2px solid #fff', borderRadius: 8, padding: '10px',
            color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
            ...BN,
          }}>
            ঋণ উত্তোলন
          </Link>
        </div>

        {/* Profile completion prompt — shown if no NID/address */}
        {!hasProfile && (
          <div style={{
            backgroundColor: '#fff', borderRadius: 12, padding: '28px 24px',
            textAlign: 'center', maxWidth: 380, margin: '0 auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            {/* ID card icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <div style={{
                width: 64, height: 44, backgroundColor: '#1d3a8a', borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{ width: 18, height: 18, borderRadius: 2, backgroundColor: '#93c5fd', marginRight: 6 }} />
                <div>
                  <div style={{ width: 28, height: 3, backgroundColor: '#93c5fd', borderRadius: 2, marginBottom: 4 }} />
                  <div style={{ width: 20, height: 3, backgroundColor: '#93c5fd', borderRadius: 2 }} />
                </div>
              </div>
            </div>
            <div style={{ color: '#374151', fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
              ঋণ আবেদনের জন্য প্রথমে আপনাকে ব্যক্তিগত তথ্য পূরণ করতে হবে!
            </div>
            <Link to="/dashboard/profile" style={{
              display: 'inline-block', backgroundColor: '#1d3a8a',
              color: '#fff', fontWeight: 700, fontSize: 14,
              padding: '12px 28px', borderRadius: 8, textDecoration: 'none',
              ...BN,
            }}>
              ব্যক্তিগত তথ্য পূরণ করুন
            </Link>
          </div>
        )}

        {/* If has profile — show loan summary */}
        {hasProfile && loans.length > 0 && (
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '20px', maxWidth: 380, margin: '0 auto', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ fontWeight: 700, color: '#1d3a8a', marginBottom: 12 }}>আমার ঋণ</div>
            {loans.slice(0, 3).map(loan => (
              <div key={loan.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{loan.loan_plan?.name}</div>
                  <div style={{ color: '#6b7280', fontSize: 11 }}>৳{Number(loan.monthly_installment).toLocaleString()} / মাস</div>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, alignSelf: 'center',
                  backgroundColor: loan.status === 'approved' ? '#dcfce7' : loan.status === 'pending' ? '#fef9c3' : '#f3f4f6',
                  color: loan.status === 'approved' ? '#15803d' : loan.status === 'pending' ? '#92400e' : '#6b7280',
                }}>
                  {loan.status === 'pending' ? 'অপেক্ষারত' : loan.status === 'approved' ? 'অনুমোদিত' : loan.status === 'disbursed' ? 'বিতরণ হয়েছে' : loan.status}
                </span>
              </div>
            ))}
            <Link to="/dashboard/loans" style={{ display: 'block', textAlign: 'center', marginTop: 12, color: '#1d3a8a', fontSize: 13, fontWeight: 600 }}>
              সব ঋণ দেখুন →
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav active="/dashboard" />
    </div>
  )
}
