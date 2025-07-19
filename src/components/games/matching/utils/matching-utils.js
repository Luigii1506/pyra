/**
 * Matching Game Utilities
 * Funciones de utilidad para el juego de emparejamiento
 * @created 2024-12-19
 */

import { 
  DIFFICULTY_LEVELS, 
  SCORING_CONFIG, 
  FEEDBACK_MESSAGES,
  MATCHING_TYPES,
  MATCHING_TYPE_CONFIG 
} from '../constants/matching-constants.js';
import { ALL_MATCHING_PAIRS } from '../constants/matching-data.js';

/**
 * Mezcla aleatoriamente un array usando el algoritmo Fisher-Yates
 * @param {Array} array - Array a mezclar
 * @returns {Array} Array mezclado
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Selecciona pares aleatorios para un nivel de dificultad específico
 * @param {string} difficulty - Nivel de dificultad (easy, medium, hard)
 * @param {string} matchingType - Tipo de emparejamiento específico (opcional)
 * @returns {Array} Array de pares seleccionados
 */
export const selectPairsForDifficulty = (difficulty, matchingType = null) => {
  const difficultyConfig = DIFFICULTY_LEVELS[difficulty.toUpperCase()];
  if (!difficultyConfig) {
    throw new Error(`Nivel de dificultad no válido: ${difficulty}`);
  }

  const pairsNeeded = difficultyConfig.pairs;
  let availablePairs = [];

  if (matchingType && ALL_MATCHING_PAIRS[matchingType]) {
    // Si se especifica un tipo, usar solo ese tipo
    availablePairs = ALL_MATCHING_PAIRS[matchingType].filter(pair => 
      pair.difficulty === difficulty
    );
  } else {
    // Usar todos los tipos, mezclando categorías
    availablePairs = Object.values(ALL_MATCHING_PAIRS)
      .flat()
      .filter(pair => pair.difficulty === difficulty);
  }

  if (availablePairs.length < pairsNeeded) {
    // Si no hay suficientes pares del nivel específico, tomar de otros niveles
    const allPairsOfType = matchingType ? 
      ALL_MATCHING_PAIRS[matchingType] : 
      Object.values(ALL_MATCHING_PAIRS).flat();
    
    availablePairs = allPairsOfType;
  }

  // Mezclar y seleccionar la cantidad necesaria
  const shuffledPairs = shuffleArray(availablePairs);
  return shuffledPairs.slice(0, pairsNeeded);
};

/**
 * Convierte pares en elementos individuales para mostrar en el juego
 * @param {Array} pairs - Array de pares
 * @returns {Array} Array de elementos individuales mezclados
 */
export const convertPairsToItems = (pairs) => {
  const items = [];
  
  pairs.forEach((pair, index) => {
    // Elemento izquierdo
    items.push({
      id: `${pair.id}_left`,
      pairId: pair.id,
      content: pair.left.content,
      type: pair.left.type,
      image: pair.left.image,
      side: 'left',
      matchWith: `${pair.id}_right`,
      category: pair.category,
      difficulty: pair.difficulty,
    });

    // Elemento derecho
    items.push({
      id: `${pair.id}_right`,
      pairId: pair.id,
      content: pair.right.content,
      type: pair.right.type,
      image: pair.right.image,
      side: 'right',
      matchWith: `${pair.id}_left`,
      category: pair.category,
      difficulty: pair.difficulty,
    });
  });

  return shuffleArray(items);
};

/**
 * Verifica si dos elementos forman un par correcto
 * @param {Object} item1 - Primer elemento
 * @param {Object} item2 - Segundo elemento
 * @returns {boolean} True si forman un par correcto
 */
export const areItemsMatched = (item1, item2) => {
  if (!item1 || !item2) return false;
  return item1.pairId === item2.pairId && item1.id !== item2.id;
};

/**
 * Calcula la puntuación para un emparejamiento correcto
 * @param {Object} gameState - Estado actual del juego
 * @param {string} difficulty - Nivel de dificultad
 * @returns {number} Puntos obtenidos
 */
