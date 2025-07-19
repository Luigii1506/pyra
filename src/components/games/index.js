/**
 * Games Index
 * Exports centralizados para todos los juegos y componentes compartidos
 * @created 2024-12-19
 */

// Shared Components
export { default as GameHeader } from "./shared/GameHeader.js";
export { default as GameCard } from "./shared/GameCard.js";
export { default as GameButton } from "./shared/GameButton.js";
export { default as GameStats } from "./shared/GameStats.js";

// Trivia Game
export { default as TriviaGame } from "./trivia/TriviaGame.js";
export { default as useTriviaGame } from "./trivia/useTriviaGame.js";

// Timeline Game
export { default as TimelineGame } from "./timeline/TimelineGame.js";
export { default as useTimelineGame } from "./timeline/useTimelineGame.js";

// Matching Game (Main exports)
export { default as MatchingGame } from "./matching/MatchingGame.js";
export { useMatchingGame } from "./matching/useMatchingGame.js";

// Matching Game (Modular components - for advanced usage)
export {
  MatchingGameSetup,
  MatchingGamePlay,
  MatchingGameResults,
} from "./matching/components";

// Matching Game (Utils and constants)
export {
  selectPairsForDifficulty,
  convertPairsToItems,
  areItemsMatched,
  getPerformanceLevel,
  MATCHING_TYPES,
  DIFFICULTY_LEVELS,
  ALL_MATCHING_PAIRS,
} from "./matching";

// Geography Game
export { default as GeographyGame } from "./geography/GeographyGame.js";
export { default as useMapGame } from "./geography/useMapGame.js";

// Daily Content
export { default as DailyContent } from "./daily/DailyContent.js";
export { default as useDailyContent } from "./daily/useDailyContent.js";

// Quotes Game (Main exports)
export { default as QuotesGame } from "./quotes/QuotesGame.js";
export { default as useQuotesGame } from "./quotes/useQuotesGame.js";

// Quotes Game (Modular components - for advanced usage)
export {
  QuotesGameSetup,
  QuotesGamePlay,
  QuotesGameResults,
} from "./quotes/components";

// Quotes Game (Utils and constants)
export {
  getScoreMessage,
  getCategoryIcon,
  getTimerColor,
  calculateProgress,
  SAMPLE_QUOTES,
  GAME_CONFIG as QUOTES_GAME_CONFIG,
} from "./quotes";

// Flashcards Game (Main exports)
export { default as FlashcardsGame } from "./flashcards/FlashcardsGame.js";
export { useFlashcardsGame } from "./flashcards/useFlashcardsGame.js";

// Flashcards Game (Modular components - for advanced usage)
export {
  DeckSelection,
  CardDisplay,
  SessionComplete,
} from "./flashcards/components";

// Flashcards Game (Utils and constants)
export {
  calculateNextReview,
  createStudySession,
  getMasteryConfig,
  SAMPLE_DECKS,
  SM2_CONFIG,
  CARD_STATES,
  ANSWER_TYPES,
} from "./flashcards";

// Game Types & Constants
export const GAME_TYPES = {
  TRIVIA: "trivia",
  TIMELINE: "timeline",
  MATCHING: "matching",
  GEOGRAPHY: "geography",
  DAILY: "daily",
  QUOTES: "quotes",
  FLASHCARDS: "flashcards",
  OPEN_QUESTIONS: "open-questions",
};

export const GAME_STATES = {
  IDLE: "idle",
  PLAYING: "playing",
  PAUSED: "paused",
  FINISHED: "finished",
};

// Game Configuration
export const GAME_CONFIG = {
  [GAME_TYPES.TRIVIA]: {
    defaultTimeLimit: 60,
    pointsPerCorrect: 10,
    penaltyPerSecond: 1,
  },
  [GAME_TYPES.TIMELINE]: {
    showHintsDefault: false,
    maxAttempts: 3,
  },
  [GAME_TYPES.MATCHING]: {
    defaultDifficulty: 'medium',
    defaultTimeLimit: 180,
    basePointsPerMatch: 100,
    streakBonusMultiplier: 0.2,
    hintPenalty: 50,
    maxHintsPerDifficulty: { easy: 3, medium: 2, hard: 1 },
  },
  [GAME_TYPES.GEOGRAPHY]: {
    toleranceRadius: 8, // percentage of map
    maxAttempts: 3,
  },
  [GAME_TYPES.QUOTES]: {
    defaultTimeLimit: 30,
    pointsPerCorrect: 100,
    streakBonus: 15,
    maxHints: 3,
  },
  [GAME_TYPES.FLASHCARDS]: {
    defaultNewCardsLimit: 20,
    defaultReviewCardsLimit: 100,
    defaultTimeLimit: 30,
    defaultEaseFactor: 2.5,
  },
};
