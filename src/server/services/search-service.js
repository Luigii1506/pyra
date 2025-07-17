/**
 * Search Service
 * Handles global search functionality across all entities
 * @created 2024-12-19
 */

import prisma from "../../lib/prisma.js";
import { PAGINATION } from "../../constants/app.js";

export class SearchService {
  /**
   * Realiza una búsqueda global en todas las entidades
   * @param {string} searchTerm - Término de búsqueda
   * @param {Object} options - Opciones de búsqueda
   * @returns {Promise<Object>} Resultados de búsqueda organizados por tipo
   */
  static async globalSearch(
    searchTerm,
    {
      includeCharacters = true,
      includeReligions = true,
      includeMyths = true,
      includePlaces = true,
      includeTimelines = true,
      includeExams = true,
      includeNotes = true,
      userId = null,
      limit = PAGINATION.SEARCH_RESULTS_SIZE,
    } = {}
  ) {
    try {
      const results = {};
      const searchPromises = [];

      // Búsqueda en personajes históricos
      if (includeCharacters) {
        searchPromises.push(
          this.searchCharacters(searchTerm, limit).then((characters) => {
            results.characters = characters;
          })
        );
      }

      // Búsqueda en religiones
      if (includeReligions) {
        searchPromises.push(
          this.searchReligions(searchTerm, limit).then((religions) => {
            results.religions = religions;
          })
        );
      }

      // Búsqueda en mitologías
      if (includeMyths) {
        searchPromises.push(
          this.searchMyths(searchTerm, limit).then((myths) => {
            results.myths = myths;
          })
        );
      }

      // Búsqueda en lugares históricos
      if (includePlaces) {
        searchPromises.push(
          this.searchHistoricalPlaces(searchTerm, limit).then((places) => {
            results.places = places;
          })
        );
      }

      // Búsqueda en líneas de tiempo
      if (includeTimelines) {
        searchPromises.push(
          this.searchTimelines(searchTerm, limit).then((timelines) => {
            results.timelines = timelines;
          })
        );
      }

      // Búsqueda en exámenes
      if (includeExams) {
        searchPromises.push(
          this.searchExams(searchTerm, limit).then((exams) => {
            results.exams = exams;
          })
        );
      }

      // Búsqueda en notas (solo las del usuario si se especifica)
      if (includeNotes && userId) {
        searchPromises.push(
          this.searchNotes(searchTerm, userId, limit).then((notes) => {
            results.notes = notes;
          })
        );
      }

      await Promise.all(searchPromises);

      // Calcular estadísticas de resultados
      const totalResults = Object.values(results).reduce(
        (total, items) => total + (items?.length || 0),
        0
      );

      return {
        searchTerm,
        totalResults,
        results,
        hasResults: totalResults > 0,
      };
    } catch (error) {
      console.error("Error in global search:", error);
      throw new Error("Error al realizar búsqueda global");
    }
  }

  /**
   * Busca en personajes históricos
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} Lista de personajes encontrados
   */
  static async searchCharacters(
    searchTerm,
    limit = PAGINATION.SEARCH_RESULTS_SIZE
  ) {
    try {
      return await prisma.historicalFigure.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { aliases: { has: searchTerm } },
            { biography: { contains: searchTerm, mode: "insensitive" } },
            { category: { contains: searchTerm, mode: "insensitive" } },
            { achievements: { hasSome: [searchTerm] } },
            { battles: { hasSome: [searchTerm] } },
            { quotes: { hasSome: [searchTerm] } },
          ],
        },
        take: limit,
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          category: true,
          imageUrl: true,
          birthDate: true,
          deathDate: true,
          biography: true,
          _count: {
            select: {
              notes: true,
              timelineEvents: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error searching characters:", error);
      return [];
    }
  }

  /**
   * Busca en religiones
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} Lista de religiones encontradas
   */
  static async searchReligions(
    searchTerm,
    limit = PAGINATION.SEARCH_RESULTS_SIZE
  ) {
    try {
      return await prisma.religion.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { originRegion: { contains: searchTerm, mode: "insensitive" } },
            { originEra: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { mainDeities: { hasSome: [searchTerm] } },
            { sacredTexts: { hasSome: [searchTerm] } },
            { rituals: { hasSome: [searchTerm] } },
            { festivities: { hasSome: [searchTerm] } },
          ],
        },
        take: limit,
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          originRegion: true,
          originEra: true,
          description: true,
          imageUrl: true,
          _count: {
            select: {
              myths: true,
              notes: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error searching religions:", error);
      return [];
    }
  }

  /**
   * Busca en mitologías
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} Lista de mitos encontrados
   */
  static async searchMyths(searchTerm, limit = PAGINATION.SEARCH_RESULTS_SIZE) {
    try {
      return await prisma.myth.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { characters: { hasSome: [searchTerm] } },
            {
              culturalSignificance: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
        take: limit,
        orderBy: { name: "asc" },
        include: {
          religion: {
            select: { id: true, name: true },
          },
        },
      });
    } catch (error) {
      console.error("Error searching myths:", error);
      return [];
    }
  }

