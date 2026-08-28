import { BaseRepository } from "./baseRepo.js";
import type { Atendimento, Prisma } from "../../../generated/prisma/index.js";
import prisma from "../../config/postgres.js";

export interface AtendimentoFilterQuery {
  page?: number;
  limit?: number;
  cnpj?: string;
  atendente?: string;
  busca?: string;
  sincronizado?: boolean;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface DashboardMetricsQuery {
  atendente?: string;
  dataInicio?: Date;
  dataFim?: Date;
}

export class AtendimentoRepository extends BaseRepository<Atendimento> {
  constructor() {
    super(prisma.atendimento);
  }

  async getDashboardMetrics(filters: DashboardMetricsQuery) {
    const where: Prisma.AtendimentoWhereInput = {};

    if (filters.atendente) {
      where.atendente = { contains: filters.atendente, mode: "insensitive" };
    }

    if (filters.dataInicio || filters.dataFim) {
      where.createdAt = {};
      if (filters.dataInicio) where.createdAt.gte = filters.dataInicio;
      if (filters.dataFim) where.createdAt.lte = filters.dataFim;
    }

    // Define início do dia de hoje para os "Registrados Hoje"
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const whereHoje: Prisma.AtendimentoWhereInput = {
      ...where,
      createdAt: { gte: startOfToday },
    };

    const [total, sincronizados, pendentes, criadosHoje, agrupadoPorAnalista] = await Promise.all([
      prisma.atendimento.count({ where }),
      prisma.atendimento.count({ where: { ...where, sincronizado: true } }),
      prisma.atendimento.count({ where: { ...where, sincronizado: false } }),
      prisma.atendimento.count({ where: whereHoje }),
      prisma.atendimento.groupBy({
        by: ["atendente"],
        _count: {
          id: true,
        },
        where,
        orderBy: {
          _count: {
            id: "desc",
          },
        },
      }),
    ]);

    return {
      metrics: {
        total,
        sincronizados,
        pendentes,
        criadosHoje,
        taxaSincronizacao: total > 0 ? Math.round((sincronizados / total) * 100) : 0,
      },
      porAnalista: agrupadoPorAnalista.map((item) => ({
        analista: item.atendente || "Não Atribuído",
        totalAtendimentos: item._count.id,
      })),
    };
  }

  // 🟢 Buscar atendimento pelo ticket do Z-PRO
  async findByTicketZpro(ticketZpro: string): Promise<Atendimento | null> {
    return await prisma.atendimento.findFirst({
      where: { ticketZpro },
    });
  }

  // 🟢 CORRIGIDO: alterado de findUnique para findFirst
  async findByProtocolo(protocolo: string): Promise<Atendimento | null> {
    return await prisma.atendimento.findFirst({
      where: { protocolo },
    });
  }

  async findWithFilters(filters: AtendimentoFilterQuery) {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, filters.limit || 10);
    const skip = (page - 1) * limit;

    const where: Prisma.AtendimentoWhereInput = {};

    if (filters.cnpj) where.cnpj = filters.cnpj;
    if (filters.atendente) {
      where.atendente = { contains: filters.atendente, mode: "insensitive" };
    }
    if (filters.sincronizado !== undefined) {
      where.sincronizado = filters.sincronizado;
    }

    if (filters.busca) {
      where.OR = [
        { nomeContato: { contains: filters.busca, mode: "insensitive" } },
        { cnpj: { contains: filters.busca } },
        { protocolo: { contains: filters.busca } },
        { ticketZpro: { contains: filters.busca } },
        { ticketTomticket: { contains: filters.busca } },
      ];
    }

    if (filters.dataInicio || filters.dataFim) {
      where.createdAt = {};
      if (filters.dataInicio) where.createdAt.gte = filters.dataInicio;
      if (filters.dataFim) where.createdAt.lte = filters.dataFim;
    }

    const [total, data] = await Promise.all([
      prisma.atendimento.count({ where }),
      prisma.atendimento.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        totalRecords: total,
        currentPage: page,
        totalPages,
        perPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}