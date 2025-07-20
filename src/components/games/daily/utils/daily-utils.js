/**
 * Daily Content Utilities
 * Utilidades para el sistema de contenido histórico diario
 * @created 2024-12-19
 */

import {
  CONTENT_CONFIG,
  MONTHS,
  FAVORITES_CONFIG,
  STREAK_CONFIG,
  MOTIVATIONAL_MESSAGES,
  CONTENT_FILTERS,
  FILTER_CONFIG,
} from "../constants/daily-constants.js";

/**
 * Formatear año para mostrar a.C. o d.C.
 */
export const formatYear = (year) => {
  if (year < 0) {
    return `${Math.abs(year)} a.C.`;
  }
  if (year < 100) {
    return `${year} d.C.`;
  }
  return year.toString();
};

/**
 * Formatear fecha para mostrar
 */
export const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return {
    day,
    month,
    year,
    monthName: MONTHS[month]?.name || "",
    monthShort: MONTHS[month]?.short || "",
    formatted: `${day} de ${MONTHS[month]?.name || ""} de ${year}`,
    dateKey: `${month}-${day}`,
  };
};

/**
 * Obtener configuración de tipo de contenido
 */
export const getContentTypeConfig = (type) => {
  return CONTENT_CONFIG[type] || CONTENT_CONFIG.event;
};

/**
 * Obtener colores y estilos para un tipo de contenido
 */
export const getContentStyles = (type) => {
  const config = getContentTypeConfig(type);
  return {
    gradient: `bg-gradient-to-br ${config.color}`,
    bgColor: config.bgColor,
    borderColor: config.borderColor,
    textColor: config.textColor,
    icon: config.icon,
    prefix: config.prefix,
  };
};

/**
 * Calcular diferencia de tiempo relativa
 */
export const getTimeAgo = (year) => {
  const currentYear = new Date().getFullYear();
  const yearsDiff = currentYear - year;

  if (yearsDiff === 0) return "Este año";
  if (yearsDiff === 1) return "Hace un año";
  if (yearsDiff < 10) return `Hace ${yearsDiff} años`;
  if (yearsDiff < 100) return `Hace ${Math.floor(yearsDiff / 10) * 10}+ años`;
  if (yearsDiff < 1000) return `Hace ${Math.floor(yearsDiff / 100)} siglos`;

  return `Hace más de ${Math.floor(yearsDiff / 1000)} milenios`;
};

/**
 * Filtrar contenido por tipo
 */
export const filterContentByType = (content, filter) => {
  if (filter === CONTENT_FILTERS.ALL) {
    return content;
  }

  const filterConfig = FILTER_CONFIG[filter];
  if (!filterConfig) return content;

  return content.filter((item) => filterConfig.types.includes(item.type));
};

/**
 * Obtener contenido de fechas similares (mismo día en diferentes años)
 */
export const getSimilarDateContent = (
  allContent,
  month,
  day,
  excludeYear = null
) => {
  return allContent.filter((item) => {
    const itemDate = new Date(Math.abs(item.year), month - 1, day);
    const targetDate = new Date(2024, month - 1, day);

    return (
      itemDate.getMonth() === targetDate.getMonth() &&
      itemDate.getDate() === targetDate.getDate() &&
      (excludeYear === null || item.year !== excludeYear)
    );
  });
};

/**
 * Gestión de favoritos en localStorage
 */
