/**
 * Main Layout Component
 * Shared layout with navigation sidebar for all pages
 * @created 2024-12-19
 */

"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  BookOpen,
  Map,
  Clock,
  Users,
  Crown,
  Edit3,
  Tag,
  Target,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation.js";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Definir secciones con sus rutas
  const sections = [
    { id: "dashboard", name: "Dashboard", icon: BookOpen, href: "/" },
    {
      id: "timeline",
      name: "Líneas del Tiempo",
      icon: Clock,
      href: "/timeline",
    },
    { id: "maps", name: "Mapas Históricos", icon: Map, href: "/maps" },
    { id: "characters", name: "Personajes", icon: Users, href: "/characters" },
    {
      id: "mythologies",
      name: "Mitologías",
      icon: Crown,
      href: "/mythologies",
    },
    { id: "religions", name: "Religiones", icon: Crown, href: "/religions" },
    { id: "search", name: "Búsqueda", icon: Search, href: "/search" },
    { id: "notes", name: "Notas", icon: Edit3, href: "/notes" },
    { id: "exams", name: "Exámenes", icon: Target, href: "/exams" },
    { id: "study", name: "Estudio Activo", icon: BookOpen, href: "/study" },
    { id: "places", name: "Lugares Históricos", icon: Map, href: "/places" },
    {
      id: "connections",
      name: "Conexiones Históricas",
      icon: Users,
      href: "/connections",
    },
    { id: "admin", name: "Administración", icon: Tag, href: "/admin" },
  ];

  // Encontrar la sección activa basada en la ruta actual
  const activeSection =
    sections.find((section) => section.href === pathname) || sections[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className={`
        ${
          isMobile
            ? isSidebarOpen
              ? "fixed inset-0 z-50 w-full"
              : "hidden"
            : isSidebarOpen
            ? "w-64"
            : "w-16"
        } 
        bg-gradient-to-b from-amber-900 to-stone-800 text-amber-50 transition-all duration-300 flex flex-col shadow-2xl
        ${isMobile ? "md:relative md:w-64" : ""}
      `}
      >
        {/* Header */}
        <div className="p-3 md:p-4 border-b border-amber-700">
          <div className="flex items-center justify-between">
            {(isSidebarOpen || !isMobile) && (
              <div>
                <h1 className="text-lg md:text-xl font-bold text-amber-200">
                  Historia Antigua
                </h1>
                <p className="text-xs md:text-sm text-amber-400">
                  Biblioteca Personal
                </p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-amber-800 transition-colors z-10"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <Navigation
          sections={sections}
          activeSection={activeSection.id}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
          onSectionSelect={() => isMobile && setIsSidebarOpen(false)}
        />

        {/* Footer */}
        {(isSidebarOpen || !isMobile) && (
          <div className="p-3 md:p-4 mt-auto border-t border-amber-700">
            <p className="text-xs text-amber-400 text-center md:text-left">
              &ldquo;La historia es la maestra de la vida&rdquo; - Cicerón
            </p>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-amber-200 p-3 md:p-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              {/* Botón de menú móvil */}
              {isMobile && !isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-amber-100 transition-colors mr-2 inline-flex"
                >
                  <Menu size={20} className="text-stone-600" />
                </button>
              )}
              <h2 className="text-lg md:text-2xl font-bold text-stone-800">
                {activeSection.name}
              </h2>
              <p className="text-stone-600 text-xs md:text-sm hidden sm:block">
                Explora los misterios de la historia antigua
              </p>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-amber-100 px-2 md:px-3 py-1 rounded-full">
                <Tag size={14} className="text-amber-700" />
                <span className="text-xs md:text-sm text-amber-800">
                  Edad Antigua
                </span>
              </div>
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs md:text-sm">
                  H
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-amber-50 to-stone-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
