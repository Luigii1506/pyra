# Quotes Game - Modular Architecture

This document describes the modular architecture of the Quotes Game component, which has been refactored for better maintainability, reusability, and code organization.

## 📁 Folder Structure

```
src/components/games/quotes/
├── QuotesGame.js                    # Main orchestrator component
├── useQuotesGame.js                 # Game logic hook
├── index.js                         # Main module exports
├── README.md                        # This documentation
├── components/                      # UI Components
│   ├── index.js                     # Component exports
│   ├── QuotesGameSetup.js          # Setup/menu screen
│   ├── QuotesGamePlay.js           # Main game screen
│   ├── QuotesGameResults.js        # Results screen
│   ├── GameProgress.js             # Progress header component
│   ├── QuestionDisplay.js          # Question display logic
│   ├── AnswerOptions.js            # Answer buttons with feedback
│   ├── HintDisplay.js              # Hint display component
│   └── ResultExplanation.js        # Contextual explanations
├── constants/                       # Constants and configuration
│   └── quotes-game-constants.js    # Game constants and sample data
└── utils/                          # Utility functions
    └── quotes-game-utils.js        # Reusable utility functions
```

## 🎯 Architecture Principles

### 1. **Single Responsibility**

Each component has one clear responsibility:

- `QuotesGame.js`: Orchestrates the game flow
- `QuotesGameSetup.js`: Handles game mode selection
- `QuotesGamePlay.js`: Manages active gameplay
- `QuotesGameResults.js`: Displays results and statistics

### 2. **Separation of Concerns**

- **UI Components**: Focus on rendering and user interaction
- **Business Logic**: Contained in the `useQuotesGame` hook
- **Constants**: Centralized in dedicated files
- **Utilities**: Reusable functions for common operations

### 3. **Reusability**

Components are designed to be:

- **Composable**: Can be used independently
- **Configurable**: Accept props for customization
- **Testable**: Pure functions with clear inputs/outputs

## 🧩 Component Details

### Main Components

#### `QuotesGame.js` (Main Orchestrator)

- **Purpose**: Controls game state transitions and coordinates between screens
- **Size**: ~108 lines (reduced from 1023 lines)
- **Dependencies**: Uses modular screen components
- **Responsibilities**:
  - Game state management
  - Screen routing
  - Event handling coordination

#### `QuotesGameSetup.js` (Setup Screen)

- **Purpose**: Game mode selection and preview
- **Features**:
  - Two game modes with descriptions
  - Sample quotes preview
  - Game statistics display
  - Responsive design

#### `QuotesGamePlay.js` (Game Screen)

- **Purpose**: Active gameplay interface
- **Features**:
  - Progress tracking
  - Question display
  - Answer selection
  - Hints and controls
  - Real-time feedback

#### `QuotesGameResults.js` (Results Screen)

- **Purpose**: Game completion and detailed review
- **Features**:
  - Score display with messaging
  - Detailed question review
  - Restart options
  - Performance statistics

### UI Subcomponents

#### `GameProgress.js`

- Progress bar and timer
- Score display
- Question counter

#### `QuestionDisplay.js`

- Handles both game modes (quote-to-person / person-to-quote)
- Conditional rendering based on mode
- Quote formatting and original text display

#### `AnswerOptions.js`

- Interactive answer buttons
- Visual feedback for correct/incorrect answers
- Hint elimination support
- Letter labels (A, B, C, D)

#### `HintDisplay.js`

- Temporary hint messages
- Contextual information
- Auto-hide functionality

#### `ResultExplanation.js`

- Historical context after answers
- Period and category information
- Educational content display

## 🛠️ Utilities and Constants

### `quotes-game-utils.js`

Utility functions for:

- Timer color calculation
- Score message generation
- Progress calculation
- Answer index conversion
- Time formatting

### `quotes-game-constants.js`

Centralized constants:

- Sample quotes for preview
- Category icon mappings
- Game configuration
- Score message thresholds

## 🔄 Benefits of Modular Architecture

### 1. **Maintainability**

- Smaller, focused files are easier to understand and modify
- Clear separation of concerns reduces complexity
- Changes in one component don't affect others

### 2. **Reusability**

- Components can be reused in other projects
- UI elements can be mixed and matched
- Utilities can be shared across different games

### 3. **Testability**

- Individual components can be tested in isolation
- Pure functions are easier to unit test
- Mock dependencies are simpler to implement

### 4. **Performance**

- Smaller components can be optimized individually
- Better tree-shaking and code splitting
- Reduced bundle size for unused components

### 5. **Development Experience**

- Faster development with focused components
- Easier debugging and error tracking
- Better IDE support and autocompletion

## 📦 Usage Examples

### Basic Usage (Recommended)

```javascript
import { QuotesGame } from "./components/games";

function App() {
  return <QuotesGame onClose={handleClose} />;
}
```

### Advanced Usage (Custom Implementation)

```javascript
import {
  QuotesGameSetup,
  QuotesGamePlay,
  QuotesGameResults,
  useQuotesGame,
} from "./components/games/quotes";

function CustomQuotesGame() {
  const game = useQuotesGame();

  // Custom game flow implementation
  return (
    <div>
      {game.gameState === "setup" && <QuotesGameSetup />}
      {game.gameState === "playing" && <QuotesGamePlay />}
      {game.gameState === "completed" && <QuotesGameResults />}
    </div>
  );
}
```

### Using Individual Components

```javascript
import { GameProgress, QuestionDisplay } from "./components/games/quotes";

function CustomGameScreen({ game }) {
  return (
    <div>
      <GameProgress
        gameMode={game.gameMode}
        currentQuestion={game.questionIndex + 1}
        totalQuestions={game.quotes.length}
        score={game.score}
        currentQuestionTime={game.currentQuestionTime}
        progress={75}
      />
      <QuestionDisplay
        gameMode={game.gameMode}
        currentQuestion={game.currentQuestion}
      />
    </div>
  );
}
```

## 🔧 Configuration and Customization

### Game Constants

Modify `quotes-game-constants.js` to customize:

- Sample quotes for preview
- Setup screen statistics
- Category icons
- Score message thresholds

### Styling

Each component uses Tailwind CSS classes that can be:

- Overridden with custom CSS
- Modified by changing className props
- Extended with additional styling

### Functionality

Extend functionality by:

- Adding new props to components
- Creating new utility functions
- Implementing custom hooks
- Adding new constants

## 🚀 Migration from Monolithic Version

The refactoring maintains 100% backward compatibility:

- Same public API
- Same functionality
- Same visual design
- Same game logic

Benefits of migration:

- ✅ Reduced main file size by 90% (1023 → 108 lines)
- ✅ Improved code organization
- ✅ Better maintainability
- ✅ Enhanced reusability
- ✅ Easier testing
- ✅ Professional development practices
