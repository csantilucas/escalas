// src/controler/dashboardControler.ts
import type { Request, Response } from "express";
import { externalApiService } from "../services/externalApiService.js";
import { sseEventBus } from "../../config/sseEvents.js";
import prisma from "../../config/postgres.js";
import { atendimentoService } from "../../containers/atendimento.container.js";

export class DashboardController {
  // 🟢 1. Endpoint SSE (Server-Sent Events) para streaming em tempo real
  streamEvents = (req: Request, res: Response): void => {
    sseEventBus.addClient(req, res);
  };

  // 🟢 2. Endpoint de Visão Geral Consolidada do Dashboard
  getOverview = async (req: Request, res: Response): Promise<Response> => {
    try {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const [
        totalAtendimentos,
        atendimentosHoje,
        sincronizados,
        totalEquipes,
        totalUsuarios,
        proximoPlantao,
      ] = await Promise.all([
        prisma.atendimento.count(),
        prisma.atendimento.count({ where: { createdAt: { gte: startOfToday } } }),
        prisma.atendimento.count({ where: { sincronizado: true } }),
        prisma.equipePlantao.count({ where: { ativo: true } }),
        prisma.user.count({ where: { typeUser: "atendente" } }),
        prisma.registros.findFirst({
          where: { data: { gte: startOfToday } },
          orderBy: { data: "asc" },
          include: {
            user: { select: { id: true, name: true, email: true } },
            plantao: true,
          },
        }),
      ]);

      const taxaSincronizacao =
        totalAtendimentos > 0
          ? Math.round((sincronizados / totalAtendimentos) * 100)
          : 0;

      return res.status(200).json({
        atendimentos: {
          total: totalAtendimentos,
          hoje: atendimentosHoje,
          sincronizados,
          pendentes: totalAtendimentos - sincronizados,
          taxaSincronizacao: `${taxaSincronizacao}%`,
        },
        equipes: {
          totalAtivas: totalEquipes,
        },
        usuarios: {
          totalAtendentes: totalUsuarios,
        },
        proximoPlantao,
        sse: {
          connectedClients: sseEventBus.getConnectedCount(),
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("❌ [DashboardController.getOverview] Erro ao carregar visão geral do dashboard:", error.message || error);
      return res.status(500).json({
        error: error.message || "Erro ao carregar visão geral do dashboard.",
      });
    }
  };

  // 3. Rota de Produtividade dos Analistas (Calculada pela tabela interna de Atendimentos)
  getTicketsReport = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          error: "Os parâmetros 'startDate' e 'endDate' no formato YYYY-MM-DD são obrigatórios.",
        });
      }

      const dadosReport = await atendimentoService.getProdutividade(
        startDate as string,
        endDate as string
      );

      return res.status(200).json(dadosReport);
    } catch (error: any) {
      console.error("❌ [DashboardController.getTicketsReport] Erro interno:", error.message || error);
      return res.status(500).json({
        error: error.message || "Erro interno ao processar métricas de produtividade.",
      });
    }
  };

  // 4. Rota para consumir o relatório consolidado do Tomticket
  getTomticketReport = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { startDate, endDate, refresh } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          error: "Os parâmetros 'startDate' e 'endDate' no formato YYYY-MM-DD são obrigatórios.",
        });
      }

      const forceRefresh = refresh === "true";

      let dadosTomticket: any[] = [];
      try {
        dadosTomticket = await externalApiService.getTomticketReport(
          startDate as string,
          endDate as string,
          forceRefresh
        );
      } catch (externalError: any) {
        console.warn(
          "⚠️ [DashboardController.getTomticketReport] Falha ao obter relatório do Tomticket. Retornando array vazio:",
          externalError.message || externalError
        );
        dadosTomticket = [];
      }

      return res.status(200).json(dadosTomticket);
    } catch (error: any) {
      console.error("❌ [DashboardController.getTomticketReport] Erro interno:", error.message || error);
      return res.status(500).json({
        error: error.message || "Erro interno ao processar relatório do Tomticket.",
      });
    }
  };
}