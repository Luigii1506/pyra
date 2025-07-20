/**
 * Daily Content Constants
 * Constantes para el sistema de contenido histórico diario
 * @created 2024-12-19
 */

// Tipos de contenido histórico
export const CONTENT_TYPES = {
  BIRTH: "birth", // Nacimiento de personajes
  DEATH: "death", // Muerte de personajes
  EVENT: "event", // Eventos históricos
  DISCOVERY: "discovery", // Descubrimientos
  INVENTION: "invention", // Inventos
  BATTLE: "battle", // Batallas
  FOUNDATION: "foundation", // Fundación de ciudades/instituciones
  TREATY: "treaty", // Tratados y acuerdos
  CORONATION: "coronation", // Coronaciones
  REVOLUTION: "revolution", // Revoluciones
};

// Configuración de tipos de contenido
export const CONTENT_CONFIG = {
  [CONTENT_TYPES.BIRTH]: {
    name: "Nacimiento",
    icon: "🎂",
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
    prefix: "Nació:",
  },
  [CONTENT_TYPES.DEATH]: {
    name: "Fallecimiento",
    icon: "⚰️",
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-800",
    prefix: "Murió:",
  },
  [CONTENT_TYPES.EVENT]: {
    name: "Evento Histórico",
    icon: "📅",
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    prefix: "Sucedió:",
  },
  [CONTENT_TYPES.DISCOVERY]: {
    name: "Descubrimiento",
    icon: "🔍",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-800",
    prefix: "Se descubrió:",
  },
  [CONTENT_TYPES.INVENTION]: {
    name: "Invento",
    icon: "💡",
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
    prefix: "Se inventó:",
  },
  [CONTENT_TYPES.BATTLE]: {
    name: "Batalla",
    icon: "⚔️",
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
    prefix: "Batalla de:",
  },
  [CONTENT_TYPES.FOUNDATION]: {
    name: "Fundación",
    icon: "🏛️",
    color: "from-indigo-400 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-800",
    prefix: "Se fundó:",
  },
  [CONTENT_TYPES.TREATY]: {
    name: "Tratado",
    icon: "📜",
    color: "from-amber-400 to-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-800",
    prefix: "Se firmó:",
  },
  [CONTENT_TYPES.CORONATION]: {
    name: "Coronación",
    icon: "👑",
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-800",
    prefix: "Se coronó:",
  },
  [CONTENT_TYPES.REVOLUTION]: {
    name: "Revolución",
    icon: "🔥",
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-800",
    prefix: "Inició:",
  },
};

// Meses del año
export const MONTHS = {
  1: { name: "Enero", short: "Ene" },
  2: { name: "Febrero", short: "Feb" },
  3: { name: "Marzo", short: "Mar" },
  4: { name: "Abril", short: "Abr" },
  5: { name: "Mayo", short: "May" },
  6: { name: "Junio", short: "Jun" },
  7: { name: "Julio", short: "Jul" },
  8: { name: "Agosto", short: "Ago" },
  9: { name: "Septiembre", short: "Sep" },
  10: { name: "Octubre", short: "Oct" },
  11: { name: "Noviembre", short: "Nov" },
  12: { name: "Diciembre", short: "Dic" },
};

// Configuración del sistema de favoritos
export const FAVORITES_CONFIG = {
  MAX_FAVORITES: 50,
  STORAGE_KEY: "daily_historical_favorites",
  HISTORY_KEY: "daily_historical_history",
  STREAK_KEY: "daily_historical_streak",
  LAST_VISIT_KEY: "daily_historical_last_visit",
};

// Configuración de streaks y gamificación
export const STREAK_CONFIG = {
  MIN_STREAK_FOR_BADGE: 7,
  BRONZE_STREAK: 7,
  SILVER_STREAK: 30,
  GOLD_STREAK: 100,
  STREAK_RESET_HOURS: 48, // Horas máximas sin visitar para mantener streak
};

