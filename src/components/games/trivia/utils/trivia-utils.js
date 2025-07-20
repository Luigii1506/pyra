/**
 * Trivia Game Utilities
 * Funciones auxiliares para el juego de trivia histórica contrarreloj
 * @created 2024-12-19
 */

import {
  DIFFICULTY_CONFIG,
  SCORING_CONFIG,
  ANSWER_STATES,
  PERFORMANCE_MESSAGES,
  STATS_CONFIG,
  TIME_CONFIG,
  TRIVIA_CATEGORIES,
} from "../constants/trivia-constants.js";
import { ALL_QUESTIONS_BY_CATEGORY } from "../constants/trivia-data.js";

// ==================== UTILIDADES DE PUNTUACIÓN ====================

/**
 * Calcula la puntuación de una respuesta individual
 * @param {Object} params - Parámetros de la respuesta
 * @param {boolean} params.isCorrect - Si la respuesta es correcta
 * @param {string} params.difficulty - Dificultad de la pregunta
 * @param {number} params.timeSpent - Tiempo gastado en segundos
 * @param {number} params.timeLimit - Límite de tiempo total
 * @param {number} params.currentStreak - Racha actual
 * @param {boolean} params.isSkipped - Si la pregunta fue saltada
 * @returns {Object} Objeto con puntos ganados y detalles
 */
export const calculateQuestionScore = ({
  isCorrect,
  difficulty,
  timeSpent,
  timeLimit,
  currentStreak = 0,
  isSkipped = false,
}) => {
  if (isSkipped) {
    return {
      points: SCORING_CONFIG.SKIP_QUESTION_PENALTY,
      breakdown: {
        basePoints: 0,
        timeBonus: 0,
        streakBonus: 0,
        penalty: SCORING_CONFIG.SKIP_QUESTION_PENALTY,
      },
    };
  }

  if (!isCorrect) {
    return {
      points: SCORING_CONFIG.WRONG_ANSWER_PENALTY,
      breakdown: {
        basePoints: 0,
        timeBonus: 0,
        streakBonus: 0,
        penalty: SCORING_CONFIG.WRONG_ANSWER_PENALTY,
      },
    };
  }

  // Puntos base según dificultad
  const difficultyConfig = DIFFICULTY_CONFIG[difficulty];
  const basePoints = difficultyConfig?.pointsBase || SCORING_CONFIG.BASE_POINTS;

  // Bonus por tiempo - más puntos por responder rápido
  const timeRemaining = Math.max(0, timeLimit - timeSpent);
  const timeBonusMultiplier =
    difficultyConfig?.pointsTimeBonus || SCORING_CONFIG.TIME_BONUS_MULTIPLIER;
  const timeBonus = Math.floor(timeRemaining * timeBonusMultiplier);

  // Bonus por racha
  let streakMultiplier = 1;
  for (const [threshold, multiplier] of Object.entries(
    SCORING_CONFIG.STREAK_THRESHOLDS
  )) {
    if (currentStreak >= parseInt(threshold)) {
      streakMultiplier = multiplier;
    }
  }
  const streakBonus = Math.floor(basePoints * (streakMultiplier - 1));

  const totalPoints = basePoints + timeBonus + streakBonus;

  return {
    points: totalPoints,
    breakdown: {
      basePoints,
      timeBonus,
      streakBonus,
      penalty: 0,
      streakMultiplier,
    },
  };
};

/**
 * Calcula la puntuación final del juego
 * @param {Array} answers - Array de respuestas del jugador
 * @param {number} totalQuestions - Total de preguntas en el juego
 * @param {boolean} isPerfectGame - Si el juego fue perfecto (sin errores)
 * @returns {Object} Puntuación final y detalles
 */
