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
  role?: "admin" | "gestor" | "comum" | string;
  typeUser?: "atendente" | "comum" | string;
  id_atendente?: string | null;
  zproId?: number | null;
  slackId?: string | null;
  isPlantonista?: boolean;
  posicao?: number;
  createdAt?: string;
}

export interface CreateUserModel {
  name: string;
  email: string;
  pass: string;
  role?: "admin" | "gestor" | "comum" | string;
  typeUser?: "atendente" | "comum" | string;
  id_atendente?: string;
  zproId?: number;
  slackId?: string;
  isPlantonista?: boolean;
  posicao?: number;
}

export interface UpdateUserModel {
  name?: string;
  email?: string;
  pass?: string;
  password?: string;
  role?: "admin" | "gestor" | "comum" | string;
  typeUser?: "atendente" | "comum" | string;
  id_atendente?: string | null;
  zproId?: number | null;
  slackId?: string | null;
  isPlantonista?: boolean;
  posicao?: number;
}

export interface UpdateProfileModel {
  name?: string;
  email?: string;
  pass?: string;
  password?: string;
}

class UserServices {
  // POST /users -> Cadastrar novo usuário
  async register(data: CreateUserModel) {
    const response = await api.post("/users", data);
    return response.data;
  }

  // GET /users -> Listar usuários
  async listAll(): Promise<UserItem[]> {
    const response = await api.get<UserItem[]>("/users");
    return response.data;
  }

  async getAll(): Promise<UserItem[]> {
    return this.listAll();
  }

  // GET /users/:id -> Buscar usuário por ID
  async getById(id: string): Promise<UserItem> {
    const response = await api.get<UserItem>(`/users/${id}`);
    return response.data;
  }

  // PUT /users/:id -> Atualizar dados do usuário
  async update(id: string, data: UpdateUserModel): Promise<UserItem> {
    const response = await api.put<UserItem>(`/users/${id}`, data);
    return response.data;
  }

  // DELETE /users/:id -> Excluir usuário
  async delete(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }

  // GET /users/profile -> Obter perfil do usuário logado
  async getProfile(): Promise<UserItem> {
    const response = await api.get<UserItem>("/users/profile");
    return response.data;
  }

  // PUT /users/profile -> Atualizar dados do próprio perfil
  async updateProfile(data: UpdateProfileModel): Promise<UserItem> {
    const response = await api.put<UserItem>("/users/profile", data);
    return response.data;
  }
}

export const userService = new UserServices();