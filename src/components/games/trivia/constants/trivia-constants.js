/**
 * Trivia Game Constants
 * Configuración y constantes para el juego de trivia histórica contrarreloj
 * @created 2024-12-19
 */

// Estados del juego de trivia
export const TRIVIA_GAME_STATES = {
  SETUP: "setup",
  PLAYING: "playing",
  PAUSED: "paused",
  FINISHED: "finished",
  REVIEWING: "reviewing", // Para revisar respuestas después del juego
};

// Categorías de preguntas disponibles
export const TRIVIA_CATEGORIES = {
  ANCIENT_CIVILIZATIONS: "ancient_civilizations",
  ROMAN_EMPIRE: "roman_empire",
  GREEK_HISTORY: "greek_history",
  EGYPTIAN_HISTORY: "egyptian_history",
  MEDIEVAL_HISTORY: "medieval_history",
  ANCIENT_PHILOSOPHY: "ancient_philosophy",
  MYTHOLOGY: "mythology",
  ANCIENT_WARS: "ancient_wars",
  HISTORICAL_FIGURES: "historical_figures",
  MIXED: "mixed", // Mezcla de todas las categorías
};

// Configuración de categorías
export const CATEGORY_CONFIG = {
  [TRIVIA_CATEGORIES.ANCIENT_CIVILIZATIONS]: {
    name: "Civilizaciones Antiguas",
    description: "Preguntas sobre las grandes civilizaciones del mundo antiguo",
    icon: "🏛️",
    color: "bg-purple-500",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
  [TRIVIA_CATEGORIES.ROMAN_EMPIRE]: {
    name: "Imperio Romano",
    description: "Historia del Imperio Romano y sus personajes",
    icon: "🦅",
    color: "bg-red-500",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
  [TRIVIA_CATEGORIES.GREEK_HISTORY]: {
    name: "Grecia Antigua",
    description: "Historia de la antigua Grecia y su cultura",
    icon: "🏺",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  [TRIVIA_CATEGORIES.EGYPTIAN_HISTORY]: {
    name: "Egipto Antiguo",
    description: "Faraones, pirámides y civilización egipcia",
    icon: "🔺",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
  },
  [TRIVIA_CATEGORIES.MEDIEVAL_HISTORY]: {
    name: "Historia Medieval",
    description: "Edad Media, caballeros y reinos",
    icon: "⚔️",
    color: "bg-gray-500",
    textColor: "text-gray-700",
    borderColor: "border-gray-200",
  },
  [TRIVIA_CATEGORIES.ANCIENT_PHILOSOPHY]: {
    name: "Filosofía Antigua",
    description: "Grandes pensadores y escuelas filosóficas",
    icon: "🤔",
    color: "bg-indigo-500",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
  },
  [TRIVIA_CATEGORIES.MYTHOLOGY]: {
    name: "Mitología",
    description: "Dioses, mitos y leyendas del mundo antiguo",
    icon: "⚡",
    color: "bg-pink-500",
    textColor: "text-pink-700",
    borderColor: "border-pink-200",
  },
  [TRIVIA_CATEGORIES.ANCIENT_WARS]: {
    name: "Guerras Antiguas",
    description: "Batallas épicas y conflictos históricos",
    icon: "⚔️",
    color: "bg-orange-500",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
  [TRIVIA_CATEGORIES.HISTORICAL_FIGURES]: {
    name: "Personajes Históricos",
    description: "Grandes figuras que marcaron la historia",
    icon: "👑",
    color: "bg-green-500",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  [TRIVIA_CATEGORIES.MIXED]: {
    name: "Preguntas Mixtas",
    description: "Una mezcla de todas las categorías disponibles",
    icon: "🎲",
    color: "bg-gradient-to-r from-purple-500 to-blue-500",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
};

// Niveles de dificultad
export const DIFFICULTY_LEVELS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
  EXPERT: "expert",
};

// Configuración de dificultad
export const DIFFICULTY_CONFIG = {
  [DIFFICULTY_LEVELS.EASY]: {
    name: "Fácil",
    description: "Preguntas básicas, más tiempo",
    timeLimit: 90, // segundos
    pointsBase: 50,
    pointsTimeBonus: 5, // puntos por segundo restante
    streakMultiplier: 1.1,
    icon: "🟢",
    color: "bg-green-500",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  [DIFFICULTY_LEVELS.MEDIUM]: {
    name: "Medio",
    description: "Preguntas intermedias, tiempo estándar",
    timeLimit: 60, // segundos
    pointsBase: 100,
    pointsTimeBonus: 10,
    streakMultiplier: 1.2,
    icon: "🟡",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
  },
  [DIFFICULTY_LEVELS.HARD]: {
    name: "Difícil",
    description: "Preguntas avanzadas, menos tiempo",
    timeLimit: 45, // segundos
    pointsBase: 150,
    pointsTimeBonus: 15,
    streakMultiplier: 1.3,
    icon: "🟠",
    color: "bg-orange-500",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
  [DIFFICULTY_LEVELS.EXPERT]: {
    name: "Experto",
    description: "Preguntas de experto, contrarreloj extremo",
    timeLimit: 30, // segundos
    pointsBase: 200,
    pointsTimeBonus: 20,
    streakMultiplier: 1.5,
    icon: "🔴",
    color: "bg-red-500",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
};

// Tipos de preguntas
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "multiple_choice",
  TRUE_FALSE: "true_false",
  CHRONOLOGICAL_ORDER: "chronological_order", // Ordenar eventos por fecha
  MATCHING_PAIRS: "matching_pairs", // Emparejar elementos relacionados
};

// Configuración del sistema de puntuación
export const SCORING_CONFIG = {
  // Puntos base por respuesta correcta (se multiplica por dificultad)
  BASE_POINTS: 100,

  // Bonus por tiempo (puntos adicionales por responder rápido)
  TIME_BONUS_MULTIPLIER: 2, // puntos por segundo restante

  // Sistema de rachas
  STREAK_THRESHOLDS: {
    3: 1.1, // 10% bonus después de 3 correctas seguidas
    5: 1.2, // 20% bonus después de 5 correctas seguidas
    7: 1.3, // 30% bonus después de 7 correctas seguidas
    10: 1.5, // 50% bonus después de 10 correctas seguidas
  },

  // Bonus perfecto (sin errores)
  PERFECT_BONUS: 2000,

  // Penalizaciones
  WRONG_ANSWER_PENALTY: -10,
  SKIP_QUESTION_PENALTY: -5,

  // Bonus por completar todas las preguntas
  COMPLETION_BONUS: 500,
};

// Estados de las respuestas
export const ANSWER_STATES = {
  UNANSWERED: "unanswered",
  CORRECT: "correct",
  INCORRECT: "incorrect",
  SKIPPED: "skipped",
  TIME_OUT: "time_out",
};

// Configuración de feedback visual
export const FEEDBACK_CONFIG = {
  [ANSWER_STATES.CORRECT]: {
    color: "bg-green-500",
    textColor: "text-green-700",
    borderColor: "border-green-300",
    icon: "✅",
    message: "¡Correcto!",
    bgClass: "bg-green-50",
  },
  [ANSWER_STATES.INCORRECT]: {
    color: "bg-red-500",
    textColor: "text-red-700",
    borderColor: "border-red-300",
    icon: "❌",
    message: "Incorrecto",
    bgClass: "bg-red-50",
  },
  [ANSWER_STATES.SKIPPED]: {
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-300",
    icon: "⏭️",
    message: "Saltada",
    bgClass: "bg-yellow-50",
  },
  [ANSWER_STATES.TIME_OUT]: {
    color: "bg-gray-500",
    textColor: "text-gray-700",
    borderColor: "border-gray-300",
    icon: "⏰",
    message: "Tiempo agotado",
    bgClass: "bg-gray-50",
  },
};

// Mensajes de feedback por rendimiento
export const PERFORMANCE_MESSAGES = {
  PERFECT: {
    title: "🏆 ¡Perfecto!",
    message: "¡Increíble! Respondiste todas las preguntas correctamente.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  EXCELLENT: {
    title: "⭐ ¡Excelente!",
    message: "Fantástico rendimiento. Dominas muy bien la historia antigua.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  GOOD: {
    title: "👍 ¡Bien hecho!",
    message: "Buen trabajo. Sigue practicando para mejorar aún más.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  NEEDS_IMPROVEMENT: {
    title: "📚 Sigue practicando",
    message: "Hay margen de mejora. ¡La práctica hace al maestro!",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  POOR: {
    title: "💪 ¡No te rindas!",
    message: "Repasa los temas y vuelve a intentarlo. ¡Puedes hacerlo mejor!",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
};

// Configuración de tiempo
export const TIME_CONFIG = {
  WARNING_THRESHOLD: 10, // segundos para mostrar advertencia
  CRITICAL_THRESHOLD: 5, // segundos para mostrar estado crítico
  QUESTION_TRANSITION_DELAY: 1000, // ms entre preguntas
  FEEDBACK_DISPLAY_TIME: 2000, // ms para mostrar feedback
};

// Configuración de juego
export const GAME_CONFIG = {
  MIN_QUESTIONS_PER_GAME: 5,
  MAX_QUESTIONS_PER_GAME: 50,
  DEFAULT_QUESTIONS_PER_GAME: 15,

  // Pausas automáticas
  AUTO_PAUSE_ON_BLUR: true, // pausar cuando la ventana pierde foco
  AUTO_PAUSE_ON_VISIBILITY_CHANGE: true,

  // Configuración de sonido (para futuras implementaciones)
  SOUND_ENABLED: false,

  // Animaciones
  ANIMATIONS_ENABLED: true,
  ANIMATION_DURATION: 300, // ms
};

// Configuración de estadísticas y logros
export const STATS_CONFIG = {
  ACCURACY_THRESHOLDS: {
    EXCELLENT: 90,
    GOOD: 75,
    AVERAGE: 60,
    POOR: 40,
  },

  SPEED_THRESHOLDS: {
    VERY_FAST: 5, // segundos promedio por pregunta
    FAST: 10,
    AVERAGE: 15,
    SLOW: 20,
  },

  STREAK_ACHIEVEMENTS: {
    STREAK_MASTER: 10,
    STREAK_LEGEND: 15,
    STREAK_GOD: 20,
  },
};

// Configuración de exportación de datos
export const EXPORT_CONFIG = {
  INCLUDE_DETAILED_ANSWERS: true,
  INCLUDE_TIMING_DATA: true,
  INCLUDE_STREAK_DATA: true,
  FORMAT_OPTIONS: ["JSON", "CSV"],
};
