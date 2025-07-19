/**
 * useFlashcardsGame Hook
 * Hook personalizado para manejar la lógica del juego de flashcards con algoritmo SM-2
 * @created 2024-12-19
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  calculateNextReview,
  createStudySession,
  calculateDeckStats,
  isCardDue 
} from './utils/sm2-algorithm.js';
import { 
  validateSessionLimits,
  generateSessionReport,
  getMotivationalMessage,
  estimateSessionTime 
} from './utils/flashcards-utils.js';
import { 
  FLASHCARD_GAME_STATES, 
  ANSWER_TYPES,
  SESSION_CONFIG 
} from './constants/flashcards-constants.js';

/**
 * Hook principal para el juego de flashcards
 * @param {Object} initialDecks - Mazos iniciales
 * @param {Object} options - Opciones de configuración
 * @returns {Object} Estado y funciones del juego
 */
export const useFlashcardsGame = (initialDecks = [], options = {}) => {
  // Estados principales
  const [gameState, setGameState] = useState(FLASHCARD_GAME_STATES.DECK_SELECTION);
  const [decks, setDecks] = useState(initialDecks);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionCards, setSessionCards] = useState([]);
  const [studiedCards, setStudiedCards] = useState([]);
  
  // Configuración de sesión
  const [sessionLimits, setSessionLimits] = useState({
    newCardsLimit: SESSION_CONFIG.DEFAULT_NEW_CARDS_LIMIT,
    reviewCardsLimit: SESSION_CONFIG.DEFAULT_REVIEW_CARDS_LIMIT,
    timeLimit: SESSION_CONFIG.DEFAULT_SESSION_TIME_LIMIT,
    ...options.sessionLimits
  });
  
  // Estadísticas de sesión
  const [sessionStats, setSessionStats] = useState({
    startTime: null,
    cardsStudied: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    streakCount: 0,
    longestStreak: 0,
    answers: [],
  });
  
  // Estados de UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Estadísticas computadas del mazo seleccionado
   */
  const deckStats = useMemo(() => {
    if (!selectedDeck) return null;
    return calculateDeckStats(selectedDeck.cards);
  }, [selectedDeck]);

  /**
   * Tarjeta actual de la sesión
   */
  const sessionCard = useMemo(() => {
    if (sessionCards.length === 0 || currentCardIndex >= sessionCards.length) {
      return null;
    }
    return sessionCards[currentCardIndex];
  }, [sessionCards, currentCardIndex]);

  /**
   * Progreso de la sesión
   */
  const sessionProgress = useMemo(() => {
    if (sessionCards.length === 0) return { percentage: 0, current: 0, total: 0 };
    
    return {
      percentage: Math.round((currentCardIndex / sessionCards.length) * 100),
      current: currentCardIndex + 1,
      total: sessionCards.length,
    };
  }, [sessionCards.length, currentCardIndex]);

  /**
   * Tiempo estimado restante
   */
  const estimatedTimeRemaining = useMemo(() => {
    const remainingCards = sessionCards.slice(currentCardIndex);
    return estimateSessionTime(remainingCards);
  }, [sessionCards, currentCardIndex]);

  /**
   * Selecciona un mazo para estudiar
   */
  const selectDeck = useCallback((deck) => {
    try {
      setIsLoading(true);
      setError(null);
      setSelectedDeck(deck);
      
      // Crear sesión de estudio
      const validatedLimits = validateSessionLimits(sessionLimits);
      const session = createStudySession(deck.cards, validatedLimits);
      
      if (session.length === 0) {
        setError('No hay tarjetas disponibles para estudiar en este momento.');
        setGameState(FLASHCARD_GAME_STATES.DECK_SELECTION);
        return;
      }
      
      setSessionCards(session);
      setCurrentCardIndex(0);
      setCurrentCard(session[0]);
      setShowAnswer(false);
      setGameState(FLASHCARD_GAME_STATES.CARD_FRONT);
      
      // Inicializar estadísticas de sesión
      setSessionStats({
        startTime: new Date(),
        cardsStudied: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        streakCount: 0,
        longestStreak: 0,
        answers: [],
      });
      
    } catch (err) {
      setError(`Error al seleccionar el mazo: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [sessionLimits]);

  /**
   * Muestra la respuesta de la tarjeta actual
   */
  const revealAnswer = useCallback(() => {
    if (gameState === FLASHCARD_GAME_STATES.CARD_FRONT) {
      setShowAnswer(true);
      setGameState(FLASHCARD_GAME_STATES.CARD_BACK);
    }
  }, [gameState]);

  /**
   * Procesa la respuesta del usuario
   */
  const answerCard = useCallback(async (answerType) => {
    if (!sessionCard || gameState !== FLASHCARD_GAME_STATES.CARD_BACK) return;
    
    try {
      setIsLoading(true);
      
      // Calcular nueva configuración de la tarjeta usando SM-2
      const updatedCard = calculateNextReview(sessionCard, answerType);
      
      // Actualizar el mazo con la nueva configuración
      const updatedDecks = decks.map(deck => {
        if (deck.id === selectedDeck.id) {
          return {
            ...deck,
            cards: deck.cards.map(card => 
              card.id === updatedCard.id ? updatedCard : card
            )
          };
        }
        return deck;
      });
      
      setDecks(updatedDecks);
      
      // Actualizar mazo seleccionado
      const updatedSelectedDeck = updatedDecks.find(deck => deck.id === selectedDeck.id);
      setSelectedDeck(updatedSelectedDeck);
      
      // Actualizar estadísticas de sesión
      const isCorrect = answerType === ANSWER_TYPES.GOOD || answerType === ANSWER_TYPES.EASY;
      const newStreak = isCorrect ? sessionStats.streakCount + 1 : 0;
      
      const newSessionStats = {
        ...sessionStats,
        cardsStudied: sessionStats.cardsStudied + 1,
        correctAnswers: sessionStats.correctAnswers + (isCorrect ? 1 : 0),
        totalAnswers: sessionStats.totalAnswers + 1,
        streakCount: newStreak,
        longestStreak: Math.max(sessionStats.longestStreak, newStreak),
        answers: [...sessionStats.answers, {
          cardId: sessionCard.id,
          type: answerType,
          timestamp: new Date(),
          timeSpent: 0, // Podríamos agregar tracking de tiempo
        }],
      };
      
      setSessionStats(newSessionStats);
      setStudiedCards([...studiedCards, updatedCard]);
      
      // Avanzar a la siguiente tarjeta
      await nextCard();
      
    } catch (err) {
      setError(`Error al procesar la respuesta: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [sessionCard, gameState, decks, selectedDeck, sessionStats, studiedCards]);

  /**
   * Avanza a la siguiente tarjeta
   */
  const nextCard = useCallback(async () => {
    const nextIndex = currentCardIndex + 1;
    
    if (nextIndex >= sessionCards.length) {
      // Sesión completada
      setGameState(FLASHCARD_GAME_STATES.SESSION_COMPLETE);
      return;
    }
    
    setCurrentCardIndex(nextIndex);
    setCurrentCard(sessionCards[nextIndex]);
    setShowAnswer(false);
    setGameState(FLASHCARD_GAME_STATES.CARD_FRONT);
  }, [currentCardIndex, sessionCards]);

  /**
   * Reinicia el juego al estado inicial
   */
  const resetGame = useCallback(() => {
    setGameState(FLASHCARD_GAME_STATES.DECK_SELECTION);
    setSelectedDeck(null);
    setCurrentCard(null);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setSessionCards([]);
    setStudiedCards([]);
    setSessionStats({
      startTime: null,
      cardsStudied: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      streakCount: 0,
      longestStreak: 0,
      answers: [],
    });
    setError(null);
  }, []);

  /**
   * Actualiza los límites de sesión
   */
  const updateSessionLimits = useCallback((newLimits) => {
    const validated = validateSessionLimits(newLimits);
    setSessionLimits(validated);
  }, []);

  /**
   * Genera reporte final de la sesión
   */
  const generateFinalReport = useCallback(() => {
    if (gameState !== FLASHCARD_GAME_STATES.SESSION_COMPLETE) return null;
    
    const endTime = new Date();
    const initialDeckState = selectedDeck?.cards || [];
    const finalDeckState = decks.find(d => d.id === selectedDeck?.id)?.cards || [];
    
    return generateSessionReport({
      cardsStudied: studiedCards,
      answers: sessionStats.answers,
      startTime: sessionStats.startTime,
      endTime,
      initialDeckState,
      finalDeckState,
    });
  }, [gameState, selectedDeck, decks, studiedCards, sessionStats]);

  /**
   * Obtiene mensaje motivacional
   */
  const motivationalMessage = useMemo(() => {
    return getMotivationalMessage(sessionStats);
  }, [sessionStats]);

  // Effect para manejar cambios en el estado del juego
  useEffect(() => {
    if (error) {
      console.error('Flashcards Game Error:', error);
    }
  }, [error]);

  return {
    // Estados principales
    gameState,
    selectedDeck,
    currentCard: sessionCard,
    showAnswer,
    isLoading,
    error,
    
    // Datos de sesión
    sessionCards,
    studiedCards,
    sessionStats,
    sessionProgress,
    deckStats,
    
    // Configuración
    sessionLimits,
    estimatedTimeRemaining,
    
    // Mensajes y reportes
    motivationalMessage,
    finalReport: generateFinalReport(),
    
    // Acciones principales
    selectDeck,
    revealAnswer,
    answerCard,
    nextCard,
    resetGame,
    updateSessionLimits,
    
    // Estados computados
    canRevealAnswer: gameState === FLASHCARD_GAME_STATES.CARD_FRONT,
    canAnswerCard: gameState === FLASHCARD_GAME_STATES.CARD_BACK,
    isSessionComplete: gameState === FLASHCARD_GAME_STATES.SESSION_COMPLETE,
    hasCards: sessionCards.length > 0,
  };
};