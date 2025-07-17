"use client";
import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Upload,
  Download,
  Settings,
  Database,
  Users,
  Map,
  Clock,
  Crown,
  BookOpen,
} from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("characters");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const adminTabs = [
    { id: "characters", name: "Personajes", icon: Users, color: "bg-blue-600" },
    { id: "events", name: "Eventos", icon: Clock, color: "bg-green-600" },
    { id: "locations", name: "Lugares", icon: Map, color: "bg-purple-600" },
    {
      id: "mythologies",
      name: "Mitologías",
      icon: Crown,
      color: "bg-amber-600",
    },
    { id: "concepts", name: "Conceptos", icon: BookOpen, color: "bg-red-600" },
    {
      id: "religions",
      name: "Religiones",
      icon: Crown,
      color: "bg-indigo-600",
    },
    {
      id: "settings",
      name: "Configuración",
      icon: Settings,
      color: "bg-stone-600",
    },
  ];

  // Sample data structures for each type
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: "Julio César",
      title: "Dictador Romano",
      period: "100 - 44 a.C.",
      category: "politicians",
      birthPlace: "Roma",
      deathPlace: "Roma",
      description:
        "Político y general romano que jugó un papel crucial en la caída de la República Romana.",
      achievements: [
        "Conquistó las Galias",
        "Cruzó el Rubicón",
        "Estableció el Primer Triunvirato",
      ],
      battles: ["Batalla de Alesia", "Batalla de Farsalia"],
      tags: ["Roma", "Política", "Militar"],
      image:
        "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    },
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      year: -753,
      title: "Fundación de Roma",
      description: "Según la tradición, Rómulo funda la ciudad de Roma",
      category: "Fundación",
      period: "ancient",
      location: "Roma",
      participants: ["Rómulo", "Remo"],
      consequences: ["Inicio de la civilización romana"],
      tags: ["Roma", "Fundación", "Mitología"],
    },
  ]);

  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Roma",
      coordinates: "41.9028, 12.4964",
      description: "Capital del Imperio Romano",
      type: "capital",
      period: "ancient",
      events: ["Fundación de Roma", "Establecimiento del Imperio"],
      importance: "Centro político y cultural del mundo antiguo",
      tags: ["Imperio Romano", "Capital", "Política"],
    },
  ]);

  const [mythologies, setMythologies] = useState([
    {
      id: 1,
      title: "Los Doce Olímpicos",
      culture: "greek",
      category: "Panteón",
      description:
        "Los doce dioses principales del panteón griego que residían en el Monte Olimpo.",
      characters: ["Zeus", "Hera", "Poseidón", "Atenea"],
      themes: ["Poder", "Familia", "Destino"],
      moralLesson:
        "La importancia del equilibrio entre poder y responsabilidad",
      tags: ["Grecia", "Dioses", "Olimpo"],
    },
  ]);

  const [concepts, setConcepts] = useState([
    {
      id: 1,
      name: "Democracia Ateniense",
      definition:
        "Sistema político de participación directa de los ciudadanos en Atenas",
      period: "classical",
      relatedFigures: ["Pericles", "Clístenes"],
      keyFeatures: [
        "Participación directa",
        "Sorteo para cargos",
        "Ostracismo",
      ],
      modernRelevance: "Base de los sistemas democráticos modernos",
      tags: ["Política", "Atenas", "Democracia"],
    },
  ]);

  const [religions, setReligions] = useState([
    {
      id: 1,
      name: "Religión Olímpica Griega",
      civilization: "greek",
      type: "polytheistic",
      period: "800 a.C. - 400 d.C.",
      description:
        "Sistema religioso centrado en los doce dioses olímpicos y sus cultos.",
      mainDeities: ["Zeus", "Hera", "Poseidón", "Atenea"],
      keyBeliefs: [
        "Politeísmo con jerarquía divina",
        "Intervención divina en asuntos humanos",
      ],
      rituals: [
        "Sacrificios de animales",
        "Libaciones",
        "Procesiones religiosas",
      ],
      sacredPlaces: ["Partenón en Atenas", "Oráculo de Delfos"],
      influence:
        "Profunda influencia en el arte, literatura, filosofía y política griega.",
      modernLegacy:
        "Sus mitos y símbolos perduran en la literatura y cultura popular moderna.",
      tags: ["Politeísmo", "Olimpo", "Zeus", "Templos"],
    },
  ]);

  const getFormFields = (type) => {
    switch (type) {
      case "characters":
        return [
          { name: "name", label: "Nombre", type: "text", required: true },
          { name: "title", label: "Título", type: "text", required: true },
          { name: "period", label: "Período", type: "text", required: true },
          {
            name: "category",
            label: "Categoría",
            type: "select",
            options: ["emperors", "generals", "philosophers", "politicians"],
            required: true,
          },
          { name: "birthPlace", label: "Lugar de Nacimiento", type: "text" },
          { name: "deathPlace", label: "Lugar de Muerte", type: "text" },
          {
            name: "description",
            label: "Descripción",
            type: "textarea",
            required: true,
          },
          {
            name: "achievements",
            label: "Logros (uno por línea)",
            type: "textarea",
          },
          {
            name: "battles",
            label: "Batallas (una por línea)",
            type: "textarea",
          },
          { name: "tags", label: "Tags (separados por comas)", type: "text" },
          { name: "image", label: "URL de Imagen", type: "url" },
        ];
      case "events":
        return [
          { name: "year", label: "Año", type: "number", required: true },
          { name: "title", label: "Título", type: "text", required: true },
          {
            name: "description",
            label: "Descripción",
            type: "textarea",
            required: true,
          },
          {
            name: "category",
            label: "Categoría",
            type: "select",
            options: ["Guerra", "Política", "Fundación", "Reinado"],
            required: true,
          },
          {
            name: "period",
            label: "Período",
            type: "select",
            options: ["ancient", "classical", "hellenistic", "roman"],
            required: true,
          },
          { name: "location", label: "Ubicación", type: "text" },
          {
            name: "participants",
            label: "Participantes (uno por línea)",
            type: "textarea",
          },
          {
            name: "consequences",
            label: "Consecuencias (una por línea)",
            type: "textarea",
          },
          { name: "tags", label: "Tags (separados por comas)", type: "text" },
        ];
      case "locations":
        return [
          { name: "name", label: "Nombre", type: "text", required: true },
          { name: "coordinates", label: "Coordenadas", type: "text" },
          {
            name: "description",
            label: "Descripción",
            type: "textarea",
            required: true,
          },
          {
            name: "type",
            label: "Tipo",
            type: "select",
            options: ["capital", "city", "battle", "monument"],
            required: true,
          },
          {
            name: "period",
            label: "Período",
            type: "select",
            options: ["ancient", "classical", "hellenistic", "roman"],
            required: true,
          },
          {
            name: "events",
            label: "Eventos (uno por línea)",
            type: "textarea",
          },
          {
            name: "importance",
            label: "Importancia Histórica",
            type: "textarea",
          },
          { name: "tags", label: "Tags (separados por comas)", type: "text" },
        ];
      case "mythologies":
        return [
          { name: "title", label: "Título", type: "text", required: true },
          {
            name: "culture",
            label: "Cultura",
            type: "select",
            options: ["greek", "roman", "egyptian", "norse", "mesopotamian"],
            required: true,
          },
          {
            name: "category",
            label: "Categoría",
            type: "text",
            required: true,
          },
          {
            name: "description",
            label: "Descripción",
            type: "textarea",
            required: true,
          },
          {
            name: "characters",
            label: "Personajes (uno por línea)",
            type: "textarea",
          },
          { name: "themes", label: "Temas (uno por línea)", type: "textarea" },
          { name: "moralLesson", label: "Lección Moral", type: "textarea" },
          { name: "tags", label: "Tags (separados por comas)", type: "text" },
        ];
      case "concepts":
        return [
          { name: "name", label: "Nombre", type: "text", required: true },
          {
            name: "definition",
            label: "Definición",
            type: "textarea",
            required: true,
          },
          {
            name: "period",
            label: "Período",
            type: "select",
            options: ["ancient", "classical", "hellenistic", "roman"],
            required: true,
          },
          {
            name: "relatedFigures",
            label: "Figuras Relacionadas (una por línea)",
            type: "textarea",
          },
          {
            name: "keyFeatures",
            label: "Características Clave (una por línea)",
            type: "textarea",
          },
          {
            name: "modernRelevance",
            label: "Relevancia Moderna",
            type: "textarea",
          },
          { name: "tags", label: "Tags (separados por comas)", type: "text" },
        ];
      case "religions":
        return [
          { name: "name", label: "Nombre", type: "text", required: true },
          {
            name: "civilization",
            label: "Civilización",
            type: "select",
            options: [
              "greek",
              "roman",
              "egyptian",
              "mesopotamian",
              "persian",
              "celtic",
              "norse",
              "hebrew",
            ],
            required: true,
          },
          {
            name: "type",
            label: "Tipo",
            type: "select",
            options: [
              "polytheistic",
              "monotheistic",
              "dualistic",
              "mystery",
              "philosophical",
            ],
            required: true,
          },
          { name: "period", label: "Período", type: "text", required: true },
          {
            name: "description",
            label: "Descripción",
            type: "textarea",
            required: true,
          },
          {
            name: "mainDeities",
            label: "Principales Deidades (una por línea)",
            type: "textarea",
          },
          {
            name: "keyBeliefs",
            label: "Creencias Principales (una por línea)",
            type: "textarea",
          },
          {
            name: "rituals",
            label: "Rituales (uno por línea)",
            type: "textarea",
          },
          {
            name: "sacredPlaces",
            label: "Lugares Sagrados (uno por línea)",
            type: "textarea",
          },
          {
            name: "influence",
            label: "Influencia Histórica",
            type: "textarea",
          },
          { name: "modernLegacy", label: "Legado Moderno", type: "textarea" },
          { name: "tags", label: "Tags (separados por comas)", type: "text" },
        ];
      default:
        return [];
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "characters":
        return characters;
      case "events":
        return events;
      case "locations":
        return locations;
      case "mythologies":
        return mythologies;
      case "concepts":
        return concepts;
      case "religions":
        return religions;
      default:
        return [];
    }
  };

  const handleAdd = () => {
    const fields = getFormFields(activeTab);
    const newItem = {};
    fields.forEach((field) => {
      if (
        field.type === "textarea" &&
        (field.name === "achievements" ||
          field.name === "battles" ||
          field.name === "participants" ||
          field.name === "consequences" ||
          field.name === "events" ||
          field.name === "characters" ||
          field.name === "themes" ||
          field.name === "relatedFigures" ||
          field.name === "keyFeatures")
      ) {
        newItem[field.name] = [];
      } else if (field.name === "tags") {
        newItem[field.name] = [];
      } else {
        newItem[field.name] = field.type === "number" ? 0 : "";
      }
    });
    setEditingItem(newItem);
    setIsEditing(true);
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setIsEditing(true);
  };

  const handleSave = () => {
    const newId = editingItem.id || Date.now();
    const itemToSave = { ...editingItem, id: newId };

    // Process array fields
    [
      "achievements",
      "battles",
      "participants",
      "consequences",
      "events",
      "characters",
      "themes",
      "relatedFigures",
      "keyFeatures",
    ].forEach((field) => {
      if (typeof itemToSave[field] === "string") {
        itemToSave[field] = itemToSave[field]
          .split("\n")
          .filter((item) => item.trim());
      }
    });

    // Process tags
    if (typeof itemToSave.tags === "string") {
      itemToSave.tags = itemToSave.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
    }

    switch (activeTab) {
      case "characters":
        if (editingItem.id) {
          setCharacters(
            characters.map((c) => (c.id === editingItem.id ? itemToSave : c))
          );
        } else {
          setCharacters([...characters, itemToSave]);
        }
        break;
      case "events":
        if (editingItem.id) {
          setEvents(
            events.map((e) => (e.id === editingItem.id ? itemToSave : e))
          );
        } else {
          setEvents([...events, itemToSave]);
        }
        break;
      case "locations":
        if (editingItem.id) {
          setLocations(
            locations.map((l) => (l.id === editingItem.id ? itemToSave : l))
          );
        } else {
          setLocations([...locations, itemToSave]);
        }
        break;
      case "mythologies":
        if (editingItem.id) {
          setMythologies(
            mythologies.map((m) => (m.id === editingItem.id ? itemToSave : m))
          );
        } else {
          setMythologies([...mythologies, itemToSave]);
        }
        break;
      case "concepts":
        if (editingItem.id) {
          setConcepts(
            concepts.map((c) => (c.id === editingItem.id ? itemToSave : c))
          );
        } else {
          setConcepts([...concepts, itemToSave]);
        }
        break;
      case "religions":
        if (editingItem.id) {
          setReligions(
            religions.map((r) => (r.id === editingItem.id ? itemToSave : r))
          );
        } else {
          setReligions([...religions, itemToSave]);
        }
        break;
    }

    setIsEditing(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      switch (activeTab) {
        case "characters":
          setCharacters(characters.filter((c) => c.id !== id));
          break;
        case "events":
          setEvents(events.filter((e) => e.id !== id));
          break;
        case "locations":
          setLocations(locations.filter((l) => l.id !== id));
          break;
        case "mythologies":
          setMythologies(mythologies.filter((m) => m.id !== id));
          break;
        case "concepts":
          setConcepts(concepts.filter((c) => c.id !== id));
          break;
      }
    }
  };

  const handleInputChange = (field, value) => {
    setEditingItem({ ...editingItem, [field]: value });
  };

  const exportData = () => {
    const data = {
      characters,
      events,
      locations,
      mythologies,
      concepts,
      religions,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `historia-antigua-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.characters) setCharacters(data.characters);
          if (data.events) setEvents(data.events);
          if (data.locations) setLocations(data.locations);
          if (data.mythologies) setMythologies(data.mythologies);
          if (data.concepts) setConcepts(data.concepts);
          if (data.religions) setReligions(data.religions);
          alert("Datos importados correctamente");
        } catch (error) {
          alert("Error al importar los datos");
        }
      };
      reader.readAsText(file);
    }
  };

  const renderDataTable = () => {
    const data = getCurrentData();
    const currentTab = adminTabs.find((tab) => tab.id === activeTab);

    return (
      <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
        <div className="p-6 border-b border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`${currentTab.color} p-2 rounded-lg`}>
                <currentTab.icon size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800">
                  {currentTab.name}
                </h3>
                <p className="text-stone-600 text-sm">
                  {data.length} elementos
                </p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <Plus size={20} />
              <span>Agregar {currentTab.name.slice(0, -1)}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Nombre/Título
                </th>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Información
                </th>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-stone-800 font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-200">
              {data.map((item, index) => (
                <tr key={item.id} className="hover:bg-amber-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-stone-800">
                      {item.name || item.title}
                    </div>
                    <div className="text-sm text-stone-600">
                      {item.period || item.year || item.culture}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-stone-600 max-w-xs truncate">
                      {item.description || item.definition}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(item.tags || []).slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {(item.tags || []).length > 3 && (
                        <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs">
                          +{(item.tags || []).length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderEditForm = () => {
    const fields = getFormFields(activeTab);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-amber-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-stone-800">
                {editingItem.id ? "Editar" : "Agregar"}{" "}
                {adminTabs
                  .find((tab) => tab.id === activeTab)
                  ?.name.slice(0, -1)}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-stone-500 hover:text-stone-700"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label className="block text-stone-700 font-medium mb-2">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === "select" ? (
                    <select
                      value={editingItem[field.name] || ""}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                      className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required={field.required}
                    >
                      <option value="">Seleccionar...</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={
                        Array.isArray(editingItem[field.name])
                          ? editingItem[field.name].join("\n")
                          : editingItem[field.name] || ""
                      }
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                      rows={
                        field.name === "description" ||
                        field.name === "definition"
                          ? 4
                          : 6
                      }
                      className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={
                        field.name === "tags" &&
                        Array.isArray(editingItem[field.name])
                          ? editingItem[field.name].join(", ")
                          : editingItem[field.name] || ""
                      }
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                      className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex space-x-4 mt-8 pt-6 border-t border-amber-200">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                <Save size={20} />
                <span>Guardar</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 bg-stone-600 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors font-medium"
              >
                <X size={20} />
                <span>Cancelar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (activeTab === "settings") {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-stone-600 p-2 rounded-lg">
              <Settings size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-800">
                Configuración del Sistema
              </h3>
              <p className="text-stone-600">
                Gestiona la configuración y datos de la aplicación
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-stone-800">
                Gestión de Datos
              </h4>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h5 className="font-semibold text-stone-800 mb-2">
                  Exportar Datos
                </h5>
                <p className="text-stone-600 text-sm mb-3">
                  Descarga una copia de seguridad de todos tus datos en formato
                  JSON
                </p>
                <button
                  onClick={exportData}
                  className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <Download size={16} />
                  <span>Exportar Datos</span>
                </button>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-stone-800 mb-2">
                  Importar Datos
                </h5>
                <p className="text-stone-600 text-sm mb-3">
                  Restaura datos desde un archivo de respaldo JSON
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-stone-800">Estadísticas</h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {characters.length}
                  </div>
                  <div className="text-stone-600 text-sm">Personajes</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {events.length}
                  </div>
                  <div className="text-stone-600 text-sm">Eventos</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {locations.length}
                  </div>
                  <div className="text-stone-600 text-sm">Lugares</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">
                    {mythologies.length}
                  </div>
                  <div className="text-stone-600 text-sm">Mitologías</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">
                    {religions.length}
                  </div>
                  <div className="text-stone-600 text-sm">Religiones</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-amber-600 p-2 rounded-lg">
            <Database size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Panel de Administración
            </h3>
            <p className="text-stone-600">
              Gestiona toda la información histórica de tu biblioteca
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {adminTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? `${tab.color} text-white`
                    : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                }`}
              >
                <IconComponent size={16} />
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Data Table */}
      {renderDataTable()}

      {/* Edit Modal */}
      {isEditing && renderEditForm()}
    </div>
  );
};

export default Admin;
