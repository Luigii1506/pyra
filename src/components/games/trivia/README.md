# Juego de Trivia Histórica Contrarreloj

## Descripción General

Un juego de trivia histórica contrarreloj completamente modularizado con sistema de puntuación avanzado, múltiples categorías, niveles de dificultad, mecánicas de gamificación y análisis estadístico detallado. Diseñado para desafiar y educar sobre historia antigua y medieval.

## Características Principales

### 🎯 9 Categorías Temáticas Diferentes

1. **Civilizaciones Antiguas**: Mesopotamia, civilizaciones perdidas, grandes imperios
2. **Imperio Romano**: Historia romana desde la República hasta la caída
3. **Grecia Antigua**: Filosofía, democracia, mitología y conquistas
4. **Egipto Antiguo**: Faraones, pirámides y cultura del Nilo
5. **Historia Medieval**: Edad Media, caballeros y reinos feudales
6. **Filosofía Antigua**: Grandes pensadores y escuelas filosóficas
7. **Mitología**: Dioses, mitos y leyendas del mundo antiguo
8. **Guerras Antiguas**: Batallas épicas y conflictos históricos
9. **Personajes Históricos**: Grandes figuras que marcaron la historia

### ⚡ Sistema de Dificultad Escalable

- **Fácil**: 90s, 50 pts base, preguntas básicas
- **Medio**: 60s, 100 pts base, preguntas intermedias
- **Difícil**: 45s, 150 pts base, preguntas avanzadas
- **Experto**: 30s, 200 pts base, preguntas de especialista

### 🏆 Sistema de Puntuación Avanzado

- **Puntos base**: Según dificultad de la pregunta
- **Bonus por tiempo**: Puntos extra por responder rápidamente
- **Bonus por racha**: Multiplicadores por respuestas consecutivas
- **Bonus perfecto**: 2000 puntos por juego sin errores
- **Bonus de completar**: 500 puntos por responder todas las preguntas
- **Penalizaciones**: Por errores y preguntas saltadas

### 🎮 Mecánicas de Juego Avanzadas

- **Configuración personalizada**: Categorías, dificultades, tiempo límite
- **Preguntas balanceadas**: Mezcla inteligente de dificultades
- **Sistema de pausa**: Control total sobre el flujo del juego
- **Auto-pausa**: Pausa automática al perder foco de ventana
- **Feedback visual**: Retroalimentación inmediata con explicaciones
- **Temporizador dinámico**: Estados visual para tiempo crítico

### 📊 Sistema de Logros y Estadísticas

- **Análisis de rendimiento**: Precisión, velocidad, rachas
- **Logros desbloqueables**: Juego perfecto, maestro de rachas, demonio de velocidad
- **Exportación de datos**: JSON y CSV para análisis detallado
- **Revisión de respuestas**: Análisis detallado pregunta por pregunta
- **Estadísticas comparativas**: Métricas de rendimiento y progreso

## Estructura del Proyecto

```
trivia/
├── TriviaGame.js            # Componente principal
├── useTriviaGame.js         # Hook con lógica del juego
├── index.js                 # Exports centralizados
├── README.md                # Documentación
├── components/              # Componentes modulares
│   ├── TriviaGameSetup.js      # Configuración del juego
│   ├── TriviaGamePlay.js       # Gameplay principal
│   ├── TriviaGameResults.js    # Resultados y estadísticas
│   └── index.js               # Exports de componentes
├── constants/               # Configuración y datos
│   ├── trivia-constants.js    # Configuración del juego
│   └── trivia-data.js         # Banco de preguntas
└── utils/                   # Utilidades
    └── trivia-utils.js      # Funciones auxiliares
```

## Uso Básico

### Importación Simple

```javascript
import { TriviaGame } from "./games/trivia";

// Uso básico
<TriviaGame onBack={handleClose} />;
```

### Uso Avanzado con Configuración

```javascript
import { TriviaGame } from "./games/trivia";

const MyTriviaComponent = () => {
  const handleGameComplete = (finalStats) => {
    console.log("Juego completado:", finalStats);
  };

  const initialConfig = {
    category: "roman_empire",
    difficulty: "hard",
    timeLimit: 120,
    useBalancedQuestions: false,
  };

  return (
    <TriviaGame
      onBack={handleClose}
      onGameComplete={handleGameComplete}
      initialConfig={initialConfig}
      showDetailedReview={true}
    />
  );
};
```

