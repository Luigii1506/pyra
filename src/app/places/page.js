/**
 * Historical Places Page
 * Ancient locations and archaeological sites exploration
 * @created 2024-12-19
 */

import React from "react";
import HistoricalPlaces from "../../components/HistoricalPlaces";

export const metadata = {
  title: "Lugares Históricos - Historia Antigua",
  description:
    "Explora sitios arqueológicos, ciudades antiguas y lugares históricos significativos",
  keywords:
    "lugares históricos, sitios arqueológicos, ciudades antiguas, monumentos",
};

export default function PlacesPage() {
  return <HistoricalPlaces />;
}
