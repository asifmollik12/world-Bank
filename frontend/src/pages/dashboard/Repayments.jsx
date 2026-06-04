import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function Repayments() {
  const [repayments, setRepayments] = useState([])
  const [loans, setLoans] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ loan_application_id: '', amount: '', transaction_id: '', payment_method: 'bkash' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/repayments').then(r => setRepayments(r.data))
    api.get('/loans').then(r => setLoans(r.data.filter(l => l.status === 'disbursed')))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/repayments', form)
      toast.success('Repayment submitted!')
      setShowForm(false)
      api.get('/repayments').then(r => setRepayments(r.data))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  const statusColor = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-green-100 text-green-700', failed: 'bg-red-100 text-red-700' }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Repayments</h1>
          <p className="text-slate-500 text-sm">View and submit your loan repayments</p>
        </div>
        {loans.length > 0 && (
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
            + Submit Repayment
          </button>
        )}
      </div>

      {/* Repayment form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4">New Repayment</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Select Loan *</label>
              <select value={form.loan_application_id}
                onChange={e => setForm({ ...form, loan_application_id: e.target.value })}
                className="input-field" required>
                <option value="">-- Select loan --</option>
                {loans.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.loan_plan?.name} — ৳{Number(l.amount).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Amount (৳) *</label>
              <input type="number" placeholder="Amount" value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Payment Method *</label>
              <select value={form.payment_method} onChange={e => setForm({ ...form, payment_method: e.target.value })} className="input-field">
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="rocket">Rocket</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Transaction ID *</label>
              <input type="text" placeholder="TXN ID" value={form.transaction_id}
                onChange={e => setForm({ ...form, transaction_id: e.target.value })}
                className="input-field" required />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                {loading && <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
                Submit
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Repayment history */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-blue-900">Repayment History</h2>
        </div>
        {repayments.length === 0 ? (
          <div className="p-10 text-center text-slate-400">No repayments yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs">
                <tr>
                  <th className="px-5 py-3 text-left">Loan</th>
                  <th className="px-5 py-3 text-left">Amount</th>
                  <th className="px-5 py-3 text-left">Method</th>
                  <th className="px-5 py-3 text-left">TXN ID</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {repayments.map(r => (
                  <tr key={r.id} className="border-t border-slate-50 hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium">{r.loan_application?.loan_plan?.name || 'N/A'}</td>
                    <td className="px-5 py-3 font-semibold text-blue-900">৳{Number(r.amount).toLocaleString()}</td>
                    <td className="px-5 py-3 capitalize">{r.payment_method}</td>
                    <td className="px-5 py-3 text-slate-500 font-mono text-xs">{r.transaction_id}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[r.status]}`}>
                        {r.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400">{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
