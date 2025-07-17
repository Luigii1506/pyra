/**
 * ActiveStudy Component
 * Componente principal de estudio activo con juegos modulares
 * @created 2024-12-19
 */

"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Target,
  Clock,
  Timer,
  Map,
  Calendar,
  Trophy,
  Star,
  Brain,
  Zap,
  RefreshCw,
  Edit3,
  Lightbulb,
} from "lucide-react";

// Import modular games
import {
  TriviaGame,
  TimelineGame,
  MatchingGame,
  GeographyGame,
  DailyContent,
  QuotesGame,
  GameCard,
  GAME_TYPES,
} from "./games/index.js";

const ActiveStudy = () => {
  const [activeMode, setActiveMode] = useState("dashboard");
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Sample flashcard decks - esto puede venir de props o context
  const flashcardDecks = [
    {
      id: 1,
      title: "Imperio Romano - Emperadores",
      category: "Personajes",
      totalCards: 12,
      masteredCards: 8,
      difficulty: "Intermedio",
      lastStudied: "2024-01-15",
      color: "bg-red-500",
    },
    {
      id: 2,
      title: "Mitología Griega - Dioses Olímpicos",
      category: "Mitología",
      totalCards: 15,
      masteredCards: 10,
      difficulty: "Básico",
      lastStudied: "2024-01-14",
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Batallas Históricas Antiguas",
      category: "Militar",
      totalCards: 20,
      masteredCards: 5,
      difficulty: "Avanzado",
      lastStudied: "2024-01-12",
      color: "bg-orange-500",
    },
  ];

  // Study games configuration
  const studyGames = [
    {
      id: 1,
      title: "Trivia Contrarreloj",
      description: "Responde preguntas rápidas sobre historia antigua",
      icon: Timer,
      color: "bg-red-500",
      type: GAME_TYPES.TRIVIA,
      available: true,
    },
    {
      id: 2,
      title: "Ordenar Cronológicamente",
      description: "Arrastra eventos para ordenarlos por fecha",
      icon: Clock,
      color: "bg-blue-500",
      type: GAME_TYPES.TIMELINE,
      available: true,
    },
    {
      id: 3,
      title: "Emparejar Conceptos",
      description: "Conecta personajes con sus descripciones",
      icon: Target,
      color: "bg-green-500",
      type: GAME_TYPES.MATCHING,
      available: true,
    },
    {
      id: 4,
      title: "Ubicar en el Mapa",
      description: "Encuentra ciudades y imperios antiguos",
      icon: Map,
      color: "bg-purple-500",
      type: GAME_TYPES.GEOGRAPHY,
      available: true,
    },
    {
      id: 5,
      title: "Contenido Diario",
      description: "Evento del día, personaje de la semana y mito diario",
      icon: Calendar,
      color: "bg-indigo-600",
      type: GAME_TYPES.DAILY,
      available: true,
    },
    {
      id: 6,
      title: "¿Quién dijo qué?",
      description: "Asocia citas famosas con sus autores históricos",
      icon: Edit3,
      color: "bg-amber-500",
      type: GAME_TYPES.QUOTES,
      available: true,
    },
  ];

  // Spaced repetition data - esto puede venir de context/props
  const spacedRepetitionData = {
    dueToday: 15,
    newCards: 8,
    learning: 12,
    toReview: 25,
    dailyGoal: 30,
    streak: 7,
    cardsStudied: 18, // Current progress
  };

  const handleGameSelect = (gameType) => {
    setActiveMode(`game-${gameType}`);
  };

  const handleBackToDashboard = () => {
    setActiveMode("dashboard");
    setSelectedDeck(null);
  };

  const handleGameComplete = (gameType, results) => {
    console.log(`Game ${gameType} completed:`, results);
    // Aquí puedes guardar resultados en context/backend
    // Por ahora solo loggeamos
  };

  const startFlashcardStudy = (deck) => {
    setSelectedDeck(deck);
    setActiveMode("flashcards");
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Daily Study Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Estudio del Día
            </h3>
            <p className="text-stone-600">Tu agenda de repaso personalizada</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="text-amber-600" size={24} />
            <span className="text-stone-700 font-medium">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Target size={20} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {spacedRepetitionData.dueToday}
                </div>
                <div className="text-stone-600 text-sm">Para Repasar</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Star size={20} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {spacedRepetitionData.newCards}
                </div>
                <div className="text-stone-600 text-sm">Nuevas</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Brain size={20} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  {spacedRepetitionData.learning}
                </div>
                <div className="text-stone-600 text-sm">Aprendiendo</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {spacedRepetitionData.streak}
                </div>
                <div className="text-stone-600 text-sm">Días Seguidos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-stone-700 font-medium">Progreso Diario</span>
            <span className="text-stone-600 text-sm">
              {spacedRepetitionData.cardsStudied}/
              {spacedRepetitionData.dailyGoal} tarjetas
            </span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-3">
            <div
              className="bg-amber-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (spacedRepetitionData.cardsStudied /
                    spacedRepetitionData.dailyGoal) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Study Modes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flashcards */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-stone-800">Flashcards</h4>
              <p className="text-stone-600 text-sm">
                Repaso con tarjetas interactivas
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {flashcardDecks.slice(0, 3).map((deck) => (
              <div
                key={deck.id}
                className="p-4 bg-amber-50 rounded-lg border border-amber-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-stone-800">
                      {deck.title}
                    </h5>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-stone-600 text-sm">
                        {deck.masteredCards}/{deck.totalCards} dominadas
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          deck.difficulty === "Básico"
                            ? "bg-green-100 text-green-800"
                            : deck.difficulty === "Intermedio"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {deck.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => startFlashcardStudy(deck)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Estudiar
                  </button>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div
                      className={`${deck.color} h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${
                          (deck.masteredCards / deck.totalCards) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveMode("flashcards-overview")}
            className="w-full bg-stone-600 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors"
          >
            Ver Todos los Mazos
          </button>
        </div>

        {/* Study Games */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-600 p-2 rounded-lg">
              <Trophy size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-stone-800">
                Juegos de Estudio
              </h4>
              <p className="text-stone-600 text-sm">Aprende jugando</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {studyGames.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                icon={game.icon}
                color={game.color}
                onClick={() => handleGameSelect(game.type)}
                disabled={!game.available}
                badge={
                  !game.available
                    ? { type: "info", text: "Próximamente" }
                    : null
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h4 className="text-xl font-bold text-stone-800 mb-4">
          Acciones Rápidas
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveMode("spaced-repetition")}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all"
          >
            <RefreshCw className="text-blue-600 mb-2" size={24} />
            <span className="text-stone-800 font-medium text-sm">
              Repetición Espaciada
            </span>
          </button>

          <button
            onClick={() => setActiveMode("open-questions")}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-md transition-all"
          >
            <Edit3 className="text-green-600 mb-2" size={24} />
            <span className="text-stone-800 font-medium text-sm">
              Preguntas Abiertas
            </span>
          </button>

          <button
            onClick={() => setActiveMode("map-study")}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-all"
          >
            <Map className="text-purple-600 mb-2" size={24} />
            <span className="text-stone-800 font-medium text-sm">
              Estudio en Mapas
            </span>
          </button>

          <button
            onClick={() => setActiveMode("summary-cards")}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg hover:shadow-md transition-all"
          >
            <Lightbulb className="text-amber-600 mb-2" size={24} />
            <span className="text-stone-800 font-medium text-sm">
              Fichas Resumen
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title, description) => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h3 className="text-2xl font-bold text-stone-800 mb-4">{title}</h3>
        <p className="text-stone-600 mb-6">{description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-blue-600 mb-2">🚧</div>
          <p className="text-blue-800 font-medium">
            Esta funcionalidad está en desarrollo
          </p>
          <p className="text-blue-600 text-sm mt-1">
            Próximamente estará disponible
          </p>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="mt-6 w-full bg-stone-600 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMode) {
      case "dashboard":
        return renderDashboard();

      case `game-${GAME_TYPES.TRIVIA}`:
        return (
          <TriviaGame
            onBack={handleBackToDashboard}
            onGameComplete={(results) =>
              handleGameComplete(GAME_TYPES.TRIVIA, results)
            }
          />
        );

      case `game-${GAME_TYPES.TIMELINE}`:
        return (
          <TimelineGame
            onBack={handleBackToDashboard}
            onGameComplete={(results) =>
              handleGameComplete(GAME_TYPES.TIMELINE, results)
            }
          />
        );

      case `game-${GAME_TYPES.MATCHING}`:
        return <MatchingGame onClose={handleBackToDashboard} />;

      case `game-${GAME_TYPES.GEOGRAPHY}`:
        return <GeographyGame onClose={handleBackToDashboard} />;

      case `game-${GAME_TYPES.DAILY}`:
        return <DailyContent onClose={handleBackToDashboard} />;

      case `game-${GAME_TYPES.QUOTES}`:
        return <QuotesGame onClose={handleBackToDashboard} />;

      case "flashcards":
        return renderPlaceholder(
          "Flashcards",
          "Sistema de tarjetas de memoria con repetición espaciada"
        );

      case "spaced-repetition":
        return renderPlaceholder(
          "Repetición Espaciada",
          "Algoritmo optimizado para la memorización a largo plazo"
        );

      case "open-questions":
        return renderPlaceholder(
          "Preguntas Abiertas",
          "Practica con preguntas de desarrollo y ensayo"
        );

      case "map-study":
        return renderPlaceholder(
          "Estudio en Mapas",
          "Aprende geografía e historia usando mapas interactivos"
        );

      case "summary-cards":
        return renderPlaceholder(
          "Fichas Resumen",
          "Tarjetas de resumen con conceptos clave"
        );

      default:
        return renderDashboard();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Estudio Activo
            </h3>
            <p className="text-stone-600">
              Técnicas avanzadas de memorización y repaso
            </p>
          </div>

          {activeMode !== "dashboard" && (
            <button
              onClick={handleBackToDashboard}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Dashboard
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default ActiveStudy;
