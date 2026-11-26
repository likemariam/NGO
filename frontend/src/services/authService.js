import apiClient from './apiClient';

export const authService = {
  // apiClient interceptor already returns response.data (the envelope).
  // So these return { success, message, data: { token, role, ... } }
  login:          (credentials) => apiClient.post('/auth/login', credentials),
  register:       (data)        => apiClient.post('/auth/register', data),
  forgotPassword: (email)       => apiClient.post('/auth/forgot-password', { email }),
  logout:         ()            => { localStorage.removeItem('token'); localStorage.removeItem('user'); },
};