### Uso del Hook Personalizado

```javascript
import { useTriviaGame } from "./games/trivia";

const CustomTriviaComponent = () => {
  const {
    gameState,
    currentQuestion,
    score,
    timeLeft,
    streak,
    actions,
    status,
    stats,
  } = useTriviaGame({
    timeLimit: 90,
    category: "mythology",
    difficulty: "medium",
  });

  // Lógica personalizada...
};
```

## Configuración del Juego

### Opciones de Inicialización

```javascript
const gameConfig = {
  // Configuración básica
  category: "mixed", // Categoría o 'mixed' para mezcla
  difficulty: "medium", // 'easy', 'medium', 'hard', 'expert'
  timeLimit: 60, // Tiempo en segundos

  // Opciones avanzadas
  useBalancedQuestions: true, // Mezcla balanceada de dificultades
  showExplanations: true, // Mostrar explicaciones después de responder
  autoPauseOnBlur: true, // Pausa automática al perder foco

  // Preguntas personalizadas
  questions: customQuestions, // Array de preguntas personalizado
};
```

### Estructura de Preguntas

```javascript
const questionExample = {
  id: "unique_id",
  category: "roman_empire",
  difficulty: "medium",
  type: "multiple_choice",
  question: "¿En qué año cayó el Imperio Romano de Occidente?",
  options: ["410 d.C.", "455 d.C.", "476 d.C.", "493 d.C."],
  correct: 2,
  explanation:
    "El Imperio Romano de Occidente cayó en 476 d.C. cuando Odoacro depuso a Rómulo Augústulo.",
};
```

## Componentes Modulares

### TriviaGameSetup

Componente de configuración inicial que permite al usuario personalizar su experiencia de juego.

```javascript
import { TriviaGameSetup } from "./games/trivia";

<TriviaGameSetup
  onStart={handleGameStart}
  onBack={handleBack}
  initialConfig={defaultConfig}
/>;
```

### TriviaGamePlay

Componente principal de gameplay que maneja la experiencia de juego interactiva.

```javascript
import { TriviaGamePlay } from "./games/trivia";

<TriviaGamePlay
  gameState={gameState}
  currentQuestion={currentQuestion}
  currentQuestionIndex={index}
  totalQuestions={total}
  timeLeft={timeLeft}
  score={score}
  streak={streak}
  onAnswerQuestion={handleAnswer}
  onSkipQuestion={handleSkip}
  onPauseGame={handlePause}
  onResumeGame={handleResume}
/>;
```

### TriviaGameResults

Componente de resultados con estadísticas detalladas, logros y opciones de exportación.

```javascript
import { TriviaGameResults } from "./games/trivia";

<TriviaGameResults
  gameConfig={config}
  answers={answers}
  score={score}
  timeUsed={timeUsed}
  streak={streak}
  bestStreak={bestStreak}
  onPlayAgain={handlePlayAgain}
  onChangeSettings={handleSettings}
  onBack={handleBack}
  showDetailedReview={true}
/>;
```

## Hook useTriviaGame

### Estados Principales

```javascript
const {
  // Estados del juego
  gameState, // 'setup', 'playing', 'paused', 'finished'
  currentQuestion, // Pregunta actual
  currentQuestionIndex, // Índice de pregunta actual
  totalQuestions, // Total de preguntas
  timeLeft, // Tiempo restante
  timeElapsed, // Tiempo transcurrido
  score, // Puntuación actual
  answers, // Array de respuestas
  streak, // Racha actual
  bestStreak, // Mejor racha
  isPaused, // Estado de pausa
  progress, // Progreso del juego (%)

  // Configuración
  gameConfig, // Configuración actual del juego

  // Estadísticas
  stats, // Estadísticas en tiempo real
  finalStats, // Estadísticas finales (al terminar)

  // Acciones
  actions: {
    startGame, // Iniciar juego
    pauseGame, // Pausar juego
    resumeGame, // Reanudar juego
    answerQuestion, // Responder pregunta
    skipQuestion, // Saltar pregunta
    resetGame, // Reiniciar juego
    goToSetup, // Volver a configuración
    endGame, // Finalizar juego
  },

  // Estado del juego
  status: {
    isPlaying, // ¿Está jugando?
    isPaused, // ¿Está pausado?
    isFinished, // ¿Ha terminado?
    isSetup, // ¿En configuración?
    hasQuestions, // ¿Tiene preguntas?
    isLastQuestion, // ¿Es la última pregunta?
    timeFormatted, // Tiempo formateado (MM:SS)
    timeElapsedFormatted, // Tiempo transcurrido formateado
  },
} = useTriviaGame(config);
```

