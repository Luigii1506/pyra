/**
 * HintDisplay Component
 * Displays hints with contextual information
 * @created 2024-12-19
 */

"use client";

import React from "react";

const HintDisplay = ({ hint }) => {
  if (!hint) return null;

  return (
    <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-400 p-4">
      <p className="text-yellow-700 font-medium">{hint.text}</p>
      {hint.context && (
        <p className="text-yellow-600 text-sm mt-1">{hint.context}</p>
      )}
    </div>
  );
};

export default HintDisplay;
