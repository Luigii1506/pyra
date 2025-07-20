/**
 * ContentCard Component
 * Tarjeta para mostrar contenido histórico individual
 * @created 2024-12-19
 */

import React from "react";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Bookmark,
  Star,
  Info,
} from "lucide-react";

import GameButton from "../../shared/GameButton.js";
import {
  getContentStyles,
  formatYear,
  getTimeAgo,
} from "../utils/daily-utils.js";

/**
 * Componente de badge de tipo de contenido
 */
const ContentTypeBadge = ({ type }) => {
  const styles = getContentStyles(type);

  return (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${styles.bgColor} ${styles.textColor} ${styles.borderColor} border`}
    >
      <span>{styles.icon}</span>
      <span>{styles.prefix}</span>
    </div>
  );
};

/**
 * Componente de información del año
 */
const YearInfo = ({ year }) => {
  return (
    <div className="flex items-center space-x-4 text-sm text-stone-600">
      <div className="flex items-center space-x-1">
        <Calendar size={16} />
        <span className="font-medium">{formatYear(year)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Clock size={16} />
        <span>{getTimeAgo(year)}</span>
      </div>
    </div>
  );
};

/**
 * Componente de datos clave
 */
const KeyFacts = ({ facts, isExpanded }) => {
  if (!facts || facts.length === 0) return null;

  const displayFacts = isExpanded ? facts : facts.slice(0, 2);

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-stone-800 flex items-center space-x-2">
        <Info size={16} />
        <span>Datos clave:</span>
      </h4>
      <ul className="space-y-1">
        {displayFacts.map((fact, index) => (
          <li
            key={index}
            className="flex items-start space-x-2 text-sm text-stone-700"
          >
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>{fact}</span>
          </li>
        ))}
      </ul>
      {!isExpanded && facts.length > 2 && (
        <p className="text-xs text-stone-500 italic">
          +{facts.length - 2} datos más...
        </p>
      )}
    </div>
  );
};

/**
 * Componente principal ContentCard
 */
const ContentCard = ({
  content,
  isExpanded = false,
  isFavorite = false,
  onToggleExpand,
  onToggleFavorite,
  showDate = false,
  className = "",
}) => {
  const styles = getContentStyles(content.type);

  const handleExpandClick = (e) => {
    e.stopPropagation();
    if (onToggleExpand) {
      onToggleExpand();
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Header con gradiente */}
      <div className={`${styles.gradient} p-4 text-white`}>
        <div className="flex items-start justify-between mb-3">
          <ContentTypeBadge type={content.type} />

          <div className="flex items-center space-x-2">
            <GameButton
              onClick={handleFavoriteClick}
              variant="ghost"
              size="sm"
              icon={Heart}
              className={`text-white hover:bg-white/20 ${
                isFavorite ? "text-red-300" : ""
              }`}
            >
              {isFavorite ? "❤️" : "🤍"}
            </GameButton>

            <GameButton
              onClick={handleExpandClick}
              variant="ghost"
              size="sm"
              icon={isExpanded ? ChevronUp : ChevronDown}
              className="text-white hover:bg-white/20"
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">{content.title}</h3>

        {content.name && (
          <p className="text-white/90 font-medium mb-2">{content.name}</p>
        )}

        {showDate && <YearInfo year={content.year} />}
      </div>

      {/* Contenido principal */}
      <div className="p-4">
        {/* Información básica */}
        <div className="space-y-3 mb-4">
          {!showDate && <YearInfo year={content.year} />}

          <p className="text-stone-700 leading-relaxed">
            {content.description}
          </p>

          {content.period && (
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-stone-500" />
              <span className="text-sm text-stone-600 bg-stone-100 px-2 py-1 rounded-full">
                {content.period}
              </span>
            </div>
          )}
        </div>

        {/* Contenido expandido */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-stone-200">
            {/* Importancia */}
            {content.importance && (
              <div>
                <h4 className="font-medium text-stone-800 mb-2 flex items-center space-x-2">
                  <Star size={16} />
                  <span>Importancia histórica:</span>
                </h4>
                <p className="text-sm text-stone-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  {content.importance}
                </p>
              </div>
            )}

            {/* Datos clave */}
            <KeyFacts facts={content.keyFacts} isExpanded={true} />

            {/* Logros (para personajes) */}
            {content.achievements && content.achievements.length > 0 && (
              <div>
                <h4 className="font-medium text-stone-800 mb-2">
                  Logros principales:
                </h4>
                <ul className="space-y-1">
                  {content.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-sm text-stone-700"
                    >
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Participantes (para eventos) */}
            {content.participants && content.participants.length > 0 && (
              <div>
                <h4 className="font-medium text-stone-800 mb-2">
                  Participantes:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {content.participants.map((participant, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Consecuencias (para eventos) */}
            {content.consequences && content.consequences.length > 0 && (
              <div>
                <h4 className="font-medium text-stone-800 mb-2">
                  Consecuencias:
                </h4>
                <ul className="space-y-1">
                  {content.consequences.map((consequence, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-sm text-stone-700"
                    >
                      <span className="text-purple-600 font-bold mt-1">→</span>
                      <span>{consequence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cita famosa */}
            {content.quote && (
              <div className="bg-stone-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-stone-700 italic font-medium">
                  &ldquo;{content.quote}&rdquo;
                </p>
              </div>
            )}

            {/* Dato curioso */}
            {content.funFact && (
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-1">
                  💡 ¿Sabías que...?
                </h4>
                <p className="text-sm text-yellow-700">{content.funFact}</p>
              </div>
            )}

            {/* Temas relacionados */}
            {content.relatedTopics && content.relatedTopics.length > 0 && (
              <div>
                <h4 className="font-medium text-stone-800 mb-2">
                  Temas relacionados:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {content.relatedTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded-full border"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Datos clave resumidos (cuando no está expandido) */}
        {!isExpanded && (
          <KeyFacts facts={content.keyFacts} isExpanded={false} />
        )}

        {/* Footer con acciones */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-center space-x-2 text-xs text-stone-500">
            <Bookmark size={14} />
            <span>ID: {content.id}</span>
          </div>

          <GameButton
            onClick={handleExpandClick}
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
          >
            {isExpanded ? "Ver menos" : "Ver más"}
          </GameButton>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
