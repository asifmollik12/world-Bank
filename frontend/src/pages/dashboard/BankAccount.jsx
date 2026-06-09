import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import toast from 'react-hot-toast'

const BN = { fontFamily: "'Hind Siliguri', sans-serif" }

const inputStyle = {
  width: '100%', border: '1.5px solid #3b5fc0', borderRadius: 6,
  padding: '12px 14px', fontSize: 14, outline: 'none',
  backgroundColor: '#fff', color: '#111', boxSizing: 'border-box', ...BN,
}
const labelStyle = {
  display: 'block', fontSize: 13, color: '#374151',
  marginBottom: 6, fontWeight: 600, ...BN,
}

export default function BankAccount() {
  const navigate = useNavigate()
  const [method, setMethod] = useState('bank')
  const [form, setForm]     = useState({})
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!method) { toast.error('পেমেন্ট পদ্ধতি নির্বাচন করুন'); return }
    setLoading(true)
    setTimeout(() => {
      toast.success('ব্যাংক তথ্য সংরক্ষিত হয়েছে!')
      setLoading(false)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', ...BN }}>

      {/* Full-width blue header */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>
          <FaArrowLeft />
        </button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>ব্যাংক আকাউন্ট</span>
      </div>

      {/* Centered white card */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{
          backgroundColor: '#fff', borderRadius: 10, width: '100%', maxWidth: 540,
          padding: '32px 32px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}>
          <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 20, color: '#111', marginBottom: 24, ...BN }}>
            আপনার ব্যাংক তথ্য দিন
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Payment method */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>পেমেন্ট পদ্ধতি নির্বাচন করুন</label>
              <select
                value={method}
                onChange={e => { setMethod(e.target.value); setForm({}) }}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="bank">ব্যাংক আকাউন্ট</option>
                <option value="bkash">বিকাশ</option>
                <option value="nagad">নগদ</option>
              </select>
            </div>

            {/* Bank fields */}
            {method === 'bank' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>হোল্ডারের নাম</label>
                  <input value={form.holder||''} onChange={set('holder')}
                    placeholder="আপনার নাম" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>অ্যাকাউন্ট নম্বর</label>
                  <input value={form.account_no||''} onChange={set('account_no')}
                    placeholder="আকাউন্ট নম্বর লিখুন (শুধুমাত্র ইংরেজি সংখ্যা)"
                    style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>ব্যাংকের নাম</label>
                  <input value={form.bank_name||''} onChange={set('bank_name')}
                    placeholder="ব্যাংকের নাম" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>শাখার নাম</label>
                  <input value={form.branch||''} onChange={set('branch')}
                    placeholder="শাখার নাম" style={inputStyle} required />
                </div>
              </div>
            )}

            {/* bKash — only account number */}
            {method === 'bkash' && (
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>অ্যাকাউন্ট নম্বর</label>
                <input value={form.account_no||''} onChange={set('account_no')}
                  placeholder="আকাউন্ট নম্বর লিখুন (শুধুমাত্র ইংরেজি সংখ্যা)"
                  style={inputStyle} required />
              </div>
            )}

            {/* Nagad — only account number */}
            {method === 'nagad' && (
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>অ্যাকাউন্ট নম্বর</label>
                <input value={form.account_no||''} onChange={set('account_no')}
                  placeholder="আকাউন্ট নম্বর লিখুন (শুধুমাত্র ইংরেজি সংখ্যা)"
                  style={inputStyle} required />
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
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
