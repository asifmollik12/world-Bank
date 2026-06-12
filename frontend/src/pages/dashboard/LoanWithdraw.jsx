import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import { FaArrowLeft, FaHome, FaLayerGroup, FaCreditCard, FaHeadset, FaUser, FaBell } from 'react-icons/fa'

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

// Mask account number: show first 3 and last 3 digits
function maskAccount(num) {
  if (!num) return '***'
  const s = String(num)
  if (s.length <= 6) return s
  return s.slice(0, 3) + '***' + s.slice(-3)
}

export default function LoanWithdraw() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loans, setLoans] = useState([])
  const [bankInfo, setBankInfo] = useState(null)

  useEffect(() => {
    api.get('/loans').then(r => setLoans(r.data)).catch(() => {})
    // Try to get saved bank info from localStorage (saved during bank-account step)
    const saved = localStorage.getItem('wbg_bank_info')
    if (saved) setBankInfo(JSON.parse(saved))
  }, [])

  const hasPending  = loans.length > 0 && loans.every(l => ['pending', 'under_review'].includes(l.status))
  const hasApproved = loans.some(l => ['approved', 'disbursed'].includes(l.status))
  const initials    = user?.name?.charAt(0).toUpperCase() || 'U'

  // Demo bank info if none saved
  const payMethod  = bankInfo?.method || 'বিকাশ'
  const acctNumber = bankInfo?.account_no || bankInfo?.bkash_no || bankInfo?.nagad_no || '044***587'

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingBottom: 80, ...BN }}>

      {/* Navbar */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>
            <FaArrowLeft />
          </button>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>World Bank</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <FaBell color="#fff" size={18} />
          <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2px dashed #93c5fd', backgroundColor: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 15 }}>
            {initials}
          </div>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{user?.name}</span>
        </div>
      </div>

      <div style={{ padding: '24px 16px', maxWidth: 560, margin: '0 auto' }}>

        {/* Payment info card */}
        <div style={{ backgroundColor: '#1d3a8a', borderRadius: 12, padding: '18px 20px', marginBottom: 28, color: '#fff', fontSize: 15, lineHeight: 2.2 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: '#93c5fd', width: 110 }}>পেমেন্ট পদ্ধতি</span>
            <span>: {payMethod}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: '#93c5fd', width: 110 }}>আকাউন্ট নম্বর</span>
            <span>: {maskAccount(acctNumber)}</span>
          </div>
        </div>

        {/* Pending state */}
        {hasPending && (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            {/* Red pause icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{ width: 56, height: 44, backgroundColor: '#dc2626', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <div style={{ width: 6, height: 20, backgroundColor: '#fff', borderRadius: 2 }} />
                <div style={{ width: 6, height: 20, backgroundColor: '#fff', borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ color: '#374151', fontSize: 15, marginBottom: 20, lineHeight: 1.7 }}>
              আপনার ঋণের আবেদন পর্যবেক্ষণ করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন!
            </div>
            <button style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', ...BN }}>
              অনুমোদন পেতে কতক্ষণ লাগতে পারে?
            </button>
          </div>
        )}

        {/* No loans state */}
        {loans.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 16 }}>আপনার কোনো ঋণ আবেদন নেই।</div>
            <Link to="/dashboard/apply" style={{ backgroundColor: '#1d3a8a', color: '#fff', padding: '12px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15, ...BN }}>
              ঋণের জন্য আবেদন করুন
            </Link>
          </div>
        )}

        {/* Approved state */}
        {hasApproved && (
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ fontWeight: 700, color: '#15803d', fontSize: 16, marginBottom: 12, textAlign: 'center' }}>✅ ঋণ অনুমোদিত হয়েছে!</div>
            {loans.filter(l => ['approved', 'disbursed'].includes(l.status)).map(loan => (
              <div key={loan.id} style={{ fontSize: 14, lineHeight: 2, color: '#374151' }}>
                <div><strong>পরিমাণ:</strong> ৳{Number(loan.amount).toLocaleString()}</div>
                <div><strong>মাসিক কিস্তি:</strong> ৳{Number(loan.monthly_installment).toLocaleString()}</div>
                <div><strong>মেয়াদ:</strong> {loan.duration_months} মাস</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="/dashboard" />
    </div>
  )
}
