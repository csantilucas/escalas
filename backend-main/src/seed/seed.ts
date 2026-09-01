// src/seed/seed.ts
import dotenv from "dotenv";
dotenv.config();

import prisma from "../config/postgres.js";
import { auth } from "../config/auth.js";

// =======================================================================
// 4 EQUIPES OFICIAIS DE ATENDIMENTO E SEUS RESPECTIVOS DEPARTAMENTOS
// =======================================================================
const EQUIPES_SEED = [
  {
    nome: "N1",
    queueId: 6,
    queueName: "N1-Suporte",
    descricao: "Fila N1 - Suporte operacional e atendimento geral",
    cor: "#3B82F6",
    isFallback: true,
    departamentos: [
      "suporte_operacional",
      "operacional",
      "suporte",
      "N1-Suporte",
      "N1",
      "nao_urgente",
      "atendimento_normal",
    ],
  },
  {
    nome: "N2",
    queueId: 7,
    queueName: "N2-Suporte",
    descricao: "Fila N2 - Suporte fiscal e notas",
    cor: "#10B981",
    isFallback: false,
    departamentos: [
      "suporte_fiscal",
      "fiscal",
      "notas",
      "N2-Suporte",
      "N2",
    ],
  },
  {
    nome: "N3",
    queueId: 8,
    queueName: "N3",
    descricao: "Fila N3 - Suporte avançado",
    cor: "#8B5CF6",
    isFallback: false,
    departamentos: [
      "suporte_avancado",
      "suporte_n3",
      "suporte_n2",
      "avancado",
      "N3-Suporte",
      "N3",
    ],
  },
  {
    nome: "Financeiro",
    queueId: 2,
    queueName: "Financeiro",
    descricao: "Fila Financeiro - Cobrança, pagamentos e suporte financeiro",
    cor: "#F59E0B",
    isFallback: false,
    departamentos: [
      "suporte_financeiro",
      "financeiro",
      "cobranca",
      "Financeiro",
    ],
  },
];

// =======================================================================
// ANALISTAS CONFIGURADOS NO NÓ DO N8N (Array EQUIPE)
// =======================================================================
export const ANALISTAS_N8N = [
  {
    nome: "gabriel",
    email: "gabriel@alphasoftware.com.br",
    senhaPadrao: "@123456",
    zproId: 5,
    slackId: "U09S6HELBNZ",
    posicao: 0,
    isPlantonista: true,
    filasZpro: [6, 2], // N1 e Financeiro
    turnos: [
      { inicio: "07:00", fim: "10:50" },
      { inicio: "12:30", fim: "16:50" },
    ],
  },
  {
    nome: "geneses",
    email: "geneses@alphasoftware.com.br",
    senhaPadrao: "@123456",
    zproId: 9,
    slackId: "U08554P3BA4",
    posicao: 1,
    isPlantonista: true,
    filasZpro: [7], // N2
    turnos: [
      { inicio: "08:10", fim: "12:20" },
      { inicio: "14:00", fim: "17:50" },
    ],
  },
  {
    nome: "guilherme",
    email: "guilherme@alphasoftware.com.br",
    senhaPadrao: "@123456",
    zproId: 10,
    slackId: "U09S869N1P0",
    posicao: 2,
    isPlantonista: true,
    filasZpro: [6], // N1
    turnos: [
      { inicio: "08:10", fim: "12:20" },
      { inicio: "14:00", fim: "18:00" },
    ],
  },
  {
    nome: "gustavo",
    email: "gustavo@alphasoftware.com.br",
    senhaPadrao: "@123456",
    zproId: 7,
    slackId: "U084GA7D866",
    posicao: 3,
    isPlantonista: true,
    filasZpro: [7], // N2
    turnos: [
      { inicio: "08:10", fim: "12:20" },
      { inicio: "14:00", fim: "18:00" },
    ],
  },
  {
    nome: "junior",
    email: "junior@alphasoftware.com.br",
    senhaPadrao: "@123456",
    zproId: 8,
    slackId: "U084GAAL30A",
    posicao: 4,
    isPlantonista: true,
    filasZpro: [8], // N3
    turnos: [
      { inicio: "08:10", fim: "12:20" },
      { inicio: "14:00", fim: "18:00" },
    ],
  },
  {
    nome: "kariny",
    email: "kariny@alphasoftware.com.br",
    senhaPadrao: "@123456",
    zproId: 4,
    slackId: "U085496CVJ4",
    posicao: 5,
    isPlantonista: true,
    filasZpro: [6, 2], // N1 e Financeiro
    turnos: [
      { inicio: "08:10", fim: "12:20" },
      { inicio: "14:10", fim: "18:00" },
    ],
  },
  {
    nome: "pedro",
    email: "pedro@alphasoftware.com.br",
    senhaPadrao: "@123456",
    zproId: 6,
    slackId: "U084JR94XHA",
    posicao: 6,
    isPlantonista: true,
    filasZpro: [8], // N3
    turnos: [
      { inicio: "07:10", fim: "10:50" },
      { inicio: "12:30", fim: "16:50" },
    ],
  },
  {
    nome: "thiago",
    email: "thiago@alphasoftware.com.br",
    senhaPadrao: "@123456",
    zproId: 11,
    slackId: "U084DEYC53P",
    posicao: 7,
    isPlantonista: true,
    filasZpro: [8], // N3
    turnos: [
      { inicio: "08:10", fim: "12:20" },
      { inicio: "14:00", fim: "18:00" },
    ],
  },
  {
    nome: "tainara",
    email: "tainara@alphasoftware.com.br",
    senhaPadrao: "@123456",
    zproId: 3,
    slackId: "U084CL2AJA1",
    posicao: 0,
    isPlantonista: false, // Tainara não faz plantão
    filasZpro: [6], // N1
    turnos: [
      { inicio: "07:30", fim: "11:30" },
      { inicio: "13:00", fim: "17:35" },
    ],
  },
];

