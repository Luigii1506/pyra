/**
 * QuotesGameResults Component
 * Results screen showing game statistics and detailed review
 * @created 2024-12-19
 */

"use client";

import React from "react";
import {
  Trophy,
  CheckCircle,
  XCircle,
  RotateCcw,
  Play,
  BookOpen,
} from "lucide-react";
import { getScoreMessage } from "../utils/quotes-game-utils";

const QuotesGameResults = ({ game, onStartGame, onBackToMenu }) => {
  const stats = game.getStatistics();
  const percentage = stats.accuracy;
  const scoreMessage = getScoreMessage(percentage);

  const getModeTitle = (mode) => {
    return mode === "quote-to-person" ? "Cita → Personaje" : "Personaje → Cita";
  };

  const getAlternateMode = (currentMode) => {
    return currentMode === "quote-to-person"
      ? "person-to-quote"
      : "quote-to-person";
  };

  const renderDetailedResults = () => {
    if (!game.gameResults || game.gameResults.length === 0) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h4 className="text-xl font-bold text-stone-800 mb-6">
          Revisión Detallada
        </h4>
        <div className="space-y-4">
          {game.gameResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                result.isCorrect
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`mt-1 ${
                    result.isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result.isCorrect ? (
                    <CheckCircle size={20} />
                  ) : (
                    <XCircle size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-stone-800 mb-2">
                    Pregunta {index + 1}
                  </h5>

                  {game.gameMode === "quote-to-person" ? (
                    <div>
                      <p className="text-stone-700 italic mb-2">
                        &quot;{result.question.quote}&quot;
                      </p>
                      <p>
                        <strong>Tu respuesta:</strong>{" "}
                        {result.selectedAnswer || "Sin respuesta"}
                      </p>
                      {!result.isCorrect && (
                        <p>
                          <strong>Respuesta correcta:</strong>{" "}
                          {result.question.correctAnswer}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-stone-700 font-medium mb-2">
                        {result.question.author}
                      </p>
                      <p>
                        <strong>Tu respuesta:</strong> &quot;
                        {result.selectedAnswer || "Sin respuesta"}&quot;
                      </p>
                      {!result.isCorrect && (
                        <p>
                          <strong>Respuesta correcta:</strong> &quot;
                          {result.question.correctAnswer}&quot;
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-stone-600 text-sm mt-2">
                    <strong>Contexto:</strong> {result.question.explanation}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs text-stone-500">
                    <span>Tiempo usado: {result.timeUsed}s</span>
                    <span>{result.question.period}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Results Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-600 rounded-full mb-4">
            <Trophy size={40} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold text-stone-800 mb-2">
            ¡Juego Completado!
          </h3>
          <p className="text-stone-600">Modo: {getModeTitle(game.gameMode)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className={`text-4xl font-bold ${scoreMessage.color}`}>
              {percentage.toFixed(0)}%
            </div>
            <div className="text-stone-600 text-sm">Puntuación</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-stone-800">
              {stats.correctAnswers}/{stats.totalQuestions}
            </div>
            <div className="text-stone-600 text-sm">Correctas</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-stone-800">
              {stats.averageTimePerQuestion}s
            </div>
            <div className="text-stone-600 text-sm">Tiempo Promedio</div>
          </div>
        </div>

        <p className={`text-lg font-medium ${scoreMessage.color}`}>
          {scoreMessage.message}
        </p>
      </div>

      {/* Detailed Results */}
      {renderDetailedResults()}

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onStartGame(game.gameMode)}
            className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            <RotateCcw size={20} />
            <span>Repetir Mismo Modo</span>
          </button>
          <button
            onClick={() => onStartGame(getAlternateMode(game.gameMode))}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Play size={20} />
            <span>Probar Otro Modo</span>
          </button>
          <button
            onClick={onBackToMenu}
            className="flex items-center justify-center space-x-2 bg-stone-600 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors font-medium"
          >
            <BookOpen size={20} />
            <span>Volver al Menú</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotesGameResults;
