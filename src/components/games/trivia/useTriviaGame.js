/**
 * useTriviaGame Hook
 * Hook personalizado avanzado para manejar el estado del juego de trivia
 * @created 2024-12-19
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  TRIVIA_GAME_STATES,
  DIFFICULTY_LEVELS,
  TRIVIA_CATEGORIES,
  GAME_CONFIG,
  ANSWER_STATES,
} from "./constants/trivia-constants.js";
import {
  calculateQuestionScore,
  calculateFinalScore,
  calculateGameStats,
  validateGameConfig,
  shuffleArray,
  formatTime,
} from "./utils/trivia-utils.js";

const useTriviaGame = (initialConfig = {}) => {
  // ==================== CONFIGURACIÓN INICIAL ====================
  const defaultConfig = {
    questions: [],
    timeLimit: 60,
    category: TRIVIA_CATEGORIES.MIXED,
    difficulty: DIFFICULTY_LEVELS.MEDIUM,
    useBalancedQuestions: true,
    autoPauseOnBlur: GAME_CONFIG.AUTO_PAUSE_ON_BLUR,
    showExplanations: true,
    ...initialConfig,
  };

  // ==================== ESTADOS PRINCIPALES ====================
  const [gameState, setGameState] = useState(TRIVIA_GAME_STATES.SETUP);
  const [gameConfig, setGameConfig] = useState(defaultConfig);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(defaultConfig.timeLimit);
  const [totalTimeUsed, setTotalTimeUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ==================== REFERENCIAS Y TIMERS ====================
  const intervalRef = useRef(null);
  const gameStartTimeRef = useRef(null);
  const questionStartTimeRef = useRef(null);
  const pauseTimeRef = useRef(null);
  const totalPausedTimeRef = useRef(0);

  // ==================== EFECTOS DE GESTIÓN DE TIEMPO ====================

  // Timer principal del juego
  useEffect(() => {
    if (gameState === TRIVIA_GAME_STATES.PLAYING && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Tiempo agotado, finalizar juego
            setGameState(TRIVIA_GAME_STATES.FINISHED);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameState, isPaused, timeLeft]);

  // Auto-pausar cuando la ventana pierde foco
  useEffect(() => {
    if (!gameConfig.autoPauseOnBlur) return;

    const handleVisibilityChange = () => {
      if (document.hidden && gameState === TRIVIA_GAME_STATES.PLAYING) {
        pauseGame();
      }
    };

    const handleBlur = () => {
      if (gameState === TRIVIA_GAME_STATES.PLAYING) {
        pauseGame();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [gameState]);

  // ==================== FUNCIONES DE GESTIÓN DEL JUEGO ====================

  /**
   * Configura e inicia un nuevo juego
   */
  const startGame = useCallback(
    (newConfig = {}) => {
      const finalConfig = { ...defaultConfig, ...newConfig };

      // Validar configuración
      const validation = validateGameConfig(finalConfig);
      if (!validation.isValid) {
        console.error("Configuración de juego inválida:", validation.errors);
        return false;
      }

      // Mezclar preguntas si es necesario
      const shuffledQuestions = shuffleArray([...finalConfig.questions]);

      // Resetear todos los estados
      setGameConfig({ ...finalConfig, questions: shuffledQuestions });
      setGameState(TRIVIA_GAME_STATES.PLAYING);
      setCurrentQuestionIndex(0);
      setTimeLeft(finalConfig.timeLimit);
      setTotalTimeUsed(0);
      setScore(0);
      setAnswers([]);
      setStreak(0);
      setBestStreak(0);
      setIsPaused(false);

      // Resetear referencias de tiempo
      gameStartTimeRef.current = Date.now();
      questionStartTimeRef.current = Date.now();
      totalPausedTimeRef.current = 0;

      return true;
    },
    [defaultConfig]
  );

  /**
   * Pausa el juego
   */
  const pauseGame = useCallback(() => {
    if (gameState !== TRIVIA_GAME_STATES.PLAYING) return;

    setIsPaused(true);
    pauseTimeRef.current = Date.now();
  }, [gameState]);

  /**
   * Reanuda el juego
   */
  const resumeGame = useCallback(() => {
    if (gameState !== TRIVIA_GAME_STATES.PLAYING || !isPaused) return;

    setIsPaused(false);

    // Calcular tiempo pausado
    if (pauseTimeRef.current) {
      const pausedDuration = Date.now() - pauseTimeRef.current;
      totalPausedTimeRef.current += pausedDuration;
      pauseTimeRef.current = null;
    }

    // Ajustar tiempo de inicio de pregunta
    if (questionStartTimeRef.current) {
      questionStartTimeRef.current += Date.now() - pauseTimeRef.current;
    }
  }, [gameState, isPaused]);

  /**
   * Procesa una respuesta del jugador
   */
  const answerQuestion = useCallback(
    (selectedAnswer, timeSpent = null, scoreBreakdown = null) => {
      if (
        gameState !== TRIVIA_GAME_STATES.PLAYING ||
        currentQuestionIndex >= gameConfig.questions.length
      ) {
        return;
      }

      const currentQuestion = gameConfig.questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correct;

      // Calcular tiempo gastado si no se proporciona
      const actualTimeSpent =
        timeSpent !== null
          ? timeSpent
          : Math.floor(
              (Date.now() -
                questionStartTimeRef.current -
                totalPausedTimeRef.current) /
                1000
            );

      // Calcular puntuación si no se proporciona
      const actualScoreBreakdown =
        scoreBreakdown ||
        calculateQuestionScore({
          isCorrect,
          difficulty: currentQuestion.difficulty || gameConfig.difficulty,
          timeSpent: actualTimeSpent,
          timeLimit: gameConfig.timeLimit,
          currentStreak: streak,
          isSkipped: false,
        });

      // Crear objeto de respuesta
      const answerData = {
        questionIndex: currentQuestionIndex,
        question: currentQuestion,
        selectedAnswer,
        correctAnswer: currentQuestion.correct,
        isCorrect,
        timeSpent: actualTimeSpent,
        skipped: false,
        scoreBreakdown: actualScoreBreakdown,
      };

      // Actualizar respuestas
      setAnswers((prev) => [...prev, answerData]);

      // Actualizar puntuación
      setScore((prev) => prev + actualScoreBreakdown.points);

      // Actualizar racha
      if (isCorrect) {
        setStreak((prev) => {
          const newStreak = prev + 1;
          setBestStreak((current) => Math.max(current, newStreak));
          return newStreak;
        });
      } else {
        setStreak(0);
      }

      // Mover a la siguiente pregunta o terminar
      if (currentQuestionIndex + 1 >= gameConfig.questions.length) {
        // Juego terminado
        setGameState(TRIVIA_GAME_STATES.FINISHED);
      } else {
        // Siguiente pregunta
        setCurrentQuestionIndex((prev) => prev + 1);
        questionStartTimeRef.current = Date.now();
        totalPausedTimeRef.current = 0; // Reset para nueva pregunta
      }
    },
    [
      gameState,
      currentQuestionIndex,
      gameConfig.questions,
      gameConfig.difficulty,
      gameConfig.timeLimit,
      streak,
    ]
  );

  /**
   * Salta una pregunta
   */
  const skipQuestion = useCallback(
    (timeSpent = null, scoreBreakdown = null) => {
      if (
        gameState !== TRIVIA_GAME_STATES.PLAYING ||
        currentQuestionIndex >= gameConfig.questions.length
      ) {
        return;
      }

      const currentQuestion = gameConfig.questions[currentQuestionIndex];

      // Calcular tiempo gastado si no se proporciona
      const actualTimeSpent =
        timeSpent !== null
          ? timeSpent
          : Math.floor(
              (Date.now() -
                questionStartTimeRef.current -
                totalPausedTimeRef.current) /
                1000
            );

      // Calcular penalización por saltar
      const actualScoreBreakdown =
        scoreBreakdown ||
        calculateQuestionScore({
          isCorrect: false,
          difficulty: currentQuestion.difficulty || gameConfig.difficulty,
          timeSpent: actualTimeSpent,
          timeLimit: gameConfig.timeLimit,
          currentStreak: streak,
          isSkipped: true,
        });

      // Crear objeto de respuesta
      const answerData = {
        questionIndex: currentQuestionIndex,
        question: currentQuestion,
        selectedAnswer: null,
        correctAnswer: currentQuestion.correct,
        isCorrect: false,
        timeSpent: actualTimeSpent,
        skipped: true,
        scoreBreakdown: actualScoreBreakdown,
      };

      // Actualizar respuestas
      setAnswers((prev) => [...prev, answerData]);

      // Actualizar puntuación (penalización)
      setScore((prev) => prev + actualScoreBreakdown.points);

      // Resetear racha
      setStreak(0);

      // Mover a la siguiente pregunta o terminar
      if (currentQuestionIndex + 1 >= gameConfig.questions.length) {
        setGameState(TRIVIA_GAME_STATES.FINISHED);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        questionStartTimeRef.current = Date.now();
        totalPausedTimeRef.current = 0;
      }
    },
    [
      gameState,
      currentQuestionIndex,
      gameConfig.questions,
      gameConfig.difficulty,
      gameConfig.timeLimit,
      streak,
    ]
  );

  /**
   * Reinicia el juego actual
   */
  const resetGame = useCallback(() => {
    startGame(gameConfig);
  }, [gameConfig, startGame]);

  /**
   * Vuelve a la pantalla de configuración
   */
  const goToSetup = useCallback(() => {
    setGameState(TRIVIA_GAME_STATES.SETUP);
    setCurrentQuestionIndex(0);
    setTimeLeft(gameConfig.timeLimit);
    setTotalTimeUsed(0);
    setScore(0);
    setAnswers([]);
    setStreak(0);
    setIsPaused(false);

    // Limpiar timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [gameConfig.timeLimit]);

  /**
   * Fuerza el final del juego
   */
  const endGame = useCallback(() => {
    setGameState(TRIVIA_GAME_STATES.FINISHED);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // ==================== DATOS COMPUTADOS ====================

  // Pregunta actual
  const currentQuestion = gameConfig.questions[currentQuestionIndex] || null;

  // Estadísticas del juego
  const gameStats = calculateGameStats(
    answers,
    gameStartTimeRef.current
      ? Math.floor(
          (Date.now() - gameStartTimeRef.current - totalPausedTimeRef.current) /
            1000
        )
      : 0,
    gameConfig.questions.length
  );

  // Estado del juego pausado
  const isGamePaused = gameState === TRIVIA_GAME_STATES.PLAYING && isPaused;

  // Progreso del juego
  const progress =
    gameConfig.questions.length > 0
      ? (currentQuestionIndex / gameConfig.questions.length) * 100
      : 0;

  // Tiempo transcurrido desde el inicio
  const timeElapsed = gameStartTimeRef.current
    ? Math.floor(
        (Date.now() - gameStartTimeRef.current - totalPausedTimeRef.current) /
          1000
      )
    : 0;

  // Estadísticas finales (cuando el juego termina)
  const finalStats =
    gameState === TRIVIA_GAME_STATES.FINISHED
      ? {
          ...gameStats,
          finalScore: score,
          totalTimeUsed: timeElapsed,
          isPerfectGame: gameStats.accuracy === 100 && answers.length > 0,
          scoreBreakdown: calculateFinalScore(
            answers,
            gameConfig.questions.length,
            gameStats.accuracy === 100
          ),
        }
      : null;

  // ==================== RETURN DEL HOOK ====================

  return {
    // Estados principales
    gameState,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: gameConfig.questions.length,
    timeLeft,
    timeElapsed,
    score,
    answers,
    streak,
    bestStreak,
    isPaused: isGamePaused,
    progress,

    // Configuración
    gameConfig,

    // Estadísticas
    stats: gameStats,
    finalStats,

    // Acciones principales
    actions: {
      startGame,
      pauseGame,
      resumeGame,
      answerQuestion,
      skipQuestion,
      resetGame,
      goToSetup,
      endGame,
    },

    // Información del estado
    status: {
      isPlaying: gameState === TRIVIA_GAME_STATES.PLAYING && !isPaused,
      isPaused: isGamePaused,
      isFinished: gameState === TRIVIA_GAME_STATES.FINISHED,
      isSetup: gameState === TRIVIA_GAME_STATES.SETUP,
      hasQuestions: gameConfig.questions.length > 0,
      isLastQuestion: currentQuestionIndex >= gameConfig.questions.length - 1,
      timeFormatted: formatTime(timeLeft),
      timeElapsedFormatted: formatTime(timeElapsed),
    },

    // Métodos de utilidad
    utils: {
      formatTime,
      calculateQuestionScore,
      calculateFinalScore,
    },
  };
};

export default useTriviaGame;
