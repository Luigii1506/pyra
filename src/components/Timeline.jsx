"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar,
  Sword,
  Crown,
  Scroll,
} from "lucide-react";

const Timeline = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedYear, setSelectedYear] = useState(null);

  const periods = [
    { id: "all", name: "Todos los Períodos", color: "bg-stone-500" },
    { id: "ancient", name: "Edad Antigua", color: "bg-amber-600" },
    { id: "classical", name: "Período Clásico", color: "bg-blue-600" },
    { id: "hellenistic", name: "Período Helenístico", color: "bg-purple-600" },
    { id: "roman", name: "Imperio Romano", color: "bg-red-600" },
  ];

  const events = [
    {
      year: -753,
      title: "Fundación de Roma",
      description: "Según la tradición, Rómulo funda la ciudad de Roma",
      category: "Fundación",
      period: "ancient",
      icon: Crown,
      color: "bg-red-500",
    },
    {
      year: -509,
      title: "Establecimiento de la República Romana",
      description:
        "Caída del último rey romano y establecimiento del gobierno republicano",
      category: "Política",
      period: "ancient",
      icon: Scroll,
      color: "bg-blue-500",
    },
    {
      year: -490,
      title: "Batalla de Maratón",
      description:
        "Victoria ateniense sobre los persas en la Primera Guerra Médica",
      category: "Guerra",
      period: "classical",
      icon: Sword,
      color: "bg-orange-500",
    },
    {
      year: -480,
      title: "Batalla de las Termópilas",
      description: "Los 300 espartanos de Leónidas resisten a Jerjes",
      category: "Guerra",
      period: "classical",
      icon: Sword,
      color: "bg-red-500",
    },
    {
      year: -431,
      title: "Guerra del Peloponeso",
      description: "Comienza la guerra entre Atenas y Esparta",
      category: "Guerra",
      period: "classical",
      icon: Sword,
      color: "bg-purple-500",
    },
    {
      year: -336,
      title: "Ascensión de Alejandro Magno",
      description: "Alejandro se convierte en rey de Macedonia",
      category: "Reinado",
      period: "hellenistic",
      icon: Crown,
      color: "bg-gold-500",
    },
    {
      year: -264,
      title: "Primera Guerra Púnica",
      description: "Comienza el conflicto entre Roma y Cartago",
      category: "Guerra",
      period: "roman",
      icon: Sword,
      color: "bg-red-600",
    },
    {
      year: -49,
      title: "César cruza el Rubicón",
      description: "Julio César inicia la guerra civil romana",
      category: "Guerra",
      period: "roman",
      icon: Sword,
      color: "bg-amber-600",
    },
    {
      year: -44,
      title: "Asesinato de Julio César",
      description: "César es asesinado en los Idus de Marzo",
      category: "Política",
      period: "roman",
      icon: Sword,
      color: "bg-red-700",
    },
    {
      year: -27,
      title: "Augusto primer emperador",
      description: "Octavio se convierte en el primer emperador romano",
      category: "Reinado",
      period: "roman",
      icon: Crown,
      color: "bg-purple-600",
    },
  ];

  const filteredEvents =
    selectedPeriod === "all"
      ? events
      : events.filter((event) => event.period === selectedPeriod);

  const formatYear = (year) => {
    return year < 0 ? `${Math.abs(year)} a.C.` : `${year} d.C.`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Línea del Tiempo
            </h3>
            <p className="text-stone-600">
              Explora los eventos clave de la historia antigua
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-stone-500" size={20} />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-stone-700"
            >
              {periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Period Chips */}
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedPeriod === period.id
                  ? `${period.color} text-white`
                  : "bg-stone-200 text-stone-700 hover:bg-stone-300"
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-amber-300"></div>

          {/* Events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div
                  key={index}
                  className="relative flex items-start space-x-6"
                >
                  {/* Timeline Node */}
                  <div
                    className={`${event.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10`}
                  >
                    <IconComponent size={24} className="text-white" />
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl p-6 shadow-md border border-amber-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-amber-700">
                          {formatYear(event.year)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${event.color} text-white`}
                        >
                          {event.category}
                        </span>
                      </div>
                      <Calendar className="text-stone-500" size={20} />
                    </div>

                    <h4 className="text-xl font-bold text-stone-800 mb-2">
                      {event.title}
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-4">
                      <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm">
                        Ver Detalles
                      </button>
                      <button className="px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors text-sm">
                        Agregar Nota
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              <ChevronLeft size={20} />
              <span>Período Anterior</span>
            </button>
            <span className="text-stone-600">Siglo VIII - I a.C.</span>
            <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              <span>Período Siguiente</span>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="text-stone-600 text-sm">
            {filteredEvents.length} eventos mostrados
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
