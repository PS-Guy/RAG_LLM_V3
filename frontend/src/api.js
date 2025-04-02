import axios from 'axios';

// Get API key from .env
const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'X-API-Key': API_KEY,
  },
});

export const getConfig = () => api.get('/config');