import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const BN = { fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }

export default function ChangePassword() {
  const navigate  = useNavigate()
  const [form, setForm]       = useState({ current_password: '', password: '', password_confirmation: '' })
  const [loading, setLoading] = useState(false)

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

  const inputStyle = {
    width: '100%', border: '1.5px solid #d1d5db', borderRadius: 8,
    padding: '14px 16px', fontSize: 15, outline: 'none',
    backgroundColor: '#fff', color: '#111', boxSizing: 'border-box', ...BN,
  }
  const labelStyle = {
    display: 'block', fontWeight: 500, fontSize: 14,
    marginBottom: 8, color: '#374151', ...BN,
  }

  const fields = [
    { key: 'current_password',      label: 'বর্তমান পাসওয়ার্ড',      placeholder: 'আপনার বর্তমান পাসওয়ার্ড লিখুন' },
    { key: 'password',              label: 'নতুন পাসওয়ার্ড',         placeholder: 'নতুন পাসওয়ার্ড লিখুন' },
    { key: 'password_confirmation', label: 'নতুন পাসওয়ার্ড নিশ্চিত করুন', placeholder: 'নতুন পাসওয়ার্ড আবার লিখুন' },
  ]

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', ...BN }}>

      {/* Dark blue header */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={() => navigate('/dashboard/profile')}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>
          <FaArrowLeft />
        </button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>পাসওয়ার্ড পরিবর্তন</span>
      </div>

      <div style={{ maxWidth: 520, margin: '24px auto', padding: '0 16px' }}>

        {/* White form card */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 16, padding: '28px 28px 32px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.09)', marginBottom: 24,
        }}>
          {/* Card title */}
          <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 20, color: '#111', marginBottom: 28, ...BN }}>
            পাসওয়ার্ড পরিবর্তন করুন
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {fields.map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input
                  type="password"
                  value={form[key]}
                  onChange={set(key)}
                  placeholder={placeholder}
                  style={inputStyle}
                  required
                />
              </div>
            ))}

            <button type="submit" disabled={loading} style={{
              width: '100%', backgroundColor: '#2d52c8', color: '#fff',
              border: 'none', borderRadius: 8, padding: '16px',
              fontSize: 17, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: loading ? 0.8 : 1, ...BN,
            }}>
              {loading
                ? <span style={{ width: 22, height: 22, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block' }} />
                : 'পাসওয়ার্ড পরিবর্তন করুন'
              }
            </button>
          </form>
        </div>

        {/* Security tips — outside card, directly on grey bg */}
        <div style={{ padding: '4px 8px 32px' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#2d52c8', marginBottom: 14, ...BN }}>
            পাসওয়ার্ড নিরাপত্তা টিপস:
          </div>
          {[
            'কমপক্ষে ৬ অক্ষর ব্যবহার করুন',
            'বড় হাতের এবং ছোট হাতের অক্ষর মিশ্রিত করুন',
            'সংখ্যা এবং বিশেষ চিহ্ন যোগ করুন',
            'সহজে অনুমানযোগ্য তথ্য ব্যবহার করবেন না',
          ].map(tip => (
            <div key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#2d52c8', fontSize: 15, fontWeight: 500, marginBottom: 10, ...BN }}>
              <span style={{ fontWeight: 700 }}>•</span>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
