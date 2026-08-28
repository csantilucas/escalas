// src/services/registroService.ts
import api from "../lib/api";

export interface CreateRegistroModel {
  plantao_id: string;
  user_id: string;
  data: string;
  startTime: string;
  endTime: string;
}

export interface UpdateDatesModel {
  data: string;
  startTime: string;
  endTime: string;
}

export interface GerarEscalaModel {
  dataInicio: string;
  diaSemana: number; // 0 (Domingo) a 6 (Sábado)
  horarioInicio: string; // "HH:MM"
  horarioFim: string; // "HH:MM"
}

class RegistroServices {
  // GET /register/find?page=1 -> Listar registros paginados e ordenados
  async list(page: number = 1) {
    const response = await api.get(`/register/find?page=${page}`);
    return response.data; // Retorna { registros, total, pages }
  }

  // 🟢 NOVO MÉTODO: GET /register/:id -> Buscar registro individual por ID
  async findById(id: string) {
    if (!id) throw new Error("ID do registro não fornecido");
    const response = await api.get(`/register/${id}`);
    return response.data;
  }

  // GET /register/next -> Buscar próximo plantão ativo
  async next() {
    const response = await api.get("/register/next");
    return response.data;
  }

  // POST /register -> Criar novo registro manual individual
  async registerManual(data: CreateRegistroModel) {
    const response = await api.post("/register", data);
    return response.data;
  }

  // POST /register/gerar -> Geração automática e distribuída de escalas
  async autoGenerate(data: GerarEscalaModel) {
    const response = await api.post("/register/gerar", data);
    return response.data;
  }

  // PUT /register/:id -> Atualizar datas/horários de um registro
  async update(id: string, data: UpdateDatesModel) {
    if (!id) throw new Error("ID do registro não fornecido");
    const response = await api.put(`/register/${id}`, data);
    return response.data;
  }

  // PATCH /register/change-user/:id -> Transferir plantão
  async transfer(id: string, newUserId: string) {
    if (!id) throw new Error("ID do registro não fornecido");
    const response = await api.patch(`/register/change-user/${id}`, { newUserId });
    return response.data;
  }

  // DELETE /register/:id -> Remover registro de escala
  async delete(id: string) {
    if (!id) throw new Error("ID do registro não fornecido");
    const response = await api.delete(`/register/${id}`);
    return response.data;
  }
}

export const registroService = new RegistroServices();