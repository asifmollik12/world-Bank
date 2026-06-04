import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FaUniversity } from 'react-icons/fa'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', password_confirmation: '', address: '', nid: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.password_confirmation) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await register(form)
      toast.success('Registration successful! Welcome.')
      navigate('/dashboard')
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors) {
        Object.values(errors).flat().forEach(msg => toast.error(msg))
      } else {
        toast.error(err.response?.data?.message || 'Registration failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-blue-700 rounded-full p-4 mb-4">
            <FaUniversity className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-extrabold text-blue-900">Create Account</h1>
          <p className="text-slate-500 text-sm mt-1">Join World Bank Group today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Full Name *</label>
              <input type="text" placeholder="John Doe" value={form.name} onChange={set('name')} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number *</label>
              <input type="text" placeholder="01XXXXXXXXX" value={form.phone} onChange={set('phone')} className="input-field" required />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address *</label>
            <input type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} className="input-field" required />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">NID Number</label>
            <input type="text" placeholder="National ID Number" value={form.nid} onChange={set('nid')} className="input-field" />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Address</label>
            <input type="text" placeholder="Your full address" value={form.address} onChange={set('address')} className="input-field" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Password *</label>
              <input type="password" placeholder="Min 6 characters" value={form.password} onChange={set('password')} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Confirm Password *</label>
              <input type="password" placeholder="Repeat password" value={form.password_confirmation} onChange={set('password_confirmation')} className="input-field" required />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
            {loading ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : null}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 font-semibold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  )
}
