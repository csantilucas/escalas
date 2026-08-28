// src/seed/seed.ts
import dotenv from "dotenv";
dotenv.config();

import prisma from "../config/postgres.js";
import { auth } from "../config/auth.js";

async function main() {
  console.log("🧹 Limpando o banco de dados (Reset)...");

  // Apaga os dados das tabelas na ordem correta
  await prisma.registros.deleteMany({});
  await prisma.membroEquipe.deleteMany({});
  await prisma.plantonistas.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.verification.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✅ Banco zerado com sucesso!");

  console.log("👤 Criando usuário administrador oficial via Better Auth...");

  const email = "lucas@gmail.com";
  const password = "@112658n";
  const name = "Lucas";


  // Criação através do Better Auth para gerar o hash de credenciais na tabela account
  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      role: "admin",
      typeUser: "comum",
    },
  });

  // Garante que o role seja 'admin' e typeUser seja 'atendente'
  const adminUser = await prisma.user.update({
    where: { email },
    data: {
      role: "admin",
      typeUser: "comum",
    },
  });

  console.log(`- Usuário ${adminUser.name} (${adminUser.email}) criado com hash do Better Auth como ${adminUser.typeUser}.`);
  console.log("\n🚀 Seeding finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });