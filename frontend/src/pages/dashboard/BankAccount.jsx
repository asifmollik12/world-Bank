import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import toast from 'react-hot-toast'

const BN = { fontFamily: "'Hind Siliguri', sans-serif" }

const inputStyle = {
  width: '100%', border: '1.5px solid #818cf8', borderRadius: 6,
  padding: '11px 14px', fontSize: 14, outline: 'none',
  backgroundColor: '#fff', color: '#111', boxSizing: 'border-box', ...BN,
}
const labelStyle = { display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 600, ...BN }

export default function BankAccount() {
  const navigate = useNavigate()
  const [method, setMethod]   = useState('')
  const [form, setForm]       = useState({})
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!method) { toast.error('পেমেন্ট পদ্ধতি নির্বাচন করুন'); return }
    setLoading(true)
    // Simulate save
    setTimeout(() => {
      toast.success('ব্যাংক তথ্য সংরক্ষিত হয়েছে!')
      setLoading(false)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', ...BN }}>

      {/* Blue header */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>
          <FaArrowLeft />
        </button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>ব্যাংক আকাউন্ট</span>
      </div>

      {/* Centered card */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: 10, width: '100%', maxWidth: 520, padding: '32px 32px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>

          <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 20, color: '#111', marginBottom: 24, ...BN }}>
            আপনার ব্যাংক তথ্য দিন
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Payment method dropdown */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>পেমেন্ট পদ্ধতি নির্বাচন করুন</label>
              <select
                value={method}
                onChange={e => { setMethod(e.target.value); setForm({}) }}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="">-- নির্বাচন করুন --</option>
                <option value="bank">ব্যাংক আকাউন্ট</option>
                <option value="bkash">বিকাশ</option>
                <option value="nagad">নগদ</option>
              </select>
            </div>

            {/* Bank account fields */}
            {method === 'bank' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>ব্যাংকের নাম *</label>
                  <input placeholder="যেমন: Dutch Bangla Bank" value={form.bank_name||''} onChange={set('bank_name')} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>শাখার নাম *</label>
                  <input placeholder="শাখার নাম লিখুন" value={form.branch||''} onChange={set('branch')} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>অ্যাকাউন্ট নম্বর *</label>
                  <input placeholder="অ্যাকাউন্ট নম্বর লিখুন" value={form.account_no||''} onChange={set('account_no')} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>অ্যাকাউন্টের নাম *</label>
                  <input placeholder="অ্যাকাউন্ট ধারকের নাম" value={form.account_name||''} onChange={set('account_name')} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>রাউটিং নম্বর</label>
                  <input placeholder="Routing number (ঐচ্ছিক)" value={form.routing||''} onChange={set('routing')} style={inputStyle} />
                </div>
              </div>
            )}

            {/* bKash fields */}
            {method === 'bkash' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>বিকাশ নম্বর *</label>
                  <input placeholder="01XXXXXXXXX" value={form.bkash_no||''} onChange={set('bkash_no')} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>অ্যাকাউন্টের নাম *</label>
                  <input placeholder="অ্যাকাউন্ট ধারকের নাম" value={form.account_name||''} onChange={set('account_name')} style={inputStyle} required />
                </div>
              </div>
            )}

            {/* Nagad fields */}
            {method === 'nagad' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>নগদ নম্বর *</label>
                  <input placeholder="01XXXXXXXXX" value={form.nagad_no||''} onChange={set('nagad_no')} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>অ্যাকাউন্টের নাম *</label>
                  <input placeholder="অ্যাকাউন্ট ধারকের নাম" value={form.account_name||''} onChange={set('account_name')} style={inputStyle} required />
                </div>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{
                width: '100%', backgroundColor: '#1d3a8a', color: '#fff',
                border: 'none', borderRadius: 8, padding: '14px',
                fontSize: 16, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                opacity: loading ? 0.7 : 1, ...BN,
              }}>
              {loading
                ? <span style={{ width: 20, height: 20, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block' }} />
                : 'সাবমিট করুন'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
