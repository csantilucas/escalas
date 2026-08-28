import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import app from "../config/server.js";
import prisma from "../config/postgres.js";
import { setupTestUsers, clearDatabase } from "./helpers.js";

describe("Testes de Dashboard e Streaming SSE via Cookies", () => {
  let adminCookie: string;

  beforeAll(async () => {
    const setup = await setupTestUsers("dashboard");
    adminCookie = setup.adminCookie;
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  it("deve retornar a visão geral consolidada do dashboard autenticado por cookie", async () => {
    const response = await request(app)
      .get("/dashboard/overview")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("atendimentos");
    expect(response.body).toHaveProperty("equipes");
    expect(response.body).toHaveProperty("usuarios");
    expect(response.body).toHaveProperty("sse");
    expect(response.body.sse).toHaveProperty("connectedClients");
  });

  it("deve rejeitar busca de relatório da Alpha sem datas obrigatórias (400)", async () => {
    const response = await request(app)
      .get("/dashboard/tickets")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("obrigatórios");
  });

  it("deve buscar o relatório da Alpha passando datas válidas", async () => {
    const response = await request(app)
      .get("/dashboard/tickets?startDate=2026-07-15&endDate=2026-07-15")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("deve autenticar e aceitar a conexão SSE via cookie de sessão ou query com cabeçalho text/event-stream", async () => {
    const server = app.listen(0);
    const port = (server.address() as any).port;
    const controller = new AbortController();

    const cookieHeader = Array.isArray(adminCookie) ? adminCookie.join("; ") : String(adminCookie);

    try {
      const res = await fetch(`http://127.0.0.1:${port}/dashboard/stream`, {
        headers: {
          Cookie: cookieHeader,
        },
        signal: controller.signal,
      });
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toContain("text/event-stream");
      controller.abort();
    } finally {
      server.close();
    }
  });
});
