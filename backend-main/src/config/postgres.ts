// src/config/postgres.ts
import dotenv from "dotenv";
import { PrismaClient } from "../../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();

if (!process.env.POSTGRES_USER) {
  throw new Error("Verifique a variável de ambiente POSTGRES_USER");
}
if (!process.env.POSTGRES_PASSWORD) {
  throw new Error("Verifique a variável de ambiente POSTGRES_PASSWORD");
}
if (!process.env.POSTGRES_HOST) {
  throw new Error("Verifique a variável de ambiente POSTGRES_HOST");
}
if (!process.env.POSTGRES_DB) {
  throw new Error("Verifique a variável de ambiente POSTGRES_DB");
}

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const dbName = process.env.POSTGRES_DB;

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${user}:${password}@${host}:5432/${dbName}?schema=public`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export async function connectPostgres() {

  try {
    await prisma.$connect();
    console.log("PostgreSQL conectado");
    return prisma;
  }
  catch (error) {
    console.error("❌ Erro ao conectar no banco de dados:", error);
    process.exit(1);
  }
}

export default prisma;