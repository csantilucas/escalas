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

export const distribuicaoService = {
  getPrevisaoFilas: async (): Promise<PrevisaoFila[]> => {
    const response = await api.get<PrevisaoFila[]>("/atendimentos/previsao");
    return response.data;
  },

  distribuir: async (input: DistribuirInput): Promise<DistribuirResponse> => {
    const response = await api.post<DistribuirResponse>("/atendimentos/distribuir", input);
    return response.data;
  },
};
