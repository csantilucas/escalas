import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../config/server.js";

describe("Health Check e Verificação do Servidor", () => {
  it("deve carregar a aplicação e responder requisições OPTIONS com status 200", async () => {
    const response = await request(app).options("/auth/login");
    expect(response.status).toBe(200);
  });
});