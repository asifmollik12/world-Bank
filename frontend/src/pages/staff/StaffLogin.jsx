import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

// Staff list — username maps to phone field in DB, secret = password
const staffMembers = [
  { label: 'Tushar',  username: 'tusar', secret: 'tusarstaffpassword'  },
  { label: 'Akash',   username: 'akash', secret: 'akashstaffpassword'  },
  { label: 'Tamim',   username: 'tamim', secret: 'tamimstaffpassword'  },
]

export default function StaffLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [selectedStaff, setSelectedStaff] = useState('')
  const [form, setForm] = useState({ username: '', secret: '' })
  const [loading, setLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedStaff) { toast.error('Please select a staff'); return }

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

          {/* Staff dropdown */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Staff</label>
            <select
              value={selectedStaff}
              onChange={e => setSelectedStaff(e.target.value)}
              className="w-full bg-slate-100 border-0 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Staff --</option>
              {staffMembers.map(s => (
                <option key={s.label} value={s.label}>{s.label}</option>
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
            <div className="relative">
              <input
                type={showSecret ? 'text' : 'password'}
                placeholder="Secret"
                value={form.secret}
                onChange={e => setForm({ ...form, secret: e.target.value })}
                className="w-full bg-slate-100 border-0 rounded-xl px-4 py-3 pr-11 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showSecret ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
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
