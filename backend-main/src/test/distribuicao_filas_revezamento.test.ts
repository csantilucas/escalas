import { describe, it, expect, vi, beforeEach } from "vitest";
import { DistributionService } from "../app/services/distributionService.js";
import { externalApiService } from "../app/services/externalApiService.js";

describe("Testes de Múltiplas Distribuições e Revezamento Equitativo em Cada Fila", () => {
  let fakeTimestamp = 1725960000000;

  function buildMockEquipes() {
    return [
      {
        id: "eq-n1",
        nome: "N1",
        queueId: 6,
        queueName: "N1-Suporte",
        departamentos: ["suporte", "suporte_operacional", "operacional"],
        posicaoFallback: 1,
        isFallback: true,
        ativo: true,
        membros: [
          {
            id: "m-gabriel-n1",
            userId: "u-gabriel",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 1,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "07:00", fim: "10:50" },
              { inicio: "12:30", fim: "16:50" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-gabriel",
              name: "Gabriel",
              email: "gabriel@alphasoftware.com.br",
              zproId: 5,
              slackId: "U09S6HELBNZ",
            },
          },
          {
            id: "m-guilherme-n1",
            userId: "u-guilherme",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 2,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "08:10", fim: "12:20" },
              { inicio: "14:00", fim: "18:00" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-guilherme",
              name: "Guilherme",
              email: "guilherme@alphasoftware.com.br",
              zproId: 10,
              slackId: "U09S869N1P0",
            },
          },
          {
            id: "m-kariny-n1",
            userId: "u-kariny",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 3,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "08:10", fim: "12:20" },
              { inicio: "14:10", fim: "18:00" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-kariny",
              name: "Kariny",
              email: "kariny@alphasoftware.com.br",
              zproId: 4,
              slackId: "U085496CVJ4",
            },
          },
        ],
      },
      {
        id: "eq-n2",
        nome: "N2",
        queueId: 7,
        queueName: "N2-Suporte",
        departamentos: ["suporte_fiscal", "fiscal", "notas", "suporte_n2"],
        posicaoFallback: 2,
        isFallback: false,
        ativo: true,
        membros: [
          {
            id: "m-geneses-n2",
            userId: "u-geneses",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 1,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "08:10", fim: "12:20" },
              { inicio: "14:00", fim: "17:50" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-geneses",
              name: "Geneses",
              email: "geneses@alphasoftware.com.br",
              zproId: 9,
              slackId: "U08554P3BA4",
            },
          },
          {
            id: "m-gustavo-n2",
            userId: "u-gustavo",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 2,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "08:10", fim: "12:20" },
              { inicio: "14:00", fim: "18:00" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-gustavo",
              name: "Gustavo",
              email: "gustavo@alphasoftware.com.br",
              zproId: 7,
              slackId: "U084GA7D866",
            },
          },
        ],
      },
      {
        id: "eq-n3",
        nome: "N3",
        queueId: 8,
        queueName: "N3-Suporte",
        departamentos: ["suporte_n3", "n3"],
        posicaoFallback: 3,
        isFallback: false,
        ativo: true,
        membros: [
          {
            id: "m-junior-n3",
            userId: "u-junior",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 1,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "08:10", fim: "12:20" },
              { inicio: "14:00", fim: "18:00" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-junior",
              name: "Junior",
              email: "junior@alphasoftware.com.br",
              zproId: 8,
              slackId: "U084GAAL30A",
            },
          },
          {
            id: "m-pedro-n3",
            userId: "u-pedro",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 2,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "08:10", fim: "12:20" },
              { inicio: "14:00", fim: "18:00" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-pedro",
              name: "Pedro",
              email: "pedro@alphasoftware.com.br",
              zproId: 6,
              slackId: "U084JR94XHA",
            },
          },
          {
            id: "m-thiago-n3",
            userId: "u-thiago",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 3,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "08:10", fim: "12:20" },
              { inicio: "14:00", fim: "18:00" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-thiago",
              name: "Thiago",
              email: "thiago@alphasoftware.com.br",
              zproId: 11,
              slackId: "U084DEYC53P",
            },
          },
        ],
      },
      {
        id: "eq-fin",
        nome: "Financeiro",
        queueId: 2,
        queueName: "Financeiro",
        departamentos: ["financeiro", "suporte_financeiro", "cobranca"],
        posicaoFallback: 4,
        isFallback: false,
        ativo: true,
        membros: [
          {
            id: "m-gabriel-fin",
            userId: "u-gabriel",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 1,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "07:00", fim: "10:50" },
              { inicio: "12:30", fim: "16:50" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-gabriel",
              name: "Gabriel",
              email: "gabriel@alphasoftware.com.br",
              zproId: 5,
              slackId: "U09S6HELBNZ",
            },
          },
          {
            id: "m-kariny-fin",
            userId: "u-kariny",
            ativo: true,
            cargo: "analista",
            ordemSequencial: 2,
            ultimoAtendimentoEm: null,
            pesoPrioridade: 0,
            turnos: [
              { inicio: "08:10", fim: "12:20" },
              { inicio: "14:10", fim: "18:00" },
            ],
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            user: {
              id: "u-kariny",
              name: "Kariny",
              email: "kariny@alphasoftware.com.br",
              zproId: 4,
              slackId: "U085496CVJ4",
            },
          },
        ],
      },
    ];
  }

  function setupService(equipes: any[]) {
    const mockEquipeRepo: any = {
      findAllWithMembers: vi.fn().mockImplementation(() => Promise.resolve(equipes)),
      findByDepartamentoOuFila: vi.fn().mockImplementation((dep, fila, qId) => {
        const cleanDep = (dep || "").trim().toLowerCase();
        const cleanFila = (fila || "").trim().toLowerCase();
        const numQId = qId ? Number(qId) : null;

        if (numQId) {
          const m = equipes.find((e) => e.queueId === numQId);
          if (m) return Promise.resolve(m);
        }
        if (cleanFila) {
          const m = equipes.find(
            (e) =>
              (e.queueName || "").toLowerCase().trim() === cleanFila ||
              (e.nome || "").toLowerCase().trim() === cleanFila
          );
          if (m) return Promise.resolve(m);
        }
        if (cleanDep) {
          const m = equipes.find((e) =>
            e.departamentos?.some((d: string) => d.toLowerCase().trim() === cleanDep)
          );
          if (m) return Promise.resolve(m);
        }
        return Promise.resolve(null);
      }),
      findFallbackEquipe: vi.fn().mockImplementation(() =>
        Promise.resolve(equipes.find((e) => e.isFallback) || equipes[0])
      ),
      updateUltimoAtendimento: vi.fn().mockImplementation((membroId: string, userId?: string) => {
        fakeTimestamp += 1000;
        for (const eq of equipes) {
          for (const m of eq.membros) {
            if (m.id === membroId || (userId && (m.userId === userId || m.user?.id === userId))) {
              m.ultimoAtendimentoEm = new Date(fakeTimestamp);
            }
          }
        }
        return Promise.resolve();
      }),
    };

    const mockLogRepo: any = {
      create: vi.fn().mockResolvedValue({ id: "log-test" }),
    };

    const mockAtendRepo: any = {
      getProdutividadePorPeriodo: vi.fn().mockResolvedValue([]),
      upsertAtendentePorTicket: vi.fn().mockResolvedValue({ id: "atend-test" }),
    };

    return new DistributionService(mockEquipeRepo, mockLogRepo, mockAtendRepo);
  }

  beforeEach(() => {
    fakeTimestamp = 1725960000000;
    vi.restoreAllMocks();
  });

  // =========================================================================
  // 1. TESTE DA FILA N2: REVEZAMENTO ENTRE 2 ANALISTAS (Geneses e Gustavo)
  // =========================================================================
  it("Fila N2: Em 10 distribuições consecutivas, divide exatamente 5 chats para Geneses e 5 para Gustavo (nenhum recebe mais que o outro)", async () => {
    const equipes = buildMockEquipes();
    const service = setupService(equipes);

    // Ambos online no Z-PRO
    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValue([
      { id: 9, name: "Geneses", email: "geneses@alphasoftware.com.br", isOnline: true },
      { id: 7, name: "Gustavo", email: "gustavo@alphasoftware.com.br", isOnline: true },
    ]);

    const contadores: Record<string, number> = { Geneses: 0, Gustavo: 0 };
    const ordemAtendimentos: string[] = [];

    // Executa 10 distribuições consecutivas para N2
    for (let i = 1; i <= 10; i++) {
      const res = await service.distribuir({
        fila: "N2-Suporte",
        ticketId: `TICKET-N2-${i}`,
        numero: `55699900000${i}`,
        horarioMinutosOverride: 540, // 09:00 (dentro do turno de ambos)
      });

      expect(res.sucesso).toBe(true);
      expect(res.queueId).toBe(7);
      expect(["Geneses", "Gustavo"]).toContain(res.atendenteNome);

      const nome = res.atendenteNome!;
      contadores[nome]++;
      ordemAtendimentos.push(nome);
    }

    // Validações de Equidade Estrita
    expect(contadores["Geneses"]).toBe(5);
    expect(contadores["Gustavo"]).toBe(5);
    expect(Math.abs(contadores["Geneses"] - contadores["Gustavo"])).toBe(0);

    // Valida alternância estrita 1 a 1: [Geneses, Gustavo, Geneses, Gustavo, ...]
    expect(ordemAtendimentos).toEqual([
      "Geneses", "Gustavo",
      "Geneses", "Gustavo",
      "Geneses", "Gustavo",
      "Geneses", "Gustavo",
      "Geneses", "Gustavo",
    ]);
  });

  // =========================================================================
  // 2. TESTE DA FILA N3: REVEZAMENTO ENTRE 3 ANALISTAS (Junior, Pedro, Thiago)
  // =========================================================================
  it("Fila N3: Em 12 distribuições consecutivas, distribui exatamente 4 chats para cada um dos 3 analistas", async () => {
    const equipes = buildMockEquipes();
    const service = setupService(equipes);

    // Todos os 3 analistas online no Z-PRO
    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValue([
      { id: 8, name: "Junior", email: "junior@alphasoftware.com.br", isOnline: true },
      { id: 6, name: "Pedro", email: "pedro@alphasoftware.com.br", isOnline: true },
      { id: 11, name: "Thiago", email: "thiago@alphasoftware.com.br", isOnline: true },
    ]);

    const contadores: Record<string, number> = { Junior: 0, Pedro: 0, Thiago: 0 };
    const historicoAtendimentos: string[] = [];

    // Executa 12 distribuições consecutivas para N3
    for (let i = 1; i <= 12; i++) {
      const res = await service.distribuir({
        fila: "N3-Suporte",
        ticketId: `TICKET-N3-${i}`,
        numero: `55699911100${i}`,
        horarioMinutosOverride: 870, // 14:30 (dentro do turno da tarde de todos)
      });

      expect(res.sucesso).toBe(true);
      expect(res.queueId).toBe(8);
      expect(["Junior", "Pedro", "Thiago"]).toContain(res.atendenteNome);

      const nome = res.atendenteNome!;
      contadores[nome]++;
      historicoAtendimentos.push(nome);
    }

    // Cada analista deve receber exatamente 4 chats (12 / 3 = 4)
    expect(contadores["Junior"]).toBe(4);
    expect(contadores["Pedro"]).toBe(4);
    expect(contadores["Thiago"]).toBe(4);

    const maxChats = Math.max(...Object.values(contadores));
    const minChats = Math.min(...Object.values(contadores));
    expect(maxChats - minChats).toBe(0);

    // Validação de rotação sequencial perfeita sem repetições consecutivas
    for (let i = 0; i < historicoAtendimentos.length - 1; i++) {
      expect(historicoAtendimentos[i]).not.toBe(historicoAtendimentos[i + 1]);
    }
  });

  // =========================================================================
  // 3. TESTE DA FILA N1: REVEZAMENTO ENTRE 3 ANALISTAS (Gabriel, Guilherme, Kariny)
  // =========================================================================
  it("Fila N1: Em 9 distribuições consecutivas, distribui exatamente 3 chats para cada analista e com 10 chats a diferença máxima é 1", async () => {
    const equipes = buildMockEquipes();
    const service = setupService(equipes);

    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValue([
      { id: 5, name: "Gabriel", email: "gabriel@alphasoftware.com.br", isOnline: true },
      { id: 10, name: "Guilherme", email: "guilherme@alphasoftware.com.br", isOnline: true },
      { id: 4, name: "Kariny", email: "kariny@alphasoftware.com.br", isOnline: true },
    ]);

    const contadores: Record<string, number> = { Gabriel: 0, Guilherme: 0, Kariny: 0 };

    // 1º Ciclo de 9 chamados
    for (let i = 1; i <= 9; i++) {
      const res = await service.distribuir({
        fila: "N1-Suporte",
        ticketId: `TICKET-N1-${i}`,
        numero: `55699922200${i}`,
        horarioMinutosOverride: 540, // 09:00
      });

      expect(res.sucesso).toBe(true);
      expect(res.queueId).toBe(6);
      contadores[res.atendenteNome!]++;
    }

    expect(contadores["Gabriel"]).toBe(3);
    expect(contadores["Guilherme"]).toBe(3);
    expect(contadores["Kariny"]).toBe(3);
    expect(Math.max(...Object.values(contadores)) - Math.min(...Object.values(contadores))).toBe(0);

    // 10º chamado: deve ir para o primeiro da fila (Gabriel), deixando 4, 3, 3 (diferença máxima de 1)
    const res10 = await service.distribuir({
      fila: "N1-Suporte",
      ticketId: "TICKET-N1-10",
      numero: "556999222010",
      horarioMinutosOverride: 540,
    });
    contadores[res10.atendenteNome!]++;

    expect(contadores["Gabriel"]).toBe(4);
    expect(contadores["Guilherme"]).toBe(3);
    expect(contadores["Kariny"]).toBe(3);
    expect(Math.max(...Object.values(contadores)) - Math.min(...Object.values(contadores))).toBe(1);
  });

  // =========================================================================
  // 4. TESTE DA FILA FINANCEIRO: REVEZAMENTO ENTRE 2 ANALISTAS (Gabriel e Kariny)
  // =========================================================================
  it("Fila Financeiro: Em 8 distribuições consecutivas, distribui exatamente 4 chats para Gabriel e 4 para Kariny", async () => {
    const equipes = buildMockEquipes();
    const service = setupService(equipes);

    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValue([
      { id: 5, name: "Gabriel", email: "gabriel@alphasoftware.com.br", isOnline: true },
      { id: 4, name: "Kariny", email: "kariny@alphasoftware.com.br", isOnline: true },
    ]);

    const contadores: Record<string, number> = { Gabriel: 0, Kariny: 0 };
    const sequencia: string[] = [];

    for (let i = 1; i <= 8; i++) {
      const res = await service.distribuir({
        fila: "Financeiro",
        ticketId: `TICKET-FIN-${i}`,
        numero: `55699933300${i}`,
        horarioMinutosOverride: 540, // 09:00
      });

      expect(res.sucesso).toBe(true);
      expect(res.queueId).toBe(2);
      expect(["Gabriel", "Kariny"]).toContain(res.atendenteNome);

      const nome = res.atendenteNome!;
      contadores[nome]++;
      sequencia.push(nome);
    }

    expect(contadores["Gabriel"]).toBe(4);
    expect(contadores["Kariny"]).toBe(4);
    expect(sequencia).toEqual([
      "Gabriel", "Kariny",
      "Gabriel", "Kariny",
      "Gabriel", "Kariny",
      "Gabriel", "Kariny",
    ]);
  });

  // =========================================================================
  // 5. TESTE DE VOLUME ALTO / ESTRESSE (30 DISTRIBUIÇÕES) COM INVARIANTE MATEMÁTICO
  // =========================================================================
  it("Teste de Alta Carga: Em 30 distribuições consecutivas, garante matematicamente que o gap entre analistas nunca ultrapassa 1", async () => {
    const equipes = buildMockEquipes();
    const service = setupService(equipes);

    // 3 analistas do N3
    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValue([
      { id: 8, name: "Junior", email: "junior@alphasoftware.com.br", isOnline: true },
      { id: 6, name: "Pedro", email: "pedro@alphasoftware.com.br", isOnline: true },
      { id: 11, name: "Thiago", email: "thiago@alphasoftware.com.br", isOnline: true },
    ]);

    const contadores: Record<string, number> = { Junior: 0, Pedro: 0, Thiago: 0 };

    for (let i = 1; i <= 30; i++) {
      const res = await service.distribuir({
        fila: "N3-Suporte",
        ticketId: `TICKET-STRESS-${i}`,
        numero: `556999444${i.toString().padStart(3, "0")}`,
        horarioMinutosOverride: 870,
      });

      expect(res.sucesso).toBe(true);
      contadores[res.atendenteNome!]++;

      // INVARIANTE CRÍTICO: Em qualquer chamado intermediário, a diferença máxima entre qualquer analista é <= 1
      const valores = Object.values(contadores);
      const gapAtual = Math.max(...valores) - Math.min(...valores);
      expect(gapAtual).toBeLessThanOrEqual(1);
    }

    // Ao final de 30 distribuições com 3 analistas: exatamente 10 para cada um
    expect(contadores["Junior"]).toBe(10);
    expect(contadores["Pedro"]).toBe(10);
    expect(contadores["Thiago"]).toBe(10);
  });
});
