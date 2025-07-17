/**
 * Global Search API Route
 * Handles global search across all entities
 * @created 2024-12-19
 */

import { NextResponse } from "next/server";
import { SearchService } from "../../../../server/services/search-service.js";
import { handleApiError } from "../../../../lib/utils.js";

/**
 * GET /api/search/global
 * Realiza una búsqueda global en todas las entidades
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const searchTerm = searchParams.get("q");

    if (!searchTerm || searchTerm.trim().length === 0) {
      return NextResponse.json(
        {
          error: "Término de búsqueda requerido",
          message: "Debe proporcionar un término de búsqueda",
        },
        { status: 400 }
      );
    }

    if (searchTerm.trim().length < 2) {
      return NextResponse.json(
        {
          error: "Término de búsqueda muy corto",
          message: "El término de búsqueda debe tener al menos 2 caracteres",
        },
        { status: 400 }
      );
    }

    const options = {
      includeCharacters: searchParams.get("includeCharacters") !== "false",
      includeReligions: searchParams.get("includeReligions") !== "false",
      includeMyths: searchParams.get("includeMyths") !== "false",
      includePlaces: searchParams.get("includePlaces") !== "false",
      includeTimelines: searchParams.get("includeTimelines") !== "false",
      includeExams: searchParams.get("includeExams") !== "false",
      includeNotes: searchParams.get("includeNotes") !== "false",
      userId: searchParams.get("userId") || null,
      limit: parseInt(searchParams.get("limit")) || 50,
    };

    const results = await SearchService.globalSearch(
      searchTerm.trim(),
      options
    );

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/search/global:", error);
    const errorMessage = handleApiError(error);

    return NextResponse.json(
      {
        error: "Error al realizar búsqueda global",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
