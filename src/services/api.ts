import axios from 'axios';

// Configuração global do Axios para comunicação com o backend
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL base do backend
});

export default api;
