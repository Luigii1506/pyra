/**
 * TriviaGameResults Component
 * Resultados simples del juego de trivia
 * @created 2024-12-19
 */

import React from "react";
import {
  Trophy,
  Target,
  Clock,
  Zap,
  RotateCcw,
  Home,
  Timer,
} from "lucide-react";

import GameButton from "../../shared/GameButton.js";
import GameStats from "../../shared/GameStats.js";
import { formatTime } from "../utils/trivia-utils.js";

const TriviaGameResults = ({
  answers,
  score,
  timeUsed,
  totalTime,
  bestStreak,
  onPlayAgain,
  onBack,
}) => {
  // Calcular estadísticas simples
  const correctAnswers = answers.filter(
    (a) => a.isCorrect && !a.skipped
  ).length;
  const incorrectAnswers = answers.filter(
    (a) => !a.isCorrect && !a.skipped
  ).length;
  const skippedQuestions = answers.filter((a) => a.skipped).length;
  const accuracy =
    answers.length > 0
      ? Math.round((correctAnswers / answers.length) * 100)
      : 0;
  const averageTimePerQuestion =
    answers.length > 0
      ? Math.round(
          answers.reduce((sum, a) => sum + (a.timeSpent || 0), 0) /
            answers.length
        )
      : 0;

  // Determinar nivel de rendimiento
  const performance =
    accuracy >= 80 ? "Excelente" : accuracy >= 60 ? "Bueno" : "Mejorable";
  const performanceColor =
    accuracy >= 80
      ? "text-green-600"
      : accuracy >= 60
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cabecera de resultados */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-200 text-center">
        <Trophy className="mx-auto text-amber-600 mb-4" size={64} />
        <h3 className="text-3xl font-bold text-stone-800 mb-2">
          ¡Juego Completado!
        </h3>
        <p className={`text-xl font-medium ${performanceColor} mb-4`}>
          {performance} desempeño
        </p>

        <div className="text-6xl font-bold text-amber-600 mb-4">{score}</div>
        <p className="text-stone-600">Puntos Totales</p>
      </div>

      {/* Estadísticas principales */}
      <GameStats
        stats={[
          {
            icon: Target,
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
            icon: Zap,
            value: bestStreak,
            label: "Mejor Racha",
            valueColor: "text-purple-600",
            iconBg: "bg-purple-500",
          },
          {
            icon: Clock,
            value: `${averageTimePerQuestion}s`,
            label: "Promedio/Pregunta",
            valueColor: "text-blue-600",
            iconBg: "bg-blue-500",
          },
          {
            icon: Timer,
            value: formatTime(timeUsed),
            label: "Tiempo Total",
            valueColor: "text-orange-600",
            iconBg: "bg-orange-500",
          },
        ]}
        layout="flex"
        className="mb-8"
      />

      {/* Resumen detallado simple */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
        <h4 className="text-lg font-bold text-stone-800 mb-4 text-center">
          Resumen Detallado
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {correctAnswers}
            </div>
            <div className="text-stone-600">Correctas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {incorrectAnswers}
            </div>
            <div className="text-stone-600">Incorrectas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-stone-600">
              {skippedQuestions}
            </div>
            <div className="text-stone-600">Saltadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {answers.length}
            </div>
            <div className="text-stone-600">Total</div>
          </div>
        </div>
      </div>

      {/* Mensaje de motivación simple */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <h4 className="text-lg font-bold text-blue-800 mb-2">
          {accuracy === 100
            ? "🏆 ¡Perfecto!"
            : accuracy >= 80
            ? "⭐ ¡Excelente!"
            : accuracy >= 60
            ? "👍 ¡Bien hecho!"
            : "📚 Sigue practicando"}
        </h4>
        <p className="text-blue-700">
          {accuracy === 100
            ? "¡Increíble! Respondiste todas las preguntas correctamente."
            : accuracy >= 80
            ? "Fantástico rendimiento. Dominas muy bien la historia antigua."
            : accuracy >= 60
            ? "Buen trabajo. Sigue practicando para mejorar aún más."
            : "Hay margen de mejora. ¡La práctica hace al maestro!"}
        </p>
      </div>

      {/* Botones de acción simples */}
      <div className="flex justify-center space-x-4">
        <GameButton
          onClick={onPlayAgain}
          variant="primary"
          size="lg"
          icon={RotateCcw}
        >
          Jugar de Nuevo
        </GameButton>

        {onBack && (
          <GameButton
            onClick={onBack}
            variant="secondary"
            size="lg"
            icon={Home}
          >
            Volver al Dashboard
          </GameButton>
        )}
      </div>
    </div>
  );
};

export default TriviaGameResults;
