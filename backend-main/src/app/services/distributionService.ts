import { EquipeRepository } from "../repository/equipeRepo.js";
import { DistribuicaoLogRepository, type DistribuicaoLogFilterQuery } from "../repository/distribuicaoLogRepo.js";
import { AtendimentoRepository } from "../repository/atendimentoRepo.js";
import { externalApiService, type TicketUserData } from "./externalApiService.js";
import { sseEventBus } from "../../config/sseEvents.js";

export interface DistribuirInput {
  departamento?: string;
  fila?: string;
  queueId?: number | string;
  ticketId?: number | string;
  clienteId?: number | string;
  numero?: string;
  pushName?: string;
  horarioMinutosOverride?: number;
  ignorarApisExternas?: boolean; // Útil para simular e testar o fallback sequencial
}

export interface DistribuirResult {
  sucesso: boolean;
  status: "open" | "pending";
  userId: number | null;
  atendenteNome: string | null;
  atendenteEmail?: string | null;
  atendenteSlack?: string | null;
  queueId: number;
  queueName: string;
  modoDistribuicao: string;
  pontuacaoCarga?: number;
  metricas?: {
    abertos: number;
    pendentes: number;
    fechadosHoje: number;
  };
  equipeNome?: string;
  proximoDaFila?: {
    userId: number;
    nome: string;
  } | null;
}

export function parseTimeToMinutes(timeStr: string): number | null {
  if (!timeStr || typeof timeStr !== "string") return null;
  const parts = timeStr.trim().split(":");
  if (parts.length < 2) return null;
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  if (isNaN(h) || isNaN(m)) return null;
  return h * 60 + m;
}

export function getCurrentManausMinutes(): number {
  const agora = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Manaus",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const parts = formatter.formatToParts(agora);
  let hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
  if (hour === 24) hour = 0;
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
  return hour * 60 + minute;
}

export function isWithinShift(
  minutosAtuais: number,
  turnos: any,
  margemInicio = 5,
  margemFim = 5
): boolean {
  if (!turnos || (Array.isArray(turnos) && turnos.length === 0)) {
    return true;
  }

  const parsedTurns: [number, number][] = [];
  for (const t of turnos) {
    if (Array.isArray(t) && t.length >= 2) {
      const start = typeof t[0] === "number" ? t[0] : parseTimeToMinutes(t[0]);
      const end = typeof t[1] === "number" ? t[1] : parseTimeToMinutes(t[1]);
      if (start !== null && end !== null) parsedTurns.push([start, end]);
    } else if (t && typeof t === "object") {
      const start = typeof t.inicio === "number" ? t.inicio : parseTimeToMinutes(t.inicio || t.start);
      const end = typeof t.fim === "number" ? t.fim : parseTimeToMinutes(t.fim || t.end);
      if (start !== null && end !== null) parsedTurns.push([start, end]);
    }
  }

  if (parsedTurns.length === 0) return true;

  return parsedTurns.some(([start, end]) => {
    const inicioComMargem = start + margemInicio;
    const fimComMargem = end - margemFim;
    return minutosAtuais >= inicioComMargem && minutosAtuais <= fimComMargem;
  });
}

export class DistributionService {
  private equipeRepo: EquipeRepository;
  private distribuicaoLogRepo?: DistribuicaoLogRepository;
  private atendimentoRepo?: AtendimentoRepository;
  private readonly PESO_ABERTOS = 10;
  private readonly PESO_PENDENTES = 5;
  private readonly PESO_TOTAL_DIA = 1;

  constructor(
    equipeRepository: EquipeRepository,
    distribuicaoLogRepository?: DistribuicaoLogRepository,
    atendimentoRepository?: AtendimentoRepository
  ) {
    this.equipeRepo = equipeRepository;
    this.distribuicaoLogRepo = distribuicaoLogRepository;
    this.atendimentoRepo = atendimentoRepository;
  }

