"use client";
import React, { useState } from "react";
import { Crown, Star, Zap, Waves, Mountain, Sun, Moon } from "lucide-react";

const Mythologies = () => {
  const [selectedCulture, setSelectedCulture] = useState("greek");
  const [selectedMyth, setSelectedMyth] = useState(null);

  const cultures = [
    { id: "greek", name: "Griega", icon: Crown, color: "bg-blue-600" },
    { id: "roman", name: "Romana", icon: Star, color: "bg-red-600" },
    { id: "egyptian", name: "Egipcia", icon: Sun, color: "bg-yellow-600" },
    { id: "norse", name: "Nórdica", icon: Zap, color: "bg-purple-600" },
    {
      id: "mesopotamian",
      name: "Mesopotámica",
      icon: Mountain,
      color: "bg-green-600",
    },
  ];

  const mythologies = {
    greek: [
      {
        id: 1,
        title: "Los Doce Olímpicos",
        category: "Panteón",
        description:
          "Los doce dioses principales del panteón griego que residían en el Monte Olimpo.",
        summary:
          "Zeus, Hera, Poseidón, Deméter, Atenea, Apolo, Artemisa, Ares, Afrodita, Hefesto, Hermes y Dioniso formaban el consejo divino que gobernaba el universo.",
        characters: ["Zeus", "Hera", "Poseidón", "Atenea", "Apolo", "Artemisa"],
        themes: ["Poder", "Familia", "Destino", "Honor"],
        image:
          "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        icon: Crown,
      },
      {
        id: 2,
        title: "La Ilíada",
        category: "Épica",
        description:
          "La guerra de Troya narrada por Homero, centrada en la ira de Aquiles.",
        summary:
          "Epic poema que relata los últimos días de la guerra de Troya, enfocándose en el conflicto entre Aquiles y Héctor.",
        characters: ["Aquiles", "Héctor", "Paris", "Helena", "Agamenón"],
        themes: ["Guerra", "Honor", "Destino", "Amor"],
        image:
          "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        icon: Star,
      },
      {
        id: 3,
        title: "El Laberinto del Minotauro",
        category: "Mito",
        description:
          "La historia de Teseo y el Minotauro en el laberinto de Creta.",
        summary:
          "Teseo viaja a Creta para enfrentar al Minotauro y liberar a Atenas del tributo humano.",
        characters: ["Teseo", "Minotauro", "Ariadna", "Minos", "Dédalo"],
        themes: ["Heroísmo", "Sacrificio", "Amor", "Ingenio"],
        image:
          "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        icon: Mountain,
      },
      {
        id: 4,
        title: "Pandora y la Caja",
        category: "Mito",
        description: "La primera mujer y el origen de los males del mundo.",
        summary:
          "Zeus crea a Pandora como castigo a la humanidad, quien abre una caja liberando todos los males.",
        characters: ["Pandora", "Zeus", "Prometeo", "Epimeteo"],
        themes: ["Curiosidad", "Castigo", "Esperanza", "Creación"],
        image:
          "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        icon: Moon,
      },
    ],
    roman: [
      {
        id: 5,
        title: "La Eneida",
        category: "Épica",
        description:
          "El viaje de Eneas desde Troya hasta la fundación de Roma.",
        summary:
          "Virgilio narra la odisea de Eneas, príncipe troyano que funda la estirpe romana.",
        characters: ["Eneas", "Dido", "Turno", "Lavinia", "Júpiter"],
        themes: ["Destino", "Fundación", "Amor", "Sacrificio"],
        image:
          "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        icon: Star,
      },
      {
        id: 6,
        title: "Rómulo y Remo",
        category: "Mito Fundacional",
        description:
          "Los gemelos fundadores de Roma, amamantados por una loba.",
        summary:
          "Dos hermanos gemelos, descendientes de Eneas, fundan la ciudad de Roma tras ser salvados por una loba.",
        characters: ["Rómulo", "Remo", "Rea Silvia", "Marte", "Amulio"],
        themes: ["Fundación", "Fratricidio", "Destino", "Poder"],
        image:
          "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        icon: Crown,
      },
    ],
    egyptian: [
      {
        id: 7,
        title: "Osiris e Isis",
        category: "Mito",
        description: "La historia de amor, muerte y resurrección de Osiris.",
        summary:
          "Set mata a su hermano Osiris por celos, pero Isis lo resucita, convirtiéndolo en señor del inframundo.",
        characters: ["Osiris", "Isis", "Set", "Horus", "Neftis"],
        themes: ["Amor", "Muerte", "Resurrección", "Venganza"],
        image:
          "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        icon: Sun,
      },
    ],
    norse: [
      {
        id: 8,
        title: "Ragnarök",
        category: "Escatología",
        description: "El fin del mundo y la batalla final de los dioses.",
        summary:
          "La profecía del fin del mundo nórdico, donde dioses y gigantes luchan en una batalla apocalíptica.",
        characters: ["Odín", "Thor", "Loki", "Fenrir", "Jörmungandr"],
        themes: ["Apocalipsis", "Destino", "Muerte", "Renacimiento"],
        image:
          "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        icon: Zap,
      },
    ],
    mesopotamian: [
      {
        id: 9,
        title: "Gilgamesh",
        category: "Épica",
        description:
          "La primera obra épica de la humanidad, sobre el rey de Uruk.",
        summary:
          "Gilgamesh, rey de Uruk, emprende un viaje en busca de la inmortalidad tras la muerte de su amigo Enkidu.",
        characters: ["Gilgamesh", "Enkidu", "Shamhat", "Utnapishtim", "Ishtar"],
        themes: ["Amistad", "Mortalidad", "Búsqueda", "Sabiduría"],
        image:
          "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        icon: Mountain,
      },
    ],
  };

  const currentMythologies = mythologies[selectedCulture] || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Mitologías del Mundo Antiguo
            </h3>
            <p className="text-stone-600">
              Explora las historias y leyendas que dieron forma a las
              civilizaciones
            </p>
          </div>
        </div>

        {/* Culture Selection */}
        <div className="flex flex-wrap gap-3">
          {cultures.map((culture) => {
            const IconComponent = culture.icon;
            return (
              <button
                key={culture.id}
                onClick={() => setSelectedCulture(culture.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all ${
                  selectedCulture === culture.id
                    ? `${culture.color} text-white border-transparent`
                    : "border-stone-300 bg-white text-stone-700 hover:border-amber-300"
                }`}
              >
                <IconComponent size={20} />
                <span className="font-medium">{culture.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mythologies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentMythologies.map((myth) => {
          const IconComponent = myth.icon;
          return (
            <div
              key={myth.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-amber-200 to-stone-300 relative overflow-hidden">
                <img
                  src={myth.image}
                  alt={myth.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {myth.category}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white bg-opacity-90 p-2 rounded-full">
                    <IconComponent size={20} className="text-amber-600" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-stone-800 mb-2">
                    {myth.title}
                  </h4>
                  <p className="text-stone-600 text-sm mb-3">
                    {myth.description}
                  </p>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    {myth.summary}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-stone-800 text-sm mb-1">
                      Personajes:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {myth.characters.slice(0, 3).map((character, index) => (
                        <span
                          key={index}
                          className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs"
                        >
                          {character}
                        </span>
                      ))}
                      {myth.characters.length > 3 && (
                        <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs">
                          +{myth.characters.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-stone-800 text-sm mb-1">
                      Temas:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {myth.themes.map((theme, index) => (
                        <span
                          key={index}
                          className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-amber-200">
                  <button
                    onClick={() => setSelectedMyth(myth)}
                    className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Leer Más
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Myth Detail Modal */}
      {selectedMyth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-stone-800">
                    {selectedMyth.title}
                  </h3>
                  <p className="text-amber-700 font-medium">
                    {selectedMyth.category}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMyth(null)}
                  className="text-stone-500 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <img
                    src={selectedMyth.image}
                    alt={selectedMyth.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-stone-800 mb-2">
                      Resumen
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      {selectedMyth.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-stone-800 mb-2">
                      Descripción
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      {selectedMyth.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-stone-800 mb-3">
                    Personajes Principales
                  </h4>
                  <div className="space-y-2">
                    {selectedMyth.characters.map((character, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Crown size={16} className="text-amber-500" />
                        <span className="text-stone-700">{character}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-stone-800 mb-3">
                    Temas Principales
                  </h4>
                  <div className="space-y-2">
                    {selectedMyth.themes.map((theme, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star size={16} className="text-amber-500" />
                        <span className="text-stone-700">{theme}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="text-lg font-bold text-stone-800 mb-2">
                  Significado Cultural
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Esta narrativa representa elementos fundamentales de la
                  cultura{" "}
                  {cultures
                    .find((c) => c.id === selectedCulture)
                    ?.name.toLowerCase()}
                  , reflejando sus valores, creencias y comprensión del mundo.
                  Los temas de {selectedMyth.themes.join(", ").toLowerCase()}
                  eran centrales en la sociedad antigua y continúan resonando en
                  la literatura y el arte contemporáneo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h3 className="text-xl font-bold text-stone-800 mb-4">Estadísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {Object.values(mythologies).flat().length}
            </div>
            <div className="text-stone-600 text-sm">Mitologías Totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {cultures.length}
            </div>
            <div className="text-stone-600 text-sm">Culturas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {currentMythologies.length}
            </div>
            <div className="text-stone-600 text-sm">Cultura Actual</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Object.values(mythologies)
                .flat()
                .reduce((acc, myth) => acc + myth.characters.length, 0)}
            </div>
            <div className="text-stone-600 text-sm">Personajes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mythologies;
