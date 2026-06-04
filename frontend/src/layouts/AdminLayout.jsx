import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import {
  FaUniversity, FaTachometerAlt, FaUsers, FaFileAlt,
  FaMoneyBillWave, FaCog, FaSignOutAlt, FaBars, FaTimes, FaLayerGroup
} from 'react-icons/fa'

const navItems = [
  { path: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
  { path: '/admin/applications', icon: <FaFileAlt />, label: 'Applications' },
  { path: '/admin/repayments', icon: <FaMoneyBillWave />, label: 'Repayments' },
  { path: '/admin/loan-plans', icon: <FaLayerGroup />, label: 'Loan Plans' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="p-5 border-b border-slate-700 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-full p-2"><FaUniversity /></div>
            <div>
              <div className="font-bold text-sm">World Bank Group</div>
              <div className="text-xs text-slate-400">Admin Panel</div>
            </div>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 text-sm transition ${
                  active ? 'bg-blue-700 border-r-4 border-yellow-400 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}>
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-600 rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-semibold truncate">{user?.name}</div>
              <div className="text-xs text-slate-400">Administrator</div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition w-full">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <button className="lg:hidden text-slate-600" onClick={() => setSidebarOpen(true)}>
            <FaBars size={20} />
          </button>
          <div className="text-sm font-semibold text-slate-700">Admin Panel</div>
          <div className="text-xs text-slate-500 bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
            ADMIN
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
