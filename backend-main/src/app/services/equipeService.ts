import type { EquipeRepository } from "../repository/equipeRepo.js";
import type { UserRepository } from "../repository/userRepo.js";
import { sseEventBus } from "../../config/sseEvents.js";

export interface CreateEquipeInput {
  nome: string;
  descricao?: string;
  cor?: string;
  ativo?: boolean;
  queueId?: number;
  queueName?: string;
  departamentos?: string[];
  isFallback?: boolean;
  posicaoFallback?: number;
}

export interface UpdateEquipeInput {
  nome?: string;
  descricao?: string;
  cor?: string;
  ativo?: boolean;
  queueId?: number;
  queueName?: string;
  departamentos?: string[];
  isFallback?: boolean;
  posicaoFallback?: number;
}

export interface VincularMembroInput {
  equipeId: string;
  userId: string;
  cargo?: string;
  ordemSequencial?: number;
  pesoPrioridade?: number;
  turnos?: any;
  margemInicioMinutos?: number;
  margemFimMinutos?: number;
  ativo?: boolean;
}

export interface UpdateMembroInput {
  cargo?: string;
  ordemSequencial?: number;
  pesoPrioridade?: number;
  turnos?: any;
  margemInicioMinutos?: number;
  margemFimMinutos?: number;
  ativo?: boolean;
}

export class EquipeService {
  private equipeRepo: EquipeRepository;
  private userRepo: UserRepository;

  constructor(equipeRepository: EquipeRepository, userRepository: UserRepository) {
    this.equipeRepo = equipeRepository;
    this.userRepo = userRepository;
  }

  async createEquipe(data: CreateEquipeInput) {
    if (!data.nome || data.nome.trim() === "") {
      throw new Error("O nome da equipe é obrigatório.");
    }

    const novaEquipe = await this.equipeRepo.create({
      nome: data.nome.trim(),
      descricao: data.descricao || null,
      cor: data.cor || null,
      ativo: data.ativo !== undefined ? data.ativo : true,
      queueId: data.queueId !== undefined ? Number(data.queueId) : null,
      queueName: data.queueName || null,
      departamentos: Array.isArray(data.departamentos) ? data.departamentos : [],
      isFallback: Boolean(data.isFallback),
      posicaoFallback: data.posicaoFallback !== undefined && data.posicaoFallback !== null ? Number(data.posicaoFallback) : 0,
    } as any);

    sseEventBus.notify("equipe", "create", novaEquipe);
    return novaEquipe;
  }

  async getAllEquipes() {
    return await this.equipeRepo.findAllWithMembers();
  }

  async getEquipeById(id: string) {
    if (!id) {
      throw new Error("ID da equipe é obrigatório.");
    }

    const equipe = await this.equipeRepo.findByIdWithMembers(id);
    if (!equipe) {
      throw new Error("Equipe de plantão não encontrada.");
    }

    return equipe;
  }

  async updateEquipe(id: string, data: UpdateEquipeInput) {
    if (!id) {
      throw new Error("ID da equipe é obrigatório.");
    }

    const equipeExistente = await this.equipeRepo.findById(id);
    if (!equipeExistente) {
      throw new Error("Equipe de plantão não encontrada.");
    }

    const payload: any = { ...data };
    if (data.queueId !== undefined) payload.queueId = Number(data.queueId);
    if (data.posicaoFallback !== undefined) payload.posicaoFallback = Number(data.posicaoFallback);
    if (data.departamentos !== undefined) payload.departamentos = Array.isArray(data.departamentos) ? data.departamentos : [];

    const equipeAtualizada = await this.equipeRepo.update(id, payload);
    sseEventBus.notify("equipe", "update", equipeAtualizada);
    return equipeAtualizada;
  }

  async deleteEquipe(id: string) {
    if (!id) {
      throw new Error("ID da equipe é obrigatório.");
    }

    const equipeExistente = await this.equipeRepo.findById(id);
    if (!equipeExistente) {
      throw new Error("Equipe de plantão não encontrada.");
    }

    const deleted = await this.equipeRepo.delete(id);
    sseEventBus.notify("equipe", "delete", { id });
    return deleted;
  }

  async vincularUsuario(data: VincularMembroInput) {
    if (!data.equipeId) {
      throw new Error("O campo 'equipeId' é obrigatório.");
    }
    if (!data.userId) {
      throw new Error("O campo 'userId' é obrigatório.");
    }

    const equipe = await this.equipeRepo.findById(data.equipeId);
    if (!equipe) {
      throw new Error("Equipe de plantão não encontrada.");
    }

    const user = await this.userRepo.findById(data.userId);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const membroExistente = await this.equipeRepo.findMembro(data.equipeId, data.userId);
    if (membroExistente) {
      throw new Error("Este usuário já está vinculado a esta equipe.");
    }

    const membro = await this.equipeRepo.addMembro({
      equipeId: data.equipeId,
      userId: data.userId,
      cargo: data.cargo,
      ordemSequencial: data.ordemSequencial,
      pesoPrioridade: data.pesoPrioridade,
      turnos: data.turnos,
      margemInicioMinutos: data.margemInicioMinutos,
      margemFimMinutos: data.margemFimMinutos,
      ativo: data.ativo,
    });

    sseEventBus.notify("membro_equipe", "create", membro);
    return membro;
  }

  async desvincularUsuario(equipeId: string, userId: string) {
    if (!equipeId || !userId) {
      throw new Error("Os campos 'equipeId' e 'userId' são obrigatórios.");
    }

    const membro = await this.equipeRepo.findMembro(equipeId, userId);
    if (!membro) {
      throw new Error("Vínculo do usuário com esta equipe não foi encontrado.");
    }

    const removed = await this.equipeRepo.removeMembro(equipeId, userId);
    sseEventBus.notify("membro_equipe", "delete", { equipeId, userId });
    return removed;
  }

  async updateMembro(equipeId: string, userId: string, data: UpdateMembroInput) {
    if (!equipeId || !userId) {
      throw new Error("Os campos 'equipeId' e 'userId' são obrigatórios.");
    }

    const membro = await this.equipeRepo.findMembro(equipeId, userId);
    if (!membro) {
      throw new Error("Vínculo do usuário com esta equipe não foi encontrado.");
    }

    const membroAtualizado = await this.equipeRepo.updateMembro(equipeId, userId, data);
    sseEventBus.notify("membro_equipe", "update", membroAtualizado);
    return membroAtualizado;
  }

  async getEquipesDoUsuario(userId: string) {
    if (!userId) {
      throw new Error("O campo 'userId' é obrigatório.");
    }

    return await this.equipeRepo.findEquipesByUser(userId);
  }
}
