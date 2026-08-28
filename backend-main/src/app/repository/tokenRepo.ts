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
    description?: string;
    isActive?: boolean;
  }): Promise<ExternalToken> {
    return await prisma.externalToken.upsert({
      where: { serviceName: data.serviceName },
      update: {
        token: data.token,
        ...(data.description !== undefined && { description: data.description }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        updatedAt: new Date(),
      },
      create: {
        serviceName: data.serviceName,
        token: data.token,
        description: data.description || null,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }
}
