import { externalTokenRepo } from "../containers/externalToken.container.js";

export async function syncExternalTokens(): Promise<void> {
  try {
    // 1. Tomticket Token & API URL
    const tomticketUrl = process.env.TOMTICKET_API_URL || "https://api.tomticket.com/v2.0/ticket/list";
    if (process.env.TOMTICKET_BEARER_TOKEN) {
      const existing = await externalTokenRepo.findByServiceName("tomticket");
      if (!existing) {
        await externalTokenRepo.upsertByServiceName({
          serviceName: "tomticket",
          token: process.env.TOMTICKET_BEARER_TOKEN,
          apiUrl: tomticketUrl,
          description: "Token de autenticação para a API do Tomticket (definido via .env)",
          isActive: true,
        });
        console.log("🔑 [TokenSync] Token do Tomticket sincronizado com o banco de dados.");
      } else if (!existing.apiUrl || existing.apiUrl.includes("chat/list")) {
        await externalTokenRepo.update(existing.id, {
          apiUrl: tomticketUrl,
        });
        console.log("🔑 [TokenSync] URL do Tomticket atualizada para /v2.0/ticket/list.");
      }
    }

    // 2. Alpha Software / Dash API Token & URL
    const alphaToken = process.env.ALPHA_API_TOKEN || process.env.EXTERNAL_API_TOKEN;
    if (alphaToken) {
      const desiredUrl =
        process.env.ALPHA_API_URL ||
        "https://api.alphasoftware.com.br/v2/api/external/9c27a2a0-d676-4aea-a0ed-8da908a4acb6/dash";
      const existing = await externalTokenRepo.findByServiceName("alpha_dash");
      if (!existing) {
        await externalTokenRepo.upsertByServiceName({
          serviceName: "alpha_dash",
          token: alphaToken,
          apiUrl: desiredUrl,
          description: "Token de autenticação para a API Alpha Dash (definido via .env)",
          isActive: true,
        });
        console.log("🔑 [TokenSync] Token Alpha Dash sincronizado com o banco de dados.");
      } else if (!existing.apiUrl || (!existing.apiUrl.endsWith("/dash") && !existing.apiUrl.includes("/dash/"))) {
        await externalTokenRepo.update(existing.id, {
          apiUrl: desiredUrl,
        });
        console.log("🔑 [TokenSync] URL da API Alpha Dash corrigida para incluir /dash.");
      }
    }

    // 3. Z-PRO Token & URL
    const zproToken = process.env.ZPRO_API_TOKEN || process.env.ZPRO_TOKEN;
    if (zproToken) {
      const existing = await externalTokenRepo.findByServiceName("zpro");
      if (!existing) {
        await externalTokenRepo.upsertByServiceName({
          serviceName: "zpro",
          token: zproToken,
          apiUrl:
            process.env.ZPRO_API_URL ||
            "https://api.alphasoftware.com.br/v2/api/external/9c27a2a0-d676-4aea-a0ed-8da908a4acb6",
          description: "Token de autenticação para o serviço Z-PRO (definido via .env)",
          isActive: true,
        });
        console.log("🔑 [TokenSync] Token Z-PRO sincronizado com o banco de dados.");
      }
    }
  } catch (error: any) {
    console.warn("⚠️ [TokenSync] Erro ao sincronizar tokens no banco:", error.message);
  }
}
