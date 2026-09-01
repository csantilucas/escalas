import type { Request, Response } from "express";
import { distributionService } from "../../containers/distribution.container.js";

export class DistributionController {
  distribuir = async (req: Request, res: Response): Promise<Response> => {
    try {
      const headers = (typeof req.headers === "object" && req.headers ? req.headers : {}) as Record<string, any>;
      const query = (typeof req.query === "object" && req.query ? req.query : {}) as Record<string, any>;
      const body = (typeof req.body === "object" && req.body ? req.body : {}) as Record<string, any>;

      const data = {
        ...headers,
        ...query,
        ...body,
      };

      const departamento = data.departamento || data.depto || data.area || data.department;
      const fila = data.fila || data.queue || data.queueName;
      const queueId = data.queueId || data.queueid || data.queue_id;
      const ticketId = data.ticketId || data.ticketID || data.ticket;
      const clienteId = data.clienteId || data.clienteID;
      const numero = data.numero || data.Number || data.phone || data.number;
      const pushName = data.pushName || data.contactName || data.name;
      const horarioMinutosOverride = data.horarioMinutosOverride
        ? Number(data.horarioMinutosOverride)
        : undefined;
      const ignorarApisExternas =
        data.ignorarApisExternas === true || data.ignorarApisExternas === "true";

      const resultado = await distributionService.distribuir({
        departamento: departamento ? String(departamento) : undefined,
        fila: fila ? String(fila) : undefined,
        queueId: queueId !== undefined && queueId !== null ? Number(queueId) : undefined,
        ticketId,
        clienteId,
        numero: numero ? String(numero) : undefined,
        pushName: pushName ? String(pushName) : undefined,
        horarioMinutosOverride,
        ignorarApisExternas,
      });

      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error("❌ [DistributionController] Erro ao distribuir atendimento:", error);
      return res.status(500).json({
        sucesso: false,
        status: "pending",
        userId: null,
        atendenteNome: null,
        queueId: 6,
        queueName: "N1-Suporte",
        modoDistribuicao: "erro_interno",
        error: error.message,
      });
    }
  };

  getPrevisao = async (req: Request, res: Response): Promise<Response> => {
    try {
      const previsao = await distributionService.getPrevisaoFilas();
      return res.status(200).json(previsao);
    } catch (error: any) {
      console.error("❌ [DistributionController.getPrevisao] Erro ao obter previsão de filas:", error.message || error);
      return res.status(500).json({ error: error.message });
    }
  };

  getLogs = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const modo = req.query.modo ? String(req.query.modo) : undefined;
      const atendente = req.query.atendente ? String(req.query.atendente) : undefined;
      const equipeNome = req.query.equipeNome ? String(req.query.equipeNome) : undefined;
      const busca = req.query.busca ? String(req.query.busca) : undefined;
      const sucesso =
        req.query.sucesso === "true"
          ? true
          : req.query.sucesso === "false"
          ? false
          : undefined;

      let dataInicio: Date | undefined;
      let dataFim: Date | undefined;

      if (req.query.dataInicio) {
        dataInicio = new Date(String(req.query.dataInicio));
        if (isNaN(dataInicio.getTime())) dataInicio = undefined;
      }
      if (req.query.dataFim) {
        dataFim = new Date(String(req.query.dataFim));
        if (isNaN(dataFim.getTime())) dataFim = undefined;
        else dataFim.setHours(23, 59, 59, 999);
      }

      const logs = await distributionService.getLogs({
        page,
        limit,
        modo,
        atendente,
        equipeNome,
        busca,
        sucesso,
        dataInicio,
        dataFim,
      });

      return res.status(200).json(logs);
    } catch (error: any) {
      console.error("❌ [DistributionController.getLogs] Erro ao buscar logs de distribuição:", error.message || error);
      return res.status(500).json({ error: error.message });
    }
  };

  getRecentes = async (req: Request, res: Response): Promise<Response> => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 50;
      const recentes = await distributionService.getRecentLogs(limit);
      return res.status(200).json(recentes);
    } catch (error: any) {
      console.error("❌ [DistributionController.getRecentes] Erro ao buscar distribuições recentes:", error.message || error);
      return res.status(500).json({ error: error.message });
    }
  };
}
