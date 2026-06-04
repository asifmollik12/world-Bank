import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const fetchUsers = (q = '') => {
    setLoading(true)
    api.get('/admin/users', { params: { search: q } })
      .then(r => setUsers(r.data.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchUsers() }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchUsers(search)
  }

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/users/${id}/status`, { status })
      toast.success('Status updated')
      fetchUsers(search)
    } catch {
      toast.error('Failed to update status')
    }
  }

  const deleteUser = async (id) => {
    if (!confirm('Delete this user? This cannot be undone.')) return
    try {
      await api.delete(`/admin/users/${id}`)
      toast.success('User deleted')
      fetchUsers(search)
    } catch {
      toast.error('Failed to delete')
    }
  }

  const statusColor = { active: 'bg-green-100 text-green-700', inactive: 'bg-yellow-100 text-yellow-700', banned: 'bg-red-100 text-red-700' }

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Users</h1>
          <p className="text-slate-500 text-sm">Manage all registered users</p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input type="text" placeholder="Search by name, phone, email..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="input-field w-64 text-sm" />
          <button type="submit" className="btn-primary text-sm">Search</button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" /></div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs">
              <tr>
                <th className="px-5 py-3 text-left">#</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Phone</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Joined</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-slate-50 hover:bg-slate-50">
                  <td className="px-5 py-3 text-slate-400">#{u.id}</td>
                  <td className="px-5 py-3 font-medium">{u.name}</td>
                  <td className="px-5 py-3">{u.phone}</td>
                  <td className="px-5 py-3 text-slate-500">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[u.status]}`}>
                      {u.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      {u.status !== 'active' && (
                        <button onClick={() => updateStatus(u.id, 'active')}
                          className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">
                          Activate
                        </button>
                      )}
                      {u.status !== 'banned' && (
                        <button onClick={() => updateStatus(u.id, 'banned')}
                          className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                          Ban
                        </button>
                      )}
                      <button onClick={() => deleteUser(u.id)}
                        className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded hover:bg-slate-300">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
