"use client";
import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  Tag,
  Calendar,
  BookOpen,
  Star,
  Filter,
} from "lucide-react";

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Análisis de la Batalla de Cannae",
      content:
        "La estrategia de Aníbal en Cannae (216 a.C.) representa uno de los ejemplos más brillantes de táctica militar en la historia. La formación en doble envolvimiento...",
      tags: ["Aníbal", "Estrategia", "Guerra Púnica"],
      category: "Militar",
      date: "2024-01-15",
      lastModified: "2024-01-15",
      favorite: true,
    },
    {
      id: 2,
      title: "Notas sobre la Filosofía Estoica",
      content:
        "Los principios fundamentales del estoicismo según Marco Aurelio y Séneca. La importancia de la virtud como único bien verdadero y la aceptación del destino...",
      tags: ["Filosofía", "Estoicismo", "Marco Aurelio"],
      category: "Filosofía",
      date: "2024-01-10",
      lastModified: "2024-01-12",
      favorite: false,
    },
    {
      id: 3,
      title: "Comparación: Democracia Ateniense vs República Romana",
      content:
        "Análisis comparativo de los sistemas políticos. Atenas: democracia directa limitada a ciudadanos. Roma: sistema republicano con checks and balances...",
      tags: ["Democracia", "República", "Política"],
      category: "Política",
      date: "2024-01-08",
      lastModified: "2024-01-08",
      favorite: true,
    },
    {
      id: 4,
      title: "Simbolismo en la Mitología Griega",
      content:
        "Los mitos griegos como reflejo de la condición humana. Prometeo y el conocimiento prohibido, Pandora y la curiosidad, Sísifo y la perseverancia...",
      tags: ["Mitología", "Simbolismo", "Grecia"],
      category: "Cultura",
      date: "2024-01-05",
      lastModified: "2024-01-07",
      favorite: false,
    },
    {
      id: 5,
      title: "Cronología del Declive Romano",
      content:
        "Factores que contribuyeron al declive del Imperio Romano: crisis del siglo III, divisiones del imperio, invasiones bárbaras, factores económicos...",
      tags: ["Imperio Romano", "Declive", "Historia"],
      category: "Historia",
      date: "2024-01-03",
      lastModified: "2024-01-06",
      favorite: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });

  const categories = [
    "all",
    "Militar",
    "Filosofía",
    "Política",
    "Cultura",
    "Historia",
  ];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      searchTerm === "" ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleNewNote = () => {
    setEditForm({
      title: "",
      content: "",
      tags: "",
      category: "Historia",
    });
    setIsEditing(true);
    setSelectedNote(null);
  };

  const handleEditNote = (note) => {
    setEditForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
      category: note.category,
    });
    setIsEditing(true);
    setSelectedNote(note);
  };

  const handleSaveNote = () => {
    const now = new Date().toISOString().split("T")[0];
    const newNote = {
      id: selectedNote ? selectedNote.id : Date.now(),
      title: editForm.title,
      content: editForm.content,
      tags: editForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      category: editForm.category,
      date: selectedNote ? selectedNote.date : now,
      lastModified: now,
      favorite: selectedNote ? selectedNote.favorite : false,
    };

    if (selectedNote) {
      setNotes(
        notes.map((note) => (note.id === selectedNote.id ? newNote : note))
      );
    } else {
      setNotes([newNote, ...notes]);
    }

    setIsEditing(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const toggleFavorite = (noteId) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, favorite: !note.favorite } : note
      )
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800">
              Notas Personales
            </h3>
            <p className="text-stone-600">
              Organiza tus ideas y descubrimientos históricos
            </p>
          </div>
          <button
            onClick={handleNewNote}
            className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus size={20} />
            <span>Nueva Nota</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3 text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar en tus notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="text-stone-500" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-stone-700"
            >
              <option value="all">Todas las categorías</option>
              {categories.slice(1).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-stone-800 mb-2 line-clamp-2">
                  {note.title}
                </h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">
                    {note.category}
                  </span>
                  <span className="text-stone-500 text-xs">
                    {formatDate(note.date)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(note.id)}
                className={`p-1 rounded ${
                  note.favorite ? "text-amber-500" : "text-stone-400"
                }`}
              >
                <Star
                  size={16}
                  fill={note.favorite ? "currentColor" : "none"}
                />
              </button>
            </div>

            <p className="text-stone-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {note.content}
            </p>

            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-amber-200">
              <div className="flex items-center space-x-1 text-stone-500 text-xs">
                <Calendar size={12} />
                <span>Editado: {formatDate(note.lastModified)}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditNote(note)}
                  className="p-1 text-stone-600 hover:text-amber-600 transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="p-1 text-stone-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
        <h4 className="text-lg font-bold text-stone-800 mb-4">Estadísticas</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {notes.length}
            </div>
            <div className="text-stone-600 text-sm">Notas Totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {notes.filter((n) => n.favorite).length}
            </div>
            <div className="text-stone-600 text-sm">Favoritas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {new Set(notes.map((n) => n.category)).size}
            </div>
            <div className="text-stone-600 text-sm">Categorías</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {
                notes.filter(
                  (n) =>
                    n.lastModified === new Date().toISOString().split("T")[0]
                ).length
              }
            </div>
            <div className="text-stone-600 text-sm">Editadas Hoy</div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-stone-800">
                  {selectedNote ? "Editar Nota" : "Nueva Nota"}
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-stone-500 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Título de la nota..."
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Categoría
                </label>
                <select
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Tags (separados por comas)
                </label>
                <input
                  type="text"
                  value={editForm.tags}
                  onChange={(e) =>
                    setEditForm({ ...editForm, tags: e.target.value })
                  }
                  className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Historia, Roma, Política..."
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Contenido
                </label>
                <textarea
                  value={editForm.content}
                  onChange={(e) =>
                    setEditForm({ ...editForm, content: e.target.value })
                  }
                  rows={10}
                  className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Escribe tu nota aquí..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSaveNote}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Guardar Nota
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-stone-600 text-white py-3 rounded-lg hover:bg-stone-700 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
