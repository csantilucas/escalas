import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../../config/auth.js";
import userRoutes from "./userRoutes.js";
import plantaoRoutes from "./plantonistaRoutes.js";
import registroRoutes from "./registroRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import atendimentoRoutes from "./atendimentoRoutes.js";
import equipeRoutes from "./equipeRoutes.js";
import tokenRoutes from "./tokenRoutes.js";

const registerRoutes = (app: express.Application): void => {
  app.use(express.json());

  app.use((req, res, next) => {
    const defaultOrigins = [
      "http://localhost:3000",
      "http://localhost:5004",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5004",
      "http://192.168.1.9:5004",
      "http://192.168.1.9:3000",
    ];

    const envOrigins = process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
      : [];
    const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else if (!origin) {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:5004");
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }

    next();
  });

  // Better Auth Handler Oficial para todas as rotas de autenticação (/api/auth/*)
  app.all("/api/auth/*splat", toNodeHandler(auth));
  app.all("/api/auth", toNodeHandler(auth));

  // Rotas da aplicação
  app.use("/plantao", plantaoRoutes);
  app.use("/register", registroRoutes);
  app.use("/users", userRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/atendimentos", atendimentoRoutes);
  app.use("/equipes", equipeRoutes);
  app.use("/tokens", tokenRoutes);
};

export default registerRoutes;