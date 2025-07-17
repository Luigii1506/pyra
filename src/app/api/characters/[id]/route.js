/**
 * Individual Character API Routes
 * Handles operations for specific historical figures by ID
 * @created 2024-12-19
 */

import { NextResponse } from "next/server";
import { CharacterService } from "../../../../server/services/character-service.js";
import { handleApiError } from "../../../../lib/utils.js";

/**
 * GET /api/characters/[id]
 * Obtiene un personaje histórico específico por ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          error: "ID requerido",
          message: "El ID del personaje es requerido",
        },
        { status: 400 }
      );
    }

    const character = await CharacterService.getCharacterById(id);

    if (!character) {
      return NextResponse.json(
        {
          error: "Personaje no encontrado",
          message: "No se encontró un personaje con el ID especificado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(character, { status: 200 });
  } catch (error) {
    console.error(`Error in GET /api/characters/${params?.id}:`, error);
    const errorMessage = handleApiError(error);

    return NextResponse.json(
      {
        error: "Error al obtener personaje histórico",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/characters/[id]
 * Actualiza un personaje histórico específico
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          error: "ID requerido",
          message: "El ID del personaje es requerido",
        },
        { status: 400 }
      );
    }

    // Validación básica de datos
    if (body.name && body.name.trim().length === 0) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          message: "El nombre no puede estar vacío",
        },
        { status: 400 }
      );
    }

    const updatedCharacter = await CharacterService.updateCharacter(id, body);

    return NextResponse.json(updatedCharacter, { status: 200 });
  } catch (error) {
    console.error(`Error in PUT /api/characters/${params?.id}:`, error);
    const errorMessage = handleApiError(error);

    // Manejar errores específicos
    if (error.message.includes("no encontrado")) {
      return NextResponse.json(
        {
          error: "Personaje no encontrado",
          message: error.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Error al actualizar personaje histórico",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/characters/[id]
 * Elimina un personaje histórico específico
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          error: "ID requerido",
          message: "El ID del personaje es requerido",
        },
        { status: 400 }
      );
    }

    const result = await CharacterService.deleteCharacter(id);

    if (result) {
      return NextResponse.json(
        {
          success: true,
          message: "Personaje histórico eliminado exitosamente",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Error al eliminar",
          message: "No se pudo eliminar el personaje histórico",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(`Error in DELETE /api/characters/${params?.id}:`, error);
    const errorMessage = handleApiError(error);

    // Manejar errores específicos
    if (error.message.includes("no encontrado")) {
      return NextResponse.json(
        {
          error: "Personaje no encontrado",
          message: error.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Error al eliminar personaje histórico",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
