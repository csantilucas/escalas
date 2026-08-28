import type { Request, Response } from "express";

import { plantonistaService } from "../../containers/plantonista.container.js";



export class PlantonistaController {
  

  // 1. Criar um vínculo de Plantonista para um Usuário
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.body; // 👈 Pega apenas o userId

      if (!userId) {
        return res.status(400).json({ error: "O campo 'userId' é obrigatório." });
      }

      const novoPlantonista = await plantonistaService.createPlantonista({
        userId
      });

      return res.status(201).json(novoPlantonista);
    } catch (error: any) {
      console.error("❌ [PlantonistaController.create] Erro ao criar plantonista:", error.message || error);
      if (
        error.message.includes("já está vinculado") ||
        error.message.includes("não encontrado") ||
        error.code === "P2002"
      ) {
        return res.status(400).json({ error: error.message || "Este usuário já está vinculado como plantonista." });
      }
      return res.status(500).json({ error: error.message || "Erro interno ao criar plantonista." });
    }
  };

  // 2. Buscar perfil de plantonista pelo ID do Usuário
  getByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.userId as string;

      if (!userId) {
        return res.status(400).json({ error: "O parâmetro 'userId' na URL é obrigatório." });
      }

      const plantonista = await plantonistaService.getPlantonistaByUserId(userId);
      return res.status(200).json(plantonista);
    } catch (error: any) {
      console.error(`❌ [PlantonistaController.getByUserId] Erro ao buscar plantonista '${req.params.userId}':`, error.message || error);
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao buscar plantonista." });
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const plantonistas = await plantonistaService.getPlantonistas();
      return res.status(200).json(plantonistas);
    } catch (error: any) {
      console.error("❌ [PlantonistaController.getAll] Erro ao listar plantonistas:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao listar plantonistas." });
    }
  };
}