### Eventos del Hook

```javascript
// Iniciar juego con configuración
const success = actions.startGame({
  category: "greek_history",
  difficulty: "hard",
  timeLimit: 120,
});

// Responder pregunta
actions.answerQuestion(
  selectedIndex, // Índice de respuesta seleccionada
  timeSpent, // Tiempo gastado (opcional)
  scoreBreakdown // Desglose de puntuación (opcional)
);

// Saltar pregunta
actions.skipQuestion(
  timeSpent, // Tiempo gastado (opcional)
  scoreBreakdown // Desglose de puntuación (opcional)
);
```

## Sistema de Puntuación

### Cálculo de Puntos

La puntuación se calcula usando múltiples factores:

```javascript
// Puntos base según dificultad
const basePoints = {
  easy: 50,
  medium: 100,
  hard: 150,
  expert: 200,
};

// Bonus por tiempo restante
const timeBonus = timeRemaining * timeBonusMultiplier;

// Bonus por racha
const streakMultipliers = {
  3: 1.1, // 10% después de 3 correctas
  5: 1.2, // 20% después de 5 correctas
  7: 1.3, // 30% después de 7 correctas
  10: 1.5, // 50% después de 10 correctas
};

// Puntuación final
const totalPoints = (basePoints + timeBonus) * streakMultiplier;
```

### Logros Disponibles

- **🏆 Juego Perfecto**: 100% precisión con 5+ preguntas
- **🎯 Precisión Magistral**: >90% precisión con 10+ preguntas
- **💥 Maestro de Rachas**: 10+ respuestas consecutivas
- **🔥 Leyenda de Rachas**: 15+ respuestas consecutivas
- **⚡ Dios de las Rachas**: 20+ respuestas consecutivas
- **💨 Demonio de la Velocidad**: ≤5s promedio por pregunta
- **🏃 Maratonista Mental**: 50+ preguntas respondidas

## Utilidades Disponibles

### Funciones de Puntuación

```javascript
import { calculateQuestionScore, calculateFinalScore } from "./games/trivia";

// Calcular puntos de pregunta individual
const scoreData = calculateQuestionScore({
  isCorrect: true,
  difficulty: "hard",
  timeSpent: 8,
  timeLimit: 45,
  currentStreak: 5,
  isSkipped: false,
});

// Calcular puntuación final
const finalScore = calculateFinalScore(answers, totalQuestions, isPerfect);
```

### Funciones de Estadísticas

```javascript
import {
  calculateGameStats,
  getPerformanceMessage,
  checkAchievements,
} from "./games/trivia";

// Calcular estadísticas del juego
const stats = calculateGameStats(answers, totalTime, totalQuestions);

// Obtener mensaje de rendimiento
const performanceMsg = getPerformanceMessage(stats);

// Verificar logros obtenidos
const achievements = checkAchievements(stats);
```

### Funciones de Exportación

```javascript
import { exportGameData } from "./games/trivia";

// Exportar datos del juego
const gameData = {
  gameConfig: config,
  answers: answers,
  stats: stats,
};

// Exportar como JSON o CSV
const jsonData = exportGameData(gameData, "JSON");
const csvData = exportGameData(gameData, "CSV");
```

## Banco de Preguntas

### Acceso a Preguntas

```javascript
import {
  getRandomQuestions,
  getBalancedQuestions,
  ALL_QUESTIONS_BY_CATEGORY,
  QUESTIONS_BY_DIFFICULTY,
} from "./games/trivia";

// Obtener preguntas aleatorias
const randomQuestions = getRandomQuestions(10, "roman_empire", "hard");

// Obtener preguntas balanceadas
const balancedQuestions = getBalancedQuestions(15, "mythology");

// Acceso directo a categorías
const romanQuestions = ALL_QUESTIONS_BY_CATEGORY.roman_empire;
const hardQuestions = QUESTIONS_BY_DIFFICULTY.hard;
```

### Añadir Preguntas Personalizadas

```javascript
const customQuestions = [
  {
    id: "custom_1",
    category: "custom_category",
    difficulty: "medium",
    type: "multiple_choice",
    question: "¿Tu pregunta personalizada?",
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correct: 2,
    explanation: "Explicación de la respuesta correcta.",
  },
  // Más preguntas...
];

// Usar en el juego
<TriviaGame
  initialConfig={{
    questions: customQuestions,
    category: "custom_category",
  }}
/>;
```

## Configuración Avanzada

### Personalización de Constantes

```javascript
import { SCORING_CONFIG, TIME_CONFIG, GAME_CONFIG } from "./games/trivia";

// Modificar configuración de puntuación
const customScoringConfig = {
  ...SCORING_CONFIG,
  BASE_POINTS: 150,
  PERFECT_BONUS: 3000,
};

// Personalizar configuración de tiempo
const customTimeConfig = {
  ...TIME_CONFIG,
  WARNING_THRESHOLD: 15,
  CRITICAL_THRESHOLD: 8,
};
```

### Validación y Manejo de Errores

```javascript
import { validateGameConfig } from "./games/trivia";

const config = {
  questions: questions,
  timeLimit: 60,
  category: "roman_empire",
};

const validation = validateGameConfig(config);
if (!validation.isValid) {
  console.error("Errores de configuración:", validation.errors);
}
```

## Rendimiento y Optimización

### Mejores Prácticas

- **Lazy Loading**: Los componentes se cargan bajo demanda
- **Memorización**: Cálculos pesados se memorizan automáticamente
- **Cleanup**: Timers y listeners se limpian automáticamente
- **Estado Persistente**: El progreso se mantiene durante pausas
- **Batch Updates**: Las actualizaciones de estado se agrupan

### Configuración de Rendimiento

```javascript
// Configurar límites de rendimiento
const performanceConfig = {
  maxQuestionsPerGame: 50,
  maxAnswersInMemory: 100,
  autoCleanupInterval: 300000, // 5 minutos
};
```

## Integración con el Sistema

### Conexión con Dashboard

```javascript
// En el componente padre
const handleTriviaComplete = (finalStats) => {
  // Guardar estadísticas en base de datos
  saveUserStats(userId, finalStats);

  // Actualizar progreso global
  updateUserProgress(userId, finalStats.score);

  // Desbloquear logros
  unlockAchievements(userId, finalStats.achievements);
};

<TriviaGame
  onGameComplete={handleTriviaComplete}
  onBack={() => navigate("/dashboard")}
/>;
```

### Persistencia de Datos

```javascript
// Guardar progreso
const saveGameProgress = (gameState) => {
  localStorage.setItem("triviaProgress", JSON.stringify(gameState));
};

// Restaurar progreso
const restoreGameProgress = () => {
  const saved = localStorage.getItem("triviaProgress");
  return saved ? JSON.parse(saved) : null;
};
```

## Ejemplo Completo de Implementación

```javascript
import React, { useState } from "react";
import { TriviaGame } from "./games/trivia";

const TriviaContainer = () => {
  const [showTrivia, setShowTrivia] = useState(false);
  const [userStats, setUserStats] = useState(null);

  const handleGameComplete = (finalStats) => {
    setUserStats(finalStats);

    // Análisis de rendimiento
    if (finalStats.accuracy > 90) {
      console.log("¡Excelente rendimiento!");
    }

    // Guardar en backend
    fetch("/api/save-trivia-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalStats),
    });
  };

  const initialConfig = {
    category: "mixed",
    difficulty: "medium",
    timeLimit: 90,
    useBalancedQuestions: true,
    showExplanations: true,
  };

  return (
    <div>
      {!showTrivia ? (
        <button onClick={() => setShowTrivia(true)}>
          Iniciar Trivia Histórica
        </button>
      ) : (
        <TriviaGame
          onBack={() => setShowTrivia(false)}
          onGameComplete={handleGameComplete}
          initialConfig={initialConfig}
          showDetailedReview={true}
        />
      )}

      {userStats && (
        <div>
          <h3>Últimos Resultados:</h3>
          <p>Puntuación: {userStats.finalScore}</p>
          <p>Precisión: {userStats.accuracy}%</p>
          <p>Mejor Racha: {userStats.bestStreak}</p>
        </div>
      )}
    </div>
  );
};

export default TriviaContainer;
```
