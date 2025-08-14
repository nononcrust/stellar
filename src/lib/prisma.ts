import { StellarFormField } from "@/features/form/schema";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * @see https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help#recommended-solution
 */
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

declare global {
  namespace PrismaJson {
    type Fields = StellarFormField[];
    type Answers = Record<string, unknown>;
  }
}
