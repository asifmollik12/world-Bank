import { useState, useRef } from 'react'
import { FaDownload, FaTrash } from 'react-icons/fa'

const TABS = ['TRANSACTION','MONEY RECEIPT','ID CARD','APPROVAL','CHEQUE','INSURANCE','STAMP','CLEARANCE']

// Globe SVG component
const Globe = ({ size = 40, color = '#1d4ed8' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="3.5">
    <circle cx="50" cy="50" r="44" />
    <ellipse cx="50" cy="50" rx="22" ry="44" />
    <ellipse cx="50" cy="50" rx="44" ry="17" />
    <line x1="6" y1="50" x2="94" y2="50" />
  </svg>
)

const inputCls = "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-400 outline-none focus:border-blue-500"

export default function StaffNotes() {
  const [tab, setTab] = useState('TRANSACTION')
  const [data, setData] = useState({})
  const previewRef = useRef(null)

  const set = k => e => setData(p => ({ ...p, [k]: e.target.value }))
  const now = new Date().toLocaleString()

  const clearCache = () => { setData({}) }

  const downloadPNG = async () => {
    const el = previewRef.current
    if (!el) return
    try {
      const { default: html2canvas } = await import('https://cdn.skypack.dev/html2canvas')
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff' })
      const link = document.createElement('a')
      link.download = `${tab.toLowerCase().replace(' ','-')}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch {
      window.print()
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#e2e8f0' }}>
      {/* Title + refresh */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-white">Document Generator</h1>
        <button onClick={clearCache} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold text-white"
          style={{ backgroundColor: '#dc2626' }}>
          <FaTrash size={11} /> CLEAR CACHE
        </button>
      </div>

      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-3 py-1.5 rounded text-xs font-bold transition border"
            style={{
              backgroundColor: tab === t ? '#2563eb' : '#1e293b',
              color: tab === t ? '#fff' : '#94a3b8',
              borderColor: tab === t ? '#3b82f6' : '#334155',
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Preview + Form */}
      <div className="flex flex-col items-center gap-6">
        {tab === 'TRANSACTION' && <TransactionDoc ref={previewRef} d={data} />}
        {tab === 'MONEY RECEIPT' && <MoneyReceiptDoc ref={previewRef} d={data} />}
        {tab === 'ID CARD' && <IDCardDoc ref={previewRef} d={data} />}
        {tab === 'APPROVAL' && <ApprovalDoc ref={previewRef} d={data} />}
        {tab === 'CHEQUE' && <ChequeDoc ref={previewRef} d={data} />}
        {tab === 'INSURANCE' && <InsuranceDoc ref={previewRef} d={data} />}
        {tab === 'STAMP' && <StampDoc ref={previewRef} d={data} />}
        {tab === 'CLEARANCE' && <ClearanceDoc ref={previewRef} d={data} />}

        {/* Forms per tab */}
        {tab === 'TRANSACTION' && <TransactionForm d={data} set={set} now={now} dl={downloadPNG} />}
        {tab === 'MONEY RECEIPT' && <MoneyReceiptForm d={data} set={set} dl={downloadPNG} />}
        {tab === 'ID CARD' && <IDCardForm d={data} set={set} dl={downloadPNG} />}
        {tab === 'APPROVAL' && <ApprovalForm d={data} set={set} dl={downloadPNG} />}
        {tab === 'CHEQUE' && <ChequeForm d={data} set={set} dl={downloadPNG} />}
        {tab === 'INSURANCE' && <InsuranceForm d={data} set={set} dl={downloadPNG} />}
        {tab === 'STAMP' && <StampForm d={data} set={set} dl={downloadPNG} />}
        {tab === 'CLEARANCE' && <ClearanceForm d={data} set={set} dl={downloadPNG} />}
      </div>
    </div>
  )
}

// ── TRANSACTION ──
import { forwardRef } from 'react'
const TransactionDoc = forwardRef(({ d }, ref) => (
  <div ref={ref} style={{ width: 520, backgroundColor: '#fff', color: '#111', padding: '28px 32px', fontFamily: 'Arial', border: '1px solid #ccc' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1d4ed8', paddingBottom: 12, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Globe size={36} />
        <div><div style={{ fontWeight: 900, fontSize: 18, color: '#1d4ed8' }}>THE WORLD BANK</div>
          <div style={{ fontSize: 9, color: '#374151' }}>IFC International Finance Corporation · WORLD BANK GROUP</div></div>
      </div>
    </div>
    <div style={{ textAlign: 'center', marginBottom: 10 }}>
      <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>TRANSACTION SUMMARY</div>
      <div style={{ fontSize: 10, color: '#6b7280' }}>CUSTOMER COPY</div>
    </div>
    {[['Transaction Type','Online Transfer'],['Transaction ID', d.txn_id||''],['Date', d.date||''],['From Bank','The World Bank PLC'],['To Bank', d.to_bank||''],['From Account','2125421254025'],['To Account', d.to_account||''],['Account Name', d.acc_name||''],['Mobile Banking', d.mobile||''],['Amount', d.amount||''],['Depositor Name','World Bank Group'],['Generated Time', d.gen_time||new Date().toLocaleString()]].map(([k,v])=>(
      <div key={k} style={{ display: 'flex', fontSize: 11, padding: '3px 0', borderBottom: '1px dotted #e5e7eb' }}>
        <span style={{ width: 140, color: '#374151' }}>{k}</span>
        <span style={{ marginRight: 8 }}>:</span>
        <span style={{ fontWeight: v ? 600 : 400, color: v ? '#111' : '#9ca3af' }}>{v || '—'}</span>
      </div>
    ))}
  </div>
))

function TransactionForm({ d, set, dl }) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-white font-semibold mb-3 text-sm">Transaction Details</h3>
      <div className="grid grid-cols-2 gap-3">
        {[['txn_id','Transaction ID'],['date','Date'],['to_bank','To Bank'],['to_account','To Account'],['acc_name','Account Name'],['mobile','Mobile Banking'],['amount','Amount (৳)'],['gen_time','Generated Time']].map(([k,ph])=>(
          <input key={k} placeholder={ph} value={d[k]||''} onChange={set(k)} className={inputCls} />
        ))}
      </div>
      <button onClick={dl} className="mt-4 flex items-center gap-2 px-5 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: '#16a34a' }}>
        <FaDownload size={12}/> DOWNLOAD
      </button>
    </div>
  )
}

// ── MONEY RECEIPT ──
const MoneyReceiptDoc = forwardRef(({ d }, ref) => (
  <div ref={ref} style={{ width: 560, backgroundColor: '#fff', color: '#111', fontFamily: 'Arial', border: '1px solid #ccc' }}>
    <div style={{ backgroundColor: '#1d4ed8', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Globe size={32} color="#fff" />
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>WORLD BANK GROUP</div>
      </div>
      <div style={{ color: '#fff', fontWeight: 900, fontSize: 20, letterSpacing: 2 }}>MONEY RECEIPT</div>
      <div style={{ color: '#fff', fontSize: 9, textAlign: 'right' }}>THE WORLD BANK<br/>Plot E, 32 Syed Mahbub Morshed<br/>Avenue, Dhaka 1207, Bangladesh</div>
    </div>
    <div style={{ backgroundColor: '#f59e0b', height: 8 }} />
    <div style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d1d5db', paddingBottom: 8, marginBottom: 12, fontSize: 11 }}>
        <span>NO ............</span><span>Date {d.date||'............'}</span>
      </div>
      <div style={{ fontSize: 11, lineHeight: 2.2 }}>
        <div>Received with thanks from <span style={{ borderBottom: '1px dotted #374151', minWidth: 200, display: 'inline-block' }}>{d.received_from||''}</span></div>
        <div>Amount <span style={{ borderBottom: '1px dotted #374151', minWidth: 220, display: 'inline-block' }}>{d.amount ? `৳${d.amount}` : ''}</span></div>
        <div>In word <span style={{ borderBottom: '1px dotted #374151', minWidth: 220, display: 'inline-block' }}>{d.in_word||''}</span></div>
        <div>For <span style={{ borderBottom: '1px dotted #374151', minWidth: 240, display: 'inline-block' }}>{d.for_field||''}</span></div>
        <div>ACCT.{d.acct||'............'} &nbsp;&nbsp; PAID {d.paid||'............'}</div>
      </div>
      <div style={{ textAlign: 'right', marginTop: 16, fontSize: 10, color: '#6b7280' }}>Authorized Signature</div>
    </div>
    <div style={{ backgroundColor: '#f59e0b', height: 8 }} />
  </div>
))
function MoneyReceiptForm({ d, set, dl }) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-white font-semibold mb-3 text-sm">Receipt Details</h3>
      <div className="grid grid-cols-2 gap-3">
        {[['receipt_no','Receipt No'],['date','Date'],['received_from','Received From'],['amount','Amount'],['in_word','In Word'],['for_field','For'],['acct','ACCT'],['paid','Paid'],['center_date','Center Date (e.g. 22 JUN 2025)']].map(([k,ph])=>(
          <input key={k} placeholder={ph} value={d[k]||''} onChange={set(k)} className={inputCls} />
        ))}
      </div>
      <button onClick={dl} className="mt-4 flex items-center gap-2 px-5 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: '#16a34a' }}>
        <FaDownload size={12}/> DOWNLOAD
      </button>
    </div>
  )
}

// ── ID CARD ──
const IDCardDoc = forwardRef(({ d }, ref) => (
  <div ref={ref} style={{ width: 300, backgroundColor: '#fff', color: '#111', fontFamily: 'Arial', borderRadius: 12, overflow: 'hidden', border: '1px solid #ccc' }}>
    <div style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', padding: '20px 16px', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
        <Globe size={28} color="#fff" /><div style={{ color: '#fff', fontWeight: 900, fontSize: 14 }}>THE WORLD BANK<br/><span style={{ fontSize: 10, fontWeight: 400 }}>BANGLADESH LOAN</span></div>
      </div>
      <div style={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid #7c3aed', margin: '0 auto', overflow: 'hidden', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {d.photo ? <img src={d.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <svg viewBox="0 0 100 60" width="100" height="60"><rect width="100" height="60" fill="#bae6fd"/><ellipse cx="50" cy="55" rx="45" ry="30" fill="#86efac"/><circle cx="50" cy="25" r="20" fill="#fff"/></svg>}
      </div>
    </div>
    <div style={{ padding: 16, textAlign: 'center' }}>
      <div style={{ letterSpacing: 1, fontSize: 12, color: '#6b7280', marginBottom: 8 }}>• • •</div>
      <div style={{ backgroundColor: '#dc2626', color: '#fff', borderRadius: 20, padding: '4px 20px', display: 'inline-block', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Customer Service</div>
      <div style={{ fontSize: 11, textAlign: 'left', lineHeight: 2 }}>
        <div>ID No : {d.id_no||'....'}</div>
        <div>E-mail : {d.email||'@wblb.org'}</div>
        <div>Phone : {d.phone||'+19638106840'}</div>
      </div>
    </div>
  </div>
))
function IDCardForm({ d, set, dl }) {
  return (
    <div className="w-full max-w-lg">
      <h3 className="text-white font-semibold mb-3 text-sm">ID Card Details</h3>
      <div className="grid grid-cols-2 gap-3">
        {[['id_no','ID No'],['email','Email'],['phone','Phone']].map(([k,ph])=>(
          <input key={k} placeholder={ph} value={d[k]||''} onChange={set(k)} className={inputCls} />
        ))}
      </div>
      <button onClick={dl} className="mt-4 flex items-center gap-2 px-5 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: '#16a34a' }}>
        <FaDownload size={12}/> DOWNLOAD
      </button>
    </div>
  )
}

// ── APPROVAL ──
const ApprovalDoc = forwardRef(({ d }, ref) => (
  <div ref={ref} style={{ width: 560, backgroundColor: '#fff', color: '#111', fontFamily: 'Arial', border: '1px solid #ccc' }}>
    <div style={{ background: 'linear-gradient(90deg,#1d4ed8,#3730a3)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Globe size={44} color="#fff" />
        <div style={{ color: '#fff' }}><div style={{ fontWeight: 900, fontSize: 22 }}>THE WORLD BANK</div><div style={{ fontSize: 12, color: '#bfdbfe' }}>Loan Bangladesh</div></div>
      </div>
      <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 24 24" width="24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M5 12l5 5L20 7"/></svg>
      </div>
    </div>
    <div style={{ padding: '24px 32px', position: 'relative' }}>
      <div style={{ textAlign: 'center', fontWeight: 900, fontSize: 17, marginBottom: 24, fontFamily: 'Georgia' }}>Bank Loan Approval Letter</div>
      <div style={{ position: 'absolute', right: 32, top: 60, border: '2px solid #ef4444', color: '#ef4444', padding: '6px 10px', fontSize: 11, fontWeight: 700, transform: 'rotate(-10deg)', opacity: 0.7 }}>LOAN APPROVED</div>
      {[['Application Date', d.app_date||''],['Customer Name', d.cust_name||''],['NID Number', d.nid||'']].map(([k,v])=>(
        <div key={k} style={{ display: 'flex', fontSize: 12, padding: '5px 0', borderBottom: '1px solid #f3f4f6' }}>
          <span style={{ width: 160 }}>{k}</span><span style={{ marginRight: 8 }}>:</span><span style={{ fontWeight: 600 }}>{v}</span>
        </div>
      ))}
      <div style={{ marginTop: 16, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Loan Details</div>
      {[['Loan Amount', d.amount ? `${d.amount} TK` : 'TK'],['Loan Term', d.duration ? `${d.duration} Months` : 'Months'],['Interest Rate', d.rate ? `${d.rate}%` : '0.2%'],['Installment', d.installment ? `${d.installment} TK` : 'TK']].map(([k,v])=>(
        <div key={k} style={{ display: 'flex', fontSize: 12, padding: '5px 0', borderBottom: '1px solid #f3f4f6' }}>
          <span style={{ width: 160 }}>{k}</span><span style={{ marginRight: 8 }}>:</span><span style={{ fontWeight: 600 }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
))
function ApprovalForm({ d, set, dl }) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-white font-semibold mb-3 text-sm">Approval Details</h3>
      <div className="grid grid-cols-2 gap-3">
        {[['app_date','Application Date'],['cust_name','Customer Name'],['nid','NID Number'],['amount','Loan Amount (TK)'],['duration','Loan Term (Months)'],['rate','Interest Rate (%)'],['installment','Installment (TK)']].map(([k,ph])=>(
          <input key={k} placeholder={ph} value={d[k]||''} onChange={set(k)} className={inputCls} />
        ))}
      </div>
      <button onClick={dl} className="mt-4 flex items-center gap-2 px-5 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: '#16a34a' }}>
        <FaDownload size={12}/> DOWNLOAD
      </button>
    </div>
  )
}

// ── CHEQUE ──
const ChequeDoc = forwardRef(({ d }, ref) => (
  <div ref={ref} style={{ width: 560, fontFamily: 'Arial', border: '1px solid #ccc' }}>
    <div style={{ background: '#1d4ed8', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <Globe size={32} color="#fff" />
      <div style={{ color: '#fff' }}><div style={{ fontWeight: 900, fontSize: 16 }}>THE WORLD BANK</div><div style={{ fontSize: 10 }}>Bangladesh</div></div>
    </div>
    <div style={{ backgroundColor: '#dbeafe', padding: '20px 24px', minHeight: 120 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12, fontSize: 11, color: '#1d4ed8' }}>
        DATE <span style={{ borderBottom: '1px solid #1d4ed8', minWidth: 100, display: 'inline-block', marginLeft: 8 }}>{d.chq_date||''}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 11, color: '#1d4ed8' }}>
        <span>PAY</span>
        <span style={{ flex: 1, borderBottom: '1px solid #1d4ed8' }}>{d.pay_to||''}</span>
        <span>৳</span>
        <span style={{ border: '1px solid #1d4ed8', minWidth: 80, padding: '2px 8px' }}>{d.chq_amount||''}</span>
      </div>
      <div style={{ fontSize: 11, color: '#1d4ed8', marginBottom: 8 }}>TO THE ORDER OF <span style={{ borderBottom: '1px solid #1d4ed8', minWidth: 180, display: 'inline-block', marginLeft: 8 }}>{d.order_of||''}</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontSize: 11 }}>
        <div style={{ color: '#1d4ed8' }}>RE The World Bank</div>
        <div style={{ color: '#1d4ed8', fontSize: 10 }}>PAYER'S SIGNATURE <span style={{ fontFamily: 'cursive', fontSize: 16 }}>ℒℬ</span></div>
      </div>
      <div style={{ color: '#1d4ed8', fontWeight: 900, fontSize: 16, letterSpacing: 4, marginTop: 12 }}>|: 104288 :|8557449</div>
    </div>
  </div>
))
function ChequeForm({ d, set, dl }) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-white font-semibold mb-3 text-sm">Cheque Details</h3>
      <div className="grid grid-cols-2 gap-3">
        {[['chq_date','Date'],['pay_to','Pay to'],['chq_amount','Amount'],['order_of','To The Order Of']].map(([k,ph])=>(
          <input key={k} placeholder={ph} value={d[k]||''} onChange={set(k)} className={inputCls} />
        ))}
      </div>
      <button onClick={dl} className="mt-4 flex items-center gap-2 px-5 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: '#16a34a' }}>
        <FaDownload size={12}/> DOWNLOAD
      </button>
    </div>
  )
}

// ── INSURANCE ──
const InsuranceDoc = forwardRef(({ d }, ref) => (
  <div ref={ref} style={{ width: 420, backgroundColor: '#fff', color: '#111', fontFamily: 'Arial', border: '1px solid #ccc', padding: '0 0 20px' }}>
    <div style={{ backgroundColor: '#38bdf8', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 900, fontSize: 22, color: '#fff' }}>জীবন বীমা</div>
      <div style={{ width: 60, height: 70, border: '1px solid #ccc', backgroundColor: '#f9fafb' }}></div>
    </div>
    <div style={{ padding: '16px 20px', fontSize: 12, lineHeight: 2.2 }}>
      {[['নাম', d.ins_name||''],['পিতার নাম', d.father||''],['মাতার নাম', d.mother||''],['সাং', d.village||''],['পোস্ট', d.post||''],['থানা', d.thana||''],['জেলা', d.district||''],['জাতীয় পরিচয় পত্র', d.nid||'']].map(([k,v])=>(
        <div key={k} style={{ display: 'flex' }}><span style={{ width: 130 }}>{k}</span><span style={{ marginRight: 8 }}>:</span><span style={{ fontWeight: v ? 600 : 400 }}>{v||''}</span></div>
      ))}
      <div style={{ marginTop: 16, fontSize: 11, color: '#374151', borderTop: '1px solid #e5e7eb', paddingTop: 12 }}>
        বীমা হল অর্থের বিনিময়ে জীবন, সম্পদ বা মালামালের সম্ভাব্য ক্ষতিপূতির ন্যায়সঙ্গত ও নির্দিষ্ট ঝুঁকি স্থানান্তর।
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, alignItems: 'flex-end' }}>
        <div style={{ fontSize: 10, color: '#6b7280' }}>https://idra.org.bd</div>
        <div style={{ textAlign: 'right', fontSize: 10 }}>
          <div style={{ fontFamily: 'cursive', fontSize: 18 }}>Sobhan</div>
          <div>Authorization Signature</div>
        </div>
      </div>
    </div>
  </div>
))
function InsuranceForm({ d, set, dl }) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-white font-semibold mb-3 text-sm">Insurance Details</h3>
      <div className="grid grid-cols-2 gap-3">
        {[['ins_name','নাম'],['father','পিতার নাম'],['mother','মাতার নাম'],['village','সাং'],['post','পোস্ট'],['thana','থানা'],['district','জেলা'],['nid','জাতীয় পরিচয় পত্র']].map(([k,ph])=>(
          <input key={k} placeholder={ph} value={d[k]||''} onChange={set(k)} className={inputCls} />
        ))}
      </div>
      <button onClick={dl} className="mt-4 flex items-center gap-2 px-5 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: '#16a34a' }}>
        <FaDownload size={12}/> DOWNLOAD
      </button>
    </div>
  )
}

// ── STAMP ──
const StampDoc = forwardRef(({ d }, ref) => (
  <div ref={ref} style={{ width: 560, backgroundColor: '#f5f0e8', color: '#111', fontFamily: 'serif', border: '4px double #2d6a6a', padding: 20 }}>
    <div style={{ border: '2px solid #2d6a6a', padding: '12px 20px', textAlign: 'center', marginBottom: 12 }}>
      <div style={{ fontSize: 11, color: '#2d6a6a', marginBottom: 4 }}>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ border: '2px solid #2d6a6a', padding: '8px 20px', fontSize: 16, fontWeight: 900, color: '#2d6a6a' }}>৳১০০</div>
        <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #2d6a6a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>⚘</div>
        <div style={{ border: '2px solid #2d6a6a', padding: '8px 20px', fontSize: 16, fontWeight: 900, color: '#2d6a6a' }}>৳১০০</div>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: '#2d6a6a', fontWeight: 700 }}>একশত টাকা</div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
      <div style={{ fontSize: 11, color: '#374151' }}>ঋণ {d.loan_no||'৪৫৮১১৭৮'}</div>
      <div style={{ fontWeight: 900, fontSize: 18 }}>ঋণের চুক্তিপত্র</div>
      <div style={{ width: 70, height: 80, border: '1px solid #ccc', backgroundColor: d.photo2 ? 'transparent' : '#f9fafb' }}>
        {d.photo2 && <img src={d.photo2} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
      </div>
    </div>
    <div style={{ fontSize: 12, lineHeight: 2.2 }}>
      {[['ঋণ গ্রহীতার নাম', d.stamp_name||''],['এনআইডি নম্বর', d.stamp_nid||''],['আবেদনের তারিখ', d.stamp_date||''],['ঋণের পরিমাণ', d.stamp_amount ? `৳${d.stamp_amount}` : ''],['ঋণের মেয়াদ', d.stamp_duration ? `${d.stamp_duration} মাস` : ''],['মাসিক কিস্তি', d.stamp_installment ? `৳${d.stamp_installment}` : '']].map(([k,v])=>(
        <div key={k} style={{ display: 'flex' }}><span style={{ width: 160 }}>{k}</span><span style={{ marginRight: 8 }}>:</span><span style={{ fontWeight: v ? 600 : 400 }}>{v||''}</span></div>
      ))}
    </div>
    <div style={{ marginTop: 16, fontWeight: 700, textAlign: 'center', fontSize: 14 }}>গুরুত্বপূর্ণ তথ্য ও শর্তাবলী</div>
    <div style={{ fontSize: 11, marginTop: 8, lineHeight: 1.8 }}>
      আমি {d.stamp_name||''}, পিতা - {d.father_stamp||''}, সাং - {d.address_stamp||''}। আমাকে <strong>বিশ্ব ব্যাংক ঋণ বাংলাদেশ</strong> {d.stamp_amount||''} টাকা, {d.stamp_duration||''} মাস মেয়াদি, প্রতিমাসে {d.stamp_installment||''} টাকা কিস্তির ঋণ প্রস্তাব করিলে, আমি সকল প্রক্রিয়া সম্পূর্ণ করে ও <strong>বিশ্ব ব্যাংক ঋণ বাংলাদেশ</strong> এর সকল শর্ত মেনে ঋণটি নিতে রাজি হয়েছি।
    </div>
    <div style={{ textAlign: 'center', marginTop: 12, fontStyle: 'italic', fontSize: 13, fontWeight: 700, color: '#1d4ed8' }}>
      "দেশপ্রেমের শপথ নিন, দুনীতিকে বিদায় দিন"
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
      <div style={{ border: '2px solid #dc2626', color: '#dc2626', padding: '4px 12px', fontSize: 11, fontWeight: 700, transform: 'rotate(-5deg)' }}>LOAN APPROVED</div>
    </div>
  </div>
))
function StampForm({ d, set, dl }) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-white font-semibold mb-3 text-sm">Stamp Details</h3>
      <div className="grid grid-cols-2 gap-3">
        {[['stamp_name','Name'],['stamp_nid','ID No'],['stamp_date','Date (dd/mm/yyyy)'],['stamp_amount','Amount'],['stamp_duration','Duration (months)'],['stamp_installment','Installment'],['father_stamp',"Father's Name"],['address_stamp','Address'],['loan_no','Loan No']].map(([k,ph])=>(
          <input key={k} placeholder={ph} value={d[k]||''} onChange={set(k)} className={inputCls} />
        ))}
      </div>
      <button onClick={dl} className="mt-4 flex items-center gap-2 px-5 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: '#16a34a' }}>
        <FaDownload size={12}/> DOWNLOAD
      </button>
    </div>
  )
}

// ── CLEARANCE ──
const ClearanceDoc = forwardRef(({ d }, ref) => (
  <div ref={ref} style={{ width: 480, backgroundColor: '#fff', color: '#111', fontFamily: 'Arial', border: '1px solid #ccc', padding: 24 }}>
    <div style={{ textAlign: 'center', marginBottom: 12 }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid #dc2626', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🇧🇩</div>
      <div style={{ fontWeight: 900, fontSize: 13 }}>GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH</div>
      <div style={{ fontSize: 11, marginTop: 4 }}>POLICE STATION</div>
      <div style={{ fontSize: 11 }}>DISTRICT</div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 11 }}>
      <div>Report No: 24589</div>
      <div>Date: {d.cl_date||''}</div>
    </div>
    <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 12, marginBottom: 12 }}>POLICE CLEARANCE CERTIFICATE</div>
    <div style={{ fontSize: 11, lineHeight: 1.9, marginBottom: 16 }}>
      Hereby after verification it is found that Mr/Mrs. <strong>{d.cl_name||''}</strong> (DOB: {d.cl_dob||''}) is not involved in any illegal activities. No report has been received against him or any crime has been detected in the last three months. He is not involved in any criminal activities and let's hope he doesn't get involved in any criminal activities in the future.
      <br/><br/>
      As per our verification report he is able to repay the loan, so you can give him this Loan from The World Bank.
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
      <div style={{ border: '3px solid #dc2626', color: '#dc2626', padding: '6px 12px', fontWeight: 900, fontSize: 13, borderRadius: 4, transform: 'rotate(-10deg)' }}>POLICE<br/>INVESTIGATION</div>
      <div style={{ textAlign: 'center', fontSize: 10 }}>
        <div style={{ fontFamily: 'cursive', fontSize: 20 }}>Hassan</div>
        <div>SIGNATURE OF<br/>OFFICER IN CHARGE</div>
      </div>
    </div>
    <div style={{ border: '1px solid #374151', padding: '4px 12px', textAlign: 'center', fontSize: 10, marginTop: 12 }}>
      This certificate is issued from the office of the superintendent of police.
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, marginTop: 8, color: '#6b7280' }}>
      <span>B.G.P</span><span>-3296 offset-10,001 pad.</span>
    </div>
  </div>
))
function ClearanceForm({ d, set, dl }) {
  return (
    <div className="w-full max-w-lg">
      <h3 className="text-white font-semibold mb-3 text-sm">Clearance Details</h3>
      <div className="grid grid-cols-1 gap-3">
        {[['cl_model','Model'],['cl_district','District'],['cl_date','Date'],['cl_name','Name'],['cl_dob','Date Of Birth'],['cl_bgp','B.G.P Field'],['cl_bgp2','B.G.P Field 2']].map(([k,ph])=>(
          <input key={k} placeholder={ph} value={d[k]||''} onChange={set(k)} className={inputCls} />
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={dl} className="flex items-center gap-2 px-4 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: '#16a34a' }}>
          <FaDownload size={12}/> DOWNLOAD CLEARANCE PNG
        </button>
        <button onClick={dl} className="flex items-center gap-2 px-4 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: '#f59e0b' }}>
          SAVE CLEARANCE TO SERVER
        </button>
      </div>
    </div>
  )
}