  private async persistLog(input: DistribuirInput, result: DistribuirResult): Promise<void> {
    try {
      if (this.distribuicaoLogRepo) {
        await this.distribuicaoLogRepo.create({
          ticketId: input.ticketId !== undefined && input.ticketId !== null ? String(input.ticketId) : null,
          clienteId: input.clienteId !== undefined && input.clienteId !== null ? String(input.clienteId) : null,
          numero: input.numero ? String(input.numero) : null,
          pushName: input.pushName ? String(input.pushName) : null,
          departamento: input.departamento ? String(input.departamento) : null,
          fila: input.fila ? String(input.fila) : null,
          equipeNome: result.equipeNome || null,
          queueId: result.queueId || null,
          queueName: result.queueName || null,
          userId: result.userId || null,
          atendenteNome: result.atendenteNome || null,
          atendenteEmail: result.atendenteEmail || null,
          atendenteSlack: result.atendenteSlack || null,
          modoDistribuicao: result.modoDistribuicao,
          pontuacaoCarga: result.pontuacaoCarga || 0,
          metricas: result.metricas || null,
          sucesso: result.sucesso,
          status: result.status,
          detalhes: {
            input,
            result,
          },
        });
      }
    } catch (error: any) {
      console.error("❌ [DistributionService] Erro ao persistir log de distribuição:", error.message || error);
    }
  }

  async getLogs(filters: DistribuicaoLogFilterQuery) {
    if (!this.distribuicaoLogRepo) return { data: [], pagination: { totalRecords: 0, currentPage: 1, totalPages: 0, perPage: 20, hasNextPage: false, hasPrevPage: false } };
    return await this.distribuicaoLogRepo.findWithFilters(filters);
  }

  async getRecentLogs(limit = 50) {
    if (!this.distribuicaoLogRepo) return [];
    return await this.distribuicaoLogRepo.findRecent(limit);
  }

