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

  // 🟢 Obter produtividade dos analistas por período baseada na tabela de atendimentos
  async getProdutividadePorPeriodo(dataInicio?: Date, dataFim?: Date) {
    let inicio = dataInicio;
    let fim = dataFim;

    if (!inicio && !fim) {
      const hoje = new Date();
      inicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 0, 0, 0, 0);
      fim = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59, 999);
    }

    const where: Prisma.AtendimentoWhereInput = {};
    if (inicio || fim) {
      where.createdAt = {};
      if (inicio) where.createdAt.gte = inicio;
      if (fim) where.createdAt.lte = fim;
    }

    const [usuariosAtendentes, atendimentosDoPeriodo] = await Promise.all([
      prisma.user.findMany({
        where: { typeUser: "atendente" },
        select: { id: true, name: true, email: true, zproId: true },
        orderBy: { name: "asc" },
      }),
      prisma.atendimento.findMany({
        where,
        select: { id: true, atendente: true, sincronizado: true, ticketTomticket: true, createdAt: true },
      }),
    ]);

    // Mapa para consolidar as métricas por analista
    interface AnalistaMetricsAccumulator {
      name: string;
      email: string;
      em_atendimento: number;
      pendentes: number;
      resolvidos: number;
      total: number;
    }

    const mapaAnalistas = new Map<string, AnalistaMetricsAccumulator>();

    // Inicializa com todos os atendentes cadastrados no sistema
    for (const u of usuariosAtendentes) {
      const chave = (u.name || "").toLowerCase().trim();
      if (chave) {
        mapaAnalistas.set(chave, {
          name: u.name,
          email: u.email || `${chave}@alphasoftware.com.br`,
          em_atendimento: 0,
          pendentes: 0,
          resolvidos: 0,
          total: 0,
        });
      }
    }

    // Acumula os atendimentos do período
    for (const at of atendimentosDoPeriodo) {
      if (!at.atendente || at.atendente.trim() === "") continue;

      const atendenteNome = at.atendente.trim();
      const chaveBusca = atendenteNome.toLowerCase();

      let registro = mapaAnalistas.get(chaveBusca);

      if (!registro) {
        // Tenta buscar por correspondência parcial de nome
        for (const [k, v] of mapaAnalistas.entries()) {
          if (k.includes(chaveBusca) || chaveBusca.includes(k)) {
            registro = v;
            break;
          }
        }
      }

      if (!registro) {
        // Se for um atendente não cadastrado formalmente na tabela de usuários, cria o registro dinâmico
        registro = {
          name: atendenteNome,
          email: `${chaveBusca}@alphasoftware.com.br`,
          em_atendimento: 0,
          pendentes: 0,
          resolvidos: 0,
          total: 0,
        };
        mapaAnalistas.set(chaveBusca, registro);
      }

      registro.total += 1;
      if (at.sincronizado) {
        registro.resolvidos += 1;
      } else {
        registro.em_atendimento += 1;
        registro.pendentes += 1;
      }
    }

    // Converte para o formato de produtividade por etapas de atendimento
    const resultado = Array.from(mapaAnalistas.values())
      .map((acc) => ({
        name: acc.name,
        email: acc.email,
        qtd_em_atendimento: String(acc.em_atendimento),
        qtd_pendentes: String(acc.pendentes),
        qtd_resolvidos: String(acc.resolvidos),
        qtd_por_usuario: String(acc.total),
      }))
      .sort((a, b) => Number(b.qtd_por_usuario) - Number(a.qtd_por_usuario) || a.name.localeCompare(b.name));

    return resultado;
  }

  // 🟢 Atualizar ou registrar o atendente de um ticket durante a distribuição
  async upsertAtendentePorTicket(
    ticketZpro: string,
    atendenteNome: string,
    dadosExtras?: {
      clienteId?: string | null;
      cnpj?: string | null;
      protocolo?: string | null;
      nomeContato?: string | null;
      tipoAtendimento?: string | null;
    }
  ): Promise<Atendimento> {
    const ticketStr = String(ticketZpro).trim();

    const existente = await prisma.atendimento.findFirst({
      where: { ticketZpro: ticketStr },
    });

    if (existente) {
      return await prisma.atendimento.update({
        where: { id: existente.id },
        data: {
          atendente: atendenteNome,
          ...(dadosExtras?.clienteId ? { clienteId: String(dadosExtras.clienteId) } : {}),
          ...(dadosExtras?.cnpj ? { cnpj: String(dadosExtras.cnpj) } : {}),
          ...(dadosExtras?.protocolo ? { protocolo: String(dadosExtras.protocolo) } : {}),
          ...(dadosExtras?.nomeContato ? { nomeContato: String(dadosExtras.nomeContato) } : {}),
          ...(dadosExtras?.tipoAtendimento ? { tipoAtendimento: String(dadosExtras.tipoAtendimento) } : {}),
        },
      });
    }

    return await prisma.atendimento.create({
      data: {
        ticketZpro: ticketStr,
        atendente: atendenteNome,
        clienteId: dadosExtras?.clienteId ? String(dadosExtras.clienteId) : null,
        cnpj: dadosExtras?.cnpj ? String(dadosExtras.cnpj) : "00000000000",
        protocolo: dadosExtras?.protocolo ? String(dadosExtras.protocolo) : null,
        nomeContato: dadosExtras?.nomeContato ? String(dadosExtras.nomeContato) : null,
        tipoAtendimento: dadosExtras?.tipoAtendimento ? String(dadosExtras.tipoAtendimento) : null,
        sincronizado: false,
      },
    });
  }
}