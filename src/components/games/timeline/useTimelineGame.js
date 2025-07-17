/**
 * useTimelineGame Hook
 * Hook personalizado para manejar el estado del juego de cronología
 * @created 2024-12-19
 */

import { useState, useCallback } from "react";

const useTimelineGame = ({ events = [] }) => {
  const [gameState, setGameState] = useState("idle"); // 'idle', 'playing', 'finished'
  const [shuffledEvents, setShuffledEvents] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);

  // Utility function to shuffle array
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Start game
  const startGame = useCallback(() => {
    const shuffled = shuffleArray(events);
    setShuffledEvents(shuffled);
    setUserOrder([]);
    setGameState("playing");
    setScore(0);
    setAttempts(0);
    setDraggedItem(null);
    setShowHints(false);
  }, [events, shuffleArray]);

  // Handle drag start
  const handleDragStart = useCallback((event, item) => {
    setDraggedItem(item);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  }, []);

  // Handle drag over
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback(
    (event, targetIndex) => {
      event.preventDefault();
      if (!draggedItem) return;

      const newOrder = [...userOrder];
      const existingIndex = newOrder.findIndex(
        (item) => item.id === draggedItem.id
      );

      // Remove from existing position if already in order
      if (existingIndex !== -1) {
        newOrder.splice(existingIndex, 1);
      }

      // Insert at new position
      newOrder.splice(targetIndex, 0, draggedItem);
      setUserOrder(newOrder);

      // Remove from shuffled events if not already in order
      if (existingIndex === -1) {
        setShuffledEvents((prev) =>
          prev.filter((item) => item.id !== draggedItem.id)
        );
      }

      setDraggedItem(null);
    },
    [draggedItem, userOrder]
  );

  // Remove item from user order
  const removeFromOrder = useCallback((eventToRemove) => {
    setUserOrder((prev) => prev.filter((item) => item.id !== eventToRemove.id));
    setShuffledEvents((prev) => [...prev, eventToRemove]);
  }, []);

  // Add item to order (for mobile/click interface)
  const addToOrder = useCallback(
    (event, position = null) => {
      const targetPosition = position !== null ? position : userOrder.length;
      const newOrder = [...userOrder];
      newOrder.splice(targetPosition, 0, event);
      setUserOrder(newOrder);
      setShuffledEvents((prev) => prev.filter((item) => item.id !== event.id));
    },
    [userOrder]
  );

  // Check answer
  const checkAnswer = useCallback(() => {
    if (userOrder.length !== events.length) return;

    setAttempts((prev) => prev + 1);

    // Sort events by actual year for comparison
    const correctOrder = [...events].sort((a, b) => a.year - b.year);
    let correctPositions = 0;

    userOrder.forEach((userEvent, index) => {
      if (userEvent.id === correctOrder[index].id) {
        correctPositions++;
      }
    });

    const finalScore = Math.round((correctPositions / events.length) * 100);
    setScore(finalScore);
    setGameState("finished");
  }, [userOrder, events]);

  // Toggle hints
  const toggleHints = useCallback(() => {
    setShowHints((prev) => !prev);
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState("idle");
    setShuffledEvents([]);
    setUserOrder([]);
    setDraggedItem(null);
    setScore(0);
    setAttempts(0);
    setShowHints(false);
  }, []);

  // Get feedback for completed game
  const getFeedback = useCallback(() => {
    if (gameState !== "finished") return null;

    const correctOrder = [...events].sort((a, b) => a.year - b.year);
    const feedback = userOrder.map((userEvent, index) => {
      const isCorrect = userEvent.id === correctOrder[index].id;
      const correctPosition = correctOrder.findIndex(
        (e) => e.id === userEvent.id
      );

      return {
        event: userEvent,
        userPosition: index,
        correctPosition,
        isCorrect,
        difference: Math.abs(index - correctPosition),
      };
    });

    return feedback;
  }, [gameState, events, userOrder]);

  // Format year for display
  const formatYear = useCallback((year) => {
    return year < 0 ? `${Math.abs(year)} a.C.` : `${year} d.C.`;
  }, []);

  // Calculate statistics
  const stats = {
    totalEvents: events.length,
    orderedEvents: userOrder.length,
    remainingEvents: shuffledEvents.length,
    accuracy: score,
    attempts,
    isComplete: userOrder.length === events.length,
    correctOrder: [...events].sort((a, b) => a.year - b.year),
  };

  return {
    gameState,
    shuffledEvents,
    userOrder,
    draggedItem,
    score,
    attempts,
    showHints,
    stats,
    actions: {
      startGame,
      handleDragStart,
      handleDragOver,
      handleDrop,
      removeFromOrder,
      addToOrder,
      checkAnswer,
      toggleHints,
      resetGame,
    },
    utils: {
      getFeedback,
      formatYear,
    },
  };
};

export default useTimelineGame;
