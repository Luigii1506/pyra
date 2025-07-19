/**
 * DeckSelection Component
 * Componente para seleccionar mazo y configurar límites de sesión
 * @created 2024-12-19
 */

import React, { useState } from 'react';
import { 
  Play, 
  Calendar, 
  Target, 
  Clock, 
  Settings,
  BookOpen,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { calculateDeckStats } from '../utils/sm2-algorithm.js';
import { calculateProgress, formatNextReview } from '../utils/flashcards-utils.js';
import { SESSION_CONFIG } from '../constants/flashcards-constants.js';

/**
 * Componente de selección de mazo
 */
const DeckSelection = ({ 
  decks = [], 
  onSelectDeck, 
  onUpdateLimits,
  isLoading = false,
  error = null 
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [sessionLimits, setSessionLimits] = useState({
    newCardsLimit: SESSION_CONFIG.DEFAULT_NEW_CARDS_LIMIT,
    reviewCardsLimit: SESSION_CONFIG.DEFAULT_REVIEW_CARDS_LIMIT,
    timeLimit: SESSION_CONFIG.DEFAULT_SESSION_TIME_LIMIT,
  });

  /**
   * Maneja la selección de un mazo
   */
  const handleDeckSelect = (deck) => {
    if (isLoading) return;
    
    // Actualizar límites si se han modificado
    if (showSettings) {
      onUpdateLimits(sessionLimits);
    }
    
    onSelectDeck(deck);
  };

  /**
   * Renderiza una tarjeta de mazo
   */
  const renderDeckCard = (deck) => {
    const stats = calculateDeckStats(deck.cards);
    const progress = calculateProgress(deck.cards);
    const nextDueCard = deck.cards
      .filter(card => card.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

    return (
      <div 
        key={deck.id}
        className="bg-white rounded-xl shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Header del mazo */}
        <div className={`${deck.color} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen size={24} />
              <div>
                <h4 className="text-xl font-bold">{deck.title}</h4>
                <p className="text-white/80 text-sm">{deck.category}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-white/80 text-sm">tarjetas</div>
            </div>
          </div>
        </div>

        {/* Contenido del mazo */}
        <div className="p-6">
          <p className="text-stone-600 mb-4">{deck.description}</p>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{stats.new}</div>
              <div className="text-stone-600 text-sm">Nuevas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{stats.learning}</div>
              <div className="text-stone-600 text-sm">Aprendiendo</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">{stats.due}</div>
              <div className="text-stone-600 text-sm">Vencidas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{stats.review}</div>
              <div className="text-stone-600 text-sm">Revisión</div>
            </div>
          </div>

          {/* Progreso de dominio */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-stone-700 font-medium">Progreso de Dominio</span>
              <span className="text-stone-600 text-sm">
                {progress.masteredCards}/{progress.totalCards} dominadas
              </span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2">
              <div
                className={`${deck.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          {/* Próxima revisión */}
          {nextDueCard && (
            <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar size={16} className="text-amber-600" />
                <span className="text-stone-700">
                  Próxima revisión: {formatNextReview(new Date(nextDueCard.dueDate))}
                </span>
              </div>
            </div>
          )}

          {/* Botón de inicio */}
          <button
            onClick={() => handleDeckSelect(deck)}
            disabled={isLoading || stats.due + stats.new + stats.learning === 0}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play size={20} />
            <span>
              {stats.due + stats.new + stats.learning === 0 
                ? 'No hay tarjetas para estudiar'
                : 'Comenzar Sesión'
              }
            </span>
          </button>
        </div>
      </div>
    );
  };

  /**
   * Renderiza el panel de configuración
   */
  const renderSettingsPanel = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Settings className="text-amber-600" size={24} />
          <h4 className="text-xl font-bold text-stone-800">Configuración de Sesión</h4>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-amber-600 hover:text-amber-700 transition-colors"
        >
          {showSettings ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {showSettings && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-stone-700 font-medium mb-2">
              <Target size={16} className="inline mr-2" />
              Nuevas tarjetas por día
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={sessionLimits.newCardsLimit}
              onChange={(e) => setSessionLimits({
                ...sessionLimits,
                newCardsLimit: parseInt(e.target.value) || 0
              })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <p className="text-stone-500 text-sm mt-1">
              Máximo de tarjetas nuevas a aprender
            </p>
          </div>

          <div>
            <label className="block text-stone-700 font-medium mb-2">
              <BarChart3 size={16} className="inline mr-2" />
              Revisiones por día
            </label>
            <input
              type="number"
              min="0"
              max="500"
              value={sessionLimits.reviewCardsLimit}
              onChange={(e) => setSessionLimits({
                ...sessionLimits,
                reviewCardsLimit: parseInt(e.target.value) || 0
              })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <p className="text-stone-500 text-sm mt-1">
              Máximo de tarjetas a revisar
            </p>
          </div>

          <div>
            <label className="block text-stone-700 font-medium mb-2">
              <Clock size={16} className="inline mr-2" />
              Límite de tiempo (min)
            </label>
            <input
              type="number"
              min="5"
              max="120"
              value={sessionLimits.timeLimit}
              onChange={(e) => setSessionLimits({
                ...sessionLimits,
                timeLimit: parseInt(e.target.value) || 30
              })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <p className="text-stone-500 text-sm mt-1">
              Tiempo máximo de sesión
            </p>
          </div>
        </div>
      )}
    </div>
  );

  if (decks.length === 0) {
    return (
      <div className="text-center p-8">
        <BookOpen size={48} className="text-stone-400 mx-auto mb-4" />
        <h4 className="text-xl font-bold text-stone-600 mb-2">No hay mazos disponibles</h4>
        <p className="text-stone-500">
          Agrega algunos mazos de flashcards para comenzar a estudiar.
        </p>
      </div>
    );
  }

  return (
    <div className="deck-selection space-y-6">
      {/* Panel de configuración */}
      {renderSettingsPanel()}

      {/* Lista de mazos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {decks.map(renderDeckCard)}
      </div>

      {/* Estadísticas generales */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="text-green-600" size={24} />
          <h4 className="text-xl font-bold text-stone-800">Resumen General</h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {decks.reduce((sum, deck) => sum + deck.totalCards, 0)}
            </div>
            <div className="text-stone-600 text-sm">Total de Tarjetas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {decks.reduce((sum, deck) => sum + deck.newCards, 0)}
            </div>
            <div className="text-stone-600 text-sm">Nuevas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {decks.reduce((sum, deck) => sum + deck.dueCards, 0)}
            </div>
            <div className="text-stone-600 text-sm">Vencidas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {decks.reduce((sum, deck) => sum + deck.reviewCards, 0)}
            </div>
            <div className="text-stone-600 text-sm">En Revisión</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckSelection;