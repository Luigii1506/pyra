/**
 * Prisma Client Configuration
 * Initializes and exports a singleton instance of PrismaClient
 * @created 2024-12-19
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
