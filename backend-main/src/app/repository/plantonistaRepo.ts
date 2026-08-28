import { BaseRepository } from "./baseRepo.js";
import type { Plantonistas } from "../../../generated/prisma/index.js";
import prisma from "../../config/postgres.js";

export class PlantonistaRepository extends BaseRepository<Plantonistas> {
  constructor() {
    super(prisma.plantonistas);
  }

  async findByUserId(userId: string): Promise<Plantonistas | null> {
    return await prisma.plantonistas.findUnique({
      where: { userId },
    });
  }

  // 1. Atualizar a data do plantonista de forma direta
  async updatePlantonistaDate(plantonistaId: string, data: Date): Promise<Plantonistas> {
    return await prisma.plantonistas.update({
      where: { id: plantonistaId },
      data: { proxima_data: data },
    });
  }

  // 2. Buscar todos os plantonistas ordenados pela data mais recente (proxima_data desc)
  async findAllOrderedByRecent(): Promise<Plantonistas[]> {
    return await prisma.plantonistas.findMany({
      orderBy: {
        proxima_data: 'desc', // Traz os que têm o plantão mais recente primeiro
      },
      include: {
        user: true, // Se precisar dos dados do usuário junto
      }
    });
  }


  async findAllOrderedByPosicao(): Promise<Plantonistas[]> {
    return await prisma.plantonistas.findMany({
      orderBy: { posicao: 'asc' }, // Traz na ordem: 0, 1, 2, 3...
    });
  }
}