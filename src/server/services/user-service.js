/**
 * User Service
 * Handles user operations, authentication, and gamification features
 * @created 2024-12-19
 */

import prisma from "../../lib/prisma.js";
import { EXPERIENCE_POINTS, USER_RANKS } from "../../constants/app.js";
import { getUserRank } from "../../lib/utils.js";

export class UserService {
  /**
   * Obtiene un usuario por ID con información relacionada
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object|null>} Usuario con información completa
   */
  static async getUserById(userId) {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          userAchievements: {
            include: {
              achievement: true,
            },
          },
          userNotes: {
            take: 5,
            orderBy: { createdAt: "desc" },
          },
          userProgress: true,
          examAttempts: {
            take: 5,
            orderBy: { completedAt: "desc" },
            include: {
              exam: true,
            },
          },
          studySessionResults: {
            take: 10,
            orderBy: { completedAt: "desc" },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Error al obtener información del usuario");
    }
  }

  /**
   * Obtiene un usuario por email
   * @param {string} email - Email del usuario
   * @returns {Promise<Object|null>} Usuario encontrado
   */
  static async getUserByEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error("Error al buscar usuario por email");
    }
  }

  /**
   * Crea un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>} Usuario creado
   */
  static async createUser(userData) {
    const { username, email, passwordHash } = userData;

    try {
      // Verificar si ya existe un usuario con el mismo email o username
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) {
        throw new Error(
          "Ya existe un usuario con ese email o nombre de usuario"
        );
      }

      return await prisma.user.create({
        data: {
          username,
          email,
          passwordHash,
          level: 1,
          experiencePoints: 0,
          currentRank: USER_RANKS.APRENDIZ,
          dailyStreak: 0,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error(error.message || "Error al crear usuario");
    }
  }

  /**
   * Actualiza el último login y maneja la racha diaria
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object>} Usuario actualizado
   */
  static async updateLastLogin(userId) {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const now = new Date();
      const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;

      let dailyStreak = user.dailyStreak;
      let experienceBonus = 0;

      // Calcular racha diaria
      if (lastLogin) {
        const daysDifference = Math.floor(
          (now - lastLogin) / (1000 * 60 * 60 * 24)
        );

        if (daysDifference === 1) {
          // Login consecutivo - incrementar racha
          dailyStreak += 1;
          experienceBonus =
            EXPERIENCE_POINTS.DAILY_LOGIN +
            EXPERIENCE_POINTS.STREAK_BONUS * dailyStreak;
        } else if (daysDifference > 1) {
          // Se rompió la racha - reiniciar
          dailyStreak = 1;
          experienceBonus = EXPERIENCE_POINTS.DAILY_LOGIN;
        }
        // Si daysDifference === 0, ya logueó hoy, no dar puntos adicionales
      } else {
        // Primer login
        dailyStreak = 1;
        experienceBonus = EXPERIENCE_POINTS.DAILY_LOGIN;
      }

      const newExperiencePoints = user.experiencePoints + experienceBonus;
      const newRank = getUserRank(newExperiencePoints);

      return await prisma.user.update({
        where: { id: userId },
        data: {
          lastLogin: now,
          dailyStreak,
          experiencePoints: newExperiencePoints,
          currentRank: newRank,
        },
      });
    } catch (error) {
      console.error("Error updating last login:", error);
      throw new Error("Error al actualizar último login");
    }
  }

  /**
   * Añade puntos de experiencia a un usuario
   * @param {string} userId - ID del usuario
   * @param {number} points - Puntos a añadir
   * @param {string} reason - Razón para el award de puntos
   * @returns {Promise<Object>} Usuario actualizado
   */
  static async addExperiencePoints(userId, points, reason = "") {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const newExperiencePoints = user.experiencePoints + points;
      const oldRank = user.currentRank;
      const newRank = getUserRank(newExperiencePoints);

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          experiencePoints: newExperiencePoints,
          currentRank: newRank,
        },
      });

      // Si cambió de rango, verificar si hay logros por desbloquear
      if (oldRank !== newRank) {
        await this.checkRankAchievements(userId, newRank);
      }

      console.log(
        `Usuario ${userId} ganó ${points} puntos de experiencia: ${reason}`
      );
      return updatedUser;
    } catch (error) {
      console.error("Error adding experience points:", error);
      throw new Error("Error al añadir puntos de experiencia");
    }
  }

  /**
   * Verifica y otorga logros por cambio de rango
   * @param {string} userId - ID del usuario
   * @param {string} newRank - Nuevo rango alcanzado
   */
  static async checkRankAchievements(userId, newRank) {
    try {
      // Buscar si existe un logro para este rango
      const rankAchievement = await prisma.achievement.findFirst({
        where: {
          name: {
            contains: newRank,
          },
        },
      });

      if (rankAchievement) {
        // Verificar si el usuario ya tiene este logro
        const existingUserAchievement = await prisma.userAchievement.findFirst({
          where: {
            userId,
            achievementId: rankAchievement.id,
          },
        });

        if (!existingUserAchievement) {
          await this.grantAchievement(userId, rankAchievement.id);
        }
      }
    } catch (error) {
      console.error("Error checking rank achievements:", error);
    }
  }

  /**
   * Otorga un logro a un usuario
   * @param {string} userId - ID del usuario
   * @param {string} achievementId - ID del logro
   * @returns {Promise<Object>} Logro otorgado
   */
  static async grantAchievement(userId, achievementId) {
    try {
      return await prisma.userAchievement.create({
        data: {
          userId,
          achievementId,
          dateAchieved: new Date(),
        },
        include: {
          achievement: true,
        },
      });
    } catch (error) {
      console.error("Error granting achievement:", error);
      throw new Error("Error al otorgar logro");
    }
  }

  /**
   * Obtiene las estadísticas de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object>} Estadísticas del usuario
   */
  static async getUserStats(userId) {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Estadísticas de exámenes
      const examStats = await prisma.examAttempt.groupBy({
        by: ["examId"],
        where: { userId },
        _count: { id: true },
        _avg: { score: true },
        _max: { score: true },
      });

      // Estadísticas de sesiones de estudio
      const studyStats = await prisma.studySessionResult.groupBy({
        by: ["sessionType"],
        where: { userId },
        _count: { id: true },
        _avg: { score: true, duration: true },
        _sum: { duration: true },
      });

      // Notas creadas
      const notesCount = await prisma.note.count({
        where: { userId },
      });

      // Total de logros
      const achievementsCount = await prisma.userAchievement.count({
        where: { userId },
      });

      return {
        user: {
          id: user.id,
          username: user.username,
          level: user.level,
          experiencePoints: user.experiencePoints,
          currentRank: user.currentRank,
          dailyStreak: user.dailyStreak,
          createdAt: user.createdAt,
        },
        examStats,
        studyStats,
        notesCount,
        achievementsCount,
      };
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw new Error("Error al obtener estadísticas del usuario");
    }
  }

  /**
   * Obtiene el ranking de usuarios (leaderboard)
   * @param {number} limit - Número de usuarios a retornar
   * @returns {Promise<Array>} Lista de usuarios ordenada por experiencia
   */
  static async getLeaderboard(limit = 10) {
    try {
      return await prisma.user.findMany({
        take: limit,
        orderBy: [{ experiencePoints: "desc" }, { createdAt: "asc" }],
        select: {
          id: true,
          username: true,
          experiencePoints: true,
          currentRank: true,
          level: true,
          dailyStreak: true,
        },
      });
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw new Error("Error al obtener ranking de usuarios");
    }
  }
}
