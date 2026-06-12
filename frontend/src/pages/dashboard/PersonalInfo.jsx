import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'

const BN = { fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }

function PhotoUpload({ label, value, onChange }) {
  const ref = useRef()
  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: '#374151', ...BN }}>
        {label} <span style={{ color: '#dc2626' }}>*</span>
      </div>
      <div
        onClick={() => ref.current.click()}
        style={{
          width: 120, height: 120, border: '2px dashed #9ca3af',
          borderRadius: 8, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backgroundColor: '#f9fafb', overflow: 'hidden', position: 'relative',
        }}
      >
        {value ? (
          <img src={URL.createObjectURL(value)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#9ca3af" strokeWidth="1.5" style={{ marginBottom: 4 }}>
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <div style={{ fontSize: 20, color: '#9ca3af', fontWeight: 700, lineHeight: 1 }}>+</div>
          </>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
        onChange={e => e.target.files[0] && onChange(e.target.files[0])} />
    </div>
  )
}

export default function PersonalInfo() {
  const { refreshUser } = useAuth()
  const navigate = useNavigate()
  const sigRef = useRef()
  const [drawing, setDrawing] = useState(false)
  const [hasSig, setHasSig]   = useState(false)

  const [form, setForm] = useState({
    name: '', nid: '', current_address: '', permanent_address: '',
    phone: '', profession: '', loan_reason: '',
    nominee_name: '', nominee_relation: '', nominee_phone: '', password: '',
  })
  const [photos, setPhotos]   = useState({ selfie: null, id_front: null, id_back: null, nominee_id: null })
  const [loading, setLoading] = useState(false)

  const set    = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const setPhoto = k => v => setPhotos(p => ({ ...p, [k]: v }))

  const getPos = (e, canvas) => {
    const r = canvas.getBoundingClientRect()
    const sx = canvas.width / r.width, sy = canvas.height / r.height
    if (e.touches) return { x: (e.touches[0].clientX - r.left) * sx, y: (e.touches[0].clientY - r.top) * sy }
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy }
  }
  const startDraw = e => { e.preventDefault(); setDrawing(true); setHasSig(true); const ctx = sigRef.current.getContext('2d'); const { x, y } = getPos(e, sigRef.current); ctx.beginPath(); ctx.moveTo(x, y) }
  const draw     = e => { e.preventDefault(); if (!drawing) return; const ctx = sigRef.current.getContext('2d'); const { x, y } = getPos(e, sigRef.current); ctx.lineTo(x, y); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke() }
  const stopDraw = e => { e?.preventDefault(); setDrawing(false) }
  const clearSig = () => { sigRef.current.getContext('2d').clearRect(0, 0, sigRef.current.width, sigRef.current.height); setHasSig(false) }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.nid && !form.current_address) { toast.error('NID এবং ঠিকানা প্রয়োজন'); return }
    setLoading(true)
    try {
      // Update profile via API
      await api.post('/profile/update', {
        name:    form.name    || undefined,
        nid:     form.nid     || undefined,
        address: form.current_address || undefined,
      })
      // Save all form data to localStorage for preview
      localStorage.setItem('wbg_personal_info', JSON.stringify(form))
      await refreshUser()
      toast.success('ব্যক্তিগত তথ্য সংরক্ষিত হয়েছে!')
      navigate('/dashboard/apply')
    } catch (err) {
      toast.error(err.response?.data?.message || 'সংরক্ষণ ব্যর্থ হয়েছে')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', border: '1.5px solid #818cf8', borderRadius: 6,
    padding: '12px 16px', fontSize: 14, outline: 'none',
    backgroundColor: '#fff', color: '#111', boxSizing: 'border-box', ...BN,
  }
  const labelStyle = { display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#111', ...BN }

  return (
    <div style={{ backgroundColor: '#e5e7eb', minHeight: '100vh', ...BN }}>

      {/* Blue header */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button type="button" onClick={() => navigate('/dashboard')}
          style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>
          <FaArrowLeft />
        </button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>ব্যক্তিগত তথ্য</span>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', maxWidth: 960, margin: '24px auto', padding: '28px 40px', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ color: '#374151', fontSize: 14 }}>ব্যক্তিগত তথ্য</div>
          <div style={{ color: '#1d3a8a', fontWeight: 800, fontSize: 22, marginTop: 2 }}>আপনার ব্যক্তিগত তথ্য</div>
        </div>

        {/* Yellow notice */}
        <div style={{ backgroundColor: '#fef9c3', border: '1px solid #fde68a', borderRadius: 8, padding: '16px 20px', marginBottom: 28 }}>
          <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 6, fontSize: 13 }}>⚠ গুরুত্বপূর্ণ:</div>
          <div style={{ color: '#78350f', fontSize: 12, marginBottom: 10 }}>লাল তারকা (*) চিহ্নিত সব ক্ষেত্র পূরণ করা আবশ্যক। সব ছবি আপলোড এবং স্বাক্ষর প্রদান করতে হবে।</div>
          <div style={{ fontWeight: 700, color: '#b45309', fontSize: 12, marginBottom: 6 }}>আবশ্যক ক্ষেত্রসমূহ:</div>
          <ul style={{ paddingLeft: 20, color: '#92400e', fontSize: 12, lineHeight: 2.2, margin: 0 }}>
            {['পূর্ণ নাম *','জাতীয় পরিচয়পত্র নম্বর *','বর্তমান ঠিকানা *','স্থায়ী ঠিকানা *','মোবাইল নম্বর *','পেশা *','ঋণের কারণ *','সেলফি আপলোড *','আইডি (সামনের দিক) *','আইডি (পেছনের দিক) *','স্বাক্ষর *','নমিনির তথ্য (পূর্ণ নাম, সম্পর্ক, মোবাইল নম্বর, ভোটার আইডি কার্ড) *'].map(i => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

          <div>
            <label style={labelStyle}>পূর্ণ নাম <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.name} onChange={set('name')} placeholder="আহমেদ রহমান" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>জাতীয় পরিচয়পত্র নম্বর <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.nid} onChange={set('nid')} placeholder="১৯৮৮৪২০৪৫৬৭৮১০" style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>বর্তমান ঠিকানা <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.current_address} onChange={set('current_address')} placeholder="বাড়ি নং ১২৩, রোড নং ৭, ধানমন্ডি, ঢাকা" style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>স্থায়ী ঠিকানা <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.permanent_address} onChange={set('permanent_address')} placeholder="বাড়ি নং ৪০৬, গ্রাম: কুমিল্লা, জেলা: কুমিল্লা" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>মোবাইল নম্বর <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.phone} onChange={set('phone')} placeholder="০১৭১২৩৪৫৬৭৮" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>পেশা <span style={{ color: '#dc2626' }}>*</span></label>
            <input value={form.profession} onChange={set('profession')} placeholder="ব্যাংকার, শিক্ষক, ব্যবসায়ী, চাকুরীজীবী" style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>ঋণের কারণ <span style={{ color: '#dc2626' }}>*</span></label>
            <textarea value={form.loan_reason} onChange={set('loan_reason')} rows={4}
              placeholder="ব্যবসা সম্প্রসারণ, চিকিৎসা খরচ, সন্তানের শিক্ষা, বাড়ি নির্মাণ"
              style={{ ...inputStyle, resize: 'vertical' }} required />
          </div>

          {/* Photos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 16, justifyContent: 'start' }}>
            <PhotoUpload label="সেলফি আপলোড করুন"  value={photos.selfie}   onChange={setPhoto('selfie')} />
            <PhotoUpload label="আইডি (সামনের দিক)" value={photos.id_front} onChange={setPhoto('id_front')} />
            <PhotoUpload label="আইডি (পেছনের দিক)" value={photos.id_back}  onChange={setPhoto('id_back')} />
          </div>

          {/* Signature */}
          <div>
            <label style={labelStyle}>স্বাক্ষর <span style={{ color: '#dc2626' }}>*</span></label>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>নিচের বক্সে আপনার স্বাক্ষর আঁকুন</div>
            <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: 500 }}>
              <canvas ref={sigRef} width={900} height={200}
                onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
                onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
                style={{ border: '1.5px solid #818cf8', borderRadius: 8, cursor: 'crosshair', backgroundColor: '#fff', display: 'block', width: '100%', maxWidth: 500, height: 120, touchAction: 'none' }}
              />
              {hasSig && (
                <button type="button" onClick={clearSig} style={{ position: 'absolute', top: -10, right: -10, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#dc2626', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>✕</button>
              )}
            </div>
          </div>

          {/* Nominee */}
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: '#111', borderBottom: '2px solid #e5e7eb', paddingBottom: 8 }}>নমিনির তথ্য</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ ...labelStyle, fontSize: 13 }}>পূর্ণ নাম <span style={{ color: '#dc2626' }}>*</span></label>
                <input value={form.nominee_name} onChange={set('nominee_name')} placeholder="রোকসানা বেগম" style={inputStyle} />
              </div>
              <div>
                <label style={{ ...labelStyle, fontSize: 13 }}>সম্পর্ক <span style={{ color: '#dc2626' }}>*</span></label>
                <input value={form.nominee_relation} onChange={set('nominee_relation')} placeholder="স্ত্রী/স্বামী/বাবা/মা" style={inputStyle} />
              </div>
              <div>
                <label style={{ ...labelStyle, fontSize: 13 }}>মোবাইল নম্বর <span style={{ color: '#dc2626' }}>*</span></label>
                <input value={form.nominee_phone} onChange={set('nominee_phone')} placeholder="০১৮৭৬৫৪৩২১০" style={inputStyle} />
              </div>
            </div>
            <PhotoUpload label="ভোটার আইডি কার্ড (সামনের দিক)" value={photos.nominee_id} onChange={setPhoto('nominee_id')} />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} style={{
            width: '100%', backgroundColor: '#16a34a', color: '#fff',
            border: 'none', borderRadius: 8, padding: '15px',
            fontSize: 17, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, ...BN,
          }}>
            {loading
              ? <span style={{ width: 22, height: 22, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block' }} />
              : <><FaCheck size={16} /> নিশ্চিত করুন</>
            }
          </button>
        </div>
      </form>
    </div>
  )
}
