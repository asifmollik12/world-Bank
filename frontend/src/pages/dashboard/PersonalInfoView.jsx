import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaArrowLeft } from 'react-icons/fa'

const BN = { fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }

function Row({ label, value }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #e5e7eb', fontSize: 14 }}>
      <span style={{ width: 130, flexShrink: 0, color: '#374151', fontWeight: 600, ...BN }}>{label}</span>
      <span style={{ marginRight: 8, color: '#374151' }}>:</span>
      <span style={{ color: '#111', flex: 1, ...BN }}>{value}</span>
    </div>
  )
}

export default function PersonalInfoView() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Get extra data from localStorage (saved during personal-info form)
  let extra = {}
  try { extra = JSON.parse(localStorage.getItem('wbg_personal_info') || '{}') } catch {}

  const name             = user?.name || extra.name || '—'
  const nid              = user?.nid  || extra.nid  || '—'
  const currentAddress   = user?.address || extra.current_address || '—'
  const permanentAddress = extra.permanent_address || currentAddress
  const phone            = user?.phone || extra.phone || '—'
  const profession       = extra.profession   || '—'
  const loanReason       = extra.loan_reason  || '—'
  const nomineeName      = extra.nominee_name     || '—'
  const nomineeRelation  = extra.nominee_relation  || '—'
  const nomineePhone     = extra.nominee_phone     || '—'

  // Photos (stored as object URLs from the form — may not persist, show placeholder)
  const selfieUrl    = extra.selfie_url    || null
  const idFrontUrl   = extra.id_front_url  || null
  const idBackUrl    = extra.id_back_url   || null
  const nomineeIdUrl = extra.nominee_id_url || null

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', ...BN }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={() => navigate('/dashboard/profile')}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>
          <FaArrowLeft />
        </button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>ব্যক্তিগত তথ্য</span>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 680, margin: '20px auto', padding: '0 16px 40px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>

          <div style={{ fontWeight: 700, fontSize: 15, color: '#1d3a8a', marginBottom: 16, ...BN }}>
            আপনার ব্যক্তিগত তথ্য -
          </div>

          <Row label="পূর্ণ নাম"          value={name} />
          <Row label="এনআইডি নম্বর"       value={nid} />
          <Row label="বর্তমান ঠিকানা"     value={currentAddress} />
          <Row label="স্থায়ী ঠিকানা"     value={permanentAddress} />
          <Row label="মোবাইল নম্বর"       value={phone} />
          <Row label="পেশা"               value={profession} />
          <Row label="ঋণের কারণ"          value={loanReason} />

          {/* Selfie */}
          {selfieUrl && (
            <div style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#374151', marginBottom: 8 }}>সেলফি</div>
              <img src={selfieUrl} alt="selfie" style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
            </div>
          )}

          {/* ID front */}
          {idFrontUrl && (
            <div style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#374151', marginBottom: 8 }}>আইডি (সামনের দিক)</div>
              <img src={idFrontUrl} alt="id front" style={{ width: 200, height: 130, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
            </div>
          )}

          {/* ID back */}
          {idBackUrl && (
            <div style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#374151', marginBottom: 8 }}>আইডি (পেছনের দিক)</div>
              <img src={idBackUrl} alt="id back" style={{ width: 200, height: 130, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
            </div>
          )}

          {/* Nominee info */}
          {nomineeName !== '—' && (
            <>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1d3a8a', padding: '14px 0 4px', ...BN }}>নমিনির তথ্য</div>
              <Row label="পূর্ণ নাম"    value={nomineeName} />
              <Row label="সম্পর্ক"      value={nomineeRelation} />
              <Row label="মোবাইল নম্বর" value={nomineePhone} />
              {nomineeIdUrl && (
                <div style={{ padding: '12px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#374151', marginBottom: 8 }}>ভোটার আইডি কার্ড</div>
                  <img src={nomineeIdUrl} alt="nominee id" style={{ width: 200, height: 130, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </div>
              )}
            </>
          )}

          {/* Edit button */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #e5e7eb' }}>
            <button
              onClick={() => navigate('/dashboard/personal-info')}
              style={{ backgroundColor: '#1d3a8a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', ...BN }}
            >
              তথ্য সম্পাদনা করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
