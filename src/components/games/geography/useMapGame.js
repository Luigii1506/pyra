/**
 * useMapGame Hook
 * Custom hook for managing geography game state and logic
 * @created 2024-12-19
 */

import { useState, useEffect, useCallback } from "react";

const useMapGame = (customLocations = []) => {
  const [gameState, setGameState] = useState("setup"); // setup, playing, paused, completed
  const [locations, setLocations] = useState([]); // All available locations
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
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
  const [gameMode, setGameMode] = useState("identify"); // identify, quiz, challenge

  // Sample historical geography data
  const defaultLocations = [
    {
      id: 1,
      name: "Roma",
      coordinates: { x: 50, y: 40 },
      region: "Europa Mediterránea",
      civilization: "Imperio Romano",
      period: "Antigüedad Clásica",
      description: "Capital del Imperio Romano, centro de poder durante siglos",
      facts: [
        "Fundada según la leyenda en 753 a.C.",
        "Centro del imperio más grande del mundo antiguo",
      ],
      difficulty: "easy",
    },
    {
      id: 2,
      name: "Alejandría",
      coordinates: { x: 55, y: 60 },
      region: "Norte de África",
      civilization: "Egipto Ptolemaico",
      period: "Época Helenística",
      description: "Gran centro de aprendizaje y comercio en el mundo antiguo",
      facts: [
        "Hogar de la famosa Biblioteca de Alejandría",
        "Fundada por Alejandro Magno",
      ],
      difficulty: "medium",
    },
    {
      id: 3,
      name: "Atenas",
      coordinates: { x: 52, y: 45 },
      region: "Grecia",
      civilization: "Ciudades-Estado Griegas",
      period: "Antigüedad Clásica",
      description: "Cuna de la democracia y la filosofía occidental",
      facts: ["Birthplace of democracy", "Home to Plato's Academy"],
      difficulty: "easy",
    },
    {
      id: 4,
      name: "Babilonia",
      coordinates: { x: 65, y: 50 },
      region: "Mesopotamia",
      civilization: "Imperio Babilónico",
      period: "Antigüedad",
      description:
        "Antigua ciudad de Mesopotamia, famosa por sus jardines colgantes",
      facts: [
        "Hogar de los Jardines Colgantes",
        "Centro del Código de Hammurabi",
      ],
      difficulty: "medium",
    },
    {
      id: 5,
      name: "Cartago",
      coordinates: { x: 45, y: 55 },
      region: "Norte de África",
      civilization: "Imperio Cartaginés",
      period: "Antigüedad",
      description: "Poderosa ciudad-estado y rival de Roma",
      facts: [
        "Rival principal de Roma en las Guerras Púnicas",
        "Gran potencia comercial marítima",
      ],
      difficulty: "hard",
    },
    {
      id: 6,
      name: "Persépolis",
      coordinates: { x: 75, y: 48 },
      region: "Persia",
      civilization: "Imperio Persa",
      period: "Antigüedad",
      description: "Capital ceremonial del Imperio Persa",
      facts: ["Construida por Darío I", "Destruida por Alejandro Magno"],
      difficulty: "hard",
    },
    {
      id: 7,
      name: "Esparta",
      coordinates: { x: 51, y: 47 },
      region: "Grecia",
      civilization: "Ciudades-Estado Griegas",
      period: "Antigüedad Clásica",
      description: "Ciudad-estado militar griega",
      facts: ["Famosa por su sistema militar", "Rival tradicional de Atenas"],
      difficulty: "medium",
    },
    {
      id: 8,
      name: "Tebas",
      coordinates: { x: 57, y: 62 },
      region: "Egipto",
      civilization: "Antiguo Egipto",
      period: "Imperio Nuevo",
      description: "Capital del Alto Egipto durante el Imperio Nuevo",
      facts: ["Hogar del Valle de los Reyes", "Centro religioso de Amón-Ra"],
      difficulty: "medium",
    },
  ];

  // Quiz questions for different game modes
  const questionTypes = [
    {
      type: "identify",
      question: "Identifica la ubicación de {location} en el mapa",
      points: 100,
    },
    {
      type: "civilization",
      question: "¿Qué civilización controló {location}?",
      points: 80,
    },
    {
      type: "period",
      question: "¿En qué período histórico fue importante {location}?",
      points: 60,
    },
    {
      type: "facts",
      question: "¿Cuál de estos hechos es cierto sobre {location}?",
      points: 70,
    },
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerActive && gameState === "playing") {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
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
    (difficulty = "medium", mode = "identify") => {
      const gameLocations =
        customLocations.length > 0 ? customLocations : defaultLocations;

      // Filter by difficulty
      let filteredLocations = gameLocations;
      if (difficulty === "easy") {
        filteredLocations = gameLocations.filter(
          (loc) => loc.difficulty === "easy"
        );
      } else if (difficulty === "medium") {
        filteredLocations = gameLocations.filter((loc) =>
          ["easy", "medium"].includes(loc.difficulty)
        );
      }

      // Shuffle and limit locations
      const shuffledLocations = shuffleArray(filteredLocations);
      const selectedLocations = shuffledLocations.slice(0, 10);

      setLocations(selectedLocations);
      setGameMode(mode);
      setQuestionIndex(0);
      setCurrentQuestion(null);
      setSelectedLocation(null);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setScore(0);
      setTimeElapsed(0);
      setStreak(0);
      setMaxStreak(0);
      setHints(3);
      setHintsUsed(0);
      setShowAnswer(false);
      setGameState("setup");
      setIsTimerActive(false);
    },
    [customLocations, shuffleArray]
  );

  // Generate question
  const generateQuestion = useCallback(
    (location) => {
      if (gameMode === "identify") {
        return {
          type: "identify",
          text: `Identifica la ubicación de ${location.name} en el mapa`,
          location: location,
          correctAnswer: location.coordinates,
          points: 100,
        };
      }

      const questionType =
        questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const questionText = questionType.question.replace(
        "{location}",
        location.name
      );

      let options = [];
      let correctAnswer = "";

      switch (questionType.type) {
        case "civilization":
          correctAnswer = location.civilization;
          options = [
            location.civilization,
            ...shuffleArray(
              locations
                .filter((l) => l.id !== location.id)
                .map((l) => l.civilization)
            ).slice(0, 3),
          ];
          break;

        case "period":
          correctAnswer = location.period;
          options = [
            location.period,
            ...shuffleArray(
              locations.filter((l) => l.id !== location.id).map((l) => l.period)
            ).slice(0, 3),
          ];
          break;

        case "facts":
          correctAnswer = location.facts[0];
          // Generate fake facts for other options
          options = [
            location.facts[0],
            "Fue la capital de un imperio comercial marítimo",
            "Albergó una de las siete maravillas del mundo antiguo",
            "Fue destruida por un terremoto en el siglo IV",
          ].slice(0, 4);
          break;

        default:
          break;
      }

      return {
        type: questionType.type,
        text: questionText,
        location: location,
        options: shuffleArray(options),
        correctAnswer: correctAnswer,
        points: questionType.points,
      };
    },
    [gameMode, locations, shuffleArray]
  );

  // Start game
  const startGame = useCallback(() => {
    if (locations.length === 0) return;

    const firstQuestion = generateQuestion(locations[0]);
    setCurrentQuestion(firstQuestion);
    setGameState("playing");
    setIsTimerActive(true);
  }, [locations, generateQuestion]);

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

  // Handle answer
  const submitAnswer = useCallback(
    (answer) => {
      if (!currentQuestion || gameState !== "playing") return;

      const isCorrect =
        gameMode === "identify"
          ? Math.abs(answer.x - currentQuestion.correctAnswer.x) < 5 &&
            Math.abs(answer.y - currentQuestion.correctAnswer.y) < 5
          : answer === currentQuestion.correctAnswer;

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
        setStreak((prev) => {
          const newStreak = prev + 1;
          setMaxStreak((current) => Math.max(current, newStreak));
          return newStreak;
        });

        // Calculate score
        const timeBonus = Math.max(50 - (timeElapsed % 60), 5);
        const streakBonus = streak * 10;
        const hintPenalty = hintsUsed * 10;
        const questionScore =
          currentQuestion.points + timeBonus + streakBonus - hintPenalty;

        setScore((prev) => prev + Math.max(questionScore, 25));
      } else {
        setWrongAnswers((prev) => prev + 1);
        setStreak(0);
        setScore((prev) => Math.max(prev - 10, 0));
      }

      setShowAnswer(true);

      // Move to next question after delay
      setTimeout(() => {
        const nextIndex = questionIndex + 1;
        if (nextIndex < locations.length) {
          setQuestionIndex(nextIndex);
          setCurrentQuestion(generateQuestion(locations[nextIndex]));
          setSelectedLocation(null);
          setShowAnswer(false);
        } else {
          setGameState("completed");
          setIsTimerActive(false);
        }
      }, 2000);
    },
    [
      currentQuestion,
      gameState,
      gameMode,
      questionIndex,
      locations,
      generateQuestion,
      streak,
      timeElapsed,
      hintsUsed,
    ]
  );

  // Use hint
  const useHint = useCallback(() => {
    if (hints <= 0 || !currentQuestion || gameState !== "playing") return null;

    setHints((prev) => prev - 1);
    setHintsUsed((prev) => prev + 1);

    if (gameMode === "identify") {
      return {
        type: "region",
        text: `Esta ciudad se encuentra en: ${currentQuestion.location.region}`,
        region: currentQuestion.location.region,
      };
    } else {
      // Remove one wrong answer
      const wrongOptions = currentQuestion.options.filter(
        (opt) => opt !== currentQuestion.correctAnswer
      );
      return {
        type: "eliminate",
        text: `Esta opción es incorrecta: ${wrongOptions[0]}`,
        eliminate: wrongOptions[0],
      };
    }
  }, [hints, currentQuestion, gameState, gameMode]);

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
      questionsRemaining: locations.length - questionIndex,
    };
  }, [
    score,
    timeElapsed,
    correctAnswers,
    wrongAnswers,
    maxStreak,
    hintsUsed,
    gameState,
    locations.length,
    questionIndex,
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
    locations,
    currentQuestion,
    questionIndex,
    selectedLocation,
    correctAnswers,
    wrongAnswers,
    score,
    timeElapsed,
    streak,
    maxStreak,
    hints,
    hintsUsed,
    showAnswer,

    // Actions
    initializeGame,
    startGame,
    togglePause,
    submitAnswer,
    useHint,
    resetGame,
    setSelectedLocation,

    // Utilities
    getStatistics,
    formatTime,

    // Computed values
    isCompleted: gameState === "completed",
    progress:
      locations.length > 0 ? (questionIndex / locations.length) * 100 : 0,
    currentLocation: currentQuestion?.location,
  };
};

export default useMapGame;
