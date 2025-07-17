/**
 * GameStats Component
 * Componente reutilizable para mostrar estadísticas de juegos
 * @created 2024-12-19
 */

import React from "react";

const GameStats = ({ stats, layout = "grid", className = "" }) => {
  const gridClasses = {
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
    flex: "flex flex-wrap gap-4 justify-center",
    inline: "flex items-center space-x-6",
  };

  return (
    <div className={`${gridClasses[layout]} ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`
            ${
              layout === "grid" ? "bg-gradient-to-br p-4 rounded-lg border" : ""
            }
            ${
              layout === "flex"
                ? "bg-white p-4 rounded-lg border shadow-sm"
                : ""
            }
            ${layout === "inline" ? "text-center" : ""}
            ${stat.bgColor || "from-blue-50 to-blue-100 border-blue-200"}
          `}
        >
          <div
            className={`flex items-center ${
              layout === "inline" ? "justify-center" : "space-x-3"
            }`}
          >
            {stat.icon && (
              <div
                className={`${
                  stat.iconBg || "bg-blue-500"
                } p-2 rounded-lg flex-shrink-0`}
              >
                <stat.icon
                  size={layout === "inline" ? 16 : 20}
                  className="text-white"
                />
              </div>
            )}
            <div className={layout === "inline" ? "ml-2" : ""}>
              <div
                className={`font-bold ${stat.valueColor || "text-blue-600"} ${
                  layout === "inline" ? "text-lg" : "text-2xl"
                }`}
              >
                {stat.value}
                {stat.unit && <span className="text-sm ml-1">{stat.unit}</span>}
              </div>
              <div
                className={`text-stone-600 ${
                  layout === "inline" ? "text-xs" : "text-sm"
                }`}
              >
                {stat.label}
              </div>
              {stat.sublabel && (
                <div className="text-xs text-stone-500 mt-1">
                  {stat.sublabel}
                </div>
              )}
            </div>
          </div>

          {stat.progress && (
            <div className="mt-3">
              <div className="w-full bg-stone-200 rounded-full h-1.5">
                <div
                  className={`${
                    stat.progress.color || "bg-blue-600"
                  } h-1.5 rounded-full transition-all duration-300`}
                  style={{ width: `${stat.progress.percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-stone-500 mt-1">
                <span>{stat.progress.current}</span>
                <span>{stat.progress.total}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GameStats;
