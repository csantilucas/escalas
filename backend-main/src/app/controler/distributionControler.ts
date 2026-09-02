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

      const departamento =
        data.departamento ?? data.depto ?? data.area ?? data.department ?? data.tipoAtendimento ?? data.tipo_atendimento;
      const fila = data.fila ?? data.queue ?? data.queueName ?? data.queue_name ?? data.nomeFila;
      const queueId = data.queueId ?? data.queueid ?? data.queue_id ?? data.id_queue;
      let rawTicket =
        data.ticketId ??
        data.ticketID ??
        data.ticket_id ??
        data.id_ticket ??
        data.ticket_zpro ??
        data.ticketZpro ??
        data.zproTicket ??
        data.zpro_ticket;

      if (!rawTicket && typeof data.ticket === "object" && data.ticket !== null) {
        rawTicket = data.ticket.id ?? data.ticket.ticketId ?? data.ticket.ticket_id;
      } else if (!rawTicket && typeof data.ticket !== "object") {
        rawTicket = data.ticket;
      }

      if (!rawTicket && typeof data.chat === "object" && data.chat !== null) {
        rawTicket = data.chat.id ?? data.chat.ticketId;
      } else if (!rawTicket) {
        rawTicket = data.chatId ?? data.chat_id;
      }

      if (!rawTicket && typeof data.data === "object" && data.data !== null) {
        rawTicket = data.data.id ?? data.data.ticketId;
      }

      // Se ainda não achou e data.id existir e não for UUID (ex: 18297 numérico do Z-PRO)
      if (!rawTicket && data.id && !/^[0-9a-f]{8}-[0-9a-f]{4}/i.test(String(data.id))) {
        rawTicket = data.id;
      }

      const ticketId =
        rawTicket !== undefined && rawTicket !== null && !String(rawTicket).startsWith("DIST-")
          ? String(rawTicket).trim()
          : undefined;
      const clienteId =
        data.clienteId ??
        data.clienteID ??
        data.cliente_id ??
        data.cliente ??
        data.id_cliente ??
        data.customer_id;
      const numero =
        data.numero ?? data.Number ?? data.phone ?? data.number ?? data.telefone ?? data.whatsapp ?? data.celular;
      const pushName =
        data.pushName ??
        data.pushname ??
        data.nome_contato ??
        data.nomeContato ??
        data.contactName ??
        data.name ??
        data.nome ??
        data.contato;
      const cnpj = data.cnpj ?? data.cpf_cnpj ?? data.cpf ?? data.documento;
      const protocolo = data.protocolo ?? data.protocol;
      const horarioMinutosOverride = data.horarioMinutosOverride
        ? Number(data.horarioMinutosOverride)
        : undefined;
      const ignorarApisExternas =
        data.ignorarApisExternas === true || data.ignorarApisExternas === "true";

      const resultado = await distributionService.distribuir({
        departamento: departamento ? String(departamento) : undefined,
        fila: fila ? String(fila) : undefined,
        queueId: queueId !== undefined && queueId !== null ? Number(queueId) : undefined,
        ticketId: ticketId !== undefined && ticketId !== null ? String(ticketId) : undefined,
        clienteId: clienteId !== undefined && clienteId !== null ? String(clienteId) : undefined,
        numero: numero ? String(numero) : undefined,
        pushName: pushName ? String(pushName) : undefined,
        cnpj: cnpj ? String(cnpj) : undefined,
        protocolo: protocolo ? String(protocolo) : undefined,
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
