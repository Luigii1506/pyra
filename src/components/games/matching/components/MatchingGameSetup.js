/**
 * MatchingGameSetup Component
 * Componente para configurar el juego de emparejamiento antes de comenzar
 * @created 2024-12-19
 */

import React, { useState } from 'react';
import { 
  Play, 
  Settings, 
  Target, 
  Clock, 
  Lightbulb,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { 
  DIFFICULTY_LEVELS, 
  MATCHING_TYPES, 
  MATCHING_TYPE_CONFIG 
} from '../constants/matching-constants.js';

/**
 * Componente de configuración del juego
 */
const MatchingGameSetup = ({ 
  onStartGame, 
  onUpdateConfig,
  initialDifficulty = 'medium',
  initialMatchingType = null,
  isLoading = false 
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);
  const [selectedMatchingType, setSelectedMatchingType] = useState(initialMatchingType);
  const [showAdvanced, setShowAdvanced] = useState(false);

  /**
   * Maneja el inicio del juego
   */
  const handleStartGame = () => {
    if (isLoading) return;
    
    const config = {
      difficulty: selectedDifficulty,
      matchingType: selectedMatchingType,
    };
    
    if (onUpdateConfig) {
      onUpdateConfig(config);
    }
    
    if (onStartGame) {
      onStartGame(config);
    }
  };

  /**
   * Renderiza las opciones de dificultad
   */
  const renderDifficultyOptions = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-bold text-stone-800 flex items-center space-x-2">
        <Target className="text-amber-600" size={20} />
        <span>Nivel de Dificultad</span>
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(DIFFICULTY_LEVELS).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedDifficulty(config.key)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 ${
              selectedDifficulty === config.key
                ? `${config.color} text-white border-transparent shadow-lg scale-105`
                : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400 hover:shadow-md'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">{config.pairs}</div>
              <div className="font-bold mb-1">{config.name}</div>
              <div className="text-sm opacity-90 mb-3">{config.description}</div>
              
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-center space-x-1">
                  <Clock size={12} />
                  <span>{Math.floor(config.timeLimit / 60)}:{(config.timeLimit % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Lightbulb size={12} />
                  <span>{config.hintsAllowed} pistas</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp size={12} />
                  <span>{config.pointsMultiplier}x puntos</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  /**
   * Renderiza las opciones de tipo de emparejamiento
   */
  const renderMatchingTypeOptions = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-stone-800 flex items-center space-x-2">
          <BookOpen className="text-blue-600" size={20} />
          <span>Tipo de Emparejamiento</span>
        </h4>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          {showAdvanced ? 'Ocultar opciones' : 'Ver todas las opciones'}
        </button>
      </div>
      
      {/* Opción de mezcla aleatoria */}
      <button
        onClick={() => setSelectedMatchingType(null)}
        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
          selectedMatchingType === null
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg'
            : 'bg-white text-stone-700 border-stone-300 hover:border-purple-400 hover:shadow-md'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🎲</div>
          <div className="text-left">
            <div className="font-bold">Mezcla Aleatoria</div>
            <div className="text-sm opacity-90">Combina diferentes tipos de emparejamiento</div>
          </div>
        </div>
      </button>

      {/* Opciones específicas */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(MATCHING_TYPES).map(([key, type]) => {
            const config = MATCHING_TYPE_CONFIG[type];
            
            return (
              <button
                key={key}
                onClick={() => setSelectedMatchingType(type)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedMatchingType === type
                    ? `${config.color} text-white border-transparent shadow-lg scale-105`
                    : 'bg-white text-stone-700 border-stone-300 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{config.icon}</div>
                  <div className="font-bold text-sm mb-1">{config.name}</div>
                  <div className="text-xs opacity-90">{config.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  /**
   * Renderiza el resumen de configuración
   */
  const renderConfigSummary = () => {
    const difficultyConfig = DIFFICULTY_LEVELS[selectedDifficulty.toUpperCase()];
    const matchingTypeConfig = selectedMatchingType ? 
      MATCHING_TYPE_CONFIG[selectedMatchingType] : null;
    
    return (
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <h4 className="text-lg font-bold text-amber-800 mb-4 flex items-center space-x-2">
          <Settings className="text-amber-600" size={20} />
          <span>Configuración Seleccionada</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-amber-700 mb-2">Dificultad</div>
            <div className="bg-white rounded-lg p-3 border border-amber-200">
              <div className="font-bold text-stone-800">{difficultyConfig.name}</div>
              <div className="text-stone-600">{difficultyConfig.pairs} pares a encontrar</div>
              <div className="text-stone-600">
                Tiempo límite: {Math.floor(difficultyConfig.timeLimit / 60)}:
                {(difficultyConfig.timeLimit % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-stone-600">{difficultyConfig.hintsAllowed} pistas disponibles</div>
            </div>
          </div>
          
          <div>
            <div className="font-medium text-amber-700 mb-2">Tipo de Emparejamiento</div>
            <div className="bg-white rounded-lg p-3 border border-amber-200">
              {matchingTypeConfig ? (
                <>
                  <div className="flex items-center space-x-2 font-bold text-stone-800">
                    <span>{matchingTypeConfig.icon}</span>
                    <span>{matchingTypeConfig.name}</span>
                  </div>
                  <div className="text-stone-600">{matchingTypeConfig.description}</div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2 font-bold text-stone-800">
                    <span>🎲</span>
                    <span>Mezcla Aleatoria</span>
                  </div>
                  <div className="text-stone-600">Diferentes tipos de emparejamiento</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="matching-game-setup space-y-8">
      {/* Título */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-stone-800 mb-2">
          Conecta la Historia
        </h3>
        <p className="text-stone-600 text-lg">
          Configura tu juego de emparejamiento histórico
        </p>
      </div>

      {/* Opciones de dificultad */}
      {renderDifficultyOptions()}

      {/* Opciones de tipo de emparejamiento */}
      {renderMatchingTypeOptions()}

      {/* Resumen de configuración */}
      {renderConfigSummary()}

      {/* Botón de inicio */}
      <div className="text-center">
        <button
          onClick={handleStartGame}
          disabled={isLoading}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-3 mx-auto"
        >
          <Play size={24} />
          <span>{isLoading ? 'Preparando...' : 'Comenzar Juego'}</span>
        </button>
      </div>

      {/* Instrucciones rápidas */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h5 className="font-bold text-blue-800 mb-3">¿Cómo jugar?</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>Haz clic en dos elementos que creas que están relacionados</div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>Si forman un par correcto, desaparecerán del tablero</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>Usa pistas si necesitas ayuda, pero reducen tu puntuación</div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
              <div>Completa todos los pares antes de que se acabe el tiempo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingGameSetup;