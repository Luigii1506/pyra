/**
 * Daily Historical Content Database
 * Base de datos de contenido histórico organizado por fechas
 * @created 2024-12-19
 */

import { CONTENT_TYPES } from "./daily-constants.js";

// Base de datos principal de contenido histórico por fecha
export const HISTORICAL_CONTENT = {
  // Enero
  1: {
    // 1 de enero
    1: [
      {
        id: "birth_jan_1_49bc",
        type: CONTENT_TYPES.BIRTH,
        year: 49,
        title: "Nace Ovidio",
        name: "Publio Ovidio Nasón",
        description:
          "Poeta romano, autor de Las Metamorfosis, una de las obras más influyentes de la literatura clásica.",
        period: "Imperio Romano",
        importance:
          "Su obra influyó en toda la literatura occidental posterior.",
        keyFacts: [
          "Escribió Las Metamorfosis",
          "Fue exiliado por Augusto",
          "Influyó en Dante y Shakespeare",
        ],
      },
      {
        id: "foundation_jan_1_1801",
        type: CONTENT_TYPES.FOUNDATION,
        year: 1801,
        title: "Se funda el Reino Unido de Gran Bretaña e Irlanda",
        description:
          "Unión política entre Gran Bretaña e Irlanda bajo un solo parlamento.",
        period: "Era Moderna",
        importance: "Consolidó el poder británico en Europa.",
        keyFacts: [
          "Duró hasta 1922",
          "Unificó los parlamentos",
          "Fortaleció el Imperio Británico",
        ],
      },
    ],
    2: [
      {
        id: "event_jan_2_1492",
        type: CONTENT_TYPES.EVENT,
        year: 1492,
        title: "Caída de Granada",
        description:
          "Los Reyes Católicos conquistan el último reino musulmán en la Península Ibérica.",
        period: "Reconquista",
        importance: "Marca el fin de la presencia musulmana en España.",
        keyFacts: [
          "Fin de la Reconquista",
          "Boabdil entrega las llaves",
          "Unificación de España",
        ],
      },
    ],
  },

  // Febrero
  2: {
    14: [
      {
        id: "death_feb_14_1779",
        type: CONTENT_TYPES.DEATH,
        year: 1779,
        title: "Muere James Cook",
        name: "Capitán James Cook",
        description:
          "Explorador británico que realizó tres viajes al Pacífico, cartografiando muchas áreas.",
        period: "Era de los Descubrimientos",
        importance:
          "Sus expediciones ampliaron el conocimiento geográfico del mundo.",
        keyFacts: [
          "Descubrió Australia oriental",
          "Cartografió Nueva Zelanda",
          "Murió en Hawái",
        ],
      },
    ],
  },

  // Marzo
  3: {
    15: [
      {
        id: "death_mar_15_44bc",
        type: CONTENT_TYPES.DEATH,
        year: -44,
        title: "Asesinato de Julio César",
        name: "Cayo Julio César",
        description:
          "Dictador romano asesinado en los Idus de Marzo por una conspiración del Senado.",
        period: "República Romana",
        importance: "Su muerte marcó el fin de la República Romana.",
        keyFacts: [
          "Asesinado por Bruto y Casio",
          "En el Teatro de Pompeyo",
          "Provocó guerras civiles",
        ],
      },
    ],
  },

  // Abril
  4: {
    21: [
      {
        id: "birth_apr_21_753bc",
        type: CONTENT_TYPES.FOUNDATION,
        year: -753,
        title: "Fundación de Roma",
        description:
          "Según la tradición, Rómulo funda la ciudad de Roma en las colinas del Tíber.",
        period: "Reino Romano",
        importance: "Inicio de una de las civilizaciones más influyentes.",
        keyFacts: [
          "Fundada por Rómulo",
          "En siete colinas",
          "Inicio del calendario romano",
        ],
      },
    ],
  },

  // Mayo
  5: {
    5: [
      {
        id: "death_may_5_1821",
        type: CONTENT_TYPES.DEATH,
        year: 1821,
        title: "Muere Napoleón Bonaparte",
        name: "Napoleón I",
        description:
          "Emperador francés que conquistó gran parte de Europa antes de ser exiliado.",
        period: "Imperio Napoleónico",
        importance: "Transformó Europa y el derecho moderno.",
        keyFacts: [
          "Murió en Santa Elena",
          "Creó el Código Napoleónico",
          "Conquistó gran parte de Europa",
        ],
      },
    ],
  },

  // Junio
  6: {
    28: [
      {
        id: "event_jun_28_1914",
        type: CONTENT_TYPES.EVENT,
        year: 1914,
        title: "Asesinato del Archiduque Francisco Fernando",
        description:
          "El heredero austro-húngaro es asesinado en Sarajevo, desencadenando la Primera Guerra Mundial.",
        period: "Siglo XX",
        importance: "Evento que desencadenó la Primera Guerra Mundial.",
        keyFacts: [
          "Asesinado por Gavrilo Princip",
          "En Sarajevo",
          "Causó la Gran Guerra",
        ],
      },
    ],
  },

  // Julio
  7: {
    20: [
      {
        id: "event_jul_20_1969",
        type: CONTENT_TYPES.EVENT,
        year: 1969,
        title: "El hombre llega a la Luna",
        description:
          "Neil Armstrong se convierte en el primer ser humano en pisar la superficie lunar.",
        period: "Era Espacial",
        importance: "Hito de la exploración espacial humana.",
        keyFacts: [
          "Misión Apollo 11",
          "Neil Armstrong y Buzz Aldrin",
          '"Un pequeño paso para el hombre"',
        ],
      },
    ],
    14: [
      {
        id: "event_jul_14_1789",
        type: CONTENT_TYPES.REVOLUTION,
        year: 1789,
        title: "Toma de la Bastilla",
        description:
          "El pueblo parisino asalta la fortaleza de la Bastilla, iniciando la Revolución Francesa.",
        period: "Revolución Francesa",
        importance: "Símbolo del inicio de la Revolución Francesa.",
        keyFacts: [
          "Prisión-fortaleza real",
          "Símbolo del absolutismo",
          "Día nacional de Francia",
        ],
      },
    ],
  },

  // Agosto
  8: {
    6: [
      {
        id: "event_aug_6_1945",
        type: CONTENT_TYPES.EVENT,
        year: 1945,
        title: "Bomba atómica en Hiroshima",
        description:
          "Estados Unidos lanza la primera bomba atómica sobre Hiroshima durante la Segunda Guerra Mundial.",
        period: "Segunda Guerra Mundial",
        importance:
          "Cambió la naturaleza de la guerra y las relaciones internacionales.",
        keyFacts: [
          'Bomba "Little Boy"',
          "Cerca de 80,000 muertos inmediatos",
          "Aceleró el fin de la guerra",
        ],
      },
    ],
  },

  // Septiembre
  9: {
    11: [
      {
        id: "event_sep_11_2001",
        type: CONTENT_TYPES.EVENT,
        year: 2001,
        title: "Atentados del 11 de septiembre",
        description:
          "Ataques terroristas contra Estados Unidos que cambiaron la política internacional.",
        period: "Siglo XXI",
        importance:
          "Redefinió la seguridad internacional y la lucha antiterrorista.",
        keyFacts: [
          "Torres Gemelas y Pentágono",
          "Cerca de 3,000 víctimas",
          "Guerra contra el terror",
        ],
      },
    ],
  },

  // Octubre
  10: {
    12: [
      {
        id: "discovery_oct_12_1492",
        type: CONTENT_TYPES.DISCOVERY,
        year: 1492,
        title: "Descubrimiento de América",
        description:
          "Cristóbal Colón llega a las Américas, conectando permanentemente ambos mundos.",
        period: "Era de los Descubrimientos",
        importance:
          "Cambió la historia mundial al conectar América con Europa.",
        keyFacts: [
          "Llegó a las Bahamas",
          "Pensaba haber llegado a Asia",
          "Inicio de la colonización",
        ],
      },
    ],
  },

  // Noviembre
  11: {
    9: [
      {
        id: "event_nov_9_1989",
        type: CONTENT_TYPES.EVENT,
        year: 1989,
        title: "Caída del Muro de Berlín",
        description:
          "La caída del muro simboliza el fin de la Guerra Fría y la división de Alemania.",
        period: "Guerra Fría",
        importance:
          "Símbolo del fin de la Guerra Fría y la reunificación alemana.",
        keyFacts: [
          "Construcción en 1961",
          "Separó familias 28 años",
          "Reunificación alemana",
        ],
      },
    ],
  },

  // Diciembre
  12: {
    7: [
      {
        id: "event_dec_7_1941",
        type: CONTENT_TYPES.BATTLE,
        year: 1941,
        title: "Ataque a Pearl Harbor",
        description:
          "Japón ataca la base naval estadounidense, llevando a EE.UU. a la Segunda Guerra Mundial.",
        period: "Segunda Guerra Mundial",
        importance: "Entrada de Estados Unidos en la Segunda Guerra Mundial.",
        keyFacts: [
          "Ataque sorpresa japonés",
          "Más de 2,400 muertos",
          '"Día que vivirá en la infamia"',
        ],
      },
    ],
    25: [
      {
        id: "birth_dec_25_4bc",
        type: CONTENT_TYPES.BIRTH,
        year: -4,
        title: "Nacimiento de Jesucristo",
        name: "Jesús de Nazaret",
        description:
          "Figura central del cristianismo, cuyas enseñanzas fundaron una de las religiones más influyentes.",
        period: "Era Cristiana",
        importance:
          "Fundó el cristianismo, religión que transformó el mundo occidental.",
        keyFacts: [
          "Nació en Belén",
          "Predicó por 3 años",
          "Crucificado por Pilato",
        ],
      },
    ],
  },
};

