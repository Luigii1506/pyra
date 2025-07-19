/**
 * MatchingGameResults Component
 * Componente para mostrar resultados al completar el juego de emparejamiento
 * @created 2024-12-19
 */

import React from 'react';
import { 
  Trophy, 
  Target, 
  Clock, 
  Zap,
  TrendingUp,
  RotateCcw,
  ArrowLeft,
  Star,
  Award,
  BarChart3
} from 'lucide-react';
import { formatTime } from '../utils/matching-utils.js';

/**
 * Componente de resultados del juego
 */
const MatchingGameResults = ({
  results,
  onPlayAgain,
  onBackToSetup,
  onBackToDashboard,
}) => {
  if (!results) {
    return (
      <div className="text-center p-8">
        <p className="text-stone-600">No hay resultados disponibles</p>
      </div>
    );
  }

  const {
    finalScore,
    breakdown,
    stats,
    performanceLevel,
    gameCompleted,
    timeUsed,
    timeLimit,
    difficulty,
  } = results;

  /**
   * Renderiza el encabezado con el resultado principal
   */
  const renderHeader = () => (
    <div className="text-center mb-8">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200">
        <div className="text-6xl mb-4">{performanceLevel.icon}</div>
        <h3 className="text-3xl font-bold text-stone-800 mb-2">
          {gameCompleted ? '¡Juego Completado!' : '¡Buen Intento!'}
        </h3>
        <div className={`text-xl font-semibold mb-4 ${performanceLevel.color}`}>
          Nivel: {performanceLevel.level}
        </div>
        <p className="text-stone-600 text-lg">{performanceLevel.description}</p>
        
        {/* Puntuación principal */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-1">{finalScore}</div>
          <div className="text-blue-700 font-medium">Puntuación Final</div>
        </div>
      </div>
    </div>
  );

  /**
   * Renderiza las estadísticas principales
   */
  const renderMainStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 text-center border border-stone-200">
        <div className="text-3xl font-bold text-green-600 mb-2">{stats.accuracy}%</div>
        <div className="text-stone-700 font-medium">Precisión</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 text-center border border-stone-200">
        <div className="text-3xl font-bold text-blue-600 mb-2">{formatTime(timeUsed)}</div>
        <div className="text-stone-700 font-medium">Tiempo Usado</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 text-center border border-stone-200">
        <div className="text-3xl font-bold text-purple-600 mb-2">{stats.maxStreak}</div>
        <div className="text-stone-700 font-medium">Mejor Racha</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 text-center border border-stone-200">
        <div className="text-3xl font-bold text-amber-600 mb-2">{stats.averageTimePerMatch}s</div>
        <div className="text-stone-700 font-medium">Tiempo/Par</div>
      </div>
    </div>
  );

  /**
   * Renderiza el desglose de puntuación
   */
  const renderScoreBreakdown = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 mb-8">
      <h4 className="text-xl font-bold text-stone-800 mb-4 flex items-center space-x-2">
        <BarChart3 className="text-blue-600" size={24} />
        <span>Desglose de Puntuación</span>
      </h4>

      <div className="space-y-3">
        {Object.entries(breakdown).map(([category, points]) => {
          const isPositive = points > 0;
          const isNegative = points < 0;
          
          return (
            <div key={category} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-b-0">
              <span className="text-stone-700">{category}</span>
              <span className={`font-bold ${
                isPositive ? 'text-green-600' : 
                isNegative ? 'text-red-600' : 'text-stone-600'
              }`}>
                {isPositive && '+'}{points}
              </span>
            </div>
          );
        })}
        
        <div className="flex items-center justify-between pt-3 border-t-2 border-blue-200">
          <span className="text-lg font-bold text-stone-800">Total</span>
          <span className="text-2xl font-bold text-blue-600">{finalScore}</span>
        </div>
      </div>
    </div>
  );

  /**
   * Renderiza las estadísticas detalladas
   */
  const renderDetailedStats = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 mb-8">
      <h4 className="text-xl font-bold text-stone-800 mb-4 flex items-center space-x-2">
        <TrendingUp className="text-green-600" size={24} />
        <span>Análisis de Rendimiento</span>
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-bold text-stone-700 mb-3">Eficiencia</h5>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-stone-600">Precisión</span>
                <span className="text-sm font-medium">{stats.accuracy}%</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.accuracy}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-stone-600">Eficiencia de Tiempo</span>
                <span className="text-sm font-medium">{stats.timeEfficiency}%</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(stats.timeEfficiency, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-bold text-stone-700 mb-3">Detalles</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-600">Pistas utilizadas:</span>
              <span className="font-medium">{stats.hintsUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Juego perfecto:</span>
              <span className={`font-medium ${stats.perfectGame ? 'text-green-600' : 'text-red-600'}`}>
                {stats.perfectGame ? 'Sí' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Dificultad:</span>
              <span className="font-medium capitalize">{difficulty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Tiempo límite:</span>
              <span className="font-medium">{formatTime(timeLimit)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renderiza logros desbloqueados
   */
  const renderAchievements = () => {
    const achievements = [];
    
    if (stats.perfectGame) {
      achievements.push({
        title: 'Juego Perfecto',
        description: 'Completado sin errores',
        icon: '🎯',
        color: 'bg-purple-100 text-purple-800'
      });
    }
    
    if (stats.timeEfficiency >= 80) {
      achievements.push({
        title: 'Velocista',
        description: 'Completado muy rápidamente',
        icon: '⚡',
        color: 'bg-yellow-100 text-yellow-800'
      });
    }
    
    if (stats.maxStreak >= 5) {
      achievements.push({
        title: 'Racha Impresionante',
        description: '5+ aciertos consecutivos',
        icon: '🔥',
        color: 'bg-orange-100 text-orange-800'
      });
    }
    
    if (stats.hintsUsed === 0) {
      achievements.push({
        title: 'Independiente',
        description: 'Sin usar pistas',
        icon: '🧠',
        color: 'bg-blue-100 text-blue-800'
      });
    }
    
    if (stats.accuracy >= 90) {
      achievements.push({
        title: 'Experto',
        description: '90%+ de precisión',
        icon: '🌟',
        color: 'bg-green-100 text-green-800'
      });
    }

    if (achievements.length === 0) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 mb-8">
        <h4 className="text-xl font-bold text-stone-800 mb-4 flex items-center space-x-2">
          <Award className="text-amber-600" size={24} />
          <span>Logros Desbloqueados</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className={`p-4 rounded-lg border ${achievement.color}`}>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <div className="font-bold">{achievement.title}</div>
                  <div className="text-sm opacity-80">{achievement.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * Renderiza consejos para mejorar
   */
  const renderImprovementTips = () => {
    const tips = [];
    
    if (stats.accuracy < 80) {
      tips.push('Tómate más tiempo para leer y analizar cada elemento antes de hacer clic');
    }
    
    if (stats.timeEfficiency < 50) {
      tips.push('Intenta ser más decisivo en tus selecciones para mejorar tu velocidad');
    }
    
    if (stats.hintsUsed > 1) {
      tips.push('Practica más para reducir la dependencia de las pistas');
    }
    
    if (!stats.perfectGame) {
      tips.push('Revisa tu conocimiento histórico para evitar errores en futuras partidas');
    }
    
    tips.push('La práctica constante mejora tanto la velocidad como la precisión');

    return (
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-8">
        <h5 className="text-lg font-bold text-blue-800 mb-3 flex items-center space-x-2">
          <Star className="text-blue-600" size={20} />
          <span>Consejos para Mejorar</span>
        </h5>
        
        <div className="space-y-2">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2 text-blue-700">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * Renderiza los botones de acción
   */
  const renderActionButtons = () => (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <button
        onClick={onPlayAgain}
        className="flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RotateCcw size={20} />
        <span>Jugar de Nuevo</span>
      </button>
      
      <button
        onClick={onBackToSetup}
        className="flex items-center justify-center space-x-2 px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
      >
        <Target size={20} />
        <span>Cambiar Configuración</span>
      </button>
      
      <button
        onClick={onBackToDashboard}
        className="flex items-center justify-center space-x-2 px-8 py-3 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Volver al Dashboard</span>
      </button>
    </div>
  );

  return (
    <div className="matching-game-results space-y-6">
      {renderHeader()}
      {renderMainStats()}
      {renderScoreBreakdown()}
      {renderDetailedStats()}
      {renderAchievements()}
      {renderImprovementTips()}
      {renderActionButtons()}
    </div>
  );
};

export default MatchingGameResults;