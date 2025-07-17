/**
 * QuotesGame Component
 * Interactive quotes game with two modes: quote-to-person and person-to-quote
 * @created 2024-12-19
 */

"use client";

import React, { useEffect, useState } from "react";
import useQuotesGame from "./useQuotesGame";
import GameHeader from "../shared/GameHeader";
import GameButton from "../shared/GameButton";
import GameStats from "../shared/GameStats";

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

  const getTimerColor = () => {
    const percentage =
      (game.currentQuestionTime / game.questionTimeLimit) * 100;
    if (percentage > 60) return "text-green-600";
    if (percentage > 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getCategoryIcon = (category) => {
    const icons = {
      militar: "⚔️",
      filosofía: "🧠",
      literatura: "📚",
      político: "🏛️",
      religioso: "🙏",
      histórico: "📜",
    };
    return icons[category] || "💭";
  };

  const renderSetupScreen = () => (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ¿Quién dijo qué?
        </h2>
        <p className="text-gray-600 mb-8">
          Pon a prueba tu conocimiento de citas históricas famosas y sus
          autores.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Modo de Juego:</h3>
            <div className="space-y-3">
              {[
                {
                  value: "quote-to-person",
                  label: "Cita → Personaje",
                  desc: "Te damos la cita, tú eliges quién la dijo",
                  icon: "💬➡️👤",
                },
                {
                  value: "person-to-quote",
                  label: "Personaje → Cita",
                  desc: "Te damos el personaje, tú eliges qué dijo",
                  icon: "👤➡️💬",
                },
              ].map((option) => (
                <GameButton
                  key={option.value}
                  variant={gameMode === option.value ? "primary" : "outline"}
                  onClick={() => setGameMode(option.value)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-sm opacity-75">{option.desc}</div>
                    </div>
                  </div>
                </GameButton>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Dificultad:</h3>
            <div className="space-y-3">
              {[
                { value: "easy", label: "Fácil", desc: "Citas muy conocidas" },
                {
                  value: "medium",
                  label: "Medio",
                  desc: "Citas famosas y algunas menos conocidas",
                },
                {
                  value: "hard",
                  label: "Difícil",
                  desc: "Todas las citas, incluyendo las más obscuras",
                },
              ].map((option) => (
                <GameButton
                  key={option.value}
                  variant={difficulty === option.value ? "primary" : "outline"}
                  onClick={() => setDifficulty(option.value)}
                  className="w-full p-4 text-left"
                >
                  <div>
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm opacity-75">{option.desc}</div>
                  </div>
                </GameButton>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-amber-800 mb-2">¿Cómo jugar?</h4>
          <div className="grid md:grid-cols-2 gap-4 text-amber-700 text-sm">
            <div>
              <strong>Mecánica:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Tienes 30 segundos por pregunta</li>
                <li>• Gana puntos por respuestas correctas</li>
                <li>• Las rachas dan puntos extra</li>
                <li>• Usa pistas si necesitas ayuda</li>
              </ul>
            </div>
            <div>
              <strong>Puntuación:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Tiempo restante = puntos extra</li>
                <li>• Rachas consecutivas = más puntos</li>
                <li>• Las pistas reducen la puntuación</li>
                <li>• Respuestas incorrectas penalizan</li>
              </ul>
            </div>
          </div>
        </div>

        <GameButton variant="primary" size="large" onClick={game.startGame}>
          Comenzar Juego
        </GameButton>
      </div>
    </div>
  );

  const renderQuoteToPersonMode = () => (
    <div className="max-w-4xl mx-auto">
      <GameHeader
        title="¿Quién dijo qué? - Cita → Personaje"
        description={`Pregunta ${game.questionIndex + 1} de ${
          game.quotes.length
        }`}
        progress={game.progress}
        timeElapsed={game.formatTime(game.timeElapsed)}
        score={game.score}
        onPause={game.togglePause}
        onClose={onClose}
        isPaused={game.gameState === "paused"}
      />

      <div className="bg-white rounded-lg p-8 shadow-lg">
        {/* Timer and question info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {getCategoryIcon(game.currentQuestion?.category)}
            </span>
            <div className="text-sm text-gray-600">
              <div>{game.currentQuestion?.period}</div>
              <div className="capitalize">{game.currentQuestion?.category}</div>
            </div>
          </div>

          <div className={`text-2xl font-bold ${getTimerColor()}`}>
            ⏱️ {game.currentQuestionTime}s
          </div>
        </div>

        {/* Quote display */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {game.currentQuestion?.text}
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-400">
            <blockquote className="text-2xl font-serif italic text-gray-800 mb-2">
              &quot;{game.currentQuestion?.quote}&quot;
            </blockquote>
            {game.currentQuestion?.originalQuote &&
              game.currentQuestion.originalQuote !==
                game.currentQuestion.quote && (
                <p className="text-sm text-gray-600">
                  Original: <em>{game.currentQuestion.originalQuote}</em>
                </p>
              )}
          </div>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {game.currentQuestion?.options?.map((option, index) => {
            let buttonClass = "p-4 text-left h-auto";

            if (game.showAnswer) {
              if (option === game.currentQuestion.correctAnswer) {
                buttonClass += " bg-green-100 border-green-400 text-green-800";
              } else if (
                option === game.selectedAnswer &&
                option !== game.currentQuestion.correctAnswer
              ) {
                buttonClass += " bg-red-100 border-red-400 text-red-800";
              }
            }

            if (showHint && showHint.eliminate === option) {
              buttonClass += " opacity-50 line-through";
            }

            return (
              <GameButton
                key={index}
                variant="outline"
                onClick={() => handleAnswerSelect(option)}
                disabled={
                  game.showAnswer || (showHint && showHint.eliminate === option)
                }
                className={buttonClass}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">👤</span>
                  <span className="font-medium">{option}</span>
                </div>
              </GameButton>
            );
          })}
        </div>

        {/* Game controls and stats */}
        <div className="flex justify-between items-center">
          <GameStats
            stats={[
              { label: "Correctas", value: game.correctAnswers },
              { label: "Racha", value: game.streak },
              { label: "Pistas", value: game.hints },
            ]}
            layout="inline"
          />

          <div className="space-x-2">
            <GameButton
              variant="warning"
              onClick={handleHint}
              disabled={game.hints <= 0 || game.showAnswer}
            >
              💡 Pista ({game.hints})
            </GameButton>
            <GameButton variant="outline" onClick={game.resetGame}>
              🔄 Reiniciar
            </GameButton>
          </div>
        </div>

        {/* Hint display */}
        {showHint && (
          <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-700 font-medium">{showHint.text}</p>
            {showHint.context && (
              <p className="text-yellow-600 text-sm mt-1">{showHint.context}</p>
            )}
          </div>
        )}

        {/* Answer explanation */}
        {game.showAnswer && (
          <div className="mt-4 bg-blue-100 border-l-4 border-blue-400 p-4">
            <h4 className="font-semibold text-blue-800 mb-2">
              {game.selectedAnswer === game.currentQuestion?.correctAnswer
                ? "¡Correcto!"
                : "Respuesta correcta:"}
            </h4>
            <p className="text-blue-700">
              <strong>{game.currentQuestion?.correctAnswer}</strong> -{" "}
              {game.currentQuestion?.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPersonToQuoteMode = () => (
    <div className="max-w-4xl mx-auto">
      <GameHeader
        title="¿Quién dijo qué? - Personaje → Cita"
        description={`Pregunta ${game.questionIndex + 1} de ${
          game.quotes.length
        }`}
        progress={game.progress}
        timeElapsed={game.formatTime(game.timeElapsed)}
        score={game.score}
        onPause={game.togglePause}
        onClose={onClose}
        isPaused={game.gameState === "paused"}
      />

      <div className="bg-white rounded-lg p-8 shadow-lg">
        {/* Timer and question info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {getCategoryIcon(game.currentQuestion?.category)}
            </span>
            <div className="text-sm text-gray-600">
              <div>{game.currentQuestion?.period}</div>
              <div className="capitalize">{game.currentQuestion?.category}</div>
            </div>
          </div>

          <div className={`text-2xl font-bold ${getTimerColor()}`}>
            ⏱️ {game.currentQuestionTime}s
          </div>
        </div>

        {/* Author display */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {game.currentQuestion?.text}
          </h3>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-400">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl">👤</span>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {game.currentQuestion?.author}
                </h2>
                <p className="text-gray-600">{game.currentQuestion?.period}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote options */}
        <div className="space-y-3 mb-6">
          {game.currentQuestion?.options?.map((option, index) => {
            let buttonClass = "p-4 text-left h-auto";

            if (game.showAnswer) {
              if (option === game.currentQuestion.correctAnswer) {
                buttonClass += " bg-green-100 border-green-400 text-green-800";
              } else if (
                option === game.selectedAnswer &&
                option !== game.currentQuestion.correctAnswer
              ) {
                buttonClass += " bg-red-100 border-red-400 text-red-800";
              }
            }

            if (showHint && showHint.eliminate === option) {
              buttonClass += " opacity-50 line-through";
            }

            return (
              <GameButton
                key={index}
                variant="outline"
                onClick={() => handleAnswerSelect(option)}
                disabled={
                  game.showAnswer || (showHint && showHint.eliminate === option)
                }
                className={buttonClass}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-1">💬</span>
                  <blockquote className="italic text-gray-700">
                    &quot;{option}&quot;
                  </blockquote>
                </div>
              </GameButton>
            );
          })}
        </div>

        {/* Game controls and stats */}
        <div className="flex justify-between items-center">
          <GameStats
            stats={[
              { label: "Correctas", value: game.correctAnswers },
              { label: "Racha", value: game.streak },
              { label: "Pistas", value: game.hints },
            ]}
            layout="inline"
          />

          <div className="space-x-2">
            <GameButton
              variant="warning"
              onClick={handleHint}
              disabled={game.hints <= 0 || game.showAnswer}
            >
              💡 Pista ({game.hints})
            </GameButton>
            <GameButton variant="outline" onClick={game.resetGame}>
              🔄 Reiniciar
            </GameButton>
          </div>
        </div>

        {/* Hint display */}
        {showHint && (
          <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-700 font-medium">{showHint.text}</p>
            {showHint.context && (
              <p className="text-yellow-600 text-sm mt-1">{showHint.context}</p>
            )}
          </div>
        )}

        {/* Answer explanation */}
        {game.showAnswer && (
          <div className="mt-4 bg-blue-100 border-l-4 border-blue-400 p-4">
            <h4 className="font-semibold text-blue-800 mb-2">
              {game.selectedAnswer === game.currentQuestion?.correctAnswer
                ? "¡Correcto!"
                : "Respuesta correcta:"}
            </h4>
            <blockquote className="text-blue-700 italic mb-2">
              &quot;{game.currentQuestion?.correctAnswer}&quot;
            </blockquote>
            <p className="text-blue-600 text-sm">
              {game.currentQuestion?.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderResultsScreen = () => {
    const stats = game.getStatistics();
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="text-6xl mb-4">🎭</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Juego Completado!
          </h2>
          <p className="text-gray-600 mb-8">
            Has completado el desafío de citas históricas en modo{" "}
            <span className="font-semibold">
              {stats.gameMode === "quote-to-person"
                ? "Cita → Personaje"
                : "Personaje → Cita"}
            </span>
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {stats.score}
              </div>
              <div className="text-blue-800">Puntuación Final</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {stats.accuracy}%
              </div>
              <div className="text-green-800">Precisión</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {game.formatTime(stats.timeElapsed)}
              </div>
              <div className="text-purple-800">Tiempo Total</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {stats.maxStreak}
              </div>
              <div className="text-orange-800">Racha Máxima</div>
            </div>
          </div>

          <GameStats
            stats={[
              {
                label: "Respuestas correctas",
                value: `${stats.correctAnswers}/${stats.totalQuestions}`,
              },
              { label: "Respuestas incorrectas", value: stats.wrongAnswers },
              { label: "Pistas usadas", value: stats.hintsUsed },
              {
                label: "Tiempo promedio",
                value: `${stats.averageTimePerQuestion}s`,
              },
            ]}
            layout="grid"
            className="mb-8"
          />

          <div className="flex justify-center gap-4">
            <GameButton
              variant="primary"
              onClick={() => game.initializeGame(difficulty, gameMode)}
            >
              Jugar de Nuevo
            </GameButton>
            <GameButton variant="outline" onClick={onClose}>
              Volver al Menú
            </GameButton>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4">
      {game.gameState === "setup" && renderSetupScreen()}
      {(game.gameState === "playing" || game.gameState === "paused") &&
        game.gameMode === "quote-to-person" &&
        renderQuoteToPersonMode()}
      {(game.gameState === "playing" || game.gameState === "paused") &&
        game.gameMode === "person-to-quote" &&
        renderPersonToQuoteMode()}
      {game.gameState === "completed" && renderResultsScreen()}

      {game.gameState === "paused" && (
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
      )}
    </div>
  );
};

export default QuotesGame;
