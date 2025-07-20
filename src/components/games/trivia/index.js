/**
 * Trivia Game Index
 * Exports centralizados para el juego de trivia histórica contrarreloj
 * @created 2024-12-19
 */

// Main component and hook
export { default as TriviaGame } from "./TriviaGame.js";
export { default as useTriviaGame } from "./useTriviaGame.js";

// Modular components (for advanced usage)
export {
  TriviaGameSetup,
  TriviaGamePlay,
  TriviaGameResults,
} from "./components/index.js";

// Constants and configuration
export {
  TRIVIA_GAME_STATES,
  TRIVIA_CATEGORIES,
  CATEGORY_CONFIG,
  DIFFICULTY_LEVELS,
  DIFFICULTY_CONFIG,
  QUESTION_TYPES,
  SCORING_CONFIG,
  ANSWER_STATES,
  FEEDBACK_CONFIG,
  PERFORMANCE_MESSAGES,
  TIME_CONFIG,
  GAME_CONFIG,
  STATS_CONFIG,
  EXPORT_CONFIG,
} from "./constants/trivia-constants.js";

// Question data
export {
  ALL_QUESTIONS_BY_CATEGORY,
  ALL_QUESTIONS,
  QUESTIONS_BY_DIFFICULTY,
  SAMPLE_QUESTIONS,
  getRandomQuestions,
  getBalancedQuestions,
} from "./constants/trivia-data.js";

// Utilities
export {
  calculateQuestionScore,
  calculateFinalScore,
  formatTime,
  getTimeState,
  calculateAverageTimePerQuestion,
  calculateGameStats,
  getAccuracyLevel,
  getSpeedLevel,
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
} from "./utils/trivia-utils.js";
