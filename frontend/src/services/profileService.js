import apiClient from './apiClient';

export const profileService = {
  getMyProfile: () => apiClient.get('/profile'),
  updateProfile: (data) => apiClient.put('/profile', data),
  uploadAvatar: (formData) => apiClient.post('/profile/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
