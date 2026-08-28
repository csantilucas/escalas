// src/controllers/UserController.ts
import type { Request, Response } from "express";

import { userService } from "../../containers/user.container.js";
import { auth } from "../../config/auth.js";
import prisma from "../../config/postgres.js";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, pass, role, typeUser, id_atendente, isPlantonista, posicao } = req.body;

      if (!name || !email || !pass) {
        return res.status(400).json({
          error: "Missing required fields: name, email, or pass.",
        });
      }

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use." });
      }

      // 1. Nível de Acesso (Permissões): admin ou comum
      const finalRole = role === "admin" || typeUser === "admin" ? "admin" : "comum";

      // 2. Tipo de Usuário (Função): atendente ou comum
      const finalTypeUser = typeUser === "comum" ? "comum" : "atendente";

      // 3. Regra de Atendente: somente atendentes possuem ID Z-PRO e dados de plantão
      const isAtendente = finalTypeUser === "atendente";
      const finalIdAtendente = isAtendente && id_atendente ? String(id_atendente).trim() : null;
      const finalIsPlantonista = isAtendente ? Boolean(isPlantonista) : false;
      const finalPosicao = isAtendente && finalIsPlantonista ? (Number(posicao) || 0) : 0;

      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password: pass,
          role: finalRole,
          typeUser: finalTypeUser,
          id_atendente: finalIdAtendente || undefined,
          isPlantonista: finalIsPlantonista,
          posicao: finalPosicao,
        },
      });

      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          role: finalRole as any,
          typeUser: finalTypeUser as any,
          id_atendente: finalIdAtendente,
          isPlantonista: finalIsPlantonista,
          posicao: finalPosicao,
        },
      });

      // Sincroniza tabela plantonistas apenas se for atendente E plantonista
      if (finalIsPlantonista) {
        await prisma.plantonistas.upsert({
          where: { userId: updatedUser.id },
          update: {
            nome: updatedUser.name,
            posicao: finalPosicao,
          },
          create: {
            userId: updatedUser.id,
            nome: updatedUser.name,
            posicao: finalPosicao,
          },
        });
      } else {
        await prisma.plantonistas.deleteMany({
          where: { userId: updatedUser.id },
        });
      }

      const { pass: _, ...userWithoutPassword } = updatedUser as any;

      return res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      console.error("❌ [UserController.create] Erro ao criar usuário:", error.message || error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.getAllUsers();

      const mappedUsers = users.map((user) => ({
        id: (user as any).id,
        name: user.name,
        email: user.email,
        role: (user as any).role || ((user as any).typeUser === "admin" ? "admin" : "comum"),
        typeUser: user.typeUser,
        id_atendente: user.id_atendente,
        isPlantonista: (user as any).isPlantonista || false,
        posicao: (user as any).posicao || 0,
        createdAt: (user as any).createdAt,
      }));

      return res.status(200).json(mappedUsers);
    } catch (error: any) {
      console.error("❌ [UserController.getAll] Erro ao listar usuários:", error.message || error);
      return res.status(500).json({ error: error.message });
    }
  }
}