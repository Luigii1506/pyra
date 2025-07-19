/**
 * FlashcardsGame Component
 * Componente principal del juego de flashcards con sistema de repetición espaciada
 * @created 2024-12-19
 */

import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useFlashcardsGame } from './useFlashcardsGame.js';
import { SAMPLE_DECKS } from './constants/flashcards-data.js';
import { FLASHCARD_GAME_STATES } from './constants/flashcards-constants.js';

// Importar componentes modulares
import { 
  DeckSelection,
  CardDisplay,
  SessionComplete 
} from './components/index.js';

/**
 * Componente principal del juego de flashcards
 */
const FlashcardsGame = ({ 
  onClose,
  initialDecks = SAMPLE_DECKS,
  sessionLimits = {},
  className = "",
}) => {
  const {
    gameState,
    selectedDeck,
    currentCard,
    showAnswer,
    isLoading,
    error,
    sessionStats,
    sessionProgress,
    deckStats,
    estimatedTimeRemaining,
    motivationalMessage,
    finalReport,
    selectDeck,
    revealAnswer,
    answerCard,
    resetGame,
    updateSessionLimits,
    canRevealAnswer,
    canAnswerCard,
    isSessionComplete,
  } = useFlashcardsGame(initialDecks, { sessionLimits });

  /**
   * Renderiza el contenido según el estado actual del juego
   */
  const renderGameContent = () => {
    switch (gameState) {
      case FLASHCARD_GAME_STATES.DECK_SELECTION:
        return (
          <DeckSelection
            decks={initialDecks}
            onSelectDeck={selectDeck}
            onUpdateLimits={updateSessionLimits}
            isLoading={isLoading}
            error={error}
          />
        );

      case FLASHCARD_GAME_STATES.CARD_FRONT:
      case FLASHCARD_GAME_STATES.CARD_BACK:
        return (
          <CardDisplay
            deck={selectedDeck}
            card={currentCard}
            showAnswer={showAnswer}
            sessionStats={sessionStats}
            sessionProgress={sessionProgress}
            deckStats={deckStats}
            onRevealAnswer={revealAnswer}
            onAnswerCard={answerCard}
            onBackToDashboard={onClose}
            canRevealAnswer={canRevealAnswer}
            canAnswerCard={canAnswerCard}
            isLoading={isLoading}
          />
        );

      case FLASHCARD_GAME_STATES.SESSION_COMPLETE:
        return (
          <SessionComplete
            sessionReport={finalReport}
            motivationalMessage={motivationalMessage}
            onStartNewSession={() => resetGame()}
            onBackToDashboard={onClose}
          />
        );

      default:
        return (
          <div className="text-center p-8">
            <p className="text-stone-600">Estado del juego no reconocido</p>
          </div>
        );
    }
  };

  return (
    <div className={`flashcards-game ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-800">
                {gameState === FLASHCARD_GAME_STATES.DECK_SELECTION 
                  ? 'Seleccionar Mazo'
                  : gameState === FLASHCARD_GAME_STATES.SESSION_COMPLETE
                  ? 'Sesión Completada'
                  : selectedDeck?.title || 'Flashcards'
                }
              </h3>
              <p className="text-stone-600">
                {gameState === FLASHCARD_GAME_STATES.DECK_SELECTION 
                  ? 'Elige un mazo para comenzar tu sesión de estudio'
                  : gameState === FLASHCARD_GAME_STATES.SESSION_COMPLETE
                  ? 'Revisa tu progreso y estadísticas'
                  : `Tarjeta ${sessionProgress.current} de ${sessionProgress.total}`
                }
              </p>
            </div>
          </div>

          {/* Botón de retroceso */}
          <div className="flex items-center space-x-4">
            {/* Estadísticas rápidas durante el juego */}
            {(gameState === FLASHCARD_GAME_STATES.CARD_FRONT || 
              gameState === FLASHCARD_GAME_STATES.CARD_BACK) && (
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {sessionStats.streakCount}
                  </div>
                  <div className="text-stone-600">Racha</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {sessionStats.correctAnswers}
                  </div>
                  <div className="text-stone-600">Correctas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {estimatedTimeRemaining}m
                  </div>
                  <div className="text-stone-600">Restante</div>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Volver</span>
            </button>
          </div>
        </div>

        {/* Barra de progreso durante la sesión */}
        {(gameState === FLASHCARD_GAME_STATES.CARD_FRONT || 
          gameState === FLASHCARD_GAME_STATES.CARD_BACK) && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-stone-700 font-medium">Progreso de la Sesión</span>
              <span className="text-stone-600 text-sm">
                {sessionProgress.percentage}% completado
              </span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-3">
              <div
                className="bg-amber-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${sessionProgress.percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <p className="text-red-800 font-medium">Error</p>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      )}

      {/* Contenido principal del juego */}
      <div className="game-content">
        {renderGameContent()}
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
              <span className="text-stone-700">Procesando...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardsGame;