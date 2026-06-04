import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const empty = { name: '', description: '', minimum_amount: '', maximum_amount: '', interest_rate: '', duration_months: '', is_active: true }

export default function AdminLoanPlans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const fetchPlans = () => {
    setLoading(true)
    api.get('/admin/loan-plans').then(r => setPlans(r.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchPlans() }, [])

  const openCreate = () => { setForm(empty); setEditing(null); setShowForm(true) }
  const openEdit = (p) => { setForm({ ...p }); setEditing(p.id); setShowForm(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/admin/loan-plans/${editing}`, form)
        toast.success('Plan updated!')
      } else {
        await api.post('/admin/loan-plans', form)
        toast.success('Plan created!')
      }
      setShowForm(false)
      fetchPlans()
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors) Object.values(errors).flat().forEach(m => toast.error(m))
      else toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const deletePlan = async (id) => {
    if (!confirm('Delete this loan plan?')) return
    try {
      await api.delete(`/admin/loan-plans/${id}`)
      toast.success('Plan deleted')
      fetchPlans()
    } catch {
      toast.error('Cannot delete plan with active applications')
    }
  }

  const set = k => e => setForm({ ...form, [k]: e.target.value })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Loan Plans</h1>
          <p className="text-slate-500 text-sm">Create and manage loan plan offerings</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">+ Add Plan</button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4">{editing ? 'Edit Plan' : 'Create New Plan'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Plan Name *</label>
              <input type="text" value={form.name} onChange={set('name')} className="input-field" required />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Description</label>
              <textarea value={form.description} onChange={set('description')} className="input-field resize-none" rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Min Amount (৳) *</label>
              <input type="number" value={form.minimum_amount} onChange={set('minimum_amount')} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Max Amount (৳) *</label>
              <input type="number" value={form.maximum_amount} onChange={set('maximum_amount')} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Interest Rate (% / month) *</label>
              <input type="number" step="0.1" value={form.interest_rate} onChange={set('interest_rate')} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Duration (months) *</label>
              <input type="number" value={form.duration_months} onChange={set('duration_months')} className="input-field" required />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-700">Active</label>
              <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
                {saving && <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
                {editing ? 'Update Plan' : 'Create Plan'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Plans Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" /></div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Plan Name</th>
                <th className="px-5 py-3 text-left">Min (৳)</th>
                <th className="px-5 py-3 text-left">Max (৳)</th>
                <th className="px-5 py-3 text-left">Rate</th>
                <th className="px-5 py-3 text-left">Duration</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(p => (
                <tr key={p.id} className="border-t border-slate-50 hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold text-blue-900">{p.name}</td>
                  <td className="px-5 py-3">৳{Number(p.minimum_amount).toLocaleString()}</td>
                  <td className="px-5 py-3">৳{Number(p.maximum_amount).toLocaleString()}</td>
                  <td className="px-5 py-3 font-semibold text-blue-700">{p.interest_rate}%</td>
                  <td className="px-5 py-3">{p.duration_months} mo</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {p.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="px-5 py-3 flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200">Edit</button>
                    <button onClick={() => deletePlan(p.id)} className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200">Delete</button>
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
