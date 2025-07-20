/**
 * Timeline Game Constants
 * Constantes para el juego de línea de tiempo
 * @created 2024-12-19
 */

// Estados del juego
export const TIMELINE_GAME_STATES = {
  SETUP: "setup",
  PLAYING: "playing",
  FINISHED: "finished",
};

// Configuración del juego
export const GAME_CONFIG = {
  DEFAULT_EVENTS_COUNT: 5,
  MAX_ATTEMPTS: 3,
  POINTS_PER_CORRECT_POSITION: 100,
  BONUS_PERFECT_ORDER: 500,
  PENALTY_PER_ATTEMPT: 50,
};

// Configuración de dificultad
export const DIFFICULTY_LEVELS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export const DIFFICULTY_CONFIG = {
  [DIFFICULTY_LEVELS.EASY]: {
    name: "Fácil",
    eventsCount: 4,
    showYearHints: true,
    color: "bg-green-500",
    description: "Pocos eventos con pistas de años",
  },
  [DIFFICULTY_LEVELS.MEDIUM]: {
    name: "Medio",
    eventsCount: 5,
    showYearHints: false,
    color: "bg-amber-500",
    description: "Eventos moderados sin pistas",
  },
  [DIFFICULTY_LEVELS.HARD]: {
    name: "Difícil",
    eventsCount: 6,
    showYearHints: false,
    color: "bg-red-500",
    description: "Muchos eventos sin ayuda",
  },
};

// Períodos históricos
export const HISTORICAL_PERIODS = {
  ANCIENT: "ancient",
  CLASSICAL: "classical",
  MEDIEVAL: "medieval",
  RENAISSANCE: "renaissance",
  MODERN: "modern",
  CONTEMPORARY: "contemporary",
  MIXED: "mixed",
};

export const PERIOD_CONFIG = {
  [HISTORICAL_PERIODS.ANCIENT]: {
    name: "Antigüedad",
    range: "Hasta 476 d.C.",
    color: "bg-purple-500",
    icon: "🏛️",
  },
  [HISTORICAL_PERIODS.CLASSICAL]: {
    name: "Época Clásica",
    range: "800 a.C. - 600 d.C.",
    color: "bg-blue-500",
    icon: "⚔️",
  },
  [HISTORICAL_PERIODS.MEDIEVAL]: {
    name: "Medieval",
    range: "476 - 1453",
    color: "bg-amber-600",
    icon: "🏰",
  },
  [HISTORICAL_PERIODS.RENAISSANCE]: {
    name: "Renacimiento",
    range: "1453 - 1648",
    color: "bg-green-500",
    icon: "🎨",
  },
  [HISTORICAL_PERIODS.MODERN]: {
    name: "Moderna",
    range: "1648 - 1914",
    color: "bg-indigo-500",
    icon: "⚙️",
  },
  [HISTORICAL_PERIODS.CONTEMPORARY]: {
    name: "Contemporánea",
    range: "1914 - presente",
    color: "bg-red-500",
    icon: "🌍",
  },
  [HISTORICAL_PERIODS.MIXED]: {
    name: "Mixto",
    range: "Todas las épocas",
    color: "bg-stone-500",
    icon: "📚",
  },
};

// Estados de verificación
export const VERIFICATION_STATES = {
  PENDING: "pending",
  CORRECT: "correct",
  INCORRECT: "incorrect",
  PARTIAL: "partial",
};

// Mensajes de feedback
export const FEEDBACK_MESSAGES = {
  PERFECT: {
    title: "🏆 ¡Perfecto!",
    message: "¡Ordenaste todos los eventos correctamente!",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  EXCELLENT: {
    title: "⭐ ¡Excelente!",
    message: "Solo un par de eventos fuera de lugar.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  GOOD: {
    title: "👍 ¡Bien!",
    message: "Buen trabajo, pero puedes mejorar.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  NEEDS_PRACTICE: {
    title: "📚 Sigue practicando",
    message: "La cronología requiere más estudio.",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  CARD_HOVER_SCALE: "hover:scale-[1.02]",
  TRANSITION_DURATION: "transition-all duration-300",
  DROP_ZONE_HIGHLIGHT: "border-blue-400 bg-blue-50 text-blue-600",
  DRAG_FEEDBACK: "transform rotate-2 shadow-lg opacity-80",
};

// Configuración de estilos para estados
export const CARD_STATE_STYLES = {
  [VERIFICATION_STATES.CORRECT]: {
    border: "border-green-300",
    background: "bg-green-50",
    text: "text-green-800",
    icon: "✅",
  },
  [VERIFICATION_STATES.INCORRECT]: {
    border: "border-red-300",
    background: "bg-red-50",
    text: "text-red-800",
    icon: "❌",
  },
  [VERIFICATION_STATES.PARTIAL]: {
    border: "border-amber-300",
    background: "bg-amber-50",
    text: "text-amber-800",
    icon: "⚠️",
  },
  [VERIFICATION_STATES.PENDING]: {
    border: "border-stone-200",
    background: "bg-white",
    text: "text-stone-800",
    icon: "",
  },
};

// Configuración por defecto del juego
export const DEFAULT_GAME_CONFIG = {
  difficulty: DIFFICULTY_LEVELS.MEDIUM,
  period: HISTORICAL_PERIODS.MIXED,
  eventsCount: 5,
  showHints: false,
  maxAttempts: 3,
};
