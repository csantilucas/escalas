// src/lib/api.ts
import axios from 'axios';
import Cookies from 'js-cookie';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("Verifique a variável de ambiente NEXT_PUBLIC_API_URL");
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;