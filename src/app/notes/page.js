/**
 * Notes Page
 * Personal notes and annotations management
 * @created 2024-12-19
 */

import React from "react";
import Notes from "../../components/Notes";

export const metadata = {
  title: "Notas - Historia Antigua",
  description:
    "Gestiona tus notas personales y anotaciones sobre contenido histórico",
  keywords: "notas personales, anotaciones, apuntes, estudio",
};

export default function NotesPage() {
  return <Notes />;
}
