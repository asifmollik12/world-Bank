import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
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

export default function Support() {
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [phone, setPhone]     = useState('')
  const [loading, setLoading] = useState(false)

  const name     = user?.name || 'User'
  const initials = name.charAt(0).toUpperCase()

  const handleSend = e => {
    e.preventDefault()
    if (!message.trim()) { toast.error('বার্তা লিখুন'); return }
    if (!phone.trim())   { toast.error('ফোন নম্বর লিখুন'); return }
    setLoading(true)
    setTimeout(() => {
      toast.success('বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।')
      setMessage(''); setPhone(''); setLoading(false)
    }, 800)
  }

  const inputStyle = {
    width: '100%', border: '1px solid #d1d5db', borderRadius: 8,
    padding: '16px 18px', fontSize: 16, outline: 'none',
    color: '#374151', backgroundColor: '#fff', boxSizing: 'border-box', ...BN,
  }

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

      {/* Static notice bar */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 24px', textAlign: 'center' }}>
        <span style={{ color: '#fff', fontSize: 15, fontWeight: 500, ...BN }}>
          সাহায্য পেতে আমাদের সাথে চ্যাট করুন অথবা নিচে দেওয়া ফর্মে আপনার সমস্যা লিখে পাঠান।
        </span>
      </div>

      <div style={{ padding: '20px 16px', maxWidth: 560, margin: '0 auto' }}>

        {/* Blue info card */}
        <div style={{ backgroundColor: '#1d3a8a', borderRadius: 12, padding: '20px 22px', color: '#fff', marginBottom: 20 }}>

          {/* Address */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>📍</span> ঠিকানা:
            </div>
            <div style={{ color: '#bfdbfe', fontSize: 15, paddingLeft: 30 }}>
              ই-৩২, আগারগাঁও, শেরে-বাংলা নগর, ঢাকা - ১২০৭।
            </div>
          </div>

          {/* Office hours */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>❓</span> কার্যক্রম:
            </div>
            <div style={{ color: '#bfdbfe', fontSize: 15, paddingLeft: 30 }}>
              সকাল ৯টা থেকে রাত ৯টা, শনি থেকে বৃহস্পতিবার।
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>📞</span> সরাসির যোগাযোগ করুনঃ
            </div>
            <div style={{ paddingLeft: 30, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* WhatsApp */}
              <a href="https://wa.me/8801827672726" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', textDecoration: 'none', fontSize: 15 }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Whatsapp: +8801827672726
              </a>
              {/* IMO */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>imo</div>
                IMO: +8801827672726
              </div>
            </div>
          </div>
        </div>

        {/* Message form */}
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={5}
            placeholder="যদি আপনার কোন প্রশ্ন বা উদ্বেগ থাকে, তাহলে অনুগ্রহ করে এখানে লিখুন!"
            style={{ ...inputStyle, resize: 'none' }}
          />
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="আপনার যোগাযোগের ফোন নম্বর লিখুন!"
            style={inputStyle}
          />
          <button type="submit" disabled={loading} style={{
            width: '100%', backgroundColor: '#1d3a8a', color: '#fff',
            border: 'none', borderRadius: 8, padding: '15px',
            fontSize: 16, fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            opacity: loading ? 0.8 : 1, ...BN,
          }}>
            {loading
              ? <span style={{ width: 20, height: 20, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block' }} />
              : 'বার্তা পাঠান'
            }
          </button>
        </form>
      </div>

      <BottomNav active="/dashboard/notifications" />
    </div>
  )
}
