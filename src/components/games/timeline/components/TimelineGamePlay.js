/**
 * TimelineGamePlay Component
 * Componente principal para jugar el juego de línea de tiempo
 * @created 2024-12-19
 */

import React, { useState } from "react";
import {
  GripVertical,
  Clock,
  Lightbulb,
  CheckCircle,
  XCircle,
  RotateCcw,
  Eye,
  ArrowUpDown,
} from "lucide-react";

import GameButton from "../../shared/GameButton.js";
import { formatYear, getCardStateStyles } from "../utils/timeline-utils.js";
import {
  VERIFICATION_STATES,
  ANIMATION_CONFIG,
} from "../constants/timeline-constants.js";

/**
 * Componente de tarjeta de evento
 */
const EventCard = ({
  event,
  draggable = true,
  onDragStart,
  onClick,
  showYear = false,
  position = null,
  verification = null,
  className = "",
}) => {
  const cardStyles =
    verification !== null
      ? getCardStateStyles(verification)
      : getCardStateStyles(VERIFICATION_STATES.PENDING);

  const handleDragStart = (e) => {
    if (draggable && onDragStart) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", event.id);
      onDragStart(e, event);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      onClick={handleClick}
      className={`
        bg-white p-4 rounded-xl border-2 shadow-sm select-none
        ${ANIMATION_CONFIG.TRANSITION_DURATION}
        ${draggable ? `cursor-move ${ANIMATION_CONFIG.CARD_HOVER_SCALE}` : ""}
        ${onClick && !draggable ? "cursor-pointer" : ""}
        ${cardStyles.border} ${cardStyles.background}
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Posición y estado */}
          {position !== null && (
            <div className="flex items-center space-x-2 mb-3">
              <div
                className={`
                px-3 py-1 rounded-full text-xs font-bold text-white
                ${
                  verification === VERIFICATION_STATES.CORRECT
                    ? "bg-green-600"
                    : ""
                }
                ${
                  verification === VERIFICATION_STATES.INCORRECT
                    ? "bg-red-600"
                    : ""
                }
                ${verification === null ? "bg-blue-600" : ""}
              `}
              >
                #{position + 1}
              </div>

              {verification !== null && (
                <div className="flex items-center">
                  {verification === VERIFICATION_STATES.CORRECT ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <XCircle size={16} className="text-red-600" />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Icono y título */}
          <div className="flex items-start space-x-3 mb-3">
            {event.icon && (
              <div className="text-2xl flex-shrink-0">{event.icon}</div>
            )}
            <div className="flex-1">
              <h5 className={`font-bold text-lg mb-1 ${cardStyles.text}`}>
                {event.title}
              </h5>

              {/* Año (si se debe mostrar) */}
              {showYear && (
                <div className="text-sm font-medium text-blue-600 mb-2">
                  {formatYear(event.year)}
                </div>
              )}
            </div>
          </div>

          {/* Descripción */}
          <p className="text-stone-600 text-sm mb-3 leading-relaxed">
            {event.description}
          </p>

          {/* Período histórico */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
              {event.period}
            </span>
          </div>
        </div>

        {/* Handle de arrastre */}
        {draggable && (
          <div className="ml-3 text-stone-400 flex-shrink-0">
            <GripVertical size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Zona de drop para eventos
 */
const DropZone = ({ onDrop, index, isActive = false, showIndex = true }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (onDrop) {
      onDrop(e, index);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        h-16 border-2 border-dashed rounded-xl flex items-center justify-center text-sm font-medium
        ${ANIMATION_CONFIG.TRANSITION_DURATION}
        ${
          isDragOver || isActive
            ? ANIMATION_CONFIG.DROP_ZONE_HIGHLIGHT
            : "border-stone-300 text-stone-500"
        }
        hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600
      `}
    >
      <div className="flex items-center space-x-2">
        <ArrowUpDown size={16} />
        <span>{showIndex ? `Posición ${index + 1}` : "Suelta aquí"}</span>
      </div>
    </div>
  );
};

/**
 * Componente principal del juego
 */
