import { useState } from 'react'
import api from '../../api/axios'
import { FaSearch } from 'react-icons/fa'

export default function StaffVerify() {
  const [query, setQuery] = useState('')
  const [user, setUser] = useState(null)
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setNotFound(false)
    setUser(null)
    setLoans([])
    try {
      const res = await api.get(`/admin/users?search=${query}`)
      const users = res.data.data
      if (users.length === 0) { setNotFound(true); return }
      const found = users[0]
      setUser(found)
      const loanRes = await api.get(`/admin/applications?user_id=${found.id}`)
      setLoans(loanRes.data.data || [])
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const statusColor = {
    pending: '#ca8a04', under_review: '#3b82f6',
    approved: '#16a34a', rejected: '#dc2626',
    disbursed: '#9333ea', completed: '#475569',
  }

  return (
    <div style={{ fontFamily: "'Hind Siliguri', sans-serif", color: '#e2e8f0' }}>
      {/* Search bar — matches original screenshot */}
      <form onSubmit={handleSearch} className="flex items-center gap-3 mb-8">
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 flex-1 max-w-md"
          style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
        >
          <FaSearch className="text-slate-500 flex-shrink-0" size={14} />
          <input
            type="text"
            placeholder="Customer Number"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="bg-transparent flex-1 text-sm text-slate-200 outline-none placeholder-slate-500"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 rounded-xl text-sm font-semibold transition"
          style={{ backgroundColor: '#2563eb', color: '#fff' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {/* Not found */}
      {notFound && (
        <div className="text-slate-400 text-sm">কোনো গ্রাহক পাওয়া যায়নি।</div>
      )}

      {/* User result */}
      {user && (
        <div className="space-y-4">
          {/* User card */}
          <div className="rounded-xl p-5" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <h3 className="font-bold text-white mb-3 text-sm">গ্রাহকের তথ্য</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {[
                ['নাম', user.name],
                ['ফোন', user.phone],
                ['ইমেইল', user.email],
                ['NID', user.nid || 'N/A'],
                ['ঠিকানা', user.address || 'N/A'],
                ['স্ট্যাটাস', user.status],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                  <div className="font-semibold text-white">{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Loans */}
          <div className="rounded-xl p-5" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <h3 className="font-bold text-white mb-3 text-sm">লোন আবেদন ({loans.length})</h3>
            {loans.length === 0 ? (
              <p className="text-slate-500 text-sm">কোনো লোন নেই।</p>
            ) : (
              <div className="space-y-2">
                {loans.map(l => (
                  <div key={l.id} className="flex items-center justify-between rounded-lg px-4 py-3"
                    style={{ backgroundColor: '#0f172a' }}>
                    <div className="text-sm">
                      <div className="font-semibold text-white">{l.loan_plan?.name}</div>
                      <div className="text-slate-400 text-xs">৳{Number(l.amount).toLocaleString()} — {l.duration_months} মাস</div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: statusColor[l.status] + '22', color: statusColor[l.status] }}>
                      {l.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
