/**
 * useTimelineGame Hook
 * Hook para manejar el estado del juego de línea de tiempo
 * @created 2024-12-19
 */

import { useState, useCallback, useEffect } from "react";
import {
  TIMELINE_GAME_STATES,
  DEFAULT_GAME_CONFIG,
} from "./constants/timeline-constants.js";
import {
  shuffleArray,
  verifyOrder,
  calculateScore,
  getFeedbackMessage,
  validateEventList,
} from "./utils/timeline-utils.js";

const useTimelineGame = (events = []) => {
  // Estados principales del juego
  const [gameState, setGameState] = useState(TIMELINE_GAME_STATES.SETUP);
  const [shuffledEvents, setShuffledEvents] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(DEFAULT_GAME_CONFIG.showHints);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [gameEndTime, setGameEndTime] = useState(null);

  // Estados de verificación y puntuación
  const [verification, setVerification] = useState(null);
  const [score, setScore] = useState({ finalScore: 0 });

  // Validar eventos al inicializar
  useEffect(() => {
    const validation = validateEventList(events);
    if (!validation.isValid) {
      console.error("Error en eventos:", validation.error);
    }
  }, [events]);

  // Iniciar juego
  const startGame = useCallback(() => {
    if (events.length === 0) {
      console.error("No hay eventos para el juego");
      return;
    }

    const shuffled = shuffleArray(events);
    setShuffledEvents(shuffled);
    setUserOrder([]);
    setGameState(TIMELINE_GAME_STATES.PLAYING);
    setAttempts(0);
    setDraggedItem(null);
    setVerification(null);
    setScore({ finalScore: 0 });
    setGameStartTime(Date.now());
    setGameEndTime(null);
  }, [events]);

  // Manejar inicio de arrastre
  const handleDragStart = useCallback((event, item) => {
    console.log("Drag started with item:", item.title);
    setDraggedItem(item);
  }, []);

  // Manejar arrastre sobre zona (no necesario pero mantenemos compatibilidad)
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  // Manejar drop de evento
  const handleDrop = useCallback(
    (event, targetIndex) => {
      event.preventDefault();

      if (!draggedItem) {
        console.log("No dragged item found");
        return;
      }

      console.log(
        "Dropping item:",
        draggedItem.title,
        "at index:",
        targetIndex
      );

      const newOrder = [...userOrder];
      const existingIndex = newOrder.findIndex(
        (item) => item.id === draggedItem.id
      );

      // Remover de posición existente si ya está en el orden
      if (existingIndex !== -1) {
        newOrder.splice(existingIndex, 1);
        // Ajustar índice objetivo si es necesario
        if (existingIndex < targetIndex) {
          targetIndex -= 1;
        }
      }

      // Insertar en nueva posición
      newOrder.splice(targetIndex, 0, draggedItem);
      setUserOrder(newOrder);

      // Remover de eventos disponibles si no estaba en el orden
      if (existingIndex === -1) {
        setShuffledEvents((prev) =>
          prev.filter((item) => item.id !== draggedItem.id)
        );
      }

      setDraggedItem(null);
      console.log(
        "New order:",
        newOrder.map((e) => e.title)
      );
    },
    [draggedItem, userOrder]
  );

  // Remover evento del orden (hacer clic para quitar)
  const removeFromOrder = useCallback((eventToRemove) => {
    console.log("Removing from order:", eventToRemove.title);
    setUserOrder((prev) => prev.filter((item) => item.id !== eventToRemove.id));
    setShuffledEvents((prev) => [...prev, eventToRemove]);
  }, []);

  // Agregar evento al final del orden (hacer clic para agregar)
  const addToOrder = useCallback(
    (event) => {
      console.log("Adding to order:", event.title);
      const newOrder = [...userOrder, event];
      setUserOrder(newOrder);
      setShuffledEvents((prev) => prev.filter((item) => item.id !== event.id));
    },
    [userOrder]
  );

  // Alternar pistas de años
  const toggleHints = useCallback(() => {
    setShowHints((prev) => !prev);
  }, []);

  // Verificar orden cronológico - FUNCIÓN CORREGIDA
  const verifyOrderCallback = useCallback(() => {
    if (userOrder.length === 0) return;

    console.log(
      "Verifying order:",
      userOrder.map((e) => `${e.title} (${e.year})`)
    );

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const orderVerification = verifyOrder(userOrder);
    const calculatedScore = calculateScore(orderVerification, newAttempts);

    console.log("Verification result:", orderVerification);
    console.log("Score:", calculatedScore);

    setVerification(orderVerification);
    setScore(calculatedScore);

    // Si el juego está completo (todos los eventos ordenados y verificados)
    if (shuffledEvents.length === 0) {
      setGameState(TIMELINE_GAME_STATES.FINISHED);
      setGameEndTime(Date.now());
    }
  }, [userOrder, shuffledEvents.length, attempts]);

  // Reiniciar juego
  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Obtener feedback del rendimiento
  const getFeedback = useCallback(() => {
    if (!verification) return null;
    return getFeedbackMessage(verification, attempts);
  }, [verification, attempts]);

  // Verificar si se puede verificar el orden
  const canVerify =
    userOrder.length > 0 && attempts < DEFAULT_GAME_CONFIG.maxAttempts;

  // Verificar si el juego está completo
  const isGameComplete = shuffledEvents.length === 0 && userOrder.length > 0;

  // Estado del progreso
  const progress = {
    eventsPlaced: userOrder.length,
    totalEvents: events.length,
    percentage:
      events.length > 0
        ? Math.round((userOrder.length / events.length) * 100)
        : 0,
  };

  // Estadísticas del juego
  const stats = {
    attempts,
    score: score.finalScore,
    accuracy: verification?.accuracy || 0,
    correctPositions: verification?.correctPositions || 0,
    totalPositions: verification?.totalPositions || 0,
    isPerfect: verification?.isPerfect || false,
  };

  return {
    // Estados del juego
    gameState,
    shuffledEvents,
    userOrder,
    draggedItem,
    attempts,
    showHints,
    verification,
    score,
    gameStartTime,
    gameEndTime,

    // Estados computados
    canVerify,
    isGameComplete,
    progress,
    stats,

    // Acciones
    actions: {
      startGame,
      resetGame,
      handleDragStart,
      handleDragOver,
      handleDrop,
      removeFromOrder,
      addToOrder,
      toggleHints,
      verifyOrder: verifyOrderCallback,
    },

    // Utilidades
    utils: {
      getFeedback,
    },
  };
};

export default useTimelineGame;
