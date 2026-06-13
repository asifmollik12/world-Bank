import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const durations = ['১২ মাস','১৮ মাস','২৪ মাস','৩৬ মাস','৪৮ মাস','৬০ মাস','৭২ মাস','৮৪ মাস','৯৬ মাস','১০৮ মাস','১২০ মাস']
const amounts  = ['৫০ হাজার','১ লক্ষ','১.৫ লক্ষ','২ লক্ষ','৩ লক্ষ','৪ লক্ষ','৫ লক্ষ','৬ লক্ষ','৭ লক্ষ','৮ লক্ষ','৯ লক্ষ','১০ লক্ষ','১১ লক্ষ','১২ লক্ষ','১৩ লক্ষ','১৪ লক্ষ','১৫ লক্ষ','১৬ লক্ষ','১৭ লক্ষ','১৮ লক্ষ','১৯ লক্ষ','২০ লক্ষ','২৫ লক্ষ','৩০ লক্ষ']

const daysBn   = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার']
const monthsBn = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর']

function getBnDate() {
  const now   = new Date()
  const day   = daysBn[now.getDay()]
  const date  = now.getDate()
  const month = monthsBn[now.getMonth()]
  const year  = now.getFullYear()
  let hours   = now.getHours()
  const mins  = String(now.getMinutes()).padStart(2, '0')
  const ampm  = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${day}, ${date} ${month} ${year} | ${hours}:${mins} ${ampm}`
}

const BN = { fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }

const card = {
  backgroundColor: '#1e293b',
  borderRadius: '0.75rem',
  padding: '20px 22px',
  border: '1px solid #334155',
}

export default function StaffDashboard() {
  const { user } = useAuth()
  const [regTab,      setRegTab]      = useState('আজ')
  const [selDuration, setSelDuration] = useState('')
  const [selAmount,   setSelAmount]   = useState('')

  const regTabs = ['আজ','গতকাল','এই সপ্তাহ','এই মাস','গত মাস']

  return (
    <div style={{ color: '#e2e8f0', ...BN }}>

      {/* Page header */}
      <div className="mb-5">
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 4, ...BN }}>
          হাই {user?.name || 'Tushar'}, এটি আপনার স্টাফ প্যানেল!
        </h1>
        <p style={{ color: '#64748b', fontSize: 15 }}>{getBnDate()}</p>
      </div>

      {/* TOP 3 CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>

        {/* Card 1 — Account numbers */}
        <div style={card}>
          <h3 style={{ fontWeight: 700, color: '#cbd5e1', marginBottom: 20, fontSize: 16, ...BN }}>আপনার টিমের বর্তমান অ্যাকাউন্ট নম্বর।</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* bKash */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src="/bkash.png" alt="bKash" style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, color: '#64748b' }}>বিকাশ</div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>01706329691</div>
              </div>
            </div>
            {/* Nagad */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src="/nagad.png" alt="Nagad" style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, color: '#64748b' }}>নগদ</div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>01706329691</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — Registration count */}
        <div style={card}>
          <h3 style={{ fontWeight: 700, color: '#cbd5e1', marginBottom: 16, fontSize: 16, ...BN }}>আপনার রেজিস্ট্রেশন সংখ্যা।</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {regTabs.map(t => (
              <button key={t} onClick={() => setRegTab(t)}
                style={{
                  padding: '6px 14px', borderRadius: 6, fontSize: 14, fontWeight: 600,
                  border: 'none', cursor: 'pointer', transition: 'all 0.1s', ...BN,
                  backgroundColor: regTab === t ? '#2563eb' : '#334155',
                  color: regTab === t ? '#fff' : '#94a3b8',
                }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>
            <span style={{ fontSize: 56, fontWeight: 900, color: '#2563eb' }}>0</span>
          </div>
        </div>

        {/* Card 3 — Office hours */}
        <div style={card}>
          <h3 style={{ fontWeight: 700, color: '#cbd5e1', marginBottom: 20, fontSize: 16, ...BN }}>আপনাদের অফিস এবং বিরতির সময়।</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ backgroundColor: '#334155', borderRadius: 8, padding: 8, flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2 }}>অফিস</div>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 15, ...BN }}>সকল ১০টা থেকে রাত ১০টা</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ backgroundColor: '#334155', borderRadius: 8, padding: 8, flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2 }}>বিরতি</div>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 15, ...BN }}>দুপুর ২টা থেকে বিকাল ৩টা ৩০ মিনিট</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Duration selector */}
      <div style={{ ...card, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, color: '#cbd5e1', marginBottom: 16, fontSize: 16, ...BN }}>গ্রাহক কত মাসের জন্য ঋণ নিতে চান?</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {durations.map(d => (
            <button key={d} onClick={() => setSelDuration(d)}
              style={{
                padding: '8px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', border: 'none', transition: 'all 0.1s', ...BN,
                backgroundColor: selDuration === d ? '#1e40af' : '#334155',
                color: selDuration === d ? '#fff' : '#cbd5e1',
                outline: selDuration === d ? '1px solid #3b82f6' : 'none',
              }}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Amount selector */}
      <div style={card}>
        <h3 style={{ fontWeight: 700, color: '#cbd5e1', marginBottom: 16, fontSize: 16, ...BN }}>গ্রাহক কত টাকা ঋণ নিতে চান?</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {amounts.map(a => (
            <button key={a} onClick={() => setSelAmount(a)}
              style={{
                padding: '8px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', border: 'none', transition: 'all 0.1s', ...BN,
                backgroundColor: selAmount === a ? '#1e40af' : '#334155',
                color: selAmount === a ? '#fff' : '#cbd5e1',
                outline: selAmount === a ? '1px solid #3b82f6' : 'none',
              }}>
              {a}
            </button>
          ))}
        </div>

        {selDuration && selAmount && (
          <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10, backgroundColor: '#1e3a5f', border: '1px solid #3b82f6', color: '#93c5fd', fontSize: 14, ...BN }}>
            <span style={{ fontWeight: 700, color: '#fff' }}>নির্বাচিত:</span> {selAmount} ঋণ, {selDuration} মেয়াদে
          </div>
        )}
      </div>
    </div>
  )
}
