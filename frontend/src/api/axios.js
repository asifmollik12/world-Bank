import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
})

// Attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('wbg_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('wbg_token')
      localStorage.removeItem('wbg_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
