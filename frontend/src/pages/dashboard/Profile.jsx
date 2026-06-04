import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import { FaUser, FaLock } from 'react-icons/fa'

export default function Profile() {
  const { user, refreshUser } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', address: user?.address || '', nid: user?.nid || '' })
  const [passForm, setPassForm] = useState({ current_password: '', password: '', password_confirmation: '' })
  const [loading, setLoading] = useState(false)
  const [passLoading, setPassLoading] = useState(false)

  const handleProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/profile/update', form)
      await refreshUser()
      toast.success('Profile updated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    setPassLoading(true)
    try {
      await api.post('/profile/password', passForm)
      toast.success('Password changed!')
      setPassForm({ current_password: '', password: '', password_confirmation: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    } finally {
      setPassLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Profile Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 rounded-full p-3"><FaUser className="text-blue-700 text-xl" /></div>
            <h2 className="font-semibold text-blue-900">Personal Information</h2>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-slate-800">{user?.name}</div>
              <div className="text-sm text-slate-500">{user?.email}</div>
              <div className="text-sm text-slate-500">{user?.phone}</div>
            </div>
          </div>

          <form onSubmit={handleProfile} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">NID Number</label>
              <input type="text" value={form.nid} onChange={e => setForm({ ...form, nid: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Address</label>
              <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              {loading && <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
              Save Changes
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 rounded-full p-3"><FaLock className="text-yellow-600 text-xl" /></div>
            <h2 className="font-semibold text-blue-900">Change Password</h2>
          </div>
          <form onSubmit={handlePassword} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Current Password</label>
              <input type="password" value={passForm.current_password}
                onChange={e => setPassForm({ ...passForm, current_password: e.target.value })}
                className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">New Password</label>
              <input type="password" value={passForm.password}
                onChange={e => setPassForm({ ...passForm, password: e.target.value })}
                className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Confirm New Password</label>
              <input type="password" value={passForm.password_confirmation}
                onChange={e => setPassForm({ ...passForm, password_confirmation: e.target.value })}
                className="input-field" required />
            </div>
            <button type="submit" disabled={passLoading} className="btn-primary flex items-center gap-2">
              {passLoading && <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
