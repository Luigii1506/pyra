/**
 * Matching Game Constants
 * Configuración y constantes para el juego de emparejamiento histórico
 * @created 2024-12-19
 */

// Estados del juego de emparejamiento
export const MATCHING_GAME_STATES = {
  SETUP: 'setup',
  PLAYING: 'playing',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

// Tipos de emparejamiento disponibles
export const MATCHING_TYPES = {
  PERSON_DESCRIPTION: 'person_description',           // Personaje con Descripción
  PERSON_ARTIFACT: 'person_artifact',                 // Personaje con Objeto/Artefacto
  PERSON_PERSON: 'person_person',                     // Personaje con Personaje Relacionado
  PLACE_DESCRIPTION: 'place_description',             // Lugar con Descripción
  PLACE_EVENT: 'place_event',                         // Lugar con Evento
  RELIGION_DESCRIPTION: 'religion_description',       // Religión/Mito con Descripción
  DEITY_ATTRIBUTE: 'deity_attribute',                 // Deidad con Atributo/Símbolo
  TERM_DEFINITION: 'term_definition',                 // Término con Definición
  DATE_EVENT: 'date_event',                           // Fecha con Evento
};

// Configuración de emparejamiento por tipo
export const MATCHING_TYPE_CONFIG = {
  [MATCHING_TYPES.PERSON_DESCRIPTION]: {
    name: 'Personaje con Descripción',
    description: 'Conecta personajes históricos con sus biografías',
    icon: '👤',
    color: 'bg-blue-500',
  },
  [MATCHING_TYPES.PERSON_ARTIFACT]: {
    name: 'Personaje con Artefacto',
    description: 'Conecta personajes con objetos que los representan',
    icon: '🏺',
    color: 'bg-amber-500',
  },
  [MATCHING_TYPES.PERSON_PERSON]: {
    name: 'Relaciones Históricas',
    description: 'Conecta personajes relacionados entre sí',
    icon: '🤝',
    color: 'bg-green-500',
  },
  [MATCHING_TYPES.PLACE_DESCRIPTION]: {
    name: 'Lugares Históricos',
    description: 'Conecta lugares con su importancia histórica',
    icon: '🏛️',
    color: 'bg-purple-500',
  },
  [MATCHING_TYPES.PLACE_EVENT]: {
    name: 'Lugar con Evento',
    description: 'Conecta lugares con eventos importantes',
    icon: '📍',
    color: 'bg-red-500',
  },
  [MATCHING_TYPES.RELIGION_DESCRIPTION]: {
    name: 'Religiones y Mitologías',
    description: 'Conecta creencias con sus características',
    icon: '⚡',
    color: 'bg-indigo-500',
  },
  [MATCHING_TYPES.DEITY_ATTRIBUTE]: {
    name: 'Deidades y Símbolos',
    description: 'Conecta dioses con sus atributos',
    icon: '🔱',
    color: 'bg-cyan-500',
  },
  [MATCHING_TYPES.TERM_DEFINITION]: {
    name: 'Términos Históricos',
    description: 'Conecta conceptos con sus definiciones',
    icon: '📚',
    color: 'bg-orange-500',
  },
  [MATCHING_TYPES.DATE_EVENT]: {
    name: 'Fechas Importantes',
    description: 'Conecta fechas con eventos históricos',
    icon: '📅',
    color: 'bg-pink-500',
  },
};

// Niveles de dificultad
export const DIFFICULTY_LEVELS = {
  EASY: {
    key: 'easy',
    name: 'Fácil',
    pairs: 4,
    timeLimit: 120, // 2 minutos
    hintsAllowed: 3,
    description: '4 pares - Perfecto para comenzar',
    color: 'bg-green-500',
    pointsMultiplier: 1.0,
  },
  MEDIUM: {
    key: 'medium',
    name: 'Medio',
    pairs: 6,
    timeLimit: 180, // 3 minutos
    hintsAllowed: 2,
    description: '6 pares - Desafío equilibrado',
    color: 'bg-amber-500',
    pointsMultiplier: 1.5,
  },
  HARD: {
    key: 'hard',
    name: 'Difícil',
    pairs: 8,
    timeLimit: 240, // 4 minutos
    hintsAllowed: 1,
    description: '8 pares - Solo para expertos',
    color: 'bg-red-500',
    pointsMultiplier: 2.0,
  },
};

// Configuración del sistema de puntuación
export const SCORING_CONFIG = {
  BASE_POINTS_PER_MATCH: 100,           // Puntos base por emparejamiento correcto
  STREAK_BONUS_MULTIPLIER: 0.2,        // 20% adicional por cada acierto en racha
  HINT_PENALTY: 50,                     // Penalización por usar una pista
  TIME_BONUS_THRESHOLD: 0.5,           // Bonus si se completa en menos del 50% del tiempo
  TIME_BONUS_POINTS: 500,              // Puntos extra por completar rápido
  WRONG_ATTEMPT_PENALTY: 25,          // Penalización por intento incorrecto
  PERFECT_GAME_BONUS: 1000,           // Bonus por completar sin errores
};

// Configuración de feedback y animaciones
export const FEEDBACK_CONFIG = {
  CORRECT_ANIMATION_DURATION: 800,     // Duración de animación para acierto (ms)
  WRONG_ANIMATION_DURATION: 600,      // Duración de animación para error (ms)
  HINT_DISPLAY_DURATION: 5000,        // Duración de mostrar pista (ms)
  MATCH_CELEBRATION_DURATION: 1200,   // Duración de celebración por match (ms)
  GAME_COMPLETE_DELAY: 2000,          // Delay antes de mostrar resultados (ms)
};

// Estados de las cartas/elementos
export const CARD_STATES = {
  IDLE: 'idle',                        // Estado normal
  SELECTED: 'selected',                // Seleccionada para emparejar
  MATCHED: 'matched',                  // Ya emparejada correctamente
  WRONG: 'wrong',                      // Selección incorrecta (temporal)
  HINT: 'hint',                        // Resaltada por pista
};

// Configuración visual de las cartas
export const CARD_STYLES = {
  [CARD_STATES.IDLE]: {
    background: 'bg-white',
    border: 'border-stone-300',
    text: 'text-stone-800',
    shadow: 'shadow-md hover:shadow-lg',
    transform: 'hover:scale-105',
    cursor: 'cursor-pointer',
  },
  [CARD_STATES.SELECTED]: {
    background: 'bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-800',
    shadow: 'shadow-lg',
    transform: 'scale-105',
    cursor: 'cursor-pointer',
  },
  [CARD_STATES.MATCHED]: {
    background: 'bg-green-100',
    border: 'border-green-400',
    text: 'text-green-800',
    shadow: 'shadow-sm',
    transform: 'scale-95',
    cursor: 'cursor-default',
    opacity: 'opacity-75',
  },
  [CARD_STATES.WRONG]: {
    background: 'bg-red-100',
    border: 'border-red-400',
    text: 'text-red-800',
    shadow: 'shadow-lg',
    transform: 'scale-105',
    cursor: 'cursor-pointer',
    animation: 'animate-pulse',
  },
  [CARD_STATES.HINT]: {
    background: 'bg-amber-100',
    border: 'border-amber-400',
    text: 'text-amber-800',
    shadow: 'shadow-lg',
    transform: 'scale-105',
    cursor: 'cursor-pointer',
    animation: 'animate-bounce',
  },
};

// Mensajes de feedback
export const FEEDBACK_MESSAGES = {
  CORRECT: [
    '¡Excelente!',
    '¡Correcto!',
    '¡Perfecto!',
    '¡Bien hecho!',
    '¡Fantástico!',
  ],
  WRONG: [
    'Inténtalo de nuevo',
    'No es correcto',
    'Prueba otra vez',
    'Casi lo tienes',
    'Sigue intentando',
  ],
  STREAK: [
    '¡Racha perfecta!',
    '¡Imparable!',
    '¡En llamas!',
    '¡Increíble!',
    '¡Maestro!',
  ],
  HINT_USED: [
    'Pista utilizada',
    'Te ayudamos un poco',
    'Aquí tienes una pista',
    'Observa con atención',
  ],
};

// Configuración de animaciones CSS personalizadas
export const ANIMATIONS = {
  MATCH_SUCCESS: 'animate-pulse duration-800',
  WRONG_ATTEMPT: 'animate-shake duration-600',
  HINT_HIGHLIGHT: 'animate-bounce duration-1000',
  CARD_FLIP: 'animate-flip duration-400',
  CELEBRATION: 'animate-celebration duration-1200',
};