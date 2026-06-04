import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import { FaBell, FaCheckDouble } from 'react-icons/fa'

const typeColor = {
  info: 'border-blue-400 bg-blue-50',
  success: 'border-green-400 bg-green-50',
  warning: 'border-yellow-400 bg-yellow-50',
  danger: 'border-red-400 bg-red-50',
}
const typeDot = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/notifications').then(r => setNotifications(r.data)).finally(() => setLoading(false))
  }, [])

  const markAllRead = async () => {
    await api.post('/notifications/read-all')
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
    toast.success('All marked as read')
  }

  const markOne = async (id) => {
    await api.patch(`/notifications/${id}/read`)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
  }

  const unread = notifications.filter(n => !n.is_read).length

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700" /></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Notifications</h1>
          <p className="text-slate-500 text-sm">{unread} unread notification{unread !== 1 ? 's' : ''}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
            <FaCheckDouble /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-100">
          <FaBell className="text-slate-300 text-5xl mx-auto mb-4" />
          <p className="text-slate-400">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id}
              onClick={() => !n.is_read && markOne(n.id)}
              className={`border-l-4 rounded-xl p-4 cursor-pointer transition ${typeColor[n.type]} ${!n.is_read ? 'shadow-sm' : 'opacity-60'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${typeDot[n.type]}`} />
                  <div>
                    <div className={`font-semibold text-sm ${!n.is_read ? 'text-slate-800' : 'text-slate-500'}`}>{n.title}</div>
                    <div className="text-sm text-slate-600 mt-0.5">{n.message}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 whitespace-nowrap">{new Date(n.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
