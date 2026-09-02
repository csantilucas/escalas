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
  cnpj?: string;
  protocolo?: string;
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
  queueId: number | null;
  queueName: string | null;
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
    const inicioComMargem = Math.max(0, start - margemInicio);
    const fimComMargem = end - margemFim;
    return minutosAtuais >= inicioComMargem && minutosAtuais <= fimComMargem;
  });
}

export function matchesSequenceName(eq: any, seqName: string): boolean {
  if (!eq) return false;
  const normSeq = seqName.toLowerCase().trim();
  const nome = (eq.nome || "").toLowerCase().trim();
  const qName = (eq.queueName || "").toLowerCase().trim();
  const qId = eq.queueId !== undefined && eq.queueId !== null ? Number(eq.queueId) : null;

  if (normSeq === "n1") {
    return qId === 6 || nome === "n1" || nome.startsWith("n1") || qName === "n1" || qName.startsWith("n1");
  }
  if (normSeq === "n2") {
    return qId === 7 || nome === "n2" || nome.startsWith("n2") || qName === "n2" || qName.startsWith("n2");
  }
  if (normSeq === "n3") {
    return qId === 8 || nome === "n3" || nome.startsWith("n3") || qName === "n3" || qName.startsWith("n3");
  }
  if (normSeq === "financeiro") {
    return qId === 2 || nome.includes("financeiro") || qName.includes("financeiro");
  }
  return nome === normSeq || qName === normSeq;
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

  private selecionarAnalistaNaEquipe(
    equipe: any,
    minutosAtuais: number,
    onlineZproMap: Map<number, any> | null,
    mapaCargas: Record<string, any>,
    permitirOffline = false
  ): {
    analista: any;
    score: number;
    metricas: { abertos: number; pendentes: number; fechadosHoje: number };
    modo: string;
  } | null {
    const membrosAtivos = (equipe.membros || []).filter((m: any) => m.ativo && m.user);
    if (membrosAtivos.length === 0) return null;

    // 1. Filtrar estritamente membros dentro do turno
    // NUNCA fazer fallback para membros fora do turno!
    const membrosNoTurno = membrosAtivos.filter((m: any) =>
      isWithinShift(minutosAtuais, m.turnos, m.margemInicioMinutos, m.margemFimMinutos)
    );

    if (membrosNoTurno.length === 0) {
      return null;
    }

    // 2. Filtrar quem está ONLINE no Z-PRO
    let candidatosOnline: any[] = [];
    if (onlineZproMap) {
      candidatosOnline = membrosNoTurno.filter((m: any) => {
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
            m.user.zproId = id;
            return true;
          }
        }
        return false;
      });
    } else if (permitirOffline) {
      candidatosOnline = membrosNoTurno;
    }

    if (candidatosOnline.length === 0) {
      return null;
    }

    // 3. Ponderação de carga com base nos atendimentos salvos no banco local
    const pontuados = candidatosOnline.map((m: any) => {
      const emailKey = (m.user.email || "").toLowerCase().trim();
      const nomeKey = (m.user.name || "").toLowerCase().trim();
      const metrica = mapaCargas[emailKey] || mapaCargas[nomeKey];

      const pendentes = Number(metrica?.qtd_pendentes || 0);
      const fechados = Number(metrica?.qtd_resolvidos || 0);
      const total = Number(metrica?.qtd_por_usuario || pendentes + fechados);

      const score = pendentes * this.PESO_PENDENTES + fechados * this.PESO_TOTAL_DIA;

      return {
        membro: m,
        pendentes,
        fechados,
        total,
        score,
        prioridade: m.pesoPrioridade || 0,
      };
    });

    const altaPrioridade = pontuados.filter((p: any) => p.prioridade > 0);
    const normais = pontuados.filter((p: any) => p.prioridade === 0);
    const ultimoRecurso = pontuados.filter((p: any) => p.prioridade < 0);

    let grupoAlvo = normais;
    let modo = "pontuacao_ponderada";

    if (altaPrioridade.length > 0) {
      grupoAlvo = altaPrioridade;
      modo = "prioridade_membro";
    } else if (normais.length === 0 && ultimoRecurso.length > 0) {
      grupoAlvo = ultimoRecurso;
      modo = "ultimo_recurso";
    }

    if (grupoAlvo.length === 0) return null;

    const menorScore = Math.min(...grupoAlvo.map((p: any) => p.score));
    const empatados = grupoAlvo.filter((p: any) => p.score === menorScore);

    // Desempate: quem atendeu há mais tempo (ultimoAtendimentoEm ASC, nulls primeiro), depois ordemSequencial ASC
    empatados.sort((a: any, b: any) => {
      if (!a.membro.ultimoAtendimentoEm && b.membro.ultimoAtendimentoEm) return -1;
      if (a.membro.ultimoAtendimentoEm && !b.membro.ultimoAtendimentoEm) return 1;
      if (a.membro.ultimoAtendimentoEm && b.membro.ultimoAtendimentoEm) {
        const diff =
          new Date(a.membro.ultimoAtendimentoEm).getTime() -
          new Date(b.membro.ultimoAtendimentoEm).getTime();
        if (diff !== 0) return diff;
      }
      return (a.membro.ordemSequencial || 0) - (b.membro.ordemSequencial || 0);
    });

    const escolhido = empatados[0];

    if (modo === "pontuacao_ponderada") {
      modo =
        empatados.length > 1
          ? "ponderado_menor_carga_desempate_antiguidade"
          : "ponderado_menor_carga";
    }

    return {
      analista: escolhido.membro,
      score: escolhido.score,
      metricas: {
        abertos: escolhido.pendentes,
        pendentes: escolhido.pendentes,
        fechadosHoje: escolhido.fechados,
      },
      modo,
    };
  }

  async distribuir(input: DistribuirInput): Promise<DistribuirResult> {
    const depto = input.departamento?.trim() || "";
    const filaName = input.fila?.trim() || "";
    const minutosAtuais =
      input.horarioMinutosOverride !== undefined
        ? input.horarioMinutosOverride
        : getCurrentManausMinutes();

    // 1. Carregar todas as equipes ativas e identificar a equipe inicial solicitada
    const todasEquipes = await this.equipeRepo.findAllWithMembers();
    const equipesAtivas = (todasEquipes || []).filter((eq: any) => eq.ativo);

    let equipeAlvo = await this.equipeRepo.findByDepartamentoOuFila(
      input.departamento,
      input.fila,
      input.queueId
    );

    if (!equipeAlvo && equipesAtivas.length > 0) {
      equipeAlvo = equipesAtivas.find((e: any) => e.isFallback) || equipesAtivas[0];
    }

    if (!equipeAlvo && equipesAtivas.length === 0) {
      const res: DistribuirResult = {
        sucesso: false,
        status: "pending",
        userId: null,
        atendenteNome: null,
        queueId: null,
        queueName: filaName || "N1-Suporte",
        modoDistribuicao: "sem_equipes_cadastradas",
      };
      await this.persistLog(input, res);
      return res;
    }

    // 2. Consultar usuários online no Z-PRO e produtividade da tabela local de atendimentos
    let onlineZproMap: Map<number, any> | null = null;
    let mapaCargas: Record<string, any> = {};
    let isApiFailure = false;

    if (!input.ignorarApisExternas) {
      try {
        console.log("🌐 [DistributionEngine] Consultando usuários online no Z-PRO e carga da tabela local...");
        const [usuariosZpro, produtividadeLocal] = await Promise.all([
          externalApiService.listZproUsers().catch((err) => {
            console.warn("⚠️ [DistributionEngine] Falha ao listar usuários no Z-PRO:", err.message || err);
            isApiFailure = true;
            return [];
          }),
          this.atendimentoRepo
            ? this.atendimentoRepo.getProdutividadePorPeriodo().catch((err) => {
                console.warn("⚠️ [DistributionEngine] Falha ao consultar produtividade local:", err.message || err);
                return [];
              })
            : Promise.resolve([]),
        ]);

        for (const p of (produtividadeLocal as any[])) {
          const emailK = (p.email || "").toLowerCase().trim();
          const nomeK = (p.name || "").toLowerCase().trim();
          if (emailK) mapaCargas[emailK] = p;
          if (nomeK) mapaCargas[nomeK] = p;
        }

        if (!isApiFailure && Array.isArray(usuariosZpro)) {
          onlineZproMap = new Map<number, any>();
          for (const u of usuariosZpro) {
            if (u.isOnline === true || u.isOnline === "true" || u.isOnline === 1) {
              onlineZproMap.set(Number(u.id), u);
            }
          }
        }
      } catch (err: any) {
        console.warn("⚠️ [DistributionService] Erro ao carregar APIs externas:", err.message);
        isApiFailure = true;
      }
    }

    // 3. Tentar encontrar analista na equipe solicitada inicialmente (equipeAlvo)
    let analistaEscolhido: any = null;
    let equipeEscolhida: any = equipeAlvo;
    let pontuacaoCarga = 0;
    let metricasEscolhidas: any = { abertos: 0, pendentes: 0, fechadosHoje: 0 };
    let modoDistribuicao = "ponderado_menor_carga";

    if (equipeAlvo) {
      const selecao = this.selecionarAnalistaNaEquipe(
        equipeAlvo,
        minutosAtuais,
        onlineZproMap,
        mapaCargas,
        input.ignorarApisExternas || isApiFailure
      );

      if (selecao) {
        analistaEscolhido = selecao.analista;
        pontuacaoCarga = selecao.score;
        metricasEscolhidas = selecao.metricas;
        modoDistribuicao = isApiFailure ? "fallback_sequencial_round_robin" : selecao.modo;
        equipeEscolhida = equipeAlvo;
      }
    }

    // 4. Se a equipe alvo não tiver analista elegível (fora do turno ou offline),
    // percorrer a sequência de fallback entre as filas baseando-se na ordem configurada no cadastro (posicaoFallback)
    if (!analistaEscolhido) {
      console.log(
        `ℹ️ [DistributionService] Nenhum analista disponível na fila alvo '${equipeAlvo?.nome || filaName}'. Iniciando sequência de fallback entre filas por posicaoFallback...`
      );

      // Abordagem A: Apenas equipes ativas com posicaoFallback configurado (> 0) participam da rotação de fallback
      // Equipes com posicaoFallback = 0 ou nulo NÃO recebem chamados transbordados de outras filas
      const equipesOrdenadas = equipesAtivas
        .filter((e: any) => e.posicaoFallback && e.posicaoFallback > 0)
        .sort((a: any, b: any) => (a.posicaoFallback || 0) - (b.posicaoFallback || 0));

      for (const eqCandidata of equipesOrdenadas) {
        // Se for a mesma equipe que já foi testada e não tinha ninguém, pula
        if (equipeAlvo && eqCandidata.id === equipeAlvo.id) continue;

        const selecaoFallback = this.selecionarAnalistaNaEquipe(
          eqCandidata,
          minutosAtuais,
          onlineZproMap,
          mapaCargas,
          input.ignorarApisExternas || isApiFailure
        );

        if (selecaoFallback) {
          analistaEscolhido = selecaoFallback.analista;
          pontuacaoCarga = selecaoFallback.score;
          metricasEscolhidas = selecaoFallback.metricas;
          equipeEscolhida = eqCandidata;
          modoDistribuicao = `fallback_fila_${(eqCandidata.nome || eqCandidata.queueName || "fila").toLowerCase().replace(/\s+/g, "_")}`;
          console.log(
            `✅ [DistributionService] Analista '${analistaEscolhido.user.name}' encontrado na fila de fallback '${eqCandidata.nome}' (Posição: ${eqCandidata.posicaoFallback || 'N/A'}, ID fila: ${eqCandidata.queueId})`
          );
          break;
        }
      }
    }

    // 5. Se após percorrer todas as filas (N1, N2, N3, Financeiro) ninguém estiver online/no turno:
    // Retorna null para o ID da fila e usuário para deixar o chat aguardando na fila!
    if (!analistaEscolhido) {
      console.log(
        `⚠️ [DistributionService] Nenhum atendente online ou no horário em nenhuma das filas (N1, N2, N3, Financeiro). Retendo chat com queueId e userId nulos.`
      );

      const fallbackResult: DistribuirResult = {
        sucesso: true,
        status: "pending",
        userId: null,
        atendenteNome: null,
        atendenteEmail: null,
        atendenteSlack: null,
        queueId: null,
        queueName: null,
        equipeNome: equipeAlvo?.nome || "Fila de Espera",
        modoDistribuicao: "aguardando_fila_sem_atendente_online",
        pontuacaoCarga: 0,
        metricas: {
          abertos: 0,
          pendentes: 0,
          fechadosHoje: 0,
        },
      };

      await this.persistLog(input, fallbackResult);

      const ticketIdFinal =
        input.ticketId !== undefined && input.ticketId !== null && String(input.ticketId).trim() !== ""
          ? String(input.ticketId).trim()
          : input.protocolo
          ? String(input.protocolo).trim()
          : `DIST-${Date.now()}`;

      if (this.atendimentoRepo) {
        try {
          const atendAtualizado = await this.atendimentoRepo.upsertAtendentePorTicket(
            ticketIdFinal,
            "Pendente na Fila",
            {
              clienteId: input.clienteId ? String(input.clienteId) : null,
              cnpj: input.cnpj ? String(input.cnpj) : null,
              protocolo: input.protocolo ? String(input.protocolo) : null,
              nomeContato: input.pushName ? String(input.pushName) : null,
              tipoAtendimento: input.departamento ? String(input.departamento) : null,
            }
          );
          sseEventBus.notify("atendimento", "update", atendAtualizado);
        } catch (atendErr: any) {
          console.warn("⚠️ [DistributionService] Falha ao registrar atendimento pendente:", atendErr.message || atendErr);
        }
      }

      sseEventBus.notify("distribuicao", "create", {
        ...fallbackResult,
        ticketId: ticketIdFinal,
        clienteId: input.clienteId,
        numero: input.numero,
        data: new Date().toISOString(),
      });

      return fallbackResult;
    }

    // 6. Atendente encontrado com sucesso! Atualizar último atendimento e persistir log
    await this.equipeRepo.updateUltimoAtendimento(analistaEscolhido.id);

    const zproUserId =
      analistaEscolhido.user.zproId !== null && analistaEscolhido.user.zproId !== undefined
        ? Number(analistaEscolhido.user.zproId)
        : null;

    const queueIdFinal = equipeEscolhida?.queueId ? Number(equipeEscolhida.queueId) : null;
    const queueNameFinal = equipeEscolhida?.queueName || equipeEscolhida?.nome || filaName || null;

    const result: DistribuirResult = {
      sucesso: true,
      status: "open",
      userId: zproUserId,
      atendenteNome: analistaEscolhido.user.name,
      atendenteEmail: analistaEscolhido.user.email,
      atendenteSlack: analistaEscolhido.user.slackId || null,
      queueId: queueIdFinal,
      queueName: queueNameFinal,
      equipeNome: equipeEscolhida?.nome,
      modoDistribuicao,
      pontuacaoCarga,
      metricas: metricasEscolhidas,
    };

    await this.persistLog(input, result);

    const ticketIdFinal =
      input.ticketId !== undefined && input.ticketId !== null && String(input.ticketId).trim() !== ""
        ? String(input.ticketId).trim()
        : input.protocolo
        ? String(input.protocolo).trim()
        : `DIST-${Date.now()}`;

    // Atualizar ou criar o atendimento na tabela de atendimentos e notificar SSE
    if (this.atendimentoRepo) {
      try {
        const atendAtualizado = await this.atendimentoRepo.upsertAtendentePorTicket(
          ticketIdFinal,
          analistaEscolhido.user.name,
          {
            clienteId: input.clienteId ? String(input.clienteId) : null,
            cnpj: input.cnpj ? String(input.cnpj) : null,
            protocolo: input.protocolo ? String(input.protocolo) : null,
            nomeContato: input.pushName ? String(input.pushName) : null,
            tipoAtendimento: input.departamento ? String(input.departamento) : null,
          }
        );
        console.log(
          `✅ [DistributionService] Atendimento ticketZpro '${ticketIdFinal}' registrado com atendente '${analistaEscolhido.user.name}' na fila '${queueNameFinal}' (ID: ${atendAtualizado.id})`
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
      ticketId: ticketIdFinal,
      clienteId: input.clienteId,
      numero: input.numero,
      data: new Date().toISOString(),
    });

    return result;
  }

  async getPrevisaoFilas(): Promise<any[]> {
    const equipes = await this.equipeRepo.findAllWithMembers();
    const minutosAtuais = getCurrentManausMinutes();
    const hojeStr = new Date().toISOString().substring(0, 10);

    let usuariosZpro: any[] = [];
    let cargasAlpha: TicketUserData[] = [];

    try {
      [usuariosZpro, cargasAlpha] = await Promise.all([
        externalApiService.listZproUsers().catch(() => []),
        externalApiService.getTicketsPerUser(hojeStr, hojeStr).catch(() => []),
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
      const membrosAtivos = membros.filter((m: any) => m.ativo && m.user);

      // 1. Filtrar estritamente membros dentro do turno (sem fallback para fora do turno)
      const membrosNoTurno = membrosAtivos.filter((m: any) =>
        isWithinShift(minutosAtuais, m.turnos, m.margemInicioMinutos, m.margemFimMinutos)
      );

      // 2. Filtrar quem está ONLINE no Z-PRO
      const candidatosOnline = membrosNoTurno.filter((m: any) => {
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
            isOnline: true,
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
