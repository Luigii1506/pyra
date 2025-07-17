/**
 * GameHeader Component
 * Header reutilizable para todos los juegos de estudio
 * @created 2024-12-19
 */

import React from "react";
import { ArrowLeft } from "lucide-react";

const GameHeader = ({
  title,
  description,
  onBack,
  stats = [],
  progress = null,
  showBackButton = true,
  icon: Icon = null,
  iconColor = "bg-blue-600",
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className={`${iconColor} p-2 rounded-lg`}>
              <Icon size={24} className="text-white" />
            </div>
          )}
          <div>
            <h3 className="text-2xl font-bold text-stone-800">{title}</h3>
            {description && <p className="text-stone-600">{description}</p>}
          </div>
        </div>

        {/* Stats Display */}
        {stats.length > 0 && (
          <div className="flex items-center space-x-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-2xl font-bold ${
                    stat.color || "text-blue-600"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-stone-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        {showBackButton && onBack && (
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Volver</span>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {progress && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-stone-700 font-medium">{progress.label}</span>
            <span className="text-stone-600 text-sm">
              {progress.current}/{progress.total}
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2">
            <div
              className={`${
                progress.color || "bg-blue-600"
              } h-2 rounded-full transition-all duration-300`}
              style={{
                width: `${(progress.current / progress.total) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHeader;
