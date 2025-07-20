/**
 * Timeline Game Data
 * Datos de eventos históricos para el juego de línea de tiempo
 * @created 2024-12-19
 */

import { HISTORICAL_PERIODS } from "./timeline-constants.js";

// Eventos de la Antigüedad
export const ANCIENT_EVENTS = [
  {
    id: "ancient_1",
    title: "Fundación de Roma",
    year: -753,
    description:
      "Según la tradición, Rómulo funda la ciudad de Roma a orillas del Tíber",
    period: "Reino Romano",
    historicalPeriod: HISTORICAL_PERIODS.ANCIENT,
    icon: "🏛️",
  },
  {
    id: "ancient_2",
    title: "Batalla de Maratón",
    year: -490,
    description: "Victoria ateniense sobre los persas en las Guerras Médicas",
    period: "Grecia Clásica",
    historicalPeriod: HISTORICAL_PERIODS.CLASSICAL,
    icon: "⚔️",
  },
  {
    id: "ancient_3",
    title: "Muerte de Alejandro Magno",
    year: -323,
    description: "Fin del imperio macedonio y inicio del período helenístico",
    period: "Período Helenístico",
    historicalPeriod: HISTORICAL_PERIODS.CLASSICAL,
    icon: "👑",
  },
  {
    id: "ancient_4",
    title: "Asesinato de Julio César",
    year: -44,
    description: "César es asesinado en los Idus de Marzo en el Senado Romano",
    period: "República Romana",
    historicalPeriod: HISTORICAL_PERIODS.CLASSICAL,
    icon: "🗡️",
  },
  {
    id: "ancient_5",
    title: "Nacimiento de Jesucristo",
    year: 0,
    description: "Inicio de la era cristiana según el calendario occidental",
    period: "Imperio Romano",
    historicalPeriod: HISTORICAL_PERIODS.CLASSICAL,
    icon: "✝️",
  },
  {
    id: "ancient_6",
    title: "Destrucción de Jerusalén",
    year: 70,
    description:
      "Las legiones romanas destruyen el Segundo Templo de Jerusalén",
    period: "Imperio Romano",
    historicalPeriod: HISTORICAL_PERIODS.CLASSICAL,
    icon: "🔥",
  },
  {
    id: "ancient_7",
    title: "Edicto de Milán",
    year: 313,
    description:
      "Constantino proclama la libertad religiosa en el Imperio Romano",
    period: "Imperio Romano",
    historicalPeriod: HISTORICAL_PERIODS.CLASSICAL,
    icon: "📜",
  },
  {
    id: "ancient_8",
    title: "Caída del Imperio Romano de Occidente",
    year: 476,
    description:
      "Odoacro depone a Rómulo Augústulo, último emperador de Occidente",
    period: "Caída de Roma",
    historicalPeriod: HISTORICAL_PERIODS.ANCIENT,
    icon: "⬇️",
  },
];

// Eventos Medievales
export const MEDIEVAL_EVENTS = [
  {
    id: "medieval_1",
    title: "Coronación de Carlomagno",
    year: 800,
    description: "Carlomagno es coronado emperador por el Papa León III",
    period: "Imperio Carolingio",
    historicalPeriod: HISTORICAL_PERIODS.MEDIEVAL,
    icon: "👑",
  },
  {
    id: "medieval_2",
    title: "Batalla de Hastings",
    year: 1066,
    description:
      "Guillermo el Conquistador derrota a los sajones en Inglaterra",
    period: "Conquista Normanda",
    historicalPeriod: HISTORICAL_PERIODS.MEDIEVAL,
    icon: "⚔️",
  },
  {
    id: "medieval_3",
    title: "Primera Cruzada",
    year: 1095,
    description:
      "El Papa Urbano II convoca la primera expedición a Tierra Santa",
    period: "Cruzadas",
    historicalPeriod: HISTORICAL_PERIODS.MEDIEVAL,
    icon: "🛡️",
  },
  {
    id: "medieval_4",
    title: "Magna Carta",
    year: 1215,
    description:
      "Los barones ingleses limitan el poder del rey Juan Sin Tierra",
    period: "Inglaterra Medieval",
    historicalPeriod: HISTORICAL_PERIODS.MEDIEVAL,
    icon: "📋",
  },
  {
    id: "medieval_5",
    title: "Caída de Constantinopla",
    year: 1453,
    description:
      "Los otomanos conquistan el último bastión del Imperio Bizantino",
    period: "Fin del Mundo Medieval",
    historicalPeriod: HISTORICAL_PERIODS.MEDIEVAL,
    icon: "🏰",
  },
];

