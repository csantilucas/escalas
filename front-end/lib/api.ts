import axios from "axios";
import Cookies from "js-cookie";
import { env } from "./env";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Garante o envio automático de cookies HTTP-Only do Better Auth
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Interceptor de Requisição: atualiza baseURL dinamicamente e adiciona Bearer Token se disponível
api.interceptors.request.use(
  (config) => {
    config.baseURL = env.NEXT_PUBLIC_API_URL;
    const sessionToken = Cookies.get("better-auth.session_token") || Cookies.get("token");
    if (sessionToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Resposta: captura erros 401 para redirecionamento
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const isLoginRoute = window.location.pathname === "/login";
      if (!isLoginRoute) {
        Cookies.remove("better-auth.session_token", { path: "/" });
        Cookies.remove("token", { path: "/" });
        Cookies.remove("user", { path: "/" });
      }
    }
    return Promise.reject(error);
  }
);

export default api;