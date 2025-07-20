/**
 * Timeline Game Module - Centralized Exports
 * Exportaciones centralizadas para el juego de línea de tiempo
 * @created 2024-12-19
 */

// Componente principal
export { default as TimelineGame } from "./TimelineGame.js";

// Hook personalizado
export { default as useTimelineGame } from "./useTimelineGame.js";

// Componentes modulares
export { TimelineGamePlay, TimelineGameResults } from "./components/index.js";

// Constantes
export {
  TIMELINE_GAME_STATES,
  GAME_CONFIG,
  DIFFICULTY_LEVELS,
  DIFFICULTY_CONFIG,
  HISTORICAL_PERIODS,
  PERIOD_CONFIG,
  VERIFICATION_STATES,
  FEEDBACK_MESSAGES,
  ANIMATION_CONFIG,
  CARD_STATE_STYLES,
  DEFAULT_GAME_CONFIG,
} from "./constants/timeline-constants.js";

// Datos
export {
  ANCIENT_EVENTS,
  MEDIEVAL_EVENTS,
  RENAISSANCE_EVENTS,
  MODERN_EVENTS,
  CONTEMPORARY_EVENTS,
  EVENTS_BY_PERIOD,
  ALL_TIMELINE_EVENTS,
  DEFAULT_TIMELINE_EVENTS,
  getRandomEvents,
  getEventsByPeriod,
  getBalancedEvents,
} from "./constants/timeline-data.js";

// Utilidades
export {
  shuffleArray,
  formatYear,
  verifyOrder,
  getCorrectPosition,
  getSortedEvents,
  calculateScore,
  getFeedbackMessage,
  generatePerformanceSummary,
  getCardStateStyles,
  validateEventList,
  getEventHint,
  getGameStats,
  areEventsClose,
  groupEventsByCentury,
  calculateDifficulty,
  formatGameDuration,
  getPeriodColor,
} from "./utils/timeline-utils.js";
