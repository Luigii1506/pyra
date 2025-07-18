/**
 * QuotesGameSetup Component
 * Setup screen for the quotes game with mode selection and preview
 * @created 2024-12-19
 */

"use client";

import React from "react";
import {
  Quote,
  Users,
  Play,
  CheckCircle,
  Clock,
  Target,
  Star,
} from "lucide-react";
import { SAMPLE_QUOTES, GAME_CONFIG } from "../constants/quotes-game-constants";

const QuotesGameSetup = ({ onStartGame }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold text-stone-800">
              ¿Quién dijo qué?
            </h3>
            <p className="text-stone-600 mt-2">
              Pon a prueba tus conocimientos sobre citas históricas célebres
            </p>
          </div>
          <div className="bg-amber-600 p-3 rounded-full">
            <Quote size={32} className="text-white" />
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {GAME_CONFIG.SETUP_STATS.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-3 ${stat.bgColor} rounded-lg`}
            >
              <div className={`text-2xl font-bold ${stat.textColor}`}>
                {stat.value}
              </div>
              <div className={`${stat.labelColor} text-sm`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Modes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quote to Person Mode */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Quote size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-stone-800">
                Cita → Personaje
              </h4>
              <p className="text-stone-600 text-sm">
                Adivina quién dijo la frase
              </p>
            </div>
          </div>

          <p className="text-stone-600 mb-6 leading-relaxed">
            Se te mostrará una cita histórica célebre y deberás elegir entre
            cuatro opciones quién fue el personaje que la pronunció.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2 text-sm text-stone-600">
              <CheckCircle size={16} className="text-green-500" />
              <span>Citas verificadas históricamente</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-stone-600">
              <Clock size={16} className="text-amber-500" />
              <span>30 segundos por pregunta</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-stone-600">
              <Target size={16} className="text-blue-500" />
              <span>Contexto histórico incluido</span>
            </div>
          </div>

          <button
            onClick={() => onStartGame("quote-to-person")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
          >
            <Play size={20} />
            <span>Comenzar Modo Cita</span>
          </button>
        </div>

        {/* Person to Quote Mode */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-600 p-3 rounded-lg">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-stone-800">
                Personaje → Cita
              </h4>
              <p className="text-stone-600 text-sm">Elige qué dijo realmente</p>
            </div>
          </div>

          <p className="text-stone-600 mb-6 leading-relaxed">
            Se te mostrará un personaje histórico y deberás elegir entre cuatro
            citas cuál fue la que realmente pronunció.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2 text-sm text-stone-600">
              <CheckCircle size={16} className="text-green-500" />
              <span>Personajes históricos auténticos</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-stone-600">
              <Clock size={16} className="text-amber-500" />
              <span>30 segundos por pregunta</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-stone-600">
              <Star size={16} className="text-purple-500" />
              <span>Información biográfica</span>
            </div>
          </div>

          <button
            onClick={() => onStartGame("person-to-quote")}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 font-medium"
          >
            <Play size={20} />
            <span>Comenzar Modo Personaje</span>
          </button>
        </div>
      </div>

      {/* Sample Quotes Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h4 className="text-xl font-bold text-stone-800 mb-4">
          Ejemplos de Citas Incluidas
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_QUOTES.map((quote, index) => {
            const IconComponent = quote.icon;
            return (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg border border-amber-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-600 p-2 rounded-lg">
                    <IconComponent size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-800 font-medium italic mb-2">
                      &quot;{quote.quote}&quot;
                    </p>
                    <p className="text-amber-700 font-semibold text-sm">
                      — {quote.author}
                    </p>
                    <p className="text-stone-600 text-xs mt-1">
                      {quote.period}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuotesGameSetup;
