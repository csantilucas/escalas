import { BaseRepository } from "./baseRepo.js";
import type { DistribuicaoLog, Prisma } from "../../../generated/prisma/index.js";
import prisma from "../../config/postgres.js";

export interface DistribuicaoLogFilterQuery {
  page?: number;
  limit?: number;
  modo?: string;
  atendente?: string;
  equipeNome?: string;
  busca?: string;
  sucesso?: boolean;
  dataInicio?: Date;
  dataFim?: Date;
}

export class DistribuicaoLogRepository extends BaseRepository<DistribuicaoLog> {
  constructor() {
    super(prisma.distribuicaoLog);
  }

  async findRecent(limit = 50): Promise<DistribuicaoLog[]> {
    return await prisma.distribuicaoLog.findMany({
      take: Math.min(Math.max(1, limit), 200),
      orderBy: { createdAt: "desc" },
    });
  }

  async findWithFilters(filters: DistribuicaoLogFilterQuery) {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, filters.limit || 20);
    const skip = (page - 1) * limit;

    const where: Prisma.DistribuicaoLogWhereInput = {};

    if (filters.modo) {
      where.modoDistribuicao = { contains: filters.modo, mode: "insensitive" };
    }

    if (filters.atendente) {
      where.atendenteNome = { contains: filters.atendente, mode: "insensitive" };
    }

    if (filters.equipeNome) {
      where.equipeNome = { contains: filters.equipeNome, mode: "insensitive" };
    }

    if (filters.sucesso !== undefined) {
      where.sucesso = filters.sucesso;
    }

    if (filters.busca) {
      where.OR = [
        { ticketId: { contains: filters.busca, mode: "insensitive" } },
        { clienteId: { contains: filters.busca, mode: "insensitive" } },
        { numero: { contains: filters.busca, mode: "insensitive" } },
        { pushName: { contains: filters.busca, mode: "insensitive" } },
        { atendenteNome: { contains: filters.busca, mode: "insensitive" } },
        { equipeNome: { contains: filters.busca, mode: "insensitive" } },
        { modoDistribuicao: { contains: filters.busca, mode: "insensitive" } },
      ];
    }

    if (filters.dataInicio || filters.dataFim) {
      where.createdAt = {};
      if (filters.dataInicio) where.createdAt.gte = filters.dataInicio;
      if (filters.dataFim) where.createdAt.lte = filters.dataFim;
    }

    const [total, data] = await Promise.all([
      prisma.distribuicaoLog.count({ where }),
      prisma.distribuicaoLog.findMany({
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
