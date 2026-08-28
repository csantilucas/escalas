import type { Request, Response } from "express";
import { externalTokenService } from "../../containers/externalToken.container.js";

export class ExternalTokenController {
  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tokens = await externalTokenService.getAllTokens();
      return res.status(200).json(tokens);
    } catch (error: any) {
      console.error("❌ [ExternalTokenController.getAll] Erro ao buscar tokens:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar tokens." });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;
      const tokenRecord = await externalTokenService.getTokenById(id);
      return res.status(200).json(tokenRecord);
    } catch (error: any) {
      console.error(`❌ [ExternalTokenController.getById] Erro ao buscar token '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao buscar token." });
    }
  };

  getByServiceName = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceName = req.params.serviceName as string;
      const tokenRecord = await externalTokenService.getTokenByServiceName(serviceName);
      if (!tokenRecord) {
        return res.status(404).json({ error: `Token para o serviço '${serviceName}' não encontrado.` });
      }
      return res.status(200).json(tokenRecord);
    } catch (error: any) {
      console.error(`❌ [ExternalTokenController.getByServiceName] Erro ao buscar token do serviço '${req.params.serviceName}':`, error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar token por serviço." });
    }
  };

  createOrUpsert = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { serviceName, token, description, isActive } = req.body;

      if (!serviceName || !token) {
        return res.status(400).json({ error: "Os campos 'serviceName' e 'token' são obrigatórios." });
      }

      const result = await externalTokenService.createOrUpsertToken({
        serviceName,
        token,
        description,
        isActive,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      console.error("❌ [ExternalTokenController.createOrUpsert] Erro ao salvar token:", error.message || error);
      return res.status(400).json({ error: error.message || "Erro ao salvar token." });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;
      const { serviceName, token, description, isActive } = req.body;

      const result = await externalTokenService.updateToken(id, {
        serviceName,
        token,
        description,
        isActive,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      console.error(`❌ [ExternalTokenController.update] Erro ao atualizar token '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrado") || error.code === "P2025") {
        return res.status(404).json({ error: error.message || "Token não encontrado." });
      }
      return res.status(400).json({ error: error.message || "Erro ao atualizar token." });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;
      await externalTokenService.deleteToken(id);
      return res.status(200).json({ message: "Token removido com sucesso." });
    } catch (error: any) {
      console.error(`❌ [ExternalTokenController.delete] Erro ao remover token '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrado") || error.code === "P2025") {
        return res.status(404).json({ error: error.message || "Token não encontrado." });
      }
      return res.status(500).json({ error: error.message || "Erro ao remover token." });
    }
  };
}
