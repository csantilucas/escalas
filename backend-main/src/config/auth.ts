import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./postgres.js";
import dotenv from "dotenv";

dotenv.config();

const secret =
  process.env.BETTER_AUTH_SECRET ||
  process.env.JWT_SECRET_ACCESS_TOKEN ||
  "default_auth_session_secret_key_12345";

const serverIp = process.env.SERVER_IP || process.env.HOST || "localhost";
const backendPort = process.env.BACKEND_PORT || process.env.PORT || "3001";
const frontendPort = process.env.FRONTEND_PORT || "5004";

const baseURL =
  process.env.BETTER_AUTH_URL ||
  `http://${serverIp}:${backendPort}`;

// Origens confiáveis carregadas via variável de ambiente ou construídas a partir de IP/Porta
const customOrigins = (process.env.CORS_ORIGINS || process.env.TRUSTED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const dynamicOrigins = [
  `http://${serverIp}:${frontendPort}`,
  `http://localhost:${frontendPort}`,
  `http://127.0.0.1:${frontendPort}`,
  `http://${serverIp}:${backendPort}`,
  `http://localhost:${backendPort}`,
  `http://127.0.0.1:${backendPort}`,
];

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    ...new Set([...customOrigins, ...dynamicOrigins]),
    "http://192.168.*:*",
    "http://10.*:*",
    "http://172.*:*",
    "http://localhost:*",
    "http://127.0.0.1:*",
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
  },
  user: {
    additionalFields: {
      id_atendente: {
        type: "string",
        required: false,
        input: true,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "atendente",
        input: true,
      },
      equipe: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  secret,
  baseURL,
  advanced: {
    useSecureCookies: false,
  },
});

export default auth;
