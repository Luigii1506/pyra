"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  Clock,
  Trophy,
  Target,
  BarChart3,
  CheckCircle,
  XCircle,
  RotateCcw,
  BookOpen,
  Star,
  Award,
  TrendingUp,
  Calendar,
  Filter,
} from "lucide-react";

const Exams = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examResults, setExamResults] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examHistory, setExamHistory] = useState([]);

  // Sample exam data
  const examCategories = [
    {
      id: "general",
      name: "Historia General",
      icon: BookOpen,
      color: "bg-blue-600",
      description: "Conocimientos generales de historia antigua",
    },
    {
      id: "characters",
      name: "Personajes Históricos",
      icon: Target,
      color: "bg-green-600",
      description: "Biografías y logros de figuras importantes",
    },
    {
      id: "battles",
      name: "Batallas y Guerras",
      icon: Trophy,
      color: "bg-red-600",
      description: "Conflictos militares y estrategias",
    },
    {
      id: "mythology",
      name: "Mitología",
      icon: Star,
      color: "bg-purple-600",
      description: "Mitos y leyendas de diferentes culturas",
    },
    {
      id: "geography",
      name: "Geografía Histórica",
      icon: BarChart3,
      color: "bg-amber-600",
      description: "Ubicaciones y territorios antiguos",
    },
    {
      id: "culture",
      name: "Cultura y Sociedad",
      icon: Award,
      color: "bg-indigo-600",
      description: "Aspectos culturales y sociales",
    },
  ];

  const sampleExams = [
    {
      id: 1,
      title: "Imperio Romano - Nivel Básico",
      category: "general",
      difficulty: "Básico",
      duration: 15,
      totalQuestions: 10,
      description: "Conceptos fundamentales del Imperio Romano",
      questions: [
        {
          id: 1,
          type: "multiple",
          question: "¿En qué año se fundó Roma según la tradición?",
          options: ["753 a.C.", "509 a.C.", "264 a.C.", "27 a.C."],
          correct: 0,
          explanation:
            "Según la tradición romana, Roma fue fundada por Rómulo en el año 753 a.C.",
        },
        {
          id: 2,
          type: "multiple",
          question: "¿Quién fue el primer emperador romano?",
          options: ["Julio César", "Augusto", "Nerón", "Trajano"],
          correct: 1,
          explanation:
            "Augusto (Octavio) se convirtió en el primer emperador romano en el 27 a.C.",
        },
        {
          id: 3,
          type: "true_false",
          question: "El Coliseo fue construido durante el reinado de Nerón.",
          correct: false,
          explanation:
            "El Coliseo fue construido durante la dinastía Flavia, comenzando con Vespasiano.",
        },
        {
          id: 4,
          type: "multiple",
          question: "¿Cuál fue la causa principal de las Guerras Púnicas?",
          options: [
            "Control del Mediterráneo",
            "Disputas religiosas",
            "Comercio de esclavos",
            "Expansión territorial",
          ],
          correct: 0,
          explanation:
            "Las Guerras Púnicas se libraron principalmente por el control del comercio mediterráneo.",
        },
        {
          id: 5,
          type: "fill_blank",
          question:
            "El general cartaginés _______ cruzó los Alpes con elefantes durante la Segunda Guerra Púnica.",
          correct: "Aníbal",
          explanation:
            "Aníbal Barca realizó la famosa travesía de los Alpes en 218 a.C.",
        },
        {
          id: 6,
          type: "multiple",
          question: "¿Qué emperador dividió el Imperio Romano en dos partes?",
          options: ["Constantino", "Diocleciano", "Teodosio", "Justiniano"],
          correct: 1,
          explanation:
            "Diocleciano estableció la Tetrarquía, dividiendo el imperio para una mejor administración.",
        },
        {
          id: 7,
          type: "true_false",
          question:
            "El latín era el único idioma hablado en el Imperio Romano.",
          correct: false,
          explanation:
            "Aunque el latín era oficial, se hablaban muchos idiomas locales, especialmente griego en el este.",
        },
        {
          id: 8,
          type: "multiple",
          question: "¿Cuál era la unidad básica del ejército romano?",
          options: ["Cohorte", "Legión", "Centuria", "Manípulo"],
          correct: 1,
          explanation:
            "La legión era la unidad básica del ejército romano, compuesta por aproximadamente 5,000 hombres.",
        },
        {
          id: 9,
          type: "fill_blank",
          question:
            'La famosa frase "Alea iacta est" fue pronunciada por _______ al cruzar el Rubicón.',
          correct: "Julio César",
          explanation:
            "Julio César pronunció esta frase al cruzar el río Rubicón en 49 a.C., iniciando la guerra civil.",
        },
        {
          id: 10,
          type: "multiple",
          question: "¿En qué año cayó el Imperio Romano de Occidente?",
          options: ["410 d.C.", "455 d.C.", "476 d.C.", "493 d.C."],
          correct: 2,
          explanation:
            "El Imperio Romano de Occidente cayó en 476 d.C. cuando Odoacro depuso a Rómulo Augústulo.",
        },
      ],
    },
    {
      id: 2,
      title: "Mitología Griega - Intermedio",
      category: "mythology",
      difficulty: "Intermedio",
      duration: 20,
      totalQuestions: 15,
      description: "Dioses, héroes y mitos del panteón griego",
      questions: [
        {
          id: 1,
          type: "multiple",
          question: "¿Quién era el rey de los dioses en la mitología griega?",
          options: ["Poseidón", "Hades", "Zeus", "Apolo"],
          correct: 2,
          explanation:
            "Zeus era el rey de los dioses olímpicos y gobernante del cielo y el trueno.",
        },
        {
          id: 2,
          type: "true_false",
          question: "Atenea nació de la cabeza de Zeus.",
          correct: true,
          explanation:
            "Según el mito, Atenea nació completamente armada de la cabeza de Zeus.",
        },
      ],
    },
    {
      id: 3,
      title: "Personajes del Mundo Antiguo",
      category: "characters",
      difficulty: "Avanzado",
      duration: 25,
      totalQuestions: 20,
      description: "Biografías y logros de figuras históricas importantes",
      questions: [
        {
          id: 1,
          type: "multiple",
          question: "¿Quién fue el maestro de Alejandro Magno?",
          options: ["Platón", "Aristóteles", "Sócrates", "Demóstenes"],
          correct: 1,
          explanation:
            "Aristóteles fue el tutor personal de Alejandro Magno durante su juventud.",
        },
      ],
    },
  ];

  // Sample exam history
  const [examHistoryData] = useState([
    {
      id: 1,
      examTitle: "Imperio Romano - Nivel Básico",
      category: "general",
      date: "2024-01-15",
      score: 85,
      totalQuestions: 10,
      correctAnswers: 8,
      timeSpent: 12,
      difficulty: "Básico",
    },
    {
      id: 2,
      examTitle: "Mitología Griega - Intermedio",
      category: "mythology",
      date: "2024-01-12",
      score: 73,
      totalQuestions: 15,
      correctAnswers: 11,
      timeSpent: 18,
      difficulty: "Intermedio",
    },
    {
      id: 3,
      examTitle: "Personajes del Mundo Antiguo",
      category: "characters",
      date: "2024-01-10",
      score: 90,
      totalQuestions: 20,
      correctAnswers: 18,
      timeSpent: 22,
      difficulty: "Avanzado",
    },
  ]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (currentExam && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentExam) {
      handleSubmitExam();
    }
    return () => clearInterval(interval);
  }, [timeLeft, currentExam]);

  const startExam = (exam) => {
    setCurrentExam(exam);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setExamResults(null);
    setTimeLeft(exam.duration * 60);
    setActiveView("taking");
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    const results = calculateResults();
    setExamResults(results);
    setActiveView("results");

    // Add to history
    const newHistoryEntry = {
      id: Date.now(),
      examTitle: currentExam.title,
      category: currentExam.category,
      date: new Date().toISOString().split("T")[0],
      score: results.percentage,
      totalQuestions: currentExam.questions.length,
      correctAnswers: results.correct,
      timeSpent: currentExam.duration - Math.floor(timeLeft / 60),
      difficulty: currentExam.difficulty,
    };

    setExamHistory([newHistoryEntry, ...examHistory]);
  };

  const calculateResults = () => {
    let correct = 0;
    const questionResults = [];

    currentExam.questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      let isCorrect = false;

      if (question.type === "multiple") {
        isCorrect = userAnswer === question.correct;
      } else if (question.type === "true_false") {
        isCorrect = userAnswer === question.correct;
      } else if (question.type === "fill_blank") {
        isCorrect =
          userAnswer &&
          userAnswer.toLowerCase().trim() ===
            question.correct.toLowerCase().trim();
      }

      if (isCorrect) correct++;

      questionResults.push({
        question,
        userAnswer,
        isCorrect,
        correctAnswer: question.correct,
      });
    });

    return {
      correct,
      total: currentExam.questions.length,
      percentage: Math.round((correct / currentExam.questions.length) * 100),
      questionResults,
      timeSpent: currentExam.duration - Math.floor(timeLeft / 60),
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return { text: "Excelente", color: "bg-green-500" };
    if (score >= 70) return { text: "Bueno", color: "bg-amber-500" };
    return { text: "Necesita Mejorar", color: "bg-red-500" };
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-600 text-sm font-medium">
                Exámenes Realizados
              </p>
              <p className="text-3xl font-bold text-stone-800">
                {examHistoryData.length}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Target size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-600 text-sm font-medium">
                Promedio General
              </p>
              <p className="text-3xl font-bold text-stone-800">
                {Math.round(
                  examHistoryData.reduce((acc, exam) => acc + exam.score, 0) /
                    examHistoryData.length
                )}
                %
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-600 text-sm font-medium">
                Mejor Puntuación
              </p>
              <p className="text-3xl font-bold text-stone-800">
                {Math.max(...examHistoryData.map((exam) => exam.score))}%
              </p>
            </div>
            <div className="bg-amber-500 p-3 rounded-lg">
              <Trophy size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-600 text-sm font-medium">Tiempo Total</p>
              <p className="text-3xl font-bold text-stone-800">
                {examHistoryData.reduce((acc, exam) => acc + exam.timeSpent, 0)}
                min
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Available Exams */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h3 className="text-2xl font-bold text-stone-800 mb-6">
          Exámenes Disponibles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleExams.map((exam) => {
            const category = examCategories.find(
              (cat) => cat.id === exam.category
            );
            const IconComponent = category.icon;
            return (
              <div
                key={exam.id}
                className="border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${category.color} p-2 rounded-lg`}>
                    <IconComponent size={20} className="text-white" />
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      exam.difficulty === "Básico"
                        ? "bg-green-100 text-green-800"
                        : exam.difficulty === "Intermedio"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {exam.difficulty}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-stone-800 mb-2">
                  {exam.title}
                </h4>
                <p className="text-stone-600 text-sm mb-4">
                  {exam.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Preguntas:</span>
                    <span className="font-medium">{exam.totalQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Duración:</span>
                    <span className="font-medium">{exam.duration} min</span>
                  </div>
                </div>

                <button
                  onClick={() => startExam(exam)}
                  className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Play size={16} />
                  <span>Comenzar Examen</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-stone-800">
            Resultados Recientes
          </h3>
          <button
            onClick={() => setActiveView("history")}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Ver Todo
          </button>
        </div>
        <div className="space-y-3">
          {examHistoryData.slice(0, 5).map((exam) => {
            const badge = getScoreBadge(exam.score);
            return (
              <div
                key={exam.id}
                className="flex items-center justify-between p-4 bg-amber-50 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold text-stone-800">
                    {exam.examTitle}
                  </h4>
                  <p className="text-stone-600 text-sm">
                    {exam.date} • {exam.difficulty}
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`text-2xl font-bold ${getScoreColor(
                      exam.score
                    )}`}
                  >
                    {exam.score}%
                  </div>
                  <span
                    className={`${badge.color} text-white px-2 py-1 rounded text-xs`}
                  >
                    {badge.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTakingExam = () => {
    const question = currentExam.questions[currentQuestionIndex];
    const progress =
      ((currentQuestionIndex + 1) / currentExam.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-stone-800">
                {currentExam.title}
              </h3>
              <p className="text-stone-600">
                Pregunta {currentQuestionIndex + 1} de{" "}
                {currentExam.questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock size={20} className="text-amber-600" />
                <span
                  className={`font-bold ${
                    timeLeft < 300 ? "text-red-600" : "text-stone-800"
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-amber-200 rounded-full h-2">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200">
          <h4 className="text-xl font-bold text-stone-800 mb-6">
            {question.question}
          </h4>

          {question.type === "multiple" && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(question.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[question.id] === index
                      ? "border-amber-500 bg-amber-50"
                      : "border-stone-300 hover:border-amber-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedAnswers[question.id] === index
                          ? "border-amber-500 bg-amber-500"
                          : "border-stone-400"
                      }`}
                    ></div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {question.type === "true_false" && (
            <div className="space-y-3">
              {[true, false].map((option) => (
                <button
                  key={option.toString()}
                  onClick={() => handleAnswerSelect(question.id, option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[question.id] === option
                      ? "border-amber-500 bg-amber-50"
                      : "border-stone-300 hover:border-amber-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedAnswers[question.id] === option
                          ? "border-amber-500 bg-amber-500"
                          : "border-stone-400"
                      }`}
                    ></div>
                    <span>{option ? "Verdadero" : "Falso"}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {question.type === "fill_blank" && (
            <input
              type="text"
              value={selectedAnswers[question.id] || ""}
              onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
              className="w-full p-4 border-2 border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
              placeholder="Escribe tu respuesta aquí..."
            />
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            <div className="text-stone-600 text-sm">
              {Object.keys(selectedAnswers).length} de{" "}
              {currentExam.questions.length} respondidas
            </div>

            {currentQuestionIndex === currentExam.questions.length - 1 ? (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Finalizar Examen
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const badge = getScoreBadge(examResults.percentage);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Results Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200 text-center">
          <div className="mb-6">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${badge.color} mb-4`}
            >
              <Trophy size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-stone-800 mb-2">
              ¡Examen Completado!
            </h3>
            <p className="text-stone-600">{currentExam.title}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div
                className={`text-4xl font-bold ${getScoreColor(
                  examResults.percentage
                )}`}
              >
                {examResults.percentage}%
              </div>
              <div className="text-stone-600 text-sm">Puntuación</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-stone-800">
                {examResults.correct}/{examResults.total}
              </div>
              <div className="text-stone-600 text-sm">Correctas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-stone-800">
                {examResults.timeSpent}min
              </div>
              <div className="text-stone-600 text-sm">Tiempo</div>
            </div>
            <div>
              <div
                className={`inline-block px-3 py-1 rounded-full text-white text-sm ${badge.color}`}
              >
                {badge.text}
              </div>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <h4 className="text-xl font-bold text-stone-800 mb-6">
            Revisión de Respuestas
          </h4>
          <div className="space-y-4">
            {examResults.questionResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  result.isCorrect
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`mt-1 ${
                      result.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {result.isCorrect ? (
                      <CheckCircle size={20} />
                    ) : (
                      <XCircle size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-stone-800 mb-2">
                      {index + 1}. {result.question.question}
                    </h5>

                    {result.question.type === "multiple" && (
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Tu respuesta:</strong>{" "}
                          {result.question.options[result.userAnswer] ||
                            "Sin respuesta"}
                        </p>
                        {!result.isCorrect && (
                          <p>
                            <strong>Respuesta correcta:</strong>{" "}
                            {result.question.options[result.correctAnswer]}
                          </p>
                        )}
                      </div>
                    )}

                    {result.question.type === "true_false" && (
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Tu respuesta:</strong>{" "}
                          {result.userAnswer !== undefined
                            ? result.userAnswer
                              ? "Verdadero"
                              : "Falso"
                            : "Sin respuesta"}
                        </p>
                        {!result.isCorrect && (
                          <p>
                            <strong>Respuesta correcta:</strong>{" "}
                            {result.correctAnswer ? "Verdadero" : "Falso"}
                          </p>
                        )}
                      </div>
                    )}

                    {result.question.type === "fill_blank" && (
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Tu respuesta:</strong>{" "}
                          {result.userAnswer || "Sin respuesta"}
                        </p>
                        {!result.isCorrect && (
                          <p>
                            <strong>Respuesta correcta:</strong>{" "}
                            {result.correctAnswer}
                          </p>
                        )}
                      </div>
                    )}

                    <p className="text-stone-600 text-sm mt-2">
                      <strong>Explicación:</strong>{" "}
                      {result.question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => startExam(currentExam)}
              className="flex items-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <RotateCcw size={20} />
              <span>Repetir Examen</span>
            </button>
            <button
              onClick={() => setActiveView("dashboard")}
              className="flex items-center space-x-2 bg-stone-600 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors"
            >
              <BookOpen size={20} />
              <span>Volver al Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-stone-800">
            Historial de Exámenes
          </h3>
          <div className="flex items-center space-x-4">
            <Filter className="text-stone-500" size={20} />
            <select className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-stone-700">
              <option>Todos los exámenes</option>
              <option>Último mes</option>
              <option>Última semana</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Examen
                </th>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Puntuación
                </th>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Tiempo
                </th>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Dificultad
                </th>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-200">
              {examHistoryData.map((exam) => {
                const badge = getScoreBadge(exam.score);
                return (
                  <tr key={exam.id} className="hover:bg-amber-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-stone-800">
                        {exam.examTitle}
                      </div>
                      <div className="text-sm text-stone-600">
                        {exam.correctAnswers}/{exam.totalQuestions} correctas
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-600">
                      {new Date(exam.date).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`text-2xl font-bold ${getScoreColor(
                          exam.score
                        )}`}
                      >
                        {exam.score}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-600">
                      {exam.timeSpent} min
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          exam.difficulty === "Básico"
                            ? "bg-green-100 text-green-800"
                            : exam.difficulty === "Intermedio"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {exam.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${badge.color} text-white px-2 py-1 rounded text-xs`}
                      >
                        {badge.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Sistema de Exámenes
            </h3>
            <p className="text-stone-600">
              Evalúa y mejora tus conocimientos de historia antigua
            </p>
          </div>

          {activeView !== "dashboard" && (
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveView("dashboard")}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView("history")}
                className="px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors"
              >
                Historial
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {activeView === "dashboard" && renderDashboard()}
      {activeView === "taking" && renderTakingExam()}
      {activeView === "results" && renderResults()}
      {activeView === "history" && renderHistory()}
    </div>
  );
};

export default Exams;
