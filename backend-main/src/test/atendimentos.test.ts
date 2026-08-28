import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import app from "../config/server.js";
import prisma from "../config/postgres.js";
import { setupTestUsers, clearDatabase } from "./helpers.js";

describe("Testes de Atendimentos", () => {
  let adminCookie: string;
  const protocoloTeste = "2026240712161110999";
  const ticketZproTeste = "ZPRO-99110";

  beforeAll(async () => {
    const setup = await setupTestUsers("atendimentos");
    adminCookie = setup.adminCookie;
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  it("deve criar um atendimento inicial não sincronizado com sucesso", async () => {
    const response = await request(app)
      .post("/atendimentos")
      .set("Cookie", adminCookie)
      .send({
        ticket_zpro: ticketZproTeste,
        cliente_id: "CLI-001",
        cnpj: "03604844000210",
        atendente: "Kariny Moreira",
        protocolo: protocoloTeste,
        nome_contato: "Cliente Teste LTDA",
        tipo_atendimento: "Suporte Técnico",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.ticketZpro).toBe(ticketZproTeste);
    expect(response.body.protocolo).toBe(protocoloTeste);
    expect(response.body.sincronizado).toBe(false);
  });

  it("deve retornar 400 se o campo obrigatório cnpj não for informado", async () => {
    const response = await request(app)
      .post("/atendimentos")
      .set("Cookie", adminCookie)
      .send({
        protocolo: "PROTOCOLO-SEM-CNPJ",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("cnpj");
  });

  it("deve atualizar o atendimento buscando pelo ticketZpro e marcar sincronizado=true", async () => {
    const response = await request(app)
      .patch("/atendimentos/atualizar")
      .set("Cookie", adminCookie)
      .send({
        ticket_zpro: ticketZproTeste,
        ticket_tomticket: "TOM-8854",
        tipo_atendimento: "Suporte Técnico N2",
        atendente: "Pedro Mittmann",
        status: "EM_ANDAMENTO",
      });

    expect(response.status).toBe(200);
    expect(response.body.ticketTomticket).toBe("TOM-8854");
    expect(response.body.atendente).toBe("Pedro Mittmann");
    expect(response.body.sincronizado).toBe(true);
  });

  it("deve retornar 400 se o ticketZpro não for informado na atualização", async () => {
    const response = await request(app)
      .patch("/atendimentos/atualizar")
      .set("Cookie", adminCookie)
      .send({
        ticket_tomticket: "TOM-8854",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("ticketZpro");
  });

  it("deve retornar 404 ao tentar atualizar um ticket_zpro que não existe", async () => {
    const response = await request(app)
      .patch("/atendimentos/atualizar")
      .set("Cookie", adminCookie)
      .send({
        ticket_zpro: "ZPRO_INEXISTENTE_99999",
        ticket_tomticket: "TOM-0000",
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toContain("não encontrado");
  });

  it("deve listar os atendimentos com paginação", async () => {
    const response = await request(app)
      .get("/atendimentos?page=1&limit=10")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("pagination");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.pagination.totalRecords).toBeGreaterThanOrEqual(1);
  });

  it("deve obter métricas consolidadas dos atendimentos", async () => {
    const response = await request(app)
      .get("/atendimentos/metrics")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("metrics");
    expect(response.body).toHaveProperty("porAnalista");
  });
});
