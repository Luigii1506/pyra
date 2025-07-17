/**
 * GameButton Component
 * Botón reutilizable para acciones en juegos
 * @created 2024-12-19
 */

import React from "react";

const GameButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  icon: Icon = null,
  loading = false,
  fullWidth = false,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-stone-600 hover:bg-stone-700 text-white focus:ring-stone-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    warning: "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500",
    outline:
      "border-2 border-stone-300 hover:border-stone-400 text-stone-700 bg-white hover:bg-stone-50 focus:ring-stone-500",
    ghost:
      "text-stone-600 hover:text-stone-800 hover:bg-stone-100 focus:ring-stone-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";
  const widthClasses = fullWidth ? "w-full" : "";

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? disabledClasses : ""}
    ${widthClasses}
    ${className}
  `.trim();

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      ) : Icon ? (
        <Icon
          size={
            size === "sm" ? 16 : size === "lg" ? 24 : size === "xl" ? 28 : 20
          }
          className="mr-2"
        />
      ) : null}
      {children}
    </button>
  );
};

export default GameButton;
