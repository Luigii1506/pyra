/**
 * User Hook
 * Custom hook for managing user state, authentication, and gamification
 * @created 2024-12-19
 */

"use client";
import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import apiClient from "../lib/axios.js";
import { handleApiError, getRankProgress } from "../lib/utils.js";

// Context para el usuario
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userState = useUser();
  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [rankProgress, setRankProgress] = useState(null);

  /**
   * Obtiene la información del usuario actual
   */
  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/api/auth/me");
      setUser(response.data);
      setIsAuthenticated(true);

      // Calcular progreso de rango
      const progress = getRankProgress(response.data.experiencePoints);
      setRankProgress(progress);

      return response.data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setIsAuthenticated(false);
      setUser(null);

      // Limpiar token si la request falla
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
      }

      console.error("Error fetching user profile:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene las estadísticas del usuario
   */
  const fetchUserStats = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await apiClient.get(`/api/users/${user.id}/stats`);
      setUserStats(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching user stats:", err);
    }
  }, [user?.id]);

  /**
   * Obtiene los logros del usuario
   */
  const fetchUserAchievements = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await apiClient.get(
        `/api/users/${user.id}/achievements`
      );
      setAchievements(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching user achievements:", err);
    }
  }, [user?.id]);

  /**
   * Obtiene el leaderboard
   */
  const fetchLeaderboard = useCallback(async (limit = 10) => {
    try {
      const response = await apiClient.get("/api/users/leaderboard", {
        params: { limit },
      });
      setLeaderboard(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  }, []);

  /**
   * Inicia sesión
   */
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/api/auth/login", credentials);
      const { user: userData, token } = response.data;

      // Guardar token
      localStorage.setItem("authToken", token);

      // Actualizar estado
      setUser(userData);
      setIsAuthenticated(true);

      // Calcular progreso de rango
      const progress = getRankProgress(userData.experiencePoints);
      setRankProgress(progress);

      return userData;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Registra un nuevo usuario
   */
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/api/auth/register", userData);
      const { user: newUser, token } = response.data;

      // Guardar token
      localStorage.setItem("authToken", token);

      // Actualizar estado
      setUser(newUser);
      setIsAuthenticated(true);

      // Calcular progreso de rango
      const progress = getRankProgress(newUser.experiencePoints);
      setRankProgress(progress);

      return newUser;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Cierra sesión
   */
  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await apiClient.post("/api/auth/logout");
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      // Limpiar estado independientemente del resultado
      localStorage.removeItem("authToken");
      setUser(null);
      setIsAuthenticated(false);
      setUserStats(null);
      setAchievements([]);
      setRankProgress(null);
      setError(null);
      setLoading(false);
    }
  }, []);

  /**
   * Actualiza el perfil del usuario
   */
  const updateProfile = useCallback(
    async (updateData) => {
      if (!user?.id) throw new Error("Usuario no autenticado");

      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.put(
          `/api/users/${user.id}`,
          updateData
        );
        setUser(response.data);

        // Recalcular progreso si cambió la experiencia
        if (updateData.experiencePoints) {
          const progress = getRankProgress(response.data.experiencePoints);
          setRankProgress(progress);
        }

        return response.data;
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  /**
   * Añade puntos de experiencia
   */
  const addExperience = useCallback(
    async (points, reason) => {
      if (!user?.id) return;

      try {
        const response = await apiClient.post(
          `/api/users/${user.id}/experience`,
          {
            points,
            reason,
          }
        );

        setUser(response.data);

        // Recalcular progreso de rango
        const progress = getRankProgress(response.data.experiencePoints);
        setRankProgress(progress);

        return response.data;
      } catch (err) {
        console.error("Error adding experience:", err);
      }
    },
    [user?.id]
  );

  /**
   * Verifica el estado de autenticación
   */
  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const userData = await fetchUserProfile();
      return !!userData;
    } catch (err) {
      setIsAuthenticated(false);
      return false;
    }
  }, [fetchUserProfile]);

  /**
   * Actualiza el último login
   */
  const updateLastLogin = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await apiClient.post(`/api/users/${user.id}/login`);

      if (response.data) {
        setUser(response.data);

        // Recalcular progreso si se añadió experiencia
        const progress = getRankProgress(response.data.experiencePoints);
        setRankProgress(progress);
      }
    } catch (err) {
      console.error("Error updating last login:", err);
    }
  }, [user?.id]);

  /**
   * Limpia el estado de error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Refresca toda la información del usuario
   */
  const refreshUserData = useCallback(async () => {
    if (!isAuthenticated || !user?.id) return;

    await Promise.all([
      fetchUserProfile(),
      fetchUserStats(),
      fetchUserAchievements(),
    ]);
  }, [
    isAuthenticated,
    user?.id,
    fetchUserProfile,
    fetchUserStats,
    fetchUserAchievements,
  ]);

  // Efecto para verificar autenticación al cargar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Efecto para cargar datos adicionales cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchUserStats();
      fetchUserAchievements();
      updateLastLogin();
    }
  }, [isAuthenticated, user?.id]);

  // Utilidades computadas
  const userPosition = leaderboard.findIndex((u) => u.id === user?.id) + 1;
  const isInTopTen = userPosition > 0 && userPosition <= 10;

  return {
    // Estado principal
    user,
    loading,
    error,
    isAuthenticated,
    userStats,
    achievements,
    leaderboard,
    rankProgress,

    // Acciones de autenticación
    login,
    register,
    logout,
    checkAuthStatus,

    // Gestión de perfil
    fetchUserProfile,
    updateProfile,
    refreshUserData,

    // Estadísticas y gamificación
    fetchUserStats,
    fetchUserAchievements,
    fetchLeaderboard,
    addExperience,
    updateLastLogin,

    // Utilidades
    clearError,

    // Estados computados
    hasAchievements: achievements.length > 0,
    totalExperience: user?.experiencePoints || 0,
    currentRank: user?.currentRank || "Aprendiz",
    dailyStreak: user?.dailyStreak || 0,
    userPosition,
    isInTopTen,
    needsLevelUp: rankProgress?.progress === 100,

    // Información de progreso
    progressToNextRank: rankProgress?.progress || 0,
    pointsToNextRank: rankProgress?.pointsToNext || 0,
    nextRank: rankProgress?.nextRank || null,

    // Utilidades de validación
    canEdit: isAuthenticated && user,
    isGuest: !isAuthenticated,
  };
};

export default useUser;
