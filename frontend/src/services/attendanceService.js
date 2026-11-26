import apiClient from './apiClient';

export const attendanceService = {
  checkIn: (data) => apiClient.post('/attendance/check-in', data),
  checkOut: (data) => apiClient.post('/attendance/check-out', data),
  getMyHistory: () => apiClient.get('/attendance/my-history'),
  getAllAttendance: (params) => apiClient.get('/attendance', { params }),
  getReports: (params) => apiClient.get('/attendance/reports', { params }),
};
