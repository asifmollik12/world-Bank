import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { FaSearch, FaUser, FaPhone, FaEnvelope, FaIdCard } from 'react-icons/fa'

const statusColor = {
  active:   { bg: '#052e16', text: '#4ade80', border: '#166534' },
  inactive: { bg: '#1c1917', text: '#a8a29e', border: '#44403c' },
  banned:   { bg: '#450a0a', text: '#f87171', border: '#991b1b' },
}

export default function StaffCustomers() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [query, setQuery]     = useState('')

  const fetchUsers = (q = '') => {
    setLoading(true)
    api.get('/admin/users', { params: { search: q } })
      .then(r => setUsers(r.data.data || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchUsers() }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(search)
    fetchUsers(search)
  }

  const inputStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.5rem',
    padding: '0.6rem 1rem',
    color: '#e2e8f0',
    fontSize: '0.875rem',
    outline: 'none',
    width: '100%',
  }

  return (
    <div style={{ fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif", color: '#e2e8f0' }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-white">সব গ্রাহক</h1>
          <p className="text-slate-500 text-sm mt-0.5">নিবন্ধিত সকল গ্রাহকের তালিকা</p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={13} />
            <input
              type="text"
              placeholder="নাম, ফোন বা ইমেইল..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '2.2rem', width: '220px' }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#334155'}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition"
            style={{ backgroundColor: '#2563eb' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            খুঁজুন
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            {query ? `"${query}" এর জন্য কোনো গ্রাহক পাওয়া যায়নি।` : 'কোনো গ্রাহক নেই।'}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                {['#', 'নাম', 'ফোন', 'ইমেইল', 'NID', 'স্ট্যাটাস', 'যোগদান'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => {
                const s = statusColor[u.status] || statusColor.inactive
                return (
                  <tr
                    key={u.id}
                    style={{ borderBottom: '1px solid #1e293b' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f172a'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff' }}
                        >
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{u.phone}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{u.email}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{u.nid || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}` }}
                      >
                        {u.status === 'active' ? 'সক্রিয়' : u.status === 'banned' ? 'নিষিদ্ধ' : 'নিষ্ক্রিয়'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(u.created_at).toLocaleDateString('bn-BD')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Count */}
      {!loading && users.length > 0 && (
        <p className="text-slate-500 text-xs mt-3">{users.length} জন গ্রাহক পাওয়া গেছে</p>
      )}
    </div>
  )
}
