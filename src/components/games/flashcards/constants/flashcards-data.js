/**
 * Sample Flashcards Data
 * Datos de ejemplo para el sistema de flashcards
 * @created 2024-12-19
 */

import { CARD_STATES } from './flashcards-constants.js';

// Datos de ejemplo para flashcards
export const SAMPLE_DECKS = [
  {
    id: 1,
    title: "Imperio Romano - Emperadores",
    category: "Personajes",
    description: "Los emperadores más importantes del Imperio Romano",
    color: "bg-red-500",
    totalCards: 12,
    newCards: 3,
    dueCards: 5,
    learningCards: 2,
    reviewCards: 2,
    cards: [
      {
        id: 1,
        front: "¿Quién fue el primer emperador de Roma?",
        back: "Augusto (Octavio) fue el primer emperador de Roma (27 a.C. - 14 d.C.). Adoptado por Julio César, se convirtió en el primer emperador tras ganar la guerra civil contra Marco Antonio y Cleopatra.",
        tags: ["emperador", "fundador", "augusto"],
        state: CARD_STATES.NEW,
        easeFactor: 2.5,
        interval: 0,
        dueDate: new Date(),
        lapses: 0,
        reviews: 0,
        step: 0,
      },
      {
        id: 2,
        front: "¿Qué emperador construyó el Coliseo?",
        back: "Vespasiano comenzó la construcción del Coliseo en el 72 d.C., aunque fue completado durante el reinado de su hijo Tito en el 80 d.C. El Coliseo podía albergar entre 50,000 y 80,000 espectadores.",
        tags: ["vespasiano", "tito", "coliseo", "construcción"],
        state: CARD_STATES.REVIEW,
        easeFactor: 2.3,
        interval: 3,
        dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // Ayer
        lapses: 1,
        reviews: 5,
        step: 0,
      },      {
        id: 3,
        front: "¿Cuál fue el último emperador del Imperio Romano de Occidente?",
        back: "Rómulo Augústulo fue el último emperador del Imperio Romano de Occidente, depuesto en 476 d.C. por el jefe bárbaro Odoacro. Irónicamente, su nombre recordaba al fundador de Roma y al primer emperador.",
        tags: ["romulo augustulo", "caida", "occidente"],
        state: CARD_STATES.LEARNING,
        easeFactor: 2.5,
        interval: 0,
        dueDate: new Date(),
        lapses: 0,
        reviews: 2,
        step: 1,
      },
      {
        id: 4,
        front: "¿Qué emperador dividió el Imperio Romano en dos partes?",
        back: "Diocleciano (284-305 d.C.) estableció la tetrarquía, dividiendo el Imperio Romano en dos partes (Oriente y Occidente) para facilitar su administración, con dos augustos y dos césares gobernando conjuntamente.",
        tags: ["diocleciano", "tetriarquia", "division"],
        state: CARD_STATES.NEW,
        easeFactor: 2.5,
        interval: 0,
        dueDate: new Date(),
        lapses: 0,
        reviews: 0,
        step: 0,
      },
    ]
  },
  {
    id: 2,
    title: "Mitología Griega - Dioses Olímpicos",
    category: "Mitología",
    description: "Los doce dioses principales del Olimpo",
    color: "bg-blue-500",
    totalCards: 15,
    newCards: 5,
    dueCards: 7,
    learningCards: 2,
    reviewCards: 1,
    cards: [
      {
        id: 5,
        front: "¿Quién es el rey de los dioses en la mitología griega?",
        back: "Zeus es el rey de los dioses olímpicos, señor del cielo y el trueno. Hijo de Cronos y Rea, derrotó a los Titanes y se convirtió en el gobernante supremo del Olimpo.",
        tags: ["zeus", "rey", "olimpo", "trueno"],
        state: CARD_STATES.REVIEW,
        easeFactor: 2.8,
        interval: 7,
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // En 2 días
        lapses: 0,
        reviews: 8,
        step: 0,
      },
      {
        id: 6,
        front: "¿Quién es la diosa de la sabiduría?",
        back: "Atenea es la diosa de la sabiduría, la guerra estratégica y las artes. Nació completamente armada de la cabeza de Zeus y es la patrona de Atenas.",
        tags: ["atenea", "sabiduria", "guerra", "artes"],
        state: CARD_STATES.NEW,
        easeFactor: 2.5,
        interval: 0,
        dueDate: new Date(),
        lapses: 0,
        reviews: 0,
        step: 0,
      },
    ]
  },
  {
    id: 3,
    title: "Batallas Históricas Antiguas",
    category: "Militar",
    description: "Las batallas más importantes de la historia antigua",
    color: "bg-orange-500",
    totalCards: 20,
    newCards: 8,
    dueCards: 10,
    learningCards: 1,
    reviewCards: 1,
    cards: [
      {
        id: 7,
        front: "¿En qué batalla Alejandro Magno derrotó definitivamente al Imperio Persa?",
        back: "En la Batalla de Gaugamela (331 a.C.), Alejandro Magno derrotó decisivamente a Darío III, lo que marcó el fin del Imperio Persa y estableció a Alejandro como señor de Asia.",
        tags: ["alejandro", "gaugamela", "dario", "persia"],
        state: CARD_STATES.REVIEW,
        easeFactor: 2.4,
        interval: 5,
        dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // Hace 2 días
        lapses: 1,
        reviews: 6,
        step: 0,
      },
      {
        id: 8,
        front: "¿Dónde tuvo lugar la famosa batalla de las Termópilas?",
        back: "Las Termópilas (480 a.C.) fue un paso estrecho en Grecia donde 300 espartanos liderados por Leónidas resistieron heroicamente contra el vasto ejército persa de Jerjes, sacrificándose para defender Grecia.",
        tags: ["termopilas", "leonidas", "espartanos", "jerjes"],
        state: CARD_STATES.LEARNING,
        easeFactor: 2.5,
        interval: 0,
        dueDate: new Date(),
        lapses: 0,
        reviews: 1,
        step: 0,
      },
    ]
  }
];

// Estadísticas de ejemplo para el usuario
export const SAMPLE_USER_STATS = {
  totalCards: 47,
  cardsStudiedToday: 18,
  dailyGoal: 30,
  currentStreak: 7,
  longestStreak: 23,
  totalReviews: 156,
  averageRetention: 87.5,
  timeStudiedToday: 25, // minutos
  favoriteCategory: "Personajes",
  masteredCards: 12,
  learningCards: 8,
  newCards: 27,
};