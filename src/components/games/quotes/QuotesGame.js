/**
 * QuotesGame Component
 * Interactive quotes game with two modes: quote-to-person and person-to-quote
 * @created 2024-12-19
 */

"use client";

import React, { useEffect, useState } from "react";
import {
  Quote,
  Users,
  Play,
  CheckCircle,
  Clock,
  Target,
  Star,
  Trophy,
  XCircle,
  RotateCcw,
  BookOpen,
  Crown,
} from "lucide-react";
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

  const startGame = (mode) => {
    setGameMode(mode);
    setTimeout(() => {
      game.startGame();
    }, 100);
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

  const renderSetupScreen = () => {
    // Get sample quotes for preview
    const sampleQuotes = [
      {
        quote: "Llegué, vi, vencí",
        author: "Julio César",
        period: "República Romana",
        icon: Target,
      },
      {
        quote: "Solo sé que no sé nada",
        author: "Sócrates",
        period: "Grecia Clásica",
        icon: Star,
      },
      {
        quote: "Conócete a ti mismo",
        author: "Oráculo de Delfos",
        period: "Grecia Arcaica",
        icon: Quote,
      },
      {
        quote: "La suerte favorece a los audaces",
        author: "Virgilio",
        period: "Imperio Romano",
        icon: CheckCircle,
      },
    ];

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold text-stone-800">
                ¿Quién dijo qué?
              </h3>
              <p className="text-stone-600 mt-2">
                Pon a prueba tus conocimientos sobre citas históricas célebres
              </p>
            </div>
            <div className="bg-amber-600 p-3 rounded-full">
              <Quote size={32} className="text-white" />
            </div>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12+</div>
              <div className="text-blue-800 text-sm">Citas Históricas</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">10</div>
              <div className="text-green-800 text-sm">Preguntas</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">30s</div>
              <div className="text-amber-800 text-sm">Por Pregunta</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2</div>
              <div className="text-purple-800 text-sm">Modalidades</div>
            </div>
          </div>
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quote to Person Mode */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Quote size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-stone-800">
                  Cita → Personaje
                </h4>
                <p className="text-stone-600 text-sm">
                  Adivina quién dijo la frase
                </p>
              </div>
            </div>

            <p className="text-stone-600 mb-6 leading-relaxed">
              Se te mostrará una cita histórica célebre y deberás elegir entre
              cuatro opciones quién fue el personaje que la pronunció.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-sm text-stone-600">
                <CheckCircle size={16} className="text-green-500" />
                <span>Citas verificadas históricamente</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-stone-600">
                <Clock size={16} className="text-amber-500" />
                <span>30 segundos por pregunta</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-stone-600">
                <Target size={16} className="text-blue-500" />
                <span>Contexto histórico incluido</span>
              </div>
            </div>

            <button
              onClick={() => startGame("quote-to-person")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <Play size={20} />
              <span>Comenzar Modo Cita</span>
            </button>
          </div>

          {/* Person to Quote Mode */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-green-600 p-3 rounded-lg">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-stone-800">
                  Personaje → Cita
                </h4>
                <p className="text-stone-600 text-sm">
                  Elige qué dijo realmente
                </p>
              </div>
            </div>

            <p className="text-stone-600 mb-6 leading-relaxed">
              Se te mostrará un personaje histórico y deberás elegir entre
              cuatro citas cuál fue la que realmente pronunció.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-sm text-stone-600">
                <CheckCircle size={16} className="text-green-500" />
                <span>Personajes históricos auténticos</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-stone-600">
                <Clock size={16} className="text-amber-500" />
                <span>30 segundos por pregunta</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-stone-600">
                <Star size={16} className="text-purple-500" />
                <span>Información biográfica</span>
              </div>
            </div>

            <button
              onClick={() => startGame("person-to-quote")}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <Play size={20} />
              <span>Comenzar Modo Personaje</span>
            </button>
          </div>
        </div>

        {/* Sample Quotes Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <h4 className="text-xl font-bold text-stone-800 mb-4">
            Ejemplos de Citas Incluidas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleQuotes.map((quote, index) => {
              const IconComponent = quote.icon;
              return (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg border border-amber-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-amber-600 p-2 rounded-lg">
                      <IconComponent size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-stone-800 font-medium italic mb-2">
                        &quot;{quote.quote}&quot;
                      </p>
                      <p className="text-amber-700 font-semibold text-sm">
                        — {quote.author}
                      </p>
                      <p className="text-stone-600 text-xs mt-1">
                        {quote.period}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const handleAnswer = (index) => {
    const currentQ = game.currentQuestion;
    const answer = currentQ?.options[index];
    if (answer) {
      handleAnswerSelect(answer);
    }
  };

  const renderGame = () => {
    const currentQ = game.currentQuestion;
    const progress = ((game.questionIndex + 1) / game.quotes.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Game Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-stone-800">
                {game.gameMode === "quote-to-person"
                  ? "Cita → Personaje"
                  : "Personaje → Cita"}
              </h3>
              <p className="text-stone-600">
                Pregunta {game.questionIndex + 1} de {game.quotes.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {game.score}
                </div>
                <div className="text-stone-600 text-sm">Puntos</div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock
                  size={20}
                  className={
                    game.currentQuestionTime <= 10
                      ? "text-red-600"
                      : "text-amber-600"
                  }
                />
                <span
                  className={`font-bold text-xl ${
                    game.currentQuestionTime <= 10
                      ? "text-red-600"
                      : "text-stone-800"
                  }`}
                >
                  {game.currentQuestionTime}s
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

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200">
          {game.gameMode === "quote-to-person" ? (
            <div>
              <h4 className="text-2xl font-bold text-stone-800 mb-6 text-center">
                &quot;¿Quién dijo esta frase?&quot;
              </h4>
              <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg p-6 mb-8 border border-amber-200">
                <p className="text-xl text-stone-800 italic text-center leading-relaxed">
                  &quot;{currentQ?.quote}&quot;
                </p>
                {currentQ?.originalQuote &&
                  currentQ.originalQuote !== currentQ.quote && (
                    <p className="text-sm text-stone-500 text-center mt-2">
                      Original: <em>{currentQ.originalQuote}</em>
                    </p>
                  )}
              </div>
            </div>
          ) : (
            <div>
              <h4 className="text-2xl font-bold text-stone-800 mb-6 text-center">
                &quot;¿Qué dijo realmente {currentQ?.author}?&quot;
              </h4>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
                <div className="flex items-center justify-center space-x-3">
                  <Crown size={24} className="text-blue-600" />
                  <p className="text-2xl font-bold text-blue-800">
                    {currentQ?.author}
                  </p>
                </div>
                <p className="text-center text-blue-600 text-sm mt-2">
                  {currentQ?.period}
                </p>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentQ?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={
                  game.showAnswer || (showHint && showHint.eliminate === option)
                }
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  game.showAnswer
                    ? option === currentQ.correctAnswer
                      ? "border-green-500 bg-green-50 text-green-800"
                      : game.selectedAnswer === option
                      ? "border-red-500 bg-red-50 text-red-800"
                      : "border-stone-300 bg-stone-50 text-stone-600"
                    : game.selectedAnswer === option
                    ? "border-amber-500 bg-amber-50"
                    : "border-stone-300 hover:border-amber-300 hover:bg-amber-50"
                } ${
                  game.showAnswer ? "cursor-not-allowed" : "cursor-pointer"
                } ${
                  showHint && showHint.eliminate === option
                    ? "opacity-50 line-through"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                      game.showAnswer
                        ? option === currentQ.correctAnswer
                          ? "border-green-500 bg-green-500 text-white"
                          : game.selectedAnswer === option
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-stone-400 text-stone-400"
                        : game.selectedAnswer === option
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-stone-400 text-stone-600"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">
                    {game.gameMode === "quote-to-person"
                      ? option
                      : `"${option}"`}
                  </span>
                  {game.showAnswer && option === currentQ.correctAnswer && (
                    <CheckCircle size={20} className="text-green-600" />
                  )}
                  {game.showAnswer &&
                    game.selectedAnswer === option &&
                    option !== currentQ.correctAnswer && (
                      <XCircle size={20} className="text-red-600" />
                    )}
                </div>
              </button>
            ))}
          </div>

          {/* Game controls and hints */}
          <div className="flex justify-between items-center mb-4">
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
            <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700 font-medium">{showHint.text}</p>
              {showHint.context && (
                <p className="text-yellow-600 text-sm mt-1">
                  {showHint.context}
                </p>
              )}
            </div>
          )}

          {/* Result Explanation */}
          {game.showAnswer && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-bold text-blue-800 mb-2">
                Contexto Histórico:
              </h5>
              <p className="text-blue-700 text-sm leading-relaxed">
                {currentQ?.explanation}
              </p>
              <div className="mt-2 flex items-center space-x-4 text-xs text-blue-600">
                <span>Período: {currentQ?.period}</span>
                <span>Categoría: {currentQ?.category}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // DEPRECATED: Replaced with unified renderGame() function
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

  // DEPRECATED: Replaced with unified renderGame() function
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

  const getScoreMessage = () => {
    const stats = game.getStatistics();
    const percentage = stats.accuracy;

    if (percentage >= 90) {
      return {
        message: "¡Excelente! Eres un verdadero experto en historia",
        color: "text-green-600",
      };
    } else if (percentage >= 75) {
      return {
        message: "¡Muy bien! Tienes buenos conocimientos históricos",
        color: "text-blue-600",
      };
    } else if (percentage >= 60) {
      return {
        message: "Buen trabajo, pero puedes mejorar",
        color: "text-amber-600",
      };
    } else if (percentage >= 40) {
      return {
        message: "Necesitas estudiar más historia",
        color: "text-orange-600",
      };
    } else {
      return {
        message: "¡Sigue practicando! La historia es fascinante",
        color: "text-red-600",
      };
    }
  };

  const renderResultsScreen = () => {
    const stats = game.getStatistics();
    const percentage = stats.accuracy;
    const scoreMessage = getScoreMessage();

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
            <p className="text-stone-600">
              Modo:{" "}
              {game.gameMode === "quote-to-person"
                ? "Cita → Personaje"
                : "Personaje → Cita"}
            </p>
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
        {game.gameResults && game.gameResults.length > 0 && (
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
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => startGame(game.gameMode)}
              className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              <RotateCcw size={20} />
              <span>Repetir Mismo Modo</span>
            </button>
            <button
              onClick={() =>
                startGame(
                  game.gameMode === "quote-to-person"
                    ? "person-to-quote"
                    : "quote-to-person"
                )
              }
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Play size={20} />
              <span>Probar Otro Modo</span>
            </button>
            <button
              onClick={() => {
                game.resetGame();
                setGameMode("quote-to-person");
                setDifficulty("medium");
                setShowHint(null);
              }}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4">
      {game.gameState === "setup" && renderSetupScreen()}
      {(game.gameState === "playing" || game.gameState === "paused") &&
        renderGame()}
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
