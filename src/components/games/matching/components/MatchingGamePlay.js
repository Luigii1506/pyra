/**
 * MatchingGamePlay Component
 * Componente principal de gameplay para el juego de emparejamiento
 * @created 2024-12-19
 */

import React from 'react';
import { 
  Pause, 
  Play, 
  Lightbulb, 
  RotateCcw,
  Clock,
  Target,
  Zap,
  TrendingUp
} from 'lucide-react';
import { CARD_STYLES, CARD_STATES } from '../constants/matching-constants.js';
import { formatTime } from '../utils/matching-utils.js';

/**
 * Componente de una carta individual
 */
const MatchingCard = ({ 
  item, 
  cardState, 
  onClick, 
  disabled = false 
}) => {
  const styles = CARD_STYLES[cardState] || CARD_STYLES[CARD_STATES.IDLE];
  
  const handleClick = () => {
    if (disabled || cardState === CARD_STATES.MATCHED) return;
    onClick(item);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        min-h-[120px] p-4 rounded-xl border-2 transition-all duration-300
        ${styles.background} ${styles.border} ${styles.text} ${styles.shadow}
        ${styles.transform} ${styles.cursor} ${styles.opacity || ''}
        ${styles.animation || ''}
        ${disabled ? 'pointer-events-none' : ''}
        flex flex-col items-center justify-center text-center space-y-2
        hover:shadow-xl
      `}
    >
      {/* Emoji/Icono */}
      {item.image && (
        <div className="text-2xl md:text-3xl">
          {item.image}
        </div>
      )}
      
      {/* Contenido */}
      <div className="flex-1 flex items-center justify-center">
        <span className="font-medium text-sm md:text-base leading-tight">
          {item.content}
        </span>
      </div>
      
      {/* Indicador de tipo (opcional) */}
      <div className="text-xs opacity-70 font-medium">
        {item.type === 'person' && '👤'}
        {item.type === 'place' && '📍'}
        {item.type === 'date' && '📅'}
        {item.type === 'deity' && '⚡'}
        {item.type === 'term' && '📚'}
        {item.type === 'religion' && '🏛️'}
      </div>
    </div>
  );
};

/**
 * Componente principal de gameplay
 */
const MatchingGamePlay = ({
  game,
  onPause,
  onRestart,
  onHint,
  onBack,
}) => {
  const {
    items,
    gameState,
    isGameActive,
    canPause,
    canUseHint,
    timeElapsed,
    timeLimit,
    score,
    streak,
    hintsAvailable,
    progress,
    feedback,
    selectItem,
    getCardState,
    difficultyConfig,
  } = game;

  /**
   * Renderiza las estadísticas del juego
   */
  const renderGameStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-blue-600">{score}</div>
        <div className="text-blue-700 text-sm font-medium">Puntos</div>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-green-600">{streak}</div>
        <div className="text-green-700 text-sm font-medium">Racha</div>
      </div>
      
      <div className="bg-amber-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-amber-600">{hintsAvailable}</div>
        <div className="text-amber-700 text-sm font-medium">Pistas</div>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-purple-600">
          {progress.completed}/{progress.total}
        </div>
        <div className="text-purple-700 text-sm font-medium">Pares</div>
      </div>
    </div>
  );

  /**
   * Renderiza la barra de progreso
   */
  const renderProgressBar = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-stone-700 font-medium">Progreso del Juego</span>
        <span className="text-stone-600 text-sm">
          {progress.percentage}% completado
        </span>
      </div>
      <div className="w-full bg-stone-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
    </div>
  );

  /**
   * Renderiza el temporizador
   */
  const renderTimer = () => {
    const timeRemaining = Math.max(0, timeLimit - timeElapsed);
    const isLowTime = timeRemaining < 30;
    const progressPercentage = (timeElapsed / timeLimit) * 100;
    
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className="text-stone-600" size={20} />
            <span className="text-stone-700 font-medium">Tiempo</span>
          </div>
          <span className={`text-lg font-bold ${
            isLowTime ? 'text-red-600 animate-pulse' : 'text-stone-700'
          }`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
        <div className="w-full bg-stone-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              isLowTime ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  /**
   * Renderiza los controles del juego
   */
  const renderGameControls = () => (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {/* Pausa/Reanudar */}
      <button
        onClick={onPause}
        disabled={!canPause}
        className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isGameActive ? <Pause size={18} /> : <Play size={18} />}
        <span>{isGameActive ? 'Pausar' : 'Continuar'}</span>
      </button>

      {/* Pista */}
      <button
        onClick={onHint}
        disabled={!canUseHint}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Lightbulb size={18} />
        <span>Pista ({hintsAvailable})</span>
      </button>

      {/* Reiniciar */}
      <button
        onClick={onRestart}
        className="flex items-center space-x-2 px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors"
      >
        <RotateCcw size={18} />
        <span>Reiniciar</span>
      </button>
    </div>
  );

  /**
   * Renderiza el tablero de cartas
   */
  const renderGameBoard = () => {
    // Determinar el grid basado en el número de elementos
    const gridCols = items.length <= 8 ? 'grid-cols-2 md:grid-cols-4' :
                    items.length <= 12 ? 'grid-cols-3 md:grid-cols-4' :
                    'grid-cols-3 md:grid-cols-4 lg:grid-cols-6';

    return (
      <div className={`grid ${gridCols} gap-4 mb-6`}>
        {items.map((item) => (
          <MatchingCard
            key={item.id}
            item={item}
            cardState={getCardState(item.id)}
            onClick={selectItem}
            disabled={!isGameActive}
          />
        ))}
      </div>
    );
  };

  /**
   * Renderiza el feedback del juego
   */
  const renderFeedback = () => {
    if (!feedback) return null;

    return (
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-800 font-medium">{feedback}</p>
        </div>
      </div>
    );
  };

  /**
   * Renderiza información adicional
   */
  const renderGameInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div className="bg-white rounded-lg p-4 border border-stone-200">
        <h5 className="font-bold text-stone-800 mb-2 flex items-center space-x-2">
          <Target className="text-blue-600" size={16} />
          <span>Objetivo</span>
        </h5>
        <p className="text-stone-600">
          Encuentra los {difficultyConfig.pairs} pares de elementos relacionados 
          antes de que se acabe el tiempo.
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 border border-stone-200">
        <h5 className="font-bold text-stone-800 mb-2 flex items-center space-x-2">
          <TrendingUp className="text-green-600" size={16} />
          <span>Puntuación</span>
        </h5>
        <p className="text-stone-600">
          Gana más puntos por rachas consecutivas y completa el juego 
          rápidamente para obtener bonus adicionales.
        </p>
      </div>
    </div>
  );

  return (
    <div className="matching-game-play space-y-6">
      {/* Encabezado con estadísticas */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        {renderGameStats()}
        {renderProgressBar()}
        {renderTimer()}
        {renderGameControls()}
      </div>

      {/* Feedback */}
      {renderFeedback()}

      {/* Tablero principal */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-stone-800 text-center">
            Encuentra los Pares Relacionados
          </h4>
          <p className="text-stone-600 text-center text-sm mt-1">
            Haz clic en dos elementos que estén relacionados histórica o conceptualmente
          </p>
        </div>
        
        {renderGameBoard()}
      </div>

      {/* Información adicional */}
      <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
        {renderGameInfo()}
      </div>

      {/* Racha especial */}
      {streak >= 3 && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-center text-white shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <Zap className="animate-bounce" size={24} />
            <span className="font-bold text-lg">
              ¡Racha de {streak}! ¡Estás en llamas! 🔥
            </span>
            <Zap className="animate-bounce" size={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingGamePlay;