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
    const envOrigins = (process.env.CORS_ORIGINS || process.env.TRUSTED_ORIGINS || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);

    const origin = req.headers.origin;

    const isAllowedOrigin = (orig: string): boolean => {
      if (envOrigins.includes(orig)) return true;
      try {
        const url = new URL(orig);
        const host = url.hostname;
        // Permite localhost e loopback
        if (host === "localhost" || host === "127.0.0.1") return true;
        // Permite faixas de IP locais de rede (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
        if (
          /^192\.168\.\d{1,3}\.\d{1,3}$/.test(host) ||
          /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host) ||
          /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(host)
        ) {
          return true;
        }
      } catch {}
      return false;
    };

    if (origin && isAllowedOrigin(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else if (origin && envOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else if (!origin) {
      res.setHeader("Access-Control-Allow-Origin", envOrigins[0] || "*");
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");

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