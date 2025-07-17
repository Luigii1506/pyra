"use client";
import React, { useState } from "react";
import {
  Search,
  Crown,
  Sword,
  Scroll,
  Star,
  Calendar,
  MapPin,
} from "lucide-react";

const Characters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const categories = [
    { id: "all", name: "Todos", icon: Star },
    { id: "emperors", name: "Emperadores", icon: Crown },
    { id: "generals", name: "Generales", icon: Sword },
    { id: "philosophers", name: "Filósofos", icon: Scroll },
    { id: "politicians", name: "Políticos", icon: Star },
  ];

  const characters = [
    {
      id: 1,
      name: "Julio César",
      title: "Dictador Romano",
      period: "100 - 44 a.C.",
      category: "politicians",
      image:
        "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
      description:
        "Político y general romano que jugó un papel crucial en la caída de la República Romana.",
      achievements: [
        "Conquistó las Galias",
        "Cruzó el Rubicón",
        "Estableció el Primer Triunvirato",
        "Reformó el calendario",
      ],
      battles: ["Batalla de Alesia", "Batalla de Farsalia", "Sitio de Avarico"],
      birthPlace: "Roma",
      deathPlace: "Roma",
      legacy:
        "Su legado incluye el mes de Julio, el título de César, y sus Comentarios sobre las Guerras Gálicas.",
    },
    {
      id: 2,
      name: "Alejandro Magno",
      title: "Rey de Macedonia",
      period: "356 - 323 a.C.",
      category: "emperors",
      image:
        "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
      description:
        "Rey de Macedonia que creó uno de los imperios más grandes de la historia antigua.",
      achievements: [
        "Conquistó el Imperio Persa",
        "Fundó Alejandría",
        "Difundió la cultura helenística",
        "Nunca perdió una batalla",
      ],
      battles: ["Batalla de Gaugamela", "Batalla de Issos", "Sitio de Tiro"],
      birthPlace: "Pella, Macedonia",
      deathPlace: "Babilonia",
      legacy:
        "Su conquista difundió la cultura griega por todo el mundo conocido, creando el período helenístico.",
    },
    {
      id: 3,
      name: "Sócrates",
      title: "Filósofo Griego",
      period: "470 - 399 a.C.",
      category: "philosophers",
      image:
        "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
      description:
        "Filósofo griego considerado el padre de la filosofía occidental.",
      achievements: [
        "Desarrolló el método socrático",
        "Maestro de Platón",
        "Estableció los fundamentos de la ética",
        "Influyó en toda la filosofía posterior",
      ],
      battles: [],
      birthPlace: "Atenas",
      deathPlace: "Atenas",
      legacy:
        "Su método de enseñanza y sus ideas sobre la virtud y el conocimiento siguen siendo influyentes.",
    },
    {
      id: 4,
      name: "Aníbal Barca",
      title: "General Cartaginés",
      period: "247 - 183 a.C.",
      category: "generals",
      image:
        "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
      description:
        "General cartaginés famoso por cruzar los Alpes con elefantes durante la Segunda Guerra Púnica.",
      achievements: [
        "Cruzó los Alpes con elefantes",
        "Victoria en Cannae",
        "Estratega militar brillante",
        "Desafió a Roma en su territorio",
      ],
      battles: [
        "Batalla de Cannae",
        "Batalla de Trebia",
        "Batalla del Lago Trasimeno",
      ],
      birthPlace: "Cartago",
      deathPlace: "Bitinia",
      legacy:
        "Considerado uno de los mejores estrategas militares de la historia.",
    },
    {
      id: 5,
      name: "Cleopatra VII",
      title: "Reina de Egipto",
      period: "69 - 30 a.C.",
      category: "emperors",
      image:
        "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
      description:
        "Última reina del Egipto ptolemaico, conocida por sus relaciones con Julio César y Marco Antonio.",
      achievements: [
        "Gobernó Egipto durante 21 años",
        "Habló nueve idiomas",
        "Preservó la independencia egipcia",
        "Promovió las artes y ciencias",
      ],
      battles: ["Batalla de Actium"],
      birthPlace: "Alejandría",
      deathPlace: "Alejandría",
      legacy: "Símbolo de poder femenino y última faraona de Egipto.",
    },
    {
      id: 6,
      name: "Augusto",
      title: "Primer Emperador Romano",
      period: "63 a.C. - 14 d.C.",
      category: "emperors",
      image:
        "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
      description:
        "Primer emperador romano, estableció la Pax Romana y transformó Roma en un imperio.",
      achievements: [
        "Estableció el Imperio Romano",
        "Creó la Pax Romana",
        "Reformó el ejército",
        "Construyó monumentos duraderos",
      ],
      battles: ["Batalla de Actium", "Batalla de Filipos"],
      birthPlace: "Roma",
      deathPlace: "Nola",
      legacy:
        "Fundador del Imperio Romano y creador de una era de paz y prosperidad.",
    },
  ];

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch =
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || character.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Personajes Históricos
            </h3>
            <p className="text-stone-600">
              Explora las figuras más influyentes de la historia antigua
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3 text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar personajes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? "bg-amber-600 text-white"
                      : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="h-48 bg-gradient-to-br from-amber-200 to-stone-300 relative overflow-hidden">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {categories.find((c) => c.id === character.category)?.name}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-xl font-bold text-stone-800 mb-1">
                  {character.name}
                </h4>
                <p className="text-amber-700 font-medium text-sm">
                  {character.title}
                </p>
                <p className="text-stone-600 text-sm">{character.period}</p>
              </div>

              <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                {character.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin size={16} className="text-stone-500" />
                  <span className="text-stone-600">{character.birthPlace}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Calendar size={16} className="text-stone-500" />
                  <span className="text-stone-600">{character.period}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-200">
                <button
                  onClick={() => setSelectedCharacter(character)}
                  className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-stone-800">
                    {selectedCharacter.name}
                  </h3>
                  <p className="text-amber-700 font-medium">
                    {selectedCharacter.title}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCharacter(null)}
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
                    src={selectedCharacter.image}
                    alt={selectedCharacter.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-stone-800 mb-2">
                      Biografía
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      {selectedCharacter.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-stone-800 mb-2">
                        Información
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Período:</span>{" "}
                          {selectedCharacter.period}
                        </div>
                        <div>
                          <span className="font-medium">Nacimiento:</span>{" "}
                          {selectedCharacter.birthPlace}
                        </div>
                        <div>
                          <span className="font-medium">Muerte:</span>{" "}
                          {selectedCharacter.deathPlace}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-bold text-stone-800 mb-2">
                        Categoría
                      </h5>
                      <div className="text-sm">
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                          {
                            categories.find(
                              (c) => c.id === selectedCharacter.category
                            )?.name
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-stone-800 mb-3">
                    Logros Principales
                  </h4>
                  <ul className="space-y-2">
                    {selectedCharacter.achievements.map(
                      (achievement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Star size={16} className="text-amber-500 mt-0.5" />
                          <span className="text-stone-600 text-sm">
                            {achievement}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {selectedCharacter.battles.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-stone-800 mb-3">
                      Batallas Importantes
                    </h4>
                    <ul className="space-y-2">
                      {selectedCharacter.battles.map((battle, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Sword size={16} className="text-red-500 mt-0.5" />
                          <span className="text-stone-600 text-sm">
                            {battle}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-lg font-bold text-stone-800 mb-3">
                  Legado
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  {selectedCharacter.legacy}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
