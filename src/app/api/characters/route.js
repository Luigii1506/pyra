/**
 * Characters API Routes
 * Handles CRUD operations for historical figures
 * @created 2024-12-19
 */

import { NextResponse } from "next/server";
import { CharacterService } from "../../../server/services/character-service.js";
import { handleApiError } from "../../../lib/utils.js";

/**
 * GET /api/characters
 * Obtiene lista de personajes históricos con paginación y filtros
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const options = {
      page: parseInt(searchParams.get("page")) || 1,
      limit: parseInt(searchParams.get("limit")) || 20,
      category: searchParams.get("category") || null,
      search: searchParams.get("search") || null,
      sortBy: searchParams.get("sortBy") || "name",
      sortOrder: searchParams.get("sortOrder") || "asc",
    };

    const result = await CharacterService.getAllCharacters(options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/characters:", error);
    const errorMessage = handleApiError(error);

    return NextResponse.json(
      {
        error: "Error al obtener personajes históricos",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/characters
 * Crea un nuevo personaje histórico
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validación básica
    if (!body.name || !body.biography) {
      return NextResponse.json(
        {
          error: "Datos requeridos faltantes",
          message: "El nombre y la biografía son requeridos",
        },
        { status: 400 }
      );
    }

    const character = await CharacterService.createCharacter(body);

    return NextResponse.json(character, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/characters:", error);
    const errorMessage = handleApiError(error);

    // Manejar errores específicos
    if (error.message.includes("Ya existe un personaje")) {
      return NextResponse.json(
        {
          error: "Personaje duplicado",
          message: error.message,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: "Error al crear personaje histórico",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
