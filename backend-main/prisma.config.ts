// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

if (!process.env["POSTGRES_USER"]) {
  throw new Error("Verifique a variável de ambiente POSTGRES_USER");
}
if (!process.env["POSTGRES_PASSWORD"]) {
  throw new Error("Verifique a variável de ambiente POSTGRES_PASSWORD");
}
if (!process.env["POSTGRES_HOST"]) {
  throw new Error("Verifique a variável de ambiente POSTGRES_HOST");
}
if (!process.env["POSTGRES_DB"]) {
  throw new Error("Verifique a variável de ambiente POSTGRES_DB");
}

const user = process.env["POSTGRES_USER"];
const password = process.env["POSTGRES_PASSWORD"];
const dbName = process.env["POSTGRES_DB"];
const host = process.env["POSTGRES_HOST"];

const connectionUrl =
  process.env["DATABASE_URL"] ||
  `postgresql://${user}:${password}@${host}:5432/${dbName}?schema=public`;

export default defineConfig({
  schema: "prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx ./src/seed/seed.ts",
  },
  datasource: {
    url: connectionUrl,
  },
});
