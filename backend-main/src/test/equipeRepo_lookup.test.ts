import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "../config/postgres.js";
import { EquipeRepository } from "../app/repository/equipeRepo.js";

describe("Testes Unitários de Resolução de Equipe por Fila e Departamento (findByDepartamentoOuFila)", () => {
  let equipeRepo: EquipeRepository;

  // Mock com a configuração idêntica à que causou o problema relatado:
  // N3 cadastrado erroneamente com 'suporte_fiscal', e N2 também com 'suporte_fiscal'
  const mockEquipes = [
    {
      id: "fin-id",
      nome: "Financeiro",
      queueId: 2,
      queueName: "Financeiro",
      departamentos: ["financeiro", "suporte_financeiro"],
      ativo: true,
      isFallback: false,
      membros: [],
    },
    {
      id: "n3-id",
      nome: "N3",
      queueId: 8,
      queueName: "N3",
      departamentos: ["suporte_fiscal"], // <--- O erro de cadastro no banco
      ativo: true,
      isFallback: false,
      membros: [],
    },
    {
      id: "n2-id",
      nome: "N2",
      queueId: 7,
      queueName: "N2-Suporte",
      departamentos: ["suporte_fiscal", "fiscal", "notas", "suporte_n2", "N2-Suporte"],
      ativo: true,
      isFallback: false,
      membros: [],
    },
    {
      id: "n1-id",
      nome: "N1",
      queueId: 6,
      queueName: "N1",
      departamentos: ["suporte", "suporte_operacional", "operacional"],
      ativo: true,
      isFallback: true,
      membros: [],
    },
  ];

  beforeEach(() => {
    equipeRepo = new EquipeRepository();
    vi.spyOn(prisma.equipePlantao, "findMany").mockResolvedValue(mockEquipes as any);
  });

  it("Cenário do Erro Relatado: Chat vem com fila 'N2-Suporte' e departamento 'suporte_fiscal'. Deve selecionar N2 (queueId: 7) e NUNCA N3 (queueId: 8)", async () => {
    const equipe = await equipeRepo.findByDepartamentoOuFila("suporte_fiscal", "N2-Suporte");

    expect(equipe).not.toBeNull();
    expect(equipe.queueId).toBe(7);
    expect(equipe.nome).toBe("N2");
  });

  it("Quando informado fila 'N2', deve resolver diretamente para a equipe N2", async () => {
    const equipe = await equipeRepo.findByDepartamentoOuFila(undefined, "N2");

    expect(equipe).not.toBeNull();
    expect(equipe.queueId).toBe(7);
    expect(equipe.nome).toBe("N2");
  });

  it("Quando informado fila 'n2-suporte' (case-insensitive), deve resolver com igualdade exata para N2", async () => {
    const equipe = await equipeRepo.findByDepartamentoOuFila(undefined, "n2-suporte");

    expect(equipe).not.toBeNull();
    expect(equipe.queueId).toBe(7);
    expect(equipe.nome).toBe("N2");
  });

  it("Quando informado queueId explícito (ex: 8), deve respeitar o queueId", async () => {
    const equipe = await equipeRepo.findByDepartamentoOuFila("suporte_fiscal", "N2-Suporte", 8);

    expect(equipe).not.toBeNull();
    expect(equipe.queueId).toBe(8);
    expect(equipe.nome).toBe("N3");
  });

  it("Quando informado fila 'Financeiro', deve resolver para a equipe Financeiro", async () => {
    const equipe = await equipeRepo.findByDepartamentoOuFila(undefined, "Financeiro");

    expect(equipe).not.toBeNull();
    expect(equipe.queueId).toBe(2);
    expect(equipe.nome).toBe("Financeiro");
  });

  it("Quando a fila não for informada mas o departamento for 'financeiro', deve resolver por departamento", async () => {
    const equipe = await equipeRepo.findByDepartamentoOuFila("financeiro", undefined);

    expect(equipe).not.toBeNull();
    expect(equipe.queueId).toBe(2);
    expect(equipe.nome).toBe("Financeiro");
  });

  it("Quando a fila informada não existir e houver departamento, busca pelo departamento como fallback", async () => {
    const equipe = await equipeRepo.findByDepartamentoOuFila("suporte_operacional", "FilaInexistente");

    expect(equipe).not.toBeNull();
    expect(equipe.queueId).toBe(6);
    expect(equipe.nome).toBe("N1");
  });
});
