// src/controllers/UserController.ts
import type { Request, Response } from "express";

import { userService } from "../../containers/user.container.js";
import { encryptedPass } from "../../containers/token.container.js";
import { error } from "node:console";


export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, pass, id_atendente, typeUser } = req.body;

      if (!name || !email || !pass) {
        return res.status(400).json({
          error: "Missing required fields: name, email, or pass.",
        });
      }

      const encryptedPassword = await encryptedPass.encryptPassword(pass);

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use." });
      }

      const newUser = await userService.createUser({
        name,
        email,
        pass: encryptedPassword,
        id_atendente,
        typeUser: typeUser || "atendente",
      });

      const { pass: _, ...userWithoutPassword } = newUser;

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
      }));

      return res.status(200).json(mappedUsers);
    } catch (error: any) {
      console.error("❌ [UserController.getAll] Erro ao listar usuários:", error.message || error);
      return res.status(500).json({ error: error.message });
    }
  }
}