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

  it("deve retornar 400 se o ID do Z-PRO (ticketZpro) não for informado", async () => {
    const response = await request(app)
      .post("/atendimentos")
      .set("Cookie", adminCookie)
      .send({
        protocolo: "PROTOCOLO-SEM-ZPRO",
        cnpj: "03604844000210",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("ticketZpro");
  });

  it("deve criar um atendimento com sucesso mesmo sem informar o CNPJ (CNPJ opcional)", async () => {
    const response = await request(app)
      .post("/atendimentos")
      .set("Cookie", adminCookie)
      .send({
        ticket_zpro: "ZPRO-SEM-CNPJ-123",
        nome_contato: "Cliente Sem CNPJ",
      });

    expect(response.status).toBe(201);
    expect(response.body.ticketZpro).toBe("ZPRO-SEM-CNPJ-123");
    expect(response.body.cnpj).toBeNull();
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

  it("deve rejeitar criação com protocolo duplicado", async () => {
    const response = await request(app)
      .post("/atendimentos")
      .set("Cookie", adminCookie)
      .send({
        ticket_zpro: "ZPRO-DUPLICADO-999",
        cnpj: "03604844000210",
        protocolo: protocoloTeste, // Protocolo já cadastrado
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("Já existe um atendimento registrado com este protocolo");
  });

  it("deve integrar perfeitamente com a distribuição: atualizar dados sem perder o atendente já atribuído", async () => {
    const ticketDist = "TICKET-DIST-12345";

    // 1. Simular atendimento criado pela distribuição
    await prisma.atendimento.create({
      data: {
        ticketZpro: ticketDist,
        atendente: "Gabriel",
        cnpj: "00000000000",
        sincronizado: false,
      },
    });

    // 2. n8n envia os dados completos do atendimento depois
    const response = await request(app)
      .post("/atendimentos")
      .set("Cookie", adminCookie)
      .send({
        ticket_zpro: ticketDist,
        cliente_id: "CLI-999",
        cnpj: "11222333000144",
        nome_contato: "Contato Final",
        tipo_atendimento: "N1-Suporte",
      });

    expect(response.status).toBe(201);
    expect(response.body.ticketZpro).toBe(ticketDist);
    // Atendente 'Gabriel' deve ser preservado!
    expect(response.body.atendente).toBe("Gabriel");
    expect(response.body.cnpj).toBe("11222333000144");
    expect(response.body.nomeContato).toBe("Contato Final");
  });

  it("deve listar os atendimentos com paginação e filtros", async () => {
    const response = await request(app)
      .get("/atendimentos?page=1&limit=10&cnpj=11222333000144")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("pagination");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].ticketZpro).toBe("TICKET-DIST-12345");
  });

  it("deve consultar atendimentos por analista específico", async () => {
    const response = await request(app)
      .get("/atendimentos/analista/Gabriel")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.some((a: any) => a.atendente === "Gabriel")).toBe(true);
  });

  it("deve obter métricas consolidadas dos atendimentos", async () => {
    const response = await request(app)
      .get("/atendimentos/metrics")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("metrics");
    expect(response.body.metrics.total).toBeGreaterThanOrEqual(1);
    expect(response.body).toHaveProperty("porAnalista");
    expect(Array.isArray(response.body.porAnalista)).toBe(true);
  });
});
