// src/services/userService.ts
import api from "../lib/api";

export interface LoginModel {
  email: string;
  pass: string;
}

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "comum" | string;
  typeUser?: "atendente" | "comum" | string;
  id_atendente?: string | null;
  isPlantonista?: boolean;
  posicao?: number;
  createdAt?: string;
}

export interface CreateUserModel {
  name: string;
  email: string;
  pass: string;
  role?: "admin" | "comum" | string;
  typeUser?: "atendente" | "comum" | string;
  id_atendente?: string;
  isPlantonista?: boolean;
  posicao?: number;
}

class UserServices {
  // POST /auth/login -> Fazer login
  async login(data: LoginModel) {
    const response = await api.post("/auth/login", data);
    return response.data;
  }

  // POST /users -> Cadastrar novo usuário
  async register(data: CreateUserModel) {
    const response = await api.post("/users", data);
    return response.data;
  }

  // GET /users -> Listar usuários (ID e Nome)
  async listAll(): Promise<UserItem[]> {
    const response = await api.get<UserItem[]>("/users");
    return response.data;
  }

  async getAll(): Promise<UserItem[]> {
    return this.listAll();
  }
}

export const userService = new UserServices();