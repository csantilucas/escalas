// src/services/plantonistaService.ts
import api from "../lib/api";

class PlantonistaServices {
  // POST /plantao -> Vincular usuário como plantonista
  async link(userId: string) {
    const response = await api.post("/plantao", { userId });
    return response.data;
  }

  // GET /plantao -> Listar todos os plantonistas
  async list() {
    const response = await api.get("/plantao");
    return response.data;
  }

  // GET /plantao/user/:userId -> Buscar plantonista por ID de usuário
  async findByUserId(userId: string) {
    if (!userId) throw new Error("ID do usuário não fornecido");
    const response = await api.get(`/plantao/user/${userId}`);
    return response.data;
  }
}

export const plantonistaService = new PlantonistaServices();