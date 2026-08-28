import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./postgres.js";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.BETTER_AUTH_SECRET && !process.env.JWT_SECRET_ACCESS_TOKEN) {
  throw new Error("Verifique a variável de ambiente BETTER_AUTH_SECRET ou JWT_SECRET_ACCESS_TOKEN");
}

const secret = process.env.BETTER_AUTH_SECRET || process.env.JWT_SECRET_ACCESS_TOKEN!;
const baseURL =
  process.env.BETTER_AUTH_URL ||
  `http://${process.env.HOST || "localhost"}:${process.env.PORT || 3001}`;

// Origens confiáveis carregadas via variável de ambiente (CORS_ORIGINS ou TRUSTED_ORIGINS)
const envTrustedOrigins = (process.env.CORS_ORIGINS || process.env.TRUSTED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    ...envTrustedOrigins,
    "http://192.168.*:*",
    "http://10.*:*",
    "http://172.*:*",
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
        defaultValue: "comum",
        input: true,
      },
      typeUser: {
        type: "string",
        required: false,
        defaultValue: "atendente",
        input: true,
      },
      isPlantonista: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: true,
      },
      posicao: {
        type: "number",
        required: false,
        defaultValue: 0,
        input: true,
      },
    },
  },
  secret,
  baseURL,
});
