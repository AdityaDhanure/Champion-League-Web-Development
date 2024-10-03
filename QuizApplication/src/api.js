// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quizapi.io/api/v1/',
  headers: {
    'X-API-KEY': import.meta.env.VITE_QUIZ_API_KEY, // Access the API key from Vite
  },
});

export default api;
