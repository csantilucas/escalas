import request from "supertest";
import { describe, it, beforeAll, afterAll, expect, vi } from "vitest";
import app from "../config/server.js";
import prisma from "../config/postgres.js";
import { clearDatabase } from "./helpers.js";
import { externalApiService } from "../app/services/externalApiService.js";
import { atendimentoService } from "../containers/atendimento.container.js";

describe("Testes de Distribuição Dinâmica e Fallback Sequencial de Atendimentos", () => {
  let equipeN1Id: string;
  let equipeN2Id: string;
  let userGabrielId: string;
  let userGuilhermeId: string;
  let userPedroId: string;

  beforeAll(async () => {
    await clearDatabase();

    // 1. Criar usuários simulando os analistas com seus IDs do Z-PRO e Slack
    const gabriel = await prisma.user.create({
      data: {
        name: "Gabriel",
        email: "gabriel@alphasoftware.com.br",
        id_atendente: "ATEND-GABRIEL",
        zproId: 5,
        slackId: "U09S6HELBNZ",
        typeUser: "atendente",
      },
    });
    userGabrielId = gabriel.id;

    const guilherme = await prisma.user.create({
      data: {
        name: "Guilherme",
        email: "guilherme@alphasoftware.com.br",
        id_atendente: "ATEND-GUILHERME",
        zproId: 10,
        slackId: "U09S869N1P0",
        typeUser: "atendente",
      },
    });
    userGuilhermeId = guilherme.id;

    const pedro = await prisma.user.create({
      data: {
        name: "Pedro",
        email: "pedro@alphasoftware.com.br",
        id_atendente: "ATEND-PEDRO",
        zproId: 6,
        slackId: "U084JR94XHA",
        typeUser: "atendente",
      },
    });
    userPedroId = pedro.id;

    // 2. Criar Equipe N1 - Suporte vinculando filas e departamentos dinâmicos
    const eqN1 = await prisma.equipePlantao.create({
      data: {
        nome: "N1 - Suporte",
        descricao: "Suporte operacional e primeiro nível",
        queueId: 6,
        queueName: "N1-Suporte",
        departamentos: ["suporte", "suporte_operacional", "operacional"],
        isFallback: true,
      },
    });
    equipeN1Id = eqN1.id;

    // 3. Vincular Membros à Equipe N1 com turnos e ordem sequencial
    // Turno: 08:10 às 12:20 (490 a 740 min) e 14:00 às 18:00 (840 a 1080 min)
    await prisma.membroEquipe.create({
      data: {
        equipeId: equipeN1Id,
        userId: userGabrielId,
        cargo: "analista_n1",
        ordemSequencial: 1,
        pesoPrioridade: 0,
        turnos: [
          { inicio: "08:10", fim: "12:20" },
          { inicio: "14:00", fim: "18:00" },
        ],
        margemInicioMinutos: 5,
        margemFimMinutos: 5,
      },
    });

    await prisma.membroEquipe.create({
      data: {
        equipeId: equipeN1Id,
        userId: userGuilhermeId,
        cargo: "analista_n1",
        ordemSequencial: 2,
        pesoPrioridade: 0,
        turnos: [
          { inicio: "08:10", fim: "12:20" },
          { inicio: "14:00", fim: "18:00" },
        ],
        margemInicioMinutos: 5,
        margemFimMinutos: 5,
      },
    });

    // 4. Criar Equipe N2 - Suporte Fiscal
    const eqN2 = await prisma.equipePlantao.create({
      data: {
        nome: "N2 - Suporte Fiscal",
        descricao: "Rotinas fiscais e N2",
        queueId: 7,
        queueName: "N2-Suporte",
        departamentos: ["suporte_fiscal", "fiscal", "notas"],
        isFallback: false,
      },
    });
    equipeN2Id = eqN2.id;

    await prisma.membroEquipe.create({
      data: {
        equipeId: equipeN2Id,
        userId: userPedroId,
        cargo: "analista_n2",
        ordemSequencial: 1,
        pesoPrioridade: 0,
        turnos: [{ inicio: "08:00", fim: "18:00" }],
      },
    });
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  it("deve distribuir atendimento por cálculo ponderado de carga quando APIs externas estão online", async () => {
    // Mock do Z-PRO (ambos Gabriel e Guilherme estão online)
    vi.spyOn(externalApiService, "listZproUsers").mockResolvedValueOnce([
      { id: 5, name: "Gabriel", email: "gabriel@alphasoftware.com.br", isOnline: true },
      { id: 10, name: "Guilherme", email: "guilherme@alphasoftware.com.br", isOnline: true },
    ]);

    // Mock da Alpha: Gabriel tem 2 abertos (peso 10 = 20) e Guilherme tem 0 abertos (peso 0)
    vi.spyOn(externalApiService, "getTicketsPerUser").mockResolvedValueOnce([
      {
        email: "gabriel@alphasoftware.com.br",
        name: "Gabriel",
        qtd_em_atendimento: "2",
        qtd_pendentes: "0",
        qtd_resolvidos: "5",
        qtd_por_usuario: "5",
        tma: { minutes: 10 },
        tme: { minutes: 2 },
        media_avaliacao: 5,
      },
      {
        email: "guilherme@alphasoftware.com.br",
        name: "Guilherme",
        qtd_em_atendimento: "0",
        qtd_pendentes: "1",
        qtd_resolvidos: "3",
        qtd_por_usuario: "3",
        tma: { minutes: 15 },
        tme: { minutes: 1 },
        media_avaliacao: 5,
      },
    ]);

    const response = await request(app)
      .post("/atendimentos/distribuir")
      .send({
        departamento: "suporte_operacional",
        ticketId: 17733,
        clienteId: 1068,
        numero: "556992162902",
        horarioMinutosOverride: 540, // 09:00 (dentro do turno)
      });

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(true);
    expect(response.body.status).toBe("open");
    // Guilherme tem menor pontuação (0*10 + 1*5 + 3*1 = 8) contra Gabriel (2*10 + 0*5 + 5*1 = 25)
    expect(response.body.userId).toBe(10);
    expect(response.body.atendenteNome).toBe("Guilherme");
    expect(response.body.queueId).toBe(6);
    expect(response.body.queueName).toBe("N1-Suporte");
    expect(response.body.modoDistribuicao).toContain("ponderado_menor_carga");
  });

  it("CRÍTICO: deve realizar distribuição sequencial (Round-Robin) como fallback quando APIs externas falharem ou estiverem indisponíveis", async () => {
    // Simula falha/queda na API externa (Erro de rede / Timeout / 500)
    vi.spyOn(externalApiService, "listZproUsers").mockRejectedValueOnce(
      new Error("Network Error: Z-PRO API Offline")
    );

    // 1ª Chamada: Como nenhum membro tem ultimoAtendimentoEm, o Gabriel (ordemSequencial: 1) deve ser o primeiro
    const response1 = await request(app)
      .post("/atendimentos/distribuir")
      .send({
        departamento: "suporte_operacional",
        ticketId: 20001,
        horarioMinutosOverride: 540,
      });

    expect(response1.status).toBe(200);
    expect(response1.body.sucesso).toBe(true);
    expect(response1.body.status).toBe("open");
    expect(response1.body.userId).toBe(5);
    expect(response1.body.atendenteNome).toBe("Gabriel");
    expect(response1.body.modoDistribuicao).toBe("fallback_sequencial_round_robin");

    // 2ª Chamada: Gabriel acabou de atender, agora a vez é do Guilherme (ordemSequencial: 2)
    vi.spyOn(externalApiService, "listZproUsers").mockRejectedValueOnce(
      new Error("Network Error: Z-PRO API Offline")
    );

    const response2 = await request(app)
      .post("/atendimentos/distribuir")
      .send({
        departamento: "suporte_operacional",
        ticketId: 20002,
        horarioMinutosOverride: 540,
      });

    expect(response2.status).toBe(200);
    expect(response2.body.sucesso).toBe(true);
    expect(response2.body.userId).toBe(10);
    expect(response2.body.atendenteNome).toBe("Guilherme");
    expect(response2.body.modoDistribuicao).toBe("fallback_sequencial_round_robin");

    // 3ª Chamada: O ciclo reinicia para o Gabriel (que agora é o mais antigo na fila)
    vi.spyOn(externalApiService, "listZproUsers").mockRejectedValueOnce(
      new Error("Network Error: Z-PRO API Offline")
    );

    const response3 = await request(app)
      .post("/atendimentos/distribuir")
      .send({
        departamento: "suporte_operacional",
        ticketId: 20003,
        horarioMinutosOverride: 540,
      });

    expect(response3.status).toBe(200);
    expect(response3.body.userId).toBe(5);
    expect(response3.body.atendenteNome).toBe("Gabriel");
    expect(response3.body.modoDistribuicao).toBe("fallback_sequencial_round_robin");
  });

  it("deve respeitar a rota para a Equipe N2 quando o departamento for suporte_fiscal", async () => {
    const response = await request(app)
      .get("/atendimentos/distribuir")
      .query({
        departamento: "suporte_fiscal",
        ticketId: 30001,
        horarioMinutosOverride: 540,
        ignorarApisExternas: true,
      });

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(true);
    expect(response.body.userId).toBe(6);
    expect(response.body.atendenteNome).toBe("Pedro");
    expect(response.body.queueId).toBe(7);
    expect(response.body.queueName).toBe("N2-Suporte");
  });

  it("deve usar a equipe de fallback quando o departamento não for reconhecido", async () => {
    const response = await request(app)
      .post("/atendimentos/distribuir")
      .send({
        departamento: "departamento_inexistente_xyz",
        ticketId: 40001,
        horarioMinutosOverride: 540,
        ignorarApisExternas: true,
      });

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(true);
    // Cai na equipe fallback (N1-Suporte, queueId 6)
    expect(response.body.queueId).toBe(6);
    expect(response.body.queueName).toBe("N1-Suporte");
  });

  it("deve retornar previsão de filas e próximo da fila para o dashboard", async () => {
    const response = await request(app).get("/atendimentos/previsao");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);

    const n1 = response.body.find((e: any) => e.queueId === 6);
    expect(n1).toBeDefined();
    expect(n1.departamentos).toContain("suporte_operacional");
    expect(n1.proximoDaFila).toBeDefined();
    expect(n1.proximoDaFila.nome).toBeDefined();
  });

  it("deve persistir as distribuições no banco de dados e retornar no histórico de logs e recentes", async () => {
    // 1. Consultar /atendimentos/distribuicao/recentes
    const resRecentes = await request(app).get("/atendimentos/distribuicao/recentes?limit=10");
    expect(resRecentes.status).toBe(200);
    expect(Array.isArray(resRecentes.body)).toBe(true);
    expect(resRecentes.body.length).toBeGreaterThan(0);

    const ultimoLog = resRecentes.body[0];
    expect(ultimoLog).toHaveProperty("id");
    expect(ultimoLog).toHaveProperty("modoDistribuicao");
    expect(ultimoLog).toHaveProperty("createdAt");

    // 2. Consultar /atendimentos/distribuicao/logs com paginação e busca
    const resLogs = await request(app).get("/atendimentos/distribuicao/logs?page=1&limit=5");
    expect(resLogs.status).toBe(200);
    expect(resLogs.body).toHaveProperty("data");
    expect(resLogs.body).toHaveProperty("pagination");
    expect(Array.isArray(resLogs.body.data)).toBe(true);
    expect(resLogs.body.pagination.totalRecords).toBeGreaterThan(0);
  });

  it("deve distribuir corretamente para a fila N2 quando informado departamento suporte_fiscal ou fila N2-Suporte e atualizar o atendente na tabela de atendimentos", async () => {
    // 1. Criar prévio atendimento sem atendente
    await prisma.atendimento.create({
      data: {
        ticketZpro: "18297",
        cnpj: "12345678000199",
        nomeContato: "Cliente Teste",
        sincronizado: false,
      },
    });

    const res = await request(app)
      .post("/atendimentos/distribuir")
      .send({
        departamento: "suporte_fiscal",
        fila: "N2-Suporte",
        ticketId: "18297",
        clienteId: "1068",
        numero: "556992162902",
        ignorarApisExternas: true,
      });

    expect(res.status).toBe(200);
    expect(res.body.sucesso).toBe(true);
    expect(res.body.queueId).toBe(7);
    expect(res.body.queueName).toBe("N2-Suporte");
    expect(res.body.atendenteNome).toBeDefined();

    // 2. Verificar se a tabela de atendimentos foi atualizada com o nome do atendente
    const atendimentoDb = await prisma.atendimento.findFirst({
      where: { ticketZpro: "18297" },
    });
    expect(atendimentoDb).toBeDefined();
    expect(atendimentoDb?.atendente).toBe(res.body.atendenteNome);
  });

  it("deve retornar o relatório de produtividade dos analistas baseado na tabela de atendimentos", async () => {
    const hojeStr = new Date().toISOString().substring(0, 10);
    const relatorio = await atendimentoService.getProdutividade(hojeStr, hojeStr);

    expect(Array.isArray(relatorio)).toBe(true);
    expect(relatorio.length).toBeGreaterThan(0);

    const primeiro = relatorio[0];
    expect(primeiro).toHaveProperty("name");
    expect(primeiro).toHaveProperty("email");
    expect(primeiro).toHaveProperty("qtd_em_atendimento");
    expect(primeiro).toHaveProperty("qtd_pendentes");
    expect(primeiro).toHaveProperty("qtd_resolvidos");
    expect(primeiro).toHaveProperty("qtd_por_usuario");

    // O analista que recebeu o ticket 18297 deve ter ao menos 1 atendimento registrado
    const totalGeral = relatorio.reduce((acc, r) => acc + Number(r.qtd_por_usuario), 0);
    expect(totalGeral).toBeGreaterThanOrEqual(1);
  });
});

