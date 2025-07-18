/**
 * QuotesGamePlay Component
 * Main game play screen combining all game components
 * @created 2024-12-19
 */

"use client";

import React from "react";
import GameStats from "../../shared/GameStats";
import GameButton from "../../shared/GameButton";
import GameProgress from "./GameProgress";
import QuestionDisplay from "./QuestionDisplay";
import AnswerOptions from "./AnswerOptions";
import HintDisplay from "./HintDisplay";
import ResultExplanation from "./ResultExplanation";
import {
  getAnswerByIndex,
  calculateProgress,
} from "../utils/quotes-game-utils";

const QuotesGamePlay = ({ game, hint, onAnswerSelect, onHint, onReset }) => {
  const currentQ = game.currentQuestion;
  const progress = calculateProgress(
    game.questionIndex + 1,
    game.quotes.length
  );

  const handleAnswerSelect = (index) => {
    const answer = getAnswerByIndex(index, currentQ?.options);
    if (answer) {
      onAnswerSelect(answer);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header with Progress */}
      <GameProgress
        gameMode={game.gameMode}
        currentQuestion={game.questionIndex + 1}
        totalQuestions={game.quotes.length}
        score={game.score}
        currentQuestionTime={game.currentQuestionTime}
        progress={progress}
      />

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200">
        <QuestionDisplay gameMode={game.gameMode} currentQuestion={currentQ} />

        {/* Answer Options */}
        <AnswerOptions
          gameMode={game.gameMode}
          options={currentQ?.options}
          selectedAnswer={game.selectedAnswer}
          correctAnswer={currentQ?.correctAnswer}
          showAnswer={game.showAnswer}
          hint={hint}
          onAnswerSelect={handleAnswerSelect}
        />

        {/* Game Controls and Stats */}
        <div className="flex justify-between items-center mb-4">
          <GameStats
            stats={[
              { label: "Correctas", value: game.correctAnswers },
              { label: "Racha", value: game.streak },
              { label: "Pistas", value: game.hints },
            ]}
            layout="inline"
          />

          <div className="space-x-2">
            <GameButton
              variant="warning"
              onClick={onHint}
              disabled={game.hints <= 0 || game.showAnswer}
            >
              💡 Pista ({game.hints})
            </GameButton>
            <GameButton variant="outline" onClick={onReset}>
              🔄 Reiniciar
            </GameButton>
          </div>
        </div>

        {/* Hint Display */}
        <HintDisplay hint={hint} />

        {/* Result Explanation */}
        <ResultExplanation
          currentQuestion={currentQ}
          showAnswer={game.showAnswer}
        />
      </div>
    </div>
  );
};

export default QuotesGamePlay;
