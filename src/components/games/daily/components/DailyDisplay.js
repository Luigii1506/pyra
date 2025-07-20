/**
 * DailyDisplay Component
 * Componente principal para mostrar el contenido histórico diario
 * @created 2024-12-19
 */

import React, { useState } from "react";
import {
  Calendar,
  Heart,
  History,
  Search,
  Filter,
  SortAsc,
  Star,
  TrendingUp,
  Globe,
  Clock,
  ArrowLeft,
} from "lucide-react";

import GameButton from "../../shared/GameButton.js";
import ContentCard from "./ContentCard.js";
import {
  CONTENT_FILTERS,
  FILTER_CONFIG,
  DISPLAY_CONFIG,
} from "../constants/daily-constants.js";
import { getMotivationalMessage } from "../utils/daily-utils.js";

/**
 * Componente de header con fecha y estadísticas
 */
const DailyHeader = ({
  dateInfo,
  streak,
  motivationalMessage,
  stats,
  onBack,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {onBack && (
            <GameButton
              onClick={onBack}
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              className="text-white hover:bg-white/10"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">Historia del Día</h1>
            <p className="text-blue-100">{dateInfo.formatted}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp size={20} />
            <span className="text-xl font-bold">{streak}</span>
          </div>
          <p className="text-blue-100 text-sm">días consecutivos</p>
        </div>
      </div>

      {motivationalMessage && (
        <div className="bg-white/10 rounded-lg p-3 mb-4">
          <p className="text-center font-medium">{motivationalMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white/10 rounded-lg p-3">
          <Calendar className="mx-auto mb-1" size={20} />
          <p className="text-sm">Hoy</p>
          <p className="font-bold">{stats.todayItems}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <Heart className="mx-auto mb-1" size={20} />
          <p className="text-sm">Favoritos</p>
          <p className="font-bold">{stats.favorites}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <History className="mx-auto mb-1" size={20} />
          <p className="text-sm">Historial</p>
          <p className="font-bold">{stats.historyItems}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <Globe className="mx-auto mb-1" size={20} />
          <p className="text-sm">Total</p>
          <p className="font-bold">{stats.totalItems}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente de navegación de vistas
 */
const ViewNavigation = ({ activeView, onViewChange }) => {
  const views = [
    { id: "today", name: "Hoy", icon: Calendar },
    { id: "favorites", name: "Favoritos", icon: Heart },
    { id: "history", name: "Historial", icon: History },
    { id: "explore", name: "Explorar", icon: Globe },
  ];

  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
      {views.map((view) => (
        <GameButton
          key={view.id}
          onClick={() => onViewChange(view.id)}
          variant={activeView === view.id ? "primary" : "secondary"}
          size="sm"
          icon={view.icon}
          className="whitespace-nowrap"
        >
          {view.name}
        </GameButton>
      ))}
    </div>
  );
};

/**
 * Componente de controles de filtros y búsqueda
 */
const ContentControls = ({
  searchTerm,
  activeFilter,
  sortBy,
  onSearchChange,
  onFilterChange,
  onSortChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: "year", label: "Por año" },
    { value: "year_desc", label: "Por año (desc.)" },
    { value: "title", label: "Por título" },
    { value: "type", label: "Por tipo" },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Búsqueda */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar en la historia..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Controles de filtros */}
      <div className="flex items-center justify-between">
        <GameButton
          onClick={() => setShowFilters(!showFilters)}
          variant="ghost"
          size="sm"
          icon={Filter}
        >
          Filtros
        </GameButton>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filtros expandidos */}
      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-4 bg-stone-50 rounded-xl">
          {Object.entries(FILTER_CONFIG).map(([filterId, filterConfig]) => (
            <GameButton
              key={filterId}
              onClick={() => onFilterChange(filterId)}
              variant={activeFilter === filterId ? "primary" : "ghost"}
              size="sm"
              className="text-xs justify-start"
            >
              <span className="mr-1">{filterConfig.icon}</span>
              {filterConfig.name}
            </GameButton>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Componente principal DailyDisplay
 */
const DailyDisplay = ({
  // Props del hook
  dateInfo,
  currentContent = [],
  isLoading = false,
  activeView = "today",
  activeFilter,
  searchTerm = "",
  sortBy = "year",
  expandedContent,
  streak = 0,
  motivationalMessage = "",
  stats = {},

  // Funciones de acción
  actions = {},
  queries = {},

  // Props adicionales
  onBack,
  showHeader = true,
}) => {
  // Extraer acciones del objeto actions
  const {
    setView = () => {},
    setFilter = () => {},
    setSearch = () => {},
    setSort = () => {},
    toggleFavorite = () => {},
    toggleExpandContent = () => {},
  } = actions;

  const { isFavorite = () => false } = queries;

  // Mostrar loading
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-stone-600">Cargando historia del día...</p>
      </div>
    );
  }

  // Obtener título de la vista
  const getViewTitle = () => {
    switch (activeView) {
      case "today":
        return dateInfo?.isToday
          ? "Contenido de Hoy"
          : `Contenido del ${dateInfo?.formatted}`;
      case "favorites":
        return "Tus Favoritos";
      case "history":
        return "Historial Reciente";
      case "explore":
        return "Explorar Historia";
      default:
        return "Contenido Histórico";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      {showHeader && (
        <DailyHeader
          dateInfo={dateInfo}
          streak={streak}
          motivationalMessage={motivationalMessage}
          stats={stats}
          onBack={onBack}
        />
      )}

      {/* Navegación de vistas */}
      <ViewNavigation activeView={activeView} onViewChange={setView} />

      {/* Controles de filtros y búsqueda */}
      <ContentControls
        searchTerm={searchTerm}
        activeFilter={activeFilter}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
        onSortChange={setSort}
      />

      {/* Título de la sección */}
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold text-stone-800">{getViewTitle()}</h2>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
          {currentContent.length}
        </span>
      </div>

      {/* Contenido */}
      {currentContent.length === 0 ? (
        <div className="text-center p-8 bg-stone-50 rounded-xl">
          <Calendar className="mx-auto mb-4 text-stone-400" size={48} />
          <h3 className="text-lg font-medium text-stone-700 mb-2">
            No hay contenido disponible
          </h3>
          <p className="text-stone-600">
            {activeView === "today" &&
              "No hay eventos históricos registrados para esta fecha."}
            {activeView === "favorites" &&
              "Aún no tienes contenido en favoritos."}
            {activeView === "history" &&
              "No hay historial de contenido visitado."}
            {activeView === "explore" &&
              "No hay contenido disponible para explorar."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {currentContent.map((content, index) => (
            <ContentCard
              key={`${content.id}-${index}`}
              content={content}
              isExpanded={expandedContent === content.id}
              isFavorite={isFavorite(content.id)}
              onToggleExpand={() => toggleExpandContent(content.id)}
              onToggleFavorite={() => toggleFavorite(content.id)}
              showDate={activeView !== "today"}
            />
          ))}
        </div>
      )}

      {/* Mensaje de ayuda */}
      {currentContent.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <Star className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div className="text-blue-800">
              <h5 className="font-bold mb-1">💡 Sabías que:</h5>
              <p className="text-sm">
                Puedes agregar contenido a favoritos haciendo clic en el
                corazón, y explorar más historia cambiando entre las diferentes
                vistas.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyDisplay;
