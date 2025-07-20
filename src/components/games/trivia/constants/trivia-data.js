/**
 * Trivia Game Question Bank
 * Banco de preguntas para el juego de trivia histórica contrarreloj
 * @created 2024-12-19
 */

import {
  TRIVIA_CATEGORIES,
  DIFFICULTY_LEVELS,
  QUESTION_TYPES,
} from "./trivia-constants.js";

// Preguntas sobre Civilizaciones Antiguas
const ANCIENT_CIVILIZATIONS_QUESTIONS = {
  [DIFFICULTY_LEVELS.EASY]: [
    {
      id: "anc_civ_easy_1",
      category: TRIVIA_CATEGORIES.ANCIENT_CIVILIZATIONS,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Dónde se desarrolló la civilización mesopotámica?",
      options: [
        "En Egipto",
        "Entre los ríos Tigris y Éufrates",
        "En Grecia",
        "En Roma",
      ],
      correct: 1,
      explanation:
        "Mesopotamia se desarrolló entre los ríos Tigris y Éufrates, en el actual Irak, y es considerada la cuna de la civilización.",
    },
    {
      id: "anc_civ_easy_2",
      category: TRIVIA_CATEGORIES.ANCIENT_CIVILIZATIONS,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Cuál era la capital del Imperio Persa?",
      options: ["Babilonia", "Persépolis", "Tebas", "Cartago"],
      correct: 1,
      explanation:
        "Persépolis fue la capital ceremonial del Imperio Persa, construida por Darío I el Grande.",
    },
    {
      id: "anc_civ_easy_3",
      category: TRIVIA_CATEGORIES.ANCIENT_CIVILIZATIONS,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Qué civilización inventó la escritura cuneiforme?",
      options: ["Egipcios", "Griegos", "Sumerios", "Romanos"],
      correct: 2,
      explanation:
        "Los sumerios inventaron la escritura cuneiforme alrededor del 3200 a.C., una de las primeras formas de escritura.",
    },
  ],
  [DIFFICULTY_LEVELS.MEDIUM]: [
    {
      id: "anc_civ_med_1",
      category: TRIVIA_CATEGORIES.ANCIENT_CIVILIZATIONS,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Qué código de leyes fue establecido por Hammurabi?",
      options: [
        "Las XII Tablas",
        "El Código de Hammurabi",
        "La Ley de Talión",
        "Los Preceptos de Ptahhotep",
      ],
      correct: 1,
      explanation:
        'El Código de Hammurabi (c. 1750 a.C.) es uno de los primeros códigos legales conocidos, estableciendo el principio de "ojo por ojo".',
    },
    {
      id: "anc_civ_med_2",
      category: TRIVIA_CATEGORIES.ANCIENT_CIVILIZATIONS,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Cuál fue la primera civilización en usar monedas?",
      options: ["Fenicios", "Lidios", "Persas", "Asirios"],
      correct: 1,
      explanation:
        "Los lidios, en la actual Turquía, fueron los primeros en acuñar monedas de electro en el siglo VII a.C.",
    },
  ],
  [DIFFICULTY_LEVELS.HARD]: [
    {
      id: "anc_civ_hard_1",
      category: TRIVIA_CATEGORIES.ANCIENT_CIVILIZATIONS,
      difficulty: DIFFICULTY_LEVELS.HARD,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién fue el último rey neo-asirio?",
      options: ["Sargón II", "Senaquerib", "Asurbanipal", "Sin-shar-ishkun"],
      correct: 3,
      explanation:
        "Sin-shar-ishkun fue el último rey del Imperio Neo-Asirio, murió durante la caída de Nínive en 612 a.C.",
    },
  ],
};