  async distribuir(input: DistribuirInput): Promise<DistribuirResult> {
    const depto = input.departamento?.trim() || "";
    const filaName = input.fila?.trim() || "";
    const minutosAtuais =
      input.horarioMinutosOverride !== undefined
        ? input.horarioMinutosOverride
        : getCurrentManausMinutes();

    // 1. Identificar a equipe correspondente ao departamento/fila/queueId
    let equipe = await this.equipeRepo.findByDepartamentoOuFila(
      input.departamento,
      input.fila,
      input.queueId
    );
    if (!equipe) {
      equipe = await this.equipeRepo.findFallbackEquipe();
    }

    if (!equipe) {
      const res: DistribuirResult = {
        sucesso: false,
        status: "pending",
        userId: null,
        atendenteNome: null,
        queueId: 6,
        queueName: filaName || "N1-Suporte",
        modoDistribuicao: "sem_equipes_cadastradas",
      };
      await this.persistLog(input, res);
      return res;
    }

    const queueId = equipe.queueId || 6;
    const queueName = equipe.queueName || filaName || equipe.nome || "N1-Suporte";
    const membrosAtivos = (equipe.membros || []).filter((m: any) => m.ativo && m.user);

    if (membrosAtivos.length === 0) {
      const res: DistribuirResult = {
        sucesso: true,
        status: "pending",
        userId: null,
        atendenteNome: null,
        queueId,
        queueName,
        equipeNome: equipe.nome,
        modoDistribuicao: "equipe_sem_membros",
      };
      await this.persistLog(input, res);
      return res;
    }

    // 2. Filtrar membros elegíveis por turno
    const membrosNoTurno = membrosAtivos.filter((m: any) =>
      isWithinShift(minutosAtuais, m.turnos, m.margemInicioMinutos, m.margemFimMinutos)
    );

    const candidatosIniciais = membrosNoTurno.length > 0 ? membrosNoTurno : membrosAtivos;

    // 3. Tentar distribuição inteligente consultando APIs externas do Z-PRO e Alpha
    let modoDistribuicao = "pontuacao_ponderada";
    let analistaEscolhido: any = null;
    let metricasEscolhidas: any = null;
    let pontuacaoCarga = 0;

    if (!input.ignorarApisExternas) {
      try {
        const hojeStr = new Date().toISOString().substring(0, 10);
        console.log("🌐 [DistributionEngine] Consultando Z-PRO (/listUsers) e Alpha Dash (/ticketsPerUser) em tempo real...");

        const [usuariosZpro, cargasAlpha] = await Promise.all([
          externalApiService.listZproUsers(),
          externalApiService.getTicketsPerUser(hojeStr, hojeStr),
        ]);

        console.log(
          `✅ [DistributionEngine] Dados obtidos das APIs externas. Z-PRO: ${usuariosZpro.length} usuários, Alpha: ${cargasAlpha.length} cargas.`
        );

        const mapaCargas: Record<string, TicketUserData> = {};
        for (const c of cargasAlpha) {
          if (c.email) mapaCargas[c.email.toLowerCase().trim()] = c;
          if (c.name) mapaCargas[c.name.toLowerCase().trim()] = c;
        }

        const onlineZproMap = new Map<number, any>();
        for (const u of usuariosZpro) {
          if (u.isOnline === true || u.isOnline === "true" || u.isOnline === 1) {
            onlineZproMap.set(Number(u.id), u);
          }
        }

        // Filtrar apenas candidatos que estão ONLINE no Z-PRO
        const candidatosOnline = candidatosIniciais.filter((m: any) => {
          const zId = m.user.zproId ? Number(m.user.zproId) : null;
          if (zId && onlineZproMap.has(zId)) return true;

          // Fallback por nome ou email
          const nomeClean = (m.user.name || "").toLowerCase().trim();
          const emailClean = (m.user.email || "").toLowerCase().trim();
          for (const [id, uOnline] of onlineZproMap.entries()) {
            const uNome = (uOnline.name || "").toLowerCase().trim();
            const uEmail = (uOnline.email || "").toLowerCase().trim();
            if (
              (uNome && (uNome.includes(nomeClean) || nomeClean.includes(uNome))) ||
              (uEmail && uEmail === emailClean)
            ) {
              m.user.zproId = id;
              return true;
            }
          }
          return false;
        });

        if (candidatosOnline.length > 0) {
          // Calcular pontuação de carga para cada candidato online
          const pontuados = candidatosOnline.map((m: any) => {
            const emailKey = (m.user.email || "").toLowerCase().trim();
            const nomeKey = (m.user.name || "").toLowerCase().trim();
            const metrica = mapaCargas[emailKey] || mapaCargas[nomeKey];

            const abertos = Number(metrica?.qtd_em_atendimento || 0);
            const pendentes = Number(metrica?.qtd_pendentes || 0);
            const fechados = Number(metrica?.qtd_resolvidos || metrica?.qtd_por_usuario || 0);

            const score =
              abertos * this.PESO_ABERTOS +
              pendentes * this.PESO_PENDENTES +
              fechados * this.PESO_TOTAL_DIA;

            return {
              membro: m,
              abertos,
              pendentes,
              fechados,
              score,
              prioridade: m.pesoPrioridade || 0,
            };
          });

          // Tratar regras especiais de prioridade
          const altaPrioridade = pontuados.filter((p: any) => p.prioridade > 0);
          const normais = pontuados.filter((p: any) => p.prioridade === 0);
          const ultimoRecurso = pontuados.filter((p: any) => p.prioridade < 0);

          let grupoAlvo = normais;
          if (altaPrioridade.length > 0) {
            grupoAlvo = altaPrioridade;
            modoDistribuicao = "prioridade_membro";
          } else if (normais.length === 0 && ultimoRecurso.length > 0) {
            grupoAlvo = ultimoRecurso;
            modoDistribuicao = "ultimo_recurso";
          }

          if (grupoAlvo.length > 0) {
            const menorScore = Math.min(...grupoAlvo.map((p: any) => p.score));
            const empatados = grupoAlvo.filter((p: any) => p.score === menorScore);
            const sorteado = empatados[Math.floor(Math.random() * empatados.length)];

            analistaEscolhido = sorteado.membro;
            pontuacaoCarga = sorteado.score;
            metricasEscolhidas = {
              abertos: sorteado.abertos,
              pendentes: sorteado.pendentes,
              fechadosHoje: sorteado.fechados,
            };

            if (modoDistribuicao === "pontuacao_ponderada") {
              modoDistribuicao =
                empatados.length > 1
                  ? "ponderado_desempate_sorteio"
                  : "ponderado_menor_carga";
            }
          }
        }
      } catch (error: any) {
        console.warn(
          "⚠️ [DistributionService] APIs externas indisponíveis. Ativando Fallback Sequencial Round-Robin:",
          error.message
        );
      }
    }

    // 4. FALLBACK SEQUENCIAL (ROUND-ROBIN):
    // Se não foi possível escolher pelas APIs externas, seleciona o próximo da fila no banco
    if (!analistaEscolhido) {
      modoDistribuicao = "fallback_sequencial_round_robin";

      // Ordenar por ultimoAtendimentoEm (os mais antigos primeiro, nulls primeiro), depois por ordemSequencial
      const ordenados = [...candidatosIniciais].sort((a: any, b: any) => {
        if (!a.ultimoAtendimentoEm && b.ultimoAtendimentoEm) return -1;
        if (a.ultimoAtendimentoEm && !b.ultimoAtendimentoEm) return 1;
        if (a.ultimoAtendimentoEm && b.ultimoAtendimentoEm) {
          const diffTime =
            new Date(a.ultimoAtendimentoEm).getTime() - new Date(b.ultimoAtendimentoEm).getTime();
          if (diffTime !== 0) return diffTime;
        }
        return (a.ordemSequencial || 0) - (b.ordemSequencial || 0);
      });

      analistaEscolhido = ordenados[0];
      metricasEscolhidas = { abertos: 0, pendentes: 0, fechadosHoje: 0 };
    }

    // 5. Atualizar o timestamp de último atendimento no banco
    if (analistaEscolhido) {
      await this.equipeRepo.updateUltimoAtendimento(analistaEscolhido.id);

      const zproUserId =
        analistaEscolhido.user.zproId !== null && analistaEscolhido.user.zproId !== undefined
          ? Number(analistaEscolhido.user.zproId)
          : null;

      const result: DistribuirResult = {
        sucesso: true,
        status: "open",
        userId: zproUserId,
        atendenteNome: analistaEscolhido.user.name,
        atendenteEmail: analistaEscolhido.user.email,
        atendenteSlack: analistaEscolhido.user.slackId || null,
        queueId,
        queueName,
        equipeNome: equipe.nome,
        modoDistribuicao,
        pontuacaoCarga,
        metricas: metricasEscolhidas,
      };

      await this.persistLog(input, result);

      // 6. Atualizar o atendente na tabela de atendimentos e notificar SSE
      if (input.ticketId && this.atendimentoRepo) {
        try {
          const atendAtualizado = await this.atendimentoRepo.upsertAtendentePorTicket(
            String(input.ticketId),
            analistaEscolhido.user.name,
            {
              clienteId: input.clienteId ? String(input.clienteId) : null,
              nomeContato: input.pushName ? String(input.pushName) : null,
              tipoAtendimento: input.departamento ? String(input.departamento) : null,
            }
          );
          sseEventBus.notify("atendimento", "update", atendAtualizado);
        } catch (atendErr: any) {
          console.warn(
            "⚠️ [DistributionService] Falha ao atualizar atendente na tabela de atendimentos:",
            atendErr.message || atendErr
          );
        }
      }

      sseEventBus.notify("distribuicao", "create", {
        ...result,
        ticketId: input.ticketId,
        clienteId: input.clienteId,
        numero: input.numero,
        data: new Date().toISOString(),
      });

      return result;
    }

    const fallbackResult: DistribuirResult = {
      sucesso: true,
      status: "pending",
      userId: null,
      atendenteNome: null,
      queueId,
      queueName,
      equipeNome: equipe.nome,
      modoDistribuicao: "fallback_no_online",
    };

    await this.persistLog(input, fallbackResult);

    if (input.ticketId && this.atendimentoRepo) {
      try {
        const atendAtualizado = await this.atendimentoRepo.upsertAtendentePorTicket(
          String(input.ticketId),
          "Pendente na Fila",
          {
            clienteId: input.clienteId ? String(input.clienteId) : null,
            nomeContato: input.pushName ? String(input.pushName) : null,
            tipoAtendimento: input.departamento ? String(input.departamento) : null,
          }
        );
        sseEventBus.notify("atendimento", "update", atendAtualizado);
      } catch (atendErr: any) {
        console.warn(
          "⚠️ [DistributionService] Falha ao atualizar atendimento pendente:",
          atendErr.message || atendErr
        );
      }
    }

    sseEventBus.notify("distribuicao", "create", {
      ...fallbackResult,
      ticketId: input.ticketId,
      clienteId: input.clienteId,
      numero: input.numero,
      data: new Date().toISOString(),
    });

    return fallbackResult;
  }

