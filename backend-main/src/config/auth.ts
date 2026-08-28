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

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      id_atendente: {
        type: "string",
        required: false,
        input: true,
      },
      typeUser: {
        type: "string",
        required: false,
        defaultValue: "atendente",
        input: true,
      },
    },
  },
  secret,
  baseURL,
});
