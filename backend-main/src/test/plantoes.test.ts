import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import app from "../config/server.js";
import prisma from "../config/postgres.js";
import { setupTestUsers, clearDatabase } from "./helpers.js";

describe("Testes de Plantonistas e Registros de Escala via Cookies", () => {
  let adminCookie: string;
  let adminUserId: string;
  let secondaryUserId: string;
  let tempPlantonistaId: string;
  let secondaryPlantonistaId: string;
  let tempRegistroId: string;

  beforeAll(async () => {
    const setup = await setupTestUsers("plantoes");
    adminCookie = setup.adminCookie;
    adminUserId = setup.admin.id;
    secondaryUserId = setup.atendente.id;
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  it("deve vincular o primeiro plantonista com sucesso", async () => {
    const response = await request(app)
      .post("/plantao")
      .set("Cookie", adminCookie)
      .send({ userId: adminUserId });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    tempPlantonistaId = response.body.id;

    await prisma.plantonistas.update({
      where: { id: tempPlantonistaId },
      data: { posicao: 0 },
    });
  });

  it("deve vincular o segundo plantonista para a fila de distribuição sequencial", async () => {
    const response = await request(app)
      .post("/plantao")
      .set("Cookie", adminCookie)
      .send({ userId: secondaryUserId });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    secondaryPlantonistaId = response.body.id;

    await prisma.plantonistas.update({
      where: { id: secondaryPlantonistaId },
      data: { posicao: 1 },
    });
  });

  it("não deve permitir vincular o mesmo usuário como plantonista duas vezes", async () => {
    const response = await request(app)
      .post("/plantao")
      .set("Cookie", adminCookie)
      .send({ userId: adminUserId });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("já está vinculado");
  });

  it("deve listar todos os plantonistas ordenados pelo plantão mais recente", async () => {
    const response = await request(app)
      .get("/plantao")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it("deve gerar uma escala automática distribuída", async () => {
    const response = await request(app)
      .post("/register/gerar")
      .set("Cookie", adminCookie)
      .send({
        dataInicio: "2026-08-01T00:00:00.000Z",
        diaSemana: 6, // Sábado
        horarioInicio: "08:00",
        horarioFim: "18:00",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("registros");
    expect(response.body.registros.length).toBe(2);
    tempRegistroId = response.body.registros[0].id;
  });

  it("deve listar os registros de escala de forma paginada", async () => {
    const response = await request(app)
      .get("/register/find?page=1")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("registros");
    expect(Array.isArray(response.body.registros)).toBe(true);
    expect(response.body.registros.length).toBe(2);
  });

  it("deve buscar o próximo plantão ativo do sistema", async () => {
    const response = await request(app)
      .get("/register/next")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
  });

  it("deve remover uma escala do sistema", async () => {
    const response = await request(app)
      .delete(`/register/${tempRegistroId}`)
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
  });
});
