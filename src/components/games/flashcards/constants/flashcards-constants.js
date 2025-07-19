/**
 * Flashcards Game Constants
 * Configuración del sistema de repetición espaciada basado en algoritmo SM-2 (Anki)
 * @created 2024-12-19
 */

// Configuración del algoritmo SM-2
export const SM2_CONFIG = {
  // Factor de facilidad inicial para nuevas tarjetas
  DEFAULT_EASE_FACTOR: 2.5,
  
  // Factor de facilidad mínimo permitido
  MIN_EASE_FACTOR: 1.3,
  
  // Intervalos iniciales para tarjetas nuevas (en minutos)
  NEW_CARD_STEPS: [1, 10],
  
  // Intervalo para tarjetas que vuelven a reaprendizaje (en minutos)
  RELEARN_STEPS: [10],
  
  // Intervalo de graduación mínimo (días)
  GRADUATING_INTERVAL: 1,
  
  // Intervalo fácil (días)
  EASY_INTERVAL: 4,
  
  // Multiplicador de intervalo para respuesta "Fácil"
  EASY_MULTIPLIER: 1.3,
  
  // Multiplicador de intervalo para respuesta "Difícil"
  HARD_MULTIPLIER: 1.2,
  
  // Penalización para respuesta "Otra vez" (reducción de ease factor)
  AGAIN_PENALTY: 0.2,
  
  // Penalización para respuesta "Difícil" (reducción de ease factor)
  HARD_PENALTY: 0.15,
  
  // Bonificación para respuesta "Fácil" (aumento de ease factor)
  EASY_BONUS: 0.15,
  
  // Límite máximo de intervalos (días)
  MAX_INTERVAL: 36500, // ~100 años
};

// Estados de las tarjetas
export const CARD_STATES = {
  NEW: 'new',
  LEARNING: 'learning',
  REVIEW: 'review',
  RELEARNING: 'relearning',
};

// Tipos de respuesta (botones de dificultad)
export const ANSWER_TYPES = {
  AGAIN: 'again',    // Otra vez
  HARD: 'hard',      // Difícil
  GOOD: 'good',      // Bien
  EASY: 'easy',      // Fácil
};

// Configuración de los botones de respuesta
export const ANSWER_BUTTONS = {
  [ANSWER_TYPES.AGAIN]: {
    label: 'Otra vez',
    color: 'bg-red-600 hover:bg-red-700',
    description: 'Me equivoqué o no pude recordar',
    icon: '↻',
  },
  [ANSWER_TYPES.HARD]: {
    label: 'Difícil',
    color: 'bg-orange-600 hover:bg-orange-700',
    description: 'Acerté pero me costó mucho',
    icon: '◐',
  },
  [ANSWER_TYPES.GOOD]: {
    label: 'Bien',
    color: 'bg-green-600 hover:bg-green-700',
    description: 'Acerté con esfuerzo moderado',
    icon: '◕',
  },
  [ANSWER_TYPES.EASY]: {
    label: 'Fácil',
    color: 'bg-blue-600 hover:bg-blue-700',
    description: 'Lo recordé instantáneamente',
    icon: '●',
  },
};

// Estados del juego de flashcards
export const FLASHCARD_GAME_STATES = {
  DECK_SELECTION: 'deck_selection',
  CARD_FRONT: 'card_front',
  CARD_BACK: 'card_back',
  SESSION_COMPLETE: 'session_complete',
};

// Configuración de sesión de estudio
export const SESSION_CONFIG = {
  DEFAULT_NEW_CARDS_LIMIT: 20,
  DEFAULT_REVIEW_CARDS_LIMIT: 100,
  DEFAULT_SESSION_TIME_LIMIT: 30, // minutos
};

// Niveles de dominio visual
export const MASTERY_LEVELS = {
  NEW: {
    label: 'Nueva',
    color: 'bg-gray-500',
    textColor: 'text-gray-800',
    bgColor: 'bg-gray-100',
  },
  LEARNING: {
    label: 'Aprendiendo',
    color: 'bg-orange-500',
    textColor: 'text-orange-800',
    bgColor: 'bg-orange-100',
  },
  YOUNG: {
    label: 'Reciente',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-800',
    bgColor: 'bg-yellow-100',
  },
  MATURE: {
    label: 'Dominada',
    color: 'bg-green-500',
    textColor: 'text-green-800',
    bgColor: 'bg-green-100',
  },
  MASTER: {
    label: 'Maestría',
    color: 'bg-blue-500',
    textColor: 'text-blue-800',
    bgColor: 'bg-blue-100',
  },
};