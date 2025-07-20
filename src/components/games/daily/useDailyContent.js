/**
 * useDailyContent Hook
 * Hook para manejar el estado del contenido histórico diario
 * @created 2024-12-19
 */

import { useState, useEffect, useCallback } from "react";
import {
  getTodayContent,
  getNearbyContent,
  ALL_CONTENT,
} from "./constants/daily-data.js";
import {
  DEFAULT_CONFIG,
  CONTENT_FILTERS,
  DISPLAY_CONFIG,
} from "./constants/daily-constants.js";
import {
  formatDate,
  filterContentByType,
  favoritesUtils,
  historyUtils,
  streakUtils,
  getMotivationalMessage,
  checkAchievements,
  searchInContent,
  sortContent,
  validateContent,
} from "./utils/daily-utils.js";

const useDailyContent = () => {
  // Estado principal
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayContent, setTodayContent] = useState([]);
  const [allContent] = useState(ALL_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Estados de filtros y búsqueda
  const [activeFilter, setActiveFilter] = useState(DEFAULT_CONFIG.filter);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("year");

  // Estados de favoritos y gamificación
  const [favorites, setFavorites] = useState([]);
  const [streak, setStreak] = useState(0);
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const [recentAchievements, setRecentAchievements] = useState([]);

  // Estados de visualización
  const [activeView, setActiveView] = useState(DISPLAY_CONFIG.DEFAULT_VIEW); // 'today', 'favorites', 'history', 'explore'
  const [expandedContent, setExpandedContent] = useState(null);

  // Inicializar datos al cargar
  useEffect(() => {
    initializeDailyContent();
  }, [currentDate]);

  // Actualizar favoritos cuando cambian
  useEffect(() => {
    const currentFavorites = favoritesUtils.getFavorites();
    setFavorites(currentFavorites);
  }, []);

  /**
   * Inicializar contenido diario
   */
  const initializeDailyContent = useCallback(async () => {
    setIsLoading(true);

    try {
      // Obtener contenido del día actual
      const dateInfo = formatDate(currentDate);
      const content = getTodayContent(currentDate);

      // Si no hay contenido para hoy, obtener contenido cercano
      let finalContent = content;
      if (content.length === 0) {
        finalContent = getNearbyContent(dateInfo.month, dateInfo.day, 2);
      }

      // Validar y limitar contenido
      const validContent = validateContent(finalContent);
      const limitedContent = validContent.slice(
        0,
        DISPLAY_CONFIG.ITEMS_PER_DATE
      );

      setTodayContent(limitedContent);

      // Actualizar streak y gamificación
      updateStreak();

      // Agregar al historial
      if (limitedContent.length > 0) {
        limitedContent.forEach((item) => {
          historyUtils.addToHistory(item.id, currentDate);
        });
      }
    } catch (error) {
      console.error("Error al inicializar contenido diario:", error);
      setTodayContent([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentDate]);

  /**
   * Actualizar streak y mensajes motivacionales
   */
  const updateStreak = useCallback(() => {
    try {
      const newStreak = streakUtils.updateStreak(currentDate);
      setStreak(newStreak);

      // Obtener mensaje motivacional
      const message = getMotivationalMessage(newStreak);
      setMotivationalMessage(message);

      // Verificar logros
      const currentFavorites = favoritesUtils.getFavorites();
      const achievements = checkAchievements(
        newStreak,
        currentFavorites.length
      );

      if (achievements.length > 0) {
        setRecentAchievements((prev) => [...prev, ...achievements]);
        // Limpiar logros después de 5 segundos
        setTimeout(() => {
          setRecentAchievements([]);
        }, 5000);
      }
    } catch (error) {
      console.error("Error al actualizar streak:", error);
    }
  }, [currentDate]);

  /**
   * Alternar favorito
   */
  const toggleFavorite = useCallback((contentId) => {
    try {
      const success = favoritesUtils.toggleFavorite(contentId);
      if (success) {
        const newFavorites = favoritesUtils.getFavorites();
        setFavorites(newFavorites);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al alternar favorito:", error);
      return false;
    }
  }, []);

  /**
   * Verificar si un contenido está en favoritos
   */
  const isFavorite = useCallback(
    (contentId) => {
      return favorites.includes(contentId);
    },
    [favorites]
  );

  /**
   * Obtener contenido de favoritos
   */
  const getFavoriteContent = useCallback(() => {
    try {
      const favoriteIds = favoritesUtils.getFavorites();
      return allContent.filter((item) => favoriteIds.includes(item.id));
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      return [];
    }
  }, [allContent]);

  /**
   * Obtener historial de contenido
   */
  const getHistoryContent = useCallback(() => {
    try {
      const history = historyUtils.getRecentHistory(30); // Últimos 30 días
      const contentIds = history.map((entry) => entry.contentId);
      const uniqueIds = [...new Set(contentIds)];

      return allContent.filter((item) => uniqueIds.includes(item.id));
    } catch (error) {
      console.error("Error al obtener historial:", error);
      return [];
    }
  }, [allContent]);

  /**
   * Obtener contenido para explorar
   */
  const getExploreContent = useCallback(() => {
    try {
      // Contenido aleatorio de toda la base de datos
      const shuffled = [...allContent].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 20); // Mostrar 20 elementos aleatorios
    } catch (error) {
      console.error("Error al obtener contenido de exploración:", error);
      return [];
    }
  }, [allContent]);

  /**
   * Obtener contenido actual basado en la vista activa
   */
  const getCurrentContent = useCallback(() => {
    let content = [];

    switch (activeView) {
      case "today":
        content = todayContent;
        break;
      case "favorites":
        content = getFavoriteContent();
        break;
      case "history":
        content = getHistoryContent();
        break;
      case "explore":
        content = getExploreContent();
        break;
      default:
        content = todayContent;
    }

    // Aplicar filtros
    let filteredContent = filterContentByType(content, activeFilter);

    // Aplicar búsqueda
    if (searchTerm.trim()) {
      filteredContent = searchInContent(filteredContent, searchTerm);
    }

    // Aplicar ordenamiento
    filteredContent = sortContent(filteredContent, sortBy);

    return filteredContent;
  }, [
    activeView,
    todayContent,
    activeFilter,
    searchTerm,
    sortBy,
    getFavoriteContent,
    getHistoryContent,
    getExploreContent,
  ]);

  /**
   * Cambiar vista activa
   */
  const setView = useCallback((view) => {
    setActiveView(view);
    setExpandedContent(null); // Cerrar contenido expandido al cambiar vista
  }, []);

  /**
   * Cambiar filtro
   */
  const setFilter = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  /**
   * Cambiar búsqueda
   */
  const setSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  /**
   * Cambiar ordenamiento
   */
  const setSort = useCallback((sort) => {
    setSortBy(sort);
  }, []);

  /**
   * Expandir/contraer contenido
   */
  const toggleExpandContent = useCallback((contentId) => {
    setExpandedContent((prev) => (prev === contentId ? null : contentId));
  }, []);

  /**
   * Cambiar fecha (para probar otros días)
   */
  const changeDate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  /**
   * Obtener estadísticas
   */
  const getStats = useCallback(() => {
    const currentContent = getCurrentContent();
    const favoriteCount = favorites.length;
    const historyCount = historyUtils.getHistory().length;

    return {
      streak,
      favorites: favoriteCount,
      historyItems: historyCount,
      todayItems: todayContent.length,
      currentItems: currentContent.length,
      totalItems: allContent.length,
    };
  }, [
    streak,
    favorites.length,
    todayContent.length,
    getCurrentContent,
    allContent.length,
  ]);

  // Datos de la fecha actual
  const dateInfo = formatDate(currentDate);
  const currentContent = getCurrentContent();
  const stats = getStats();

  return {
    // Estados principales
    currentDate,
    dateInfo,
    todayContent,
    currentContent,
    allContent,
    isLoading,

    // Estados de filtros y búsqueda
    activeFilter,
    searchTerm,
    sortBy,
    activeView,
    expandedContent,

    // Estados de gamificación
    streak,
    motivationalMessage,
    recentAchievements,
    favorites,
    stats,

    // Funciones de contenido
    actions: {
      // Navegación y vistas
      setView,
      setFilter,
      setSearch,
      setSort,
      changeDate,

      // Interacciones con contenido
      toggleFavorite,
      toggleExpandContent,

      // Utilidades
      refresh: initializeDailyContent,
    },

    // Funciones de consulta
    queries: {
      isFavorite,
      getFavoriteContent,
      getHistoryContent,
      getExploreContent,
      getCurrentContent,
    },

    // Información de fecha
    date: {
      ...dateInfo,
      isToday: dateInfo.dateKey === formatDate(new Date()).dateKey,
    },
  };
};

export default useDailyContent;
