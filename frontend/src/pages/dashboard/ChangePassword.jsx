import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const BN = { fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }

export default function ChangePassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ current_password: '', password: '', password_confirmation: '' })
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

  const inputStyle = { width: '100%', border: '1.5px solid #818cf8', borderRadius: 8, padding: '12px 16px', fontSize: 14, outline: 'none', backgroundColor: '#fff', color: '#111', boxSizing: 'border-box', ...BN }
  const labelStyle = { display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#111', ...BN }

  return (
    <div style={{ backgroundColor: '#e5e7eb', minHeight: '100vh', ...BN }}>
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={() => navigate('/dashboard/profile')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}><FaArrowLeft /></button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>পাসওয়ার্ড পরিবর্তন</span>
      </div>
      <div style={{ maxWidth: 560, margin: '24px auto', backgroundColor: '#fff', borderRadius: 12, padding: '28px 32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div><label style={labelStyle}>বর্তমান পাসওয়ার্ড</label><input type="password" value={form.current_password} onChange={set('current_password')} style={inputStyle} required /></div>
          <div><label style={labelStyle}>নতুন পাসওয়ার্ড</label><input type="password" value={form.password} onChange={set('password')} style={inputStyle} required /></div>
          <div><label style={labelStyle}>পাসওয়ার্ড নিশ্চিত করুন</label><input type="password" value={form.password_confirmation} onChange={set('password_confirmation')} style={inputStyle} required /></div>
          <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#1d3a8a', color: '#fff', border: 'none', borderRadius: 8, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, ...BN }}>
            {loading ? <span style={{ width: 20, height: 20, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block' }} /> : 'পরিবর্তন করুন'}
          </button>
        </form>
      </div>
    </div>
  )
}
