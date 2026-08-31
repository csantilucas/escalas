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
    const hojeIso = agora.toISOString().split("T")[0];
    const inicioHoje = new Date(`${hojeIso}T00:00:00.000Z`);

    // 1. Verifica se há um plantão em andamento neste momento exato
    const plantaoEmAndamento = await prisma.registros.findFirst({
      where: {
        startTime: { lte: agora },
        endTime: { gte: agora }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            id_atendente: true,
            zproId: true,
            slackId: true
          }
        },
        plantao: true
      }
    });

    if (plantaoEmAndamento) {
      return plantaoEmAndamento;
    }

    // 2. Busca o plantão do dia de hoje ou os próximos futuros
    const proximoFuturo = await prisma.registros.findFirst({
      where: {
        OR: [
          { data: { gte: inicioHoje } },
          { endTime: { gte: agora } }
        ]
      },
      orderBy: [
        { data: "asc" },
        { startTime: "asc" }
      ],
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            id_atendente: true,
            zproId: true,
            slackId: true
          }
        },
        plantao: true
      }
    });

    if (proximoFuturo) {
      return proximoFuturo;
    }

    // 3. Fallback: Primeiro plantonista da sequência oficial configurada
    const primeiroPlantonista = await prisma.plantonistas.findFirst({
      orderBy: { posicao: "asc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            id_atendente: true,
            zproId: true,
            slackId: true
          }
        }
      }
    });

    if (primeiroPlantonista) {
      return {
        id: primeiroPlantonista.id,
        data: agora,
        startTime: agora,
        endTime: agora,
        user: primeiroPlantonista.user,
        plantao: primeiroPlantonista
      };
    }

    // 4. Fallback final: último registro
    return await prisma.registros.findFirst({
      orderBy: [
        { data: "desc" },
        { startTime: "desc" }
      ],
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            id_atendente: true,
            zproId: true,
            slackId: true
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
      orderBy: [
        { data: "asc" },
        { startTime: "asc" }
      ],
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