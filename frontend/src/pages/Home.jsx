import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import {
  FaCheckCircle, FaBolt, FaShieldAlt, FaHandHoldingUsd,
  FaUserFriends, FaChartLine, FaArrowRight
} from 'react-icons/fa'

const features = [
  { icon: <FaBolt className="text-yellow-400 text-3xl" />, title: 'Fast Approval', desc: 'Get loan approval within 24 hours of application.' },
  { icon: <FaShieldAlt className="text-green-400 text-3xl" />, title: 'Secure & Trusted', desc: '100% secure platform with bank-level data protection.' },
  { icon: <FaHandHoldingUsd className="text-blue-400 text-3xl" />, title: 'Easy Process', desc: 'Simple online application — no branch visit needed.' },
  { icon: <FaChartLine className="text-purple-400 text-3xl" />, title: 'Flexible Terms', desc: 'Choose repayment period that fits your budget.' },
]

const steps = [
  { step: '01', title: 'Create Account', desc: 'Register with your phone number and basic details.' },
  { step: '02', title: 'Choose Loan Plan', desc: 'Select the loan type and amount you need.' },
  { step: '03', title: 'Submit Application', desc: 'Fill the form and upload required documents.' },
  { step: '04', title: 'Get Disbursed', desc: 'Upon approval, money is sent directly to your account.' },
]

export default function Home() {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    api.get('/loan-plans').then(r => setPlans(r.data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="bg-yellow-500 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Trusted Since 2020
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
              Easy, Fast &<br />
              <span className="text-yellow-400">Secure Loans</span><br />
              At Your Doorstep
            </h1>
            <p className="text-blue-200 mt-4 text-lg max-w-lg">
              Get instant loan approval with minimal paperwork. We offer personal, business, home, and education loans with competitive interest rates.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/register" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-xl transition flex items-center gap-2">
                Apply Now <FaArrowRight />
              </Link>
              <Link to="/loan-plans" className="border-2 border-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-xl transition">
                View Plans
              </Link>
            </div>
            <div className="flex gap-8 mt-10">
              {[['৳50 Cr+', 'Disbursed'], ['10,000+', 'Happy Clients'], ['99%', 'Approval Rate']].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-yellow-400">{val}</div>
                  <div className="text-sm text-blue-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 w-full max-w-sm border border-white/20">
              <h3 className="text-xl font-bold mb-6 text-center">Quick Loan Calculator</h3>
              <LoanCalc />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Why Choose Us?</h2>
          <p className="text-center text-slate-500 mb-10">Trusted by thousands of customers across Bangladesh</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-lg transition text-center">
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h3 className="font-semibold text-blue-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Plans Preview */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Our Loan Plans</h2>
          <p className="text-center text-slate-500 mb-10">Flexible plans for every need</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition">
                <div className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
                  {plan.interest_rate}% / month
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                <div className="text-sm text-slate-600 space-y-1 mb-5">
                  <div>Min: <span className="font-semibold text-blue-800">৳{Number(plan.minimum_amount).toLocaleString()}</span></div>
                  <div>Max: <span className="font-semibold text-blue-800">৳{Number(plan.maximum_amount).toLocaleString()}</span></div>
                  <div>Duration: <span className="font-semibold text-blue-800">{plan.duration_months} months</span></div>
                </div>
                <Link to="/register" className="w-full block text-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/loan-plans" className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-8 py-3 rounded-xl transition">
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">How It Works</h2>
          <p className="text-center text-slate-500 mb-10">4 simple steps to get your loan</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(s => (
              <div key={s.step} className="text-center">
                <div className="text-4xl font-black text-blue-100 mb-2">{s.step}</div>
                <div className="bg-blue-700 text-white rounded-xl p-5">
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-blue-200 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-400 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-3">Ready to Get Your Loan?</h2>
        <p className="text-blue-800 mb-6 text-lg">Register now and apply in under 5 minutes.</p>
        <Link to="/register" className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-10 py-4 rounded-xl text-lg transition">
          Get Started Today
        </Link>
      </section>
    </div>
  )
}

function LoanCalc() {
  const [amount, setAmount] = useState(100000)
  const [months, setMonths] = useState(12)
  const rate = 2.5
  const total = amount + (amount * (rate / 100) * months)
  const monthly = total / months

  return (
    <div className="space-y-4 text-sm">
      <div>
        <label className="text-blue-200 text-xs mb-1 block">Loan Amount (৳)</label>
        <input type="range" min="10000" max="1000000" step="10000" value={amount}
          onChange={e => setAmount(+e.target.value)}
          className="w-full accent-yellow-400" />
        <div className="text-yellow-400 font-bold text-lg mt-1">৳{amount.toLocaleString()}</div>
      </div>
      <div>
        <label className="text-blue-200 text-xs mb-1 block">Duration (months)</label>
        <input type="range" min="3" max="60" step="3" value={months}
          onChange={e => setMonths(+e.target.value)}
          className="w-full accent-yellow-400" />
        <div className="text-yellow-400 font-bold text-lg mt-1">{months} months</div>
      </div>
      <div className="bg-blue-900/50 rounded-xl p-4 mt-2 space-y-2">
        <div className="flex justify-between"><span className="text-blue-300">Monthly:</span><span className="font-bold text-white">৳{monthly.toLocaleString('en', { maximumFractionDigits: 0 })}</span></div>
        <div className="flex justify-between"><span className="text-blue-300">Total Payable:</span><span className="font-bold text-yellow-400">৳{total.toLocaleString('en', { maximumFractionDigits: 0 })}</span></div>
        <div className="flex justify-between"><span className="text-blue-300">Interest Rate:</span><span className="font-bold text-white">{rate}%/mo</span></div>
      </div>
    </div>
  )
}
