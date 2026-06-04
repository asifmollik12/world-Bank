import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { FaCheckCircle } from 'react-icons/fa'

export default function LoanPlans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/loan-plans')
      .then(r => setPlans(r.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700" /></div>

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Our Loan Plans</h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Choose the perfect loan plan designed for your needs. Transparent rates, flexible terms.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={plan.id} className={`rounded-2xl border-2 p-6 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 ${i === 1 ? 'border-blue-600 bg-blue-700 text-white scale-105' : 'border-slate-200 bg-white text-slate-800'}`}>
              {i === 1 && (
                <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">⭐ MOST POPULAR</div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${i === 1 ? 'text-white' : 'text-blue-900'}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${i === 1 ? 'text-blue-200' : 'text-slate-500'}`}>{plan.description}</p>

              <div className="text-center mb-6">
                <span className={`text-5xl font-extrabold ${i === 1 ? 'text-yellow-400' : 'text-blue-700'}`}>{plan.interest_rate}%</span>
                <span className={`text-sm ${i === 1 ? 'text-blue-200' : 'text-slate-400'}`}> / month</span>
              </div>

              <ul className="space-y-2 mb-6 text-sm flex-1">
                {[
                  `Min: ৳${Number(plan.minimum_amount).toLocaleString()}`,
                  `Max: ৳${Number(plan.maximum_amount).toLocaleString()}`,
                  `Duration: ${plan.duration_months} months`,
                  'Quick Approval',
                  'No Hidden Charges',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <FaCheckCircle className={i === 1 ? 'text-yellow-400' : 'text-green-500'} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`w-full block text-center font-bold py-3 rounded-xl transition ${
                  i === 1
                    ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
