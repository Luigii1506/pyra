# 📅 Daily Historical Content System

Sistema de contenido histórico diario que muestra eventos, personajes, descubrimientos y hechos históricos relevantes para cada fecha del año.

## 🎯 Concepto

**"La Historia del Día"** - Cada día muestra contenido histórico relevante para esa fecha específica:

- **Nacimientos** de personajes históricos
- **Fallecimientos** de figuras importantes
- **Eventos históricos** significativos
- **Descubrimientos** científicos y geográficos
- **Inventos** y avances tecnológicos
- **Batallas** y conflictos importantes
- **Fundaciones** de ciudades e instituciones
- **Tratados** y acuerdos históricos
- **Coronaciones** y cambios de poder
- **Revoluciones** y movimientos sociales

## 🏗️ Arquitectura Modular

### Estructura de Archivos

```
src/components/games/daily/
├── constants/
│   ├── daily-constants.js     # Tipos, configuraciones, filtros
│   └── daily-data.js          # Base de datos de contenido histórico
├── utils/
│   └── daily-utils.js         # Utilidades de fecha, favoritos, streaks
├── components/
│   ├── DailyDisplay.js        # Componente principal de visualización
│   ├── ContentCard.js         # Tarjeta individual de contenido
│   └── index.js               # Exportaciones de componentes
├── useDailyContent.js         # Hook personalizado
├── DailyContent.js            # Componente principal simplificado
├── index.js                   # Exportaciones del módulo
└── README.md                  # Esta documentación
```

## 🎮 Características Principales

### ✨ Contenido Dinámico por Fecha

- Contenido específico para cada día del año
- Fallback a fechas cercanas si no hay contenido
- Variedad de tipos históricos (10 categorías diferentes)

### 🎯 Sistema de Gamificación

- **Streaks**: Días consecutivos visitando el contenido
- **Favoritos**: Guarda contenido interesante para después
- **Historial**: Seguimiento de contenido visto
- **Logros**: Badges por diferentes hitos

### 🔍 Filtros y Búsqueda

- Filtrado por tipo de contenido (Personajes, Eventos, Descubrimientos, etc.)
- Búsqueda de texto en títulos, descripciones y datos
- Ordenamiento por año, título, tipo

### 📱 Vistas Múltiples

- **Hoy**: Contenido del día actual/seleccionado
- **Favoritos**: Contenido marcado como favorito
- **Historial**: Contenido visitado recientemente
- **Explorar**: Contenido aleatorio para descubrir

## 🔧 Uso Básico

### Implementación Simple

```jsx
import { DailyContent } from "@/components/games/daily";

function MyApp() {
  return <DailyContent onClose={() => console.log("Cerrado")} />;
}
```

### Uso con Hook Personalizado

```jsx
import { useDailyContent, DailyDisplay } from "@/components/games/daily";

function CustomDailyApp() {
  const daily = useDailyContent();

  return (
    <DailyDisplay
      dateInfo={daily.date}
      currentContent={daily.currentContent}
      actions={daily.actions}
      queries={daily.queries}
      // ... otras props
    />
  );
}
```

## 📊 Sistema de Datos

### Estructura de Contenido

```javascript
{
  id: 'unique_id',
  type: 'birth|death|event|discovery|invention|battle|foundation|treaty|coronation|revolution',
  year: -753, // Año (negativo para a.C.)
  title: 'Título del evento',
  name: 'Nombre de persona (opcional)',
  description: 'Descripción detallada',
  period: 'Período histórico',
  importance: 'Por qué es importante',
  keyFacts: ['Dato 1', 'Dato 2', '...'],
  // Campos opcionales según el tipo
  achievements: ['Logro 1', '...'],     // Para personajes
  participants: ['Actor 1', '...'],     // Para eventos
  consequences: ['Resultado 1', '...'], // Para eventos
  quote: 'Cita famosa',
  funFact: 'Dato curioso',
  relatedTopics: ['Tema 1', '...']
}
```

### Organización por Fechas

```javascript
HISTORICAL_CONTENT = {
  1: {
    // Enero
    1: [
      // 1 de enero
      {
        /* evento 1 */
      },
      {
        /* evento 2 */
      },
    ],
    2: [
      // 2 de enero
      {
        /* evento 3 */
      },
    ],
  },
  // ... otros meses
};
```

## 🎨 Sistema de Estilos

### Colores por Tipo

- **Nacimientos**: Verde (🎂)
- **Fallecimientos**: Gris (⚰️)
- **Eventos**: Azul (📅)
- **Descubrimientos**: Púrpura (🔍)
- **Inventos**: Amarillo (💡)
- **Batallas**: Rojo (⚔️)
- **Fundaciones**: Índigo (🏛️)
- **Tratados**: Ámbar (📜)
- **Coronaciones**: Rosa (👑)
- **Revoluciones**: Naranja (🔥)

### Componentes de UI

- Gradientes atractivos para headers
- Tarjetas expandibles con información detallada
- Badges coloridos por tipo de contenido
- Animaciones suaves para transiciones

## 📱 Funcionalidades de Usuario

### Interacciones Principales

