// src/config/server.ts
import "reflect-metadata";
import { connectPostgres } from "./postgres.js";
import express from "express";
import registerRoutes from "../app/routes/Routes.js";
import { syncExternalTokens } from "./tokenSync.js";

const app = express();
app.use(express.json());
registerRoutes(app);

export async function bootstrap() {
  await connectPostgres();
  await syncExternalTokens();
}

export default app;