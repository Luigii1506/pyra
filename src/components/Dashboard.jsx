"use client";

import React from "react";
import {
  TrendingUp,
  BookOpen,
  Users,
  Map,
  Target,
  Clock,
  Star,
} from "lucide-react";
import { useUserContext } from "../hooks/use-user.js";
import LoadingSpinner from "./ui/LoadingSpinner.js";
import UserStatsCard from "./dashboard/UserStatsCard.js";

const Dashboard = () => {
  const { user, userStats, loading, error } = useUserContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error al cargar los datos: {error}</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Experiencia Total",
      value: userStats?.totalExperience || 0,
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      label: "Personajes Estudiados",
      value: userStats?.charactersStudied || 0,
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Mapas Explorados",
      value: userStats?.mapsExplored || 0,
      icon: Map,
      color: "bg-purple-500",
    },
    {
      label: "Notas Creadas",
      value: userStats?.notesCreated || 0,
      icon: Target,
      color: "bg-orange-500",
    },
  ];

  const recentTopics = [
    { title: "Guerras Púnicas", progress: 85, lastStudied: "2 días" },
    { title: "Mitología Griega", progress: 72, lastStudied: "1 semana" },
    { title: "Imperio Romano", progress: 94, lastStudied: "1 día" },
    { title: "Filosofía Antigua", progress: 58, lastStudied: "3 días" },
  ];

  const highlights = [
    {
      title: "La Batalla de Cannae",
      category: "Guerras Púnicas",
      date: "216 a.C.",
    },
    { title: "El Juicio de Sócrates", category: "Filosofía", date: "399 a.C." },
    {
      title: "Fundación de Roma",
      category: "Historia Romana",
      date: "753 a.C.",
    },
    { title: "Guerra de Troya", category: "Mitología", date: "c. 1200 a.C." },
  ];

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg md:rounded-xl shadow-lg p-3 md:p-6 border border-amber-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-600 text-xs md:text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-xl md:text-3xl font-bold text-stone-800 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-2 md:p-3 rounded-lg`}>
                <stat.icon size={20} className="text-white md:w-6 md:h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Progress Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-amber-200">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-stone-800">
                Progreso Reciente
              </h3>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <div className="space-y-3 md:space-y-4">
              {recentTopics.map((topic, index) => (
                <div key={index} className="p-3 md:p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-stone-800 text-sm md:text-base">
                      {topic.title}
                    </h4>
                    <span className="text-xs md:text-sm text-stone-600">
                      Hace {topic.lastStudied}
                    </span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${topic.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs md:text-sm text-stone-600 mt-1">
                    {topic.progress}% completado
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-amber-200">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-stone-800">
                Destacados
              </h3>
              <Star className="text-amber-500" size={20} />
            </div>
            <div className="space-y-2 md:space-y-3">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="p-2 md:p-3 bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg border-l-4 border-amber-500"
                >
                  <h4 className="font-semibold text-stone-800 text-xs md:text-sm">
                    {highlight.title}
                  </h4>
                  <p className="text-amber-700 text-xs font-medium">
                    {highlight.category}
                  </p>
                  <p className="text-stone-600 text-xs mt-1">
                    {highlight.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-amber-200">
            <h3 className="text-lg md:text-xl font-bold text-stone-800 mb-3 md:mb-4">
              Acciones Rápidas
            </h3>
            <div className="space-y-2 md:space-y-3">
              <button className="w-full bg-amber-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-amber-700 transition-colors text-sm md:text-base">
                Crear Nueva Nota
              </button>
              <button className="w-full bg-stone-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-stone-700 transition-colors text-sm md:text-base">
                Explorar Línea del Tiempo
              </button>
              <button className="w-full bg-blue-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                Buscar Personajes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-bold text-stone-800">
            Actividad Reciente
          </h3>
          <Clock className="text-stone-500" size={20} />
        </div>
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center space-x-3 p-2 md:p-3 bg-amber-50 rounded-lg">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <BookOpen size={16} className="text-white" />
            </div>
            <div>
              <p className="text-stone-800 font-medium text-sm md:text-base">
                Completaste el estudio de &ldquo;La República de Platón&rdquo;
              </p>
              <p className="text-stone-600 text-xs md:text-sm">Hace 2 horas</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 md:p-3 bg-amber-50 rounded-lg">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Users size={16} className="text-white" />
            </div>
            <div>
              <p className="text-stone-800 font-medium text-sm md:text-base">
                Agregaste notas sobre &ldquo;Julio César&rdquo;
              </p>
              <p className="text-stone-600 text-xs md:text-sm">Hace 1 día</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 md:p-3 bg-amber-50 rounded-lg">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Map size={16} className="text-white" />
            </div>
            <div>
              <p className="text-stone-800 font-medium text-sm md:text-base">
                Exploraste el mapa del &ldquo;Imperio Bizantino&rdquo;
              </p>
              <p className="text-stone-600 text-xs md:text-sm">Hace 2 días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
