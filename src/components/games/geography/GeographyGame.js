/**
 * GeographyGame Component
 * Interactive geography game with map and quiz modes
 * @created 2024-12-19
 */

"use client";

import React, { useEffect, useState } from "react";
import useMapGame from "./useMapGame";
import GameHeader from "../shared/GameHeader";
import GameButton from "../shared/GameButton";
import GameStats from "../shared/GameStats";

const GeographyGame = ({ onClose, customLocations = [] }) => {
  const game = useMapGame(customLocations);
  const [difficulty, setDifficulty] = useState("medium");
  const [gameMode, setGameMode] = useState("identify");
  const [showHint, setShowHint] = useState(null);
  const [mapClicks, setMapClicks] = useState(null);

  useEffect(() => {
    game.initializeGame(difficulty, gameMode);
  }, [difficulty, gameMode]);

  const handleMapClick = (event) => {
    if (game.gameState !== "playing" || game.gameMode !== "identify") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setMapClicks({ x, y });
    game.setSelectedLocation({ x, y });
  };

  const handleSubmitMapAnswer = () => {
    if (mapClicks) {
      game.submitAnswer(mapClicks);
      setMapClicks(null);
    }
  };

  const handleQuizAnswer = (answer) => {
    game.submitAnswer(answer);
  };

  const handleHint = () => {
    const hint = game.useHint();
    if (hint) {
      setShowHint(hint);
      setTimeout(() => setShowHint(null), 8000);
    }
  };

  const renderSetupScreen = () => (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Geografía Histórica
        </h2>
        <p className="text-gray-600 mb-8">
          Explora el mundo antiguo y pon a prueba tus conocimientos de geografía
          histórica.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Modo de Juego:</h3>
            <div className="space-y-3">
              {[
                {
                  value: "identify",
                  label: "Identificar en Mapa",
                  desc: "Ubica ciudades en el mapa",
                },
                {
                  value: "quiz",
                  label: "Preguntas",
                  desc: "Responde sobre civilizaciones y períodos",
                },
              ].map((option) => (
                <GameButton
                  key={option.value}
                  variant={gameMode === option.value ? "primary" : "outline"}
                  onClick={() => setGameMode(option.value)}
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

          <div>
            <h3 className="text-lg font-semibold mb-4">Dificultad:</h3>
            <div className="space-y-3">
              {[
                { value: "easy", label: "Fácil", desc: "Ciudades principales" },
                {
                  value: "medium",
                  label: "Medio",
                  desc: "Ubicaciones conocidas",
                },
                {
                  value: "hard",
                  label: "Difícil",
                  desc: "Todas las ubicaciones",
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

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-blue-800 mb-2">¿Cómo jugar?</h4>
          <div className="grid md:grid-cols-2 gap-4 text-blue-700 text-sm">
            <div>
              <strong>Modo Mapa:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Haz clic en el mapa donde crees que está la ciudad</li>
                <li>• Usa pistas si necesitas ayuda</li>
                <li>• La precisión afecta tu puntuación</li>
              </ul>
            </div>
            <div>
              <strong>Modo Preguntas:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Responde preguntas sobre civilizaciones</li>
                <li>• Múltiples tipos de preguntas</li>
                <li>• Las rachas dan puntos extra</li>
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

  const renderMapMode = () => (
    <div className="max-w-6xl mx-auto">
      <GameHeader
        title="Geografía Histórica - Modo Mapa"
        description={game.currentQuestion?.text || "Cargando pregunta..."}
        progress={game.progress}
        timeElapsed={game.formatTime(game.timeElapsed)}
        score={game.score}
        onPause={game.togglePause}
        onClose={onClose}
        isPaused={game.gameState === "paused"}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div
              className="relative bg-blue-100 rounded-lg overflow-hidden"
              style={{ paddingBottom: "60%" }}
            >
              <div
                className="absolute inset-0 cursor-crosshair bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200"
                onClick={handleMapClick}
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, #8B5CF6 2px, transparent 2px),
                    radial-gradient(circle at 80% 30%, #F59E0B 2px, transparent 2px),
                    radial-gradient(circle at 60% 70%, #10B981 2px, transparent 2px),
                    linear-gradient(45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(16, 185, 129, 0.1) 25%, transparent 25%)
                  `,
                  backgroundSize:
                    "20px 20px, 25px 25px, 30px 30px, 40px 40px, 40px 40px",
                }}
              >
                {/* Map regions overlay */}
                <div className="absolute inset-0">
                  {/* Mediterranean */}
                  <div className="absolute top-1/3 left-1/3 w-1/3 h-1/4 bg-blue-300 opacity-30 rounded-full"></div>
                  {/* Nile River */}
                  <div className="absolute top-1/2 right-1/4 w-1 h-1/3 bg-blue-400 opacity-50"></div>
                  {/* Mesopotamia */}
                  <div className="absolute top-1/2 right-1/6 w-1/6 h-1/8 bg-green-300 opacity-40 rounded"></div>
                </div>

                {/* Show user's click */}
                {mapClicks && (
                  <div
                    className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white transform -translate-x-2 -translate-y-2 animate-pulse"
                    style={{ left: `${mapClicks.x}%`, top: `${mapClicks.y}%` }}
                  ></div>
                )}

                {/* Show correct answer if revealed */}
                {game.showAnswer && game.currentQuestion && (
                  <div
                    className="absolute w-6 h-6 bg-green-500 rounded-full border-2 border-white transform -translate-x-3 -translate-y-3"
                    style={{
                      left: `${game.currentQuestion.correctAnswer.x}%`,
                      top: `${game.currentQuestion.correctAnswer.y}%`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                  </div>
                )}

                {/* Map labels */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  Mediterráneo Antiguo
                </div>
              </div>
            </div>

            {mapClicks && (
              <div className="mt-4 text-center">
                <GameButton variant="primary" onClick={handleSubmitMapAnswer}>
                  Confirmar Ubicación
                </GameButton>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <GameStats
            stats={[
              {
                label: "Pregunta",
                value: `${game.questionIndex + 1}/${game.locations.length}`,
              },
              { label: "Correctas", value: game.correctAnswers },
              { label: "Racha", value: game.streak },
            ]}
            layout="flex"
          />

          <div className="space-y-2">
            <GameButton
              variant="warning"
              onClick={handleHint}
              disabled={game.hints <= 0}
              className="w-full"
            >
              💡 Pista ({game.hints})
            </GameButton>
            <GameButton
              variant="outline"
              onClick={game.resetGame}
              className="w-full"
            >
              🔄 Reiniciar
            </GameButton>
          </div>

          {showHint && (
            <div className="bg-yellow-100 border border-yellow-400 p-3 rounded">
              <p className="text-yellow-800 text-sm">{showHint.text}</p>
            </div>
          )}

          {game.currentLocation && (
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold text-gray-800 mb-2">Información:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Civilización:</strong>{" "}
                  {game.currentLocation.civilization}
                </p>
                <p>
                  <strong>Período:</strong> {game.currentLocation.period}
                </p>
                <p className="text-xs">{game.currentLocation.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderQuizMode = () => (
    <div className="max-w-4xl mx-auto">
      <GameHeader
        title="Geografía Histórica - Preguntas"
        description={`Pregunta ${game.questionIndex + 1} de ${
          game.locations.length
        }`}
        progress={game.progress}
        timeElapsed={game.formatTime(game.timeElapsed)}
        score={game.score}
        onPause={game.togglePause}
        onClose={onClose}
        isPaused={game.gameState === "paused"}
      />

      <div className="bg-white rounded-lg p-8 shadow-lg">
        {game.currentQuestion && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {game.currentQuestion.text}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {game.currentQuestion.options?.map((option, index) => (
                <GameButton
                  key={index}
                  variant="outline"
                  onClick={() => handleQuizAnswer(option)}
                  disabled={game.showAnswer}
                  className={`p-4 text-left h-auto ${
                    game.showAnswer &&
                    option === game.currentQuestion.correctAnswer
                      ? "bg-green-100 border-green-400 text-green-800"
                      : ""
                  } ${
                    showHint && showHint.eliminate === option
                      ? "opacity-50 line-through"
                      : ""
                  }`}
                >
                  {option}
                </GameButton>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <GameStats
                stats={[
                  { label: "Correctas", value: game.correctAnswers },
                  { label: "Incorrectas", value: game.wrongAnswers },
                  { label: "Racha", value: game.streak },
                ]}
                layout="inline"
              />

              <div className="space-x-2">
                <GameButton
                  variant="warning"
                  onClick={handleHint}
                  disabled={game.hints <= 0}
                >
                  💡 Pista ({game.hints})
                </GameButton>
                <GameButton variant="outline" onClick={game.resetGame}>
                  🔄 Reiniciar
                </GameButton>
              </div>
            </div>

            {showHint && (
              <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-700">{showHint.text}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  const renderResultsScreen = () => {
    const stats = game.getStatistics();
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="text-6xl mb-4">🌍</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Excelente trabajo!
          </h2>
          <p className="text-gray-600 mb-8">
            Has completado el desafío de geografía histórica
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      {game.gameState === "setup" && renderSetupScreen()}
      {(game.gameState === "playing" || game.gameState === "paused") &&
        game.gameMode === "identify" &&
        renderMapMode()}
      {(game.gameState === "playing" || game.gameState === "paused") &&
        game.gameMode !== "identify" &&
        renderQuizMode()}
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

export default GeographyGame;
