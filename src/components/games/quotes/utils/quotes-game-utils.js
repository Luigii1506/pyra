/**
 * Quotes Game Utilities
 * Utility functions for the quotes game
 * @created 2024-12-19
 */

import {
  CATEGORY_ICONS,
  SCORE_MESSAGES,
} from "../constants/quotes-game-constants";

/**
 * Get timer color based on remaining time percentage
 * @param {number} currentTime - Current remaining time
 * @param {number} totalTime - Total time allowed
 * @returns {string} - Tailwind CSS color class
 */
export const getTimerColor = (currentTime, totalTime) => {
  const percentage = (currentTime / totalTime) * 100;
  if (percentage > 60) return "text-green-600";
  if (percentage > 30) return "text-yellow-600";
  return "text-red-600";
};

/**
 * Get category icon for a given category
 * @param {string} category - Category name
 * @returns {string} - Emoji icon
 */
export const getCategoryIcon = (category) => {
  return CATEGORY_ICONS[category] || "💭";
};

/**
 * Get score message and color based on accuracy percentage
 * @param {number} percentage - Accuracy percentage (0-100)
 * @returns {Object} - Object with message and color
 */
export const getScoreMessage = (percentage) => {
  const scoreData = SCORE_MESSAGES.find(
    (score) => percentage >= score.minPercentage
  );
  return {
    message: scoreData?.message || "¡Sigue practicando!",
    color: scoreData?.color || "text-gray-600",
  };
};

/**
 * Convert answer index to corresponding option
 * @param {number} index - Answer index (0-3)
 * @param {Array} options - Array of options
 * @returns {string|null} - Selected option or null
 */
export const getAnswerByIndex = (index, options) => {
  return options?.[index] || null;
};

/**
 * Get letter label for answer option (A, B, C, D)
 * @param {number} index - Option index (0-3)
 * @returns {string} - Letter label
 */
export const getOptionLabel = (index) => {
  return String.fromCharCode(65 + index);
};

/**
 * Calculate progress percentage
 * @param {number} current - Current question number (1-based)
 * @param {number} total - Total number of questions
 * @returns {number} - Progress percentage (0-100)
 */
export const calculateProgress = (current, total) => {
  return total > 0 ? (current / total) * 100 : 0;
};

/**
 * Format time display
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (seconds) => {
  return `${seconds}s`;
};

/**
 * Check if time is critically low (≤10 seconds)
 * @param {number} time - Remaining time in seconds
 * @returns {boolean} - True if time is critically low
 */
export const isCriticalTime = (time) => {
  return time <= 10;
};
