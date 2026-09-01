import api from "../lib/api";

export interface PrevisaoFila {
  equipeId: string;
  equipeNome: string;
  queueId: number | null;
  queueName: string | null;
  departamentos: string[];
  totalMembros: number;
  proximoDaFila: {
    id: string;
    nome: string;
    zproId: number | null;
    email: string;
    ultimoAtendimentoEm: string | null;
  } | null;
}

export interface DistribuirInput {
  departamento?: string;
  fila?: string;
  ticketId?: string | number;
  clienteId?: string | number;
  numero?: string;
  pushName?: string;
  ignorarApisExternas?: boolean;
}

export interface DistribuirResponse {
  sucesso: boolean;
  status: string;
  userId: number | null;
  atendenteNome: string | null;
  atendenteEmail: string | null;
  atendenteSlack: string | null;
  queueId: number | null;
  queueName: string | null;
  equipeNome: string;
  modoDistribuicao: string;
  pontuacaoCarga: number;
  metricas?: {
    abertos: number;
    pendentes: number;
    fechadosHoje: number;
  };
  error?: string;
}

export interface DistribuicaoLogItem {
  id: string;
  ticketId?: string | null;
  clienteId?: string | null;
  numero?: string | null;
  pushName?: string | null;
  departamento?: string | null;
  fila?: string | null;
  equipeNome?: string | null;
  queueId?: number | null;
  queueName?: string | null;
  userId?: number | null;
  atendenteNome?: string | null;
  atendenteEmail?: string | null;
  atendenteSlack?: string | null;
  modoDistribuicao: string;
  pontuacaoCarga?: number | null;
  metricas?: {
    abertos: number;
    pendentes: number;
    fechadosHoje: number;
  } | null;
  sucesso: boolean;
  status: string;
  detalhes?: any;
  createdAt: string;
  updatedAt: string;
}

export interface DistribuicaoLogFilterParams {
  page?: number;
  limit?: number;
  modo?: string;
  atendente?: string;
  equipeNome?: string;
  busca?: string;
  sucesso?: boolean;
  dataInicio?: string;
  dataFim?: string;
}

export interface DistribuicaoLogPaginationResponse {
  data: DistribuicaoLogItem[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    perPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const distribuicaoService = {
  getPrevisaoFilas: async (): Promise<PrevisaoFila[]> => {
    const response = await api.get<PrevisaoFila[]>("/atendimentos/previsao");
    return response.data;
  },

  distribuir: async (input: DistribuirInput): Promise<DistribuirResponse> => {
    const response = await api.post<DistribuirResponse>("/atendimentos/distribuir", input);
    return response.data;
  },

  getLogs: async (params?: DistribuicaoLogFilterParams): Promise<DistribuicaoLogPaginationResponse> => {
    const response = await api.get<DistribuicaoLogPaginationResponse>("/atendimentos/distribuicao/logs", {
      params,
    });
    return response.data;
  },

  getRecentLogs: async (limit = 50): Promise<DistribuicaoLogItem[]> => {
    const response = await api.get<DistribuicaoLogItem[]>("/atendimentos/distribuicao/recentes", {
      params: { limit },
    });
    return response.data;
  },
};
