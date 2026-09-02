import type { Request, Response } from "express";
import { equipeService } from "../../containers/equipe.container.js";

export class EquipeController {
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { nome, descricao, cor, ativo, queueId, queueName, departamentos, isFallback, posicaoFallback } = req.body;

      if (!nome || nome.trim() === "") {
        return res.status(400).json({ error: "O nome da equipe é obrigatório." });
      }

      const novaEquipe = await equipeService.createEquipe({
        nome,
        descricao,
        cor,
        ativo,
        queueId,
        queueName,
        departamentos,
        isFallback,
        posicaoFallback: posicaoFallback !== undefined && posicaoFallback !== null && posicaoFallback !== "" ? Number(posicaoFallback) : undefined,
      });

      return res.status(201).json(novaEquipe);
    } catch (error: any) {
      console.error("❌ [EquipeController.create] Erro ao criar equipe:", error.message || error);
      if (error.message.includes("obrigatório")) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao criar equipe." });
    }
  };

  getAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const equipes = await equipeService.getAllEquipes();
      return res.status(200).json(equipes);
    } catch (error: any) {
      console.error("❌ [EquipeController.getAll] Erro ao buscar equipes:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar equipes." });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;
      const equipe = await equipeService.getEquipeById(id);
      return res.status(200).json(equipe);
    } catch (error: any) {
      console.error(`❌ [EquipeController.getById] Erro ao buscar equipe '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrada")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao buscar equipe." });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;
      const { nome, descricao, cor, ativo, queueId, queueName, departamentos, isFallback, posicaoFallback } = req.body;

      const equipeAtualizada = await equipeService.updateEquipe(id, {
        nome,
        descricao,
        cor,
        ativo,
        queueId,
        queueName,
        departamentos,
        isFallback,
        posicaoFallback: posicaoFallback !== undefined && posicaoFallback !== null && posicaoFallback !== "" ? Number(posicaoFallback) : undefined,
      });

      return res.status(200).json(equipeAtualizada);
    } catch (error: any) {
      console.error(`❌ [EquipeController.update] Erro ao atualizar equipe '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrada")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao atualizar equipe." });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;
      await equipeService.deleteEquipe(id);
      return res.status(200).json({ message: "Equipe excluída com sucesso." });
    } catch (error: any) {
      console.error(`❌ [EquipeController.delete] Erro ao excluir equipe '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrada")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao excluir equipe." });
    }
  };

  vincularMembro = async (req: Request, res: Response): Promise<Response> => {
    try {
      const equipeId = (req.params.id || req.body.equipeId) as string;
      const {
        userId,
        cargo,
        ordem,
        ordemSequencial,
        pesoPrioridade,
        turnos,
        margemInicioMinutos,
        margemFimMinutos,
        ativo,
      } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "O campo 'userId' é obrigatório." });
      }

      const membro = await equipeService.vincularUsuario({
        equipeId,
        userId,
        cargo,
        ordemSequencial: ordemSequencial !== undefined ? ordemSequencial : ordem,
        pesoPrioridade,
        turnos,
        margemInicioMinutos,
        margemFimMinutos,
        ativo,
      });

      return res.status(201).json(membro);
    } catch (error: any) {
      console.error("❌ [EquipeController.vincularMembro] Erro ao vincular membro:", error.message || error);
      if (
        error.message.includes("já está vinculado") ||
        error.message.includes("não encontrado") ||
        error.message.includes("não encontrada") ||
        error.message.includes("obrigatório")
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao vincular membro à equipe." });
    }
  };

  desvincularMembro = async (req: Request, res: Response): Promise<Response> => {
    try {
      const equipeId = req.params.id as string;
      const userId = req.params.userId as string;

      await equipeService.desvincularUsuario(equipeId, userId);
      return res.status(200).json({ message: "Usuário desvinculado da equipe com sucesso." });
    } catch (error: any) {
      console.error(`❌ [EquipeController.desvincularMembro] Erro ao desvincular usuário '${req.params.userId}' da equipe '${req.params.id}':`, error.message || error);
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro ao desvincular membro da equipe." });
    }
  };

  updateMembro = async (req: Request, res: Response): Promise<Response> => {
    try {
      const equipeId = req.params.id as string;
      const userId = req.params.userId as string;
      const {
        cargo,
        ordem,
        ordemSequencial,
        pesoPrioridade,
        turnos,
        margemInicioMinutos,
        margemFimMinutos,
        ativo,
      } = req.body;

      const membroAtualizado = await equipeService.updateMembro(equipeId, userId, {
        cargo,
        ordemSequencial: ordemSequencial !== undefined ? ordemSequencial : ordem,
        pesoPrioridade,
        turnos,
        margemInicioMinutos,
        margemFimMinutos,
        ativo,
      });

      return res.status(200).json(membroAtualizado);
    } catch (error: any) {
      console.error(`❌ [EquipeController.updateMembro] Erro ao atualizar membro '${req.params.userId}':`, error.message || error);
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message || "Erro ao atualizar membro da equipe." });
    }
  };
}