// Badges y logros
export const ACHIEVEMENTS = {
  FIRST_VISIT: {
    id: "first_visit",
    name: "Primer Día",
    description: "Visitaste el contenido histórico por primera vez",
    icon: "🌟",
    requirement: 1,
  },
  WEEK_STREAK: {
    id: "week_streak",
    name: "Semana Histórica",
    description: "Mantuviste una racha de 7 días",
    icon: "📚",
    requirement: 7,
  },
  MONTH_STREAK: {
    id: "month_streak",
    name: "Mes de Historia",
    description: "Mantuviste una racha de 30 días",
    icon: "🏆",
    requirement: 30,
  },
  CENTURY_STREAK: {
    id: "century_streak",
    name: "Siglo de Conocimiento",
    description: "Mantuviste una racha de 100 días",
    icon: "👑",
    requirement: 100,
  },
  FAVORITE_COLLECTOR: {
    id: "favorite_collector",
    name: "Coleccionista",
    description: "Agregaste 10 contenidos a favoritos",
    icon: "❤️",
    requirement: 10,
  },
  HISTORY_EXPLORER: {
    id: "history_explorer",
    name: "Explorador Histórico",
    description: "Visitaste contenido de todas las categorías",
    icon: "🗺️",
    requirement: "all_types",
  },
};

// Configuración de visualización
export const DISPLAY_CONFIG = {
  ITEMS_PER_DATE: 3, // Máximo 3 elementos por fecha
  SHOW_RELATED_YEARS: true, // Mostrar eventos de años relacionados
  YEAR_TOLERANCE: 50, // Años de tolerancia para eventos relacionados
  DEFAULT_VIEW: "today", // Vista por defecto: today, favorites, history
  ANIMATION_DURATION: 300, // Duración de animaciones en ms
};

// Filtros de contenido
export const CONTENT_FILTERS = {
  ALL: "all",
  PEOPLE: "people", // births + deaths
  EVENTS: "events", // events + battles + revolutions
  DISCOVERIES: "discoveries", // discoveries + inventions
  POLITICAL: "political", // treaties + coronations + foundations
};

export const FILTER_CONFIG = {
  [CONTENT_FILTERS.ALL]: {
    name: "Todo",
    icon: "📚",
    types: Object.values(CONTENT_TYPES),
  },
  [CONTENT_FILTERS.PEOPLE]: {
    name: "Personajes",
    icon: "👥",
    types: [CONTENT_TYPES.BIRTH, CONTENT_TYPES.DEATH],
  },
  [CONTENT_FILTERS.EVENTS]: {
    name: "Eventos",
    icon: "⚔️",
    types: [
      CONTENT_TYPES.EVENT,
      CONTENT_TYPES.BATTLE,
      CONTENT_TYPES.REVOLUTION,
    ],
  },
  [CONTENT_FILTERS.DISCOVERIES]: {
    name: "Descubrimientos",
    icon: "🔬",
    types: [CONTENT_TYPES.DISCOVERY, CONTENT_TYPES.INVENTION],
  },
  [CONTENT_FILTERS.POLITICAL]: {
    name: "Político",
    icon: "🏛️",
    types: [
      CONTENT_TYPES.TREATY,
      CONTENT_TYPES.CORONATION,
      CONTENT_TYPES.FOUNDATION,
    ],
  },
};

// Mensajes motivacionales
export const MOTIVATIONAL_MESSAGES = {
  FIRST_TIME: [
    "¡Bienvenido a tu viaje histórico diario!",
    "Cada día una nueva lección de historia",
    "El conocimiento histórico te espera",
  ],
  STREAK_1_6: [
    "¡Buen comienzo! Sigue explorando la historia",
    "Cada día aprendes algo nuevo",
    "La historia cobra vida día a día",
  ],
  STREAK_7_29: [
    "¡Excelente dedicación! La historia es tu pasión",
    "Tu conocimiento histórico crece constantemente",
    "¡Una semana completa de aprendizaje histórico!",
  ],
  STREAK_30_99: [
    "¡Impresionante! Eres un verdadero historiador",
    "Tu pasión por la historia es inspiradora",
    "¡Un mes completo de dedicación histórica!",
  ],
  STREAK_100_PLUS: [
    "¡Eres una leyenda histórica viviente!",
    "Tu conocimiento histórico es extraordinario",
    "¡Cien días de sabiduría histórica!",
  ],
};

// Configuración por defecto
export const DEFAULT_CONFIG = {
  contentType: CONTENT_TYPES.EVENT,
  filter: CONTENT_FILTERS.ALL,
  showRelatedYears: true,
  autoRefresh: true,
  yearTolerance: 50,
};
