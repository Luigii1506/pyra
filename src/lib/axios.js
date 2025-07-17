/**
 * Axios Configuration
 * Sets up axios instance with interceptors for API communication
 * @created 2024-12-19
 */

import axios from "axios";

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para requests - agregar token de autenticación si existe
apiClient.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si está disponible
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejo global de errores
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores globales
    if (error.response?.status === 401) {
      // Token expirado o inválido
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    } else if (error.response?.status === 403) {
      // Acceso prohibido
      console.error("Acceso prohibido:", error.response.data);
    } else if (error.response?.status >= 500) {
      // Error del servidor
      console.error("Error del servidor:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
