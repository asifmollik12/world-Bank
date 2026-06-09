import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FaCamera, FaArrowLeft, FaCheck } from 'react-icons/fa'

const BN = { fontFamily: "'Hind Siliguri', sans-serif" }

function PhotoUpload({ label, value, onChange }) {
  const ref = useRef()
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#374151', ...BN }}>
        {label} <span className="text-red-600">*</span>
      </label>
      <div
        onClick={() => ref.current.click()}
        className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition hover:border-blue-500"
        style={{ borderColor: value ? '#2563eb' : '#d1d5db', backgroundColor: '#f9fafb', overflow: 'hidden' }}
      >
        {value ? (
          <img src={URL.createObjectURL(value)} alt="" className="w-full h-full object-cover" />
        ) : (
          <>
            <FaCamera size={28} className="text-slate-400 mb-1" />
            <span className="text-xs text-slate-400">ছবি যোগ করুন</span>
          </>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => onChange(e.target.files[0])} />
    </div>
  )
}

const inputCls = "w-full border rounded-lg px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
const inputStyle = { borderColor: '#c084fc', backgroundColor: '#fff', color: '#111' }

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const sigRef = useRef()
  const [drawing, setDrawing] = useState(false)
  const [hasSig, setHasSig] = useState(false)

  const [form, setForm] = useState({
    name: '', nid: '', current_address: '', permanent_address: '',
    phone: '', profession: '', loan_reason: '',
    nominee_name: '', nominee_relation: '', nominee_phone: '',
    password: '', email: '',
  })
  const [photos, setPhotos] = useState({
    selfie: null, id_front: null, id_back: null, nominee_id: null,
  })
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const setPhoto = k => v => setPhotos(p => ({ ...p, [k]: v }))

  // Signature canvas
  const startDraw = (e) => {
    setDrawing(true)
    setHasSig(true)
    const ctx = sigRef.current.getContext('2d')
    const r = sigRef.current.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - r.left, e.clientY - r.top)
  }
  const draw = (e) => {
    if (!drawing) return
    const ctx = sigRef.current.getContext('2d')
    const r = sigRef.current.getBoundingClientRect()
    ctx.lineTo(e.clientX - r.left, e.clientY - r.top)
    ctx.strokeStyle = '#111'
    ctx.lineWidth = 2
    ctx.stroke()
  }
  const stopDraw = () => setDrawing(false)
  const clearSig = () => {
    const ctx = sigRef.current.getContext('2d')
    ctx.clearRect(0, 0, sigRef.current.width, sigRef.current.height)
    setHasSig(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.phone || !form.name || !form.nid) {
      toast.error('পূর্ণ নাম, NID এবং মোবাইল নম্বর আবশ্যক')
      return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email || `${form.phone}@wbg.com`)
      fd.append('phone', form.phone)
      fd.append('password', form.password || form.phone)
      fd.append('password_confirmation', form.password || form.phone)
      fd.append('nid', form.nid)
      fd.append('address', form.current_address)
      if (photos.selfie) fd.append('selfie', photos.selfie)
      if (photos.id_front) fd.append('nid_document', photos.id_front)

      await register({ name: form.name, email: form.email || `${form.phone}@wbg.com`, phone: form.phone, password: form.password || form.phone, password_confirmation: form.password || form.phone, nid: form.nid, address: form.current_address })
      toast.success('নিবন্ধন সফল হয়েছে!')
      navigate('/dashboard')
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors) Object.values(errors).flat().forEach(m => toast.error(m))
      else toast.error(err.response?.data?.message || 'নিবন্ধন ব্যর্থ হয়েছে')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', ...BN }}>
      {/* Blue header bar */}
      <div style={{ backgroundColor: '#1d4ed8', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/login')} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
          <FaArrowLeft />
        </button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>ব্যক্তিগত তথ্য</span>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 760, margin: '0 auto', padding: '24px 16px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ color: '#374151', fontSize: 14 }}>ব্যক্তিগত তথ্য</div>
          <div style={{ color: '#1d4ed8', fontWeight: 800, fontSize: 20, marginTop: 2 }}>আপনার ব্যক্তিগত তথ্য</div>
        </div>

        {/* Important notice box */}
        <div style={{ backgroundColor: '#fefce8', border: '1px solid #fde68a', borderRadius: 8, padding: '14px 18px', marginBottom: 24, fontSize: 12 }}>
          <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 6 }}>⚠ গুরুত্বপূর্ণ:</div>
          <div style={{ color: '#78350f', marginBottom: 6 }}>লাল তারকা (*) চিহ্নিত সব ক্ষেত্র পূরণ করা আবশ্যক। সব ছবি আপলোড এবং স্বাক্ষর প্রদান করতে হবে।</div>
          <div style={{ fontWeight: 700, color: '#1d4ed8', marginBottom: 4 }}>আবশ্যক ক্ষেত্রসমূহ:</div>
          <ul style={{ paddingLeft: 18, color: '#374151', lineHeight: 2 }}>
            {['পূর্ণ নাম *','জাতীয় পরিচয়পত্র নম্বর *','বর্তমান ঠিকানা *','স্থায়ী ঠিকানা *','মোবাইল নম্বর *','পেশা *','ঋণের কারণ *','সেলফি আপলোড *','আইডি (সামনের দিক) *','আইডি (পেছনের দিক) *','স্বাক্ষর *','নমিনির তথ্য (পূর্ণ নাম, সম্পর্ক, মোবাইল নম্বর, ভোটার আইডি কার্ড) *'].map(i => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>পূর্ণ নাম <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.name} onChange={set('name')} placeholder="আহমেদ রহমান" className={inputCls} style={inputStyle} required />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>জাতীয় পরিচয়পত্র নম্বর <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.nid} onChange={set('nid')} placeholder="১৯৮৮৪২০৪৫৬৭৮১০" className={inputCls} style={inputStyle} required />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>বর্তমান ঠিকানা <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.current_address} onChange={set('current_address')} placeholder="বাড়ি নং ১২৩, রোড নং ৭, ধানমন্ডি, ঢাকা" className={inputCls} style={inputStyle} required />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>স্থায়ী ঠিকানা <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.permanent_address} onChange={set('permanent_address')} placeholder="বাড়ি নং ৪০৬, গ্রাম: কুমিল্লা, জেলা: কুমিল্লা" className={inputCls} style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>মোবাইল নম্বর <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.phone} onChange={set('phone')} placeholder="০১৭১২৩৪৫৬৭৮" className={inputCls} style={inputStyle} required />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>পেশা <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.profession} onChange={set('profession')} placeholder="ব্যাংকার, শিক্ষক, ব্যবসায়ী, চাকুরীজীবী" className={inputCls} style={inputStyle} required />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>ঋণের কারণ <span style={{ color: '#dc2626' }}>*</span></label>
            <textarea value={form.loan_reason} onChange={set('loan_reason')} rows={4} placeholder="ব্যবসা সম্প্রসারণ, চিকিৎসা খরচ, সন্তানের শিক্ষা, বাড়ি নির্মাণ" className={inputCls} style={{ ...inputStyle, resize: 'none' }} required />
          </div>

          {/* Photo uploads */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <PhotoUpload label="সেলফি আপলোড করুন" value={photos.selfie} onChange={setPhoto('selfie')} />
            <PhotoUpload label="আইডি (সামনের দিক)" value={photos.id_front} onChange={setPhoto('id_front')} />
            <PhotoUpload label="আইডি (পেছনের দিক)" value={photos.id_back} onChange={setPhoto('id_back')} />
          </div>

          {/* Signature pad */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 4, fontSize: 14 }}>স্বাক্ষর <span style={{ color: '#dc2626' }}>*</span></label>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>নিচের বক্সে আপনার স্বাক্ষর আঁকুন</div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <canvas
                ref={sigRef} width={220} height={100}
                onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
                style={{ border: '1px solid #d1d5db', borderRadius: 6, cursor: 'crosshair', backgroundColor: '#fff', display: 'block' }}
              />
              {hasSig && (
                <button type="button" onClick={clearSig}
                  style={{ position: 'absolute', top: -10, right: -10, width: 24, height: 24, borderRadius: '50%', backgroundColor: '#dc2626', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Nominee info */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#111' }}>নমিনির তথ্য</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 13 }}>পূর্ণ নাম <span style={{ color: '#dc2626' }}>*</span></label>
                <input value={form.nominee_name} onChange={set('nominee_name')} placeholder="রোকসানা বেগম" className={inputCls} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 13 }}>সম্পর্ক <span style={{ color: '#dc2626' }}>*</span></label>
                <input value={form.nominee_relation} onChange={set('nominee_relation')} placeholder="স্ত্রী/স্বামী/বাবা/মা/ভাই/বোন" className={inputCls} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 13 }}>মোবাইল নম্বর <span style={{ color: '#dc2626' }}>*</span></label>
                <input value={form.nominee_phone} onChange={set('nominee_phone')} placeholder="০১৮৭৬৫৪৩২১০" className={inputCls} style={inputStyle} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <PhotoUpload label="ভোটার আইডি কার্ড (সামনের দিক)" value={photos.nominee_id} onChange={setPhoto('nominee_id')} />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>পাসওয়ার্ড <span style={{ color: '#dc2626' }}>*</span></label>
            <input type="password" value={form.password} onChange={set('password')} placeholder="কমপক্ষে ৬ অক্ষর" className={inputCls} style={inputStyle} required />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            style={{ width: '100%', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {loading
              ? <span style={{ width: 20, height: 20, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
              : <><FaCheck /> নিশ্চিত করুন</>
            }
          </button>
        </div>
      </form>
    </div>
  )
}