// Preguntas sobre Imperio Romano
const ROMAN_EMPIRE_QUESTIONS = {
  [DIFFICULTY_LEVELS.EASY]: [
    {
      id: "roman_easy_1",
      category: TRIVIA_CATEGORIES.ROMAN_EMPIRE,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿En qué año cayó el Imperio Romano de Occidente?",
      options: ["410 d.C.", "455 d.C.", "476 d.C.", "493 d.C."],
      correct: 2,
      explanation:
        "El Imperio Romano de Occidente cayó en 476 d.C. cuando Odoacro depuso a Rómulo Augústulo.",
    },
    {
      id: "roman_easy_2",
      category: TRIVIA_CATEGORIES.ROMAN_EMPIRE,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién fue el primer emperador romano?",
      options: ["Julio César", "Augusto", "Nerón", "Trajano"],
      correct: 1,
      explanation:
        "Augusto (Octavio) fue el primer emperador romano, gobernando desde 27 a.C. hasta 14 d.C.",
    },
    {
      id: "roman_easy_3",
      category: TRIVIA_CATEGORIES.ROMAN_EMPIRE,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Cómo se llamaban los gladiadores más famosos de Roma?",
      options: ["Centuriones", "Pretorianos", "Gladiatores", "Legionarios"],
      correct: 2,
      explanation:
        "Los gladiadores eran combatientes que luchaban en anfiteatros para entretenimiento público.",
    },
  ],
  [DIFFICULTY_LEVELS.MEDIUM]: [
    {
      id: "roman_med_1",
      category: TRIVIA_CATEGORIES.ROMAN_EMPIRE,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿En qué batalla derrotó César a Pompeyo?",
      options: ["Farsalia", "Alesia", "Actium", "Carras"],
      correct: 0,
      explanation:
        "La batalla de Farsalia (48 a.C.) fue donde César derrotó definitivamente a Pompeyo en la guerra civil.",
    },
    {
      id: "roman_med_2",
      category: TRIVIA_CATEGORIES.ROMAN_EMPIRE,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Qué emperador construyó el Coliseo?",
      options: ["Nerón", "Vespasiano", "Trajano", "Adriano"],
      correct: 1,
      explanation:
        "El emperador Vespasiano inició la construcción del Coliseo (Anfiteatro Flavio) en 72 d.C.",
    },
  ],
  [DIFFICULTY_LEVELS.HARD]: [
    {
      id: "roman_hard_1",
      category: TRIVIA_CATEGORIES.ROMAN_EMPIRE,
      difficulty: DIFFICULTY_LEVELS.HARD,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién fue el último emperador del Imperio Romano unificado?",
      options: ["Teodosio I", "Honorio", "Arcadio", "Teodosio II"],
      correct: 0,
      explanation:
        "Teodosio I (379-395 d.C.) fue el último emperador en gobernar tanto Oriente como Occidente.",
    },
  ],
};

// Preguntas sobre Grecia Antigua
const GREEK_HISTORY_QUESTIONS = {
  [DIFFICULTY_LEVELS.EASY]: [
    {
      id: "greek_easy_1",
      category: TRIVIA_CATEGORIES.GREEK_HISTORY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién escribió la Ilíada y la Odisea?",
      options: ["Homero", "Hesíodo", "Sófocles", "Esquilo"],
      correct: 0,
      explanation:
        "Homero es tradicionalmente considerado el autor de estos dos grandes poemas épicos griegos.",
    },
    {
      id: "greek_easy_2",
      category: TRIVIA_CATEGORIES.GREEK_HISTORY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿En qué ciudad griega nació la democracia?",
      options: ["Esparta", "Atenas", "Tebas", "Corinto"],
      correct: 1,
      explanation:
        "Atenas desarrolló la primera forma de democracia conocida en el siglo V a.C.",
    },
    {
      id: "greek_easy_3",
      category: TRIVIA_CATEGORIES.GREEK_HISTORY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Qué filósofo fue maestro de Alejandro Magno?",
      options: ["Platón", "Sócrates", "Aristóteles", "Diógenes"],
      correct: 2,
      explanation:
        "Aristóteles fue tutor de Alejandro Magno durante su juventud en Macedonia.",
    },
  ],
  [DIFFICULTY_LEVELS.MEDIUM]: [
    {
      id: "greek_med_1",
      category: TRIVIA_CATEGORIES.GREEK_HISTORY,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question:
        "¿En qué batalla derrotó Alejandro Magno definitivamente a Darío III?",
      options: ["Issos", "Gaugamela", "Granicus", "Hydaspes"],
      correct: 1,
      explanation:
        "La batalla de Gaugamela (331 a.C.) fue la victoria decisiva de Alejandro sobre Darío III.",
    },
    {
      id: "greek_med_2",
      category: TRIVIA_CATEGORIES.GREEK_HISTORY,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: '¿Quién escribió "La República"?',
      options: ["Aristóteles", "Sócrates", "Platón", "Cicerón"],
      correct: 2,
      explanation:
        'Platón escribió "La República", una de las obras fundamentales de la filosofía política.',
    },
  ],
  [DIFFICULTY_LEVELS.HARD]: [
    {
      id: "greek_hard_1",
      category: TRIVIA_CATEGORIES.GREEK_HISTORY,
      difficulty: DIFFICULTY_LEVELS.HARD,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién lideró la Liga Aquea contra Roma?",
      options: ["Filopemen", "Aratos", "Cleómenes III", "Polibio"],
      correct: 0,
      explanation:
        "Filopemen fue el último gran líder griego que luchó por la independencia contra Roma.",
    },
  ],
};

// Preguntas sobre Egipto Antiguo
const EGYPTIAN_HISTORY_QUESTIONS = {
  [DIFFICULTY_LEVELS.EASY]: [
    {
      id: "egyptian_easy_1",
      category: TRIVIA_CATEGORIES.EGYPTIAN_HISTORY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién fue la última faraón de Egipto?",
      options: ["Nefertiti", "Cleopatra VII", "Hatshepsut", "Ankhesenamón"],
      correct: 1,
      explanation:
        "Cleopatra VII fue la última faraón de Egipto, gobernando hasta 30 a.C.",
    },
    {
      id: "egyptian_easy_2",
      category: TRIVIA_CATEGORIES.EGYPTIAN_HISTORY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Qué famosa tumba descubrió Howard Carter?",
      options: [
        "La de Ramsés II",
        "La de Tutankamón",
        "La de Keops",
        "La de Nefertiti",
      ],
      correct: 1,
      explanation:
        "Howard Carter descubrió la tumba intacta de Tutankamón en 1922 en el Valle de los Reyes.",
    },
    {
      id: "egyptian_easy_3",
      category: TRIVIA_CATEGORIES.EGYPTIAN_HISTORY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Cuál es la pirámide más grande de Egipto?",
      options: [
        "Pirámide de Keops",
        "Pirámide de Kefrén",
        "Pirámide de Micerinos",
        "Pirámide Escalonada",
      ],
      correct: 0,
      explanation:
        "La Gran Pirámide de Keops en Giza es la más grande y única maravilla del mundo antiguo que aún existe.",
    },
  ],
  [DIFFICULTY_LEVELS.MEDIUM]: [
    {
      id: "egyptian_med_1",
      category: TRIVIA_CATEGORIES.EGYPTIAN_HISTORY,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Qué faraón fundó la nueva capital de Akhetatón?",
      options: ["Akhenatón", "Ramsés II", "Tutmosis III", "Amenhotep III"],
      correct: 0,
      explanation:
        "Akhenatón (Amenhotep IV) fundó Akhetatón como nueva capital durante su revolución religiosa.",
    },
    {
      id: "egyptian_med_2",
      category: TRIVIA_CATEGORIES.EGYPTIAN_HISTORY,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿En qué batalla derrotó Ramsés II a los hititas?",
      options: ["Kadesh", "Megido", "Carquemis", "Hattin"],
      correct: 0,
      explanation:
        "La batalla de Kadesh (1274 a.C.) fue donde Ramsés II enfrentó al rey hitita Muwatalli II.",
    },
  ],
  [DIFFICULTY_LEVELS.HARD]: [
    {
      id: "egyptian_hard_1",
      category: TRIVIA_CATEGORIES.EGYPTIAN_HISTORY,
      difficulty: DIFFICULTY_LEVELS.HARD,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién fue el fundador de la dinastía ptolemaica?",
      options: [
        "Ptolomeo I Sóter",
        "Ptolomeo II Filadelfo",
        "Seleuco I",
        "Antígono",
      ],
      correct: 0,
      explanation:
        "Ptolomeo I Sóter, general de Alejandro Magno, fundó la dinastía ptolemaica que gobernó Egipto.",
    },
  ],
};

// Preguntas sobre Mitología
const MYTHOLOGY_QUESTIONS = {
  [DIFFICULTY_LEVELS.EASY]: [
    {
      id: "myth_easy_1",
      category: TRIVIA_CATEGORIES.MYTHOLOGY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién era el rey de los dioses en la mitología griega?",
      options: ["Poseidón", "Hades", "Zeus", "Apollo"],
      correct: 2,
      explanation:
        "Zeus era el rey de los dioses olímpicos y gobernaba el cielo y el trueno.",
    },
    {
      id: "myth_easy_2",
      category: TRIVIA_CATEGORIES.MYTHOLOGY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Qué héroe griego derrotó a la Medusa?",
      options: ["Teseo", "Perseo", "Heracles", "Aquiles"],
      correct: 1,
      explanation:
        "Perseo decapitó a la Medusa usando el reflejo de su escudo para evitar su mirada petrificante.",
    },
    {
      id: "myth_easy_3",
      category: TRIVIA_CATEGORIES.MYTHOLOGY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Cuál era el punto débil de Aquiles?",
      options: ["Su corazón", "Su talón", "Su cabeza", "Sus ojos"],
      correct: 1,
      explanation:
        "El talón de Aquiles era su único punto vulnerable, de donde viene la expresión moderna.",
    },
  ],
  [DIFFICULTY_LEVELS.MEDIUM]: [
    {
      id: "myth_med_1",
      category: TRIVIA_CATEGORIES.MYTHOLOGY,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién era la diosa egipcia de la justicia?",
      options: ["Isis", "Maat", "Hathor", "Bastet"],
      correct: 1,
      explanation:
        "Maat era la diosa egipcia de la justicia, la verdad y el orden cósmico.",
    },
    {
      id: "myth_med_2",
      category: TRIVIA_CATEGORIES.MYTHOLOGY,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question:
        "¿Qué criatura tenía cabeza de león, cuerpo de cabra y cola de serpiente?",
      options: ["Esfinge", "Quimera", "Hidra", "Minotauro"],
      correct: 1,
      explanation:
        "La Quimera era una criatura mitológica híbrida que fue derrotada por Belerofonte.",
    },
  ],
  [DIFFICULTY_LEVELS.HARD]: [
    {
      id: "myth_hard_1",
      category: TRIVIA_CATEGORIES.MYTHOLOGY,
      difficulty: DIFFICULTY_LEVELS.HARD,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién fue la primera mujer según la mitología griega?",
      options: ["Helena", "Pandora", "Afrodita", "Perséfone"],
      correct: 1,
      explanation:
        "Pandora fue la primera mujer creada por los dioses, quien abrió la famosa caja.",
    },
  ],
};

// Preguntas sobre Filosofía Antigua
const ANCIENT_PHILOSOPHY_QUESTIONS = {
  [DIFFICULTY_LEVELS.EASY]: [
    {
      id: "phil_easy_1",
      category: TRIVIA_CATEGORIES.ANCIENT_PHILOSOPHY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: '¿Quién dijo "Solo sé que no sé nada"?',
      options: ["Platón", "Sócrates", "Aristóteles", "Diógenes"],
      correct: 1,
      explanation:
        "Esta famosa frase es atribuida a Sócrates y resume su filosofía de la humildad intelectual.",
    },
    {
      id: "phil_easy_2",
      category: TRIVIA_CATEGORIES.ANCIENT_PHILOSOPHY,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Qué escuela filosófica fundó Epicuro?",
      options: ["Estoicismo", "Epicureísmo", "Cinismo", "Escepticismo"],
      correct: 1,
      explanation:
        "Epicuro fundó el epicureísmo, que enseñaba la búsqueda de la felicidad a través del placer moderado.",
    },
  ],
  [DIFFICULTY_LEVELS.MEDIUM]: [
    {
      id: "phil_med_1",
      category: TRIVIA_CATEGORIES.ANCIENT_PHILOSOPHY,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: '¿Quién escribió "Meditaciones"?',
      options: ["Séneca", "Epicteto", "Marco Aurelio", "Cicerón"],
      correct: 2,
      explanation:
        'Marco Aurelio escribió "Meditaciones", una obra fundamental del estoicismo.',
    },
  ],
  [DIFFICULTY_LEVELS.HARD]: [
    {
      id: "phil_hard_1",
      category: TRIVIA_CATEGORIES.ANCIENT_PHILOSOPHY,
      difficulty: DIFFICULTY_LEVELS.HARD,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién fundó la escuela peripatética?",
      options: ["Platón", "Aristóteles", "Teofrasto", "Zenón"],
      correct: 1,
      explanation:
        "Aristóteles fundó la escuela peripatética en el Liceo de Atenas.",
    },
  ],
};