export const favoritesUtils = {
  // Obtener favoritos del localStorage
  getFavorites: () => {
    try {
      const favorites = localStorage.getItem(FAVORITES_CONFIG.STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      return [];
    }
  },

  // Guardar favoritos en localStorage
  saveFavorites: (favorites) => {
    try {
      localStorage.setItem(
        FAVORITES_CONFIG.STORAGE_KEY,
        JSON.stringify(favorites)
      );
      return true;
    } catch (error) {
      console.error("Error al guardar favoritos:", error);
      return false;
    }
  },

  // Agregar a favoritos
  addFavorite: (contentId) => {
    const favorites = favoritesUtils.getFavorites();
    if (
      !favorites.includes(contentId) &&
      favorites.length < FAVORITES_CONFIG.MAX_FAVORITES
    ) {
      favorites.push(contentId);
      return favoritesUtils.saveFavorites(favorites);
    }
    return false;
  },

  // Remover de favoritos
  removeFavorite: (contentId) => {
    const favorites = favoritesUtils.getFavorites();
    const newFavorites = favorites.filter((id) => id !== contentId);
    return favoritesUtils.saveFavorites(newFavorites);
  },

  // Verificar si está en favoritos
  isFavorite: (contentId) => {
    const favorites = favoritesUtils.getFavorites();
    return favorites.includes(contentId);
  },

  // Alternar favorito
  toggleFavorite: (contentId) => {
    if (favoritesUtils.isFavorite(contentId)) {
      return favoritesUtils.removeFavorite(contentId);
    } else {
      return favoritesUtils.addFavorite(contentId);
    }
  },
};

/**
 * Gestión de historial de visitas
 */
export const historyUtils = {
  // Obtener historial
  getHistory: () => {
    try {
      const history = localStorage.getItem(FAVORITES_CONFIG.HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error("Error al obtener historial:", error);
      return [];
    }
  },

  // Agregar al historial
  addToHistory: (contentId, date = new Date()) => {
    const history = historyUtils.getHistory();
    const entry = {
      contentId,
      date: date.toISOString(),
      timestamp: Date.now(),
    };

    // Evitar duplicados del mismo día
    const existingEntry = history.find(
      (h) =>
        h.contentId === contentId &&
        new Date(h.date).toDateString() === date.toDateString()
    );

    if (!existingEntry) {
      history.unshift(entry);
      // Limitar a las últimas 100 entradas
      const limitedHistory = history.slice(0, 100);

      try {
        localStorage.setItem(
          FAVORITES_CONFIG.HISTORY_KEY,
          JSON.stringify(limitedHistory)
        );
        return true;
      } catch (error) {
        console.error("Error al guardar historial:", error);
        return false;
      }
    }

    return false;
  },

  // Obtener historial de los últimos días
  getRecentHistory: (days = 7) => {
    const history = historyUtils.getHistory();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return history.filter((entry) => new Date(entry.date) >= cutoffDate);
  },
};

/**
 * Gestión de streaks (rachas de días consecutivos)
 */
export const streakUtils = {
  // Obtener streak actual
  getStreak: () => {
    try {
      const streak = localStorage.getItem(FAVORITES_CONFIG.STREAK_KEY);
      return streak ? parseInt(streak, 10) : 0;
    } catch (error) {
      console.error("Error al obtener streak:", error);
      return 0;
    }
  },

  // Obtener última visita
  getLastVisit: () => {
    try {
      const lastVisit = localStorage.getItem(FAVORITES_CONFIG.LAST_VISIT_KEY);
      return lastVisit ? new Date(lastVisit) : null;
    } catch (error) {
      console.error("Error al obtener última visita:", error);
      return null;
    }
  },

  // Actualizar streak
  updateStreak: (currentDate = new Date()) => {
    const lastVisit = streakUtils.getLastVisit();
    const currentStreak = streakUtils.getStreak();

    if (!lastVisit) {
      // Primera visita
      streakUtils.saveStreak(1, currentDate);
      return 1;
    }

    const daysDiff = Math.floor(
      (currentDate - lastVisit) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 1) {
      // Día consecutivo
      const newStreak = currentStreak + 1;
      streakUtils.saveStreak(newStreak, currentDate);
      return newStreak;
    } else if (daysDiff === 0) {
      // Mismo día
      streakUtils.saveLastVisit(currentDate);
      return currentStreak;
    } else if (daysDiff > STREAK_CONFIG.STREAK_RESET_HOURS / 24) {
      // Streak roto
      streakUtils.saveStreak(1, currentDate);
      return 1;
    }

    return currentStreak;
  },

  // Guardar streak
  saveStreak: (streak, date = new Date()) => {
    try {
      localStorage.setItem(FAVORITES_CONFIG.STREAK_KEY, streak.toString());
      localStorage.setItem(FAVORITES_CONFIG.LAST_VISIT_KEY, date.toISOString());
      return true;
    } catch (error) {
      console.error("Error al guardar streak:", error);
      return false;
    }
  },

  // Guardar última visita
  saveLastVisit: (date = new Date()) => {
    try {
      localStorage.setItem(FAVORITES_CONFIG.LAST_VISIT_KEY, date.toISOString());
      return true;
    } catch (error) {
      console.error("Error al guardar última visita:", error);
      return false;
    }
  },
};

/**
 * Obtener mensaje motivacional basado en el streak
 */
export const getMotivationalMessage = (streak) => {
  let messageCategory;

  if (streak === 0) {
    messageCategory = MOTIVATIONAL_MESSAGES.FIRST_TIME;
  } else if (streak <= 6) {
    messageCategory = MOTIVATIONAL_MESSAGES.STREAK_1_6;
  } else if (streak <= 29) {
    messageCategory = MOTIVATIONAL_MESSAGES.STREAK_7_29;
  } else if (streak <= 99) {
    messageCategory = MOTIVATIONAL_MESSAGES.STREAK_30_99;
  } else {
    messageCategory = MOTIVATIONAL_MESSAGES.STREAK_100_PLUS;
  }

  const randomIndex = Math.floor(Math.random() * messageCategory.length);
  return messageCategory[randomIndex];
};

/**
 * Verificar si se debe mostrar un logro
 */
export const checkAchievements = (
  streak,
  favoritesCount,
  visitedTypes = []
) => {
  const achievements = [];

  if (streak === 1) achievements.push("first_visit");
  if (streak === 7) achievements.push("week_streak");
  if (streak === 30) achievements.push("month_streak");
  if (streak === 100) achievements.push("century_streak");
  if (favoritesCount === 10) achievements.push("favorite_collector");

  return achievements;
};

/**
 * Generar un resumen del contenido
 */
export const generateContentSummary = (content) => {
  return {
    totalItems: content.length,
    byType: content.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {}),
    yearRange: {
      earliest: Math.min(...content.map((item) => item.year)),
      latest: Math.max(...content.map((item) => item.year)),
    },
    periods: [...new Set(content.map((item) => item.period))],
  };
};

/**
 * Buscar contenido por texto
 */
export const searchInContent = (content, searchTerm) => {
  if (!searchTerm.trim()) return content;

  const term = searchTerm.toLowerCase();
  return content.filter(
    (item) =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      (item.name && item.name.toLowerCase().includes(term)) ||
      item.period.toLowerCase().includes(term) ||
      item.keyFacts.some((fact) => fact.toLowerCase().includes(term))
  );
};

/**
 * Ordenar contenido por diferentes criterios
 */
export const sortContent = (content, sortBy = "year") => {
  const sorted = [...content];

  switch (sortBy) {
    case "year":
      return sorted.sort((a, b) => a.year - b.year);
    case "year_desc":
      return sorted.sort((a, b) => b.year - a.year);
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "type":
      return sorted.sort((a, b) => a.type.localeCompare(b.type));
    default:
      return sorted;
  }
};

/**
 * Validar estructura de contenido
 */
export const validateContent = (content) => {
  const requiredFields = ["id", "type", "year", "title", "description"];

  return content.filter((item) => {
    const isValid = requiredFields.every((field) => item.hasOwnProperty(field));
    if (!isValid) {
      console.warn("Contenido inválido:", item);
    }
    return isValid;
  });
};