// Eventos del Renacimiento
export const RENAISSANCE_EVENTS = [
  {
    id: "renaissance_1",
    title: "Descubrimiento de América",
    year: 1492,
    description: "Cristóbal Colón llega al continente americano",
    period: "Era de los Descubrimientos",
    historicalPeriod: HISTORICAL_PERIODS.RENAISSANCE,
    icon: "🌎",
  },
  {
    id: "renaissance_2",
    title: "Las 95 Tesis de Lutero",
    year: 1517,
    description: "Martín Lutero inicia la Reforma Protestante",
    period: "Reforma Religiosa",
    historicalPeriod: HISTORICAL_PERIODS.RENAISSANCE,
    icon: "📿",
  },
  {
    id: "renaissance_3",
    title: "Conquista del Imperio Azteca",
    year: 1521,
    description: "Hernán Cortés conquista Tenochtitlán",
    period: "Conquista Española",
    historicalPeriod: HISTORICAL_PERIODS.RENAISSANCE,
    icon: "⚔️",
  },
  {
    id: "renaissance_4",
    title: "Batalla de Lepanto",
    year: 1571,
    description: "La Liga Santa derrota a la flota otomana",
    period: "Conflictos Mediterráneos",
    historicalPeriod: HISTORICAL_PERIODS.RENAISSANCE,
    icon: "⛵",
  },
];

// Eventos Modernos
export const MODERN_EVENTS = [
  {
    id: "modern_1",
    title: "Revolución Francesa",
    year: 1789,
    description: "Inicio de la revolución que cambió Francia y Europa",
    period: "Era Revolucionaria",
    historicalPeriod: HISTORICAL_PERIODS.MODERN,
    icon: "🇫🇷",
  },
  {
    id: "modern_2",
    title: "Independencia de Estados Unidos",
    year: 1776,
    description: "Las 13 colonias declaran su independencia de Gran Bretaña",
    period: "Revolución Americana",
    historicalPeriod: HISTORICAL_PERIODS.MODERN,
    icon: "🇺🇸",
  },
  {
    id: "modern_3",
    title: "Batalla de Waterloo",
    year: 1815,
    description: "Derrota final de Napoleón Bonaparte",
    period: "Guerras Napoleónicas",
    historicalPeriod: HISTORICAL_PERIODS.MODERN,
    icon: "⚔️",
  },
  {
    id: "modern_4",
    title: "Unificación de Alemania",
    year: 1871,
    description: "Proclamación del Segundo Reich alemán en Versalles",
    period: "Unificación Nacional",
    historicalPeriod: HISTORICAL_PERIODS.MODERN,
    icon: "🇩🇪",
  },
];

// Eventos Contemporáneos
export const CONTEMPORARY_EVENTS = [
  {
    id: "contemporary_1",
    title: "Primera Guerra Mundial",
    year: 1914,
    description: "Inicio del primer conflicto mundial de la historia",
    period: "Gran Guerra",
    historicalPeriod: HISTORICAL_PERIODS.CONTEMPORARY,
    icon: "💥",
  },
  {
    id: "contemporary_2",
    title: "Revolución Rusa",
    year: 1917,
    description: "Los bolcheviques toman el poder en Rusia",
    period: "Revolución Socialista",
    historicalPeriod: HISTORICAL_PERIODS.CONTEMPORARY,
    icon: "🔴",
  },
  {
    id: "contemporary_3",
    title: "Segunda Guerra Mundial",
    year: 1939,
    description: "Alemania invade Polonia, iniciando la Segunda Guerra Mundial",
    period: "Guerra Total",
    historicalPeriod: HISTORICAL_PERIODS.CONTEMPORARY,
    icon: "🌍",
  },
  {
    id: "contemporary_4",
    title: "Llegada del Hombre a la Luna",
    year: 1969,
    description: "Neil Armstrong y Buzz Aldrin caminan en la superficie lunar",
    period: "Era Espacial",
    historicalPeriod: HISTORICAL_PERIODS.CONTEMPORARY,
    icon: "🚀",
  },
  {
    id: "contemporary_5",
    title: "Caída del Muro de Berlín",
    year: 1989,
    description: "Símbolo del fin de la Guerra Fría",
    period: "Fin de la Guerra Fría",
    historicalPeriod: HISTORICAL_PERIODS.CONTEMPORARY,
    icon: "🧱",
  },
];

