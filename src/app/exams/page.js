/**
 * Exams Page
 * Historical knowledge testing and assessment
 * @created 2024-12-19
 */

import React from "react";
import Exams from "../../components/Exams";

export const metadata = {
  title: "Exámenes - Historia Antigua",
  description:
    "Pon a prueba tus conocimientos de historia antigua con exámenes interactivos",
  keywords: "exámenes, pruebas, evaluación, conocimientos históricos",
};

export default function ExamsPage() {
  return <Exams />;
}
