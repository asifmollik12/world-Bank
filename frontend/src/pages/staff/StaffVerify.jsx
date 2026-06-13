import { useState } from 'react'
import api from '../../api/axios'
import { FaSearch, FaSignInAlt, FaSyncAlt } from 'react-icons/fa'

const BN = { fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }
const dark = { backgroundColor: '#0f172a' }
const cardBg = { backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }
const fieldRow = { display: 'flex', alignItems: 'flex-start', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e293b' }
const lbl = { width: 150, flexShrink: 0, color: '#94a3b8', fontSize: 14, fontWeight: 600, ...BN }
const val = { flex: 1, color: '#e2e8f0', fontSize: 14, ...BN }
const inputCls = { backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px', color: '#e2e8f0', fontSize: 14, width: '100%', outline: 'none', ...BN }
const secTitle = { fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 8, ...BN }
const imgBox = { width: 160, height: 120, backgroundColor: '#334155', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 12, ...BN }

const statusOptions = ['pending','under_review','approved','rejected','disbursed','completed']

export default function StaffVerify() {
  const [query, setQuery]   = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [loanForms, setLoanForms] = useState({})

  const handleSearch = async (e) => {
    e?.preventDefault()
    if (!query.trim()) return
    setLoading(true); setNotFound(false); setResult(null)
    try {
      const res = await api.get(`/staff/search?phone=${query}`)
      setResult(res.data)
    } catch {
      setNotFound(true)
    } finally { setLoading(false) }
  }

  const updateLoan = async (loanId) => {
    const form = loanForms[loanId] || {}
    try {
      await api.patch(`/staff/loans/${loanId}`, form)
      handleSearch()
    } catch {}
  }

  const setLoanField = (loanId, key, val) =>
    setLoanForms(p => ({ ...p, [loanId]: { ...p[loanId], [key]: val } }))

  const { user, loans = [], repayments = [] } = result || {}

  return (
    <div style={{ color: '#e2e8f0', ...BN }}>

      {/* Search bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, ...dark, border: '1px solid #334155', borderRadius: 8, padding: '10px 16px' }}>
          <FaSearch color="#64748b" size={14} />
          <input
            type="text"
            placeholder="Customer Number"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ background: 'none', border: 'none', color: '#e2e8f0', fontSize: 15, outline: 'none', flex: 1, ...BN }}
          />
        </div>
        <button type="submit" disabled={loading}
          style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', ...BN }}>
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {notFound && <p style={{ color: '#64748b', fontSize: 15 }}>কোনো গ্রাহক পাওয়া যায়নি।</p>}

      {user && (
        <div>
          {/* ── গ্রাহক তথ্য ── */}
          <div style={cardBg}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={secTitle}>গ্রাহক তথ্য</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>
                  তৈরির সময়: {new Date(user.created_at).toLocaleString()} &nbsp; আপডেট: {new Date(user.updated_at).toLocaleString()}
                </div>
              </div>
              <button style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaSignInAlt size={12} /> Login
              </button>
            </div>

            <div style={fieldRow}>
              <span style={lbl}>সাবমিট</span>
              <span style={{ marginRight: 8, color: '#64748b' }}>:</span>
              <select style={{ ...inputCls, maxWidth: 300 }}>
                <option>-- Select Staff --</option>
                {['Tushar','Akash','Tamim'].map(s => <option key={s}>{s}</option>)}
              </select>
              <button style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaSyncAlt size={11} /> Force Refresh
              </button>
            </div>
            {[
              ['পুরো নাম', user.name],
              ['বর্তমান ব্যালেন্স', '0.00'],
            ].map(([k, v]) => (
              <div key={k} style={fieldRow}>
                <span style={lbl}>{k}</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
                <input defaultValue={v} style={{ ...inputCls, maxWidth: 400 }} />
              </div>
            ))}
            <div style={fieldRow}>
              <span style={lbl}>বর্তমান অবস্থা</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
              <select defaultValue={user.status} style={{ ...inputCls, maxWidth: 200 }}>
                {['active','inactive','banned'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </div>
            <div style={fieldRow}>
              <span style={lbl}>কার্ড অবস্থা</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
              <input type="checkbox" style={{ width: 36, height: 20, cursor: 'pointer' }} />
            </div>
            <div style={fieldRow}>
              <span style={lbl}>মতব্য</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
              <textarea rows={3} style={{ ...inputCls, resize: 'vertical', maxWidth: 500 }} />
            </div>
            <button style={{ width: '100%', marginTop: 16, backgroundColor: '#1d3a8a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 16, fontWeight: 700, cursor: 'pointer', ...BN }}>
              আপডেট
            </button>
          </div>

          {/* ── ব্যক্তিগত তথ্য ── */}
          <div style={cardBg}>
            <div style={secTitle}>ব্যক্তিগত তথ্য</div>
            <div style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>তৈরি: N/A &nbsp; আপডেট: N/A</div>
            {[
              ['পূর্ণ নাম', user.name],
              ['আইডি নম্বর', user.nid || ''],
              ['মোবাইল নম্বর', user.phone],
              ['বর্তমান ঠিকানা', user.address || ''],
              ['স্থায়ী ঠিকানা', user.address || ''],
              ['পেশা', ''],
              ['ঋণের কারণ', ''],
            ].map(([k, v]) => (
              <div key={k} style={fieldRow}>
                <span style={lbl}>{k}</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
                <input defaultValue={v} style={{ ...inputCls, maxWidth: 500 }} />
              </div>
            ))}
            {[['সেলফি'], ['আইডি (সামনে)'], ['আইডি (পেছনে)'], ['স্বাক্ষর']].map(([k]) => (
              <div key={k} style={fieldRow}>
                <span style={lbl}>{k}</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
                <div style={imgBox}>Image Not Found</div>
              </div>
            ))}
            <div style={{ ...secTitle, marginTop: 20, fontSize: 16 }}>নমিনীর তথ্য</div>
            {[['নমিনীর নাম',''],['সম্পর্ক',''],['নমিনীর মোবাইল','']].map(([k,v]) => (
              <div key={k} style={fieldRow}>
                <span style={lbl}>{k}</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
                <input defaultValue={v} style={{ ...inputCls, maxWidth: 400 }} />
              </div>
            ))}
            <div style={fieldRow}>
              <span style={lbl}>নমিনীর আইডি কার্ড</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
              <div style={imgBox}>Image Not Found</div>
            </div>
            <button style={{ width: '100%', marginTop: 16, backgroundColor: '#1d3a8a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 16, fontWeight: 700, cursor: 'pointer', ...BN }}>
              আপডেট
            </button>
          </div>

          {/* ── ব্যাংক তথ্য ── */}
          <div style={cardBg}>
            <div style={secTitle}>ব্যাংক তথ্য</div>
            <div style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>তৈরির সময়: Invalid Date &nbsp; আপডেট: Invalid Date</div>
            {[['পদ্ধতি','select'],['আকাউন্ট হোল্ডার','N/A'],['ব্যাংক নাম','N/A'],['শাখা','N/A'],['আকাউন্ট নম্বর','N/A'],['মোবাইল আকাউন্ট','N/A']].map(([k,v]) => (
              <div key={k} style={fieldRow}>
                <span style={lbl}>{k}</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
                {v === 'select'
                  ? <select style={{ ...inputCls, maxWidth: 300 }}><option></option><option>ব্যাংক আকাউন্ট</option><option>বিকাশ</option><option>নগদ</option></select>
                  : <input defaultValue={v} style={{ ...inputCls, maxWidth: 400 }} />
                }
              </div>
            ))}
            <div style={fieldRow}>
              <span style={lbl}>মতব্য</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
              <textarea rows={3} style={{ ...inputCls, resize: 'vertical', maxWidth: 500 }} />
            </div>
            <button style={{ width: '100%', marginTop: 16, backgroundColor: '#1d3a8a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 16, fontWeight: 700, cursor: 'pointer', ...BN }}>
              আপডেট
            </button>
          </div>

          {/* ── ঋণ তথ্য ── */}
          {loans.map(loan => (
            <div key={loan.id} style={cardBg}>
              <div style={secTitle}>ঋণ তথ্য</div>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>তৈরির সময়: {new Date(loan.created_at).toLocaleString()} &nbsp; আপডেট: {new Date(loan.updated_at).toLocaleString()}</div>
              {[
                ['ঋণের পরিমাণ', loan.amount],
                ['ঋণের মেয়াদ (মাস)', loan.duration_months],
                ['বার্ষিক সুদের হার (%)', loan.interest_rate],
                ['মাসিক কিস্তি', loan.monthly_installment],
                ['পরিশোধিত কিস্তি', 0],
                ['বাকি কিস্তি', loan.duration_months],
              ].map(([k, v]) => (
                <div key={k} style={fieldRow}>
                  <span style={lbl}>{k}</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
                  <input defaultValue={v} style={{ ...inputCls, maxWidth: 300 }} />
                </div>
              ))}
              <div style={fieldRow}>
                <span style={lbl}>আবেদনের অবস্থা</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
                <select
                  defaultValue={loan.status}
                  onChange={e => setLoanField(loan.id, 'status', e.target.value)}
                  style={{ ...inputCls, maxWidth: 250 }}>
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={fieldRow}>
                <span style={lbl}>শট অবস্থা</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
                <input type="checkbox" style={{ width: 36, height: 20, cursor: 'pointer' }} />
              </div>
              <div style={fieldRow}>
                <span style={lbl}>মতব্য</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
                <textarea rows={3} onChange={e => setLoanField(loan.id, 'admin_note', e.target.value)}
                  style={{ ...inputCls, resize: 'vertical', maxWidth: 500 }} />
              </div>
              <button onClick={() => updateLoan(loan.id)}
                style={{ width: '100%', marginTop: 16, backgroundColor: '#1d3a8a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 16, fontWeight: 700, cursor: 'pointer', ...BN }}>
                আপডেট
              </button>
            </div>
          ))}

          {/* ── নিবন্ধন লগ ── */}
          <div style={cardBg}>
            <div style={secTitle}>নিবন্ধন লগ</div>
            <div style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>তৈরির সময়: {new Date(user.created_at).toLocaleString()}</div>
            <div style={fieldRow}>
              <span style={lbl}>নিবন্ধন আইপি</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
              <input defaultValue="N/A" style={{ ...inputCls, maxWidth: 300 }} />
            </div>
            <div style={fieldRow}>
              <span style={lbl}>নিবন্ধন অবস্থা</span><span style={{ marginRight: 8, color: '#64748b' }}>:</span>
              <select style={{ ...inputCls, maxWidth: 200 }}>
                <option>সম্পন্ন</option><option>অসম্পন্ন</option>
              </select>
            </div>
            <button style={{ width: '100%', marginTop: 16, backgroundColor: '#1d3a8a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 16, fontWeight: 700, cursor: 'pointer', ...BN }}>
              আপডেট
            </button>
          </div>

          {/* ── ট্রানজেকশন ── */}
          <div style={cardBg}>
            <div style={secTitle}>ট্রানজেকশন</div>
            {repayments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#64748b' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>⏳</div>
                <div style={{ fontSize: 14 }}>ট্রানজেকশন পাওয়া যায়নি।</div>
              </div>
            ) : (
              repayments.map(r => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e293b', fontSize: 13 }}>
                  <span>{r.transaction_id}</span>
                  <span>৳{Number(r.amount).toLocaleString()}</span>
                  <span style={{ color: r.status === 'confirmed' ? '#4ade80' : '#fbbf24' }}>{r.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
