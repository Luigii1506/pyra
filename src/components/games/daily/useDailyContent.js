/**
 * useDailyContent Hook
 * Custom hook for managing daily historical content
 * @created 2024-12-19
 */

import { useState, useEffect, useCallback } from "react";

const useDailyContent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyContent, setDailyContent] = useState(null);
  const [contentType, setContentType] = useState("character"); // character, event, fact, place
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastVisit, setLastVisit] = useState(null);

  // Sample daily content data
  const contentDatabase = {
    characters: [
      {
        id: 1,
        name: "Julio César",
        period: "100-44 a.C.",
        civilization: "Imperio Romano",
        title: "Dictador Romano",
        description:
          "Político y militar romano que expandió el territorio romano y transformó la República en Imperio.",
        keyFacts: [
          "Cruzó el Rubicón en 49 a.C., iniciando una guerra civil",
          "Conquistó las Galias en sus campañas militares",
          "Fue asesinado en los Idus de Marzo del 44 a.C.",
          "Adoptó a Octavio (futuro Augusto) como heredero",
        ],
        achievements: [
          "Reformó el calendario romano",
          "Expandió el territorio romano significativamente",
          "Estableció las bases del Imperio Romano",
        ],
        quote: '"Llegué, vi, vencí" - Veni, vidi, vici',
        imageUrl: "/characters/julius-caesar.jpg",
        funFact: 'Su nombre dio origen a la palabra "César" y "Kaiser"',
        relatedTopics: [
          "Imperio Romano",
          "República Romana",
          "Guerras Civiles",
        ],
      },
      {
        id: 2,
        name: "Cleopatra VII",
        period: "69-30 a.C.",
        civilization: "Egipto Ptolemaico",
        title: "Faraona de Egipto",
        description:
          "Última faraona activa del Antiguo Egipto y una de las mujeres más poderosas de la historia.",
        keyFacts: [
          "Gobernó Egipto durante 21 años",
          "Hablaba al menos 9 idiomas",
          "Tuvo relaciones políticas con Julio César y Marco Antonio",
          "Se suicidó tras la derrota en la Batalla de Actium",
        ],
        achievements: [
          "Mantuvo la independencia egipcia durante décadas",
          "Fue una erudita y diplomática hábil",
          "Expandió el comercio egipcio por el Mediterráneo",
        ],
        quote: '"No seré exhibida en su triunfo romano"',
        imageUrl: "/characters/cleopatra.jpg",
        funFact: "Era macedonia por ascendencia, no egipcia étnica",
        relatedTopics: ["Egipto Ptolemaico", "Imperio Romano", "Alejandría"],
      },
    ],
    events: [
      {
        id: 1,
        name: "Batalla de las Termópilas",
        date: "480 a.C.",
        location: "Grecia",
        period: "Guerras Médicas",
        description:
          "Famosa batalla donde 300 espartanos liderados por Leónidas resistieron al ejército persa.",
        participants: [
          "Reino de Esparta",
          "Imperio Persa",
          "Ciudades-Estado Griegas",
        ],
        keyFacts: [
          "Los 300 espartanos se sacrificaron para defender el paso",
          "Demostró la efectividad de la falange griega",
          "Inspiró la resistencia griega contra los persas",
          "Jerjes I lideró el ejército persa",
        ],
        consequences: [
          "Ralentizó el avance persa hacia Atenas",
          "Inspiró a otras ciudades griegas a resistir",
          "Se convirtió en símbolo de sacrificio heroico",
        ],
        funFact:
          "En realidad participaron unos 7,000 griegos, no solo 300 espartanos",
        relatedTopics: ["Esparta", "Imperio Persa", "Guerras Médicas"],
      },
      {
        id: 2,
        name: "Erupción del Vesubio",
        date: "79 d.C.",
        location: "Pompeya, Italia",
        period: "Imperio Romano",
        description:
          "Erupción volcánica que sepultó las ciudades de Pompeya y Herculano.",
        participants: ["Ciudadanos de Pompeya", "Ciudadanos de Herculano"],
        keyFacts: [
          "Las ciudades quedaron perfectamente preservadas bajo ceniza",
          "Se estima que murieron entre 10,000 y 25,000 personas",
          "Plinio el Joven documentó el evento por escrito",
          "No fue redescubierta hasta el siglo XVIII",
        ],
        consequences: [
          "Preservó un momento en el tiempo de la vida romana",
          "Proporcionó invaluable información arqueológica",
          "Cambió la comprensión de los riesgos volcánicos",
        ],
        funFact:
          "Los cuerpos se preservaron como moldes en la ceniza volcánica",
        relatedTopics: ["Imperio Romano", "Arqueología", "Volcanología"],
      },
    ],
    places: [
      {
        id: 1,
        name: "Biblioteca de Alejandría",
        location: "Alejandría, Egipto",
        period: "Época Helenística - Romano",
        civilization: "Egipto Ptolemaico",
        description:
          "La biblioteca más famosa del mundo antiguo y centro de aprendizaje.",
        keyFacts: [
          "Contenía entre 400,000 y 700,000 rollos de papiro",
          "Atraía a los eruditos más importantes de la época",
          "Incluía el Museion (casa de las musas)",
          "Su declive fue gradual, no instantáneo",
        ],
        significance: [
          "Centro mundial de conocimiento e investigación",
          "Preservó textos de muchas civilizaciones",
          "Lugar de importantes descubrimientos científicos",
        ],
        famousResidents: [
          "Euclides - Matemático",
          "Eratóstenes - Calculó la circunferencia de la Tierra",
          "Hipatia - Matemática y filósofa",
        ],
        funFact:
          "Los barcos que llegaban al puerto debían entregar copias de todos sus libros",
        relatedTopics: ["Alejandría", "Egipto Ptolemaico", "Helenismo"],
      },
    ],
    facts: [
      {
        id: 1,
        title: "Los Romanos y la Pasta Dental",
        category: "Vida Cotidiana",
        period: "Imperio Romano",
        description:
          "Los antiguos romanos usaban orina como enjuague bucal y pasta dental.",
        details: [
          "Creían que la orina, especialmente de España, era la mejor",
          "La orina contiene amoníaco, que efectivamente limpia los dientes",
          "Era tan valorada que se importaba orina portuguesa",
          "También usaban polvo de huesos quemados y cáscaras de huevo",
        ],
        funFact:
          "La orina portuguesa era considerada la de mejor calidad para higiene dental",
        relatedTopics: ["Imperio Romano", "Medicina Antigua", "Vida Cotidiana"],
      },
      {
        id: 2,
        title: "El Color Púrpura del Poder",
        category: "Economía y Comercio",
        period: "Antigüedad",
        description:
          "El color púrpura era más valioso que el oro en la antigüedad.",
        details: [
          "Se extraía de miles de caracolas murex en el Mediterráneo",
          "Se necesitaban 10,000 caracolas para producir 1 gramo de tinte",
          "Solo los emperadores y la alta nobleza podían permitírselo",
          "Tiro y Sidón eran los principales centros de producción",
        ],
        funFact:
          'El término "nacido en la púrpura" viene de esta tradición imperial',
        relatedTopics: [
          "Imperio Romano",
          "Imperio Bizantino",
          "Comercio Mediterráneo",
        ],
      },
    ],
  };

  // Get content for specific date
  const getContentForDate = useCallback((date) => {
    const dayOfYear = Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );

    // Use day of year to deterministically select content
    const allContent = [
      ...contentDatabase.characters.map((c) => ({ ...c, type: "character" })),
      ...contentDatabase.events.map((e) => ({ ...e, type: "event" })),
      ...contentDatabase.places.map((p) => ({ ...p, type: "place" })),
      ...contentDatabase.facts.map((f) => ({ ...f, type: "fact" })),
    ];

    const selectedContent = allContent[dayOfYear % allContent.length];
    return selectedContent;
  }, []);

  // Load daily content
  const loadDailyContent = useCallback(
    (date = new Date()) => {
      setIsLoading(true);
      setCurrentDate(date);

      // Simulate API call
      setTimeout(() => {
        const content = getContentForDate(date);
        setDailyContent(content);
        setContentType(content.type);
        setIsLoading(false);

        // Update streak
        const today = new Date().toDateString();
        const lastVisitDate = localStorage.getItem("dailyContentLastVisit");

        if (lastVisitDate === today) {
          // Already visited today
          const currentStreak = parseInt(
            localStorage.getItem("dailyContentStreak") || "0"
          );
          setStreak(currentStreak);
        } else {
          // First visit today
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          if (lastVisitDate === yesterday.toDateString()) {
            // Consecutive day
            const currentStreak =
              parseInt(localStorage.getItem("dailyContentStreak") || "0") + 1;
            setStreak(currentStreak);
            localStorage.setItem(
              "dailyContentStreak",
              currentStreak.toString()
            );
          } else {
            // Streak broken
            setStreak(1);
            localStorage.setItem("dailyContentStreak", "1");
          }

          localStorage.setItem("dailyContentLastVisit", today);
          setLastVisit(today);
        }

        // Add to history
        addToHistory(content);
      }, 500);
    },
    [getContentForDate]
  );

  // Add to favorites
  const addToFavorites = useCallback(
    (content) => {
      const newFavorites = [
        ...favorites,
        { ...content, dateAdded: new Date() },
      ];
      setFavorites(newFavorites);
      localStorage.setItem(
        "dailyContentFavorites",
        JSON.stringify(newFavorites)
      );
    },
    [favorites]
  );

  // Remove from favorites
  const removeFromFavorites = useCallback(
    (contentId) => {
      const newFavorites = favorites.filter((fav) => fav.id !== contentId);
      setFavorites(newFavorites);
      localStorage.setItem(
        "dailyContentFavorites",
        JSON.stringify(newFavorites)
      );
    },
    [favorites]
  );

  // Check if content is favorite
  const isFavorite = useCallback(
    (contentId) => {
      return favorites.some((fav) => fav.id === contentId);
    },
    [favorites]
  );

  // Add to history
  const addToHistory = useCallback(
    (content) => {
      const newHistory = [
        { ...content, viewedDate: new Date() },
        ...history.filter(
          (h) => h.id !== content.id || h.type !== content.type
        ),
      ].slice(0, 30); // Keep last 30 items

      setHistory(newHistory);
      localStorage.setItem("dailyContentHistory", JSON.stringify(newHistory));
    },
    [history]
  );

  // Get random content
  const getRandomContent = useCallback(() => {
    const allContent = [
      ...contentDatabase.characters.map((c) => ({ ...c, type: "character" })),
      ...contentDatabase.events.map((e) => ({ ...e, type: "event" })),
      ...contentDatabase.places.map((p) => ({ ...p, type: "place" })),
      ...contentDatabase.facts.map((f) => ({ ...f, type: "fact" })),
    ];

    const randomIndex = Math.floor(Math.random() * allContent.length);
    const content = allContent[randomIndex];

    setDailyContent(content);
    setContentType(content.type);
    addToHistory(content);
  }, [addToHistory]);

  // Load previous/next day content
  const navigateDate = useCallback(
    (direction) => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
      loadDailyContent(newDate);
    },
    [currentDate, loadDailyContent]
  );

  // Format date
  const formatDate = useCallback((date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  // Initialize on mount
  useEffect(() => {
    // Load saved data
    const savedFavorites = localStorage.getItem("dailyContentFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedHistory = localStorage.getItem("dailyContentHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const savedStreak = localStorage.getItem("dailyContentStreak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }

    const savedLastVisit = localStorage.getItem("dailyContentLastVisit");
    if (savedLastVisit) {
      setLastVisit(savedLastVisit);
    }

    // Load today's content
    loadDailyContent();
  }, [loadDailyContent]);

  return {
    // State
    dailyContent,
    contentType,
    currentDate,
    isLoading,
    favorites,
    history,
    streak,
    lastVisit,

    // Actions
    loadDailyContent,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getRandomContent,
    navigateDate,

    // Utilities
    formatDate,

    // Computed values
    isToday: currentDate.toDateString() === new Date().toDateString(),
    canNavigateNext: currentDate < new Date(),
  };
};

export default useDailyContent;
