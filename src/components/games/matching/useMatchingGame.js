/**
 * useMatchingGame Hook
 * Custom hook for managing matching game state and logic
 * @created 2024-12-19
 */

import { useState, useEffect, useCallback } from "react";

const useMatchingGame = (initialPairs = []) => {
  const [gameState, setGameState] = useState("setup"); // setup, playing, paused, completed
  const [pairs, setPairs] = useState([]); // Original pairs to match
  const [shuffledItems, setShuffledItems] = useState([]); // Shuffled items for display
  const [selectedItems, setSelectedItems] = useState([]); // Currently selected items
  const [matchedPairs, setMatchedPairs] = useState([]); // Successfully matched pairs
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hints, setHints] = useState(3);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Sample historical pairs data
  const defaultPairs = [
    {
      id: 1,
      left: "Julio César",
      right: "República Romana",
      category: "leaders",
    },
    {
      id: 2,
      left: "Cleopatra",
      right: "Egipto Ptolemaico",
      category: "leaders",
    },
    {
      id: 3,
      left: "Alejandro Magno",
      right: "Imperio Macedonio",
      category: "leaders",
    },
    { id: 4, left: "Hammurabi", right: "Babilonia", category: "leaders" },
    { id: 5, left: "Pericles", right: "Atenas Clásica", category: "leaders" },
    { id: 6, left: "Ramsés II", right: "Imperio Egipcio", category: "leaders" },
    { id: 7, left: "Coliseo", right: "Roma", category: "monuments" },
    {
      id: 8,
      left: "Pirámides de Giza",
      right: "Egipto",
      category: "monuments",
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
    (difficulty = "medium") => {
      const gamePairs = initialPairs.length > 0 ? initialPairs : defaultPairs;

      // Adjust number of pairs based on difficulty
      const pairCount =
        difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;
      const selectedPairs = gamePairs.slice(0, pairCount);

      setPairs(selectedPairs);

      // Create shuffled items for matching
      const leftItems = selectedPairs.map((pair) => ({
        id: `left-${pair.id}`,
        text: pair.left,
        pairId: pair.id,
        type: "left",
        category: pair.category,
      }));

      const rightItems = selectedPairs.map((pair) => ({
        id: `right-${pair.id}`,
        text: pair.right,
        pairId: pair.id,
        type: "right",
        category: pair.category,
      }));

      const allItems = [...leftItems, ...rightItems];
      setShuffledItems(shuffleArray(allItems));

      // Reset game state
      setSelectedItems([]);
      setMatchedPairs([]);
      setWrongAttempts(0);
      setScore(0);
      setTimeElapsed(0);
      setStreak(0);
      setMaxStreak(0);
      setHints(3);
      setHintsUsed(0);
      setGameState("setup");
      setIsTimerActive(false);
    },
    [initialPairs, shuffleArray]
  );

  // Start game
  const startGame = useCallback(() => {
    setGameState("playing");
    setIsTimerActive(true);
  }, []);

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

  // Select item
  const selectItem = useCallback(
    (item) => {
      if (gameState !== "playing") return;
      if (selectedItems.includes(item.id)) {
        // Deselect item
        setSelectedItems((prev) => prev.filter((id) => id !== item.id));
        return;
      }

      if (selectedItems.length < 2) {
        const newSelection = [...selectedItems, item.id];
        setSelectedItems(newSelection);

        // Check for match when 2 items are selected
        if (newSelection.length === 2) {
          checkMatch(newSelection);
        }
      }
    },
    [gameState, selectedItems]
  );

  // Check if selected items match
  const checkMatch = useCallback(
    (selection) => {
      const [firstId, secondId] = selection;
      const firstItem = shuffledItems.find((item) => item.id === firstId);
      const secondItem = shuffledItems.find((item) => item.id === secondId);

      if (
        firstItem.pairId === secondItem.pairId &&
        firstItem.type !== secondItem.type
      ) {
        // Correct match
        setMatchedPairs((prev) => [...prev, firstItem.pairId]);
        setStreak((prev) => {
          const newStreak = prev + 1;
          setMaxStreak((current) => Math.max(current, newStreak));
          return newStreak;
        });

        // Calculate score based on time, streak, and hints used
        const timeBonus = Math.max(100 - timeElapsed, 10);
        const streakBonus = streak * 10;
        const hintPenalty = hintsUsed * 20;
        const baseScore = 100;
        const matchScore = baseScore + timeBonus + streakBonus - hintPenalty;

        setScore((prev) => prev + Math.max(matchScore, 50));

        // Clear selection after a brief delay
        setTimeout(() => {
          setSelectedItems([]);
        }, 1000);

        // Check if game is completed
        if (matchedPairs.length + 1 === pairs.length) {
          setTimeout(() => {
            setGameState("completed");
            setIsTimerActive(false);
          }, 1500);
        }
      } else {
        // Wrong match
        setWrongAttempts((prev) => prev + 1);
        setStreak(0);
        setScore((prev) => Math.max(prev - 20, 0));

        // Clear selection after showing error
        setTimeout(() => {
          setSelectedItems([]);
        }, 1500);
      }
    },
    [
      shuffledItems,
      pairs.length,
      matchedPairs.length,
      streak,
      timeElapsed,
      hintsUsed,
    ]
  );

  // Use hint
  const useHint = useCallback(() => {
    if (hints <= 0 || gameState !== "playing") return null;

    // Find an unmatched pair
    const unmatchedPairs = pairs.filter(
      (pair) => !matchedPairs.includes(pair.id)
    );
    if (unmatchedPairs.length === 0) return null;

    const hintPair = unmatchedPairs[0];
    setHints((prev) => prev - 1);
    setHintsUsed((prev) => prev + 1);

    return {
      left: hintPair.left,
      right: hintPair.right,
      category: hintPair.category,
    };
  }, [hints, gameState, pairs, matchedPairs]);

  // Reset game
  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Get game statistics
  const getStatistics = useCallback(() => {
    const accuracy =
      wrongAttempts === 0
        ? 100
        : Math.round(
            (matchedPairs.length / (matchedPairs.length + wrongAttempts)) * 100
          );

    const averageTimePerPair =
      matchedPairs.length > 0
        ? Math.round(timeElapsed / matchedPairs.length)
        : 0;

    return {
      score,
      timeElapsed,
      matchedPairs: matchedPairs.length,
      totalPairs: pairs.length,
      wrongAttempts,
      accuracy,
      maxStreak,
      hintsUsed,
      averageTimePerPair,
      completed: gameState === "completed",
    };
  }, [
    score,
    timeElapsed,
    matchedPairs.length,
    pairs.length,
    wrongAttempts,
    maxStreak,
    hintsUsed,
    gameState,
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
    pairs,
    shuffledItems,
    selectedItems,
    matchedPairs,
    wrongAttempts,
    score,
    timeElapsed,
    streak,
    maxStreak,
    hints,
    hintsUsed,

    // Actions
    initializeGame,
    startGame,
    togglePause,
    selectItem,
    useHint,
    resetGame,

    // Utilities
    getStatistics,
    formatTime,

    // Computed values
    isCompleted: gameState === "completed",
    progress: pairs.length > 0 ? (matchedPairs.length / pairs.length) * 100 : 0,
  };
};

export default useMatchingGame;
