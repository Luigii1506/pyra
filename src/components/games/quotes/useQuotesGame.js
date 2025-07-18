/**
 * useQuotesGame Hook
 * Custom hook for managing historical quotes game state and logic
 * @created 2024-12-19
 */

import { useState, useEffect, useCallback } from "react";

const useQuotesGame = (customQuotes = []) => {
  const [gameState, setGameState] = useState("setup"); // setup, playing, paused, completed
  const [gameMode, setGameMode] = useState("quote-to-person"); // quote-to-person, person-to-quote
  const [quotes, setQuotes] = useState([]); // All available quotes
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hints, setHints] = useState(3);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionTimeLimit, setQuestionTimeLimit] = useState(30);
  const [currentQuestionTime, setCurrentQuestionTime] = useState(30);
  const [gameResults, setGameResults] = useState([]);

  // Historical quotes database
  const defaultQuotes = [
    {
      id: 1,
      quote: "Llegué, vi, vencí",
      originalQuote: "Veni, vidi, vici",
      author: "Julio César",
      period: "República Romana",
      context: "Tras su victoria en la batalla de Zela en el 47 a.C.",
      category: "militar",
      difficulty: "easy",
      tags: ["roma", "guerra", "victoria"],
    },
    {
      id: 2,
      quote: "Dadme un punto de apoyo y moveré el mundo",
      originalQuote: "Δῶς μοι πᾶ στῶ καὶ τὰν γᾶν κινάσω",
      author: "Arquímedes",
      period: "Grecia Helenística",
      context: "Explicando el principio de la palanca",
      category: "filosofía",
      difficulty: "medium",
      tags: ["grecia", "ciencia", "física"],
    },
    {
      id: 3,
      quote: "Solo sé que no sé nada",
      originalQuote: "Οἶδα οὐκ εἰδώς",
      author: "Sócrates",
      period: "Grecia Clásica",
      context: "Reflexión sobre el conocimiento y la sabiduría",
      category: "filosofía",
      difficulty: "easy",
      tags: ["grecia", "filosofía", "conocimiento"],
    },
    {
      id: 4,
      quote: "El hombre es un animal político",
      originalQuote: "ὁ ἄνθρωπος φύσει πολιτικὸν ζῷον",
      author: "Aristóteles",
      period: "Grecia Clásica",
      context: "De su obra 'Política'",
      category: "filosofía",
      difficulty: "medium",
      tags: ["grecia", "política", "sociedad"],
    },
    {
      id: 5,
      quote: "La suerte favorece a los audaces",
      originalQuote: "Audentes fortuna iuvat",
      author: "Virgilio",
      period: "Imperio Romano",
      context: "De la Eneida",
      category: "literatura",
      difficulty: "medium",
      tags: ["roma", "literatura", "valor"],
    },
    {
      id: 6,
      quote: "Conócete a ti mismo",
      originalQuote: "Γνῶθι σεαυτόν",
      author: "Oráculo de Delfos",
      period: "Grecia Arcaica",
      context: "Inscripción en el templo de Apolo en Delfos",
      category: "religioso",
      difficulty: "easy",
      tags: ["grecia", "religión", "autoconocimiento"],
    },
    {
      id: 7,
      quote: "El río no puede volver atrás",
      originalQuote:
        "Ποταμοῖσι τοῖσιν αὐτοῖσιν ἐμβαίνουσιν ἕτερα καὶ ἕτερα ὕδατα ἐπιρρεῖ",
      author: "Heráclito",
      period: "Grecia Arcaica",
      context: "Sobre el cambio constante de la naturaleza",
      category: "filosofía",
      difficulty: "hard",
      tags: ["grecia", "filosofía", "cambio"],
    },
    {
      id: 8,
      quote: "Prefiero ser el primero en una aldea que el segundo en Roma",
      originalQuote: "Malo esse primus in vico quam secundus Romae",
      author: "Julio César",
      period: "República Romana",
      context: "Sobre ambición y liderazgo",
      category: "político",
      difficulty: "hard",
      tags: ["roma", "ambición", "liderazgo"],
    },
    {
      id: 9,
      quote: "La experiencia es la madre de toda ciencia",
      originalQuote: "Experientia mater scientiarum",
      author: "Aristóteles",
      period: "Grecia Clásica",
      context: "Sobre el método científico",
      category: "filosofía",
      difficulty: "medium",
      tags: ["grecia", "ciencia", "conocimiento"],
    },
    {
      id: 10,
      quote: "No seré exhibida en su triunfo romano",
      originalQuote: "Non in Romano triumpho exhibebor",
      author: "Cleopatra VII",
      period: "Egipto Ptolemaico",
      context: "Antes de su suicidio para evitar ser humillada",
      category: "político",
      difficulty: "medium",
      tags: ["egipto", "política", "dignidad"],
    },
    {
      id: 11,
      quote: "En el río de la vida, nada es permanente excepto el cambio",
      originalQuote: "Πάντα ῥεῖ",
      author: "Heráclito",
      period: "Grecia Arcaica",
      context: "Filosofía sobre la naturaleza del cambio",
      category: "filosofía",
      difficulty: "medium",
      tags: ["grecia", "filosofía", "cambio"],
    },
    {
      id: 12,
      quote: "Un pueblo que no conoce su historia está condenado a repetirla",
      originalQuote: "Historia magistra vitae",
      author: "Marco Tulio Cicerón",
      period: "República Romana",
      context: "Sobre la importancia del estudio histórico",
      category: "histórico",
      difficulty: "hard",
      tags: ["roma", "historia", "aprendizaje"],
    },
  ];

  // Timer effects
  useEffect(() => {
    let interval;
    if (isTimerActive && gameState === "playing") {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
        setCurrentQuestionTime((prev) => {
          if (prev <= 1) {
            // Time's up - auto submit wrong answer
            handleTimeUp();
            return questionTimeLimit;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, gameState]);

  // Shuffle array utility
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Initialize game
  const initializeGame = useCallback(
    (difficulty = "medium", mode = "quote-to-person") => {
      const gameQuotes = customQuotes.length > 0 ? customQuotes : defaultQuotes;

      // Filter by difficulty
      let filteredQuotes = gameQuotes;
      if (difficulty === "easy") {
        filteredQuotes = gameQuotes.filter((q) => q.difficulty === "easy");
      } else if (difficulty === "medium") {
        filteredQuotes = gameQuotes.filter((q) =>
          ["easy", "medium"].includes(q.difficulty)
        );
      }

      // Shuffle and limit quotes
      const shuffledQuotes = shuffleArray(filteredQuotes);
      const selectedQuotes = shuffledQuotes.slice(0, 10);

      setQuotes(selectedQuotes);
      setGameMode(mode);
      setQuestionIndex(0);
      setCurrentQuestion(null);
      setSelectedAnswer(null);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setScore(0);
      setTimeElapsed(0);
      setStreak(0);
      setMaxStreak(0);
      setHints(3);
      setHintsUsed(0);
      setShowAnswer(false);
      setCurrentQuestionTime(questionTimeLimit);
      setGameState("setup");
      setIsTimerActive(false);
      setGameResults([]);
    },
    [customQuotes, shuffleArray, questionTimeLimit]
  );

  // Generate question based on mode
  const generateQuestion = useCallback(
    (quote) => {
      const allAuthors = [...new Set(quotes.map((q) => q.author))];
      const wrongAuthors = allAuthors.filter(
        (author) => author !== quote.author
      );
      const shuffledWrongAuthors = shuffleArray(wrongAuthors).slice(0, 3);
      const allOptions = shuffleArray([quote.author, ...shuffledWrongAuthors]);

      if (gameMode === "quote-to-person") {
        return {
          type: "quote-to-person",
          text: `¿Quién dijo esta frase?`,
          quote: quote.quote,
          originalQuote: quote.originalQuote,
          options: allOptions,
          correctAnswer: quote.author,
          explanation: quote.context,
          period: quote.period,
          category: quote.category,
        };
      } else {
        // person-to-quote mode
        const authorQuotes = quotes.filter((q) => q.author === quote.author);
        const wrongQuotes = quotes
          .filter((q) => q.author !== quote.author)
          .map((q) => q.quote);

        const shuffledWrongQuotes = shuffleArray(wrongQuotes).slice(0, 3);
        const quoteOptions = shuffleArray([
          quote.quote,
          ...shuffledWrongQuotes,
        ]);

        return {
          type: "person-to-quote",
          text: `¿Cuál de estas frases dijo ${quote.author}?`,
          author: quote.author,
          period: quote.period,
          options: quoteOptions,
          correctAnswer: quote.quote,
          explanation: quote.context,
          category: quote.category,
        };
      }
    },
    [gameMode, quotes, shuffleArray]
  );

  // Start game
  const startGame = useCallback(() => {
    if (quotes.length === 0) return;

    const firstQuestion = generateQuestion(quotes[0]);
    setCurrentQuestion(firstQuestion);
    setCurrentQuestionTime(questionTimeLimit);
    setGameState("playing");
    setIsTimerActive(true);
  }, [quotes, generateQuestion, questionTimeLimit]);

  // Pause/Resume game
  const togglePause = useCallback(() => {
    if (gameState === "playing") {
      setGameState("paused");
      setIsTimerActive(false);
    } else if (gameState === "paused") {
      setGameState("playing");
      setIsTimerActive(true);
    }
  }, [gameState]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    if (gameState !== "playing") return;

    setWrongAnswers((prev) => prev + 1);
    setStreak(0);
    setScore((prev) => Math.max(prev - 15, 0));
    setShowAnswer(true);

    // Store result for detailed review (time up = no answer)
    const result = {
      question: currentQuestion,
      selectedAnswer: null,
      isCorrect: false,
      timeUsed: questionTimeLimit,
    };
    setGameResults((prev) => [...prev, result]);

    setTimeout(() => {
      const nextIndex = questionIndex + 1;
      if (nextIndex < quotes.length) {
        setQuestionIndex(nextIndex);
        setCurrentQuestion(generateQuestion(quotes[nextIndex]));
        setSelectedAnswer(null);
        setShowAnswer(false);
        setCurrentQuestionTime(questionTimeLimit);
      } else {
        setGameState("completed");
        setIsTimerActive(false);
      }
    }, 3000);
  }, [
    gameState,
    questionIndex,
    quotes,
    generateQuestion,
    questionTimeLimit,
    currentQuestion,
  ]);

  // Submit answer
  const submitAnswer = useCallback(
    (answer) => {
      if (!currentQuestion || gameState !== "playing" || showAnswer) return;

      setSelectedAnswer(answer);
      const isCorrect = answer === currentQuestion.correctAnswer;

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
        setStreak((prev) => {
          const newStreak = prev + 1;
          setMaxStreak((current) => Math.max(current, newStreak));
          return newStreak;
        });

        // Calculate score based on time remaining, streak, and hints used
        const timeBonus = Math.round(
          (currentQuestionTime / questionTimeLimit) * 50
        );
        const streakBonus = streak * 15;
        const hintPenalty = hintsUsed * 10;
        const baseScore = 100;
        const questionScore = baseScore + timeBonus + streakBonus - hintPenalty;

        setScore((prev) => prev + Math.max(questionScore, 25));
      } else {
        setWrongAnswers((prev) => prev + 1);
        setStreak(0);
        setScore((prev) => Math.max(prev - 15, 0));
      }

      setShowAnswer(true);

      // Store result for detailed review
      const result = {
        question: currentQuestion,
        selectedAnswer: answer,
        isCorrect: isCorrect,
        timeUsed: questionTimeLimit - currentQuestionTime,
      };
      setGameResults((prev) => [...prev, result]);

      // Move to next question after delay
      setTimeout(() => {
        const nextIndex = questionIndex + 1;
        if (nextIndex < quotes.length) {
          setQuestionIndex(nextIndex);
          setCurrentQuestion(generateQuestion(quotes[nextIndex]));
          setSelectedAnswer(null);
          setShowAnswer(false);
          setCurrentQuestionTime(questionTimeLimit);
        } else {
          setGameState("completed");
          setIsTimerActive(false);
        }
      }, 3000);
    },
    [
      currentQuestion,
      gameState,
      showAnswer,
      currentQuestionTime,
      questionTimeLimit,
      streak,
      hintsUsed,
      questionIndex,
      quotes,
      generateQuestion,
    ]
  );

  // Use hint
  const useHint = useCallback(() => {
    if (hints <= 0 || !currentQuestion || gameState !== "playing" || showAnswer)
      return null;

    setHints((prev) => prev - 1);
    setHintsUsed((prev) => prev + 1);

    // Remove one wrong option
    const wrongOptions = currentQuestion.options.filter(
      (opt) => opt !== currentQuestion.correctAnswer
    );
    const eliminateOption =
      wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

    return {
      type: "eliminate",
      text: `Esta opción es incorrecta: "${eliminateOption}"`,
      eliminate: eliminateOption,
      context: `Pista adicional: ${currentQuestion.explanation}`,
    };
  }, [hints, currentQuestion, gameState, showAnswer]);

  // Reset game
  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Get game statistics
  const getStatistics = useCallback(() => {
    const totalQuestions = correctAnswers + wrongAnswers;
    const accuracy =
      totalQuestions === 0
        ? 0
        : Math.round((correctAnswers / totalQuestions) * 100);

    const averageTimePerQuestion =
      totalQuestions > 0 ? Math.round(timeElapsed / totalQuestions) : 0;

    return {
      score,
      timeElapsed,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      accuracy,
      maxStreak,
      hintsUsed,
      averageTimePerQuestion,
      completed: gameState === "completed",
      questionsRemaining: quotes.length - questionIndex,
      gameMode,
    };
  }, [
    score,
    timeElapsed,
    correctAnswers,
    wrongAnswers,
    maxStreak,
    hintsUsed,
    gameState,
    quotes.length,
    questionIndex,
    gameMode,
  ]);

  // Format time
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    // Game state
    gameState,
    gameMode,
    quotes,
    currentQuestion,
    questionIndex,
    selectedAnswer,
    correctAnswers,
    wrongAnswers,
    score,
    timeElapsed,
    currentQuestionTime,
    questionTimeLimit,
    streak,
    maxStreak,
    hints,
    hintsUsed,
    showAnswer,
    gameResults,

    // Actions
    initializeGame,
    startGame,
    togglePause,
    submitAnswer,
    useHint,
    resetGame,

    // Utilities
    getStatistics,
    formatTime,

    // Computed values
    isCompleted: gameState === "completed",
    progress: quotes.length > 0 ? (questionIndex / quotes.length) * 100 : 0,
    currentQuote: currentQuestion?.quote || currentQuestion?.author,
  };
};

export default useQuotesGame;
