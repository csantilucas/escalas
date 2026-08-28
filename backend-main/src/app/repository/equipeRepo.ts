import type { EquipePlantao, MembroEquipe } from "../../../generated/prisma/index.js";
import prisma from "../../config/postgres.js";
import { BaseRepository } from "./baseRepo.js";

export class EquipeRepository extends BaseRepository<EquipePlantao> {
  constructor() {
    super(prisma.equipePlantao);
  }

  async findAllWithMembers(): Promise<any[]> {
    return await prisma.equipePlantao.findMany({
      include: {
        membros: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                id_atendente: true,
                zproId: true,
                slackId: true,
                typeUser: true,
              },
            },
          },
          orderBy: [{ ordemSequencial: "asc" }, { createdAt: "asc" }],
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByIdWithMembers(id: string): Promise<any | null> {
    return await prisma.equipePlantao.findUnique({
      where: { id },
      include: {
        membros: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                id_atendente: true,
                zproId: true,
                slackId: true,
                typeUser: true,
              },
            },
          },
          orderBy: [{ ordemSequencial: "asc" }, { createdAt: "asc" }],
        },
      },
    });
  }

  async findByDepartamento(departamento: string): Promise<any | null> {
    const cleanDep = departamento.trim().toLowerCase();
    const equipes = await prisma.equipePlantao.findMany({
      where: {
        ativo: true,
      },
      include: {
        membros: {
          where: { ativo: true },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                id_atendente: true,
                zproId: true,
                slackId: true,
                typeUser: true,
              },
            },
          },
          orderBy: [{ ordemSequencial: "asc" }, { createdAt: "asc" }],
        },
      },
    });

    const match = equipes.find((e) =>
      e.departamentos.some((d) => d.toLowerCase() === cleanDep)
    );

    return match || null;
  }

  async findFallbackEquipe(): Promise<any | null> {
    const fallback = await prisma.equipePlantao.findFirst({
      where: {
        ativo: true,
        isFallback: true,
      },
      include: {
        membros: {
          where: { ativo: true },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                id_atendente: true,
                zproId: true,
                slackId: true,
                typeUser: true,
              },
            },
          },
          orderBy: [{ ordemSequencial: "asc" }, { createdAt: "asc" }],
        },
      },
    });

    if (fallback) return fallback;

    return await prisma.equipePlantao.findFirst({
      where: { ativo: true },
      include: {
        membros: {
          where: { ativo: true },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                id_atendente: true,
                zproId: true,
                slackId: true,
                typeUser: true,
              },
            },
          },
          orderBy: [{ ordemSequencial: "asc" }, { createdAt: "asc" }],
        },
      },
    });
  }

  async updateUltimoAtendimento(membroId: string): Promise<void> {
    await prisma.membroEquipe.update({
      where: { id: membroId },
      data: { ultimoAtendimentoEm: new Date() },
    });
  }

  async findMembro(equipeId: string, userId: string): Promise<MembroEquipe | null> {
    return await prisma.membroEquipe.findUnique({
      where: {
        equipeId_userId: {
          equipeId,
          userId,
        },
      },
    });
  }

  async addMembro(data: {
    equipeId: string;
    userId: string;
    cargo?: string;
    ordemSequencial?: number;
    pesoPrioridade?: number;
    turnos?: any;
    margemInicioMinutos?: number;
    margemFimMinutos?: number;
    ativo?: boolean;
  }): Promise<MembroEquipe> {
    return await prisma.membroEquipe.create({
      data: {
        equipeId: data.equipeId,
        userId: data.userId,
        cargo: data.cargo || "plantonista",
        ordemSequencial: data.ordemSequencial !== undefined ? data.ordemSequencial : 0,
        pesoPrioridade: data.pesoPrioridade !== undefined ? data.pesoPrioridade : 0,
        turnos: data.turnos || null,
        margemInicioMinutos: data.margemInicioMinutos !== undefined ? data.margemInicioMinutos : 5,
        margemFimMinutos: data.margemFimMinutos !== undefined ? data.margemFimMinutos : 5,
        ativo: data.ativo !== undefined ? data.ativo : true,
      },
    });
  }

  async removeMembro(equipeId: string, userId: string): Promise<MembroEquipe> {
    return await prisma.membroEquipe.delete({
      where: {
        equipeId_userId: {
          equipeId,
          userId,
        },
      },
    });
  }

  async updateMembro(
    equipeId: string,
    userId: string,
    data: {
      cargo?: string;
      ordemSequencial?: number;
      pesoPrioridade?: number;
      turnos?: any;
      margemInicioMinutos?: number;
      margemFimMinutos?: number;
      ativo?: boolean;
    }
  ): Promise<MembroEquipe> {
    return await prisma.membroEquipe.update({
      where: {
        equipeId_userId: {
          equipeId,
          userId,
        },
      },
      data,
    });
  }

  async findEquipesByUser(userId: string): Promise<any[]> {
    return await prisma.membroEquipe.findMany({
      where: { userId },
      include: {
        equipe: true,
      },
    });
  }
}
