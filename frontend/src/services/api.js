import axios from 'axios';
import { auth } from './firebase';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Add Firebase auth token if available
    if (auth && auth.currentUser) {
      try {
        const token = await auth.currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error getting Firebase token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on authentication error
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  verifyToken: (token) => api.post('/auth/verify', { token }),
  getCurrentUser: () => api.get('/auth/me'),
  checkHealth: () => api.get('/auth/health'),
};

// Applications API
export const applicationsAPI = {
  submit: (data) => api.post('/applications/submit', data),
  getAll: () => api.get('/applications'),
  getById: (id) => api.get(`/applications/${id}`),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),
  delete: (id) => api.delete(`/applications/${id}`),
};

// Blog API
export const blogAPI = {
  getAll: (params) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  getAllAdmin: () => api.get('/blog/admin/all'),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
  getCategories: () => api.get('/blog/meta/categories'),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact/submit', data),
  getAll: () => api.get('/contact'),
  getById: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, status) => api.patch(`/contact/${id}/status`, { status }),
  delete: (id) => api.delete(`/contact/${id}`),
};

// Stats API
export const statsAPI = {
  get: () => api.get('/stats'),
};

export default api;
