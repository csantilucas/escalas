import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import app from "../config/server.js";
import prisma from "../config/postgres.js";
import { setupTestUsers, clearDatabase } from "./helpers.js";

describe("Testes de Equipes de Plantão e Membros via Cookies", () => {
  let adminCookie: string;
  let secondaryUserId: string;
  let tempEquipeId: string;

  beforeAll(async () => {
    const setup = await setupTestUsers("equipes");
    adminCookie = setup.adminCookie;
    secondaryUserId = setup.atendente.id;
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  it("deve criar uma nova equipe de plantão com sucesso", async () => {
    const response = await request(app)
      .post("/equipes")
      .set("Cookie", adminCookie)
      .send({
        nome: "Equipe Suporte VIP",
        descricao: "Equipe dedicada a clientes prioritários",
        cor: "#10B981",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Equipe Suporte VIP");
    tempEquipeId = response.body.id;
  });

  it("deve listar todas as equipes de plantão", async () => {
    const response = await request(app)
      .get("/equipes")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0]).toHaveProperty("membros");
  });

  it("deve vincular um analista/usuário à equipe de plantão", async () => {
    const response = await request(app)
      .post(`/equipes/${tempEquipeId}/membros`)
      .set("Cookie", adminCookie)
      .send({
        userId: secondaryUserId,
        cargo: "Plantonista N2",
        ordem: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.userId).toBe(secondaryUserId);
    expect(response.body.equipeId).toBe(tempEquipeId);
  });

  it("não deve permitir vincular o mesmo usuário duas vezes na mesma equipe", async () => {
    const response = await request(app)
      .post(`/equipes/${tempEquipeId}/membros`)
      .set("Cookie", adminCookie)
      .send({
        userId: secondaryUserId,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("já está vinculado");
  });

  it("deve atualizar os dados de um membro da equipe (cargo/ordem)", async () => {
    const response = await request(app)
      .patch(`/equipes/${tempEquipeId}/membros/${secondaryUserId}`)
      .set("Cookie", adminCookie)
      .send({
        cargo: "Líder Técnico",
        ordem: 0,
      });

    expect(response.status).toBe(200);
    expect(response.body.cargo).toBe("Líder Técnico");
  });

  it("deve desvincular o usuário da equipe", async () => {
    const response = await request(app)
      .delete(`/equipes/${tempEquipeId}/membros/${secondaryUserId}`)
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain("sucesso");
  });

  it("deve atualizar os dados cadastrais de uma equipe", async () => {
    const response = await request(app)
      .put(`/equipes/${tempEquipeId}`)
      .set("Cookie", adminCookie)
      .send({
        nome: "Equipe Suporte VIP Atualizada",
        cor: "#EF4444",
      });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Equipe Suporte VIP Atualizada");
  });

  it("deve excluir uma equipe de plantão", async () => {
    const response = await request(app)
      .delete(`/equipes/${tempEquipeId}`)
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain("sucesso");
  });
});
