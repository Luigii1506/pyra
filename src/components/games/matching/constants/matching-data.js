/**
 * Matching Game Data
 * Datos históricos para el juego de emparejamiento
 * @created 2024-12-19
 */

import { MATCHING_TYPES } from './matching-constants.js';

// Pares de Personaje con Descripción
export const PERSON_DESCRIPTION_PAIRS = [
  {
    id: 'pd1',
    left: { content: 'Cleopatra VII', type: 'person', image: '👑' },
    right: { content: 'Última faraona del Antiguo Egipto, conocida por sus relaciones con Julio César y Marco Antonio', type: 'description' },
    category: MATCHING_TYPES.PERSON_DESCRIPTION,
    difficulty: 'easy',
  },
  {
    id: 'pd2',
    left: { content: 'Alejandro Magno', type: 'person', image: '⚔️' },
    right: { content: 'Rey macedonio que creó uno de los imperios más grandes de la historia antigua', type: 'description' },
    category: MATCHING_TYPES.PERSON_DESCRIPTION,
    difficulty: 'easy',
  },
  {
    id: 'pd3',
    left: { content: 'Julio César', type: 'person', image: '🏛️' },
    right: { content: 'General y político romano que cruzó el Rubicón y se convirtió en dictador de Roma', type: 'description' },
    category: MATCHING_TYPES.PERSON_DESCRIPTION,
    difficulty: 'medium',
  },
  {
    id: 'pd4',
    left: { content: 'Hammurabi', type: 'person', image: '📜' },
    right: { content: 'Rey babilonio famoso por crear uno de los primeros códigos de leyes escritas', type: 'description' },
    category: MATCHING_TYPES.PERSON_DESCRIPTION,
    difficulty: 'medium',
  },
  {
    id: 'pd5',
    left: { content: 'Pericles', type: 'person', image: '🎭' },
    right: { content: 'Estadista ateniense que lideró Atenas durante su edad de oro', type: 'description' },
    category: MATCHING_TYPES.PERSON_DESCRIPTION,
    difficulty: 'hard',
  },
  {
    id: 'pd6',
    left: { content: 'Ramsés II', type: 'person', image: '🔺' },
    right: { content: 'Faraón egipcio conocido como "Ramsés el Grande", constructor de Abu Simbel', type: 'description' },
    category: MATCHING_TYPES.PERSON_DESCRIPTION,
    difficulty: 'hard',
  },
];

// Pares de Personaje con Artefacto/Objeto
export const PERSON_ARTIFACT_PAIRS = [
  {
    id: 'pa1',
    left: { content: 'Alejandro Magno', type: 'person', image: '👑' },
    right: { content: 'Casco macedonio', type: 'artifact', image: '⛑️' },
    category: MATCHING_TYPES.PERSON_ARTIFACT,
    difficulty: 'easy',
  },
  {
    id: 'pa2',
    left: { content: 'Tutankamón', type: 'person', image: '🏺' },
    right: { content: 'Máscara funeraria dorada', type: 'artifact', image: '🎭' },
    category: MATCHING_TYPES.PERSON_ARTIFACT,
    difficulty: 'easy',
  },
  {
    id: 'pa3',
    left: { content: 'Vikingos', type: 'person', image: '⚡' },
    right: { content: 'Drakkar (barco vikingo)', type: 'artifact', image: '🚢' },
    category: MATCHING_TYPES.PERSON_ARTIFACT,
    difficulty: 'medium',
  },
  {
    id: 'pa4',
    left: { content: 'Gladiadores romanos', type: 'person', image: '⚔️' },
    right: { content: 'Tridente y red', type: 'artifact', image: '🔱' },
    category: MATCHING_TYPES.PERSON_ARTIFACT,
    difficulty: 'medium',
  },
  {
    id: 'pa5',
    left: { content: 'Arquímedes', type: 'person', image: '🔬' },
    right: { content: 'Tornillo de Arquímedes', type: 'artifact', image: '🌀' },
    category: MATCHING_TYPES.PERSON_ARTIFACT,
    difficulty: 'hard',
  },
  {
    id: 'pa6',
    left: { content: 'Emperador romano', type: 'person', image: '👑' },
    right: { content: 'Corona de laurel', type: 'artifact', image: '🌿' },
    category: MATCHING_TYPES.PERSON_ARTIFACT,
    difficulty: 'hard',
  },
];

// Pares de Personaje con Personaje Relacionado
export const PERSON_PERSON_PAIRS = [
  {
    id: 'pp1',
    left: { content: 'Platón', type: 'person', image: '📚' },
    right: { content: 'Aristóteles', type: 'person', image: '🧠' },
    category: MATCHING_TYPES.PERSON_PERSON,
    difficulty: 'easy',
  },
  {
    id: 'pp2',
    left: { content: 'Julio César', type: 'person', image: '🏛️' },
    right: { content: 'Cleopatra', type: 'person', image: '👑' },
    category: MATCHING_TYPES.PERSON_PERSON,
    difficulty: 'easy',
  },
  {
    id: 'pp3',
    left: { content: 'Alejandro Magno', type: 'person', image: '⚔️' },
    right: { content: 'Aristóteles', type: 'person', image: '🧠' },
    category: MATCHING_TYPES.PERSON_PERSON,
    difficulty: 'medium',
  },
  {
    id: 'pp4',
    left: { content: 'Marco Antonio', type: 'person', image: '⚖️' },
    right: { content: 'Cleopatra', type: 'person', image: '👑' },
    category: MATCHING_TYPES.PERSON_PERSON,
    difficulty: 'medium',
  },
  {
    id: 'pp5',
    left: { content: 'Sócrates', type: 'person', image: '🤔' },
    right: { content: 'Platón', type: 'person', image: '📚' },
    category: MATCHING_TYPES.PERSON_PERSON,
    difficulty: 'hard',
  },
  {
    id: 'pp6',
    left: { content: 'Octavio Augusto', type: 'person', image: '🏛️' },
    right: { content: 'Julio César', type: 'person', image: '👴' },
    category: MATCHING_TYPES.PERSON_PERSON,
    difficulty: 'hard',
  },
];

// Pares de Lugar con Descripción
export const PLACE_DESCRIPTION_PAIRS = [
  {
    id: 'pld1',
    left: { content: 'Coliseo Romano', type: 'place', image: '🏛️' },
    right: { content: 'Anfiteatro romano donde se realizaban combates de gladiadores', type: 'description' },
    category: MATCHING_TYPES.PLACE_DESCRIPTION,
    difficulty: 'easy',
  },
  {
    id: 'pld2',
    left: { content: 'Acrópolis de Atenas', type: 'place', image: '🏛️' },
    right: { content: 'Parte alta y fortificada de Atenas, sede del Partenón', type: 'description' },
    category: MATCHING_TYPES.PLACE_DESCRIPTION,
    difficulty: 'easy',
  },
  {
    id: 'pld3',
    left: { content: 'Biblioteca de Alejandría', type: 'place', image: '📚' },
    right: { content: 'Gran centro de aprendizaje del mundo antiguo en Egipto', type: 'description' },
    category: MATCHING_TYPES.PLACE_DESCRIPTION,
    difficulty: 'medium',
  },
  {
    id: 'pld4',
    left: { content: 'Foro Romano', type: 'place', image: '🏛️' },
    right: { content: 'Centro político, comercial y religioso de la antigua Roma', type: 'description' },
    category: MATCHING_TYPES.PLACE_DESCRIPTION,
    difficulty: 'medium',
  },
  {
    id: 'pld5',
    left: { content: 'Jardines Colgantes de Babilonia', type: 'place', image: '🌿' },
    right: { content: 'Una de las Siete Maravillas del Mundo Antiguo en Mesopotamia', type: 'description' },
    category: MATCHING_TYPES.PLACE_DESCRIPTION,
    difficulty: 'hard',
  },
  {
    id: 'pld6',
    left: { content: 'Termas de Caracalla', type: 'place', image: '🛁' },
    right: { content: 'Complejos termales públicos romanos para el baño y la socialización', type: 'description' },
    category: MATCHING_TYPES.PLACE_DESCRIPTION,
    difficulty: 'hard',
  },
];

// Pares de Lugar con Evento
export const PLACE_EVENT_PAIRS = [
  {
    id: 'pe1',
    left: { content: 'Pirámides de Giza', type: 'place', image: '🔺' },
    right: { content: 'Construcción de las tumbas de los faraones egipcios', type: 'event' },
    category: MATCHING_TYPES.PLACE_EVENT,
    difficulty: 'easy',
  },
  {
    id: 'pe2',
    left: { content: 'Termópilas', type: 'place', image: '⚔️' },
    right: { content: 'Batalla donde 300 espartanos resistieron al ejército persa', type: 'event' },
    category: MATCHING_TYPES.PLACE_EVENT,
    difficulty: 'easy',
  },
  {
    id: 'pe3',
    left: { content: 'Alejandría', type: 'place', image: '🏛️' },
    right: { content: 'Fundación de la ciudad por Alejandro Magno', type: 'event' },
    category: MATCHING_TYPES.PLACE_EVENT,
    difficulty: 'medium',
  },
  {
    id: 'pe4',
    left: { content: 'Cartago', type: 'place', image: '🚢' },
    right: { content: 'Destrucción al final de las Guerras Púnicas', type: 'event' },
    category: MATCHING_TYPES.PLACE_EVENT,
    difficulty: 'medium',
  },
  {
    id: 'pe5',
    left: { content: 'Gaugamela', type: 'place', image: '⚔️' },
    right: { content: 'Batalla decisiva entre Alejandro Magno y Darío III', type: 'event' },
    category: MATCHING_TYPES.PLACE_EVENT,
    difficulty: 'hard',
  },
  {
    id: 'pe6',
    left: { content: 'Rubicón', type: 'place', image: '🌊' },
    right: { content: 'César cruza el río iniciando la guerra civil romana', type: 'event' },
    category: MATCHING_TYPES.PLACE_EVENT,
    difficulty: 'hard',
  },
];

// Pares de Religión/Mitología con Descripción
export const RELIGION_DESCRIPTION_PAIRS = [
  {
    id: 'rd1',
    left: { content: 'Mitología Griega', type: 'religion', image: '⚡' },
    right: { content: 'Conjunto de creencias de los antiguos griegos sobre dioses olímpicos', type: 'description' },
    category: MATCHING_TYPES.RELIGION_DESCRIPTION,
    difficulty: 'easy',
  },
  {
    id: 'rd2',
    left: { content: 'Mitología Egipcia', type: 'religion', image: '🔺' },
    right: { content: 'Sistema religioso del antiguo Egipto centrado en el más allá', type: 'description' },
    category: MATCHING_TYPES.RELIGION_DESCRIPTION,
    difficulty: 'easy',
  },
  {
    id: 'rd3',
    left: { content: 'Mitología Nórdica', type: 'religion', image: '🔨' },
    right: { content: 'Creencias de los pueblos germánicos del norte de Europa', type: 'description' },
    category: MATCHING_TYPES.RELIGION_DESCRIPTION,
    difficulty: 'medium',
  },
  {
    id: 'rd4',
    left: { content: 'Mitología Romana', type: 'religion', image: '🏛️' },
    right: { content: 'Adaptación romana de las creencias griegas con nuevos nombres', type: 'description' },
    category: MATCHING_TYPES.RELIGION_DESCRIPTION,
    difficulty: 'medium',
  },
  {
    id: 'rd5',
    left: { content: 'Mitología Mesopotámica', type: 'religion', image: '📜' },
    right: { content: 'Primeras creencias organizadas de Sumeria y Babilonia', type: 'description' },
    category: MATCHING_TYPES.RELIGION_DESCRIPTION,
    difficulty: 'hard',
  },
  {
    id: 'rd6',
    left: { content: 'Mitraísmo', type: 'religion', image: '🌞' },
    right: { content: 'Religión mistérica popular entre los soldados romanos', type: 'description' },
    category: MATCHING_TYPES.RELIGION_DESCRIPTION,
    difficulty: 'hard',
  },
];

// Pares de Deidad con Atributo/Símbolo
export const DEITY_ATTRIBUTE_PAIRS = [
  {
    id: 'da1',
    left: { content: 'Zeus', type: 'deity', image: '👑' },
    right: { content: 'Rayo', type: 'attribute', image: '⚡' },
    category: MATCHING_TYPES.DEITY_ATTRIBUTE,
    difficulty: 'easy',
  },
  {
    id: 'da2',
    left: { content: 'Poseidón', type: 'deity', image: '🌊' },
    right: { content: 'Tridente', type: 'attribute', image: '🔱' },
    category: MATCHING_TYPES.DEITY_ATTRIBUTE,
    difficulty: 'easy',
  },
  {
    id: 'da3',
    left: { content: 'Atenea', type: 'deity', image: '🦉' },
    right: { content: 'Lechuza y escudo', type: 'attribute', image: '🛡️' },
    category: MATCHING_TYPES.DEITY_ATTRIBUTE,
    difficulty: 'medium',
  },
  {
    id: 'da4',
    left: { content: 'Thor', type: 'deity', image: '🔨' },
    right: { content: 'Mjolnir (martillo)', type: 'attribute', image: '🔨' },
    category: MATCHING_TYPES.DEITY_ATTRIBUTE,
    difficulty: 'medium',
  },
  {
    id: 'da5',
    left: { content: 'Anubis', type: 'deity', image: '🐺' },
    right: { content: 'Cabeza de chacal', type: 'attribute', image: '🐕' },
    category: MATCHING_TYPES.DEITY_ATTRIBUTE,
    difficulty: 'hard',
  },
  {
    id: 'da6',
    left: { content: 'Marduk', type: 'deity', image: '🐉' },
    right: { content: 'Dragón y vara de medir', type: 'attribute', image: '📏' },
    category: MATCHING_TYPES.DEITY_ATTRIBUTE,
    difficulty: 'hard',
  },
];