export const calculateMatchScore = (gameState, difficulty) => {
  const difficultyConfig = DIFFICULTY_LEVELS[difficulty.toUpperCase()];
  const basePoints = SCORING_CONFIG.BASE_POINTS_PER_MATCH;
  const difficultyMultiplier = difficultyConfig?.pointsMultiplier || 1;
  
  // Puntos base con multiplicador de dificultad
  let score = Math.round(basePoints * difficultyMultiplier);
  
  // Bonus por racha
  if (gameState.streak > 1) {
    const streakBonus = Math.round(score * SCORING_CONFIG.STREAK_BONUS_MULTIPLIER * (gameState.streak - 1));
    score += streakBonus;
  }
  
  return score;
};

/**
 * Calcula el bonus por tiempo al completar el juego
 * @param {number} timeElapsed - Tiempo transcurrido en segundos
 * @param {number} timeLimit - Límite de tiempo en segundos
 * @returns {number} Puntos de bonus por tiempo
 */
export const calculateTimeBonus = (timeElapsed, timeLimit) => {
  const timeUsedPercentage = timeElapsed / timeLimit;
  
  if (timeUsedPercentage <= SCORING_CONFIG.TIME_BONUS_THRESHOLD) {
    return SCORING_CONFIG.TIME_BONUS_POINTS;
  }
  
  return 0;
};

/**
 * Calcula la puntuación final del juego
 * @param {Object} gameState - Estado final del juego
 * @param {string} difficulty - Nivel de dificultad
 * @returns {Object} Desglose de puntuación
 */
export const calculateFinalScore = (gameState, difficulty) => {
  const difficultyConfig = DIFFICULTY_LEVELS[difficulty.toUpperCase()];
  const timeLimit = difficultyConfig?.timeLimit || 180;
  
  const baseScore = gameState.score || 0;
  const timeBonus = calculateTimeBonus(gameState.timeElapsed, timeLimit);
  const hintPenalty = gameState.hintsUsed * SCORING_CONFIG.HINT_PENALTY;
  const wrongPenalty = gameState.wrongAttempts * SCORING_CONFIG.WRONG_ATTEMPT_PENALTY;
  const perfectGameBonus = gameState.wrongAttempts === 0 ? SCORING_CONFIG.PERFECT_GAME_BONUS : 0;
  
  const finalScore = Math.max(0, baseScore + timeBonus + perfectGameBonus - hintPenalty - wrongPenalty);
  
  return {
    baseScore,
    timeBonus,
    perfectGameBonus,
    hintPenalty,
    wrongPenalty,
    finalScore,
    breakdown: {
      'Puntos de emparejamiento': baseScore,
      'Bonus por tiempo': timeBonus,
      'Bonus por juego perfecto': perfectGameBonus,
      'Penalización por pistas': -hintPenalty,
      'Penalización por errores': -wrongPenalty,
    }
  };
};

/**
 * Obtiene un mensaje de feedback aleatorio
 * @param {string} type - Tipo de feedback (CORRECT, WRONG, STREAK, HINT_USED)
 * @returns {string} Mensaje de feedback
 */
