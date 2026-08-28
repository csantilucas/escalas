// src/repositories/BaseRepository.ts
import type { StringDecoder } from "node:string_decoder";
import prisma from "../../config/postgres.js";

export class BaseRepository<T> {
  // Recebemos o "delegate" do modelo do Prisma (ex: prisma.user)
  constructor(private model: any) {}

  async findAll(): Promise<T[]> {
    return await this.model.findMany();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async create(data: any): Promise<T> {
    return await this.model.create({
      data,
    });
  }

  async update(id: string, data: any): Promise<T> {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return await this.model.delete({
      where: { id },
    });
  }
}