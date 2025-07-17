"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  Users,
  Map,
  Crown,
  BookOpen,
  Star,
} from "lucide-react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const searchTypes = [
    { id: "all", name: "Todo", icon: Search, color: "bg-stone-500" },
    { id: "events", name: "Eventos", icon: Clock, color: "bg-blue-500" },
    {
      id: "characters",
      name: "Personajes",
      icon: Users,
      color: "bg-green-500",
    },
    { id: "locations", name: "Lugares", icon: Map, color: "bg-purple-500" },
    { id: "myths", name: "Mitologías", icon: Crown, color: "bg-amber-500" },
    { id: "concepts", name: "Conceptos", icon: BookOpen, color: "bg-red-500" },
  ];

  const periods = [
    { id: "all", name: "Todos los Períodos" },
    { id: "ancient", name: "Edad Antigua (3000 a.C. - 500 d.C.)" },
    { id: "classical", name: "Período Clásico (800-31 a.C.)" },
    { id: "hellenistic", name: "Período Helenístico (336-146 a.C.)" },
    { id: "roman", name: "Imperio Romano (27 a.C. - 476 d.C.)" },
  ];

  const searchResults = [
    {
      id: 1,
      title: "Julio César",
      type: "characters",
      period: "roman",
      description:
        "Político y general romano que jugó un papel crucial en la caída de la República Romana.",
      date: "100 - 44 a.C.",
      tags: ["Roma", "Política", "Militar"],
      relevance: 95,
    },
    {
      id: 2,
      title: "Batalla de Gaugamela",
      type: "events",
      period: "hellenistic",
      description:
        "Victoria decisiva de Alejandro Magno sobre Darío III del Imperio Persa.",
      date: "331 a.C.",
      tags: ["Alejandro Magno", "Batalla", "Persia"],
      relevance: 90,
    },
    {
      id: 3,
      title: "Filosofía Estoica",
      type: "concepts",
      period: "classical",
      description:
        "Escuela filosófica que enseñaba que la virtud es el único bien verdadero.",
      date: "c. 300 a.C.",
      tags: ["Filosofía", "Ética", "Zenón"],
      relevance: 85,
    },
    {
      id: 4,
      title: "Atenas",
      type: "locations",
      period: "classical",
      description:
        "Ciudad-estado griega, cuna de la democracia y centro cultural.",
      date: "c. 1000 a.C.",
      tags: ["Grecia", "Democracia", "Cultura"],
      relevance: 92,
    },
    {
      id: 5,
      title: "La Ilíada",
      type: "myths",
      period: "ancient",
      description: "Poema épico atribuido a Homero sobre la guerra de Troya.",
      date: "c. 800 a.C.",
      tags: ["Homero", "Épica", "Troya"],
      relevance: 88,
    },
    {
      id: 6,
      title: "Foro Romano",
      type: "locations",
      period: "roman",
      description: "Centro político, económico y religioso de la antigua Roma.",
      date: "c. 600 a.C.",
      tags: ["Roma", "Arquitectura", "Política"],
      relevance: 80,
    },
    {
      id: 7,
      title: "Guerras Púnicas",
      type: "events",
      period: "roman",
      description:
        "Serie de tres guerras entre Roma y Cartago por el control del Mediterráneo.",
      date: "264 - 146 a.C.",
      tags: ["Roma", "Cartago", "Aníbal"],
      relevance: 87,
    },
    {
      id: 8,
      title: "Mitología Griega",
      type: "myths",
      period: "classical",
      description: "Conjunto de historias y creencias de la antigua Grecia.",
      date: "c. 1000 a.C.",
      tags: ["Dioses", "Mitología", "Cultura"],
      relevance: 91,
    },
  ];

  const filteredResults = searchResults.filter((result) => {
    const matchesSearch =
      searchTerm === "" ||
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesType = selectedType === "all" || result.type === selectedType;
    const matchesPeriod =
      selectedPeriod === "all" || result.period === selectedPeriod;

    return matchesSearch && matchesType && matchesPeriod;
  });

  const getTypeIcon = (type) => {
    const typeObj = searchTypes.find((t) => t.id === type);
    return typeObj ? typeObj.icon : Search;
  };

  const getTypeColor = (type) => {
    const typeObj = searchTypes.find((t) => t.id === type);
    return typeObj ? typeObj.color : "bg-stone-500";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Búsqueda Inteligente
            </h3>
            <p className="text-stone-600">
              Encuentra eventos, personajes, lugares y conceptos históricos
            </p>
          </div>
          <Search className="text-amber-600" size={32} />
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-stone-400" size={20} />
          <input
            type="text"
            placeholder="Buscar en toda la biblioteca histórica..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
          />
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div>
            <label className="block text-stone-700 font-medium mb-2">
              Tipo de Contenido
            </label>
            <div className="flex flex-wrap gap-2">
              {searchTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      selectedType === type.id
                        ? `${type.color} text-white`
                        : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                    }`}
                  >
                    <IconComponent size={16} />
                    <span className="text-sm">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-medium mb-2">
              Período Histórico
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-stone-700 min-w-64"
            >
              {periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-bold text-stone-800">
            Resultados de Búsqueda ({filteredResults.length})
          </h4>
          <div className="flex items-center space-x-2">
            <Filter className="text-stone-500" size={20} />
            <select className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-stone-700 text-sm">
              <option>Relevancia</option>
              <option>Fecha</option>
              <option>Alfabético</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredResults.map((result) => {
            const IconComponent = getTypeIcon(result.type);
            return (
              <div
                key={result.id}
                className="p-4 border border-amber-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`${getTypeColor(result.type)} p-2 rounded-lg`}
                    >
                      <IconComponent size={20} className="text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="text-lg font-bold text-stone-800">
                          {result.title}
                        </h5>
                        <span className="text-sm text-stone-600">
                          {result.date}
                        </span>
                      </div>

                      <p className="text-stone-600 mb-3 leading-relaxed">
                        {result.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {result.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-amber-500" />
                      <span className="text-sm text-stone-600">
                        {result.relevance}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200 flex space-x-3">
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm">
                    Ver Detalles
                  </button>
                  <button className="bg-stone-600 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors text-sm">
                    Agregar a Notas
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Explorar Relacionados
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search Suggestions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h4 className="text-xl font-bold text-stone-800 mb-4">
          Búsquedas Sugeridas
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            "Imperio Romano",
            "Filosofía Griega",
            "Mitología Egipcia",
            "Guerras Púnicas",
            "Alejandro Magno",
            "Sócrates",
            "Cleopatra",
            "Batalla de Maratón",
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setSearchTerm(suggestion)}
              className="text-left p-3 bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg hover:from-amber-100 hover:to-stone-100 transition-all"
            >
              <div className="flex items-center space-x-2">
                <Search size={16} className="text-amber-600" />
                <span className="text-stone-700 text-sm">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
