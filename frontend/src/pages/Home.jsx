import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import {
  FaArrowRight, FaDownload, FaCheckCircle,
  FaBolt, FaShieldAlt, FaHandHoldingUsd, FaChartLine
} from 'react-icons/fa'

const features = [
  { icon: <FaBolt className="text-yellow-400 text-3xl" />, title: 'দ্রুত অনুমোদন', desc: 'আবেদনের ২৪ ঘণ্টার মধ্যে লোন অনুমোদন পান।' },
  { icon: <FaShieldAlt className="text-green-400 text-3xl" />, title: 'নিরাপদ ও বিশ্বস্ত', desc: 'ব্যাংক-মানের ডেটা সুরক্ষা সহ ১০০% নিরাপদ।' },
  { icon: <FaHandHoldingUsd className="text-blue-400 text-3xl" />, title: 'সহজ প্রক্রিয়া', desc: 'শাখায় না গিয়ে অনলাইনে আবেদন করুন।' },
  { icon: <FaChartLine className="text-purple-400 text-3xl" />, title: 'নমনীয় শর্তাবলী', desc: 'আপনার বাজেট অনুযায়ী কিস্তির মেয়াদ বেছে নিন।' },
]

const steps = [
  { step: '০১', title: 'অ্যাকাউন্ট খুলুন', desc: 'ফোন নম্বর ও তথ্য দিয়ে নিবন্ধন করুন।' },
  { step: '০২', title: 'প্ল্যান বেছে নিন', desc: 'আপনার প্রয়োজন অনুযায়ী লোনের ধরন নির্বাচন করুন।' },
  { step: '০৩', title: 'আবেদন করুন', desc: 'ফর্ম পূরণ করুন এবং প্রয়োজনীয় কাগজ আপলোড করুন।' },
  { step: '০৪', title: 'টাকা পান', desc: 'অনুমোদনের পর সরাসরি আপনার অ্যাকাউন্টে টাকা পাঠানো হবে।' },
]

