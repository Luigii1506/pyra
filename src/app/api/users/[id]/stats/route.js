/**
 * User Stats API Route
 * Handles user statistics and analytics
 * @created 2024-12-19
 */

import { NextResponse } from "next/server";
import { UserService } from "../../../../../server/services/user-service.js";
import { handleApiError } from "../../../../../lib/utils.js";

/**
 * GET /api/users/[id]/stats
 * Obtiene las estadísticas de un usuario específico
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          error: "ID requerido",
          message: "El ID del usuario es requerido",
        },
        { status: 400 }
      );
    }

    const userStats = await UserService.getUserStats(id);

    if (!userStats) {
      return NextResponse.json(
        {
          error: "Usuario no encontrado",
          message: "No se encontró un usuario con el ID especificado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(userStats, { status: 200 });
  } catch (error) {
    console.error(`Error in GET /api/users/${params?.id}/stats:`, error);
    const errorMessage = handleApiError(error);

    return NextResponse.json(
      {
        error: "Error al obtener estadísticas del usuario",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
