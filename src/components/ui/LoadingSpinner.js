/**
 * Loading Spinner Component
 * Reusable loading indicator with different sizes and styles
 * @created 2024-12-19
 */

import React from "react";

const LoadingSpinner = ({
  size = "md",
  color = "amber",
  className = "",
  text = null,
  centered = true,
}) => {
  // Definir tamaños
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  // Definir colores
  const colorClasses = {
    amber: "border-amber-500",
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    gray: "border-gray-500",
  };

  const spinnerClasses = `
    ${sizeClasses[size]}
    ${colorClasses[color]}
    border-4 border-solid border-t-transparent
    rounded-full animate-spin
    ${className}
  `;

  const containerClasses = `
    ${centered ? "flex flex-col items-center justify-center" : ""}
    ${text ? "space-y-2" : ""}
  `;

  if (text) {
    return (
      <div className={containerClasses}>
        <div className={spinnerClasses}></div>
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      </div>
    );
  }

  return <div className={spinnerClasses}></div>;
};

export default LoadingSpinner;
