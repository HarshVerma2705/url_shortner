import apiClient from './api.client';

export const authService = {
  register: (name, email, password) => 
    apiClient.post('/api/auth/register', { name, email, password }),

  login: (email, password) => 
    apiClient.post('/api/auth/login', { email, password }),

  logout: () => 
    apiClient.post('/api/auth/logout'),

  getMe: () => 
    apiClient.get('/api/auth/me'),
};