/**
 * TimelineGame Component
 * Juego de línea de tiempo simple y directo
 * @created 2024-12-19
 */

import React from "react";
import useTimelineGame from "./useTimelineGame.js";
import { TIMELINE_GAME_STATES } from "./constants/timeline-constants.js";
import { DEFAULT_TIMELINE_EVENTS } from "./constants/timeline-data.js";
import { TimelineGamePlay, TimelineGameResults } from "./components/index.js";

const TimelineGame = ({
  onBack = null,
  onGameComplete = null,
  events = DEFAULT_TIMELINE_EVENTS,
}) => {
  // Hook principal del juego con eventos por defecto
  const {
    gameState,
    shuffledEvents,
    userOrder,
    verification,
    attempts,
    showHints,
    score,
    gameStartTime,
    gameEndTime,
    canVerify,
    progress,
    stats,
    actions,
    utils,
  } = useTimelineGame(events);

  // Auto-iniciar el juego cuando se monta el componente
  React.useEffect(() => {
    if (gameState === TIMELINE_GAME_STATES.SETUP) {
      actions.startGame();
    }
  }, [gameState, actions]);

  // Manejar finalización del juego
  React.useEffect(() => {
    if (gameState === TIMELINE_GAME_STATES.FINISHED && onGameComplete) {
      onGameComplete({
        score: score.finalScore,
        attempts,
        accuracy: verification?.accuracy || 0,
        feedback: utils.getFeedback(),
      });
    }
  }, [gameState, score, attempts, verification, utils, onGameComplete]);

  // Renderizar según el estado del juego
  const renderGameContent = () => {
    switch (gameState) {
      case TIMELINE_GAME_STATES.SETUP:
        return (
          <div className="text-center p-8">
            <div className="text-stone-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Preparando eventos históricos...</p>
            </div>
          </div>
        );

      case TIMELINE_GAME_STATES.PLAYING:
        return (
          <TimelineGamePlay
            shuffledEvents={shuffledEvents}
            userOrder={userOrder}
            verification={verification}
            attempts={attempts}
            showHints={showHints}
            maxAttempts={3}
            onDragStart={actions.handleDragStart}
            onDragOver={actions.handleDragOver}
            onDrop={actions.handleDrop}
            onRemoveFromOrder={actions.removeFromOrder}
            onAddToOrder={actions.addToOrder}
            onVerifyOrder={actions.verifyOrder}
            onShowHints={actions.toggleHints}
            onReset={actions.resetGame}
            canVerify={canVerify}
            canShowHints={true}
          />
        );

      case TIMELINE_GAME_STATES.FINISHED:
        return (
          <TimelineGameResults
            verification={verification}
            score={score}
            attempts={attempts}
            events={events}
            userOrder={userOrder}
            gameStartTime={gameStartTime}
            gameEndTime={gameEndTime}
            onPlayAgain={actions.startGame}
            onBack={onBack}
          />
        );

      default:
        return (
          <div className="text-center text-stone-600 p-8">
            <p>Cargando...</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 to-stone-50">
      <div className="container mx-auto px-4 py-8">{renderGameContent()}</div>
    </div>
  );
};

export default TimelineGame;
