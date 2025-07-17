/**
 * TriviaGame Component
 * Juego de trivia contrarreloj completo
 * @created 2024-12-19
 */

import React from "react";
import {
  Timer,
  Trophy,
  Play,
  RotateCcw,
  Skip,
  Pause,
  Play as Resume,
} from "lucide-react";
import useTriviaGame from "./useTriviaGame.js";
import GameHeader from "../shared/GameHeader.js";
import GameButton from "../shared/GameButton.js";
import GameStats from "../shared/GameStats.js";

// Sample questions - esto se puede mover a un archivo separado o venir de props
const defaultQuestions = [
  {
    id: 1,
    question: "¿En qué año cayó el Imperio Romano de Occidente?",
    options: ["410 d.C.", "455 d.C.", "476 d.C.", "493 d.C."],
    correct: 2,
    explanation:
      "El Imperio Romano de Occidente cayó en 476 d.C. cuando Odoacro depuso a Rómulo Augústulo.",
  },
  {
    id: 2,
    question: "¿Quién fue el último faraón de Egipto?",
    options: ["Nefertiti", "Cleopatra VII", "Hatshepsut", "Ankhesenamón"],
    correct: 1,
    explanation:
      "Cleopatra VII fue la última faraón de Egipto, gobernando hasta 30 a.C.",
  },
  {
    id: 3,
    question: "¿Qué ciudad fue destruida por el volcán Vesubio en 79 d.C.?",
    options: ["Herculano", "Pompeya", "Nápoles", "Roma"],
    correct: 1,
    explanation:
      "Pompeya fue sepultada por la erupción del Vesubio en 79 d.C., preservándola hasta hoy.",
  },
  {
    id: 4,
    question: "¿Quién escribió 'La República'?",
    options: ["Aristóteles", "Sócrates", "Platón", "Cicerón"],
    correct: 2,
    explanation:
      "Platón escribió 'La República', una de las obras fundamentales de la filosofía política.",
  },
  {
    id: 5,
    question:
      "¿En qué batalla derrotó Alejandro Magno definitivamente a Darío III?",
    options: ["Issos", "Gaugamela", "Granicus", "Hydaspes"],
    correct: 1,
    explanation:
      "La batalla de Gaugamela (331 a.C.) fue la victoria decisiva de Alejandro sobre Darío III.",
  },
];