// Pares de Término con Definición
export const TERM_DEFINITION_PAIRS = [
  {
    id: 'td1',
    left: { content: 'Acrópolis', type: 'term', image: '🏛️' },
    right: { content: 'Parte alta y fortificada de las antiguas ciudades griegas', type: 'definition' },
    category: MATCHING_TYPES.TERM_DEFINITION,
    difficulty: 'easy',
  },
  {
    id: 'td2',
    left: { content: 'Faraón', type: 'term', image: '👑' },
    right: { content: 'Título del gobernante supremo del antiguo Egipto', type: 'definition' },
    category: MATCHING_TYPES.TERM_DEFINITION,
    difficulty: 'easy',
  },
  {
    id: 'td3',
    left: { content: 'Pax Romana', type: 'term', image: '🕊️' },
    right: { content: 'Período de paz relativa en el Imperio Romano (27 a.C. - 180 d.C.)', type: 'definition' },
    category: MATCHING_TYPES.TERM_DEFINITION,
    difficulty: 'medium',
  },
  {
    id: 'td4',
    left: { content: 'Helenismo', type: 'term', image: '🏛️' },
    right: { content: 'Difusión de la cultura griega tras las conquistas de Alejandro', type: 'definition' },
    category: MATCHING_TYPES.TERM_DEFINITION,
    difficulty: 'medium',
  },
  {
    id: 'td5',
    left: { content: 'Ostracismo', type: 'term', image: '🗳️' },
    right: { content: 'Exilio temporal votado por la asamblea ateniense', type: 'definition' },
    category: MATCHING_TYPES.TERM_DEFINITION,
    difficulty: 'hard',
  },
  {
    id: 'td6',
    left: { content: 'Cursus Honorum', type: 'term', image: '🪜' },
    right: { content: 'Secuencia de cargos públicos en la carrera política romana', type: 'definition' },
    category: MATCHING_TYPES.TERM_DEFINITION,
    difficulty: 'hard',
  },
];

// Pares de Fecha con Evento
export const DATE_EVENT_PAIRS = [
  {
    id: 'de1',
    left: { content: '753 a.C.', type: 'date', image: '📅' },
    right: { content: 'Fundación legendaria de Roma', type: 'event' },
    category: MATCHING_TYPES.DATE_EVENT,
    difficulty: 'easy',
  },
  {
    id: 'de2',
    left: { content: '490 a.C.', type: 'date', image: '📅' },
    right: { content: 'Batalla de Maratón', type: 'event' },
    category: MATCHING_TYPES.DATE_EVENT,
    difficulty: 'easy',
  },
  {
    id: 'de3',
    left: { content: '44 a.C.', type: 'date', image: '📅' },
    right: { content: 'Asesinato de Julio César en los Idus de Marzo', type: 'event' },
    category: MATCHING_TYPES.DATE_EVENT,
    difficulty: 'medium',
  },
  {
    id: 'de4',
    left: { content: '31 a.C.', type: 'date', image: '📅' },
    right: { content: 'Batalla de Actium', type: 'event' },
    category: MATCHING_TYPES.DATE_EVENT,
    difficulty: 'medium',
  },
  {
    id: 'de5',
    left: { content: '476 d.C.', type: 'date', image: '📅' },
    right: { content: 'Caída del Imperio Romano de Occidente', type: 'event' },
    category: MATCHING_TYPES.DATE_EVENT,
    difficulty: 'hard',
  },
  {
    id: 'de6',
    left: { content: '146 a.C.', type: 'date', image: '📅' },
    right: { content: 'Destrucción de Cartago', type: 'event' },
    category: MATCHING_TYPES.DATE_EVENT,
    difficulty: 'hard',
  },
];

// Exportar todos los pares agrupados por categoría
export const ALL_MATCHING_PAIRS = {
  [MATCHING_TYPES.PERSON_DESCRIPTION]: PERSON_DESCRIPTION_PAIRS,
  [MATCHING_TYPES.PERSON_ARTIFACT]: PERSON_ARTIFACT_PAIRS,
  [MATCHING_TYPES.PERSON_PERSON]: PERSON_PERSON_PAIRS,
  [MATCHING_TYPES.PLACE_DESCRIPTION]: PLACE_DESCRIPTION_PAIRS,
  [MATCHING_TYPES.PLACE_EVENT]: PLACE_EVENT_PAIRS,
  [MATCHING_TYPES.RELIGION_DESCRIPTION]: RELIGION_DESCRIPTION_PAIRS,
  [MATCHING_TYPES.DEITY_ATTRIBUTE]: DEITY_ATTRIBUTE_PAIRS,
  [MATCHING_TYPES.TERM_DEFINITION]: TERM_DEFINITION_PAIRS,
  [MATCHING_TYPES.DATE_EVENT]: DATE_EVENT_PAIRS,
};

// Obtener todos los pares como una lista plana
export const SAMPLE_PAIRS = Object.values(ALL_MATCHING_PAIRS).flat();