import { externalTokenRepo } from "../containers/externalToken.container.js";

export async function syncExternalTokens(): Promise<void> {
  try {
    // 1. Tomticket Token
    if (process.env.TOMTICKET_BEARER_TOKEN) {
      const existing = await externalTokenRepo.findByServiceName("tomticket");
      if (!existing) {
        await externalTokenRepo.upsertByServiceName({
          serviceName: "tomticket",
          token: process.env.TOMTICKET_BEARER_TOKEN,
          description: "Token de autenticação para a API do Tomticket (definido via .env)",
          isActive: true,
        });
        console.log("🔑 [TokenSync] Token do Tomticket sincronizado com o banco de dados.");
      }
    }

    // 2. Alpha Software / Dash API Token
    const alphaToken = process.env.ALPHA_API_TOKEN || process.env.EXTERNAL_API_TOKEN;
    if (alphaToken) {
      const existing = await externalTokenRepo.findByServiceName("alpha_dash");
      if (!existing) {
        await externalTokenRepo.upsertByServiceName({
          serviceName: "alpha_dash",
          token: alphaToken,
          description: "Token de autenticação para a API Alpha Dash (definido via .env)",
          isActive: true,
        });
        console.log("🔑 [TokenSync] Token Alpha Dash sincronizado com o banco de dados.");
      }
    }

    // 3. Z-PRO Token
    const zproToken = process.env.ZPRO_API_TOKEN || process.env.ZPRO_TOKEN;
    if (zproToken) {
      const existing = await externalTokenRepo.findByServiceName("zpro");
      if (!existing) {
        await externalTokenRepo.upsertByServiceName({
          serviceName: "zpro",
          token: zproToken,
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
