// src/controllers/UserController.ts
import type { Request, Response } from "express";
import { userService } from "../../containers/user.container.js";
import { encryptedPass } from "../../containers/token.container.js";
import { auth } from "../../config/auth.js";
import prisma from "../../config/postgres.js";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, pass, role, typeUser, id_atendente, zproId, slackId, isPlantonista, posicao } = req.body;

      if (!name || !email || !pass) {
        return res.status(400).json({
          error: "Campos obrigatórios ausentes: nome, e-mail e senha são necessários.",
        });
      }

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "E-mail já está em uso por outro usuário." });
      }

      // 1. Nível de Acesso (Permissões): admin, gestor ou comum
      let finalRole: string = "comum";
      if (role === "admin" || (typeUser as any) === "admin") finalRole = "admin";
      else if (role === "gestor" || (typeUser as any) === "gestor") finalRole = "gestor";

      // 2. Tipo de Usuário (Função): atendente ou comum
      const finalTypeUser = typeUser === "comum" ? "comum" : "atendente";

      // 3. Regra de Atendente: somente atendentes possuem ID Z-PRO e dados de plantão
      const isAtendente = finalTypeUser === "atendente";
      const finalIdAtendente = isAtendente && id_atendente ? String(id_atendente).trim() : null;
      const finalZproId = isAtendente && zproId ? Number(zproId) : null;
      const finalSlackId = isAtendente && slackId ? String(slackId).trim() : null;
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
          zproId: finalZproId,
          slackId: finalSlackId,
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
      return res.status(500).json({ error: error.message || "Erro ao criar usuário." });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.getAllUsers();

      const mappedUsers = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || ((user as any).typeUser === "admin" ? "admin" : "comum"),
        typeUser: user.typeUser,
        id_atendente: user.id_atendente,
        zproId: user.zproId,
        slackId: user.slackId,
        isPlantonista: user.isPlantonista || false,
        posicao: user.posicao || 0,
        createdAt: user.createdAt,
      }));

      return res.status(200).json(mappedUsers);
    } catch (error: any) {
      console.error("❌ [UserController.getAll] Erro ao listar usuários:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao listar usuários." });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = String(req.params.id);
      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const { pass: _, ...userWithoutPassword } = user as any;
      return res.status(200).json(userWithoutPassword);
    } catch (error: any) {
      console.error("❌ [UserController.getById] Erro ao buscar usuário:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar usuário." });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = String(req.params.id);
      const {
        name,
        email,
        pass,
        password,
        role,
        typeUser,
        id_atendente,
        zproId,
        slackId,
        isPlantonista,
        posicao,
      } = req.body;

      const existingUser = await userService.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Validação de e-mail duplicado caso alterado
      if (email && email.toLowerCase() !== existingUser.email.toLowerCase()) {
        const emailEmUso = await userService.getUserByEmail(email);
        if (emailEmUso && emailEmUso.id !== id) {
          return res.status(400).json({ error: "O novo e-mail já está sendo utilizado por outro usuário." });
        }
      }

      const dataToUpdate: any = {};

      if (name !== undefined) dataToUpdate.name = name.trim();
      if (email !== undefined) dataToUpdate.email = email.trim();
      if (role !== undefined) dataToUpdate.role = role;
      if (typeUser !== undefined) dataToUpdate.typeUser = typeUser;
      if (id_atendente !== undefined) dataToUpdate.id_atendente = id_atendente ? String(id_atendente).trim() : null;
      if (zproId !== undefined) dataToUpdate.zproId = zproId ? Number(zproId) : null;
      if (slackId !== undefined) dataToUpdate.slackId = slackId ? String(slackId).trim() : null;
      if (isPlantonista !== undefined) dataToUpdate.isPlantonista = Boolean(isPlantonista);
      if (posicao !== undefined) dataToUpdate.posicao = Number(posicao) || 0;

      // Atualização de senha se fornecida
      const novaSenha = pass || password;
      if (novaSenha && String(novaSenha).trim()) {
        const hashedPassword = await encryptedPass.encryptPassword(String(novaSenha).trim());
        dataToUpdate.pass = hashedPassword;

        // Atualiza na tabela account do Better Auth para permitir login
        await prisma.account.updateMany({
          where: { userId: id },
          data: { password: hashedPassword },
        });
      }

      const updatedUser = await userService.updateUser(id, dataToUpdate);

      // Sincroniza tabela plantonistas
      const finalIsPlantonista = dataToUpdate.isPlantonista !== undefined ? dataToUpdate.isPlantonista : existingUser.isPlantonista;
      const finalPosicao = dataToUpdate.posicao !== undefined ? dataToUpdate.posicao : existingUser.posicao;

      if (finalIsPlantonista) {
        await prisma.plantonistas.upsert({
          where: { userId: id },
          update: {
            nome: updatedUser.name,
            posicao: finalPosicao || 0,
          },
          create: {
            userId: id,
            nome: updatedUser.name,
            posicao: finalPosicao || 0,
          },
        });
      } else {
        await prisma.plantonistas.deleteMany({
          where: { userId: id },
        });
      }

      const { pass: _, ...userWithoutPassword } = updatedUser as any;
      return res.status(200).json(userWithoutPassword);
    } catch (error: any) {
      console.error("❌ [UserController.update] Erro ao atualizar usuário:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao atualizar usuário." });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = String(req.params.id);

      const existingUser = await userService.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Limpeza de dependências
      await prisma.plantonistas.deleteMany({ where: { userId: id } });
      await prisma.membroEquipe.deleteMany({ where: { userId: id } });
      await prisma.session.deleteMany({ where: { userId: id } });
      await prisma.account.deleteMany({ where: { userId: id } });

      await userService.deleteUser(id);

      return res.status(200).json({ message: "Usuário excluído com sucesso." });
    } catch (error: any) {
      console.error("❌ [UserController.delete] Erro ao excluir usuário:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao excluir usuário." });
    }
  }

  // 🟢 Obter perfil do usuário autenticado
  async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Não autenticado." });
      }

      const user = await userService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "Perfil não encontrado." });
      }

      const { pass: _, ...userWithoutPassword } = user as any;
      return res.status(200).json(userWithoutPassword);
    } catch (error: any) {
      console.error("❌ [UserController.getProfile] Erro ao buscar perfil:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao buscar perfil." });
    }
  }

  // 🟢 Atualizar próprio perfil
  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Não autenticado." });
      }

      const userId = req.user.id;
      const { name, email, pass, password } = req.body;

      const dataToUpdate: any = {};
      if (name) dataToUpdate.name = name.trim();
      if (email) {
        const emailEmUso = await userService.getUserByEmail(email);
        if (emailEmUso && emailEmUso.id !== userId) {
          return res.status(400).json({ error: "E-mail já cadastrado por outro usuário." });
        }
        dataToUpdate.email = email.trim();
      }

      const novaSenha = pass || password;
      if (novaSenha && String(novaSenha).trim()) {
        const hashedPassword = await encryptedPass.encryptPassword(String(novaSenha).trim());
        dataToUpdate.pass = hashedPassword;

        await prisma.account.updateMany({
          where: { userId },
          data: { password: hashedPassword },
        });
      }

      const updatedUser = await userService.updateUser(userId, dataToUpdate);

      // Atualiza nome na tabela de plantonistas se aplicável
      if (name) {
        await prisma.plantonistas.updateMany({
          where: { userId },
          data: { nome: name.trim() },
        });
      }

      const { pass: _, ...userWithoutPassword } = updatedUser as any;
      return res.status(200).json(userWithoutPassword);
    } catch (error: any) {
      console.error("❌ [UserController.updateProfile] Erro ao atualizar perfil:", error.message || error);
      return res.status(500).json({ error: error.message || "Erro ao atualizar perfil." });
    }
  }
}