/**
 * Search Suggestions API Route
 * Provides search suggestions for autocomplete functionality
 * @created 2024-12-19
 */

import { NextResponse } from "next/server";
import { SearchService } from "../../../../server/services/search-service.js";
import { handleApiError } from "../../../../lib/utils.js";

/**
 * GET /api/search/suggestions
 * Obtiene sugerencias de búsqueda para autocompletar
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const searchTerm = searchParams.get("q");

    if (!searchTerm || searchTerm.trim().length < 2) {
      return NextResponse.json([], { status: 200 });
    }

    const limit = parseInt(searchParams.get("limit")) || 10;

    const suggestions = await SearchService.getSearchSuggestions(
      searchTerm.trim(),
      limit
    );

    return NextResponse.json(suggestions, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/search/suggestions:", error);
    const errorMessage = handleApiError(error);

    return NextResponse.json(
      {
        error: "Error al obtener sugerencias de búsqueda",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
