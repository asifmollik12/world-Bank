import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import { FaArrowLeft } from 'react-icons/fa'

const BN = { fontFamily: "'Hind Siliguri', sans-serif" }

const durations = [
  { label: '১২ মাস', val: 12 }, { label: '১৮ মাস', val: 18 }, { label: '২৪ মাস', val: 24 },
  { label: '৩৬ মাস', val: 36 }, { label: '৪৮ মাস', val: 48 }, { label: '৬০ মাস', val: 60 },
  { label: '৭২ মাস', val: 72 }, { label: '৮৪ মাস', val: 84 }, { label: '৯৬ মাস', val: 96 },
  { label: '১০৮ মাস', val: 108 }, { label: '১২০ মাস', val: 120 },
]

const amounts = [
  { label: '৫০ হাজার', val: 50000 }, { label: '১ লক্ষ', val: 100000 },
  { label: '১.৫ লক্ষ', val: 150000 }, { label: '২ লক্ষ', val: 200000 },
  { label: '৩ লক্ষ', val: 300000 }, { label: '৪ লক্ষ', val: 400000 },
  { label: '৫ লক্ষ', val: 500000 }, { label: '৬ লক্ষ', val: 600000 },
  { label: '৭ লক্ষ', val: 700000 }, { label: '৮ লক্ষ', val: 800000 },
  { label: '৯ লক্ষ', val: 900000 }, { label: '১০ লক্ষ', val: 1000000 },
  { label: '১১ লক্ষ', val: 1100000 }, { label: '১২ লক্ষ', val: 1200000 },
  { label: '১৩ লক্ষ', val: 1300000 }, { label: '১৪ লক্ষ', val: 1400000 },
  { label: '১৫ লক্ষ', val: 1500000 }, { label: '১৬ লক্ষ', val: 1600000 },
  { label: '১৭ লক্ষ', val: 1700000 }, { label: '১৮ লক্ষ', val: 1800000 },
  { label: '১৯ লক্ষ', val: 1900000 }, { label: '২০ লক্ষ', val: 2000000 },
  { label: '২৫ লক্ষ', val: 2500000 }, { label: '৩০ লক্ষ', val: 3000000 },
]

const RATE = 2.4 // percent per month

function calcMonthly(amount, months) {
  const total = amount + (amount * (RATE / 100) * months)
  return Math.round(total / months)
}

export default function ApplyLoan() {
  const navigate = useNavigate()
  const [selDuration, setSelDuration] = useState(durations[0])
  const [selAmount, setSelAmount]     = useState(amounts[0])
  const [loading, setLoading]         = useState(false)
  const [planId, setPlanId]           = useState(null)

  useEffect(() => {
    api.get('/loan-plans').then(r => { if (r.data[0]) setPlanId(r.data[0].id) }).catch(() => {})
  }, [])

  const monthly = calcMonthly(selAmount.val, selDuration.val)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const id = planId || 1
      await api.post('/loans', {
        loan_plan_id:    id,
        amount:          selAmount.val,
        duration_months: selDuration.val,
        purpose:         'ঋণ আবেদন',
      })
      toast.success('ঋণ আবেদন সফল হয়েছে!')
      navigate('/dashboard/bank-account')
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors) Object.values(errors).flat().forEach(m => toast.error(m))
      else toast.error(err.response?.data?.message || 'আবেদন ব্যর্থ হয়েছে')
    } finally {
      setLoading(false)
    }
  }

  const selBtn = { backgroundColor: '#1d3a8a', color: '#fff', border: '1.5px solid #1d3a8a' }
  const defBtn = { backgroundColor: '#fff', color: '#1d3a8a', border: '1.5px solid #1d3a8a' }

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', ...BN }}>

      {/* Full-width blue header */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>
          <FaArrowLeft />
        </button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>ঋণ আবেদন</span>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '28px 24px', maxWidth: 680, margin: '0 auto' }}>

        {/* Duration selector */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 14 }}>
            আপনি কত মাসের জন্য ঋণ নিতে চান? <span style={{ color: '#dc2626' }}>*</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {durations.map(d => (
              <button key={d.val} onClick={() => setSelDuration(d)}
                style={{ ...selDuration.val === d.val ? selBtn : defBtn, borderRadius: 6, padding: '9px 18px', fontSize: 14, cursor: 'pointer', fontWeight: 500, ...BN }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount selector */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 14 }}>
            আপনি কত টাকা ঋণ নিতে চান? <span style={{ color: '#dc2626' }}>*</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {amounts.map(a => (
              <button key={a.val} onClick={() => setSelAmount(a)}
                style={{ ...selAmount.val === a.val ? selBtn : defBtn, borderRadius: 6, padding: '9px 18px', fontSize: 14, cursor: 'pointer', fontWeight: 500, ...BN }}>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loan detail summary */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 12 }}>
            আপনার ঋণের বিস্তারিত তথ্য -
          </div>
          <div style={{ fontSize: 15, lineHeight: 2.2, color: '#111' }}>
            {[
              ['বাৎসরিক সুদ',  `${RATE}%`],
              ['ঋণের সময়',    selDuration.label],
              ['ঋণের পরিমাণ', `${selAmount.val.toLocaleString()} টাকা`],
              ['মাসিক কিস্তি', `${monthly.toLocaleString()} টাকা`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 4 }}>
                <span style={{ fontWeight: 700, width: 160 }}>{k}</span>
                <span style={{ fontWeight: 700 }}>: {v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm button */}
        <button onClick={handleSubmit} disabled={loading}
          style={{
            width: '100%', backgroundColor: '#1d3a8a', color: '#fff',
            border: 'none', borderRadius: 8, padding: '16px',
            fontSize: 17, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            opacity: loading ? 0.7 : 1,
            ...BN,
          }}>
          {loading
            ? <span style={{ width: 22, height: 22, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block' }} />
            : 'নিশ্চিত করুন'}
        </button>
      </div>
    </div>
  )
}
