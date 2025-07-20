/**
 * TriviaGamePlay Component
 * Juego de trivia simple y directo
 * @created 2024-12-19
 */

import React, { useState, useEffect } from "react";
import { Timer, Play, Pause, Skip, RotateCcw, Zap } from "lucide-react";

import GameButton from "../../shared/GameButton.js";
import {
  TRIVIA_GAME_STATES,
  ANSWER_STATES,
} from "../constants/trivia-constants.js";
import { formatTime, getTimeState } from "../utils/trivia-utils.js";

const TriviaGamePlay = ({
  gameState,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  timeLeft,
  score,
  streak,
  onAnswerQuestion,
  onSkipQuestion,
  onPauseGame,
  onResumeGame,
  onResetGame,
}) => {
  // Estados locales simples
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isAnswered, setIsAnswered] = useState(false);

  // Resetear estados cuando cambia la pregunta
  useEffect(() => {
    if (currentQuestion) {
      setSelectedAnswer(null);
      setShowFeedback(false);
      setFeedbackType(null);
      setQuestionStartTime(Date.now());
      setIsAnswered(false);
    }
  }, [currentQuestionIndex, currentQuestion]);

  // Manejar respuesta de pregunta
  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered || gameState !== TRIVIA_GAME_STATES.PLAYING) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const isCorrect = answerIndex === currentQuestion.correct;
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

    // Mostrar feedback inmediato
    setFeedbackType(
      isCorrect ? ANSWER_STATES.CORRECT : ANSWER_STATES.INCORRECT
    );
    setShowFeedback(true);

    // Enviar respuesta después de un breve delay
    setTimeout(() => {
      onAnswerQuestion(answerIndex, timeSpent);
    }, 1500);
  };

  // Manejar salto de pregunta
  const handleSkipQuestion = () => {
    if (isAnswered || gameState !== TRIVIA_GAME_STATES.PLAYING) return;

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    setIsAnswered(true);
    setFeedbackType(ANSWER_STATES.SKIPPED);
    setShowFeedback(true);

    setTimeout(() => {
      onSkipQuestion(timeSpent);
    }, 1500);
  };

  // Estado del tiempo
  const timeState = getTimeState(timeLeft);

  // Si está pausado
  if (gameState === TRIVIA_GAME_STATES.PAUSED) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-amber-200">
          <Pause size={64} className="mx-auto mb-4 text-gray-600" />
          <h3 className="text-2xl font-bold text-stone-800 mb-2">
            Juego Pausado
          </h3>
          <p className="text-stone-600 mb-6">
            El tiempo se ha detenido. Tómate un descanso.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-blue-600">
                {currentQuestionIndex + 1}/{totalQuestions}
              </div>
              <div className="text-stone-600">Progreso</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-amber-600">{score}</div>
              <div className="text-stone-600">Puntos</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">{streak}</div>
              <div className="text-stone-600">Racha</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600">
                {formatTime(timeLeft)}
              </div>
              <div className="text-stone-600">Tiempo</div>
            </div>
          </div>

          <div className="space-x-4">
            <GameButton onClick={onResumeGame} variant="success" icon={Play}>
              Continuar
            </GameButton>
            <GameButton
              onClick={onResetGame}
              variant="secondary"
              icon={RotateCcw}
            >
              Reiniciar
            </GameButton>
          </div>
        </div>
      </div>
    );
  }

  // No hay pregunta
  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-amber-200">
          <p className="text-stone-600">No hay pregunta disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header simple con progreso */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-stone-600">Pregunta</span>
              <span className="text-2xl font-bold text-blue-600">
                {currentQuestionIndex + 1}
              </span>
              <span className="text-stone-600">de {totalQuestions}</span>
            </div>

            {streak > 0 && (
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-green-800 font-medium text-sm flex items-center">
                  <Zap size={14} className="mr-1" />
                  Racha: {streak}
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
                  timeState === "critical"
                    ? "text-red-600 animate-pulse"
                    : timeState === "warning"
                    ? "text-orange-600"
                    : "text-blue-600"
                }`}
              >
                {formatTime(timeLeft)}
              </div>
              <div className="text-stone-600 text-sm">Tiempo</div>
            </div>
          </div>
        </div>

        {/* Barra de progreso simple */}
        <div className="w-full bg-stone-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h4 className="text-xl font-bold text-stone-800 mb-6 text-center">
          {currentQuestion.question}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {currentQuestion.options?.map((option, index) => {
            let buttonClass =
              "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ";
            let isCorrectAnswer = index === currentQuestion.correct;
            let isSelectedAnswer = selectedAnswer === index;

            if (showFeedback) {
              if (isCorrectAnswer) {
                buttonClass += "border-green-300 bg-green-50 text-green-800 ";
              } else if (isSelectedAnswer && !isCorrectAnswer) {
                buttonClass += "border-red-300 bg-red-50 text-red-800 ";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600 ";
              }
            } else if (isSelectedAnswer) {
              buttonClass += "border-blue-300 bg-blue-50 text-blue-800 ";
            } else {
              buttonClass +=
                "border-gray-200 bg-white text-stone-800 hover:border-blue-300 hover:bg-blue-50 ";
              if (!isAnswered) {
                buttonClass += "cursor-pointer ";
              }
            }

            if (isAnswered && !showFeedback) {
              buttonClass += "cursor-not-allowed opacity-50 ";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <span className="font-medium text-blue-600 mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback simple */}
        {showFeedback && (
          <div
            className={`text-center p-4 rounded-lg mb-4 ${
              feedbackType === ANSWER_STATES.CORRECT
                ? "bg-green-50 text-green-800"
                : feedbackType === ANSWER_STATES.INCORRECT
                ? "bg-red-50 text-red-800"
                : "bg-yellow-50 text-yellow-800"
            }`}
          >
            <div className="text-lg font-bold">
              {feedbackType === ANSWER_STATES.CORRECT
                ? "✅ ¡Correcto!"
                : feedbackType === ANSWER_STATES.INCORRECT
                ? "❌ Incorrecto"
                : "⏭️ Pregunta saltada"}
            </div>

            {feedbackType === ANSWER_STATES.CORRECT && streak > 1 && (
              <div className="mt-2 text-sm">
                🔥 ¡Racha de {streak}! ¡Sigue así!
              </div>
            )}
          </div>
        )}

        {/* Controles simples */}
        <div className="flex justify-center space-x-3">
          <GameButton
            onClick={handleSkipQuestion}
            variant="ghost"
            icon={Skip}
            size="sm"
            disabled={isAnswered}
          >
            Saltar
          </GameButton>
          <GameButton
            onClick={onPauseGame}
            variant="secondary"
            icon={Pause}
            size="sm"
          >
            Pausar
          </GameButton>
        </div>
      </div>

      {/* Alerta de tiempo crítico */}
      {timeState === "critical" && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
          <Timer size={16} className="inline mr-2" />
          ¡Tiempo agotándose!
        </div>
      )}
    </div>
  );
};

export default TriviaGamePlay;
