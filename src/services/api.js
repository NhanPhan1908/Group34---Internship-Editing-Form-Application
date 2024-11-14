import axios from 'axios';

const API_URL = 'your_api_url_here';

export const api = {
  // Auth related
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  logout: () => axios.post(`${API_URL}/logout`),

  // Document related
  getDocuments: () => axios.get(`${API_URL}/documents`),
  uploadDocument: (formData) => axios.post(`${API_URL}/documents`, formData),
  updateDocument: (id, data) => axios.put(`${API_URL}/documents/${id}`, data),

  // Feedback related
  getFeedback: (documentId) => axios.get(`${API_URL}/feedback/${documentId}`),
  submitFeedback: (documentId, feedback) => 
    axios.post(`${API_URL}/feedback/${documentId}`, feedback),
};

export default api; 