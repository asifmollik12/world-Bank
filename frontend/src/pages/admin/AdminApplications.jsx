import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-700',
  under_review: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  disbursed: 'bg-purple-100 text-purple-700',
  completed: 'bg-slate-100 text-slate-600',
}

export default function AdminApplications() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [statusForm, setStatusForm] = useState({ status: '', admin_note: '' })
  const [updating, setUpdating] = useState(false)
  const [filter, setFilter] = useState('')

  const fetchApps = (status = '') => {
    setLoading(true)
    api.get('/admin/applications', { params: { status } })
      .then(r => setApps(r.data.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchApps(filter) }, [filter])

  const openModal = (app) => {
    setSelected(app)
    setStatusForm({ status: app.status, admin_note: app.admin_note || '' })
  }

  const handleUpdate = async () => {
    setUpdating(true)
    try {
      await api.patch(`/admin/applications/${selected.id}/status`, statusForm)
      toast.success('Status updated!')
      setSelected(null)
      fetchApps(filter)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Loan Applications</h1>
        <p className="text-slate-500 text-sm">Manage and approve loan applications</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {['', 'pending', 'under_review', 'approved', 'rejected', 'disbursed', 'completed'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${filter === s ? 'bg-blue-700 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {s ? s.replace('_', ' ').toUpperCase() : 'ALL'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" /></div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs">
              <tr>
                <th className="px-5 py-3 text-left">#</th>
                <th className="px-5 py-3 text-left">Applicant</th>
                <th className="px-5 py-3 text-left">Plan</th>
                <th className="px-5 py-3 text-left">Amount</th>
                <th className="px-5 py-3 text-left">Monthly</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.map(app => (
                <tr key={app.id} className="border-t border-slate-50 hover:bg-slate-50">
                  <td className="px-5 py-3 text-slate-400">#{app.id}</td>
                  <td className="px-5 py-3 font-medium">{app.user?.name}<div className="text-xs text-slate-400">{app.user?.phone}</div></td>
                  <td className="px-5 py-3">{app.loan_plan?.name}</td>
                  <td className="px-5 py-3 font-semibold text-blue-900">৳{Number(app.amount).toLocaleString()}</td>
                  <td className="px-5 py-3">৳{Number(app.monthly_installment).toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[app.status]}`}>
                      {app.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{new Date(app.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => openModal(app)}
                      className="text-xs bg-blue-700 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 transition">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Manage Application #{selected.id}</h3>

            <div className="bg-slate-50 rounded-lg p-4 text-sm mb-5 space-y-1">
              <div><span className="text-slate-400">Applicant:</span> <span className="font-medium">{selected.user?.name}</span></div>
              <div><span className="text-slate-400">Amount:</span> <span className="font-semibold text-blue-900">৳{Number(selected.amount).toLocaleString()}</span></div>
              <div><span className="text-slate-400">Plan:</span> {selected.loan_plan?.name}</div>
              <div><span className="text-slate-400">Purpose:</span> {selected.purpose}</div>
              <div><span className="text-slate-400">Duration:</span> {selected.duration_months} months</div>
              <div><span className="text-slate-400">Total Payable:</span> ৳{Number(selected.total_payable).toLocaleString()}</div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Update Status</label>
                <select value={statusForm.status} onChange={e => setStatusForm({ ...statusForm, status: e.target.value })} className="input-field">
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="disbursed">Disbursed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Admin Note</label>
                <textarea rows={3} value={statusForm.admin_note}
                  onChange={e => setStatusForm({ ...statusForm, admin_note: e.target.value })}
                  className="input-field resize-none" placeholder="Add a note for the applicant..." />
              </div>
              <div className="flex gap-3">
                <button onClick={handleUpdate} disabled={updating}
                  className="btn-primary flex items-center gap-2">
                  {updating && <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
                  Update
                </button>
                <button onClick={() => setSelected(null)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