export const calculateFinalScore = (
  answers,
  totalQuestions,
  isPerfectGame = false
) => {
  let totalPoints = 0;
  let totalBasePoints = 0;
  let totalTimeBonus = 0;
  let totalStreakBonus = 0;
  let totalPenalties = 0;

  // Sumar puntos de todas las respuestas
  answers.forEach((answer) => {
    if (answer.scoreBreakdown) {
      totalPoints += answer.scoreBreakdown.points;
      totalBasePoints += answer.scoreBreakdown.breakdown.basePoints;
      totalTimeBonus += answer.scoreBreakdown.breakdown.timeBonus;
      totalStreakBonus += answer.scoreBreakdown.breakdown.streakBonus;
      totalPenalties += Math.abs(answer.scoreBreakdown.breakdown.penalty);
    }
  });

  // Bonus por completar todas las preguntas
  const completionBonus =
    answers.length === totalQuestions ? SCORING_CONFIG.COMPLETION_BONUS : 0;

  // Bonus perfecto
  const perfectBonus = isPerfectGame ? SCORING_CONFIG.PERFECT_BONUS : 0;

  const finalScore = totalPoints + completionBonus + perfectBonus;

  return {
    finalScore,
    breakdown: {
      basePoints: totalBasePoints,
      timeBonus: totalTimeBonus,
      streakBonus: totalStreakBonus,
      completionBonus,
      perfectBonus,
      penalties: totalPenalties,
    },
  };
};

// ==================== UTILIDADES DE TIEMPO ====================

/**
 * Formatea el tiempo en formato MM:SS
 * @param {number} seconds - Segundos a formatear
 * @returns {string} Tiempo formateado
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Obtiene el estado del tiempo (normal, warning, critical)
 * @param {number} timeLeft - Tiempo restante en segundos
 * @returns {string} Estado del tiempo
 */
export const getTimeState = (timeLeft) => {
  if (timeLeft <= TIME_CONFIG.CRITICAL_THRESHOLD) return "critical";
  if (timeLeft <= TIME_CONFIG.WARNING_THRESHOLD) return "warning";
  return "normal";
};

/**
 * Calcula el tiempo promedio por pregunta
 * @param {Array} answers - Array de respuestas
 * @returns {number} Tiempo promedio en segundos
 */
export const calculateAverageTimePerQuestion = (answers) => {
  if (answers.length === 0) return 0;
  const totalTime = answers.reduce(
    (sum, answer) => sum + (answer.timeSpent || 0),
    0
  );
  return totalTime / answers.length;
};

// ==================== UTILIDADES DE ESTADÍSTICAS ====================

/**
 * Calcula estadísticas detalladas del juego
 * @param {Array} answers - Array de respuestas del jugador
 * @param {number} totalTime - Tiempo total usado
 * @param {number} totalQuestions - Total de preguntas disponibles
 * @returns {Object} Estadísticas completas
 */
export const calculateGameStats = (answers, totalTime, totalQuestions) => {
  const correctAnswers = answers.filter(
    (a) => a.isCorrect && !a.skipped
  ).length;
  const incorrectAnswers = answers.filter(
    (a) => !a.isCorrect && !a.skipped
  ).length;
  const skippedQuestions = answers.filter((a) => a.skipped).length;
  const answeredQuestions = answers.length;

  const accuracy =
    answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;
  const averageTime = calculateAverageTimePerQuestion(answers);

  const bestStreak = answers.reduce((maxStreak, answer, index) => {
    let currentStreak = 0;
    for (
      let i = index;
      i < answers.length && answers[i].isCorrect && !answers[i].skipped;
      i++
    ) {
      currentStreak++;
    }
    return Math.max(maxStreak, currentStreak);
  }, 0);

  return {
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    incorrectAnswers,
    skippedQuestions,
    accuracy: Math.round(accuracy * 100) / 100,
    averageTimePerQuestion: Math.round(averageTime * 100) / 100,
    totalTimeUsed: totalTime,
    bestStreak,
    questionsPerMinute:
      totalTime > 0
        ? Math.round((answeredQuestions / (totalTime / 60)) * 100) / 100
        : 0,
  };
};

/**
 * Obtiene el nivel de rendimiento basado en la precisión
 * @param {number} accuracy - Precisión en porcentaje
 * @returns {string} Nivel de rendimiento
 */
