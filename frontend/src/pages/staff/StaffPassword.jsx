import { useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function StaffPassword() {
  const [form, setForm] = useState({ phone: '', password: '', password_confirmation: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.password_confirmation) {
      toast.error('পাসওয়ার্ড মিলছে না')
      return
    }
    setLoading(true)
    try {
      // Find user by phone then reset password via admin endpoint
      const res = await api.get(`/admin/users?search=${form.phone}`)
      const users = res.data.data
      if (!users || users.length === 0) {
        toast.error('গ্রাহক পাওয়া যায়নি')
        return
      }
      // Use admin user update — patch password directly
      await api.post('/admin/users/reset-password', {
        phone: form.phone,
        password: form.password,
      })
      toast.success('পাসওয়ার্ড পরিবর্তন হয়েছে!')
      setForm({ phone: '', password: '', password_confirmation: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'পরিবর্তন ব্যর্থ হয়েছে')
    } finally {
      setLoading(false)
    }
  }

  const set = k => e => setForm({ ...form, [k]: e.target.value })

  const inputStyle = {
    width: '100%',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '0.5rem',
    padding: '0.65rem 1rem',
    color: '#e2e8f0',
    fontSize: '0.875rem',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    color: '#94a3b8',
    marginBottom: '0.4rem',
  }

  return (
    <div
      className="flex items-center justify-center min-h-full"
      style={{ fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-7"
        style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
      >
        {/* Title */}
        <h2 className="text-center font-bold text-white mb-6" style={{ fontSize: '1.05rem' }}>
          ব্যবহারকারীর পাসওয়ার্ড পরিবর্তন
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone */}
          <div>
            <label style={labelStyle}>গ্রাহকের ফোন নম্বর</label>
            <input
              type="text"
              placeholder="01712345678"
              value={form.phone}
              onChange={set('phone')}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#334155'}
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label style={labelStyle}>নতুন পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="নতুন পাসওয়ার্ড"
              value={form.password}
              onChange={set('password')}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#334155'}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label style={labelStyle}>পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              type="password"
              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
              value={form.password_confirmation}
              onChange={set('password_confirmation')}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#334155'}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-sm text-white transition flex items-center justify-center gap-2"
            style={{ backgroundColor: '#2563eb' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            {loading
              ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              : 'পাসওয়ার্ড পরিবর্তন করুন'
            }
          </button>
        </form>
      </div>
    </div>
  )
}