- **Expandir/Contraer**: Ver más detalles del contenido
- **Favoritos**: Marcar/desmarcar contenido interesante
- **Navegación**: Cambiar entre vistas (Hoy, Favoritos, etc.)
- **Filtros**: Mostrar solo ciertos tipos de contenido
- **Búsqueda**: Encontrar contenido específico

### Gamificación

- **Streaks**: Contador de días consecutivos
- **Mensajes Motivacionales**: Frases que cambian según el streak
- **Estadísticas**: Cantidad de favoritos, historial, etc.
- **Logros**: Badges por diferentes hitos alcanzados

## 🔧 API del Hook `useDailyContent`

### Estados Principales

```javascript
const {
  // Datos principales
  currentDate, // Fecha actual
  dateInfo, // Información formateada de la fecha
  todayContent, // Contenido del día
  currentContent, // Contenido filtrado/buscado actual
  isLoading, // Estado de carga

  // Filtros y búsqueda
  activeView, // Vista activa: 'today'|'favorites'|'history'|'explore'
  activeFilter, // Filtro activo
  searchTerm, // Término de búsqueda
  sortBy, // Criterio de ordenamiento

  // Gamificación
  streak, // Días consecutivos
  motivationalMessage, // Mensaje motivacional
  stats, // Estadísticas generales

  // Acciones
  actions: {
    setView, // Cambiar vista
    setFilter, // Cambiar filtro
    setSearch, // Cambiar búsqueda
    toggleFavorite, // Alternar favorito
    // ... más acciones
  },

  // Consultas
  queries: {
    isFavorite, // Verificar si es favorito
    getCurrentContent, // Obtener contenido actual
    // ... más consultas
  },
} = useDailyContent();
```

## 💾 Persistencia de Datos

### LocalStorage

- **Favoritos**: `daily_historical_favorites`
- **Historial**: `daily_historical_history`
- **Streak**: `daily_historical_streak`
- **Última Visita**: `daily_historical_last_visit`

### Gestión Automática

- Actualización automática de streaks
- Limpieza de historial (últimas 100 entradas)
- Validación de datos
- Manejo de errores

## 🚀 Extensibilidad

### Agregar Nuevo Contenido

1. Editar `constants/daily-data.js`
2. Agregar contenido en la estructura por fechas
3. Seguir el esquema de datos establecido

### Nuevos Tipos de Contenido

1. Agregar tipo en `CONTENT_TYPES` (constants)
2. Configurar colores/iconos en `CONTENT_CONFIG`
3. Actualizar filtros si es necesario

### Componentes Personalizados

```jsx
import { useDailyContent } from "@/components/games/daily";

function MyCustomDaily() {
  const { currentContent, actions } = useDailyContent();

  return (
    <div>
      {currentContent.map((content) => (
        <MyCustomCard
          key={content.id}
          content={content}
          onFavorite={() => actions.toggleFavorite(content.id)}
        />
      ))}
    </div>
  );
}
```

## 🎯 Mejores Prácticas

### Rendimiento

- Contenido validado al cargar
- Componentes memoizados donde sea necesario
- Carga lazy de detalles expandidos

### UX/UI

- Feedback inmediato en interacciones
- Estados de carga claros
- Mensajes informativos para estados vacíos
- Responsive design

### Mantenimiento

- Código modular y bien documentado
- Constantes centralizadas
- Utilidades reutilizables
- Tests unitarios recomendados

## 📈 Futuras Mejoras

### Funcionalidades Sugeridas

- [ ] Modo offline con Service Workers
- [ ] Notificaciones push diarias
- [ ] Compartir contenido en redes sociales
- [ ] Exportar favoritos a PDF
- [ ] Integración con APIs externas de historia
- [ ] Modo nocturno
- [ ] Múltiples idiomas
- [ ] Contenido multimedia (imágenes, videos)

### Optimizaciones Técnicas

- [ ] Server-side rendering (SSR)
- [ ] Database real en lugar de archivos estáticos
- [ ] Caché inteligente
- [ ] Compresión de imágenes
- [ ] Lazy loading de componentes
- [ ] PWA (Progressive Web App)

---

## 💡 Ejemplo de Uso Completo

```jsx
import React from "react";
import { DailyContent, useDailyContent } from "@/components/games/daily";

// Uso simple
function SimpleDaily() {
  return <DailyContent onClose={() => window.close()} />;
}

// Uso avanzado con hook
function AdvancedDaily() {
  const daily = useDailyContent();

  React.useEffect(() => {
    // Lógica personalizada cuando cambia el contenido
    console.log("Nuevo contenido:", daily.currentContent);
  }, [daily.currentContent]);

  return (
    <div>
      <h1>Historia del {daily.date.formatted}</h1>
      <p>Racha actual: {daily.streak} días</p>

      {daily.currentContent.map((content) => (
        <div key={content.id}>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          <button onClick={() => daily.actions.toggleFavorite(content.id)}>
            {daily.queries.isFavorite(content.id) ? "❤️" : "🤍"}
          </button>
        </div>
      ))}
    </div>
  );
}
```

¡El sistema está listo para mostrar la historia día a día de manera simple, hermosa y funcional! 🎉
