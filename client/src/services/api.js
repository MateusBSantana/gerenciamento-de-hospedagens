import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json', // Isso é apropriado para enviar JSON
  },
});

// Exportação padrão
export default api;
