// src/seed/seed.ts
import dotenv from "dotenv";
dotenv.config();

// 🔴 Importa a instância do Prisma que você já tem configurada no seu projeto!
import prisma from "../config/postgres.js";
import { encryptedPass } from "../containers/token.container.js";

enum TypeUsers {
  atendente = "atendente",
  admin = "admin",
  gestor = "gestor"
}

const usersToSeed = [
  { name: "Lucas", email: "lucas@gmail.com", pass: "123456", id_atendente: "20", typeUser: TypeUsers.admin},
  { name: "Gabriel", email: "gabriel@alphasoftware.com.br", pass: "123456", id_atendente: "5", typeUser: TypeUsers.atendente },
  { name: "Geneses", email: "geneses@alphasoftware.com.br", pass: "123456", id_atendente: "9", typeUser: TypeUsers.atendente  },
  { name: "Guilherme", email: "guilherme@alphasoftware.com.br", pass: "123456", id_atendente: "10", typeUser: TypeUsers.atendente  },
  { name: "Gustavo", email: "gustavo@alphasoftware.com.br", pass: "123456", id_atendente: "7", typeUser: TypeUsers.atendente  },
  { name: "Kariny", email: "sac@alphasoftware.com.br", pass: "123456", id_atendente: "4", typeUser: TypeUsers.atendente  },
  { name: "Pedro", email: "pedro@alphasoftware.com.br", pass: "123456", id_atendente: "6", typeUser: TypeUsers.admin},
  { name: "Tainara", email: "tainara@alphasoftware.com.br", pass: "123456", id_atendente: "3", typeUser: TypeUsers.admin},
  { name: "Thiago", email: "thiago@alphasoftware.com.br", pass: "123456", id_atendente: "11", typeUser: TypeUsers.atendente  },
  { name: "Junior", email: "junior@alphasoftware.com.br", pass: "123456", id_atendente: "8", typeUser:TypeUsers.atendente },
];

// Ordem estrita da sequência de distribuição
const plantonistas = [
  { name: "Gabriel" },
  { name: "Geneses" },
  { name: "Guilherme" },
  { name: "Gustavo" },
  { name: "Junior" }, // Colocado na posição correta da fila de distribuição
  { name: "Kariny" },
  { name: "Pedro" },
  { name: "Thiago" }
];

async function main() {
  console.log("🧹 Limpando o banco de dados (Reset)...");
  
  // Apaga os dados das tabelas na ordem correta para não quebrar os relacionamentos
  await prisma.registros.deleteMany({});
  await prisma.plantonistas.deleteMany({}); 
  await prisma.user.deleteMany({});
  
  console.log("✅ Banco zerado com sucesso!");

  console.log("👤 Iniciando o seeding de Usuários com criptografia nativa...");
  
  const createdUsers = [];

  for (const user of usersToSeed) {
    const hashedPassword = await encryptedPass.encryptPassword(user.pass);

    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        pass: hashedPassword,
        id_atendente: user.id_atendente,
        typeUser: user.typeUser as any, 
      },
    });

    createdUsers.push(newUser);
    console.log(`- Usuário ${newUser.name} cadastrado (${newUser.typeUser}).`);
  }

  console.log("\n🏥 Iniciando o vínculo dos Plantonistas com controle de posição...");

  // Percorre salvando o índice 'i' como a posição sequencial na fila de distribuição
  for (let i = 0; i < plantonistas.length; i++) {
    const plantonista = plantonistas[i];
    const userFound = createdUsers.find(u => u.name === plantonista.name);

    if (userFound) {
      await prisma.plantonistas.create({
        data: {
          nome: userFound.name,
          userId: userFound.id, 
          posicao: i // 👈 Define a sequência numérica exata (0, 1, 2, 3...) no banco
        }
      });
      console.log(`- Plantonista ${userFound.name} vinculado na posição ${i}.`);
    } else {
      console.log(`⚠️ Usuário ${plantonista.name} não encontrado para vínculo.`);
    }
  }

  console.log("\n🚀 Seeding finalizado com sucesso absoluto!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });