"use client";
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Shuffle,
  Play,
  Pause,
  Star,
  TrendingUp,
  Calendar,
  Filter,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Zap,
  Map,
  Edit3,
  Heart,
  Brain,
  Timer,
  Award,
  BarChart3,
  Lightbulb,
  RefreshCw,
  MapPin,
  MessageSquare,
} from "lucide-react";

const ActiveStudy = () => {
  const [activeMode, setActiveMode] = useState("dashboard");
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyStats, setStudyStats] = useState({
    cardsStudied: 0,
    correctAnswers: 0,
    streak: 0,
    timeSpent: 0,
  });
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);

  // Timeline game state - moved to top level to fix hooks order
  const [timelineEvents] = useState([
    {
      id: 1,
      title: "Fundación de Roma",
      year: -753,
      description: "Según la tradición, Rómulo funda la ciudad de Roma",
    },
    {
      id: 2,
      title: "Batalla de Maratón",
      year: -490,
      description: "Victoria ateniense sobre los persas",
    },
    {
      id: 3,
      title: "Muerte de Alejandro Magno",
      year: -323,
      description: "Fin del imperio macedonio",
    },
    {
      id: 4,
      title: "Asesinato de Julio César",
      year: -44,
      description: "César es asesinado en los Idus de Marzo",
    },
    {
      id: 5,
      title: "Caída del Imperio Romano de Occidente",
      year: 476,
      description: "Odoacro depone a Rómulo Augústulo",
    },
  ]);
  const [shuffledEvents, setShuffledEvents] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);

  // Matching game state
  const [matchingPairs] = useState([
    {
      id: 1,
      concept: "Julio César",
      description:
        "Dictador romano que cruzó el Rubicón y conquistó las Galias",
      matched: false,
    },
    {
      id: 2,
      concept: "Alejandro Magno",
      description:
        "Rey macedonio que conquistó el Imperio Persa y llegó hasta la India",
      matched: false,
    },
    {
      id: 3,
      concept: "Sócrates",
      description:
        "Filósofo griego que desarrolló el método socrático de enseñanza",
      matched: false,
    },
    {
      id: 4,
      concept: "Cleopatra VII",
      description:
        "Última reina de Egipto, conocida por sus relaciones con César y Marco Antonio",
      matched: false,
    },
    {
      id: 5,
      concept: "Aníbal",
      description:
        "General cartaginés que cruzó los Alpes con elefantes durante las Guerras Púnicas",
      matched: false,
    },
    {
      id: 6,
      concept: "Pericles",
      description:
        "Estadista ateniense que lideró Atenas durante su Edad de Oro",
      matched: false,
    },
  ]);
  const [shuffledConcepts, setShuffledConcepts] = useState([]);
  const [shuffledDescriptions, setShuffledDescriptions] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchingGameStarted, setMatchingGameStarted] = useState(false);
  const [matchingGameCompleted, setMatchingGameCompleted] = useState(false);
  const [matchingScore, setMatchingScore] = useState(0);

  // Map Game States
  const [mapLocations, setMapLocations] = useState([]);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [mapGameStarted, setMapGameStarted] = useState(false);
  const [mapGameCompleted, setMapGameCompleted] = useState(false);

  // Daily Content states
  const [dailyContentType, setDailyContentType] = useState("event"); // 'event', 'character', 'myth'
  const [dailyQuestionIndex, setDailyQuestionIndex] = useState(0);
  const [dailyAnswers, setDailyAnswers] = useState({});
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const [dailyScore, setDailyScore] = useState(0);
  const [mapScore, setMapScore] = useState(0);
  const [mapAttempts, setMapAttempts] = useState(0);
  const [userGuesses, setUserGuesses] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Sample flashcard decks
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
      cards: [
        {
          id: 1,
          front: "¿Quién fue el primer emperador romano?",
          back: "Augusto (Octavio) - Se convirtió en el primer emperador en el 27 a.C. tras derrotar a Marco Antonio en la batalla de Actium. Estableció el Principado y la Pax Romana.",
          mastery: "learning",
          tags: ["Imperio Romano", "Emperadores", "Augusto"],
        },
        {
          id: 2,
          front: "¿Qué emperador construyó el Coliseo?",
          back: "Vespasiano - Comenzó la construcción del Anfiteatro Flavio (Coliseo) en el 72 d.C., aunque fue completado bajo su hijo Tito en el 80 d.C.",
          mastery: "mastered",
          tags: ["Imperio Romano", "Arquitectura", "Vespasiano"],
        },
        {
          id: 3,
          front:
            "¿Cuál fue el último emperador del Imperio Romano de Occidente?",
          back: "Rómulo Augústulo - Fue depuesto en 476 d.C. por Odoacro, marcando tradicionalmente el fin del Imperio Romano de Occidente.",
          mastery: "new",
          tags: ["Imperio Romano", "Caída de Roma"],
        },
      ],
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
      cards: [
        {
          id: 1,
          front: "¿Quién era el rey de los dioses griegos?",
          back: "Zeus - Rey del Olimpo, dios del cielo y el trueno. Hermano de Poseidón y Hades. Padre de muchos dioses y héroes.",
          mastery: "mastered",
          tags: ["Mitología Griega", "Dioses Olímpicos", "Zeus"],
        },
        {
          id: 2,
          front: "¿Qué diosa nació de la cabeza de Zeus?",
          back: "Atenea - Diosa de la sabiduría, la guerra estratégica y las artes. Nació completamente armada de la cabeza de Zeus.",
          mastery: "learning",
          tags: ["Mitología Griega", "Atenea", "Nacimiento"],
        },
      ],
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
      cards: [
        {
          id: 1,
          front:
            "¿En qué batalla Alejandro derrotó definitivamente a Darío III?",
          back: "Batalla de Gaugamela (331 a.C.) - Victoria decisiva de Alejandro Magno que le dio control sobre el Imperio Persa.",
          mastery: "learning",
          tags: ["Alejandro Magno", "Batallas", "Persia"],
        },
      ],
    },
  ];

  // Sample study games
  const studyGames = [
    {
      id: 1,
      title: "Trivia Contrarreloj",
      description: "Responde preguntas rápidas sobre historia antigua",
      icon: Timer,
      color: "bg-red-500",
      type: "trivia",
    },
    {
      id: 2,
      title: "Ordenar Cronológicamente",
      description: "Arrastra eventos para ordenarlos por fecha",
      icon: Clock,
      color: "bg-blue-500",
      type: "timeline",
    },
    {
      id: 3,
      title: "Emparejar Conceptos",
      description: "Conecta personajes con sus descripciones",
      icon: Target,
      color: "bg-green-500",
      type: "matching",
    },
    {
      id: 4,
      title: "Ubicar en el Mapa",
      description: "Encuentra ciudades y imperios antiguos",
      icon: Map,
      color: "bg-purple-500",
      type: "geography",
    },
    {
      id: 5,
      title: "Contenido Diario",
      description: "Evento del día, personaje de la semana y mito diario",
      icon: Calendar,
      color: "bg-indigo-600",
      type: "daily",
    },
  ];

  // Sample spaced repetition data
  const spacedRepetitionData = {
    dueToday: 15,
    newCards: 8,
    learning: 12,
    toReview: 25,
    dailyGoal: 30,
    streak: 7,
  };

  // Timer effect for games
  useEffect(() => {
    let interval = null;
    if (isGameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
    }
    return () => clearInterval(interval);
  }, [isGameActive, timeLeft]);

  const getMasteryColor = (mastery) => {
    switch (mastery) {
      case "new":
        return "bg-gray-400";
      case "learning":
        return "bg-amber-500";
      case "mastered":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const getMasteryText = (mastery) => {
    switch (mastery) {
      case "new":
        return "Nueva";
      case "learning":
        return "Aprendiendo";
      case "mastered":
        return "Dominada";
      default:
        return "Nueva";
    }
  };

  const handleFlashcardAnswer = (correct) => {
    setStudyStats((prev) => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
      streak: correct ? prev.streak + 1 : 0,
    }));

    // Move to next card
    if (currentFlashcard < selectedDeck.cards.length - 1) {
      setCurrentFlashcard(currentFlashcard + 1);
      setShowAnswer(false);
    } else {
      // End of deck
      setActiveMode("dashboard");
      setSelectedDeck(null);
      setCurrentFlashcard(0);
    }
  };

  const startFlashcardStudy = (deck) => {
    setSelectedDeck(deck);
    setCurrentFlashcard(0);
    setShowAnswer(false);
    setActiveMode("flashcards");
    setStudyStats({
      cardsStudied: 0,
      correctAnswers: 0,
      streak: 0,
      timeSpent: 0,
    });
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
              {studyStats.cardsStudied}/{spacedRepetitionData.dailyGoal}{" "}
              tarjetas
            </span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-3">
            <div
              className="bg-amber-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (studyStats.cardsStudied / spacedRepetitionData.dailyGoal) *
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
            {studyGames.map((game) => {
              const IconComponent = game.icon;
              return (
                <button
                  key={game.id}
                  onClick={() => setActiveMode(`game-${game.type}`)}
                  className="p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg border border-amber-200 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${game.color} p-2 rounded-lg`}>
                      <IconComponent size={20} className="text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-stone-800">
                        {game.title}
                      </h5>
                      <p className="text-stone-600 text-sm">
                        {game.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
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

  const renderFlashcards = () => {
    if (!selectedDeck) return null;

    const card = selectedDeck.cards[currentFlashcard];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-stone-800">
                {selectedDeck.title}
              </h3>
              <p className="text-stone-600">
                Tarjeta {currentFlashcard + 1} de {selectedDeck.cards.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-amber-600">
                  {studyStats.streak}
                </div>
                <div className="text-stone-600 text-sm">Racha</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {studyStats.correctAnswers}
                </div>
                <div className="text-stone-600 text-sm">Correctas</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="w-full bg-amber-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentFlashcard + 1) / selectedDeck.cards.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
          <div
            className="min-h-96 p-8 cursor-pointer transition-all duration-300 hover:bg-amber-50"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                {!showAnswer ? (
                  <div>
                    <div className="mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${getMasteryColor(
                          card.mastery
                        )}`}
                      >
                        {getMasteryText(card.mastery)}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-stone-800 mb-4">
                      {card.front}
                    </h4>
                    <div className="flex items-center justify-center space-x-2 text-stone-500">
                      <Eye size={20} />
                      <span>Haz click para ver la respuesta</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-xl font-bold text-stone-800 mb-6">
                      {card.front}
                    </h4>
                    <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                      <p className="text-stone-700 leading-relaxed">
                        {card.back}
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {card.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showAnswer && (
            <div className="bg-stone-50 p-6 border-t border-amber-200">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => handleFlashcardAnswer(false)}
                  className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <XCircle size={20} />
                  <span>Repetir Luego</span>
                </button>
                <button
                  onClick={() => handleFlashcardAnswer(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle size={20} />
                  <span>Lo Sé</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setActiveMode("dashboard");
                setSelectedDeck(null);
              }}
              className="px-6 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors"
            >
              Volver al Dashboard
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  if (currentFlashcard > 0) {
                    setCurrentFlashcard(currentFlashcard - 1);
                    setShowAnswer(false);
                  }
                }}
                disabled={currentFlashcard === 0}
                className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft size={20} />
              </button>

              <span className="text-stone-600">
                {currentFlashcard + 1} / {selectedDeck.cards.length}
              </span>

              <button
                onClick={() => {
                  if (currentFlashcard < selectedDeck.cards.length - 1) {
                    setCurrentFlashcard(currentFlashcard + 1);
                    setShowAnswer(false);
                  }
                }}
                disabled={currentFlashcard === selectedDeck.cards.length - 1}
                className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Map Game Functions
  const mapGameData = [
    {
      id: 1,
      name: "Roma",
      description: "Capital del Imperio Romano",
      coordinates: { x: 52, y: 58 }, // Posición en el mapa (porcentaje)
      info: "Fundada según la tradición en 753 a.C. por Rómulo",
      period: "753 a.C. - 476 d.C.",
    },
    {
      id: 2,
      name: "Atenas",
      description: "Cuna de la democracia",
      coordinates: { x: 58, y: 62 },
      info: "Centro cultural y político de la antigua Grecia",
      period: "800 a.C. - 146 a.C.",
    },
    {
      id: 3,
      name: "Esparta",
      description: "Ciudad-estado militar griega",
      coordinates: { x: 56, y: 66 },
      info: "Famosa por su disciplina militar y el entrenamiento espartano",
      period: "900 a.C. - 146 a.C.",
    },
    {
      id: 4,
      name: "Cartago",
      description: "Rival de Roma en el Mediterráneo",
      coordinates: { x: 48, y: 68 },
      info: "Ciudad fenicia que desafió el poder romano",
      period: "814 a.C. - 146 a.C.",
    },
    {
      id: 5,
      name: "Alejandría",
      description: "Centro de aprendizaje helenístico",
      coordinates: { x: 62, y: 72 },
      info: "Fundada por Alejandro Magno, famosa por su biblioteca",
      period: "331 a.C. - 641 d.C.",
    },
    {
      id: 6,
      name: "Babilonia",
      description: "Capital del Imperio Babilónico",
      coordinates: { x: 72, y: 65 },
      info: "Una de las ciudades más importantes de Mesopotamia",
      period: "1894 a.C. - 539 a.C.",
    },
    {
      id: 7,
      name: "Jerusalén",
      description: "Ciudad sagrada del judaísmo",
      coordinates: { x: 66, y: 68 },
      info: "Centro religioso y político del antiguo Israel",
      period: "1000 a.C. - presente",
    },
    {
      id: 8,
      name: "Constantinopla",
      description: "Capital del Imperio Bizantino",
      coordinates: { x: 60, y: 55 },
      info: "Fundada por Constantino, puente entre Europa y Asia",
      period: "330 d.C. - 1453 d.C.",
    },
  ];

  const startMapGame = () => {
    const shuffled = [...mapGameData].sort(() => Math.random() - 0.5);
    setMapLocations(shuffled);
    setCurrentLocationIndex(0);
    setMapGameStarted(true);
    setMapGameCompleted(false);
    setMapScore(0);
    setMapAttempts(0);
    setUserGuesses([]);
    setShowFeedback(false);
  };

  const handleMapClick = (event) => {
    if (!mapGameStarted || mapGameCompleted || showFeedback) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const currentLocation = mapLocations[currentLocationIndex];
    const distance = Math.sqrt(
      Math.pow(x - currentLocation.coordinates.x, 2) +
        Math.pow(y - currentLocation.coordinates.y, 2)
    );

    const isCorrect = distance <= 8; // Tolerancia de 8% del mapa
    const newAttempts = mapAttempts + 1;
    setMapAttempts(newAttempts);

    const guess = {
      location: currentLocation,
      userClick: { x, y },
      correct: isCorrect,
      distance: distance.toFixed(1),
    };

    setUserGuesses([...userGuesses, guess]);
    setIsCorrectGuess(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      setMapScore(mapScore + 1);
      setFeedbackMessage(
        `¡Correcto! Has ubicado ${currentLocation.name} correctamente.`
      );
    } else {
      setFeedbackMessage(
        `Incorrecto. ${currentLocation.name} está en otra ubicación.`
      );
    }

    // Avanzar a la siguiente ubicación después de 2 segundos
    setTimeout(() => {
      setShowFeedback(false);
      if (currentLocationIndex < mapLocations.length - 1) {
        setCurrentLocationIndex(currentLocationIndex + 1);
      } else {
        setMapGameCompleted(true);
      }
    }, 2000);
  };

  const resetMapGame = () => {
    setMapGameStarted(false);
    setMapGameCompleted(false);
    setCurrentLocationIndex(0);
    setMapScore(0);
    setMapAttempts(0);
    setUserGuesses([]);
    setShowFeedback(false);
  };

  const renderMapGame = () => {
    if (!mapGameStarted) {
      return (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 border border-blue-200">
            <MapPin className="mx-auto text-blue-600 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-stone-800 mb-4">
              Ubicar en el Mapa
            </h3>
            <p className="text-stone-600 mb-6">
              Haz clic en la ubicación correcta de cada lugar histórico en el
              mapa del mundo antiguo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-stone-800 mb-2">
                  📍 Cómo Jugar:
                </h4>
                <ul className="text-stone-600 space-y-1">
                  <li>• Se te mostrará el nombre de un lugar</li>
                  <li>• Haz clic donde crees que está ubicado</li>
                  <li>• Recibirás feedback inmediato</li>
                  <li>• Continúa hasta completar todos</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-stone-800 mb-2">
                  🎯 Lugares a Ubicar:
                </h4>
                <ul className="text-stone-600 space-y-1">
                  <li>• Roma, Atenas, Esparta</li>
                  <li>• Cartago, Alejandría</li>
                  <li>• Babilonia, Jerusalén</li>
                  <li>• Constantinopla</li>
                </ul>
              </div>
            </div>
            <button
              onClick={startMapGame}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Comenzar Juego
            </button>
          </div>
        </div>
      );
    }

    if (mapGameCompleted) {
      const percentage = Math.round((mapScore / mapLocations.length) * 100);
      const efficiency = Math.round((mapScore / mapAttempts) * 100);

      return (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
            <div className="mb-6">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  percentage >= 80
                    ? "bg-green-500"
                    : percentage >= 60
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
              >
                <MapPin size={40} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-stone-800 mb-2">
                ¡Juego Completado!
              </h3>
              <p className="text-stone-600">
                Has terminado de ubicar todos los lugares históricos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-stone-200">
                <div className="text-3xl font-bold text-blue-600">
                  {mapScore}/{mapLocations.length}
                </div>
                <div className="text-stone-600 text-sm">
                  Ubicaciones Correctas
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-stone-200">
                <div className="text-3xl font-bold text-green-600">
                  {percentage}%
                </div>
                <div className="text-stone-600 text-sm">Precisión</div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-stone-200">
                <div className="text-3xl font-bold text-amber-600">
                  {efficiency}%
                </div>
                <div className="text-stone-600 text-sm">Eficiencia</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-stone-200 mb-6">
              <h4 className="text-lg font-bold text-stone-800 mb-4">
                Resumen de Ubicaciones
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userGuesses.map((guess, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 ${
                      guess.correct
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-stone-800">
                          {guess.location.name}
                        </h5>
                        <p className="text-stone-600 text-sm">
                          {guess.location.description}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          guess.correct ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {guess.correct ? "✓" : "✗"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={startMapGame}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Jugar de Nuevo
              </button>
              <button
                onClick={resetMapGame}
                className="bg-stone-600 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors font-medium"
              >
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentLocation = mapLocations[currentLocationIndex];
    const progress = ((currentLocationIndex + 1) / mapLocations.length) * 100;

    return (
      <div className="space-y-6">
        {/* Progress Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-stone-800">
                Ubicar: {currentLocation?.name}
              </h3>
              <p className="text-stone-600">{currentLocation?.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {currentLocationIndex + 1}/{mapLocations.length}
              </div>
              <div className="text-stone-600 text-sm">Progreso</div>
            </div>
          </div>

          <div className="w-full bg-stone-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-sm text-stone-600">
            <span>Correctas: {mapScore}</span>
            <span>Intentos: {mapAttempts}</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="mb-4">
            <h4 className="text-lg font-bold text-stone-800 mb-2">
              Haz clic donde crees que está ubicado:{" "}
              <span className="text-blue-600">{currentLocation?.name}</span>
            </h4>
            <p className="text-stone-600 text-sm">{currentLocation?.info}</p>
          </div>

          {/* Simplified Map */}
          <div
            className="relative w-full h-96 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 rounded-lg border-2 border-stone-300 cursor-crosshair overflow-hidden"
            onClick={handleMapClick}
          >
            {/* Map Background Elements */}
            <div className="absolute inset-0">
              {/* Mediterranean Sea */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-blue-400 rounded-full opacity-70"></div>

              {/* Continents */}
              <div
                className="absolute top-1/4 left-1/4 w-40 h-32 bg-green-300 rounded-lg opacity-60"
                title="Europa"
              ></div>
              <div
                className="absolute top-1/2 right-1/4 w-36 h-28 bg-yellow-300 rounded-lg opacity-60"
                title="Asia"
              ></div>
              <div
                className="absolute bottom-1/4 left-1/3 w-32 h-24 bg-orange-300 rounded-lg opacity-60"
                title="África"
              ></div>
            </div>

            {/* Show correct locations after game completion or for reference */}
            {mapGameCompleted &&
              userGuesses.map((guess, index) => (
                <div key={index}>
                  {/* User's guess */}
                  <div
                    className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
                      guess.correct ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                      left: `${guess.userClick.x}%`,
                      top: `${guess.userClick.y}%`,
                    }}
                    title={`Tu respuesta para ${guess.location.name}`}
                  />
                  {/* Correct location */}
                  <div
                    className="absolute w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                    style={{
                      left: `${guess.location.coordinates.x}%`,
                      top: `${guess.location.coordinates.y}%`,
                    }}
                    title={guess.location.name}
                  />
                </div>
              ))}

            {/* Feedback overlay */}
            {showFeedback && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div
                  className={`bg-white rounded-lg p-6 text-center border-4 ${
                    isCorrectGuess ? "border-green-500" : "border-red-500"
                  }`}
                >
                  <div
                    className={`text-4xl mb-2 ${
                      isCorrectGuess ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isCorrectGuess ? "✓" : "✗"}
                  </div>
                  <p className="text-stone-800 font-medium">
                    {feedbackMessage}
                  </p>
                  {!isCorrectGuess && (
                    <p className="text-stone-600 text-sm mt-2">
                      La ubicación correcta se mostrará en azul
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-center text-stone-600 text-sm">
            💡 Consejo: Haz clic en el área donde crees que se encuentra la
            ubicación histórica
          </div>
        </div>
      </div>
    );
  };

  const renderTriviaGame = () => {
    const triviaQuestions = [
      {
        question: "¿En qué año cayó el Imperio Romano de Occidente?",
        options: ["410 d.C.", "455 d.C.", "476 d.C.", "493 d.C."],
        correct: 2,
      },
      {
        question: "¿Quién fue el último faraón de Egipto?",
        options: ["Nefertiti", "Cleopatra VII", "Hatshepsut", "Ankhesenamón"],
        correct: 1,
      },
    ];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-stone-800">
              Trivia Contrarreloj
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Timer className="text-red-600" size={20} />
                <span className="text-2xl font-bold text-red-600">
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="text-amber-600" size={20} />
                <span className="text-2xl font-bold text-amber-600">
                  {gameScore}
                </span>
              </div>
            </div>
          </div>

          {!isGameActive ? (
            <div className="text-center py-12">
              <Trophy className="mx-auto text-amber-600 mb-4" size={64} />
              <h4 className="text-xl font-bold text-stone-800 mb-4">
                ¿Listo para el desafío?
              </h4>
              <p className="text-stone-600 mb-6">
                Responde tantas preguntas como puedas en 60 segundos
              </p>
              <button
                onClick={() => {
                  setIsGameActive(true);
                  setTimeLeft(60);
                  setGameScore(0);
                }}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-bold"
              >
                Comenzar Juego
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  {triviaQuestions[0].question}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {triviaQuestions[0].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setGameScore(
                          gameScore +
                            (index === triviaQuestions[0].correct ? 10 : 0)
                        )
                      }
                      className="p-3 bg-white border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors text-left"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <button
            onClick={() => setActiveMode("dashboard")}
            className="w-full bg-stone-600 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  };

  const renderTimelineGame = () => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const startGame = () => {
      const shuffled = shuffleArray(timelineEvents);
      setShuffledEvents(shuffled);
      setUserOrder([]);
      setGameStarted(true);
      setGameCompleted(false);
      setScore(0);
    };

    const handleDragStart = (e, event) => {
      setDraggedItem(event);
      e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e, targetIndex) => {
      e.preventDefault();
      if (draggedItem) {
        const newOrder = [...userOrder];
        const existingIndex = newOrder.findIndex(
          (item) => item.id === draggedItem.id
        );

        if (existingIndex !== -1) {
          newOrder.splice(existingIndex, 1);
        }

        newOrder.splice(targetIndex, 0, draggedItem);
        setUserOrder(newOrder);

        // Remove from shuffled events
        setShuffledEvents((prev) =>
          prev.filter((item) => item.id !== draggedItem.id)
        );
        setDraggedItem(null);
      }
    };

    const handleRemoveFromOrder = (eventToRemove) => {
      setUserOrder((prev) =>
        prev.filter((item) => item.id !== eventToRemove.id)
      );
      setShuffledEvents((prev) => [...prev, eventToRemove]);
    };

    const checkAnswer = () => {
      if (userOrder.length !== timelineEvents.length) {
        alert("Por favor, ordena todos los eventos antes de verificar");
        return;
      }

      const correctOrder = [...timelineEvents].sort((a, b) => a.year - b.year);
      let correctPositions = 0;

      userOrder.forEach((userEvent, index) => {
        if (userEvent.id === correctOrder[index].id) {
          correctPositions++;
        }
      });

      const finalScore = Math.round(
        (correctPositions / timelineEvents.length) * 100
      );
      setScore(finalScore);
      setGameCompleted(true);
    };

    const formatYear = (year) => {
      return year < 0 ? `${Math.abs(year)} a.C.` : `${year} d.C.`;
    };

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-stone-800">
                Ordenar Cronológicamente
              </h3>
              <p className="text-stone-600">
                Arrastra los eventos para ordenarlos por fecha
              </p>
            </div>
            {gameStarted && (
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {userOrder.length}
                  </div>
                  <div className="text-stone-600 text-sm">Ordenados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {shuffledEvents.length}
                  </div>
                  <div className="text-stone-600 text-sm">Restantes</div>
                </div>
              </div>
            )}
          </div>

          {!gameStarted ? (
            <div className="text-center py-12">
              <Clock className="mx-auto text-blue-600 mb-4" size={64} />
              <h4 className="text-xl font-bold text-stone-800 mb-4">
                ¿Listo para ordenar la historia?
              </h4>
              <p className="text-stone-600 mb-6">
                Arrastra los eventos históricos para ordenarlos cronológicamente
              </p>
              <button
                onClick={startGame}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
              >
                Comenzar Juego
              </button>
            </div>
          ) : gameCompleted ? (
            <div className="text-center py-12">
              <Trophy className="mx-auto text-amber-600 mb-4" size={64} />
              <h4 className="text-xl font-bold text-stone-800 mb-4">
                ¡Juego Completado!
              </h4>
              <div className="text-4xl font-bold text-amber-600 mb-4">
                {score}%
              </div>
              <p className="text-stone-600 mb-6">
                {score >= 80
                  ? "¡Excelente conocimiento histórico!"
                  : score >= 60
                  ? "¡Buen trabajo!"
                  : "¡Sigue estudiando para mejorar!"}
              </p>
              <div className="space-x-4">
                <button
                  onClick={startGame}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Jugar de Nuevo
                </button>
                <button
                  onClick={() => setActiveMode("dashboard")}
                  className="bg-stone-600 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors"
                >
                  Volver al Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Eventos disponibles */}
              <div>
                <h4 className="text-lg font-bold text-stone-800 mb-4">
                  Eventos Disponibles
                </h4>
                <div className="space-y-3 min-h-96 bg-stone-50 rounded-lg p-4 border-2 border-dashed border-stone-300">
                  {shuffledEvents.map((event) => (
                    <div
                      key={event.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, event)}
                      className="bg-white p-4 rounded-lg border border-stone-200 cursor-move hover:shadow-md transition-all"
                    >
                      <h5 className="font-bold text-stone-800">
                        {event.title}
                      </h5>
                      <p className="text-stone-600 text-sm mt-1">
                        {event.description}
                      </p>
                      <div className="mt-2 text-xs text-stone-500">
                        Arrastra para ordenar
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Línea de tiempo del usuario */}
              <div>
                <h4 className="text-lg font-bold text-stone-800 mb-4">
                  Tu Línea de Tiempo
                </h4>
                <div className="space-y-3 min-h-96 bg-blue-50 rounded-lg p-4 border-2 border-dashed border-blue-300">
                  {userOrder.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-stone-500">
                      Arrastra eventos aquí para crear tu línea de tiempo
                    </div>
                  ) : (
                    userOrder.map((event, index) => (
                      <div
                        key={event.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className="relative"
                      >
                        <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                                  #{index + 1}
                                </div>
                                <h5 className="font-bold text-stone-800">
                                  {event.title}
                                </h5>
                              </div>
                              <p className="text-stone-600 text-sm">
                                {event.description}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveFromOrder(event)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        {/* Drop zone between items */}
                        <div
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index + 1)}
                          className="h-4 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <div className="w-full h-1 bg-blue-300 rounded"></div>
                        </div>
                      </div>
                    ))
                  )}
                  {/* Final drop zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, userOrder.length)}
                    className="h-12 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center text-blue-600 text-sm opacity-50 hover:opacity-100 transition-opacity"
                  >
                    Suelta aquí
                  </div>
                </div>

                {userOrder.length === timelineEvents.length && (
                  <button
                    onClick={checkAnswer}
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-bold"
                  >
                    Verificar Orden
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  const renderOpenQuestions = () => {
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [showModel, setShowModel] = useState(false);

    const openQuestion = {
      question:
        "Explica las causas principales de la caída del Imperio Romano de Occidente",
      modelAnswer:
        "Las principales causas de la caída del Imperio Romano de Occidente incluyen: 1) Crisis económica y devaluación monetaria, 2) Presión de los pueblos bárbaros en las fronteras, 3) División del imperio que debilitó la unidad, 4) Corrupción política y inestabilidad gubernamental, 5) Cristianización que cambió los valores tradicionales romanos, 6) Sobrecarga militar y dificultades para defender las extensas fronteras.",
    };

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-2xl font-bold text-stone-800 mb-6">
            Preguntas Abiertas
          </h3>

          <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 mb-6">
            <h4 className="text-xl font-bold text-stone-800 mb-4">
              {openQuestion.question}
            </h4>

            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full h-40 p-4 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />

            <div className="flex items-center justify-between mt-4">
              <span className="text-stone-600 text-sm">
                {currentAnswer.length} caracteres
              </span>
              <button
                onClick={() => setShowModel(true)}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Ver Respuesta Modelo
              </button>
            </div>
          </div>

          {showModel && (
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h5 className="font-bold text-stone-800 mb-3">
                Respuesta Modelo:
              </h5>
              <p className="text-stone-700 leading-relaxed mb-4">
                {openQuestion.modelAnswer}
              </p>

              <div className="flex space-x-3">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Marcar como Correcta
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Necesito Repasar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <button
            onClick={() => setActiveMode("dashboard")}
            className="w-full bg-stone-600 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  };

  const renderMatchingGame = () => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const startMatchingGame = () => {
      const shuffledC = shuffleArray(matchingPairs);
      const shuffledD = shuffleArray([...matchingPairs]);
      setShuffledConcepts(shuffledC);
      setShuffledDescriptions(shuffledD);
      setSelectedConcept(null);
      setSelectedDescription(null);
      setMatches([]);
      setMatchingGameStarted(true);
      setMatchingGameCompleted(false);
      setMatchingScore(0);
      setAttempts(0);
    };

    const handleConceptSelect = (concept) => {
      if (matches.some((match) => match.concept.id === concept.id)) return;
      setSelectedConcept(concept);

      if (selectedDescription) {
        checkMatch(concept, selectedDescription);
      }
    };

    const handleDescriptionSelect = (description) => {
      if (matches.some((match) => match.description.id === description.id))
        return;
      setSelectedDescription(description);

      if (selectedConcept) {
        checkMatch(selectedConcept, description);
      }
    };

    const checkMatch = (concept, description) => {
      setAttempts((prev) => prev + 1);

      if (concept.id === description.id) {
        // Correct match
        setMatches((prev) => [...prev, { concept, description }]);
        setSelectedConcept(null);
        setSelectedDescription(null);

        if (matches.length + 1 === matchingPairs.length) {
          // Game completed
          const finalScore = Math.round(
            ((matches.length + 1) / attempts + 1) * 100
          );
          setMatchingScore(finalScore);
          setMatchingGameCompleted(true);
        }
      } else {
        // Incorrect match
        setTimeout(() => {
          setSelectedConcept(null);
          setSelectedDescription(null);
        }, 1000);
      }
    };

    const isMatched = (item) => {
      return matches.some(
        (match) =>
          match.concept.id === item.id || match.description.id === item.id
      );
    };

    const getItemStyle = (item, type) => {
      if (isMatched(item))
        return "bg-green-100 border-green-300 text-green-800";
      if (type === "concept" && selectedConcept?.id === item.id)
        return "bg-blue-100 border-blue-300 text-blue-800";
      if (type === "description" && selectedDescription?.id === item.id)
        return "bg-blue-100 border-blue-300 text-blue-800";
      return "bg-white border-stone-200 hover:bg-stone-50";
    };

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-stone-800">
                Emparejar Conceptos
              </h3>
              <p className="text-stone-600">
                Conecta personajes con sus descripciones
              </p>
            </div>
            {matchingGameStarted && (
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {matches.length}
                  </div>
                  <div className="text-stone-600 text-sm">Emparejados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {attempts}
                  </div>
                  <div className="text-stone-600 text-sm">Intentos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {matchingPairs.length - matches.length}
                  </div>
                  <div className="text-stone-600 text-sm">Restantes</div>
                </div>
              </div>
            )}
          </div>

          {!matchingGameStarted ? (
            <div className="text-center py-12">
              <Target className="mx-auto text-green-600 mb-4" size={64} />
              <h4 className="text-xl font-bold text-stone-800 mb-4">
                ¿Listo para emparejar?
              </h4>
              <p className="text-stone-600 mb-6">
                Conecta cada personaje histórico con su descripción correcta
              </p>
              <button
                onClick={startMatchingGame}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold"
              >
                Comenzar Juego
              </button>
            </div>
          ) : matchingGameCompleted ? (
            <div className="text-center py-12">
              <Trophy className="mx-auto text-amber-600 mb-4" size={64} />
              <h4 className="text-xl font-bold text-stone-800 mb-4">
                ¡Juego Completado!
              </h4>
              <div className="text-4xl font-bold text-amber-600 mb-4">
                {matchingScore}%
              </div>
              <p className="text-stone-600 mb-6">
                Emparejaste {matches.length} conceptos en {attempts} intentos
              </p>

              <div className="bg-stone-50 rounded-lg p-6 mb-6">
                <h5 className="font-bold text-stone-800 mb-4">
                  Parejas Correctas:
                </h5>
                <div className="space-y-2">
                  {matches.map((match, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-3 rounded border"
                    >
                      <span className="font-medium text-stone-800">
                        {match.concept.concept}
                      </span>
                      <ArrowRight className="text-stone-400" size={16} />
                      <span className="text-stone-600 text-sm">
                        {match.description.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-x-4">
                <button
                  onClick={startMatchingGame}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Jugar de Nuevo
                </button>
                <button
                  onClick={() => setActiveMode("dashboard")}
                  className="bg-stone-600 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors"
                >
                  Volver al Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Conceptos */}
              <div>
                <h4 className="text-lg font-bold text-stone-800 mb-4">
                  Personajes
                </h4>
                <div className="space-y-3">
                  {shuffledConcepts.map((concept) => (
                    <button
                      key={concept.id}
                      onClick={() => handleConceptSelect(concept)}
                      disabled={isMatched(concept)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${getItemStyle(
                        concept,
                        "concept"
                      )} ${
                        isMatched(concept)
                          ? "cursor-not-allowed opacity-75"
                          : "cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{concept.concept}</span>
                        {isMatched(concept) && (
                          <CheckCircle className="text-green-600" size={20} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Descripciones */}
              <div>
                <h4 className="text-lg font-bold text-stone-800 mb-4">
                  Descripciones
                </h4>
                <div className="space-y-3">
                  {shuffledDescriptions.map((description) => (
                    <button
                      key={description.id}
                      onClick={() => handleDescriptionSelect(description)}
                      disabled={isMatched(description)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${getItemStyle(
                        description,
                        "description"
                      )} ${
                        isMatched(description)
                          ? "cursor-not-allowed opacity-75"
                          : "cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {description.description}
                        </span>
                        {isMatched(description) && (
                          <CheckCircle className="text-green-600" size={20} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDailyContent = () => {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-2xl font-bold text-stone-800 mb-6">
            Contenido Diario
          </h3>
          <p className="text-stone-600">Contenido especial para hoy</p>
        </div>
      </div>
    );
  };

  const renderQuoteGame = () => {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-2xl font-bold text-stone-800 mb-6">
            ¿Quién dijo qué?
          </h3>
          <p className="text-stone-600">
            Asocia citas célebres con personajes históricos
          </p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeMode) {
      case "dashboard":
        return renderDashboard();
      case "flashcards":
        return renderFlashcards();
      case "game-trivia":
        return renderTriviaGame();
      case "game-timeline":
        return renderTimelineGame();
      case "game-matching":
        return renderMatchingGame();
      case "game-geography":
        return renderMapGame();
      case "game-daily":
        return renderDailyContent();
      case "open-questions":
        return renderOpenQuestions();
      case "daily-content":
        return renderDailyContent();
      case "quote-game":
        return renderQuoteGame();
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
              onClick={() => setActiveMode("dashboard")}
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