async function main() {
  console.log("🧹 Limpando o banco de dados (Reset)...");

  // Limpeza em ordem correta
  await prisma.registros.deleteMany({});
  await prisma.membroEquipe.deleteMany({});
  await prisma.equipePlantao.deleteMany({});
  await prisma.plantonistas.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.verification.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✅ Banco zerado com sucesso!\n");

  // 1. Criar Administrador Oficial
  console.log("👤 Criando usuário Administrador (Lucas)...");
  const adminEmail = "lucas@gmail.com";
  const adminPass = "@123456";

  await auth.api.signUpEmail({
    body: {
      name: "Lucas",
      email: adminEmail,
      password: adminPass,
      role: "admin",
      typeUser: "comum",
    },
  });

  const adminUser = await prisma.user.update({
    where: { email: adminEmail },
    data: {
      role: "admin",
      typeUser: "comum",
    },
  });
  console.log(`✅ Administrador '${adminUser.name}' (${adminUser.email}) criado com sucesso!\n`);

  // 2. Criar as 4 Equipes de Atendimento (N1, N2, N3, Financeiro)
  console.log("🏢 Criando as 4 Equipes Oficiais (N1, N2, N3, Financeiro)...");
  const equipesCriadasMap = new Map<number, any>();

  for (const eq of EQUIPES_SEED) {
    const equipe = await prisma.equipePlantao.create({
      data: {
        nome: eq.nome,
        queueId: eq.queueId,
        queueName: eq.queueName,
        descricao: eq.descricao,
        cor: eq.cor,
        isFallback: eq.isFallback,
        departamentos: eq.departamentos,
        ativo: true,
      },
    });
    equipesCriadasMap.set(eq.queueId, equipe);
    console.log(`- Equipe '${equipe.nome}' (Fila #${eq.queueId}) cadastrada com [${eq.departamentos.join(", ")}].`);
  }

  // 3. Criar Analistas / Atendentes do n8n e vincular às 4 Equipes
  console.log("\n👥 Criando Usuários Atendentes e vinculando às Equipes & Plantões...");

  for (const analista of ANALISTAS_N8N) {
    // Criação no Better Auth
    await auth.api.signUpEmail({
      body: {
        name: analista.nome,
        email: analista.email,
        password: analista.senhaPadrao,
        role: "comum",
        typeUser: "atendente",
        id_atendente: String(analista.zproId),
        isPlantonista: analista.isPlantonista,
        posicao: analista.posicao,
      },
    });

    // Atualiza dados operacionais no Prisma
    const usuarioCriado = await prisma.user.update({
      where: { email: analista.email },
      data: {
        role: "comum",
        typeUser: "atendente",
        id_atendente: String(analista.zproId),
        zproId: analista.zproId,
        slackId: analista.slackId,
        isPlantonista: analista.isPlantonista,
        posicao: analista.posicao,
      },
    });

    // Registro na tabela de Plantonistas (Escala de Plantão)
    if (analista.isPlantonista) {
      await prisma.plantonistas.create({
        data: {
          userId: usuarioCriado.id,
          nome: usuarioCriado.name,
          posicao: analista.posicao,
        },
      });
    }

    // Vincula o analista às respectivas equipes das 4 equipes oficiais
    for (const queueId of analista.filasZpro) {
      const equipeDb = equipesCriadasMap.get(queueId);
      if (equipeDb) {
        await prisma.membroEquipe.create({
          data: {
            equipeId: equipeDb.id,
            userId: usuarioCriado.id,
            cargo: "analista",
            ordemSequencial: analista.posicao + 1,
            pesoPrioridade: 0,
            turnos: analista.turnos,
            margemInicioMinutos: 5,
            margemFimMinutos: 5,
            ativo: true,
          },
        });
      }
    }

    console.log(`- Analista '${analista.nome}' (Z-PRO #${analista.zproId}, Slack: ${analista.slackId}, Fila #${analista.posicao}) criado e vinculado às equipes [${analista.filasZpro.join(", ")}].`);
  }

  console.log("\n🚀 Seeding das 4 equipes finalizado com 100% de sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });