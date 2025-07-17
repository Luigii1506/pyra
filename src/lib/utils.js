/**
 * General Utilities
 * Common utility functions used throughout the application
 * @created 2024-12-19
 */

import { RANK_THRESHOLDS, USER_RANKS } from "../constants/app";

/**
 * Formatea una fecha a un string legible
 * @param {Date|string} date - Fecha a formatear
 * @param {string} locale - Configuración regional (default: 'es-ES')
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, locale = "es-ES") => {
  if (!date) return "Fecha no disponible";

  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Formatea un periodo de tiempo (fecha inicio - fecha fin)
 * @param {Date|string} startDate - Fecha de inicio
 * @param {Date|string} endDate - Fecha de fin
 * @returns {string} Periodo formateado
 */
export const formatDateRange = (startDate, endDate) => {
  const start = startDate ? formatDate(startDate) : "Fecha desconocida";
  const end = endDate ? formatDate(endDate) : "Presente";
  return `${start} - ${end}`;
};

/**
 * Calcula la edad o duración entre dos fechas
 * @param {Date|string} birthDate - Fecha de nacimiento
 * @param {Date|string} deathDate - Fecha de muerte (opcional)
 * @returns {number} Edad en años
 */
export const calculateAge = (birthDate, deathDate = null) => {
  if (!birthDate) return null;

  const birth = new Date(birthDate);
  const end = deathDate ? new Date(deathDate) : new Date();

  return Math.floor((end - birth) / (365.25 * 24 * 60 * 60 * 1000));
};

/**
 * Determina el rango de usuario basado en puntos de experiencia
 * @param {number} experiencePoints - Puntos de experiencia del usuario
 * @returns {string} Rango correspondiente
 */
export const getUserRank = (experiencePoints) => {
  for (const [rank, threshold] of Object.entries(RANK_THRESHOLDS)) {
    if (
      experiencePoints >= threshold.min &&
      (threshold.max === null || experiencePoints <= threshold.max)
    ) {
      return rank;
    }
  }
  return USER_RANKS.APRENDIZ;
};

/**
 * Calcula el progreso hacia el siguiente rango
 * @param {number} experiencePoints - Puntos de experiencia actuales
 * @returns {object} Objeto con progreso y siguiente rango
 */
export const getRankProgress = (experiencePoints) => {
  const currentRank = getUserRank(experiencePoints);
  const currentThreshold = RANK_THRESHOLDS[currentRank];

  // Encontrar el siguiente rango
  const ranks = Object.keys(RANK_THRESHOLDS);
  const currentIndex = ranks.indexOf(currentRank);
  const nextRank =
    currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : null;

  if (!nextRank) {
    return {
      currentRank,
      nextRank: null,
      progress: 100,
      pointsToNext: 0,
      pointsInCurrentRank: experiencePoints - currentThreshold.min,
    };
  }

  const nextThreshold = RANK_THRESHOLDS[nextRank];
  const pointsInCurrentRank = experiencePoints - currentThreshold.min;
  const pointsNeededForNext = nextThreshold.min - currentThreshold.min;
  const progress = Math.round(
    (pointsInCurrentRank / pointsNeededForNext) * 100
  );

  return {
    currentRank,
    nextRank,
    progress: Math.min(progress, 100),
    pointsToNext: nextThreshold.min - experiencePoints,
    pointsInCurrentRank,
  };
};

/**
 * Trunca un texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

/**
 * Convierte un string a formato slug (URL-friendly)
 * @param {string} text - Texto a convertir
 * @returns {string} Slug generado
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9 -]/g, "") // Eliminar caracteres especiales
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/-+/g, "-") // Eliminar guiones duplicados
    .trim("-");
};

/**
 * Genera un color aleatorio en formato hexadecimal
 * @returns {string} Color en formato hex
 */
export const generateRandomColor = () => {
  const colors = [
    "#F59E0B",
    "#EF4444",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#F97316",
    "#06B6D4",
    "#84CC16",
    "#EC4899",
    "#6366F1",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Valida si una cadena es un email válido
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calcula la similitud entre dos strings usando distancia de Levenshtein
 * @param {string} str1 - Primera cadena
 * @param {string} str2 - Segunda cadena
 * @returns {number} Porcentaje de similitud (0-100)
 */
export const calculateStringSimilarity = (str1, str2) => {
  if (!str1 || !str2) return 0;

  const matrix = Array(str2.length + 1)
    .fill()
    .map(() => Array(str1.length + 1).fill(0));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1,
        matrix[j][i - 1] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }

  const maxLength = Math.max(str1.length, str2.length);
  const distance = matrix[str2.length][str1.length];
  return Math.round(((maxLength - distance) / maxLength) * 100);
};

/**
 * Debounce function para optimizar búsquedas
 * @param {Function} func - Función a ejecutar
 * @param {number} delay - Delay en milisegundos
 * @returns {Function} Función con debounce aplicado
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Manejo de errores de API
 * @param {Error} error - Error capturado
 * @returns {string} Mensaje de error formateado
 */
export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.response?.status === 404) {
    return "Recurso no encontrado";
  }

  if (error.response?.status === 500) {
    return "Error interno del servidor";
  }

  if (error.message) {
    return error.message;
  }

  return "Ha ocurrido un error inesperado";
};

/**
 * Convierte coordenadas a formato de visualización
 * @param {number} latitude - Latitud
 * @param {number} longitude - Longitud
 * @returns {string} Coordenadas formateadas
 */
export const formatCoordinates = (latitude, longitude) => {
  if (latitude == null || longitude == null)
    return "Coordenadas no disponibles";

  const latDir = latitude >= 0 ? "N" : "S";
  const lngDir = longitude >= 0 ? "E" : "O";

  return `${Math.abs(latitude).toFixed(4)}°${latDir}, ${Math.abs(
    longitude
  ).toFixed(4)}°${lngDir}`;
};

export default {
  formatDate,
  formatDateRange,
  calculateAge,
  getUserRank,
  getRankProgress,
  truncateText,
  slugify,
  generateRandomColor,
  isValidEmail,
  calculateStringSimilarity,
  debounce,
  handleApiError,
  formatCoordinates,
};
