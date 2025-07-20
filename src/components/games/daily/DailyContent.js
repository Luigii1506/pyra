/**
 * DailyContent Component
 * Componente principal simplificado para el contenido histórico diario
 * @created 2024-12-19
 */

import React from "react";
import useDailyContent from "./useDailyContent.js";
import { DailyDisplay } from "./components/index.js";

/**
 * Componente principal de contenido histórico diario
 */
const DailyContent = ({ onClose }) => {
  // Usar el hook personalizado para obtener todo el estado y funcionalidad
  const daily = useDailyContent();

  return (
    <DailyDisplay
      // Props del estado principal
      dateInfo={daily.date}
      currentContent={daily.currentContent}
      isLoading={daily.isLoading}
      // Props de filtros y vistas
      activeView={daily.activeView}
      activeFilter={daily.activeFilter}
      searchTerm={daily.searchTerm}
      sortBy={daily.sortBy}
      expandedContent={daily.expandedContent}
      // Props de gamificación
      streak={daily.streak}
      motivationalMessage={daily.motivationalMessage}
      stats={daily.stats}
      // Funciones de acción
      actions={daily.actions}
      queries={daily.queries}
      // Props adicionales
      onBack={onClose}
      showHeader={true}
    />
  );
};

export default DailyContent;