const TriviaGame = ({
  questions = defaultQuestions,
  timeLimit = 60,
  onBack = null,
  onGameComplete = null,
}) => {
  const {
    gameState,
    currentQuestionIndex,
    currentQuestion,
    score,
    timeLeft,
    streak,
    bestStreak,
    stats,
    actions,
  } = useTriviaGame({ questions, timeLimit });

  // Handle game completion
  React.useEffect(() => {
    if (gameState === "finished" && onGameComplete) {
      onGameComplete(stats);
    }
  }, [gameState, stats, onGameComplete]);

  const renderStartScreen = () => (
    <div className="text-center space-y-6">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border border-red-200">
        <Timer className="mx-auto text-red-600 mb-4" size={64} />
        <h3 className="text-2xl font-bold text-stone-800 mb-4">
          Trivia Contrarreloj
        </h3>
        <p className="text-stone-600 mb-6">
          Responde tantas preguntas como puedas en {timeLimit} segundos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-stone-800 mb-2">🎯 Cómo Jugar:</h4>
            <ul className="text-stone-600 space-y-1 text-left">
              <li>• Responde rápido para más puntos</li>
              <li>• Mantén una racha para bonificaciones</li>
              <li>• Puedes saltar preguntas difíciles</li>
              <li>• El tiempo se agota rápido</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <h4 className="font-bold text-stone-800 mb-2">📊 Puntuación:</h4>
            <ul className="text-stone-600 space-y-1 text-left">
              <li>• 10 puntos base por respuesta</li>
              <li>• -1 punto por cada 10 segundos</li>
              <li>• Bonificación por rachas</li>
              <li>• {questions.length} preguntas disponibles</li>
            </ul>
          </div>
        </div>

        <GameButton
          onClick={actions.startGame}
          variant="danger"
          size="lg"
          icon={Play}
        >
          Comenzar Juego
        </GameButton>
      </div>
    </div>
  );

  const renderGameScreen = () => (
    <div className="space-y-6">
      {/* Game Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-stone-600">Pregunta</span>
              <span className="text-2xl font-bold text-blue-600">
                {currentQuestionIndex + 1}
              </span>
              <span className="text-stone-600">de {questions.length}</span>
            </div>
            {streak > 0 && (
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-green-800 font-medium text-sm">
                  🔥 Racha: {streak}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{score}</div>
              <div className="text-stone-600 text-sm">Puntos</div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  timeLeft <= 10 ? "text-red-600 animate-pulse" : "text-red-600"
                }`}
              >
                {timeLeft}s
              </div>
              <div className="text-stone-600 text-sm">Tiempo</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <h4 className="text-xl font-bold text-stone-800 mb-6">
            {currentQuestion.question}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <GameButton
                key={index}
                onClick={() => actions.answerQuestion(index)}
                variant="outline"
                className="p-4 text-left h-auto whitespace-normal"
                fullWidth
              >
                <span className="font-medium text-blue-600 mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </GameButton>
            ))}
          </div>

          <div className="flex justify-center space-x-3">
            <GameButton
              onClick={actions.skipQuestion}
              variant="ghost"
              icon={Skip}
              size="sm"
            >
              Saltar
            </GameButton>
            <GameButton
              onClick={
                gameState === "playing" ? actions.pauseGame : actions.resumeGame
              }
              variant="secondary"
              icon={gameState === "playing" ? Pause : Resume}
              size="sm"
            >
              {gameState === "playing" ? "Pausar" : "Reanudar"}
            </GameButton>
          </div>
        </div>
      )}
    </div>
  );

  const renderResultsScreen = () => {
    const accuracy = Math.round(stats.accuracy);
    const performance =
      accuracy >= 80 ? "Excelente" : accuracy >= 60 ? "Bueno" : "Mejorable";
    const performanceColor =
      accuracy >= 80
        ? "text-green-600"
        : accuracy >= 60
        ? "text-amber-600"
        : "text-red-600";

    return (
      <div className="text-center space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
          <div className="mb-6">
            <Trophy className="mx-auto text-amber-600 mb-4" size={64} />
            <h3 className="text-3xl font-bold text-stone-800 mb-2">
              ¡Juego Completado!
            </h3>
            <p className={`text-xl font-medium ${performanceColor}`}>
              {performance} desempeño
            </p>
          </div>

          <GameStats
            stats={[
              {
                icon: Trophy,
                value: score,
                label: "Puntos Totales",
                valueColor: "text-amber-600",
                iconBg: "bg-amber-500",
              },
              {
                icon: Timer,
                value: stats.correctAnswers,
                label: "Respuestas Correctas",
                valueColor: "text-green-600",
                iconBg: "bg-green-500",
              },
              {
                icon: Play,
                value: `${accuracy}%`,
                label: "Precisión",
                valueColor: performanceColor,
                iconBg:
                  accuracy >= 80
                    ? "bg-green-500"
                    : accuracy >= 60
                    ? "bg-amber-500"
                    : "bg-red-500",
              },
              {
                icon: Trophy,
                value: bestStreak,
                label: "Mejor Racha",
                valueColor: "text-purple-600",
                iconBg: "bg-purple-500",
              },
            ]}
            layout="flex"
            className="mb-8"
          />

          <div className="bg-white rounded-lg p-6 border border-stone-200 mb-6">
            <h4 className="text-lg font-bold text-stone-800 mb-4">
              Resumen Detallado
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.answeredQuestions}
                </div>
                <div className="text-stone-600">Respondidas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats.incorrectAnswers}
                </div>
                <div className="text-stone-600">Incorrectas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-600">
                  {stats.skippedQuestions}
                </div>
                <div className="text-stone-600">Saltadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {Math.round(stats.averageTimePerQuestion)}s
                </div>
                <div className="text-stone-600">Promedio/Pregunta</div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 justify-center">
            <GameButton
              onClick={actions.resetGame}
              variant="primary"
              icon={RotateCcw}
            >
              Jugar de Nuevo
            </GameButton>
            {onBack && (
              <GameButton onClick={onBack} variant="secondary">
                Volver al Dashboard
              </GameButton>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <GameHeader
        title="Trivia Contrarreloj"
        description="Responde preguntas rápidas sobre historia antigua"
        icon={Timer}
        iconColor="bg-red-500"
        onBack={onBack}
        showBackButton={gameState === "idle" && onBack}
        stats={
          gameState === "playing"
            ? [
                { value: score, label: "Puntos", color: "text-amber-600" },
                {
                  value: `${timeLeft}s`,
                  label: "Tiempo",
                  color: timeLeft <= 10 ? "text-red-600" : "text-red-600",
                },
              ]
            : []
        }
      />

      {gameState === "idle" && renderStartScreen()}
      {(gameState === "playing" || gameState === "paused") &&
        renderGameScreen()}
      {gameState === "finished" && renderResultsScreen()}
    </div>
  );
};

export default TriviaGame;
