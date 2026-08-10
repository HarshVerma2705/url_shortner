import apiClient from './api.client';

export const urlService = {
  createShortUrl: (url, slug) => 
    apiClient.post('/api/create/', { url, slug }),

  getMyUrls: () => 
    apiClient.get('/api/user/urls'),
};