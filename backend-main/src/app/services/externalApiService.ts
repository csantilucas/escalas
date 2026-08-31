// src/services/externalApiService.ts
import dns from "node:dns";
import prisma from "../../config/postgres.js";
import axios from "axios";
import { externalTokenService } from "../../containers/externalToken.container.js";

dns.setDefaultResultOrder("ipv4first");

export interface TicketUserData {
  email: string;
  name: string;
  qtd_em_atendimento: string;
  qtd_pendentes: string;
  qtd_resolvidos: string;
  qtd_por_usuario: string;
  tma: { minutes: number };
  tme: { minutes: number };
  media_avaliacao: number | null;
}

export interface RelatorioUsuarioTomticket {
  operator_id: string;
  nome_usuario: string;
  quantidade_protocolos: number;
  protocolos: string[];
  media_avaliacao: number;
  evaluations: Record<string, number>;
  chats_com_evaluation: number;
  chats_sem_evaluation: number;
  clientes_atendidos: Array<{ nome: string; nota: number | null }>;
  tempo_medio_minutos: number;
  categorias_atendidas: string[];
}

class ExternalApiService {
  private pausaMs = 500; // Meio segundo de pausa entre requisições

  private departamentosPermitidos = [
    "027fd3ec45b544fe6f6883acbdd7c708",
    "73b564f3d8aa09307fe0247af5272b08",
    "e52a5aeee346806df68ee2d5579a7ac4",
    "19284e98480603eb12016def694ccfdd",
  ];

  private operadoresPermitidos: Record<string, string> = {
    "47330795a4e381bb7ec0107268844721": "Gabriel Henrique",
    "4d978d684d1d656c39911bbfe518fd1d": "Guilherme Dalanhol",
    "d1147111ee07c84b9d1f0932bb96050c": "Geneses Souza",
    "600c5502c892d8d6e0944415a134abfa": "Thiago José",
    "b7493715e9fc105eb8c789b38ab31de6": "Edmilson Júnior",
    "c9a61fe4e48236b7527a7bacb839b19d": "Gustavo Maciel",
    "1c1460c7111c735a48bd74e7c56a253d": "Pedro Mittmann",
    "37a2b3203d2b93aae2d3bd9123044d53": "Kariny Moreira de Paula",
  };

  private zproCache: { data: any[]; timestamp: number } | null = null;
  private ticketsCache: Record<string, { data: TicketUserData[]; timestamp: number }> = {};
  private readonly CACHE_TTL_MS = 10000; // 10 segundos

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async listZproUsers(forceRefresh = false): Promise<any[]> {
    if (!forceRefresh && this.zproCache && Date.now() - this.zproCache.timestamp < this.CACHE_TTL_MS) {
      return this.zproCache.data;
    }

    const config = await externalTokenService.getActiveServiceConfig(
      "zpro",
      "ZPRO_API_TOKEN",
      "ZPRO_API_URL",
      "https://api.alphasoftware.com.br/v2/api/external/9c27a2a0-d676-4aea-a0ed-8da908a4acb6"
    );

    const baseUrl = config.apiUrl.replace(/\/$/, "");
    const url = baseUrl.endsWith("/listUsers") ? baseUrl : `${baseUrl}/listUsers`;

    try {
      console.log(`🌐 [ExternalApi - Z-PRO] Conectando a ${url}...`);

      const response = await axios.get(url, {
        params: { pageNumber: 1 },
        headers: {
          ...(config.token && { Authorization: `Bearer ${config.token}` }),
        },
        timeout: 10000,
      });

      let users: any[] = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          users = response.data[0]?.data || response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          users = response.data.data;
        }
      }

