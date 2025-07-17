"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Sword,
  Crown,
  Building,
  Mountain,
  Waves,
  Star,
  Eye,
  Clock,
  Users,
  Scroll,
  Globe,
  Camera,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const HistoricalPlaces = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const categories = [
    { id: "all", name: "Todos", icon: Globe, color: "bg-stone-500" },
    { id: "cities", name: "Ciudades", icon: Building, color: "bg-blue-500" },
    { id: "temples", name: "Templos", icon: Crown, color: "bg-purple-500" },
    {
      id: "battlefields",
      name: "Campos de Batalla",
      icon: Sword,
      color: "bg-red-500",
    },
    {
      id: "monuments",
      name: "Monumentos",
      icon: Mountain,
      color: "bg-amber-500",
    },
    {
      id: "archaeological",
      name: "Sitios Arqueológicos",
      icon: Star,
      color: "bg-green-500",
    },
    {
      id: "natural",
      name: "Lugares Naturales",
      icon: Waves,
      color: "bg-cyan-500",
    },
  ];

  const periods = [
    { id: "all", name: "Todos los Períodos" },
    { id: "prehistoric", name: "Prehistoria (Antes 3000 a.C.)" },
    { id: "ancient", name: "Edad Antigua (3000 a.C. - 500 d.C.)" },
    { id: "classical", name: "Período Clásico (800-31 a.C.)" },
    { id: "hellenistic", name: "Período Helenístico (336-146 a.C.)" },
    { id: "roman", name: "Imperio Romano (27 a.C. - 476 d.C.)" },
  ];

  const historicalPlaces = [
    {
      id: 1,
      name: "Acrópolis de Atenas",
      category: "monuments",
      period: "classical",
      location: "Atenas, Grecia",
      coordinates: "37.9715, 23.7267",
      description:
        "Complejo de templos antiguos situado en una colina rocosa sobre la ciudad de Atenas.",
      detailedDescription:
        'La Acrópolis de Atenas es una antigua ciudadela ubicada en una colina rocosa sobre la ciudad de Atenas y contiene los restos de varios edificios de gran importancia arquitectónica e histórica, siendo el más famoso el Partenón. La palabra acrópolis proviene del griego akron (extremo, punta) y polis (ciudad), por lo que significa "ciudad alta".',
      significance:
        "Centro religioso y político de la antigua Atenas, símbolo de la democracia y la civilización occidental.",
      dateBuilt: "447-432 a.C.",
      builder: "Pericles (supervisor), Ictino y Calícrates (arquitectos)",
      currentStatus: "Patrimonio de la Humanidad UNESCO",
      keyFeatures: [
        "Partenón - Templo dedicado a Atenea",
        "Erecteión - Templo jónico con las Cariátides",
        "Propileos - Entrada monumental",
        "Templo de Atenea Niké",
      ],
      historicalEvents: [
        "Construcción durante la Edad de Oro de Pericles",
        "Conversión en iglesia cristiana (siglo VI)",
        "Uso como mezquita durante el dominio otomano",
        "Bombardeo veneciano (1687)",
      ],
      archaeologicalFindings: [
        "Esculturas del Partenón (Mármoles de Elgin)",
        "Inscripciones votivas",
        "Restos de templos arcaicos",
        "Objetos ceremoniales",
      ],
      visitInfo: {
        bestTimeToVisit: "Primavera y otoño",
        duration: "2-3 horas",
        accessibility: "Acceso limitado por escalones",
      },
      images: [
        "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
        "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      ],
      tags: [
        "Grecia",
        "Arquitectura",
        "Templos",
        "Pericles",
        "Atenea",
        "UNESCO",
      ],
    },
    {
      id: 2,
      name: "Coliseo Romano",
      category: "monuments",
      period: "roman",
      location: "Roma, Italia",
      coordinates: "41.8902, 12.4922",
      description:
        "El anfiteatro más grande jamás construido, símbolo del poder y la ingeniería romana.",
      detailedDescription:
        "El Coliseo, originalmente conocido como Anfiteatro Flavio, es un anfiteatro de la época del Imperio Romano, construido en el siglo I en el centro de la ciudad de Roma. Es el anfiteatro más grande jamás construido y se considera una de las mayores obras de la arquitectura e ingeniería romanas.",
      significance:
        "Símbolo del Imperio Romano y su capacidad de entretenimiento masivo, ejemplo de ingeniería avanzada.",
      dateBuilt: "72-80 d.C.",
      builder: "Emperador Vespasiano (inicio), completado bajo Tito",
      currentStatus:
        "Patrimonio de la Humanidad UNESCO, Nueva Maravilla del Mundo",
      keyFeatures: [
        "Capacidad para 50,000-80,000 espectadores",
        "Sistema de elevadores subterráneos (hipogeo)",
        "Velarium - sistema de toldos retráctiles",
        "Arena de madera cubierta de arena",
      ],
      historicalEvents: [
        "Inauguración con 100 días de juegos (80 d.C.)",
        "Combates de gladiadores y naumaquias",
        "Terremotos y daños (847, 1231 d.C.)",
        "Uso como fortaleza medieval",
      ],
      archaeologicalFindings: [
        "Sistemas de drenaje subterráneos",
        "Restos de jaulas para animales",
        "Inscripciones de asientos numerados",
        "Monedas y objetos personales",
      ],
      visitInfo: {
        bestTimeToVisit: "Todo el año, evitar verano",
        duration: "1.5-2 horas",
        accessibility: "Acceso para sillas de ruedas disponible",
      },
      images: [
        "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      ],
      tags: [
        "Roma",
        "Anfiteatro",
        "Gladiadores",
        "Vespasiano",
        "Ingeniería",
        "UNESCO",
      ],
    },
    {
      id: 3,
      name: "Campos de Batalla de Gaugamela",
      category: "battlefields",
      period: "hellenistic",
      location: "Tel Gomel, Irak",
      coordinates: "36.3500, 43.2500",
      description:
        "Sitio de la batalla decisiva entre Alejandro Magno y Darío III en 331 a.C.",
      detailedDescription:
        "Gaugamela fue el sitio de la batalla decisiva entre Alejandro Magno de Macedonia y Darío III de Persia el 1 de octubre de 331 a.C. Esta victoria aseguró la conquista del Imperio Persa por parte de Alejandro y marcó el fin de la resistencia persa organizada.",
      significance:
        "Batalla que decidió el destino del Imperio Persa y estableció el dominio macedonio en Asia.",
      dateBuilt: "N/A - Campo de batalla natural",
      builder: "N/A",
      currentStatus: "Sitio arqueológico en investigación",
      keyFeatures: [
        "Llanura amplia ideal para caballería",
        "Posiciones estratégicas de ambos ejércitos",
        "Terreno preparado por Darío III",
        "Restos de campamentos militares",
      ],
      historicalEvents: [
        "Batalla de Gaugamela (1 octubre 331 a.C.)",
        "Victoria decisiva de Alejandro Magno",
        "Huida de Darío III",
        "Conquista del tesoro persa en Babilonia",
      ],
      archaeologicalFindings: [
        "Puntas de lanza y flechas",
        "Restos de armaduras",
        "Monedas de ambos ejércitos",
        "Evidencia de campamentos",
      ],
      visitInfo: {
        bestTimeToVisit: "Primavera y otoño",
        duration: "1-2 horas",
        accessibility: "Terreno irregular",
      },
      images: [
        "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      ],
      tags: [
        "Alejandro Magno",
        "Darío III",
        "Batalla",
        "Persia",
        "Macedonia",
        "Conquista",
      ],
    },
    {
      id: 4,
      name: "Templo de Karnak",
      category: "temples",
      period: "ancient",
      location: "Luxor, Egipto",
      coordinates: "25.7188, 32.6573",
      description:
        "Complejo de templos más grande de Egipto, dedicado principalmente al dios Amón-Ra.",
      detailedDescription:
        "Karnak es un vasto complejo de templos, capillas, pilones y otros edificios cerca de Luxor, en Egipto. Es el segundo sitio religioso antiguo más grande del mundo, después de Angkor Wat en Camboya. Fue construido durante un período de más de 1,300 años.",
      significance:
        "Centro religioso más importante del antiguo Egipto, dedicado al culto de Amón-Ra.",
      dateBuilt: "2055 a.C. - 100 d.C.",
      builder: "Múltiples faraones a lo largo de 1,300 años",
      currentStatus: "Patrimonio de la Humanidad UNESCO",
      keyFeatures: [
        "Gran Sala Hipóstila con 134 columnas",
        "Obeliscos de Hatshepsut y Tutmosis I",
        "Lago sagrado para rituales",
        "Avenida de esfinges hacia Luxor",
      ],
      historicalEvents: [
        "Construcción iniciada en el Reino Medio",
        "Expansiones durante el Imperio Nuevo",
        "Restauraciones ptolemaicas",
        "Redescubrimiento moderno (siglo XIX)",
      ],
      archaeologicalFindings: [
        "Estatuas de faraones y dioses",
        "Papiros religiosos",
        "Objetos rituales de oro",
        "Inscripciones jeroglíficas",
      ],
      visitInfo: {
        bestTimeToVisit: "Octubre a abril",
        duration: "3-4 horas",
        accessibility: "Senderos pavimentados disponibles",
      },
      images: [
        "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      ],
      tags: [
        "Egipto",
        "Templo",
        "Amón-Ra",
        "Faraones",
        "Jeroglíficos",
        "UNESCO",
      ],
    },
    {
      id: 5,
      name: "Cartago",
      category: "cities",
      period: "ancient",
      location: "Túnez, Túnez",
      coordinates: "36.8065, 10.1815",
      description:
        "Antigua ciudad-estado fenicia, rival de Roma en el control del Mediterráneo.",
      detailedDescription:
        "Cartago fue una antigua ciudad-estado situada en lo que es ahora Túnez. Fue la capital del Imperio Cartaginés y una de las ciudades más ricas y poderosas de la antigüedad clásica. Fundada por colonos fenicios de Tiro, se convirtió en el centro de un imperio comercial que se extendía por el Mediterráneo occidental.",
      significance:
        "Principal rival de Roma, centro del comercio mediterráneo y cuna de grandes generales como Aníbal.",
      dateBuilt: "814 a.C. (según tradición)",
      builder: "Colonos fenicios liderados por la reina Dido",
      currentStatus: "Sitio arqueológico y Patrimonio UNESCO",
      keyFeatures: [
        "Puerto circular (Cothon) para la flota",
        "Barrio Byrsa (ciudadela)",
        "Necrópolis de Salammbô",
        "Restos de murallas púnicas",
      ],
      historicalEvents: [
        "Fundación por colonos fenicios (814 a.C.)",
        "Guerras Púnicas contra Roma (264-146 a.C.)",
        "Destrucción por Escipión Emiliano (146 a.C.)",
        "Refundación romana (44 a.C.)",
      ],
      archaeologicalFindings: [
        "Restos del puerto púnico",
        "Mosaicos romanos",
        "Inscripciones púnicas y latinas",
        "Objetos de comercio mediterráneo",
      ],
      visitInfo: {
        bestTimeToVisit: "Primavera y otoño",
        duration: "2-3 horas",
        accessibility: "Senderos accesibles en su mayoría",
      },
      images: [
        "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      ],
      tags: [
        "Cartago",
        "Fenicios",
        "Aníbal",
        "Guerras Púnicas",
        "Comercio",
        "Mediterráneo",
      ],
    },
    {
      id: 6,
      name: "Stonehenge",
      category: "archaeological",
      period: "prehistoric",
      location: "Wiltshire, Inglaterra",
      coordinates: "51.1789, -1.8262",
      description:
        "Monumento megalítico prehistórico compuesto por un anillo de piedras verticales.",
      detailedDescription:
        "Stonehenge es un monumento megalítico de la Edad del Bronce situado cerca de Amesbury, en el condado de Wiltshire, Inglaterra. Consiste en un anillo de piedras verticales, cada una de alrededor de 4 metros de altura, 2 metros de ancho y un peso de unas 25 toneladas.",
      significance:
        "Uno de los monumentos prehistóricos más famosos del mundo, posible observatorio astronómico.",
      dateBuilt: "3100-1600 a.C. (construcción en fases)",
      builder: "Culturas neolíticas y de la Edad del Bronce",
      currentStatus: "Patrimonio de la Humanidad UNESCO",
      keyFeatures: [
        "Círculo exterior de trilitos de sarsen",
        "Círculo interior de piedras azules",
        "Piedra del Talón (Heel Stone)",
        "Avenida ceremonial",
      ],
      historicalEvents: [
        "Primera fase de construcción (3100 a.C.)",
        "Adición de piedras azules (2600 a.C.)",
        "Construcción de trilitos (2600-2400 a.C.)",
        "Abandono gradual (1600 a.C.)",
      ],
      archaeologicalFindings: [
        "Restos de cremaciones",
        "Herramientas de piedra y hueso",
        "Evidencia de banquetes rituales",
        "Túmulos funerarios cercanos",
      ],
      visitInfo: {
        bestTimeToVisit: "Todo el año",
        duration: "1.5-2 horas",
        accessibility: "Sendero accesible para sillas de ruedas",
      },
      images: [
        "https://images.pexels.com/photos/161798/stonehenge-england-prehistoric-monument-161798.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      ],
      tags: [
        "Prehistoria",
        "Megalítico",
        "Astronomía",
        "Ritual",
        "Neolítico",
        "UNESCO",
      ],
    },
    {
      id: 7,
      name: "Campos de Batalla de Cannae",
      category: "battlefields",
      period: "roman",
      location: "Apulia, Italia",
      coordinates: "41.3088, 16.1647",
      description:
        "Sitio de la famosa victoria táctica de Aníbal sobre las legiones romanas en 216 a.C.",
      detailedDescription:
        "Cannae fue el sitio de una de las batallas más estudiadas en la historia militar. El 2 de agosto de 216 a.C., Aníbal Barca logró una de las victorias tácticas más brillantes de la historia, aniquilando un ejército romano mucho más numeroso mediante la famosa maniobra de doble envolvimiento.",
      significance:
        "Ejemplo clásico de táctica militar perfecta, demostración del genio estratégico de Aníbal.",
      dateBuilt: "N/A - Campo de batalla natural",
      builder: "N/A",
      currentStatus: "Sitio histórico con marcadores conmemorativos",
      keyFeatures: [
        "Llanura donde se desplegaron los ejércitos",
        "Río Aufidus (actual Ofanto)",
        "Colinas estratégicas",
        "Monumentos conmemorativos modernos",
      ],
      historicalEvents: [
        "Batalla de Cannae (2 agosto 216 a.C.)",
        "Muerte de 50,000-70,000 romanos",
        "Perfección de la táctica de envolvimiento",
        "Crisis política en Roma",
      ],
      archaeologicalFindings: [
        "Armas y armaduras romanas",
        "Monedas de la época",
        "Restos óseos de soldados",
        "Evidencia de campamentos",
      ],
      visitInfo: {
        bestTimeToVisit: "Primavera y otoño",
        duration: "1-2 horas",
        accessibility: "Terreno llano, fácil acceso",
      },
      images: [
        "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      ],
      tags: [
        "Aníbal",
        "Roma",
        "Táctica",
        "Guerra Púnica",
        "Estrategia",
        "Batalla",
      ],
    },
    {
      id: 8,
      name: "Machu Picchu",
      category: "cities",
      period: "ancient",
      location: "Cusco, Perú",
      coordinates: "-13.1631, -72.5450",
      description: "Ciudad inca situada en las montañas de los Andes peruanos.",
      detailedDescription:
        "Machu Picchu es una ciudadela inca situada en la cordillera Oriental del sur del Perú. Construida a mediados del siglo XV, es considerada una obra maestra de la arquitectura y la ingeniería. Fue declarada Patrimonio de la Humanidad por la UNESCO en 1983.",
      significance:
        "Ejemplo excepcional de arquitectura inca, símbolo de la civilización precolombina.",
      dateBuilt: "1450 d.C. aproximadamente",
      builder: "Emperador inca Pachacútec",
      currentStatus:
        "Patrimonio de la Humanidad UNESCO, Nueva Maravilla del Mundo",
      keyFeatures: [
        "Intihuatana (reloj solar de piedra)",
        "Templo del Sol",
        "Terraza de cultivo en andenes",
        "Sistema de drenaje avanzado",
      ],
      historicalEvents: [
        "Construcción durante el reinado de Pachacútec",
        "Abandono durante la conquista española",
        "Redescubrimiento por Hiram Bingham (1911)",
        "Declaración como Patrimonio UNESCO (1983)",
      ],
      archaeologicalFindings: [
        "Herramientas de bronce y piedra",
        "Cerámicas incas",
        "Restos óseos humanos",
        "Objetos rituales de oro y plata",
      ],
      visitInfo: {
        bestTimeToVisit: "Mayo a septiembre",
        duration: "Día completo",
        accessibility: "Terreno montañoso, requiere buena condición física",
      },
      images: [
        "https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      ],
      tags: ["Inca", "Perú", "Arquitectura", "Pachacútec", "Andes", "UNESCO"],
    },
  ];

  const filteredPlaces = historicalPlaces.filter((place) => {
    const matchesSearch =
      searchTerm === "" ||
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || place.category === selectedCategory;
    const matchesPeriod =
      selectedPeriod === "all" || place.period === selectedPeriod;

    return matchesSearch && matchesCategory && matchesPeriod;
  });

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find((cat) => cat.id === category);
    return categoryObj ? categoryObj.icon : MapPin;
  };

  const getCategoryColor = (category) => {
    const categoryObj = categories.find((cat) => cat.id === category);
    return categoryObj ? categoryObj.color : "bg-stone-500";
  };

  const formatCoordinates = (coords) => {
    const [lat, lng] = coords.split(", ");
    return `${parseFloat(lat).toFixed(4)}°, ${parseFloat(lng).toFixed(4)}°`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Lugares Históricos
            </h3>
            <p className="text-stone-600">
              Explora templos, ciudades, campos de batalla y sitios
              arqueológicos del mundo antiguo
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="text-amber-600" size={32} />
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
              placeholder="Buscar lugares históricos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-stone-700 font-medium mb-2">
                Categoría
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? `${category.color} text-white`
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

            <div className="lg:w-64">
              <label className="block text-stone-700 font-medium mb-2">
                Período
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-stone-700"
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
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => {
          const IconComponent = getCategoryIcon(place.category);
          return (
            <div
              key={place.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-amber-200 to-stone-300 relative overflow-hidden">
                <img
                  src={place.images[0]}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div
                    className={`${getCategoryColor(
                      place.category
                    )} text-white px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {categories.find((c) => c.id === place.category)?.name}
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
                    {place.name}
                  </h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={16} className="text-stone-500" />
                    <span className="text-stone-600 text-sm">
                      {place.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar size={16} className="text-stone-500" />
                    <span className="text-stone-600 text-sm">
                      {place.dateBuilt}
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">
                    {place.description}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {place.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {place.tags.length > 3 && (
                      <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs">
                        +{place.tags.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-200">
                  <button
                    onClick={() => setSelectedPlace(place)}
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

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-stone-800">
                    {selectedPlace.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-stone-500" />
                      <span className="text-stone-600">
                        {selectedPlace.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe size={16} className="text-stone-500" />
                      <span className="text-stone-600">
                        {formatCoordinates(selectedPlace.coordinates)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="text-stone-500 hover:text-stone-700 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Images Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPlace.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedPlace.name} ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-stone-800 mb-4">
                    Información General
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Calendar className="text-amber-600 mt-1" size={16} />
                      <div>
                        <span className="font-medium text-stone-800">
                          Construido:
                        </span>
                        <p className="text-stone-600">
                          {selectedPlace.dateBuilt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="text-amber-600 mt-1" size={16} />
                      <div>
                        <span className="font-medium text-stone-800">
                          Constructor:
                        </span>
                        <p className="text-stone-600">
                          {selectedPlace.builder}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Star className="text-amber-600 mt-1" size={16} />
                      <div>
                        <span className="font-medium text-stone-800">
                          Estado Actual:
                        </span>
                        <p className="text-stone-600">
                          {selectedPlace.currentStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-stone-800 mb-4">
                    Información de Visita
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Calendar className="text-green-600 mt-1" size={16} />
                      <div>
                        <span className="font-medium text-stone-800">
                          Mejor época:
                        </span>
                        <p className="text-stone-600">
                          {selectedPlace.visitInfo.bestTimeToVisit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="text-green-600 mt-1" size={16} />
                      <div>
                        <span className="font-medium text-stone-800">
                          Duración:
                        </span>
                        <p className="text-stone-600">
                          {selectedPlace.visitInfo.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="text-green-600 mt-1" size={16} />
                      <div>
                        <span className="font-medium text-stone-800">
                          Accesibilidad:
                        </span>
                        <p className="text-stone-600">
                          {selectedPlace.visitInfo.accessibility}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Descripción Detallada
                </h4>
                <p className="text-stone-700 leading-relaxed mb-4">
                  {selectedPlace.detailedDescription}
                </p>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h5 className="font-bold text-stone-800 mb-2">
                    Importancia Histórica
                  </h5>
                  <p className="text-stone-700">{selectedPlace.significance}</p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Características Principales
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPlace.keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-stone-50 rounded-lg"
                    >
                      <Building className="text-amber-600 mt-1" size={16} />
                      <span className="text-stone-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical Events */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Eventos Históricos
                </h4>
                <div className="space-y-3">
                  {selectedPlace.historicalEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <Scroll className="text-blue-600 mt-1" size={16} />
                      <span className="text-stone-700">{event}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Archaeological Findings */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Hallazgos Arqueológicos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPlace.archaeologicalFindings.map(
                    (finding, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <Star className="text-green-600 mt-1" size={16} />
                        <span className="text-stone-700">{finding}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Etiquetas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlace.tags.map((tag, index) => (
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
          Estadísticas de Lugares
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {filteredPlaces.length}
            </div>
            <div className="text-stone-600 text-sm">Lugares Mostrados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {historicalPlaces.filter((p) => p.category === "cities").length}
            </div>
            <div className="text-stone-600 text-sm">Ciudades</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {historicalPlaces.filter((p) => p.category === "temples").length}
            </div>
            <div className="text-stone-600 text-sm">Templos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {
                historicalPlaces.filter((p) => p.category === "battlefields")
                  .length
              }
            </div>
            <div className="text-stone-600 text-sm">Batallas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalPlaces;
