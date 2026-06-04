import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function AdminRepayments() {
  const [repayments, setRepayments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    api.get('/admin/repayments').then(r => setRepayments(r.data.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const confirm = async (id) => {
    try {
      await api.patch(`/admin/repayments/${id}/confirm`)
      toast.success('Repayment confirmed!')
      fetchData()
    } catch {
      toast.error('Failed')
    }
  }

  const statusColor = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-green-100 text-green-700', failed: 'bg-red-100 text-red-700' }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Repayments</h1>
        <p className="text-slate-500 text-sm">Confirm user loan repayments</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" /></div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs">
              <tr>
                <th className="px-5 py-3 text-left">#</th>
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-5 py-3 text-left">Amount</th>
                <th className="px-5 py-3 text-left">Method</th>
                <th className="px-5 py-3 text-left">TXN ID</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {repayments.map(r => (
                <tr key={r.id} className="border-t border-slate-50 hover:bg-slate-50">
                  <td className="px-5 py-3 text-slate-400">#{r.id}</td>
                  <td className="px-5 py-3 font-medium">{r.user?.name}<div className="text-xs text-slate-400">{r.user?.phone}</div></td>
                  <td className="px-5 py-3 font-semibold text-blue-900">৳{Number(r.amount).toLocaleString()}</td>
                  <td className="px-5 py-3 capitalize">{r.payment_method}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">{r.transaction_id}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[r.status]}`}>
                      {r.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    {r.status === 'pending' && (
                      <button onClick={() => confirm(r.id)}
                        className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700">
                        Confirm
                      </button>
                    )}
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
