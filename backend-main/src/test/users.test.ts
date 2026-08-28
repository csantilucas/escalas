import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import app from "../config/server.js";
import prisma from "../config/postgres.js";
import { setupTestUsers, clearDatabase } from "./helpers.js";

describe("Testes de Usuários e Autenticação via Cookies", () => {
  let adminCookie: string;
  let atendenteCookie: string;

  beforeAll(async () => {
    const setup = await setupTestUsers("users");
    adminCookie = setup.adminCookie;
    atendenteCookie = setup.atendenteCookie;
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  it("deve rejeitar criação de usuário sem cookie de sessão (401)", async () => {
    const response = await request(app).post("/users").send({
      name: "Sem Token",
      email: "semtoken@email.com",
      pass: "123456",
    });

    expect(response.status).toBe(401);
  });

  it("deve rejeitar criação de usuário por atendente comum via cookie (401 Not admin)", async () => {
    const response = await request(app)
      .post("/users")
      .set("Cookie", atendenteCookie)
      .send({
        name: "Novo Por Atendente",
        email: "novo.atendente@email.com",
        pass: "123456",
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toContain("Not admin");
  });

  it("deve permitir que administradores criem novos usuários com sucesso via cookie (201)", async () => {
    const response = await request(app)
      .post("/users")
      .set("Cookie", adminCookie)
      .send({
        name: "Usuário Criado Pelo Admin",
        email: "criado.admin@email.com",
        pass: "123456",
        id_atendente: "ATEND-777",
        typeUser: "atendente",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("criado.admin@email.com");
    expect(response.body).not.toHaveProperty("pass");
  });

  it("deve listar os usuários cadastrados autenticado por cookie", async () => {
    const response = await request(app)
      .get("/users")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
  });
});
