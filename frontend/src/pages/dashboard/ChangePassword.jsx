import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const BN = { fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }

export default function ChangePassword() {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ current_password: '', password: '', password_confirmation: '' })
  const [loading, setLoading] = useState(false)
  const [showCur, setShowCur]   = useState(false)
  const [showNew, setShowNew]   = useState(false)
  const [showCon, setShowCon]   = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.password_confirmation) { toast.error('পাসওয়ার্ড মিলছে না'); return }
    setLoading(true)
    try {
      await api.post('/profile/password', form)
      toast.success('পাসওয়ার্ড পরিবর্তন হয়েছে!')
      navigate('/dashboard/profile')
    } catch (err) {
      toast.error(err.response?.data?.message || 'ব্যর্থ হয়েছে')
    } finally { setLoading(false) }
  }

  const inputWrap = { position: 'relative' }
  const inputStyle = {
    width: '100%', border: '1.5px solid #d1d5db', borderRadius: 8,
    padding: '14px 46px 14px 16px', fontSize: 15, outline: 'none',
    backgroundColor: '#fff', color: '#111', boxSizing: 'border-box', ...BN,
  }
  const labelStyle = { display: 'block', fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#374151', ...BN }
  const eyeBtn = { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 16 }

  const fields = [
    { key: 'current_password', label: 'বর্তমান পাসওয়ার্ড', placeholder: 'আপনার বর্তমান পাসওয়ার্ড দিখুন', show: showCur, toggle: () => setShowCur(v => !v) },
    { key: 'password',         label: 'নতুন পাসওয়ার্ড',   placeholder: 'নতুন পাসওয়ার্ড দিখুন', show: showNew, toggle: () => setShowNew(v => !v) },
    { key: 'password_confirmation', label: 'পাসওয়ার্ড নিশ্চিত করুন', placeholder: 'পাসওয়ার্ড পুনরায় দিখুন', show: showCon, toggle: () => setShowCon(v => !v) },
  ]

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', ...BN }}>

      {/* Back header */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={() => navigate('/dashboard/profile')}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>
          <FaArrowLeft />
        </button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>পাসওয়ার্ড পরিবর্তন</span>
      </div>

      {/* Blue title banner */}
      <div style={{ backgroundColor: '#fff', padding: '20px 24px 4px', textAlign: 'center' }}>
        <span style={{ color: '#111', fontWeight: 800, fontSize: 20, ...BN }}>পাসওয়ার্ড পরিবর্তন করুন</span>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>

        {/* Form card */}
        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '20px 28px 28px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', marginBottom: 20 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {fields.map(({ key, label, placeholder, show, toggle }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <div style={inputWrap}>
                  <input
                    type={show ? 'text' : 'password'}
                    value={form[key]}
                    onChange={set(key)}
                    placeholder={placeholder}
                    style={inputStyle}
                    required
                  />
                  <button type="button" onClick={toggle} style={eyeBtn}>
                    {show ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            ))}

            <button type="submit" disabled={loading} style={{
              width: '100%', backgroundColor: '#1d3a8a', color: '#fff',
              border: 'none', borderRadius: 8, padding: '15px',
              fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: loading ? 0.8 : 1, ...BN,
            }}>
              {loading
                ? <span style={{ width: 22, height: 22, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block' }} />
                : 'পরিবর্তন করুন'
              }
            </button>
          </form>
        </div>

        {/* Security tips card */}
        <div style={{ backgroundColor: '#eef2ff', borderRadius: 14, padding: '24px 28px', marginBottom: 32 }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#1d3a8a', marginBottom: 16, ...BN }}>
            পাসওয়ার্ড নিরাপত্তা টিপস:
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'কমপক্ষে ৬ অক্ষর ব্যবহার করুন',
              'বড় হাতের এবং ছোট হাতের অক্ষর মিশ্রিত করুন',
              'সংখ্যা এবং বিশেষ চিহ্ন যোগ করুন',
              'সহজে অনুমানযোগ্য তথ্য ব্যবহার করবেন না',
            ].map(tip => (
              <li key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#1d3a8a', fontSize: 15, fontWeight: 500, ...BN }}>
                <span style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.2 }}>•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