export const getFeedbackMessage = (type) => {
  const messages = FEEDBACK_MESSAGES[type];
  if (!messages || messages.length === 0) return '';
  
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

/**
 * Selecciona una pista para mostrar al usuario
 * @param {Array} items - Elementos no emparejados
 * @param {Array} matchedPairs - Pares ya emparejados
 * @returns {Object|null} Par de elementos que forman una pista
 */
export const selectHint = (items, matchedPairs) => {
  // Filtrar elementos que no han sido emparejados
  const unmatchedItems = items.filter(item => !matchedPairs.includes(item.pairId));
  
  if (unmatchedItems.length < 2) return null;
  
  // Buscar un par que pueda formar una pista
  for (let i = 0; i < unmatchedItems.length; i++) {
    const item1 = unmatchedItems[i];
    for (let j = i + 1; j < unmatchedItems.length; j++) {
      const item2 = unmatchedItems[j];
      if (areItemsMatched(item1, item2)) {
        return { item1, item2 };
      }
    }
  }
  
  return null;
};

/**
 * Formatea el tiempo en formato MM:SS
 * @param {number} seconds - Tiempo en segundos
 * @returns {string} Tiempo formateado
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Obtiene estadísticas de rendimiento del juego
 * @param {Object} gameState - Estado del juego
 * @param {string} difficulty - Nivel de dificultad
 * @returns {Object} Estadísticas de rendimiento
 */
export const getPerformanceStats = (gameState, difficulty) => {
  const difficultyConfig = DIFFICULTY_LEVELS[difficulty.toUpperCase()];
  const totalPairs = difficultyConfig?.pairs || 0;
  const accuracy = totalPairs > 0 ? ((totalPairs - gameState.wrongAttempts) / totalPairs) * 100 : 0;
  const timeLimit = difficultyConfig?.timeLimit || 180;
  const timeEfficiency = gameState.timeElapsed > 0 ? (timeLimit / gameState.timeElapsed) * 100 : 0;
  
  return {
    accuracy: Math.round(accuracy),
    timeEfficiency: Math.round(Math.min(timeEfficiency, 100)),
    perfectGame: gameState.wrongAttempts === 0,
    hintsUsed: gameState.hintsUsed,
    maxStreak: gameState.maxStreak,
    averageTimePerMatch: totalPairs > 0 ? Math.round(gameState.timeElapsed / totalPairs) : 0,
  };
};

/**
 * Determina el nivel de rendimiento basado en las estadísticas
 * @param {Object} stats - Estadísticas de rendimiento
 * @returns {Object} Nivel de rendimiento con detalles
 */
export const getPerformanceLevel = (stats) => {
  if (stats.perfectGame && stats.timeEfficiency >= 80) {
    return {
      level: 'Maestro',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      icon: '👑',
      description: 'Rendimiento excepcional'
    };
  }
  
  if (stats.accuracy >= 90 && stats.timeEfficiency >= 60) {
    return {
      level: 'Experto',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: '🌟',
      description: 'Excelente precisión y velocidad'
    };
  }
  
  if (stats.accuracy >= 75) {
    return {
      level: 'Competente',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: '✅',
      description: 'Buen desempeño general'
    };
  }
  
  if (stats.accuracy >= 50) {
    return {
      level: 'Principiante',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      icon: '📚',
      description: 'En proceso de aprendizaje'
    };
  }
  
  return {
    level: 'Novato',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: '🌱',
    description: 'Sigue practicando'
  };
};

/**
 * Obtiene una descripción del tipo de emparejamiento
 * @param {string} matchingType - Tipo de emparejamiento
 * @returns {Object} Configuración del tipo de emparejamiento
 */
export const getMatchingTypeInfo = (matchingType) => {
  return MATCHING_TYPE_CONFIG[matchingType] || {
    name: 'Emparejamiento General',
    description: 'Conecta elementos relacionados',
    icon: '🔗',
    color: 'bg-gray-500',
  };
};

/**
 * Valida la configuración del juego
 * @param {Object} config - Configuración del juego
 * @returns {Object} Configuración validada
 */
export const validateGameConfig = (config) => {
  const validDifficulties = Object.keys(DIFFICULTY_LEVELS);
  const validMatchingTypes = Object.keys(MATCHING_TYPES);
  
  return {
    difficulty: validDifficulties.includes(config.difficulty?.toUpperCase()) ? 
      config.difficulty : 'medium',
    matchingType: validMatchingTypes.includes(config.matchingType) ? 
      config.matchingType : null,
    timeLimit: Math.max(30, Math.min(600, config.timeLimit || 180)),
    hintsAllowed: Math.max(0, Math.min(5, config.hintsAllowed || 2)),
  };
};