/**
 * Timeline Game Utils
 * Utilidades para el juego de línea de tiempo
 * @created 2024-12-19
 */

import {
  GAME_CONFIG,
  FEEDBACK_MESSAGES,
  VERIFICATION_STATES,
  CARD_STATE_STYLES,
} from "../constants/timeline-constants.js";

/**
 * Mezclar array de eventos
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Formatear año para mostrar
 */
export const formatYear = (year) => {
  if (year < 0) {
    return `${Math.abs(year)} a.C.`;
  }
  return `${year} d.C.`;
};

/**
 * Verificar si el orden es correcto
 */
export const verifyOrder = (userOrder) => {
  const results = [];
  let correctPositions = 0;

  userOrder.forEach((event, index) => {
    const correctPosition = getCorrectPosition(event, userOrder);
    const isCorrect = index === correctPosition;

    if (isCorrect) {
      correctPositions++;
    }

    results.push({
      eventId: event.id,
      userPosition: index,
      correctPosition,
      isCorrect,
      state: isCorrect
        ? VERIFICATION_STATES.CORRECT
        : VERIFICATION_STATES.INCORRECT,
    });
  });

  return {
    results,
    correctPositions,
    totalPositions: userOrder.length,
    accuracy:
      userOrder.length > 0 ? (correctPositions / userOrder.length) * 100 : 0,
    isPerfect: correctPositions === userOrder.length,
  };
};

/**
 * Obtener la posición correcta de un evento en una lista ordenada
 */
export const getCorrectPosition = (targetEvent, allEvents) => {
  const sortedEvents = [...allEvents].sort((a, b) => a.year - b.year);
  return sortedEvents.findIndex((event) => event.id === targetEvent.id);
};

/**
 * Obtener eventos ordenados cronológicamente
 */
export const getSortedEvents = (events) => {
  return [...events].sort((a, b) => a.year - b.year);
};

/**
 * Calcular puntuación del juego
 */
export const calculateScore = (verification, attempts = 1) => {
  const { correctPositions, totalPositions, isPerfect } = verification;

  let score = 0;

  // Puntos base por posiciones correctas
  score += correctPositions * GAME_CONFIG.POINTS_PER_CORRECT_POSITION;

  // Bonus por juego perfecto
  if (isPerfect) {
    score += GAME_CONFIG.BONUS_PERFECT_ORDER;
  }

  // Penalización por intentos adicionales
  const penalties = Math.max(0, attempts - 1) * GAME_CONFIG.PENALTY_PER_ATTEMPT;
  score = Math.max(0, score - penalties);

  return {
    baseScore: correctPositions * GAME_CONFIG.POINTS_PER_CORRECT_POSITION,
    perfectBonus: isPerfect ? GAME_CONFIG.BONUS_PERFECT_ORDER : 0,
    penalties,
    finalScore: score,
    breakdown: {
      correctPositions,
      totalPositions,
      pointsPerPosition: GAME_CONFIG.POINTS_PER_CORRECT_POSITION,
      perfectBonus: isPerfect ? GAME_CONFIG.BONUS_PERFECT_ORDER : 0,
      attemptPenalties: penalties,
    },
  };
};

/**
 * Obtener mensaje de feedback basado en el rendimiento
 */
export const getFeedbackMessage = (verification, attempts = 1) => {
  const { accuracy, isPerfect } = verification;

  if (isPerfect) {
    return FEEDBACK_MESSAGES.PERFECT;
  } else if (accuracy >= 80) {
    return FEEDBACK_MESSAGES.EXCELLENT;
  } else if (accuracy >= 60) {
    return FEEDBACK_MESSAGES.GOOD;
  } else {
    return FEEDBACK_MESSAGES.NEEDS_PRACTICE;
  }
};

/**
 * Generar resumen de rendimiento
 */
export const generatePerformanceSummary = (verification, attempts, score) => {
  const { accuracy, correctPositions, totalPositions } = verification;

  let summary = `Colocaste ${correctPositions} de ${totalPositions} eventos en la posición correcta`;

  if (accuracy === 100) {
    summary += ". ¡Dominas perfectamente la cronología histórica!";
  } else if (accuracy >= 80) {
    summary += ". Tienes un excelente conocimiento de la historia.";
  } else if (accuracy >= 60) {
    summary += ". Tu conocimiento histórico es bueno, pero puedes mejorar.";
  } else {
    summary += ". Necesitas repasar más la cronología histórica.";
  }

  if (attempts > 1) {
    summary += ` Lo lograste en ${attempts} intentos.`;
  }

  return summary;
};

