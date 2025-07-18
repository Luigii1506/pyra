/**
 * Quotes Game Constants
 * Constants and sample data for the quotes game
 * @created 2024-12-19
 */

import { Target, Star, Quote, CheckCircle } from "lucide-react";

// Sample quotes for preview in setup screen
export const SAMPLE_QUOTES = [
  {
    quote: "Llegué, vi, vencí",
    author: "Julio César",
    period: "República Romana",
    icon: Target,
  },
  {
    quote: "Solo sé que no sé nada",
    author: "Sócrates",
    period: "Grecia Clásica",
    icon: Star,
  },
  {
    quote: "Conócete a ti mismo",
    author: "Oráculo de Delfos",
    period: "Grecia Arcaica",
    icon: Quote,
  },
  {
    quote: "La suerte favorece a los audaces",
    author: "Virgilio",
    period: "Imperio Romano",
    icon: CheckCircle,
  },
];

// Category icons mapping
export const CATEGORY_ICONS = {
  militar: "⚔️",
  filosofía: "🧠",
  literatura: "📚",
  político: "🏛️",
  religioso: "🙏",
  histórico: "📜",
};

// Game configuration
export const GAME_CONFIG = {
  SETUP_STATS: [
    {
      value: "12+",
      label: "Citas Históricas",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      labelColor: "text-blue-800",
    },
    {
      value: "10",
      label: "Preguntas",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      labelColor: "text-green-800",
    },
    {
      value: "30s",
      label: "Por Pregunta",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      labelColor: "text-amber-800",
    },
    {
      value: "2",
      label: "Modalidades",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      labelColor: "text-purple-800",
    },
  ],
};

// Score messages based on accuracy percentage
export const SCORE_MESSAGES = [
  {
    minPercentage: 90,
    message: "¡Excelente! Eres un verdadero experto en historia",
    color: "text-green-600",
  },
  {
    minPercentage: 75,
    message: "¡Muy bien! Tienes buenos conocimientos históricos",
    color: "text-blue-600",
  },
  {
    minPercentage: 60,
    message: "Buen trabajo, pero puedes mejorar",
    color: "text-amber-600",
  },
  {
    minPercentage: 40,
    message: "Necesitas estudiar más historia",
    color: "text-orange-600",
  },
  {
    minPercentage: 0,
    message: "¡Sigue practicando! La historia es fascinante",
    color: "text-red-600",
  },
];
