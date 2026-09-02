import api from "../lib/api";

export interface TurnoTrabalho {
  inicio: string; // "08:10"
  fim: string;    // "12:20"
}

export interface MembroEquipe {
  id: string;
  equipeId: string;
  userId: string;
  cargo: string;
  ordemSequencial: number;
  pesoPrioridade: number;
  turnos: TurnoTrabalho[] | null;
  margemInicioMinutos: number;
  margemFimMinutos: number;
  ativo: boolean;
  ultimoAtendimentoEm: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    zproId?: number | null;
    slackId?: string | null;
    id_atendente?: string | null;
    typeUser: string;
  };
}

export interface EquipePlantao {
  id: string;
  nome: string;
  descricao: string | null;
  cor: string | null;
  ativo: boolean;
  queueId: number | null;
  queueName: string | null;
  departamentos: string[];
  isFallback: boolean;
  posicaoFallback?: number | null;
  createdAt: string;
  updatedAt: string;
  membros: MembroEquipe[];
}

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
  userId: string;
  cargo?: string;
  ordemSequencial?: number;
  ordem?: number;
  pesoPrioridade?: number;
  turnos?: TurnoTrabalho[];
  margemInicioMinutos?: number;
  margemFimMinutos?: number;
  ativo?: boolean;
}

export interface UpdateMembroInput {
  cargo?: string;
  ordemSequencial?: number;
  ordem?: number;
  pesoPrioridade?: number;
  turnos?: TurnoTrabalho[];
  margemInicioMinutos?: number;
  margemFimMinutos?: number;
  ativo?: boolean;
}

export const equipeService = {
  getAll: async (): Promise<EquipePlantao[]> => {
    const response = await api.get<EquipePlantao[]>("/equipes");
    return response.data;
  },

  getById: async (id: string): Promise<EquipePlantao> => {
    const response = await api.get<EquipePlantao>(`/equipes/${id}`);
    return response.data;
  },

  create: async (data: CreateEquipeInput): Promise<EquipePlantao> => {
    const response = await api.post<EquipePlantao>("/equipes", data);
    return response.data;
  },

  update: async (id: string, data: UpdateEquipeInput): Promise<EquipePlantao> => {
    const response = await api.put<EquipePlantao>(`/equipes/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/equipes/${id}`);
    return response.data;
  },

  vincularMembro: async (equipeId: string, data: VincularMembroInput): Promise<MembroEquipe> => {
    const response = await api.post<MembroEquipe>(`/equipes/${equipeId}/membros`, data);
    return response.data;
  },

  updateMembro: async (
    equipeId: string,
    userId: string,
    data: UpdateMembroInput
  ): Promise<MembroEquipe> => {
    const response = await api.patch<MembroEquipe>(`/equipes/${equipeId}/membros/${userId}`, data);
    return response.data;
  },

  desvincularMembro: async (equipeId: string, userId: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/equipes/${equipeId}/membros/${userId}`);
    return response.data;
  },
};
