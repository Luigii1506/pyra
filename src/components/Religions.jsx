"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Crown,
  Star,
  Book,
  Users,
  Calendar,
  Globe,
  Eye,
  Scroll,
  Sun,
  Moon,
  Mountain,
  Waves,
  Zap,
  Heart,
  Shield,
  Flame,
} from "lucide-react";

const Religions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCivilization, setSelectedCivilization] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedReligion, setSelectedReligion] = useState(null);

  const civilizations = [
    {
      id: "all",
      name: "Todas las Civilizaciones",
      icon: Globe,
      color: "bg-stone-500",
    },
    { id: "greek", name: "Griega", icon: Crown, color: "bg-blue-600" },
    { id: "roman", name: "Romana", icon: Shield, color: "bg-red-600" },
    { id: "egyptian", name: "Egipcia", icon: Sun, color: "bg-yellow-600" },
    {
      id: "mesopotamian",
      name: "Mesopotámica",
      icon: Mountain,
      color: "bg-green-600",
    },
    { id: "persian", name: "Persa", icon: Flame, color: "bg-orange-600" },
    { id: "celtic", name: "Celta", icon: Moon, color: "bg-purple-600" },
    { id: "norse", name: "Nórdica", icon: Zap, color: "bg-indigo-600" },
    { id: "hebrew", name: "Hebrea", icon: Star, color: "bg-cyan-600" },
  ];

  const religionTypes = [
    { id: "all", name: "Todos los Tipos" },
    { id: "polytheistic", name: "Politeísta" },
    { id: "monotheistic", name: "Monoteísta" },
    { id: "dualistic", name: "Dualista" },
    { id: "mystery", name: "Religión Mistérica" },
    { id: "philosophical", name: "Filosófico-Religiosa" },
  ];

  const religions = [
    {
      id: 1,
      name: "Religión Olímpica Griega",
      civilization: "greek",
      type: "polytheistic",
      period: "800 a.C. - 400 d.C.",
      description:
        "Sistema religioso centrado en los doce dioses olímpicos y sus cultos.",
      detailedDescription:
        "La religión griega antigua era un sistema politeísta complejo centrado en el panteón olímpico. Los griegos creían en múltiples dioses que controlaban diferentes aspectos de la vida y la naturaleza. El culto se realizaba tanto en templos públicos como en santuarios privados, con festivales religiosos que combinaban aspectos espirituales, sociales y políticos.",
      mainDeities: [
        "Zeus - Rey de los dioses, señor del cielo",
        "Hera - Reina de los dioses, protectora del matrimonio",
        "Poseidón - Dios del mar y los terremotos",
        "Atenea - Diosa de la sabiduría y la guerra",
        "Apolo - Dios de la música, poesía y profecía",
        "Artemisa - Diosa de la caza y la luna",
      ],
      keyBeliefs: [
        "Politeísmo con jerarquía divina",
        "Intervención divina en asuntos humanos",
        "Importancia de los rituales y sacrificios",
        "Concepto de hybris (orgullo excesivo)",
        "Destino controlado por las Moiras",
      ],
      rituals: [
        "Sacrificios de animales en altares",
        "Libaciones con vino y aceite",
        "Procesiones religiosas",
        "Festivales como las Panateneas",
        "Consultas oraculares en Delfos",
      ],
      sacredPlaces: [
        "Partenón en Atenas",
        "Oráculo de Delfos",
        "Santuario de Olimpia",
        "Templo de Artemisa en Éfeso",
        "Santuario de Eleusis",
      ],
      influence:
        "Profunda influencia en el arte, literatura, filosofía y política griega. Base de muchos conceptos occidentales sobre mitología y religión.",
      modernLegacy:
        "Sus mitos y símbolos perduran en la literatura, arte y cultura popular moderna. Influencia en el pensamiento filosófico occidental.",
      image:
        "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      tags: ["Politeísmo", "Olimpo", "Zeus", "Templos", "Oráculos"],
    },
    {
      id: 2,
      name: "Religión Romana Tradicional",
      civilization: "roman",
      type: "polytheistic",
      period: "753 a.C. - 380 d.C.",
      description:
        "Sistema religioso romano que combinaba dioses nativos con deidades adoptadas.",
      detailedDescription:
        "La religión romana era inicialmente animista y se centró en los numina (espíritus) que habitaban lugares y objetos. Con el tiempo incorporó dioses griegos adaptándolos a su cultura. Era una religión estatal donde el emperador tenía funciones religiosas importantes y se enfatizaba la pietas (devoción) hacia los dioses y ancestros.",
      mainDeities: [
        "Júpiter - Rey de los dioses (equivalente a Zeus)",
        "Juno - Reina de los dioses (equivalente a Hera)",
        "Minerva - Diosa de la sabiduría (equivalente a Atenea)",
        "Marte - Dios de la guerra",
        "Venus - Diosa del amor y la belleza",
        "Vesta - Diosa del hogar y el fuego sagrado",
      ],
      keyBeliefs: [
        "Pietas (devoción religiosa)",
        "Culto a los ancestros (Lares y Penates)",
        "Religión como deber cívico",
        "Auspicia (interpretación de signos divinos)",
        "Deificación de emperadores",
      ],
      rituals: [
        "Sacrificios públicos y privados",
        "Mantenimiento del fuego sagrado de Vesta",
        "Lectisternium (banquetes para los dioses)",
        "Lustración (purificación ritual)",
        "Triunfos militares con ceremonias religiosas",
      ],
      sacredPlaces: [
        "Templo de Júpiter Óptimo Máximo",
        "Casa de las Vestales",
        "Panteón",
        "Templo de Marte Ultor",
        "Ara Pacis",
      ],
      influence:
        "Estructuró la vida pública romana y legitimó el poder imperial. Influyó en el desarrollo del cristianismo primitivo.",
      modernLegacy:
        "Conceptos de religión civil y ceremonial estatal. Influencia en arquitectura religiosa y simbolismo político.",
      image:
        "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      tags: ["Roma", "Júpiter", "Pietas", "Emperador", "Vestales"],
    },
    {
      id: 3,
      name: "Religión Egipcia Antigua",
      civilization: "egyptian",
      type: "polytheistic",
      period: "3100 a.C. - 400 d.C.",
      description:
        "Complejo sistema religioso centrado en la vida después de la muerte y el culto faraónico.",
      detailedDescription:
        "La religión egipcia antigua era un sistema politeísta complejo que evolucionó durante más de 3,000 años. Se caracterizaba por su obsesión con la muerte y el más allá, el culto al faraón como dios viviente, y una rica mitología sobre la creación y el orden cósmico (Maat). Los rituales de momificación y las construcciones funerarias monumentales reflejaban estas creencias.",
      mainDeities: [
        "Ra - Dios del sol, creador supremo",
        "Osiris - Dios de los muertos y el más allá",
        "Isis - Diosa de la magia y la maternidad",
        "Horus - Dios del cielo, asociado con el faraón",
        "Anubis - Dios de la momificación",
        "Thoth - Dios de la sabiduría y la escritura",
      ],
      keyBeliefs: [
        "Vida después de la muerte",
        "Maat (orden cósmico y justicia)",
        "Divinidad del faraón",
        "Importancia de la momificación",
        "Juicio de los muertos",
      ],
      rituals: [
        "Momificación y rituales funerarios",
        "Culto diario en templos",
        "Festival de Opet",
        "Ceremonia de apertura de la boca",
        "Ofrendas a los muertos",
      ],
      sacredPlaces: [
        "Templo de Karnak",
        "Templo de Luxor",
        "Pirámides de Giza",
        "Templo de Abu Simbel",
        "Valle de los Reyes",
      ],
      influence:
        "Influyó en conceptos de vida después de la muerte en otras religiones. Desarrolló técnicas de preservación y arquitectura monumental.",
      modernLegacy:
        "Fascina por sus misterios y monumentos. Influencia en esoterismo y arqueología moderna.",
      image:
        "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      tags: ["Egipto", "Faraón", "Momificación", "Pirámides", "Osiris"],
    },
    {
      id: 4,
      name: "Zoroastrismo",
      civilization: "persian",
      type: "dualistic",
      period: "600 a.C. - presente",
      description:
        "Religión dualista fundada por Zoroastro que influyó en el judaísmo, cristianismo e islam.",
      detailedDescription:
        "El zoroastrismo, fundado por el profeta Zoroastro (Zaratustra) en Persia, es una de las primeras religiones monoteístas con elementos dualistas. Enseña la lucha cósmica entre Ahura Mazda (el dios supremo del bien) y Angra Mainyu (el espíritu destructivo del mal). Enfatiza la responsabilidad moral individual y el libre albedrío.",
      mainDeities: [
        "Ahura Mazda - Señor Sabio, dios supremo",
        "Amesha Spentas - Seis arcángeles o aspectos divinos",
        "Mithra - Dios de los contratos y la luz",
        "Anahita - Diosa de las aguas y la fertilidad",
        "Verethragna - Dios de la victoria",
        "Tishtrya - Dios de la lluvia y las estrellas",
      ],
      keyBeliefs: [
        "Dualismo cósmico (bien vs mal)",
        "Libre albedrío y responsabilidad moral",
        "Juicio final y resurrección",
        "Pureza ritual (especialmente del fuego)",
        "Buenos pensamientos, buenas palabras, buenas acciones",
      ],
      rituals: [
        "Mantenimiento del fuego sagrado",
        "Exposición de cadáveres (Torres del Silencio)",
        "Purificaciones rituales",
        "Oración cinco veces al día",
        "Festivales estacionales",
      ],
      sacredPlaces: [
        "Templos de fuego (Atash Bahram)",
        "Persépolis",
        "Naqsh-e Rustam",
        "Yazd (centro moderno)",
        "Torres del Silencio",
      ],
      influence:
        "Influyó profundamente en el judaísmo tardío, cristianismo e islam. Conceptos de ángeles, demonio, juicio final.",
      modernLegacy:
        "Comunidades parsi en India. Influencia en conceptos religiosos occidentales sobre el bien y el mal.",
      image:
        "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      tags: ["Persia", "Zoroastro", "Dualismo", "Fuego", "Ahura Mazda"],
    },
    {
      id: 5,
      name: "Misterios de Eleusis",
      civilization: "greek",
      type: "mystery",
      period: "1500 a.C. - 396 d.C.",
      description:
        "Cultos mistéricos griegos centrados en Deméter y Perséfone.",
      detailedDescription:
        "Los Misterios de Eleusis eran ritos de iniciación anuales al culto de las diosas Deméter y Perséfone, celebrados en Eleusis cerca de Atenas. Prometían a los iniciados una vida bendita en el más allá. Los rituales exactos permanecen secretos, pero incluían purificaciones, ayunos, y revelaciones místicas sobre la muerte y renacimiento.",
      mainDeities: [
        "Deméter - Diosa de la agricultura y la cosecha",
        "Perséfone - Reina del inframundo",
        "Hades - Señor del inframundo",
        "Iacchus - Dios asociado con los misterios",
        "Triptólemo - Héroe que enseñó la agricultura",
        "Hécate - Diosa de la magia y los cruces",
      ],
      keyBeliefs: [
        "Vida después de la muerte bendita para iniciados",
        "Ciclo de muerte y renacimiento",
        "Purificación espiritual",
        "Secreto absoluto sobre los rituales",
        "Transformación personal a través de la iniciación",
      ],
      rituals: [
        "Procesión desde Atenas a Eleusis",
        "Purificación en el mar",
        "Ayuno ritual",
        "Revelaciones en el Telesterion",
        "Comunión sagrada (kykeon)",
      ],
      sacredPlaces: [
        "Santuario de Eleusis",
        "Telesterion (sala de iniciación)",
        "Propileos de Eleusis",
        "Pozo Kallichoron",
        "Cueva de Hades",
      ],
      influence:
        "Influyó en el desarrollo de religiones mistéricas posteriores y en conceptos cristianos primitivos.",
      modernLegacy:
        "Estudios sobre experiencias místicas y estados alterados de conciencia. Influencia en esoterismo occidental.",
      image:
        "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      tags: ["Misterios", "Eleusis", "Deméter", "Iniciación", "Secreto"],
    },
    {
      id: 6,
      name: "Religión Mesopotámica",
      civilization: "mesopotamian",
      type: "polytheistic",
      period: "3500 a.C. - 100 d.C.",
      description:
        "Sistema religioso de Sumeria, Babilonia y Asiria centrado en dioses cósmicos.",
      detailedDescription:
        "La religión mesopotámica evolucionó a través de varias civilizaciones (sumeria, acadia, babilónica, asiria) pero mantuvo características comunes: un panteón de dioses asociados con fuerzas naturales y ciudades, ziggurats como centros religiosos, y una visión pesimista del más allá. Los dioses eran vistos como poderosos pero caprichosos.",
      mainDeities: [
        "Anu - Dios del cielo, padre de los dioses",
        "Enlil - Dios del viento y las tormentas",
        "Enki/Ea - Dios de las aguas dulces y la sabiduría",
        "Marduk - Dios supremo de Babilonia",
        "Ishtar/Inanna - Diosa del amor y la guerra",
        "Shamash - Dios del sol y la justicia",
      ],
      keyBeliefs: [
        "Dioses como fuerzas naturales personificadas",
        "Destino humano controlado por los dioses",
        "Importancia de los rituales para mantener el orden",
        "Visión sombría del más allá",
        "Adivinación y presagios",
      ],
      rituals: [
        "Sacrificios en ziggurats",
        "Festival de Año Nuevo (Akitu)",
        "Rituales de fertilidad",
        "Consulta de oráculos",
        "Exorcismos y purificaciones",
      ],
      sacredPlaces: [
        "Ziggurat de Ur",
        "Templo de Marduk en Babilonia",
        "Ziggurat de Babel",
        "Templo de Ishtar en Uruk",
        "Palacio de Mari",
      ],
      influence:
        "Influyó en religiones posteriores del Medio Oriente. Desarrolló conceptos de ley divina y profecía.",
      modernLegacy:
        "Arqueología bíblica y estudios del Antiguo Testamento. Influencia en literatura épica (Gilgamesh).",
      image:
        "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      tags: ["Mesopotamia", "Ziggurat", "Marduk", "Babilonia", "Sumeria"],
    },
  ];

  const filteredReligions = religions.filter((religion) => {
    const matchesSearch =
      searchTerm === "" ||
      religion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      religion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      religion.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCivilization =
      selectedCivilization === "all" ||
      religion.civilization === selectedCivilization;
    const matchesType =
      selectedType === "all" || religion.type === selectedType;

    return matchesSearch && matchesCivilization && matchesType;
  });

  const getCivilizationIcon = (civilization) => {
    const civObj = civilizations.find((civ) => civ.id === civilization);
    return civObj ? civObj.icon : Globe;
  };

  const getCivilizationColor = (civilization) => {
    const civObj = civilizations.find((civ) => civ.id === civilization);
    return civObj ? civObj.color : "bg-stone-500";
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "polytheistic":
        return "bg-blue-100 text-blue-800";
      case "monotheistic":
        return "bg-green-100 text-green-800";
      case "dualistic":
        return "bg-purple-100 text-purple-800";
      case "mystery":
        return "bg-amber-100 text-amber-800";
      case "philosophical":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-stone-100 text-stone-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Religiones del Mundo Antiguo
            </h3>
            <p className="text-stone-600">
              Explora los sistemas de creencias que dieron forma a las
              civilizaciones antiguas
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Crown className="text-amber-600" size={32} />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar religiones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-stone-700 font-medium mb-2">
                Civilización
              </label>
              <div className="flex flex-wrap gap-2">
                {civilizations.map((civilization) => {
                  const IconComponent = civilization.icon;
                  return (
                    <button
                      key={civilization.id}
                      onClick={() => setSelectedCivilization(civilization.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        selectedCivilization === civilization.id
                          ? `${civilization.color} text-white`
                          : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                      }`}
                    >
                      <IconComponent size={16} />
                      <span className="text-sm">{civilization.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:w-64">
              <label className="block text-stone-700 font-medium mb-2">
                Tipo de Religión
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-stone-700"
              >
                {religionTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Religions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReligions.map((religion) => {
          const IconComponent = getCivilizationIcon(religion.civilization);
          return (
            <div
              key={religion.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-amber-200 to-stone-300 relative overflow-hidden">
                <img
                  src={religion.image}
                  alt={religion.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      religion.type
                    )}`}
                  >
                    {religionTypes.find((t) => t.id === religion.type)?.name}
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
                    {religion.name}
                  </h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar size={16} className="text-stone-500" />
                    <span className="text-stone-600 text-sm">
                      {religion.period}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Globe size={16} className="text-stone-500" />
                    <span className="text-stone-600 text-sm">
                      {
                        civilizations.find(
                          (c) => c.id === religion.civilization
                        )?.name
                      }
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">
                    {religion.description}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {religion.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {religion.tags.length > 3 && (
                      <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs">
                        +{religion.tags.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-200">
                  <button
                    onClick={() => setSelectedReligion(religion)}
                    className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>Ver Detalles</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Religion Detail Modal */}
      {selectedReligion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-stone-800">
                    {selectedReligion.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-stone-500" />
                      <span className="text-stone-600">
                        {selectedReligion.period}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe size={16} className="text-stone-500" />
                      <span className="text-stone-600">
                        {
                          civilizations.find(
                            (c) => c.id === selectedReligion.civilization
                          )?.name
                        }
                      </span>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        selectedReligion.type
                      )}`}
                    >
                      {
                        religionTypes.find(
                          (t) => t.id === selectedReligion.type
                        )?.name
                      }
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReligion(null)}
                  className="text-stone-500 hover:text-stone-700 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Image */}
              <div>
                <img
                  src={selectedReligion.image}
                  alt={selectedReligion.name}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Descripción Detallada
                </h4>
                <p className="text-stone-700 leading-relaxed">
                  {selectedReligion.detailedDescription}
                </p>
              </div>

              {/* Main Deities */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Principales Deidades
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedReligion.mainDeities.map((deity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <Crown className="text-blue-600 mt-1" size={16} />
                      <span className="text-stone-700">{deity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Beliefs */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Creencias Principales
                </h4>
                <div className="space-y-3">
                  {selectedReligion.keyBeliefs.map((belief, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <Star className="text-green-600 mt-1" size={16} />
                      <span className="text-stone-700">{belief}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rituals */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Rituales y Prácticas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedReligion.rituals.map((ritual, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
                    >
                      <Scroll className="text-purple-600 mt-1" size={16} />
                      <span className="text-stone-700">{ritual}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sacred Places */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Lugares Sagrados
                </h4>
                <div className="space-y-3">
                  {selectedReligion.sacredPlaces.map((place, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200"
                    >
                      <Mountain className="text-amber-600 mt-1" size={16} />
                      <span className="text-stone-700">{place}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Influence and Legacy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-stone-800 mb-4">
                    Influencia Histórica
                  </h4>
                  <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
                    <p className="text-stone-700 leading-relaxed">
                      {selectedReligion.influence}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-stone-800 mb-4">
                    Legado Moderno
                  </h4>
                  <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
                    <p className="text-stone-700 leading-relaxed">
                      {selectedReligion.modernLegacy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Etiquetas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedReligion.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h3 className="text-xl font-bold text-stone-800 mb-4">
          Estadísticas de Religiones
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {filteredReligions.length}
            </div>
            <div className="text-stone-600 text-sm">Religiones Mostradas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {religions.filter((r) => r.type === "polytheistic").length}
            </div>
            <div className="text-stone-600 text-sm">Politeístas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {religions.filter((r) => r.type === "monotheistic").length}
            </div>
            <div className="text-stone-600 text-sm">Monoteístas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(religions.map((r) => r.civilization)).size}
            </div>
            <div className="text-stone-600 text-sm">Civilizaciones</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Religions;
