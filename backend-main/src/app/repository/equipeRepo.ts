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
    return await this.findByDepartamentoOuFila(departamento);
  }

  async findByDepartamentoOuFila(
    departamento?: string,
    fila?: string,
    queueId?: number | string
  ): Promise<any | null> {
    const cleanDep = (departamento || "").trim().toLowerCase();
    const cleanFila = (fila || "").trim().toLowerCase();
    const numQueueId = queueId !== undefined && queueId !== null && !isNaN(Number(queueId)) ? Number(queueId) : null;

    if (!cleanDep && !cleanFila && !numQueueId) return null;

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

    // 1. Match por queueId explícito
    if (numQueueId) {
      const matchQueue = equipes.find((e) => e.queueId === numQueueId);
      if (matchQueue) return matchQueue;
    }

    // 2. Match por departamento na lista de departamentos da equipe
    if (cleanDep) {
      const matchDep = equipes.find((e) =>
        e.departamentos.some((d) => {
          const normD = d.toLowerCase().trim();
          return normD === cleanDep || normD.replace(/[-_]/g, "") === cleanDep.replace(/[-_]/g, "");
        })
      );
      if (matchDep) return matchDep;
    }

    // 3. Match por fila na lista de departamentos
    if (cleanFila) {
      const matchFilaDep = equipes.find((e) =>
        e.departamentos.some((d) => {
          const normD = d.toLowerCase().trim();
          return normD === cleanFila || normD.replace(/[-_]/g, "") === cleanFila.replace(/[-_]/g, "");
        })
      );
      if (matchFilaDep) return matchFilaDep;
    }

    // 4. Match por queueName ou nome da equipe
    const termos = [cleanFila, cleanDep].filter(Boolean);
    for (const termo of termos) {
      const termoNormalizado = termo.replace(/[-_\s]/g, "");
      const matchName = equipes.find((e) => {
        const qName = (e.queueName || "").toLowerCase().trim();
        const nome = (e.nome || "").toLowerCase().trim();
        const qNorm = qName.replace(/[-_\s]/g, "");
        const nomeNorm = nome.replace(/[-_\s]/g, "");

        return (
          (qName && (termo === qName || termo.startsWith(qName) || qName.startsWith(termo) || termoNormalizado.includes(qNorm) || qNorm.includes(termoNormalizado))) ||
          (nome && (termo === nome || termo.startsWith(nome) || nome.startsWith(termo) || termoNormalizado.includes(nomeNorm) || nomeNorm.includes(termoNormalizado)))
        );
      });
      if (matchName) return matchName;
    }

    return null;
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
