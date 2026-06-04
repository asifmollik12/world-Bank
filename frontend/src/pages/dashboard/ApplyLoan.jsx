import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function ApplyLoan() {
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [form, setForm] = useState({ loan_plan_id: '', amount: '', duration_months: '', purpose: '' })
  const [files, setFiles] = useState({ nid_document: null, income_proof: null })
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [calc, setCalc] = useState(null)

  useEffect(() => {
    api.get('/loan-plans').then(r => setPlans(r.data))
  }, [])

  useEffect(() => {
    if (selectedPlan && form.amount && form.duration_months) {
      const rate = selectedPlan.interest_rate / 100
      const total = +form.amount + (+form.amount * rate * +form.duration_months)
      setCalc({ total: total.toFixed(2), monthly: (total / +form.duration_months).toFixed(2) })
    } else {
      setCalc(null)
    }
  }, [form.amount, form.duration_months, selectedPlan])

  const handlePlanChange = (e) => {
    const plan = plans.find(p => p.id === +e.target.value)
    setSelectedPlan(plan || null)
    setForm({ ...form, loan_plan_id: e.target.value, duration_months: plan?.duration_months || '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      if (files.nid_document) data.append('nid_document', files.nid_document)
      if (files.income_proof) data.append('income_proof', files.income_proof)

      await api.post('/loans', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Loan application submitted successfully!')
      navigate('/dashboard/loans')
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors) Object.values(errors).flat().forEach(m => toast.error(m))
      else toast.error(err.response?.data?.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Apply for Loan</h1>
        <p className="text-slate-500 text-sm">Fill in the details below to submit your loan application</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Plan */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Select Loan Plan *</label>
              <select value={form.loan_plan_id} onChange={handlePlanChange} className="input-field" required>
                <option value="">-- Choose a plan --</option>
                {plans.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.interest_rate}%/mo | ৳{Number(p.minimum_amount).toLocaleString()} – ৳{Number(p.maximum_amount).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {selectedPlan && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p>{selectedPlan.description}</p>
                <div className="flex gap-6 mt-2 text-xs font-semibold">
                  <span>Min: ৳{Number(selectedPlan.minimum_amount).toLocaleString()}</span>
                  <span>Max: ৳{Number(selectedPlan.maximum_amount).toLocaleString()}</span>
                  <span>Rate: {selectedPlan.interest_rate}%/month</span>
                </div>
              </div>
            )}

            {/* Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Loan Amount (৳) *</label>
                <input type="number" placeholder="e.g. 50000" value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  className="input-field" required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Duration (months) *</label>
                <input type="number" placeholder="e.g. 12" value={form.duration_months}
                  onChange={e => setForm({ ...form, duration_months: e.target.value })}
                  className="input-field" required min="1" max="120" />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Purpose of Loan *</label>
              <input type="text" placeholder="e.g. Business expansion, medical emergency..."
                value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })}
                className="input-field" required />
            </div>

            {/* Documents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">NID Document</label>
                <input type="file" accept=".jpg,.jpeg,.png,.pdf"
                  onChange={e => setFiles({ ...files, nid_document: e.target.files[0] })}
                  className="input-field text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Income Proof</label>
                <input type="file" accept=".jpg,.jpeg,.png,.pdf"
                  onChange={e => setFiles({ ...files, income_proof: e.target.files[0] })}
                  className="input-field text-sm" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center gap-2">
              {loading && <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>

        {/* Calculation summary */}
        <div className="space-y-4">
          <div className="bg-blue-900 text-white rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">Loan Summary</h3>
            {calc ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-blue-300">Principal:</span><span className="font-semibold">৳{Number(form.amount).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-blue-300">Duration:</span><span className="font-semibold">{form.duration_months} months</span></div>
                <div className="flex justify-between"><span className="text-blue-300">Interest Rate:</span><span className="font-semibold">{selectedPlan?.interest_rate}%/mo</span></div>
                <div className="border-t border-blue-700 pt-3 flex justify-between"><span className="text-blue-300">Monthly:</span><span className="font-bold text-yellow-400 text-lg">৳{Number(calc.monthly).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-blue-300">Total Payable:</span><span className="font-bold text-yellow-400 text-lg">৳{Number(calc.total).toLocaleString()}</span></div>
              </div>
            ) : (
              <p className="text-blue-300 text-sm">Select a plan and enter amount to see calculation.</p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-100 p-5 text-sm">
            <h4 className="font-semibold text-blue-900 mb-3">Required Documents</h4>
            <ul className="space-y-2 text-slate-600">
              {['National ID (NID) copy', 'Recent photograph', 'Income/salary proof', 'Bank statement (last 3 months)'].map(d => (
                <li key={d} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
