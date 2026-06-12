import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaArrowLeft, FaCheckSquare } from 'react-icons/fa'

const BN = { fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }

const cardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  padding: '16px 20px',
  marginBottom: 16,
}
const sectionTitle = {
  fontWeight: 700, fontSize: 15, color: '#111',
  marginBottom: 14, paddingBottom: 8,
  borderBottom: '1px solid #e5e7eb', ...BN,
}
const fieldLabel = { fontWeight: 700, fontSize: 13, color: '#374151', ...BN }
const fieldValue = { fontSize: 13, color: '#111', ...BN }
const photoBox = {
  border: '1px solid #d1d5db', borderRadius: 6,
  width: 160, height: 120, overflow: 'hidden',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backgroundColor: '#f9fafb',
}

export default function PersonalInfoView() {
  const { user } = useAuth()
  const navigate = useNavigate()

  let extra = {}
  try { extra = JSON.parse(localStorage.getItem('wbg_personal_info') || '{}') } catch {}

  const name              = user?.name         || extra.name              || '—'
  const nid               = user?.nid          || extra.nid               || '—'
  const currentAddress    = user?.address      || extra.current_address   || '—'
  const permanentAddress  = extra.permanent_address || currentAddress
  const phone             = user?.phone        || extra.phone             || '—'
  const profession        = extra.profession   || '—'
  const loanReason        = extra.loan_reason  || '—'
  const nomineeName       = extra.nominee_name      || '—'
  const nomineeRelation   = extra.nominee_relation  || '—'
  const nomineePhone      = extra.nominee_phone     || '—'

  const selfieUrl     = extra.selfie_url     || null
  const idFrontUrl    = extra.id_front_url   || null
  const idBackUrl     = extra.id_back_url    || null
  const sigUrl        = extra.sig_url        || null
  const nomineeIdUrl  = extra.nominee_id_url || null

  const submittedAt = extra.submitted_at
    ? new Date(extra.submitted_at).toLocaleString('en-GB', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' })
    : new Date().toLocaleString('en-GB', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' })

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', ...BN }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1d3a8a', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button type="button" onClick={() => navigate('/dashboard/profile')}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>
          <FaArrowLeft />
        </button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>ব্যক্তিগত তথ্য</span>
      </div>

      <div style={{ maxWidth: 900, margin: '24px auto', padding: '0 16px 40px' }}>

        {/* Page title */}
        <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 18, color: '#111', marginBottom: 20, ...BN }}>
          ব্যক্তিগত তথ্য
        </h2>

        {/* Personal info section */}
        <div style={cardStyle}>
          <div style={sectionTitle}>ব্যক্তিগত তথ্য</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
            {[
              ['পূর্ণ নাম', name],
              ['জাতীয় পরিচয়পত্র নম্বর', nid],
              ['বর্তমান ঠিকানা', currentAddress],
              ['স্থায়ী ঠিকানা', permanentAddress],
              ['মোবাইল নম্বর', phone],
              ['পেশা', profession],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span style={fieldLabel}>{label}:</span>
                <span style={fieldValue}>{value}</span>
              </div>
            ))}
            {/* Loan reason full width */}
            <div style={{ display: 'flex', gap: 6, gridColumn: '1 / -1' }}>
              <span style={fieldLabel}>ঋণের কারণ:</span>
              <span style={fieldValue}>{loanReason}</span>
            </div>
          </div>
        </div>

        {/* Photos & Signature */}
        <div style={cardStyle}>
          <div style={sectionTitle}>আপলোড করা ছবি ও স্বাক্ষর</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              ['সেলফি:', selfieUrl],
              ['আইডি (সামনের দিক):', idFrontUrl],
              ['আইডি (পেছনের দিক):', idBackUrl],
              ['স্বাক্ষর:', sigUrl],
            ].map(([label, url]) => (
              <div key={label}>
                <div style={{ ...fieldLabel, marginBottom: 6 }}>{label}</div>
                <div style={photoBox}>
                  {url
                    ? <img src={url} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ color: '#d1d5db', fontSize: 24 }}>📷</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nominee info */}
        <div style={cardStyle}>
          <div style={sectionTitle}>নমিনির তথ্য</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 24px', marginBottom: 16 }}>
            {[
              ['পূর্ণ নাম', nomineeName],
              ['সম্পর্ক', nomineeRelation],
              ['মোবাইল নম্বর', nomineePhone],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span style={fieldLabel}>{label}:</span>
                <span style={fieldValue}>{value}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ ...fieldLabel, marginBottom: 6 }}>ভোটার আইডি কার্ড (সামনের দিক):</div>
            <div style={{ ...photoBox, width: 130, height: 100 }}>
              {nomineeIdUrl
                ? <img src={nomineeIdUrl} alt="nominee id" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ color: '#d1d5db', fontSize: 24 }}>📷</span>
              }
            </div>
          </div>
        </div>

        {/* Success message */}
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{ color: '#16a34a', fontWeight: 700, fontSize: 15, marginBottom: 6, ...BN }}>
            <FaCheckSquare style={{ marginRight: 6, verticalAlign: 'middle' }} />
            আপনার তথ্য ইতিমধ্যে জমা দেওয়া হয়েছে
          </div>
          <div style={{ color: '#6b7280', fontSize: 13 }}>
            জমা দেওয়ার তারিখ: {submittedAt}
          </div>
        </div>

      </div>
    </div>
  )
}
