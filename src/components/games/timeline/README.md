# Timeline Game - Juego de Línea de Tiempo

Juego interactivo de ordenamiento cronológico de eventos históricos con interfaz drag-and-drop intuitiva y hermosa.

## 🎯 Características

### 🎮 Funcionalidades del Juego

- **Drag & Drop Intuitivo**: Arrastra eventos para ordenarlos cronológicamente
- **Interfaz Responsive**: Optimizada para desktop y móviles
- **Pistas Opcionales**: Mostrar/ocultar años para facilitar el ordenamiento
- **Sistema de Puntuación**: Puntos base + bonus + penalizaciones
- **Múltiples Intentos**: Hasta 3 intentos para mejorar la puntuación
- **Feedback Visual**: Colores y animaciones para guiar al usuario
- **Análisis Detallado**: Comparación entre tu orden y el correcto

### 📚 Contenido Histórico

- **Eventos Antiguos**: Roma, Grecia, Imperio Romano
- **Época Medieval**: Carlomagno, Cruzadas, Magna Carta
- **Renacimiento**: Descubrimientos, Reforma Protestante
- **Era Moderna**: Revoluciones, Unificaciones
- **Época Contemporánea**: Guerras Mundiales, Era Espacial

## 🏗️ Arquitectura Modular

### Componentes Principales

```
timeline/
├── TimelineGame.js          # Componente principal simplificado
├── useTimelineGame.js       # Hook para lógica del juego
├── components/              # Componentes modulares
│   ├── TimelineGamePlay.js  # Interfaz de juego principal
│   ├── TimelineGameResults.js # Pantalla de resultados
│   └── index.js            # Exportaciones centralizadas
├── constants/              # Configuraciones y datos
│   ├── timeline-constants.js # Estados, configuraciones, estilos
│   └── timeline-data.js    # Eventos históricos organizados
├── utils/                  # Utilidades y helpers
│   └── timeline-utils.js   # Funciones de cálculo y validación
└── index.js               # Exportaciones del módulo
```

## 🚀 Uso Básico

### Importar el Juego

```javascript
import { TimelineGame } from './components/games/timeline';

// Uso simple (eventos por defecto)
<TimelineGame
  onBack={() => console.log('Volver')}
  onGameComplete={(results) => console.log(results)}
/>

// Con eventos personalizados
<TimelineGame
  events={customEvents}
  onBack={handleBack}
  onGameComplete={handleComplete}
/>
```

### Usar Hook Personalizado

```javascript
import { useTimelineGame } from "./components/games/timeline";

function CustomTimelineGame() {
  const { gameState, shuffledEvents, userOrder, verification, score, actions } =
    useTimelineGame(events);

  return <div>{/* Tu interfaz personalizada */}</div>;
}
```

## ⚙️ Configuración

### Estados del Juego

```javascript
TIMELINE_GAME_STATES = {
  SETUP: "setup", // Preparando el juego
  PLAYING: "playing", // Jugando activamente
  FINISHED: "finished", // Juego terminado
};
```

### Configuración de Puntuación

```javascript
GAME_CONFIG = {
  POINTS_PER_CORRECT_POSITION: 100, // Puntos por posición correcta
  BONUS_PERFECT_ORDER: 500, // Bonus por orden perfecto
  PENALTY_PER_ATTEMPT: 50, // Penalización por intento adicional
  MAX_ATTEMPTS: 3, // Intentos máximos
};
```

### Estructura de Eventos

```javascript
const event = {
  id: "unique_id",
  title: "Nombre del evento",
  year: -753, // Año (negativo para a.C.)
  description: "Descripción detallada",
  period: "Período histórico",
  historicalPeriod: "ancient", // Categoría
  icon: "🏛️", // Emoji opcional
};
```

## 🎨 Componentes Modulares

### TimelineGamePlay

Componente principal del gameplay con drag-and-drop.

```javascript
<TimelineGamePlay
  shuffledEvents={shuffledEvents}
  userOrder={userOrder}
  verification={verification}
  attempts={attempts}
  showHints={showHints}
  onDragStart={handleDragStart}
  onDrop={handleDrop}
  onVerifyOrder={verifyOrder}
  onShowHints={toggleHints}
  onReset={resetGame}
/>
```

### TimelineGameResults

Pantalla de resultados con análisis detallado.

```javascript
<TimelineGameResults
  verification={verification}
  score={score}
  attempts={attempts}
  events={events}
  userOrder={userOrder}
  onPlayAgain={startNewGame}
  onBack={returnToDashboard}
/>
```

## 🛠️ Utilidades Principales

### Verificación de Orden

