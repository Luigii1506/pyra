/**
 * AnswerOptions Component
 * Displays answer options with visual feedback and hint support
 * @created 2024-12-19
 */

"use client";

import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { getOptionLabel } from "../utils/quotes-game-utils";

const AnswerOptions = ({
  gameMode,
  options,
  selectedAnswer,
  correctAnswer,
  showAnswer,
  hint,
  onAnswerSelect,
}) => {
  const getButtonClasses = (option, index) => {
    let classes = "p-4 rounded-lg border-2 transition-all text-left ";

    if (showAnswer) {
      if (option === correctAnswer) {
        classes += "border-green-500 bg-green-50 text-green-800";
      } else if (selectedAnswer === option) {
        classes += "border-red-500 bg-red-50 text-red-800";
      } else {
        classes += "border-stone-300 bg-stone-50 text-stone-600";
      }
      classes += " cursor-not-allowed";
    } else {
      if (selectedAnswer === option) {
        classes += "border-amber-500 bg-amber-50";
      } else {
        classes += "border-stone-300 hover:border-amber-300 hover:bg-amber-50";
      }
      classes += " cursor-pointer";
    }

    if (hint && hint.eliminate === option) {
      classes += " opacity-50 line-through";
    }

    return classes;
  };

  const getCircleClasses = (option) => {
    let classes =
      "w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ";

    if (showAnswer) {
      if (option === correctAnswer) {
        classes += "border-green-500 bg-green-500 text-white";
      } else if (selectedAnswer === option) {
        classes += "border-red-500 bg-red-500 text-white";
      } else {
        classes += "border-stone-400 text-stone-400";
      }
    } else {
      if (selectedAnswer === option) {
        classes += "border-amber-500 bg-amber-500 text-white";
      } else {
        classes += "border-stone-400 text-stone-600";
      }
    }

    return classes;
  };

  const isDisabled = (option) => {
    return showAnswer || (hint && hint.eliminate === option);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {options?.map((option, index) => (
        <button
          key={index}
          onClick={() => !isDisabled(option) && onAnswerSelect(index)}
          disabled={isDisabled(option)}
          className={getButtonClasses(option, index)}
        >
          <div className="flex items-center space-x-3">
            <div className={getCircleClasses(option)}>
              {getOptionLabel(index)}
            </div>
            <span className="flex-1 text-black">
              {gameMode === "quote-to-person" ? option : `"${option}"`}
            </span>
            {showAnswer && option === correctAnswer && (
              <CheckCircle size={20} className="text-green-600" />
            )}
            {showAnswer &&
              selectedAnswer === option &&
              option !== correctAnswer && (
                <XCircle size={20} className="text-red-600" />
              )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
