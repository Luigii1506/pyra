/**
 * MatchingGame Component
 * Interactive matching game for historical pairs
 * @created 2024-12-19
 */

"use client";

import React, { useEffect, useState } from "react";
import useMatchingGame from "./useMatchingGame";
import GameHeader from "../shared/GameHeader";
import GameButton from "../shared/GameButton";
import GameStats from "../shared/GameStats";

const MatchingGame = ({ onClose, customPairs = [] }) => {
  const game = useMatchingGame(customPairs);
  const [difficulty, setDifficulty] = useState("medium");
  const [showHint, setShowHint] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    game.initializeGame(difficulty);
  }, [difficulty]);

  const handleItemClick = (item) => {
    game.selectItem(item);
    setFeedback("");
  };

  const handleHint = () => {
    const hint = game.useHint();
    if (hint) {
      setShowHint(hint);
      setTimeout(() => setShowHint(null), 5000);
    }
  };

  const getItemClasses = (item) => {
    const baseClasses =
      "p-4 m-2 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center min-h-[80px] flex items-center justify-center";

    if (game.matchedPairs.includes(item.pairId)) {
      return `${baseClasses} bg-green-100 border-green-400 text-green-800 cursor-default opacity-75`;
    }

    if (game.selectedItems.includes(item.id)) {
      return `${baseClasses} bg-blue-100 border-blue-400 text-blue-800 transform scale-105`;
    }

    return `${baseClasses} bg-white border-gray-300 hover:border-blue-300 hover:bg-blue-50`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      leaders: "bg-purple-100 text-purple-800",
      monuments: "bg-orange-100 text-orange-800",
      events: "bg-green-100 text-green-800",
      places: "bg-blue-100 text-blue-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const renderSetupScreen = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Juego de Emparejamiento
        </h2>
        <p className="text-gray-600 mb-8">
          Conecta elementos históricos relacionados. Empareja personajes con sus
          civilizaciones, monumentos con sus ubicaciones, y más.
        </p>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Selecciona la dificultad:
          </h3>
          <div className="flex justify-center gap-4">
            {[
              { value: "easy", label: "Fácil", pairs: "4 pares" },
              { value: "medium", label: "Medio", pairs: "6 pares" },
              { value: "hard", label: "Difícil", pairs: "8 pares" },
            ].map((option) => (
              <GameButton
                key={option.value}
                variant={difficulty === option.value ? "primary" : "outline"}
                onClick={() => setDifficulty(option.value)}
                className="flex flex-col items-center p-4"
              >
                <span className="font-semibold">{option.label}</span>
                <span className="text-sm opacity-75">{option.pairs}</span>
              </GameButton>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-blue-800 mb-2">¿Cómo jugar?</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Selecciona dos elementos que creas que están relacionados</li>
            <li>• Gana puntos por cada emparejamiento correcto</li>
            <li>• Las rachas consecutivas otorgan puntos extra</li>
            <li>• Usa pistas si necesitas ayuda (limitadas)</li>
            <li>• Completa todos los pares lo más rápido posible</li>
          </ul>
        </div>

        <GameButton variant="primary" size="large" onClick={game.startGame}>
          Comenzar Juego
        </GameButton>
      </div>
    </div>
  );

  const renderGameScreen = () => (
    <div className="max-w-6xl mx-auto">
      <GameHeader
        title="Juego de Emparejamiento"
        description={`Empareja ${game.pairs.length} pares históricos`}
        progress={game.progress}
        timeElapsed={game.formatTime(game.timeElapsed)}
        score={game.score}
        onPause={game.togglePause}
        onClose={onClose}
        isPaused={game.gameState === "paused"}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GameStats
          stats={[
            {
              label: "Pares encontrados",
              value: `${game.matchedPairs.length}/${game.pairs.length}`,
            },
            { label: "Racha actual", value: game.streak },
            { label: "Intentos fallidos", value: game.wrongAttempts },
          ]}
          layout="grid"
        />

        <div className="flex justify-center items-center gap-4">
          <GameButton
            variant="warning"
            onClick={handleHint}
            disabled={game.hints <= 0}
            className="flex items-center gap-2"
          >
            💡 Pista ({game.hints})
          </GameButton>
          <GameButton variant="outline" onClick={game.resetGame}>
            🔄 Reiniciar
          </GameButton>
        </div>

        <div className="text-center">
          {feedback && (
            <div
              className={`p-2 rounded ${
                feedback.includes("¡Correcto!")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>

      {showHint && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Pista:</strong> Busca la conexión entre &quot;
                {showHint.left}&quot; y &quot;{showHint.right}&quot;
                {showHint.category && ` (Categoría: ${showHint.category})`}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {game.shuffledItems.map((item) => (
          <div
            key={item.id}
            className={getItemClasses(item)}
            onClick={() => handleItemClick(item)}
          >
            <div className="w-full">
              <div
                className={`text-xs px-2 py-1 rounded mb-2 ${getCategoryColor(
                  item.category
                )}`}
              >
                {item.category}
              </div>
              <div className="font-medium text-sm break-words">{item.text}</div>
            </div>
          </div>
        ))}
      </div>

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

  const renderResultsScreen = () => {
    const stats = game.getStatistics();
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Felicitaciones!
          </h2>
          <p className="text-gray-600 mb-8">
            Has completado todos los emparejamientos
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
                {game.formatTime(stats.timeElapsed)}
              </div>
              <div className="text-green-800">Tiempo Total</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {stats.accuracy}%
              </div>
              <div className="text-purple-800">Precisión</div>
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
                label: "Pares emparejados",
                value: `${stats.matchedPairs}/${stats.totalPairs}`,
              },
              { label: "Intentos fallidos", value: stats.wrongAttempts },
              { label: "Pistas usadas", value: stats.hintsUsed },
              {
                label: "Tiempo promedio por par",
                value: `${stats.averageTimePerPair}s`,
              },
            ]}
            layout="grid"
            className="mb-8"
          />

          <div className="flex justify-center gap-4">
            <GameButton
              variant="primary"
              onClick={() => game.initializeGame(difficulty)}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {game.gameState === "setup" && renderSetupScreen()}
      {(game.gameState === "playing" || game.gameState === "paused") &&
        renderGameScreen()}
      {game.gameState === "completed" && renderResultsScreen()}
    </div>
  );
};

export default MatchingGame;
