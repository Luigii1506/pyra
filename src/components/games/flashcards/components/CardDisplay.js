/**
 * CardDisplay Component
 * Componente para mostrar tarjetas durante la sesión de estudio
 * @created 2024-12-19
 */

import React from 'react';
import { 
  Eye, 
  ArrowLeft, 
  ArrowRight,
  RotateCcw,
  Zap,
  Target,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { getMasteryConfig } from '../utils/flashcards-utils.js';
import { ANSWER_BUTTONS, ANSWER_TYPES } from '../constants/flashcards-constants.js';

/**
 * Componente principal para mostrar tarjetas
 */
const CardDisplay = ({
  deck,
  card,
  showAnswer = false,
  sessionStats,
  sessionProgress,
  deckStats,
  onRevealAnswer,
  onAnswerCard,
  onBackToDashboard,
  canRevealAnswer = false,
  canAnswerCard = false,
  isLoading = false,
}) => {
  if (!card || !deck) {
    return (
      <div className="text-center p-8">
        <p className="text-stone-600">No hay tarjeta disponible</p>
      </div>
    );
  }

  const masteryConfig = getMasteryConfig(card);

  /**
   * Renderiza el frente de la tarjeta
   */
  const renderCardFront = () => (
    <div className="text-center">
      {/* Indicador de nivel de dominio */}
      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${masteryConfig.color}`}>
          {masteryConfig.label}
        </span>
      </div>

      {/* Pregunta */}
      <h4 className="text-2xl font-bold text-stone-800 mb-6 leading-relaxed">
        {card.front}
      </h4>

      {/* Instrucción para revelar */}
      <div className="flex items-center justify-center space-x-2 text-stone-500 mb-6">
        <Eye size={20} />
        <span>Haz click para ver la respuesta</span>
      </div>

      {/* Botón para revelar respuesta */}
      <button
        onClick={onRevealAnswer}
        disabled={!canRevealAnswer || isLoading}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Mostrar Respuesta
      </button>
    </div>
  );

  /**
   * Renderiza el reverso de la tarjeta con la respuesta
   */
  const renderCardBack = () => (
    <div className="text-center">
      {/* Pregunta (más pequeña) */}
      <h4 className="text-xl font-bold text-stone-800 mb-4">
        {card.front}
      </h4>

      {/* Respuesta */}
      <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 mb-6">
        <p className="text-stone-700 leading-relaxed text-lg">
          {card.back}
        </p>
      </div>

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {card.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Estadísticas de la tarjeta */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{card.reviews || 0}</div>
          <div className="text-stone-600">Revisiones</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">{card.lapses || 0}</div>
          <div className="text-stone-600">Errores</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {card.easeFactor ? Math.round(card.easeFactor * 100) / 100 : 'N/A'}
          </div>
          <div className="text-stone-600">Factor</div>
        </div>
      </div>
    </div>
  );

  /**
   * Renderiza los botones de respuesta (Anki-style)
   */
  const renderAnswerButtons = () => {
    if (!showAnswer || !canAnswerCard) return null;

    return (
      <div className="bg-stone-50 p-6 border-t border-amber-200">
        <div className="text-center mb-4">
          <p className="text-stone-700 font-medium">¿Qué tan fácil fue recordar esta respuesta?</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(ANSWER_BUTTONS).map(([key, config]) => (
            <button
              key={key}
              onClick={() => onAnswerCard(key)}
              disabled={isLoading}
              className={`flex flex-col items-center space-y-2 p-4 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${config.color}`}
              title={config.description}
            >
              <span className="text-2xl">{config.icon}</span>
              <span className="font-medium">{config.label}</span>
              <span className="text-xs opacity-90 text-center leading-tight">
                {config.description}
              </span>
            </button>
          ))}
        </div>

        {/* Ayuda visual para nuevos usuarios */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-sm text-center">
            💡 <strong>Consejo:</strong> Sé honesto contigo mismo. Una evaluación precisa mejora tu aprendizaje.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="card-display space-y-6">
      {/* Tarjeta principal */}
      <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
        <div 
          className="min-h-96 p-8 cursor-pointer transition-all duration-300 hover:bg-amber-50"
          onClick={canRevealAnswer ? onRevealAnswer : undefined}
        >
          <div className="flex items-center justify-center h-full">
            {showAnswer ? renderCardBack() : renderCardFront()}
          </div>
        </div>
        
        {/* Botones de respuesta */}
        {renderAnswerButtons()}
      </div>

      {/* Panel de estadísticas de sesión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estadísticas de la sesión actual */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <h5 className="text-lg font-bold text-stone-800 mb-4 flex items-center space-x-2">
            <Zap className="text-amber-600" size={20} />
            <span>Sesión Actual</span>
          </h5>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {sessionStats.correctAnswers}
              </div>
              <div className="text-stone-600 text-sm">Correctas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {sessionStats.totalAnswers - sessionStats.correctAnswers}
              </div>
              <div className="text-stone-600 text-sm">Errores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {sessionStats.streakCount}
              </div>
              <div className="text-stone-600 text-sm">Racha Actual</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {sessionStats.longestStreak}
              </div>
              <div className="text-stone-600 text-sm">Mejor Racha</div>
            </div>
          </div>

          {/* Precisión */}
          {sessionStats.totalAnswers > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-stone-700 font-medium">Precisión</span>
                <span className="text-stone-600 text-sm">
                  {Math.round((sessionStats.correctAnswers / sessionStats.totalAnswers) * 100)}%
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(sessionStats.correctAnswers / sessionStats.totalAnswers) * 100}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Estadísticas del mazo */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <h5 className="text-lg font-bold text-stone-800 mb-4 flex items-center space-x-2">
            <Target className="text-blue-600" size={20} />
            <span>Estado del Mazo</span>
          </h5>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {deckStats?.new || 0}
              </div>
              <div className="text-stone-600 text-sm">Nuevas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {deckStats?.learning || 0}
              </div>
              <div className="text-stone-600 text-sm">Aprendiendo</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {deckStats?.due || 0}
              </div>
              <div className="text-stone-600 text-sm">Vencidas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {deckStats?.review || 0}
              </div>
              <div className="text-stone-600 text-sm">Revisión</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación y controles */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-2 px-6 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver al Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Indicador de progreso */}
            <div className="text-center">
              <div className="text-stone-700 font-medium">
                {sessionProgress.current} / {sessionProgress.total}
              </div>
              <div className="text-stone-600 text-sm">Tarjetas</div>
            </div>
            
            {/* Mensaje motivacional */}
            {sessionStats.streakCount > 0 && (
              <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-green-800 font-medium">
                    ¡{sessionStats.streakCount} seguidas! 🔥
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;