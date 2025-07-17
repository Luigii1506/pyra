/**
 * GameCard Component
 * Tarjeta reutilizable para mostrar juegos disponibles
 * @created 2024-12-19
 */

import React from "react";

const GameCard = ({
  title,
  description,
  icon: Icon,
  color = "bg-blue-500",
  onClick,
  disabled = false,
  badge = null,
  stats = null,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg 
        border border-amber-200 hover:shadow-md transition-all text-left
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:scale-[1.02]"
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div className={`${color} p-2 rounded-lg flex-shrink-0`}>
          <Icon size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h5 className="font-semibold text-stone-800 truncate">{title}</h5>
            {badge && (
              <span
                className={`
                px-2 py-1 rounded text-xs font-medium ml-2 flex-shrink-0
                ${badge.type === "success" ? "bg-green-100 text-green-800" : ""}
                ${badge.type === "warning" ? "bg-amber-100 text-amber-800" : ""}
                ${badge.type === "info" ? "bg-blue-100 text-blue-800" : ""}
                ${badge.type === "new" ? "bg-purple-100 text-purple-800" : ""}
              `}
              >
                {badge.text}
              </span>
            )}
          </div>
          <p className="text-stone-600 text-sm line-clamp-2">{description}</p>

          {stats && (
            <div className="flex items-center space-x-4 mt-2 text-xs text-stone-500">
              {stats.map((stat, index) => (
                <span key={index} className="flex items-center space-x-1">
                  <stat.icon size={12} />
                  <span>
                    {stat.value} {stat.label}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default GameCard;
