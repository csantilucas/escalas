import request from "supertest";
import app from "../config/server.js";
import prisma from "../config/postgres.js";

export async function clearDatabase(): Promise<void> {
  await prisma.membroEquipe.deleteMany({});
  await prisma.equipePlantao.deleteMany({});
  await prisma.externalToken.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.verification.deleteMany({});
  await prisma.atendimento.deleteMany({});
  await prisma.registros.deleteMany({});
  await prisma.plantonistas.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function setupTestUsers(prefix: string = "test") {
  await clearDatabase();
  const uid = Math.random().toString(36).substring(2, 7);

  const adminEmail = `admin_${prefix}_${uid}@email.com`;
  const atendenteEmail = `atendente_${prefix}_${uid}@email.com`;

  // 1. Cadastra Admin via rota oficial Better Auth
  const adminRes = await request(app)
    .post("/api/auth/sign-up/email")
    .send({
      name: "Admin de Teste",
      email: adminEmail,
      password: "password_123",
      id_atendente: `ATEND-ADM-${uid}`,
      role: "admin",
      typeUser: "atendente",
    });

  const adminCookie = adminRes.headers["set-cookie"];

  const admin = await prisma.user.update({
    where: { email: adminEmail },
    data: { role: "admin", typeUser: "atendente" },
  });

  // 2. Cadastra Atendente via rota oficial Better Auth
  const atendenteRes = await request(app)
    .post("/api/auth/sign-up/email")
    .send({
      name: "Atendente de Teste",
      email: atendenteEmail,
      password: "password_123",
      id_atendente: `ATEND-USR-${uid}`,
      role: "comum",
      typeUser: "atendente",
    });

  const atendenteCookie = atendenteRes.headers["set-cookie"];

  const atendente = await prisma.user.findUniqueOrThrow({
    where: { email: atendenteEmail },
  });

  return {
    admin,
    atendente,
    adminCookie,
    atendenteCookie,
  };
}