// Función para obtener contenido de una fecha específica
export const getContentForDate = (month, day) => {
  return HISTORICAL_CONTENT[month]?.[day] || [];
};

// Función para obtener contenido aleatorio del día
export const getTodayContent = (date = new Date()) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return getContentForDate(month, day);
};

// Función para obtener contenido de fechas cercanas
export const getNearbyContent = (month, day, range = 3) => {
  const content = [];
  const totalDaysInMonth = new Date(2024, month, 0).getDate();

  for (let i = -range; i <= range; i++) {
    let targetDay = day + i;
    let targetMonth = month;

    if (targetDay < 1) {
      targetMonth = month === 1 ? 12 : month - 1;
      targetDay = new Date(2024, targetMonth, 0).getDate() + targetDay;
    } else if (targetDay > totalDaysInMonth) {
      targetMonth = month === 12 ? 1 : month + 1;
      targetDay = targetDay - totalDaysInMonth;
    }

    const dayContent = getContentForDate(targetMonth, targetDay);
    content.push(...dayContent);
  }

  return content;
};

// Función para obtener contenido de un tipo específico
export const getContentByType = (type, limit = 10) => {
  const allContent = [];

  Object.keys(HISTORICAL_CONTENT).forEach((month) => {
    Object.keys(HISTORICAL_CONTENT[month]).forEach((day) => {
      const dayContent = HISTORICAL_CONTENT[month][day];
      const filteredContent = dayContent.filter((item) => item.type === type);
      allContent.push(...filteredContent);
    });
  });

  // Shuffle and limit
  const shuffled = allContent.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
};