export const getAccuracyLevel = (accuracy) => {
  if (accuracy >= STATS_CONFIG.ACCURACY_THRESHOLDS.EXCELLENT)
    return "EXCELLENT";
  if (accuracy >= STATS_CONFIG.ACCURACY_THRESHOLDS.GOOD) return "GOOD";
  if (accuracy >= STATS_CONFIG.ACCURACY_THRESHOLDS.AVERAGE) return "AVERAGE";
  return "POOR";
};

/**
 * Obtiene el nivel de velocidad basado en el tiempo promedio
 * @param {number} averageTime - Tiempo promedio por pregunta
 * @returns {string} Nivel de velocidad
 */
export const getSpeedLevel = (averageTime) => {
  if (averageTime <= STATS_CONFIG.SPEED_THRESHOLDS.VERY_FAST)
    return "VERY_FAST";
  if (averageTime <= STATS_CONFIG.SPEED_THRESHOLDS.FAST) return "FAST";
  if (averageTime <= STATS_CONFIG.SPEED_THRESHOLDS.AVERAGE) return "AVERAGE";
  return "SLOW";
};

/**
 * Obtiene el mensaje de rendimiento general
 * @param {Object} stats - Estadísticas del juego
 * @returns {Object} Mensaje de rendimiento
 */
export const getPerformanceMessage = (stats) => {
  const { accuracy, correctAnswers, answeredQuestions } = stats;

  // Juego perfecto
  if (accuracy === 100 && answeredQuestions > 0) {
    return PERFORMANCE_MESSAGES.PERFECT;
  }

  // Clasificación por precisión
  if (accuracy >= 85) return PERFORMANCE_MESSAGES.EXCELLENT;
  if (accuracy >= 70) return PERFORMANCE_MESSAGES.GOOD;
  if (accuracy >= 50) return PERFORMANCE_MESSAGES.NEEDS_IMPROVEMENT;

  return PERFORMANCE_MESSAGES.POOR;
};

// ==================== UTILIDADES DE VALIDACIÓN ====================

/**
 * Valida la configuración del juego
 * @param {Object} config - Configuración del juego
 * @returns {Object} Resultado de validación
 */
