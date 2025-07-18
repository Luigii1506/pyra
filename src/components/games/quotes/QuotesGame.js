/**
 * QuotesGame Component - Refactored
 * Main orchestrator component for the quotes game
 * Now uses modular components for better maintainability
 * @created 2024-12-19
 * @updated 2024-12-19 - Refactored for modularity
 */

"use client";

import React, { useEffect, useState } from "react";
import useQuotesGame from "./useQuotesGame";
import GameButton from "../shared/GameButton";
import {
  QuotesGameSetup,
  QuotesGamePlay,
  QuotesGameResults,
} from "./components";

const QuotesGame = ({ onClose, customQuotes = [] }) => {
  const game = useQuotesGame(customQuotes);
  const [difficulty, setDifficulty] = useState("medium");
  const [gameMode, setGameMode] = useState("quote-to-person");
  const [showHint, setShowHint] = useState(null);

  useEffect(() => {
    game.initializeGame(difficulty, gameMode);
  }, [difficulty, gameMode]);

  const handleAnswerSelect = (answer) => {
    game.submitAnswer(answer);
  };

  const handleHint = () => {
    const hint = game.useHint();
    if (hint) {
      setShowHint(hint);
      setTimeout(() => setShowHint(null), 8000);
    }
  };

  const startGame = (mode) => {
    setGameMode(mode);
    setTimeout(() => {
      game.startGame();
    }, 100);
  };

  const handleBackToMenu = () => {
    game.resetGame();
    setGameMode("quote-to-person");
    setDifficulty("medium");
    setShowHint(null);
  };

  const renderPauseModal = () => {
    if (game.gameState !== "paused") return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Juego Pausado</h3>
          <p className="text-gray-600 mb-6">
            El juego está pausado. Presiona continuar cuando estés listo.
          </p>
          <GameButton variant="primary" onClick={game.togglePause}>
            Continuar
          </GameButton>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4">
      {/* Setup Screen */}
      {game.gameState === "setup" && (
        <QuotesGameSetup onStartGame={startGame} />
      )}

      {/* Game Play Screen */}
      {(game.gameState === "playing" || game.gameState === "paused") && (
        <QuotesGamePlay
          game={game}
          hint={showHint}
          onAnswerSelect={handleAnswerSelect}
          onHint={handleHint}
          onReset={game.resetGame}
        />
      )}

      {/* Results Screen */}
      {game.gameState === "completed" && (
        <QuotesGameResults
          game={game}
          onStartGame={startGame}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {/* Pause Modal */}
      {renderPauseModal()}
    </div>
  );
};

export default QuotesGame;