// Preguntas sobre Guerras Antiguas
const ANCIENT_WARS_QUESTIONS = {
  [DIFFICULTY_LEVELS.EASY]: [
    {
      id: "wars_easy_1",
      category: TRIVIA_CATEGORIES.ANCIENT_WARS,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Cuántas Guerras Púnicas hubo entre Roma y Cartago?",
      options: ["Dos", "Tres", "Cuatro", "Cinco"],
      correct: 1,
      explanation:
        "Hubo tres Guerras Púnicas (264-146 a.C.) que terminaron con la destrucción de Cartago.",
    },
    {
      id: "wars_easy_2",
      category: TRIVIA_CATEGORIES.ANCIENT_WARS,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Qué general cartaginés cruzó los Alpes con elefantes?",
      options: ["Amílcar", "Aníbal", "Asdrúbal", "Magón"],
      correct: 1,
      explanation:
        "Aníbal cruzó los Alpes en 218 a.C. durante la Segunda Guerra Púnica.",
    },
  ],
  [DIFFICULTY_LEVELS.MEDIUM]: [
    {
      id: "wars_med_1",
      category: TRIVIA_CATEGORIES.ANCIENT_WARS,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿En qué batalla murió el rey Leónidas de Esparta?",
      options: ["Maratón", "Salamina", "Termópilas", "Platea"],
      correct: 2,
      explanation:
        "Leónidas murió heroicamente en la batalla de las Termópilas (480 a.C.) contra los persas.",
    },
  ],
  [DIFFICULTY_LEVELS.HARD]: [
    {
      id: "wars_hard_1",
      category: TRIVIA_CATEGORIES.ANCIENT_WARS,
      difficulty: DIFFICULTY_LEVELS.HARD,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién derrotó a Aníbal en la batalla de Zama?",
      options: ["Fabio Máximo", "Marcelo", "Escipión Africano", "Emilio Paulo"],
      correct: 2,
      explanation:
        "Escipión Africano derrotó a Aníbal en Zama (202 a.C.), terminando la Segunda Guerra Púnica.",
    },
  ],
};

// Preguntas sobre Personajes Históricos
const HISTORICAL_FIGURES_QUESTIONS = {
  [DIFFICULTY_LEVELS.EASY]: [
    {
      id: "figures_easy_1",
      category: TRIVIA_CATEGORIES.HISTORICAL_FIGURES,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién conquistó el Imperio Persa?",
      options: ["Filipo II", "Alejandro Magno", "Darío I", "Ciro el Grande"],
      correct: 1,
      explanation:
        "Alejandro Magno conquistó el vasto Imperio Persa en solo 13 años (336-323 a.C.).",
    },
    {
      id: "figures_easy_2",
      category: TRIVIA_CATEGORIES.HISTORICAL_FIGURES,
      difficulty: DIFFICULTY_LEVELS.EASY,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién fue asesinado en los Idus de Marzo?",
      options: ["Augusto", "Julio César", "Pompeyo", "Marco Antonio"],
      correct: 1,
      explanation:
        "Julio César fue asesinado el 15 de marzo (Idus de Marzo) del 44 a.C. en el Senado romano.",
    },
  ],
  [DIFFICULTY_LEVELS.MEDIUM]: [
    {
      id: "figures_med_1",
      category: TRIVIA_CATEGORIES.HISTORICAL_FIGURES,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: '¿Quién fue conocido como "El Escudo de Roma"?',
      options: ["Escipión", "Fabio Máximo", "Marcelo", "Camilo"],
      correct: 1,
      explanation:
        'Fabio Máximo fue llamado "Cunctator" (el Contemporizador) y "Escudo de Roma" por su estrategia contra Aníbal.',
    },
  ],
  [DIFFICULTY_LEVELS.HARD]: [
    {
      id: "figures_hard_1",
      category: TRIVIA_CATEGORIES.HISTORICAL_FIGURES,
      difficulty: DIFFICULTY_LEVELS.HARD,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "¿Quién fue el último emperador de la dinastía Julio-Claudia?",
      options: ["Calígula", "Claudio", "Nerón", "Galba"],
      correct: 2,
      explanation:
        "Nerón fue el último emperador de la dinastía Julio-Claudia, murió en 68 d.C.",
    },
  ],
};

