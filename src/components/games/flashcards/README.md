# Sistema de Flashcards con Repetición Espaciada

## Descripción General

Este sistema implementa un juego de flashcards modular basado en el algoritmo SM-2 (SuperMemo-2), similar al sistema utilizado por Anki. Incluye repetición espaciada inteligente, múltiples niveles de dificultad y seguimiento detallado del progreso.

## Características Principales

### 🧠 Algoritmo SM-2
- **Repetición Espaciada**: Las tarjetas se muestran en intervalos óptimos basados en tu rendimiento
- **Factor de Facilidad**: Se ajusta dinámicamente según tus respuestas
- **Estados de Tarjeta**: Nuevo, Aprendiendo, Revisión, Reaprendizaje

### 🎯 Sistema de Respuestas de 4 Niveles
1. **Otra vez** (Again): Para errores o respuestas no recordadas
2. **Difícil** (Hard): Para respuestas correctas pero con dificultad
3. **Bien** (Good): Para respuestas correctas con esfuerzo moderado
4. **Fácil** (Easy): Para respuestas recordadas instantáneamente

### 📊 Seguimiento y Estadísticas
- Estadísticas de sesión en tiempo real
- Progreso de dominio por mazo
- Reportes detallados al finalizar
- Sistema de logros y reconocimientos

## Estructura del Proyecto

```
flashcards/
├── FlashcardsGame.js          # Componente principal
├── useFlashcardsGame.js       # Hook con lógica del juego
├── index.js                   # Exports centralizados
├── README.md                  # Documentación
├── components/                # Componentes modulares
│   ├── DeckSelection.js       # Selección de mazos
│   ├── CardDisplay.js         # Visualización de tarjetas
│   ├── SessionComplete.js     # Resultados finales
│   └── index.js              # Exports de componentes
├── constants/                 # Configuración y datos
│   ├── flashcards-constants.js # Configuración del algoritmo
│   └── flashcards-data.js     # Datos de ejemplo
└── utils/                     # Utilidades
    ├── sm2-algorithm.js       # Implementación SM-2
    └── flashcards-utils.js    # Funciones auxiliares
```

## Uso Básico

### Importación Simple
```javascript
import { FlashcardsGame } from './games/flashcards';

// Uso básico
<FlashcardsGame 
  onClose={handleClose}
  initialDecks={myDecks}
/>
```

### Uso Avanzado con Hook
```javascript
import { useFlashcardsGame, SAMPLE_DECKS } from './games/flashcards';

const MyFlashcardsComponent = () => {
  const {
    gameState,
    selectedDeck,
    currentCard,
    selectDeck,
    answerCard,
    resetGame,
  } = useFlashcardsGame(SAMPLE_DECKS);
  
  // Lógica personalizada...
};
```

## Estructura de Datos

### Tarjeta (Card)
```javascript
{
  id: 1,
  front: "¿Pregunta?",
  back: "Respuesta detallada",
  tags: ["tag1", "tag2"],
  state: "new", // new, learning, review, relearning
  easeFactor: 2.5,
  interval: 0, // días
  dueDate: Date,
  lapses: 0, // número de errores
  reviews: 0, // número de revisiones
  step: 0 // paso actual en aprendizaje
}
```

### Mazo (Deck)
```javascript
{
  id: 1,
  title: "Título del Mazo",
  category: "Categoría",
  description: "Descripción",
  color: "bg-blue-500",
  cards: [/* array de tarjetas */]
}
```

## Configuración del Algoritmo SM-2

### Parámetros Principales
```javascript
{
  DEFAULT_EASE_FACTOR: 2.5,    // Factor inicial
  MIN_EASE_FACTOR: 1.3,        // Factor mínimo
  NEW_CARD_STEPS: [1, 10],     // Pasos iniciales (minutos)
  GRADUATING_INTERVAL: 1,       // Intervalo de graduación (días)
  EASY_INTERVAL: 4,             // Intervalo fácil (días)
  MAX_INTERVAL: 36500,          // Intervalo máximo (días)
}
```

### Ajustes por Respuesta
- **Otra vez**: Factor -20%, vuelve a aprendizaje
- **Difícil**: Factor -15%, intervalo × 1.2
- **Bien**: Factor sin cambio, intervalo × factor
- **Fácil**: Factor +15%, intervalo × factor × 1.3

## API del Hook useFlashcardsGame

### Estados Principales
```javascript
{
  gameState,              // Estado actual del juego
  selectedDeck,           // Mazo seleccionado
  currentCard,            // Tarjeta actual
  showAnswer,             // Mostrar respuesta
  sessionStats,           // Estadísticas de sesión
  sessionProgress,        // Progreso de sesión
}
```

### Acciones Principales
```javascript
{
  selectDeck(deck),       // Seleccionar mazo
  revealAnswer(),         // Mostrar respuesta
  answerCard(type),       // Responder tarjeta
  resetGame(),            // Reiniciar juego
  updateSessionLimits(),  // Actualizar límites
}
```

## Componentes Modulares

### DeckSelection
Permite seleccionar mazos y configurar límites de sesión.

### CardDisplay
Muestra las tarjetas durante el estudio con estadísticas en tiempo real.

### SessionComplete
Presenta resultados finales, logros y estadísticas detalladas.

## Personalización

### Límites de Sesión
```javascript
{
  newCardsLimit: 20,      // Nuevas tarjetas por sesión
  reviewCardsLimit: 100,  // Revisiones por sesión
  timeLimit: 30,          // Tiempo límite (minutos)
}
```

### Estilos Personalizados
El sistema utiliza Tailwind CSS. Todos los componentes aceptan className para personalización adicional.

## Integración con ActiveStudy

El sistema está diseñado para integrarse perfectamente con el componente ActiveStudy:

```javascript
// En ActiveStudy.js
case `game-${GAME_TYPES.FLASHCARDS}`:
  return <FlashcardsGame onClose={handleBackToDashboard} />;
```

## Estados del Juego

1. **DECK_SELECTION**: Selección de mazo
2. **CARD_FRONT**: Mostrando pregunta
3. **CARD_BACK**: Mostrando respuesta y botones
4. **SESSION_COMPLETE**: Sesión finalizada

## Mejores Prácticas

### Para Desarrolladores
- Usar los hooks proporcionados para lógica compleja
- Extender componentes modulares para personalización
- Mantener coherencia con el algoritmo SM-2

### Para Usuarios
- Ser honesto en las evaluaciones de dificultad
- Estudiar consistentemente para mejores resultados
- Revisar estadísticas para identificar áreas de mejora

## Extensibilidad

El sistema está diseñado para ser extendido fácilmente:

- **Nuevos tipos de tarjetas**: Agregar campos personalizados
- **Algoritmos alternativos**: Reemplazar sm2-algorithm.js
- **Temas personalizados**: Modificar estilos CSS
- **Estadísticas adicionales**: Extender el sistema de reportes

## Rendimiento

- **Optimización de re-renders**: Uso de useMemo y useCallback
- **Carga lazy**: Componentes se cargan según necesidad
- **Persistencia**: Los datos se mantienen durante la sesión
- **Algoritmo eficiente**: SM-2 optimizado para cálculos rápidos