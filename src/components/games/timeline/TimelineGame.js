/**
 * TimelineGame Component
 * Juego de ordenar eventos cronológicamente
 * @created 2024-12-19
 */

import React from "react";
import {
  Clock,
  Trophy,
  Play,
  RotateCcw,
  Lightbulb,
  GripVertical,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";
import useTimelineGame from "./useTimelineGame.js";
import GameHeader from "../shared/GameHeader.js";
import GameButton from "../shared/GameButton.js";
import GameStats from "../shared/GameStats.js";

// Default timeline events
const defaultEvents = [
  {
    id: 1,
    title: "Fundación de Roma",
    year: -753,
    description: "Según la tradición, Rómulo funda la ciudad de Roma",
    period: "Reino Romano",
  },
  {
    id: 2,
    title: "Batalla de Maratón",
    year: -490,
    description: "Victoria ateniense sobre los persas en las Guerras Médicas",
    period: "Grecia Clásica",
  },
  {
    id: 3,
    title: "Muerte de Alejandro Magno",
    year: -323,
    description: "Fin del imperio macedonio y inicio del período helenístico",
    period: "Período Helenístico",
  },
  {
    id: 4,
    title: "Asesinato de Julio César",
    year: -44,
    description: "César es asesinado en los Idus de Marzo en el Senado Romano",
    period: "República Romana",
  },
  {
    id: 5,
    title: "Caída del Imperio Romano de Occidente",
    year: 476,
    description:
      "Odoacro depone a Rómulo Augústulo, último emperador de Occidente",
    period: "Caída de Roma",
  },
];

const EventCard = ({
  event,
  draggable = true,
  onDragStart,
  onClick,
  showYear = false,
  position = null,
  isCorrect = null,
  className = "",
}) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      className={`
        bg-white p-4 rounded-lg border transition-all
        ${draggable ? "cursor-move hover:shadow-md hover:scale-[1.02]" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${isCorrect === true ? "border-green-300 bg-green-50" : ""}
        ${isCorrect === false ? "border-red-300 bg-red-50" : ""}
        ${isCorrect === null ? "border-stone-200" : ""}
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {position !== null && (
            <div className="flex items-center space-x-2 mb-2">
              <div
                className={`
                px-2 py-1 rounded text-xs font-bold
                ${isCorrect === true ? "bg-green-600 text-white" : ""}
                ${isCorrect === false ? "bg-red-600 text-white" : ""}
                ${isCorrect === null ? "bg-blue-600 text-white" : ""}
              `}
              >
                #{position + 1}
              </div>
              {isCorrect !== null && (
                <div className="flex items-center">
                  {isCorrect ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <XCircle size={16} className="text-red-600" />
                  )}
                </div>
              )}
            </div>
          )}

          <h5 className="font-bold text-stone-800 mb-1">{event.title}</h5>

          {showYear && (
            <div className="text-sm font-medium text-blue-600 mb-1">
              {event.year < 0
                ? `${Math.abs(event.year)} a.C.`
                : `${event.year} d.C.`}
            </div>
          )}

          <p className="text-stone-600 text-sm mb-2">{event.description}</p>

          <div className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded inline-block">
            {event.period}
          </div>
        </div>

        {draggable && (
          <div className="ml-3 text-stone-400">
            <GripVertical size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

const DropZone = ({ onDrop, onDragOver, index, isActive = false }) => (
  <div
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, index)}
    className={`
      h-12 border-2 border-dashed rounded-lg flex items-center justify-center text-sm
      transition-all
      ${
        isActive
          ? "border-blue-400 bg-blue-50 text-blue-600"
          : "border-stone-300 text-stone-500"
      }
      hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600
    `}
  >
    Suelta aquí
  </div>
);

const TimelineGame = ({
  events = defaultEvents,
  onBack = null,
  onGameComplete = null,
}) => {
  const {
    gameState,
    shuffledEvents,
    userOrder,
    score,
    attempts,
    showHints,
    stats,
    actions,
    utils,
  } = useTimelineGame({ events });

  // Handle game completion
  React.useEffect(() => {
    if (gameState === "finished" && onGameComplete) {
      const feedback = utils.getFeedback();
      onGameComplete({ score, attempts, feedback });
    }
  }, [gameState, score, attempts, utils, onGameComplete]);

  const renderStartScreen = () => (
    <div className="text-center space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <Clock className="mx-auto text-blue-600 mb-4" size={64} />
        <h3 className="text-2xl font-bold text-stone-800 mb-4">
          Ordenar Cronológicamente
        </h3>
        <p className="text-stone-600 mb-6">
          Arrastra los eventos históricos para ordenarlos por fecha
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-stone-800 mb-2">🎯 Cómo Jugar:</h4>
            <ul className="text-stone-600 space-y-1 text-left">
              <li>• Arrastra eventos de la columna izquierda</li>
              <li>
                • Ordénalos cronológicamente de más antiguo a más reciente
              </li>
              <li>• Puedes reordenar eventos ya colocados</li>
              <li>• Haz clic en &ldquo;Verificar&rdquo; cuando termines</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-bold text-stone-800 mb-2">
              📅 Eventos a Ordenar:
            </h4>
            <ul className="text-stone-600 space-y-1 text-left">
              {events.slice(0, 4).map((event, index) => (
                <li key={event.id}>• {event.title}</li>
              ))}
              {events.length > 4 && <li>• Y {events.length - 4} más...</li>}
            </ul>
          </div>
        </div>

        <GameButton
          onClick={actions.startGame}
          variant="primary"
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
      {/* Game Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.orderedEvents}
              </div>
              <div className="text-stone-600 text-sm">Ordenados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {stats.remainingEvents}
              </div>
              <div className="text-stone-600 text-sm">Restantes</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <GameButton
              onClick={actions.toggleHints}
              variant={showHints ? "warning" : "ghost"}
              size="sm"
              icon={Lightbulb}
            >
              {showHints ? "Ocultar Años" : "Mostrar Años"}
            </GameButton>

            {stats.isComplete && (
              <GameButton
                onClick={actions.checkAnswer}
                variant="success"
                icon={CheckCircle}
              >
                Verificar Orden
              </GameButton>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(stats.orderedEvents / stats.totalEvents) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Events */}
        <div>
          <h4 className="text-lg font-bold text-stone-800 mb-4">
            Eventos Disponibles
          </h4>
          <div className="space-y-3 min-h-96 bg-stone-50 rounded-lg p-4 border-2 border-dashed border-stone-300">
            {shuffledEvents.length > 0 ? (
              shuffledEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onDragStart={(e) => actions.handleDragStart(e, event)}
                  onClick={() => actions.addToOrder(event)}
                  showYear={showHints}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500">
                ¡Todos los eventos han sido ordenados!
              </div>
            )}
          </div>
        </div>

        {/* User Timeline */}
        <div>
          <h4 className="text-lg font-bold text-stone-800 mb-4">
            Tu Línea de Tiempo
          </h4>
          <div className="space-y-3 min-h-96 bg-blue-50 rounded-lg p-4 border-2 border-dashed border-blue-300">
            {userOrder.length === 0 ? (
              <div className="flex items-center justify-center h-full text-stone-500">
                Arrastra eventos aquí para crear tu línea de tiempo
              </div>
            ) : (
              <>
                {userOrder.map((event, index) => (
                  <div key={`${event.id}-${index}`}>
                    <EventCard
                      event={event}
                      position={index}
                      onDragStart={(e) => actions.handleDragStart(e, event)}
                      showYear={showHints}
                      className="relative"
                    >
                      <button
                        onClick={() => actions.removeFromOrder(event)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-sm"
                      >
                        <X size={14} />
                      </button>
                    </EventCard>

                    {/* Drop zone between items */}
                    <div className="py-2">
                      <DropZone
                        onDragOver={actions.handleDragOver}
                        onDrop={actions.handleDrop}
                        index={index + 1}
                      />
                    </div>
                  </div>
                ))}

                {/* Final drop zone */}
                <DropZone
                  onDragOver={actions.handleDragOver}
                  onDrop={actions.handleDrop}
                  index={userOrder.length}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderResultsScreen = () => {
    const feedback = utils.getFeedback();
    const performance =
      score >= 80 ? "Excelente" : score >= 60 ? "Bueno" : "Mejorable";
    const performanceColor =
      score >= 80
        ? "text-green-600"
        : score >= 60
        ? "text-amber-600"
        : "text-red-600";

    return (
      <div className="text-center space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
          <div className="mb-6">
            <Trophy className="mx-auto text-amber-600 mb-4" size={64} />
            <h3 className="text-3xl font-bold text-stone-800 mb-2">
              ¡Línea de Tiempo Completada!
            </h3>
            <p className={`text-xl font-medium ${performanceColor}`}>
              {performance} ordenamiento
            </p>
          </div>

          <GameStats
            stats={[
              {
                icon: Trophy,
                value: `${score}%`,
                label: "Precisión",
                valueColor: performanceColor,
                iconBg:
                  score >= 80
                    ? "bg-green-500"
                    : score >= 60
                    ? "bg-amber-500"
                    : "bg-red-500",
              },
              {
                icon: Clock,
                value: feedback?.filter((f) => f.isCorrect).length || 0,
                label: "Posiciones Correctas",
                valueColor: "text-green-600",
                iconBg: "bg-green-500",
              },
              {
                icon: Play,
                value: attempts,
                label: "Intentos",
                valueColor: "text-blue-600",
                iconBg: "bg-blue-500",
              },
              {
                icon: Trophy,
                value: events.length,
                label: "Eventos Ordenados",
                valueColor: "text-purple-600",
                iconBg: "bg-purple-500",
              },
            ]}
            layout="flex"
            className="mb-8"
          />

          {/* Detailed Feedback */}
          <div className="bg-white rounded-lg p-6 border border-stone-200 mb-6">
            <h4 className="text-lg font-bold text-stone-800 mb-4">
              Orden Cronológico Detallado
            </h4>
            <div className="space-y-2">
              {stats.correctOrder.map((event, index) => {
                const userFeedback = feedback?.find(
                  (f) => f.event.id === event.id
                );
                const isCorrect = userFeedback?.isCorrect;

                return (
                  <div
                    key={event.id}
                    className={`
                      flex items-center justify-between p-3 rounded border-2
                      ${
                        isCorrect
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                        ${isCorrect ? "bg-green-500" : "bg-red-500"}
                      `}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-stone-800">
                          {event.title}
                        </div>
                        <div className="text-sm text-stone-600">
                          {utils.formatYear(event.year)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isCorrect ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-red-600">
                            Tu posición: {(userFeedback?.userPosition || 0) + 1}
                          </span>
                          <XCircle size={20} className="text-red-600" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-4 justify-center">
            <GameButton
              onClick={actions.resetGame}
              variant="primary"
              icon={RotateCcw}
            >
              Ordenar de Nuevo
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
    <div className="max-w-6xl mx-auto space-y-6">
      <GameHeader
        title="Ordenar Cronológicamente"
        description="Arrastra eventos para ordenarlos por fecha"
        icon={Clock}
        iconColor="bg-blue-500"
        onBack={onBack}
        showBackButton={gameState === "idle" && onBack}
        stats={
          gameState === "playing"
            ? [
                {
                  value: stats.orderedEvents,
                  label: "Ordenados",
                  color: "text-blue-600",
                },
                {
                  value: stats.remainingEvents,
                  label: "Restantes",
                  color: "text-amber-600",
                },
              ]
            : []
        }
      />

      {gameState === "idle" && renderStartScreen()}
      {gameState === "playing" && renderGameScreen()}
      {gameState === "finished" && renderResultsScreen()}
    </div>
  );
};

export default TimelineGame;
