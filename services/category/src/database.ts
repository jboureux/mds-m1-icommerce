import { PrismaClient } from '@prisma/client';

const db: PrismaClient = global.__db || new PrismaClient();

declare global {
  let __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = db;
}

export { db };