```javascript
import { verifyOrder } from "./utils/timeline-utils";

const verification = verifyOrder(userOrder);
// Returns: { results, correctPositions, accuracy, isPerfect }
```

### Cálculo de Puntuación

```javascript
import { calculateScore } from "./utils/timeline-utils";

const score = calculateScore(verification, attempts);
// Returns: { baseScore, perfectBonus, penalties, finalScore }
```

### Formateo de Años

```javascript
import { formatYear } from "./utils/timeline-utils";

formatYear(-753); // "753 a.C."
formatYear(1492); // "1492 d.C."
```

## 📊 Sistema de Puntuación

### Puntos Base

- **100 puntos** por cada evento en posición correcta
- Ejemplo: 4/5 correctos = 400 puntos base

### Bonificaciones

- **Bonus Perfecto**: +500 puntos por orden 100% correcto
- **Primer Intento**: Sin penalizaciones

### Penalizaciones

- **Intentos Adicionales**: -50 puntos por cada intento extra
- Ejemplo: 3 intentos = -100 puntos

### Puntuación Final

```
Puntuación = (Correctos × 100) + Bonus - Penalizaciones
```

## 🎯 Feedback y Mensajes

### Niveles de Rendimiento

- **🏆 Perfecto** (100%): "¡Ordenaste todos los eventos correctamente!"
- **⭐ Excelente** (80%+): "Solo un par de eventos fuera de lugar"
- **👍 Bien** (60%+): "Buen trabajo, pero puedes mejorar"
- **📚 Practicar** (<60%): "La cronología requiere más estudio"

## 🔧 Personalización

### Eventos Personalizados

```javascript
const customEvents = [
  {
    id: "custom_1",
    title: "Mi Evento Histórico",
    year: 1234,
    description: "Descripción del evento",
    period: "Mi Período",
    historicalPeriod: "custom",
    icon: "📅",
  },
  // ... más eventos
];

<TimelineGame events={customEvents} />;
```

### Configuración de Dificultad

```javascript
import { getEventsByPeriod } from "./constants/timeline-data";

// Solo eventos medievales
const medievalEvents = getEventsByPeriod("medieval", 5);

// Eventos aleatorios
const randomEvents = getRandomEvents(8, "mixed");

// Eventos balanceados
const balancedEvents = getBalancedEvents(6);
```

## 📱 Responsive Design

### Características Móviles

- **Touch-friendly**: Botones y áreas de toque optimizadas
- **Interfaz Adaptativa**: Layout que se ajusta a pantallas pequeñas
- **Gestos Intuitivos**: Tap para agregar/quitar eventos
- **Feedback Visual**: Animaciones suaves y estados claros

### Breakpoints

- **Mobile**: < 768px - Layout vertical
- **Tablet**: 768px - 1024px - Columnas adaptativas
- **Desktop**: > 1024px - Layout completo de 2 columnas

## 🚀 Integración

### En el Dashboard Principal

```javascript
import { TimelineGame } from "@/components/games/timeline";

function StudyDashboard() {
  const handleGameComplete = (results) => {
    // Guardar resultados, actualizar progreso, etc.
    console.log("Puntuación:", results.score);
    console.log("Precisión:", results.accuracy);
  };

  return (
    <TimelineGame
      onGameComplete={handleGameComplete}
      onBack={() => setActiveGame(null)}
    />
  );
}
```

### Con Datos Dinámicos

```javascript
// Obtener eventos desde API
const [events, setEvents] = useState([]);

useEffect(() => {
  fetchHistoricalEvents().then(setEvents);
}, []);

<TimelineGame events={events} onGameComplete={saveResults} />;
```

## 🎮 Flujo del Juego

1. **Inicio Automático**: El juego se inicia inmediatamente con eventos por defecto
2. **Selección de Eventos**: Los eventos se mezclan y muestran a la izquierda
3. **Ordenamiento**: El usuario arrastra eventos a la línea de tiempo
4. **Verificación**: Al completar, puede verificar el orden cronológico
5. **Resultados**: Muestra puntuación, análisis y comparación detallada
6. **Repetición**: Opción para jugar de nuevo o cambiar configuración

## 🏆 Características Destacadas

- ✅ **Inicio Inmediato**: Sin configuraciones complejas
- ✅ **Interfaz Intuitiva**: Drag-and-drop natural
- ✅ **Feedback Rico**: Colores, animaciones, mensajes
- ✅ **Educativo**: Contenido histórico auténtico
- ✅ **Progresivo**: Sistema de intentos y mejora
- ✅ **Responsive**: Funciona en todos los dispositivos
- ✅ **Modular**: Fácil de personalizar y extender
- ✅ **Performante**: Optimizado para UX fluida
