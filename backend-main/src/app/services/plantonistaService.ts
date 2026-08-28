import type { PlantonistaRepository } from "../repository/plantonistaRepo.js";
import type { UserRepository } from "../repository/userRepo.js";
import { sseEventBus } from "../../config/sseEvents.js";

interface PlantonistaInput {
  userId: string; // 👈 Apenas userId na interface
}

export class PlantonistaService {
  private plantonista: PlantonistaRepository;
  private user: UserRepository;

  constructor(plantonistaRepository: PlantonistaRepository, userRepository: UserRepository) {
    this.plantonista = plantonistaRepository;
    this.user = userRepository;
  }

  async createPlantonista(data: PlantonistaInput) {
    const userExists: any = await this.user.findById(data.userId);
    if (!userExists) {
      throw new Error("Usuário não encontrado.");
    }

    const alreadyPlantonista = await this.plantonista.findByUserId(data.userId);
    if (alreadyPlantonista) {
      throw new Error("Este usuário já está vinculado como plantonista.");
    }

    const plantonistaData = {
      nome: userExists.name,
      userId: data.userId,
      posicao: userExists.posicao ?? 0,
      proxima_data: new Date(),
    };

    const novoPlantonista = await this.plantonista.create(plantonistaData);
    sseEventBus.notify("plantonista", "create", novoPlantonista);
    return novoPlantonista;
  }

  async getPlantonistas() {
    return await this.plantonista.findAllOrderedByRecent();
  }

  async getPlantonistaByUserId(userId: string) {
    const plantonista = await this.plantonista.findByUserId(userId);
    if (!plantonista) {
      throw new Error("Plantonista não encontrado para este usuário.");
    }
    return plantonista;
  }
}