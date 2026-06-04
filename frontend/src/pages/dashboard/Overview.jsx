import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import { FaFileAlt, FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBillWave } from 'react-icons/fa'

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-700',
  under_review: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  disbursed: 'bg-purple-100 text-purple-700',
  completed: 'bg-slate-100 text-slate-700',
}

export default function Overview() {
  const { user } = useAuth()
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/loans').then(r => setLoans(r.data)).finally(() => setLoading(false))
  }, [])

  const stats = [
    { label: 'Total Applications', value: loans.length, icon: <FaFileAlt className="text-blue-500 text-2xl" />, bg: 'bg-blue-50' },
    { label: 'Approved', value: loans.filter(l => ['approved', 'disbursed', 'completed'].includes(l.status)).length, icon: <FaCheckCircle className="text-green-500 text-2xl" />, bg: 'bg-green-50' },
    { label: 'Pending', value: loans.filter(l => l.status === 'pending').length, icon: <FaClock className="text-yellow-500 text-2xl" />, bg: 'bg-yellow-50' },
    { label: 'Rejected', value: loans.filter(l => l.status === 'rejected').length, icon: <FaTimesCircle className="text-red-500 text-2xl" />, bg: 'bg-red-50' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
        <p className="text-slate-500 text-sm">Welcome back, {user?.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-5 flex items-center gap-4 border border-slate-100`}>
            {s.icon}
            <div>
              <div className="text-2xl font-bold text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link to="/dashboard/apply"
          className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl p-6 flex items-center gap-4 hover:from-blue-800 transition">
          <FaFileAlt className="text-3xl opacity-80" />
          <div>
            <div className="font-bold text-lg">Apply for Loan</div>
            <div className="text-blue-200 text-sm">Quick & easy application</div>
          </div>
        </Link>
        <Link to="/dashboard/repayments"
          className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl p-6 flex items-center gap-4 hover:from-green-700 transition">
          <FaMoneyBillWave className="text-3xl opacity-80" />
          <div>
            <div className="font-bold text-lg">Make Repayment</div>
            <div className="text-green-100 text-sm">Pay your installment</div>
          </div>
        </Link>
      </div>

      {/* Recent loans */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-blue-900">Recent Applications</h2>
          <Link to="/dashboard/loans" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : loans.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No loan applications yet.
            <Link to="/dashboard/apply" className="text-blue-600 ml-1 hover:underline">Apply now</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs">
                <tr>
                  <th className="px-5 py-3 text-left">Plan</th>
                  <th className="px-5 py-3 text-left">Amount</th>
                  <th className="px-5 py-3 text-left">Monthly</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {loans.slice(0, 5).map(loan => (
                  <tr key={loan.id} className="border-t border-slate-50 hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium">{loan.loan_plan?.name}</td>
                    <td className="px-5 py-3">৳{Number(loan.amount).toLocaleString()}</td>
                    <td className="px-5 py-3">৳{Number(loan.monthly_installment).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[loan.status]}`}>
                        {loan.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400">{new Date(loan.created_at).toLocaleDateString()}</td>
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
