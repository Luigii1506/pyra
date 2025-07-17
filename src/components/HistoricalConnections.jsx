"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Users,
  Crown,
  Sword,
  Heart,
  ArrowRight,
  ArrowDown,
  GitBranch,
  Network,
  Eye,
  Calendar,
  MapPin,
  Star,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const HistoricalConnections = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: "all",
      name: "Todas las Conexiones",
      icon: Network,
      color: "bg-stone-500",
    },
    { id: "dynasties", name: "Dinastías", icon: Crown, color: "bg-purple-600" },
    { id: "alliances", name: "Alianzas", icon: Shield, color: "bg-blue-600" },
    { id: "wars", name: "Conflictos", icon: Sword, color: "bg-red-600" },
    {
      id: "successions",
      name: "Sucesiones",
      icon: ArrowRight,
      color: "bg-green-600",
    },
    {
      id: "migrations",
      name: "Migraciones",
      icon: Globe,
      color: "bg-amber-600",
    },
    { id: "mythology", name: "Mitología", icon: Star, color: "bg-indigo-600" },
  ];

  const connections = [
    {
      id: 1,
      title: "Dinastía Julio-Claudia",
      category: "dynasties",
      period: "27 a.C. - 68 d.C.",
      description:
        "Primera dinastía imperial romana que gobernó durante casi un siglo.",
      type: "genealogical",
      nodes: [
        {
          id: "augustus",
          name: "Augusto",
          title: "Primer Emperador",
          period: "27 a.C. - 14 d.C.",
          description: "Fundador del Imperio Romano",
          level: 1,
          position: { x: 50, y: 10 },
          color: "bg-purple-600",
          achievements: [
            "Estableció la Pax Romana",
            "Reformó el ejército",
            "Construyó monumentos duraderos",
          ],
        },
        {
          id: "tiberius",
          name: "Tiberio",
          title: "Segundo Emperador",
          period: "14 - 37 d.C.",
          description: "Hijastro de Augusto",
          level: 2,
          position: { x: 30, y: 30 },
          color: "bg-blue-600",
          achievements: [
            "Consolidó las fronteras",
            "Reformas administrativas",
            "Política exterior cautelosa",
          ],
        },
        {
          id: "caligula",
          name: "Calígula",
          title: "Tercer Emperador",
          period: "37 - 41 d.C.",
          description: "Sobrino nieto de Tiberio",
          level: 3,
          position: { x: 20, y: 50 },
          color: "bg-red-600",
          achievements: [
            "Construcciones públicas",
            "Espectáculos grandiosos",
            "Gobierno controvertido",
          ],
        },
        {
          id: "claudius",
          name: "Claudio",
          title: "Cuarto Emperador",
          period: "41 - 54 d.C.",
          description: "Tío de Calígula",
          level: 3,
          position: { x: 50, y: 50 },
          color: "bg-green-600",
          achievements: [
            "Conquista de Britania",
            "Reformas legales",
            "Expansión ciudadanía",
          ],
        },
        {
          id: "nero",
          name: "Nerón",
          title: "Quinto Emperador",
          period: "54 - 68 d.C.",
          description: "Hijastro de Claudio",
          level: 4,
          position: { x: 50, y: 70 },
          color: "bg-orange-600",
          achievements: [
            "Reconstrucción tras incendio",
            "Promoción de las artes",
            "Último de la dinastía",
          ],
        },
      ],
      connections: [
        {
          from: "augustus",
          to: "tiberius",
          type: "adoption",
          label: "Adopción",
        },
        {
          from: "tiberius",
          to: "caligula",
          type: "succession",
          label: "Sucesión",
        },
        {
          from: "augustus",
          to: "claudius",
          type: "family",
          label: "Sobrino nieto",
        },
        { from: "claudius", to: "nero", type: "adoption", label: "Adopción" },
      ],
      significance:
        "Estableció el modelo de sucesión imperial y sentó las bases del principado romano.",
      keyEvents: [
        "Establecimiento del Principado (27 a.C.)",
        "Muerte de Augusto (14 d.C.)",
        "Asesinato de Calígula (41 d.C.)",
        "Conquista de Britania (43 d.C.)",
        "Gran Incendio de Roma (64 d.C.)",
        "Suicidio de Nerón (68 d.C.)",
      ],
      modernRelevance:
        "Modelo de transición de poder que influyó en sistemas políticos posteriores.",
    },
    {
      id: 2,
      title: "Alianzas de las Guerras Médicas",
      category: "alliances",
      period: "499 - 449 a.C.",
      description:
        "Red de alianzas entre ciudades-estado griegas contra el Imperio Persa.",
      type: "political",
      nodes: [
        {
          id: "athens",
          name: "Atenas",
          title: "Líder de la Liga de Delos",
          period: "508 - 322 a.C.",
          description: "Principal potencia naval griega",
          level: 1,
          position: { x: 30, y: 20 },
          color: "bg-blue-600",
          achievements: ["Democracia", "Flota poderosa", "Cultura floreciente"],
        },
        {
          id: "sparta",
          name: "Esparta",
          title: "Líder de la Liga del Peloponeso",
          period: "800 - 146 a.C.",
          description: "Principal potencia terrestre griega",
          level: 1,
          position: { x: 70, y: 20 },
          color: "bg-red-600",
          achievements: [
            "Ejército invencible",
            "Disciplina militar",
            "Sistema político dual",
          ],
        },
        {
          id: "corinth",
          name: "Corinto",
          title: "Ciudad Comercial",
          period: "700 - 146 a.C.",
          description: "Importante centro comercial",
          level: 2,
          position: { x: 50, y: 40 },
          color: "bg-amber-600",
          achievements: [
            "Comercio marítimo",
            "Innovaciones navales",
            "Riqueza comercial",
          ],
        },
        {
          id: "thebes",
          name: "Tebas",
          title: "Potencia Beocia",
          period: "600 - 335 a.C.",
          description: "Rival de Atenas y Esparta",
          level: 2,
          position: { x: 30, y: 60 },
          color: "bg-purple-600",
          achievements: [
            "Batallón Sagrado",
            "Hegemonía temporal",
            "Resistencia a Esparta",
          ],
        },
        {
          id: "persia",
          name: "Imperio Persa",
          title: "Gran Rey",
          period: "550 - 330 a.C.",
          description: "Enemigo común de los griegos",
          level: 1,
          position: { x: 90, y: 50 },
          color: "bg-orange-600",
          achievements: [
            "Imperio más grande",
            "Tolerancia religiosa",
            "Administración eficiente",
          ],
        },
      ],
      connections: [
        {
          from: "athens",
          to: "sparta",
          type: "alliance",
          label: "Alianza temporal",
        },
        {
          from: "athens",
          to: "corinth",
          type: "rivalry",
          label: "Rivalidad comercial",
        },
        {
          from: "sparta",
          to: "corinth",
          type: "alliance",
          label: "Liga del Peloponeso",
        },
        { from: "thebes", to: "sparta", type: "conflict", label: "Conflicto" },
        { from: "athens", to: "persia", type: "war", label: "Guerras Médicas" },
        { from: "sparta", to: "persia", type: "war", label: "Guerras Médicas" },
      ],
      significance:
        "Definió el equilibrio de poder en el mundo griego y estableció patrones de alianza que duraron siglos.",
      keyEvents: [
        "Revuelta Jónica (499 a.C.)",
        "Batalla de Maratón (490 a.C.)",
        "Batalla de las Termópilas (480 a.C.)",
        "Batalla de Salamina (480 a.C.)",
        "Formación Liga de Delos (478 a.C.)",
        "Paz de Calias (449 a.C.)",
      ],
      modernRelevance:
        "Ejemplo temprano de alianzas defensivas y equilibrio de poder internacional.",
    },
    {
      id: 3,
      title: "Panteón Olímpico Griego",
      category: "mythology",
      period: "800 a.C. - 400 d.C.",
      description:
        "Relaciones familiares y jerárquicas entre los dioses griegos.",
      type: "mythological",
      nodes: [
        {
          id: "zeus",
          name: "Zeus",
          title: "Rey de los Dioses",
          period: "Eterno",
          description: "Señor del cielo y el trueno",
          level: 1,
          position: { x: 50, y: 10 },
          color: "bg-yellow-600",
          achievements: [
            "Derrotó a los Titanes",
            "Estableció el orden olímpico",
            "Padre de muchos dioses",
          ],
        },
        {
          id: "hera",
          name: "Hera",
          title: "Reina de los Dioses",
          period: "Eterno",
          description: "Diosa del matrimonio",
          level: 1,
          position: { x: 70, y: 10 },
          color: "bg-purple-600",
          achievements: [
            "Protectora del matrimonio",
            "Reina del Olimpo",
            "Madre de dioses",
          ],
        },
        {
          id: "athena",
          name: "Atenea",
          title: "Diosa de la Sabiduría",
          period: "Eterno",
          description: "Nacida de la cabeza de Zeus",
          level: 2,
          position: { x: 30, y: 30 },
          color: "bg-blue-600",
          achievements: [
            "Patrona de Atenas",
            "Inventora del olivo",
            "Diosa de la guerra estratégica",
          ],
        },
        {
          id: "apollo",
          name: "Apolo",
          title: "Dios de la Música",
          period: "Eterno",
          description: "Hijo de Zeus y Leto",
          level: 2,
          position: { x: 50, y: 30 },
          color: "bg-orange-600",
          achievements: [
            "Dios de la profecía",
            "Patrono de las artes",
            "Oráculo de Delfos",
          ],
        },
        {
          id: "artemis",
          name: "Artemisa",
          title: "Diosa de la Caza",
          period: "Eterno",
          description: "Hermana gemela de Apolo",
          level: 2,
          position: { x: 70, y: 30 },
          color: "bg-green-600",
          achievements: [
            "Protectora de la naturaleza",
            "Diosa virgen",
            "Cazadora divina",
          ],
        },
        {
          id: "ares",
          name: "Ares",
          title: "Dios de la Guerra",
          period: "Eterno",
          description: "Hijo de Zeus y Hera",
          level: 2,
          position: { x: 90, y: 30 },
          color: "bg-red-600",
          achievements: [
            "Dios de la guerra brutal",
            "Amante de Afrodita",
            "Padre de Amazon",
          ],
        },
      ],
      connections: [
        { from: "zeus", to: "hera", type: "marriage", label: "Matrimonio" },
        { from: "zeus", to: "athena", type: "birth", label: "Padre" },
        { from: "zeus", to: "apollo", type: "birth", label: "Padre" },
        { from: "zeus", to: "artemis", type: "birth", label: "Padre" },
        { from: "zeus", to: "ares", type: "birth", label: "Padre" },
        { from: "hera", to: "ares", type: "birth", label: "Madre" },
        { from: "apollo", to: "artemis", type: "sibling", label: "Gemelos" },
      ],
      significance:
        "Estructura fundamental de la religión griega que influyó en toda la cultura occidental.",
      keyEvents: [
        "Titanomaquia (Guerra contra Titanes)",
        "Nacimiento de Atenea",
        "Establecimiento del Olimpo",
        "División de dominios divinos",
        "Creación de la humanidad",
        "Juicio de Paris",
      ],
      modernRelevance:
        "Base de la mitología occidental y fuente de inspiración artística y literaria.",
    },
    {
      id: 4,
      title: "Sucesión de Alejandro Magno",
      category: "successions",
      period: "323 - 281 a.C.",
      description:
        "División del imperio de Alejandro entre sus generales (Diádocos).",
      type: "political",
      nodes: [
        {
          id: "alexander",
          name: "Alejandro Magno",
          title: "Rey de Macedonia",
          period: "336 - 323 a.C.",
          description: "Conquistador del mundo conocido",
          level: 1,
          position: { x: 50, y: 10 },
          color: "bg-gold-600",
          achievements: [
            "Conquistó Persia",
            "Fundó Alejandría",
            "Difundió cultura helenística",
          ],
        },
        {
          id: "ptolemy",
          name: "Ptolomeo I",
          title: "Rey de Egipto",
          period: "323 - 283 a.C.",
          description: "Fundador de la dinastía ptolemaica",
          level: 2,
          position: { x: 20, y: 40 },
          color: "bg-yellow-600",
          achievements: [
            "Reino de Egipto",
            "Biblioteca de Alejandría",
            "Dinastía duradera",
          ],
        },
        {
          id: "seleucus",
          name: "Seleuco I",
          title: "Rey de Siria",
          period: "323 - 281 a.C.",
          description: "Fundador del Imperio Seléucida",
          level: 2,
          position: { x: 50, y: 40 },
          color: "bg-blue-600",
          achievements: [
            "Imperio más grande",
            "Fusión cultural",
            "Ciudades helenísticas",
          ],
        },
        {
          id: "antigonus",
          name: "Antígono I",
          title: "Rey de Macedonia",
          period: "323 - 301 a.C.",
          description: "Intentó reunificar el imperio",
          level: 2,
          position: { x: 80, y: 40 },
          color: "bg-purple-600",
          achievements: [
            "Control de Macedonia",
            "Ambiciones imperiales",
            "Conflictos constantes",
          ],
        },
        {
          id: "cassander",
          name: "Casandro",
          title: "Rey de Macedonia",
          period: "305 - 297 a.C.",
          description: "Rival de Antígono",
          level: 2,
          position: { x: 35, y: 60 },
          color: "bg-green-600",
          achievements: [
            "Fundó Tesalónica",
            "Controló Grecia",
            "Eliminó familia real",
          ],
        },
        {
          id: "lysimachus",
          name: "Lisímaco",
          title: "Rey de Tracia",
          period: "323 - 281 a.C.",
          description: "Controlaba los Dardanelos",
          level: 2,
          position: { x: 65, y: 60 },
          color: "bg-indigo-600",
          achievements: [
            "Reino de Tracia",
            "Control estratégico",
            "Alianzas cambiantes",
          ],
        },
      ],
      connections: [
        {
          from: "alexander",
          to: "ptolemy",
          type: "succession",
          label: "Herencia",
        },
        {
          from: "alexander",
          to: "seleucus",
          type: "succession",
          label: "Herencia",
        },
        {
          from: "alexander",
          to: "antigonus",
          type: "succession",
          label: "Herencia",
        },
        {
          from: "alexander",
          to: "cassander",
          type: "succession",
          label: "Herencia",
        },
        {
          from: "alexander",
          to: "lysimachus",
          type: "succession",
          label: "Herencia",
        },
        {
          from: "antigonus",
          to: "cassander",
          type: "conflict",
          label: "Guerra",
        },
        {
          from: "ptolemy",
          to: "seleucus",
          type: "alliance",
          label: "Alianza temporal",
        },
        {
          from: "seleucus",
          to: "lysimachus",
          type: "conflict",
          label: "Batalla de Corupedion",
        },
      ],
      significance:
        "Creó los reinos helenísticos que dominaron el Mediterráneo oriental durante siglos.",
      keyEvents: [
        "Muerte de Alejandro (323 a.C.)",
        "Conferencia de Babilonia (323 a.C.)",
        "Primera Guerra de los Diádocos (322-320 a.C.)",
        "Batalla de Ipso (301 a.C.)",
        "Batalla de Corupedion (281 a.C.)",
        "Estabilización de reinos (280 a.C.)",
      ],
      modernRelevance:
        "Ejemplo de cómo los grandes imperios se fragmentan tras la muerte de líderes carismáticos.",
    },
    {
      id: 5,
      title: "Migraciones de los Pueblos del Mar",
      category: "migrations",
      period: "1200 - 1150 a.C.",
      description:
        "Movimientos masivos de pueblos que causaron el colapso de la Edad del Bronce.",
      type: "migration",
      nodes: [
        {
          id: "egypt",
          name: "Egipto",
          title: "Reino Resistente",
          period: "1550 - 1077 a.C.",
          description: "Resistió las invasiones",
          level: 1,
          position: { x: 80, y: 60 },
          color: "bg-yellow-600",
          achievements: [
            "Resistió invasiones",
            "Registros históricos",
            "Continuidad cultural",
          ],
        },
        {
          id: "hittites",
          name: "Imperio Hitita",
          title: "Reino Destruido",
          period: "1650 - 1180 a.C.",
          description: "Colapsó ante las invasiones",
          level: 1,
          position: { x: 50, y: 30 },
          color: "bg-red-600",
          achievements: [
            "Gran potencia",
            "Tratados internacionales",
            "Colapso súbito",
          ],
        },
        {
          id: "mycenae",
          name: "Micenas",
          title: "Civilización Griega",
          period: "1600 - 1100 a.C.",
          description: "Civilización griega temprana",
          level: 1,
          position: { x: 30, y: 40 },
          color: "bg-blue-600",
          achievements: [
            "Palacios fortificados",
            "Escritura Lineal B",
            "Cultura guerrera",
          ],
        },
        {
          id: "sea_peoples",
          name: "Pueblos del Mar",
          title: "Invasores Misteriosos",
          period: "1200 - 1150 a.C.",
          description: "Coalición de pueblos invasores",
          level: 2,
          position: { x: 50, y: 10 },
          color: "bg-gray-600",
          achievements: [
            "Destrucción masiva",
            "Cambio de era",
            "Identidad misteriosa",
          ],
        },
        {
          id: "philistines",
          name: "Filisteos",
          title: "Pueblo Asentado",
          period: "1175 - 604 a.C.",
          description: "Se establecieron en Palestina",
          level: 3,
          position: { x: 70, y: 80 },
          color: "bg-green-600",
          achievements: [
            "Ciudades-estado",
            "Tecnología del hierro",
            "Cultura distintiva",
          ],
        },
      ],
      connections: [
        {
          from: "sea_peoples",
          to: "hittites",
          type: "destruction",
          label: "Destrucción",
        },
        {
          from: "sea_peoples",
          to: "mycenae",
          type: "destruction",
          label: "Colapso",
        },
        {
          from: "sea_peoples",
          to: "egypt",
          type: "attack",
          label: "Invasión repelida",
        },
        {
          from: "sea_peoples",
          to: "philistines",
          type: "settlement",
          label: "Asentamiento",
        },
        {
          from: "egypt",
          to: "philistines",
          type: "conflict",
          label: "Conflictos posteriores",
        },
      ],
      significance:
        "Marcó el fin de la Edad del Bronce y el inicio de la Edad del Hierro en el Mediterráneo.",
      keyEvents: [
        "Destrucción de Hattusa (1180 a.C.)",
        "Colapso de Micenas (1180 a.C.)",
        "Batalla del Delta del Nilo (1175 a.C.)",
        "Asentamiento filisteo (1175 a.C.)",
        "Fin de la Edad del Bronce (1150 a.C.)",
        "Inicio Edad Oscura griega (1100 a.C.)",
      ],
      modernRelevance:
        "Ejemplo de cómo las migraciones masivas pueden transformar civilizaciones enteras.",
    },
  ];

  const filteredConnections = connections.filter((connection) => {
    const matchesSearch =
      searchTerm === "" ||
      connection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || connection.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getConnectionTypeColor = (type) => {
    switch (type) {
      case "marriage":
        return "stroke-pink-500";
      case "birth":
        return "stroke-blue-500";
      case "adoption":
        return "stroke-green-500";
      case "succession":
        return "stroke-purple-500";
      case "alliance":
        return "stroke-blue-600";
      case "conflict":
        return "stroke-red-500";
      case "war":
        return "stroke-red-600";
      case "rivalry":
        return "stroke-orange-500";
      case "sibling":
        return "stroke-indigo-500";
      case "destruction":
        return "stroke-red-700";
      case "attack":
        return "stroke-red-400";
      case "settlement":
        return "stroke-green-600";
      default:
        return "stroke-stone-400";
    }
  };

  const renderConnectionDiagram = (connection) => {
    return (
      <div
        className="bg-stone-50 rounded-lg p-6 border border-stone-200 relative overflow-hidden"
        style={{ minHeight: "400px" }}
      >
        <svg width="100%" height="400" className="absolute inset-0">
          {/* Render connections first (behind nodes) */}
          {connection.connections.map((conn, index) => {
            const fromNode = connection.nodes.find((n) => n.id === conn.from);
            const toNode = connection.nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const fromX = (fromNode.position.x / 100) * 100 + "%";
            const fromY = (fromNode.position.y / 100) * 400;
            const toX = (toNode.position.x / 100) * 100 + "%";
            const toY = (toNode.position.y / 100) * 400;

            return (
              <g key={index}>
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  className={`${getConnectionTypeColor(conn.type)} stroke-2`}
                  strokeDasharray={
                    conn.type === "conflict" || conn.type === "war"
                      ? "5,5"
                      : "0"
                  }
                />
                <text
                  x={`${(fromNode.position.x + toNode.position.x) / 2}%`}
                  y={(fromY + toY) / 2}
                  className="text-xs fill-stone-600"
                  textAnchor="middle"
                  dy="-5"
                >
                  {conn.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Render nodes */}
        {connection.nodes.map((node, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
            }}
          >
            <div
              className={`${node.color} text-white p-3 rounded-lg shadow-lg min-w-32 text-center cursor-pointer hover:shadow-xl transition-all`}
            >
              <div className="font-bold text-sm">{node.name}</div>
              <div className="text-xs opacity-90">{node.title}</div>
              <div className="text-xs opacity-75">{node.period}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Conexiones Históricas
            </h3>
            <p className="text-stone-600">
              Explora las relaciones, dinastías, alianzas y redes que conectaron
              el mundo antiguo
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Network className="text-amber-600" size={32} />
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
              placeholder="Buscar conexiones históricas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-medium mb-2">
              Tipo de Conexión
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
        </div>
      </div>

      {/* Connections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredConnections.map((connection) => {
          const categoryObj = categories.find(
            (cat) => cat.id === connection.category
          );
          const IconComponent = categoryObj ? categoryObj.icon : Network;

          return (
            <div
              key={connection.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 border-b border-amber-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`${
                        categoryObj?.color || "bg-stone-500"
                      } p-2 rounded-lg`}
                    >
                      <IconComponent size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-stone-800">
                        {connection.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-stone-600">
                        <Calendar size={14} />
                        <span>{connection.period}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedConnection(connection)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>Ver Detalles</span>
                  </button>
                </div>

                <p className="text-stone-600 text-sm mb-4">
                  {connection.description}
                </p>

                <div className="flex items-center justify-between text-sm text-stone-500">
                  <span>{connection.nodes.length} elementos conectados</span>
                  <span className="capitalize">{connection.type}</span>
                </div>
              </div>

              {/* Mini diagram preview */}
              <div className="p-4">{renderConnectionDiagram(connection)}</div>
            </div>
          );
        })}
      </div>

      {/* Connection Detail Modal */}
      {selectedConnection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-stone-800">
                    {selectedConnection.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-stone-500" />
                      <span className="text-stone-600">
                        {selectedConnection.period}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GitBranch size={16} className="text-stone-500" />
                      <span className="text-stone-600 capitalize">
                        {selectedConnection.type}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConnection(null)}
                  className="text-stone-500 hover:text-stone-700 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Description */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Descripción
                </h4>
                <p className="text-stone-700 leading-relaxed">
                  {selectedConnection.description}
                </p>
              </div>

              {/* Interactive Diagram */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Diagrama de Conexiones
                </h4>
                <div style={{ minHeight: "500px" }}>
                  {renderConnectionDiagram(selectedConnection)}
                </div>
              </div>

              {/* Detailed Nodes Information */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Elementos Conectados
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedConnection.nodes.map((node, index) => (
                    <div
                      key={index}
                      className="p-4 bg-stone-50 rounded-lg border border-stone-200"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`${node.color} w-4 h-4 rounded-full`}
                        ></div>
                        <div>
                          <h5 className="font-bold text-stone-800">
                            {node.name}
                          </h5>
                          <p className="text-stone-600 text-sm">{node.title}</p>
                        </div>
                      </div>
                      <p className="text-stone-600 text-sm mb-2">
                        {node.period}
                      </p>
                      <p className="text-stone-700 text-sm mb-3">
                        {node.description}
                      </p>
                      {node.achievements && (
                        <div>
                          <h6 className="font-semibold text-stone-800 text-sm mb-1">
                            Logros:
                          </h6>
                          <ul className="text-stone-600 text-xs space-y-1">
                            {node.achievements.map((achievement, achIndex) => (
                              <li
                                key={achIndex}
                                className="flex items-start space-x-1"
                              >
                                <Star
                                  size={10}
                                  className="text-amber-500 mt-1"
                                />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Events */}
              <div>
                <h4 className="text-xl font-bold text-stone-800 mb-4">
                  Eventos Clave
                </h4>
                <div className="space-y-3">
                  {selectedConnection.keyEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <Zap className="text-blue-600 mt-1" size={16} />
                      <span className="text-stone-700">{event}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Significance and Modern Relevance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-stone-800 mb-4">
                    Importancia Histórica
                  </h4>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <p className="text-stone-700 leading-relaxed">
                      {selectedConnection.significance}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-stone-800 mb-4">
                    Relevancia Moderna
                  </h4>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-stone-700 leading-relaxed">
                      {selectedConnection.modernRelevance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h3 className="text-xl font-bold text-stone-800 mb-4">
          Estadísticas de Conexiones
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {filteredConnections.length}
            </div>
            <div className="text-stone-600 text-sm">Conexiones Mostradas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {connections.filter((c) => c.category === "dynasties").length}
            </div>
            <div className="text-stone-600 text-sm">Dinastías</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {connections.filter((c) => c.category === "alliances").length}
            </div>
            <div className="text-stone-600 text-sm">Alianzas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {connections.filter((c) => c.category === "wars").length}
            </div>
            <div className="text-stone-600 text-sm">Conflictos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalConnections;