// Compilación de todas las preguntas por categoría
export const ALL_QUESTIONS_BY_CATEGORY = {
  [TRIVIA_CATEGORIES.ANCIENT_CIVILIZATIONS]: ANCIENT_CIVILIZATIONS_QUESTIONS,
  [TRIVIA_CATEGORIES.ROMAN_EMPIRE]: ROMAN_EMPIRE_QUESTIONS,
  [TRIVIA_CATEGORIES.GREEK_HISTORY]: GREEK_HISTORY_QUESTIONS,
  [TRIVIA_CATEGORIES.EGYPTIAN_HISTORY]: EGYPTIAN_HISTORY_QUESTIONS,
  [TRIVIA_CATEGORIES.MYTHOLOGY]: MYTHOLOGY_QUESTIONS,
  [TRIVIA_CATEGORIES.ANCIENT_PHILOSOPHY]: ANCIENT_PHILOSOPHY_QUESTIONS,
  [TRIVIA_CATEGORIES.ANCIENT_WARS]: ANCIENT_WARS_QUESTIONS,
  [TRIVIA_CATEGORIES.HISTORICAL_FIGURES]: HISTORICAL_FIGURES_QUESTIONS,
};

// Compilación de todas las preguntas en un array plano
export const ALL_QUESTIONS = Object.values(ALL_QUESTIONS_BY_CATEGORY).flatMap(
  (category) => Object.values(category).flat()
);

// Preguntas por dificultad (todas las categorías)
export const QUESTIONS_BY_DIFFICULTY = {
  [DIFFICULTY_LEVELS.EASY]: ALL_QUESTIONS.filter(
    (q) => q.difficulty === DIFFICULTY_LEVELS.EASY
  ),
  [DIFFICULTY_LEVELS.MEDIUM]: ALL_QUESTIONS.filter(
    (q) => q.difficulty === DIFFICULTY_LEVELS.MEDIUM
  ),
  [DIFFICULTY_LEVELS.HARD]: ALL_QUESTIONS.filter(
    (q) => q.difficulty === DIFFICULTY_LEVELS.HARD
  ),
  [DIFFICULTY_LEVELS.EXPERT]: ALL_QUESTIONS.filter(
    (q) => q.difficulty === DIFFICULTY_LEVELS.EXPERT
  ),
};

// Set de preguntas de muestra para demo rápida
export const SAMPLE_QUESTIONS = [
  ALL_QUESTIONS_BY_CATEGORY[TRIVIA_CATEGORIES.ROMAN_EMPIRE][
    DIFFICULTY_LEVELS.EASY
  ][0],
  ALL_QUESTIONS_BY_CATEGORY[TRIVIA_CATEGORIES.GREEK_HISTORY][
    DIFFICULTY_LEVELS.EASY
  ][0],
  ALL_QUESTIONS_BY_CATEGORY[TRIVIA_CATEGORIES.EGYPTIAN_HISTORY][
    DIFFICULTY_LEVELS.EASY
  ][0],
  ALL_QUESTIONS_BY_CATEGORY[TRIVIA_CATEGORIES.MYTHOLOGY][
    DIFFICULTY_LEVELS.EASY
  ][0],
  ALL_QUESTIONS_BY_CATEGORY[TRIVIA_CATEGORIES.ANCIENT_PHILOSOPHY][
    DIFFICULTY_LEVELS.EASY
  ][0],
];

// Función para obtener preguntas aleatorias
export const getRandomQuestions = (
  count = 10,
  category = null,
  difficulty = null
) => {
  let questionPool = ALL_QUESTIONS;

  // Filtrar por categoría si se especifica
  if (category && category !== TRIVIA_CATEGORIES.MIXED) {
    questionPool = ALL_QUESTIONS_BY_CATEGORY[category]
      ? Object.values(ALL_QUESTIONS_BY_CATEGORY[category]).flat()
      : [];
  }

  // Filtrar por dificultad si se especifica
  if (difficulty) {
    questionPool = questionPool.filter((q) => q.difficulty === difficulty);
  }

  // Mezclar y tomar las primeras 'count' preguntas
  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Función para obtener preguntas balanceadas por dificultad
export const getBalancedQuestions = (count = 15, category = null) => {
  const easyCount = Math.ceil(count * 0.5); // 50% fáciles
  const mediumCount = Math.ceil(count * 0.3); // 30% medianas
  const hardCount = count - easyCount - mediumCount; // 20% difíciles

  const easyQuestions = getRandomQuestions(
    easyCount,
    category,
    DIFFICULTY_LEVELS.EASY
  );
  const mediumQuestions = getRandomQuestions(
    mediumCount,
    category,
    DIFFICULTY_LEVELS.MEDIUM
  );
  const hardQuestions = getRandomQuestions(
    hardCount,
    category,
    DIFFICULTY_LEVELS.HARD
  );

  // Mezclar todas las preguntas
  return [...easyQuestions, ...mediumQuestions, ...hardQuestions].sort(
    () => Math.random() - 0.5
  );
};
