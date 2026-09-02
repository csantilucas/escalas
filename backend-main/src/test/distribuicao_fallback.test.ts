import { describe, it, expect, vi } from "vitest";
import { DistributionService } from "../app/services/distributionService.js";
import { externalApiService } from "../app/services/externalApiService.js";

describe("Testes da Nova Regra de Distribuição, Turnos e Fallback Entre Filas", () => {
  const mockEquipes = [
    {
      id: "financeiro-id",
      nome: "Financeiro",
      queueId: 2,
      queueName: "Financeiro",
      departamentos: ["financeiro", "suporte_financeiro"],
      posicaoFallback: 4,
      ativo: true,
      membros: [
        {
          id: "m-gabriel-fin",
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
      ],
    },
    {
      id: "n3-id",
      nome: "N3",
      queueId: 8,
      queueName: "N3",
      departamentos: ["suporte_fiscal"],
      posicaoFallback: 3,
      ativo: true,
      membros: [
        {
          id: "m-pedro-n3",
          ativo: true,
          cargo: "analista",
          ordemSequencial: 7,
          ultimoAtendimentoEm: null,
          pesoPrioridade: 0,
          turnos: [
            { inicio: "07:10", fim: "10:50" },
            { inicio: "12:30", fim: "16:50" },
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
      ],
    },
    {
      id: "n2-id",
      nome: "N2",
      queueId: 7,
      queueName: "N2",
      departamentos: ["suporte_fiscal", "fiscal", "notas"],
      posicaoFallback: 2,
      ativo: true,
      membros: [
        {
          id: "m-geneses-n2",
          ativo: true,
          cargo: "analista",
          ordemSequencial: 2,
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
          ativo: true,
          cargo: "analista",
          ordemSequencial: 4,
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
      id: "n1-id",
      nome: "N1",
      queueId: 6,
      queueName: "N1",
      departamentos: ["suporte", "suporte_operacional", "operacional"],
      posicaoFallback: 1,
      isFallback: true,
      ativo: true,
      membros: [
        {
          id: "m-gabriel-n1",
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
            id: "u-guilherme",
            name: "Guilherme",
            email: "guilherme@alphasoftware.com.br",
            zproId: 10,
            slackId: "U09S869N1P0",
          },
        },
      ],
    },
  ];

  function createService() {
    const mockEquipeRepo: any = {
      findAllWithMembers: vi.fn().mockResolvedValue(mockEquipes),
      findByDepartamentoOuFila: vi.fn().mockImplementation((dep, fila, qId) => {
        if (fila === "N2-Suporte" || dep === "suporte_fiscal" || qId === 7) {
          return Promise.resolve(mockEquipes.find((e) => e.queueId === 7));
        }
        return Promise.resolve(null);
      }),
      findFallbackEquipe: vi.fn().mockResolvedValue(mockEquipes.find((e) => e.isFallback)),
      updateUltimoAtendimento: vi.fn().mockResolvedValue(undefined),
    };

    const mockLogRepo: any = {
      create: vi.fn().mockResolvedValue({ id: "log-1" }),
    };

    const mockAtendRepo: any = {
      getProdutividadePorPeriodo: vi.fn().mockResolvedValue([]),
      upsertAtendentePorTicket: vi.fn().mockResolvedValue({ id: "atend-1" }),
    };

    return new DistributionService(mockEquipeRepo, mockLogRepo, mockAtendRepo);
  }

  it("Cenário Real do Usuário: Chat chega às 07:30 para Fila N2; como N2 não tem analistas no turno, transfere para Gabriel na Fila N1", async () => {
    const service = createService();

    // Às 07:30 (450 minutos do dia):
    // Z-PRO lista Gabriel online e Gustavo online (mas Gustavo está FORA do turno!)
    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValue([
      { id: 5, name: "Gabriel", email: "gabriel@alphasoftware.com.br", isOnline: true },
      { id: 7, name: "Gustavo", email: "gustavo@alphasoftware.com.br", isOnline: true }, // Logado no Z-PRO, mas turno inicia só 08:10!
    ]);

    const resultado = await service.distribuir({
      departamento: "suporte_fiscal",
      fila: "N2-Suporte",
      numero: "556984242161",
      horarioMinutosOverride: 450, // 07:30
    });

    expect(resultado.sucesso).toBe(true);
    expect(resultado.status).toBe("open");
    // Gustavo NÃO pode ser selecionado porque o turno dele inicia às 08:10!
    expect(resultado.userId).not.toBe(7);
    expect(resultado.atendenteNome).not.toBe("Gustavo");

    // Deve ter caído na fila de fallback N1, com Gabriel
    expect(resultado.queueId).toBe(6);
    expect(resultado.queueName).toBe("N1");
    expect(resultado.userId).toBe(5);
    expect(resultado.atendenteNome).toBe("Gabriel");
    expect(resultado.modoDistribuicao).toBe("fallback_fila_n1");
  });

  it("Nenhum analista online em nenhuma fila: Deve retornar queueId e userId nulos e status pending para aguardar na fila", async () => {
    const service = createService();

    // Ninguém online no Z-PRO
    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValue([]);

    const resultado = await service.distribuir({
      departamento: "suporte_fiscal",
      fila: "N2-Suporte",
      numero: "556984242161",
      horarioMinutosOverride: 450, // 07:30
    });

    expect(resultado.sucesso).toBe(true);
    expect(resultado.status).toBe("pending");
    expect(resultado.userId).toBeNull();
    expect(resultado.atendenteNome).toBeNull();
    expect(resultado.queueId).toBeNull();
    expect(resultado.queueName).toBeNull();
    expect(resultado.modoDistribuicao).toBe("aguardando_fila_sem_atendente_online");
  });

  it("Prioridade Dinâmica por posicaoFallback: Quando N3 tem posicaoFallback: 1 e N1 tem posicaoFallback: 2, N3 tem prioridade no fallback", async () => {
    // Clona mockEquipes invertendo a ordem de fallback: N3 = 1, N1 = 2
    const equipesCustomizadas = mockEquipes.map((e) => {
      if (e.queueId === 8) return { ...e, posicaoFallback: 1 };
      if (e.queueId === 6) return { ...e, posicaoFallback: 2 };
      return e;
    });

    const mockEquipeRepo: any = {
      findAllWithMembers: vi.fn().mockResolvedValue(equipesCustomizadas),
      findByDepartamentoOuFila: vi.fn().mockImplementation((dep, fila, qId) => {
        if (fila === "N2-Suporte" || dep === "suporte_fiscal" || qId === 7) {
          return Promise.resolve(equipesCustomizadas.find((e) => e.queueId === 7));
        }
        return Promise.resolve(null);
      }),
      findFallbackEquipe: vi.fn().mockResolvedValue(equipesCustomizadas.find((e) => e.isFallback)),
      updateUltimoAtendimento: vi.fn().mockResolvedValue(undefined),
    };

    const service = new DistributionService(
      mockEquipeRepo,
      { create: vi.fn().mockResolvedValue({ id: "log-1" }) } as any,
      { getProdutividadePorPeriodo: vi.fn().mockResolvedValue([]), upsertAtendentePorTicket: vi.fn().mockResolvedValue({ id: "atend-1" }) } as any
    );

    // Às 07:30, ambos Gabriel (N1) e Pedro (N3) estão no turno e online
    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValue([
      { id: 5, name: "Gabriel", email: "gabriel@alphasoftware.com.br", isOnline: true },
      { id: 6, name: "Pedro", email: "pedro@alphasoftware.com.br", isOnline: true },
    ]);

    const resultado = await service.distribuir({
      departamento: "suporte_fiscal",
      fila: "N2-Suporte",
      numero: "556984242161",
      horarioMinutosOverride: 450, // 07:30
    });

    expect(resultado.sucesso).toBe(true);
    expect(resultado.status).toBe("open");
    // Como N3 tem posicaoFallback 1, ele é escolhido antes do N1!
    expect(resultado.queueId).toBe(8);
    expect(resultado.queueName).toBe("N3");
    expect(resultado.userId).toBe(6);
    expect(resultado.atendenteNome).toBe("Pedro");
    expect(resultado.modoDistribuicao).toBe("fallback_fila_n3");
  });

  it("Horário normal do N2 (ex: 09:00): Quando analista do N2 está no turno e online, distribui diretamente para a Fila N2", async () => {
    const service = createService();

    // Às 09:00 (540 minutos):
    // Geneses e Gustavo estão no turno. Gustavo está online no Z-PRO.
    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValue([
      { id: 5, name: "Gabriel", email: "gabriel@alphasoftware.com.br", isOnline: true },
      { id: 7, name: "Gustavo", email: "gustavo@alphasoftware.com.br", isOnline: true },
    ]);

    const resultado = await service.distribuir({
      departamento: "suporte_fiscal",
      fila: "N2-Suporte",
      numero: "556984242161",
      horarioMinutosOverride: 540, // 09:00
    });

    expect(resultado.sucesso).toBe(true);
    expect(resultado.status).toBe("open");
    expect(resultado.queueId).toBe(7);
    expect(resultado.queueName).toBe("N2");
    expect(resultado.userId).toBe(7);
    expect(resultado.atendenteNome).toBe("Gustavo");
    expect(resultado.modoDistribuicao).toBe("ponderado_menor_carga");
  });
});
