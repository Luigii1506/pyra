/**
 * GameProgress Component
 * Displays game progress, score, timer and progress bar
 * @created 2024-12-19
 */

"use client";

import React from "react";
import { Clock } from "lucide-react";
import { isCriticalTime } from "../utils/quotes-game-utils";

const GameProgress = ({
  gameMode,
  currentQuestion,
  totalQuestions,
  score,
  currentQuestionTime,
  progress,
}) => {
  const modeTitle =
    gameMode === "quote-to-person" ? "Cita → Personaje" : "Personaje → Cita";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-stone-800">{modeTitle}</h3>
          <p className="text-stone-600">
            Pregunta {currentQuestion} de {totalQuestions}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{score}</div>
            <div className="text-stone-600 text-sm">Puntos</div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock
              size={20}
              className={
                isCriticalTime(currentQuestionTime)
                  ? "text-red-600"
                  : "text-amber-600"
              }
            />
            <span
              className={`font-bold text-xl ${
                isCriticalTime(currentQuestionTime)
                  ? "text-red-600"
                  : "text-stone-800"
              }`}
            >
              {currentQuestionTime}s
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-amber-200 rounded-full h-3">
        <div
          className="bg-amber-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GameProgress;
