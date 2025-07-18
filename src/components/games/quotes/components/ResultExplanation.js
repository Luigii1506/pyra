/**
 * ResultExplanation Component
 * Displays contextual explanation after answering a question
 * @created 2024-12-19
 */

"use client";

import React from "react";

const ResultExplanation = ({ currentQuestion, showAnswer }) => {
  if (!showAnswer || !currentQuestion) return null;

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h5 className="font-bold text-blue-800 mb-2">Contexto Histórico:</h5>
      <p className="text-blue-700 text-sm leading-relaxed">
        {currentQuestion.explanation}
      </p>
      <div className="mt-2 flex items-center space-x-4 text-xs text-blue-600">
        <span>Período: {currentQuestion.period}</span>
        <span>Categoría: {currentQuestion.category}</span>
      </div>
    </div>
  );
};

export default ResultExplanation;
