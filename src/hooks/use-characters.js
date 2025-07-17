/**
 * Characters Hook
 * Custom hook for managing historical characters state and operations
 * @created 2024-12-19
 */

"use client";
import { useState, useEffect, useCallback } from "react";
import apiClient from "../lib/axios.js";
import { handleApiError, debounce } from "../lib/utils.js";

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [filters, setFilters] = useState({
    search: "",
    category: null,
    sortBy: "name",
    sortOrder: "asc",
  });

  /**
   * Obtiene la lista de personajes con filtros aplicados
   */
  const fetchCharacters = useCallback(
    async (page = 1, customFilters = {}) => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          page,
          limit: 20,
          ...filters,
          ...customFilters,
        };

        const response = await apiClient.get("/api/characters", { params });

        setCharacters(response.data.characters);
        setPagination(response.data.pagination);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        console.error("Error fetching characters:", err);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  /**
   * Obtiene un personaje específico por ID
   */
  const fetchCharacterById = useCallback(async (characterId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/api/characters/${characterId}`);
      setSelectedCharacter(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Error fetching character:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crea un nuevo personaje
   */
  const createCharacter = useCallback(
    async (characterData) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.post("/api/characters", characterData);

        // Refrescar la lista de personajes
        await fetchCharacters(pagination.currentPage);

        return response.data;
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        console.error("Error creating character:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchCharacters, pagination.currentPage]
  );

  /**
   * Actualiza un personaje existente
   */
  const updateCharacter = useCallback(
    async (characterId, updateData) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.put(
          `/api/characters/${characterId}`,
          updateData
        );

        // Actualizar en la lista local si existe
        setCharacters((prev) =>
          prev.map((char) =>
            char.id === characterId ? { ...char, ...response.data } : char
          )
        );

        // Actualizar el personaje seleccionado si coincide
        if (selectedCharacter?.id === characterId) {
          setSelectedCharacter(response.data);
        }

        return response.data;
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        console.error("Error updating character:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [selectedCharacter]
  );

  /**
   * Elimina un personaje
   */
  const deleteCharacter = useCallback(
    async (characterId) => {
      setLoading(true);
      setError(null);

      try {
        await apiClient.delete(`/api/characters/${characterId}`);

        // Remover de la lista local
        setCharacters((prev) => prev.filter((char) => char.id !== characterId));

        // Limpiar selección si era el personaje seleccionado
        if (selectedCharacter?.id === characterId) {
          setSelectedCharacter(null);
        }

        return true;
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        console.error("Error deleting character:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [selectedCharacter]
  );

  /**
   * Busca personajes por término
   */
  const searchCharacters = useCallback(
    async (searchTerm) => {
      if (!searchTerm.trim()) {
        return await fetchCharacters(1, { search: "" });
      }

      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get("/api/characters/search", {
          params: { q: searchTerm, limit: 50 },
        });

        setCharacters(response.data);
        // Reset pagination for search results
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: response.data.length,
          hasNextPage: false,
          hasPrevPage: false,
        });
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        console.error("Error searching characters:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchCharacters]
  );

  // Debounced search function
  const debouncedSearch = useCallback(debounce(searchCharacters, 500), [
    searchCharacters,
  ]);

  /**
   * Obtiene personajes por categoría
   */
  const fetchCharactersByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/api/characters/category", {
        params: { category },
      });

      setCharacters(response.data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Error fetching characters by category:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene personajes relacionados
   */
  const fetchRelatedCharacters = useCallback(async (characterId) => {
    try {
      const response = await apiClient.get(
        `/api/characters/${characterId}/related`
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching related characters:", err);
      return [];
    }
  }, []);

  /**
   * Actualiza filtros y refresca la lista
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Cambia la página actual
   */
  const changePage = useCallback(
    (page) => {
      if (page >= 1 && page <= pagination.totalPages) {
        fetchCharacters(page);
      }
    },
    [fetchCharacters, pagination.totalPages]
  );

  /**
   * Limpia el estado de error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Limpia la selección actual
   */
  const clearSelection = useCallback(() => {
    setSelectedCharacter(null);
  }, []);

  // Efecto para cargar personajes inicialmente
  useEffect(() => {
    fetchCharacters();
  }, []);

  // Efecto para recargar cuando cambian los filtros
  useEffect(() => {
    if (filters.search) {
      debouncedSearch(filters.search);
    } else {
      fetchCharacters(1);
    }
  }, [filters.search, filters.category, filters.sortBy, filters.sortOrder]);

  return {
    // Estado
    characters,
    selectedCharacter,
    loading,
    error,
    pagination,
    filters,

    // Acciones
    fetchCharacters,
    fetchCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    searchCharacters: debouncedSearch,
    fetchCharactersByCategory,
    fetchRelatedCharacters,
    updateFilters,
    changePage,
    clearError,
    clearSelection,

    // Utilidades
    hasCharacters: characters.length > 0,
    isFirstPage: pagination.currentPage === 1,
    isLastPage: pagination.currentPage === pagination.totalPages,
  };
};

export default useCharacters;
