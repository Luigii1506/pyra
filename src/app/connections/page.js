/**
 * Historical Connections Page
 * Relationships and connections between historical entities
 * @created 2024-12-19
 */

import React from "react";
import HistoricalConnections from "../../components/HistoricalConnections";

export const metadata = {
  title: "Conexiones Históricas - Historia Antigua",
  description:
    "Explora relaciones y conexiones entre personajes, eventos y lugares históricos",
  keywords:
    "conexiones históricas, relaciones, vínculos históricos, genealogías",
};

export default function ConnectionsPage() {
  return <HistoricalConnections />;
}
