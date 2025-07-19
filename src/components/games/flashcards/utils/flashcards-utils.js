/**
 * Flashcards Utilities
 * Funciones de utilidad para el sistema de flashcards
 * @created 2024-12-19
 */

import { MASTERY_LEVELS, ANSWER_TYPES, SESSION_CONFIG } from '../constants/flashcards-constants.js';
import { getCardMasteryLevel } from './sm2-algorithm.js';

/**
 * Obtiene la configuración visual para el nivel de dominio de una tarjeta
 * @param {Object} card - La tarjeta
 * @returns {Object} Configuración de color y texto
 */
export const getMasteryConfig = (card) => {
  const level = getCardMasteryLevel(card);
  return MASTERY_LEVELS[level];
};

/**
 * Formatea el tiempo de intervalo de una tarjeta de manera legible
 * @param {number} interval - Intervalo en días
 * @returns {string} Texto formateado del intervalo
 */
export const formatInterval = (interval) => {
  if (interval === 0) {
    return 'Nuevo';
  } else if (interval < 1) {
    const minutes = Math.round(interval * 24 * 60);
    return `${minutes}m`;
  } else if (interval === 1) {
    return '1 día';
  } else if (interval < 30) {
    return `${Math.round(interval)} días`;
  } else if (interval < 365) {
    const months = Math.round(interval / 30);
    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  } else {
    const years = Math.round(interval / 365);
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  }
};

/**
 * Calcula la siguiente fecha de revisión en formato legible
 * @param {Date} dueDate - Fecha de vencimiento
 * @returns {string} Texto formateado de la próxima revisión
 */
export const formatNextReview = (dueDate) => {
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days < 0) {
    return 'Vencida';
  } else if (days === 0) {
    return 'Hoy';
  } else if (days === 1) {
    return 'Mañana';
  } else if (days < 7) {
    return `En ${days} días`;
  } else if (days < 30) {
    const weeks = Math.round(days / 7);
    return `En ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
  } else {
    const months = Math.round(days / 30);
    return `En ${months} ${months === 1 ? 'mes' : 'meses'}`;
  }
};

/**
 * Calcula estadísticas de progreso de un mazo
 * @param {Array} cards - Array de tarjetas
 * @returns {Object} Estadísticas de progreso
 */
export const calculateProgress = (cards) => {
  const total = cards.length;
  if (total === 0) return { percentage: 0, masteredCards: 0, totalCards: 0 };
  
  const masteredCards = cards.filter(card => {
    const level = getCardMasteryLevel(card);
    return level === 'MATURE' || level === 'MASTER';
  }).length;
  
  return {
    percentage: Math.round((masteredCards / total) * 100),
    masteredCards,
    totalCards: total,
  };
};

/**
 * Obtiene un mensaje motivacional basado en el rendimiento
 * @param {Object} sessionStats - Estadísticas de la sesión
 * @returns {string} Mensaje motivacional
 */
export const getMotivationalMessage = (sessionStats) => {
  const { correctAnswers, totalAnswers, streakCount } = sessionStats;
  const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
  
  if (streakCount >= 10) {
    return "¡Increíble racha! 🔥 Estás dominando este material.";
  } else if (accuracy >= 90) {
    return "¡Excelente trabajo! 🌟 Tu dominio es impresionante.";
  } else if (accuracy >= 75) {
    return "¡Buen progreso! 👍 Sigues mejorando constantemente.";
  } else if (accuracy >= 50) {
    return "¡Sigue así! 💪 La práctica hace al maestro.";
  } else {
    return "¡No te desanimes! 🌱 Cada error es una oportunidad de aprender.";
  }
};

/**
 * Calcula el tiempo estimado para completar una sesión
 * @param {Array} cards - Tarjetas en la sesión
 * @returns {number} Tiempo estimado en minutos
 */
export const estimateSessionTime = (cards) => {
  // Estimación: 30 segundos por tarjeta nueva, 15 segundos por tarjeta de revisión
  const newCards = cards.filter(card => card.state === 'new').length;
  const reviewCards = cards.length - newCards;
  
  const estimatedSeconds = (newCards * 30) + (reviewCards * 15);
  return Math.round(estimatedSeconds / 60);
};

/**
 * Valida los límites de sesión
 * @param {Object} limits - Límites propuestos
 * @returns {Object} Límites validados
 */
export const validateSessionLimits = (limits) => {
  return {
    newCardsLimit: Math.max(0, Math.min(limits.newCardsLimit || SESSION_CONFIG.DEFAULT_NEW_CARDS_LIMIT, 100)),
    reviewCardsLimit: Math.max(0, Math.min(limits.reviewCardsLimit || SESSION_CONFIG.DEFAULT_REVIEW_CARDS_LIMIT, 500)),
    timeLimit: Math.max(5, Math.min(limits.timeLimit || SESSION_CONFIG.DEFAULT_SESSION_TIME_LIMIT, 120)),
  };
};

/**
 * Barajea un array de tarjetas de manera aleatoria
 * @param {Array} cards - Array de tarjetas
 * @returns {Array} Array barajado
 */
export const shuffleCards = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Genera un reporte de la sesión de estudio
 * @param {Object} sessionData - Datos de la sesión
 * @returns {Object} Reporte de la sesión
 */
export const generateSessionReport = (sessionData) => {
  const { 
    cardsStudied, 
    answers, 
    startTime, 
    endTime,
    initialDeckState,
    finalDeckState 
  } = sessionData;
  
  const studyTime = Math.round((endTime - startTime) / 60000); // minutos
  const totalAnswers = answers.length;
  
  const answerBreakdown = {
    [ANSWER_TYPES.AGAIN]: 0,
    [ANSWER_TYPES.HARD]: 0,
    [ANSWER_TYPES.GOOD]: 0,
    [ANSWER_TYPES.EASY]: 0,
  };
  
  answers.forEach(answer => {
    answerBreakdown[answer.type]++;
  });
  
  const accuracy = totalAnswers > 0 ? 
    ((answerBreakdown[ANSWER_TYPES.GOOD] + answerBreakdown[ANSWER_TYPES.EASY]) / totalAnswers) * 100 : 0;
  
  return {
    cardsStudied: cardsStudied.length,
    studyTime,
    totalAnswers,
    accuracy: Math.round(accuracy),
    answerBreakdown,
    averageTimePerCard: totalAnswers > 0 ? Math.round((studyTime * 60) / totalAnswers) : 0,
    newCardsLearned: cardsStudied.filter(card => 
      initialDeckState.find(c => c.id === card.id)?.state === 'new' && 
      finalDeckState.find(c => c.id === card.id)?.state !== 'new'
    ).length,
  };
};