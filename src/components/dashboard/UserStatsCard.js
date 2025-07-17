/**
 * User Stats Card Component
 * Displays user statistics and gamification progress in the dashboard
 * @created 2024-12-19
 */

import React from "react";
import {
  Crown,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Card from "../ui/Card.js";
import LoadingSpinner from "../ui/LoadingSpinner.js";
import { formatDate, getRankProgress } from "../../lib/utils.js";

const UserStatsCard = ({
  user,
  userStats,
  achievements = [],
  loading = false,
  className = "",
}) => {
  if (loading) {
    return (
      <Card className={`${className}`}>
        <LoadingSpinner size="lg" text="Cargando estadísticas..." />
      </Card>
    );
  }

  if (!user) {
    return (
      <Card variant="warning" className={className}>
        <Card.Body>
          <p className="text-center text-yellow-800">
            Inicia sesión para ver tus estadísticas
          </p>
        </Card.Body>
      </Card>
    );
  }

  const rankProgress = getRankProgress(user.experiencePoints);
  const recentAchievements = achievements.slice(0, 3);

  return (
    <Card className={className} variant="primary">
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-amber-600" />
            <span>Mi Progreso</span>
          </Card.Title>
          <Card.Badge variant="primary">{user.currentRank}</Card.Badge>
        </div>
      </Card.Header>

      <Card.Body className="space-y-4">
        {/* Progreso de Rango */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">
              Progreso hacia {rankProgress.nextRank || "Máximo Rango"}
            </span>
            <span className="text-gray-600">{user.experiencePoints} XP</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${rankProgress.progress}%` }}
            />
          </div>

          {rankProgress.nextRank && (
            <p className="text-xs text-gray-600">
              {rankProgress.pointsToNext} XP para siguiente rango
            </p>
          )}
        </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border">
            <Target className="h-6 w-6 text-blue-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">
              {userStats?.examStats?.length || 0}
            </p>
            <p className="text-xs text-gray-600">Exámenes</p>
          </div>

          <div className="text-center p-3 bg-white rounded-lg border">
            <BookOpen className="h-6 w-6 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">
              {userStats?.studyStats?.length || 0}
            </p>
            <p className="text-xs text-gray-600">Sesiones</p>
          </div>

          <div className="text-center p-3 bg-white rounded-lg border">
            <Award className="h-6 w-6 text-purple-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">
              {userStats?.achievementsCount || 0}
            </p>
            <p className="text-xs text-gray-600">Logros</p>
          </div>

          <div className="text-center p-3 bg-white rounded-lg border">
            <TrendingUp className="h-6 w-6 text-orange-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">
              {user.dailyStreak}
            </p>
            <p className="text-xs text-gray-600">Días seguidos</p>
          </div>
        </div>

        {/* Logros Recientes */}
        {recentAchievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span>Logros Recientes</span>
            </h4>

            <div className="space-y-1">
              {recentAchievements.map((achievement, index) => (
                <div
                  key={achievement.id || index}
                  className="flex items-center space-x-2 p-2 bg-white rounded border"
                >
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="h-3 w-3 text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {achievement.achievement?.name || achievement.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(achievement.dateAchieved)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Información de Cuenta */}
        <div className="pt-2 border-t border-amber-200">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Miembro desde</span>
            </div>
            <span>{formatDate(user.createdAt)}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserStatsCard;
