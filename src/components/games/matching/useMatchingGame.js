/**
 * useMatchingGame Hook
 * Hook personalizado para manejar la lógica del juego de emparejamiento histórico
 * @created 2024-12-19
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  selectPairsForDifficulty,
  convertPairsToItems,
  areItemsMatched,
  calculateMatchScore,
  calculateFinalScore,
  getFeedbackMessage,
  selectHint,
  getPerformanceStats,
  getPerformanceLevel,
  validateGameConfig,
  shuffleArray
} from './utils/matching-utils.js';
import { 
  MATCHING_GAME_STATES, 
  DIFFICULTY_LEVELS,
  CARD_STATES,
  FEEDBACK_CONFIG 
} from './constants/matching-constants.js';

/**
 * Hook principal para el juego de emparejamiento
 * @param {Object} options - Opciones de configuración
 * @returns {Object} Estado y funciones del juego
 */
export const useMatchingGame = (options = {}) => {
  // Configuración inicial validada
  const config = useMemo(() => validateGameConfig(options), [options]);

  // Estados principales del juego
  const [gameState, setGameState] = useState(MATCHING_GAME_STATES.SETUP);
  const [difficulty, setDifficulty] = useState(config.difficulty);
  const [matchingType, setMatchingType] = useState(config.matchingType);
  const [pairs, setPairs] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [cardStates, setCardStates] = useState({});
  
  // Estados de puntuación y estadísticas
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintsAvailable, setHintsAvailable] = useState(config.hintsAllowed);
  
  // Estados de tiempo
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeLimit, setTimeLimit] = useState(config.timeLimit);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Estados de feedback y UI
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Configuración actual de dificultad
   */
  const difficultyConfig = useMemo(() => {
    return DIFFICULTY_LEVELS[difficulty.toUpperCase()] || DIFFICULTY_LEVELS.MEDIUM;
  }, [difficulty]);

  /**
   * Progreso del juego
   */
  const progress = useMemo(() => {
    const totalPairs = difficultyConfig.pairs;
    const completedPairs = matchedPairs.length;
    const percentage = totalPairs > 0 ? (completedPairs / totalPairs) * 100 : 0;
    
    return {
      completed: completedPairs,
      total: totalPairs,
      percentage: Math.round(percentage),
      remaining: totalPairs - completedPairs,
    };
  }, [matchedPairs.length, difficultyConfig.pairs]);

  /**
   * Estadísticas de rendimiento en tiempo real
   */
  const performanceStats = useMemo(() => {
    return getPerformanceStats({
      wrongAttempts,
      hintsUsed,
      maxStreak,
      timeElapsed
    }, difficulty);
  }, [wrongAttempts, hintsUsed, maxStreak, timeElapsed, difficulty]);

  /**
   * Timer del juego
   */
  useEffect(() => {
    let interval;
    
    if (isTimerActive && gameState === MATCHING_GAME_STATES.PLAYING) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          
          // Verificar si se acabó el tiempo
          if (newTime >= timeLimit) {
            completeGame(true); // true = por tiempo agotado
            return prev;
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, gameState, timeLimit]);

  /**
   * Inicializa un nuevo juego
   */
  const initializeGame = useCallback(async (newDifficulty = difficulty, newMatchingType = matchingType) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validar y establecer configuración
      const newDifficultyConfig = DIFFICULTY_LEVELS[newDifficulty.toUpperCase()];
      if (!newDifficultyConfig) {
        throw new Error(`Dificultad no válida: ${newDifficulty}`);
      }
      
      setDifficulty(newDifficulty);
      setMatchingType(newMatchingType);
      setTimeLimit(newDifficultyConfig.timeLimit);
      setHintsAvailable(newDifficultyConfig.hintsAllowed);
      
      // Seleccionar pares para el juego
      const selectedPairs = selectPairsForDifficulty(newDifficulty, newMatchingType);
      if (selectedPairs.length < newDifficultyConfig.pairs) {
        throw new Error('No hay suficientes pares disponibles para esta configuración');
      }
      
      // Convertir pares a elementos individuales
      const gameItems = convertPairsToItems(selectedPairs);
      
      // Resetear estados
      setPairs(selectedPairs);
      setItems(gameItems);
      setSelectedItems([]);
      setMatchedPairs([]);
      setCardStates({});
      setScore(0);
      setStreak(0);
      setMaxStreak(0);
      setWrongAttempts(0);
      setHintsUsed(0);
      setTimeElapsed(0);
      setFeedback('');
      setShowHint(null);
      setIsTimerActive(false);
      setGameState(MATCHING_GAME_STATES.SETUP);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [difficulty, matchingType]);

  /**
   * Inicia el juego
   */
  const startGame = useCallback(() => {
    setGameState(MATCHING_GAME_STATES.PLAYING);
    setIsTimerActive(true);
    setFeedback('¡Encuentra los pares! Haz clic en dos elementos relacionados.');
  }, []);

  /**
   * Pausa o reanuda el juego
   */
  const togglePause = useCallback(() => {
    if (gameState === MATCHING_GAME_STATES.PLAYING) {
      setGameState(MATCHING_GAME_STATES.PAUSED);
      setIsTimerActive(false);
    } else if (gameState === MATCHING_GAME_STATES.PAUSED) {
      setGameState(MATCHING_GAME_STATES.PLAYING);
      setIsTimerActive(true);
    }
  }, [gameState]);

  /**
   * Selecciona un elemento para emparejar
   */
  const selectItem = useCallback((item) => {
    if (gameState !== MATCHING_GAME_STATES.PLAYING) return;
    if (matchedPairs.includes(item.pairId)) return;
    if (selectedItems.find(selected => selected.id === item.id)) return;
    
    const newSelectedItems = [...selectedItems, item];
    setSelectedItems(newSelectedItems);
    
    // Actualizar estado visual del elemento
    setCardStates(prev => ({
      ...prev,
      [item.id]: CARD_STATES.SELECTED
    }));
    
    // Si seleccionamos 2 elementos, verificar emparejamiento
    if (newSelectedItems.length === 2) {
      setTimeout(() => {
        checkMatch(newSelectedItems[0], newSelectedItems[1]);
      }, 300); // Pequeño delay para mejor UX
    }
  }, [gameState, matchedPairs, selectedItems]);

  /**
   * Verifica si dos elementos forman un par correcto
   */
  const checkMatch = useCallback((item1, item2) => {
    const isMatch = areItemsMatched(item1, item2);
    
    if (isMatch) {
      // Emparejamiento correcto
      const newMatchedPairs = [...matchedPairs, item1.pairId];
      const newStreak = streak + 1;
      const newMaxStreak = Math.max(maxStreak, newStreak);
      const matchScore = calculateMatchScore({ streak: newStreak }, difficulty);
      
      setMatchedPairs(newMatchedPairs);
      setStreak(newStreak);
      setMaxStreak(newMaxStreak);
      setScore(prev => prev + matchScore);
      setFeedback(getFeedbackMessage(newStreak > 3 ? 'STREAK' : 'CORRECT'));
      
      // Actualizar estados visuales
      setCardStates(prev => ({
        ...prev,
        [item1.id]: CARD_STATES.MATCHED,
        [item2.id]: CARD_STATES.MATCHED
      }));
      
      // Verificar si el juego se completó
      if (newMatchedPairs.length === difficultyConfig.pairs) {
        setTimeout(() => completeGame(false), FEEDBACK_CONFIG.GAME_COMPLETE_DELAY);
      }
      
    } else {
      // Emparejamiento incorrecto
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      setStreak(0);
      setFeedback(getFeedbackMessage('WRONG'));
      
      // Mostrar error visual temporal
      setCardStates(prev => ({
        ...prev,
        [item1.id]: CARD_STATES.WRONG,
        [item2.id]: CARD_STATES.WRONG
      }));
      
      // Volver al estado normal después del feedback
      setTimeout(() => {
        setCardStates(prev => ({
          ...prev,
          [item1.id]: CARD_STATES.IDLE,
          [item2.id]: CARD_STATES.IDLE
        }));
      }, FEEDBACK_CONFIG.WRONG_ANIMATION_DURATION);
    }
    
    // Limpiar selección
    setSelectedItems([]);
    
    // Limpiar feedback después de un tiempo
    setTimeout(() => {
      setFeedback('');
    }, 2000);
    
  }, [matchedPairs, streak, maxStreak, wrongAttempts, difficulty, difficultyConfig.pairs]);

  /**
   * Usa una pista
   */
  const useHint = useCallback(() => {
    if (hintsAvailable <= 0 || gameState !== MATCHING_GAME_STATES.PLAYING) {
      return null;
    }
    
    const hint = selectHint(items, matchedPairs);
    if (!hint) {
      setFeedback('No hay pistas disponibles en este momento');
      return null;
    }
    
    const newHintsUsed = hintsUsed + 1;
    const newHintsAvailable = hintsAvailable - 1;
    
    setHintsUsed(newHintsUsed);
    setHintsAvailable(newHintsAvailable);
    setShowHint(hint);
    setFeedback(getFeedbackMessage('HINT_USED'));
    
    // Mostrar pista visualmente
    setCardStates(prev => ({
      ...prev,
      [hint.item1.id]: CARD_STATES.HINT,
      [hint.item2.id]: CARD_STATES.HINT
    }));
    
    // Ocultar pista después de un tiempo
    setTimeout(() => {
      setShowHint(null);
      setCardStates(prev => ({
        ...prev,
        [hint.item1.id]: CARD_STATES.IDLE,
        [hint.item2.id]: CARD_STATES.IDLE
      }));
    }, FEEDBACK_CONFIG.HINT_DISPLAY_DURATION);
    
    return hint;
  }, [hintsAvailable, gameState, items, matchedPairs, hintsUsed]);

  /**
   * Completa el juego
   */
  const completeGame = useCallback((timeUp = false) => {
    setIsTimerActive(false);
    setGameState(MATCHING_GAME_STATES.COMPLETED);
    
    if (timeUp) {
      setFeedback('¡Tiempo agotado! Pero has hecho un gran esfuerzo.');
    } else {
      setFeedback('¡Felicitaciones! Has completado todos los pares.');
    }
  }, []);

  /**
   * Reinicia el juego con la misma configuración
   */
  const restartGame = useCallback(() => {
    initializeGame(difficulty, matchingType);
  }, [initializeGame, difficulty, matchingType]);

  /**
   * Obtiene el resultado final del juego
   */
  const getFinalResults = useCallback(() => {
    if (gameState !== MATCHING_GAME_STATES.COMPLETED) return null;
    
    const finalScore = calculateFinalScore({
      score,
      timeElapsed,
      hintsUsed,
      wrongAttempts
    }, difficulty);
    
    const stats = getPerformanceStats({
      wrongAttempts,
      hintsUsed,
      maxStreak,
      timeElapsed
    }, difficulty);
    
    const performanceLevel = getPerformanceLevel(stats);
    
    return {
      ...finalScore,
      stats,
      performanceLevel,
      gameCompleted: matchedPairs.length === difficultyConfig.pairs,
      timeUsed: timeElapsed,
      timeLimit,
      difficulty,
      matchingType,
    };
  }, [gameState, score, timeElapsed, hintsUsed, wrongAttempts, difficulty, 
      matchedPairs.length, difficultyConfig.pairs, maxStreak, timeLimit, matchingType]);

  /**
   * Obtiene el estado visual de un elemento
   */
  const getCardState = useCallback((itemId) => {
    return cardStates[itemId] || CARD_STATES.IDLE;
  }, [cardStates]);

  // Inicialización automática
  useEffect(() => {
    initializeGame();
  }, []);

  return {
    // Estados principales
    gameState,
    difficulty,
    matchingType,
    pairs,
    items,
    selectedItems,
    matchedPairs,
    isLoading,
    error,
    
    // Estados de puntuación
    score,
    streak,
    maxStreak,
    wrongAttempts,
    hintsUsed,
    hintsAvailable,
    
    // Estados de tiempo
    timeElapsed,
    timeLimit,
    isTimerActive,
    
    // Estados de UI
    feedback,
    showHint,
    progress,
    performanceStats,
    difficultyConfig,
    
    // Acciones principales
    initializeGame,
    startGame,
    togglePause,
    selectItem,
    useHint,
    restartGame,
    completeGame,
    
    // Funciones de consulta
    getFinalResults,
    getCardState,
    
    // Estados computados
    canStart: gameState === MATCHING_GAME_STATES.SETUP && items.length > 0,
    canPause: gameState === MATCHING_GAME_STATES.PLAYING,
    canResume: gameState === MATCHING_GAME_STATES.PAUSED,
    canUseHint: hintsAvailable > 0 && gameState === MATCHING_GAME_STATES.PLAYING,
    isGameActive: gameState === MATCHING_GAME_STATES.PLAYING,
    isGameComplete: gameState === MATCHING_GAME_STATES.COMPLETED,
    hasError: !!error,
  };
};

export default useMatchingGame;