/**
 * Obtener estilos de estado para una tarjeta
 */
export const getCardStateStyles = (state) => {
  return (
    CARD_STATE_STYLES[state] || CARD_STATE_STYLES[VERIFICATION_STATES.PENDING]
  );
};

/**
 * Validar si una lista de eventos está completa
 */
export const validateEventList = (events) => {
  if (!Array.isArray(events)) {
    return { isValid: false, error: "Los eventos deben ser un array" };
  }

  if (events.length === 0) {
    return { isValid: false, error: "Debe haber al menos un evento" };
  }

  const requiredFields = ["id", "title", "year", "description"];
  const invalidEvents = events.filter((event) => {
    return !requiredFields.every((field) => event.hasOwnProperty(field));
  });

  if (invalidEvents.length > 0) {
    return {
      isValid: false,
      error: "Algunos eventos no tienen todos los campos requeridos",
    };
  }

  return { isValid: true, error: null };
};

/**
 * Obtener sugerencia/hint para un evento mal colocado
 */
export const getEventHint = (event, currentPosition, correctPosition) => {
  const yearHint = `Este evento ocurrió en ${formatYear(event.year)}`;

  if (currentPosition < correctPosition) {
    return `${yearHint}. Debería ir más hacia el final de la cronología.`;
  } else if (currentPosition > correctPosition) {
    return `${yearHint}. Debería ir más hacia el inicio de la cronología.`;
  }

  return `${yearHint}. ¡Está en la posición correcta!`;
};

/**
 * Obtener estadísticas del juego
 */
export const getGameStats = (verification, attempts, score, events) => {
  const { accuracy, correctPositions, totalPositions, isPerfect } =
    verification;

  return [
    {
      icon: "🎯",
      label: "Precisión",
      value: `${Math.round(accuracy)}%`,
      color:
        accuracy >= 80
          ? "text-green-600"
          : accuracy >= 60
          ? "text-amber-600"
          : "text-red-600",
    },
    {
      icon: "✅",
      label: "Correctas",
      value: `${correctPositions}/${totalPositions}`,
      color: "text-blue-600",
    },
    {
      icon: "🔄",
      label: "Intentos",
      value: attempts,
      color:
        attempts === 1
          ? "text-green-600"
          : attempts <= 2
          ? "text-amber-600"
          : "text-red-600",
    },
    {
      icon: "🏆",
      label: "Puntuación",
      value: score.finalScore,
      color: "text-purple-600",
    },
  ];
};

/**
 * Detectar si dos eventos están muy cerca en el tiempo
 */
export const areEventsClose = (event1, event2, toleranceYears = 50) => {
  return Math.abs(event1.year - event2.year) <= toleranceYears;
};

/**
 * Agrupar eventos por siglo para análisis
 */
export const groupEventsByCentury = (events) => {
  const grouped = {};

  events.forEach((event) => {
    const century = Math.floor(event.year / 100) * 100;
    const centuryLabel = `Siglo ${Math.abs(century / 100) + 1} ${
      century < 0 ? "a.C." : "d.C."
    }`;

    if (!grouped[centuryLabel]) {
      grouped[centuryLabel] = [];
    }

    grouped[centuryLabel].push(event);
  });

  return grouped;
};

/**
 * Obtener dificultad relativa de un conjunto de eventos
 */
export const calculateDifficulty = (events) => {
  if (events.length <= 3) return "easy";
  if (events.length <= 5) return "medium";
  return "hard";
};

/**
 * Formatear duración del juego
 */
export const formatGameDuration = (startTime, endTime) => {
  const duration = endTime - startTime;
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

/**
 * Obtener color de periodo histórico
 */
export const getPeriodColor = (year) => {
  if (year < 476) return "text-purple-600";
  if (year < 1453) return "text-amber-600";
  if (year < 1648) return "text-green-600";
  if (year < 1914) return "text-indigo-600";
  return "text-red-600";
};
