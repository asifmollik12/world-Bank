import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
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

const statusColor = {
  pending:      { bg: '#fef9c3', color: '#92400e' },
  under_review: { bg: '#dbeafe', color: '#1e40af' },
  approved:     { bg: '#dcfce7', color: '#15803d' },
  rejected:     { bg: '#fee2e2', color: '#991b1b' },
  disbursed:    { bg: '#ede9fe', color: '#6d28d9' },
  completed:    { bg: '#f1f5f9', color: '#475569' },
}

const statusLabel = {
  pending: 'অপেক্ষারত', under_review: 'পর্যালোচনায়',
  approved: 'অনুমোদিত', rejected: 'প্রত্যাখ্যাত',
  disbursed: 'বিতরণ হয়েছে', completed: 'সম্পন্ন',
}

export default function MyLoans() {
  const { user } = useAuth()
  const [loans, setLoans]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/loans').then(r => setLoans(r.data)).finally(() => setLoading(false))
  }, [])

  const initials = user?.name?.charAt(0).toUpperCase() || 'U'

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingBottom: 80, ...BN }}>

      {/* Top navbar */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>World Bank</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <FaBell color="#fff" size={18} />
          <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2px dashed #93c5fd', backgroundColor: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 15 }}>
            {initials}
          </div>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{user?.name}</span>
        </div>
      </div>

      {/* Static notice bar */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 24px', textAlign: 'center' }}>
        <span style={{ color: '#fff', fontSize: 14, fontWeight: 500, ...BN }}>
          ঋণ অনুমোদিত হলে, আপনাকে প্রতি মাসের ১ থেকে ১০ তারিখের মধ্যে কিস্তি পরিশোধ করতে হবে।
        </span>
      </div>
      <div style={{ padding: '28px 16px' }}>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
            <div style={{ width: 36, height: 36, border: '4px solid #1d3a8a', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : loans.length === 0 ? (
          /* No loans state */
          <div style={{
            backgroundColor: '#fff', borderRadius: 12, padding: '40px 24px',
            textAlign: 'center', maxWidth: 360, margin: '20px auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            {/* Hand + heart icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <svg viewBox="0 0 80 70" width="80" height="70" fill="none">
                {/* Hand */}
                <path d="M15 55 C15 55 8 45 8 35 C8 28 13 24 18 24 C20 24 22 25 24 27 L24 15 C24 12 26 10 29 10 C32 10 34 12 34 15 L34 27 C35 25 37 24 40 24 C43 24 45 26 45 29 C46 27 48 26 51 26 C54 26 56 28 56 31 C57 29 59 28 62 28 C65 28 67 30 67 33 L67 45 C67 52 62 60 55 62 L30 62 C22 62 15 58 15 55Z" fill="#1d3a8a" opacity="0.15" stroke="#1d3a8a" strokeWidth="2"/>
                {/* Heart */}
                <path d="M40 22 C40 22 30 14 30 8 C30 4 33 2 36 2 C38 2 39.5 3 40 4 C40.5 3 42 2 44 2 C47 2 50 4 50 8 C50 14 40 22 40 22Z" fill="#1d3a8a"/>
              </svg>
            </div>
            <div style={{ color: '#374151', fontSize: 14, marginBottom: 20, fontWeight: 500 }}>
              আপনি এখনও ঋণের জন্য আবেদন করেননি!
            </div>
            <Link to="/dashboard/apply" style={{
              display: 'inline-block', backgroundColor: '#1d3a8a',
              color: '#fff', fontWeight: 700, fontSize: 15,
              padding: '12px 40px', borderRadius: 8, textDecoration: 'none', ...BN,
            }}>
              আবেদন করুন
            </Link>
          </div>
        ) : (
          /* Loan list */
          <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {loans.map(loan => {
              const s = statusColor[loan.status] || statusColor.pending
              return (
                <div key={loan.id} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{loan.loan_plan?.name}</div>
                      <div style={{ color: '#6b7280', fontSize: 12, marginTop: 2 }}>{loan.purpose}</div>
                    </div>
                    <span style={{ backgroundColor: s.bg, color: s.color, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
                      {statusLabel[loan.status] || loan.status}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13, color: '#374151' }}>
                    <div><span style={{ color: '#9ca3af' }}>পরিমাণ: </span><strong>৳{Number(loan.amount).toLocaleString()}</strong></div>
                    <div><span style={{ color: '#9ca3af' }}>মেয়াদ: </span><strong>{loan.duration_months} মাস</strong></div>
                    <div><span style={{ color: '#9ca3af' }}>মাসিক কিস্তি: </span><strong>৳{Number(loan.monthly_installment).toLocaleString()}</strong></div>
                    <div><span style={{ color: '#9ca3af' }}>সুদ: </span><strong>{loan.interest_rate}%</strong></div>
                  </div>
                  {loan.admin_note && (
                    <div style={{ marginTop: 10, backgroundColor: '#f8fafc', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#475569', borderLeft: '3px solid #1d3a8a' }}>
                      {loan.admin_note}
                    </div>
                  )}
                  <div style={{ marginTop: 10, fontSize: 11, color: '#9ca3af' }}>
                    আবেদনের তারিখ: {new Date(loan.created_at).toLocaleDateString('bn-BD')}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <BottomNav active="/dashboard/loans" />
    </div>
  )
}
