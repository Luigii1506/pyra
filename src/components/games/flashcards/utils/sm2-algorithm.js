/**
 * SM-2 Algorithm Implementation
 * Implementación del algoritmo de repetición espaciada basado en SuperMemo-2 (Anki)
 * @created 2024-12-19
 */

import { 
  SM2_CONFIG, 
  CARD_STATES, 
  ANSWER_TYPES 
} from '../constants/flashcards-constants.js';

/**
 * Calcula el siguiente intervalo y factor de facilidad basado en la respuesta del usuario
 * @param {Object} card - La tarjeta actual
 * @param {string} answerType - Tipo de respuesta (again, hard, good, easy)
 * @returns {Object} Nueva configuración de la tarjeta
 */
export const calculateNextReview = (card, answerType) => {
  const newCard = { ...card };
  const now = new Date();

  // Incrementar el número de revisiones
  newCard.reviews = card.reviews + 1;

  switch (answerType) {
    case ANSWER_TYPES.AGAIN:
      return handleAgainAnswer(newCard, now);
    
    case ANSWER_TYPES.HARD:
      return handleHardAnswer(newCard, now);
    
    case ANSWER_TYPES.GOOD:
      return handleGoodAnswer(newCard, now);
    
    case ANSWER_TYPES.EASY:
      return handleEasyAnswer(newCard, now);
    
    default:
      throw new Error(`Tipo de respuesta no válido: ${answerType}`);
  }
};

/**
 * Maneja la respuesta "Otra vez" (Again)
 */
const handleAgainAnswer = (card, now) => {
  const newCard = { ...card };
  
  // Incrementar contador de errores
  newCard.lapses = card.lapses + 1;
  
  // Reducir factor de facilidad
  newCard.easeFactor = Math.max(
    SM2_CONFIG.MIN_EASE_FACTOR,
    card.easeFactor - SM2_CONFIG.AGAIN_PENALTY
  );
  
  // Reiniciar a estado de reaprendizaje
  if (card.state === CARD_STATES.REVIEW) {
    newCard.state = CARD_STATES.RELEARNING;
    newCard.step = 0;
    newCard.interval = 0;
    newCard.dueDate = new Date(now.getTime() + SM2_CONFIG.RELEARN_STEPS[0] * 60000);
  } else {
    // Si está en aprendizaje, volver al primer paso
    newCard.step = 0;
    newCard.interval = 0;
    newCard.dueDate = new Date(now.getTime() + SM2_CONFIG.NEW_CARD_STEPS[0] * 60000);
  }
  
  return newCard;
};

/**
 * Maneja la respuesta "Difícil" (Hard)
 */
const handleHardAnswer = (card, now) => {
  const newCard = { ...card };
  
  // Reducir ligeramente el factor de facilidad
  newCard.easeFactor = Math.max(
    SM2_CONFIG.MIN_EASE_FACTOR,
    card.easeFactor - SM2_CONFIG.HARD_PENALTY
  );
  
  if (card.state === CARD_STATES.NEW || card.state === CARD_STATES.LEARNING) {
    return advanceInLearning(newCard, now);
  } else {
    // Para tarjetas en revisión, usar un multiplicador menor
    const newInterval = Math.max(1, Math.round(card.interval * SM2_CONFIG.HARD_MULTIPLIER));
    newCard.interval = Math.min(newInterval, SM2_CONFIG.MAX_INTERVAL);
    newCard.dueDate = new Date(now.getTime() + newCard.interval * 24 * 60 * 60 * 1000);
    return newCard;
  }
};

/**
 * Maneja la respuesta "Bien" (Good)
 */
const handleGoodAnswer = (card, now) => {
  const newCard = { ...card };
  
  // El factor de facilidad se mantiene igual
  
  if (card.state === CARD_STATES.NEW || card.state === CARD_STATES.LEARNING) {
    return advanceInLearning(newCard, now);
  } else {
    // Para tarjetas en revisión, usar el factor de facilidad normal
    const newInterval = Math.round(card.interval * card.easeFactor);
    newCard.interval = Math.min(newInterval, SM2_CONFIG.MAX_INTERVAL);
    newCard.dueDate = new Date(now.getTime() + newCard.interval * 24 * 60 * 60 * 1000);
    return newCard;
  }
};

/**
 * Maneja la respuesta "Fácil" (Easy)
 */const handleEasyAnswer = (card, now) => {
  const newCard = { ...card };
  
  // Aumentar el factor de facilidad
  newCard.easeFactor = card.easeFactor + SM2_CONFIG.EASY_BONUS;
  
  if (card.state === CARD_STATES.NEW) {
    // Para tarjetas nuevas, saltar directamente a revisión con intervalo fácil
    newCard.state = CARD_STATES.REVIEW;
    newCard.interval = SM2_CONFIG.EASY_INTERVAL;
    newCard.step = 0;
    newCard.dueDate = new Date(now.getTime() + newCard.interval * 24 * 60 * 60 * 1000);
  } else if (card.state === CARD_STATES.LEARNING || card.state === CARD_STATES.RELEARNING) {
    // Avanzar a revisión con intervalo fácil
    newCard.state = CARD_STATES.REVIEW;
    newCard.interval = SM2_CONFIG.EASY_INTERVAL;
    newCard.step = 0;
    newCard.dueDate = new Date(now.getTime() + newCard.interval * 24 * 60 * 60 * 1000);
  } else {
    // Para tarjetas en revisión, usar multiplicador fácil
    const newInterval = Math.round(card.interval * card.easeFactor * SM2_CONFIG.EASY_MULTIPLIER);
    newCard.interval = Math.min(newInterval, SM2_CONFIG.MAX_INTERVAL);
    newCard.dueDate = new Date(now.getTime() + newCard.interval * 24 * 60 * 60 * 1000);
  }
  
  return newCard;
};

