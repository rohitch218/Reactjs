import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
// Derive public (non-/api) base for static files like /uploads/**
const PUBLIC_BASE_URL = API_BASE_URL.endsWith('/api')
  ? API_BASE_URL.slice(0, -4)
  : API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export const projectAPI = {
  getAll: (category) => api.get('/projects', { params: { category } }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (projectData, imageFile) => {
    const formData = new FormData()
    formData.append('project', JSON.stringify(projectData))
    if (imageFile) {
      formData.append('image', imageFile)
    }
    return api.post('/projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  update: (id, projectData, imageFile) => {
    const formData = new FormData()
    formData.append('project', JSON.stringify(projectData))
    if (imageFile) {
      formData.append('image', imageFile)
    }
    return api.put(`/projects/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  delete: (id) => api.delete(`/projects/${id}`),
}

export const inquiryAPI = {
  create: (data) => api.post('/inquiries', data),
  getAll: () => api.get('/inquiries'),
  delete: (id) => api.delete(`/inquiries/${id}`),
}

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
}

// Helper to build absolute URLs for public assets returned by backend (e.g., /uploads/..)
export const fileURL = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${PUBLIC_BASE_URL}${path}`
}

export default api

