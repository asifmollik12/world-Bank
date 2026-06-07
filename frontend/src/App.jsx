import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, AdminRoute, GuestRoute } from './components/ProtectedRoute'

// Layouts
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './layouts/AdminLayout'
import StaffLayout from './layouts/StaffLayout'

// Public pages
import Home from './pages/Home'
import LoanPlans from './pages/LoanPlans'
import Login from './pages/Login'
import Register from './pages/Register'

// User dashboard pages
import Overview from './pages/dashboard/Overview'
import ApplyLoan from './pages/dashboard/ApplyLoan'
import MyLoans from './pages/dashboard/MyLoans'
import Repayments from './pages/dashboard/Repayments'
import Notifications from './pages/dashboard/Notifications'
import Profile from './pages/dashboard/Profile'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminApplications from './pages/admin/AdminApplications'
import AdminUsers from './pages/admin/AdminUsers'
import AdminRepayments from './pages/admin/AdminRepayments'
import AdminLoanPlans from './pages/admin/AdminLoanPlans'

// Staff pages
import StaffDashboard from './pages/staff/StaffDashboard'
import StaffLogin from './pages/staff/StaffLogin'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/loan-plans" element={<PublicLayout><LoanPlans /></PublicLayout>} />

          {/* Guest only */}
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Overview />} />
            <Route path="apply" element={<ApplyLoan />} />
            <Route path="loans" element={<MyLoans />} />
            <Route path="repayments" element={<Repayments />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="repayments" element={<AdminRepayments />} />
            <Route path="loan-plans" element={<AdminLoanPlans />} />
          </Route>

          {/* Staff Panel */}
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff" element={<ProtectedRoute><StaffLayout /></ProtectedRoute>}>
            <Route index element={<StaffDashboard />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={
            <PublicLayout>
              <div className="min-h-screen flex flex-col items-center justify-center text-center py-20">
                <div className="text-8xl font-black text-blue-100 mb-4">404</div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Page Not Found</h2>
                <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            </PublicLayout>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
