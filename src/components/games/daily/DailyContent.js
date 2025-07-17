/**
 * DailyContent Component
 * Daily historical content with favorites and history tracking
 * @created 2024-12-19
 */

"use client";

import React, { useState } from "react";
import useDailyContent from "./useDailyContent";
import GameButton from "../shared/GameButton";
import GameStats from "../shared/GameStats";

const DailyContent = ({ onClose }) => {
  const daily = useDailyContent();
  const [activeTab, setActiveTab] = useState("today"); // today, favorites, history
  const [showDetails, setShowDetails] = useState(false);

  const getContentIcon = (type) => {
    const icons = {
      character: "👤",
      event: "⚔️",
      place: "🏛️",
      fact: "🧠",
    };
    return icons[type] || "📚";
  };

  const getContentColor = (type) => {
    const colors = {
      character: "from-purple-400 to-purple-600",
      event: "from-red-400 to-red-600",
      place: "from-blue-400 to-blue-600",
      fact: "from-green-400 to-green-600",
    };
    return colors[type] || "from-gray-400 to-gray-600";
  };

  const renderContentCard = (content, showDate = false) => (
    <div
      className={`bg-gradient-to-br ${getContentColor(
        content.type
      )} p-6 rounded-lg text-white shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getContentIcon(content.type)}</span>
          <div>
            <h3 className="text-xl font-bold">
              {content.name || content.title}
            </h3>
            <p className="text-sm opacity-90">{content.period}</p>
            {showDate && content.viewedDate && (
              <p className="text-xs opacity-75">
                Visto:{" "}
                {new Date(content.viewedDate).toLocaleDateString("es-ES")}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <GameButton
            variant="ghost"
            size="small"
            onClick={() => {
              if (daily.isFavorite(content.id)) {
                daily.removeFromFavorites(content.id);
              } else {
                daily.addToFavorites(content);
              }
            }}
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            {daily.isFavorite(content.id) ? "❤️" : "🤍"}
          </GameButton>

          <GameButton
            variant="ghost"
            size="small"
            onClick={() => setShowDetails(!showDetails)}
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            {showDetails ? "👁️‍🗨️" : "👁️"}
          </GameButton>
        </div>
      </div>

      <p className="text-sm mb-4 leading-relaxed">{content.description}</p>

      {showDetails && (
        <div className="space-y-4 border-t border-white border-opacity-30 pt-4">
          {/* Key Facts */}
          {content.keyFacts && (
            <div>
              <h4 className="font-semibold mb-2">Datos Clave:</h4>
              <ul className="text-sm space-y-1">
                {content.keyFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-300">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Details for facts */}
          {content.details && (
            <div>
              <h4 className="font-semibold mb-2">Detalles:</h4>
              <ul className="text-sm space-y-1">
                {content.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-300">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {content.achievements && (
            <div>
              <h4 className="font-semibold mb-2">Logros:</h4>
              <ul className="text-sm space-y-1">
                {content.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-300">✦</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Consequences for events */}
          {content.consequences && (
            <div>
              <h4 className="font-semibold mb-2">Consecuencias:</h4>
              <ul className="text-sm space-y-1">
                {content.consequences.map((consequence, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-300">→</span>
                    <span>{consequence}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Famous Residents for places */}
          {content.famousResidents && (
            <div>
              <h4 className="font-semibold mb-2">Residentes Famosos:</h4>
              <ul className="text-sm space-y-1">
                {content.famousResidents.map((resident, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-300">👤</span>
                    <span>{resident}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quote */}
          {content.quote && (
            <div className="bg-black bg-opacity-20 p-3 rounded italic">
              &quot;{content.quote}&quot;
            </div>
          )}

          {/* Fun Fact */}
          {content.funFact && (
            <div className="bg-yellow-400 bg-opacity-20 p-3 rounded">
              <h4 className="font-semibold text-yellow-100 mb-1">
                💡 Dato Curioso:
              </h4>
              <p className="text-sm">{content.funFact}</p>
            </div>
          )}

          {/* Related Topics */}
          {content.relatedTopics && (
            <div>
              <h4 className="font-semibold mb-2">Temas Relacionados:</h4>
              <div className="flex flex-wrap gap-2">
                {content.relatedTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderTodayTab = () => (
    <div className="space-y-6">
      {/* Header with date and streak */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📅 {daily.formatDate(daily.currentDate)}
        </h2>

        <div className="flex justify-center items-center gap-6 mb-4">
          <div className="bg-orange-100 px-4 py-2 rounded-lg">
            <span className="text-orange-700 font-semibold">
              🔥 Racha: {daily.streak} días
            </span>
          </div>

          {daily.isToday && (
            <div className="bg-green-100 px-4 py-2 rounded-lg">
              <span className="text-green-700 font-semibold">✨ ¡Hoy!</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <GameButton
            variant="outline"
            onClick={() => daily.navigateDate("prev")}
            disabled={daily.isLoading}
          >
            ← Día Anterior
          </GameButton>

          <GameButton
            variant="secondary"
            onClick={() => daily.loadDailyContent(new Date())}
            disabled={daily.isToday}
          >
            Hoy
          </GameButton>

          <GameButton
            variant="outline"
            onClick={() => daily.navigateDate("next")}
            disabled={!daily.canNavigateNext || daily.isLoading}
          >
            Día Siguiente →
          </GameButton>
        </div>
      </div>

      {/* Content */}
      {daily.isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin text-4xl mb-4">📚</div>
          <p className="text-gray-600">Cargando contenido histórico...</p>
        </div>
      ) : daily.dailyContent ? (
        <div className="max-w-2xl mx-auto">
          {renderContentCard(daily.dailyContent)}

          <div className="mt-6 text-center">
            <GameButton
              variant="secondary"
              onClick={daily.getRandomContent}
              className="mr-4"
            >
              🎲 Contenido Aleatorio
            </GameButton>

            <GameButton
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Ocultar" : "Mostrar"} Detalles
            </GameButton>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No hay contenido disponible para esta fecha.
          </p>
        </div>
      )}
    </div>
  );

  const renderFavoritesTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">❤️ Favoritos</h2>
        <p className="text-gray-600">
          Contenido que has marcado como favorito ({daily.favorites.length})
        </p>
      </div>

      {daily.favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No tienes favoritos aún
          </h3>
          <p className="text-gray-600 mb-6">
            Marca contenido como favorito usando el corazón ❤️
          </p>
          <GameButton variant="primary" onClick={() => setActiveTab("today")}>
            Ver Contenido de Hoy
          </GameButton>
        </div>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {daily.favorites.map((content, index) => (
            <div key={`${content.type}-${content.id}-${index}`}>
              {renderContentCard(content, true)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📚 Historial</h2>
        <p className="text-gray-600">
          Contenido que has visto recientemente ({daily.history.length})
        </p>
      </div>

      {daily.history.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No hay historial disponible
          </h3>
          <p className="text-gray-600 mb-6">
            Tu historial de contenido visto aparecerá aquí
          </p>
          <GameButton variant="primary" onClick={() => setActiveTab("today")}>
            Ver Contenido de Hoy
          </GameButton>
        </div>
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto">
          {daily.history.map((content, index) => (
            <div
              key={`${content.type}-${content.id}-${index}`}
              className="scale-90"
            >
              {renderContentCard(content, true)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Contenido Diario
                </h1>
                <p className="text-gray-600">Descubre la historia día a día</p>
              </div>
            </div>

            <GameButton variant="outline" onClick={onClose}>
              ✕ Cerrar
            </GameButton>
          </div>

          {/* Stats */}
          <GameStats
            stats={[
              { label: "Racha actual", value: `${daily.streak} días` },
              { label: "Favoritos", value: daily.favorites.length },
              { label: "Historial", value: daily.history.length },
            ]}
            layout="inline"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            {[
              { key: "today", label: "Hoy", icon: "📅" },
              { key: "favorites", label: "Favoritos", icon: "❤️" },
              { key: "history", label: "Historial", icon: "📚" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === "today" && renderTodayTab()}
          {activeTab === "favorites" && renderFavoritesTab()}
          {activeTab === "history" && renderHistoryTab()}
        </div>
      </div>
    </div>
  );
};

export default DailyContent;