      console.log(`✅ [ExternalApi - Z-PRO] Conexão bem sucedida (Status ${response.status}). ${users.length} usuários obtidos.`);
      this.zproCache = { data: users, timestamp: Date.now() };
      return users;
    } catch (error: any) {
      if (this.zproCache) {
        console.warn(`⚠️ [ExternalApi - Z-PRO] Falha na rede, usando dados em cache: ${error.message}`);
        return this.zproCache.data;
      }
      const status = error.response?.status ? `(Status ${error.response.status})` : "";
      console.error(`❌ [ExternalApi - Z-PRO] Erro na conexão com ${url} ${status}: ${error.message}`);
      throw new Error(`Falha ao buscar usuários no Z-PRO: ${error.message}`);
    }
  }

  async getTicketsPerUser(startDate: string, endDate: string, forceRefresh = false): Promise<TicketUserData[]> {
    const cacheKey = `${startDate}_${endDate}`;
    const cached = this.ticketsCache[cacheKey];
    if (!forceRefresh && cached && Date.now() - cached.timestamp < this.CACHE_TTL_MS) {
      return cached.data;
    }

    const config = await externalTokenService.getActiveServiceConfig(
      "alpha_dash",
      "ALPHA_API_TOKEN",
      "ALPHA_API_URL",
      "https://api.alphasoftware.com.br/v2/api/external/9c27a2a0-d676-4aea-a0ed-8da908a4acb6/dash"
    );

    const baseUrl = config.apiUrl.replace(/\/$/, "");
    const url = baseUrl.endsWith("/ticketsPerUser") ? baseUrl : `${baseUrl}/ticketsPerUser`;

    try {
      console.log(`🌐 [ExternalApi - Alpha Dash] Conectando a ${url} (${startDate} a ${endDate})...`);

      const response = await axios.get(url, {
        params: { startDate, endDate },
        headers: {
          ...(config.token && { Authorization: `Bearer ${config.token}` }),
        },
        timeout: 15000,
      });

      if (response.data && response.data.success) {
        const registros = response.data.data || [];
        console.log(`✅ [ExternalApi - Alpha Dash] Conexão bem sucedida (Status ${response.status}). ${registros.length} analistas retornados.`);
        this.ticketsCache[cacheKey] = { data: registros, timestamp: Date.now() };
        return registros;
      }

      console.warn(`⚠️ [ExternalApi - Alpha Dash] Resposta sem sucesso ou vazia.`);
      return [];
    } catch (error: any) {
      if (cached) {
        console.warn(`⚠️ [ExternalApi - Alpha Dash] Falha na rede, usando dados em cache: ${error.message}`);
        return cached.data;
      }
      const status = error.response?.status ? `(Status ${error.response.status})` : "";
      console.error(`❌ [ExternalApi - Alpha Dash] Erro na conexão com ${url} ${status}: ${error.message}`);
      throw new Error(`Falha na comunicação com o microsserviço externo: ${error.message}`);
    }
  }

  private async fetchTomticketReportFromApi(
    dataInicioStr: string,
    dataFimStr: string
  ): Promise<RelatorioUsuarioTomticket[]> {
    console.log(`🚀 [Tomticket] Iniciando varredura entre ${dataInicioStr} e ${dataFimStr}...`);

    const config = await externalTokenService.getActiveServiceConfig(
      "tomticket",
      "TOMTICKET_BEARER_TOKEN",
      "TOMTICKET_API_URL",
      "https://api.tomticket.com/v2.0/ticket/list"
    );

    if (!config.token) {
      throw new Error("Token do Tomticket não configurado.");
    }

    const relatorioUsuarios: Record<string, any> = {};

    Object.keys(this.operadoresPermitidos).forEach((opId) => {
      relatorioUsuarios[opId] = {
        operator_id: opId,
        nome_usuario: this.operadoresPermitidos[opId],
        quantidade_protocolos: 0,
        protocolos: [],
        media_avaliacao: "0.00",
        evaluations: { nota_5: 0, nota_4: 0, nota_3: 0, nota_2: 0, nota_1: 0, nota_0: 0 },
        chats_com_evaluation: 0,
        chats_sem_evaluation: 0,
        clientes_atendidos: [],
        tempo_medio_minutos: 0,
        categorias_atendidas: [],
        _soma_notas: 0,
        _soma_tempo_segundos: 0,
      };
    });

    for (const deptoId of this.departamentosPermitidos) {
      let pagina = 1;
      let totalPaginas = 1;

      console.log(`\n📂 [Tomticket] Processando departamento: ${deptoId}`);

      while (pagina <= totalPaginas) {
        try {
          console.log(` ↳ Solicitando página ${pagina} de ${totalPaginas}...`);

          const response = await axios.get(config.apiUrl, {
            params: {
              page: pagina,
              department_id: deptoId,
            },
            headers: { Authorization: `Bearer ${config.token}` },
            timeout: 15000,
          });

          const body = response.data;
          if (!body || body.error === true) {
            console.warn(` ⚠️ [Tomticket] Resposta inválida ou erro na página ${pagina}. Parando departamento.`);
            break;
          }

          const ticketsPage = body.data || [];
          if (body.pages && pagina === 1) {
            totalPaginas = body.pages;
            console.log(` 📊 Total de páginas no departamento: ${totalPaginas}`);
          }

          if (ticketsPage.length === 0) {
            console.log(` ℹ️ Página ${pagina} veio vazia. Encerrando departamento.`);
            break;
          }

          let ticketsProcessadosNaPagina = 0;
          let alcancouTicketMaisAntigo = false;

          for (const ticket of ticketsPage) {
            const dataTicketStr = ticket.creation_date ? ticket.creation_date.substring(0, 10) : "";

            if (dataTicketStr > dataFimStr) {
              continue;
            }

            if (dataTicketStr < dataInicioStr) {
              alcancouTicketMaisAntigo = true;
              break;
            }

            const opId = ticket.operator?.id;
            if (!opId || !this.operadoresPermitidos[opId]) continue;

            ticketsProcessadosNaPagina++;
            const userRecord = relatorioUsuarios[opId];
            userRecord.quantidade_protocolos++;
            userRecord.protocolos.push(ticket.protocol);

            if (ticket.category?.name && !userRecord.categorias_atendidas.includes(ticket.category.name)) {
              userRecord.categorias_atendidas.push(ticket.category.name);
            }

            userRecord._soma_tempo_segundos += Number(ticket.work_time) || 0;

            const nomeCliente = ticket.customer?.name || "Não identificado";
            const nota = ticket.evaluation?.grade;

            if (nota !== null && nota !== undefined) {
              userRecord.chats_com_evaluation++;
              userRecord._soma_notas += Number(nota);
              userRecord.evaluations[`nota_${nota}`] = (userRecord.evaluations[`nota_${nota}`] || 0) + 1;
              userRecord.clientes_atendidos.push({ nome: nomeCliente, nota: Number(nota) });
            } else {
              userRecord.chats_sem_evaluation++;
              userRecord.clientes_atendidos.push({ nome: nomeCliente, nota: null });
            }
          }

          console.log(
            `  ✅ Página ${pagina}/${totalPaginas} concluída (${ticketsProcessadosNaPagina} tickets do período encontrados).`
          );

          if (alcancouTicketMaisAntigo) {
            console.log(
              ` 🛑 [Fim do período] Tickets da página ${pagina} alcançaram datas anteriores a ${dataInicioStr}. Encerrando varredura deste departamento.`
            );
            break;
          }

          pagina++;
          await this.delay(this.pausaMs);
        } catch (error: any) {
          console.error(` ❌ Erro na página ${pagina} do depto ${deptoId}:`, error.message);
          break;
        }
      }
    }

    console.log(`\n🎉 [Tomticket] Processamento finalizado com sucesso!`);

    return Object.values(relatorioUsuarios).map((user) => {
      const mediaNotas =
        user.chats_com_evaluation > 0
          ? (user._soma_notas / user.chats_com_evaluation).toFixed(2)
          : "0.00";

      const tempoMedioMinutos =
        user.quantidade_protocolos > 0
          ? Math.round(user._soma_tempo_segundos / user.quantidade_protocolos / 60)
          : 0;

      delete user._soma_notas;
      delete user._soma_tempo_segundos;

      return {
        ...user,
        media_avaliacao: Number(mediaNotas),
        tempo_medio_minutos: tempoMedioMinutos,
      };
    });
  }

  async getTomticketReport(startDate: string, endDate: string, forceRefresh = false): Promise<any> {
    if (!forceRefresh) {
      const cachedReport = await prisma.tomticketReportCache.findUnique({
        where: {
          startDate_endDate: { startDate, endDate },
        },
      });

      if (cachedReport) {
        console.log(`⚡ [Prisma Cache] Relatório (${startDate} até ${endDate}) retornado do banco.`);
        return cachedReport.data;
      }
    }

    console.log(`🐢 [Tomticket API] Buscando dados atualizados na API externa...`);
    const reportData = await this.fetchTomticketReportFromApi(startDate, endDate);

    await prisma.tomticketReportCache.upsert({
      where: {
        startDate_endDate: { startDate, endDate },
      },
      update: {
        data: reportData as any,
        updatedAt: new Date(),
      },
      create: {
        startDate,
        endDate,
        data: reportData as any,
      },
    });

    return reportData;
  }
}

export const externalApiService = new ExternalApiService();