import type { ExternalToken } from "../../../generated/prisma/index.js";
import prisma from "../../config/postgres.js";
import { BaseRepository } from "./baseRepo.js";

export class ExternalTokenRepository extends BaseRepository<ExternalToken> {
  constructor() {
    super(prisma.externalToken);
  }

  async findByServiceName(serviceName: string): Promise<ExternalToken | null> {
    return await prisma.externalToken.findUnique({
      where: { serviceName },
    });
  }

  async upsertByServiceName(data: {
    serviceName: string;
    token: string;
    apiUrl?: string | null;
    description?: string | null;
    isActive?: boolean;
  }): Promise<ExternalToken> {
    return await prisma.externalToken.upsert({
      where: { serviceName: data.serviceName },
      update: {
        token: data.token,
        ...(data.apiUrl !== undefined && { apiUrl: data.apiUrl }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        updatedAt: new Date(),
      },
      create: {
        serviceName: data.serviceName,
        token: data.token,
        apiUrl: data.apiUrl || null,
        description: data.description || null,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }
}
