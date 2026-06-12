import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa'

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
      toast.success('স্বাগতম!')
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'ফোন নম্বর বা পাসওয়ার্ড ভুল')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-screen h-screen overflow-hidden" style={{ fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }}>

      {/* ── LEFT PANEL: building photo + Bengali tagline ── */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center">
        {/* bg image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80')` }}
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* text */}
        <div className="relative z-10 text-white text-center px-10">
          <p className="text-lg md:text-xl font-medium leading-snug mb-3">
            আপনার মুখে হাসি থাকুক<br />সবসময়!
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-snug">
            সহজ, দ্রুত ও নিরাপদ লোন!
          </h2>
        </div>
      </div>

      {/* ── RIGHT PANEL: white login form ── */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-sm">

          {/* Globe logo */}
          <div className="flex flex-col items-center mb-6">
            <svg viewBox="0 0 100 100" className="w-16 h-16 mb-2" fill="none" strokeWidth="3.5">
              <defs>
                <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="44" stroke="url(#globeGrad)" />
              <ellipse cx="50" cy="50" rx="22" ry="44" stroke="url(#globeGrad)" />
              <ellipse cx="50" cy="50" rx="44" ry="17" stroke="url(#globeGrad)" />
              <line x1="6" y1="50" x2="94" y2="50" stroke="url(#globeGrad)" />
            </svg>
            <span className="font-extrabold text-sm tracking-widest text-slate-800 uppercase">
              WORLD BANK GROUP
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-lg font-bold text-slate-800 mb-5">
            আপনার অ্যাকাউন্টে লগইন করুন!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone */}
            <div>
              <label className="text-sm text-slate-600 mb-1 block">ফোন নম্বর (ইংরেজি)</label>
              <input
                type="text"
                placeholder="01512345678"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-slate-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-600 mb-1 block">পাসওয়ার্ড</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-10 placeholder-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            {/* Login button — orange */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm"
            >
              {loading
                ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                : <>লগইন করুন <FaArrowRight /></>
              }
            </button>
          </form>

          {/* Fingerprint icon */}
          <div className="flex justify-center my-5">
            <svg viewBox="0 0 60 60" className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M30 8C18 8 8 18 8 30" />
              <path d="M30 8C42 8 52 18 52 30" />
              <path d="M18 30c0-6.6 5.4-12 12-12s12 5.4 12 12" />
              <path d="M24 30c0-3.3 2.7-6 6-6s6 2.7 6 6c0 8-4 16-6 20" />
              <path d="M12 38c1-3 2-5.5 2-8" />
              <path d="M48 38c-1-3-2-5.5-2-8" />
              <path d="M30 24v6" />
            </svg>
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-slate-500">
            কোন অ্যাকাউন্ট নেই?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1">
              এখনই নিবন্ধন করুন <FaArrowRight size={11} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