export default function Home() {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    api.get('/loan-plans').then(r => setPlans(r.data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <div>
      {/* ===== HERO — full screen bank building background ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto">
          {/* Globe Logo */}
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 100 100" className="w-20 h-20 text-white" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="50" cy="50" r="45" />
              <ellipse cx="50" cy="50" rx="22" ry="45" />
              <ellipse cx="50" cy="50" rx="45" ry="18" />
              <line x1="5" y1="50" x2="95" y2="50" />
              <line x1="50" y1="5" x2="50" y2="95" />
            </svg>
          </div>

          <p className="text-sm font-bold tracking-[0.25em] uppercase text-white/90 mb-2">
            WORLD BANK GROUP
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8"
            style={{ fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif" }}>
            সহজ, দ্রুত ও নিরাপদ লোন আপনার<br />দোরগোড়ায়।
          </h1>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 flex items-center gap-2 text-sm"
            >
              ঋণের জন্য আবেদন করুন <FaArrowRight />
            </Link>
            <a
              href="#"
              className="bg-green-600 hover:bg-green-500 text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 flex items-center gap-2 text-sm"
            >
              অ্যাপ ডাউনলোড করুন <FaDownload />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs animate-bounce">
          <span>↓</span>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="bg-blue-900 text-white py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-blue-700 text-center">
            {[['৳৫০ কোটি+', 'বিতরণকৃত লোন'], ['১০,০০০+', 'সন্তুষ্ট গ্রাহক'], ['৯৯%', 'অনুমোদনের হার']].map(([val, label]) => (
              <div key={label} className="px-4">
                <div className="text-2xl md:text-3xl font-black text-yellow-400">{val}</div>
                <div className="text-xs md:text-sm text-blue-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">কেন আমাদের বেছে নেবেন?</h2>
          <p className="text-center text-slate-500 mb-10 text-sm">সারা বাংলাদেশে হাজারো গ্রাহকের বিশ্বাসের ঠিকানা</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition text-center">
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h3 className="font-bold text-blue-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOAN PLANS ===== */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">আমাদের লোন প্ল্যান</h2>
          <p className="text-center text-slate-500 mb-10 text-sm">প্রতিটি প্রয়োজনের জন্য নমনীয় পরিকল্পনা</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={plan.id} className={`rounded-2xl border-2 p-6 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 ${i === 1 ? 'border-blue-600 bg-blue-700 text-white scale-105' : 'border-slate-200 bg-white'}`}>
                {i === 1 && (
                  <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">⭐ সর্বাধিক জনপ্রিয়</div>
                )}
                <h3 className={`text-xl font-bold mb-2 ${i === 1 ? 'text-white' : 'text-blue-900'}`}>{plan.name}</h3>
                <p className={`text-sm mb-5 ${i === 1 ? 'text-blue-200' : 'text-slate-500'}`}>{plan.description}</p>
                <div className="text-center mb-5">
                  <span className={`text-5xl font-extrabold ${i === 1 ? 'text-yellow-400' : 'text-blue-700'}`}>{plan.interest_rate}%</span>
                  <span className={`text-sm ${i === 1 ? 'text-blue-200' : 'text-slate-400'}`}> / মাস</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm flex-1">
                  {[
                    `সর্বনিম্ন: ৳${Number(plan.minimum_amount).toLocaleString('bn-BD')}`,
                    `সর্বোচ্চ: ৳${Number(plan.maximum_amount).toLocaleString('bn-BD')}`,
                    `মেয়াদ: ${plan.duration_months} মাস`,
                    'দ্রুত অনুমোদন',
                    'কোনো লুকানো চার্জ নেই',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <FaCheckCircle className={i === 1 ? 'text-yellow-400 flex-shrink-0' : 'text-green-500 flex-shrink-0'} />
                      <span className={i === 1 ? 'text-blue-100' : 'text-slate-600'}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register"
                  className={`w-full block text-center font-bold py-3 rounded-xl transition ${i === 1 ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-300' : 'bg-blue-700 text-white hover:bg-blue-800'}`}>
                  এখনই আবেদন করুন
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/loan-plans" className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-8 py-3 rounded-xl transition">
              সব প্ল্যান দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">কীভাবে কাজ করে?</h2>
          <p className="text-center text-slate-500 mb-10 text-sm">মাত্র ৪টি ধাপে লোন পান</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="text-center">
                <div className="text-5xl font-black text-blue-100 mb-2">{s.step}</div>
                <div className="bg-blue-700 text-white rounded-2xl p-5">
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute mt-[-60px] ml-[220px] text-blue-300 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOAN CALCULATOR ===== */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">লোন ক্যালকুলেটর</h2>
          <p className="text-center text-blue-300 mb-10 text-sm">আপনার মাসিক কিস্তি হিসাব করুন</p>
          <LoanCalc />
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-yellow-400 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-3">আজই আপনার লোনের জন্য আবেদন করুন!</h2>
        <p className="text-blue-800 mb-6 text-lg">মাত্র ৫ মিনিটে নিবন্ধন করুন এবং আবেদন করুন।</p>
        <Link to="/register"
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-10 py-4 rounded-xl text-lg transition inline-flex items-center gap-2">
          শুরু করুন <FaArrowRight />
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
    <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="text-blue-200 text-sm mb-2 block">লোনের পরিমাণ (৳)</label>
            <input type="range" min="10000" max="1000000" step="10000" value={amount}
              onChange={e => setAmount(+e.target.value)}
              className="w-full accent-yellow-400 h-2" />
            <div className="text-yellow-400 font-bold text-2xl mt-2">৳{amount.toLocaleString()}</div>
          </div>
          <div>
            <label className="text-blue-200 text-sm mb-2 block">মেয়াদ (মাস)</label>
            <input type="range" min="3" max="60" step="3" value={months}
              onChange={e => setMonths(+e.target.value)}
              className="w-full accent-yellow-400 h-2" />
            <div className="text-yellow-400 font-bold text-2xl mt-2">{months} মাস</div>
          </div>
        </div>
        <div className="bg-blue-900/50 rounded-xl p-6 flex flex-col justify-center space-y-4 border border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-blue-300">মূল পরিমাণ:</span>
            <span className="font-semibold">৳{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-300">সুদের হার:</span>
            <span className="font-semibold">{rate}% / মাস</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-300">মেয়াদ:</span>
            <span className="font-semibold">{months} মাস</span>
          </div>
          <div className="border-t border-white/20 pt-4">
            <div className="flex justify-between">
              <span className="text-blue-300 text-sm">মাসিক কিস্তি:</span>
              <span className="font-black text-yellow-400 text-xl">৳{monthly.toLocaleString('en', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-blue-300 text-sm">মোট পরিশোধ:</span>
              <span className="font-black text-yellow-400 text-xl">৳{total.toLocaleString('en', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
          <Link to="/register"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 rounded-xl text-center transition mt-2">
            এখনই আবেদন করুন
          </Link>
        </div>
      </div>
    </div>
  )
}
