/**
 * Flashcards Game Index
 * Exports centralizados para el juego de flashcards
 * @created 2024-12-19
 */

// Main component and hook
export { default as FlashcardsGame } from './FlashcardsGame.js';
export { useFlashcardsGame } from './useFlashcardsGame.js';

// Modular components (for advanced usage)
export {
  DeckSelection,
  CardDisplay,
  SessionComplete,
} from './components/index.js';

// Constants and data
export {
  SM2_CONFIG,
  CARD_STATES,
  ANSWER_TYPES,
  ANSWER_BUTTONS,
  FLASHCARD_GAME_STATES,
  SESSION_CONFIG,
  MASTERY_LEVELS,
} from './constants/flashcards-constants.js';

export {
  SAMPLE_DECKS,
  SAMPLE_USER_STATS,
} from './constants/flashcards-data.js';

// Utilities
export {
  calculateNextReview,
  createStudySession,
  calculateDeckStats,
  isCardDue,
  getDueCards,
  getNewCards,
  getLearningCards,
  getCardMasteryLevel,
} from './utils/sm2-algorithm.js';

export {
  getMasteryConfig,
  formatInterval,
  formatNextReview,
  calculateProgress,
  getMotivationalMessage,
  estimateSessionTime,
  validateSessionLimits,
  shuffleCards,
  generateSessionReport,
} from './utils/flashcards-utils.js';