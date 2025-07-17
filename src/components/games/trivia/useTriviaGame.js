/**
 * useTriviaGame Hook
 * Hook personalizado para manejar el estado del juego de trivia
 * @created 2024-12-19
 */

import { useState, useEffect, useCallback } from "react";

const useTriviaGame = ({ questions = [], timeLimit = 60 }) => {
  const [gameState, setGameState] = useState("idle"); // 'idle', 'playing', 'finished'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [answers, setAnswers] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval = null;

    if (gameState === "playing" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setGameState("finished");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, timeLeft]);

  // Start game
  const startGame = useCallback(() => {
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(timeLimit);
    setAnswers([]);
    setStreak(0);
  }, [timeLimit]);

  // Answer question
  const answerQuestion = useCallback(
    (selectedAnswer) => {
      if (gameState !== "playing" || currentQuestionIndex >= questions.length)
        return;

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correct;

      const answerData = {
        questionIndex: currentQuestionIndex,
        selectedAnswer,
        correctAnswer: currentQuestion.correct,
        isCorrect,
        timeSpent: timeLimit - timeLeft,
      };

      setAnswers((prev) => [...prev, answerData]);

      if (isCorrect) {
        const points = Math.max(
          10 - Math.floor((timeLimit - timeLeft) / 10),
          1
        ); // More points for faster answers
        setScore((prev) => prev + points);
        setStreak((prev) => {
          const newStreak = prev + 1;
          setBestStreak((current) => Math.max(current, newStreak));
          return newStreak;
        });
      } else {
        setStreak(0);
      }

      // Move to next question or finish game
      if (currentQuestionIndex + 1 >= questions.length) {
        setGameState("finished");
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    },
    [gameState, currentQuestionIndex, questions, timeLimit, timeLeft]
  );

  // Skip question
  const skipQuestion = useCallback(() => {
    if (gameState !== "playing") return;

    const answerData = {
      questionIndex: currentQuestionIndex,
      selectedAnswer: null,
      correctAnswer: questions[currentQuestionIndex]?.correct,
      isCorrect: false,
      timeSpent: timeLimit - timeLeft,
      skipped: true,
    };

    setAnswers((prev) => [...prev, answerData]);
    setStreak(0);

    if (currentQuestionIndex + 1 >= questions.length) {
      setGameState("finished");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [gameState, currentQuestionIndex, questions, timeLimit, timeLeft]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState("idle");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(timeLimit);
    setAnswers([]);
    setStreak(0);
  }, [timeLimit]);

  // Pause/Resume game
  const pauseGame = useCallback(() => {
    setGameState("paused");
  }, []);

  const resumeGame = useCallback(() => {
    setGameState("playing");
  }, []);

  // Calculate statistics
  const stats = {
    totalQuestions: questions.length,
    answeredQuestions: answers.length,
    correctAnswers: answers.filter((a) => a.isCorrect).length,
    incorrectAnswers: answers.filter((a) => !a.isCorrect && !a.skipped).length,
    skippedQuestions: answers.filter((a) => a.skipped).length,
    accuracy:
      answers.length > 0
        ? (answers.filter((a) => a.isCorrect).length / answers.length) * 100
        : 0,
    averageTimePerQuestion:
      answers.length > 0
        ? answers.reduce((sum, a) => sum + a.timeSpent, 0) / answers.length
        : 0,
    timeUsed: timeLimit - timeLeft,
    currentStreak: streak,
    bestStreak,
  };

  return {
    gameState,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    score,
    timeLeft,
    answers,
    streak,
    bestStreak,
    stats,
    actions: {
      startGame,
      answerQuestion,
      skipQuestion,
      resetGame,
      pauseGame,
      resumeGame,
    },
  };
};

export default useTriviaGame;
