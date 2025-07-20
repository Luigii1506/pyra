/**
 * TimelineGameResults Component
 * Resultados del juego de línea de tiempo
 * @created 2024-12-19
 */

import React from "react";
import {
  Trophy,
  Clock,
  Target,
  RotateCcw,
  Home,
  Star,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";

import GameButton from "../../shared/GameButton.js";
import GameStats from "../../shared/GameStats.js";
import {
  formatYear,
  getFeedbackMessage,
  generatePerformanceSummary,
  getGameStats,
  getSortedEvents,
} from "../utils/timeline-utils.js";
import { VERIFICATION_STATES } from "../constants/timeline-constants.js";

const TimelineGameResults = ({
  verification,
  score,
  attempts,
  events,
  userOrder,
  gameStartTime,
  gameEndTime,
  onPlayAgain,
  onBack,
}) => {
  // Calcular datos para mostrar
  const { accuracy, correctPositions, totalPositions, isPerfect } =
    verification;
  const feedbackMessage = getFeedbackMessage(verification, attempts);
  const performanceSummary = generatePerformanceSummary(
    verification,
    attempts,
    score
  );
  const stats = getGameStats(verification, attempts, score, events);
  const correctOrder = getSortedEvents(events);

  // Duración del juego
  const gameDuration =
    gameEndTime && gameStartTime
      ? Math.round((gameEndTime - gameStartTime) / 1000)
      : 0;

  // Renderizar comparación de orden
  const renderOrderComparison = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
      <h4 className="text-lg font-bold text-stone-800 mb-4 flex items-center">
        <TrendingUp className="mr-2 text-blue-600" size={20} />
        Comparación de Órdenes
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tu orden */}
        <div>
          <h5 className="font-medium text-stone-700 mb-3">Tu Orden:</h5>
          <div className="space-y-2">
            {userOrder.map((event, index) => {
              const eventResult = verification.results.find(
                (r) => r.eventId === event.id
              );
              const isCorrect = eventResult?.isCorrect;

              return (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border-2 ${
                    isCorrect
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                        ${isCorrect ? "bg-green-600" : "bg-red-600"}
                      `}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="text-xs text-stone-600">
                          {formatYear(event.year)}
                        </div>
                      </div>
                    </div>
                    <div>
                      {isCorrect ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <XCircle size={16} className="text-red-600" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Orden correcto */}
        <div>
          <h5 className="font-medium text-stone-700 mb-3">Orden Correcto:</h5>
          <div className="space-y-2">
            {correctOrder.map((event, index) => (
              <div
                key={event.id}
                className="p-3 rounded-lg border border-green-300 bg-green-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{event.title}</div>
                    <div className="text-xs text-stone-600">
                      {formatYear(event.year)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Cabecera de resultados */}
      <div
        className={`text-center rounded-xl p-8 border ${feedbackMessage.bgColor} ${feedbackMessage.borderColor}`}
      >
        <Trophy className="mx-auto text-amber-600 mb-4" size={64} />
        <h3 className={`text-3xl font-bold mb-2 ${feedbackMessage.color}`}>
          {feedbackMessage.title}
        </h3>
        <p className={`text-xl mb-4 ${feedbackMessage.color}`}>
          {feedbackMessage.message}
        </p>

        <div className="text-6xl font-bold text-amber-600 mb-4">
          {score.finalScore}
        </div>
        <p className="text-stone-600">Puntos Totales</p>

        {isPerfect && (
          <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3">
            <div className="text-yellow-800 font-bold text-lg">
              🎉 ¡CRONOLOGÍA PERFECTA! 🎉
            </div>
            <div className="text-yellow-700 text-sm">
              ¡Ordenaste todos los eventos correctamente en {attempts} intento
              {attempts > 1 ? "s" : ""}!
            </div>
          </div>
        )}
      </div>

      {/* Estadísticas principales */}
      <GameStats
        stats={[
          {
            icon: Target,
            value: `${Math.round(accuracy)}%`,
            label: "Precisión",
            valueColor:
              accuracy >= 80
                ? "text-green-600"
                : accuracy >= 60
                ? "text-amber-600"
                : "text-red-600",
            iconBg:
              accuracy >= 80
                ? "bg-green-500"
                : accuracy >= 60
                ? "bg-amber-500"
                : "bg-red-500",
          },
          {
            icon: CheckCircle,
            value: `${correctPositions}/${totalPositions}`,
            label: "Eventos Correctos",
            valueColor: "text-blue-600",
            iconBg: "bg-blue-500",
          },
          {
            icon: RotateCcw,
            value: attempts,
            label: "Intentos",
            valueColor:
              attempts === 1
                ? "text-green-600"
                : attempts <= 2
                ? "text-amber-600"
                : "text-red-600",
            iconBg:
              attempts === 1
                ? "bg-green-500"
                : attempts <= 2
                ? "bg-amber-500"
                : "bg-red-500",
          },
          {
            icon: Clock,
            value: `${gameDuration}s`,
            label: "Tiempo",
            valueColor: "text-purple-600",
            iconBg: "bg-purple-500",
          },
        ]}
        layout="flex"
        className="mb-8"
      />

      {/* Desglose de puntuación */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
        <h4 className="text-lg font-bold text-stone-800 mb-4 flex items-center">
          <Star className="mr-2 text-amber-600" size={20} />
          Desglose de Puntuación
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              +{score.baseScore}
            </div>
            <div className="text-stone-600">Puntos Base</div>
            <div className="text-xs text-stone-500">
              {correctPositions} × 100
            </div>
          </div>

          {score.perfectBonus > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                +{score.perfectBonus}
              </div>
              <div className="text-stone-600">Bonus Perfecto</div>
              <div className="text-xs text-stone-500">
                ¡Cronología perfecta!
              </div>
            </div>
          )}

          {score.penalties > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                -{score.penalties}
              </div>
              <div className="text-stone-600">Penalizaciones</div>
              <div className="text-xs text-stone-500">Intentos adicionales</div>
            </div>
          )}

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {score.finalScore}
            </div>
            <div className="text-stone-600">Total Final</div>
            <div className="text-xs text-stone-500">Puntuación final</div>
          </div>
        </div>
      </div>

      {/* Comparación de órdenes */}
      {renderOrderComparison()}

      {/* Resumen de rendimiento */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <h4 className="text-lg font-bold text-blue-800 mb-2">
          📊 Análisis de Rendimiento
        </h4>
        <p className="text-blue-700">{performanceSummary}</p>
      </div>

      {/* Mensaje motivacional */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
        <h4 className="text-lg font-bold text-amber-800 mb-2">
          {accuracy === 100
            ? "🏆 ¡Maestro de la Historia!"
            : accuracy >= 80
            ? "⭐ ¡Excelente historiador!"
            : accuracy >= 60
            ? "📚 ¡Buen conocimiento!"
            : "📖 ¡Sigue estudiando!"}
        </h4>
        <p className="text-amber-700">
          {accuracy === 100
            ? "Tu dominio de la cronología histórica es impecable. ¡Eres un verdadero experto!"
            : accuracy >= 80
            ? "Tienes un conocimiento sólido de la historia. Solo algunos detalles por pulir."
            : accuracy >= 60
            ? "Vas por buen camino. Con más práctica dominarás la cronología histórica."
            : "La historia es fascinante. ¡Sigue explorando y aprendiendo sobre diferentes épocas!"}
        </p>
      </div>

      {/* Botones de acción */}
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

export default TimelineGameResults;
