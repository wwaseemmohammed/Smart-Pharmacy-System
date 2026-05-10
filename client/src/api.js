import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

// Attach JWT token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('pharmacy_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('pharmacy_token')
      localStorage.removeItem('pharmacy_user')
    }
    return Promise.reject(err)
  }
)

export default api
