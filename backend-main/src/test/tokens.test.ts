import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import app from "../config/server.js";
import prisma from "../config/postgres.js";
import { setupTestUsers, clearDatabase } from "./helpers.js";

describe("Testes de Tokens de Serviços Externos via Cookies", () => {
  let adminCookie: string;
  let atendenteCookie: string;
  let tempTokenId: string;

  beforeAll(async () => {
    const setup = await setupTestUsers("tokens");
    adminCookie = setup.adminCookie;
    atendenteCookie = setup.atendenteCookie;
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  it("deve rejeitar acesso de atendente comum às rotas de tokens (401)", async () => {
    const response = await request(app)
      .get("/tokens")
      .set("Cookie", atendenteCookie);

    expect(response.status).toBe(401);
  });

  it("deve criar ou atualizar um token de serviço externo com perfil admin via cookie", async () => {
    const response = await request(app)
      .post("/tokens")
      .set("Cookie", adminCookie)
      .send({
        serviceName: "tomticket_integration",
        token: "tok_tomticket_secret_12345",
        description: "Token para consulta de relatórios do Tomticket",
      });

    expect(response.status).toBe(200);
    expect(response.body.serviceName).toBe("tomticket_integration");
    expect(response.body.token).toBe("tok_tomticket_secret_12345");
    tempTokenId = response.body.id;
  });

  it("deve listar todos os tokens cadastrados", async () => {
    const response = await request(app)
      .get("/tokens")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it("deve buscar o token pelo nome do serviço", async () => {
    const response = await request(app)
      .get("/tokens/service/tomticket_integration")
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body.serviceName).toBe("tomticket_integration");
  });

  it("deve atualizar um token de serviço", async () => {
    const response = await request(app)
      .put(`/tokens/${tempTokenId}`)
      .set("Cookie", adminCookie)
      .send({
        token: "tok_tomticket_atualizado_999",
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe("tok_tomticket_atualizado_999");
  });

  it("deve remover um token de serviço", async () => {
    const response = await request(app)
      .delete(`/tokens/${tempTokenId}`)
      .set("Cookie", adminCookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain("sucesso");
  });

  it("deve sincronizar tokens de ambiente (.env) automaticamente no banco de dados via syncExternalTokens", async () => {
    const { syncExternalTokens } = await import("../config/tokenSync.js");
    const { externalTokenService } = await import("../containers/externalToken.container.js");

    // Configurar tokens em process.env temporariamente para teste
    process.env.TOMTICKET_BEARER_TOKEN = "tok_tomticket_test_sync";
    process.env.ALPHA_API_TOKEN = "tok_alpha_test_sync";
    process.env.ZPRO_API_TOKEN = "tok_zpro_test_sync";

    await syncExternalTokens();

    // Validar se os 3 tokens foram persistidos no banco
    const tomticketToken = await externalTokenService.getActiveToken("tomticket", "TOMTICKET_BEARER_TOKEN");
    const alphaToken = await externalTokenService.getActiveToken("alpha_dash", "ALPHA_API_TOKEN");
    const zproToken = await externalTokenService.getActiveToken("zpro", "ZPRO_API_TOKEN");

    expect(tomticketToken).toBe("tok_tomticket_test_sync");
    expect(alphaToken).toBe("tok_alpha_test_sync");
    expect(zproToken).toBe("tok_zpro_test_sync");
  });

  it("deve usar o fallback de variável de ambiente quando o token não estiver no banco ou estiver inativo", async () => {
    const { externalTokenService } = await import("../containers/externalToken.container.js");

    process.env.FALLBACK_TEST_TOKEN = "secret_fallback_123";

    // Serviço inexistente no banco, deve retornar o valor do env
    const token = await externalTokenService.getActiveToken("servico_inexistente", "FALLBACK_TEST_TOKEN");
    expect(token).toBe("secret_fallback_123");
  });
});
