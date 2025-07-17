/**
 * Application Constants
 * Defines main constants used throughout the application
 * @created 2024-12-19
 */

// Rangos de usuario y gamificación
export const USER_RANKS = {
  APRENDIZ: "Aprendiz",
  HISTORIADOR_JUNIOR: "Historiador Júnior",
  HISTORIADOR: "Historiador",
  HISTORIADOR_SENIOR: "Historiador Senior",
  MAESTRO_HISTORIA: "Maestro de Historia",
  ERUDITO: "Erudito",
};

export const RANK_THRESHOLDS = {
  [USER_RANKS.APRENDIZ]: { min: 0, max: 499 },
  [USER_RANKS.HISTORIADOR_JUNIOR]: { min: 500, max: 1499 },
  [USER_RANKS.HISTORIADOR]: { min: 1500, max: 2999 },
  [USER_RANKS.HISTORIADOR_SENIOR]: { min: 3000, max: 4999 },
  [USER_RANKS.MAESTRO_HISTORIA]: { min: 5000, max: 9999 },
  [USER_RANKS.ERUDITO]: { min: 10000, max: null },
};

// Puntos de experiencia por actividades
export const EXPERIENCE_POINTS = {
  COMPLETE_EXAM: 100,
  PERFECT_EXAM: 200,
  STUDY_SESSION: 50,
  CREATE_NOTE: 25,
  DAILY_LOGIN: 10,
  STREAK_BONUS: 5, // Por día consecutivo adicional
};

// Tipos de preguntas de examen
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  OPEN_ENDED: "OPEN_ENDED",
  TRUE_FALSE: "TRUE_FALSE",
  MATCHING: "MATCHING",
  CHRONOLOGICAL_ORDER: "CHRONOLOGICAL_ORDER",
  MAP_LOCATION: "MAP_LOCATION",
};

// Niveles de dificultad
export const DIFFICULTY_LEVELS = {
  BASICO: "Básico",
  INTERMEDIO: "Intermedio",
  AVANZADO: "Avanzado",
  EXPERTO: "Experto",
};

// Categorías de contenido histórico
export const HISTORICAL_CATEGORIES = {
  FIGURES: {
    EMPERADOR: "Emperador",
    FILOSOFO: "Filósofo",
    GENERAL: "General",
    POLITICO: "Político",
    ARTISTA: "Artista",
    CIENTIFICO: "Científico",
    RELIGIOSO: "Religioso",
  },
  PLACES: {
    CIUDAD: "Ciudad",
    TEMPLO: "Templo",
    SITIO_ARQUEOLOGICO: "Sitio Arqueológico",
    PALACIO: "Palacio",
    FORTALEZA: "Fortaleza",
    TEATRO: "Teatro",
  },
  EVENTS: {
    GUERRA: "Guerra",
    BATALLA: "Batalla",
    TRATADO: "Tratado",
    FUNDACION: "Fundación",
    DESCUBRIMIENTO: "Descubrimiento",
    INVENCION: "Invención",
  },
};

// Tipos de conexiones históricas
export const CONNECTION_TYPES = {
  GENEALOGY: "Genealogy",
  INFLUENCE: "Influence",
  HIERARCHY: "Hierarchy",
  RELATIONSHIP: "Relationship",
  MENTOR_STUDENT: "Mentor-Student",
  POLITICAL: "Political",
  MILITARY: "Military",
  CULTURAL: "Cultural",
};

// Tipos de capas de mapa
export const MAP_LAYER_TYPES = {
  POLITICAL: "political",
  TRADE: "trade",
  MILITARY: "military",
  CULTURAL: "cultural",
  RELIGIOUS: "religious",
  ECONOMIC: "economic",
};

// Eras históricas
export const HISTORICAL_ERAS = {
  PREHISTORIA: "Prehistoria",
  ANTIGEDAD: "Antigüedad",
  EDAD_MEDIA: "Edad Media",
  RENACIMIENTO: "Renacimiento",
  EDAD_MODERNA: "Edad Moderna",
  CONTEMPORANEA: "Época Contemporánea",
};

// Tipos de sesiones de estudio
export const STUDY_SESSION_TYPES = {
  FLASHCARDS: "Flashcards",
  TRIVIA: "Trivia",
  CHRONOLOGICAL_ORDER: "ChronologicalOrder",
  MAP_QUIZ: "MapQuiz",
  MATCHING: "Matching",
};

// Configuración de algoritmo de repetición espaciada
export const SPACED_REPETITION = {
  INITIAL_INTERVAL: 1, // días
  EASE_FACTOR: 2.5,
  MIN_EASE_FACTOR: 1.3,
  MAX_EASE_FACTOR: 3.0,
  GRADE_THRESHOLDS: {
    AGAIN: 0, // 0-1: mal
    HARD: 2, // 2: difícil
    GOOD: 3, // 3: bien
    EASY: 4, // 4-5: fácil
  },
};

// Límites de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  SEARCH_RESULTS_SIZE: 50,
};

// Configuración de validación
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  NOTE_MAX_LENGTH: 5000,
  BIOGRAPHY_MAX_LENGTH: 10000,
};

export default {
  USER_RANKS,
  RANK_THRESHOLDS,
  EXPERIENCE_POINTS,
  QUESTION_TYPES,
  DIFFICULTY_LEVELS,
  HISTORICAL_CATEGORIES,
  CONNECTION_TYPES,
  MAP_LAYER_TYPES,
  HISTORICAL_ERAS,
  STUDY_SESSION_TYPES,
  SPACED_REPETITION,
  PAGINATION,
  VALIDATION,
};
