import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FaUsers, FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle, FaMoneyBillWave } from 'react-icons/fa'

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/dashboard').then(r => setData(r.data)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700" /></div>

  const { stats, monthly_loans, recent_applications } = data

  const statCards = [
    { label: 'Total Users', value: stats.total_users, icon: <FaUsers />, color: 'bg-blue-500' },
    { label: 'Total Loans', value: stats.total_loans, icon: <FaFileAlt />, color: 'bg-indigo-500' },
    { label: 'Pending', value: stats.pending_loans, icon: <FaClock />, color: 'bg-yellow-500' },
    { label: 'Approved', value: stats.approved_loans, icon: <FaCheckCircle />, color: 'bg-green-500' },
    { label: 'Rejected', value: stats.rejected_loans, icon: <FaTimesCircle />, color: 'bg-red-500' },
    { label: 'Disbursed (৳)', value: `৳${Number(stats.total_disbursed).toLocaleString()}`, icon: <FaMoneyBillWave />, color: 'bg-purple-500' },
  ]

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    under_review: 'bg-blue-100 text-blue-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    disbursed: 'bg-purple-100 text-purple-700',
    completed: 'bg-slate-100 text-slate-600',
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm">Overview of all activities</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {statCards.map(s => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className={`${s.color} text-white rounded-lg w-9 h-9 flex items-center justify-center text-sm mb-3`}>
              {s.icon}
            </div>
            <div className="text-xl font-bold text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="font-semibold text-slate-700 mb-4">Monthly Loan Applications (Last 6 Months)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthly_loans}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Applications" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-700">Recent Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Applicant</th>
                <th className="px-5 py-3 text-left">Plan</th>
                <th className="px-5 py-3 text-left">Amount</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {recent_applications.map(app => (
                <tr key={app.id} className="border-t border-slate-50 hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium">{app.user?.name}<div className="text-xs text-slate-400">{app.user?.phone}</div></td>
                  <td className="px-5 py-3">{app.loan_plan?.name}</td>
                  <td className="px-5 py-3 font-semibold">৳{Number(app.amount).toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[app.status]}`}>
                      {app.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{new Date(app.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
