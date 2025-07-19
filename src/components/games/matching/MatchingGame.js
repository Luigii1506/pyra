/**
 * MatchingGame Component
 * Componente principal del juego de emparejamiento histórico modular
 * @created 2024-12-19
 */

import React from "react";
import { ArrowLeft, Target } from "lucide-react";
import { useMatchingGame } from "./useMatchingGame.js";
import { MATCHING_GAME_STATES } from "./constants/matching-constants.js";

// Importar componentes modulares
import {
  MatchingGameSetup,
  MatchingGamePlay,
  MatchingGameResults,
} from "./components/index.js";

/**
 * Componente principal del juego de emparejamiento
 */
const MatchingGame = ({ onClose, initialConfig = {}, className = "" }) => {
  const game = useMatchingGame(initialConfig);

  const {
    gameState,
    difficulty,
    matchingType,
    isLoading,
    error,
    initializeGame,
    startGame,
    togglePause,
    restartGame,
    getFinalResults,
    difficultyConfig,
  } = game;

  /**
   * Maneja el inicio del juego desde la configuración
   */
  const handleStartGame = (config) => {
    initializeGame(config.difficulty, config.matchingType).then(() => {
      startGame();
    });
  };

  /**
   * Maneja el uso de pistas
   */
  const handleUseHint = () => {
    const hint = game.useHint();
    if (hint) {
      // El hook ya maneja la lógica de mostrar la pista
      console.log("Pista utilizada:", hint);
    }
  };

  /**
   * Maneja el reinicio del juego
   */
  const handleRestart = () => {
    restartGame();
  };

  /**
   * Maneja jugar de nuevo con la misma configuración
   */
  const handlePlayAgain = () => {
    initializeGame(difficulty, matchingType).then(() => {
      startGame();
    });
  };

  /**
   * Maneja volver a la configuración
   */
  const handleBackToSetup = () => {
    initializeGame();
  };

  /**
   * Renderiza el contenido según el estado actual del juego
   */
  const renderGameContent = () => {
    switch (gameState) {
      case MATCHING_GAME_STATES.SETUP:
        return (
          <MatchingGameSetup
            onStartGame={handleStartGame}
            onUpdateConfig={(config) => console.log("Config updated:", config)}
            initialDifficulty={difficulty}
            initialMatchingType={matchingType}
            isLoading={isLoading}
          />
        );

      case MATCHING_GAME_STATES.PLAYING:
      case MATCHING_GAME_STATES.PAUSED:
        return (
          <MatchingGamePlay
            game={game}
            onPause={togglePause}
            onRestart={handleRestart}
            onHint={handleUseHint}
            onBack={onClose}
          />
        );

      case MATCHING_GAME_STATES.COMPLETED:
        return (
          <MatchingGameResults
            results={getFinalResults()}
            onPlayAgain={handlePlayAgain}
            onBackToSetup={handleBackToSetup}
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

  /**
   * Obtiene el título basado en el estado del juego
   */
  const getGameTitle = () => {
    switch (gameState) {
      case MATCHING_GAME_STATES.SETUP:
        return "Conecta la Historia";
      case MATCHING_GAME_STATES.PLAYING:
        return difficultyConfig?.name
          ? `Emparejamiento ${difficultyConfig.name}`
          : "Juego de Emparejamiento";
      case MATCHING_GAME_STATES.PAUSED:
        return "Juego Pausado";
      case MATCHING_GAME_STATES.COMPLETED:
        return "Resultados del Juego";
      default:
        return "Juego de Emparejamiento";
    }
  };

  /**
   * Obtiene la descripción basada en el estado del juego
   */
  const getGameDescription = () => {
    switch (gameState) {
      case MATCHING_GAME_STATES.SETUP:
        return "Configura tu experiencia de emparejamiento histórico";
      case MATCHING_GAME_STATES.PLAYING:
        return "Encuentra los pares de elementos relacionados";
      case MATCHING_GAME_STATES.PAUSED:
        return "El juego está pausado - haz clic en continuar para seguir jugando";
      case MATCHING_GAME_STATES.COMPLETED:
        return "Revisa tu rendimiento y estadísticas";
      default:
        return "Juego de emparejamiento de conceptos históricos";
    }
  };

  return (
    <div className={`matching-game ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Target size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-800">
                {getGameTitle()}
              </h3>
              <p className="text-stone-600">{getGameDescription()}</p>
            </div>
          </div>

          {/* Información de dificultad durante el juego */}
          {(gameState === MATCHING_GAME_STATES.PLAYING ||
            gameState === MATCHING_GAME_STATES.PAUSED ||
            gameState === MATCHING_GAME_STATES.COMPLETED) && (
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-stone-800">
                  {difficultyConfig?.name}
                </div>
                <div className="text-stone-600">Dificultad</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-stone-800">
                  {difficultyConfig?.pairs}
                </div>
                <div className="text-stone-600">Pares</div>
              </div>
            </div>
          )}

          {/* Botón de retroceso */}
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
        </div>

        {/* Indicador de estado de juego */}
        {gameState === MATCHING_GAME_STATES.PAUSED && (
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <p className="text-amber-800 font-medium">
                Juego pausado - Haz clic en Continuar para seguir jugando
              </p>
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
      <div className="game-content">{renderGameContent()}</div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="text-stone-700">Preparando el juego...</span>
            </div>
          </div>
        </div>
      )}

      {/* Instrucciones flotantes para nuevos usuarios */}
      {gameState === MATCHING_GAME_STATES.SETUP && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <div className="text-sm">
            <div className="font-bold mb-1">💡 Consejo</div>
            <p>
              Empieza con dificultad Fácil si es tu primera vez. ¡La mezcla
              aleatoria es perfecta para aprender!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingGame;
