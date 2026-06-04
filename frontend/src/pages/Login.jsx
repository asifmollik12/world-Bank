import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FaUniversity, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ phone: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await login(form.phone, form.password)
      toast.success('Welcome back!')
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-blue-700 rounded-full p-4 mb-4">
            <FaUniversity className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-extrabold text-blue-900">World Bank Group</h1>
          <p className="text-slate-500 text-sm mt-1">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number</label>
            <input
              type="text"
              placeholder="01XXXXXXXXX"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="input-field pr-10"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2">
            {loading ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : null}
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-700 font-semibold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  )
}
