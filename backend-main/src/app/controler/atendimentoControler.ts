import type { Request, Response } from "express";
import { atendimentoService } from "../../containers/atendimento.container.js";

export class AtendimentoController {
  // 1. Criar Atendimento Inicial (n8n)
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        ticket_zpro,
        cliente_id,
        cnpj,
        atendente,
        protocolo,
        nome_contato,
        tipo_atendimento,
      } = req.body;

      const novoAtendimento = await atendimentoService.createAtendimento({
        ticketZpro: ticket_zpro,
        clienteId: cliente_id,
        cnpj,
        atendente,
        protocolo,
        nomeContato: nome_contato,
        tipoAtendimento: tipo_atendimento,
      });

      return res.status(201).json(novoAtendimento);
    } catch (error: any) {
      console.error("❌ [AtendimentoController.create] Erro ao criar atendimento:", error.message || error);
      if (error.message.includes("obrigatório") || error.message.includes("Já existe")) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro interno ao criar atendimento." });
    }
  };

  // 2. Atualizar Atendimento com Tomticket (n8n)
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        ticket_zpro,
        ticketZpro,
        ticket_tomticket,
        ticketTomticket,
        tipo_atendimento,
        tipoAtendimento,
        atendente,
        status,
        protocolo,
        cliente_id,
        clienteId,
        cnpj,
        nome_contato,
        nomeContato,
      } = req.body;

      const zproId = ticket_zpro || ticketZpro;

      const atendimentoAtualizado = await atendimentoService.updateAtendimento({
        ticketZpro: zproId,
        ticketTomticket: ticket_tomticket || ticketTomticket,
        tipoAtendimento: tipo_atendimento || tipoAtendimento,
        atendente,
        status,
        protocolo,
        clienteId: cliente_id || clienteId,
        cnpj,
        nomeContato: nome_contato || nomeContato,
      });

      return res.status(200).json(atendimentoAtualizado);
    } catch (error: any) {
      console.error("❌ [AtendimentoController.update] Erro ao atualizar atendimento:", error.message || error);
      if (error.message.includes("obrigatório")) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message || "Erro interno ao atualizar atendimento." });
    }
  };

  // 3. Listar com paginação e filtros
  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { page, limit, cnpj, atendente, busca, sincronizado, dataInicio, dataFim } = req.query;

      const filters = {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        cnpj: cnpj ? String(cnpj) : undefined,
        atendente: atendente ? String(atendente) : undefined,
        busca: busca ? String(busca) : undefined,
        sincronizado: sincronizado !== undefined ? sincronizado === "true" : undefined,
        dataInicio: dataInicio ? new Date(String(dataInicio)) : undefined,
        dataFim: dataFim ? new Date(String(dataFim)) : undefined,
      };

      const result = await atendimentoService.getAtendimentos(filters);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("❌ [AtendimentoController.getAll] Erro ao listar atendimentos:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao listar atendimentos." });
    }
  };

  // 4. Obter métricas consolidadas
  getMetrics = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { atendente, dataInicio, dataFim } = req.query;

      const filters = {
        atendente: atendente ? String(atendente) : undefined,
        dataInicio: dataInicio ? new Date(String(dataInicio)) : undefined,
        dataFim: dataFim ? new Date(String(dataFim)) : undefined,
      };

      const result = await atendimentoService.getMetrics(filters);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("❌ [AtendimentoController.getMetrics] Erro ao buscar métricas:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar métricas de atendimentos." });
    }
  };

  // 5. Buscar atendimentos paginados por Analista
  getByAnalista = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { analista } = req.params;
      const { page, limit, sincronizado, busca, dataInicio, dataFim } = req.query;

      const filters = {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        busca: busca ? String(busca) : undefined,
        sincronizado: sincronizado !== undefined ? sincronizado === "true" : undefined,
        dataInicio: dataInicio ? new Date(String(dataInicio)) : undefined,
        dataFim: dataFim ? new Date(String(dataFim)) : undefined,
      };

      const result = await atendimentoService.getAtendimentosPorAnalista(String(analista), filters);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error(`❌ [AtendimentoController.getByAnalista] Erro ao buscar atendimentos do analista '${req.params.analista}':`, error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar atendimentos do analista." });
    }
  };
}