export const validateGameConfig = (config) => {
  const errors = [];

  if (!config.questions || !Array.isArray(config.questions)) {
    errors.push("Las preguntas deben ser un array válido");
  }

  if (config.questions && config.questions.length === 0) {
    errors.push("Debe haber al menos una pregunta");
  }

  if (config.timeLimit && (config.timeLimit < 10 || config.timeLimit > 600)) {
    errors.push("El límite de tiempo debe estar entre 10 y 600 segundos");
  }

  if (
    config.category &&
    !Object.values(TRIVIA_CATEGORIES).includes(config.category)
  ) {
    errors.push("Categoría no válida");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valida una respuesta de pregunta
 * @param {number} answerIndex - Índice de la respuesta seleccionada
 * @param {Object} question - Objeto de pregunta
 * @returns {boolean} Si la respuesta es válida
 */
export const validateAnswer = (answerIndex, question) => {
  if (!question || !question.options) return false;
  return answerIndex >= 0 && answerIndex < question.options.length;
};

// ==================== UTILIDADES DE MANIPULACIÓN DE DATOS ====================

/**
 * Mezcla un array aleatoriamente (Fisher-Yates shuffle)
 * @param {Array} array - Array a mezclar
 * @returns {Array} Array mezclado
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
 * Selecciona preguntas aleatorias de una categoría y dificultad específica
 * @param {string} category - Categoría de preguntas
 * @param {string} difficulty - Dificultad
 * @param {number} count - Número de preguntas a seleccionar
 * @returns {Array} Array de preguntas seleccionadas
 */
export const selectQuestionsByCategory = (category, difficulty, count) => {
  const categoryQuestions = ALL_QUESTIONS_BY_CATEGORY[category];
  if (!categoryQuestions || !categoryQuestions[difficulty]) {
    return [];
  }

  const questions = categoryQuestions[difficulty];
  return shuffleArray(questions).slice(0, Math.min(count, questions.length));
};

/**
 * Mezcla las opciones de una pregunta manteniendo el índice correcto
 * @param {Object} question - Pregunta original
 * @returns {Object} Pregunta con opciones mezcladas
 */
export const shuffleQuestionOptions = (question) => {
  const correctAnswer = question.options[question.correct];
  const shuffledOptions = shuffleArray(question.options);
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

  return {
    ...question,
    options: shuffledOptions,
    correct: newCorrectIndex,
  };
};

// ==================== UTILIDADES DE EXPORTACIÓN ====================

/**
 * Convierte las estadísticas del juego a formato exportable
 * @param {Object} gameData - Datos completos del juego
 * @param {string} format - Formato de exportación ('JSON' o 'CSV')
 * @returns {string} Datos formateados para exportación
 */
export const exportGameData = (gameData, format = "JSON") => {
  const { stats, answers, config } = gameData;

  const exportData = {
    gameConfig: {
      category: config.category,
      difficulty: config.difficulty,
      timeLimit: config.timeLimit,
      questionCount: config.questions?.length,
    },
    summary: {
      finalScore: stats.finalScore,
      accuracy: stats.accuracy,
      totalTime: stats.totalTimeUsed,
      bestStreak: stats.bestStreak,
      questionsPerMinute: stats.questionsPerMinute,
    },
    detailedAnswers: answers.map((answer, index) => ({
      questionNumber: index + 1,
      question: answer.question?.question,
      selectedAnswer:
        answer.selectedAnswer !== null
          ? answer.question?.options[answer.selectedAnswer]
          : "Saltada",
      correctAnswer: answer.question?.options[answer.correctAnswer],
      isCorrect: answer.isCorrect,
      timeSpent: answer.timeSpent,
      points: answer.scoreBreakdown?.points || 0,
    })),
    timestamp: new Date().toISOString(),
  };

  if (format === "CSV") {
    // Convertir a CSV simple
    const headers =
      "Pregunta,Respuesta Dada,Respuesta Correcta,Correcto,Tiempo,Puntos\n";
    const rows = exportData.detailedAnswers
      .map(
        (answer) =>
          `"${answer.question}","${answer.selectedAnswer}","${answer.correctAnswer}",${answer.isCorrect},${answer.timeSpent},${answer.points}`
      )
      .join("\n");

    return headers + rows;
  }

  return JSON.stringify(exportData, null, 2);
};

// ==================== UTILIDADES DE INTERFAZ ====================

/**
 * Obtiene la clase CSS para el estado de la respuesta
 * @param {string} state - Estado de la respuesta (ANSWER_STATES)
 * @returns {string} Clases CSS
 */
export const getAnswerStateClasses = (state) => {
  const stateConfig = {
    [ANSWER_STATES.CORRECT]: "bg-green-100 border-green-300 text-green-800",
    [ANSWER_STATES.INCORRECT]: "bg-red-100 border-red-300 text-red-800",
    [ANSWER_STATES.SKIPPED]: "bg-yellow-100 border-yellow-300 text-yellow-800",
    [ANSWER_STATES.TIME_OUT]: "bg-gray-100 border-gray-300 text-gray-800",
    [ANSWER_STATES.UNANSWERED]: "bg-white border-gray-200 text-gray-600",
  };

  return stateConfig[state] || stateConfig[ANSWER_STATES.UNANSWERED];
};

/**
 * Obtiene las clases CSS para el estado del tiempo
 * @param {string} timeState - Estado del tiempo ('normal', 'warning', 'critical')
 * @returns {string} Clases CSS
 */
export const getTimeStateClasses = (timeState) => {
  const stateClasses = {
    normal: "text-blue-600",
    warning: "text-orange-600 animate-pulse",
    critical: "text-red-600 animate-bounce",
  };

  return stateClasses[timeState] || stateClasses.normal;
};

/**
 * Genera un resumen textual del rendimiento
 * @param {Object} stats - Estadísticas del juego
 * @returns {string} Resumen textual
 */
export const generatePerformanceSummary = (stats) => {
  const accuracyLevel = getAccuracyLevel(stats.accuracy);
  const speedLevel = getSpeedLevel(stats.averageTimePerQuestion);

  let summary = `Respondiste ${stats.correctAnswers} de ${stats.answeredQuestions} preguntas correctamente `;
  summary += `con una precisión del ${stats.accuracy}%. `;

  if (stats.bestStreak > 1) {
    summary += `Tu mejor racha fue de ${stats.bestStreak} respuestas consecutivas. `;
  }

  summary += `Promedio de ${stats.averageTimePerQuestion.toFixed(
    1
  )} segundos por pregunta. `;

  // Añadir comentario sobre el rendimiento
  switch (accuracyLevel) {
    case "EXCELLENT":
      summary += "¡Excelente dominio del tema!";
      break;
    case "GOOD":
      summary += "¡Buen trabajo en general!";
      break;
    case "AVERAGE":
      summary += "Rendimiento decente, hay margen de mejora.";
      break;
    default:
      summary += "Sigue practicando para mejorar.";
  }

  return summary;
};

// ==================== UTILIDADES DE LOGROS ====================

/**
 * Verifica qué logros ha conseguido el jugador
 * @param {Object} stats - Estadísticas del juego
 * @returns {Array} Array de logros conseguidos
 */
export const checkAchievements = (stats) => {
  const achievements = [];

  // Logros de precisión
  if (stats.accuracy === 100 && stats.answeredQuestions >= 5) {
    achievements.push({
      id: "perfect_game",
      title: "🏆 Juego Perfecto",
      description: "Respondiste todas las preguntas correctamente",
      rarity: "legendary",
    });
  }

  if (stats.accuracy >= 90 && stats.answeredQuestions >= 10) {
    achievements.push({
      id: "high_accuracy",
      title: "🎯 Precisión Magistral",
      description: "Más del 90% de precisión",
      rarity: "epic",
    });
  }

  // Logros de racha
  if (stats.bestStreak >= STATS_CONFIG.STREAK_ACHIEVEMENTS.STREAK_GOD) {
    achievements.push({
      id: "streak_god",
      title: "⚡ Dios de las Rachas",
      description: `${stats.bestStreak} respuestas consecutivas correctas`,
      rarity: "legendary",
    });
  } else if (
    stats.bestStreak >= STATS_CONFIG.STREAK_ACHIEVEMENTS.STREAK_LEGEND
  ) {
    achievements.push({
      id: "streak_legend",
      title: "🔥 Leyenda de Rachas",
      description: `${stats.bestStreak} respuestas consecutivas correctas`,
      rarity: "epic",
    });
  } else if (
    stats.bestStreak >= STATS_CONFIG.STREAK_ACHIEVEMENTS.STREAK_MASTER
  ) {
    achievements.push({
      id: "streak_master",
      title: "💥 Maestro de Rachas",
      description: `${stats.bestStreak} respuestas consecutivas correctas`,
      rarity: "rare",
    });
  }

  // Logros de velocidad
  if (stats.averageTimePerQuestion <= 5 && stats.answeredQuestions >= 10) {
    achievements.push({
      id: "speed_demon",
      title: "💨 Demonio de la Velocidad",
      description: "Promedio de 5 segundos o menos por pregunta",
      rarity: "epic",
    });
  }

  // Logros de cantidad
  if (stats.answeredQuestions >= 50) {
    achievements.push({
      id: "marathon_runner",
      title: "🏃 Maratonista Mental",
      description: "Respondiste 50 o más preguntas",
      rarity: "rare",
    });
  }

  return achievements;
};

export default {
  calculateQuestionScore,
  calculateFinalScore,
  formatTime,
  getTimeState,
  calculateGameStats,
  getPerformanceMessage,
  validateGameConfig,
  validateAnswer,
  shuffleArray,
  selectQuestionsByCategory,
  shuffleQuestionOptions,
  exportGameData,
  getAnswerStateClasses,
  getTimeStateClasses,
  generatePerformanceSummary,
  checkAchievements,
};
