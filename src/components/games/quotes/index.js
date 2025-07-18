/**
 * Quotes Game Index
 * Main exports for the quotes game module
 * @created 2024-12-19
 */

// Main component
export { default as QuotesGame } from "./QuotesGame";

// Hook
export { default as useQuotesGame } from "./useQuotesGame";

// Screen components
export {
  QuotesGameSetup,
  QuotesGamePlay,
  QuotesGameResults,
  GameProgress,
  QuestionDisplay,
  AnswerOptions,
  HintDisplay,
  ResultExplanation,
} from "./components";

// Utils and constants
export * from "./utils/quotes-game-utils";
export * from "./constants/quotes-game-constants";