  async getPrevisaoFilas(): Promise<any[]> {
    const equipes = await this.equipeRepo.findAllWithMembers();
    const minutosAtuais = getCurrentManausMinutes();
    const hojeStr = new Date().toISOString().substring(0, 10);

    let usuariosZpro: any[] = [];
    let cargasAlpha: TicketUserData[] = [];

    try {
      [usuariosZpro, cargasAlpha] = await Promise.all([
        externalApiService.listZproUsers(),
        externalApiService.getTicketsPerUser(hojeStr, hojeStr),
      ]);
    } catch (e) {}

    const mapaCargas: Record<string, TicketUserData> = {};
    for (const c of cargasAlpha) {
      if (c.email) mapaCargas[c.email.toLowerCase().trim()] = c;
      if (c.name) mapaCargas[c.name.toLowerCase().trim()] = c;
    }

    const onlineZproMap = new Map<number, any>();
    for (const u of usuariosZpro) {
      if (u.isOnline === true || u.isOnline === "true" || u.isOnline === 1) {
        onlineZproMap.set(Number(u.id), u);
      }
    }

    return equipes.map((eq) => {
      const membros = eq.membros || [];
      const membrosAtivos = membros.filter((m: any) => m.ativo);

      // 1. Filtrar membros dentro do turno
      const membrosNoTurno = membrosAtivos.filter((m: any) =>
        isWithinShift(minutosAtuais, m.turnos, m.margemInicioMinutos, m.margemFimMinutos)
      );

      const candidatosIniciais = membrosNoTurno.length > 0 ? membrosNoTurno : membrosAtivos;

      // 2. Filtrar quem está ONLINE no Z-PRO
      const candidatosOnline = candidatosIniciais.filter((m: any) => {
        const zId = m.user.zproId ? Number(m.user.zproId) : null;
        if (zId && onlineZproMap.has(zId)) return true;

        const nomeClean = (m.user.name || "").toLowerCase().trim();
        const emailClean = (m.user.email || "").toLowerCase().trim();
        for (const [id, uOnline] of onlineZproMap.entries()) {
          const uNome = (uOnline.name || "").toLowerCase().trim();
          const uEmail = (uOnline.email || "").toLowerCase().trim();
          if (
            (uNome && (uNome.includes(nomeClean) || nomeClean.includes(uNome))) ||
            (uEmail && uEmail === emailClean)
          ) {
            return true;
          }
        }
        return false;
      });

      let escolhido: any = null;
      let modo = "pontuacao_ponderada";
      let metricasEscolhidas = { abertos: 0, pendentes: 0, fechados: 0, score: 0 };

      if (candidatosOnline.length > 0) {
        const pontuados = candidatosOnline.map((m: any) => {
          const emailKey = (m.user.email || "").toLowerCase().trim();
          const nomeKey = (m.user.name || "").toLowerCase().trim();
          const metrica = mapaCargas[emailKey] || mapaCargas[nomeKey];

          const abertos = Number(metrica?.qtd_em_atendimento || 0);
          const pendentes = Number(metrica?.qtd_pendentes || 0);
          const fechados = Number(metrica?.qtd_resolvidos || metrica?.qtd_por_usuario || 0);

          const score =
            abertos * this.PESO_ABERTOS +
            pendentes * this.PESO_PENDENTES +
            fechados * this.PESO_TOTAL_DIA;

          return {
            membro: m,
            abertos,
            pendentes,
            fechados,
            score,
            prioridade: m.pesoPrioridade || 0,
          };
        });

        // Ordenar por score ascendente (menor carga primeiro), depois por ordemSequencial
        pontuados.sort((a: any, b: any) => {
          if (a.score !== b.score) return a.score - b.score;
          return (a.membro.ordemSequencial || 0) - (b.membro.ordemSequencial || 0);
        });

        escolhido = pontuados[0]?.membro;
        metricasEscolhidas = {
          abertos: pontuados[0]?.abertos || 0,
          pendentes: pontuados[0]?.pendentes || 0,
          fechados: pontuados[0]?.fechados || 0,
          score: pontuados[0]?.score || 0,
        };
      }

      // 3. Fallback sequencial se nenhum membro estiver online
      if (!escolhido) {
        modo = "fallback_sequencial";
        const ordenados = [...candidatosIniciais].sort((a: any, b: any) => {
          if (!a.ultimoAtendimentoEm && b.ultimoAtendimentoEm) return -1;
          if (a.ultimoAtendimentoEm && !b.ultimoAtendimentoEm) return 1;
          if (a.ultimoAtendimentoEm && b.ultimoAtendimentoEm) {
            return (
              new Date(a.ultimoAtendimentoEm).getTime() - new Date(b.ultimoAtendimentoEm).getTime()
            );
          }
          return (a.ordemSequencial || 0) - (b.ordemSequencial || 0);
        });
        escolhido = ordenados[0];
      }

      const proximo = escolhido?.user
        ? {
            id: escolhido.user.id,
            nome: escolhido.user.name,
            zproId: escolhido.user.zproId,
            email: escolhido.user.email,
            slackId: escolhido.user.slackId,
            ultimoAtendimentoEm: escolhido.ultimoAtendimentoEm,
            metricas: metricasEscolhidas,
            modo,
            isOnline: candidatosOnline.some((c: any) => c.user.id === escolhido.user.id),
          }
        : null;

      return {
        equipeId: eq.id,
        equipeNome: eq.nome,
        queueId: eq.queueId,
        queueName: eq.queueName,
        cor: eq.cor,
        departamentos: eq.departamentos,
        totalMembros: membros.length,
        membrosOnline: candidatosOnline.length,
        proximoDaFila: proximo,
      };
    });
  }
}
