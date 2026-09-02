import type { Request, Response } from "express";
import { atendimentoService } from "../../containers/atendimento.container.js";

function parseFilterStartDate(dateStr?: any): Date | undefined {
  if (!dateStr) return undefined;
  const str = String(dateStr).trim();
  if (!str) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [ano, mes, dia] = str.split("-").map(Number);
    return new Date(ano, mes - 1, dia, 0, 0, 0, 0);
  }
  const d = new Date(str);
  return isNaN(d.getTime()) ? undefined : d;
}

function parseFilterEndDate(dateStr?: any): Date | undefined {
  if (!dateStr) return undefined;
  const str = String(dateStr).trim();
  if (!str) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [ano, mes, dia] = str.split("-").map(Number);
    return new Date(ano, mes - 1, dia, 23, 59, 59, 999);
  }
  const d = new Date(str);
  if (isNaN(d.getTime())) return undefined;
  if (d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0) {
    d.setHours(23, 59, 59, 999);
  }
  return d;
}

export class AtendimentoController {
  // 1. Criar Atendimento Inicial (n8n)
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        ticket_zpro,
        ticketZpro,
        ticket_id,
        ticketId,
        ticket,
        cliente_id,
        clienteId,
        cnpj,
        cpf_cnpj,
        atendente,
        protocolo,
        protocol,
        nome_contato,
        nomeContato,
        pushName,
        tipo_atendimento,
        tipoAtendimento,
      } = req.body || {};

      const zproId = ticket_zpro ?? ticketZpro ?? ticket_id ?? ticketId ?? ticket;
      const cId = cliente_id ?? clienteId;
      const docCnpj = cnpj ?? cpf_cnpj;
      const prot = protocolo ?? protocol;
      const contactName = nome_contato ?? nomeContato ?? pushName;
      const tipoAtend = tipo_atendimento ?? tipoAtendimento;

      const novoAtendimento = await atendimentoService.createAtendimento({
        ticketZpro: zproId,
        clienteId: cId ? String(cId) : null,
        cnpj: docCnpj ? String(docCnpj) : null,
        atendente: atendente ? String(atendente) : null,
        protocolo: prot ? String(prot) : null,
        nomeContato: contactName ? String(contactName) : null,
        tipoAtendimento: tipoAtend ? String(tipoAtend) : null,
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
        dataInicio: parseFilterStartDate(dataInicio),
        dataFim: parseFilterEndDate(dataFim),
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
        dataInicio: parseFilterStartDate(dataInicio),
        dataFim: parseFilterEndDate(dataFim),
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
        dataInicio: parseFilterStartDate(dataInicio),
        dataFim: parseFilterEndDate(dataFim),
      };

      const result = await atendimentoService.getAtendimentosPorAnalista(String(analista), filters);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error(`❌ [AtendimentoController.getByAnalista] Erro ao buscar atendimentos do analista '${req.params.analista}':`, error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar atendimentos do analista." });
    }
  };

  // 6. Produtividade dos analistas baseada na tabela local de atendimentos
  getProdutividade = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { startDate, endDate, dataInicio, dataFim } = req.query;
      const start = (startDate || dataInicio || new Date().toISOString().substring(0, 10)) as string;
      const end = (endDate || dataFim || new Date().toISOString().substring(0, 10)) as string;

      const resultado = await atendimentoService.getProdutividade(start, end);
      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error("❌ [AtendimentoController.getProdutividade] Erro ao buscar produtividade:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar produtividade dos analistas." });
    }
  };
}