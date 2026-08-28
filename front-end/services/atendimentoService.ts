// front-end/services/atendimentoService.ts
import api from "@/lib/api";

export interface AtendimentoModel {
  id: string;
  ticketZpro?: string | null;
  ticketTomticket?: string | null;
  sincronizado: boolean;
  clienteId?: string | null;
  cnpj: string;
  atendente?: string | null;
  protocolo?: string | null;
  nomeContato?: string | null;
  tipoAtendimento?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AtendimentoPagination {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AtendimentoListResponse {
  data: AtendimentoModel[];
  pagination: AtendimentoPagination;
}

export interface AtendimentoFilterParams {
  page?: number;
  limit?: number;
  cnpj?: string;
  atendente?: string;
  busca?: string;
  sincronizado?: boolean;
  dataInicio?: string;
  dataFim?: string;
}

// 🟢 Tipagem para as Métricas do Dashboard vindo do Backend
export interface DashboardMetricsResponse {
  metrics: {
    total: number;
    sincronizados: number;
    pendentes: number;
    criadosHoje: number;
    taxaSincronizacao: number;
  };
  porAnalista: Array<{
    analista: string;
    totalAtendimentos: number;
  }>;
}

class AtendimentoServices {
  // GET /atendimentos -> Listar com paginação e filtros
  async list(filters?: AtendimentoFilterParams): Promise<AtendimentoListResponse> {
    const response = await api.get("/atendimentos", {
      params: filters,
    });
    return response.data;
  }

  // 🟢 GET /atendimentos/metrics -> Buscar agregados de métricas do banco
  async getMetrics(filters?: { atendente?: string; dataInicio?: string; dataFim?: string }): Promise<DashboardMetricsResponse> {
    const response = await api.get("/atendimentos/metrics", {
      params: filters,
    });
    return response.data;
  }

  // 🟢 GET /atendimentos/analista/:analista -> Buscar atendimentos paginados de um analista
  async getByAnalista(analista: string, filters?: AtendimentoFilterParams): Promise<AtendimentoListResponse> {
    const response = await api.get(`/atendimentos/analista/${encodeURIComponent(analista)}`, {
      params: filters,
    });
    return response.data;
  }
}

export const atendimentoService = new AtendimentoServices();