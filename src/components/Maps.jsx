"use client";
import React, { useState } from "react";
import {
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  Globe,
  Sword,
  Crown,
  Building,
} from "lucide-react";

const Maps = () => {
  const [selectedMap, setSelectedMap] = useState("roman-empire");
  const [selectedLayer, setSelectedLayer] = useState("political");

  const maps = [
    {
      id: "roman-empire",
      name: "Imperio Romano",
      period: "27 a.C. - 476 d.C.",
    },
    { id: "greek-world", name: "Mundo Griego", period: "800 - 146 a.C." },
    { id: "persian-empire", name: "Imperio Persa", period: "550 - 330 a.C." },
    {
      id: "alexander-conquests",
      name: "Conquistas de Alejandro",
      period: "336 - 323 a.C.",
    },
    { id: "punic-wars", name: "Guerras Púnicas", period: "264 - 146 a.C." },
  ];

  const layers = [
    { id: "political", name: "Fronteras Políticas", icon: Crown },
    { id: "military", name: "Campañas Militares", icon: Sword },
    { id: "cities", name: "Ciudades Importantes", icon: Building },
    { id: "trade", name: "Rutas Comerciales", icon: Globe },
  ];

  const locations = [
    {
      name: "Roma",
      coordinates: "41.9028, 12.4964",
      description: "Capital del Imperio Romano",
      type: "capital",
      events: ["Fundación de Roma", "Establecimiento del Imperio"],
    },
    {
      name: "Atenas",
      coordinates: "37.9755, 23.7348",
      description: "Cuna de la democracia",
      type: "city",
      events: ["Edad de Oro de Pericles", "Escuela de Filosofía"],
    },
    {
      name: "Esparta",
      coordinates: "37.0755, 22.4248",
      description: "Estado militar griego",
      type: "city",
      events: ["Batalla de las Termópilas", "Guerra del Peloponeso"],
    },
    {
      name: "Cartago",
      coordinates: "36.8065, 10.1815",
      description: "Rival de Roma en el Mediterráneo",
      type: "city",
      events: ["Guerras Púnicas", "Destrucción de Cartago"],
    },
    {
      name: "Alejandría",
      coordinates: "31.2001, 29.9187",
      description: "Centro de aprendizaje helenístico",
      type: "city",
      events: ["Fundación por Alejandro", "Biblioteca de Alejandría"],
    },
    {
      name: "Batalla de Gaugamela",
      coordinates: "36.3500, 43.2500",
      description: "Victoria decisiva de Alejandro sobre Darío III",
      type: "battle",
      events: ["Derrota del Imperio Persa", "Expansión macedonia"],
    },
  ];

  const getLocationIcon = (type) => {
    switch (type) {
      case "capital":
        return Crown;
      case "city":
        return Building;
      case "battle":
        return Sword;
      default:
        return MapPin;
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case "capital":
        return "bg-red-500";
      case "city":
        return "bg-blue-500";
      case "battle":
        return "bg-orange-500";
      default:
        return "bg-stone-500";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Mapas Históricos
            </h3>
            <p className="text-stone-600">
              Explora los territorios y eventos de la antigüedad
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="text-stone-500" size={24} />
          </div>
        </div>

        {/* Map Selection */}
        <div className="flex flex-wrap gap-3 mb-6">
          {maps.map((map) => (
            <button
              key={map.id}
              onClick={() => setSelectedMap(map.id)}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${
                selectedMap === map.id
                  ? "border-amber-500 bg-amber-50"
                  : "border-stone-300 bg-white hover:border-amber-300"
              }`}
            >
              <div className="text-left">
                <div className="font-semibold text-stone-800">{map.name}</div>
                <div className="text-sm text-stone-600">{map.period}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Layer Controls */}
        <div className="flex items-center space-x-4">
          <span className="text-stone-700 font-medium">Capas:</span>
          {layers.map((layer) => {
            const IconComponent = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  selectedLayer === layer.id
                    ? "bg-amber-600 text-white"
                    : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                }`}
              >
                <IconComponent size={16} />
                <span className="text-sm">{layer.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
            {/* Map Controls */}
            <div className="bg-stone-100 p-4 border-b border-stone-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Layers className="text-stone-600" size={20} />
                  <span className="font-semibold text-stone-800">
                    {maps.find((m) => m.id === selectedMap)?.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-white rounded-lg hover:bg-stone-50 transition-colors">
                    <ZoomIn size={20} className="text-stone-600" />
                  </button>
                  <button className="p-2 bg-white rounded-lg hover:bg-stone-50 transition-colors">
                    <ZoomOut size={20} className="text-stone-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Map Display */}
            <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 opacity-50"></div>

              {/* Simulated Territories */}
              <div className="absolute inset-0 p-8">
                <div className="w-full h-full relative">
                  {/* Mediterranean Sea */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-blue-400 rounded-full opacity-70"></div>

                  {/* Territories */}
                  <div
                    className="absolute top-1/3 left-1/3 w-24 h-16 bg-red-400 rounded-lg opacity-60"
                    title="Imperio Romano"
                  ></div>
                  <div
                    className="absolute top-1/4 right-1/3 w-20 h-14 bg-purple-400 rounded-lg opacity-60"
                    title="Mundo Griego"
                  ></div>
                  <div
                    className="absolute bottom-1/3 left-1/4 w-16 h-12 bg-orange-400 rounded-lg opacity-60"
                    title="Cartago"
                  ></div>

                  {/* Location Markers */}
                  {locations.map((location, index) => {
                    const IconComponent = getLocationIcon(location.type);
                    return (
                      <div
                        key={index}
                        className={`absolute w-8 h-8 ${getLocationColor(
                          location.type
                        )} rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                        style={{
                          left: `${20 + index * 15}%`,
                          top: `${30 + index * 10}%`,
                        }}
                        title={location.name}
                      >
                        <IconComponent size={16} className="text-white" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
            <h4 className="text-xl font-bold text-stone-800 mb-4">
              Ubicaciones Destacadas
            </h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {locations.map((location, index) => {
                const IconComponent = getLocationIcon(location.type);
                return (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg border border-amber-200"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 ${getLocationColor(
                          location.type
                        )} rounded-full flex items-center justify-center`}
                      >
                        <IconComponent size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-stone-800">
                          {location.name}
                        </h5>
                        <p className="text-sm text-stone-600 mb-2">
                          {location.description}
                        </p>
                        <div className="text-xs text-stone-500">
                          <span className="font-medium">Eventos:</span>
                          <ul className="mt-1 space-y-1">
                            {location.events.map((event, eventIndex) => (
                              <li key={eventIndex} className="text-amber-700">
                                • {event}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
            <h4 className="text-lg font-bold text-stone-800 mb-4">Leyenda</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-stone-700">Capitales</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-stone-700">Ciudades</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-stone-700">Batallas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;