  /**
   * Busca en lugares históricos
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} Lista de lugares encontrados
   */
  static async searchHistoricalPlaces(
    searchTerm,
    limit = PAGINATION.SEARCH_RESULTS_SIZE
  ) {
    try {
      return await prisma.historicalPlace.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { architecture: { contains: searchTerm, mode: "insensitive" } },
            { placeType: { contains: searchTerm, mode: "insensitive" } },
            { eventsOccurred: { hasSome: [searchTerm] } },
          ],
        },
        take: limit,
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          description: true,
          latitude: true,
          longitude: true,
          placeType: true,
          imageUrl: true,
          _count: {
            select: {
              timelineEvents: true,
              notes: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error searching historical places:", error);
      return [];
    }
  }

  /**
   * Busca en líneas de tiempo
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} Lista de timelines encontrados
   */
  static async searchTimelines(
    searchTerm,
    limit = PAGINATION.SEARCH_RESULTS_SIZE
  ) {
    try {
      return await prisma.timeline.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { era: { contains: searchTerm, mode: "insensitive" } },
            { category: { contains: searchTerm, mode: "insensitive" } },
            {
              timelineEvents: {
                some: {
                  OR: [
                    { title: { contains: searchTerm, mode: "insensitive" } },
                    {
                      description: {
                        contains: searchTerm,
                        mode: "insensitive",
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        take: limit,
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              timelineEvents: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error searching timelines:", error);
      return [];
    }
  }

  /**
   * Busca en exámenes
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} Lista de exámenes encontrados
   */
  static async searchExams(searchTerm, limit = PAGINATION.SEARCH_RESULTS_SIZE) {
    try {
      return await prisma.exam.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { level: { contains: searchTerm, mode: "insensitive" } },
            { topic: { contains: searchTerm, mode: "insensitive" } },
            {
              questions: {
                some: {
                  text: { contains: searchTerm, mode: "insensitive" },
                },
              },
            },
          ],
        },
        take: limit,
        orderBy: { title: "asc" },
        include: {
          _count: {
            select: {
              questions: true,
              examAttempts: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error searching exams:", error);
      return [];
    }
  }

  /**
   * Busca en notas del usuario
   * @param {string} searchTerm - Término de búsqueda
   * @param {string} userId - ID del usuario
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} Lista de notas encontradas
   */
  static async searchNotes(
    searchTerm,
    userId,
    limit = PAGINATION.SEARCH_RESULTS_SIZE
  ) {
    try {
      return await prisma.note.findMany({
        where: {
          userId,
          content: { contains: searchTerm, mode: "insensitive" },
        },
        take: limit,
        orderBy: { updatedAt: "desc" },
        include: {
          historicalFigure: {
            select: { id: true, name: true },
          },
          religion: {
            select: { id: true, name: true },
          },
          myth: {
            select: { id: true, name: true },
          },
          historicalPlace: {
            select: { id: true, name: true },
          },
        },
      });
    } catch (error) {
      console.error("Error searching notes:", error);
      return [];
    }
  }

  /**
   * Búsqueda avanzada con filtros específicos
   * @param {Object} filters - Filtros de búsqueda
   * @returns {Promise<Object>} Resultados filtrados
   */
  static async advancedSearch({
    searchTerm = "",
    entityType = null, // 'characters', 'religions', 'myths', 'places', 'timelines'
    category = null,
    era = null,
    dateFrom = null,
    dateTo = null,
    hasImages = null,
    limit = PAGINATION.SEARCH_RESULTS_SIZE,
    userId = null,
  } = {}) {
    try {
      let results = [];

      switch (entityType) {
        case "characters":
          results = await this.advancedSearchCharacters({
            searchTerm,
            category,
            dateFrom,
            dateTo,
            hasImages,
            limit,
          });
          break;

        case "religions":
          results = await this.advancedSearchReligions({
            searchTerm,
            era,
            hasImages,
            limit,
          });
          break;

        case "places":
          results = await this.advancedSearchPlaces({
            searchTerm,
            category,
            hasImages,
            limit,
          });
          break;

        case "timelines":
          results = await this.advancedSearchTimelines({
            searchTerm,
            era,
            category,
            dateFrom,
            dateTo,
            limit,
          });
          break;

        default:
          // Si no se especifica tipo, hacer búsqueda global
          return await this.globalSearch(searchTerm, {
            limit,
            userId,
            includeNotes: !!userId,
          });
      }

      return {
        searchTerm,
        entityType,
        filters: { category, era, dateFrom, dateTo, hasImages },
        totalResults: results.length,
        results,
        hasResults: results.length > 0,
      };
    } catch (error) {
      console.error("Error in advanced search:", error);
      throw new Error("Error al realizar búsqueda avanzada");
    }
  }

  /**
   * Búsqueda avanzada de personajes
   */
  static async advancedSearchCharacters({
    searchTerm,
    category,
    dateFrom,
    dateTo,
    hasImages,
    limit,
  }) {
    const where = {};

    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { biography: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    if (category) where.category = category;
    if (hasImages !== null) {
      where.imageUrl = hasImages ? { not: null } : null;
    }

    if (dateFrom || dateTo) {
      where.AND = [];
      if (dateFrom) where.AND.push({ birthDate: { gte: new Date(dateFrom) } });
      if (dateTo) where.AND.push({ deathDate: { lte: new Date(dateTo) } });
    }

    return await prisma.historicalFigure.findMany({
      where,
      take: limit,
      orderBy: { name: "asc" },
    });
  }

  /**
   * Búsqueda avanzada de religiones
   */
  static async advancedSearchReligions({ searchTerm, era, hasImages, limit }) {
    const where = {};

    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    if (era) where.originEra = { contains: era, mode: "insensitive" };
    if (hasImages !== null) {
      where.imageUrl = hasImages ? { not: null } : null;
    }

    return await prisma.religion.findMany({
      where,
      take: limit,
      orderBy: { name: "asc" },
    });
  }

  /**
   * Búsqueda avanzada de lugares
   */
  static async advancedSearchPlaces({
    searchTerm,
    category,
    hasImages,
    limit,
  }) {
    const where = {};

    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    if (category) where.placeType = category;
    if (hasImages !== null) {
      where.imageUrl = hasImages ? { not: null } : null;
    }

    return await prisma.historicalPlace.findMany({
      where,
      take: limit,
      orderBy: { name: "asc" },
    });
  }

  /**
   * Búsqueda avanzada de timelines
   */
  static async advancedSearchTimelines({
    searchTerm,
    era,
    category,
    dateFrom,
    dateTo,
    limit,
  }) {
    const where = {};

    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    if (era) where.era = era;
    if (category) where.category = category;

    return await prisma.timeline.findMany({
      where,
      take: limit,
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { timelineEvents: true },
        },
      },
    });
  }

  /**
   * Obtiene sugerencias de búsqueda basadas en términos populares
   * @param {string} partialTerm - Término parcial para autocompletar
   * @param {number} limit - Límite de sugerencias
   * @returns {Promise<Array>} Lista de sugerencias
   */
  static async getSearchSuggestions(partialTerm, limit = 10) {
    try {
      const suggestions = new Set();

      // Sugerencias de nombres de personajes
      const characters = await prisma.historicalFigure.findMany({
        where: {
          name: { contains: partialTerm, mode: "insensitive" },
        },
        select: { name: true },
        take: limit,
      });
      characters.forEach((char) => suggestions.add(char.name));

      // Sugerencias de religiones
      const religions = await prisma.religion.findMany({
        where: {
          name: { contains: partialTerm, mode: "insensitive" },
        },
        select: { name: true },
        take: limit,
      });
      religions.forEach((rel) => suggestions.add(rel.name));

      // Sugerencias de lugares
      const places = await prisma.historicalPlace.findMany({
        where: {
          name: { contains: partialTerm, mode: "insensitive" },
        },
        select: { name: true },
        take: limit,
      });
      places.forEach((place) => suggestions.add(place.name));

      return Array.from(suggestions).slice(0, limit);
    } catch (error) {
      console.error("Error getting search suggestions:", error);
      return [];
    }
  }
}
