// src/services/userService.ts
import api from "../lib/api";

export interface LoginModel {
  email: string;
  pass: string;
}

export interface CreateUserModel {
  name: string;
  email: string;
  pass: string;
  id_atendente?: string;
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
  async listAll() {
    const response = await api.get("/users");
    return response.data;
  }
}

export const userService = new UserServices();