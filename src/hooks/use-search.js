/**
 * Search Hook
 * Custom hook for managing global search functionality
 * @created 2024-12-19
 */

"use client";
import { useState, useCallback, useEffect } from "react";
import apiClient from "../lib/axios.js";
import { handleApiError, debounce } from "../lib/utils.js";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filters, setFilters] = useState({
    includeCharacters: true,
    includeReligions: true,
    includeMyths: true,
    includePlaces: true,
    includeTimelines: true,
    includeExams: true,
    includeNotes: true,
  });

  /**
   * Realiza una búsqueda global
   */
  const performGlobalSearch = useCallback(
    async (term, customFilters = {}) => {
      if (!term.trim()) {
        setSearchResults({});
        setTotalResults(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params = {
          q: term,
          ...filters,
          ...customFilters,
        };

        const response = await apiClient.get("/api/search/global", { params });

        setSearchResults(response.data.results);
        setTotalResults(response.data.totalResults);

        // Añadir a historial si no existe
        if (!searchHistory.includes(term)) {
          setSearchHistory((prev) => [term, ...prev.slice(0, 9)]); // Mantener solo 10 búsquedas
        }
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        console.error("Error in global search:", err);
      } finally {
        setLoading(false);
      }
    },
    [filters, searchHistory]
  );

  /**
   * Búsqueda avanzada con filtros específicos
   */
  const performAdvancedSearch = useCallback(async (searchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/api/search/advanced", {
        params: searchParams,
      });

      setSearchResults(response.data.results);
      setTotalResults(response.data.totalResults);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Error in advanced search:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene sugerencias de búsqueda
   */
  const fetchSuggestions = useCallback(async (term) => {
    if (!term.trim() || term.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await apiClient.get("/api/search/suggestions", {
        params: { q: term, limit: 10 },
      });

      setSuggestions(response.data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  }, []);

  // Debounced functions
  const debouncedSearch = useCallback(debounce(performGlobalSearch, 500), [
    performGlobalSearch,
  ]);

  const debouncedSuggestions = useCallback(debounce(fetchSuggestions, 300), [
    fetchSuggestions,
  ]);

  /**
   * Actualiza el término de búsqueda y realiza búsqueda automática
   */
  const updateSearchTerm = useCallback(
    (term) => {
      setSearchTerm(term);

      if (term.trim()) {
        debouncedSearch(term);
        debouncedSuggestions(term);
      } else {
        setSearchResults({});
        setTotalResults(0);
        setSuggestions([]);
      }
    },
    [debouncedSearch, debouncedSuggestions]
  );

  /**
   * Realiza una búsqueda inmediata sin debounce
   */
  const searchImmediate = useCallback(
    (term) => {
      setSearchTerm(term);
      performGlobalSearch(term);
    },
    [performGlobalSearch]
  );

  /**
   * Busca en una categoría específica
   */
  const searchByCategory = useCallback(async (term, category) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/api/search/${category}`, {
        params: { q: term },
      });

      setSearchResults({ [category]: response.data });
      setTotalResults(response.data.length);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error(`Error searching in ${category}:`, err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Actualiza filtros de búsqueda
   */
  const updateFilters = useCallback(
    (newFilters) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));

      // Re-ejecutar búsqueda si hay un término activo
      if (searchTerm.trim()) {
        performGlobalSearch(searchTerm, newFilters);
      }
    },
    [searchTerm, performGlobalSearch]
  );

  /**
   * Limpia los resultados de búsqueda
   */
  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setSearchResults({});
    setTotalResults(0);
    setSuggestions([]);
    setError(null);
  }, []);

  /**
   * Elimina un elemento del historial de búsquedas
   */
  const removeFromHistory = useCallback((termToRemove) => {
    setSearchHistory((prev) => prev.filter((term) => term !== termToRemove));
  }, []);

  /**
   * Limpia todo el historial de búsquedas
   */
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  /**
   * Obtiene los resultados de una categoría específica
   */
  const getResultsByCategory = useCallback(
    (category) => {
      return searchResults[category] || [];
    },
    [searchResults]
  );

  /**
   * Verifica si hay resultados en una categoría
   */
  const hasResultsInCategory = useCallback(
    (category) => {
      const results = searchResults[category];
      return results && results.length > 0;
    },
    [searchResults]
  );

  /**
   * Obtiene el número total de resultados por categoría
   */
  const getResultsCountByCategory = useCallback(
    (category) => {
      const results = searchResults[category];
      return results ? results.length : 0;
    },
    [searchResults]
  );

  // Efectos para manejar persistencia del historial
  useEffect(() => {
    // Cargar historial desde localStorage al inicializar
    try {
      const savedHistory = localStorage.getItem("searchHistory");
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
    } catch (err) {
      console.error("Error loading search history:", err);
    }
  }, []);

  useEffect(() => {
    // Guardar historial en localStorage cuando cambie
    try {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    } catch (err) {
      console.error("Error saving search history:", err);
    }
  }, [searchHistory]);

  return {
    // Estado
    searchTerm,
    searchResults,
    loading,
    error,
    totalResults,
    suggestions,
    searchHistory,
    filters,

    // Acciones principales
    updateSearchTerm,
    searchImmediate,
    performGlobalSearch,
    performAdvancedSearch,
    searchByCategory,
    clearSearch,

    // Gestión de filtros
    updateFilters,

    // Gestión de historial
    removeFromHistory,
    clearHistory,

    // Utilidades para resultados
    getResultsByCategory,
    hasResultsInCategory,
    getResultsCountByCategory,

    // Estados computados
    hasResults: totalResults > 0,
    isSearching: loading,
    hasError: !!error,
    hasSuggestions: suggestions.length > 0,
    hasHistory: searchHistory.length > 0,

    // Contadores por categoría
    charactersCount: getResultsCountByCategory("characters"),
    religionsCount: getResultsCountByCategory("religions"),
    mythsCount: getResultsCountByCategory("myths"),
    placesCount: getResultsCountByCategory("places"),
    timelinesCount: getResultsCountByCategory("timelines"),
    examsCount: getResultsCountByCategory("exams"),
    notesCount: getResultsCountByCategory("notes"),
  };
};

export default useSearch;
