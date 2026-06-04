import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import {
  FaUniversity, FaTachometerAlt, FaFileAlt, FaCreditCard,
  FaBell, FaUser, FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa'

const navItems = [
  { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { path: '/dashboard/apply', icon: <FaFileAlt />, label: 'Apply for Loan' },
  { path: '/dashboard/loans', icon: <FaCreditCard />, label: 'My Loans' },
  { path: '/dashboard/repayments', icon: <FaCreditCard />, label: 'Repayments' },
  { path: '/dashboard/notifications', icon: <FaBell />, label: 'Notifications' },
  { path: '/dashboard/profile', icon: <FaUser />, label: 'Profile' },
]

export default function DashboardLayout() {
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
        fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-blue-700 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-full p-2"><FaUniversity /></div>
            <div className="leading-tight">
              <div className="font-bold text-sm">World Bank Group</div>
              <div className="text-xs text-blue-300">User Dashboard</div>
            </div>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 text-sm transition ${
                  active ? 'bg-blue-700 border-r-4 border-yellow-400 text-white font-semibold' : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`}>
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-yellow-400 text-blue-900 rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-semibold truncate">{user?.name}</div>
              <div className="text-xs text-blue-300 truncate">{user?.phone}</div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-300 hover:text-red-200 transition w-full">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <button className="lg:hidden text-slate-600" onClick={() => setSidebarOpen(true)}>
            <FaBars size={20} />
          </button>
          <div className="text-sm text-slate-500">
            Welcome, <span className="font-semibold text-blue-900">{user?.name}</span>
          </div>
          <Link to="/dashboard/notifications" className="relative text-slate-600 hover:text-blue-700">
            <FaBell size={18} />
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
