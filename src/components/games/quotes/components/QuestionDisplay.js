/**
 * QuestionDisplay Component
 * Displays the question for both game modes
 * @created 2024-12-19
 */

"use client";

import React from "react";
import { Crown } from "lucide-react";

const QuestionDisplay = ({ gameMode, currentQuestion }) => {
  if (gameMode === "quote-to-person") {
    return (
      <div>
        <h4 className="text-2xl font-bold text-stone-800 mb-6 text-center">
          &quot;¿Quién dijo esta frase?&quot;
        </h4>
        <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg p-6 mb-8 border border-amber-200">
          <p className="text-xl text-stone-800 italic text-center leading-relaxed">
            &quot;{currentQuestion?.quote}&quot;
          </p>
          {currentQuestion?.originalQuote &&
            currentQuestion.originalQuote !== currentQuestion.quote && (
              <p className="text-sm text-stone-500 text-center mt-2">
                Original: <em>{currentQuestion.originalQuote}</em>
              </p>
            )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-2xl font-bold text-stone-800 mb-6 text-center">
        &quot;¿Qué dijo realmente {currentQuestion?.author}?&quot;
      </h4>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
        <div className="flex items-center justify-center space-x-3">
          <Crown size={24} className="text-blue-600" />
          <p className="text-2xl font-bold text-blue-800">
            {currentQuestion?.author}
          </p>
        </div>
        <p className="text-center text-blue-600 text-sm mt-2">
          {currentQuestion?.period}
        </p>
      </div>
    </div>
  );
};

export default QuestionDisplay;