// Todos los eventos organizados por período
export const EVENTS_BY_PERIOD = {
  [HISTORICAL_PERIODS.ANCIENT]: ANCIENT_EVENTS,
  [HISTORICAL_PERIODS.CLASSICAL]: [
    ...ANCIENT_EVENTS.filter(
      (e) => e.historicalPeriod === HISTORICAL_PERIODS.CLASSICAL
    ),
  ],
  [HISTORICAL_PERIODS.MEDIEVAL]: MEDIEVAL_EVENTS,
  [HISTORICAL_PERIODS.RENAISSANCE]: RENAISSANCE_EVENTS,
  [HISTORICAL_PERIODS.MODERN]: MODERN_EVENTS,
  [HISTORICAL_PERIODS.CONTEMPORARY]: CONTEMPORARY_EVENTS,
  [HISTORICAL_PERIODS.MIXED]: [
    ...ANCIENT_EVENTS,
    ...MEDIEVAL_EVENTS,
    ...RENAISSANCE_EVENTS,
    ...MODERN_EVENTS,
    ...CONTEMPORARY_EVENTS,
  ],
};

// Todos los eventos en un array
export const ALL_TIMELINE_EVENTS = [
  ...ANCIENT_EVENTS,
  ...MEDIEVAL_EVENTS,
  ...RENAISSANCE_EVENTS,
  ...MODERN_EVENTS,
  ...CONTEMPORARY_EVENTS,
];

// Función para obtener eventos aleatorios
export const getRandomEvents = (
  count = 5,
  period = HISTORICAL_PERIODS.MIXED
) => {
  const eventsPool = EVENTS_BY_PERIOD[period] || ALL_TIMELINE_EVENTS;
  const shuffled = [...eventsPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Función para obtener eventos de un período específico
export const getEventsByPeriod = (
  period = HISTORICAL_PERIODS.MIXED,
  count = 5
) => {
  const events = EVENTS_BY_PERIOD[period] || [];
  if (count >= events.length) return events;

  const shuffled = [...events].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Función para obtener eventos balanceados por período
export const getBalancedEvents = (count = 5) => {
  const periodsToInclude = [
    HISTORICAL_PERIODS.ANCIENT,
    HISTORICAL_PERIODS.MEDIEVAL,
    HISTORICAL_PERIODS.RENAISSANCE,
    HISTORICAL_PERIODS.MODERN,
    HISTORICAL_PERIODS.CONTEMPORARY,
  ];

  const eventsPerPeriod = Math.ceil(count / periodsToInclude.length);
  const selectedEvents = [];

  periodsToInclude.forEach((period) => {
    const periodEvents = EVENTS_BY_PERIOD[period] || [];
    const shuffled = [...periodEvents].sort(() => Math.random() - 0.5);
    selectedEvents.push(...shuffled.slice(0, eventsPerPeriod));
  });

  // Mezclar y tomar solo la cantidad solicitada
  const finalEvents = selectedEvents.sort(() => Math.random() - 0.5);
  return finalEvents.slice(0, count);
};

// Eventos por defecto para inicio rápido
export const DEFAULT_TIMELINE_EVENTS = [
  ANCIENT_EVENTS[0], // Fundación de Roma (-753)
  ANCIENT_EVENTS[1], // Batalla de Maratón (-490)
  ANCIENT_EVENTS[3], // Asesinato de Julio César (-44)
  MEDIEVAL_EVENTS[0], // Coronación de Carlomagno (800)
  RENAISSANCE_EVENTS[0], // Descubrimiento de América (1492)
];
