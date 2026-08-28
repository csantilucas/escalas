import type { ExternalTokenRepository } from "../repository/tokenRepo.js";

export interface CreateTokenInput {
  serviceName: string;
  token: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateTokenInput {
  serviceName?: string;
  token?: string;
  description?: string;
  isActive?: boolean;
}

export class ExternalTokenService {
  private tokenRepo: ExternalTokenRepository;

  constructor(tokenRepository: ExternalTokenRepository) {
    this.tokenRepo = tokenRepository;
  }

  async getAllTokens() {
    return await this.tokenRepo.findAll();
  }

  async getTokenById(id: string) {
    if (!id) throw new Error("ID do token é obrigatório.");
    const tokenRecord = await this.tokenRepo.findById(id);
    if (!tokenRecord) throw new Error("Token não encontrado.");
    return tokenRecord;
  }

  async getTokenByServiceName(serviceName: string) {
    if (!serviceName) throw new Error("Nome do serviço é obrigatório.");
    return await this.tokenRepo.findByServiceName(serviceName);
  }

  async getActiveToken(serviceName: string, envFallbackKey?: string): Promise<string | null> {
    try {
      const record = await this.tokenRepo.findByServiceName(serviceName);
      if (record && record.isActive && record.token) {
        return record.token;
      }
    } catch (e) {
      // Se houver erro de banco momentâneo, usa o fallback
    }

    if (envFallbackKey && process.env[envFallbackKey]) {
      return process.env[envFallbackKey] || null;
    }

    return null;
  }

  async createOrUpsertToken(data: CreateTokenInput) {
    if (!data.serviceName) throw new Error("O campo 'serviceName' é obrigatório.");
    if (!data.token) throw new Error("O campo 'token' é obrigatório.");

    return await this.tokenRepo.upsertByServiceName({
      serviceName: data.serviceName.trim().toLowerCase(),
      token: data.token.trim(),
      description: data.description,
      isActive: data.isActive !== undefined ? data.isActive : true,
    });
  }

  async updateToken(id: string, data: UpdateTokenInput) {
    if (!id) throw new Error("ID do token é obrigatório.");

    const existing = await this.tokenRepo.findById(id);
    if (!existing) throw new Error("Token não encontrado.");

    return await this.tokenRepo.update(id, {
      ...(data.serviceName && { serviceName: data.serviceName.trim().toLowerCase() }),
      ...(data.token && { token: data.token.trim() }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    });
  }

  async deleteToken(id: string) {
    if (!id) throw new Error("ID do token é obrigatório.");

    const existing = await this.tokenRepo.findById(id);
    if (!existing) throw new Error("Token não encontrado.");

    return await this.tokenRepo.delete(id);
  }
}
