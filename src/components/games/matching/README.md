# Juego de Emparejamiento Histórico

## Descripción General

Un juego de emparejamiento interactivo que conecta elementos históricos relacionados, diseñado para mejorar el reconocimiento y comprensión de datos clave de la historia antigua. El sistema incluye múltiples tipos de emparejamiento, sistema de puntuación avanzado, y mecánicas de gamificación.

## Características Principales

### 🎯 9 Tipos de Emparejamiento Diferentes

1. **Personaje con Descripción**: Conecta figuras históricas con sus biografías
2. **Personaje con Artefacto**: Asocia personajes con objetos que los representan
3. **Personaje con Personaje**: Relaciona figuras históricas entre sí
4. **Lugar con Descripción**: Conecta sitios históricos con su importancia
5. **Lugar con Evento**: Asocia lugares con eventos que ocurrieron allí
6. **Religión con Descripción**: Conecta creencias con sus características
7. **Deidad con Atributo**: Asocia dioses con sus símbolos/poderes
8. **Término con Definición**: Conecta conceptos históricos con explicaciones
9. **Fecha con Evento**: Asocia fechas importantes con eventos históricos

### ⚡ Sistema de Dificultad Escalable

- **Fácil**: 4 pares (2 minutos, 3 pistas)
- **Medio**: 6 pares (3 minutos, 2 pistas)
- **Difícil**: 8 pares (4 minutos, 1 pista)

### 🏆 Sistema de Puntuación Avanzado

- **Puntos base**: 100 puntos por emparejamiento correcto
- **Bonus por racha**: +20% por cada acierto consecutivo
- **Bonus por tiempo**: Puntos extra por completar rápidamente
- **Penalizaciones**: Por pistas usadas y errores cometidos
- **Bonus perfecto**: 1000 puntos por juego sin errores

### 🎮 Mecánicas de Juego

- **Interfaz intuitiva**: Click para seleccionar elementos
- **Feedback visual**: Colores y animaciones para diferentes estados
- **Sistema de pistas**: Ayuda limitada que resalta pares correctos
- **Temporizador**: Presión temporal para aumentar el desafío
- **Pausa/reanudación**: Control total sobre el flujo del juego

## Estructura del Proyecto

```
matching/
├── MatchingGame.js          # Componente principal
├── useMatchingGame.js       # Hook con lógica del juego
├── index.js                 # Exports centralizados
├── README.md                # Documentación
├── components/              # Componentes modulares
│   ├── MatchingGameSetup.js    # Configuración del juego
│   ├── MatchingGamePlay.js     # Gameplay principal
│   ├── MatchingGameResults.js  # Resultados y estadísticas
│   └── index.js               # Exports de componentes
├── constants/               # Configuración y datos
│   ├── matching-constants.js  # Configuración del juego
│   └── matching-data.js       # Datos históricos
└── utils/                   # Utilidades
    └── matching-utils.js    # Funciones auxiliares
```

## Uso Básico

### Importación Simple

```javascript
import { MatchingGame } from "./games/matching";

// Uso básico
<MatchingGame onClose={handleClose} />;
```

### Uso Avanzado con Hook

```javascript
import { useMatchingGame } from "./games/matching";

const MyMatchingComponent = () => {
  const { gameState, items, selectItem, startGame, score, streak } =
    useMatchingGame({
      difficulty: "medium",
      matchingType: "person_description",
    });

  // Lógica personalizada...
};
```

## Configuración del Juego

### Opciones de Inicialización

```javascript
const gameOptions = {
  difficulty: "medium", // 'easy', 'medium', 'hard'
  matchingType: "person_description", // Tipo específico o null para mezcla
  timeLimit: 180, // Tiempo en segundos
  hintsAllowed: 2, // Número de pistas permitidas
};

<MatchingGame initialConfig={gameOptions} onClose={handleClose} />;
```

### Tipos de Emparejamiento Disponibles

```javascript
import { MATCHING_TYPES } from "./games/matching";

// Tipos disponibles:
MATCHING_TYPES.PERSON_DESCRIPTION; // Personaje con Descripción
MATCHING_TYPES.PERSON_ARTIFACT; // Personaje con Artefacto
MATCHING_TYPES.PERSON_PERSON; // Personaje con Personaje
MATCHING_TYPES.PLACE_DESCRIPTION; // Lugar con Descripción
MATCHING_TYPES.PLACE_EVENT; // Lugar con Evento
MATCHING_TYPES.RELIGION_DESCRIPTION; // Religión con Descripción
MATCHING_TYPES.DEITY_ATTRIBUTE; // Deidad con Atributo
MATCHING_TYPES.TERM_DEFINITION; // Término con Definición
MATCHING_TYPES.DATE_EVENT; // Fecha con Evento
```

## Estados del Juego

### Estados Principales

1. **SETUP**: Configuración inicial del juego
2. **PLAYING**: Jugando activamente
3. **PAUSED**: Juego pausado por el usuario
4. **COMPLETED**: Juego completado o tiempo agotado

### Estados de las Cartas

- **IDLE**: Estado normal, disponible para selección
- **SELECTED**: Seleccionada para emparejamiento
- **MATCHED**: Ya emparejada correctamente
- **WRONG**: Selección incorrecta (temporal)
- **HINT**: Resaltada por una pista

## API del Hook useMatchingGame

### Estados Principales

```javascript
{
  gameState,              // Estado actual del juego
  difficulty,             // Nivel de dificultad
  matchingType,           // Tipo de emparejamiento
  items,                  // Elementos del juego
  selectedItems,          // Elementos seleccionados
  matchedPairs,           // Pares ya emparejados
  isLoading,              // Estado de carga
  error,                  // Mensaje de error
}
```

### Estados de Puntuación

```javascript
{
  score,                  // Puntuación actual
  streak,                 // Racha de aciertos
  maxStreak,              // Mejor racha
  wrongAttempts,          // Intentos incorrectos
  hintsUsed,              // Pistas utilizadas
  hintsAvailable,         // Pistas disponibles
}
```

### Estados de Tiempo

```javascript
{
  timeElapsed,            // Tiempo transcurrido
  timeLimit,              // Límite de tiempo
  isTimerActive,          // Si el timer está activo
}
```

### Acciones Principales

```javascript
{
  initializeGame(difficulty, type),  // Inicializar juego
  startGame(),                       // Comenzar juego
  togglePause(),                     // Pausar/reanudar
  selectItem(item),                  // Seleccionar elemento
  useHint(),                         // Usar pista
  restartGame(),                     // Reiniciar
  getFinalResults(),                 // Obtener resultados
}
```

## Datos Históricos

### Estructura de Datos

```javascript
{
  id: 'unique_id',
  left: {
    content: 'Contenido izquierdo',
    type: 'person|place|date|deity|term|religion',
    image: '🏛️'  // Emoji representativo
  },
  right: {
    content: 'Contenido derecho',
    type: 'description|artifact|event|attribute|definition',
    image: '⚔️'  // Emoji representativo
  },
  category: 'MATCHING_TYPE',
  difficulty: 'easy|medium|hard'
}
```

### Ejemplos de Pares

```javascript
// Personaje con Descripción
{
  id: 'pd1',
  left: { content: 'Cleopatra VII', type: 'person', image: '👑' },
  right: { content: 'Última faraona del Antiguo Egipto...', type: 'description' },
  category: 'person_description',
  difficulty: 'easy'
}

// Lugar con Evento
{
  id: 'pe1',
  left: { content: 'Termópilas', type: 'place', image: '⚔️' },
  right: { content: 'Batalla donde 300 espartanos...', type: 'event' },
  category: 'place_event',
  difficulty: 'easy'
}
```

## Sistema de Puntuación

### Configuración Base

```javascript
{
  BASE_POINTS_PER_MATCH: 100,        // Puntos por emparejamiento
  STREAK_BONUS_MULTIPLIER: 0.2,      // 20% por racha
  HINT_PENALTY: 50,                  // Penalización por pista
  TIME_BONUS_THRESHOLD: 0.5,         // Umbral para bonus de tiempo
  TIME_BONUS_POINTS: 500,            // Bonus por velocidad
  WRONG_ATTEMPT_PENALTY: 25,         // Penalización por error
  PERFECT_GAME_BONUS: 1000,          // Bonus por juego perfecto
}
```

### Cálculo de Puntuación

1. **Puntos base**: 100 × multiplicador de dificultad
2. **Bonus por racha**: Puntos base × 0.2 × (racha - 1)
3. **Bonus por tiempo**: 500 puntos si se completa en < 50% del tiempo
4. **Penalizaciones**: -50 por pista, -25 por error
5. **Bonus perfecto**: +1000 por juego sin errores

## Componentes Modulares

### MatchingGameSetup

Permite configurar dificultad, tipo de emparejamiento y límites.

**Props:**

- `onStartGame(config)`: Callback al iniciar juego
- `onUpdateConfig(config)`: Callback al cambiar configuración
- `initialDifficulty`: Dificultad inicial
- `initialMatchingType`: Tipo inicial
- `isLoading`: Estado de carga

### MatchingGamePlay

Componente principal de gameplay con tablero de cartas.

**Props:**

- `game`: Objeto del hook useMatchingGame
- `onPause()`: Callback para pausar
- `onRestart()`: Callback para reiniciar
- `onHint()`: Callback para pista
- `onBack()`: Callback para volver

### MatchingGameResults

Muestra resultados, estadísticas y logros.

**Props:**

- `results`: Objeto con resultados del juego
- `onPlayAgain()`: Callback para jugar de nuevo
- `onBackToSetup()`: Callback para configuración
- `onBackToDashboard()`: Callback para dashboard

## Personalización

### Estilos Personalizados

El sistema utiliza Tailwind CSS. Todos los componentes aceptan `className` para personalización.

```javascript
<MatchingGame className="custom-matching-game" onClose={handleClose} />
```

### Estados de Cartas Personalizables

```javascript
import { CARD_STYLES } from "./games/matching";

// Modificar estilos de estados
const customCardStyles = {
  ...CARD_STYLES,
  [CARD_STATES.SELECTED]: {
    background: "bg-purple-100",
    border: "border-purple-400",
    // ... más estilos
  },
};
```

### Datos Personalizados

```javascript
// Agregar nuevos pares históricos
const customPairs = [
  {
    id: "custom1",
    left: { content: "Mi Personaje", type: "person", image: "👤" },
    right: { content: "Mi Descripción", type: "description" },
    category: "person_description",
    difficulty: "medium",
  },
];
```

## Integración con ActiveStudy

El sistema está diseñado para integrarse con ActiveStudy:

```javascript
// En ActiveStudy.js
case `game-${GAME_TYPES.MATCHING}`:
  return <MatchingGame onClose={handleBackToDashboard} />;
```

## Logros y Reconocimientos

### Sistema de Logros

- **Juego Perfecto**: Sin errores
- **Velocista**: Completado muy rápido (80%+ eficiencia)
- **Racha Impresionante**: 5+ aciertos consecutivos
- **Independiente**: Sin usar pistas
- **Experto**: 90%+ de precisión

### Niveles de Rendimiento

1. **Maestro**: Juego perfecto + alta velocidad
2. **Experto**: 90%+ precisión + buena velocidad
3. **Competente**: 75%+ precisión
4. **Principiante**: 50%+ precisión
5. **Novato**: < 50% precisión

## Mejores Prácticas

### Para Desarrolladores

- Usar el hook useMatchingGame para lógica compleja
- Extender componentes modulares para personalización
- Mantener consistencia en los datos históricos
- Validar configuraciones con validateGameConfig

### Para Jugadores

- Comenzar con dificultad fácil para aprender
- Usar pistas estratégicamente (penalizan puntuación)
- Leer cuidadosamente antes de hacer clic
- Practicar diferentes tipos de emparejamiento

## Rendimiento

### Optimizaciones Implementadas

- **Re-renders optimizados**: useMemo y useCallback
- **Estados eficientes**: Actualizaciones granulares
- **Algoritmos optimizados**: Mezcla Fisher-Yates
- **Feedback inmediato**: Animaciones CSS optimizadas

### Métricas de Rendimiento

- **Tiempo de carga**: < 500ms para inicialización
- **Respuesta de UI**: < 100ms para interacciones
- **Memoria**: Gestión eficiente de estados
- **Animaciones**: 60fps con CSS transforms

## Extensibilidad

### Agregar Nuevos Tipos

```javascript
// 1. Definir nuevo tipo en constants
export const NEW_MATCHING_TYPE = "new_type";

// 2. Agregar configuración
export const MATCHING_TYPE_CONFIG = {
  [NEW_MATCHING_TYPE]: {
    name: "Nuevo Tipo",
    description: "Descripción del nuevo tipo",
    icon: "🆕",
    color: "bg-teal-500",
  },
};

// 3. Crear datos
export const NEW_TYPE_PAIRS = [
  // ... nuevos pares
];
```

### Modificar Sistema de Puntuación

```javascript
// Personalizar configuración de puntuación
const customScoringConfig = {
  ...SCORING_CONFIG,
  BASE_POINTS_PER_MATCH: 150, // Más puntos base
  STREAK_BONUS_MULTIPLIER: 0.3, // Mayor bonus por racha
};
```

## Futuras Mejoras

### Características Planificadas

- **Modo multijugador**: Competir en tiempo real
- **Categorías temáticas**: Períodos históricos específicos
- **Dificultad adaptativa**: Ajuste automático según rendimiento
- **Modo aprendizaje**: Explicaciones después de cada par
- **Estadísticas avanzadas**: Tracking de progreso a largo plazo

### Tipos de Emparejamiento Futuros

- **Causa con Efecto**: Eventos y sus consecuencias
- **Cronología**: Ordenar eventos temporalmente
- **Geografía**: Mapas y ubicaciones específicas
- **Arte y Cultura**: Obras con sus creadores
- **Tecnología**: Inventos con inventores