const TimelineGamePlay = ({
  shuffledEvents = [],
  userOrder = [],
  verification = null,
  attempts = 0,
  showHints = false,
  maxAttempts = 3,
  onDragStart,
  onDragOver,
  onDrop,
  onRemoveFromOrder,
  onAddToOrder,
  onVerifyOrder,
  onShowHints,
  onReset,
  canVerify = true,
  canShowHints = true,
}) => {
  // Renderizar eventos disponibles
  const renderAvailableEvents = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <Clock className="text-blue-600" size={24} />
        <div>
          <h4 className="text-lg font-bold text-stone-800">
            Eventos Disponibles
          </h4>
          <p className="text-stone-600 text-sm">
            Arrastra los eventos a la línea de tiempo
          </p>
        </div>
      </div>

      <div className="min-h-64 bg-stone-50 rounded-xl p-4 border-2 border-dashed border-stone-300">
        {shuffledEvents.length > 0 ? (
          <div className="space-y-3">
            {shuffledEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDragStart={onDragStart}
                onClick={onAddToOrder}
                showYear={showHints}
                draggable={true}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-stone-500">
            <div className="text-center">
              <CheckCircle size={48} className="mx-auto mb-3 text-green-500" />
              <p className="font-medium">¡Todos los eventos están ordenados!</p>
              <p className="text-sm">Verifica tu línea de tiempo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Renderizar línea de tiempo del usuario
  const renderUserTimeline = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-600 p-2 rounded-lg">
            <Clock className="text-white" size={20} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-stone-800">
              Tu Línea de Tiempo
            </h4>
            <p className="text-stone-600 text-sm">
              Ordena los eventos cronológicamente
            </p>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center space-x-2">
          {canShowHints && (
            <GameButton
              onClick={onShowHints}
              variant="secondary"
              size="sm"
              icon={showHints ? Eye : Lightbulb}
            >
              {showHints ? "Ocultar años" : "Mostrar años"}
            </GameButton>
          )}

          <GameButton
            onClick={onReset}
            variant="ghost"
            size="sm"
            icon={RotateCcw}
          >
            Reiniciar
          </GameButton>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-amber-200 p-4 min-h-96">
        {userOrder.length === 0 ? (
          <div className="flex items-center justify-center h-full text-stone-500">
            <div className="text-center">
              <ArrowUpDown size={48} className="mx-auto mb-3" />
              <p className="font-medium">Línea de tiempo vacía</p>
              <p className="text-sm">Arrastra eventos aquí para ordenarlos</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Primera zona de drop */}
            <DropZone onDrop={onDrop} index={0} />

            {/* Eventos ordenados con zonas de drop intercaladas */}
            {userOrder.map((event, index) => {
              const eventVerification = verification?.results?.find(
                (r) => r.eventId === event.id
              );
              const verificationState = eventVerification?.state || null;

              return (
                <React.Fragment key={`${event.id}-${index}`}>
                  <EventCard
                    event={event}
                    position={index}
                    verification={verificationState}
                    showYear={showHints}
                    onClick={onRemoveFromOrder}
                    draggable={false}
                  />

                  {/* Zona de drop después del evento */}
                  <DropZone onDrop={onDrop} index={index + 1} />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Botón de verificar */}
      {userOrder.length > 0 && canVerify && (
        <div className="text-center">
          <GameButton
            onClick={onVerifyOrder}
            variant="primary"
            size="lg"
            icon={CheckCircle}
            disabled={userOrder.length === 0}
          >
            Verificar Orden
          </GameButton>

          {attempts > 0 && (
            <p className="text-stone-600 text-sm mt-2">
              Intento {attempts + 1} de {maxAttempts}
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Eventos disponibles */}
        {renderAvailableEvents()}

        {/* Línea de tiempo del usuario */}
        {renderUserTimeline()}
      </div>

      {/* Información de ayuda */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div className="text-blue-800">
            <h5 className="font-bold mb-1">💡 Cómo jugar:</h5>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Arrastra</strong> los eventos de la izquierda a la
                línea de tiempo
              </li>
              <li>
                • <strong>Ordénalos</strong> cronológicamente (del más antiguo
                al más reciente)
              </li>
              <li>
                • <strong>Haz clic</strong> en un evento ordenado para quitarlo
              </li>
              <li>
                • <strong>Usa las pistas</strong> si necesitas ayuda con los
                años
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineGamePlay;
