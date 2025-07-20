/**
 * TriviaGame Component
 * Juego de trivia simple y directo como antes
 * @created 2024-12-19
 */

import React from "react";
import useTriviaGame from "./useTriviaGame.js";
import { TRIVIA_GAME_STATES } from "./constants/trivia-constants.js";
import { SAMPLE_QUESTIONS } from "./constants/trivia-data.js";
import { TriviaGamePlay, TriviaGameResults } from "./components/index.js";

// Configuración simple por defecto
const DEFAULT_CONFIG = {
  questions: SAMPLE_QUESTIONS,
  timeLimit: 60,
  category: "mixed",
  difficulty: "medium",
  useBalancedQuestions: false,
  showExplanations: true,
  autoPauseOnBlur: false,
};

const TriviaGame = ({
  onBack = null,
  onGameComplete = null,
  timeLimit = 60,
  showDetailedReview = false,
}) => {
  // Hook principal del juego con configuración simple
  const {
    gameState,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    timeLeft,
    timeElapsed,
    score,
    answers,
    streak,
    bestStreak,
    gameConfig,
    stats,
    finalStats,
    actions,
    status,
  } = useTriviaGame({
    ...DEFAULT_CONFIG,
    timeLimit,
  });

  // Auto-iniciar el juego cuando se monta el componente
  React.useEffect(() => {
    if (gameState === TRIVIA_GAME_STATES.SETUP) {
      actions.startGame({
        ...DEFAULT_CONFIG,
        timeLimit,
      });
    }
  }, []);

  // Manejar finalización del juego
  React.useEffect(() => {
    if (gameState === TRIVIA_GAME_STATES.FINISHED && onGameComplete) {
      onGameComplete(finalStats);
    }
  }, [gameState, finalStats, onGameComplete]);

  // Renderizar según el estado del juego
  const renderGameContent = () => {
    switch (gameState) {
      case TRIVIA_GAME_STATES.SETUP:
        return (
          <div className="text-center p-8">
            <div className="text-stone-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Preparando juego...</p>
            </div>
          </div>
        );

      case TRIVIA_GAME_STATES.PLAYING:
      case TRIVIA_GAME_STATES.PAUSED:
        return (
          <TriviaGamePlay
            gameState={gameState}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            timeLeft={timeLeft}
            score={score}
            streak={streak}
            difficulty={gameConfig.difficulty}
            category={gameConfig.category}
            onAnswerQuestion={actions.answerQuestion}
            onSkipQuestion={actions.skipQuestion}
            onPauseGame={actions.pauseGame}
            onResumeGame={actions.resumeGame}
            onResetGame={actions.resetGame}
            showExplanation={gameConfig.showExplanations}
          />
        );

      case TRIVIA_GAME_STATES.FINISHED:
        return (
          <TriviaGameResults
            gameConfig={gameConfig}
            answers={answers}
            score={score}
            timeUsed={timeElapsed}
            totalTime={gameConfig.timeLimit}
            streak={streak}
            bestStreak={bestStreak}
            onPlayAgain={() =>
              actions.startGame({
                ...DEFAULT_CONFIG,
                timeLimit,
              })
            }
            onChangeSettings={() =>
              actions.startGame({
                ...DEFAULT_CONFIG,
                timeLimit,
              })
            }
            onBack={onBack}
            showDetailedReview={showDetailedReview}
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

  return <div className="w-full">{renderGameContent()}</div>;
};

export default TriviaGame;
