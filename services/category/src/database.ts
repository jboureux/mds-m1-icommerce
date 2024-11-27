import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { __db: PrismaClient | undefined };

const db: PrismaClient = globalForPrisma.__db ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.__db = db;

export { db };
