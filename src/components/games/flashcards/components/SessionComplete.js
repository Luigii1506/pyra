/**
 * SessionComplete Component
 * Componente para mostrar resultados al completar una sesión de flashcards
 * @created 2024-12-19
 */

import React from 'react';
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp,
  RotateCcw,
  ArrowLeft,
  Star,
  Zap,
  Award,
  BarChart3
} from 'lucide-react';
import { ANSWER_TYPES, ANSWER_BUTTONS } from '../constants/flashcards-constants.js';

/**
 * Componente de sesión completada
 */
const SessionComplete = ({
  sessionReport,
  motivationalMessage,
  onStartNewSession,
  onBackToDashboard,
}) => {
  if (!sessionReport) {
    return (
      <div className="text-center p-8">
        <p className="text-stone-600">No hay datos de la sesión disponibles</p>
      </div>
    );
  }

  const {
    cardsStudied,
    studyTime,
    totalAnswers,
    accuracy,
    answerBreakdown,
    averageTimePerCard,
    newCardsLearned,
  } = sessionReport;

  /**
   * Determina el nivel de rendimiento basado en la precisión
   */
  const getPerformanceLevel = (accuracy) => {
    if (accuracy >= 90) return { level: 'Excelente', color: 'text-green-600', icon: '🌟' };
    if (accuracy >= 75) return { level: 'Muy Bueno', color: 'text-blue-600', icon: '👍' };
    if (accuracy >= 60) return { level: 'Bueno', color: 'text-amber-600', icon: '💪' };
    if (accuracy >= 40) return { level: 'Regular', color: 'text-orange-600', icon: '🌱' };
    return { level: 'Necesita Práctica', color: 'text-red-600', icon: '🎯' };
  };

  const performance = getPerformanceLevel(accuracy);

  /**
   * Renderiza las estadísticas principales
   */
  const renderMainStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="text-center bg-blue-50 p-6 rounded-lg">
        <div className="text-3xl font-bold text-blue-600 mb-2">{cardsStudied}</div>
        <div className="text-stone-700 font-medium">Tarjetas Estudiadas</div>
      </div>
      
      <div className="text-center bg-green-50 p-6 rounded-lg">
        <div className="text-3xl font-bold text-green-600 mb-2">{accuracy}%</div>
        <div className="text-stone-700 font-medium">Precisión</div>
      </div>
      
      <div className="text-center bg-purple-50 p-6 rounded-lg">
        <div className="text-3xl font-bold text-purple-600 mb-2">{studyTime}</div>
        <div className="text-stone-700 font-medium">Minutos de Estudio</div>
      </div>
      
      <div className="text-center bg-amber-50 p-6 rounded-lg">
        <div className="text-3xl font-bold text-amber-600 mb-2">{newCardsLearned}</div>
        <div className="text-stone-700 font-medium">Nuevas Aprendidas</div>
      </div>
    </div>
  );

  /**
   * Renderiza el desglose de respuestas
   */
  const renderAnswerBreakdown = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 mb-6">
      <h4 className="text-xl font-bold text-stone-800 mb-4 flex items-center space-x-2">
        <BarChart3 className="text-blue-600" size={24} />
        <span>Desglose de Respuestas</span>
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(ANSWER_TYPES).map(([key, value]) => {
          const config = ANSWER_BUTTONS[value];
          const count = answerBreakdown[value] || 0;
          const percentage = totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0;
          
          return (
            <div key={key} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-lg flex items-center justify-center text-white text-2xl ${config.color.split(' ')[0]}`}>
                {config.icon}
              </div>
              <div className="text-2xl font-bold text-stone-800">{count}</div>
              <div className="text-stone-600 text-sm">{config.label}</div>
              <div className="text-stone-500 text-xs">{percentage}%</div>
            </div>
          );
        })}
      </div>

      {/* Gráfico de barras visual */}
      <div className="mt-6">
        <div className="space-y-2">
          {Object.entries(ANSWER_TYPES).map(([key, value]) => {
            const config = ANSWER_BUTTONS[value];
            const count = answerBreakdown[value] || 0;
            const percentage = totalAnswers > 0 ? (count / totalAnswers) * 100 : 0;
            
            return (
              <div key={key} className="flex items-center space-x-3">
                <div className="w-20 text-sm text-stone-700">{config.label}</div>
                <div className="flex-1 bg-stone-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${config.color.split(' ')[0]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-stone-600 text-right">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  /**
   * Renderiza logros y reconocimientos
   */
  const renderAchievements = () => {
    const achievements = [];
    
    if (accuracy >= 90) achievements.push({ title: 'Maestro de la Precisión', icon: '🎯', description: '90%+ de precisión' });
    if (cardsStudied >= 50) achievements.push({ title: 'Estudiante Dedicado', icon: '📚', description: '50+ tarjetas estudiadas' });
    if (studyTime >= 30) achievements.push({ title: 'Maratón de Estudio', icon: '⏰', description: '30+ minutos de estudio' });
    if (newCardsLearned >= 10) achievements.push({ title: 'Explorador del Conocimiento', icon: '🗺️', description: '10+ tarjetas nuevas' });
    if (answerBreakdown[ANSWER_TYPES.EASY] >= answerBreakdown[ANSWER_TYPES.AGAIN]) {
      achievements.push({ title: 'Dominio Creciente', icon: '📈', description: 'Más respuestas fáciles que difíciles' });
    }

    if (achievements.length === 0) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 mb-6">
        <h4 className="text-xl font-bold text-stone-800 mb-4 flex items-center space-x-2">
          <Award className="text-amber-600" size={24} />
          <span>Logros Desbloqueados</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <div className="font-bold text-stone-800">{achievement.title}</div>
                  <div className="text-stone-600 text-sm">{achievement.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="session-complete space-y-6">
      {/* Header con mensaje motivacional */}
      <div className="text-center mb-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200">
          <div className="text-6xl mb-4">{performance.icon}</div>
          <h3 className="text-3xl font-bold text-stone-800 mb-2">¡Sesión Completada!</h3>
          <p className={`text-xl font-semibold mb-4 ${performance.color}`}>
            Rendimiento: {performance.level}
          </p>
          <p className="text-stone-600 text-lg">{motivationalMessage}</p>
        </div>
      </div>

      {/* Estadísticas principales */}
      {renderMainStats()}

      {/* Desglose de respuestas */}
      {renderAnswerBreakdown()}

      {/* Logros */}
      {renderAchievements()}

      {/* Estadísticas detalladas */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h4 className="text-xl font-bold text-stone-800 mb-4 flex items-center space-x-2">
          <TrendingUp className="text-green-600" size={24} />
          <span>Estadísticas Detalladas</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Clock className="text-blue-600 mx-auto mb-2" size={32} />
            <div className="text-2xl font-bold text-stone-800">{averageTimePerCard}s</div>
            <div className="text-stone-600">Promedio por Tarjeta</div>
          </div>
          
          <div className="text-center">
            <Target className="text-green-600 mx-auto mb-2" size={32} />
            <div className="text-2xl font-bold text-stone-800">{totalAnswers}</div>
            <div className="text-stone-600">Total de Respuestas</div>
          </div>
          
          <div className="text-center">
            <Zap className="text-amber-600 mx-auto mb-2" size={32} />
            <div className="text-2xl font-bold text-stone-800">
              {studyTime > 0 ? Math.round(cardsStudied / (studyTime / 60)) : 0}
            </div>
            <div className="text-stone-600">Tarjetas por Minuto</div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={onStartNewSession}
          className="flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCcw size={20} />
          <span>Nueva Sesión</span>
        </button>
        
        <button
          onClick={onBackToDashboard}
          className="flex items-center justify-center space-x-2 px-8 py-3 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver al Dashboard</span>
        </button>
      </div>

      {/* Consejos para mejorar */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h5 className="text-lg font-bold text-blue-800 mb-3 flex items-center space-x-2">
          <Star className="text-blue-600" size={20} />
          <span>Consejos para Mejorar</span>
        </h5>
        
        <div className="space-y-2 text-blue-700">
          {accuracy < 70 && (
            <p>• Considera revisar el material antes de estudiar las tarjetas</p>
          )}
          {answerBreakdown[ANSWER_TYPES.AGAIN] > cardsStudied * 0.3 && (
            <p>• Muchas tarjetas marcadas como "Otra vez" - tómate más tiempo para pensar</p>
          )}
          {averageTimePerCard < 10 && (
            <p>• Estás yendo muy rápido - tómate más tiempo para reflexionar</p>
          )}
          {answerBreakdown[ANSWER_TYPES.EASY] > cardsStudied * 0.5 && (
            <p>• Muchas respuestas "fáciles" - considera agregar tarjetas más desafiantes</p>
          )}
          <p>• La consistencia es clave - estudia un poco cada día para mejores resultados</p>
        </div>
      </div>
    </div>
  );
};

export default SessionComplete;