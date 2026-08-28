// src/repository/registroRepo.ts
import { BaseRepository } from "./baseRepo.js";
import type { Registros } from "../../../generated/prisma/index.js";
import prisma from "../../config/postgres.js";

export class RegistroRepository extends BaseRepository<Registros> {
  constructor() {
    super(prisma.registros);
  }

  // 🟢 NOVO MÉTODO: Verifica se já existe um plantão agendado no mesmo dia
  async findByDate(dataAlvo: Date): Promise<Registros | null> {
    const isoString = dataAlvo.toISOString(); // Ex: "2026-08-01T08:00:00.000Z"
    const apenasData = isoString.split("T")[0]; // Pega apenas "2026-08-01"

    // Define o início do dia em UTC (00:00:00)
    const inicioDia = new Date(`${apenasData}T00:00:00.000Z`);
    // Define o fim do dia em UTC (23:59:59)
    const fimDia = new Date(`${apenasData}T23:59:59.999Z`);

    return await prisma.registros.findFirst({
      where: {
        data: {
          gte: inicioDia,
          lte: fimDia
        }
      }
    });
  }

  async findNextActive(): Promise<any> {
    const agora = new Date();


    const inicioHoje = new Date(agora);
    inicioHoje.setUTCHours(0, 0, 0, 0);

    const fimHoje = new Date(agora);
    fimHoje.setUTCHours(23, 59, 59, 999);

    const plantaoHoje = await prisma.registros.findFirst({
      where: {
        data: {
          gte: inicioHoje,
          lte: fimHoje
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            id_atendente: true
          }
        },
        plantao: true
      }
    });

    // Se houver plantão no dia de hoje, retorna o atendente de hoje (Kariny)
    if (plantaoHoje) {
      return plantaoHoje;
    }

    // 🟢 3. FALLBACK: Se hoje não for dia de plantão, busca o próximo plantão futuro ativo
    return await prisma.registros.findFirst({
      where: {
        endTime: {
          gt: agora
        }
      },
      orderBy: {
        startTime: "asc"
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            id_atendente: true
          }
        },
        plantao: true
      }
    });
  }

  async findPaginated(skip: number, take: number): Promise<Registros[]> {
    return await prisma.registros.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc" // Alterado para 'desc' para que os novos apareçam no topo
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        plantao: true
      }
    });
  }

  async countAll(): Promise<number> {
    return await prisma.registros.count();
  }
}