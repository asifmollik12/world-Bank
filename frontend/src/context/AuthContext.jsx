import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('wbg_user')
    return u ? JSON.parse(u) : null
  })
  const [loading, setLoading] = useState(false)

  const login = async (phone, password) => {
    const res = await api.post('/login', { phone, password })
    localStorage.setItem('wbg_token', res.data.token)
    localStorage.setItem('wbg_user', JSON.stringify(res.data.user))
    setUser(res.data.user)
    return res.data.user
  }

  const register = async (data) => {
    const res = await api.post('/register', data)
    localStorage.setItem('wbg_token', res.data.token)
    localStorage.setItem('wbg_user', JSON.stringify(res.data.user))
    setUser(res.data.user)
    return res.data.user
  }

  const logout = async () => {
    try { await api.post('/logout') } catch {}
    localStorage.removeItem('wbg_token')
    localStorage.removeItem('wbg_user')
    setUser(null)
  }

  const refreshUser = async () => {
    try {
      const res = await api.get('/profile')
      setUser(res.data)
      localStorage.setItem('wbg_user', JSON.stringify(res.data))
    } catch {}
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