/**
 * Avanza una tarjeta en el proceso de aprendizaje
 */
const advanceInLearning = (card, now) => {
  const newCard = { ...card };
  const steps = card.state === CARD_STATES.RELEARNING ? 
    SM2_CONFIG.RELEARN_STEPS : SM2_CONFIG.NEW_CARD_STEPS;
  
  if (card.step < steps.length - 1) {
    // Avanzar al siguiente paso de aprendizaje
    newCard.step = card.step + 1;
    newCard.interval = 0;
    newCard.dueDate = new Date(now.getTime() + steps[newCard.step] * 60000);
  } else {
    // Graduarse a revisión
    newCard.state = CARD_STATES.REVIEW;
    newCard.interval = SM2_CONFIG.GRADUATING_INTERVAL;
    newCard.step = 0;
    newCard.dueDate = new Date(now.getTime() + newCard.interval * 24 * 60 * 60 * 1000);
  }
  
  return newCard;
};

/**
 * Determina si una tarjeta está lista para revisión
 * @param {Object} card - La tarjeta a verificar
 * @returns {boolean} True si la tarjeta está lista para revisión
 */
export const isCardDue = (card) => {
  const now = new Date();
  return card.dueDate <= now;
};

/**
 * Filtra las tarjetas que están listas para revisión
 * @param {Array} cards - Array de tarjetas
 * @returns {Array} Tarjetas listas para revisión
 */
export const getDueCards = (cards) => {
  return cards.filter(isCardDue);
};

/**
 * Obtiene las tarjetas nuevas (no estudiadas)
 * @param {Array} cards - Array de tarjetas
 * @returns {Array} Tarjetas nuevas
 */
export const getNewCards = (cards) => {
  return cards.filter(card => card.state === CARD_STATES.NEW);
};

/**
 * Obtiene las tarjetas en proceso de aprendizaje
 * @param {Array} cards - Array de tarjetas
 * @returns {Array} Tarjetas en aprendizaje
 */
export const getLearningCards = (cards) => {
  return cards.filter(card => 
    card.state === CARD_STATES.LEARNING || card.state === CARD_STATES.RELEARNING
  );
};

/**
 * Calcula estadísticas del mazo
 * @param {Array} cards - Array de tarjetas
 * @returns {Object} Estadísticas del mazo
 */
export const calculateDeckStats = (cards) => {
  const newCards = getNewCards(cards);
  const learningCards = getLearningCards(cards);
  const dueCards = getDueCards(cards);
  const reviewCards = cards.filter(card => card.state === CARD_STATES.REVIEW);
  
  return {
    total: cards.length,
    new: newCards.length,
    learning: learningCards.length,
    due: dueCards.length,
    review: reviewCards.length,
  };
};

/**
 * Determina el nivel de dominio de una tarjeta para mostrar visualmente
 * @param {Object} card - La tarjeta
 * @returns {string} Nivel de dominio
 */
export const getCardMasteryLevel = (card) => {
  if (card.state === CARD_STATES.NEW) {
    return 'NEW';
  }
  
  if (card.state === CARD_STATES.LEARNING || card.state === CARD_STATES.RELEARNING) {
    return 'LEARNING';
  }
  
  // Para tarjetas en revisión, basarse en el intervalo
  if (card.interval <= 21) {
    return 'YOUNG'; // Menos de 3 semanas
  } else if (card.interval <= 90) {
    return 'MATURE'; // Menos de 3 meses
  } else {
    return 'MASTER'; // Más de 3 meses
  }
};

/**
 * Crea una sesión de estudio basada en límites configurados
 * @param {Array} cards - Array de todas las tarjetas
 * @param {Object} limits - Límites de la sesión
 * @returns {Array} Tarjetas para la sesión de estudio
 */
export const createStudySession = (cards, limits = {}) => {
  const {
    newCardsLimit = SM2_CONFIG.DEFAULT_NEW_CARDS_LIMIT,
    reviewCardsLimit = SM2_CONFIG.DEFAULT_REVIEW_CARDS_LIMIT,
  } = limits;
  
  const dueCards = getDueCards(cards);
  const newCards = getNewCards(cards);
  const learningCards = getLearningCards(cards);
  
  // Priorizar tarjetas en aprendizaje y vencidas
  const sessionCards = [
    ...learningCards.filter(isCardDue),
    ...dueCards.filter(card => card.state === CARD_STATES.REVIEW).slice(0, reviewCardsLimit),
    ...newCards.slice(0, newCardsLimit),
  ];
  
  return sessionCards;
};