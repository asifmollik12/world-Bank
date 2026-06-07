import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const durations = ['১২ মাস','১৮ মাস','২৪ মাস','৩৬ মাস','৪৮ মাস','৬০ মাস','৭২ মাস','৮৪ মাস','৯৬ মাস','১০৮ মাস','১২০ মাস']
const amounts  = ['৫০ হাজার','১ লক্ষ','১.৫ লক্ষ','২ লক্ষ','৩ লক্ষ','৪ লক্ষ','৫ লক্ষ','৬ লক্ষ','৮ লক্ষ','১০ লক্ষ','১৫ লক্ষ','২০ লক্ষ']

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

// card style
const card = {
  backgroundColor: '#1e293b',
  borderRadius: '0.75rem',
  padding: '1.25rem',
  border: '1px solid #334155',
}

export default function StaffDashboard() {
  const { user } = useAuth()
  const [regTab,     setRegTab]     = useState('আজ')
  const [selDuration, setSelDuration] = useState('')
  const [selAmount,   setSelAmount]   = useState('')

  const regTabs = ['আজ','গতকাল','এই সপ্তাহ','এই মাস','গত মাস']

  return (
    <div style={{ fontFamily: "'Hind Siliguri', sans-serif", color: '#e2e8f0' }}>

      {/* Page header */}
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold text-white">
          হাই {user?.name || 'Tushar'}, এটি আপনার স্টাফ প্যানেল!
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">{getBnDate()}</p>
      </div>

      {/* TOP 3 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

        {/* Card 1 — Account numbers */}
        <div style={card}>
          <h3 className="font-bold text-slate-300 mb-4 text-sm">আপনার টিমের বর্তমান অ্যাকাউন্ট নম্বর।</h3>
          <div className="space-y-4">
            {/* bKash */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#3d0a1e' }}>
                <svg viewBox="0 0 40 40" className="w-8 h-8">
                  <circle cx="20" cy="20" r="20" fill="#E2136E"/>
                  <text x="50%" y="56%" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" dominantBaseline="middle">b</text>
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500">বিকাশ</div>
                <div className="font-bold text-white text-sm">01706329691</div>
              </div>
            </div>
            {/* Nagad */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#3d1f00' }}>
                <svg viewBox="0 0 40 40" className="w-8 h-8">
                  <circle cx="20" cy="20" r="20" fill="#F7941D"/>
                  <text x="50%" y="56%" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" dominantBaseline="middle">নগদ</text>
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500">নগদ</div>
                <div className="font-bold text-white text-sm">01706329691</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — Registration count */}
        <div style={card}>
          <h3 className="font-bold text-slate-300 mb-4 text-sm">আপনার রেজিস্ট্রেশন সংখ্যা।</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {regTabs.map(t => (
              <button
                key={t}
                onClick={() => setRegTab(t)}
                className="px-3 py-1 rounded-md text-xs font-semibold transition"
                style={{
                  backgroundColor: regTab === t ? '#2563eb' : '#334155',
                  color: regTab === t ? '#fff' : '#94a3b8',
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center h-10">
            <span className="text-5xl font-black text-blue-500">0</span>
          </div>
        </div>

        {/* Card 3 — Office hours */}
        <div style={card}>
          <h3 className="font-bold text-slate-300 mb-4 text-sm">আপনাদের অফিস এবং বিরতির সময়।</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg p-2 flex-shrink-0" style={{ backgroundColor: '#334155' }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-0.5">অফিস</div>
                <div className="font-semibold text-white text-sm">সকল ১০টা থেকে রাত ১০টা</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg p-2 flex-shrink-0" style={{ backgroundColor: '#334155' }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-0.5">বিরতি</div>
                <div className="font-semibold text-white text-sm">দুপুর ২টা থেকে বিকাল ৩টা ৩০ মিনিট</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Duration selector */}
      <div style={card} className="mb-4">
        <h3 className="font-bold text-slate-300 mb-4 text-sm">গ্রাহক কত মাসের জন্য ঋণ নিতে চান?</h3>
        <div className="flex flex-wrap gap-2">
          {durations.map(d => (
            <button
              key={d}
              onClick={() => setSelDuration(d)}
              className="px-4 py-1.5 rounded-md text-sm font-semibold transition"
              style={{
                backgroundColor: selDuration === d ? '#1e40af' : '#334155',
                color: selDuration === d ? '#fff' : '#cbd5e1',
                border: selDuration === d ? '1px solid #3b82f6' : '1px solid #475569',
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Loan Amount selector */}
      <div style={card}>
        <h3 className="font-bold text-slate-300 mb-4 text-sm">গ্রাহক কত টাকা ঋণ নিতে চান?</h3>
        <div className="flex flex-wrap gap-2">
          {amounts.map(a => (
            <button
              key={a}
              onClick={() => setSelAmount(a)}
              className="px-4 py-1.5 rounded-md text-sm font-semibold transition"
              style={{
                backgroundColor: selAmount === a ? '#1e40af' : '#334155',
                color: selAmount === a ? '#fff' : '#cbd5e1',
                border: selAmount === a ? '1px solid #3b82f6' : '1px solid #475569',
              }}
            >
              {a}
            </button>
          ))}
        </div>

        {selDuration && selAmount && (
          <div className="mt-4 rounded-xl p-4 text-sm" style={{ backgroundColor: '#1e3a5f', border: '1px solid #3b82f6', color: '#93c5fd' }}>
            <span className="font-bold text-white">নির্বাচিত:</span> {selAmount} ঋণ, {selDuration} মেয়াদে
          </div>
        )}
      </div>
    </div>
  )
}
