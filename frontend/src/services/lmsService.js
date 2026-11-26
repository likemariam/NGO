import apiClient from './apiClient';

export const lmsService = {
  // Materials
  getMaterials: () => apiClient.get('/materials'),
  getMaterial: (id) => apiClient.get(`/materials/${id}`),
  uploadMaterial: (formData) => apiClient.post('/materials', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateMaterial: (id, data) => apiClient.put(`/materials/${id}`, data),
  deleteMaterial: (id) => apiClient.delete(`/materials/${id}`),

  // Videos
  getVideos: () => apiClient.get('/videos'),
  getVideo: (id) => apiClient.get(`/videos/${id}`),

  // Questionnaires
  getQuestionnaires: () => apiClient.get('/questionnaires'),
  createQuestionnaire: (data) => apiClient.post('/questionnaires', data),

  // Quizzes
  getQuizzes: () => apiClient.get('/quizzes'),
  getQuiz: (id) => apiClient.get(`/quizzes/${id}`),
  createQuiz: (data) => apiClient.post('/quizzes', data),
  submitQuiz: (id, answers) => apiClient.post(`/quizzes/${id}/submit`, answers),
  getQuizResults: (id) => apiClient.get(`/quizzes/${id}/results`),
};
