import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const staffList = [
  'Albert',
  'Robiul Alom',
  'Sakib Ahmed',
  'Nusrat Jahan',
  'Karim Hossain',
]

export default function StaffLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ staff: '', username: '', secret: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.staff) { toast.error('Please select a staff'); return }
    setLoading(true)
    try {
      // username = phone, secret = password for the API
      const user = await login(form.username, form.secret)
      toast.success('Welcome!')
      navigate('/staff')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center"
      style={{ backgroundColor: '#0d1b2a' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 px-10 py-10">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">
          Staff Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Staff dropdown */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Staff</label>
            <select
              value={form.staff}
              onChange={e => setForm({ ...form, staff: e.target.value })}
              className="w-full bg-slate-100 border-0 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              required
            >
              <option value="">-- Select Staff --</option>
              {staffList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              className="w-full bg-slate-100 border-0 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
              required
            />
          </div>

          {/* Secret */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Secret</label>
            <input
              type="password"
              placeholder="Secret"
              value={form.secret}
              onChange={e => setForm({ ...form, secret: e.target.value })}
              className="w-full bg-slate-100 border-0 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
              required
            />
          </div>

          {/* LOGIN button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl tracking-widest text-sm transition flex items-center justify-center gap-2"
          >
            {loading
              ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              : 'LOGIN'
            }
          </button>
        </form>
      </div>
    </div>
  )
}
