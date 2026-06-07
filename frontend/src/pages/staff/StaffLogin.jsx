import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

// Staff list — username maps to phone field in DB, secret = password
const staffMembers = [
  { label: 'Tushar', username: 'tusar', secret: 'tusarstaffpassword' },
]

export default function StaffLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [selectedStaff, setSelectedStaff] = useState(staffMembers[0].label)
  const [form, setForm] = useState({ username: '', secret: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Find staff by selected name
    const staff = staffMembers.find(s => s.label === selectedStaff)

    // Validate username & secret match the staff credentials
    if (form.username !== staff.username || form.secret !== staff.secret) {
      toast.error('Invalid username or secret')
      return
    }

    setLoading(true)
    try {
      await login(staff.username, staff.secret)
      toast.success(`Welcome, ${staff.label}!`)
      navigate('/staff')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
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

          {/* Staff — shown as plain display box matching screenshot */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Staff</label>
            <div className="w-full bg-slate-100 rounded-xl px-4 py-3 text-slate-700 text-sm font-medium">
              {selectedStaff}
            </div>
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl tracking-widest text-sm transition flex items-center justify-center gap-2"
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
