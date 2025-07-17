/**
 * Character Service
 * Handles historical figures operations and related data
 * @created 2024-12-19
 */

import prisma from "../../lib/prisma.js";
import { PAGINATION } from "../../constants/app.js";

export class CharacterService {
  /**
   * Obtiene todos los personajes históricos con paginación
   * @param {Object} options - Opciones de consulta
   * @returns {Promise<Object>} Lista de personajes con paginación
   */
  static async getAllCharacters({
    page = 1,
    limit = PAGINATION.DEFAULT_PAGE_SIZE,
    category = null,
    search = null,
    sortBy = "name",
    sortOrder = "asc",
  } = {}) {
    try {
      const skip = (page - 1) * limit;

      // Construir filtros
      const where = {};

      if (category) {
        where.category = category;
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { aliases: { has: search } },
          { biography: { contains: search, mode: "insensitive" } },
          { achievements: { has: search } },
        ];
      }

      // Construir ordenamiento
      const orderBy = {};
      orderBy[sortBy] = sortOrder;

      const [characters, total] = await Promise.all([
        prisma.historicalFigure.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: {
            notes: {
              select: {
                id: true,
                content: true,
                userId: true,
                createdAt: true,
              },
            },
            timelineEvents: {
              select: { id: true, title: true, date: true },
            },
            historicalConnections: {
              include: {
                targetFigure: {
                  select: { id: true, name: true, imageUrl: true },
                },
              },
            },
          },
        }),
        prisma.historicalFigure.count({ where }),
      ]);

      return {
        characters,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw new Error("Error al obtener personajes históricos");
    }
  }

  /**
   * Obtiene un personaje histórico por ID
   * @param {string} characterId - ID del personaje
   * @returns {Promise<Object|null>} Personaje con información completa
   */
  static async getCharacterById(characterId) {
    try {
      return await prisma.historicalFigure.findUnique({
        where: { id: characterId },
        include: {
          notes: {
            include: {
              user: {
                select: { id: true, username: true },
              },
            },
            orderBy: { createdAt: "desc" },
          },
          timelineEvents: {
            include: {
              timeline: {
                select: { id: true, name: true },
              },
            },
            orderBy: { date: "asc" },
          },
          historicalConnections: {
            include: {
              targetFigure: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true,
                  category: true,
                },
              },
            },
          },
          historicalConnectionsSource: {
            include: {
              sourceFigure: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true,
                  category: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching character by ID:", error);
      throw new Error("Error al obtener personaje histórico");
    }
  }

  /**
   * Crea un nuevo personaje histórico
   * @param {Object} characterData - Datos del personaje
   * @returns {Promise<Object>} Personaje creado
   */
  static async createCharacter(characterData) {
    const {
      name,
      aliases = [],
      birthDate,
      deathDate,
      biography,
      achievements = [],
      battles = [],
      quotes = [],
      imageUrl,
      sourceLinks = [],
      category,
    } = characterData;

    try {
      // Verificar si ya existe un personaje con el mismo nombre
      const existingCharacter = await prisma.historicalFigure.findFirst({
        where: {
          OR: [{ name }, { aliases: { has: name } }],
        },
      });

      if (existingCharacter) {
        throw new Error("Ya existe un personaje con ese nombre");
      }

      return await prisma.historicalFigure.create({
        data: {
          name,
          aliases,
          birthDate: birthDate ? new Date(birthDate) : null,
          deathDate: deathDate ? new Date(deathDate) : null,
          biography,
          achievements,
          battles,
          quotes,
          imageUrl,
          sourceLinks,
          category,
        },
        include: {
          notes: true,
          timelineEvents: true,
          historicalConnections: true,
        },
      });
    } catch (error) {
      console.error("Error creating character:", error);
      throw new Error(error.message || "Error al crear personaje histórico");
    }
  }

  /**
   * Actualiza un personaje histórico
   * @param {string} characterId - ID del personaje
   * @param {Object} updateData - Datos a actualizar
   * @returns {Promise<Object>} Personaje actualizado
   */
  static async updateCharacter(characterId, updateData) {
    try {
      const existingCharacter = await this.getCharacterById(characterId);
      if (!existingCharacter) {
        throw new Error("Personaje no encontrado");
      }

      // Procesar fechas si están presentes
      const processedData = { ...updateData };
      if (processedData.birthDate) {
        processedData.birthDate = new Date(processedData.birthDate);
      }
      if (processedData.deathDate) {
        processedData.deathDate = new Date(processedData.deathDate);
      }

      return await prisma.historicalFigure.update({
        where: { id: characterId },
        data: processedData,
        include: {
          notes: true,
          timelineEvents: true,
          historicalConnections: true,
        },
      });
    } catch (error) {
      console.error("Error updating character:", error);
      throw new Error("Error al actualizar personaje histórico");
    }
  }

  /**
   * Elimina un personaje histórico
   * @param {string} characterId - ID del personaje
   * @returns {Promise<boolean>} Resultado de la operación
   */
  static async deleteCharacter(characterId) {
    try {
      // Verificar si el personaje existe
      const character = await this.getCharacterById(characterId);
      if (!character) {
        throw new Error("Personaje no encontrado");
      }

      // Eliminar en transacción para mantener integridad
      await prisma.$transaction(async (tx) => {
        // Eliminar conexiones históricas
        await tx.historicalConnection.deleteMany({
          where: {
            OR: [
              { sourceFigureId: characterId },
              { targetFigureId: characterId },
            ],
          },
        });

        // Eliminar notas relacionadas
        await tx.note.deleteMany({
          where: { historicalFigureId: characterId },
        });

        // Eliminar eventos de timeline relacionados
        await tx.timelineEvent.deleteMany({
          where: { historicalFigureId: characterId },
        });

        // Finalmente eliminar el personaje
        await tx.historicalFigure.delete({
          where: { id: characterId },
        });
      });

      return true;
    } catch (error) {
      console.error("Error deleting character:", error);
      throw new Error("Error al eliminar personaje histórico");
    }
  }

  /**
   * Busca personajes históricos por texto
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
            { achievements: { has: searchTerm } },
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
        },
      });
    } catch (error) {
      console.error("Error searching characters:", error);
      throw new Error("Error al buscar personajes históricos");
    }
  }

  /**
   * Obtiene personajes por categoría
   * @param {string} category - Categoría de personajes
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} Lista de personajes de la categoría
   */
  static async getCharactersByCategory(
    category,
    limit = PAGINATION.DEFAULT_PAGE_SIZE
  ) {
    try {
      return await prisma.historicalFigure.findMany({
        where: { category },
        take: limit,
        orderBy: { name: "asc" },
        include: {
          timelineEvents: {
            select: { id: true, title: true, date: true },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching characters by category:", error);
      throw new Error("Error al obtener personajes por categoría");
    }
  }

  /**
   * Obtiene personajes relacionados basado en conexiones históricas
   * @param {string} characterId - ID del personaje
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} Lista de personajes relacionados
   */
  static async getRelatedCharacters(characterId, limit = 10) {
    try {
      const connections = await prisma.historicalConnection.findMany({
        where: {
          OR: [
            { sourceFigureId: characterId },
            { targetFigureId: characterId },
          ],
        },
        include: {
          sourceFigure: {
            select: { id: true, name: true, imageUrl: true, category: true },
          },
          targetFigure: {
            select: { id: true, name: true, imageUrl: true, category: true },
          },
        },
        take: limit,
      });

      // Extraer personajes únicos excluyendo el personaje actual
      const relatedCharacters = [];
      const seenIds = new Set([characterId]);

      connections.forEach((connection) => {
        if (
          connection.sourceFigure &&
          !seenIds.has(connection.sourceFigure.id)
        ) {
          relatedCharacters.push({
            ...connection.sourceFigure,
            connectionType: connection.type,
            connectionName: connection.name,
          });
          seenIds.add(connection.sourceFigure.id);
        }

        if (
          connection.targetFigure &&
          !seenIds.has(connection.targetFigure.id)
        ) {
          relatedCharacters.push({
            ...connection.targetFigure,
            connectionType: connection.type,
            connectionName: connection.name,
          });
          seenIds.add(connection.targetFigure.id);
        }
      });

      return relatedCharacters;
    } catch (error) {
      console.error("Error fetching related characters:", error);
      throw new Error("Error al obtener personajes relacionados");
    }
  }

  /**
   * Obtiene estadísticas generales de personajes
   * @returns {Promise<Object>} Estadísticas de personajes
   */
  static async getCharactersStats() {
    try {
      const [total, byCategory, withImages, withTimelineEvents] =
        await Promise.all([
          prisma.historicalFigure.count(),
          prisma.historicalFigure.groupBy({
            by: ["category"],
            _count: { id: true },
            orderBy: { _count: { id: "desc" } },
          }),
          prisma.historicalFigure.count({
            where: { imageUrl: { not: null } },
          }),
          prisma.historicalFigure.count({
            where: { timelineEvents: { some: {} } },
          }),
        ]);

      return {
        total,
        byCategory,
        withImages,
        withTimelineEvents,
        imagePercentage: Math.round((withImages / total) * 100),
        timelinePercentage: Math.round((withTimelineEvents / total) * 100),
      };
    } catch (error) {
      console.error("Error fetching characters stats:", error);
      throw new Error("Error al obtener estadísticas de personajes");
    }
  }
}
