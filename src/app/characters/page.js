/**
 * Characters Page
 * Historical figures management and exploration page
 * @created 2024-12-19
 */

import React from "react";
import Characters from "../../components/Characters";

export const metadata = {
  title: "Personajes Históricos - Historia Antigua",
  description: "Explora y gestiona personajes históricos de la antigüedad",
  keywords:
    "personajes históricos, figuras históricas, biografías, historia antigua",
};

export default function CharactersPage() {
  return <Characters />;
}
