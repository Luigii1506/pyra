/**
 * TriviaGameSetup Component
 * Pantalla de configuración inicial para el juego de trivia
 * @created 2024-12-19
 */

import React, { useState, useEffect } from "react";
import {
  Play,
  Settings,
  Timer,
  Trophy,
  Brain,
  BookOpen,
  Target,
  Shuffle,
  Info,
  ChevronDown,
  Check,
} from "lucide-react";

import GameButton from "../../shared/GameButton.js";
import Card from "../../../ui/Card.js";
import {
  TRIVIA_CATEGORIES,
  CATEGORY_CONFIG,
  DIFFICULTY_LEVELS,
  DIFFICULTY_CONFIG,
  GAME_CONFIG,
} from "../constants/trivia-constants.js";
import {
  getRandomQuestions,
  getBalancedQuestions,
} from "../constants/trivia-data.js";
import { validateGameConfig } from "../utils/trivia-utils.js";

const TriviaGameSetup = ({ onStart, onBack = null, initialConfig = {} }) => {
  // Estados de configuración
  const [selectedCategory, setSelectedCategory] = useState(
    initialConfig.category || TRIVIA_CATEGORIES.MIXED
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    initialConfig.difficulty || DIFFICULTY_LEVELS.MEDIUM
  );
  const [questionCount, setQuestionCount] = useState(
    initialConfig.questionCount || GAME_CONFIG.DEFAULT_QUESTIONS_PER_GAME
  );
  const [useBalancedQuestions, setUseBalancedQuestions] = useState(
    initialConfig.useBalancedQuestions !== undefined
      ? initialConfig.useBalancedQuestions
      : true
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customTimeLimit, setCustomTimeLimit] = useState(
    initialConfig.customTimeLimit || null
  );

  // Estados de validación
  const [errors, setErrors] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState(0);

  // Calcular preguntas disponibles cuando cambia la configuración
  useEffect(() => {
    let questions = [];
    if (useBalancedQuestions) {
      questions = getBalancedQuestions(questionCount, selectedCategory);
    } else {
      questions = getRandomQuestions(
        questionCount,
        selectedCategory,
        selectedDifficulty
      );
    }
    setAvailableQuestions(questions.length);
  }, [
    selectedCategory,
    selectedDifficulty,
    questionCount,
    useBalancedQuestions,
  ]);

  // Validar configuración
  useEffect(() => {
    const config = {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      questionCount,
      timeLimit:
        customTimeLimit || DIFFICULTY_CONFIG[selectedDifficulty]?.timeLimit,
      questions: [], // Se validará en el start
    };

    const validation = validateGameConfig(config);
    setErrors(validation.errors);
  }, [selectedCategory, selectedDifficulty, questionCount, customTimeLimit]);

  const handleStart = () => {
    // Generar preguntas según la configuración
    let questions = [];
    if (useBalancedQuestions) {
      questions = getBalancedQuestions(questionCount, selectedCategory);
    } else {
      questions = getRandomQuestions(
        questionCount,
        selectedCategory,
        selectedDifficulty
      );
    }

    const gameConfig = {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      questions,
      timeLimit:
        customTimeLimit || DIFFICULTY_CONFIG[selectedDifficulty]?.timeLimit,
      useBalancedQuestions,
    };

    // Validación final
    const validation = validateGameConfig(gameConfig);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (questions.length === 0) {
      setErrors(["No hay preguntas disponibles para esta configuración"]);
      return;
    }

    onStart(gameConfig);
  };

  const renderCategorySelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-stone-800 flex items-center">
        <BookOpen className="mr-2" size={20} />
        Categoría de Preguntas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(CATEGORY_CONFIG).map(([categoryKey, config]) => (
          <button
            key={categoryKey}
            onClick={() => setSelectedCategory(categoryKey)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedCategory === categoryKey
                ? `${config.borderColor} ${config.color} text-white shadow-lg scale-105`
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{config.icon}</span>
              {selectedCategory === categoryKey && (
                <Check size={20} className="text-white" />
              )}
            </div>
            <h4
              className={`font-bold text-sm mb-1 ${
                selectedCategory === categoryKey
                  ? "text-white"
                  : "text-stone-800"
              }`}
            >
              {config.name}
            </h4>
            <p
              className={`text-xs ${
                selectedCategory === categoryKey
                  ? "text-white opacity-90"
                  : "text-stone-600"
              }`}
            >
              {config.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDifficultySelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-stone-800 flex items-center">
        <Target className="mr-2" size={20} />
        Nivel de Dificultad
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(DIFFICULTY_CONFIG).map(([difficultyKey, config]) => (
          <button
            key={difficultyKey}
            onClick={() => setSelectedDifficulty(difficultyKey)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
              selectedDifficulty === difficultyKey
                ? `${config.borderColor} ${config.color} text-white shadow-lg scale-105`
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl mr-2">{config.icon}</span>
              {selectedDifficulty === difficultyKey && (
                <Check size={16} className="text-white" />
              )}
            </div>
            <h4
              className={`font-bold text-sm mb-1 ${
                selectedDifficulty === difficultyKey
                  ? "text-white"
                  : "text-stone-800"
              }`}
            >
              {config.name}
            </h4>
            <p
              className={`text-xs mb-2 ${
                selectedDifficulty === difficultyKey
                  ? "text-white opacity-90"
                  : "text-stone-600"
              }`}
            >
              {config.description}
            </p>
            <div
              className={`text-xs ${
                selectedDifficulty === difficultyKey
                  ? "text-white"
                  : "text-stone-500"
              }`}
            >
              <div>⏱️ {config.timeLimit}s</div>
              <div>🎯 {config.pointsBase} pts base</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderGameOptions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-stone-800 flex items-center">
        <Settings className="mr-2" size={20} />
        Opciones de Juego
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Número de preguntas */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            Número de preguntas
          </label>
          <input
            type="range"
            min={GAME_CONFIG.MIN_QUESTIONS_PER_GAME}
            max={GAME_CONFIG.MAX_QUESTIONS_PER_GAME}
            step="1"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-stone-600">
            <span>{GAME_CONFIG.MIN_QUESTIONS_PER_GAME}</span>
            <span className="font-bold text-blue-600">{questionCount}</span>
            <span>{GAME_CONFIG.MAX_QUESTIONS_PER_GAME}</span>
          </div>
        </div>

        {/* Tipo de preguntas */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            Tipo de preguntas
          </label>
          <div className="space-y-2">
            <button
              onClick={() => setUseBalancedQuestions(true)}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                useBalancedQuestions
                  ? "border-blue-300 bg-blue-50 text-blue-800"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">🎲 Mezcla Balanceada</h4>
                  <p className="text-xs opacity-75">
                    50% fácil, 30% medio, 20% difícil
                  </p>
                </div>
                {useBalancedQuestions && <Check size={16} />}
              </div>
            </button>

            <button
              onClick={() => setUseBalancedQuestions(false)}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                !useBalancedQuestions
                  ? "border-blue-300 bg-blue-50 text-blue-800"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">🎯 Dificultad Fija</h4>
                  <p className="text-xs opacity-75">
                    Solo preguntas de la dificultad seleccionada
                  </p>
                </div>
                {!useBalancedQuestions && <Check size={16} />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvancedOptions = () => (
    <div className="space-y-4">
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center text-stone-600 hover:text-stone-800 transition-colors"
      >
        <Settings className="mr-2" size={16} />
        <span className="text-sm font-medium">Opciones Avanzadas</span>
        <ChevronDown
          size={16}
          className={`ml-2 transition-transform ${
            showAdvanced ? "rotate-180" : ""
          }`}
        />
      </button>

      {showAdvanced && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Límite de tiempo personalizado (segundos)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="10"
                max="600"
                value={customTimeLimit || ""}
                onChange={(e) =>
                  setCustomTimeLimit(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                placeholder={`Por defecto: ${DIFFICULTY_CONFIG[selectedDifficulty]?.timeLimit}s`}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              {customTimeLimit && (
                <button
                  onClick={() => setCustomTimeLimit(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              )}
            </div>
            <p className="text-xs text-stone-600 mt-1">
              Deja vacío para usar el tiempo por defecto de la dificultad
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderGameSummary = () => {
    const timeLimit =
      customTimeLimit || DIFFICULTY_CONFIG[selectedDifficulty]?.timeLimit;

    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Brain className="text-blue-600 mr-2" size={24} />
            <h3 className="text-xl font-bold text-stone-800">
              Resumen del Juego
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-blue-600">
                {CATEGORY_CONFIG[selectedCategory]?.name}
              </div>
              <div className="text-stone-600">Categoría</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600">
                {DIFFICULTY_CONFIG[selectedDifficulty]?.name}
              </div>
              <div className="text-stone-600">Dificultad</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">
                {availableQuestions}
              </div>
              <div className="text-stone-600">Preguntas</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-orange-600">{timeLimit}s</div>
              <div className="text-stone-600">Tiempo total</div>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-red-800 text-sm">
                <strong>⚠️ Errores de configuración:</strong>
                <ul className="mt-1 list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {availableQuestions < questionCount && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="text-yellow-800 text-sm">
                <Info size={16} className="inline mr-1" />
                Solo hay {availableQuestions} preguntas disponibles para esta
                configuración. Se usarán todas las disponibles.
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <Timer className="text-red-600 mr-3" size={32} />
          <h2 className="text-3xl font-bold text-stone-800">
            Configurar Trivia
          </h2>
        </div>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Personaliza tu experiencia de trivia histórica. Selecciona la
          categoría, dificultad y opciones que más te desafíen.
        </p>
      </div>

      {/* Configuración */}
      <div className="space-y-8">
        {renderCategorySelection()}
        {renderDifficultySelection()}
        {renderGameOptions()}
        {renderAdvancedOptions()}
      </div>

      {/* Resumen */}
      {renderGameSummary()}

      {/* Botones de acción */}
      <div className="flex justify-center space-x-4">
        {onBack && (
          <GameButton onClick={onBack} variant="secondary">
            Volver
          </GameButton>
        )}

        <GameButton
          onClick={handleStart}
          variant="danger"
          size="lg"
          icon={Play}
          disabled={errors.length > 0 || availableQuestions === 0}
        >
          {availableQuestions === 0
            ? "Sin preguntas disponibles"
            : "Comenzar Trivia"}
        </GameButton>
      </div>
    </div>
  );
};

export default TriviaGameSetup;
