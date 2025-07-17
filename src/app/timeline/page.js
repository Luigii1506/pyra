/**
 * Timeline Page
 * Historical timelines management and visualization
 * @created 2024-12-19
 */

import React from "react";
import Timeline from "../../components/Timeline";

export const metadata = {
  title: "Líneas del Tiempo - Historia Antigua",
  description:
    "Explora cronologías y eventos históricos organizados temporalmente",
  keywords:
    "líneas de tiempo, cronología, eventos históricos, historia antigua",
};

export default function TimelinePage() {
  return <Timeline />;
}