// Función para buscar contenido por palabra clave
export const searchContent = (keyword) => {
  const results = [];
  const searchTerm = keyword.toLowerCase();

  Object.keys(HISTORICAL_CONTENT).forEach((month) => {
    Object.keys(HISTORICAL_CONTENT[month]).forEach((day) => {
      const dayContent = HISTORICAL_CONTENT[month][day];
      const matches = dayContent.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          (item.name && item.name.toLowerCase().includes(searchTerm))
      );
      results.push(...matches);
    });
  });

  return results;
};

// Contenido destacado por época
export const FEATURED_BY_PERIOD = {
  ancient: ["birth_jan_1_49bc", "death_mar_15_44bc", "foundation_apr_21_753bc"],
  medieval: ["event_jan_2_1492"],
  modern: ["death_may_5_1821", "event_jul_14_1789"],
  contemporary: ["event_jul_20_1969", "event_nov_9_1989", "event_sep_11_2001"],
};

// Exportar todo el contenido como array para búsquedas
export const ALL_CONTENT = (() => {
  const content = [];
  Object.keys(HISTORICAL_CONTENT).forEach((month) => {
    Object.keys(HISTORICAL_CONTENT[month]).forEach((day) => {
      content.push(...HISTORICAL_CONTENT[month][day]);
    });
  });
  return content;
})();
