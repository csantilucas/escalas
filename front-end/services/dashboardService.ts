// src/services/dashboardService.ts
import api from "../lib/api";

export interface TicketUserData {
  email: string;
  name: string;
  qtd_em_atendimento: string;
  qtd_pendentes: string;
  qtd_resolvidos: string;
  qtd_por_usuario: string;
  tma: {
    minutes: number;
  };
  tme: {
    minutes: number;
  };
  media_avaliacao: number | null;
}

// 🟢 Tipos do Tomticket
export interface ClienteAtendidoTomticket {
  nome: string;
  nota: number | null;
}

export interface RelatorioTomticket {
  operator_id: string;
  nome_usuario: string;
  quantidade_protocolos: number;
  protocolos: string[];
  media_avaliacao: number;
  evaluations: Record<string, number>;
  chats_com_evaluation: number;
  chats_sem_evaluation: number;
  clientes_atendidos: ClienteAtendidoTomticket[];
  tempo_medio_minutos: number;
  categorias_atendidas: string[];
}

class DashboardServices {
  // GET /dashboard/tickets -> Método original da Alpha Software
  async getTicketsReport(startDate: string, endDate: string): Promise<TicketUserData[]> {
    if (!startDate || !endDate) {
      throw new Error("As datas de início e fim são obrigatórias.");
    }
    
    const response = await api.get("/dashboard/tickets", {
      params: { startDate, endDate }
    });
    
    return response.data;
  }

  // 🟢 Método único para o Tomticket (Busca do banco ou consulta a API se não existir)
  async getTomticketReport(startDate: string, endDate: string, refresh = false): Promise<RelatorioTomticket[]> {
    if (!startDate || !endDate) {
      throw new Error("As datas de início e fim são obrigatórias.");
    }

    const response = await api.get("/dashboard/tomticket", {
      params: { startDate, endDate, refresh }
    });

    return response.data;
  }
}

export const dashboardService = new DashboardServices();