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

    // Helper para verificar correspondência EXATA com a fila informada pelo usuário/webhook
    const matchEquipeComFila = (e: any, filaStr: string): boolean => {
      if (!filaStr) return false;
      const f = filaStr.toLowerCase().trim();

      const qName = (e.queueName || "").toLowerCase().trim();
      const nome = (e.nome || "").toLowerCase().trim();

      // 1. Comparação EXATA com queueName ou nome da equipe (sem regex ou substring)
      if (qName && f === qName) return true;
      if (nome && f === nome) return true;

      // 2. Comparação EXATA com a lista de departamentos da equipe
      if (
        e.departamentos &&
        e.departamentos.some((d: string) => d.toLowerCase().trim() === f)
      ) {
        return true;
      }

      return false;
    };

    // Helper para verificar correspondência EXATA com um departamento
    const matchEquipeComDep = (e: any, depStr: string): boolean => {
      if (!depStr) return false;
      const d = depStr.toLowerCase().trim();

      return Boolean(
        e.departamentos &&
        e.departamentos.some((item: string) => item.toLowerCase().trim() === d)
      );
    };

    // 1. Prioridade 1: Match por queueId numérico explícito
    if (numQueueId) {
      const matchQueue = equipes.find((e) => e.queueId === numQueueId);
      if (matchQueue) return matchQueue;
    }

    // 2. Prioridade 2: Match PRIMEIRO pela FILA informada (nome EXATO da fila)
    // Como a pessoa selecionou aquela fila específica para ser atendida, escolhe os analistas dessa fila selecionada
    if (cleanFila) {
      const equipeDaFila = equipes.find((e) => matchEquipeComFila(e, cleanFila));
      if (equipeDaFila) {
        return equipeDaFila;
      }
    }

    // 3. Prioridade 3: Se não encontrou pela fila (ou se não veio fila), busca pelo DEPARTAMENTO (nome EXATO)
    if (cleanDep) {
      const equipesPorDep = equipes.filter((e) => matchEquipeComDep(e, cleanDep));

      if (equipesPorDep.length === 1) {
        return equipesPorDep[0];
      }

      if (equipesPorDep.length > 1) {
        // Se houver mais de uma equipe com o mesmo departamento, desempata pela fila exata se informada
        if (cleanFila) {
          const desempateFila = equipesPorDep.find((e) => matchEquipeComFila(e, cleanFila));
          if (desempateFila) return desempateFila;
        }

        // Se não houver fila para desempate, prioriza a equipe que não for fallback
        const naoFallback = equipesPorDep.find((e) => !e.isFallback);
        return naoFallback || equipesPorDep[0];
      }

      // Match exato do departamento contra o nome ou queueName da equipe
      const matchNomeDep = equipes.find((e) => {
        const qName = (e.queueName || "").toLowerCase().trim();
        const nome = (e.nome || "").toLowerCase().trim();
        return (qName && cleanDep === qName) || (nome && cleanDep === nome);
      });
      if (matchNomeDep) return matchNomeDep;
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
