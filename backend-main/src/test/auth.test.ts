import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import app from "../config/server.js";
import prisma from "../config/postgres.js";
import { clearDatabase } from "./helpers.js";

describe("Testes de Autenticação Nativos do Better Auth (Cookies)", () => {
  const testEmail = "usuario.auth.teste@email.com";
  const testPassword = "minhasenhasupersecreta123";
  let sessionCookie: string[];

  beforeAll(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  it("deve cadastrar um novo usuário via Better Auth e retornar o cookie de sessão", async () => {
    const response = await request(app)
      .post("/api/auth/sign-up/email")
      .send({
        name: "Carlos Teste",
        email: testEmail,
        password: testPassword,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.email).toBe(testEmail);
    expect(response.headers["set-cookie"]).toBeDefined();

    sessionCookie = response.headers["set-cookie"] as unknown as string[];
  });

  it("não deve permitir cadastrar outro usuário com o mesmo email", async () => {
    const response = await request(app)
      .post("/api/auth/sign-up/email")
      .send({
        name: "Outro Nome",
        email: testEmail,
        password: testPassword,
      });

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it("deve consultar a sessão ativa usando o cookie recebido", async () => {
    const response = await request(app)
      .get("/api/auth/get-session")
      .set("Cookie", sessionCookie);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("session");
    expect(response.body.user.email).toBe(testEmail);
  });

  it("deve efetuar login com credenciais válidas e retornar novo cookie de sessão", async () => {
    const response = await request(app)
      .post("/api/auth/sign-in/email")
      .send({
        email: testEmail,
        password: testPassword,
      });

    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.email).toBe(testEmail);

    sessionCookie = response.headers["set-cookie"] as unknown as string[];
  });

  it("deve rejeitar login com senha incorreta", async () => {
    const response = await request(app)
      .post("/api/auth/sign-in/email")
      .send({
        email: testEmail,
        password: "senha_errada_total",
      });

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it("deve encerrar a sessão (sign-out) usando o cookie", async () => {
    const response = await request(app)
      .post("/api/auth/sign-out")
      .set("Cookie", sessionCookie);

    expect(response.status).toBe(200);
  });
});
