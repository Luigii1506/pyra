/**
 * Matching Game Index
 * Exports centralizados para el juego de emparejamiento
 * @created 2024-12-19
 */

// Main component and hook
export { default as MatchingGame } from './MatchingGame.js';
export { useMatchingGame } from './useMatchingGame.js';

// Modular components (for advanced usage)
export {
  MatchingGameSetup,
  MatchingGamePlay,
  MatchingGameResults,
} from './components/index.js';

// Constants and data
export {
  MATCHING_GAME_STATES,
  MATCHING_TYPES,
  MATCHING_TYPE_CONFIG,
  DIFFICULTY_LEVELS,
  SCORING_CONFIG,
  CARD_STATES,
  CARD_STYLES,
  FEEDBACK_CONFIG,
  FEEDBACK_MESSAGES,
} from './constants/matching-constants.js';

export {
  ALL_MATCHING_PAIRS,
  SAMPLE_PAIRS,
  PERSON_DESCRIPTION_PAIRS,
  PERSON_ARTIFACT_PAIRS,
  PERSON_PERSON_PAIRS,
  PLACE_DESCRIPTION_PAIRS,
  PLACE_EVENT_PAIRS,
  RELIGION_DESCRIPTION_PAIRS,
  DEITY_ATTRIBUTE_PAIRS,
  TERM_DEFINITION_PAIRS,
  DATE_EVENT_PAIRS,
} from './constants/matching-data.js';

// Utilities
export {
  shuffleArray,
  selectPairsForDifficulty,
  convertPairsToItems,
  areItemsMatched,
  calculateMatchScore,
  calculateFinalScore,
  getFeedbackMessage,
  selectHint,
  formatTime,
  getPerformanceStats,
  getPerformanceLevel,
  getMatchingTypeInfo,
  validateGameConfig,
} from './utils/matching-utils.js';