import { Outlet } from 'react-router-dom'

// User dashboard uses its own inline navbar + bottom nav per page
export default function DashboardLayout() {
  return (
    <div style={{ fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }}>
      <Outlet />
    </div>
  )
}
