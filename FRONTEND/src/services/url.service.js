import apiClient from './api.client';

export const urlService = {
    createShortUrl: async (url, slug) => {
        const response = await apiClient.post('/api/create/', { url, slug });
        return response.data;
    },

    getMyUrls: async () => {
        const response = await apiClient.get('/api/user/urls');
        return response.data;
    },
};
