import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-700',
  under_review: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  disbursed: 'bg-purple-100 text-purple-700',
  completed: 'bg-slate-100 text-slate-600',
}

export default function MyLoans() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/loans').then(r => setLoans(r.data)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700" /></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">My Loan Applications</h1>
          <p className="text-slate-500 text-sm">Track all your loan applications</p>
        </div>
        <Link to="/dashboard/apply" className="btn-primary text-sm">+ New Application</Link>
      </div>

      {loans.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-100">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="font-semibold text-slate-700 mb-1">No applications yet</h3>
          <p className="text-slate-400 text-sm mb-4">Apply for your first loan today</p>
          <Link to="/dashboard/apply" className="btn-primary text-sm">Apply Now</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {loans.map(loan => (
            <div key={loan.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-blue-900">{loan.loan_plan?.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[loan.status]}`}>
                      {loan.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Purpose: {loan.purpose}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-900">৳{Number(loan.amount).toLocaleString()}</div>
                  <div className="text-xs text-slate-400">Applied {new Date(loan.created_at).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 text-sm">
                <div><div className="text-xs text-slate-400">Monthly</div><div className="font-semibold text-slate-700">৳{Number(loan.monthly_installment).toLocaleString()}</div></div>
                <div><div className="text-xs text-slate-400">Total Payable</div><div className="font-semibold text-slate-700">৳{Number(loan.total_payable).toLocaleString()}</div></div>
                <div><div className="text-xs text-slate-400">Interest Rate</div><div className="font-semibold text-slate-700">{loan.interest_rate}%/mo</div></div>
                <div><div className="text-xs text-slate-400">Duration</div><div className="font-semibold text-slate-700">{loan.duration_months} months</div></div>
              </div>

              {loan.admin_note && (
                <div className="mt-3 bg-slate-50 rounded-lg px-4 py-2 text-sm text-slate-600 border border-slate-200">
                  <span className="font-medium text-slate-700">Admin Note: </span>{loan.admin_note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
