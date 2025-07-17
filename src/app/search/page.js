/**
 * Search Page
 * Global search functionality across all content
 * @created 2024-12-19
 */

import React from "react";
import SearchComponent from "../../components/SearchComponent";

export const metadata = {
  title: "Búsqueda - Historia Antigua",
  description: "Busca en toda la biblioteca de contenido histórico",
  keywords: "búsqueda, contenido histórico, exploración",
};

export default function SearchPage() {
  return <SearchComponent />;
}
